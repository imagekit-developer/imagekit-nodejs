# Image Kit TypeScript MCP Server

## Installation

### Direct invocation

You can run the MCP Server directly via `npx`:

```sh
export IMAGEKIT_PRIVATE_KEY="My Private Key"
export OPTIONAL_IMAGEKIT_IGNORES_THIS="My Password"
export IMAGEKIT_WEBHOOK_SECRET="My Webhook Secret"
npx -y @imagekit/api-mcp@latest
```

### Via MCP Client

There is a partial list of existing clients at [modelcontextprotocol.io](https://modelcontextprotocol.io/clients). If you already
have a client, consult their documentation to install the MCP server.

For clients with a configuration JSON, it might look something like this:

```json
{
  "mcpServers": {
    "imagekit_nodejs_api": {
      "command": "npx",
      "args": ["-y", "@imagekit/api-mcp"],
      "env": {
        "IMAGEKIT_PRIVATE_KEY": "My Private Key",
        "OPTIONAL_IMAGEKIT_IGNORES_THIS": "My Password",
        "IMAGEKIT_WEBHOOK_SECRET": "My Webhook Secret"
      }
    }
  }
}
```

### Cursor

If you use Cursor, you can install the MCP server by using the button below. You will need to set your environment variables
in Cursor's `mcp.json`, which can be found in Cursor Settings > Tools & MCP > New MCP Server.

[![Add to Cursor](https://cursor.com/deeplink/mcp-install-dark.svg)](https://cursor.com/en-US/install-mcp?name=@imagekit/api-mcp&config=eyJjb21tYW5kIjoibnB4IiwiYXJncyI6WyIteSIsIkBpbWFnZWtpdC9hcGktbWNwIl0sImVudiI6eyJJTUFHRUtJVF9QUklWQVRFX0tFWSI6IlNldCB5b3VyIElNQUdFS0lUX1BSSVZBVEVfS0VZIGhlcmUuIiwiT1BUSU9OQUxfSU1BR0VLSVRfSUdOT1JFU19USElTIjoiU2V0IHlvdXIgT1BUSU9OQUxfSU1BR0VLSVRfSUdOT1JFU19USElTIGhlcmUuIiwiSU1BR0VLSVRfV0VCSE9PS19TRUNSRVQiOiJTZXQgeW91ciBJTUFHRUtJVF9XRUJIT09LX1NFQ1JFVCBoZXJlLiJ9fQ)

### VS Code

If you use MCP, you can install the MCP server by clicking the link below. You will need to set your environment variables
in VS Code's `mcp.json`, which can be found via Command Palette > MCP: Open User Configuration.

[Open VS Code](https://vscode.stainless.com/mcp/%7B%22name%22%3A%22%40imagekit%2Fapi-mcp%22%2C%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22%40imagekit%2Fapi-mcp%22%5D%2C%22env%22%3A%7B%22IMAGEKIT_PRIVATE_KEY%22%3A%22Set%20your%20IMAGEKIT_PRIVATE_KEY%20here.%22%2C%22OPTIONAL_IMAGEKIT_IGNORES_THIS%22%3A%22Set%20your%20OPTIONAL_IMAGEKIT_IGNORES_THIS%20here.%22%2C%22IMAGEKIT_WEBHOOK_SECRET%22%3A%22Set%20your%20IMAGEKIT_WEBHOOK_SECRET%20here.%22%7D%7D)

### Claude Code

If you use Claude Code, you can install the MCP server by running the command below in your terminal. You will need to set your
environment variables in Claude Code's `.claude.json`, which can be found in your home directory.

```
claude mcp add --transport stdio imagekit_nodejs_api --env IMAGEKIT_PRIVATE_KEY="Your IMAGEKIT_PRIVATE_KEY here." OPTIONAL_IMAGEKIT_IGNORES_THIS="Your OPTIONAL_IMAGEKIT_IGNORES_THIS here." IMAGEKIT_WEBHOOK_SECRET="Your IMAGEKIT_WEBHOOK_SECRET here." -- npx -y @imagekit/api-mcp
```

## Code Mode

This MCP server is built on the "Code Mode" tool scheme. In this MCP Server,
your agent will write code against the TypeScript SDK, which will then be executed in an
isolated sandbox. To accomplish this, the server will expose two tools to your agent:

- The first tool is a docs search tool, which can be used to generically query for
  documentation about your API/SDK.

- The second tool is a code tool, where the agent can write code against the TypeScript SDK.
  The code will be executed in a sandbox environment without web or filesystem access. Then,
  anything the code returns or prints will be returned to the agent as the result of the
  tool call.

Using this scheme, agents are capable of performing very complex tasks deterministically
and repeatably.

## Running remotely

Launching the client with `--transport=http` launches the server as a remote server using Streamable HTTP transport. The `--port` setting can choose the port it will run on, and the `--socket` setting allows it to run on a Unix socket.

Authorization can be provided via the `Authorization` header using the Basic scheme.

Additionally, authorization can be provided via the following headers:
| Header | Equivalent client option | Security scheme |
| ---------------------------------- | ------------------------ | --------------- |
| `x-imagekit-private-key` | `privateKey` | basicAuth |
| `x-optional-imagekit-ignores-this` | `password` | basicAuth |

A configuration JSON for this server might look like this, assuming the server is hosted at `http://localhost:3000`:

```json
{
  "mcpServers": {
    "imagekit_nodejs_api": {
      "url": "http://localhost:3000",
      "headers": {
        "Authorization": "Basic <auth value>"
      }
    }
  }
}
```
