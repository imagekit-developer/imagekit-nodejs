// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { maybeFilter } from '@imagekit/api-mcp/filtering';
import { Metadata, asTextContentResult } from '@imagekit/api-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import ImageKit from '@imagekit/nodejs';

export const metadata: Metadata = {
  resource: 'folders',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/v1/bulkJobs/renameFolder',
  operationId: 'rename-folder',
};

export const tool: Tool = {
  name: 'rename_folders',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nThis API allows you to rename an existing folder. The folder and all its nested assets and sub-folders will remain unchanged, but their paths will be updated to reflect the new folder name.\n\n\n# Response Schema\n```json\n{\n  $ref: '#/$defs/folder_rename_response',\n  $defs: {\n    folder_rename_response: {\n      type: 'object',\n      title: 'Async Bulk Job Response',\n      description: 'Job submitted successfully. A `jobId` will be returned.',\n      properties: {\n        jobId: {\n          type: 'string',\n          description: 'Unique identifier of the bulk job. This can be used to check the status of the bulk job.\\n'\n        }\n      },\n      required: [        'jobId'\n      ]\n    }\n  }\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      folderPath: {
        type: 'string',
        description: 'The full path to the folder you want to rename.\n',
      },
      newFolderName: {
        type: 'string',
        description:
          'The new name for the folder.\n\nAll characters except alphabets and numbers (inclusive of unicode letters, marks, and numerals in other languages) and `-` will be replaced by an underscore i.e. `_`.\n',
      },
      purgeCache: {
        type: 'boolean',
        description:
          "Option to purge cache for the old nested files and their versions' URLs.\n\nWhen set to true, it will internally issue a purge cache request on CDN to remove the cached content of the old nested files and their versions. There will only be one purge request for all the nested files, which will be counted against your monthly purge quota.\n\nNote: A purge cache request will be issued against `https://ik.imagekit.io/old/folder/path*` (with a wildcard at the end). This will remove all nested files, their versions' URLs, and any transformations made using query parameters on these files or their versions. However, the cache for file transformations made using path parameters will persist. You can purge them using the purge API. For more details, refer to the purge API documentation.\n\nDefault value - `false`\n",
      },
      jq_filter: {
        type: 'string',
        title: 'jq Filter',
        description:
          'A jq filter to apply to the response to include certain fields. Consult the output schema in the tool description to see the fields that are available.\n\nFor example: to include only the `name` field in every object of a results array, you can provide ".results[].name".\n\nFor more information, see the [jq documentation](https://jqlang.org/manual/).',
      },
    },
    required: ['folderPath', 'newFolderName'],
  },
  annotations: {},
};

export const handler = async (client: ImageKit, args: Record<string, unknown> | undefined) => {
  const { jq_filter, ...body } = args as any;
  return asTextContentResult(await maybeFilter(jq_filter, await client.folders.rename(body)));
};

export default { metadata, tool, handler };
