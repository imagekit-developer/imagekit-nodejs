// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { isJqError, maybeFilter } from '@imagekit/api-mcp/filtering';
import { Metadata, asErrorResult, asTextContentResult } from '@imagekit/api-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import ImageKit from '@imagekit/nodejs';

export const metadata: Metadata = {
  resource: 'customMetadataFields',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/v1/customMetadataFields',
  operationId: 'create-new-field',
};

export const tool: Tool = {
  name: 'create_custom_metadata_fields',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nThis API creates a new custom metadata field. Once a custom metadata field is created either through this API or using the dashboard UI, its value can be set on the assets. The value of a field for an asset can be set using the media library UI or programmatically through upload or update assets API.\n\n\n# Response Schema\n```json\n{\n  $ref: '#/$defs/custom_metadata_field',\n  $defs: {\n    custom_metadata_field: {\n      type: 'object',\n      description: 'Object containing details of a custom metadata field.',\n      properties: {\n        id: {\n          type: 'string',\n          description: 'Unique identifier for the custom metadata field. Use this to update the field.'\n        },\n        label: {\n          type: 'string',\n          description: 'Human readable name of the custom metadata field. This name is displayed as form field label to the users while setting field value on the asset in the media library UI.\\n'\n        },\n        name: {\n          type: 'string',\n          description: 'API name of the custom metadata field. This becomes the key while setting `customMetadata` (key-value object) for an asset using upload or update API.\\n'\n        },\n        schema: {\n          type: 'object',\n          description: 'An object that describes the rules for the custom metadata field value.',\n          properties: {\n            type: {\n              type: 'string',\n              description: 'Type of the custom metadata field.',\n              enum: [                'Text',\n                'Textarea',\n                'Number',\n                'Date',\n                'Boolean',\n                'SingleSelect',\n                'MultiSelect'\n              ]\n            },\n            defaultValue: {\n              anyOf: [                {\n                  type: 'string'\n                },\n                {\n                  type: 'number'\n                },\n                {\n                  type: 'boolean'\n                },\n                {\n                  type: 'array',\n                  title: 'Mixed',\n                  description: 'Default value should be of type array when custom metadata field type is set to `MultiSelect`.\\n',\n                  items: {\n                    anyOf: [                      {\n                        type: 'string'\n                      },\n                      {\n                        type: 'number'\n                      },\n                      {\n                        type: 'boolean'\n                      }\n                    ]\n                  }\n                }\n              ],\n              description: 'The default value for this custom metadata field. Data type of default value depends on the field type.\\n'\n            },\n            isValueRequired: {\n              type: 'boolean',\n              description: 'Specifies if the this custom metadata field is required or not.\\n'\n            },\n            maxLength: {\n              type: 'number',\n              description: 'Maximum length of string. Only set if `type` is set to `Text` or `Textarea`.\\n'\n            },\n            maxValue: {\n              anyOf: [                {\n                  type: 'string'\n                },\n                {\n                  type: 'number'\n                }\n              ],\n              description: 'Maximum value of the field. Only set if field type is `Date` or `Number`. For `Date` type field, the value will be in ISO8601 string format. For `Number` type field, it will be a numeric value.\\n'\n            },\n            minLength: {\n              type: 'number',\n              description: 'Minimum length of string. Only set if `type` is set to `Text` or `Textarea`.\\n'\n            },\n            minValue: {\n              anyOf: [                {\n                  type: 'string'\n                },\n                {\n                  type: 'number'\n                }\n              ],\n              description: 'Minimum value of the field. Only set if field type is `Date` or `Number`. For `Date` type field, the value will be in ISO8601 string format. For `Number` type field, it will be a numeric value.\\n'\n            },\n            selectOptions: {\n              type: 'array',\n              description: 'An array of allowed values when field type is `SingleSelect` or `MultiSelect`.\\n',\n              items: {\n                anyOf: [                  {\n                    type: 'string'\n                  },\n                  {\n                    type: 'number'\n                  },\n                  {\n                    type: 'boolean'\n                  }\n                ]\n              }\n            }\n          },\n          required: [            'type'\n          ]\n        }\n      },\n      required: [        'id',\n        'label',\n        'name',\n        'schema'\n      ]\n    }\n  }\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      label: {
        type: 'string',
        description:
          'Human readable name of the custom metadata field. This should be unique across all non deleted custom metadata fields. This name is displayed as form field label to the users while setting field value on an asset in the media library UI.',
      },
      name: {
        type: 'string',
        description:
          'API name of the custom metadata field. This should be unique across all (including deleted) custom metadata fields.',
      },
      schema: {
        type: 'object',
        properties: {
          type: {
            type: 'string',
            description: 'Type of the custom metadata field.',
            enum: ['Text', 'Textarea', 'Number', 'Date', 'Boolean', 'SingleSelect', 'MultiSelect'],
          },
          defaultValue: {
            anyOf: [
              {
                type: 'string',
              },
              {
                type: 'number',
              },
              {
                type: 'boolean',
              },
              {
                type: 'array',
                title: 'Mixed',
                description:
                  'Default value should be of type array when custom metadata field type is set to `MultiSelect`.\n',
                items: {
                  anyOf: [
                    {
                      type: 'string',
                    },
                    {
                      type: 'number',
                    },
                    {
                      type: 'boolean',
                    },
                  ],
                },
              },
            ],
            description:
              'The default value for this custom metadata field. This property is only required if `isValueRequired` property is set to `true`. The value should match the `type` of custom metadata field.\n',
          },
          isValueRequired: {
            type: 'boolean',
            description:
              'Sets this custom metadata field as required. Setting custom metadata fields on an asset will throw error if the value for all required fields are not present in upload or update asset API request body.\n',
          },
          maxLength: {
            type: 'number',
            description:
              'Maximum length of string. Only set this property if `type` is set to `Text` or `Textarea`.\n',
          },
          maxValue: {
            anyOf: [
              {
                type: 'string',
              },
              {
                type: 'number',
              },
            ],
            description:
              'Maximum value of the field. Only set this property if field type is `Date` or `Number`. For `Date` type field, set the minimum date in ISO8601 string format. For `Number` type field, set the minimum numeric value.\n',
          },
          minLength: {
            type: 'number',
            description:
              'Minimum length of string. Only set this property if `type` is set to `Text` or `Textarea`.\n',
          },
          minValue: {
            anyOf: [
              {
                type: 'string',
              },
              {
                type: 'number',
              },
            ],
            description:
              'Minimum value of the field. Only set this property if field type is `Date` or `Number`. For `Date` type field, set the minimum date in ISO8601 string format. For `Number` type field, set the minimum numeric value.\n',
          },
          selectOptions: {
            type: 'array',
            description:
              'An array of allowed values. This property is only required if `type` property is set to `SingleSelect` or `MultiSelect`.\n',
            items: {
              anyOf: [
                {
                  type: 'string',
                },
                {
                  type: 'number',
                },
                {
                  type: 'boolean',
                },
              ],
            },
          },
        },
        required: ['type'],
      },
      jq_filter: {
        type: 'string',
        title: 'jq Filter',
        description:
          'A jq filter to apply to the response to include certain fields. Consult the output schema in the tool description to see the fields that are available.\n\nFor example: to include only the `name` field in every object of a results array, you can provide ".results[].name".\n\nFor more information, see the [jq documentation](https://jqlang.org/manual/).',
      },
    },
    required: ['label', 'name', 'schema'],
  },
  annotations: {},
};

export const handler = async (client: ImageKit, args: Record<string, unknown> | undefined) => {
  const { jq_filter, ...body } = args as any;
  try {
    return asTextContentResult(await maybeFilter(jq_filter, await client.customMetadataFields.create(body)));
  } catch (error) {
    if (isJqError(error)) {
      return asErrorResult(error.message);
    }
    throw error;
  }
};

export default { metadata, tool, handler };
