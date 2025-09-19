import { makeOAuthConsent } from './app';
import { McpAgent } from 'agents/mcp';
import OAuthProvider from '@cloudflare/workers-oauth-provider';
import { McpOptions, initMcpServer, server, ClientOptions } from 'imagekit-api-mcp/server';

type MCPProps = {
  clientProps: ClientOptions;
  clientConfig: McpOptions;
};

/**
 * The information displayed on the OAuth consent screen
 */
const serverConfig: ServerConfig = {
  orgName: 'ImageKit',
  instructionsUrl: undefined, // Set a url for where you show users how to get an API key
  logoUrl: undefined, // Set a custom logo url to appear during the OAuth flow
  clientProperties: [
    {
      key: 'privateKey',
      label: 'Private Key',
      description:
        'Your ImageKit private API key (starts with `private_`).\nYou can find this in the [ImageKit dashboard](https://imagekit.io/dashboard/developer/api-keys).\n',
      required: true,
      default: undefined,
      placeholder: 'My Private Key',
      type: 'password',
    },
    {
      key: 'password',
      label: 'Password',
      description:
        'Leave this field unset. ImageKit uses Basic Authentication scheme that requires the `private_key` as the username and empty string as the password.\nThe password field is automatically managed by the SDK and should not be set.\n',
      required: false,
      default: 'do_not_set',
      placeholder: 'My Password',
      type: 'password',
    },
    {
      key: 'webhookSecret',
      label: 'Webhook Secret',
      description:
        'Your ImageKit webhook secret used by the SDK to verify webhook signatures for security.\nThis secret starts with a `whsec_` prefix and is essential for webhook verification.\nYou can view and manage your webhook secret in the [ImageKit dashboard](https://imagekit.io/dashboard/developer/webhooks).\n\n**Security Note**: Treat this secret like a password - keep it private and never expose it publicly.\nThis field is optional and only required if you plan to use webhook signature verification.\nLearn more about [webhook verification](https://imagekit.io/docs/webhooks#verify-webhook-signature).\n',
      required: false,
      default: null,
      placeholder: 'My Webhook Secret',
      type: 'string',
    },
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
  defaultHandler: makeOAuthConsent(serverConfig),
  authorizeEndpoint: '/authorize',
  tokenEndpoint: '/token',
  clientRegistrationEndpoint: '/register',
});
