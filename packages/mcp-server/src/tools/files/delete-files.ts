// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asTextContentResult } from '@imagekit/api-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import ImageKit from '@imagekit/nodejs';

export const metadata: Metadata = {
  resource: 'files',
  operation: 'write',
  tags: [],
  httpMethod: 'delete',
  httpPath: '/v1/files/{fileId}',
  operationId: 'delete-file',
};

export const tool: Tool = {
  name: 'delete_files',
  description:
    'This API deletes the file and all its file versions permanently.\n\nNote: If a file or specific transformation has been requested in the past, then the response is cached. Deleting a file does not purge the cache. You can purge the cache using purge cache API.\n',
  inputSchema: {
    type: 'object',
    properties: {
      fileId: {
        type: 'string',
      },
    },
    required: ['fileId'],
  },
  annotations: {
    idempotentHint: true,
  },
};

export const handler = async (client: ImageKit, args: Record<string, unknown> | undefined) => {
  const { fileId, ...body } = args as any;
  const response = await client.files.delete(fileId).asResponse();
  return asTextContentResult(await response.text());
};

export default { metadata, tool, handler };
