// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { maybeFilter } from '@imagekit/api-mcp/filtering';
import { Metadata, asTextContentResult } from '@imagekit/api-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import ImageKit from '@imagekit/nodejs';

export const metadata: Metadata = {
  resource: 'files',
  operation: 'write',
  tags: [],
  httpMethod: 'put',
  httpPath: '/v1/files/rename',
  operationId: 'rename-file',
};

export const tool: Tool = {
  name: 'rename_files',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nYou can rename an already existing file in the media library using rename file API. This operation would rename all file versions of the file. \n\nNote: The old URLs will stop working. The file/file version URLs cached on CDN will continue to work unless a purge is requested.\n\n\n# Response Schema\n```json\n{\n  $ref: '#/$defs/file_rename_response',\n  $defs: {\n    file_rename_response: {\n      type: 'object',\n      properties: {\n        purgeRequestId: {\n          type: 'string',\n          description: 'Unique identifier of the purge request. This can be used to check the status of the purge request.\\n'\n        }\n      }\n    }\n  }\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      filePath: {
        type: 'string',
        description: 'The full path of the file you want to rename.\n',
      },
      newFileName: {
        type: 'string',
        description:
          'The new name of the file. A filename can contain:\n\nAlphanumeric Characters: `a-z`, `A-Z`, `0-9` (including Unicode letters, marks, and numerals in other languages).\nSpecial Characters: `.`, `_`, and `-`.\n\nAny other character, including space, will be replaced by `_`.\n',
      },
      purgeCache: {
        type: 'boolean',
        description:
          "Option to purge cache for the old file and its versions' URLs.\n\nWhen set to true, it will internally issue a purge cache request on CDN to remove cached content of old file and its versions. This purge request is counted against your monthly purge quota.\n\nNote: If the old file were accessible at `https://ik.imagekit.io/demo/old-filename.jpg`, a purge cache request would be issued against `https://ik.imagekit.io/demo/old-filename.jpg*` (with a wildcard at the end). It will remove the file and its versions' URLs and any transformations made using query parameters on this file or its versions. However, the cache for file transformations made using path parameters will persist. You can purge them using the purge API. For more details, refer to the purge API documentation.\n\n\n\nDefault value - `false`\n",
      },
      jq_filter: {
        type: 'string',
        title: 'jq Filter',
        description:
          'A jq filter to apply to the response to include certain fields. Consult the output schema in the tool description to see the fields that are available.\n\nFor example: to include only the `name` field in every object of a results array, you can provide ".results[].name".\n\nFor more information, see the [jq documentation](https://jqlang.org/manual/).',
      },
    },
    required: ['filePath', 'newFileName'],
  },
  annotations: {
    idempotentHint: true,
  },
};

export const handler = async (client: ImageKit, args: Record<string, unknown> | undefined) => {
  const { jq_filter, ...body } = args as any;
  return asTextContentResult(await maybeFilter(jq_filter, await client.files.rename(body)));
};

export default { metadata, tool, handler };
