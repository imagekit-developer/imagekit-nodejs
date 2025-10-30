// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { maybeFilter } from '@imagekit/api-mcp/filtering';
import { Metadata, asTextContentResult } from '@imagekit/api-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import ImageKit from '@imagekit/nodejs';

export const metadata: Metadata = {
  resource: 'folders',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/v1/bulkJobs/copyFolder',
  operationId: 'copy-folder',
};

export const tool: Tool = {
  name: 'copy_folders',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nThis will copy one folder into another. The selected folder, its nested folders, files, and their versions (in `includeVersions` is set to true) are copied in this operation. Note: If any file at the destination has the same name as the source file, then the source file and its versions will be appended to the destination file version history.\n\n\n# Response Schema\n```json\n{\n  $ref: '#/$defs/folder_copy_response',\n  $defs: {\n    folder_copy_response: {\n      type: 'object',\n      title: 'Async Bulk Job Response',\n      description: 'Job submitted successfully. A `jobId` will be returned.',\n      properties: {\n        jobId: {\n          type: 'string',\n          description: 'Unique identifier of the bulk job. This can be used to check the status of the bulk job.\\n'\n        }\n      },\n      required: [        'jobId'\n      ]\n    }\n  }\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      destinationPath: {
        type: 'string',
        description: 'Full path to the destination folder where you want to copy the source folder into.\n',
      },
      sourceFolderPath: {
        type: 'string',
        description: 'The full path to the source folder you want to copy.\n',
      },
      includeVersions: {
        type: 'boolean',
        description:
          'Option to copy all versions of files that are nested inside the selected folder. By default, only the current version of each file will be copied. When set to true, all versions of each file will be copied. Default value - `false`.\n',
      },
      jq_filter: {
        type: 'string',
        title: 'jq Filter',
        description:
          'A jq filter to apply to the response to include certain fields. Consult the output schema in the tool description to see the fields that are available.\n\nFor example: to include only the `name` field in every object of a results array, you can provide ".results[].name".\n\nFor more information, see the [jq documentation](https://jqlang.org/manual/).',
      },
    },
    required: ['destinationPath', 'sourceFolderPath'],
  },
  annotations: {},
};

export const handler = async (client: ImageKit, args: Record<string, unknown> | undefined) => {
  const { jq_filter, ...body } = args as any;
  return asTextContentResult(await maybeFilter(jq_filter, await client.folders.copy(body)));
};

export default { metadata, tool, handler };
