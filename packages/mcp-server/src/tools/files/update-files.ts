// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asErrorResult, asTextContentResult } from '@imagekit/api-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import ImageKit from '@imagekit/nodejs';

export const metadata: Metadata = {
  resource: 'files',
  operation: 'write',
  tags: [],
  httpMethod: 'patch',
  httpPath: '/v1/files/{fileId}/details',
  operationId: 'update-file-details',
};

export const tool: Tool = {
  name: 'update_files',
  description:
    'This API updates the details or attributes of the current version of the file. You can update `tags`, `customCoordinates`, `customMetadata`, publication status, remove existing `AITags` and apply extensions using this API.\n',
  inputSchema: {
    type: 'object',
    anyOf: [
      {
        type: 'object',
        properties: {
          fileId: {
            type: 'string',
          },
          customCoordinates: {
            type: 'string',
            description:
              'Define an important area in the image in the format `x,y,width,height` e.g. `10,10,100,100`. Send `null` to unset this value.\n',
          },
          customMetadata: {
            type: 'object',
            description:
              'A key-value data to be associated with the asset. To unset a key, send `null` value for that key. Before setting any custom metadata on an asset you have to create the field using custom metadata fields API.\n',
            additionalProperties: true,
          },
          description: {
            type: 'string',
            description: 'Optional text to describe the contents of the file.\n',
          },
          extensions: {
            $ref: '#/$defs/extensions',
          },
          removeAITags: {
            anyOf: [
              {
                type: 'array',
                items: {
                  type: 'string',
                },
              },
              {
                type: 'string',
                enum: ['all'],
              },
            ],
            description:
              'An array of AITags associated with the file that you want to remove, e.g. `["car", "vehicle", "motorsports"]`. \n\nIf you want to remove all AITags associated with the file, send a string - "all".\n\nNote: The remove operation for `AITags` executes before any of the `extensions` are processed.\n',
          },
          tags: {
            type: 'array',
            description:
              'An array of tags associated with the file, such as `["tag1", "tag2"]`. Send `null` to unset all tags associated with the file.\n',
            items: {
              type: 'string',
            },
          },
          webhookUrl: {
            type: 'string',
            description:
              'The final status of extensions after they have completed execution will be delivered to this endpoint as a POST request. [Learn more](/docs/api-reference/digital-asset-management-dam/managing-assets/update-file-details#webhook-payload-structure) about the webhook payload structure.\n',
          },
        },
        required: ['fileId'],
      },
      {
        type: 'object',
        properties: {
          fileId: {
            type: 'string',
          },
          publish: {
            type: 'object',
            description: 'Configure the publication status of a file and its versions.\n',
            properties: {
              isPublished: {
                type: 'boolean',
                description: 'Set to `true` to publish the file. Set to `false` to unpublish the file.\n',
              },
              includeFileVersions: {
                type: 'boolean',
                description:
                  'Set to `true` to publish/unpublish all versions of the file. Set to `false` to publish/unpublish only the current version of the file.\n',
              },
            },
            required: ['isPublished'],
          },
        },
        required: ['fileId'],
      },
    ],
    $defs: {
      extensions: {
        type: 'array',
        title: 'Extensions Array',
        description:
          'Array of extensions to be applied to the asset. Each extension can be configured with specific parameters based on the extension type.\n',
        items: {
          anyOf: [
            {
              type: 'object',
              title: 'Remove background',
              properties: {
                name: {
                  type: 'string',
                  description: 'Specifies the background removal extension.',
                  enum: ['remove-bg'],
                },
                options: {
                  type: 'object',
                  properties: {
                    add_shadow: {
                      type: 'boolean',
                      description:
                        'Whether to add an artificial shadow to the result. Default is false. Note: Adding shadows is currently only supported for car photos.\n',
                    },
                    bg_color: {
                      type: 'string',
                      description:
                        'Specifies a solid color background using hex code (e.g., "81d4fa", "fff") or color name (e.g., "green"). If this parameter is set, `bg_image_url` must be empty.\n',
                    },
                    bg_image_url: {
                      type: 'string',
                      description:
                        'Sets a background image from a URL. If this parameter is set, `bg_color` must be empty.\n',
                    },
                    semitransparency: {
                      type: 'boolean',
                      description:
                        'Allows semi-transparent regions in the result. Default is true. Note: Semitransparency is currently only supported for car windows.\n',
                    },
                  },
                },
              },
              required: ['name'],
            },
            {
              type: 'object',
              title: 'Auto tagging',
              properties: {
                maxTags: {
                  type: 'integer',
                  description: 'Maximum number of tags to attach to the asset.',
                },
                minConfidence: {
                  type: 'integer',
                  description: 'Minimum confidence level for tags to be considered valid.',
                },
                name: {
                  type: 'string',
                  description: 'Specifies the auto-tagging extension used.',
                  enum: ['google-auto-tagging', 'aws-auto-tagging'],
                },
              },
              required: ['maxTags', 'minConfidence', 'name'],
            },
            {
              type: 'object',
              title: 'Auto description',
              properties: {
                name: {
                  type: 'string',
                  description: 'Specifies the auto description extension.',
                  enum: ['ai-auto-description'],
                },
              },
              required: ['name'],
            },
          ],
        },
      },
    },
  },
  annotations: {},
};

export const handler = async (client: ImageKit, args: Record<string, unknown> | undefined) => {
  const { fileId, ...body } = args as any;
  try {
    return asTextContentResult(await client.files.update(fileId, body));
  } catch (error) {
    if (error instanceof ImageKit.APIError) {
      return asErrorResult(error.message);
    }
    throw error;
  }
};

export default { metadata, tool, handler };
