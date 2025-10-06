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
  httpPath: '/v1/folder',
  operationId: 'create-folder',
};

export const tool: Tool = {
  name: 'create_folders',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nThis will create a new folder. You can specify the folder name and location of the parent folder where this new folder should be created.\n\n\n# Response Schema\n```json\n{\n  type: 'object',\n  properties: {}\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      folderName: {
        type: 'string',
        description:
          'The folder will be created with this name. \n\nAll characters except alphabets and numbers (inclusive of unicode letters, marks, and numerals in other languages) will be replaced by an underscore i.e. `_`.\n',
      },
      parentFolderPath: {
        type: 'string',
        description:
          "The folder where the new folder should be created, for root use `/` else the path e.g. `containing/folder/`.\n\nNote: If any folder(s) is not present in the parentFolderPath parameter, it will be automatically created. For example, if you pass `/product/images/summer`, then `product`, `images`, and `summer` folders will be created if they don't already exist.\n",
      },
      jq_filter: {
        type: 'string',
        title: 'jq Filter',
        description:
          'A jq filter to apply to the response to include certain fields. Consult the output schema in the tool description to see the fields that are available.\n\nFor example: to include only the `name` field in every object of a results array, you can provide ".results[].name".\n\nFor more information, see the [jq documentation](https://jqlang.org/manual/).',
      },
    },
    required: ['folderName', 'parentFolderPath'],
  },
  annotations: {},
};

export const handler = async (client: ImageKit, args: Record<string, unknown> | undefined) => {
  const { jq_filter, ...body } = args as any;
  return asTextContentResult(await maybeFilter(jq_filter, await client.folders.create(body)));
};

export default { metadata, tool, handler };
