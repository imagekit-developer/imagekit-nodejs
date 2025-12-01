// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { isJqError, maybeFilter } from '@imagekit/api-mcp/filtering';
import { Metadata, asErrorResult, asTextContentResult } from '@imagekit/api-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import ImageKit from '@imagekit/nodejs';

export const metadata: Metadata = {
  resource: 'files.bulk',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/v1/files/batch/deleteByFileIds',
  operationId: 'delete-multiple-files',
};

export const tool: Tool = {
  name: 'delete_files_bulk',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nThis API deletes multiple files and all their file versions permanently.\n\nNote: If a file or specific transformation has been requested in the past, then the response is cached. Deleting a file does not purge the cache. You can purge the cache using purge cache API.\n\nA maximum of 100 files can be deleted at a time.\n\n\n# Response Schema\n```json\n{\n  $ref: '#/$defs/bulk_delete_response',\n  $defs: {\n    bulk_delete_response: {\n      type: 'object',\n      properties: {\n        successfullyDeletedFileIds: {\n          type: 'array',\n          description: 'An array of fileIds that were successfully deleted.\\n',\n          items: {\n            type: 'string'\n          }\n        }\n      }\n    }\n  }\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      fileIds: {
        type: 'array',
        description: 'An array of fileIds which you want to delete.\n',
        items: {
          type: 'string',
        },
      },
      jq_filter: {
        type: 'string',
        title: 'jq Filter',
        description:
          'A jq filter to apply to the response to include certain fields. Consult the output schema in the tool description to see the fields that are available.\n\nFor example: to include only the `name` field in every object of a results array, you can provide ".results[].name".\n\nFor more information, see the [jq documentation](https://jqlang.org/manual/).',
      },
    },
    required: ['fileIds'],
  },
  annotations: {},
};

export const handler = async (client: ImageKit, args: Record<string, unknown> | undefined) => {
  const { jq_filter, ...body } = args as any;
  try {
    return asTextContentResult(await maybeFilter(jq_filter, await client.files.bulk.delete(body)));
  } catch (error) {
    if (error instanceof ImageKit.APIError || isJqError(error)) {
      return asErrorResult(error.message);
    }
    throw error;
  }
};

export default { metadata, tool, handler };
