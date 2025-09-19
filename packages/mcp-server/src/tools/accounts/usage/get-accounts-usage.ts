// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { maybeFilter } from 'imagekit-api-mcp/filtering';
import { Metadata, asTextContentResult } from 'imagekit-api-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import ImageKit from '@imagekit/nodejs';

export const metadata: Metadata = {
  resource: 'accounts.usage',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/v1/accounts/usage',
  operationId: 'get-usage',
};

export const tool: Tool = {
  name: 'get_accounts_usage',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nGet the account usage information between two dates. Note that the API response includes data from the start date while excluding data from the end date. In other words, the data covers the period starting from the specified start date up to, but not including, the end date.\n\n\n# Response Schema\n```json\n{\n  type: 'object',\n  properties: {\n    bandwidthBytes: {\n      type: 'integer',\n      description: 'Amount of bandwidth used in bytes.'\n    },\n    extensionUnitsCount: {\n      type: 'integer',\n      description: 'Number of extension units used.'\n    },\n    mediaLibraryStorageBytes: {\n      type: 'integer',\n      description: 'Storage used by media library in bytes.'\n    },\n    originalCacheStorageBytes: {\n      type: 'integer',\n      description: 'Storage used by the original cache in bytes.'\n    },\n    videoProcessingUnitsCount: {\n      type: 'integer',\n      description: 'Number of video processing units used.'\n    }\n  }\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      endDate: {
        type: 'string',
        description:
          'Specify a `endDate` in `YYYY-MM-DD` format. It should be after the `startDate`. The difference between `startDate` and `endDate` should be less than 90 days.',
        format: 'date',
      },
      startDate: {
        type: 'string',
        description:
          'Specify a `startDate` in `YYYY-MM-DD` format. It should be before the `endDate`. The difference between `startDate` and `endDate` should be less than 90 days.',
        format: 'date',
      },
      jq_filter: {
        type: 'string',
        title: 'jq Filter',
        description:
          'A jq filter to apply to the response to include certain fields. Consult the output schema in the tool description to see the fields that are available.\n\nFor example: to include only the `name` field in every object of a results array, you can provide ".results[].name".\n\nFor more information, see the [jq documentation](https://jqlang.org/manual/).',
      },
    },
    required: ['endDate', 'startDate'],
  },
  annotations: {
    readOnlyHint: true,
  },
};

export const handler = async (client: ImageKit, args: Record<string, unknown> | undefined) => {
  const { jq_filter, ...body } = args as any;
  return asTextContentResult(await maybeFilter(jq_filter, await client.accounts.usage.get(body)));
};

export default { metadata, tool, handler };
