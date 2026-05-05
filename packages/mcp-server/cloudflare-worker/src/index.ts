import { makeOAuthConsent } from './app';
// `agents` and `@modelcontextprotocol/sdk` versions must stay in sync with the
// pins/overrides in package.json. `agents` declares an exact pin on
// `@modelcontextprotocol/sdk`; if our resolved version drifts, npm installs a
// second copy under `agents/node_modules/`, and `initMcpServer`'s runtime
// `instanceof McpServer` check fails because the two `McpServer` classes are
// distinct constructors.
import { McpAgent } from 'agents/mcp';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import OAuthProvider from '@cloudflare/workers-oauth-provider';
import { ClientOptions } from '@imagekit/nodejs';
import { McpOptions } from '@imagekit/api-mcp/options';
import { initMcpServer, newMcpServer } from '@imagekit/api-mcp/server';
import { configureLogger } from '@imagekit/api-mcp/logger';
import type { ExportedHandler } from '@cloudflare/workers-types';

type MCPProps = {
  clientProps: ClientOptions;
  clientConfig: McpOptions;
};

/**
 * The information displayed on the OAuth consent screen
 */
const serverConfig: ServerConfig = {
  orgName: 'ImageKit',
  instructionsUrl: 'https://imagekit.io/docs/mcp-server', // Set a url for where you show users how to get an API key
  logoUrl: 'https://ik.imagekit.io/ikmedia/logo/light_T4buIzohVH.svg', // Set a custom logo url to appear during the OAuth flow
  clientProperties: [
    {
      key: 'privateKey',
      label: 'ImageKit Private Key',
      description:
        'Your ImageKit private API key (starts with `private_`).\nYou can find this in the [ImageKit dashboard](https://imagekit.io/dashboard/developer/api-keys).\n',
      required: true,
      default: undefined,
      placeholder: 'ImageKit Private Key',
      type: 'password',
    },
    // {
    //   key: 'password',
    //   label: 'Password',
    //   description:
    //     'ImageKit uses your API key as username and ignores the password. \nThe SDK sets a dummy value. You can ignore this field.\n',
    //   required: false,
    //   default: 'do_not_set',
    //   placeholder: 'My Password',
    //   type: 'password',
    // },
    // {
    //   key: 'webhookSecret',
    //   label: 'Webhook Secret',
    //   description:
    //     "Your ImageKit webhook secret for verifying webhook signatures (starts with `whsec_`).\nYou can find this in the [ImageKit dashboard](https://imagekit.io/dashboard/developer/webhooks).\nOnly required if you're using webhooks.\n",
    //   required: false,
    //   default: null,
    //   placeholder: 'My Webhook Secret',
    //   type: 'string',
    // },
  ],
};

// `newMcpServer` fetches MCP server instructions from the Stainless API. In a
// Durable Object, that fetch happens inside `blockConcurrencyWhile`; if it
// hangs the DO is reset, and if it rejects the same thing happens. Race
// against a short timeout and catch any rejection so any failure mode lands
// on a fallback server constructed without instructions (the `initialize`
// response simply omits the `instructions` field, which is spec-allowed).
const INSTRUCTIONS_FETCH_TIMEOUT_MS = 5000;

function fallbackMcpServer(): McpServer {
  return new McpServer(
    { name: 'imagekit_nodejs_api', version: '7.5.0' },
    { capabilities: { tools: {}, logging: {} } },
  );
}

async function buildMcpServer(stainlessApiKey?: string): Promise<McpServer> {
  let timeoutId: ReturnType<typeof setTimeout> | undefined;
  try {
    const fetched = newMcpServer({ stainlessApiKey });
    const timeout = new Promise<null>((resolve) => {
      timeoutId = setTimeout(() => resolve(null), INSTRUCTIONS_FETCH_TIMEOUT_MS);
    });

    const result = await Promise.race([fetched, timeout]);

    if (result != null) {
      return result;
    }
  } catch (error) {
    console.error('Failed to build MCP server from upstream instructions; using fallback', error);
  } finally {
    if (timeoutId != null) {
      clearTimeout(timeoutId);
    }
  }

  return fallbackMcpServer();
}

export class MyMCP extends McpAgent<Env, unknown, MCPProps> {
  #resolveServer!: (server: McpServer) => void;
  #rejectServer!: (error: unknown) => void;
  server: Promise<McpServer> = new Promise<McpServer>((resolve, reject) => {
    this.#resolveServer = resolve;
    this.#rejectServer = reject;
  });

  async init() {
    try {
      if (this.props == null) {
        throw new Error('MCP props are not initialized');
      }

      configureLogger({ level: 'info', pretty: false });

      const server = await buildMcpServer(this.props.clientConfig?.stainlessApiKey);

      await initMcpServer({
        server,
        clientOptions: this.props.clientProps,
        mcpOptions: this.props.clientConfig,
      });

      this.#resolveServer(server);
    } catch (error) {
      this.#rejectServer(error);
      throw error;
    }
  }
}

export type ServerConfig = {
  /**
   * The name of the company/project
   */
  orgName: string;

  /**
   * An optional company logo image
   */
  logoUrl?: string;

  /**
   * An optional URL with instructions for users to get an API key
   */
  instructionsUrl?: string;

  /**
   * Properties collected to initialize the client
   */
  clientProperties: ClientProperty[];
};

export type ClientProperty = {
  key: string;
  label: string;
  description?: string;
  required: boolean;
  default?: unknown;
  placeholder?: string;
  type: 'string' | 'number' | 'password' | 'select';
  options?: { label: string; value: string }[];
};

// Export the OAuth handler as the default
export default new OAuthProvider({
  apiHandlers: {
    // @ts-expect-error
    '/sse': MyMCP.serveSSE('/sse'), // legacy SSE
    // @ts-expect-error
    '/mcp': MyMCP.serve('/mcp'), // Streaming HTTP
  },
  // Type assertion needed due to Headers type mismatch between Hono and @cloudflare/workers-types
  // At runtime, Hono's fetch handler is fully compatible with ExportedHandler
  defaultHandler: makeOAuthConsent(serverConfig) as unknown as ExportedHandler,
  authorizeEndpoint: '/authorize',
  tokenEndpoint: '/token',
  clientRegistrationEndpoint: '/register',
});
