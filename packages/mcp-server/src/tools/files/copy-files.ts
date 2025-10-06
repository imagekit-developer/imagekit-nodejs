// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { maybeFilter } from '@imagekit/api-mcp/filtering';
import { Metadata, asTextContentResult } from '@imagekit/api-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import ImageKit from '@imagekit/nodejs';

export const metadata: Metadata = {
  resource: 'files',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/v1/files/copy',
  operationId: 'copy-file',
};

export const tool: Tool = {
  name: 'copy_files',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nThis will copy a file from one folder to another. \n\nNote: If any file at the destination has the same name as the source file, then the source file and its versions (if `includeFileVersions` is set to true) will be appended to the destination file version history.\n\n\n# Response Schema\n```json\n{\n  type: 'object',\n  properties: {}\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      destinationPath: {
        type: 'string',
        description: 'Full path to the folder you want to copy the above file into.\n',
      },
      sourceFilePath: {
        type: 'string',
        description: 'The full path of the file you want to copy.\n',
      },
      includeFileVersions: {
        type: 'boolean',
        description:
          'Option to copy all versions of a file. By default, only the current version of the file is copied. When set to true, all versions of the file will be copied. Default value - `false`.\n',
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
  return asTextContentResult(await maybeFilter(jq_filter, await client.files.copy(body)));
};

export default { metadata, tool, handler };
