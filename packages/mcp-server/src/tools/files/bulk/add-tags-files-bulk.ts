// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { maybeFilter } from '@imagekit/api-mcp/filtering';
import { Metadata, asTextContentResult } from '@imagekit/api-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import ImageKit from '@imagekit/nodejs';

export const metadata: Metadata = {
  resource: 'files.bulk',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/v1/files/addTags',
  operationId: 'add-tags-bulk',
};

export const tool: Tool = {
  name: 'add_tags_files_bulk',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nThis API adds tags to multiple files in bulk. A maximum of 50 files can be specified at a time.\n\n\n# Response Schema\n```json\n{\n  $ref: '#/$defs/bulk_add_tags_response',\n  $defs: {\n    bulk_add_tags_response: {\n      type: 'object',\n      properties: {\n        successfullyUpdatedFileIds: {\n          type: 'array',\n          description: 'An array of fileIds that in which tags were successfully added.\\n',\n          items: {\n            type: 'string'\n          }\n        }\n      }\n    }\n  }\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      fileIds: {
        type: 'array',
        description: 'An array of fileIds to which you want to add tags.\n',
        items: {
          type: 'string',
        },
      },
      tags: {
        type: 'array',
        description: 'An array of tags that you want to add to the files.\n',
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
    required: ['fileIds', 'tags'],
  },
  annotations: {},
};

export const handler = async (client: ImageKit, args: Record<string, unknown> | undefined) => {
  const { jq_filter, ...body } = args as any;
  return asTextContentResult(await maybeFilter(jq_filter, await client.files.bulk.addTags(body)));
};

export default { metadata, tool, handler };
