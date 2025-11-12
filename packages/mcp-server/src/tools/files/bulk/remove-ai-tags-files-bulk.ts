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
  httpPath: '/v1/files/removeAITags',
  operationId: 'remove-ai-tags-bulk',
};

export const tool: Tool = {
  name: 'remove_ai_tags_files_bulk',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nThis API removes AITags from multiple files in bulk. A maximum of 50 files can be specified at a time.\n\n\n# Response Schema\n```json\n{\n  $ref: '#/$defs/bulk_remove_ai_tags_response',\n  $defs: {\n    bulk_remove_ai_tags_response: {\n      type: 'object',\n      properties: {\n        successfullyUpdatedFileIds: {\n          type: 'array',\n          description: 'An array of fileIds that in which AITags were successfully removed.\\n',\n          items: {\n            type: 'string'\n          }\n        }\n      }\n    }\n  }\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      AITags: {
        type: 'array',
        description: 'An array of AITags that you want to remove from the files.\n',
        items: {
          type: 'string',
        },
      },
      fileIds: {
        type: 'array',
        description: 'An array of fileIds from which you want to remove AITags.\n',
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
    required: ['AITags', 'fileIds'],
  },
  annotations: {},
};

export const handler = async (client: ImageKit, args: Record<string, unknown> | undefined) => {
  const { jq_filter, ...body } = args as any;
  try {
    return asTextContentResult(await maybeFilter(jq_filter, await client.files.bulk.removeAITags(body)));
  } catch (error) {
    if (isJqError(error)) {
      return asErrorResult(error.message);
    }
    throw error;
  }
};

export default { metadata, tool, handler };
