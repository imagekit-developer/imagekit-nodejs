// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { maybeFilter } from '@imagekit/nodejs-mcp/filtering';
import { Metadata, asTextContentResult } from '@imagekit/nodejs-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import ImageKit from '@imagekit/nodejs';

export const metadata: Metadata = {
  resource: 'files.versions',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/v1/files/{fileId}/versions/{versionId}',
  operationId: 'get-file-version-details',
};

export const tool: Tool = {
  name: 'get_files_versions',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nThis API returns an object with details or attributes of a file version.\n\n# Response Schema\n```json\n{\n  $ref: '#/$defs/file',\n  $defs: {\n    file: {\n      type: 'object',\n      title: 'File & File Version',\n      description: 'Object containing details of a file or file version.',\n      properties: {\n        AITags: {\n          type: 'array',\n          description: 'An array of tags assigned to the file by auto tagging.\\n',\n          items: {\n            type: 'object',\n            properties: {\n              confidence: {\n                type: 'number',\n                description: 'Confidence score of the tag.'\n              },\n              name: {\n                type: 'string',\n                description: 'Name of the tag.'\n              },\n              source: {\n                type: 'string',\n                description: 'Source of the tag. Possible values are `google-auto-tagging` and `aws-auto-tagging`.'\n              }\n            }\n          }\n        },\n        createdAt: {\n          type: 'string',\n          description: 'Date and time when the file was uploaded. The date and time is in ISO8601 format.\\n',\n          format: 'date-time'\n        },\n        customCoordinates: {\n          type: 'string',\n          description: 'An string with custom coordinates of the file.\\n'\n        },\n        customMetadata: {\n          type: 'object',\n          description: 'An object with custom metadata for the file.\\n',\n          additionalProperties: true\n        },\n        description: {\n          type: 'string',\n          description: 'Optional text to describe the contents of the file. Can be set by the user or the ai-auto-description extension.\\n'\n        },\n        fileId: {\n          type: 'string',\n          description: 'Unique identifier of the asset.'\n        },\n        filePath: {\n          type: 'string',\n          description: 'Path of the file. This is the path you would use in the URL to access the file. For example, if the file is at the root of the media library, the path will be `/file.jpg`. If the file is inside a folder named `images`, the path will be `/images/file.jpg`.\\n'\n        },\n        fileType: {\n          type: 'string',\n          description: 'Type of the file. Possible values are `image`, `non-image`.\\n'\n        },\n        hasAlpha: {\n          type: 'boolean',\n          description: 'Specifies if the image has an alpha channel.\\n'\n        },\n        height: {\n          type: 'number',\n          description: 'Height of the file.\\n'\n        },\n        isPrivateFile: {\n          type: 'boolean',\n          description: 'Specifies if the file is private or not.\\n'\n        },\n        isPublished: {\n          type: 'boolean',\n          description: 'Specifies if the file is published or not.\\n'\n        },\n        mime: {\n          type: 'string',\n          description: 'MIME type of the file.\\n'\n        },\n        name: {\n          type: 'string',\n          description: 'Name of the asset.'\n        },\n        selectedFieldsSchema: {\n          type: 'object',\n          description: 'This field is included in the response only if the Path policy feature is available in the plan.\\nIt contains schema definitions for the custom metadata fields selected for the specified file path.\\nField selection can only be done when the Path policy feature is enabled.\\n\\nKeys are the names of the custom metadata fields; the value object has details about the custom metadata schema.\\n',\n          additionalProperties: true\n        },\n        size: {\n          type: 'number',\n          description: 'Size of the file in bytes.\\n'\n        },\n        tags: {\n          type: 'array',\n          description: 'An array of tags assigned to the file. Tags are used to search files in the media library.\\n',\n          items: {\n            type: 'string'\n          }\n        },\n        thumbnail: {\n          type: 'string',\n          description: 'URL of the thumbnail image. This URL is used to access the thumbnail image of the file in the media library.\\n'\n        },\n        type: {\n          type: 'string',\n          description: 'Type of the asset.',\n          enum: [            'file',\n            'file-version'\n          ]\n        },\n        updatedAt: {\n          type: 'string',\n          description: 'Date and time when the file was last updated. The date and time is in ISO8601 format.\\n',\n          format: 'date-time'\n        },\n        url: {\n          type: 'string',\n          description: 'URL of the file.\\n'\n        },\n        versionInfo: {\n          type: 'object',\n          description: 'An object with details of the file version.\\n',\n          properties: {\n            id: {\n              type: 'string',\n              description: 'Unique identifier of the file version.'\n            },\n            name: {\n              type: 'string',\n              description: 'Name of the file version.'\n            }\n          }\n        },\n        width: {\n          type: 'number',\n          description: 'Width of the file.\\n'\n        }\n      }\n    }\n  }\n}\n```",
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
    readOnlyHint: true,
  },
};

export const handler = async (client: ImageKit, args: Record<string, unknown> | undefined) => {
  const { versionId, jq_filter, ...body } = args as any;
  return asTextContentResult(await maybeFilter(jq_filter, await client.files.versions.get(versionId, body)));
};

export default { metadata, tool, handler };
