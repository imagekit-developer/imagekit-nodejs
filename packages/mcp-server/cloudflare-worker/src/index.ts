import { makeOAuthConsent } from './app';
import { McpAgent } from 'agents/mcp';
import OAuthProvider from '@cloudflare/workers-oauth-provider';
import { McpOptions, initMcpServer, server, ClientOptions } from '@imagekit/api-mcp/server';
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

export class MyMCP extends McpAgent<Env, unknown, MCPProps> {
  server = server;

  async init() {
    initMcpServer({
      server: this.server,
      clientOptions: this.props.clientProps,
      mcpOptions: this.props.clientConfig,
    });
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
