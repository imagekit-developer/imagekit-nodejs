// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { isJqError, maybeFilter } from '@imagekit/api-mcp/filtering';
import { Metadata, asErrorResult, asTextContentResult } from '@imagekit/api-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import ImageKit from '@imagekit/nodejs';

export const metadata: Metadata = {
  resource: 'cache.invalidation',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/v1/files/purge/{requestId}',
  operationId: 'purge-status',
};

export const tool: Tool = {
  name: 'get_cache_invalidation',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nThis API returns the status of a purge cache request.\n\n\n# Response Schema\n```json\n{\n  $ref: '#/$defs/invalidation_get_response',\n  $defs: {\n    invalidation_get_response: {\n      type: 'object',\n      properties: {\n        status: {\n          type: 'string',\n          description: 'Status of the purge request.',\n          enum: [            'Pending',\n            'Completed'\n          ]\n        }\n      }\n    }\n  }\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      requestId: {
        type: 'string',
      },
      jq_filter: {
        type: 'string',
        title: 'jq Filter',
        description:
          'A jq filter to apply to the response to include certain fields. Consult the output schema in the tool description to see the fields that are available.\n\nFor example: to include only the `name` field in every object of a results array, you can provide ".results[].name".\n\nFor more information, see the [jq documentation](https://jqlang.org/manual/).',
      },
    },
    required: ['requestId'],
  },
  annotations: {
    readOnlyHint: true,
  },
};

export const handler = async (client: ImageKit, args: Record<string, unknown> | undefined) => {
  const { requestId, jq_filter, ...body } = args as any;
  try {
    return asTextContentResult(await maybeFilter(jq_filter, await client.cache.invalidation.get(requestId)));
  } catch (error) {
    if (error instanceof ImageKit.APIError || isJqError(error)) {
      return asErrorResult(error.message);
    }
    throw error;
  }
};

export default { metadata, tool, handler };
