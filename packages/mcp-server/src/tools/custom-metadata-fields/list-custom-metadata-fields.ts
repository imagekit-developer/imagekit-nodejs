// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { maybeFilter } from '@imagekit/nodejs-mcp/filtering';
import { Metadata, asTextContentResult } from '@imagekit/nodejs-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import ImageKit from '@imagekit/nodejs';

export const metadata: Metadata = {
  resource: 'customMetadataFields',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/v1/customMetadataFields',
  operationId: 'list-all-fields',
};

export const tool: Tool = {
  name: 'list_custom_metadata_fields',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nThis API returns the array of created custom metadata field objects. By default the API returns only non deleted field objects, but you can include deleted fields in the API response.\n\nYou can also filter results by a specific folder path to retrieve custom metadata fields applicable at that location. This path-specific filtering is useful when using the **Path policy** feature to determine which custom metadata fields are selected for a given path.\n\n\n# Response Schema\n```json\n{\n  type: 'array',\n  items: {\n    $ref: '#/$defs/custom_metadata_field'\n  },\n  $defs: {\n    custom_metadata_field: {\n      type: 'object',\n      description: 'Object containing details of a custom metadata field.',\n      properties: {\n        id: {\n          type: 'string',\n          description: 'Unique identifier for the custom metadata field. Use this to update the field.'\n        },\n        label: {\n          type: 'string',\n          description: 'Human readable name of the custom metadata field. This name is displayed as form field label to the users while setting field value on the asset in the media library UI.\\n'\n        },\n        name: {\n          type: 'string',\n          description: 'API name of the custom metadata field. This becomes the key while setting `customMetadata` (key-value object) for an asset using upload or update API.\\n'\n        },\n        schema: {\n          type: 'object',\n          description: 'An object that describes the rules for the custom metadata field value.',\n          properties: {\n            type: {\n              type: 'string',\n              description: 'Type of the custom metadata field.',\n              enum: [                'Text',\n                'Textarea',\n                'Number',\n                'Date',\n                'Boolean',\n                'SingleSelect',\n                'MultiSelect'\n              ]\n            },\n            defaultValue: {\n              anyOf: [                {\n                  type: 'string'\n                },\n                {\n                  type: 'number'\n                },\n                {\n                  type: 'boolean'\n                },\n                {\n                  type: 'array',\n                  title: 'Mixed',\n                  description: 'Default value should be of type array when custom metadata field type is set to `MultiSelect`.\\n',\n                  items: {\n                    anyOf: [                      {\n                        type: 'string'\n                      },\n                      {\n                        type: 'number'\n                      },\n                      {\n                        type: 'boolean'\n                      }\n                    ]\n                  }\n                }\n              ],\n              description: 'The default value for this custom metadata field. Data type of default value depends on the field type.\\n'\n            },\n            isValueRequired: {\n              type: 'boolean',\n              description: 'Specifies if the this custom metadata field is required or not.\\n'\n            },\n            maxLength: {\n              type: 'number',\n              description: 'Maximum length of string. Only set if `type` is set to `Text` or `Textarea`.\\n'\n            },\n            maxValue: {\n              anyOf: [                {\n                  type: 'string'\n                },\n                {\n                  type: 'number'\n                }\n              ],\n              description: 'Maximum value of the field. Only set if field type is `Date` or `Number`. For `Date` type field, the value will be in ISO8601 string format. For `Number` type field, it will be a numeric value.\\n'\n            },\n            minLength: {\n              type: 'number',\n              description: 'Minimum length of string. Only set if `type` is set to `Text` or `Textarea`.\\n'\n            },\n            minValue: {\n              anyOf: [                {\n                  type: 'string'\n                },\n                {\n                  type: 'number'\n                }\n              ],\n              description: 'Minimum value of the field. Only set if field type is `Date` or `Number`. For `Date` type field, the value will be in ISO8601 string format. For `Number` type field, it will be a numeric value.\\n'\n            },\n            selectOptions: {\n              type: 'array',\n              description: 'An array of allowed values when field type is `SingleSelect` or `MultiSelect`.\\n',\n              items: {\n                anyOf: [                  {\n                    type: 'string'\n                  },\n                  {\n                    type: 'number'\n                  },\n                  {\n                    type: 'boolean'\n                  }\n                ]\n              }\n            }\n          },\n          required: [            'type'\n          ]\n        }\n      },\n      required: [        'id',\n        'label',\n        'name',\n        'schema'\n      ]\n    }\n  }\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      folderPath: {
        type: 'string',
        description:
          'The folder path (e.g., `/path/to/folder`) for which to retrieve applicable custom metadata fields. Useful for determining path-specific field selections when the [Path policy](https://imagekit.io/docs/dam/path-policy) feature is in use.\n',
      },
      includeDeleted: {
        type: 'boolean',
        description: 'Set it to `true` to include deleted field objects in the API response.\n',
      },
      jq_filter: {
        type: 'string',
        title: 'jq Filter',
        description:
          'A jq filter to apply to the response to include certain fields. Consult the output schema in the tool description to see the fields that are available.\n\nFor example: to include only the `name` field in every object of a results array, you can provide ".results[].name".\n\nFor more information, see the [jq documentation](https://jqlang.org/manual/).',
      },
    },
    required: [],
  },
  annotations: {
    readOnlyHint: true,
  },
};

export const handler = async (client: ImageKit, args: Record<string, unknown> | undefined) => {
  const { jq_filter, ...body } = args as any;
  return asTextContentResult(await maybeFilter(jq_filter, await client.customMetadataFields.list(body)));
};

export default { metadata, tool, handler };
