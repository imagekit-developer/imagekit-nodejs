// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asTextContentResult } from '@imagekit/api-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import ImageKit from '@imagekit/nodejs';

export const metadata: Metadata = {
  resource: 'accounts.origins',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/v1/accounts/origins',
  operationId: 'list-origins',
};

export const tool: Tool = {
  name: 'list_accounts_origins',
  description:
    '**Note:** This API is currently in beta.  \nReturns an array of all configured origins for the current account.\n',
  inputSchema: {
    type: 'object',
    properties: {},
    required: [],
  },
  annotations: {
    readOnlyHint: true,
  },
};

export const handler = async (client: ImageKit, args: Record<string, unknown> | undefined) => {
  return asTextContentResult(await client.accounts.origins.list());
};

export default { metadata, tool, handler };
