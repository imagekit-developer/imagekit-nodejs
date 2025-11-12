// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { isJqError, maybeFilter } from '@imagekit/api-mcp/filtering';
import { Metadata, asErrorResult, asTextContentResult } from '@imagekit/api-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import ImageKit from '@imagekit/nodejs';

export const metadata: Metadata = {
  resource: 'files',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/v1/files/move',
  operationId: 'move-file',
};

export const tool: Tool = {
  name: 'move_files',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nThis will move a file and all its versions from one folder to another. \n\nNote: If any file at the destination has the same name as the source file, then the source file and its versions will be appended to the destination file.\n\n\n# Response Schema\n```json\n{\n  $ref: '#/$defs/file_move_response',\n  $defs: {\n    file_move_response: {\n      type: 'object',\n      properties: {}\n    }\n  }\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      destinationPath: {
        type: 'string',
        description: 'Full path to the folder you want to move the above file into.\n',
      },
      sourceFilePath: {
        type: 'string',
        description: 'The full path of the file you want to move.\n',
      },
      jq_filter: {
        type: 'string',
        title: 'jq Filter',
        description:
          'A jq filter to apply to the response to include certain fields. Consult the output schema in the tool description to see the fields that are available.\n\nFor example: to include only the `name` field in every object of a results array, you can provide ".results[].name".\n\nFor more information, see the [jq documentation](https://jqlang.org/manual/).',
      },
    },
    required: ['destinationPath', 'sourceFilePath'],
  },
  annotations: {},
};

export const handler = async (client: ImageKit, args: Record<string, unknown> | undefined) => {
  const { jq_filter, ...body } = args as any;
  try {
    return asTextContentResult(await maybeFilter(jq_filter, await client.files.move(body)));
  } catch (error) {
    if (isJqError(error)) {
      return asErrorResult(error.message);
    }
    throw error;
  }
};

export default { metadata, tool, handler };
