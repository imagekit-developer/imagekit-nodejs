# Image Kit TypeScript MCP Server

## Installation

### Building

Because it's not published yet, clone the repo and build it:

```sh
git clone git@github.com:imagekit-developer/imagekit-nodejs.git
cd imagekit-nodejs
./scripts/bootstrap
./scripts/build
```

### Running

```sh
# set env vars as needed
export IMAGEKIT_PRIVATE_KEY="My Private Key"
export OPTIONAL_IMAGEKIT_IGNORES_THIS="My Password"
export IMAGEKIT_WEBHOOK_SECRET="My Webhook Secret"
node ./packages/mcp-server/dist/index.js
```

> [!NOTE]
> Once this package is [published to npm](https://www.stainless.com/docs/guides/publish), this will become: `npx -y imagekit-api-mcp`

### Via MCP Client

[Build the project](#building) as mentioned above.

There is a partial list of existing clients at [modelcontextprotocol.io](https://modelcontextprotocol.io/clients). If you already
have a client, consult their documentation to install the MCP server.

For clients with a configuration JSON, it might look something like this:

```json
{
  "mcpServers": {
    "imagekit_nodejs_api": {
      "command": "node",
      "args": ["/path/to/local/imagekit-nodejs/packages/mcp-server", "--client=claude", "--tools=dynamic"],
      "env": {
        "IMAGEKIT_PRIVATE_KEY": "My Private Key",
        "OPTIONAL_IMAGEKIT_IGNORES_THIS": "My Password",
        "IMAGEKIT_WEBHOOK_SECRET": "My Webhook Secret"
      }
    }
  }
}
```

## Exposing endpoints to your MCP Client

There are two ways to expose endpoints as tools in the MCP server:

1. Exposing one tool per endpoint, and filtering as necessary
2. Exposing a set of tools to dynamically discover and invoke endpoints from the API

### Filtering endpoints and tools

You can run the package on the command line to discover and filter the set of tools that are exposed by the
MCP Server. This can be helpful for large APIs where including all endpoints at once is too much for your AI's
context window.

You can filter by multiple aspects:

- `--tool` includes a specific tool by name
- `--resource` includes all tools under a specific resource, and can have wildcards, e.g. `my.resource*`
- `--operation` includes just read (get/list) or just write operations

### Dynamic tools

If you specify `--tools=dynamic` to the MCP server, instead of exposing one tool per endpoint in the API, it will
expose the following tools:

1. `list_api_endpoints` - Discovers available endpoints, with optional filtering by search query
2. `get_api_endpoint_schema` - Gets detailed schema information for a specific endpoint
3. `invoke_api_endpoint` - Executes any endpoint with the appropriate parameters

This allows you to have the full set of API endpoints available to your MCP Client, while not requiring that all
of their schemas be loaded into context at once. Instead, the LLM will automatically use these tools together to
search for, look up, and invoke endpoints dynamically. However, due to the indirect nature of the schemas, it
can struggle to provide the correct properties a bit more than when tools are imported explicitly. Therefore,
you can opt-in to explicit tools, the dynamic tools, or both.

See more information with `--help`.

All of these command-line options can be repeated, combined together, and have corresponding exclusion versions (e.g. `--no-tool`).

Use `--list` to see the list of available tools, or see below.

### Specifying the MCP Client

Different clients have varying abilities to handle arbitrary tools and schemas.

You can specify the client you are using with the `--client` argument, and the MCP server will automatically
serve tools and schemas that are more compatible with that client.

- `--client=<type>`: Set all capabilities based on a known MCP client

  - Valid values: `openai-agents`, `claude`, `claude-code`, `cursor`
  - Example: `--client=cursor`

Additionally, if you have a client not on the above list, or the client has gotten better
over time, you can manually enable or disable certain capabilities:

- `--capability=<name>`: Specify individual client capabilities
  - Available capabilities:
    - `top-level-unions`: Enable support for top-level unions in tool schemas
    - `valid-json`: Enable JSON string parsing for arguments
    - `refs`: Enable support for $ref pointers in schemas
    - `unions`: Enable support for union types (anyOf) in schemas
    - `formats`: Enable support for format validations in schemas (e.g. date-time, email)
    - `tool-name-length=N`: Set maximum tool name length to N characters
  - Example: `--capability=top-level-unions --capability=tool-name-length=40`
  - Example: `--capability=top-level-unions,tool-name-length=40`

### Examples

1. Filter for read operations on cards:

```bash
--resource=cards --operation=read
```

2. Exclude specific tools while including others:

```bash
--resource=cards --no-tool=create_cards
```

3. Configure for Cursor client with custom max tool name length:

```bash
--client=cursor --capability=tool-name-length=40
```

4. Complex filtering with multiple criteria:

```bash
--resource=cards,accounts --operation=read --tag=kyc --no-tool=create_cards
```

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

The command-line arguments for filtering tools and specifying clients can also be used as query parameters in the URL.
For example, to exclude specific tools while including others, use the URL:

```
http://localhost:3000?resource=cards&resource=accounts&no_tool=create_cards
```

Or, to configure for the Cursor client, with a custom max tool name length, use the URL:

```
http://localhost:3000?client=cursor&capability=tool-name-length%3D40
```

## Importing the tools and server individually

```js
// Import the server, generated endpoints, or the init function
import { server, endpoints, init } from "imagekit-api-mcp/server";

// import a specific tool
import createCustomMetadataFields from "imagekit-api-mcp/tools/custom-metadata-fields/create-custom-metadata-fields";

// initialize the server and all endpoints
init({ server, endpoints });

// manually start server
const transport = new StdioServerTransport();
await server.connect(transport);

// or initialize your own server with specific tools
const myServer = new McpServer(...);

// define your own endpoint
const myCustomEndpoint = {
  tool: {
    name: 'my_custom_tool',
    description: 'My custom tool',
    inputSchema: zodToJsonSchema(z.object({ a_property: z.string() })),
  },
  handler: async (client: client, args: any) => {
    return { myResponse: 'Hello world!' };
  })
};

// initialize the server with your custom endpoints
init({ server: myServer, endpoints: [createCustomMetadataFields, myCustomEndpoint] });
```

## Available Tools

The following tools are available in this MCP server.

### Resource `customMetadataFields`:

- `create_custom_metadata_fields` (`write`): This API creates a new custom metadata field. Once a custom metadata field is created either through this API or using the dashboard UI, its value can be set on the assets. The value of a field for an asset can be set using the media library UI or programmatically through upload or update assets API.
- `update_custom_metadata_fields` (`write`): This API updates the label or schema of an existing custom metadata field.
- `list_custom_metadata_fields` (`read`): This API returns the array of created custom metadata field objects. By default the API returns only non deleted field objects, but you can include deleted fields in the API response.
- `delete_custom_metadata_fields` (`write`): This API deletes a custom metadata field. Even after deleting a custom metadata field, you cannot create any new custom metadata field with the same name.

### Resource `files`:

- `update_files` (`write`): This API updates the details or attributes of the current version of the file. You can update `tags`, `customCoordinates`, `customMetadata`, publication status, remove existing `AITags` and apply extensions using this API.
- `delete_files` (`write`): This API deletes the file and all its file versions permanently.

  Note: If a file or specific transformation has been requested in the past, then the response is cached. Deleting a file does not purge the cache. You can purge the cache using purge cache API.

- `copy_files` (`write`): This will copy a file from one folder to another.

  Note: If any file at the destination has the same name as the source file, then the source file and its versions (if `includeFileVersions` is set to true) will be appended to the destination file version history.

- `get_files` (`read`): This API returns an object with details or attributes about the current version of the file.
- `move_files` (`write`): This will move a file and all its versions from one folder to another.

  Note: If any file at the destination has the same name as the source file, then the source file and its versions will be appended to the destination file.

- `rename_files` (`write`): You can rename an already existing file in the media library using rename file API. This operation would rename all file versions of the file.

  Note: The old URLs will stop working. The file/file version URLs cached on CDN will continue to work unless a purge is requested.

- `upload_files` (`write`): ImageKit.io allows you to upload files directly from both the server and client sides. For server-side uploads, private API key authentication is used. For client-side uploads, generate a one-time `token`, `signature`, and `expire` from your secure backend using private API. [Learn more](/docs/api-reference/upload-file/upload-file#how-to-implement-client-side-file-upload) about how to implement client-side file upload.

  The [V2 API](/docs/api-reference/upload-file/upload-file-v2) enhances security by verifying the entire payload using JWT.

  **File size limit** \
  On the free plan, the maximum upload file sizes are 20MB for images, audio, and raw files and 100MB for videos. On the paid plan, these limits increase to 40MB for images, audio, and raw files and 2GB for videos. These limits can be further increased with higher-tier plans.

  **Version limit** \
  A file can have a maximum of 100 versions.

  **Demo applications**

  - A full-fledged [upload widget using Uppy](https://github.com/imagekit-samples/uppy-uploader), supporting file selections from local storage, URL, Dropbox, Google Drive, Instagram, and more.
  - [Quick start guides](/docs/quick-start-guides) for various frameworks and technologies.

### Resource `files.bulk`:

- `delete_files_bulk` (`write`): This API deletes multiple files and all their file versions permanently.

  Note: If a file or specific transformation has been requested in the past, then the response is cached. Deleting a file does not purge the cache. You can purge the cache using purge cache API.

  A maximum of 100 files can be deleted at a time.

- `add_tags_files_bulk` (`write`): This API adds tags to multiple files in bulk. A maximum of 50 files can be specified at a time.
- `remove_ai_tags_files_bulk` (`write`): This API removes AITags from multiple files in bulk. A maximum of 50 files can be specified at a time.
- `remove_tags_files_bulk` (`write`): This API removes tags from multiple files in bulk. A maximum of 50 files can be specified at a time.

### Resource `files.versions`:

- `list_files_versions` (`read`): This API returns details of all versions of a file.
- `delete_files_versions` (`write`): This API deletes a non-current file version permanently. The API returns an empty response.

  Note: If you want to delete all versions of a file, use the delete file API.

- `get_files_versions` (`read`): This API returns an object with details or attributes of a file version.
- `restore_files_versions` (`write`): This API restores a file version as the current file version.

### Resource `files.metadata`:

- `get_files_metadata` (`read`): You can programmatically get image EXIF, pHash, and other metadata for uploaded files in the ImageKit.io media library using this API.

  You can also get the metadata in upload API response by passing `metadata` in `responseFields` parameter.

- `get_from_url_files_metadata` (`read`): Get image EXIF, pHash, and other metadata from ImageKit.io powered remote URL using this API.

### Resource `assets`:

- `list_assets` (`read`): This API can list all the uploaded files and folders in your ImageKit.io media library. In addition, you can fine-tune your query by specifying various filters by generating a query string in a Lucene-like syntax and provide this generated string as the value of the `searchQuery`.

### Resource `cache.invalidation`:

- `create_cache_invalidation` (`write`): This API will purge CDN cache and ImageKit.io's internal cache for a file. Note: Purge cache is an asynchronous process and it may take some time to reflect the changes.
- `get_cache_invalidation` (`read`): This API returns the status of a purge cache request.

### Resource `folders`:

- `create_folders` (`write`): This will create a new folder. You can specify the folder name and location of the parent folder where this new folder should be created.
- `delete_folders` (`write`): This will delete a folder and all its contents permanently. The API returns an empty response.
- `copy_folders` (`write`): This will copy one folder into another. The selected folder, its nested folders, files, and their versions (in `includeVersions` is set to true) are copied in this operation. Note: If any file at the destination has the same name as the source file, then the source file and its versions will be appended to the destination file version history.
- `move_folders` (`write`): This will move one folder into another. The selected folder, its nested folders, files, and their versions are moved in this operation. Note: If any file at the destination has the same name as the source file, then the source file and its versions will be appended to the destination file version history.
- `rename_folders` (`write`): This API allows you to rename an existing folder. The folder and all its nested assets and sub-folders will remain unchanged, but their paths will be updated to reflect the new folder name.

### Resource `folders.job`:

- `get_folders_job` (`read`): This API returns the status of a bulk job like copy and move folder operations.

### Resource `accounts.usage`:

- `get_accounts_usage` (`read`): Get the account usage information between two dates. Note that the API response includes data from the start date while excluding data from the end date. In other words, the data covers the period starting from the specified start date up to, but not including, the end date.

### Resource `accounts.origins`:

- `create_accounts_origins` (`write`): **Note:** This API is currently in beta.  
  Creates a new origin and returns the origin object.
- `update_accounts_origins` (`write`): **Note:** This API is currently in beta.  
  Updates the origin identified by `id` and returns the updated origin object.
- `list_accounts_origins` (`read`): **Note:** This API is currently in beta.  
  Returns an array of all configured origins for the current account.
- `delete_accounts_origins` (`write`): **Note:** This API is currently in beta.  
  Permanently removes the origin identified by `id`. If the origin is in use by any URL‑endpoints, the API will return an error.
- `get_accounts_origins` (`read`): **Note:** This API is currently in beta.  
  Retrieves the origin identified by `id`.

### Resource `accounts.urlEndpoints`:

- `create_accounts_url_endpoints` (`write`): **Note:** This API is currently in beta.  
  Creates a new URL‑endpoint and returns the resulting object.
- `update_accounts_url_endpoints` (`write`): **Note:** This API is currently in beta.  
  Updates the URL‑endpoint identified by `id` and returns the updated object.
- `list_accounts_url_endpoints` (`read`): **Note:** This API is currently in beta.  
  Returns an array of all URL‑endpoints configured including the default URL-endpoint generated by ImageKit during account creation.
- `delete_accounts_url_endpoints` (`write`): **Note:** This API is currently in beta.  
  Deletes the URL‑endpoint identified by `id`. You cannot delete the default URL‑endpoint created by ImageKit during account creation.
- `get_accounts_url_endpoints` (`read`): **Note:** This API is currently in beta.  
  Retrieves the URL‑endpoint identified by `id`.

### Resource `beta.v2.files`:

- `upload_v2_beta_files` (`write`): The V2 API enhances security by verifying the entire payload using JWT. This API is in beta.

  ImageKit.io allows you to upload files directly from both the server and client sides. For server-side uploads, private API key authentication is used. For client-side uploads, generate a one-time `token` from your secure backend using private API. [Learn more](/docs/api-reference/upload-file/upload-file-v2#how-to-implement-secure-client-side-file-upload) about how to implement secure client-side file upload.

  **File size limit** \
  On the free plan, the maximum upload file sizes are 20MB for images, audio, and raw files, and 100MB for videos. On the paid plan, these limits increase to 40MB for images, audio, and raw files, and 2GB for videos. These limits can be further increased with higher-tier plans.

  **Version limit** \
  A file can have a maximum of 100 versions.

  **Demo applications**

  - A full-fledged [upload widget using Uppy](https://github.com/imagekit-samples/uppy-uploader), supporting file selections from local storage, URL, Dropbox, Google Drive, Instagram, and more.
  - [Quick start guides](/docs/quick-start-guides) for various frameworks and technologies.
