// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { maybeFilter } from '@imagekit/nodejs-mcp/filtering';
import { Metadata, asTextContentResult } from '@imagekit/nodejs-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import ImageKit from '@imagekit/nodejs';

export const metadata: Metadata = {
  resource: 'cache.invalidation',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/v1/files/purge',
  operationId: 'purge-cache',
};

export const tool: Tool = {
  name: 'create_cache_invalidation',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nThis API will purge CDN cache and ImageKit.io's internal cache for a file.  Note: Purge cache is an asynchronous process and it may take some time to reflect the changes.\n\n\n# Response Schema\n```json\n{\n  type: 'object',\n  properties: {\n    requestId: {\n      type: 'string',\n      description: 'Unique identifier of the purge request. This can be used to check the status of the purge request.\\n'\n    }\n  }\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      url: {
        type: 'string',
        description: 'The full URL of the file to be purged.\n',
      },
      jq_filter: {
        type: 'string',
        title: 'jq Filter',
        description:
          'A jq filter to apply to the response to include certain fields. Consult the output schema in the tool description to see the fields that are available.\n\nFor example: to include only the `name` field in every object of a results array, you can provide ".results[].name".\n\nFor more information, see the [jq documentation](https://jqlang.org/manual/).',
      },
    },
    required: ['url'],
  },
  annotations: {},
};

export const handler = async (client: ImageKit, args: Record<string, unknown> | undefined) => {
  const { jq_filter, ...body } = args as any;
  return asTextContentResult(await maybeFilter(jq_filter, await client.cache.invalidation.create(body)));
};

export default { metadata, tool, handler };
