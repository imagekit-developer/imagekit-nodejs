// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asTextContentResult } from 'imagekit-api-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import ImageKit from '@imagekit/nodejs';

export const metadata: Metadata = {
  resource: 'beta.v2.files',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/api/v2/files/upload',
  operationId: 'upload-file-v2',
};

export const tool: Tool = {
  name: 'upload_v2_beta_files',
  description:
    'The V2 API enhances security by verifying the entire payload using JWT. This API is in beta.\n\nImageKit.io allows you to upload files directly from both the server and client sides. For server-side uploads, private API key authentication is used. For client-side uploads, generate a one-time `token` from your secure backend using private API. [Learn more](/docs/api-reference/upload-file/upload-file-v2#how-to-implement-secure-client-side-file-upload) about how to implement secure client-side file upload.\n\n**File size limit** \\\nOn the free plan, the maximum upload file sizes are 20MB for images, audio, and raw files, and 100MB for videos. On the paid plan, these limits increase to 40MB for images, audio, and raw files, and 2GB for videos. These limits can be further increased with higher-tier plans.\n\n**Version limit** \\\nA file can have a maximum of 100 versions.\n\n**Demo applications**\n\n- A full-fledged [upload widget using Uppy](https://github.com/imagekit-samples/uppy-uploader), supporting file selections from local storage, URL, Dropbox, Google Drive, Instagram, and more.\n- [Quick start guides](/docs/quick-start-guides) for various frameworks and technologies.\n',
  inputSchema: {
    type: 'object',
    properties: {
      file: {
        type: 'string',
        description:
          'The API accepts any of the following:\n\n- **Binary data** – send the raw bytes as `multipart/form-data`.\n- **HTTP / HTTPS URL** – a publicly reachable URL that ImageKit’s servers can fetch.\n- **Base64 string** – the file encoded as a Base64 data URI or plain Base64.\n\nWhen supplying a URL, the server must receive the response headers within 8 seconds; otherwise the request fails with 400 Bad Request.\n',
      },
      fileName: {
        type: 'string',
        description: 'The name with which the file has to be uploaded.\n',
      },
      token: {
        type: 'string',
        description:
          "This is the client-generated JSON Web Token (JWT). The ImageKit.io server uses it to authenticate and check that the upload request parameters have not been tampered with after the token has been generated. Learn how to create the token on the page below. This field is only required for authentication when uploading a file from the client side.\n\n\n**Note**: Sending a JWT that has been used in the past will result in a validation error. Even if your previous request resulted in an error, you should always send a new token.\n\n\n**⚠️Warning**: JWT must be generated on the server-side because it is generated using your account's private API key. This field is required for authentication when uploading a file from the client-side.\n",
      },
      checks: {
        type: 'string',
        description:
          'Server-side checks to run on the asset.\nRead more about [Upload API checks](/docs/api-reference/upload-file/upload-file-v2#upload-api-checks).\n',
      },
      customCoordinates: {
        type: 'string',
        description:
          'Define an important area in the image. This is only relevant for image type files.\n\n  - To be passed as a string with the x and y coordinates of the top-left corner, and width and height of the area of interest in the format `x,y,width,height`. For example - `10,10,100,100`\n  - Can be used with fo-customtransformation.\n  - If this field is not specified and the file is overwritten, then customCoordinates will be removed.\n',
      },
      customMetadata: {
        type: 'object',
        description:
          'JSON key-value pairs to associate with the asset. Create the custom metadata fields before setting these values.\n',
        additionalProperties: true,
      },
      description: {
        type: 'string',
        description: 'Optional text to describe the contents of the file.\n',
      },
      extensions: {
        $ref: '#/$defs/extensions',
      },
      folder: {
        type: 'string',
        description:
          "The folder path in which the image has to be uploaded. If the folder(s) didn't exist before, a new folder(s) is created. Using multiple `/` creates a nested folder.\n",
      },
      isPrivateFile: {
        type: 'boolean',
        description:
          'Whether to mark the file as private or not.\n\nIf `true`, the file is marked as private and is accessible only using named transformation or signed URL.\n',
      },
      isPublished: {
        type: 'boolean',
        description:
          'Whether to upload file as published or not.\n\nIf `false`, the file is marked as unpublished, which restricts access to the file only via the media library. Files in draft or unpublished state can only be publicly accessed after being published.\n\nThe option to upload in draft state is only available in custom enterprise pricing plans.\n',
      },
      overwriteAITags: {
        type: 'boolean',
        description:
          'If set to `true` and a file already exists at the exact location, its AITags will be removed. Set `overwriteAITags` to `false` to preserve AITags.\n',
      },
      overwriteCustomMetadata: {
        type: 'boolean',
        description:
          'If the request does not have `customMetadata`, and a file already exists at the exact location, existing customMetadata will be removed.\n',
      },
      overwriteFile: {
        type: 'boolean',
        description:
          'If `false` and `useUniqueFileName` is also `false`, and a file already exists at the exact location, upload API will return an error immediately.\n',
      },
      overwriteTags: {
        type: 'boolean',
        description:
          'If the request does not have `tags`, and a file already exists at the exact location, existing tags will be removed.\n',
      },
      responseFields: {
        type: 'array',
        description: 'Array of response field keys to include in the API response body.\n',
        items: {
          type: 'string',
          enum: [
            'tags',
            'customCoordinates',
            'isPrivateFile',
            'embeddedMetadata',
            'isPublished',
            'customMetadata',
            'metadata',
            'selectedFieldsSchema',
          ],
        },
      },
      tags: {
        type: 'array',
        description:
          'Set the tags while uploading the file.\nProvide an array of tag strings (e.g. `["tag1", "tag2", "tag3"]`). The combined length of all tag characters must not exceed 500, and the `%` character is not allowed.\nIf this field is not specified and the file is overwritten, the existing tags will be removed.\n',
        items: {
          type: 'string',
        },
      },
      transformation: {
        type: 'object',
        description:
          "Configure pre-processing (`pre`) and post-processing (`post`) transformations.\n\n- `pre` — applied before the file is uploaded to the Media Library.  \n  Useful for reducing file size or applying basic optimizations upfront (e.g., resize, compress).\n\n- `post` — applied immediately after upload.  \n  Ideal for generating transformed versions (like video encodes or thumbnails) in advance, so they're ready for delivery without delay.\n\nYou can mix and match any combination of post-processing types.\n",
        properties: {
          post: {
            type: 'array',
            description:
              'List of transformations to apply *after* the file is uploaded.  \nEach item must match one of the following types:\n`transformation`, `gif-to-video`, `thumbnail`, `abs`.\n',
            items: {
              anyOf: [
                {
                  type: 'object',
                  title: 'Simple post-transformation',
                  properties: {
                    type: {
                      type: 'string',
                      description: 'Transformation type.',
                      enum: ['transformation'],
                    },
                    value: {
                      type: 'string',
                      description:
                        'Transformation string (e.g. `w-200,h-200`).  \nSame syntax as ImageKit URL-based transformations.\n',
                    },
                  },
                  required: ['type', 'value'],
                },
                {
                  type: 'object',
                  title: 'Convert GIF to video',
                  properties: {
                    type: {
                      type: 'string',
                      description: 'Converts an animated GIF into an MP4.',
                      enum: ['gif-to-video'],
                    },
                    value: {
                      type: 'string',
                      description:
                        'Optional transformation string to apply to the output video.  \n**Example**: `q-80`\n',
                    },
                  },
                  required: ['type'],
                },
                {
                  type: 'object',
                  title: 'Generate a thumbnail',
                  properties: {
                    type: {
                      type: 'string',
                      description: 'Generates a thumbnail image.',
                      enum: ['thumbnail'],
                    },
                    value: {
                      type: 'string',
                      description: 'Optional transformation string.  \n**Example**: `w-150,h-150`\n',
                    },
                  },
                  required: ['type'],
                },
                {
                  type: 'object',
                  title: 'Adaptive Bitrate Streaming',
                  properties: {
                    protocol: {
                      type: 'string',
                      description: 'Streaming protocol to use (`hls` or `dash`).',
                      enum: ['hls', 'dash'],
                    },
                    type: {
                      type: 'string',
                      description: 'Adaptive Bitrate Streaming (ABS) setup.',
                      enum: ['abs'],
                    },
                    value: {
                      type: 'string',
                      description:
                        'List of different representations you want to create separated by an underscore.\n',
                    },
                  },
                  required: ['protocol', 'type', 'value'],
                },
              ],
            },
          },
          pre: {
            type: 'string',
            description:
              'Transformation string to apply before uploading the file to the Media Library. Useful for optimizing files at ingestion.\n',
          },
        },
      },
      useUniqueFileName: {
        type: 'boolean',
        description:
          'Whether to use a unique filename for this file or not.\n\nIf `true`, ImageKit.io will add a unique suffix to the filename parameter to get a unique filename.\n\nIf `false`, then the image is uploaded with the provided filename parameter, and any existing file with the same name is replaced.\n',
      },
      webhookUrl: {
        type: 'string',
        description:
          'The final status of extensions after they have completed execution will be delivered to this endpoint as a POST request. [Learn more](/docs/api-reference/digital-asset-management-dam/managing-assets/update-file-details#webhook-payload-structure) about the webhook payload structure.\n',
      },
    },
    required: ['file', 'fileName'],
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
  const body = args as any;
  return asTextContentResult(await client.beta.v2.files.upload(body));
};

export default { metadata, tool, handler };
