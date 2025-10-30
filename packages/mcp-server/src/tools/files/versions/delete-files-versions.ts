// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { maybeFilter } from '@imagekit/api-mcp/filtering';
import { Metadata, asTextContentResult } from '@imagekit/api-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import ImageKit from '@imagekit/nodejs';

export const metadata: Metadata = {
  resource: 'files.versions',
  operation: 'write',
  tags: [],
  httpMethod: 'delete',
  httpPath: '/v1/files/{fileId}/versions/{versionId}',
  operationId: 'delete-file-version',
};

export const tool: Tool = {
  name: 'delete_files_versions',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nThis API deletes a non-current file version permanently. The API returns an empty response.\n\nNote: If you want to delete all versions of a file, use the delete file API.\n\n\n# Response Schema\n```json\n{\n  $ref: '#/$defs/version_delete_response',\n  $defs: {\n    version_delete_response: {\n      type: 'object',\n      properties: {}\n    }\n  }\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      fileId: {
        type: 'string',
      },
      versionId: {
        type: 'string',
      },
      jq_filter: {
        type: 'string',
        title: 'jq Filter',
        description:
          'A jq filter to apply to the response to include certain fields. Consult the output schema in the tool description to see the fields that are available.\n\nFor example: to include only the `name` field in every object of a results array, you can provide ".results[].name".\n\nFor more information, see the [jq documentation](https://jqlang.org/manual/).',
      },
    },
    required: ['fileId', 'versionId'],
  },
  annotations: {
    idempotentHint: true,
  },
};

export const handler = async (client: ImageKit, args: Record<string, unknown> | undefined) => {
  const { versionId, jq_filter, ...body } = args as any;
  return asTextContentResult(
    await maybeFilter(jq_filter, await client.files.versions.delete(versionId, body)),
  );
};

export default { metadata, tool, handler };
