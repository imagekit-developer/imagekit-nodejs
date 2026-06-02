// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import MiniSearch from 'minisearch';
import * as fs from 'node:fs/promises';
import * as path from 'node:path';
import { getLogger } from './logger';

type PerLanguageData = {
  method?: string;
  example?: string;
};

type MethodEntry = {
  name: string;
  endpoint: string;
  httpMethod: string;
  summary: string;
  description: string;
  stainlessPath: string;
  qualified: string;
  params?: string[];
  response?: string;
  markdown?: string;
  perLanguage?: Record<string, PerLanguageData>;
};

type ProseChunk = {
  content: string;
  tag: string;
  sectionContext?: string;
  source?: string;
};

type MiniSearchDocument = {
  id: string;
  kind: 'http_method' | 'prose';
  name?: string;
  endpoint?: string;
  summary?: string;
  description?: string;
  qualified?: string;
  stainlessPath?: string;
  content?: string;
  sectionContext?: string;
  _original: Record<string, unknown>;
};

type SearchResult = {
  results: (string | Record<string, unknown>)[];
};

const EMBEDDED_METHODS: MethodEntry[] = [
  {
    name: 'create',
    endpoint: '/v1/dummy/test',
    httpMethod: 'post',
    summary: 'Dummy test endpoint using all shared models',
    description:
      'Internal test endpoint for SDK generation purposes only. This endpoint demonstrates usage of all shared models defined in the Stainless configuration and is not intended for public consumption.\n',
    stainlessPath: '(resource) dummy > (method) create',
    qualified: 'create',
    perLanguage: {
      go: {
        method: 'client.Dummy.New',
        example:
          'package main\n\nimport (\n\t"context"\n\n\t"github.com/imagekit-developer/imagekit-go/v2"\n\t"github.com/imagekit-developer/imagekit-go/v2/option"\n)\n\nfunc main() {\n\tclient := imagekit.NewClient(\n\t\toption.WithPrivateKey("My Private Key"),\n\t\toption.WithPassword("My Password"),\n\t)\n\terr := client.Dummy.New(context.TODO(), imagekit.DummyNewParams{})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n}\n',
      },
      python: {
        method: 'dummy.create',
        example:
          'import os\nfrom imagekitio import ImageKit\n\nclient = ImageKit(\n    private_key=os.environ.get("IMAGEKIT_PRIVATE_KEY"),  # This is the default and can be omitted\n    password=os.environ.get("OPTIONAL_IMAGEKIT_IGNORES_THIS"),  # This is the default and can be omitted\n)\nclient.dummy.create()',
      },
    },
  },
  {
    name: 'list',
    endpoint: '/v2/custom-metadata-fields',
    httpMethod: 'get',
    summary: 'List all fields',
    description:
      'This API returns the array of created custom metadata field objects. By default the API returns only non deleted field objects, but you can include deleted fields in the API response.\n\nYou can also filter results by a specific folder path to retrieve custom metadata fields applicable at that location. This path-specific filtering is useful when using the **Path policy** feature to determine which custom metadata fields are selected for a given path.\n',
    stainlessPath: '(resource) customMetadataFields > (method) list',
    qualified: 'client.customMetadataFields.list',
    params: ['folder_path?: string;', 'include_deleted?: boolean;'],
    response: '{ id: string; label: string; name: string; schema: object; }[]',
    markdown:
      "## list\n\n`client.customMetadataFields.list(folder_path?: string, include_deleted?: boolean): object[]`\n\n**get** `/v2/custom-metadata-fields`\n\nThis API returns the array of created custom metadata field objects. By default the API returns only non deleted field objects, but you can include deleted fields in the API response.\n\nYou can also filter results by a specific folder path to retrieve custom metadata fields applicable at that location. This path-specific filtering is useful when using the **Path policy** feature to determine which custom metadata fields are selected for a given path.\n\n\n### Parameters\n\n- `folder_path?: string`\n  The folder path (e.g., `/path/to/folder`) for which to retrieve applicable custom metadata fields. Useful for determining path-specific field selections when the [Path policy](https://imagekit.io/docs/dam/path-policy) feature is in use.\n\n\n- `include_deleted?: boolean`\n  Set it to `true` to include deleted field objects in the API response.\n\n\n### Returns\n\n- `{ id: string; label: string; name: string; schema: object; }[]`\n\n### Example\n\n```typescript\nimport ImageKit from '@imagekit/nodejs';\n\nconst client = new ImageKit();\n\nconst customMetadataFields = await client.customMetadataFields.list();\n\nconsole.log(customMetadataFields);\n```",
    perLanguage: {
      go: {
        method: 'client.CustomMetadataFields.List',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/imagekit-developer/imagekit-go/v2"\n\t"github.com/imagekit-developer/imagekit-go/v2/option"\n)\n\nfunc main() {\n\tclient := imagekit.NewClient(\n\t\toption.WithPrivateKey("My Private Key"),\n\t\toption.WithPassword("My Password"),\n\t)\n\tcustomMetadataFields, err := client.CustomMetadataFields.List(context.TODO(), imagekit.CustomMetadataFieldListParams{})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", customMetadataFields)\n}\n',
      },
      java: {
        method: 'customMetadataFields().list',
        example:
          'package io.imagekit.example;\n\nimport io.imagekit.client.ImageKitClient;\nimport io.imagekit.client.okhttp.ImageKitOkHttpClient;\nimport io.imagekit.models.custommetadatafields.CustomMetadataField;\nimport io.imagekit.models.custommetadatafields.CustomMetadataFieldListParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        ImageKitClient client = ImageKitOkHttpClient.fromEnv();\n\n        List<CustomMetadataField> customMetadataFields = client.customMetadataFields().list();\n    }\n}',
      },
      php: {
        method: 'customMetadataFields->list',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(privateKey: 'My Private Key', password: 'My Password');\n\n$customMetadataFields = $client->customMetadataFields->list(\n  folderPath: 'folder_path', includeDeleted: true\n);\n\nvar_dump($customMetadataFields);",
      },
      python: {
        method: 'custom_metadata_fields.list',
        example:
          'import os\nfrom imagekitio import ImageKit\n\nclient = ImageKit(\n    private_key=os.environ.get("IMAGEKIT_PRIVATE_KEY"),  # This is the default and can be omitted\n    password=os.environ.get("OPTIONAL_IMAGEKIT_IGNORES_THIS"),  # This is the default and can be omitted\n)\ncustom_metadata_fields = client.custom_metadata_fields.list()\nprint(custom_metadata_fields)',
      },
      ruby: {
        method: 'custom_metadata_fields.list',
        example:
          'require "imagekitio"\n\nimage_kit = Imagekitio::Client.new(private_key: "My Private Key", password: "My Password")\n\ncustom_metadata_fields = image_kit.custom_metadata_fields.list\n\nputs(custom_metadata_fields)',
      },
      typescript: {
        method: 'client.customMetadataFields.list',
        example:
          "import ImageKit from '@imagekit/nodejs';\n\nconst client = new ImageKit({\n  privateKey: process.env['IMAGEKIT_PRIVATE_KEY'], // This is the default and can be omitted\n  password: process.env['OPTIONAL_IMAGEKIT_IGNORES_THIS'], // This is the default and can be omitted\n});\n\nconst customMetadataFields = await client.customMetadataFields.list();\n\nconsole.log(customMetadataFields);",
      },
      http: {
        example:
          'curl https://api.imagekit.io/v2/custom-metadata-fields \\\n    -u "$IMAGEKIT_PRIVATE_KEY:OPTIONAL_IMAGEKIT_IGNORES_THIS"',
      },
      csharp: {
        method: 'CustomMetadataFields.List',
        example:
          'CustomMetadataFieldListParams parameters = new();\n\nvar customMetadataFields = await client.CustomMetadataFields.List(parameters);\n\nConsole.WriteLine(customMetadataFields);',
      },
    },
  },
  {
    name: 'create',
    endpoint: '/v2/custom-metadata-fields',
    httpMethod: 'post',
    summary: 'Create new field',
    description:
      'This API creates a new custom metadata field. Once a custom metadata field is created either through this API or using the dashboard UI, its value can be set on the assets. The value of a field for an asset can be set using the media library UI or programmatically through upload or update assets API.\n',
    stainlessPath: '(resource) customMetadataFields > (method) create',
    qualified: 'client.customMetadataFields.create',
    params: [
      'label: string;',
      'name: string;',
      "schema: { type: 'Text' | 'Textarea' | 'Number' | 'Date' | 'Boolean' | 'SingleSelect' | 'MultiSelect'; default_value?: string | number | boolean | string | number | boolean[]; is_value_required?: boolean; max_length?: number; max_value?: string | number; min_length?: number; min_value?: string | number; select_options?: string | number | boolean[]; };",
    ],
    response:
      "{ id: string; label: string; name: string; schema: { type: 'Text' | 'Textarea' | 'Number' | 'Date' | 'Boolean' | 'SingleSelect' | 'MultiSelect'; default_value?: string | number | boolean | string | number | boolean[]; is_value_required?: boolean; max_length?: number; max_value?: string | number; min_length?: number; min_value?: string | number; select_options?: string | number | boolean[]; }; }",
    markdown:
      "## create\n\n`client.customMetadataFields.create(label: string, name: string, schema: { type: 'Text' | 'Textarea' | 'Number' | 'Date' | 'Boolean' | 'SingleSelect' | 'MultiSelect'; default_value?: string | number | boolean | string | number | boolean[]; is_value_required?: boolean; max_length?: number; max_value?: string | number; min_length?: number; min_value?: string | number; select_options?: string | number | boolean[]; }): { id: string; label: string; name: string; schema: custom_metadata_field_schema; }`\n\n**post** `/v2/custom-metadata-fields`\n\nThis API creates a new custom metadata field. Once a custom metadata field is created either through this API or using the dashboard UI, its value can be set on the assets. The value of a field for an asset can be set using the media library UI or programmatically through upload or update assets API.\n\n\n### Parameters\n\n- `label: string`\n  Human readable name of the custom metadata field. This should be unique across all non deleted custom metadata fields. This name is displayed as form field label to the users while setting field value on an asset in the media library UI.\n\n- `name: string`\n  API name of the custom metadata field. This should be unique across all (including deleted) custom metadata fields.\n\n- `schema: { type: 'Text' | 'Textarea' | 'Number' | 'Date' | 'Boolean' | 'SingleSelect' | 'MultiSelect'; default_value?: string | number | boolean | string | number | boolean[]; is_value_required?: boolean; max_length?: number; max_value?: string | number; min_length?: number; min_value?: string | number; select_options?: string | number | boolean[]; }`\n  - `type: 'Text' | 'Textarea' | 'Number' | 'Date' | 'Boolean' | 'SingleSelect' | 'MultiSelect'`\n    Type of the custom metadata field.\n  - `default_value?: string | number | boolean | string | number | boolean[]`\n    The default value for this custom metadata field. This property is only required if `is_value_required` property is set to `true`. The value should match the `type` of custom metadata field.\n\n  - `is_value_required?: boolean`\n    Sets this custom metadata field as required. Setting custom metadata fields on an asset will throw error if the value for all required fields are not present in upload or update asset API request body.\n\n  - `max_length?: number`\n    Maximum length of string. Only set this property if `type` is set to `Text` or `Textarea`.\n\n  - `max_value?: string | number`\n    Maximum value of the field. Only set this property if field type is `Date` or `Number`. For `Date` type field, set the minimum date in ISO8601 string format. For `Number` type field, set the minimum numeric value.\n\n  - `min_length?: number`\n    Minimum length of string. Only set this property if `type` is set to `Text` or `Textarea`.\n\n  - `min_value?: string | number`\n    Minimum value of the field. Only set this property if field type is `Date` or `Number`. For `Date` type field, set the minimum date in ISO8601 string format. For `Number` type field, set the minimum numeric value.\n\n  - `select_options?: string | number | boolean[]`\n    An array of allowed values. This property is only required if `type` property is set to `SingleSelect` or `MultiSelect`.\n\n\n### Returns\n\n- `{ id: string; label: string; name: string; schema: { type: 'Text' | 'Textarea' | 'Number' | 'Date' | 'Boolean' | 'SingleSelect' | 'MultiSelect'; default_value?: string | number | boolean | string | number | boolean[]; is_value_required?: boolean; max_length?: number; max_value?: string | number; min_length?: number; min_value?: string | number; select_options?: string | number | boolean[]; }; }`\n  Object containing details of a custom metadata field.\n\n  - `id: string`\n  - `label: string`\n  - `name: string`\n  - `schema: { type: 'Text' | 'Textarea' | 'Number' | 'Date' | 'Boolean' | 'SingleSelect' | 'MultiSelect'; default_value?: string | number | boolean | string | number | boolean[]; is_value_required?: boolean; max_length?: number; max_value?: string | number; min_length?: number; min_value?: string | number; select_options?: string | number | boolean[]; }`\n\n### Example\n\n```typescript\nimport ImageKit from '@imagekit/nodejs';\n\nconst client = new ImageKit();\n\nconst customMetadataField = await client.customMetadataFields.create({\n  label: 'price',\n  name: 'price',\n  schema: { type: 'Number' },\n});\n\nconsole.log(customMetadataField);\n```",
    perLanguage: {
      go: {
        method: 'client.CustomMetadataFields.New',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/imagekit-developer/imagekit-go/v2"\n\t"github.com/imagekit-developer/imagekit-go/v2/option"\n)\n\nfunc main() {\n\tclient := imagekit.NewClient(\n\t\toption.WithPrivateKey("My Private Key"),\n\t\toption.WithPassword("My Password"),\n\t)\n\tcustomMetadataField, err := client.CustomMetadataFields.New(context.TODO(), imagekit.CustomMetadataFieldNewParams{\n\t\tLabel: "price",\n\t\tName:  "price",\n\t\tSchema: imagekit.CustomMetadataFieldNewParamsSchema{\n\t\t\tType: "Number",\n\t\t\tMinValue: imagekit.CustomMetadataFieldNewParamsSchemaMinValueUnion{\n\t\t\t\tOfFloat: imagekit.Float(1000),\n\t\t\t},\n\t\t\tMaxValue: imagekit.CustomMetadataFieldNewParamsSchemaMaxValueUnion{\n\t\t\t\tOfFloat: imagekit.Float(3000),\n\t\t\t},\n\t\t},\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", customMetadataField.ID)\n}\n',
      },
      java: {
        method: 'customMetadataFields().create',
        example:
          'package io.imagekit.example;\n\nimport io.imagekit.client.ImageKitClient;\nimport io.imagekit.client.okhttp.ImageKitOkHttpClient;\nimport io.imagekit.models.custommetadatafields.CustomMetadataField;\nimport io.imagekit.models.custommetadatafields.CustomMetadataFieldCreateParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        ImageKitClient client = ImageKitOkHttpClient.fromEnv();\n\n        CustomMetadataFieldCreateParams params = CustomMetadataFieldCreateParams.builder()\n            .label("price")\n            .name("price")\n            .schema(CustomMetadataFieldCreateParams.Schema.builder()\n                .type(CustomMetadataFieldCreateParams.Schema.Type.NUMBER)\n                .build())\n            .build();\n        CustomMetadataField customMetadataField = client.customMetadataFields().create(params);\n    }\n}',
      },
      php: {
        method: 'customMetadataFields->create',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(privateKey: 'My Private Key', password: 'My Password');\n\n$customMetadataField = $client->customMetadataFields->create(\n  label: 'price',\n  name: 'price',\n  schema: [\n    'type' => 'Number',\n    'defaultValue' => [true, 10, 'Hello'],\n    'isValueRequired' => true,\n    'maxLength' => 0,\n    'maxValue' => 3000,\n    'minLength' => 0,\n    'minValue' => 1000,\n    'selectOptions' => ['small', 'medium', 'large', 30, 40, true],\n  ],\n);\n\nvar_dump($customMetadataField);",
      },
      python: {
        method: 'custom_metadata_fields.create',
        example:
          'import os\nfrom imagekitio import ImageKit\n\nclient = ImageKit(\n    private_key=os.environ.get("IMAGEKIT_PRIVATE_KEY"),  # This is the default and can be omitted\n    password=os.environ.get("OPTIONAL_IMAGEKIT_IGNORES_THIS"),  # This is the default and can be omitted\n)\ncustom_metadata_field = client.custom_metadata_fields.create(\n    label="price",\n    name="price",\n    schema={\n        "type": "Number",\n        "min_value": 1000,\n        "max_value": 3000,\n    },\n)\nprint(custom_metadata_field.id)',
      },
      ruby: {
        method: 'custom_metadata_fields.create',
        example:
          'require "imagekitio"\n\nimage_kit = Imagekitio::Client.new(private_key: "My Private Key", password: "My Password")\n\ncustom_metadata_field = image_kit.custom_metadata_fields.create(label: "price", name: "price", schema: {type: :Number})\n\nputs(custom_metadata_field)',
      },
      typescript: {
        method: 'client.customMetadataFields.create',
        example:
          "import ImageKit from '@imagekit/nodejs';\n\nconst client = new ImageKit({\n  privateKey: process.env['IMAGEKIT_PRIVATE_KEY'], // This is the default and can be omitted\n  password: process.env['OPTIONAL_IMAGEKIT_IGNORES_THIS'], // This is the default and can be omitted\n});\n\nconst customMetadataField = await client.customMetadataFields.create({\n  label: 'price',\n  name: 'price',\n  schema: {\n    type: 'Number',\n    min_value: 1000,\n    max_value: 3000,\n  },\n});\n\nconsole.log(customMetadataField.id);",
      },
      http: {
        example:
          'curl https://api.imagekit.io/v2/custom-metadata-fields \\\n    -H \'Content-Type: application/json\' \\\n    -u "$IMAGEKIT_PRIVATE_KEY:OPTIONAL_IMAGEKIT_IGNORES_THIS" \\\n    -d \'{\n          "label": "price",\n          "name": "price",\n          "schema": {\n            "type": "Number",\n            "max_value": 3000,\n            "min_value": 1000\n          }\n        }\'',
      },
      csharp: {
        method: 'CustomMetadataFields.Create',
        example:
          'CustomMetadataFieldCreateParams parameters = new()\n{\n    Label = "price",\n    Name = "price",\n    Schema = new()\n    {\n        Type = Type.Number,\n        DefaultValue = new(\n\n            [\n                new DefaultValueItem(true),\n                new DefaultValueItem(10),\n                new DefaultValueItem("Hello"),\n            ]\n        ),\n        IsValueRequired = true,\n        MaxLength = 0,\n        MaxValue = 3000,\n        MinLength = 0,\n        MinValue = 1000,\n        SelectOptions =\n        [\n            "small", "medium", "large", 30, 40, true\n        ],\n    },\n};\n\nvar customMetadataField = await client.CustomMetadataFields.Create(parameters);\n\nConsole.WriteLine(customMetadataField);',
      },
    },
  },
  {
    name: 'update',
    endpoint: '/v2/custom-metadata-fields/{id}',
    httpMethod: 'patch',
    summary: 'Update existing field',
    description: 'This API updates the label or schema of an existing custom metadata field.\n',
    stainlessPath: '(resource) customMetadataFields > (method) update',
    qualified: 'client.customMetadataFields.update',
    params: [
      'id: string;',
      'label?: string;',
      'schema?: { default_value?: string | number | boolean | string | number | boolean[]; is_value_required?: boolean; max_length?: number; max_value?: string | number; min_length?: number; min_value?: string | number; select_options?: string | number | boolean[]; };',
    ],
    response:
      "{ id: string; label: string; name: string; schema: { type: 'Text' | 'Textarea' | 'Number' | 'Date' | 'Boolean' | 'SingleSelect' | 'MultiSelect'; default_value?: string | number | boolean | string | number | boolean[]; is_value_required?: boolean; max_length?: number; max_value?: string | number; min_length?: number; min_value?: string | number; select_options?: string | number | boolean[]; }; }",
    markdown:
      "## update\n\n`client.customMetadataFields.update(id: string, label?: string, schema?: { default_value?: string | number | boolean | string | number | boolean[]; is_value_required?: boolean; max_length?: number; max_value?: string | number; min_length?: number; min_value?: string | number; select_options?: string | number | boolean[]; }): { id: string; label: string; name: string; schema: custom_metadata_field_schema; }`\n\n**patch** `/v2/custom-metadata-fields/{id}`\n\nThis API updates the label or schema of an existing custom metadata field.\n\n\n### Parameters\n\n- `id: string`\n\n- `label?: string`\n  Human readable name of the custom metadata field. This should be unique across all non deleted custom metadata fields. This name is displayed as form field label to the users while setting field value on an asset in the media library UI. This parameter is required if `schema` is not provided.\n\n- `schema?: { default_value?: string | number | boolean | string | number | boolean[]; is_value_required?: boolean; max_length?: number; max_value?: string | number; min_length?: number; min_value?: string | number; select_options?: string | number | boolean[]; }`\n  An object that describes the rules for the custom metadata key. This parameter is required if `label` is not provided. Note: `type` cannot be updated and will be ignored if sent with the `schema`. The schema will be validated as per the existing `type`.\n\n  - `default_value?: string | number | boolean | string | number | boolean[]`\n    The default value for this custom metadata field. This property is only required if `is_value_required` property is set to `true`. The value should match the `type` of custom metadata field.\n\n  - `is_value_required?: boolean`\n    Sets this custom metadata field as required. Setting custom metadata fields on an asset will throw error if the value for all required fields are not present in upload or update asset API request body.\n\n  - `max_length?: number`\n    Maximum length of string. Only set this property if `type` is set to `Text` or `Textarea`.\n\n  - `max_value?: string | number`\n    Maximum value of the field. Only set this property if field type is `Date` or `Number`. For `Date` type field, set the minimum date in ISO8601 string format. For `Number` type field, set the minimum numeric value.\n\n  - `min_length?: number`\n    Minimum length of string. Only set this property if `type` is set to `Text` or `Textarea`.\n\n  - `min_value?: string | number`\n    Minimum value of the field. Only set this property if field type is `Date` or `Number`. For `Date` type field, set the minimum date in ISO8601 string format. For `Number` type field, set the minimum numeric value.\n\n  - `select_options?: string | number | boolean[]`\n    An array of allowed values. This property is only required if `type` property is set to `SingleSelect` or `MultiSelect`.\n\n\n### Returns\n\n- `{ id: string; label: string; name: string; schema: { type: 'Text' | 'Textarea' | 'Number' | 'Date' | 'Boolean' | 'SingleSelect' | 'MultiSelect'; default_value?: string | number | boolean | string | number | boolean[]; is_value_required?: boolean; max_length?: number; max_value?: string | number; min_length?: number; min_value?: string | number; select_options?: string | number | boolean[]; }; }`\n  Object containing details of a custom metadata field.\n\n  - `id: string`\n  - `label: string`\n  - `name: string`\n  - `schema: { type: 'Text' | 'Textarea' | 'Number' | 'Date' | 'Boolean' | 'SingleSelect' | 'MultiSelect'; default_value?: string | number | boolean | string | number | boolean[]; is_value_required?: boolean; max_length?: number; max_value?: string | number; min_length?: number; min_value?: string | number; select_options?: string | number | boolean[]; }`\n\n### Example\n\n```typescript\nimport ImageKit from '@imagekit/nodejs';\n\nconst client = new ImageKit();\n\nconst customMetadataField = await client.customMetadataFields.update('id');\n\nconsole.log(customMetadataField);\n```",
    perLanguage: {
      go: {
        method: 'client.CustomMetadataFields.Update',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/imagekit-developer/imagekit-go/v2"\n\t"github.com/imagekit-developer/imagekit-go/v2/option"\n)\n\nfunc main() {\n\tclient := imagekit.NewClient(\n\t\toption.WithPrivateKey("My Private Key"),\n\t\toption.WithPassword("My Password"),\n\t)\n\tcustomMetadataField, err := client.CustomMetadataFields.Update(\n\t\tcontext.TODO(),\n\t\t"id",\n\t\timagekit.CustomMetadataFieldUpdateParams{\n\t\t\tLabel: imagekit.String("price"),\n\t\t\tSchema: imagekit.CustomMetadataFieldUpdateParamsSchema{\n\t\t\t\tMinValue: imagekit.CustomMetadataFieldUpdateParamsSchemaMinValueUnion{\n\t\t\t\t\tOfFloat: imagekit.Float(1000),\n\t\t\t\t},\n\t\t\t\tMaxValue: imagekit.CustomMetadataFieldUpdateParamsSchemaMaxValueUnion{\n\t\t\t\t\tOfFloat: imagekit.Float(3000),\n\t\t\t\t},\n\t\t\t},\n\t\t},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", customMetadataField.ID)\n}\n',
      },
      java: {
        method: 'customMetadataFields().update',
        example:
          'package io.imagekit.example;\n\nimport io.imagekit.client.ImageKitClient;\nimport io.imagekit.client.okhttp.ImageKitOkHttpClient;\nimport io.imagekit.models.custommetadatafields.CustomMetadataField;\nimport io.imagekit.models.custommetadatafields.CustomMetadataFieldUpdateParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        ImageKitClient client = ImageKitOkHttpClient.fromEnv();\n\n        CustomMetadataField customMetadataField = client.customMetadataFields().update("id");\n    }\n}',
      },
      php: {
        method: 'customMetadataFields->update',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(privateKey: 'My Private Key', password: 'My Password');\n\n$customMetadataField = $client->customMetadataFields->update(\n  'id',\n  label: 'price',\n  schema: [\n    'defaultValue' => [true, 10, 'Hello'],\n    'isValueRequired' => true,\n    'maxLength' => 0,\n    'maxValue' => 3000,\n    'minLength' => 0,\n    'minValue' => 1000,\n    'selectOptions' => ['small', 'medium', 'large', 30, 40, true],\n  ],\n);\n\nvar_dump($customMetadataField);",
      },
      python: {
        method: 'custom_metadata_fields.update',
        example:
          'import os\nfrom imagekitio import ImageKit\n\nclient = ImageKit(\n    private_key=os.environ.get("IMAGEKIT_PRIVATE_KEY"),  # This is the default and can be omitted\n    password=os.environ.get("OPTIONAL_IMAGEKIT_IGNORES_THIS"),  # This is the default and can be omitted\n)\ncustom_metadata_field = client.custom_metadata_fields.update(\n    id="id",\n    label="price",\n    schema={\n        "min_value": 1000,\n        "max_value": 3000,\n    },\n)\nprint(custom_metadata_field.id)',
      },
      ruby: {
        method: 'custom_metadata_fields.update',
        example:
          'require "imagekitio"\n\nimage_kit = Imagekitio::Client.new(private_key: "My Private Key", password: "My Password")\n\ncustom_metadata_field = image_kit.custom_metadata_fields.update("id")\n\nputs(custom_metadata_field)',
      },
      typescript: {
        method: 'client.customMetadataFields.update',
        example:
          "import ImageKit from '@imagekit/nodejs';\n\nconst client = new ImageKit({\n  privateKey: process.env['IMAGEKIT_PRIVATE_KEY'], // This is the default and can be omitted\n  password: process.env['OPTIONAL_IMAGEKIT_IGNORES_THIS'], // This is the default and can be omitted\n});\n\nconst customMetadataField = await client.customMetadataFields.update('id', {\n  label: 'price',\n  schema: { min_value: 1000, max_value: 3000 },\n});\n\nconsole.log(customMetadataField.id);",
      },
      http: {
        example:
          'curl https://api.imagekit.io/v2/custom-metadata-fields/$ID \\\n    -X PATCH \\\n    -u "$IMAGEKIT_PRIVATE_KEY:OPTIONAL_IMAGEKIT_IGNORES_THIS"',
      },
      csharp: {
        method: 'CustomMetadataFields.Update',
        example:
          'CustomMetadataFieldUpdateParams parameters = new() { ID = "id" };\n\nvar customMetadataField = await client.CustomMetadataFields.Update(parameters);\n\nConsole.WriteLine(customMetadataField);',
      },
    },
  },
  {
    name: 'delete',
    endpoint: '/v2/custom-metadata-fields/{id}',
    httpMethod: 'delete',
    summary: 'Delete a field',
    description:
      'This API deletes a custom metadata field. Even after deleting a custom metadata field, you cannot create any new custom metadata field with the same name.\n',
    stainlessPath: '(resource) customMetadataFields > (method) delete',
    qualified: 'client.customMetadataFields.delete',
    params: ['id: string;'],
    markdown:
      "## delete\n\n`client.customMetadataFields.delete(id: string): void`\n\n**delete** `/v2/custom-metadata-fields/{id}`\n\nThis API deletes a custom metadata field. Even after deleting a custom metadata field, you cannot create any new custom metadata field with the same name.\n\n\n### Parameters\n\n- `id: string`\n\n### Example\n\n```typescript\nimport ImageKit from '@imagekit/nodejs';\n\nconst client = new ImageKit();\n\nawait client.customMetadataFields.delete('id')\n```",
    perLanguage: {
      go: {
        method: 'client.CustomMetadataFields.Delete',
        example:
          'package main\n\nimport (\n\t"context"\n\n\t"github.com/imagekit-developer/imagekit-go/v2"\n\t"github.com/imagekit-developer/imagekit-go/v2/option"\n)\n\nfunc main() {\n\tclient := imagekit.NewClient(\n\t\toption.WithPrivateKey("My Private Key"),\n\t\toption.WithPassword("My Password"),\n\t)\n\terr := client.CustomMetadataFields.Delete(context.TODO(), "id")\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n}\n',
      },
      java: {
        method: 'customMetadataFields().delete',
        example:
          'package io.imagekit.example;\n\nimport io.imagekit.client.ImageKitClient;\nimport io.imagekit.client.okhttp.ImageKitOkHttpClient;\nimport io.imagekit.models.custommetadatafields.CustomMetadataFieldDeleteParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        ImageKitClient client = ImageKitOkHttpClient.fromEnv();\n\n        client.customMetadataFields().delete("id");\n    }\n}',
      },
      php: {
        method: 'customMetadataFields->delete',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(privateKey: 'My Private Key', password: 'My Password');\n\n$result = $client->customMetadataFields->delete('id');\n\nvar_dump($result);",
      },
      python: {
        method: 'custom_metadata_fields.delete',
        example:
          'import os\nfrom imagekitio import ImageKit\n\nclient = ImageKit(\n    private_key=os.environ.get("IMAGEKIT_PRIVATE_KEY"),  # This is the default and can be omitted\n    password=os.environ.get("OPTIONAL_IMAGEKIT_IGNORES_THIS"),  # This is the default and can be omitted\n)\nclient.custom_metadata_fields.delete(\n    "id",\n)',
      },
      ruby: {
        method: 'custom_metadata_fields.delete',
        example:
          'require "imagekitio"\n\nimage_kit = Imagekitio::Client.new(private_key: "My Private Key", password: "My Password")\n\nresult = image_kit.custom_metadata_fields.delete("id")\n\nputs(result)',
      },
      typescript: {
        method: 'client.customMetadataFields.delete',
        example:
          "import ImageKit from '@imagekit/nodejs';\n\nconst client = new ImageKit({\n  privateKey: process.env['IMAGEKIT_PRIVATE_KEY'], // This is the default and can be omitted\n  password: process.env['OPTIONAL_IMAGEKIT_IGNORES_THIS'], // This is the default and can be omitted\n});\n\nawait client.customMetadataFields.delete('id');",
      },
      http: {
        example:
          'curl https://api.imagekit.io/v2/custom-metadata-fields/$ID \\\n    -X DELETE \\\n    -u "$IMAGEKIT_PRIVATE_KEY:OPTIONAL_IMAGEKIT_IGNORES_THIS"',
      },
      csharp: {
        method: 'CustomMetadataFields.Delete',
        example:
          'CustomMetadataFieldDeleteParams parameters = new() { ID = "id" };\n\nawait client.CustomMetadataFields.Delete(parameters);',
      },
    },
  },
  {
    name: 'upload',
    endpoint: '/v2/assets/upload',
    httpMethod: 'post',
    summary: 'Upload file',
    description:
      'ImageKit.io allows you to upload files directly from both the server and client sides. For server-side uploads, private API key authentication is used. For client-side uploads, generate a one-time `token` from your secure backend using private API. [Learn more](/docs/api-reference/upload-file/upload-file-v2#how-to-implement-secure-client-side-file-upload) about how to implement secure client-side file upload.\n\n**File size limit** \\\nOn the free plan, the maximum upload file sizes are 25MB for images, audio, and raw files, and 100MB for videos. On the Lite paid plan, these limits increase to 40MB for images, audio, and raw files and 300MB for videos, whereas on the Pro paid plan, these limits increase to 50MB for images, audio, and raw files and 2GB for videos. These limits can be further increased with enterprise plans.\n\n**Version limit** \\\nA file can have a maximum of 100 versions.\n\n**Demo applications**\n\n- A full-fledged [upload widget using Uppy](https://github.com/imagekit-samples/uppy-uploader), supporting file selections from local storage, URL, Dropbox, Google Drive, Instagram, and more.\n- [Quick start guides](/docs/quick-start-guides) for various frameworks and technologies.\n',
    stainlessPath: '(resource) assets > (method) upload',
    qualified: 'client.assets.upload',
    params: [
      'file: string;',
      'file_name: string;',
      'token?: string;',
      'checks?: string;',
      'custom_coordinates?: string;',
      'custom_metadata?: object;',
      'description?: string;',
      "extensions?: { name: 'remove-bg'; options?: { add_shadow?: boolean; bg_color?: string; bg_image_url?: string; semi_transparency?: boolean; }; } | { max_tags: number; min_confidence: number; name: 'google-auto-tagging' | 'aws-auto-tagging'; } | { name: 'ai-auto-description'; } | { name: 'ai-tasks'; tasks: object | object | object[]; } | { id: string; name: 'saved-extension'; }[];",
      'folder?: string;',
      'is_private_file?: boolean;',
      'is_published?: boolean;',
      'overwrite?: { ai_tags?: boolean; custom_metadata?: boolean; file?: boolean; tags?: boolean; };',
      'tags?: string[];',
      "transformation?: { post?: { type: 'transformation'; value: string; } | { type: 'gif-to-video'; value?: string; } | { type: 'thumbnail'; value?: string; } | { protocol: 'hls' | 'dash'; type: 'abs'; value: string; }[]; pre?: string; };",
      'use_unique_file_name?: boolean;',
    ],
    response:
      '{ id?: string; ai_tags?: object[]; asset_type?: string; asset_url?: string; created_at?: string; custom_coordinates?: string; custom_metadata?: object; description?: string; embedded_metadata?: object; is_private_file?: boolean; is_published?: boolean; metadata?: metadata; name?: string; path?: string; size?: number; tags?: string[]; thumbnail_url?: string; updated_at?: string; version_info?: object; }',
    markdown:
      "## upload\n\n`client.assets.upload(file: string, file_name: string, token?: string, checks?: string, custom_coordinates?: string, custom_metadata?: object, description?: string, extensions?: object | object | object | object | object[], folder?: string, is_private_file?: boolean, is_published?: boolean, overwrite?: { ai_tags?: boolean; custom_metadata?: boolean; file?: boolean; tags?: boolean; }, tags?: string[], transformation?: { post?: { type: 'transformation'; value: string; } | { type: 'gif-to-video'; value?: string; } | { type: 'thumbnail'; value?: string; } | { protocol: 'hls' | 'dash'; type: 'abs'; value: string; }[]; pre?: string; }, use_unique_file_name?: boolean): file_asset`\n\n**post** `/v2/assets/upload`\n\nImageKit.io allows you to upload files directly from both the server and client sides. For server-side uploads, private API key authentication is used. For client-side uploads, generate a one-time `token` from your secure backend using private API. [Learn more](/docs/api-reference/upload-file/upload-file-v2#how-to-implement-secure-client-side-file-upload) about how to implement secure client-side file upload.\n\n**File size limit** \\\nOn the free plan, the maximum upload file sizes are 25MB for images, audio, and raw files, and 100MB for videos. On the Lite paid plan, these limits increase to 40MB for images, audio, and raw files and 300MB for videos, whereas on the Pro paid plan, these limits increase to 50MB for images, audio, and raw files and 2GB for videos. These limits can be further increased with enterprise plans.\n\n**Version limit** \\\nA file can have a maximum of 100 versions.\n\n**Demo applications**\n\n- A full-fledged [upload widget using Uppy](https://github.com/imagekit-samples/uppy-uploader), supporting file selections from local storage, URL, Dropbox, Google Drive, Instagram, and more.\n- [Quick start guides](/docs/quick-start-guides) for various frameworks and technologies.\n\n\n### Parameters\n\n- `file: string`\n  The API accepts any of the following:\n\n- **Binary data** – send the raw bytes as `multipart/form-data`.\n- **HTTP / HTTPS URL** – a publicly reachable URL that ImageKit’s servers can fetch.\n- **Base64 string** – the file encoded as a Base64 data URI or plain Base64.\n\nWhen supplying a URL, the server must receive the response headers within 8 seconds; otherwise the request fails with 400 Bad Request.\n\n\n- `file_name: string`\n  The name to use for the uploaded file.\n\n- `token?: string`\n  This is the client-generated JSON Web Token (JWT). The ImageKit.io server uses it to authenticate and check that the upload request parameters have not been tampered with after the token has been generated. Learn how to create the token on the page below. This field is only required for authentication when uploading a file from the client side.\n\n\n**Note**: Sending a JWT that has been used in the past will result in a validation error. Even if your previous request resulted in an error, you should always send a new token.\n\n\n**⚠️Warning**: JWT must be generated on the server-side because it is generated using your account's private API key. This field is required for authentication when uploading a file from the client-side.\n\n\n- `checks?: string`\n  Server-side checks to run on the asset.\nRead more about [Upload API checks](/docs/api-reference/upload-file/upload-file-v2#upload-api-checks).\n\n\n- `custom_coordinates?: string`\n  Define an important area in the image. This is only relevant for image type files.\n\n  - To be passed as a string with the x and y coordinates of the top-left corner, and width and height of the area of interest in the format `x,y,width,height`. For example - `10,10,100,100`\n  - Can be used with fo-customtransformation.\n  - If this field is not specified and the file is overwritten, then custom_coordinates will be removed.\n\n\n- `custom_metadata?: object`\n  JSON key-value pairs to associate with the asset. Create the custom metadata fields before setting these values.\n\n- `description?: string`\n  Optional text to describe the contents of the file.\n\n\n- `extensions?: { name: 'remove-bg'; options?: { add_shadow?: boolean; bg_color?: string; bg_image_url?: string; semi_transparency?: boolean; }; } | { max_tags: number; min_confidence: number; name: 'google-auto-tagging' | 'aws-auto-tagging'; } | { name: 'ai-auto-description'; } | { name: 'ai-tasks'; tasks: object | object | object[]; } | { id: string; name: 'saved-extension'; }[]`\n  Array of extensions to be applied to the asset. Each extension can be configured with specific parameters based on the extension type.\n\n\n- `folder?: string`\n  The folder path in which the image has to be uploaded. If the folder(s) didn't exist before, a new folder(s) is created. Using multiple `/` creates a nested folder.\n\n\n- `is_private_file?: boolean`\n  Whether to mark the file as private or not.\n\nIf `true`, the file is marked as private and is accessible only using named transformation or signed URL.\n\n\n- `is_published?: boolean`\n  Whether to upload file as published or not.\n\nIf `false`, the file is marked as unpublished, which restricts access to the file only via the media library. Files in draft or unpublished state can only be publicly accessed after being published.\n\nThe option to upload in draft state is only available in custom enterprise pricing plans.\n\n\n- `overwrite?: { ai_tags?: boolean; custom_metadata?: boolean; file?: boolean; tags?: boolean; }`\n  Controls what gets replaced when a file already exists at the same path. All fields default to `true`. Only relevant when `use_unique_file_name` is `false`.\n\n  - `ai_tags?: boolean`\n    If `true`, existing `ai_tags` on the file are removed on overwrite. Set to `false` to preserve them.\n\n  - `custom_metadata?: boolean`\n    If `true` and `custom_metadata` is not provided in the request, existing custom metadata is removed on overwrite. Set to `false` to preserve it.\n\n  - `file?: boolean`\n    If `false`, the upload returns an error when a file already exists at the target path instead of replacing it.\n\n  - `tags?: boolean`\n    If `true` and `tags` is not provided in the request, existing tags are removed on overwrite. Set to `false` to preserve them.\n\n\n- `tags?: string[]`\n  Set the tags while uploading the file.\nProvide an array of tag strings (e.g. `[\"tag1\", \"tag2\", \"tag3\"]`). The combined length of all tag characters must not exceed 500, and the `%` character is not allowed.\nIf this field is not specified and the file is overwritten, the existing tags will be removed.\n\n\n- `transformation?: { post?: { type: 'transformation'; value: string; } | { type: 'gif-to-video'; value?: string; } | { type: 'thumbnail'; value?: string; } | { protocol: 'hls' | 'dash'; type: 'abs'; value: string; }[]; pre?: string; }`\n  Configure pre-processing (`pre`) and post-processing (`post`) transformations.\n\n- `pre` — applied before the file is uploaded to the Media Library.  \n  Useful for reducing file size or applying basic optimizations upfront (e.g., resize, compress).\n\n- `post` — applied immediately after upload.  \n  Ideal for generating transformed versions (like video encodes or thumbnails) in advance, so they're ready for delivery without delay.\n\nYou can mix and match any combination of post-processing types.\n\n  - `post?: { type: 'transformation'; value: string; } | { type: 'gif-to-video'; value?: string; } | { type: 'thumbnail'; value?: string; } | { protocol: 'hls' | 'dash'; type: 'abs'; value: string; }[]`\n    List of transformations to apply *after* the file is uploaded.  \nEach item must match one of the following types:\n`transformation`, `gif-to-video`, `thumbnail`, `abs`.\n\n  - `pre?: string`\n    Transformation string to apply before uploading the file to the Media Library. Useful for optimizing files at ingestion.\n\n\n- `use_unique_file_name?: boolean`\n  Whether to use a unique filename for this file or not.\n\nIf `true`, ImageKit.io will add a unique suffix to the filename parameter to get a unique filename.\n\nIf `false`, then the image is uploaded with the provided filename parameter, and any existing file with the same name is replaced.\n\n\n### Returns\n\n- `{ id?: string; ai_tags?: object[]; asset_type?: string; asset_url?: string; created_at?: string; custom_coordinates?: string; custom_metadata?: object; description?: string; embedded_metadata?: object; is_private_file?: boolean; is_published?: boolean; metadata?: metadata; name?: string; path?: string; size?: number; tags?: string[]; thumbnail_url?: string; updated_at?: string; version_info?: object; }`\n  Object containing details of a successful upload.\n\n### Example\n\n```typescript\nimport ImageKit from '@imagekit/nodejs';\n\nconst client = new ImageKit();\n\nconst uploadResponse = await client.assets.upload({ file: fs.createReadStream('path/to/file'), file_name: 'file_name' });\n\nconsole.log(uploadResponse);\n```",
    perLanguage: {
      go: {
        method: 'client.Assets.Upload',
        example:
          'package main\n\nimport (\n\t"bytes"\n\t"context"\n\t"fmt"\n\t"io"\n\n\t"github.com/imagekit-developer/imagekit-go/v2"\n\t"github.com/imagekit-developer/imagekit-go/v2/option"\n)\n\nfunc main() {\n\tclient := imagekit.NewClient(\n\t\toption.WithPrivateKey("My Private Key"),\n\t\toption.WithPassword("My Password"),\n\t)\n\tuploadResponse, err := client.Assets.Upload(context.TODO(), imagekit.AssetUploadParams{\n\t\tUploadRequest: imagekit.UploadRequestParam{\n\t\t\tFile:     io.Reader(bytes.NewBuffer([]byte("Example data"))),\n\t\t\tFileName: "file_name",\n\t\t},\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", uploadResponse)\n}\n',
      },
      java: {
        method: 'assets().upload',
        example:
          'package io.imagekit.example;\n\nimport io.imagekit.client.ImageKitClient;\nimport io.imagekit.client.okhttp.ImageKitOkHttpClient;\nimport io.imagekit.models.assets.UploadRequest;\nimport io.imagekit.models.assets.UploadResponse;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        ImageKitClient client = ImageKitOkHttpClient.fromEnv();\n\n        UploadRequest params = UploadRequest.builder()\n            .file("Example data")\n            .fileName("file_name")\n            .build();\n        UploadResponse uploadResponse = client.assets().upload(params);\n    }\n}',
      },
      php: {
        method: 'assets->upload',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(privateKey: 'My Private Key', password: 'My Password');\n\n$uploadResponse = $client->assets->upload(\n  file: FileParam::fromString('Example data', filename: uniqid('file-upload-', true)),\n  fileName: 'file_name',\n  token: 'token',\n  checks: \"\\\"request.folder\\\" : \\\"marketing/\\\"\\n\",\n  customCoordinates: 'custom_coordinates',\n  customMetadata: ['brand' => 'bar', 'color' => 'bar'],\n  description: 'Running shoes',\n  extensions: [\n    [\n      'name' => 'remove-bg',\n      'options' => [\n        'addShadow' => true,\n        'bgColor' => 'bg_color',\n        'bgImageURL' => 'bg_image_url',\n        'semiTransparency' => true,\n      ],\n    ],\n    [\n      'name' => 'remove-bg',\n      'options' => [\n        'addShadow' => true,\n        'bgColor' => 'bg_color',\n        'bgImageURL' => 'bg_image_url',\n        'semiTransparency' => true,\n      ],\n    ],\n    ['name' => 'ai-auto-description'],\n    [\n      'name' => 'ai-tasks',\n      'tasks' => [\n        [\n          'instruction' => 'What types of clothing items are visible in this image?',\n          'type' => 'select_tags',\n          'maxSelections' => 1,\n          'minSelections' => 0,\n          'vocabulary' => ['shirt', 'tshirt', 'dress', 'trousers', 'jacket'],\n        ],\n        [\n          'instruction' => 'Is this a luxury or high-end fashion item?',\n          'type' => 'yes_no',\n          'onNo' => [\n            'addTags' => ['luxury', 'premium'],\n            'removeTags' => ['budget', 'affordable'],\n            'setMetadata' => [['field' => 'price_range', 'value' => 'premium']],\n            'unsetMetadata' => [['field' => 'price_range']],\n          ],\n          'onUnknown' => [\n            'addTags' => ['luxury', 'premium'],\n            'removeTags' => ['budget', 'affordable'],\n            'setMetadata' => [['field' => 'price_range', 'value' => 'premium']],\n            'unsetMetadata' => [['field' => 'price_range']],\n          ],\n          'onYes' => [\n            'addTags' => ['luxury', 'premium'],\n            'removeTags' => ['budget', 'affordable'],\n            'setMetadata' => [['field' => 'price_range', 'value' => 'premium']],\n            'unsetMetadata' => [['field' => 'price_range']],\n          ],\n        ],\n      ],\n    ],\n    ['id' => 'ext_abc123', 'name' => 'saved-extension'],\n  ],\n  folder: 'folder',\n  isPrivateFile: true,\n  isPublished: true,\n  overwrite: [\n    'aiTags' => true, 'customMetadata' => true, 'file' => true, 'tags' => true\n  ],\n  tags: ['t-shirt', 'round-neck', 'men'],\n  transformation: [\n    'post' => [\n      ['type' => 'thumbnail', 'value' => 'w-150,h-150'],\n      [\n        'protocol' => 'dash',\n        'type' => 'abs',\n        'value' => 'sr-240_360_480_720_1080',\n      ],\n    ],\n    'pre' => 'w-300,h-300,q-80',\n  ],\n  useUniqueFileName: true,\n);\n\nvar_dump($uploadResponse);",
      },
      python: {
        method: 'assets.upload',
        example:
          'import os\nfrom imagekitio import ImageKit\n\nclient = ImageKit(\n    private_key=os.environ.get("IMAGEKIT_PRIVATE_KEY"),  # This is the default and can be omitted\n    password=os.environ.get("OPTIONAL_IMAGEKIT_IGNORES_THIS"),  # This is the default and can be omitted\n)\nupload_response = client.assets.upload(\n    file=b"Example data",\n    file_name="file_name",\n)\nprint(upload_response)',
      },
      ruby: {
        method: 'assets.upload',
        example:
          'require "imagekitio"\n\nimage_kit = Imagekitio::Client.new(private_key: "My Private Key", password: "My Password")\n\nupload_response = image_kit.assets.upload(file: StringIO.new("Example data"), file_name: "file_name")\n\nputs(upload_response)',
      },
      typescript: {
        method: 'client.assets.upload',
        example:
          "import fs from 'fs';\nimport ImageKit from '@imagekit/nodejs';\n\nconst client = new ImageKit({\n  privateKey: process.env['IMAGEKIT_PRIVATE_KEY'], // This is the default and can be omitted\n  password: process.env['OPTIONAL_IMAGEKIT_IGNORES_THIS'], // This is the default and can be omitted\n});\n\nconst uploadResponse = await client.assets.upload({\n  file: fs.createReadStream('path/to/file'),\n  file_name: 'file_name',\n});\n\nconsole.log(uploadResponse);",
      },
      http: {
        example:
          'curl https://upload.imagekit.io/v2/assets/upload \\\n    -H \'Content-Type: multipart/form-data\' \\\n    -u "$IMAGEKIT_PRIVATE_KEY:OPTIONAL_IMAGEKIT_IGNORES_THIS" \\\n    -F \'file=@/path/to/file\' \\\n    -F file_name=file_name \\\n    -F checks=\'"request.folder" : "marketing/"\n    \' \\\n    -F custom_metadata=\'{"brand":"bar","color":"bar"}\' \\\n    -F description=\'Running shoes\' \\\n    -F extensions=\'[{"name":"remove-bg","options":{"add_shadow":true}},{"name":"remove-bg"},{"name":"ai-auto-description"},{"name":"ai-tasks","tasks":[{"instruction":"What types of clothing items are visible in this image?","type":"select_tags","vocabulary":["shirt","tshirt","dress","trousers","jacket"]},{"instruction":"Is this a luxury or high-end fashion item?","type":"yes_no","on_yes":{"add_tags":["luxury","premium"]}}]},{"id":"ext_abc123","name":"saved-extension"}]\' \\\n    -F tags=\'["t-shirt","round-neck","men"]\' \\\n    -F transformation=\'{"post":[{"type":"thumbnail","value":"w-150,h-150"},{"protocol":"dash","type":"abs","value":"sr-240_360_480_720_1080"}]}\'',
      },
      csharp: {
        method: 'Assets.Upload',
        example:
          'AssetUploadParams parameters = new()\n{\n    File = Encoding.UTF8.GetBytes("Example data"),\n    FileName = "file_name",\n};\n\nvar uploadResponse = await client.Assets.Upload(parameters);\n\nConsole.WriteLine(uploadResponse);',
      },
    },
  },
  {
    name: 'list',
    endpoint: '/v2/assets',
    httpMethod: 'get',
    summary: 'List and search assets',
    description:
      'This API can list all the uploaded files and folders in your ImageKit.io media library. In addition, you can fine-tune your query by specifying various filters by generating a query string in a Lucene-like syntax and provide this generated string as the value of the `searchQuery`.\n',
    stainlessPath: '(resource) assets > (method) list',
    qualified: 'client.assets.list',
    params: ['cursor?: string;', 'limit?: number;', 'searchQuery?: string;', 'sort?: string;'],
    response:
      "{ id?: string; ai_tags?: object[]; asset_type?: string; asset_url?: string; created_at?: string; custom_coordinates?: string; custom_metadata?: object; description?: string; embedded_metadata?: object; is_private_file?: boolean; is_published?: boolean; metadata?: metadata; name?: string; path?: string; size?: number; tags?: string[]; thumbnail_url?: string; updated_at?: string; version_info?: object; } | { id?: string; ai_tags?: object[]; asset_type?: string; asset_url?: string; created_at?: string; custom_coordinates?: string; custom_metadata?: object; description?: string; embedded_metadata?: object; is_private_file?: boolean; is_published?: boolean; metadata?: metadata; name?: string; path?: string; size?: number; tags?: string[]; thumbnail_url?: string; updated_at?: string; version_info?: object; } | { id?: string; created_at?: string; custom_metadata?: object; name?: string; path?: string; type?: 'folder'; updated_at?: string; }",
    markdown:
      "## list\n\n`client.assets.list(cursor?: string, limit?: number, searchQuery?: string, sort?: string): file_asset | file_asset | object`\n\n**get** `/v2/assets`\n\nThis API can list all the uploaded files and folders in your ImageKit.io media library. In addition, you can fine-tune your query by specifying various filters by generating a query string in a Lucene-like syntax and provide this generated string as the value of the `searchQuery`.\n\n\n### Parameters\n\n- `cursor?: string`\n  Opaque cursor returned in the `start_cursor` or `end_cursor` field of a previous response. Pass it to fetch the next (or previous) page of results. Omit to start from the beginning.\n\n\n- `limit?: number`\n  The maximum number of results to return in response.\n\n\n- `searchQuery?: string`\n  Query string in a Lucene-like query language e.g. `createdAt > \"7d\"`.\n\n[Learn more](/docs/api-reference/digital-asset-management-dam/list-and-search-assets#advanced-search-queries) from examples.\n\n\n- `sort?: string`\n  Sort the results by one of the supported fields in ascending or descending order.\n\n\n### Returns\n\n- `{ id?: string; ai_tags?: object[]; asset_type?: string; asset_url?: string; created_at?: string; custom_coordinates?: string; custom_metadata?: object; description?: string; embedded_metadata?: object; is_private_file?: boolean; is_published?: boolean; metadata?: metadata; name?: string; path?: string; size?: number; tags?: string[]; thumbnail_url?: string; updated_at?: string; version_info?: object; } | { id?: string; ai_tags?: object[]; asset_type?: string; asset_url?: string; created_at?: string; custom_coordinates?: string; custom_metadata?: object; description?: string; embedded_metadata?: object; is_private_file?: boolean; is_published?: boolean; metadata?: metadata; name?: string; path?: string; size?: number; tags?: string[]; thumbnail_url?: string; updated_at?: string; version_info?: object; } | { id?: string; created_at?: string; custom_metadata?: object; name?: string; path?: string; type?: 'folder'; updated_at?: string; }`\n  Object containing details of a file.\n\n### Example\n\n```typescript\nimport ImageKit from '@imagekit/nodejs';\n\nconst client = new ImageKit();\n\n// Automatically fetches more pages as needed.\nfor await (const assetListResponse of client.assets.list()) {\n  console.log(assetListResponse);\n}\n```",
    perLanguage: {
      go: {
        method: 'client.Assets.List',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/imagekit-developer/imagekit-go/v2"\n\t"github.com/imagekit-developer/imagekit-go/v2/option"\n)\n\nfunc main() {\n\tclient := imagekit.NewClient(\n\t\toption.WithPrivateKey("My Private Key"),\n\t\toption.WithPassword("My Password"),\n\t)\n\tpage, err := client.Assets.List(context.TODO(), imagekit.AssetListParams{})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", page)\n}\n',
      },
      java: {
        method: 'assets().list',
        example:
          'package io.imagekit.example;\n\nimport io.imagekit.client.ImageKitClient;\nimport io.imagekit.client.okhttp.ImageKitOkHttpClient;\nimport io.imagekit.models.assets.AssetListPage;\nimport io.imagekit.models.assets.AssetListParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        ImageKitClient client = ImageKitOkHttpClient.fromEnv();\n\n        AssetListPage page = client.assets().list();\n    }\n}',
      },
      php: {
        method: 'assets->list',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(privateKey: 'My Private Key', password: 'My Password');\n\n$page = $client->assets->list(\n  cursor: 'cursor', limit: 1, searchQuery: 'searchQuery', sort: 'ASC_NAME'\n);\n\nvar_dump($page);",
      },
      python: {
        method: 'assets.list',
        example:
          'import os\nfrom imagekitio import ImageKit\n\nclient = ImageKit(\n    private_key=os.environ.get("IMAGEKIT_PRIVATE_KEY"),  # This is the default and can be omitted\n    password=os.environ.get("OPTIONAL_IMAGEKIT_IGNORES_THIS"),  # This is the default and can be omitted\n)\npage = client.assets.list()\npage = page.items[0]\nprint(page)',
      },
      ruby: {
        method: 'assets.list',
        example:
          'require "imagekitio"\n\nimage_kit = Imagekitio::Client.new(private_key: "My Private Key", password: "My Password")\n\npage = image_kit.assets.list\n\nputs(page)',
      },
      typescript: {
        method: 'client.assets.list',
        example:
          "import ImageKit from '@imagekit/nodejs';\n\nconst client = new ImageKit({\n  privateKey: process.env['IMAGEKIT_PRIVATE_KEY'], // This is the default and can be omitted\n  password: process.env['OPTIONAL_IMAGEKIT_IGNORES_THIS'], // This is the default and can be omitted\n});\n\n// Automatically fetches more pages as needed.\nfor await (const assetListResponse of client.assets.list()) {\n  console.log(assetListResponse);\n}",
      },
      http: {
        example:
          'curl https://api.imagekit.io/v2/assets \\\n    -u "$IMAGEKIT_PRIVATE_KEY:OPTIONAL_IMAGEKIT_IGNORES_THIS"',
      },
      csharp: {
        method: 'Assets.List',
        example:
          'AssetListParams parameters = new();\n\nvar page = await client.Assets.List(parameters);\nawait foreach (var item in page.Paginate())\n{\n    Console.WriteLine(item);\n}',
      },
    },
  },
  {
    name: 'get',
    endpoint: '/v2/assets/{asset_id}',
    httpMethod: 'get',
    summary: 'Get asset details',
    description:
      'Returns the details of a single asset — either a file or a folder — by its unique `asset_id`.\nUse this endpoint to fetch metadata for any file or folder returned by the list and search assets API.\n',
    stainlessPath: '(resource) assets > (method) get',
    qualified: 'client.assets.get',
    params: ['asset_id: string;'],
    response:
      "{ id?: string; ai_tags?: object[]; asset_type?: string; asset_url?: string; created_at?: string; custom_coordinates?: string; custom_metadata?: object; description?: string; embedded_metadata?: object; is_private_file?: boolean; is_published?: boolean; metadata?: metadata; name?: string; path?: string; size?: number; tags?: string[]; thumbnail_url?: string; updated_at?: string; version_info?: object; } | { id?: string; created_at?: string; custom_metadata?: object; name?: string; path?: string; type?: 'folder'; updated_at?: string; }",
    markdown:
      "## get\n\n`client.assets.get(asset_id: string): file_asset | object`\n\n**get** `/v2/assets/{asset_id}`\n\nReturns the details of a single asset — either a file or a folder — by its unique `asset_id`.\nUse this endpoint to fetch metadata for any file or folder returned by the list and search assets API.\n\n\n### Parameters\n\n- `asset_id: string`\n\n### Returns\n\n- `{ id?: string; ai_tags?: object[]; asset_type?: string; asset_url?: string; created_at?: string; custom_coordinates?: string; custom_metadata?: object; description?: string; embedded_metadata?: object; is_private_file?: boolean; is_published?: boolean; metadata?: metadata; name?: string; path?: string; size?: number; tags?: string[]; thumbnail_url?: string; updated_at?: string; version_info?: object; } | { id?: string; created_at?: string; custom_metadata?: object; name?: string; path?: string; type?: 'folder'; updated_at?: string; }`\n  Object containing details of a file.\n\n### Example\n\n```typescript\nimport ImageKit from '@imagekit/nodejs';\n\nconst client = new ImageKit();\n\nconst asset = await client.assets.get('asset_id');\n\nconsole.log(asset);\n```",
    perLanguage: {
      go: {
        method: 'client.Assets.Get',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/imagekit-developer/imagekit-go/v2"\n\t"github.com/imagekit-developer/imagekit-go/v2/option"\n)\n\nfunc main() {\n\tclient := imagekit.NewClient(\n\t\toption.WithPrivateKey("My Private Key"),\n\t\toption.WithPassword("My Password"),\n\t)\n\tasset, err := client.Assets.Get(context.TODO(), "asset_id")\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", asset)\n}\n',
      },
      java: {
        method: 'assets().get',
        example:
          'package io.imagekit.example;\n\nimport io.imagekit.client.ImageKitClient;\nimport io.imagekit.client.okhttp.ImageKitOkHttpClient;\nimport io.imagekit.models.assets.AssetGetParams;\nimport io.imagekit.models.assets.AssetGetResponse;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        ImageKitClient client = ImageKitOkHttpClient.fromEnv();\n\n        AssetGetResponse asset = client.assets().get("asset_id");\n    }\n}',
      },
      php: {
        method: 'assets->get',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(privateKey: 'My Private Key', password: 'My Password');\n\n$asset = $client->assets->get('asset_id');\n\nvar_dump($asset);",
      },
      python: {
        method: 'assets.get',
        example:
          'import os\nfrom imagekitio import ImageKit\n\nclient = ImageKit(\n    private_key=os.environ.get("IMAGEKIT_PRIVATE_KEY"),  # This is the default and can be omitted\n    password=os.environ.get("OPTIONAL_IMAGEKIT_IGNORES_THIS"),  # This is the default and can be omitted\n)\nasset = client.assets.get(\n    "asset_id",\n)\nprint(asset)',
      },
      ruby: {
        method: 'assets.get',
        example:
          'require "imagekitio"\n\nimage_kit = Imagekitio::Client.new(private_key: "My Private Key", password: "My Password")\n\nasset = image_kit.assets.get("asset_id")\n\nputs(asset)',
      },
      typescript: {
        method: 'client.assets.get',
        example:
          "import ImageKit from '@imagekit/nodejs';\n\nconst client = new ImageKit({\n  privateKey: process.env['IMAGEKIT_PRIVATE_KEY'], // This is the default and can be omitted\n  password: process.env['OPTIONAL_IMAGEKIT_IGNORES_THIS'], // This is the default and can be omitted\n});\n\nconst asset = await client.assets.get('asset_id');\n\nconsole.log(asset);",
      },
      http: {
        example:
          'curl https://api.imagekit.io/v2/assets/$ASSET_ID \\\n    -u "$IMAGEKIT_PRIVATE_KEY:OPTIONAL_IMAGEKIT_IGNORES_THIS"',
      },
      csharp: {
        method: 'Assets.Get',
        example:
          'AssetGetParams parameters = new() { AssetID = "asset_id" };\n\nvar asset = await client.Assets.Get(parameters);\n\nConsole.WriteLine(asset);',
      },
    },
  },
  {
    name: 'update',
    endpoint: '/v2/assets/{asset_id}',
    httpMethod: 'patch',
    summary: 'Update asset details',
    description:
      'Updates the details or attributes of the current version of a file. You can update `tags`, `custom_coordinates`, `custom_metadata`, publication status, remove existing `ai_tags`, and apply extensions using this API.\n',
    stainlessPath: '(resource) assets > (method) update',
    qualified: 'client.assets.update',
    params: [
      'asset_id: string;',
      'custom_coordinates?: string;',
      'custom_metadata?: object;',
      'description?: string;',
      "extensions?: { name: 'remove-bg'; options?: { add_shadow?: boolean; bg_color?: string; bg_image_url?: string; semi_transparency?: boolean; }; } | { max_tags: number; min_confidence: number; name: 'google-auto-tagging' | 'aws-auto-tagging'; } | { name: 'ai-auto-description'; } | { name: 'ai-tasks'; tasks: object | object | object[]; } | { id: string; name: 'saved-extension'; }[];",
      'publish?: { is_published: boolean; include_file_versions?: boolean; };',
      "remove_ai_tags?: string[] | 'all';",
      'tags?: string[];',
      'webhook_url?: string;',
    ],
    response:
      '{ id?: string; ai_tags?: object[]; asset_type?: string; asset_url?: string; created_at?: string; custom_coordinates?: string; custom_metadata?: object; description?: string; embedded_metadata?: object; is_private_file?: boolean; is_published?: boolean; metadata?: metadata; name?: string; path?: string; size?: number; tags?: string[]; thumbnail_url?: string; updated_at?: string; version_info?: object; }',
    markdown:
      "## update\n\n`client.assets.update(asset_id: string, custom_coordinates?: string, custom_metadata?: object, description?: string, extensions?: object | object | object | object | object[], publish?: { is_published: boolean; include_file_versions?: boolean; }, remove_ai_tags?: string[] | 'all', tags?: string[], webhook_url?: string): file_asset`\n\n**patch** `/v2/assets/{asset_id}`\n\nUpdates the details or attributes of the current version of a file. You can update `tags`, `custom_coordinates`, `custom_metadata`, publication status, remove existing `ai_tags`, and apply extensions using this API.\n\n\n### Parameters\n\n- `asset_id: string`\n\n- `custom_coordinates?: string`\n  Define an important area in the image in the format `x,y,width,height` e.g. `10,10,100,100`. Send `null` to unset this value.\n\n\n- `custom_metadata?: object`\n  A key-value data to be associated with the asset. To unset a key, send `null` value for that key. Before setting any custom metadata on an asset you have to create the field using custom metadata fields API.\n\n\n- `description?: string`\n  Optional text to describe the contents of the file.\n\n\n- `extensions?: { name: 'remove-bg'; options?: { add_shadow?: boolean; bg_color?: string; bg_image_url?: string; semi_transparency?: boolean; }; } | { max_tags: number; min_confidence: number; name: 'google-auto-tagging' | 'aws-auto-tagging'; } | { name: 'ai-auto-description'; } | { name: 'ai-tasks'; tasks: object | object | object[]; } | { id: string; name: 'saved-extension'; }[]`\n  Array of extensions to be applied to the asset. Each extension can be configured with specific parameters based on the extension type.\n\n\n- `publish?: { is_published: boolean; include_file_versions?: boolean; }`\n  Configure the publication status of a file and its versions.\n\n  - `is_published: boolean`\n    Set to `true` to publish the file. Set to `false` to unpublish the file.\n\n  - `include_file_versions?: boolean`\n    Set to `true` to publish/unpublish all versions of the file. Set to `false` to publish/unpublish only the current version of the file.\n\n\n- `remove_ai_tags?: string[] | 'all'`\n  An array of AI tags associated with the file that you want to remove, e.g. `[\"car\", \"vehicle\", \"motorsports\"]`.\n\nIf you want to remove all AI tags associated with the file, send the string `\"all\"`.\n\nNote: The remove operation for `ai_tags` executes before any of the `extensions` are processed.\n\n\n- `tags?: string[]`\n  An array of tags associated with the file, such as `[\"tag1\", \"tag2\"]`. Send `null` to unset all tags associated with the file.\n\n\n- `webhook_url?: string`\n  The final status of extensions after they have completed execution will be delivered to this endpoint as a POST request. [Learn more](/docs/api-reference/digital-asset-management-dam/managing-assets/update-file-details#webhook-payload-structure) about the webhook payload structure.\n\n\n### Returns\n\n- `{ id?: string; ai_tags?: object[]; asset_type?: string; asset_url?: string; created_at?: string; custom_coordinates?: string; custom_metadata?: object; description?: string; embedded_metadata?: object; is_private_file?: boolean; is_published?: boolean; metadata?: metadata; name?: string; path?: string; size?: number; tags?: string[]; thumbnail_url?: string; updated_at?: string; version_info?: object; }`\n  Object containing details of a file.\n\n### Example\n\n```typescript\nimport ImageKit from '@imagekit/nodejs';\n\nconst client = new ImageKit();\n\nconst asset = await client.assets.update('asset_id');\n\nconsole.log(asset);\n```",
    perLanguage: {
      go: {
        method: 'client.Assets.Update',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/imagekit-developer/imagekit-go/v2"\n\t"github.com/imagekit-developer/imagekit-go/v2/option"\n)\n\nfunc main() {\n\tclient := imagekit.NewClient(\n\t\toption.WithPrivateKey("My Private Key"),\n\t\toption.WithPassword("My Password"),\n\t)\n\tasset, err := client.Assets.Update(\n\t\tcontext.TODO(),\n\t\t"asset_id",\n\t\timagekit.AssetUpdateParams{\n\t\t\tUpdateAssetRequest: imagekit.UpdateAssetRequestParam{},\n\t\t},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", asset)\n}\n',
      },
      java: {
        method: 'assets().update',
        example:
          'package io.imagekit.example;\n\nimport io.imagekit.client.ImageKitClient;\nimport io.imagekit.client.okhttp.ImageKitOkHttpClient;\nimport io.imagekit.models.assets.AssetUpdateParams;\nimport io.imagekit.models.assets.AssetUpdateResponse;\nimport io.imagekit.models.assets.UpdateAssetRequest;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        ImageKitClient client = ImageKitOkHttpClient.fromEnv();\n\n        AssetUpdateParams params = AssetUpdateParams.builder()\n            .assetId("asset_id")\n            .updateAssetRequest(UpdateAssetRequest.builder().build())\n            .build();\n        AssetUpdateResponse asset = client.assets().update(params);\n    }\n}',
      },
      php: {
        method: 'assets->update',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(privateKey: 'My Private Key', password: 'My Password');\n\n$asset = $client->assets->update(\n  'asset_id',\n  customCoordinates: '10,10,100,100',\n  customMetadata: ['brand' => 'bar', 'color' => 'bar'],\n  description: 'A product description',\n  extensions: [\n    [\n      'name' => 'remove-bg',\n      'options' => [\n        'addShadow' => true,\n        'bgColor' => 'bg_color',\n        'bgImageURL' => 'bg_image_url',\n        'semiTransparency' => true,\n      ],\n    ],\n    [\n      'name' => 'remove-bg',\n      'options' => [\n        'addShadow' => true,\n        'bgColor' => 'bg_color',\n        'bgImageURL' => 'bg_image_url',\n        'semiTransparency' => true,\n      ],\n    ],\n    ['name' => 'ai-auto-description'],\n    [\n      'name' => 'ai-tasks',\n      'tasks' => [\n        [\n          'instruction' => 'What types of clothing items are visible in this image?',\n          'type' => 'select_tags',\n          'maxSelections' => 1,\n          'minSelections' => 0,\n          'vocabulary' => ['shirt', 'tshirt', 'dress', 'trousers', 'jacket'],\n        ],\n        [\n          'instruction' => 'Is this a luxury or high-end fashion item?',\n          'type' => 'yes_no',\n          'onNo' => [\n            'addTags' => ['luxury', 'premium'],\n            'removeTags' => ['budget', 'affordable'],\n            'setMetadata' => [['field' => 'price_range', 'value' => 'premium']],\n            'unsetMetadata' => [['field' => 'price_range']],\n          ],\n          'onUnknown' => [\n            'addTags' => ['luxury', 'premium'],\n            'removeTags' => ['budget', 'affordable'],\n            'setMetadata' => [['field' => 'price_range', 'value' => 'premium']],\n            'unsetMetadata' => [['field' => 'price_range']],\n          ],\n          'onYes' => [\n            'addTags' => ['luxury', 'premium'],\n            'removeTags' => ['budget', 'affordable'],\n            'setMetadata' => [['field' => 'price_range', 'value' => 'premium']],\n            'unsetMetadata' => [['field' => 'price_range']],\n          ],\n        ],\n      ],\n    ],\n    ['id' => 'ext_abc123', 'name' => 'saved-extension'],\n  ],\n  publish: ['isPublished' => true, 'includeFileVersions' => true],\n  removeAITags: ['car', 'vehicle', 'motorsports'],\n  tags: ['tag1', 'tag2'],\n  webhookURL: 'https://webhook.site/0d6b6c7a-8e5a-4b3a-8b7c-0d6b6c7a8e5a',\n);\n\nvar_dump($asset);",
      },
      python: {
        method: 'assets.update',
        example:
          'import os\nfrom imagekitio import ImageKit\n\nclient = ImageKit(\n    private_key=os.environ.get("IMAGEKIT_PRIVATE_KEY"),  # This is the default and can be omitted\n    password=os.environ.get("OPTIONAL_IMAGEKIT_IGNORES_THIS"),  # This is the default and can be omitted\n)\nasset = client.assets.update(\n    asset_id="asset_id",\n)\nprint(asset)',
      },
      ruby: {
        method: 'assets.update',
        example:
          'require "imagekitio"\n\nimage_kit = Imagekitio::Client.new(private_key: "My Private Key", password: "My Password")\n\nasset = image_kit.assets.update("asset_id")\n\nputs(asset)',
      },
      typescript: {
        method: 'client.assets.update',
        example:
          "import ImageKit from '@imagekit/nodejs';\n\nconst client = new ImageKit({\n  privateKey: process.env['IMAGEKIT_PRIVATE_KEY'], // This is the default and can be omitted\n  password: process.env['OPTIONAL_IMAGEKIT_IGNORES_THIS'], // This is the default and can be omitted\n});\n\nconst asset = await client.assets.update('asset_id');\n\nconsole.log(asset);",
      },
      http: {
        example:
          'curl https://api.imagekit.io/v2/assets/$ASSET_ID \\\n    -X PATCH \\\n    -H \'Content-Type: application/json\' \\\n    -u "$IMAGEKIT_PRIVATE_KEY:OPTIONAL_IMAGEKIT_IGNORES_THIS" \\\n    -d \'{\n          "custom_coordinates": "10,10,100,100",\n          "custom_metadata": {\n            "brand": "bar",\n            "color": "bar"\n          },\n          "description": "A product description",\n          "extensions": [\n            {\n              "name": "remove-bg",\n              "options": {\n                "add_shadow": true\n              }\n            },\n            {\n              "name": "remove-bg"\n            },\n            {\n              "name": "ai-auto-description"\n            },\n            {\n              "name": "ai-tasks",\n              "tasks": [\n                {\n                  "instruction": "What types of clothing items are visible in this image?",\n                  "type": "select_tags",\n                  "vocabulary": [\n                    "shirt",\n                    "tshirt",\n                    "dress",\n                    "trousers",\n                    "jacket"\n                  ]\n                },\n                {\n                  "instruction": "Is this a luxury or high-end fashion item?",\n                  "type": "yes_no",\n                  "on_yes": {\n                    "add_tags": [\n                      "luxury",\n                      "premium"\n                    ]\n                  }\n                }\n              ]\n            },\n            {\n              "id": "ext_abc123",\n              "name": "saved-extension"\n            }\n          ],\n          "remove_ai_tags": [\n            "car",\n            "vehicle",\n            "motorsports"\n          ],\n          "tags": [\n            "tag1",\n            "tag2"\n          ],\n          "webhook_url": "https://webhook.site/0d6b6c7a-8e5a-4b3a-8b7c-0d6b6c7a8e5a"\n        }\'',
      },
      csharp: {
        method: 'Assets.Update',
        example:
          'AssetUpdateParams parameters = new() { AssetID = "asset_id" };\n\nvar asset = await client.Assets.Update(parameters);\n\nConsole.WriteLine(asset);',
      },
    },
  },
  {
    name: 'delete',
    endpoint: '/v2/assets/{asset_id}',
    httpMethod: 'delete',
    summary: 'Delete asset',
    description:
      'Deletes a file and all of its file versions permanently.\n\nNote: If a file or specific transformation has been requested in the past, then the response is cached. Deleting a file does not purge the cache. You can purge the cache using the purge cache API.\n',
    stainlessPath: '(resource) assets > (method) delete',
    qualified: 'client.assets.delete',
    params: ['asset_id: string;'],
    markdown:
      "## delete\n\n`client.assets.delete(asset_id: string): void`\n\n**delete** `/v2/assets/{asset_id}`\n\nDeletes a file and all of its file versions permanently.\n\nNote: If a file or specific transformation has been requested in the past, then the response is cached. Deleting a file does not purge the cache. You can purge the cache using the purge cache API.\n\n\n### Parameters\n\n- `asset_id: string`\n\n### Example\n\n```typescript\nimport ImageKit from '@imagekit/nodejs';\n\nconst client = new ImageKit();\n\nawait client.assets.delete('asset_id')\n```",
    perLanguage: {
      go: {
        method: 'client.Assets.Delete',
        example:
          'package main\n\nimport (\n\t"context"\n\n\t"github.com/imagekit-developer/imagekit-go/v2"\n\t"github.com/imagekit-developer/imagekit-go/v2/option"\n)\n\nfunc main() {\n\tclient := imagekit.NewClient(\n\t\toption.WithPrivateKey("My Private Key"),\n\t\toption.WithPassword("My Password"),\n\t)\n\terr := client.Assets.Delete(context.TODO(), "asset_id")\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n}\n',
      },
      java: {
        method: 'assets().delete',
        example:
          'package io.imagekit.example;\n\nimport io.imagekit.client.ImageKitClient;\nimport io.imagekit.client.okhttp.ImageKitOkHttpClient;\nimport io.imagekit.models.assets.AssetDeleteParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        ImageKitClient client = ImageKitOkHttpClient.fromEnv();\n\n        client.assets().delete("asset_id");\n    }\n}',
      },
      php: {
        method: 'assets->delete',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(privateKey: 'My Private Key', password: 'My Password');\n\n$result = $client->assets->delete('asset_id');\n\nvar_dump($result);",
      },
      python: {
        method: 'assets.delete',
        example:
          'import os\nfrom imagekitio import ImageKit\n\nclient = ImageKit(\n    private_key=os.environ.get("IMAGEKIT_PRIVATE_KEY"),  # This is the default and can be omitted\n    password=os.environ.get("OPTIONAL_IMAGEKIT_IGNORES_THIS"),  # This is the default and can be omitted\n)\nclient.assets.delete(\n    "asset_id",\n)',
      },
      ruby: {
        method: 'assets.delete',
        example:
          'require "imagekitio"\n\nimage_kit = Imagekitio::Client.new(private_key: "My Private Key", password: "My Password")\n\nresult = image_kit.assets.delete("asset_id")\n\nputs(result)',
      },
      typescript: {
        method: 'client.assets.delete',
        example:
          "import ImageKit from '@imagekit/nodejs';\n\nconst client = new ImageKit({\n  privateKey: process.env['IMAGEKIT_PRIVATE_KEY'], // This is the default and can be omitted\n  password: process.env['OPTIONAL_IMAGEKIT_IGNORES_THIS'], // This is the default and can be omitted\n});\n\nawait client.assets.delete('asset_id');",
      },
      http: {
        example:
          'curl https://api.imagekit.io/v2/assets/$ASSET_ID \\\n    -X DELETE \\\n    -u "$IMAGEKIT_PRIVATE_KEY:OPTIONAL_IMAGEKIT_IGNORES_THIS"',
      },
      csharp: {
        method: 'Assets.Delete',
        example:
          'AssetDeleteParams parameters = new() { AssetID = "asset_id" };\n\nawait client.Assets.Delete(parameters);',
      },
    },
  },
  {
    name: 'copy',
    endpoint: '/v2/assets/copy',
    httpMethod: 'post',
    summary: 'Copy asset',
    description:
      "Copies a file or a folder from one location to another. Pass a file path or a folder path in `source_path`.\n\n- **File copy** is synchronous and returns `204 No Content`.\n- **Folder copy** is asynchronous — the selected folder along with its nested folders, files, and (optionally) file versions are copied in the background. The API returns `202 Accepted` with a `job_id`. Use the [get job status](#operation/get-job-status) API to track progress.\n\nNote: If a file at the destination has the same name as a source file, the source file (and its versions, when `include_versions` is `true`) will be appended to the destination file's version history.\n",
    stainlessPath: '(resource) assets > (method) copy',
    qualified: 'client.assets.copy',
    params: ['destination_path: string;', 'source_path: string;', 'include_versions?: boolean;'],
    response: '{ job_id: string; }',
    markdown:
      "## copy\n\n`client.assets.copy(destination_path: string, source_path: string, include_versions?: boolean): { job_id: string; }`\n\n**post** `/v2/assets/copy`\n\nCopies a file or a folder from one location to another. Pass a file path or a folder path in `source_path`.\n\n- **File copy** is synchronous and returns `204 No Content`.\n- **Folder copy** is asynchronous — the selected folder along with its nested folders, files, and (optionally) file versions are copied in the background. The API returns `202 Accepted` with a `job_id`. Use the [get job status](#operation/get-job-status) API to track progress.\n\nNote: If a file at the destination has the same name as a source file, the source file (and its versions, when `include_versions` is `true`) will be appended to the destination file's version history.\n\n\n### Parameters\n\n- `destination_path: string`\n  Full path of the destination folder.\n\n- `source_path: string`\n  Full path of the file or folder you want to copy.\n\n- `include_versions?: boolean`\n  When `true`, all versions of the source file(s) are copied. When `false` (default), only the current version is copied. Applies to both file and folder copy operations.\n\n\n### Returns\n\n- `{ job_id: string; }`\n\n  - `job_id: string`\n\n### Example\n\n```typescript\nimport ImageKit from '@imagekit/nodejs';\n\nconst client = new ImageKit();\n\nconst response = await client.assets.copy({ destination_path: '/folder/to/copy/into/', source_path: '/path/to/file.jpg' });\n\nconsole.log(response);\n```",
    perLanguage: {
      go: {
        method: 'client.Assets.Copy',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/imagekit-developer/imagekit-go/v2"\n\t"github.com/imagekit-developer/imagekit-go/v2/option"\n)\n\nfunc main() {\n\tclient := imagekit.NewClient(\n\t\toption.WithPrivateKey("My Private Key"),\n\t\toption.WithPassword("My Password"),\n\t)\n\tresponse, err := client.Assets.Copy(context.TODO(), imagekit.AssetCopyParams{\n\t\tDestinationPath: "/folder/to/copy/into/",\n\t\tSourcePath:      "/path/to/file.jpg",\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.JobID)\n}\n',
      },
      java: {
        method: 'assets().copy',
        example:
          'package io.imagekit.example;\n\nimport io.imagekit.client.ImageKitClient;\nimport io.imagekit.client.okhttp.ImageKitOkHttpClient;\nimport io.imagekit.models.assets.AssetCopyParams;\nimport io.imagekit.models.assets.AssetCopyResponse;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        ImageKitClient client = ImageKitOkHttpClient.fromEnv();\n\n        AssetCopyParams params = AssetCopyParams.builder()\n            .destinationPath("/folder/to/copy/into/")\n            .sourcePath("/path/to/file.jpg")\n            .build();\n        AssetCopyResponse response = client.assets().copy(params);\n    }\n}',
      },
      php: {
        method: 'assets->copy',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(privateKey: 'My Private Key', password: 'My Password');\n\n$response = $client->assets->copy(\n  destinationPath: '/folder/to/copy/into/',\n  sourcePath: '/path/to/file.jpg',\n  includeVersions: true,\n);\n\nvar_dump($response);",
      },
      python: {
        method: 'assets.copy',
        example:
          'import os\nfrom imagekitio import ImageKit\n\nclient = ImageKit(\n    private_key=os.environ.get("IMAGEKIT_PRIVATE_KEY"),  # This is the default and can be omitted\n    password=os.environ.get("OPTIONAL_IMAGEKIT_IGNORES_THIS"),  # This is the default and can be omitted\n)\nresponse = client.assets.copy(\n    destination_path="/folder/to/copy/into/",\n    source_path="/path/to/file.jpg",\n)\nprint(response.job_id)',
      },
      ruby: {
        method: 'assets.copy',
        example:
          'require "imagekitio"\n\nimage_kit = Imagekitio::Client.new(private_key: "My Private Key", password: "My Password")\n\nresponse = image_kit.assets.copy(destination_path: "/folder/to/copy/into/", source_path: "/path/to/file.jpg")\n\nputs(response)',
      },
      typescript: {
        method: 'client.assets.copy',
        example:
          "import ImageKit from '@imagekit/nodejs';\n\nconst client = new ImageKit({\n  privateKey: process.env['IMAGEKIT_PRIVATE_KEY'], // This is the default and can be omitted\n  password: process.env['OPTIONAL_IMAGEKIT_IGNORES_THIS'], // This is the default and can be omitted\n});\n\nconst response = await client.assets.copy({\n  destination_path: '/folder/to/copy/into/',\n  source_path: '/path/to/file.jpg',\n});\n\nconsole.log(response.job_id);",
      },
      http: {
        example:
          'curl https://api.imagekit.io/v2/assets/copy \\\n    -H \'Content-Type: application/json\' \\\n    -u "$IMAGEKIT_PRIVATE_KEY:OPTIONAL_IMAGEKIT_IGNORES_THIS" \\\n    -d \'{\n          "destination_path": "/folder/to/copy/into/",\n          "source_path": "/path/to/file.jpg"\n        }\'',
      },
      csharp: {
        method: 'Assets.Copy',
        example:
          'AssetCopyParams parameters = new()\n{\n    DestinationPath = "/folder/to/copy/into/",\n    SourcePath = "/path/to/file.jpg",\n};\n\nvar response = await client.Assets.Copy(parameters);\n\nConsole.WriteLine(response);',
      },
    },
  },
  {
    name: 'move',
    endpoint: '/v2/assets/move',
    httpMethod: 'post',
    summary: 'Move asset',
    description:
      'Moves a file (and all its versions) or a folder (with all nested folders, files, and their versions) from one location to another. Pass a file path or a folder path in `source_path`.\n\n- **File move** is synchronous and returns `204 No Content`.\n- **Folder move** is asynchronous — the API returns `202 Accepted` with a `job_id`. Use the [get job status](#operation/get-job-status) API to track progress.\n\nNote: If a file at the destination has the same name as a source file, the source file and its versions will be appended to the destination file.\n',
    stainlessPath: '(resource) assets > (method) move',
    qualified: 'client.assets.move',
    params: ['destination_path: string;', 'source_path: string;'],
    response: '{ job_id: string; }',
    markdown:
      "## move\n\n`client.assets.move(destination_path: string, source_path: string): { job_id: string; }`\n\n**post** `/v2/assets/move`\n\nMoves a file (and all its versions) or a folder (with all nested folders, files, and their versions) from one location to another. Pass a file path or a folder path in `source_path`.\n\n- **File move** is synchronous and returns `204 No Content`.\n- **Folder move** is asynchronous — the API returns `202 Accepted` with a `job_id`. Use the [get job status](#operation/get-job-status) API to track progress.\n\nNote: If a file at the destination has the same name as a source file, the source file and its versions will be appended to the destination file.\n\n\n### Parameters\n\n- `destination_path: string`\n  Full path of the destination folder.\n\n- `source_path: string`\n  Full path of the file or folder you want to move.\n\n### Returns\n\n- `{ job_id: string; }`\n\n  - `job_id: string`\n\n### Example\n\n```typescript\nimport ImageKit from '@imagekit/nodejs';\n\nconst client = new ImageKit();\n\nconst response = await client.assets.move({ destination_path: '/folder/to/move/into/', source_path: '/path/to/file.jpg' });\n\nconsole.log(response);\n```",
    perLanguage: {
      go: {
        method: 'client.Assets.Move',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/imagekit-developer/imagekit-go/v2"\n\t"github.com/imagekit-developer/imagekit-go/v2/option"\n)\n\nfunc main() {\n\tclient := imagekit.NewClient(\n\t\toption.WithPrivateKey("My Private Key"),\n\t\toption.WithPassword("My Password"),\n\t)\n\tresponse, err := client.Assets.Move(context.TODO(), imagekit.AssetMoveParams{\n\t\tDestinationPath: "/folder/to/move/into/",\n\t\tSourcePath:      "/path/to/file.jpg",\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.JobID)\n}\n',
      },
      java: {
        method: 'assets().move',
        example:
          'package io.imagekit.example;\n\nimport io.imagekit.client.ImageKitClient;\nimport io.imagekit.client.okhttp.ImageKitOkHttpClient;\nimport io.imagekit.models.assets.AssetMoveParams;\nimport io.imagekit.models.assets.AssetMoveResponse;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        ImageKitClient client = ImageKitOkHttpClient.fromEnv();\n\n        AssetMoveParams params = AssetMoveParams.builder()\n            .destinationPath("/folder/to/move/into/")\n            .sourcePath("/path/to/file.jpg")\n            .build();\n        AssetMoveResponse response = client.assets().move(params);\n    }\n}',
      },
      php: {
        method: 'assets->move',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(privateKey: 'My Private Key', password: 'My Password');\n\n$response = $client->assets->move(\n  destinationPath: '/folder/to/move/into/', sourcePath: '/path/to/file.jpg'\n);\n\nvar_dump($response);",
      },
      python: {
        method: 'assets.move',
        example:
          'import os\nfrom imagekitio import ImageKit\n\nclient = ImageKit(\n    private_key=os.environ.get("IMAGEKIT_PRIVATE_KEY"),  # This is the default and can be omitted\n    password=os.environ.get("OPTIONAL_IMAGEKIT_IGNORES_THIS"),  # This is the default and can be omitted\n)\nresponse = client.assets.move(\n    destination_path="/folder/to/move/into/",\n    source_path="/path/to/file.jpg",\n)\nprint(response.job_id)',
      },
      ruby: {
        method: 'assets.move',
        example:
          'require "imagekitio"\n\nimage_kit = Imagekitio::Client.new(private_key: "My Private Key", password: "My Password")\n\nresponse = image_kit.assets.move(destination_path: "/folder/to/move/into/", source_path: "/path/to/file.jpg")\n\nputs(response)',
      },
      typescript: {
        method: 'client.assets.move',
        example:
          "import ImageKit from '@imagekit/nodejs';\n\nconst client = new ImageKit({\n  privateKey: process.env['IMAGEKIT_PRIVATE_KEY'], // This is the default and can be omitted\n  password: process.env['OPTIONAL_IMAGEKIT_IGNORES_THIS'], // This is the default and can be omitted\n});\n\nconst response = await client.assets.move({\n  destination_path: '/folder/to/move/into/',\n  source_path: '/path/to/file.jpg',\n});\n\nconsole.log(response.job_id);",
      },
      http: {
        example:
          'curl https://api.imagekit.io/v2/assets/move \\\n    -H \'Content-Type: application/json\' \\\n    -u "$IMAGEKIT_PRIVATE_KEY:OPTIONAL_IMAGEKIT_IGNORES_THIS" \\\n    -d \'{\n          "destination_path": "/folder/to/move/into/",\n          "source_path": "/path/to/file.jpg"\n        }\'',
      },
      csharp: {
        method: 'Assets.Move',
        example:
          'AssetMoveParams parameters = new()\n{\n    DestinationPath = "/folder/to/move/into/",\n    SourcePath = "/path/to/file.jpg",\n};\n\nvar response = await client.Assets.Move(parameters);\n\nConsole.WriteLine(response);',
      },
    },
  },
  {
    name: 'rename',
    endpoint: '/v2/assets/rename',
    httpMethod: 'put',
    summary: 'Rename asset',
    description:
      'Renames an existing file or folder in the media library. Pass a file path or a folder path in `path`.\n\n- **File rename** is synchronous. The operation renames all file versions of the file and returns `200 OK`. If `purge_cache` was `true`, the response includes `purge_request_id`; if the purge quota is exhausted, `207 Multi-Status` is returned (the rename succeeded, the purge did not).\n- **Folder rename** is asynchronous. The folder and all its nested assets and sub-folders remain unchanged, but their paths are updated to reflect the new folder name. The API returns `202 Accepted` with a `job_id`. Use the [get job status](#operation/get-job-status) API to track progress.\n\nNote: The old URLs will stop working. The file or file version URLs cached on the CDN will continue to work until a purge is requested — either implicitly via `purge_cache` or explicitly via the purge cache API.\n',
    stainlessPath: '(resource) assets > (method) rename',
    qualified: 'client.assets.rename',
    params: ['new_name: string;', 'path: string;', 'purge_cache?: boolean;'],
    response: '{ purge_request_id?: string; }',
    markdown:
      "## rename\n\n`client.assets.rename(new_name: string, path: string, purge_cache?: boolean): { purge_request_id?: string; }`\n\n**put** `/v2/assets/rename`\n\nRenames an existing file or folder in the media library. Pass a file path or a folder path in `path`.\n\n- **File rename** is synchronous. The operation renames all file versions of the file and returns `200 OK`. If `purge_cache` was `true`, the response includes `purge_request_id`; if the purge quota is exhausted, `207 Multi-Status` is returned (the rename succeeded, the purge did not).\n- **Folder rename** is asynchronous. The folder and all its nested assets and sub-folders remain unchanged, but their paths are updated to reflect the new folder name. The API returns `202 Accepted` with a `job_id`. Use the [get job status](#operation/get-job-status) API to track progress.\n\nNote: The old URLs will stop working. The file or file version URLs cached on the CDN will continue to work until a purge is requested — either implicitly via `purge_cache` or explicitly via the purge cache API.\n\n\n### Parameters\n\n- `new_name: string`\n  The new name of the file or folder. The name can contain:\n\n- Alphanumeric characters: `a-z`, `A-Z`, `0-9` (including Unicode letters, marks, and numerals in other languages).\n- Special characters: `.`, `_`, and `-`.\n\nAny other character, including space, will be replaced by `_`.\n\n\n- `path: string`\n  Full path of the file or folder you want to rename.\n\n- `purge_cache?: boolean`\n  When `true`, ImageKit internally issues a purge cache request on the CDN to remove cached content of the old file (or, for folders, the nested files) and its versions. This purge request is counted against your monthly purge quota.\n\nNote: A purge cache request would be issued against `https://ik.imagekit.io/<imagekit_id>/<old-path>*` (with a trailing wildcard). It removes the file and its versions' URLs and any transformations made using query parameters. Transformations made using path parameters are not purged — use the purge API for those.\n\n\n### Returns\n\n- `{ purge_request_id?: string; }`\n\n  - `purge_request_id?: string`\n\n### Example\n\n```typescript\nimport ImageKit from '@imagekit/nodejs';\n\nconst client = new ImageKit();\n\nconst response = await client.assets.rename({ new_name: 'new_file_name.jpg', path: '/path/to/file.jpg' });\n\nconsole.log(response);\n```",
    perLanguage: {
      go: {
        method: 'client.Assets.Rename',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/imagekit-developer/imagekit-go/v2"\n\t"github.com/imagekit-developer/imagekit-go/v2/option"\n)\n\nfunc main() {\n\tclient := imagekit.NewClient(\n\t\toption.WithPrivateKey("My Private Key"),\n\t\toption.WithPassword("My Password"),\n\t)\n\tresponse, err := client.Assets.Rename(context.TODO(), imagekit.AssetRenameParams{\n\t\tNewName: "new_file_name.jpg",\n\t\tPath:    "/path/to/file.jpg",\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.PurgeRequestID)\n}\n',
      },
      java: {
        method: 'assets().rename',
        example:
          'package io.imagekit.example;\n\nimport io.imagekit.client.ImageKitClient;\nimport io.imagekit.client.okhttp.ImageKitOkHttpClient;\nimport io.imagekit.models.assets.AssetRenameParams;\nimport io.imagekit.models.assets.AssetRenameResponse;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        ImageKitClient client = ImageKitOkHttpClient.fromEnv();\n\n        AssetRenameParams params = AssetRenameParams.builder()\n            .newName("new_file_name.jpg")\n            .path("/path/to/file.jpg")\n            .build();\n        AssetRenameResponse response = client.assets().rename(params);\n    }\n}',
      },
      php: {
        method: 'assets->rename',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(privateKey: 'My Private Key', password: 'My Password');\n\n$response = $client->assets->rename(\n  newName: 'new_file_name.jpg', path: '/path/to/file.jpg', purgeCache: true\n);\n\nvar_dump($response);",
      },
      python: {
        method: 'assets.rename',
        example:
          'import os\nfrom imagekitio import ImageKit\n\nclient = ImageKit(\n    private_key=os.environ.get("IMAGEKIT_PRIVATE_KEY"),  # This is the default and can be omitted\n    password=os.environ.get("OPTIONAL_IMAGEKIT_IGNORES_THIS"),  # This is the default and can be omitted\n)\nresponse = client.assets.rename(\n    new_name="new_file_name.jpg",\n    path="/path/to/file.jpg",\n)\nprint(response.purge_request_id)',
      },
      ruby: {
        method: 'assets.rename',
        example:
          'require "imagekitio"\n\nimage_kit = Imagekitio::Client.new(private_key: "My Private Key", password: "My Password")\n\nresponse = image_kit.assets.rename(new_name: "new_file_name.jpg", path: "/path/to/file.jpg")\n\nputs(response)',
      },
      typescript: {
        method: 'client.assets.rename',
        example:
          "import ImageKit from '@imagekit/nodejs';\n\nconst client = new ImageKit({\n  privateKey: process.env['IMAGEKIT_PRIVATE_KEY'], // This is the default and can be omitted\n  password: process.env['OPTIONAL_IMAGEKIT_IGNORES_THIS'], // This is the default and can be omitted\n});\n\nconst response = await client.assets.rename({\n  new_name: 'new_file_name.jpg',\n  path: '/path/to/file.jpg',\n});\n\nconsole.log(response.purge_request_id);",
      },
      http: {
        example:
          'curl https://api.imagekit.io/v2/assets/rename \\\n    -X PUT \\\n    -H \'Content-Type: application/json\' \\\n    -u "$IMAGEKIT_PRIVATE_KEY:OPTIONAL_IMAGEKIT_IGNORES_THIS" \\\n    -d \'{\n          "new_name": "new_file_name.jpg",\n          "path": "/path/to/file.jpg"\n        }\'',
      },
      csharp: {
        method: 'Assets.Rename',
        example:
          'AssetRenameParams parameters = new()\n{\n    NewName = "new_file_name.jpg",\n    Path = "/path/to/file.jpg",\n};\n\nvar response = await client.Assets.Rename(parameters);\n\nConsole.WriteLine(response);',
      },
    },
  },
  {
    name: 'delete',
    endpoint: '/v2/assets',
    httpMethod: 'delete',
    summary: 'Bulk delete assets',
    description:
      'Permanently deletes multiple assets — files (including all of their versions) and folders (including their contents) — in a single request. Identify each asset by its `asset_id`.\n\nA maximum of 100 assets can be deleted in one request.\n\nNote: If a file or specific transformation has been requested in the past, then the response is cached. Deleting an asset does not purge the cache. Use the purge cache API to purge cached URLs.\n',
    stainlessPath: '(resource) assets.bulk > (method) delete',
    qualified: 'client.assets.bulk.delete',
    params: ['asset_ids: string[];'],
    response: '{ successfully_deleted_asset_ids: string[]; }',
    markdown:
      "## delete\n\n`client.assets.bulk.delete(asset_ids: string[]): { successfully_deleted_asset_ids: string[]; }`\n\n**delete** `/v2/assets`\n\nPermanently deletes multiple assets — files (including all of their versions) and folders (including their contents) — in a single request. Identify each asset by its `asset_id`.\n\nA maximum of 100 assets can be deleted in one request.\n\nNote: If a file or specific transformation has been requested in the past, then the response is cached. Deleting an asset does not purge the cache. Use the purge cache API to purge cached URLs.\n\n\n### Parameters\n\n- `asset_ids: string[]`\n  An array of asset ids to delete. Each id can refer to a file or a folder, as returned by the list and search assets, upload, or create folder APIs.\n\n\n### Returns\n\n- `{ successfully_deleted_asset_ids: string[]; }`\n\n  - `successfully_deleted_asset_ids: string[]`\n\n### Example\n\n```typescript\nimport ImageKit from '@imagekit/nodejs';\n\nconst client = new ImageKit();\n\nconst bulk = await client.assets.bulk.delete({ asset_ids: ['598821f949c0a938d57563bd', '6441fce4e809dd54b0dee029'] });\n\nconsole.log(bulk);\n```",
    perLanguage: {
      go: {
        method: 'client.Assets.Bulk.Delete',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/imagekit-developer/imagekit-go/v2"\n\t"github.com/imagekit-developer/imagekit-go/v2/option"\n)\n\nfunc main() {\n\tclient := imagekit.NewClient(\n\t\toption.WithPrivateKey("My Private Key"),\n\t\toption.WithPassword("My Password"),\n\t)\n\tbulk, err := client.Assets.Bulk.Delete(context.TODO(), imagekit.AssetBulkDeleteParams{\n\t\tAssetIDs: []string{"598821f949c0a938d57563bd", "6441fce4e809dd54b0dee029"},\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", bulk.SuccessfullyDeletedAssetIDs)\n}\n',
      },
      java: {
        method: 'assets().bulk().delete',
        example:
          'package io.imagekit.example;\n\nimport io.imagekit.client.ImageKitClient;\nimport io.imagekit.client.okhttp.ImageKitOkHttpClient;\nimport io.imagekit.models.assets.bulk.BulkDeleteParams;\nimport io.imagekit.models.assets.bulk.BulkDeleteResponse;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        ImageKitClient client = ImageKitOkHttpClient.fromEnv();\n\n        BulkDeleteParams params = BulkDeleteParams.builder()\n            .addAssetId("598821f949c0a938d57563bd")\n            .addAssetId("6441fce4e809dd54b0dee029")\n            .build();\n        BulkDeleteResponse bulk = client.assets().bulk().delete(params);\n    }\n}',
      },
      php: {
        method: 'assets->bulk->delete',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(privateKey: 'My Private Key', password: 'My Password');\n\n$bulk = $client->assets->bulk->delete(\n  assetIDs: ['598821f949c0a938d57563bd', '6441fce4e809dd54b0dee029']\n);\n\nvar_dump($bulk);",
      },
      python: {
        method: 'assets.bulk.delete',
        example:
          'import os\nfrom imagekitio import ImageKit\n\nclient = ImageKit(\n    private_key=os.environ.get("IMAGEKIT_PRIVATE_KEY"),  # This is the default and can be omitted\n    password=os.environ.get("OPTIONAL_IMAGEKIT_IGNORES_THIS"),  # This is the default and can be omitted\n)\nbulk = client.assets.bulk.delete(\n    asset_ids=["598821f949c0a938d57563bd", "6441fce4e809dd54b0dee029"],\n)\nprint(bulk.successfully_deleted_asset_ids)',
      },
      ruby: {
        method: 'assets.bulk.delete',
        example:
          'require "imagekitio"\n\nimage_kit = Imagekitio::Client.new(private_key: "My Private Key", password: "My Password")\n\nbulk = image_kit.assets.bulk.delete(asset_ids: ["598821f949c0a938d57563bd", "6441fce4e809dd54b0dee029"])\n\nputs(bulk)',
      },
      typescript: {
        method: 'client.assets.bulk.delete',
        example:
          "import ImageKit from '@imagekit/nodejs';\n\nconst client = new ImageKit({\n  privateKey: process.env['IMAGEKIT_PRIVATE_KEY'], // This is the default and can be omitted\n  password: process.env['OPTIONAL_IMAGEKIT_IGNORES_THIS'], // This is the default and can be omitted\n});\n\nconst bulk = await client.assets.bulk.delete({\n  asset_ids: ['598821f949c0a938d57563bd', '6441fce4e809dd54b0dee029'],\n});\n\nconsole.log(bulk.successfully_deleted_asset_ids);",
      },
      http: {
        example:
          'curl https://api.imagekit.io/v2/assets \\\n    -X DELETE \\\n    -u "$IMAGEKIT_PRIVATE_KEY:OPTIONAL_IMAGEKIT_IGNORES_THIS"',
      },
      csharp: {
        method: 'Assets.Bulk.Delete',
        example:
          'BulkDeleteParams parameters = new()\n{\n    AssetIds =\n    [\n        "598821f949c0a938d57563bd", "6441fce4e809dd54b0dee029"\n    ],\n};\n\nvar bulk = await client.Assets.Bulk.Delete(parameters);\n\nConsole.WriteLine(bulk);',
      },
    },
  },
  {
    name: 'addTags',
    endpoint: '/v2/assets/tags',
    httpMethod: 'post',
    summary: 'Add tags (bulk)',
    description:
      'Adds one or more tags to multiple files in a single call. A maximum of 50 files can be specified per request.\n\nTags are merged with any tags already present on each file; duplicates are ignored.\n',
    stainlessPath: '(resource) assets.bulk > (method) addTags',
    qualified: 'client.assets.bulk.addTags',
    params: ['asset_ids: string[];', 'tags: string[];'],
    response: '{ successful_asset_ids: string[]; }',
    markdown:
      "## addTags\n\n`client.assets.bulk.addTags(asset_ids: string[], tags: string[]): { successful_asset_ids: string[]; }`\n\n**post** `/v2/assets/tags`\n\nAdds one or more tags to multiple files in a single call. A maximum of 50 files can be specified per request.\n\nTags are merged with any tags already present on each file; duplicates are ignored.\n\n\n### Parameters\n\n- `asset_ids: string[]`\n  Array of file `asset_id`s to which the tags will be added.\n\n- `tags: string[]`\n  Array of tags to add. Combined length of all tags must not exceed 500 characters.\n\n\n### Returns\n\n- `{ successful_asset_ids: string[]; }`\n\n  - `successful_asset_ids: string[]`\n\n### Example\n\n```typescript\nimport ImageKit from '@imagekit/nodejs';\n\nconst client = new ImageKit();\n\nconst bulkTagUpdateResult = await client.assets.bulk.addTags({ asset_ids: ['598821f949c0a938d57563bd', '598821f949c0a938d57563be'], tags: ['t-shirt', 'round-neck', 'sale2019'] });\n\nconsole.log(bulkTagUpdateResult);\n```",
    perLanguage: {
      go: {
        method: 'client.Assets.Bulk.AddTags',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/imagekit-developer/imagekit-go/v2"\n\t"github.com/imagekit-developer/imagekit-go/v2/option"\n)\n\nfunc main() {\n\tclient := imagekit.NewClient(\n\t\toption.WithPrivateKey("My Private Key"),\n\t\toption.WithPassword("My Password"),\n\t)\n\tbulkTagUpdateResult, err := client.Assets.Bulk.AddTags(context.TODO(), imagekit.AssetBulkAddTagsParams{\n\t\tAssetIDs: []string{"598821f949c0a938d57563bd", "598821f949c0a938d57563be"},\n\t\tTags:     []string{"t-shirt", "round-neck", "sale2019"},\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", bulkTagUpdateResult.SuccessfulAssetIDs)\n}\n',
      },
      java: {
        method: 'assets().bulk().addTags',
        example:
          'package io.imagekit.example;\n\nimport io.imagekit.client.ImageKitClient;\nimport io.imagekit.client.okhttp.ImageKitOkHttpClient;\nimport io.imagekit.models.assets.BulkTagUpdateResult;\nimport io.imagekit.models.assets.bulk.BulkAddTagsParams;\nimport java.util.List;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        ImageKitClient client = ImageKitOkHttpClient.fromEnv();\n\n        BulkAddTagsParams params = BulkAddTagsParams.builder()\n            .addAssetId("598821f949c0a938d57563bd")\n            .addAssetId("598821f949c0a938d57563be")\n            .tags(List.of(\n              "t-shirt",\n              "round-neck",\n              "sale2019"\n            ))\n            .build();\n        BulkTagUpdateResult bulkTagUpdateResult = client.assets().bulk().addTags(params);\n    }\n}',
      },
      php: {
        method: 'assets->bulk->addTags',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(privateKey: 'My Private Key', password: 'My Password');\n\n$bulkTagUpdateResult = $client->assets->bulk->addTags(\n  assetIDs: ['598821f949c0a938d57563bd', '598821f949c0a938d57563be'],\n  tags: ['t-shirt', 'round-neck', 'sale2019'],\n);\n\nvar_dump($bulkTagUpdateResult);",
      },
      python: {
        method: 'assets.bulk.add_tags',
        example:
          'import os\nfrom imagekitio import ImageKit\n\nclient = ImageKit(\n    private_key=os.environ.get("IMAGEKIT_PRIVATE_KEY"),  # This is the default and can be omitted\n    password=os.environ.get("OPTIONAL_IMAGEKIT_IGNORES_THIS"),  # This is the default and can be omitted\n)\nbulk_tag_update_result = client.assets.bulk.add_tags(\n    asset_ids=["598821f949c0a938d57563bd", "598821f949c0a938d57563be"],\n    tags=["t-shirt", "round-neck", "sale2019"],\n)\nprint(bulk_tag_update_result.successful_asset_ids)',
      },
      ruby: {
        method: 'assets.bulk.add_tags',
        example:
          'require "imagekitio"\n\nimage_kit = Imagekitio::Client.new(private_key: "My Private Key", password: "My Password")\n\nbulk_tag_update_result = image_kit.assets.bulk.add_tags(\n  asset_ids: ["598821f949c0a938d57563bd", "598821f949c0a938d57563be"],\n  tags: ["t-shirt", "round-neck", "sale2019"]\n)\n\nputs(bulk_tag_update_result)',
      },
      typescript: {
        method: 'client.assets.bulk.addTags',
        example:
          "import ImageKit from '@imagekit/nodejs';\n\nconst client = new ImageKit({\n  privateKey: process.env['IMAGEKIT_PRIVATE_KEY'], // This is the default and can be omitted\n  password: process.env['OPTIONAL_IMAGEKIT_IGNORES_THIS'], // This is the default and can be omitted\n});\n\nconst bulkTagUpdateResult = await client.assets.bulk.addTags({\n  asset_ids: ['598821f949c0a938d57563bd', '598821f949c0a938d57563be'],\n  tags: ['t-shirt', 'round-neck', 'sale2019'],\n});\n\nconsole.log(bulkTagUpdateResult.successful_asset_ids);",
      },
      http: {
        example:
          'curl https://api.imagekit.io/v2/assets/tags \\\n    -H \'Content-Type: application/json\' \\\n    -u "$IMAGEKIT_PRIVATE_KEY:OPTIONAL_IMAGEKIT_IGNORES_THIS" \\\n    -d \'{\n          "asset_ids": [\n            "598821f949c0a938d57563bd",\n            "598821f949c0a938d57563be"\n          ],\n          "tags": [\n            "t-shirt",\n            "round-neck",\n            "sale2019"\n          ]\n        }\'',
      },
      csharp: {
        method: 'Assets.Bulk.AddTags',
        example:
          'BulkAddTagsParams parameters = new()\n{\n    AssetIds =\n    [\n        "598821f949c0a938d57563bd", "598821f949c0a938d57563be"\n    ],\n    Tags =\n    [\n        "t-shirt", "round-neck", "sale2019"\n    ],\n};\n\nvar bulkTagUpdateResult = await client.Assets.Bulk.AddTags(parameters);\n\nConsole.WriteLine(bulkTagUpdateResult);',
      },
    },
  },
  {
    name: 'removeTags',
    endpoint: '/v2/assets/tags',
    httpMethod: 'delete',
    summary: 'Remove tags (bulk)',
    description:
      'Removes user-applied tags and/or AI-generated tags from multiple files in a single call. A maximum of 50 files can be specified per request.\n\nAt least one of `tags` or `ai_tags` must be provided. Both may be specified together; each list is removed from the corresponding tag set on every file. Tags that are not present on a file are silently ignored.\n',
    stainlessPath: '(resource) assets.bulk > (method) removeTags',
    qualified: 'client.assets.bulk.removeTags',
    params: ['asset_ids: string[];', 'ai_tags?: string[];', 'tags?: string[];'],
    response: '{ successful_asset_ids: string[]; }',
    markdown:
      "## removeTags\n\n`client.assets.bulk.removeTags(asset_ids: string[], ai_tags?: string[], tags?: string[]): { successful_asset_ids: string[]; }`\n\n**delete** `/v2/assets/tags`\n\nRemoves user-applied tags and/or AI-generated tags from multiple files in a single call. A maximum of 50 files can be specified per request.\n\nAt least one of `tags` or `ai_tags` must be provided. Both may be specified together; each list is removed from the corresponding tag set on every file. Tags that are not present on a file are silently ignored.\n\n\n### Parameters\n\n- `asset_ids: string[]`\n  Array of file `asset_id`s from which the tags will be removed.\n\n- `ai_tags?: string[]`\n  AI-generated tags to remove from each file.\n\n- `tags?: string[]`\n  User-applied tags to remove from each file.\n\n### Returns\n\n- `{ successful_asset_ids: string[]; }`\n\n  - `successful_asset_ids: string[]`\n\n### Example\n\n```typescript\nimport ImageKit from '@imagekit/nodejs';\n\nconst client = new ImageKit();\n\nconst bulkTagUpdateResult = await client.assets.bulk.removeTags({ asset_ids: ['598821f949c0a938d57563bd', '598821f949c0a938d57563be'] });\n\nconsole.log(bulkTagUpdateResult);\n```",
    perLanguage: {
      go: {
        method: 'client.Assets.Bulk.RemoveTags',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/imagekit-developer/imagekit-go/v2"\n\t"github.com/imagekit-developer/imagekit-go/v2/option"\n)\n\nfunc main() {\n\tclient := imagekit.NewClient(\n\t\toption.WithPrivateKey("My Private Key"),\n\t\toption.WithPassword("My Password"),\n\t)\n\tbulkTagUpdateResult, err := client.Assets.Bulk.RemoveTags(context.TODO(), imagekit.AssetBulkRemoveTagsParams{\n\t\tAssetIDs: []string{"598821f949c0a938d57563bd", "598821f949c0a938d57563be"},\n\t\tTags:     []string{"sale2019"},\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", bulkTagUpdateResult.SuccessfulAssetIDs)\n}\n',
      },
      java: {
        method: 'assets().bulk().removeTags',
        example:
          'package io.imagekit.example;\n\nimport io.imagekit.client.ImageKitClient;\nimport io.imagekit.client.okhttp.ImageKitOkHttpClient;\nimport io.imagekit.models.assets.BulkTagUpdateResult;\nimport io.imagekit.models.assets.bulk.BulkRemoveTagsParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        ImageKitClient client = ImageKitOkHttpClient.fromEnv();\n\n        BulkRemoveTagsParams params = BulkRemoveTagsParams.builder()\n            .addAssetId("598821f949c0a938d57563bd")\n            .addAssetId("598821f949c0a938d57563be")\n            .build();\n        BulkTagUpdateResult bulkTagUpdateResult = client.assets().bulk().removeTags(params);\n    }\n}',
      },
      php: {
        method: 'assets->bulk->removeTags',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(privateKey: 'My Private Key', password: 'My Password');\n\n$bulkTagUpdateResult = $client->assets->bulk->removeTags(\n  assetIDs: ['598821f949c0a938d57563bd', '598821f949c0a938d57563be'],\n  aiTags: ['string'],\n  tags: ['sale2019'],\n);\n\nvar_dump($bulkTagUpdateResult);",
      },
      python: {
        method: 'assets.bulk.remove_tags',
        example:
          'import os\nfrom imagekitio import ImageKit\n\nclient = ImageKit(\n    private_key=os.environ.get("IMAGEKIT_PRIVATE_KEY"),  # This is the default and can be omitted\n    password=os.environ.get("OPTIONAL_IMAGEKIT_IGNORES_THIS"),  # This is the default and can be omitted\n)\nbulk_tag_update_result = client.assets.bulk.remove_tags(\n    asset_ids=["598821f949c0a938d57563bd", "598821f949c0a938d57563be"],\n    tags=["sale2019"],\n)\nprint(bulk_tag_update_result.successful_asset_ids)',
      },
      ruby: {
        method: 'assets.bulk.remove_tags',
        example:
          'require "imagekitio"\n\nimage_kit = Imagekitio::Client.new(private_key: "My Private Key", password: "My Password")\n\nbulk_tag_update_result = image_kit.assets.bulk.remove_tags(asset_ids: ["598821f949c0a938d57563bd", "598821f949c0a938d57563be"])\n\nputs(bulk_tag_update_result)',
      },
      typescript: {
        method: 'client.assets.bulk.removeTags',
        example:
          "import ImageKit from '@imagekit/nodejs';\n\nconst client = new ImageKit({\n  privateKey: process.env['IMAGEKIT_PRIVATE_KEY'], // This is the default and can be omitted\n  password: process.env['OPTIONAL_IMAGEKIT_IGNORES_THIS'], // This is the default and can be omitted\n});\n\nconst bulkTagUpdateResult = await client.assets.bulk.removeTags({\n  asset_ids: ['598821f949c0a938d57563bd', '598821f949c0a938d57563be'],\n  tags: ['sale2019'],\n});\n\nconsole.log(bulkTagUpdateResult.successful_asset_ids);",
      },
      http: {
        example:
          'curl https://api.imagekit.io/v2/assets/tags \\\n    -X DELETE \\\n    -u "$IMAGEKIT_PRIVATE_KEY:OPTIONAL_IMAGEKIT_IGNORES_THIS"',
      },
      csharp: {
        method: 'Assets.Bulk.RemoveTags',
        example:
          'BulkRemoveTagsParams parameters = new()\n{\n    AssetIds =\n    [\n        "598821f949c0a938d57563bd", "598821f949c0a938d57563be"\n    ],\n};\n\nvar bulkTagUpdateResult = await client.Assets.Bulk.RemoveTags(parameters);\n\nConsole.WriteLine(bulkTagUpdateResult);',
      },
    },
  },
  {
    name: 'list',
    endpoint: '/v2/assets/{asset_id}/versions',
    httpMethod: 'get',
    summary: 'List file versions',
    description: 'Returns details of all versions of a file.\n',
    stainlessPath: '(resource) assets.versions > (method) list',
    qualified: 'client.assets.versions.list',
    params: ['asset_id: string;', 'cursor?: string;', 'limit?: number;'],
    response:
      '{ id?: string; ai_tags?: { confidence?: number; name?: string; source?: string; }[]; asset_type?: string; asset_url?: string; created_at?: string; custom_coordinates?: string; custom_metadata?: object; description?: string; embedded_metadata?: object; is_private_file?: boolean; is_published?: boolean; metadata?: object; name?: string; path?: string; size?: number; tags?: string[]; thumbnail_url?: string; updated_at?: string; version_info?: { id?: string; name?: string; }; }',
    markdown:
      "## list\n\n`client.assets.versions.list(asset_id: string, cursor?: string, limit?: number): object`\n\n**get** `/v2/assets/{asset_id}/versions`\n\nReturns details of all versions of a file.\n\n\n### Parameters\n\n- `asset_id: string`\n\n- `cursor?: string`\n  Opaque cursor returned in the `start_cursor` or `end_cursor` field of a previous response. Pass it to fetch the next (or previous) page of results. Omit to start from the beginning.\n\n\n- `limit?: number`\n  The maximum number of results to return in response.\n\n\n### Returns\n\n- `{ id?: string; ai_tags?: { confidence?: number; name?: string; source?: string; }[]; asset_type?: string; asset_url?: string; created_at?: string; custom_coordinates?: string; custom_metadata?: object; description?: string; embedded_metadata?: object; is_private_file?: boolean; is_published?: boolean; metadata?: object; name?: string; path?: string; size?: number; tags?: string[]; thumbnail_url?: string; updated_at?: string; version_info?: { id?: string; name?: string; }; }`\n  Object containing details of a file version.\n\n### Example\n\n```typescript\nimport ImageKit from '@imagekit/nodejs';\n\nconst client = new ImageKit();\n\n// Automatically fetches more pages as needed.\nfor await (const fileVersionDetails of client.assets.versions.list('asset_id')) {\n  console.log(fileVersionDetails);\n}\n```",
    perLanguage: {
      go: {
        method: 'client.Assets.Versions.List',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/imagekit-developer/imagekit-go/v2"\n\t"github.com/imagekit-developer/imagekit-go/v2/option"\n)\n\nfunc main() {\n\tclient := imagekit.NewClient(\n\t\toption.WithPrivateKey("My Private Key"),\n\t\toption.WithPassword("My Password"),\n\t)\n\tpage, err := client.Assets.Versions.List(\n\t\tcontext.TODO(),\n\t\t"asset_id",\n\t\timagekit.AssetVersionListParams{},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", page)\n}\n',
      },
      java: {
        method: 'assets().versions().list',
        example:
          'package io.imagekit.example;\n\nimport io.imagekit.client.ImageKitClient;\nimport io.imagekit.client.okhttp.ImageKitOkHttpClient;\nimport io.imagekit.models.assets.versions.VersionListPage;\nimport io.imagekit.models.assets.versions.VersionListParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        ImageKitClient client = ImageKitOkHttpClient.fromEnv();\n\n        VersionListPage page = client.assets().versions().list("asset_id");\n    }\n}',
      },
      php: {
        method: 'assets->versions->list',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(privateKey: 'My Private Key', password: 'My Password');\n\n$page = $client->assets->versions->list('asset_id', cursor: 'cursor', limit: 1);\n\nvar_dump($page);",
      },
      python: {
        method: 'assets.versions.list',
        example:
          'import os\nfrom imagekitio import ImageKit\n\nclient = ImageKit(\n    private_key=os.environ.get("IMAGEKIT_PRIVATE_KEY"),  # This is the default and can be omitted\n    password=os.environ.get("OPTIONAL_IMAGEKIT_IGNORES_THIS"),  # This is the default and can be omitted\n)\npage = client.assets.versions.list(\n    asset_id="asset_id",\n)\npage = page.items[0]\nprint(page)',
      },
      ruby: {
        method: 'assets.versions.list',
        example:
          'require "imagekitio"\n\nimage_kit = Imagekitio::Client.new(private_key: "My Private Key", password: "My Password")\n\npage = image_kit.assets.versions.list("asset_id")\n\nputs(page)',
      },
      typescript: {
        method: 'client.assets.versions.list',
        example:
          "import ImageKit from '@imagekit/nodejs';\n\nconst client = new ImageKit({\n  privateKey: process.env['IMAGEKIT_PRIVATE_KEY'], // This is the default and can be omitted\n  password: process.env['OPTIONAL_IMAGEKIT_IGNORES_THIS'], // This is the default and can be omitted\n});\n\n// Automatically fetches more pages as needed.\nfor await (const fileVersionDetails of client.assets.versions.list('asset_id')) {\n  console.log(fileVersionDetails);\n}",
      },
      http: {
        example:
          'curl https://api.imagekit.io/v2/assets/$ASSET_ID/versions \\\n    -u "$IMAGEKIT_PRIVATE_KEY:OPTIONAL_IMAGEKIT_IGNORES_THIS"',
      },
      csharp: {
        method: 'Assets.Versions.List',
        example:
          'VersionListParams parameters = new() { AssetID = "asset_id" };\n\nvar page = await client.Assets.Versions.List(parameters);\nawait foreach (var item in page.Paginate())\n{\n    Console.WriteLine(item);\n}',
      },
    },
  },
  {
    name: 'get',
    endpoint: '/v2/assets/{asset_id}/versions/{version_id}',
    httpMethod: 'get',
    summary: 'Get file version details',
    description: 'Returns details of a single version of a file.\n',
    stainlessPath: '(resource) assets.versions > (method) get',
    qualified: 'client.assets.versions.get',
    params: ['asset_id: string;', 'version_id: string;'],
    response:
      '{ id?: string; ai_tags?: { confidence?: number; name?: string; source?: string; }[]; asset_type?: string; asset_url?: string; created_at?: string; custom_coordinates?: string; custom_metadata?: object; description?: string; embedded_metadata?: object; is_private_file?: boolean; is_published?: boolean; metadata?: object; name?: string; path?: string; size?: number; tags?: string[]; thumbnail_url?: string; updated_at?: string; version_info?: { id?: string; name?: string; }; }',
    markdown:
      "## get\n\n`client.assets.versions.get(asset_id: string, version_id: string): object`\n\n**get** `/v2/assets/{asset_id}/versions/{version_id}`\n\nReturns details of a single version of a file.\n\n\n### Parameters\n\n- `asset_id: string`\n\n- `version_id: string`\n\n### Returns\n\n- `{ id?: string; ai_tags?: { confidence?: number; name?: string; source?: string; }[]; asset_type?: string; asset_url?: string; created_at?: string; custom_coordinates?: string; custom_metadata?: object; description?: string; embedded_metadata?: object; is_private_file?: boolean; is_published?: boolean; metadata?: object; name?: string; path?: string; size?: number; tags?: string[]; thumbnail_url?: string; updated_at?: string; version_info?: { id?: string; name?: string; }; }`\n  Object containing details of a file version.\n\n### Example\n\n```typescript\nimport ImageKit from '@imagekit/nodejs';\n\nconst client = new ImageKit();\n\nconst fileVersionDetails = await client.assets.versions.get('version_id', { asset_id: 'asset_id' });\n\nconsole.log(fileVersionDetails);\n```",
    perLanguage: {
      go: {
        method: 'client.Assets.Versions.Get',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/imagekit-developer/imagekit-go/v2"\n\t"github.com/imagekit-developer/imagekit-go/v2/option"\n)\n\nfunc main() {\n\tclient := imagekit.NewClient(\n\t\toption.WithPrivateKey("My Private Key"),\n\t\toption.WithPassword("My Password"),\n\t)\n\tfileVersionDetails, err := client.Assets.Versions.Get(\n\t\tcontext.TODO(),\n\t\t"version_id",\n\t\timagekit.AssetVersionGetParams{\n\t\t\tAssetID: "asset_id",\n\t\t},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", fileVersionDetails)\n}\n',
      },
      java: {
        method: 'assets().versions().get',
        example:
          'package io.imagekit.example;\n\nimport io.imagekit.client.ImageKitClient;\nimport io.imagekit.client.okhttp.ImageKitOkHttpClient;\nimport io.imagekit.models.assets.FileVersionDetails;\nimport io.imagekit.models.assets.versions.VersionGetParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        ImageKitClient client = ImageKitOkHttpClient.fromEnv();\n\n        VersionGetParams params = VersionGetParams.builder()\n            .assetId("asset_id")\n            .versionId("version_id")\n            .build();\n        FileVersionDetails fileVersionDetails = client.assets().versions().get(params);\n    }\n}',
      },
      php: {
        method: 'assets->versions->get',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(privateKey: 'My Private Key', password: 'My Password');\n\n$fileVersionDetails = $client->assets->versions->get(\n  'version_id', assetID: 'asset_id'\n);\n\nvar_dump($fileVersionDetails);",
      },
      python: {
        method: 'assets.versions.get',
        example:
          'import os\nfrom imagekitio import ImageKit\n\nclient = ImageKit(\n    private_key=os.environ.get("IMAGEKIT_PRIVATE_KEY"),  # This is the default and can be omitted\n    password=os.environ.get("OPTIONAL_IMAGEKIT_IGNORES_THIS"),  # This is the default and can be omitted\n)\nfile_version_details = client.assets.versions.get(\n    version_id="version_id",\n    asset_id="asset_id",\n)\nprint(file_version_details)',
      },
      ruby: {
        method: 'assets.versions.get',
        example:
          'require "imagekitio"\n\nimage_kit = Imagekitio::Client.new(private_key: "My Private Key", password: "My Password")\n\nfile_version_details = image_kit.assets.versions.get("version_id", asset_id: "asset_id")\n\nputs(file_version_details)',
      },
      typescript: {
        method: 'client.assets.versions.get',
        example:
          "import ImageKit from '@imagekit/nodejs';\n\nconst client = new ImageKit({\n  privateKey: process.env['IMAGEKIT_PRIVATE_KEY'], // This is the default and can be omitted\n  password: process.env['OPTIONAL_IMAGEKIT_IGNORES_THIS'], // This is the default and can be omitted\n});\n\nconst fileVersionDetails = await client.assets.versions.get('version_id', { asset_id: 'asset_id' });\n\nconsole.log(fileVersionDetails);",
      },
      http: {
        example:
          'curl https://api.imagekit.io/v2/assets/$ASSET_ID/versions/$VERSION_ID \\\n    -u "$IMAGEKIT_PRIVATE_KEY:OPTIONAL_IMAGEKIT_IGNORES_THIS"',
      },
      csharp: {
        method: 'Assets.Versions.Get',
        example:
          'VersionGetParams parameters = new()\n{\n    AssetID = "asset_id",\n    VersionID = "version_id",\n};\n\nvar fileVersionDetails = await client.Assets.Versions.Get(parameters);\n\nConsole.WriteLine(fileVersionDetails);',
      },
    },
  },
  {
    name: 'delete',
    endpoint: '/v2/assets/{asset_id}/versions/{version_id}',
    httpMethod: 'delete',
    summary: 'Delete file version',
    description:
      'Deletes a non-current file version permanently. The API returns an empty response.\n\nNote: If you want to delete all versions of a file, use the delete asset API.\n',
    stainlessPath: '(resource) assets.versions > (method) delete',
    qualified: 'client.assets.versions.delete',
    params: ['asset_id: string;', 'version_id: string;'],
    markdown:
      "## delete\n\n`client.assets.versions.delete(asset_id: string, version_id: string): void`\n\n**delete** `/v2/assets/{asset_id}/versions/{version_id}`\n\nDeletes a non-current file version permanently. The API returns an empty response.\n\nNote: If you want to delete all versions of a file, use the delete asset API.\n\n\n### Parameters\n\n- `asset_id: string`\n\n- `version_id: string`\n\n### Example\n\n```typescript\nimport ImageKit from '@imagekit/nodejs';\n\nconst client = new ImageKit();\n\nawait client.assets.versions.delete('version_id', { asset_id: 'asset_id' })\n```",
    perLanguage: {
      go: {
        method: 'client.Assets.Versions.Delete',
        example:
          'package main\n\nimport (\n\t"context"\n\n\t"github.com/imagekit-developer/imagekit-go/v2"\n\t"github.com/imagekit-developer/imagekit-go/v2/option"\n)\n\nfunc main() {\n\tclient := imagekit.NewClient(\n\t\toption.WithPrivateKey("My Private Key"),\n\t\toption.WithPassword("My Password"),\n\t)\n\terr := client.Assets.Versions.Delete(\n\t\tcontext.TODO(),\n\t\t"version_id",\n\t\timagekit.AssetVersionDeleteParams{\n\t\t\tAssetID: "asset_id",\n\t\t},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n}\n',
      },
      java: {
        method: 'assets().versions().delete',
        example:
          'package io.imagekit.example;\n\nimport io.imagekit.client.ImageKitClient;\nimport io.imagekit.client.okhttp.ImageKitOkHttpClient;\nimport io.imagekit.models.assets.versions.VersionDeleteParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        ImageKitClient client = ImageKitOkHttpClient.fromEnv();\n\n        VersionDeleteParams params = VersionDeleteParams.builder()\n            .assetId("asset_id")\n            .versionId("version_id")\n            .build();\n        client.assets().versions().delete(params);\n    }\n}',
      },
      php: {
        method: 'assets->versions->delete',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(privateKey: 'My Private Key', password: 'My Password');\n\n$result = $client->assets->versions->delete('version_id', assetID: 'asset_id');\n\nvar_dump($result);",
      },
      python: {
        method: 'assets.versions.delete',
        example:
          'import os\nfrom imagekitio import ImageKit\n\nclient = ImageKit(\n    private_key=os.environ.get("IMAGEKIT_PRIVATE_KEY"),  # This is the default and can be omitted\n    password=os.environ.get("OPTIONAL_IMAGEKIT_IGNORES_THIS"),  # This is the default and can be omitted\n)\nclient.assets.versions.delete(\n    version_id="version_id",\n    asset_id="asset_id",\n)',
      },
      ruby: {
        method: 'assets.versions.delete',
        example:
          'require "imagekitio"\n\nimage_kit = Imagekitio::Client.new(private_key: "My Private Key", password: "My Password")\n\nresult = image_kit.assets.versions.delete("version_id", asset_id: "asset_id")\n\nputs(result)',
      },
      typescript: {
        method: 'client.assets.versions.delete',
        example:
          "import ImageKit from '@imagekit/nodejs';\n\nconst client = new ImageKit({\n  privateKey: process.env['IMAGEKIT_PRIVATE_KEY'], // This is the default and can be omitted\n  password: process.env['OPTIONAL_IMAGEKIT_IGNORES_THIS'], // This is the default and can be omitted\n});\n\nawait client.assets.versions.delete('version_id', { asset_id: 'asset_id' });",
      },
      http: {
        example:
          'curl https://api.imagekit.io/v2/assets/$ASSET_ID/versions/$VERSION_ID \\\n    -X DELETE \\\n    -u "$IMAGEKIT_PRIVATE_KEY:OPTIONAL_IMAGEKIT_IGNORES_THIS"',
      },
      csharp: {
        method: 'Assets.Versions.Delete',
        example:
          'VersionDeleteParams parameters = new()\n{\n    AssetID = "asset_id",\n    VersionID = "version_id",\n};\n\nawait client.Assets.Versions.Delete(parameters);',
      },
    },
  },
  {
    name: 'restore',
    endpoint: '/v2/assets/{asset_id}/versions/{version_id}/restore',
    httpMethod: 'post',
    summary: 'Restore file version',
    description: 'Restores a file version as the current file version.\n',
    stainlessPath: '(resource) assets.versions > (method) restore',
    qualified: 'client.assets.versions.restore',
    params: ['asset_id: string;', 'version_id: string;'],
    response:
      '{ id?: string; ai_tags?: { confidence?: number; name?: string; source?: string; }[]; asset_type?: string; asset_url?: string; created_at?: string; custom_coordinates?: string; custom_metadata?: object; description?: string; embedded_metadata?: object; is_private_file?: boolean; is_published?: boolean; metadata?: object; name?: string; path?: string; size?: number; tags?: string[]; thumbnail_url?: string; updated_at?: string; version_info?: { id?: string; name?: string; }; }',
    markdown:
      "## restore\n\n`client.assets.versions.restore(asset_id: string, version_id: string): object`\n\n**post** `/v2/assets/{asset_id}/versions/{version_id}/restore`\n\nRestores a file version as the current file version.\n\n\n### Parameters\n\n- `asset_id: string`\n\n- `version_id: string`\n\n### Returns\n\n- `{ id?: string; ai_tags?: { confidence?: number; name?: string; source?: string; }[]; asset_type?: string; asset_url?: string; created_at?: string; custom_coordinates?: string; custom_metadata?: object; description?: string; embedded_metadata?: object; is_private_file?: boolean; is_published?: boolean; metadata?: object; name?: string; path?: string; size?: number; tags?: string[]; thumbnail_url?: string; updated_at?: string; version_info?: { id?: string; name?: string; }; }`\n  Object containing details of a file.\n\n### Example\n\n```typescript\nimport ImageKit from '@imagekit/nodejs';\n\nconst client = new ImageKit();\n\nconst fileDetails = await client.assets.versions.restore('version_id', { asset_id: 'asset_id' });\n\nconsole.log(fileDetails);\n```",
    perLanguage: {
      go: {
        method: 'client.Assets.Versions.Restore',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/imagekit-developer/imagekit-go/v2"\n\t"github.com/imagekit-developer/imagekit-go/v2/option"\n)\n\nfunc main() {\n\tclient := imagekit.NewClient(\n\t\toption.WithPrivateKey("My Private Key"),\n\t\toption.WithPassword("My Password"),\n\t)\n\tfileDetails, err := client.Assets.Versions.Restore(\n\t\tcontext.TODO(),\n\t\t"version_id",\n\t\timagekit.AssetVersionRestoreParams{\n\t\t\tAssetID: "asset_id",\n\t\t},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", fileDetails)\n}\n',
      },
      java: {
        method: 'assets().versions().restore',
        example:
          'package io.imagekit.example;\n\nimport io.imagekit.client.ImageKitClient;\nimport io.imagekit.client.okhttp.ImageKitOkHttpClient;\nimport io.imagekit.models.assets.FileDetails;\nimport io.imagekit.models.assets.versions.VersionRestoreParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        ImageKitClient client = ImageKitOkHttpClient.fromEnv();\n\n        VersionRestoreParams params = VersionRestoreParams.builder()\n            .assetId("asset_id")\n            .versionId("version_id")\n            .build();\n        FileDetails fileDetails = client.assets().versions().restore(params);\n    }\n}',
      },
      php: {
        method: 'assets->versions->restore',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(privateKey: 'My Private Key', password: 'My Password');\n\n$fileDetails = $client->assets->versions->restore(\n  'version_id', assetID: 'asset_id'\n);\n\nvar_dump($fileDetails);",
      },
      python: {
        method: 'assets.versions.restore',
        example:
          'import os\nfrom imagekitio import ImageKit\n\nclient = ImageKit(\n    private_key=os.environ.get("IMAGEKIT_PRIVATE_KEY"),  # This is the default and can be omitted\n    password=os.environ.get("OPTIONAL_IMAGEKIT_IGNORES_THIS"),  # This is the default and can be omitted\n)\nfile_details = client.assets.versions.restore(\n    version_id="version_id",\n    asset_id="asset_id",\n)\nprint(file_details)',
      },
      ruby: {
        method: 'assets.versions.restore',
        example:
          'require "imagekitio"\n\nimage_kit = Imagekitio::Client.new(private_key: "My Private Key", password: "My Password")\n\nfile_details = image_kit.assets.versions.restore("version_id", asset_id: "asset_id")\n\nputs(file_details)',
      },
      typescript: {
        method: 'client.assets.versions.restore',
        example:
          "import ImageKit from '@imagekit/nodejs';\n\nconst client = new ImageKit({\n  privateKey: process.env['IMAGEKIT_PRIVATE_KEY'], // This is the default and can be omitted\n  password: process.env['OPTIONAL_IMAGEKIT_IGNORES_THIS'], // This is the default and can be omitted\n});\n\nconst fileDetails = await client.assets.versions.restore('version_id', { asset_id: 'asset_id' });\n\nconsole.log(fileDetails);",
      },
      http: {
        example:
          'curl https://api.imagekit.io/v2/assets/$ASSET_ID/versions/$VERSION_ID/restore \\\n    -X POST \\\n    -u "$IMAGEKIT_PRIVATE_KEY:OPTIONAL_IMAGEKIT_IGNORES_THIS"',
      },
      csharp: {
        method: 'Assets.Versions.Restore',
        example:
          'VersionRestoreParams parameters = new()\n{\n    AssetID = "asset_id",\n    VersionID = "version_id",\n};\n\nvar fileDetails = await client.Assets.Versions.Restore(parameters);\n\nConsole.WriteLine(fileDetails);',
      },
    },
  },
  {
    name: 'create',
    endpoint: '/v2/assets/folders',
    httpMethod: 'post',
    summary: 'Create folder',
    description:
      "Creates a new (empty) folder. Specify the folder name and the path of the parent folder under which the new folder should be created.\n\nIf any folder in `parent_folder_path` does not exist, the missing folders are created automatically. For example, when `parent_folder_path` is `/product/images/summer`, the folders `product`, `images`, and `summer` are created if they don't already exist.\n",
    stainlessPath: '(resource) assets.folders > (method) create',
    qualified: 'client.assets.folders.create',
    params: ['folder_name: string;', 'parent_folder_path: string;'],
    response: '{ asset_id: string; }',
    markdown:
      "## create\n\n`client.assets.folders.create(folder_name: string, parent_folder_path: string): { asset_id: string; }`\n\n**post** `/v2/assets/folders`\n\nCreates a new (empty) folder. Specify the folder name and the path of the parent folder under which the new folder should be created.\n\nIf any folder in `parent_folder_path` does not exist, the missing folders are created automatically. For example, when `parent_folder_path` is `/product/images/summer`, the folders `product`, `images`, and `summer` are created if they don't already exist.\n\n\n### Parameters\n\n- `folder_name: string`\n  Name of the folder to create.\n\nAll characters except alphabets and numbers (including Unicode letters, marks, and numerals in other languages) are replaced by an underscore `_`.\n\n\n- `parent_folder_path: string`\n  Full path of the parent folder under which the new folder should be created. Use `/` for the root, otherwise a path like `/containing/folder/`.\n\n\n### Returns\n\n- `{ asset_id: string; }`\n\n  - `asset_id: string`\n\n### Example\n\n```typescript\nimport ImageKit from '@imagekit/nodejs';\n\nconst client = new ImageKit();\n\nconst folder = await client.assets.folders.create({ folder_name: 'summer', parent_folder_path: '/product/images/' });\n\nconsole.log(folder);\n```",
    perLanguage: {
      go: {
        method: 'client.Assets.Folders.New',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/imagekit-developer/imagekit-go/v2"\n\t"github.com/imagekit-developer/imagekit-go/v2/option"\n)\n\nfunc main() {\n\tclient := imagekit.NewClient(\n\t\toption.WithPrivateKey("My Private Key"),\n\t\toption.WithPassword("My Password"),\n\t)\n\tfolder, err := client.Assets.Folders.New(context.TODO(), imagekit.AssetFolderNewParams{\n\t\tFolderName:       "summer",\n\t\tParentFolderPath: "/product/images/",\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", folder.AssetID)\n}\n',
      },
      java: {
        method: 'assets().folders().create',
        example:
          'package io.imagekit.example;\n\nimport io.imagekit.client.ImageKitClient;\nimport io.imagekit.client.okhttp.ImageKitOkHttpClient;\nimport io.imagekit.models.assets.folders.FolderCreateParams;\nimport io.imagekit.models.assets.folders.FolderCreateResponse;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        ImageKitClient client = ImageKitOkHttpClient.fromEnv();\n\n        FolderCreateParams params = FolderCreateParams.builder()\n            .folderName("summer")\n            .parentFolderPath("/product/images/")\n            .build();\n        FolderCreateResponse folder = client.assets().folders().create(params);\n    }\n}',
      },
      php: {
        method: 'assets->folders->create',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(privateKey: 'My Private Key', password: 'My Password');\n\n$folder = $client->assets->folders->create(\n  folderName: 'summer', parentFolderPath: '/product/images/'\n);\n\nvar_dump($folder);",
      },
      python: {
        method: 'assets.folders.create',
        example:
          'import os\nfrom imagekitio import ImageKit\n\nclient = ImageKit(\n    private_key=os.environ.get("IMAGEKIT_PRIVATE_KEY"),  # This is the default and can be omitted\n    password=os.environ.get("OPTIONAL_IMAGEKIT_IGNORES_THIS"),  # This is the default and can be omitted\n)\nfolder = client.assets.folders.create(\n    folder_name="summer",\n    parent_folder_path="/product/images/",\n)\nprint(folder.asset_id)',
      },
      ruby: {
        method: 'assets.folders.create',
        example:
          'require "imagekitio"\n\nimage_kit = Imagekitio::Client.new(private_key: "My Private Key", password: "My Password")\n\nfolder = image_kit.assets.folders.create(folder_name: "summer", parent_folder_path: "/product/images/")\n\nputs(folder)',
      },
      typescript: {
        method: 'client.assets.folders.create',
        example:
          "import ImageKit from '@imagekit/nodejs';\n\nconst client = new ImageKit({\n  privateKey: process.env['IMAGEKIT_PRIVATE_KEY'], // This is the default and can be omitted\n  password: process.env['OPTIONAL_IMAGEKIT_IGNORES_THIS'], // This is the default and can be omitted\n});\n\nconst folder = await client.assets.folders.create({\n  folder_name: 'summer',\n  parent_folder_path: '/product/images/',\n});\n\nconsole.log(folder.asset_id);",
      },
      http: {
        example:
          'curl https://api.imagekit.io/v2/assets/folders \\\n    -H \'Content-Type: application/json\' \\\n    -u "$IMAGEKIT_PRIVATE_KEY:OPTIONAL_IMAGEKIT_IGNORES_THIS" \\\n    -d \'{\n          "folder_name": "summer",\n          "parent_folder_path": "/product/images/"\n        }\'',
      },
      csharp: {
        method: 'Assets.Folders.Create',
        example:
          'FolderCreateParams parameters = new()\n{\n    FolderName = "summer",\n    ParentFolderPath = "/product/images/",\n};\n\nvar folder = await client.Assets.Folders.Create(parameters);\n\nConsole.WriteLine(folder);',
      },
    },
  },
  {
    name: 'get',
    endpoint: '/v2/assets/jobs/{job_id}',
    httpMethod: 'get',
    summary: 'Get bulk job status',
    description: 'Returns the status of a bulk job such as a copy, move, or rename folder operation.\n',
    stainlessPath: '(resource) assets.jobs > (method) get',
    qualified: 'client.assets.jobs.get',
    params: ['job_id: string;'],
    response:
      "{ job_id: string; status: 'Pending' | 'Completed'; type: 'COPY_FOLDER' | 'MOVE_FOLDER' | 'RENAME_FOLDER'; purge_request_id?: string; }",
    markdown:
      "## get\n\n`client.assets.jobs.get(job_id: string): { job_id: string; status: 'Pending' | 'Completed'; type: 'COPY_FOLDER' | 'MOVE_FOLDER' | 'RENAME_FOLDER'; purge_request_id?: string; }`\n\n**get** `/v2/assets/jobs/{job_id}`\n\nReturns the status of a bulk job such as a copy, move, or rename folder operation.\n\n\n### Parameters\n\n- `job_id: string`\n\n### Returns\n\n- `{ job_id: string; status: 'Pending' | 'Completed'; type: 'COPY_FOLDER' | 'MOVE_FOLDER' | 'RENAME_FOLDER'; purge_request_id?: string; }`\n\n  - `job_id: string`\n  - `status: 'Pending' | 'Completed'`\n  - `type: 'COPY_FOLDER' | 'MOVE_FOLDER' | 'RENAME_FOLDER'`\n  - `purge_request_id?: string`\n\n### Example\n\n```typescript\nimport ImageKit from '@imagekit/nodejs';\n\nconst client = new ImageKit();\n\nconst job = await client.assets.jobs.get('job_id');\n\nconsole.log(job);\n```",
    perLanguage: {
      go: {
        method: 'client.Assets.Jobs.Get',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/imagekit-developer/imagekit-go/v2"\n\t"github.com/imagekit-developer/imagekit-go/v2/option"\n)\n\nfunc main() {\n\tclient := imagekit.NewClient(\n\t\toption.WithPrivateKey("My Private Key"),\n\t\toption.WithPassword("My Password"),\n\t)\n\tjob, err := client.Assets.Jobs.Get(context.TODO(), "job_id")\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", job.JobID)\n}\n',
      },
      java: {
        method: 'assets().jobs().get',
        example:
          'package io.imagekit.example;\n\nimport io.imagekit.client.ImageKitClient;\nimport io.imagekit.client.okhttp.ImageKitOkHttpClient;\nimport io.imagekit.models.assets.jobs.JobGetParams;\nimport io.imagekit.models.assets.jobs.JobGetResponse;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        ImageKitClient client = ImageKitOkHttpClient.fromEnv();\n\n        JobGetResponse job = client.assets().jobs().get("job_id");\n    }\n}',
      },
      php: {
        method: 'assets->jobs->get',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(privateKey: 'My Private Key', password: 'My Password');\n\n$job = $client->assets->jobs->get('job_id');\n\nvar_dump($job);",
      },
      python: {
        method: 'assets.jobs.get',
        example:
          'import os\nfrom imagekitio import ImageKit\n\nclient = ImageKit(\n    private_key=os.environ.get("IMAGEKIT_PRIVATE_KEY"),  # This is the default and can be omitted\n    password=os.environ.get("OPTIONAL_IMAGEKIT_IGNORES_THIS"),  # This is the default and can be omitted\n)\njob = client.assets.jobs.get(\n    "job_id",\n)\nprint(job.job_id)',
      },
      ruby: {
        method: 'assets.jobs.get',
        example:
          'require "imagekitio"\n\nimage_kit = Imagekitio::Client.new(private_key: "My Private Key", password: "My Password")\n\njob = image_kit.assets.jobs.get("job_id")\n\nputs(job)',
      },
      typescript: {
        method: 'client.assets.jobs.get',
        example:
          "import ImageKit from '@imagekit/nodejs';\n\nconst client = new ImageKit({\n  privateKey: process.env['IMAGEKIT_PRIVATE_KEY'], // This is the default and can be omitted\n  password: process.env['OPTIONAL_IMAGEKIT_IGNORES_THIS'], // This is the default and can be omitted\n});\n\nconst job = await client.assets.jobs.get('job_id');\n\nconsole.log(job.job_id);",
      },
      http: {
        example:
          'curl https://api.imagekit.io/v2/assets/jobs/$JOB_ID \\\n    -u "$IMAGEKIT_PRIVATE_KEY:OPTIONAL_IMAGEKIT_IGNORES_THIS"',
      },
      csharp: {
        method: 'Assets.Jobs.Get',
        example:
          'JobGetParams parameters = new() { JobID = "job_id" };\n\nvar job = await client.Assets.Jobs.Get(parameters);\n\nConsole.WriteLine(job);',
      },
    },
  },
  {
    name: 'list',
    endpoint: '/v2/saved-extensions',
    httpMethod: 'get',
    summary: 'List all saved extensions',
    description:
      'This API returns an array of all saved extensions for your account. Saved extensions allow you to save complex extension configurations and reuse them by referencing them by ID in upload or update file APIs.\n',
    stainlessPath: '(resource) savedExtensions > (method) list',
    qualified: 'client.savedExtensions.list',
    response: '{ config?: extension_config; description?: string; name?: string; }[]',
    markdown:
      "## list\n\n`client.savedExtensions.list(): saved_extension_base[]`\n\n**get** `/v2/saved-extensions`\n\nThis API returns an array of all saved extensions for your account. Saved extensions allow you to save complex extension configurations and reuse them by referencing them by ID in upload or update file APIs.\n\n\n### Returns\n\n- `{ config?: extension_config; description?: string; name?: string; }[]`\n\n### Example\n\n```typescript\nimport ImageKit from '@imagekit/nodejs';\n\nconst client = new ImageKit();\n\nconst savedExtensions = await client.savedExtensions.list();\n\nconsole.log(savedExtensions);\n```",
    perLanguage: {
      go: {
        method: 'client.SavedExtensions.List',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/imagekit-developer/imagekit-go/v2"\n\t"github.com/imagekit-developer/imagekit-go/v2/option"\n)\n\nfunc main() {\n\tclient := imagekit.NewClient(\n\t\toption.WithPrivateKey("My Private Key"),\n\t\toption.WithPassword("My Password"),\n\t)\n\tsavedExtensions, err := client.SavedExtensions.List(context.TODO())\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", savedExtensions)\n}\n',
      },
      java: {
        method: 'savedExtensions().list',
        example:
          'package io.imagekit.example;\n\nimport io.imagekit.client.ImageKitClient;\nimport io.imagekit.client.okhttp.ImageKitOkHttpClient;\nimport io.imagekit.models.SavedExtension;\nimport io.imagekit.models.savedextensions.SavedExtensionListParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        ImageKitClient client = ImageKitOkHttpClient.fromEnv();\n\n        List<SavedExtension> savedExtensions = client.savedExtensions().list();\n    }\n}',
      },
      php: {
        method: 'savedExtensions->list',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(privateKey: 'My Private Key', password: 'My Password');\n\n$savedExtensions = $client->savedExtensions->list();\n\nvar_dump($savedExtensions);",
      },
      python: {
        method: 'saved_extensions.list',
        example:
          'import os\nfrom imagekitio import ImageKit\n\nclient = ImageKit(\n    private_key=os.environ.get("IMAGEKIT_PRIVATE_KEY"),  # This is the default and can be omitted\n    password=os.environ.get("OPTIONAL_IMAGEKIT_IGNORES_THIS"),  # This is the default and can be omitted\n)\nsaved_extensions = client.saved_extensions.list()\nprint(saved_extensions)',
      },
      ruby: {
        method: 'saved_extensions.list',
        example:
          'require "imagekitio"\n\nimage_kit = Imagekitio::Client.new(private_key: "My Private Key", password: "My Password")\n\nsaved_extensions = image_kit.saved_extensions.list\n\nputs(saved_extensions)',
      },
      typescript: {
        method: 'client.savedExtensions.list',
        example:
          "import ImageKit from '@imagekit/nodejs';\n\nconst client = new ImageKit({\n  privateKey: process.env['IMAGEKIT_PRIVATE_KEY'], // This is the default and can be omitted\n  password: process.env['OPTIONAL_IMAGEKIT_IGNORES_THIS'], // This is the default and can be omitted\n});\n\nconst savedExtensions = await client.savedExtensions.list();\n\nconsole.log(savedExtensions);",
      },
      http: {
        example:
          'curl https://api.imagekit.io/v2/saved-extensions \\\n    -u "$IMAGEKIT_PRIVATE_KEY:OPTIONAL_IMAGEKIT_IGNORES_THIS"',
      },
      csharp: {
        method: 'SavedExtensions.List',
        example:
          'SavedExtensionListParams parameters = new();\n\nvar savedExtensions = await client.SavedExtensions.List(parameters);\n\nConsole.WriteLine(savedExtensions);',
      },
    },
  },
  {
    name: 'create',
    endpoint: '/v2/saved-extensions',
    httpMethod: 'post',
    summary: 'Create saved extension',
    description:
      'This API creates a new saved extension. Saved extensions allow you to save complex extension configurations (like AI tasks) and reuse them by referencing the ID in upload or update file APIs.\n\n**Saved extension limit** \\\nYou can create a maximum of 100 saved extensions per account.\n',
    stainlessPath: '(resource) savedExtensions > (method) create',
    qualified: 'client.savedExtensions.create',
    params: [
      "config: { name: 'remove-bg'; options?: { add_shadow?: boolean; bg_color?: string; bg_image_url?: string; semi_transparency?: boolean; }; } | { max_tags: number; min_confidence: number; name: 'google-auto-tagging' | 'aws-auto-tagging'; } | { name: 'ai-auto-description'; } | { name: 'ai-tasks'; tasks: object | object | object[]; };",
      'description: string;',
      'name: string;',
    ],
    response:
      '{ config?: removedot_bg_extension | auto_tagging_extension | auto_description_extension | ai_tasks_extension; description?: string; name?: string; }',
    markdown:
      "## create\n\n`client.savedExtensions.create(config: object | object | object | object, description: string, name: string): object`\n\n**post** `/v2/saved-extensions`\n\nThis API creates a new saved extension. Saved extensions allow you to save complex extension configurations (like AI tasks) and reuse them by referencing the ID in upload or update file APIs.\n\n**Saved extension limit** \\\nYou can create a maximum of 100 saved extensions per account.\n\n\n### Parameters\n\n- `config: { name: 'remove-bg'; options?: { add_shadow?: boolean; bg_color?: string; bg_image_url?: string; semi_transparency?: boolean; }; } | { max_tags: number; min_confidence: number; name: 'google-auto-tagging' | 'aws-auto-tagging'; } | { name: 'ai-auto-description'; } | { name: 'ai-tasks'; tasks: object | object | object[]; }`\n  Configuration object for an extension (base extensions only, not saved extension references).\n\n- `description: string`\n  Description of the saved extension.\n\n- `name: string`\n  Name of the saved extension.\n\n### Returns\n\n- `{ config?: removedot_bg_extension | auto_tagging_extension | auto_description_extension | ai_tasks_extension; description?: string; name?: string; }`\n  Saved extension object containing extension configuration.\n\n### Example\n\n```typescript\nimport ImageKit from '@imagekit/nodejs';\n\nconst client = new ImageKit();\n\nconst savedExtension = await client.savedExtensions.create({\n  config: { name: 'remove-bg' },\n  description: 'Analyzes vehicle images for type, condition, and quality assessment',\n  name: 'Car Quality Analysis',\n});\n\nconsole.log(savedExtension);\n```",
    perLanguage: {
      go: {
        method: 'client.SavedExtensions.New',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/imagekit-developer/imagekit-go/v2"\n\t"github.com/imagekit-developer/imagekit-go/v2/option"\n\t"github.com/imagekit-developer/imagekit-go/v2/shared"\n)\n\nfunc main() {\n\tclient := imagekit.NewClient(\n\t\toption.WithPrivateKey("My Private Key"),\n\t\toption.WithPassword("My Password"),\n\t)\n\tsavedExtension, err := client.SavedExtensions.New(context.TODO(), imagekit.SavedExtensionNewParams{\n\t\tCreateSavedExtension: imagekit.CreateSavedExtensionParam{\n\t\t\tConfig: shared.ExtensionConfigUnionParam{\n\t\t\t\tOfRemoveBg: &shared.RemovedotBgExtensionParam{},\n\t\t\t},\n\t\t\tDescription: "Analyzes vehicle images for type, condition, and quality assessment",\n\t\t\tName:        "Car Quality Analysis",\n\t\t},\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", savedExtension)\n}\n',
      },
      java: {
        method: 'savedExtensions().create',
        example:
          'package io.imagekit.example;\n\nimport io.imagekit.client.ImageKitClient;\nimport io.imagekit.client.okhttp.ImageKitOkHttpClient;\nimport io.imagekit.models.RemovedotBgExtension;\nimport io.imagekit.models.SavedExtension;\nimport io.imagekit.models.savedextensions.CreateSavedExtension;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        ImageKitClient client = ImageKitOkHttpClient.fromEnv();\n\n        CreateSavedExtension params = CreateSavedExtension.builder()\n            .config(RemovedotBgExtension.builder().build())\n            .description("Analyzes vehicle images for type, condition, and quality assessment")\n            .name("Car Quality Analysis")\n            .build();\n        SavedExtension savedExtension = client.savedExtensions().create(params);\n    }\n}',
      },
      php: {
        method: 'savedExtensions->create',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(privateKey: 'My Private Key', password: 'My Password');\n\n$savedExtension = $client->savedExtensions->create(\n  config: [\n    'name' => 'remove-bg',\n    'options' => [\n      'addShadow' => true,\n      'bgColor' => 'bg_color',\n      'bgImageURL' => 'bg_image_url',\n      'semiTransparency' => true,\n    ],\n  ],\n  description: 'Analyzes vehicle images for type, condition, and quality assessment',\n  name: 'Car Quality Analysis',\n);\n\nvar_dump($savedExtension);",
      },
      python: {
        method: 'saved_extensions.create',
        example:
          'import os\nfrom imagekitio import ImageKit\n\nclient = ImageKit(\n    private_key=os.environ.get("IMAGEKIT_PRIVATE_KEY"),  # This is the default and can be omitted\n    password=os.environ.get("OPTIONAL_IMAGEKIT_IGNORES_THIS"),  # This is the default and can be omitted\n)\nsaved_extension = client.saved_extensions.create(\n    config={\n        "name": "remove-bg"\n    },\n    description="Analyzes vehicle images for type, condition, and quality assessment",\n    name="Car Quality Analysis",\n)\nprint(saved_extension)',
      },
      ruby: {
        method: 'saved_extensions.create',
        example:
          'require "imagekitio"\n\nimage_kit = Imagekitio::Client.new(private_key: "My Private Key", password: "My Password")\n\nsaved_extension = image_kit.saved_extensions.create(\n  config: {name: :"remove-bg"},\n  description: "Analyzes vehicle images for type, condition, and quality assessment",\n  name: "Car Quality Analysis"\n)\n\nputs(saved_extension)',
      },
      typescript: {
        method: 'client.savedExtensions.create',
        example:
          "import ImageKit from '@imagekit/nodejs';\n\nconst client = new ImageKit({\n  privateKey: process.env['IMAGEKIT_PRIVATE_KEY'], // This is the default and can be omitted\n  password: process.env['OPTIONAL_IMAGEKIT_IGNORES_THIS'], // This is the default and can be omitted\n});\n\nconst savedExtension = await client.savedExtensions.create({\n  config: { name: 'remove-bg' },\n  description: 'Analyzes vehicle images for type, condition, and quality assessment',\n  name: 'Car Quality Analysis',\n});\n\nconsole.log(savedExtension);",
      },
      http: {
        example:
          'curl https://api.imagekit.io/v2/saved-extensions \\\n    -H \'Content-Type: application/json\' \\\n    -u "$IMAGEKIT_PRIVATE_KEY:OPTIONAL_IMAGEKIT_IGNORES_THIS" \\\n    -d \'{\n          "config": {\n            "name": "remove-bg"\n          },\n          "description": "Analyzes vehicle images for type, condition, and quality assessment",\n          "name": "Car Quality Analysis"\n        }\'',
      },
      csharp: {
        method: 'SavedExtensions.Create',
        example:
          'SavedExtensionCreateParams parameters = new()\n{\n    Config = new RemovedotBgExtension()\n    {\n        Options = new()\n        {\n            AddShadow = true,\n            BgColor = "bg_color",\n            BgImageUrl = "bg_image_url",\n            SemiTransparency = true,\n        },\n    },\n    Description = "Analyzes vehicle images for type, condition, and quality assessment",\n    Name = "Car Quality Analysis",\n};\n\nvar savedExtension = await client.SavedExtensions.Create(parameters);\n\nConsole.WriteLine(savedExtension);',
      },
    },
  },
  {
    name: 'get',
    endpoint: '/v2/saved-extensions/{id}',
    httpMethod: 'get',
    summary: 'Get saved extension details',
    description: 'This API returns details of a specific saved extension by ID.\n',
    stainlessPath: '(resource) savedExtensions > (method) get',
    qualified: 'client.savedExtensions.get',
    params: ['id: string;'],
    response:
      '{ config?: removedot_bg_extension | auto_tagging_extension | auto_description_extension | ai_tasks_extension; description?: string; name?: string; }',
    markdown:
      "## get\n\n`client.savedExtensions.get(id: string): object`\n\n**get** `/v2/saved-extensions/{id}`\n\nThis API returns details of a specific saved extension by ID.\n\n\n### Parameters\n\n- `id: string`\n\n### Returns\n\n- `{ config?: removedot_bg_extension | auto_tagging_extension | auto_description_extension | ai_tasks_extension; description?: string; name?: string; }`\n  Saved extension object containing extension configuration.\n\n### Example\n\n```typescript\nimport ImageKit from '@imagekit/nodejs';\n\nconst client = new ImageKit();\n\nconst savedExtension = await client.savedExtensions.get('id');\n\nconsole.log(savedExtension);\n```",
    perLanguage: {
      go: {
        method: 'client.SavedExtensions.Get',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/imagekit-developer/imagekit-go/v2"\n\t"github.com/imagekit-developer/imagekit-go/v2/option"\n)\n\nfunc main() {\n\tclient := imagekit.NewClient(\n\t\toption.WithPrivateKey("My Private Key"),\n\t\toption.WithPassword("My Password"),\n\t)\n\tsavedExtension, err := client.SavedExtensions.Get(context.TODO(), "id")\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", savedExtension)\n}\n',
      },
      java: {
        method: 'savedExtensions().get',
        example:
          'package io.imagekit.example;\n\nimport io.imagekit.client.ImageKitClient;\nimport io.imagekit.client.okhttp.ImageKitOkHttpClient;\nimport io.imagekit.models.SavedExtension;\nimport io.imagekit.models.savedextensions.SavedExtensionGetParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        ImageKitClient client = ImageKitOkHttpClient.fromEnv();\n\n        SavedExtension savedExtension = client.savedExtensions().get("id");\n    }\n}',
      },
      php: {
        method: 'savedExtensions->get',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(privateKey: 'My Private Key', password: 'My Password');\n\n$savedExtension = $client->savedExtensions->get('id');\n\nvar_dump($savedExtension);",
      },
      python: {
        method: 'saved_extensions.get',
        example:
          'import os\nfrom imagekitio import ImageKit\n\nclient = ImageKit(\n    private_key=os.environ.get("IMAGEKIT_PRIVATE_KEY"),  # This is the default and can be omitted\n    password=os.environ.get("OPTIONAL_IMAGEKIT_IGNORES_THIS"),  # This is the default and can be omitted\n)\nsaved_extension = client.saved_extensions.get(\n    "id",\n)\nprint(saved_extension)',
      },
      ruby: {
        method: 'saved_extensions.get',
        example:
          'require "imagekitio"\n\nimage_kit = Imagekitio::Client.new(private_key: "My Private Key", password: "My Password")\n\nsaved_extension = image_kit.saved_extensions.get("id")\n\nputs(saved_extension)',
      },
      typescript: {
        method: 'client.savedExtensions.get',
        example:
          "import ImageKit from '@imagekit/nodejs';\n\nconst client = new ImageKit({\n  privateKey: process.env['IMAGEKIT_PRIVATE_KEY'], // This is the default and can be omitted\n  password: process.env['OPTIONAL_IMAGEKIT_IGNORES_THIS'], // This is the default and can be omitted\n});\n\nconst savedExtension = await client.savedExtensions.get('id');\n\nconsole.log(savedExtension);",
      },
      http: {
        example:
          'curl https://api.imagekit.io/v2/saved-extensions/$ID \\\n    -u "$IMAGEKIT_PRIVATE_KEY:OPTIONAL_IMAGEKIT_IGNORES_THIS"',
      },
      csharp: {
        method: 'SavedExtensions.Get',
        example:
          'SavedExtensionGetParams parameters = new() { ID = "id" };\n\nvar savedExtension = await client.SavedExtensions.Get(parameters);\n\nConsole.WriteLine(savedExtension);',
      },
    },
  },
  {
    name: 'update',
    endpoint: '/v2/saved-extensions/{id}',
    httpMethod: 'patch',
    summary: 'Update saved extension',
    description:
      'This API updates an existing saved extension. You can update the name, description, or config.\n',
    stainlessPath: '(resource) savedExtensions > (method) update',
    qualified: 'client.savedExtensions.update',
    params: [
      'id: string;',
      "config?: { name: 'remove-bg'; options?: { add_shadow?: boolean; bg_color?: string; bg_image_url?: string; semi_transparency?: boolean; }; } | { max_tags: number; min_confidence: number; name: 'google-auto-tagging' | 'aws-auto-tagging'; } | { name: 'ai-auto-description'; } | { name: 'ai-tasks'; tasks: object | object | object[]; };",
      'description?: string;',
      'name?: string;',
    ],
    response:
      '{ config?: removedot_bg_extension | auto_tagging_extension | auto_description_extension | ai_tasks_extension; description?: string; name?: string; }',
    markdown:
      "## update\n\n`client.savedExtensions.update(id: string, config?: object | object | object | object, description?: string, name?: string): object`\n\n**patch** `/v2/saved-extensions/{id}`\n\nThis API updates an existing saved extension. You can update the name, description, or config.\n\n\n### Parameters\n\n- `id: string`\n\n- `config?: { name: 'remove-bg'; options?: { add_shadow?: boolean; bg_color?: string; bg_image_url?: string; semi_transparency?: boolean; }; } | { max_tags: number; min_confidence: number; name: 'google-auto-tagging' | 'aws-auto-tagging'; } | { name: 'ai-auto-description'; } | { name: 'ai-tasks'; tasks: object | object | object[]; }`\n  Configuration object for an extension (base extensions only, not saved extension references).\n\n- `description?: string`\n  Description of the saved extension.\n\n- `name?: string`\n  Name of the saved extension.\n\n### Returns\n\n- `{ config?: removedot_bg_extension | auto_tagging_extension | auto_description_extension | ai_tasks_extension; description?: string; name?: string; }`\n  Saved extension object containing extension configuration.\n\n### Example\n\n```typescript\nimport ImageKit from '@imagekit/nodejs';\n\nconst client = new ImageKit();\n\nconst savedExtension = await client.savedExtensions.update('id');\n\nconsole.log(savedExtension);\n```",
    perLanguage: {
      go: {
        method: 'client.SavedExtensions.Update',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/imagekit-developer/imagekit-go/v2"\n\t"github.com/imagekit-developer/imagekit-go/v2/option"\n)\n\nfunc main() {\n\tclient := imagekit.NewClient(\n\t\toption.WithPrivateKey("My Private Key"),\n\t\toption.WithPassword("My Password"),\n\t)\n\tsavedExtension, err := client.SavedExtensions.Update(\n\t\tcontext.TODO(),\n\t\t"id",\n\t\timagekit.SavedExtensionUpdateParams{\n\t\t\tUpdateSavedExtension: imagekit.UpdateSavedExtensionParam{},\n\t\t},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", savedExtension)\n}\n',
      },
      java: {
        method: 'savedExtensions().update',
        example:
          'package io.imagekit.example;\n\nimport io.imagekit.client.ImageKitClient;\nimport io.imagekit.client.okhttp.ImageKitOkHttpClient;\nimport io.imagekit.models.SavedExtension;\nimport io.imagekit.models.savedextensions.SavedExtensionUpdateParams;\nimport io.imagekit.models.savedextensions.UpdateSavedExtension;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        ImageKitClient client = ImageKitOkHttpClient.fromEnv();\n\n        SavedExtensionUpdateParams params = SavedExtensionUpdateParams.builder()\n            .id("id")\n            .updateSavedExtension(UpdateSavedExtension.builder().build())\n            .build();\n        SavedExtension savedExtension = client.savedExtensions().update(params);\n    }\n}',
      },
      php: {
        method: 'savedExtensions->update',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(privateKey: 'My Private Key', password: 'My Password');\n\n$savedExtension = $client->savedExtensions->update(\n  'id',\n  config: [\n    'name' => 'remove-bg',\n    'options' => [\n      'addShadow' => true,\n      'bgColor' => 'bg_color',\n      'bgImageURL' => 'bg_image_url',\n      'semiTransparency' => true,\n    ],\n  ],\n  description: 'Analyzes vehicle images for type, condition, and quality assessment',\n  name: 'Car Quality Analysis',\n);\n\nvar_dump($savedExtension);",
      },
      python: {
        method: 'saved_extensions.update',
        example:
          'import os\nfrom imagekitio import ImageKit\n\nclient = ImageKit(\n    private_key=os.environ.get("IMAGEKIT_PRIVATE_KEY"),  # This is the default and can be omitted\n    password=os.environ.get("OPTIONAL_IMAGEKIT_IGNORES_THIS"),  # This is the default and can be omitted\n)\nsaved_extension = client.saved_extensions.update(\n    id="id",\n)\nprint(saved_extension)',
      },
      ruby: {
        method: 'saved_extensions.update',
        example:
          'require "imagekitio"\n\nimage_kit = Imagekitio::Client.new(private_key: "My Private Key", password: "My Password")\n\nsaved_extension = image_kit.saved_extensions.update("id")\n\nputs(saved_extension)',
      },
      typescript: {
        method: 'client.savedExtensions.update',
        example:
          "import ImageKit from '@imagekit/nodejs';\n\nconst client = new ImageKit({\n  privateKey: process.env['IMAGEKIT_PRIVATE_KEY'], // This is the default and can be omitted\n  password: process.env['OPTIONAL_IMAGEKIT_IGNORES_THIS'], // This is the default and can be omitted\n});\n\nconst savedExtension = await client.savedExtensions.update('id');\n\nconsole.log(savedExtension);",
      },
      http: {
        example:
          'curl https://api.imagekit.io/v2/saved-extensions/$ID \\\n    -X PATCH \\\n    -H \'Content-Type: application/json\' \\\n    -u "$IMAGEKIT_PRIVATE_KEY:OPTIONAL_IMAGEKIT_IGNORES_THIS" \\\n    -d \'{\n          "description": "Analyzes vehicle images for type, condition, and quality assessment",\n          "name": "Car Quality Analysis"\n        }\'',
      },
      csharp: {
        method: 'SavedExtensions.Update',
        example:
          'SavedExtensionUpdateParams parameters = new() { ID = "id" };\n\nvar savedExtension = await client.SavedExtensions.Update(parameters);\n\nConsole.WriteLine(savedExtension);',
      },
    },
  },
  {
    name: 'delete',
    endpoint: '/v2/saved-extensions/{id}',
    httpMethod: 'delete',
    summary: 'Delete saved extension',
    description: 'This API deletes a saved extension permanently.\n',
    stainlessPath: '(resource) savedExtensions > (method) delete',
    qualified: 'client.savedExtensions.delete',
    params: ['id: string;'],
    markdown:
      "## delete\n\n`client.savedExtensions.delete(id: string): void`\n\n**delete** `/v2/saved-extensions/{id}`\n\nThis API deletes a saved extension permanently.\n\n\n### Parameters\n\n- `id: string`\n\n### Example\n\n```typescript\nimport ImageKit from '@imagekit/nodejs';\n\nconst client = new ImageKit();\n\nawait client.savedExtensions.delete('id')\n```",
    perLanguage: {
      go: {
        method: 'client.SavedExtensions.Delete',
        example:
          'package main\n\nimport (\n\t"context"\n\n\t"github.com/imagekit-developer/imagekit-go/v2"\n\t"github.com/imagekit-developer/imagekit-go/v2/option"\n)\n\nfunc main() {\n\tclient := imagekit.NewClient(\n\t\toption.WithPrivateKey("My Private Key"),\n\t\toption.WithPassword("My Password"),\n\t)\n\terr := client.SavedExtensions.Delete(context.TODO(), "id")\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n}\n',
      },
      java: {
        method: 'savedExtensions().delete',
        example:
          'package io.imagekit.example;\n\nimport io.imagekit.client.ImageKitClient;\nimport io.imagekit.client.okhttp.ImageKitOkHttpClient;\nimport io.imagekit.models.savedextensions.SavedExtensionDeleteParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        ImageKitClient client = ImageKitOkHttpClient.fromEnv();\n\n        client.savedExtensions().delete("id");\n    }\n}',
      },
      php: {
        method: 'savedExtensions->delete',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(privateKey: 'My Private Key', password: 'My Password');\n\n$result = $client->savedExtensions->delete('id');\n\nvar_dump($result);",
      },
      python: {
        method: 'saved_extensions.delete',
        example:
          'import os\nfrom imagekitio import ImageKit\n\nclient = ImageKit(\n    private_key=os.environ.get("IMAGEKIT_PRIVATE_KEY"),  # This is the default and can be omitted\n    password=os.environ.get("OPTIONAL_IMAGEKIT_IGNORES_THIS"),  # This is the default and can be omitted\n)\nclient.saved_extensions.delete(\n    "id",\n)',
      },
      ruby: {
        method: 'saved_extensions.delete',
        example:
          'require "imagekitio"\n\nimage_kit = Imagekitio::Client.new(private_key: "My Private Key", password: "My Password")\n\nresult = image_kit.saved_extensions.delete("id")\n\nputs(result)',
      },
      typescript: {
        method: 'client.savedExtensions.delete',
        example:
          "import ImageKit from '@imagekit/nodejs';\n\nconst client = new ImageKit({\n  privateKey: process.env['IMAGEKIT_PRIVATE_KEY'], // This is the default and can be omitted\n  password: process.env['OPTIONAL_IMAGEKIT_IGNORES_THIS'], // This is the default and can be omitted\n});\n\nawait client.savedExtensions.delete('id');",
      },
      http: {
        example:
          'curl https://api.imagekit.io/v2/saved-extensions/$ID \\\n    -X DELETE \\\n    -u "$IMAGEKIT_PRIVATE_KEY:OPTIONAL_IMAGEKIT_IGNORES_THIS"',
      },
      csharp: {
        method: 'SavedExtensions.Delete',
        example:
          'SavedExtensionDeleteParams parameters = new() { ID = "id" };\n\nawait client.SavedExtensions.Delete(parameters);',
      },
    },
  },
  {
    name: 'create',
    endpoint: '/v2/cache/invalidations',
    httpMethod: 'post',
    summary: 'Purge cache',
    description:
      "This API will invalidate CDN cache and ImageKit.io's internal cache for an asset.  Note: Purge cache is an asynchronous process and it may take some time to reflect the changes.\n",
    stainlessPath: '(resource) cache.invalidation > (method) create',
    qualified: 'client.cache.invalidation.create',
    params: ['url: string;'],
    response: '{ request_id?: string; }',
    markdown:
      "## create\n\n`client.cache.invalidation.create(url: string): { request_id?: string; }`\n\n**post** `/v2/cache/invalidations`\n\nThis API will invalidate CDN cache and ImageKit.io's internal cache for an asset.  Note: Purge cache is an asynchronous process and it may take some time to reflect the changes.\n\n\n### Parameters\n\n- `url: string`\n  The full URL of the file to be purged.\n\n\n### Returns\n\n- `{ request_id?: string; }`\n\n  - `request_id?: string`\n\n### Example\n\n```typescript\nimport ImageKit from '@imagekit/nodejs';\n\nconst client = new ImageKit();\n\nconst invalidation = await client.cache.invalidation.create({ url: 'https://ik.imagekit.io/your_imagekit_id/default-image.jpg' });\n\nconsole.log(invalidation);\n```",
    perLanguage: {
      go: {
        method: 'client.Cache.Invalidation.New',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/imagekit-developer/imagekit-go/v2"\n\t"github.com/imagekit-developer/imagekit-go/v2/option"\n)\n\nfunc main() {\n\tclient := imagekit.NewClient(\n\t\toption.WithPrivateKey("My Private Key"),\n\t\toption.WithPassword("My Password"),\n\t)\n\tinvalidation, err := client.Cache.Invalidation.New(context.TODO(), imagekit.CacheInvalidationNewParams{\n\t\tURL: "https://ik.imagekit.io/your_imagekit_id/default-image.jpg",\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", invalidation.RequestID)\n}\n',
      },
      java: {
        method: 'cache().invalidation().create',
        example:
          'package io.imagekit.example;\n\nimport io.imagekit.client.ImageKitClient;\nimport io.imagekit.client.okhttp.ImageKitOkHttpClient;\nimport io.imagekit.models.cache.invalidation.InvalidationCreateParams;\nimport io.imagekit.models.cache.invalidation.InvalidationCreateResponse;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        ImageKitClient client = ImageKitOkHttpClient.fromEnv();\n\n        InvalidationCreateParams params = InvalidationCreateParams.builder()\n            .url("https://ik.imagekit.io/your_imagekit_id/default-image.jpg")\n            .build();\n        InvalidationCreateResponse invalidation = client.cache().invalidation().create(params);\n    }\n}',
      },
      php: {
        method: 'cache->invalidation->create',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(privateKey: 'My Private Key', password: 'My Password');\n\n$invalidation = $client->cache->invalidation->create(\n  url: 'https://ik.imagekit.io/your_imagekit_id/default-image.jpg'\n);\n\nvar_dump($invalidation);",
      },
      python: {
        method: 'cache.invalidation.create',
        example:
          'import os\nfrom imagekitio import ImageKit\n\nclient = ImageKit(\n    private_key=os.environ.get("IMAGEKIT_PRIVATE_KEY"),  # This is the default and can be omitted\n    password=os.environ.get("OPTIONAL_IMAGEKIT_IGNORES_THIS"),  # This is the default and can be omitted\n)\ninvalidation = client.cache.invalidation.create(\n    url="https://ik.imagekit.io/your_imagekit_id/default-image.jpg",\n)\nprint(invalidation.request_id)',
      },
      ruby: {
        method: 'cache.invalidation.create',
        example:
          'require "imagekitio"\n\nimage_kit = Imagekitio::Client.new(private_key: "My Private Key", password: "My Password")\n\ninvalidation = image_kit.cache.invalidation.create(url: "https://ik.imagekit.io/your_imagekit_id/default-image.jpg")\n\nputs(invalidation)',
      },
      typescript: {
        method: 'client.cache.invalidation.create',
        example:
          "import ImageKit from '@imagekit/nodejs';\n\nconst client = new ImageKit({\n  privateKey: process.env['IMAGEKIT_PRIVATE_KEY'], // This is the default and can be omitted\n  password: process.env['OPTIONAL_IMAGEKIT_IGNORES_THIS'], // This is the default and can be omitted\n});\n\nconst invalidation = await client.cache.invalidation.create({\n  url: 'https://ik.imagekit.io/your_imagekit_id/default-image.jpg',\n});\n\nconsole.log(invalidation.request_id);",
      },
      http: {
        example:
          'curl https://api.imagekit.io/v2/cache/invalidations \\\n    -H \'Content-Type: application/json\' \\\n    -u "$IMAGEKIT_PRIVATE_KEY:OPTIONAL_IMAGEKIT_IGNORES_THIS" \\\n    -d \'{\n          "url": "https://ik.imagekit.io/your_imagekit_id/default-image.jpg"\n        }\'',
      },
      csharp: {
        method: 'Cache.Invalidation.Create',
        example:
          'InvalidationCreateParams parameters = new()\n{\n    Url = "https://ik.imagekit.io/your_imagekit_id/default-image.jpg"\n};\n\nvar invalidation = await client.Cache.Invalidation.Create(parameters);\n\nConsole.WriteLine(invalidation);',
      },
    },
  },
  {
    name: 'get',
    endpoint: '/v2/cache/invalidations/{request_id}',
    httpMethod: 'get',
    summary: 'Get invalidation status',
    description: 'This API returns the status of a cache invalidation request.\n',
    stainlessPath: '(resource) cache.invalidation > (method) get',
    qualified: 'client.cache.invalidation.get',
    params: ['request_id: string;'],
    response: "{ status?: 'Pending' | 'Completed'; }",
    markdown:
      "## get\n\n`client.cache.invalidation.get(request_id: string): { status?: 'Pending' | 'Completed'; }`\n\n**get** `/v2/cache/invalidations/{request_id}`\n\nThis API returns the status of a cache invalidation request.\n\n\n### Parameters\n\n- `request_id: string`\n\n### Returns\n\n- `{ status?: 'Pending' | 'Completed'; }`\n\n  - `status?: 'Pending' | 'Completed'`\n\n### Example\n\n```typescript\nimport ImageKit from '@imagekit/nodejs';\n\nconst client = new ImageKit();\n\nconst invalidation = await client.cache.invalidation.get('request_id');\n\nconsole.log(invalidation);\n```",
    perLanguage: {
      go: {
        method: 'client.Cache.Invalidation.Get',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/imagekit-developer/imagekit-go/v2"\n\t"github.com/imagekit-developer/imagekit-go/v2/option"\n)\n\nfunc main() {\n\tclient := imagekit.NewClient(\n\t\toption.WithPrivateKey("My Private Key"),\n\t\toption.WithPassword("My Password"),\n\t)\n\tinvalidation, err := client.Cache.Invalidation.Get(context.TODO(), "request_id")\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", invalidation.Status)\n}\n',
      },
      java: {
        method: 'cache().invalidation().get',
        example:
          'package io.imagekit.example;\n\nimport io.imagekit.client.ImageKitClient;\nimport io.imagekit.client.okhttp.ImageKitOkHttpClient;\nimport io.imagekit.models.cache.invalidation.InvalidationGetParams;\nimport io.imagekit.models.cache.invalidation.InvalidationGetResponse;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        ImageKitClient client = ImageKitOkHttpClient.fromEnv();\n\n        InvalidationGetResponse invalidation = client.cache().invalidation().get("request_id");\n    }\n}',
      },
      php: {
        method: 'cache->invalidation->get',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(privateKey: 'My Private Key', password: 'My Password');\n\n$invalidation = $client->cache->invalidation->get('request_id');\n\nvar_dump($invalidation);",
      },
      python: {
        method: 'cache.invalidation.get',
        example:
          'import os\nfrom imagekitio import ImageKit\n\nclient = ImageKit(\n    private_key=os.environ.get("IMAGEKIT_PRIVATE_KEY"),  # This is the default and can be omitted\n    password=os.environ.get("OPTIONAL_IMAGEKIT_IGNORES_THIS"),  # This is the default and can be omitted\n)\ninvalidation = client.cache.invalidation.get(\n    "request_id",\n)\nprint(invalidation.status)',
      },
      ruby: {
        method: 'cache.invalidation.get',
        example:
          'require "imagekitio"\n\nimage_kit = Imagekitio::Client.new(private_key: "My Private Key", password: "My Password")\n\ninvalidation = image_kit.cache.invalidation.get("request_id")\n\nputs(invalidation)',
      },
      typescript: {
        method: 'client.cache.invalidation.get',
        example:
          "import ImageKit from '@imagekit/nodejs';\n\nconst client = new ImageKit({\n  privateKey: process.env['IMAGEKIT_PRIVATE_KEY'], // This is the default and can be omitted\n  password: process.env['OPTIONAL_IMAGEKIT_IGNORES_THIS'], // This is the default and can be omitted\n});\n\nconst invalidation = await client.cache.invalidation.get('request_id');\n\nconsole.log(invalidation.status);",
      },
      http: {
        example:
          'curl https://api.imagekit.io/v2/cache/invalidations/$REQUEST_ID \\\n    -u "$IMAGEKIT_PRIVATE_KEY:OPTIONAL_IMAGEKIT_IGNORES_THIS"',
      },
      csharp: {
        method: 'Cache.Invalidation.Get',
        example:
          'InvalidationGetParams parameters = new() { RequestID = "request_id" };\n\nvar invalidation = await client.Cache.Invalidation.Get(parameters);\n\nConsole.WriteLine(invalidation);',
      },
    },
  },
  {
    name: 'get',
    endpoint: '/v2/accounts/usage',
    httpMethod: 'get',
    summary: 'Get account usage information',
    description:
      'Get the account usage information between two dates. Note that the API response includes data from the start date while excluding data from the end date. In other words, the data covers the period starting from the specified start date up to, but not including, the end date.\n',
    stainlessPath: '(resource) accounts.usage > (method) get',
    qualified: 'client.accounts.usage.get',
    params: ['endDate: string;', 'startDate: string;'],
    response:
      '{ bandwidthBytes?: number; extensionUnitsCount?: number; mediaLibraryStorageBytes?: number; originalCacheStorageBytes?: number; videoProcessingUnitsCount?: number; }',
    markdown:
      "## get\n\n`client.accounts.usage.get(endDate: string, startDate: string): { bandwidthBytes?: number; extensionUnitsCount?: number; mediaLibraryStorageBytes?: number; originalCacheStorageBytes?: number; videoProcessingUnitsCount?: number; }`\n\n**get** `/v2/accounts/usage`\n\nGet the account usage information between two dates. Note that the API response includes data from the start date while excluding data from the end date. In other words, the data covers the period starting from the specified start date up to, but not including, the end date.\n\n\n### Parameters\n\n- `endDate: string`\n  Specify a `endDate` in `YYYY-MM-DD` format. It should be after the `startDate`. The difference between `startDate` and `endDate` should be less than 90 days.\n\n- `startDate: string`\n  Specify a `startDate` in `YYYY-MM-DD` format. It should be before the `endDate`. The difference between `startDate` and `endDate` should be less than 90 days.\n\n### Returns\n\n- `{ bandwidthBytes?: number; extensionUnitsCount?: number; mediaLibraryStorageBytes?: number; originalCacheStorageBytes?: number; videoProcessingUnitsCount?: number; }`\n\n  - `bandwidthBytes?: number`\n  - `extensionUnitsCount?: number`\n  - `mediaLibraryStorageBytes?: number`\n  - `originalCacheStorageBytes?: number`\n  - `videoProcessingUnitsCount?: number`\n\n### Example\n\n```typescript\nimport ImageKit from '@imagekit/nodejs';\n\nconst client = new ImageKit();\n\nconst usage = await client.accounts.usage.get({ endDate: '2019-12-27', startDate: '2019-12-27' });\n\nconsole.log(usage);\n```",
    perLanguage: {
      go: {
        method: 'client.Accounts.Usage.Get',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\t"time"\n\n\t"github.com/imagekit-developer/imagekit-go/v2"\n\t"github.com/imagekit-developer/imagekit-go/v2/option"\n)\n\nfunc main() {\n\tclient := imagekit.NewClient(\n\t\toption.WithPrivateKey("My Private Key"),\n\t\toption.WithPassword("My Password"),\n\t)\n\tusage, err := client.Accounts.Usage.Get(context.TODO(), imagekit.AccountUsageGetParams{\n\t\tEndDate:   time.Now(),\n\t\tStartDate: time.Now(),\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", usage.BandwidthBytes)\n}\n',
      },
      java: {
        method: 'accounts().usage().get',
        example:
          'package io.imagekit.example;\n\nimport io.imagekit.client.ImageKitClient;\nimport io.imagekit.client.okhttp.ImageKitOkHttpClient;\nimport io.imagekit.models.accounts.usage.UsageGetParams;\nimport io.imagekit.models.accounts.usage.UsageGetResponse;\nimport java.time.LocalDate;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        ImageKitClient client = ImageKitOkHttpClient.fromEnv();\n\n        UsageGetParams params = UsageGetParams.builder()\n            .endDate(LocalDate.parse("2019-12-27"))\n            .startDate(LocalDate.parse("2019-12-27"))\n            .build();\n        UsageGetResponse usage = client.accounts().usage().get(params);\n    }\n}',
      },
      php: {
        method: 'accounts->usage->get',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(privateKey: 'My Private Key', password: 'My Password');\n\n$usage = $client->accounts->usage->get(\n  endDate: '2019-12-27', startDate: '2019-12-27'\n);\n\nvar_dump($usage);",
      },
      python: {
        method: 'accounts.usage.get',
        example:
          'import os\nfrom datetime import date\nfrom imagekitio import ImageKit\n\nclient = ImageKit(\n    private_key=os.environ.get("IMAGEKIT_PRIVATE_KEY"),  # This is the default and can be omitted\n    password=os.environ.get("OPTIONAL_IMAGEKIT_IGNORES_THIS"),  # This is the default and can be omitted\n)\nusage = client.accounts.usage.get(\n    end_date=date.fromisoformat("2019-12-27"),\n    start_date=date.fromisoformat("2019-12-27"),\n)\nprint(usage.bandwidth_bytes)',
      },
      ruby: {
        method: 'accounts.usage.get',
        example:
          'require "imagekitio"\n\nimage_kit = Imagekitio::Client.new(private_key: "My Private Key", password: "My Password")\n\nusage = image_kit.accounts.usage.get(end_date: "2019-12-27", start_date: "2019-12-27")\n\nputs(usage)',
      },
      typescript: {
        method: 'client.accounts.usage.get',
        example:
          "import ImageKit from '@imagekit/nodejs';\n\nconst client = new ImageKit({\n  privateKey: process.env['IMAGEKIT_PRIVATE_KEY'], // This is the default and can be omitted\n  password: process.env['OPTIONAL_IMAGEKIT_IGNORES_THIS'], // This is the default and can be omitted\n});\n\nconst usage = await client.accounts.usage.get({ endDate: '2019-12-27', startDate: '2019-12-27' });\n\nconsole.log(usage.bandwidthBytes);",
      },
      http: {
        example:
          'curl https://api.imagekit.io/v2/accounts/usage \\\n    -u "$IMAGEKIT_PRIVATE_KEY:OPTIONAL_IMAGEKIT_IGNORES_THIS"',
      },
      csharp: {
        method: 'Accounts.Usage.Get',
        example:
          'UsageGetParams parameters = new()\n{\n    EndDate = "2019-12-27",\n    StartDate = "2019-12-27",\n};\n\nvar usage = await client.Accounts.Usage.Get(parameters);\n\nConsole.WriteLine(usage);',
      },
    },
  },
  {
    name: 'list',
    endpoint: '/v2/accounts/origins',
    httpMethod: 'get',
    summary: 'List origins',
    description:
      '**Note:** This API is currently in beta.  \nReturns an array of all configured origins for the current account.\n',
    stainlessPath: '(resource) accounts.origins > (method) list',
    qualified: 'client.accounts.origins.list',
    response: 'object | object | object | object | object | object | object | object[]',
    markdown:
      "## list\n\n`client.accounts.origins.list(): object | object | object | object | object | object | object | object[]`\n\n**get** `/v2/accounts/origins`\n\n**Note:** This API is currently in beta.  \nReturns an array of all configured origins for the current account.\n\n\n### Returns\n\n- `{ id: string; bucket: string; include_canonical_header: boolean; name: string; prefix: string; type: 'S3'; base_url_for_canonical_header?: string; } | { id: string; bucket: string; endpoint: string; include_canonical_header: boolean; name: string; prefix: string; s3_force_path_style: boolean; type: 'S3_COMPATIBLE'; base_url_for_canonical_header?: string; } | { id: string; bucket: string; include_canonical_header: boolean; name: string; prefix: string; type: 'CLOUDINARY_BACKUP'; base_url_for_canonical_header?: string; } | { id: string; base_url: string; forward_host_header_to_origin: boolean; include_canonical_header: boolean; name: string; type: 'WEB_FOLDER'; base_url_for_canonical_header?: string; } | { id: string; include_canonical_header: boolean; name: string; type: 'WEB_PROXY'; base_url_for_canonical_header?: string; } | { id: string; bucket: string; client_email: string; include_canonical_header: boolean; name: string; prefix: string; type: 'GCS'; base_url_for_canonical_header?: string; } | { id: string; account_name: string; container: string; include_canonical_header: boolean; name: string; prefix: string; type: 'AZURE_BLOB'; base_url_for_canonical_header?: string; } | { id: string; base_url: string; include_canonical_header: boolean; name: string; type: 'AKENEO_PIM'; base_url_for_canonical_header?: string; }[]`\n\n### Example\n\n```typescript\nimport ImageKit from '@imagekit/nodejs';\n\nconst client = new ImageKit();\n\nconst originResponses = await client.accounts.origins.list();\n\nconsole.log(originResponses);\n```",
    perLanguage: {
      go: {
        method: 'client.Accounts.Origins.List',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/imagekit-developer/imagekit-go/v2"\n\t"github.com/imagekit-developer/imagekit-go/v2/option"\n)\n\nfunc main() {\n\tclient := imagekit.NewClient(\n\t\toption.WithPrivateKey("My Private Key"),\n\t\toption.WithPassword("My Password"),\n\t)\n\toriginResponses, err := client.Accounts.Origins.List(context.TODO())\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", originResponses)\n}\n',
      },
      java: {
        method: 'accounts().origins().list',
        example:
          'package io.imagekit.example;\n\nimport io.imagekit.client.ImageKitClient;\nimport io.imagekit.client.okhttp.ImageKitOkHttpClient;\nimport io.imagekit.models.accounts.origins.OriginListParams;\nimport io.imagekit.models.accounts.origins.OriginResponse;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        ImageKitClient client = ImageKitOkHttpClient.fromEnv();\n\n        List<OriginResponse> originResponses = client.accounts().origins().list();\n    }\n}',
      },
      php: {
        method: 'accounts->origins->list',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(privateKey: 'My Private Key', password: 'My Password');\n\n$originResponses = $client->accounts->origins->list();\n\nvar_dump($originResponses);",
      },
      python: {
        method: 'accounts.origins.list',
        example:
          'import os\nfrom imagekitio import ImageKit\n\nclient = ImageKit(\n    private_key=os.environ.get("IMAGEKIT_PRIVATE_KEY"),  # This is the default and can be omitted\n    password=os.environ.get("OPTIONAL_IMAGEKIT_IGNORES_THIS"),  # This is the default and can be omitted\n)\norigin_responses = client.accounts.origins.list()\nprint(origin_responses)',
      },
      ruby: {
        method: 'accounts.origins.list',
        example:
          'require "imagekitio"\n\nimage_kit = Imagekitio::Client.new(private_key: "My Private Key", password: "My Password")\n\norigin_responses = image_kit.accounts.origins.list\n\nputs(origin_responses)',
      },
      typescript: {
        method: 'client.accounts.origins.list',
        example:
          "import ImageKit from '@imagekit/nodejs';\n\nconst client = new ImageKit({\n  privateKey: process.env['IMAGEKIT_PRIVATE_KEY'], // This is the default and can be omitted\n  password: process.env['OPTIONAL_IMAGEKIT_IGNORES_THIS'], // This is the default and can be omitted\n});\n\nconst originResponses = await client.accounts.origins.list();\n\nconsole.log(originResponses);",
      },
      http: {
        example:
          'curl https://api.imagekit.io/v2/accounts/origins \\\n    -u "$IMAGEKIT_PRIVATE_KEY:OPTIONAL_IMAGEKIT_IGNORES_THIS"',
      },
      csharp: {
        method: 'Accounts.Origins.List',
        example:
          'OriginListParams parameters = new();\n\nvar originResponses = await client.Accounts.Origins.List(parameters);\n\nConsole.WriteLine(originResponses);',
      },
    },
  },
  {
    name: 'create',
    endpoint: '/v2/accounts/origins',
    httpMethod: 'post',
    summary: 'Create origin',
    description:
      '**Note:** This API is currently in beta.   Creates a new origin and returns the origin object.\n',
    stainlessPath: '(resource) accounts.origins > (method) create',
    qualified: 'client.accounts.origins.create',
    params: [
      "OriginRequest: { access_key: string; bucket: string; name: string; secret_key: string; type: 'S3'; base_url_for_canonical_header?: string; include_canonical_header?: boolean; prefix?: string; } | { access_key: string; bucket: string; endpoint: string; name: string; secret_key: string; type: 'S3_COMPATIBLE'; base_url_for_canonical_header?: string; include_canonical_header?: boolean; prefix?: string; s3_force_path_style?: boolean; } | { access_key: string; bucket: string; name: string; secret_key: string; type: 'CLOUDINARY_BACKUP'; base_url_for_canonical_header?: string; include_canonical_header?: boolean; prefix?: string; } | { base_url: string; name: string; type: 'WEB_FOLDER'; base_url_for_canonical_header?: string; forward_host_header_to_origin?: boolean; include_canonical_header?: boolean; } | { name: string; type: 'WEB_PROXY'; base_url_for_canonical_header?: string; include_canonical_header?: boolean; } | { bucket: string; client_email: string; name: string; private_key: string; type: 'GCS'; base_url_for_canonical_header?: string; include_canonical_header?: boolean; prefix?: string; } | { account_name: string; container: string; name: string; sas_token: string; type: 'AZURE_BLOB'; base_url_for_canonical_header?: string; include_canonical_header?: boolean; prefix?: string; } | { base_url: string; client_id: string; client_secret: string; name: string; password: string; type: 'AKENEO_PIM'; username: string; base_url_for_canonical_header?: string; include_canonical_header?: boolean; };",
    ],
    response: 'object | object | object | object | object | object | object | object',
    perLanguage: {
      go: {
        method: 'client.Accounts.Origins.New',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/imagekit-developer/imagekit-go/v2"\n\t"github.com/imagekit-developer/imagekit-go/v2/option"\n)\n\nfunc main() {\n\tclient := imagekit.NewClient(\n\t\toption.WithPrivateKey("My Private Key"),\n\t\toption.WithPassword("My Password"),\n\t)\n\toriginResponse, err := client.Accounts.Origins.New(context.TODO(), imagekit.AccountOriginNewParams{\n\t\tOriginRequest: imagekit.OriginRequestUnionParam{\n\t\t\tOfS3: &imagekit.OriginRequestS3Param{\n\t\t\t\tAccessKey: "AKIATEST123",\n\t\t\t\tBucket:    "test-bucket",\n\t\t\t\tName:      "My S3 Origin",\n\t\t\t\tSecretKey: "secrettest123",\n\t\t\t},\n\t\t},\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", originResponse)\n}\n',
      },
      java: {
        method: 'accounts().origins().create',
        example:
          'package io.imagekit.example;\n\nimport io.imagekit.client.ImageKitClient;\nimport io.imagekit.client.okhttp.ImageKitOkHttpClient;\nimport io.imagekit.models.accounts.origins.OriginRequest;\nimport io.imagekit.models.accounts.origins.OriginResponse;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        ImageKitClient client = ImageKitOkHttpClient.fromEnv();\n\n        OriginRequest.S3 params = OriginRequest.S3.builder()\n            .accessKey("AKIATEST123")\n            .bucket("test-bucket")\n            .name("My S3 Origin")\n            .secretKey("secrettest123")\n            .build();\n        OriginResponse originResponse = client.accounts().origins().create(params);\n    }\n}',
      },
      php: {
        method: 'accounts->origins->create',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(privateKey: 'My Private Key', password: 'My Password');\n\n$originResponse = $client->accounts->origins->create(\n  accessKey: 'AKIAIOSFODNN7EXAMPLE',\n  bucket: 'gcs-media',\n  name: 'US S3 Storage',\n  secretKey: 'wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY',\n  type: 'AKENEO_PIM',\n  baseURLForCanonicalHeader: 'https://cdn.example.com',\n  includeCanonicalHeader: false,\n  prefix: 'uploads',\n  endpoint: 'https://s3.eu-central-1.wasabisys.com',\n  s3ForcePathStyle: true,\n  baseURL: 'https://akeneo.company.com',\n  forwardHostHeaderToOrigin: false,\n  clientEmail: 'service-account@project.iam.gserviceaccount.com',\n  privateKey: '-----BEGIN PRIVATE KEY-----\\\\nMIIEv...',\n  accountName: 'account123',\n  container: 'images',\n  sasToken: '?sv=2023-01-03&sr=c&sig=abc123',\n  clientID: 'akeneo-client-id',\n  clientSecret: 'akeneo-client-secret',\n  password: 'strongpassword123',\n  username: 'integration-user',\n);\n\nvar_dump($originResponse);",
      },
      python: {
        method: 'accounts.origins.create',
        example:
          'import os\nfrom imagekitio import ImageKit\n\nclient = ImageKit(\n    private_key=os.environ.get("IMAGEKIT_PRIVATE_KEY"),  # This is the default and can be omitted\n    password=os.environ.get("OPTIONAL_IMAGEKIT_IGNORES_THIS"),  # This is the default and can be omitted\n)\norigin_response = client.accounts.origins.create(\n    access_key="AKIAIOSFODNN7EXAMPLE",\n    bucket="product-images",\n    name="US S3 Storage",\n    secret_key="wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY",\n    type="S3",\n)\nprint(origin_response)',
      },
      ruby: {
        method: 'accounts.origins.create',
        example:
          'require "imagekitio"\n\nimage_kit = Imagekitio::Client.new(private_key: "My Private Key", password: "My Password")\n\norigin_response = image_kit.accounts.origins.create(\n  origin_request: {access_key: "AKIATEST123", bucket: "test-bucket", name: "My S3 Origin", secret_key: "secrettest123", type: :S3}\n)\n\nputs(origin_response)',
      },
      typescript: {
        method: 'client.accounts.origins.create',
        example:
          "import ImageKit from '@imagekit/nodejs';\n\nconst client = new ImageKit({\n  privateKey: process.env['IMAGEKIT_PRIVATE_KEY'], // This is the default and can be omitted\n  password: process.env['OPTIONAL_IMAGEKIT_IGNORES_THIS'], // This is the default and can be omitted\n});\n\nconst originResponse = await client.accounts.origins.create({\n  access_key: 'AKIAIOSFODNN7EXAMPLE',\n  bucket: 'product-images',\n  name: 'US S3 Storage',\n  secret_key: 'wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY',\n  type: 'S3',\n});\n\nconsole.log(originResponse);",
      },
      http: {
        example:
          'curl https://api.imagekit.io/v2/accounts/origins \\\n    -H \'Content-Type: application/json\' \\\n    -u "$IMAGEKIT_PRIVATE_KEY:OPTIONAL_IMAGEKIT_IGNORES_THIS" \\\n    -d \'{\n          "access_key": "AKIAIOSFODNN7EXAMPLE",\n          "bucket": "product-images",\n          "name": "US S3 Storage",\n          "secret_key": "wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY",\n          "type": "S3",\n          "base_url_for_canonical_header": "https://cdn.example.com",\n          "include_canonical_header": false,\n          "prefix": "raw-assets"\n        }\'',
      },
      csharp: {
        method: 'Accounts.Origins.Create',
        example:
          'OriginCreateParams parameters = new()\n{\n    OriginRequest = new S3()\n    {\n        AccessKey = "AKIATEST123",\n        Bucket = "test-bucket",\n        Name = "My S3 Origin",\n        SecretKey = "secrettest123",\n        BaseUrlForCanonicalHeader = "https://cdn.example.com",\n        IncludeCanonicalHeader = false,\n        Prefix = "images",\n    },\n};\n\nvar originResponse = await client.Accounts.Origins.Create(parameters);\n\nConsole.WriteLine(originResponse);',
      },
    },
  },
  {
    name: 'get',
    endpoint: '/v2/accounts/origins/{id}',
    httpMethod: 'get',
    summary: 'Get origin',
    description: '**Note:** This API is currently in beta.  \nRetrieves the origin identified by `id`.\n',
    stainlessPath: '(resource) accounts.origins > (method) get',
    qualified: 'client.accounts.origins.get',
    params: ['id: string;'],
    response: 'object | object | object | object | object | object | object | object',
    markdown:
      "## get\n\n`client.accounts.origins.get(id: string): { id: string; bucket: string; include_canonical_header: boolean; name: string; prefix: string; type: 'S3'; base_url_for_canonical_header?: string; } | { id: string; bucket: string; endpoint: string; include_canonical_header: boolean; name: string; prefix: string; s3_force_path_style: boolean; type: 'S3_COMPATIBLE'; base_url_for_canonical_header?: string; } | { id: string; bucket: string; include_canonical_header: boolean; name: string; prefix: string; type: 'CLOUDINARY_BACKUP'; base_url_for_canonical_header?: string; } | { id: string; base_url: string; forward_host_header_to_origin: boolean; include_canonical_header: boolean; name: string; type: 'WEB_FOLDER'; base_url_for_canonical_header?: string; } | { id: string; include_canonical_header: boolean; name: string; type: 'WEB_PROXY'; base_url_for_canonical_header?: string; } | { id: string; bucket: string; client_email: string; include_canonical_header: boolean; name: string; prefix: string; type: 'GCS'; base_url_for_canonical_header?: string; } | { id: string; account_name: string; container: string; include_canonical_header: boolean; name: string; prefix: string; type: 'AZURE_BLOB'; base_url_for_canonical_header?: string; } | { id: string; base_url: string; include_canonical_header: boolean; name: string; type: 'AKENEO_PIM'; base_url_for_canonical_header?: string; }`\n\n**get** `/v2/accounts/origins/{id}`\n\n**Note:** This API is currently in beta.  \nRetrieves the origin identified by `id`.\n\n\n### Parameters\n\n- `id: string`\n  Unique identifier for the origin. This is generated by ImageKit when you create a new origin.\n\n### Returns\n\n- `{ id: string; bucket: string; include_canonical_header: boolean; name: string; prefix: string; type: 'S3'; base_url_for_canonical_header?: string; } | { id: string; bucket: string; endpoint: string; include_canonical_header: boolean; name: string; prefix: string; s3_force_path_style: boolean; type: 'S3_COMPATIBLE'; base_url_for_canonical_header?: string; } | { id: string; bucket: string; include_canonical_header: boolean; name: string; prefix: string; type: 'CLOUDINARY_BACKUP'; base_url_for_canonical_header?: string; } | { id: string; base_url: string; forward_host_header_to_origin: boolean; include_canonical_header: boolean; name: string; type: 'WEB_FOLDER'; base_url_for_canonical_header?: string; } | { id: string; include_canonical_header: boolean; name: string; type: 'WEB_PROXY'; base_url_for_canonical_header?: string; } | { id: string; bucket: string; client_email: string; include_canonical_header: boolean; name: string; prefix: string; type: 'GCS'; base_url_for_canonical_header?: string; } | { id: string; account_name: string; container: string; include_canonical_header: boolean; name: string; prefix: string; type: 'AZURE_BLOB'; base_url_for_canonical_header?: string; } | { id: string; base_url: string; include_canonical_header: boolean; name: string; type: 'AKENEO_PIM'; base_url_for_canonical_header?: string; }`\n  Origin object as returned by the API (sensitive fields removed).\n\n### Example\n\n```typescript\nimport ImageKit from '@imagekit/nodejs';\n\nconst client = new ImageKit();\n\nconst originResponse = await client.accounts.origins.get('id');\n\nconsole.log(originResponse);\n```",
    perLanguage: {
      go: {
        method: 'client.Accounts.Origins.Get',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/imagekit-developer/imagekit-go/v2"\n\t"github.com/imagekit-developer/imagekit-go/v2/option"\n)\n\nfunc main() {\n\tclient := imagekit.NewClient(\n\t\toption.WithPrivateKey("My Private Key"),\n\t\toption.WithPassword("My Password"),\n\t)\n\toriginResponse, err := client.Accounts.Origins.Get(context.TODO(), "id")\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", originResponse)\n}\n',
      },
      java: {
        method: 'accounts().origins().get',
        example:
          'package io.imagekit.example;\n\nimport io.imagekit.client.ImageKitClient;\nimport io.imagekit.client.okhttp.ImageKitOkHttpClient;\nimport io.imagekit.models.accounts.origins.OriginGetParams;\nimport io.imagekit.models.accounts.origins.OriginResponse;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        ImageKitClient client = ImageKitOkHttpClient.fromEnv();\n\n        OriginResponse originResponse = client.accounts().origins().get("id");\n    }\n}',
      },
      php: {
        method: 'accounts->origins->get',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(privateKey: 'My Private Key', password: 'My Password');\n\n$originResponse = $client->accounts->origins->get('id');\n\nvar_dump($originResponse);",
      },
      python: {
        method: 'accounts.origins.get',
        example:
          'import os\nfrom imagekitio import ImageKit\n\nclient = ImageKit(\n    private_key=os.environ.get("IMAGEKIT_PRIVATE_KEY"),  # This is the default and can be omitted\n    password=os.environ.get("OPTIONAL_IMAGEKIT_IGNORES_THIS"),  # This is the default and can be omitted\n)\norigin_response = client.accounts.origins.get(\n    "id",\n)\nprint(origin_response)',
      },
      ruby: {
        method: 'accounts.origins.get',
        example:
          'require "imagekitio"\n\nimage_kit = Imagekitio::Client.new(private_key: "My Private Key", password: "My Password")\n\norigin_response = image_kit.accounts.origins.get("id")\n\nputs(origin_response)',
      },
      typescript: {
        method: 'client.accounts.origins.get',
        example:
          "import ImageKit from '@imagekit/nodejs';\n\nconst client = new ImageKit({\n  privateKey: process.env['IMAGEKIT_PRIVATE_KEY'], // This is the default and can be omitted\n  password: process.env['OPTIONAL_IMAGEKIT_IGNORES_THIS'], // This is the default and can be omitted\n});\n\nconst originResponse = await client.accounts.origins.get('id');\n\nconsole.log(originResponse);",
      },
      http: {
        example:
          'curl https://api.imagekit.io/v2/accounts/origins/$ID \\\n    -u "$IMAGEKIT_PRIVATE_KEY:OPTIONAL_IMAGEKIT_IGNORES_THIS"',
      },
      csharp: {
        method: 'Accounts.Origins.Get',
        example:
          'OriginGetParams parameters = new() { ID = "id" };\n\nvar originResponse = await client.Accounts.Origins.Get(parameters);\n\nConsole.WriteLine(originResponse);',
      },
    },
  },
  {
    name: 'update',
    endpoint: '/v2/accounts/origins/{id}',
    httpMethod: 'patch',
    summary: 'Update origin',
    description:
      '**Note:** This API is currently in beta.  \nUpdates the origin identified by `id` and returns the updated origin object.\n',
    stainlessPath: '(resource) accounts.origins > (method) update',
    qualified: 'client.accounts.origins.update',
    params: [
      'id: string;',
      "OriginRequest: { access_key: string; bucket: string; name: string; secret_key: string; type: 'S3'; base_url_for_canonical_header?: string; include_canonical_header?: boolean; prefix?: string; } | { access_key: string; bucket: string; endpoint: string; name: string; secret_key: string; type: 'S3_COMPATIBLE'; base_url_for_canonical_header?: string; include_canonical_header?: boolean; prefix?: string; s3_force_path_style?: boolean; } | { access_key: string; bucket: string; name: string; secret_key: string; type: 'CLOUDINARY_BACKUP'; base_url_for_canonical_header?: string; include_canonical_header?: boolean; prefix?: string; } | { base_url: string; name: string; type: 'WEB_FOLDER'; base_url_for_canonical_header?: string; forward_host_header_to_origin?: boolean; include_canonical_header?: boolean; } | { name: string; type: 'WEB_PROXY'; base_url_for_canonical_header?: string; include_canonical_header?: boolean; } | { bucket: string; client_email: string; name: string; private_key: string; type: 'GCS'; base_url_for_canonical_header?: string; include_canonical_header?: boolean; prefix?: string; } | { account_name: string; container: string; name: string; sas_token: string; type: 'AZURE_BLOB'; base_url_for_canonical_header?: string; include_canonical_header?: boolean; prefix?: string; } | { base_url: string; client_id: string; client_secret: string; name: string; password: string; type: 'AKENEO_PIM'; username: string; base_url_for_canonical_header?: string; include_canonical_header?: boolean; };",
    ],
    response: 'object | object | object | object | object | object | object | object',
    perLanguage: {
      go: {
        method: 'client.Accounts.Origins.Update',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/imagekit-developer/imagekit-go/v2"\n\t"github.com/imagekit-developer/imagekit-go/v2/option"\n)\n\nfunc main() {\n\tclient := imagekit.NewClient(\n\t\toption.WithPrivateKey("My Private Key"),\n\t\toption.WithPassword("My Password"),\n\t)\n\toriginResponse, err := client.Accounts.Origins.Update(\n\t\tcontext.TODO(),\n\t\t"id",\n\t\timagekit.AccountOriginUpdateParams{\n\t\t\tOriginRequest: imagekit.OriginRequestUnionParam{\n\t\t\t\tOfS3: &imagekit.OriginRequestS3Param{\n\t\t\t\t\tAccessKey: "AKIATEST123",\n\t\t\t\t\tBucket:    "test-bucket",\n\t\t\t\t\tName:      "My S3 Origin",\n\t\t\t\t\tSecretKey: "secrettest123",\n\t\t\t\t},\n\t\t\t},\n\t\t},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", originResponse)\n}\n',
      },
      java: {
        method: 'accounts().origins().update',
        example:
          'package io.imagekit.example;\n\nimport io.imagekit.client.ImageKitClient;\nimport io.imagekit.client.okhttp.ImageKitOkHttpClient;\nimport io.imagekit.models.accounts.origins.OriginRequest;\nimport io.imagekit.models.accounts.origins.OriginResponse;\nimport io.imagekit.models.accounts.origins.OriginUpdateParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        ImageKitClient client = ImageKitOkHttpClient.fromEnv();\n\n        OriginUpdateParams params = OriginUpdateParams.builder()\n            .id("id")\n            .originRequest(OriginRequest.S3.builder()\n                .accessKey("AKIATEST123")\n                .bucket("test-bucket")\n                .name("My S3 Origin")\n                .secretKey("secrettest123")\n                .build())\n            .build();\n        OriginResponse originResponse = client.accounts().origins().update(params);\n    }\n}',
      },
      php: {
        method: 'accounts->origins->update',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(privateKey: 'My Private Key', password: 'My Password');\n\n$originResponse = $client->accounts->origins->update(\n  'id',\n  accessKey: 'AKIAIOSFODNN7EXAMPLE',\n  bucket: 'gcs-media',\n  name: 'US S3 Storage',\n  secretKey: 'wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY',\n  type: 'AKENEO_PIM',\n  baseURLForCanonicalHeader: 'https://cdn.example.com',\n  includeCanonicalHeader: false,\n  prefix: 'uploads',\n  endpoint: 'https://s3.eu-central-1.wasabisys.com',\n  s3ForcePathStyle: true,\n  baseURL: 'https://akeneo.company.com',\n  forwardHostHeaderToOrigin: false,\n  clientEmail: 'service-account@project.iam.gserviceaccount.com',\n  privateKey: '-----BEGIN PRIVATE KEY-----\\\\nMIIEv...',\n  accountName: 'account123',\n  container: 'images',\n  sasToken: '?sv=2023-01-03&sr=c&sig=abc123',\n  clientID: 'akeneo-client-id',\n  clientSecret: 'akeneo-client-secret',\n  password: 'strongpassword123',\n  username: 'integration-user',\n);\n\nvar_dump($originResponse);",
      },
      python: {
        method: 'accounts.origins.update',
        example:
          'import os\nfrom imagekitio import ImageKit\n\nclient = ImageKit(\n    private_key=os.environ.get("IMAGEKIT_PRIVATE_KEY"),  # This is the default and can be omitted\n    password=os.environ.get("OPTIONAL_IMAGEKIT_IGNORES_THIS"),  # This is the default and can be omitted\n)\norigin_response = client.accounts.origins.update(\n    id="id",\n    access_key="AKIAIOSFODNN7EXAMPLE",\n    bucket="product-images",\n    name="US S3 Storage",\n    secret_key="wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY",\n    type="S3",\n)\nprint(origin_response)',
      },
      ruby: {
        method: 'accounts.origins.update',
        example:
          'require "imagekitio"\n\nimage_kit = Imagekitio::Client.new(private_key: "My Private Key", password: "My Password")\n\norigin_response = image_kit.accounts.origins.update(\n  "id",\n  origin_request: {access_key: "AKIATEST123", bucket: "test-bucket", name: "My S3 Origin", secret_key: "secrettest123", type: :S3}\n)\n\nputs(origin_response)',
      },
      typescript: {
        method: 'client.accounts.origins.update',
        example:
          "import ImageKit from '@imagekit/nodejs';\n\nconst client = new ImageKit({\n  privateKey: process.env['IMAGEKIT_PRIVATE_KEY'], // This is the default and can be omitted\n  password: process.env['OPTIONAL_IMAGEKIT_IGNORES_THIS'], // This is the default and can be omitted\n});\n\nconst originResponse = await client.accounts.origins.update('id', {\n  access_key: 'AKIAIOSFODNN7EXAMPLE',\n  bucket: 'product-images',\n  name: 'US S3 Storage',\n  secret_key: 'wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY',\n  type: 'S3',\n});\n\nconsole.log(originResponse);",
      },
      http: {
        example:
          'curl https://api.imagekit.io/v2/accounts/origins/$ID \\\n    -X PATCH \\\n    -H \'Content-Type: application/json\' \\\n    -u "$IMAGEKIT_PRIVATE_KEY:OPTIONAL_IMAGEKIT_IGNORES_THIS" \\\n    -d \'{\n          "access_key": "AKIAIOSFODNN7EXAMPLE",\n          "bucket": "product-images",\n          "name": "US S3 Storage",\n          "secret_key": "wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY",\n          "type": "S3",\n          "base_url_for_canonical_header": "https://cdn.example.com",\n          "include_canonical_header": false,\n          "prefix": "raw-assets"\n        }\'',
      },
      csharp: {
        method: 'Accounts.Origins.Update',
        example:
          'OriginUpdateParams parameters = new()\n{\n    ID = "id",\n    OriginRequest = new S3()\n    {\n        AccessKey = "AKIATEST123",\n        Bucket = "test-bucket",\n        Name = "My S3 Origin",\n        SecretKey = "secrettest123",\n        BaseUrlForCanonicalHeader = "https://cdn.example.com",\n        IncludeCanonicalHeader = false,\n        Prefix = "images",\n    },\n};\n\nvar originResponse = await client.Accounts.Origins.Update(parameters);\n\nConsole.WriteLine(originResponse);',
      },
    },
  },
  {
    name: 'delete',
    endpoint: '/v2/accounts/origins/{id}',
    httpMethod: 'delete',
    summary: 'Delete origin',
    description:
      '**Note:** This API is currently in beta.  \nPermanently removes the origin identified by `id`. If the origin is in use by any URL‑endpoints, the API will return an error.\n',
    stainlessPath: '(resource) accounts.origins > (method) delete',
    qualified: 'client.accounts.origins.delete',
    params: ['id: string;'],
    markdown:
      "## delete\n\n`client.accounts.origins.delete(id: string): void`\n\n**delete** `/v2/accounts/origins/{id}`\n\n**Note:** This API is currently in beta.  \nPermanently removes the origin identified by `id`. If the origin is in use by any URL‑endpoints, the API will return an error.\n\n\n### Parameters\n\n- `id: string`\n  Unique identifier for the origin. This is generated by ImageKit when you create a new origin.\n\n### Example\n\n```typescript\nimport ImageKit from '@imagekit/nodejs';\n\nconst client = new ImageKit();\n\nawait client.accounts.origins.delete('id')\n```",
    perLanguage: {
      go: {
        method: 'client.Accounts.Origins.Delete',
        example:
          'package main\n\nimport (\n\t"context"\n\n\t"github.com/imagekit-developer/imagekit-go/v2"\n\t"github.com/imagekit-developer/imagekit-go/v2/option"\n)\n\nfunc main() {\n\tclient := imagekit.NewClient(\n\t\toption.WithPrivateKey("My Private Key"),\n\t\toption.WithPassword("My Password"),\n\t)\n\terr := client.Accounts.Origins.Delete(context.TODO(), "id")\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n}\n',
      },
      java: {
        method: 'accounts().origins().delete',
        example:
          'package io.imagekit.example;\n\nimport io.imagekit.client.ImageKitClient;\nimport io.imagekit.client.okhttp.ImageKitOkHttpClient;\nimport io.imagekit.models.accounts.origins.OriginDeleteParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        ImageKitClient client = ImageKitOkHttpClient.fromEnv();\n\n        client.accounts().origins().delete("id");\n    }\n}',
      },
      php: {
        method: 'accounts->origins->delete',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(privateKey: 'My Private Key', password: 'My Password');\n\n$result = $client->accounts->origins->delete('id');\n\nvar_dump($result);",
      },
      python: {
        method: 'accounts.origins.delete',
        example:
          'import os\nfrom imagekitio import ImageKit\n\nclient = ImageKit(\n    private_key=os.environ.get("IMAGEKIT_PRIVATE_KEY"),  # This is the default and can be omitted\n    password=os.environ.get("OPTIONAL_IMAGEKIT_IGNORES_THIS"),  # This is the default and can be omitted\n)\nclient.accounts.origins.delete(\n    "id",\n)',
      },
      ruby: {
        method: 'accounts.origins.delete',
        example:
          'require "imagekitio"\n\nimage_kit = Imagekitio::Client.new(private_key: "My Private Key", password: "My Password")\n\nresult = image_kit.accounts.origins.delete("id")\n\nputs(result)',
      },
      typescript: {
        method: 'client.accounts.origins.delete',
        example:
          "import ImageKit from '@imagekit/nodejs';\n\nconst client = new ImageKit({\n  privateKey: process.env['IMAGEKIT_PRIVATE_KEY'], // This is the default and can be omitted\n  password: process.env['OPTIONAL_IMAGEKIT_IGNORES_THIS'], // This is the default and can be omitted\n});\n\nawait client.accounts.origins.delete('id');",
      },
      http: {
        example:
          'curl https://api.imagekit.io/v2/accounts/origins/$ID \\\n    -X DELETE \\\n    -u "$IMAGEKIT_PRIVATE_KEY:OPTIONAL_IMAGEKIT_IGNORES_THIS"',
      },
      csharp: {
        method: 'Accounts.Origins.Delete',
        example:
          'OriginDeleteParams parameters = new() { ID = "id" };\n\nawait client.Accounts.Origins.Delete(parameters);',
      },
    },
  },
  {
    name: 'list',
    endpoint: '/v2/accounts/url-endpoints',
    httpMethod: 'get',
    summary: 'List URL‑endpoints',
    description:
      '**Note:** This API is currently in beta.  \nReturns an array of all URL‑endpoints configured including the default URL-endpoint generated by ImageKit during account creation.\n',
    stainlessPath: '(resource) accounts.urlEndpoints > (method) list',
    qualified: 'client.accounts.urlEndpoints.list',
    response:
      "{ id: string; description: string; origins: string[]; url_prefix: string; url_rewriters?: { preserveAssetDeliveryTypes: boolean; type: 'CLOUDINARY'; } | { type: 'IMGIX'; } | { type: 'AKAMAI'; }; }[]",
    markdown:
      "## list\n\n`client.accounts.urlEndpoints.list(): object[]`\n\n**get** `/v2/accounts/url-endpoints`\n\n**Note:** This API is currently in beta.  \nReturns an array of all URL‑endpoints configured including the default URL-endpoint generated by ImageKit during account creation.\n\n\n### Returns\n\n- `{ id: string; description: string; origins: string[]; url_prefix: string; url_rewriters?: { preserveAssetDeliveryTypes: boolean; type: 'CLOUDINARY'; } | { type: 'IMGIX'; } | { type: 'AKAMAI'; }; }[]`\n\n### Example\n\n```typescript\nimport ImageKit from '@imagekit/nodejs';\n\nconst client = new ImageKit();\n\nconst urlEndpointResponses = await client.accounts.urlEndpoints.list();\n\nconsole.log(urlEndpointResponses);\n```",
    perLanguage: {
      go: {
        method: 'client.Accounts.URLEndpoints.List',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/imagekit-developer/imagekit-go/v2"\n\t"github.com/imagekit-developer/imagekit-go/v2/option"\n)\n\nfunc main() {\n\tclient := imagekit.NewClient(\n\t\toption.WithPrivateKey("My Private Key"),\n\t\toption.WithPassword("My Password"),\n\t)\n\turlEndpointResponses, err := client.Accounts.URLEndpoints.List(context.TODO())\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", urlEndpointResponses)\n}\n',
      },
      java: {
        method: 'accounts().urlEndpoints().list',
        example:
          'package io.imagekit.example;\n\nimport io.imagekit.client.ImageKitClient;\nimport io.imagekit.client.okhttp.ImageKitOkHttpClient;\nimport io.imagekit.models.accounts.urlendpoints.UrlEndpointListParams;\nimport io.imagekit.models.accounts.urlendpoints.UrlEndpointResponse;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        ImageKitClient client = ImageKitOkHttpClient.fromEnv();\n\n        List<UrlEndpointResponse> urlEndpointResponses = client.accounts().urlEndpoints().list();\n    }\n}',
      },
      php: {
        method: 'accounts->urlEndpoints->list',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(privateKey: 'My Private Key', password: 'My Password');\n\n$urlEndpointResponses = $client->accounts->urlEndpoints->list();\n\nvar_dump($urlEndpointResponses);",
      },
      python: {
        method: 'accounts.url_endpoints.list',
        example:
          'import os\nfrom imagekitio import ImageKit\n\nclient = ImageKit(\n    private_key=os.environ.get("IMAGEKIT_PRIVATE_KEY"),  # This is the default and can be omitted\n    password=os.environ.get("OPTIONAL_IMAGEKIT_IGNORES_THIS"),  # This is the default and can be omitted\n)\nurl_endpoint_responses = client.accounts.url_endpoints.list()\nprint(url_endpoint_responses)',
      },
      ruby: {
        method: 'accounts.url_endpoints.list',
        example:
          'require "imagekitio"\n\nimage_kit = Imagekitio::Client.new(private_key: "My Private Key", password: "My Password")\n\nurl_endpoint_responses = image_kit.accounts.url_endpoints.list\n\nputs(url_endpoint_responses)',
      },
      typescript: {
        method: 'client.accounts.urlEndpoints.list',
        example:
          "import ImageKit from '@imagekit/nodejs';\n\nconst client = new ImageKit({\n  privateKey: process.env['IMAGEKIT_PRIVATE_KEY'], // This is the default and can be omitted\n  password: process.env['OPTIONAL_IMAGEKIT_IGNORES_THIS'], // This is the default and can be omitted\n});\n\nconst urlEndpointResponses = await client.accounts.urlEndpoints.list();\n\nconsole.log(urlEndpointResponses);",
      },
      http: {
        example:
          'curl https://api.imagekit.io/v2/accounts/url-endpoints \\\n    -u "$IMAGEKIT_PRIVATE_KEY:OPTIONAL_IMAGEKIT_IGNORES_THIS"',
      },
      csharp: {
        method: 'Accounts.UrlEndpoints.List',
        example:
          'UrlEndpointListParams parameters = new();\n\nvar urlEndpointResponses = await client.Accounts.UrlEndpoints.List(parameters);\n\nConsole.WriteLine(urlEndpointResponses);',
      },
    },
  },
  {
    name: 'create',
    endpoint: '/v2/accounts/url-endpoints',
    httpMethod: 'post',
    summary: 'Create URL‑endpoint',
    description:
      '**Note:** This API is currently in beta.  \nCreates a new URL‑endpoint and returns the resulting object.\n',
    stainlessPath: '(resource) accounts.urlEndpoints > (method) create',
    qualified: 'client.accounts.urlEndpoints.create',
    params: [
      'description: string;',
      'origins?: string[];',
      'urlPrefix?: string;',
      "urlRewriter?: { type: 'CLOUDINARY'; preserveAssetDeliveryTypes?: boolean; } | { type: 'IMGIX'; } | { type: 'AKAMAI'; };",
    ],
    response:
      "{ id: string; description: string; origins: string[]; url_prefix: string; url_rewriters?: { preserveAssetDeliveryTypes: boolean; type: 'CLOUDINARY'; } | { type: 'IMGIX'; } | { type: 'AKAMAI'; }; }",
    markdown:
      "## create\n\n`client.accounts.urlEndpoints.create(description: string, origins?: string[], urlPrefix?: string, urlRewriter?: { type: 'CLOUDINARY'; preserveAssetDeliveryTypes?: boolean; } | { type: 'IMGIX'; } | { type: 'AKAMAI'; }): { id: string; description: string; origins: string[]; url_prefix: string; url_rewriters?: object | object | object; }`\n\n**post** `/v2/accounts/url-endpoints`\n\n**Note:** This API is currently in beta.  \nCreates a new URL‑endpoint and returns the resulting object.\n\n\n### Parameters\n\n- `description: string`\n  Description of the URL endpoint.\n\n- `origins?: string[]`\n  Ordered list of origin IDs to try when the file isn’t in the Media Library; ImageKit checks them in the sequence provided. Origin must be created before it can be used in a URL endpoint.\n\n- `urlPrefix?: string`\n  Path segment appended to your base URL to form the endpoint (letters, digits, and hyphens only — or empty for the default endpoint).\n\n- `urlRewriter?: { type: 'CLOUDINARY'; preserveAssetDeliveryTypes?: boolean; } | { type: 'IMGIX'; } | { type: 'AKAMAI'; }`\n  Configuration for third-party URL rewriting.\n\n### Returns\n\n- `{ id: string; description: string; origins: string[]; url_prefix: string; url_rewriters?: { preserveAssetDeliveryTypes: boolean; type: 'CLOUDINARY'; } | { type: 'IMGIX'; } | { type: 'AKAMAI'; }; }`\n  URL‑endpoint object as returned by the API.\n\n  - `id: string`\n  - `description: string`\n  - `origins: string[]`\n  - `url_prefix: string`\n  - `url_rewriters?: { preserveAssetDeliveryTypes: boolean; type: 'CLOUDINARY'; } | { type: 'IMGIX'; } | { type: 'AKAMAI'; }`\n\n### Example\n\n```typescript\nimport ImageKit from '@imagekit/nodejs';\n\nconst client = new ImageKit();\n\nconst urlEndpointResponse = await client.accounts.urlEndpoints.create({ description: 'My custom URL endpoint' });\n\nconsole.log(urlEndpointResponse);\n```",
    perLanguage: {
      go: {
        method: 'client.Accounts.URLEndpoints.New',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/imagekit-developer/imagekit-go/v2"\n\t"github.com/imagekit-developer/imagekit-go/v2/option"\n)\n\nfunc main() {\n\tclient := imagekit.NewClient(\n\t\toption.WithPrivateKey("My Private Key"),\n\t\toption.WithPassword("My Password"),\n\t)\n\turlEndpointResponse, err := client.Accounts.URLEndpoints.New(context.TODO(), imagekit.AccountURLEndpointNewParams{\n\t\tURLEndpointRequest: imagekit.URLEndpointRequestParam{\n\t\t\tDescription: "My custom URL endpoint",\n\t\t},\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", urlEndpointResponse.ID)\n}\n',
      },
      java: {
        method: 'accounts().urlEndpoints().create',
        example:
          'package io.imagekit.example;\n\nimport io.imagekit.client.ImageKitClient;\nimport io.imagekit.client.okhttp.ImageKitOkHttpClient;\nimport io.imagekit.models.accounts.urlendpoints.UrlEndpointRequest;\nimport io.imagekit.models.accounts.urlendpoints.UrlEndpointResponse;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        ImageKitClient client = ImageKitOkHttpClient.fromEnv();\n\n        UrlEndpointRequest params = UrlEndpointRequest.builder()\n            .description("My custom URL endpoint")\n            .build();\n        UrlEndpointResponse urlEndpointResponse = client.accounts().urlEndpoints().create(params);\n    }\n}',
      },
      php: {
        method: 'accounts->urlEndpoints->create',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(privateKey: 'My Private Key', password: 'My Password');\n\n$urlEndpointResponse = $client->accounts->urlEndpoints->create(\n  description: 'My custom URL endpoint',\n  origins: ['origin-id-1'],\n  urlPrefix: 'product-images',\n  urlRewriter: ['type' => 'CLOUDINARY', 'preserveAssetDeliveryTypes' => true],\n);\n\nvar_dump($urlEndpointResponse);",
      },
      python: {
        method: 'accounts.url_endpoints.create',
        example:
          'import os\nfrom imagekitio import ImageKit\n\nclient = ImageKit(\n    private_key=os.environ.get("IMAGEKIT_PRIVATE_KEY"),  # This is the default and can be omitted\n    password=os.environ.get("OPTIONAL_IMAGEKIT_IGNORES_THIS"),  # This is the default and can be omitted\n)\nurl_endpoint_response = client.accounts.url_endpoints.create(\n    description="My custom URL endpoint",\n)\nprint(url_endpoint_response.id)',
      },
      ruby: {
        method: 'accounts.url_endpoints.create',
        example:
          'require "imagekitio"\n\nimage_kit = Imagekitio::Client.new(private_key: "My Private Key", password: "My Password")\n\nurl_endpoint_response = image_kit.accounts.url_endpoints.create(description: "My custom URL endpoint")\n\nputs(url_endpoint_response)',
      },
      typescript: {
        method: 'client.accounts.urlEndpoints.create',
        example:
          "import ImageKit from '@imagekit/nodejs';\n\nconst client = new ImageKit({\n  privateKey: process.env['IMAGEKIT_PRIVATE_KEY'], // This is the default and can be omitted\n  password: process.env['OPTIONAL_IMAGEKIT_IGNORES_THIS'], // This is the default and can be omitted\n});\n\nconst urlEndpointResponse = await client.accounts.urlEndpoints.create({\n  description: 'My custom URL endpoint',\n});\n\nconsole.log(urlEndpointResponse.id);",
      },
      http: {
        example:
          'curl https://api.imagekit.io/v2/accounts/url-endpoints \\\n    -H \'Content-Type: application/json\' \\\n    -u "$IMAGEKIT_PRIVATE_KEY:OPTIONAL_IMAGEKIT_IGNORES_THIS" \\\n    -d \'{\n          "description": "My custom URL endpoint",\n          "origins": [\n            "origin-id-1"\n          ],\n          "urlPrefix": "product-images"\n        }\'',
      },
      csharp: {
        method: 'Accounts.UrlEndpoints.Create',
        example:
          'UrlEndpointCreateParams parameters = new()\n{\n    Description = "My custom URL endpoint"\n};\n\nvar urlEndpointResponse = await client.Accounts.UrlEndpoints.Create(parameters);\n\nConsole.WriteLine(urlEndpointResponse);',
      },
    },
  },
  {
    name: 'get',
    endpoint: '/v2/accounts/url-endpoints/{id}',
    httpMethod: 'get',
    summary: 'Get URL‑endpoint',
    description:
      '**Note:** This API is currently in beta.  \nRetrieves the URL‑endpoint identified by `id`.\n',
    stainlessPath: '(resource) accounts.urlEndpoints > (method) get',
    qualified: 'client.accounts.urlEndpoints.get',
    params: ['id: string;'],
    response:
      "{ id: string; description: string; origins: string[]; url_prefix: string; url_rewriters?: { preserveAssetDeliveryTypes: boolean; type: 'CLOUDINARY'; } | { type: 'IMGIX'; } | { type: 'AKAMAI'; }; }",
    markdown:
      "## get\n\n`client.accounts.urlEndpoints.get(id: string): { id: string; description: string; origins: string[]; url_prefix: string; url_rewriters?: object | object | object; }`\n\n**get** `/v2/accounts/url-endpoints/{id}`\n\n**Note:** This API is currently in beta.  \nRetrieves the URL‑endpoint identified by `id`.\n\n\n### Parameters\n\n- `id: string`\n  Unique identifier for the URL-endpoint. This is generated by ImageKit when you create a new URL-endpoint. For the default URL-endpoint, this is always `default`.\n\n### Returns\n\n- `{ id: string; description: string; origins: string[]; url_prefix: string; url_rewriters?: { preserveAssetDeliveryTypes: boolean; type: 'CLOUDINARY'; } | { type: 'IMGIX'; } | { type: 'AKAMAI'; }; }`\n  URL‑endpoint object as returned by the API.\n\n  - `id: string`\n  - `description: string`\n  - `origins: string[]`\n  - `url_prefix: string`\n  - `url_rewriters?: { preserveAssetDeliveryTypes: boolean; type: 'CLOUDINARY'; } | { type: 'IMGIX'; } | { type: 'AKAMAI'; }`\n\n### Example\n\n```typescript\nimport ImageKit from '@imagekit/nodejs';\n\nconst client = new ImageKit();\n\nconst urlEndpointResponse = await client.accounts.urlEndpoints.get('id');\n\nconsole.log(urlEndpointResponse);\n```",
    perLanguage: {
      go: {
        method: 'client.Accounts.URLEndpoints.Get',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/imagekit-developer/imagekit-go/v2"\n\t"github.com/imagekit-developer/imagekit-go/v2/option"\n)\n\nfunc main() {\n\tclient := imagekit.NewClient(\n\t\toption.WithPrivateKey("My Private Key"),\n\t\toption.WithPassword("My Password"),\n\t)\n\turlEndpointResponse, err := client.Accounts.URLEndpoints.Get(context.TODO(), "id")\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", urlEndpointResponse.ID)\n}\n',
      },
      java: {
        method: 'accounts().urlEndpoints().get',
        example:
          'package io.imagekit.example;\n\nimport io.imagekit.client.ImageKitClient;\nimport io.imagekit.client.okhttp.ImageKitOkHttpClient;\nimport io.imagekit.models.accounts.urlendpoints.UrlEndpointGetParams;\nimport io.imagekit.models.accounts.urlendpoints.UrlEndpointResponse;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        ImageKitClient client = ImageKitOkHttpClient.fromEnv();\n\n        UrlEndpointResponse urlEndpointResponse = client.accounts().urlEndpoints().get("id");\n    }\n}',
      },
      php: {
        method: 'accounts->urlEndpoints->get',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(privateKey: 'My Private Key', password: 'My Password');\n\n$urlEndpointResponse = $client->accounts->urlEndpoints->get('id');\n\nvar_dump($urlEndpointResponse);",
      },
      python: {
        method: 'accounts.url_endpoints.get',
        example:
          'import os\nfrom imagekitio import ImageKit\n\nclient = ImageKit(\n    private_key=os.environ.get("IMAGEKIT_PRIVATE_KEY"),  # This is the default and can be omitted\n    password=os.environ.get("OPTIONAL_IMAGEKIT_IGNORES_THIS"),  # This is the default and can be omitted\n)\nurl_endpoint_response = client.accounts.url_endpoints.get(\n    "id",\n)\nprint(url_endpoint_response.id)',
      },
      ruby: {
        method: 'accounts.url_endpoints.get',
        example:
          'require "imagekitio"\n\nimage_kit = Imagekitio::Client.new(private_key: "My Private Key", password: "My Password")\n\nurl_endpoint_response = image_kit.accounts.url_endpoints.get("id")\n\nputs(url_endpoint_response)',
      },
      typescript: {
        method: 'client.accounts.urlEndpoints.get',
        example:
          "import ImageKit from '@imagekit/nodejs';\n\nconst client = new ImageKit({\n  privateKey: process.env['IMAGEKIT_PRIVATE_KEY'], // This is the default and can be omitted\n  password: process.env['OPTIONAL_IMAGEKIT_IGNORES_THIS'], // This is the default and can be omitted\n});\n\nconst urlEndpointResponse = await client.accounts.urlEndpoints.get('id');\n\nconsole.log(urlEndpointResponse.id);",
      },
      http: {
        example:
          'curl https://api.imagekit.io/v2/accounts/url-endpoints/$ID \\\n    -u "$IMAGEKIT_PRIVATE_KEY:OPTIONAL_IMAGEKIT_IGNORES_THIS"',
      },
      csharp: {
        method: 'Accounts.UrlEndpoints.Get',
        example:
          'UrlEndpointGetParams parameters = new() { ID = "id" };\n\nvar urlEndpointResponse = await client.Accounts.UrlEndpoints.Get(parameters);\n\nConsole.WriteLine(urlEndpointResponse);',
      },
    },
  },
  {
    name: 'update',
    endpoint: '/v2/accounts/url-endpoints/{id}',
    httpMethod: 'put',
    summary: 'Update URL‑endpoint',
    description:
      '**Note:** This API is currently in beta.  \nUpdates the URL‑endpoint identified by `id` and returns the updated object.\n',
    stainlessPath: '(resource) accounts.urlEndpoints > (method) update',
    qualified: 'client.accounts.urlEndpoints.update',
    params: [
      'id: string;',
      'description: string;',
      'origins?: string[];',
      'urlPrefix?: string;',
      "urlRewriter?: { type: 'CLOUDINARY'; preserveAssetDeliveryTypes?: boolean; } | { type: 'IMGIX'; } | { type: 'AKAMAI'; };",
    ],
    response:
      "{ id: string; description: string; origins: string[]; url_prefix: string; url_rewriters?: { preserveAssetDeliveryTypes: boolean; type: 'CLOUDINARY'; } | { type: 'IMGIX'; } | { type: 'AKAMAI'; }; }",
    markdown:
      "## update\n\n`client.accounts.urlEndpoints.update(id: string, description: string, origins?: string[], urlPrefix?: string, urlRewriter?: { type: 'CLOUDINARY'; preserveAssetDeliveryTypes?: boolean; } | { type: 'IMGIX'; } | { type: 'AKAMAI'; }): { id: string; description: string; origins: string[]; url_prefix: string; url_rewriters?: object | object | object; }`\n\n**put** `/v2/accounts/url-endpoints/{id}`\n\n**Note:** This API is currently in beta.  \nUpdates the URL‑endpoint identified by `id` and returns the updated object.\n\n\n### Parameters\n\n- `id: string`\n  Unique identifier for the URL-endpoint. This is generated by ImageKit when you create a new URL-endpoint. For the default URL-endpoint, this is always `default`.\n\n- `description: string`\n  Description of the URL endpoint.\n\n- `origins?: string[]`\n  Ordered list of origin IDs to try when the file isn’t in the Media Library; ImageKit checks them in the sequence provided. Origin must be created before it can be used in a URL endpoint.\n\n- `urlPrefix?: string`\n  Path segment appended to your base URL to form the endpoint (letters, digits, and hyphens only — or empty for the default endpoint).\n\n- `urlRewriter?: { type: 'CLOUDINARY'; preserveAssetDeliveryTypes?: boolean; } | { type: 'IMGIX'; } | { type: 'AKAMAI'; }`\n  Configuration for third-party URL rewriting.\n\n### Returns\n\n- `{ id: string; description: string; origins: string[]; url_prefix: string; url_rewriters?: { preserveAssetDeliveryTypes: boolean; type: 'CLOUDINARY'; } | { type: 'IMGIX'; } | { type: 'AKAMAI'; }; }`\n  URL‑endpoint object as returned by the API.\n\n  - `id: string`\n  - `description: string`\n  - `origins: string[]`\n  - `url_prefix: string`\n  - `url_rewriters?: { preserveAssetDeliveryTypes: boolean; type: 'CLOUDINARY'; } | { type: 'IMGIX'; } | { type: 'AKAMAI'; }`\n\n### Example\n\n```typescript\nimport ImageKit from '@imagekit/nodejs';\n\nconst client = new ImageKit();\n\nconst urlEndpointResponse = await client.accounts.urlEndpoints.update('id', { description: 'My custom URL endpoint' });\n\nconsole.log(urlEndpointResponse);\n```",
    perLanguage: {
      go: {
        method: 'client.Accounts.URLEndpoints.Update',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/imagekit-developer/imagekit-go/v2"\n\t"github.com/imagekit-developer/imagekit-go/v2/option"\n)\n\nfunc main() {\n\tclient := imagekit.NewClient(\n\t\toption.WithPrivateKey("My Private Key"),\n\t\toption.WithPassword("My Password"),\n\t)\n\turlEndpointResponse, err := client.Accounts.URLEndpoints.Update(\n\t\tcontext.TODO(),\n\t\t"id",\n\t\timagekit.AccountURLEndpointUpdateParams{\n\t\t\tURLEndpointRequest: imagekit.URLEndpointRequestParam{\n\t\t\t\tDescription: "My custom URL endpoint",\n\t\t\t},\n\t\t},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", urlEndpointResponse.ID)\n}\n',
      },
      java: {
        method: 'accounts().urlEndpoints().update',
        example:
          'package io.imagekit.example;\n\nimport io.imagekit.client.ImageKitClient;\nimport io.imagekit.client.okhttp.ImageKitOkHttpClient;\nimport io.imagekit.models.accounts.urlendpoints.UrlEndpointRequest;\nimport io.imagekit.models.accounts.urlendpoints.UrlEndpointResponse;\nimport io.imagekit.models.accounts.urlendpoints.UrlEndpointUpdateParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        ImageKitClient client = ImageKitOkHttpClient.fromEnv();\n\n        UrlEndpointUpdateParams params = UrlEndpointUpdateParams.builder()\n            .id("id")\n            .urlEndpointRequest(UrlEndpointRequest.builder()\n                .description("My custom URL endpoint")\n                .build())\n            .build();\n        UrlEndpointResponse urlEndpointResponse = client.accounts().urlEndpoints().update(params);\n    }\n}',
      },
      php: {
        method: 'accounts->urlEndpoints->update',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(privateKey: 'My Private Key', password: 'My Password');\n\n$urlEndpointResponse = $client->accounts->urlEndpoints->update(\n  'id',\n  description: 'My custom URL endpoint',\n  origins: ['origin-id-1'],\n  urlPrefix: 'product-images',\n  urlRewriter: ['type' => 'CLOUDINARY', 'preserveAssetDeliveryTypes' => true],\n);\n\nvar_dump($urlEndpointResponse);",
      },
      python: {
        method: 'accounts.url_endpoints.update',
        example:
          'import os\nfrom imagekitio import ImageKit\n\nclient = ImageKit(\n    private_key=os.environ.get("IMAGEKIT_PRIVATE_KEY"),  # This is the default and can be omitted\n    password=os.environ.get("OPTIONAL_IMAGEKIT_IGNORES_THIS"),  # This is the default and can be omitted\n)\nurl_endpoint_response = client.accounts.url_endpoints.update(\n    id="id",\n    description="My custom URL endpoint",\n)\nprint(url_endpoint_response.id)',
      },
      ruby: {
        method: 'accounts.url_endpoints.update',
        example:
          'require "imagekitio"\n\nimage_kit = Imagekitio::Client.new(private_key: "My Private Key", password: "My Password")\n\nurl_endpoint_response = image_kit.accounts.url_endpoints.update("id", description: "My custom URL endpoint")\n\nputs(url_endpoint_response)',
      },
      typescript: {
        method: 'client.accounts.urlEndpoints.update',
        example:
          "import ImageKit from '@imagekit/nodejs';\n\nconst client = new ImageKit({\n  privateKey: process.env['IMAGEKIT_PRIVATE_KEY'], // This is the default and can be omitted\n  password: process.env['OPTIONAL_IMAGEKIT_IGNORES_THIS'], // This is the default and can be omitted\n});\n\nconst urlEndpointResponse = await client.accounts.urlEndpoints.update('id', {\n  description: 'My custom URL endpoint',\n});\n\nconsole.log(urlEndpointResponse.id);",
      },
      http: {
        example:
          'curl https://api.imagekit.io/v2/accounts/url-endpoints/$ID \\\n    -X PUT \\\n    -H \'Content-Type: application/json\' \\\n    -u "$IMAGEKIT_PRIVATE_KEY:OPTIONAL_IMAGEKIT_IGNORES_THIS" \\\n    -d \'{\n          "description": "My custom URL endpoint",\n          "origins": [\n            "origin-id-1"\n          ],\n          "urlPrefix": "product-images"\n        }\'',
      },
      csharp: {
        method: 'Accounts.UrlEndpoints.Update',
        example:
          'UrlEndpointUpdateParams parameters = new()\n{\n    ID = "id",\n    Description = "My custom URL endpoint",\n};\n\nvar urlEndpointResponse = await client.Accounts.UrlEndpoints.Update(parameters);\n\nConsole.WriteLine(urlEndpointResponse);',
      },
    },
  },
  {
    name: 'delete',
    endpoint: '/v2/accounts/url-endpoints/{id}',
    httpMethod: 'delete',
    summary: 'Delete URL‑endpoint',
    description:
      '**Note:** This API is currently in beta.  \nDeletes the URL‑endpoint identified by `id`. You cannot delete the default URL‑endpoint created by ImageKit during account creation.\n',
    stainlessPath: '(resource) accounts.urlEndpoints > (method) delete',
    qualified: 'client.accounts.urlEndpoints.delete',
    params: ['id: string;'],
    markdown:
      "## delete\n\n`client.accounts.urlEndpoints.delete(id: string): void`\n\n**delete** `/v2/accounts/url-endpoints/{id}`\n\n**Note:** This API is currently in beta.  \nDeletes the URL‑endpoint identified by `id`. You cannot delete the default URL‑endpoint created by ImageKit during account creation.\n\n\n### Parameters\n\n- `id: string`\n  Unique identifier for the URL-endpoint. This is generated by ImageKit when you create a new URL-endpoint. For the default URL-endpoint, this is always `default`.\n\n### Example\n\n```typescript\nimport ImageKit from '@imagekit/nodejs';\n\nconst client = new ImageKit();\n\nawait client.accounts.urlEndpoints.delete('id')\n```",
    perLanguage: {
      go: {
        method: 'client.Accounts.URLEndpoints.Delete',
        example:
          'package main\n\nimport (\n\t"context"\n\n\t"github.com/imagekit-developer/imagekit-go/v2"\n\t"github.com/imagekit-developer/imagekit-go/v2/option"\n)\n\nfunc main() {\n\tclient := imagekit.NewClient(\n\t\toption.WithPrivateKey("My Private Key"),\n\t\toption.WithPassword("My Password"),\n\t)\n\terr := client.Accounts.URLEndpoints.Delete(context.TODO(), "id")\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n}\n',
      },
      java: {
        method: 'accounts().urlEndpoints().delete',
        example:
          'package io.imagekit.example;\n\nimport io.imagekit.client.ImageKitClient;\nimport io.imagekit.client.okhttp.ImageKitOkHttpClient;\nimport io.imagekit.models.accounts.urlendpoints.UrlEndpointDeleteParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        ImageKitClient client = ImageKitOkHttpClient.fromEnv();\n\n        client.accounts().urlEndpoints().delete("id");\n    }\n}',
      },
      php: {
        method: 'accounts->urlEndpoints->delete',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(privateKey: 'My Private Key', password: 'My Password');\n\n$result = $client->accounts->urlEndpoints->delete('id');\n\nvar_dump($result);",
      },
      python: {
        method: 'accounts.url_endpoints.delete',
        example:
          'import os\nfrom imagekitio import ImageKit\n\nclient = ImageKit(\n    private_key=os.environ.get("IMAGEKIT_PRIVATE_KEY"),  # This is the default and can be omitted\n    password=os.environ.get("OPTIONAL_IMAGEKIT_IGNORES_THIS"),  # This is the default and can be omitted\n)\nclient.accounts.url_endpoints.delete(\n    "id",\n)',
      },
      ruby: {
        method: 'accounts.url_endpoints.delete',
        example:
          'require "imagekitio"\n\nimage_kit = Imagekitio::Client.new(private_key: "My Private Key", password: "My Password")\n\nresult = image_kit.accounts.url_endpoints.delete("id")\n\nputs(result)',
      },
      typescript: {
        method: 'client.accounts.urlEndpoints.delete',
        example:
          "import ImageKit from '@imagekit/nodejs';\n\nconst client = new ImageKit({\n  privateKey: process.env['IMAGEKIT_PRIVATE_KEY'], // This is the default and can be omitted\n  password: process.env['OPTIONAL_IMAGEKIT_IGNORES_THIS'], // This is the default and can be omitted\n});\n\nawait client.accounts.urlEndpoints.delete('id');",
      },
      http: {
        example:
          'curl https://api.imagekit.io/v2/accounts/url-endpoints/$ID \\\n    -X DELETE \\\n    -u "$IMAGEKIT_PRIVATE_KEY:OPTIONAL_IMAGEKIT_IGNORES_THIS"',
      },
      csharp: {
        method: 'Accounts.UrlEndpoints.Delete',
        example:
          'UrlEndpointDeleteParams parameters = new() { ID = "id" };\n\nawait client.Accounts.UrlEndpoints.Delete(parameters);',
      },
    },
  },
  {
    name: 'unwrap',
    endpoint: '',
    httpMethod: '',
    summary: '',
    description: '',
    stainlessPath: '(resource) webhooks > (method) unwrap',
    qualified: 'client.webhooks.unwrap',
    perLanguage: {
      go: {
        method: 'client.Webhooks.Unwrap',
        example:
          'package main\n\nimport (\n\t"context"\n\n\t"github.com/imagekit-developer/imagekit-go/v2"\n\t"github.com/imagekit-developer/imagekit-go/v2/option"\n)\n\nfunc main() {\n\tclient := imagekit.NewClient(\n\t\toption.WithPrivateKey("My Private Key"),\n\t\toption.WithPassword("My Password"),\n\t)\n\terr := client.Webhooks.Unwrap(context.TODO())\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n}\n',
      },
      java: {
        example:
          'package io.imagekit.example;\n\nimport io.imagekit.client.ImageKitClient;\nimport io.imagekit.client.okhttp.ImageKitOkHttpClient;\nimport io.imagekit.models.webhooks.WebhookUnwrapParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        ImageKitClient client = ImageKitOkHttpClient.fromEnv();\n\n        client.webhooks().unwrap();\n    }\n}',
      },
      php: {
        method: 'webhooks->unwrap',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(privateKey: 'My Private Key', password: 'My Password');\n\n$result = $client->webhooks->unwrap();\n\nvar_dump($result);",
      },
      python: {
        method: 'webhooks.unwrap',
        example:
          'import os\nfrom imagekitio import ImageKit\n\nclient = ImageKit(\n    private_key=os.environ.get("IMAGEKIT_PRIVATE_KEY"),  # This is the default and can be omitted\n    password=os.environ.get("OPTIONAL_IMAGEKIT_IGNORES_THIS"),  # This is the default and can be omitted\n)\nclient.webhooks.unwrap()',
      },
      ruby: {
        method: 'webhooks.unwrap',
        example:
          'require "imagekitio"\n\nimage_kit = Imagekitio::Client.new(private_key: "My Private Key", password: "My Password")\n\nresult = image_kit.webhooks.unwrap\n\nputs(result)',
      },
      typescript: {
        method: 'client.webhooks.unwrap',
        example:
          "import ImageKit from '@imagekit/nodejs';\n\nconst client = new ImageKit({\n  privateKey: process.env['IMAGEKIT_PRIVATE_KEY'], // This is the default and can be omitted\n  password: process.env['OPTIONAL_IMAGEKIT_IGNORES_THIS'], // This is the default and can be omitted\n});\n\nawait client.webhooks.unwrap();",
      },
      csharp: {
        example: 'WebhookUnwrapParams parameters = new();\n\nawait client.Webhooks.Unwrap(parameters);',
      },
    },
  },
  {
    name: 'unsafe_unwrap',
    endpoint: '',
    httpMethod: '',
    summary: '',
    description: '',
    stainlessPath: '(resource) webhooks > (method) unsafe_unwrap',
    qualified: 'client.webhooks.unsafeUnwrap',
    perLanguage: {
      go: {
        method: 'client.Webhooks.UnsafeUnwrap',
        example:
          'package main\n\nimport (\n\t"context"\n\n\t"github.com/imagekit-developer/imagekit-go/v2"\n\t"github.com/imagekit-developer/imagekit-go/v2/option"\n)\n\nfunc main() {\n\tclient := imagekit.NewClient(\n\t\toption.WithPrivateKey("My Private Key"),\n\t\toption.WithPassword("My Password"),\n\t)\n\terr := client.Webhooks.UnsafeUnwrap(context.TODO())\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n}\n',
      },
      java: {
        example:
          'package io.imagekit.example;\n\nimport io.imagekit.client.ImageKitClient;\nimport io.imagekit.client.okhttp.ImageKitOkHttpClient;\nimport io.imagekit.models.webhooks.WebhookUnsafeUnwrapParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        ImageKitClient client = ImageKitOkHttpClient.fromEnv();\n\n        client.webhooks().unsafeUnwrap();\n    }\n}',
      },
      php: {
        method: 'webhooks->unsafeUnwrap',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(privateKey: 'My Private Key', password: 'My Password');\n\n$result = $client->webhooks->unsafeUnwrap();\n\nvar_dump($result);",
      },
      python: {
        method: 'webhooks.unsafe_unwrap',
        example:
          'import os\nfrom imagekitio import ImageKit\n\nclient = ImageKit(\n    private_key=os.environ.get("IMAGEKIT_PRIVATE_KEY"),  # This is the default and can be omitted\n    password=os.environ.get("OPTIONAL_IMAGEKIT_IGNORES_THIS"),  # This is the default and can be omitted\n)\nclient.webhooks.unsafe_unwrap()',
      },
      ruby: {
        method: 'webhooks.unsafe_unwrap',
        example:
          'require "imagekitio"\n\nimage_kit = Imagekitio::Client.new(private_key: "My Private Key", password: "My Password")\n\nresult = image_kit.webhooks.unsafe_unwrap\n\nputs(result)',
      },
      typescript: {
        method: 'client.webhooks.unsafeUnwrap',
        example:
          "import ImageKit from '@imagekit/nodejs';\n\nconst client = new ImageKit({\n  privateKey: process.env['IMAGEKIT_PRIVATE_KEY'], // This is the default and can be omitted\n  password: process.env['OPTIONAL_IMAGEKIT_IGNORES_THIS'], // This is the default and can be omitted\n});\n\nawait client.webhooks.unsafeUnwrap();",
      },
      csharp: {
        example:
          'WebhookUnsafeUnwrapParams parameters = new();\n\nawait client.Webhooks.UnsafeUnwrap(parameters);',
      },
    },
  },
];

const EMBEDDED_READMES: { language: string; content: string }[] = [
  {
    language: 'go',
    content:
      '# Image Kit Go API Library\n\n<a href="https://pkg.go.dev/github.com/imagekit-developer/imagekit-go/v2"><img src="https://pkg.go.dev/badge/github.com/imagekit-developer/imagekit-go/v2.svg" alt="Go Reference"></a>\n\nThe Image Kit Go library provides convenient access to the [Image Kit REST API](https://imagekit.io/docs/api-reference)\nfrom applications written in Go.\n\n\n\n## MCP Server\n\nUse the Image Kit MCP Server to enable AI assistants to interact with this API, allowing them to explore endpoints, make test requests, and use documentation to help integrate this SDK into your application.\n\n[![Add to Cursor](https://cursor.com/deeplink/mcp-install-dark.svg)](https://cursor.com/en-US/install-mcp?name=%40imagekit%2Fapi-mcp&config=eyJjb21tYW5kIjoibnB4IiwiYXJncyI6WyIteSIsIkBpbWFnZWtpdC9hcGktbWNwIl0sImVudiI6eyJJTUFHRUtJVF9QUklWQVRFX0tFWSI6Ik15IFByaXZhdGUgS2V5IiwiT1BUSU9OQUxfSU1BR0VLSVRfSUdOT1JFU19USElTIjoiTXkgUGFzc3dvcmQiLCJJTUFHRUtJVF9XRUJIT09LX1NFQ1JFVCI6Ik15IFdlYmhvb2sgU2VjcmV0In19)\n[![Install in VS Code](https://img.shields.io/badge/_-Add_to_VS_Code-blue?style=for-the-badge&logo=data:image/svg%2bxml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHZpZXdCb3g9IjAgMCA0MCA0MCI+PHBhdGggZmlsbD0iI0VFRSIgZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNMzAuMjM1IDM5Ljg4NGEyLjQ5MSAyLjQ5MSAwIDAgMS0xLjc4MS0uNzNMMTIuNyAyNC43OGwtMy40NiAyLjYyNC0zLjQwNiAyLjU4MmExLjY2NSAxLjY2NSAwIDAgMS0xLjA4Mi4zMzggMS42NjQgMS42NjQgMCAwIDEtMS4wNDYtLjQzMWwtMi4yLTJhMS42NjYgMS42NjYgMCAwIDEgMC0yLjQ2M0w3LjQ1OCAyMCA0LjY3IDE3LjQ1MyAxLjUwNyAxNC41N2ExLjY2NSAxLjY2NSAwIDAgMSAwLTIuNDYzbDIuMi0yYTEuNjY1IDEuNjY1IDAgMCAxIDIuMTMtLjA5N2w2Ljg2MyA1LjIwOUwyOC40NTIuODQ0YTIuNDg4IDIuNDg4IDAgMCAxIDEuODQxLS43MjljLjM1MS4wMDkuNjk5LjA5MSAxLjAxOS4yNDVsOC4yMzYgMy45NjFhMi41IDIuNSAwIDAgMSAxLjQxNSAyLjI1M3YuMDk5LS4wNDVWMzMuMzd2LS4wNDUuMDk1YTIuNTAxIDIuNTAxIDAgMCAxLTEuNDE2IDIuMjU3bC04LjIzNSAzLjk2MWEyLjQ5MiAyLjQ5MiAwIDAgMS0xLjA3Ny4yNDZabS43MTYtMjguOTQ3LTExLjk0OCA5LjA2MiAxMS45NTIgOS4wNjUtLjAwNC0xOC4xMjdaIi8+PC9zdmc+)](https://vscode.stainless.com/mcp/%7B%22name%22%3A%22%40imagekit%2Fapi-mcp%22%2C%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22%40imagekit%2Fapi-mcp%22%5D%2C%22env%22%3A%7B%22IMAGEKIT_PRIVATE_KEY%22%3A%22My%20Private%20Key%22%2C%22OPTIONAL_IMAGEKIT_IGNORES_THIS%22%3A%22My%20Password%22%2C%22IMAGEKIT_WEBHOOK_SECRET%22%3A%22My%20Webhook%20Secret%22%7D%7D)\n\n> Note: You may need to set environment variables in your MCP client.\n\n## Installation\n\n<!-- x-release-please-start-version -->\n\n```go\nimport (\n\t"github.com/imagekit-developer/imagekit-go/v2" // imported as SDK_PackageName\n)\n```\n\n<!-- x-release-please-end -->\n\nOr to pin the version:\n\n<!-- x-release-please-start-version -->\n\n```sh\ngo get -u \'github.com/imagekit-developer/imagekit-go/v2@v2.6.1\'\n```\n\n<!-- x-release-please-end -->\n\n## Requirements\n\nThis library requires Go 1.22+.\n\n## Usage\n\nThe full API of this library can be found in [api.md](api.md).\n\n```go\npackage main\n\nimport (\n\t"bytes"\n\t"context"\n\t"fmt"\n\t"io"\n\n\t"github.com/imagekit-developer/imagekit-go/v2"\n\t"github.com/imagekit-developer/imagekit-go/v2/option"\n)\n\nfunc main() {\n\tclient := imagekit.NewClient(\n\t\toption.WithPrivateKey("My Private Key"), // defaults to os.LookupEnv("IMAGEKIT_PRIVATE_KEY")\n\t\toption.WithPassword("My Password"),      // defaults to os.LookupEnv("OPTIONAL_IMAGEKIT_IGNORES_THIS")\n\t)\n\tuploadResponse, err := client.Assets.Upload(context.TODO(), imagekit.AssetUploadParams{\n\t\tUploadRequest: imagekit.UploadRequestParam{\n\t\t\tFile:     io.Reader(bytes.NewBuffer([]byte("Example data"))),\n\t\t\tFileName: "file_name",\n\t\t},\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", uploadResponse)\n}\n\n```\n\n### Request fields\n\nAll request parameters are wrapped in a generic `Field` type,\nwhich we use to distinguish zero values from null or omitted fields.\n\nThis prevents accidentally sending a zero value if you forget a required parameter,\nand enables explicitly sending `null`, `false`, `\'\'`, or `0` on optional parameters.\nAny field not specified is not sent.\n\nTo construct fields with values, use the helpers `String()`, `Int()`, `Float()`, or most commonly, the generic `F[T]()`.\nTo send a null, use `Null[T]()`, and to send a nonconforming value, use `Raw[T](any)`. For example:\n\n```go\nparams := FooParams{\n\tName: SDK_PackageName.F("hello"),\n\n\t// Explicitly send `"description": null`\n\tDescription: SDK_PackageName.Null[string](),\n\n\tPoint: SDK_PackageName.F(SDK_PackageName.Point{\n\t\tX: SDK_PackageName.Int(0),\n\t\tY: SDK_PackageName.Int(1),\n\n\t\t// In cases where the API specifies a given type,\n\t\t// but you want to send something else, use `Raw`:\n\t\tZ: SDK_PackageName.Raw[int64](0.01), // sends a float\n\t}),\n}\n```\n\n### Response objects\n\nAll fields in response structs are value types (not pointers or wrappers).\n\nIf a given field is `null`, not present, or invalid, the corresponding field\nwill simply be its zero value.\n\nAll response structs also include a special `JSON` field, containing more detailed\ninformation about each property, which you can use like so:\n\n```go\nif res.Name == "" {\n\t// true if `"name"` is either not present or explicitly null\n\tres.JSON.Name.IsNull()\n\n\t// true if the `"name"` key was not present in the response JSON at all\n\tres.JSON.Name.IsMissing()\n\n\t// When the API returns data that cannot be coerced to the expected type:\n\tif res.JSON.Name.IsInvalid() {\n\t\traw := res.JSON.Name.Raw()\n\n\t\tlegacyName := struct{\n\t\t\tFirst string `json:"first"`\n\t\t\tLast  string `json:"last"`\n\t\t}{}\n\t\tjson.Unmarshal([]byte(raw), &legacyName)\n\t\tname = legacyName.First + " " + legacyName.Last\n\t}\n}\n```\n\nThese `.JSON` structs also include an `Extras` map containing\nany properties in the json response that were not specified\nin the struct. This can be useful for API features not yet\npresent in the SDK.\n\n```go\nbody := res.JSON.ExtraFields["my_unexpected_field"].Raw()\n```\n\n### RequestOptions\n\nThis library uses the functional options pattern. Functions defined in the\n`SDK_PackageOptionName` package return a `RequestOption`, which is a closure that mutates a\n`RequestConfig`. These options can be supplied to the client or at individual\nrequests. For example:\n\n```go\nclient := SDK_PackageName.SDK_ClientInitializerName(\n\t// Adds a header to every request made by the client\n\tSDK_PackageOptionName.WithHeader("X-Some-Header", "custom_header_info"),\n)\n\nclient.Assets.Upload(context.TODO(), ...,\n\t// Override the header\n\tSDK_PackageOptionName.WithHeader("X-Some-Header", "some_other_custom_header_info"),\n\t// Add an undocumented field to the request body, using sjson syntax\n\tSDK_PackageOptionName.WithJSONSet("some.json.path", map[string]string{"my": "object"}),\n)\n```\n\nSee the [full list of request options](https://pkg.go.dev/github.com/imagekit-developer/imagekit-go/v2/SDK_PackageOptionName).\n\n### Pagination\n\nThis library provides some conveniences for working with paginated list endpoints.\n\nYou can use `.ListAutoPaging()` methods to iterate through items across all pages:\n\n```go\niter := client.Assets.ListAutoPaging(context.TODO(), imagekit.AssetListParams{})\n// Automatically fetches more pages as needed.\nfor iter.Next() {\n\tassetListResponse := iter.Current()\n\tfmt.Printf("%+v\\n", assetListResponse)\n}\nif err := iter.Err(); err != nil {\n\tpanic(err.Error())\n}\n```\n\nOr you can use simple `.List()` methods to fetch a single page and receive a standard response object\nwith additional helper methods like `.GetNextPage()`, e.g.:\n\n```go\npage, err := client.Assets.List(context.TODO(), imagekit.AssetListParams{})\nfor page != nil {\n\tfor _, asset := range page.Items {\n\t\tfmt.Printf("%+v\\n", asset)\n\t}\n\tpage, err = page.GetNextPage()\n}\nif err != nil {\n\tpanic(err.Error())\n}\n```\n\n### Errors\n\nWhen the API returns a non-success status code, we return an error with type\n`*SDK_PackageName.Error`. This contains the `StatusCode`, `*http.Request`, and\n`*http.Response` values of the request, as well as the JSON of the error body\n(much like other response objects in the SDK).\n\nTo handle errors, we recommend that you use the `errors.As` pattern:\n\n```go\n_, err := client.Assets.Upload(context.TODO(), imagekit.AssetUploadParams{\n\tUploadRequest: imagekit.UploadRequestParam{\n\t\tFile:     io.Reader(bytes.NewBuffer([]byte("Example data"))),\n\t\tFileName: "file_name",\n\t},\n})\nif err != nil {\n\tvar apierr *imagekit.Error\n\tif errors.As(err, &apierr) {\n\t\tprintln(string(apierr.DumpRequest(true)))  // Prints the serialized HTTP request\n\t\tprintln(string(apierr.DumpResponse(true))) // Prints the serialized HTTP response\n\t}\n\tpanic(err.Error()) // GET "/v2/assets/upload": 400 Bad Request { ... }\n}\n```\n\nWhen other errors occur, they are returned unwrapped; for example,\nif HTTP transport fails, you might receive `*url.Error` wrapping `*net.OpError`.\n\n### Timeouts\n\nRequests do not time out by default; use context to configure a timeout for a request lifecycle.\n\nNote that if a request is [retried](#retries), the context timeout does not start over.\nTo set a per-retry timeout, use `SDK_PackageOptionName.WithRequestTimeout()`.\n\n```go\n// This sets the timeout for the request, including all the retries.\nctx, cancel := context.WithTimeout(context.Background(), 5*time.Minute)\ndefer cancel()\nclient.Assets.Upload(\n\tctx,\n\timagekit.AssetUploadParams{\n\t\tUploadRequest: imagekit.UploadRequestParam{\n\t\t\tFile:     io.Reader(bytes.NewBuffer([]byte("Example data"))),\n\t\t\tFileName: "file_name",\n\t\t},\n\t},\n\t// This sets the per-retry timeout\n\toption.WithRequestTimeout(20*time.Second),\n)\n```\n\n### File uploads\n\nRequest parameters that correspond to file uploads in multipart requests are typed as\n`param.Field[io.Reader]`. The contents of the `io.Reader` will by default be sent as a multipart form\npart with the file name of "anonymous_file" and content-type of "application/octet-stream".\n\nThe file name and content-type can be customized by implementing `Name() string` or `ContentType()\nstring` on the run-time type of `io.Reader`. Note that `os.File` implements `Name() string`, so a\nfile returned by `os.Open` will be sent with the file name on disk.\n\nWe also provide a helper `SDK_PackageName.FileParam(reader io.Reader, filename string, contentType string)`\nwhich can be used to wrap any `io.Reader` with the appropriate file name and content type.\n\n```go\n// A file from the file system\nfile, err := os.Open("/path/to/file")\nimagekit.AssetUploadParams{\n\tUploadRequest: imagekit.UploadRequestParam{\n\t\tFile:     io.Reader(bytes.NewBuffer([]byte("Example data"))),\n\t\tFileName: "file_name",\n\t},\n}\n\n// A file from a string\nimagekit.AssetUploadParams{\n\tUploadRequest: imagekit.UploadRequestParam{\n\t\tFile:     io.Reader(bytes.NewBuffer([]byte("Example data"))),\n\t\tFileName: "file_name",\n\t},\n}\n\n// With a custom filename and contentType\nimagekit.AssetUploadParams{\n\tUploadRequest: imagekit.UploadRequestParam{\n\t\tFile:     io.Reader(bytes.NewBuffer([]byte("Example data"))),\n\t\tFileName: "file_name",\n\t},\n}\n```\n\n### Retries\n\nCertain errors will be automatically retried 2 times by default, with a short exponential backoff.\nWe retry by default all connection errors, 408 Request Timeout, 409 Conflict, 429 Rate Limit,\nand >=500 Internal errors.\n\nYou can use the `WithMaxRetries` option to configure or disable this:\n\n```go\n// Configure the default for all requests:\nclient := imagekit.NewClient(\n\toption.WithMaxRetries(0), // default is 2\n)\n\n// Override per-request:\nclient.Assets.Upload(\n\tcontext.TODO(),\n\timagekit.AssetUploadParams{\n\t\tUploadRequest: imagekit.UploadRequestParam{\n\t\t\tFile:     io.Reader(bytes.NewBuffer([]byte("Example data"))),\n\t\t\tFileName: "file_name",\n\t\t},\n\t},\n\toption.WithMaxRetries(5),\n)\n```\n\n\n### Accessing raw response data (e.g. response headers)\n\nYou can access the raw HTTP response data by using the `option.WithResponseInto()` request option. This is useful when\nyou need to examine response headers, status codes, or other details.\n\n```go\n// Create a variable to store the HTTP response\nvar response *http.Response\nuploadResponse, err := client.Assets.Upload(\n\tcontext.TODO(),\n\timagekit.AssetUploadParams{\n\t\tUploadRequest: imagekit.UploadRequestParam{\n\t\t\tFile:     io.Reader(bytes.NewBuffer([]byte("Example data"))),\n\t\t\tFileName: "file_name",\n\t\t},\n\t},\n\toption.WithResponseInto(&response),\n)\nif err != nil {\n\t// handle error\n}\nfmt.Printf("%+v\\n", uploadResponse)\n\nfmt.Printf("Status Code: %d\\n", response.StatusCode)\nfmt.Printf("Headers: %+#v\\n", response.Header)\n```\n\n### Making custom/undocumented requests\n\nThis library is typed for convenient access to the documented API. If you need to access undocumented\nendpoints, params, or response properties, the library can still be used.\n\n#### Undocumented endpoints\n\nTo make requests to undocumented endpoints, you can use `client.Get`, `client.Post`, and other HTTP verbs.\n`RequestOptions` on the client, such as retries, will be respected when making these requests.\n\n```go\nvar (\n    // params can be an io.Reader, a []byte, an encoding/json serializable object,\n    // or a "…Params" struct defined in this library.\n    params map[string]interface{}\n\n    // result can be an []byte, *http.Response, a encoding/json deserializable object,\n    // or a model defined in this library.\n    result *http.Response\n)\nerr := client.Post(context.Background(), "/unspecified", params, &result)\nif err != nil {\n    …\n}\n```\n\n#### Undocumented request params\n\nTo make requests using undocumented parameters, you may use either the `SDK_PackageOptionName.WithQuerySet()`\nor the `SDK_PackageOptionName.WithJSONSet()` methods.\n\n```go\nparams := FooNewParams{\n    ID:   SDK_PackageName.F("id_xxxx"),\n    Data: SDK_PackageName.F(FooNewParamsData{\n        FirstName: SDK_PackageName.F("John"),\n    }),\n}\nclient.Foo.New(context.Background(), params, SDK_PackageOptionName.WithJSONSet("data.last_name", "Doe"))\n```\n\n#### Undocumented response properties\n\nTo access undocumented response properties, you may either access the raw JSON of the response as a string\nwith `result.JSON.RawJSON()`, or get the raw JSON of a particular field on the result with\n`result.JSON.Foo.Raw()`.\n\nAny fields that are not present on the response struct will be saved and can be accessed by `result.JSON.ExtraFields()` which returns the extra fields as a `map[string]Field`.\n\n### Middleware\n\nWe provide `SDK_PackageOptionName.WithMiddleware` which applies the given\nmiddleware to requests.\n\n```go\nfunc Logger(req *http.Request, next SDK_PackageOptionName.MiddlewareNext) (res *http.Response, err error) {\n\t// Before the request\n\tstart := time.Now()\n\tLogReq(req)\n\n\t// Forward the request to the next handler\n\tres, err = next(req)\n\n\t// Handle stuff after the request\n\tend := time.Now()\n\tLogRes(res, err, start - end)\n\n    return res, err\n}\n\nclient := SDK_PackageName.SDK_ClientInitializerName(\n\tSDK_PackageOptionName.WithMiddleware(Logger),\n)\n```\n\nWhen multiple middlewares are provided as variadic arguments, the middlewares\nare applied left to right. If `SDK_PackageOptionName.WithMiddleware` is given\nmultiple times, for example first in the client then the method, the\nmiddleware in the client will run first and the middleware given in the method\nwill run next.\n\nYou may also replace the default `http.Client` with\n`SDK_PackageOptionName.WithHTTPClient(client)`. Only one http client is\naccepted (this overwrites any previous client) and receives requests after any\nmiddleware has been applied.\n\n## Semantic versioning\n\nThis package generally follows [SemVer](https://semver.org/spec/v2.0.0.html) conventions, though certain backwards-incompatible changes may be released as minor versions:\n\n1. Changes to library internals which are technically public but not intended or documented for external use. _(Please open a GitHub issue to let us know if you are relying on such internals.)_\n2. Changes that we do not expect to impact the vast majority of users in practice.\n\nWe take backwards-compatibility seriously and work hard to ensure you can rely on a smooth upgrade experience.\n\nWe are keen for your feedback; please open an [issue](https://www.github.com/imagekit-developer/imagekit-go/issues) with questions, bugs, or suggestions.\n\n## Contributing\n\nSee [the contributing documentation](./CONTRIBUTING.md).\n',
  },
  {
    language: 'java',
    content:
      '# Image Kit Java API Library\n\n<!-- x-release-please-start-version -->\n[![Maven Central](https://img.shields.io/maven-central/v/io.imagekit/image-kit-java)](https://central.sonatype.com/artifact/io.imagekit/image-kit-java/3.1.1)\n[![javadoc](https://javadoc.io/badge2/io.imagekit/image-kit-java/3.1.1/javadoc.svg)](https://javadoc.io/doc/io.imagekit/image-kit-java/3.1.1)\n<!-- x-release-please-end -->\n\nThe Image Kit Java SDK provides convenient access to the [Image Kit REST API](https://imagekit.io/docs/api-reference)   from applications written in Java.\n\n\n\n\n\n## MCP Server\n\nUse the Image Kit MCP Server to enable AI assistants to interact with this API, allowing them to explore endpoints, make test requests, and use documentation to help integrate this SDK into your application.\n\n[![Add to Cursor](https://cursor.com/deeplink/mcp-install-dark.svg)](https://cursor.com/en-US/install-mcp?name=%40imagekit%2Fapi-mcp&config=eyJjb21tYW5kIjoibnB4IiwiYXJncyI6WyIteSIsIkBpbWFnZWtpdC9hcGktbWNwIl0sImVudiI6eyJJTUFHRUtJVF9QUklWQVRFX0tFWSI6Ik15IFByaXZhdGUgS2V5IiwiT1BUSU9OQUxfSU1BR0VLSVRfSUdOT1JFU19USElTIjoiTXkgUGFzc3dvcmQiLCJJTUFHRUtJVF9XRUJIT09LX1NFQ1JFVCI6Ik15IFdlYmhvb2sgU2VjcmV0In19)\n[![Install in VS Code](https://img.shields.io/badge/_-Add_to_VS_Code-blue?style=for-the-badge&logo=data:image/svg%2bxml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHZpZXdCb3g9IjAgMCA0MCA0MCI+PHBhdGggZmlsbD0iI0VFRSIgZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNMzAuMjM1IDM5Ljg4NGEyLjQ5MSAyLjQ5MSAwIDAgMS0xLjc4MS0uNzNMMTIuNyAyNC43OGwtMy40NiAyLjYyNC0zLjQwNiAyLjU4MmExLjY2NSAxLjY2NSAwIDAgMS0xLjA4Mi4zMzggMS42NjQgMS42NjQgMCAwIDEtMS4wNDYtLjQzMWwtMi4yLTJhMS42NjYgMS42NjYgMCAwIDEgMC0yLjQ2M0w3LjQ1OCAyMCA0LjY3IDE3LjQ1MyAxLjUwNyAxNC41N2ExLjY2NSAxLjY2NSAwIDAgMSAwLTIuNDYzbDIuMi0yYTEuNjY1IDEuNjY1IDAgMCAxIDIuMTMtLjA5N2w2Ljg2MyA1LjIwOUwyOC40NTIuODQ0YTIuNDg4IDIuNDg4IDAgMCAxIDEuODQxLS43MjljLjM1MS4wMDkuNjk5LjA5MSAxLjAxOS4yNDVsOC4yMzYgMy45NjFhMi41IDIuNSAwIDAgMSAxLjQxNSAyLjI1M3YuMDk5LS4wNDVWMzMuMzd2LS4wNDUuMDk1YTIuNTAxIDIuNTAxIDAgMCAxLTEuNDE2IDIuMjU3bC04LjIzNSAzLjk2MWEyLjQ5MiAyLjQ5MiAwIDAgMS0xLjA3Ny4yNDZabS43MTYtMjguOTQ3LTExLjk0OCA5LjA2MiAxMS45NTIgOS4wNjUtLjAwNC0xOC4xMjdaIi8+PC9zdmc+)](https://vscode.stainless.com/mcp/%7B%22name%22%3A%22%40imagekit%2Fapi-mcp%22%2C%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22%40imagekit%2Fapi-mcp%22%5D%2C%22env%22%3A%7B%22IMAGEKIT_PRIVATE_KEY%22%3A%22My%20Private%20Key%22%2C%22OPTIONAL_IMAGEKIT_IGNORES_THIS%22%3A%22My%20Password%22%2C%22IMAGEKIT_WEBHOOK_SECRET%22%3A%22My%20Webhook%20Secret%22%7D%7D)\n\n> Note: You may need to set environment variables in your MCP client.\n\n<!-- x-release-please-start-version -->\n\nThe REST API documentation can be found on [imagekit.io](https://imagekit.io/docs/api-reference). Javadocs are available on [javadoc.io](https://javadoc.io/doc/io.imagekit/image-kit-java/3.1.1).\n\n<!-- x-release-please-end -->\n\n## Installation\n\n<!-- x-release-please-start-version -->\n\n### Gradle\n\n~~~kotlin\nimplementation("io.imagekit:image-kit-java:3.1.1")\n~~~\n\n### Maven\n\n~~~xml\n<dependency>\n  <groupId>io.imagekit</groupId>\n  <artifactId>image-kit-java</artifactId>\n  <version>3.1.1</version>\n</dependency>\n~~~\n\n<!-- x-release-please-end -->\n\n## Requirements\n\nThis library requires Java 8 or later.\n\n## Usage\n\n```java\nimport io.imagekit.client.ImageKitClient;\nimport io.imagekit.client.okhttp.ImageKitOkHttpClient;\nimport io.imagekit.models.assets.UploadRequest;\nimport io.imagekit.models.assets.UploadResponse;\n\n// Configures using the `imagekit.imagekitPrivateKey`, `imagekit.optionalImagekitIgnoresThis`, `imagekit.imagekitWebhookSecret` and `imagekit.baseUrl` system properties\n// Or configures using the `IMAGEKIT_PRIVATE_KEY`, `OPTIONAL_IMAGEKIT_IGNORES_THIS`, `IMAGEKIT_WEBHOOK_SECRET` and `IMAGE_KIT_BASE_URL` environment variables\nImageKitClient client = ImageKitOkHttpClient.fromEnv();\n\nUploadRequest params = UploadRequest.builder()\n    .file("Example data")\n    .fileName("file_name")\n    .build();\nUploadResponse uploadResponse = client.assets().upload(params);\n```\n\n## Client configuration\n\nConfigure the client using system properties or environment variables:\n\n```java\nimport io.imagekit.client.ImageKitClient;\nimport io.imagekit.client.okhttp.ImageKitOkHttpClient;\n\n// Configures using the `imagekit.imagekitPrivateKey`, `imagekit.optionalImagekitIgnoresThis`, `imagekit.imagekitWebhookSecret` and `imagekit.baseUrl` system properties\n// Or configures using the `IMAGEKIT_PRIVATE_KEY`, `OPTIONAL_IMAGEKIT_IGNORES_THIS`, `IMAGEKIT_WEBHOOK_SECRET` and `IMAGE_KIT_BASE_URL` environment variables\nImageKitClient client = ImageKitOkHttpClient.fromEnv();\n```\n\nOr manually:\n\n```java\nimport io.imagekit.client.ImageKitClient;\nimport io.imagekit.client.okhttp.ImageKitOkHttpClient;\n\nImageKitClient client = ImageKitOkHttpClient.builder()\n    .privateKey("My Private Key")\n    .password("My Password")\n    .build();\n```\n\nOr using a combination of the two approaches:\n\n```java\nimport io.imagekit.client.ImageKitClient;\nimport io.imagekit.client.okhttp.ImageKitOkHttpClient;\n\nImageKitClient client = ImageKitOkHttpClient.builder()\n    // Configures using the `imagekit.imagekitPrivateKey`, `imagekit.optionalImagekitIgnoresThis`, `imagekit.imagekitWebhookSecret` and `imagekit.baseUrl` system properties\n    // Or configures using the `IMAGEKIT_PRIVATE_KEY`, `OPTIONAL_IMAGEKIT_IGNORES_THIS`, `IMAGEKIT_WEBHOOK_SECRET` and `IMAGE_KIT_BASE_URL` environment variables\n    .fromEnv()\n    .privateKey("My Private Key")\n    .build();\n```\n\nSee this table for the available options:\n\n| Setter          | System property                        | Environment variable             | Required | Default value               |\n| --------------- | -------------------------------------- | -------------------------------- | -------- | --------------------------- |\n| `privateKey`    | `imagekit.imagekitPrivateKey`          | `IMAGEKIT_PRIVATE_KEY`           | true     | -                           |\n| `password`      | `imagekit.optionalImagekitIgnoresThis` | `OPTIONAL_IMAGEKIT_IGNORES_THIS` | false    | `"do_not_set"`              |\n| `webhookSecret` | `imagekit.imagekitWebhookSecret`       | `IMAGEKIT_WEBHOOK_SECRET`        | false    | -                           |\n| `baseUrl`       | `imagekit.baseUrl`                     | `IMAGE_KIT_BASE_URL`             | true     | `"https://api.imagekit.io"` |\n\nSystem properties take precedence over environment variables.\n\n> [!TIP]\n> Don\'t create more than one client in the same application. Each client has a connection pool and\n> thread pools, which are more efficient to share between requests.\n\n### Modifying configuration\n\nTo temporarily use a modified client configuration, while reusing the same connection and thread       pools, call `withOptions()` on any client or service:\n\n```java\nimport io.imagekit.client.ImageKitClient;\n\nImageKitClient clientWithOptions = client.withOptions(optionsBuilder -> {\n    optionsBuilder.baseUrl("https://example.com");\n    optionsBuilder.maxRetries(42);\n});\n```\n\nThe `withOptions()` method does not affect the original client or service.\n\n## Requests and responses\n\nTo send a request to the Image Kit API, build an instance of some `Params` class and pass it to the     corresponding client method. When the response is received, it will be deserialized into an instance of     a Java class.\n\nFor example, `client.assets().upload(...)` should be called with an instance of `AssetUploadParams`, and it     will return an instance of `UploadResponse`.\n\n## Immutability\n\nEach class in the SDK has an associated   [builder](https://blogs.oracle.com/javamagazine/post/exploring-joshua-blochs-builder-design-pattern-in-java)   or factory method for constructing it.\n\nEach class is [immutable](https://docs.oracle.com/javase/tutorial/essential/concurrency/immutable.html)   once constructed. If the class has an associated builder, then it has a `toBuilder()` method, which can   be used to convert it back to a builder for making a modified copy.\n\nBecause each class is immutable, builder modification will _never_ affect already built class instances.\n\n## Asynchronous execution\n\nThe default client is synchronous. To switch to asynchronous execution, call the `async()` method:\n\n```java\nimport io.imagekit.client.ImageKitClient;\nimport io.imagekit.client.okhttp.ImageKitOkHttpClient;\nimport io.imagekit.models.assets.UploadRequest;\nimport io.imagekit.models.assets.UploadResponse;\nimport java.util.concurrent.CompletableFuture;\n\n// Configures using the `imagekit.imagekitPrivateKey`, `imagekit.optionalImagekitIgnoresThis`, `imagekit.imagekitWebhookSecret` and `imagekit.baseUrl` system properties\n// Or configures using the `IMAGEKIT_PRIVATE_KEY`, `OPTIONAL_IMAGEKIT_IGNORES_THIS`, `IMAGEKIT_WEBHOOK_SECRET` and `IMAGE_KIT_BASE_URL` environment variables\nImageKitClient client = ImageKitOkHttpClient.fromEnv();\n\nUploadRequest params = UploadRequest.builder()\n    .file("Example data")\n    .fileName("file_name")\n    .build();\nCompletableFuture<UploadResponse> uploadResponse = client.async().assets().upload(params);\n```\n\nOr create an asynchronous client from the beginning:\n\n```java\nimport io.imagekit.client.ImageKitClientAsync;\nimport io.imagekit.client.okhttp.ImageKitOkHttpClientAsync;\nimport io.imagekit.models.assets.UploadRequest;\nimport io.imagekit.models.assets.UploadResponse;\nimport java.util.concurrent.CompletableFuture;\n\n// Configures using the `imagekit.imagekitPrivateKey`, `imagekit.optionalImagekitIgnoresThis`, `imagekit.imagekitWebhookSecret` and `imagekit.baseUrl` system properties\n// Or configures using the `IMAGEKIT_PRIVATE_KEY`, `OPTIONAL_IMAGEKIT_IGNORES_THIS`, `IMAGEKIT_WEBHOOK_SECRET` and `IMAGE_KIT_BASE_URL` environment variables\nImageKitClientAsync client = ImageKitOkHttpClientAsync.fromEnv();\n\nUploadRequest params = UploadRequest.builder()\n    .file("Example data")\n    .fileName("file_name")\n    .build();\nCompletableFuture<UploadResponse> uploadResponse = client.assets().upload(params);\n```\n\nThe asynchronous client supports the same options as the synchronous one, except most methods return `CompletableFuture`s.\n\n\n\n\n\n\n\n## Raw responses\n\nThe SDK defines methods that deserialize responses into instances of Java classes.       However, these methods don\'t provide access to the response headers, status code, or the raw response       body.\n\nTo access this data, prefix any HTTP method call on a client or service with `withRawResponse()`:\n\n```java\nimport io.imagekit.core.http.Headers;\nimport io.imagekit.core.http.HttpResponseFor;\nimport io.imagekit.models.assets.UploadRequest;\nimport io.imagekit.models.assets.UploadResponse;\n\nUploadRequest params = UploadRequest.builder()\n    .file("Example data")\n    .fileName("file_name")\n    .build();\nHttpResponseFor<UploadResponse> uploadResponse = client.assets().withRawResponse().upload(params);\n\nint statusCode = uploadResponse.statusCode();\nHeaders headers = uploadResponse.headers();\n```\n\nYou can still deserialize the response into an instance of a Java class if needed:\n\n```java\nimport io.imagekit.models.assets.UploadResponse;\n\nUploadResponse parsedUploadResponse = uploadResponse.parse();\n```\n\n## Error handling\n\nThe SDK throws custom unchecked exception types:\n\n- [`ImageKitServiceException`](image-kit-java-core/src/main/kotlin/io/imagekit/errors/ImageKitServiceException.kt): Base class for HTTP errors. See this table for which exception       subclass is thrown for each HTTP status code:\n\n  | Status | Exception                                          |\n  | ------ | -------------------------------------------------- |\n  | 400    | [`BadRequestException`](image-kit-java-core/src/main/kotlin/io/imagekit/errors/BadRequestException.kt)           |\n  | 401    | [`UnauthorizedException`](image-kit-java-core/src/main/kotlin/io/imagekit/errors/UnauthorizedException.kt)         |\n  | 403    | [`PermissionDeniedException`](image-kit-java-core/src/main/kotlin/io/imagekit/errors/PermissionDeniedException.kt)     |\n  | 404    | [`NotFoundException`](image-kit-java-core/src/main/kotlin/io/imagekit/errors/NotFoundException.kt)             |\n  | 422    | [`UnprocessableEntityException`](image-kit-java-core/src/main/kotlin/io/imagekit/errors/UnprocessableEntityException.kt)  |\n  | 429    | [`RateLimitException`](image-kit-java-core/src/main/kotlin/io/imagekit/errors/RateLimitException.kt)            |\n  | 5xx    | [`InternalServerException`](image-kit-java-core/src/main/kotlin/io/imagekit/errors/InternalServerException.kt)       |\n  | others | [`UnexpectedStatusCodeException`](image-kit-java-core/src/main/kotlin/io/imagekit/errors/UnexpectedStatusCodeException.kt) |\n\n- [`ImageKitIoException`](image-kit-java-core/src/main/kotlin/io/imagekit/errors/ImageKitIoException.kt): I/O networking errors.\n\n- [`ImageKitRetryableException`](image-kit-java-core/src/main/kotlin/io/imagekit/errors/ImageKitRetryableException.kt): Generic error indicating a failure that could be retried by the client.\n\n- [`ImageKitInvalidDataException`](image-kit-java-core/src/main/kotlin/io/imagekit/errors/ImageKitInvalidDataException.kt): Failure to interpret successfully parsed data. For example,       when accessing a property that\'s supposed to be required, but the API unexpectedly omitted it from the       response.\n\n- [`ImageKitException`](image-kit-java-core/src/main/kotlin/io/imagekit/errors/ImageKitException.kt): Base class for all exceptions. Most errors will result in one of the       previously mentioned ones, but completely generic errors may be thrown using the base class.\n\n## Pagination\n\nThe SDK defines methods that return a paginated lists of results. It provides convenient ways to access     the results either one page at a time or item-by-item across all pages.\n\n### Auto-pagination\n\nTo iterate through all results across all pages, use the `autoPager()` method, which automatically     fetches more pages as needed.\n\nWhen using the synchronous client, the method returns an [`Iterable`](https://docs.oracle.com/javase/8/docs/api/java/lang/Iterable.html)\n\n```java\nimport io.imagekit.models.assets.AssetListPage;\nimport io.imagekit.models.assets.AssetListResponse;\n\nAssetListPage page = client.assets().list();\n\n// Process as an Iterable\nfor (AssetListResponse asset : page.autoPager()) {\n    System.out.println(asset);\n}\n\n// Process as a Stream\npage.autoPager()\n    .stream()\n    .limit(50)\n    .forEach(asset -> System.out.println(asset));\n```\n\nWhen using the asynchronous client, the method returns an [`AsyncStreamResponse`](image-kit-java-core/src/main/kotlin/io/imagekit/core/http/AsyncStreamResponse.kt):\n\n```java\nimport io.imagekit.core.http.AsyncStreamResponse;\nimport io.imagekit.models.assets.AssetListPageAsync;\nimport io.imagekit.models.assets.AssetListResponse;\nimport java.util.Optional;\nimport java.util.concurrent.CompletableFuture;\n\nCompletableFuture<AssetListPageAsync> pageFuture = client.async().assets().list();\n\npageFuture.thenRun(page -> page.autoPager().subscribe(asset -> {\n    System.out.println(asset);\n}));\n\n// If you need to handle errors or completion of the stream\npageFuture.thenRun(page -> page.autoPager().subscribe(new AsyncStreamResponse.Handler<>() {\n    @Override\n    public void onNext(AssetListResponse asset) {\n        System.out.println(asset);\n    }\n\n    @Override\n    public void onComplete(Optional<Throwable> error) {\n        if (error.isPresent()) {\n            System.out.println("Something went wrong!");\n            throw new RuntimeException(error.get());\n        } else {\n            System.out.println("No more!");\n        }\n    }\n}));\n\n// Or use futures\npageFuture.thenRun(page -> page.autoPager()\n    .subscribe(asset -> {\n        System.out.println(asset);\n    })\n    .onCompleteFuture()\n    .whenComplete((unused, error) -> {\n        if (error != null) {\n            System.out.println("Something went wrong!");\n            throw new RuntimeException(error);\n        } else {\n            System.out.println("No more!");\n        }\n    }));\n```\n\n### Manual pagination\n\nTo access individual page items and manually request the next page, use the `items()`,\n`hasNextPage()`, and `nextPage()` methods:\n\n```java\nimport io.imagekit.models.assets.AssetListPage;\nimport io.imagekit.models.assets.AssetListResponse;\n\nAssetListPage page = client.assets().list();\nwhile (true) {\n    for (AssetListResponse asset : page.items()) {\n        System.out.println(asset);\n    }\n\n    if (!page.hasNextPage()) {\n        break;\n    }\n\n    page = page.nextPage();\n}\n```\n\n## Logging\n\nEnable logging by setting the `IMAGE_KIT_LOG` environment variable to   `info`:\n\n```sh\nexport IMAGE_KIT_LOG=info\n```\n\nOr to `debug` for more verbose logging:\n\n```sh\nexport IMAGE_KIT_LOG=debug\n```\n\nOr configure the client manually using the `logLevel` method:\n\n```java\nimport io.imagekit.client.ImageKitClient;\nimport io.imagekit.client.okhttp.ImageKitOkHttpClient;\nimport io.imagekit.core.LogLevel;\n\nImageKitClient client = ImageKitOkHttpClient.builder()\n    .fromEnv()\n    .logLevel(LogLevel.INFO)\n    .build();\n```\n\n## ProGuard and R8\n\nAlthough the SDK uses reflection, it is still usable with     [ProGuard](https://github.com/Guardsquare/proguard) and     [R8](https://developer.android.com/topic/performance/app-optimization/enable-app-optimization) because     `image-kit-java-core` is published with a     [configuration file](image-kit-java-core/src/main/resources/META-INF/proguard/image-kit-java-core.pro) containing     [keep rules](https://www.guardsquare.com/manual/configuration/usage).\n\nProGuard and R8 should automatically detect and use the published rules, but you can also manually copy     the keep rules if necessary.\n\n\n\n\n\n## Jackson\n\nThe SDK depends on [Jackson](https://github.com/FasterXML/jackson) for JSON     serialization/deserialization. It is compatible with version 2.13.4 or higher,     but depends on version 2.18.2 by default.\n\nThe SDK throws an exception if it detects an incompatible Jackson version at runtime (e.g. if the     default version was overridden in your Maven or Gradle config).\n\nIf the SDK threw an exception, but you\'re _certain_ the version is compatible, then disable the version     check using the `checkJacksonVersionCompatibility` on [`ImageKitOkHttpClient`](image-kit-java-client-okhttp/src/main/kotlin/io/imagekit/client/okhttp/ImageKitOkHttpClient.kt) or     [`ImageKitOkHttpClientAsync`](image-kit-java-client-okhttp/src/main/kotlin/io/imagekit/client/okhttp/ImageKitOkHttpClientAsync.kt).\n\n> [!CAUTION]\n> We make no guarantee that the SDK works correctly when the Jackson version check is disabled.\n\nAlso note that there are bugs in older Jackson versions that can affect the SDK. We don\'t work around all     Jackson bugs ([example](https://github.com/FasterXML/jackson-databind/issues/3240)) and expect users to     upgrade Jackson for those instead.\n\n## Network options\n\n### Retries\n\nThe SDK automatically retries 2 times by default, with a short exponential backoff between requests.\n\nOnly the following error types are retried:\n- Connection errors (for example, due to a network connectivity problem)\n- 408 Request Timeout\n- 409 Conflict\n- 429 Rate Limit\n- 5xx Internal\n\nThe API may also explicitly instruct the SDK to retry or not retry a request.\n\nTo set a custom number of retries, configure the client using the `maxRetries` method:\n\n```java\nimport io.imagekit.client.ImageKitClient;\nimport io.imagekit.client.okhttp.ImageKitOkHttpClient;\n\nImageKitClient client = ImageKitOkHttpClient.builder()\n    .fromEnv()\n    .maxRetries(4)\n    .build();\n```\n\n### Timeouts\n\nRequests time out after 1 minute by default.\n\nTo set a custom timeout, configure the method call using the `timeout` method:\n\n```java\nimport io.imagekit.models.assets.UploadResponse;\n\nUploadResponse uploadResponse = client.assets().upload(\n  params, RequestOptions.builder().timeout(Duration.ofSeconds(30)).build()\n);\n```\n\nOr configure the default for all method calls at the client level:\n\n```java\nimport io.imagekit.client.ImageKitClient;\nimport io.imagekit.client.okhttp.ImageKitOkHttpClient;\nimport java.time.Duration;\n\nImageKitClient client = ImageKitOkHttpClient.builder()\n    .fromEnv()\n    .timeout(Duration.ofSeconds(30))\n    .build();\n```\n\n### Proxies\n\nTo route requests through a proxy, configure the client using the `proxy` method:\n\n```java\nimport io.imagekit.client.ImageKitClient;\nimport io.imagekit.client.okhttp.ImageKitOkHttpClient;\nimport java.net.InetSocketAddress;\nimport java.net.Proxy;\n\nImageKitClient client = ImageKitOkHttpClient.builder()\n    .fromEnv()\n    .proxy(new Proxy(\n      Proxy.Type.HTTP, new InetSocketAddress(\n        "https://example.com", 8080\n      )\n    ))\n    .build();\n```\n\nIf the proxy responds with `407 Proxy Authentication Required`, supply credentials by also   configuring `proxyAuthenticator`:\n\n```java\nimport io.imagekit.client.ImageKitClient;\nimport io.imagekit.client.okhttp.ImageKitOkHttpClient;\nimport io.imagekit.core.http.ProxyAuthenticator;\n\nImageKitClient client = ImageKitOkHttpClient.builder()\n    .fromEnv()\n    .proxy(...)\n    // Or a custom implementation of `ProxyAuthenticator`.\n    .proxyAuthenticator(ProxyAuthenticator.basic("username", "password"))\n    .build();\n```\n\n### Connection pooling\n\nTo customize the underlying OkHttp connection pool, configure the client using the   `maxIdleConnections` and `keepAliveDuration` methods:\n\n```java\nimport io.imagekit.client.ImageKitClient;\nimport io.imagekit.client.okhttp.ImageKitOkHttpClient;\nimport java.time.Duration;\n\nImageKitClient client = ImageKitOkHttpClient.builder()\n    .fromEnv()\n    // If `maxIdleConnections` is set, then `keepAliveDuration` must be set, and vice versa.\n    .maxIdleConnections(10)\n    .keepAliveDuration(Duration.ofMinutes(2))\n    .build();\n```\n\nIf both options are unset, OkHttp\'s default connection pool settings are used.\n\n### HTTPS\n\n> [!NOTE]\n> Most applications should not call these methods, and instead use the system defaults. The defaults include\n> special optimizations that can be lost if the implementations are modified.\n\nTo configure how HTTPS connections are secured, configure the client using the `sslSocketFactory`,   `trustManager`, and `hostnameVerifier` methods:\n\n```java\nimport io.imagekit.client.ImageKitClient;\nimport io.imagekit.client.okhttp.ImageKitOkHttpClient;\n\nImageKitClient client = ImageKitOkHttpClient.builder()\n    .fromEnv()\n    // If `sslSocketFactory` is set, then `trustManager` must be set, and vice versa.\n    .sslSocketFactory(yourSSLSocketFactory)\n    .trustManager(yourTrustManager)\n    .hostnameVerifier(yourHostnameVerifier)\n    .build();\n```\n\n\n\n### Custom HTTP client\n\nThe SDK consists of three artifacts:\n- `image-kit-java-core`\n  - Contains core SDK logic\n  - Does not depend on [OkHttp](https://square.github.io/okhttp)\n  - Exposes [`ImageKitClient`](image-kit-java-core/src/main/kotlin/io/imagekit/client/ImageKitClient.kt), [`ImageKitClientAsync`](image-kit-java-core/src/main/kotlin/io/imagekit/client/ImageKitClientAsync.kt),             [`ImageKitClientImpl`](image-kit-java-core/src/main/kotlin/io/imagekit/client/ImageKitClientImpl.kt), and [`ImageKitClientAsyncImpl`](image-kit-java-core/src/main/kotlin/io/imagekit/client/ImageKitClientAsyncImpl.kt), all of which can             work with any HTTP client\n- `image-kit-java-client-okhttp`\n  - Depends on [OkHttp](https://square.github.io/okhttp)\n  - Exposes [`ImageKitOkHttpClient`](image-kit-java-client-okhttp/src/main/kotlin/io/imagekit/client/okhttp/ImageKitOkHttpClient.kt) and [`ImageKitOkHttpClientAsync`](image-kit-java-client-okhttp/src/main/kotlin/io/imagekit/client/okhttp/ImageKitOkHttpClientAsync.kt), which             provide a way to construct [`ImageKitClientImpl`](image-kit-java-core/src/main/kotlin/io/imagekit/client/ImageKitClientImpl.kt) and             [`ImageKitClientAsyncImpl`](image-kit-java-core/src/main/kotlin/io/imagekit/client/ImageKitClientAsyncImpl.kt), respectively, using OkHttp\n- `image-kit-java`\n  - Depends on and exposes the APIs of both `image-kit-java-core` and `image-kit-java-client-okhttp`\n  - Does not have its own logic\n\nThis structure allows replacing the SDK\'s default HTTP client without pulling in unnecessary dependencies.\n\n#### Customized [`OkHttpClient`](https://square.github.io/okhttp/3.x/okhttp/okhttp3/OkHttpClient.html)\n\n> [!TIP]\n> Try the available [network options](#network-options) before replacing the default client.\n\nTo use a customized `OkHttpClient`:\n\n1. Replace your [`image-kit-java` dependency](#installation) with `image-kit-java-core`\n2. Copy `image-kit-java-client-okhttp`\'s [`OkHttpClient`](image-kit-java-client-okhttp/src/main/kotlin/io/imagekit/client/okhttp/OkHttpClient.kt) class into your code and        customize it\n3. Construct [`ImageKitClientImpl`](image-kit-java-core/src/main/kotlin/io/imagekit/client/ImageKitClientImpl.kt) or [`ImageKitClientAsyncImpl`](image-kit-java-core/src/main/kotlin/io/imagekit/client/ImageKitClientAsyncImpl.kt), similarly to        [`ImageKitOkHttpClient`](image-kit-java-client-okhttp/src/main/kotlin/io/imagekit/client/okhttp/ImageKitOkHttpClient.kt) or [`ImageKitOkHttpClientAsync`](image-kit-java-client-okhttp/src/main/kotlin/io/imagekit/client/okhttp/ImageKitOkHttpClientAsync.kt), using your        customized client\n\n### Completely custom HTTP client\n\nTo use a completely custom HTTP client:\n\n1. Replace your [`image-kit-java` dependency](#installation) with `image-kit-java-core`\n2. Write a class that implements the [`HttpClient`](image-kit-java-core/src/main/kotlin/io/imagekit/core/http/HttpClient.kt) interface\n3. Construct [`ImageKitClientImpl`](image-kit-java-core/src/main/kotlin/io/imagekit/client/ImageKitClientImpl.kt) or [`ImageKitClientAsyncImpl`](image-kit-java-core/src/main/kotlin/io/imagekit/client/ImageKitClientAsyncImpl.kt), similarly to        [`ImageKitOkHttpClient`](image-kit-java-client-okhttp/src/main/kotlin/io/imagekit/client/okhttp/ImageKitOkHttpClient.kt) or [`ImageKitOkHttpClientAsync`](image-kit-java-client-okhttp/src/main/kotlin/io/imagekit/client/okhttp/ImageKitOkHttpClientAsync.kt), using your new        client class\n\n## Undocumented API functionality\n\nThe SDK is typed for convenient usage of the documented API. However, it also supports working with undocumented or not yet supported parts of the API.\n\n### Parameters\n\nTo set undocumented parameters, call the `putAdditionalHeader`, `putAdditionalQueryParam`, or       `putAdditionalBodyProperty` methods on any `Params` class:\n\n```java\nimport io.imagekit.core.JsonValue;\nimport io.imagekit.models.assets.AssetUploadParams;\n\nAssetUploadParams params = AssetUploadParams.builder()\n    .putAdditionalHeader("Secret-Header", "42")\n    .putAdditionalQueryParam("secret_query_param", "42")\n    .putAdditionalBodyProperty("secretProperty", JsonValue.from("42"))\n    .build();\n```\n\nThese can be accessed on the built object later using the `_additionalHeaders()`,       `_additionalQueryParams()`, and `_additionalBodyProperties()` methods.\n\nTo set a documented parameter or property to an undocumented or not yet supported _value_, pass a       [`JsonValue`](image-kit-java-core/src/main/kotlin/io/imagekit/core/Values.kt) object to its setter:\n\n```java\nimport io.imagekit.models.assets.AssetUploadParams;\nimport io.imagekit.models.assets.UploadRequest;\n\nAssetUploadParams params = AssetUploadParams.builder()\n    .uploadRequest(UploadRequest.builder()\n        .file("Example data")\n        .fileName("file_name")\n        .build())\n    .build();\n```\n\nThe most straightforward way to create a [`JsonValue`](image-kit-java-core/src/main/kotlin/io/imagekit/core/Values.kt) is using its       `from(...)` method:\n\n```java\nimport io.imagekit.core.JsonValue;\nimport java.util.List;\nimport java.util.Map;\n\n// Create primitive JSON values\nJsonValue nullValue = JsonValue.from(null);\nJsonValue booleanValue = JsonValue.from(true);\nJsonValue numberValue = JsonValue.from(42);\nJsonValue stringValue = JsonValue.from("Hello World!");\n\n// Create a JSON array value equivalent to `["Hello", "World"]`\nJsonValue arrayValue = JsonValue.from(List.of(\n  "Hello", "World"\n));\n\n// Create a JSON object value equivalent to `{ "a": 1, "b": 2 }`\nJsonValue objectValue = JsonValue.from(Map.of(\n  "a", 1,\n  "b", 2\n));\n\n// Create an arbitrarily nested JSON equivalent to:\n// {\n//   "a": [1, 2],\n//   "b": [3, 4]\n// }\nJsonValue complexValue = JsonValue.from(Map.of(\n  "a", List.of(\n    1, 2\n  ),\n  "b", List.of(\n    3, 4\n  )\n));\n```\n\nNormally a `Builder` class\'s `build` method will throw         [`IllegalStateException`](https://docs.oracle.com/javase/8/docs/api/java/lang/IllegalStateException.html)         if any required parameter or property is unset.\n\nTo forcibly omit a required parameter or property, pass [`JsonMissing`](image-kit-java-core/src/main/kotlin/io/imagekit/core/Values.kt):\n\n```java\nimport io.imagekit.core.JsonMissing;\nimport io.imagekit.models.assets.AssetUploadParams;\nimport io.imagekit.models.assets.UploadRequest;\n\nAssetUploadParams params = AssetUploadParams.builder()\n    .uploadRequest(UploadRequest.builder()\n        .file("Example data")\n        .fileName("file_name")\n        .build())\n    .file(JsonMissing.of())\n    .build();\n```\n\n### Response properties\n\nTo access undocumented response properties, call the `_additionalProperties()` method:\n\n```java\nimport io.imagekit.core.JsonValue;\nimport java.util.Map;\n\nMap<String, JsonValue> additionalProperties = client.assets().upload(params)._additionalProperties();\nJsonValue secretPropertyValue = additionalProperties.get("secretProperty");\n\nString result = secretPropertyValue.accept(new JsonValue.Visitor<>() {\n    @Override\n    public String visitNull() {\n        return "It\'s null!";\n    }\n\n    @Override\n    public String visitBoolean(boolean value) {\n        return "It\'s a boolean!";\n    }\n\n    @Override\n    public String visitNumber(Number value) {\n        return "It\'s a number!";\n    }\n\n    // Other methods include `visitMissing`, `visitString`, `visitArray`, and `visitObject`\n    // The default implementation of each unimplemented method delegates to `visitDefault`, which throws by default, but can also be overridden\n});\n```\n\nTo access a property\'s raw JSON value, which may be undocumented, call its `_` prefixed method:\n\n```java\nimport io.imagekit.core.JsonField;\nimport java.util.Optional;\n\nJsonField<Object> field = client.assets().upload(params)._field();\n\nif (field.isMissing()) {\n  // The property is absent from the JSON response\n} else if (field.isNull()) {\n  // The property was set to literal null\n} else {\n  // Check if value was provided as a string\n  // Other methods include `asNumber()`, `asBoolean()`, etc.\n  Optional<String> jsonString = field.asString();\n\n  // Try to deserialize into a custom type\n  MyClass myObject = field.asUnknown().orElseThrow().convert(MyClass.class);\n}\n```\n\n### Response validation\n\nIn rare cases, the API may return a response that doesn\'t match the expected type. For example, the SDK     may expect a property to contain a `String`, but the API could return something else.\n\nBy default, the SDK will not throw an exception in this case. It will throw     [`ImageKitInvalidDataException`](image-kit-java-core/src/main/kotlin/io/imagekit/errors/ImageKitInvalidDataException.kt) only if you directly access the property.\n\nValidating the response is _not_ forwards compatible with new types from the API for existing fields.\n\nIf you would still prefer to check that the response is completely well-typed upfront, then either call     `validate()`:\n\n```java\nimport io.imagekit.models.assets.UploadResponse;\n\nUploadResponse uploadResponse = client.assets().upload(params).validate();\n```\n\nOr configure the method call to validate the response using the `responseValidation` method:\n\n```java\nimport io.imagekit.models.assets.UploadResponse;\n\nUploadResponse uploadResponse = client.assets().upload(\n  params, RequestOptions.builder().responseValidation(true).build()\n);\n```\n\nOr configure the default for all method calls at the client level:\n\n```java\nimport io.imagekit.client.ImageKitClient;\nimport io.imagekit.client.okhttp.ImageKitOkHttpClient;\n\nImageKitClient client = ImageKitOkHttpClient.builder()\n    .fromEnv()\n    .responseValidation(true)\n    .build();\n```\n\n## FAQ\n\n### Why don\'t you use plain `enum` classes?\n\nJava `enum` classes are not trivially   [forwards compatible](https://www.stainless.com/blog/making-java-enums-forwards-compatible). Using them in   the SDK could cause runtime exceptions if the API is updated to respond with a new enum value.\n\n### Why do you represent fields using `JsonField<T>` instead of just plain `T`?\n\nUsing `JsonField<T>` enables a few features:\n\n- Allowing usage of [undocumented API functionality](#undocumented-api-functionality)\n- Lazily [validating the API response against the expected shape](#response-validation)\n- Representing absent vs explicitly null values\n\n### Why don\'t you use [`data` classes](https://kotlinlang.org/docs/data-classes.html)?\n\nIt is not [backwards compatible to add new fields to a data class](https://kotlinlang.org/docs/api-guidelines-backward-compatibility.html#avoid-using-data-classes-in-your-api)   and we don\'t want to introduce a breaking change every time we add a field to a class.\n\n### Why don\'t you use checked exceptions?\n\nChecked exceptions are widely considered a mistake in the Java programming language. In fact, they were   omitted from Kotlin for this reason.\n\nChecked exceptions:\n\n- Are verbose to handle\n- Encourage error handling at the wrong level of abstraction, where nothing can be done about the error\n- Are tedious to propagate due to the [function coloring problem](https://journal.stuffwithstuff.com/2015/02/01/what-color-is-your-function)\n- Don\'t play well with lambdas (also due to the function coloring problem)\n\n## Semantic versioning\n\nThis package generally follows [SemVer](https://semver.org/spec/v2.0.0.html) conventions, though certain backwards-incompatible changes may be released as minor versions:\n\n1. Changes to library internals which are technically public but not intended or documented for external use. _(Please open a GitHub issue to let us know if you are relying on such internals.)_\n2. Changes that we do not expect to impact the vast majority of users in practice.\n\nWe take backwards-compatibility seriously and work hard to ensure you can rely on a smooth upgrade experience.\n\nWe are keen for your feedback; please open an [issue](https://www.github.com/imagekit-developer/imagekit-java/issues) with questions, bugs, or suggestions.\n',
  },
  {
    language: 'php',
    content:
      "# Image Kit PHP API Library\n\nThe Image Kit PHP library provides convenient access to the Image Kit REST API from any PHP 8.1.0+ application.\n\n## Installation\n\n<!-- x-release-please-start-version -->\n```\ncomposer require \"imagekit/imagekit 0.0.1\"\n```\n<!-- x-release-please-end -->\n\n## Usage\n\n```php\n<?php\n\n$client = new Client(\n  privateKey: getenv('IMAGEKIT_PRIVATE_KEY') ?: 'My Private Key',\n  password: getenv('OPTIONAL_IMAGEKIT_IGNORES_THIS') ?: 'do_not_set',\n);\n\n$uploadResponse = $client->assets->upload(\n  file: FileParam::fromString('https://www.example.com/public-url.jpg', filename: uniqid('file-upload-', true)),\n  fileName: 'file-name.jpg',\n);\n\nvar_dump($uploadResponse);\n```",
  },
  {
    language: 'python',
    content:
      '# Image Kit Python API library\n\n<!-- prettier-ignore -->\n[![PyPI version](https://img.shields.io/pypi/v/imagekitio.svg?label=pypi%20(stable))](https://pypi.org/project/imagekitio/)\n\nThe Image Kit Python library provides convenient access to the Image Kit REST API from any Python 3.9+\napplication. The library includes type definitions for all request params and response fields,\nand offers both synchronous and asynchronous clients powered by [httpx](https://github.com/encode/httpx).\n\n\n\n\n\n## MCP Server\n\nUse the Image Kit MCP Server to enable AI assistants to interact with this API, allowing them to explore endpoints, make test requests, and use documentation to help integrate this SDK into your application.\n\n[![Add to Cursor](https://cursor.com/deeplink/mcp-install-dark.svg)](https://cursor.com/en-US/install-mcp?name=%40imagekit%2Fapi-mcp&config=eyJjb21tYW5kIjoibnB4IiwiYXJncyI6WyIteSIsIkBpbWFnZWtpdC9hcGktbWNwIl0sImVudiI6eyJJTUFHRUtJVF9QUklWQVRFX0tFWSI6Ik15IFByaXZhdGUgS2V5IiwiT1BUSU9OQUxfSU1BR0VLSVRfSUdOT1JFU19USElTIjoiTXkgUGFzc3dvcmQiLCJJTUFHRUtJVF9XRUJIT09LX1NFQ1JFVCI6Ik15IFdlYmhvb2sgU2VjcmV0In19)\n[![Install in VS Code](https://img.shields.io/badge/_-Add_to_VS_Code-blue?style=for-the-badge&logo=data:image/svg%2bxml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHZpZXdCb3g9IjAgMCA0MCA0MCI+PHBhdGggZmlsbD0iI0VFRSIgZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNMzAuMjM1IDM5Ljg4NGEyLjQ5MSAyLjQ5MSAwIDAgMS0xLjc4MS0uNzNMMTIuNyAyNC43OGwtMy40NiAyLjYyNC0zLjQwNiAyLjU4MmExLjY2NSAxLjY2NSAwIDAgMS0xLjA4Mi4zMzggMS42NjQgMS42NjQgMCAwIDEtMS4wNDYtLjQzMWwtMi4yLTJhMS42NjYgMS42NjYgMCAwIDEgMC0yLjQ2M0w3LjQ1OCAyMCA0LjY3IDE3LjQ1MyAxLjUwNyAxNC41N2ExLjY2NSAxLjY2NSAwIDAgMSAwLTIuNDYzbDIuMi0yYTEuNjY1IDEuNjY1IDAgMCAxIDIuMTMtLjA5N2w2Ljg2MyA1LjIwOUwyOC40NTIuODQ0YTIuNDg4IDIuNDg4IDAgMCAxIDEuODQxLS43MjljLjM1MS4wMDkuNjk5LjA5MSAxLjAxOS4yNDVsOC4yMzYgMy45NjFhMi41IDIuNSAwIDAgMSAxLjQxNSAyLjI1M3YuMDk5LS4wNDVWMzMuMzd2LS4wNDUuMDk1YTIuNTAxIDIuNTAxIDAgMCAxLTEuNDE2IDIuMjU3bC04LjIzNSAzLjk2MWEyLjQ5MiAyLjQ5MiAwIDAgMS0xLjA3Ny4yNDZabS43MTYtMjguOTQ3LTExLjk0OCA5LjA2MiAxMS45NTIgOS4wNjUtLjAwNC0xOC4xMjdaIi8+PC9zdmc+)](https://vscode.stainless.com/mcp/%7B%22name%22%3A%22%40imagekit%2Fapi-mcp%22%2C%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22%40imagekit%2Fapi-mcp%22%5D%2C%22env%22%3A%7B%22IMAGEKIT_PRIVATE_KEY%22%3A%22My%20Private%20Key%22%2C%22OPTIONAL_IMAGEKIT_IGNORES_THIS%22%3A%22My%20Password%22%2C%22IMAGEKIT_WEBHOOK_SECRET%22%3A%22My%20Webhook%20Secret%22%7D%7D)\n\n> Note: You may need to set environment variables in your MCP client.\n\n## Documentation\n\nThe REST API documentation can be found on [imagekit.io](https://imagekit.io/docs/api-reference). The full API of this library can be found in [api.md](api.md).\n\n## Installation\n\n```sh\n# install from PyPI\npip install imagekitio\n```\n\n## Usage\n\nThe full API of this library can be found in [api.md](api.md).\n\n```python\nimport os\nfrom imagekitio import ImageKit\n\nclient = ImageKit(\n    private_key=os.environ.get("IMAGEKIT_PRIVATE_KEY"),  # This is the default and can be omitted\n    password=os.environ.get("OPTIONAL_IMAGEKIT_IGNORES_THIS"),  # This is the default and can be omitted\n)\n\nupload_response = client.assets.upload(\n    file=b"https://www.example.com/public-url.jpg",\n    file_name="file-name.jpg",\n)\n```\n\nWhile you can provide a `private_key` keyword argument,\nwe recommend using [python-dotenv](https://pypi.org/project/python-dotenv/)\nto add `IMAGEKIT_PRIVATE_KEY="My Private Key"` to your `.env` file\nso that your Private Key is not stored in source control.\n\n## Async usage\n\nSimply import `AsyncImageKit` instead of `ImageKit` and use `await` with each API call:\n\n```python\nimport os\nimport asyncio\nfrom imagekitio import AsyncImageKit\n\nclient = AsyncImageKit(\n    private_key=os.environ.get("IMAGEKIT_PRIVATE_KEY"),  # This is the default and can be omitted\n    password=os.environ.get("OPTIONAL_IMAGEKIT_IGNORES_THIS"),  # This is the default and can be omitted\n)\n\nasync def main() -> None:\n  upload_response = await client.assets.upload(\n      file=b"https://www.example.com/public-url.jpg",\n      file_name="file-name.jpg",\n  )\n\nasyncio.run(main())\n```\n\nFunctionality between the synchronous and asynchronous clients is otherwise identical.\n\n### With aiohttp\n\nBy default, the async client uses `httpx` for HTTP requests. However, for improved concurrency performance you may also use `aiohttp` as the HTTP backend.\n\nYou can enable this by installing `aiohttp`:\n\n```sh\n# install from PyPI\npip install imagekitio[aiohttp]\n```\n\nThen you can enable it by instantiating the client with `http_client=DefaultAioHttpClient()`:\n\n```python\nimport os\nimport asyncio\nfrom imagekitio import DefaultAioHttpClient\nfrom imagekitio import AsyncImageKit\n\nasync def main() -> None:\n  async with AsyncImageKit(\n    private_key=os.environ.get("IMAGEKIT_PRIVATE_KEY"),  # This is the default and can be omitted\n    password=os.environ.get("OPTIONAL_IMAGEKIT_IGNORES_THIS"),  # This is the default and can be omitted\n    http_client=DefaultAioHttpClient(),\n) as client:\n    upload_response = await client.assets.upload(\n        file=b"https://www.example.com/public-url.jpg",\n        file_name="file-name.jpg",\n    )\n\nasyncio.run(main())\n```\n\n\n\n## Using types\n\nNested request parameters are [TypedDicts](https://docs.python.org/3/library/typing.html#typing.TypedDict). Responses are [Pydantic models](https://docs.pydantic.dev) which also provide helper methods for things like:\n\n- Serializing back into JSON, `model.to_json()`\n- Converting to a dictionary, `model.to_dict()`\n\nTyped requests and responses provide autocomplete and documentation within your editor. If you would like to see type errors in VS Code to help catch bugs earlier, set `python.analysis.typeCheckingMode` to `basic`.\n\n## Pagination\n\nList methods in the Image Kit API are paginated.\n\nThis library provides auto-paginating iterators with each list response, so you do not have to request successive pages manually:\n\n```python\nfrom imagekitio import ImageKit\n\nclient = ImageKit()\n\nall_assets = []\n# Automatically fetches more pages as needed.\nfor asset in client.assets.list():\n    # Do something with asset here\n    all_assets.append(asset)\nprint(all_assets)\n```\n\nOr, asynchronously:\n\n```python\nimport asyncio\nfrom imagekitio import AsyncImageKit\n\nclient = AsyncImageKit()\n\nasync def main() -> None:\n    all_assets = []\n    # Iterate through items across all pages, issuing requests as needed.\n    async for asset in client.assets.list():\n        all_assets.append(asset)\n    print(all_assets)\n\nasyncio.run(main())\n```\n\nAlternatively, you can use the `.has_next_page()`, `.next_page_info()`, or  `.get_next_page()` methods for more granular control working with pages:\n\n```python\nfirst_page = await client.assets.list()\nif first_page.has_next_page():\n    print(f"will fetch next page using these details: {first_page.next_page_info()}")\n    next_page = await first_page.get_next_page()\n    print(f"number of items we just fetched: {len(next_page.items)}")\n\n# Remove `await` for non-async usage.\n```\n\nOr just work directly with the returned data:\n\n```python\nfirst_page = await client.assets.list()\n\nprint(f"next page cursor: {first_page.end_cursor}") # => "next page cursor: ..."\nfor asset in first_page.items:\n    print(asset)\n\n# Remove `await` for non-async usage.\n```\n\n## Nested params\n\nNested parameters are dictionaries, typed using `TypedDict`, for example:\n\n```python\nfrom imagekitio import ImageKit\n\nclient = ImageKit()\n\nupload_response = client.assets.upload(\n    file=b"Example data",\n    file_name="file_name",\n    overwrite={},\n)\nprint(upload_response.overwrite)\n```\n\n## File uploads\n\nRequest parameters that correspond to file uploads can be passed as `bytes`, or a [`PathLike`](https://docs.python.org/3/library/os.html#os.PathLike) instance or a tuple of `(filename, contents, media type)`.\n\n```python\nfrom pathlib import Path\nfrom imagekitio import ImageKit\n\nclient = ImageKit()\n\nclient.assets.upload(\n    file=Path("/path/to/file"),\n    file_name="file_name",\n)\n```\n\nThe async client uses the exact same interface. If you pass a [`PathLike`](https://docs.python.org/3/library/os.html#os.PathLike) instance, the file contents will be read asynchronously automatically.\n\n## Handling errors\n\nWhen the library is unable to connect to the API (for example, due to network connection problems or a timeout), a subclass of `imagekitio.APIConnectionError` is raised.\n\nWhen the API returns a non-success status code (that is, 4xx or 5xx\nresponse), a subclass of `imagekitio.APIStatusError` is raised, containing `status_code` and `response` properties.\n\nAll errors inherit from `imagekitio.APIError`.\n\n```python\nimport imagekitio\nfrom imagekitio import ImageKit\n\nclient = ImageKit()\n\ntry:\n    client.assets.upload(\n        file=b"https://www.example.com/public-url.jpg",\n        file_name="file-name.jpg",\n    )\nexcept imagekitio.APIConnectionError as e:\n    print("The server could not be reached")\n    print(e.__cause__) # an underlying Exception, likely raised within httpx.\nexcept imagekitio.RateLimitError as e:\n    print("A 429 status code was received; we should back off a bit.")\nexcept imagekitio.APIStatusError as e:\n    print("Another non-200-range status code was received")\n    print(e.status_code)\n    print(e.response)\n```\n\nError codes are as follows:\n\n| Status Code | Error Type                 |\n| ----------- | -------------------------- |\n| 400         | `BadRequestError`          |\n| 401         | `AuthenticationError`      |\n| 403         | `PermissionDeniedError`    |\n| 404         | `NotFoundError`            |\n| 422         | `UnprocessableEntityError` |\n| 429         | `RateLimitError`           |\n| >=500       | `InternalServerError`      |\n| N/A         | `APIConnectionError`       |\n\n### Retries\n\nCertain errors are automatically retried 2 times by default, with a short exponential backoff.\nConnection errors (for example, due to a network connectivity problem), 408 Request Timeout, 409 Conflict,\n429 Rate Limit, and >=500 Internal errors are all retried by default.\n\nYou can use the `max_retries` option to configure or disable retry settings:\n\n```python\nfrom imagekitio import ImageKit\n\n# Configure the default for all requests:\nclient = ImageKit(\n    # default is 2\n    max_retries=0,\n)\n\n# Or, configure per-request:\nclient.with_options(max_retries = 5).assets.upload(\n    file=b"https://www.example.com/public-url.jpg",\n    file_name="file-name.jpg",\n)\n```\n\n### Timeouts\n\nBy default requests time out after 1 minute. You can configure this with a `timeout` option,\nwhich accepts a float or an [`httpx.Timeout`](https://www.python-httpx.org/advanced/timeouts/#fine-tuning-the-configuration) object:\n\n```python\nfrom imagekitio import ImageKit\n\n# Configure the default for all requests:\nclient = ImageKit(\n    # 20 seconds (default is 1 minute)\n    timeout=20.0,\n)\n\n# More granular control:\nclient = ImageKit(\n    timeout=httpx.Timeout(60.0, read=5.0, write=10.0, connect=2.0),\n)\n\n# Override per-request:\nclient.with_options(timeout = 5.0).assets.upload(\n    file=b"https://www.example.com/public-url.jpg",\n    file_name="file-name.jpg",\n)\n```\n\nOn timeout, an `APITimeoutError` is thrown.\n\nNote that requests that time out are [retried twice by default](#retries).\n\n\n\n## Advanced\n\n### Logging\n\nWe use the standard library [`logging`](https://docs.python.org/3/library/logging.html) module.\n\nYou can enable logging by setting the environment variable `IMAGE_KIT_LOG` to `info`.\n\n```shell\n$ export IMAGE_KIT_LOG=info\n```\n\nOr to `debug` for more verbose logging.\n\n### How to tell whether `None` means `null` or missing\n\nIn an API response, a field may be explicitly `null`, or missing entirely; in either case, its value is `None` in this library. You can differentiate the two cases with `.model_fields_set`:\n\n```py\nif response.my_field is None:\n  if \'my_field\' not in response.model_fields_set:\n    print(\'Got json like {}, without a "my_field" key present at all.\')\n  else:\n    print(\'Got json like {"my_field": null}.\')\n```\n\n### Accessing raw response data (e.g. headers)\n\nThe "raw" Response object can be accessed by prefixing `.with_raw_response.` to any HTTP method call, e.g.,\n\n```py\nfrom imagekitio import ImageKit\n\nclient = ImageKit()\nresponse = client.assets.with_raw_response.upload(\n    file=b"https://www.example.com/public-url.jpg",\n    file_name="file-name.jpg",\n)\nprint(response.headers.get(\'X-My-Header\'))\n\nasset = response.parse()  # get the object that `assets.upload()` would have returned\nprint(asset)\n```\n\nThese methods return an [`APIResponse`](https://github.com/imagekit-developer/imagekit-python/tree/master/src/imagekitio/_response.py) object.\n\nThe async client returns an [`AsyncAPIResponse`](https://github.com/imagekit-developer/imagekit-python/tree/master/src/imagekitio/_response.py) with the same structure, the only difference being `await`able methods for reading the response content.\n\n#### `.with_streaming_response`\n\nThe above interface eagerly reads the full response body when you make the request, which may not always be what you want.\n\nTo stream the response body, use `.with_streaming_response` instead, which requires a context manager and only reads the response body once you call `.read()`, `.text()`, `.json()`, `.iter_bytes()`, `.iter_text()`, `.iter_lines()` or `.parse()`. In the async client, these are async methods.\n\n```python\nwith client.assets.with_streaming_response.upload(\n    file=b"https://www.example.com/public-url.jpg",\n    file_name="file-name.jpg",\n) as response :\n    print(response.headers.get(\'X-My-Header\'))\n\n    for line in response.iter_lines():\n      print(line)\n```\n\nThe context manager is required so that the response will reliably be closed.\n\n### Making custom/undocumented requests\n\nThis library is typed for convenient access to the documented API.\n\nIf you need to access undocumented endpoints, params, or response properties, the library can still be used.\n\n#### Undocumented endpoints\n\nTo make requests to undocumented endpoints, you can make requests using `client.get`, `client.post`, and other\nhttp verbs. Options on the client will be respected (such as retries) when making this request.\n\n```py\nimport httpx\n\nresponse = client.post(\n    "/foo",\n    cast_to=httpx.Response,\n    body={"my_param": True},\n)\n\nprint(response.headers.get("x-foo"))\n```\n\n#### Undocumented request params\n\nIf you want to explicitly send an extra param, you can do so with the `extra_query`, `extra_body`, and `extra_headers` request\noptions.\n\n#### Undocumented response properties\n\nTo access undocumented response properties, you can access the extra fields like `response.unknown_prop`. You\ncan also get all the extra fields on the Pydantic model as a dict with\n[`response.model_extra`](https://docs.pydantic.dev/latest/api/base_model/#pydantic.BaseModel.model_extra).\n\n### Configuring the HTTP client\n\nYou can directly override the [httpx client](https://www.python-httpx.org/api/#client) to customize it for your use case, including:\n\n- Support for [proxies](https://www.python-httpx.org/advanced/proxies/)\n- Custom [transports](https://www.python-httpx.org/advanced/transports/)\n- Additional [advanced](https://www.python-httpx.org/advanced/clients/) functionality\n\n```python\nimport httpx\nfrom imagekitio import ImageKit, DefaultHttpxClient\n\nclient = ImageKit(\n    # Or use the `IMAGE_KIT_BASE_URL` env var\n    base_url="http://my.test.server.example.com:8083",\n    http_client=DefaultHttpxClient(proxy="http://my.test.proxy.example.com", transport=httpx.HTTPTransport(local_address="0.0.0.0")),\n)\n```\n\nYou can also customize the client on a per-request basis by using `with_options()`:\n\n```python\nclient.with_options(http_client=DefaultHttpxClient(...))\n```\n\n### Managing HTTP resources\n\nBy default the library closes underlying HTTP connections whenever the client is [garbage collected](https://docs.python.org/3/reference/datamodel.html#object.__del__). You can manually close the client using the `.close()` method if desired, or with a context manager that closes when exiting.\n\n```py\nfrom imagekitio import ImageKit\n\nwith ImageKit() as client:\n  # make requests here\n  ...\n\n# HTTP client is now closed\n```\n\n## Versioning\n\nThis package generally follows [SemVer](https://semver.org/spec/v2.0.0.html) conventions, though certain backwards-incompatible changes may be released as minor versions:\n\n1. Changes that only affect static types, without breaking runtime behavior.\n2. Changes to library internals which are technically public but not intended or documented for external use. _(Please open a GitHub issue to let us know if you are relying on such internals.)_\n3. Changes that we do not expect to impact the vast majority of users in practice.\n\nWe take backwards-compatibility seriously and work hard to ensure you can rely on a smooth upgrade experience.\n\nWe are keen for your feedback; please open an [issue](https://www.github.com/imagekit-developer/imagekit-python/issues) with questions, bugs, or suggestions.\n\n### Determining the installed version\n\nIf you\'ve upgraded to the latest version but aren\'t seeing any new features you were expecting then your python environment is likely still using an older version.\n\nYou can determine the version that is being used at runtime with:\n\n```py\nimport imagekitio\nprint(imagekitio.__version__)\n```\n\n## Requirements\n\nPython 3.9 or higher.\n\n## Contributing\n\nSee [the contributing documentation](./CONTRIBUTING.md).\n',
  },
  {
    language: 'ruby',
    content:
      '# Image Kit Ruby API library\n\nThe Image Kit Ruby library provides convenient access to the Image Kit REST API from any Ruby 3.2.0+ application. It ships with comprehensive types & docstrings in Yard, RBS, and RBI – [see below](https://github.com/imagekit-developer/imagekit-ruby#Sorbet) for usage with Sorbet. The standard library\'s `net/http` is used as the HTTP transport, with connection pooling via the `connection_pool` gem.\n\n\n\n\n\n## MCP Server\n\nUse the Image Kit MCP Server to enable AI assistants to interact with this API, allowing them to explore endpoints, make test requests, and use documentation to help integrate this SDK into your application.\n\n[![Add to Cursor](https://cursor.com/deeplink/mcp-install-dark.svg)](https://cursor.com/en-US/install-mcp?name=%40imagekit%2Fapi-mcp&config=eyJjb21tYW5kIjoibnB4IiwiYXJncyI6WyIteSIsIkBpbWFnZWtpdC9hcGktbWNwIl0sImVudiI6eyJJTUFHRUtJVF9QUklWQVRFX0tFWSI6Ik15IFByaXZhdGUgS2V5IiwiT1BUSU9OQUxfSU1BR0VLSVRfSUdOT1JFU19USElTIjoiTXkgUGFzc3dvcmQiLCJJTUFHRUtJVF9XRUJIT09LX1NFQ1JFVCI6Ik15IFdlYmhvb2sgU2VjcmV0In19)\n[![Install in VS Code](https://img.shields.io/badge/_-Add_to_VS_Code-blue?style=for-the-badge&logo=data:image/svg%2bxml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHZpZXdCb3g9IjAgMCA0MCA0MCI+PHBhdGggZmlsbD0iI0VFRSIgZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNMzAuMjM1IDM5Ljg4NGEyLjQ5MSAyLjQ5MSAwIDAgMS0xLjc4MS0uNzNMMTIuNyAyNC43OGwtMy40NiAyLjYyNC0zLjQwNiAyLjU4MmExLjY2NSAxLjY2NSAwIDAgMS0xLjA4Mi4zMzggMS42NjQgMS42NjQgMCAwIDEtMS4wNDYtLjQzMWwtMi4yLTJhMS42NjYgMS42NjYgMCAwIDEgMC0yLjQ2M0w3LjQ1OCAyMCA0LjY3IDE3LjQ1MyAxLjUwNyAxNC41N2ExLjY2NSAxLjY2NSAwIDAgMSAwLTIuNDYzbDIuMi0yYTEuNjY1IDEuNjY1IDAgMCAxIDIuMTMtLjA5N2w2Ljg2MyA1LjIwOUwyOC40NTIuODQ0YTIuNDg4IDIuNDg4IDAgMCAxIDEuODQxLS43MjljLjM1MS4wMDkuNjk5LjA5MSAxLjAxOS4yNDVsOC4yMzYgMy45NjFhMi41IDIuNSAwIDAgMSAxLjQxNSAyLjI1M3YuMDk5LS4wNDVWMzMuMzd2LS4wNDUuMDk1YTIuNTAxIDIuNTAxIDAgMCAxLTEuNDE2IDIuMjU3bC04LjIzNSAzLjk2MWEyLjQ5MiAyLjQ5MiAwIDAgMS0xLjA3Ny4yNDZabS43MTYtMjguOTQ3LTExLjk0OCA5LjA2MiAxMS45NTIgOS4wNjUtLjAwNC0xOC4xMjdaIi8+PC9zdmc+)](https://vscode.stainless.com/mcp/%7B%22name%22%3A%22%40imagekit%2Fapi-mcp%22%2C%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22%40imagekit%2Fapi-mcp%22%5D%2C%22env%22%3A%7B%22IMAGEKIT_PRIVATE_KEY%22%3A%22My%20Private%20Key%22%2C%22OPTIONAL_IMAGEKIT_IGNORES_THIS%22%3A%22My%20Password%22%2C%22IMAGEKIT_WEBHOOK_SECRET%22%3A%22My%20Webhook%20Secret%22%7D%7D)\n\n> Note: You may need to set environment variables in your MCP client.\n\n## Documentation\n\nDocumentation for releases of this gem can be found [on RubyDoc](https://gemdocs.org/gems/imagekitio).\n\nThe REST API documentation can be found on [imagekit.io](https://imagekit.io/docs/api-reference).\n\n## Installation\n\nTo use this gem, install via Bundler by adding the following to your application\'s `Gemfile`:\n\n<!-- x-release-please-start-version -->\n\n```ruby\ngem "imagekitio", "~> 4.5.1"\n```\n\n<!-- x-release-please-end -->\n\n## Usage\n\n```ruby\nrequire "bundler/setup"\nrequire "imagekitio"\n\nimage_kit = Imagekitio::Client.new(\n  private_key: ENV["IMAGEKIT_PRIVATE_KEY"], # This is the default and can be omitted\n  password: ENV["OPTIONAL_IMAGEKIT_IGNORES_THIS"] # This is the default and can be omitted\n)\n\nupload_response = image_kit.assets.upload(\n  file: StringIO.new("https://www.example.com/public-url.jpg"),\n  file_name: "file-name.jpg"\n)\n\nputs(upload_response)\n```\n\n\n\n### Pagination\n\nList methods in the Image Kit API are paginated.\n\nThis library provides auto-paginating iterators with each list response, so you do not have to request successive pages manually:\n\n```ruby\npage = image_kit.assets.list\n\n# Fetch single item from page.\nasset = page.items[0]\nputs(asset)\n\n# Automatically fetches more pages as needed.\npage.auto_paging_each do |asset|\n  puts(asset)\nend\n```\n\nAlternatively, you can use the `#next_page?` and `#next_page` methods for more granular control working with pages.\n\n```ruby\nif page.next_page?\n  new_page = page.next_page\n  puts(new_page.items[0])\nend\n```\n\n### File uploads\n\nRequest parameters that correspond to file uploads can be passed as raw contents, a [`Pathname`](https://rubyapi.org/3.2/o/pathname) instance, [`StringIO`](https://rubyapi.org/3.2/o/stringio), or more.\n\n```ruby\nrequire "pathname"\n\n# Use `Pathname` to send the filename and/or avoid paging a large file into memory:\nupload_response = image_kit.assets.upload(file: Pathname("/path/to/file"))\n\n# Alternatively, pass file contents or a `StringIO` directly:\nupload_response = image_kit.assets.upload(file: File.read("/path/to/file"))\n\n# Or, to control the filename and/or content type:\nfile = Imagekitio::FilePart.new(File.read("/path/to/file"), filename: "/path/to/file", content_type: "…")\nupload_response = image_kit.assets.upload(file: file)\n\nputs(upload_response)\n```\n\nNote that you can also pass a raw `IO` descriptor, but this disables retries, as the library can\'t be sure if the descriptor is a file or pipe (which cannot be rewound).\n\n### Handling errors\n\nWhen the library is unable to connect to the API, or if the API returns a non-success status code (i.e., 4xx or 5xx response), a subclass of `Imagekitio::Errors::APIError` will be thrown:\n\n```ruby\nbegin\n  asset = image_kit.assets.upload(\n    file: StringIO.new("https://www.example.com/public-url.jpg"),\n    file_name: "file-name.jpg"\n  )\nrescue Imagekitio::Errors::APIConnectionError => e\n  puts("The server could not be reached")\n  puts(e.cause)  # an underlying Exception, likely raised within `net/http`\nrescue Imagekitio::Errors::RateLimitError => e\n  puts("A 429 status code was received; we should back off a bit.")\nrescue Imagekitio::Errors::APIStatusError => e\n  puts("Another non-200-range status code was received")\n  puts(e.status)\nend\n```\n\nError codes are as follows:\n\n| Cause            | Error Type                 |\n| ---------------- | -------------------------- |\n| HTTP 400         | `BadRequestError`          |\n| HTTP 401         | `AuthenticationError`      |\n| HTTP 403         | `PermissionDeniedError`    |\n| HTTP 404         | `NotFoundError`            |\n| HTTP 409         | `ConflictError`            |\n| HTTP 422         | `UnprocessableEntityError` |\n| HTTP 429         | `RateLimitError`           |\n| HTTP >= 500      | `InternalServerError`      |\n| Other HTTP error | `APIStatusError`           |\n| Timeout          | `APITimeoutError`          |\n| Network error    | `APIConnectionError`       |\n\n### Retries\n\nCertain errors will be automatically retried 2 times by default, with a short exponential backoff.\n\nConnection errors (for example, due to a network connectivity problem), 408 Request Timeout, 409 Conflict, 429 Rate Limit, >=500 Internal errors, and timeouts will all be retried by default.\n\nYou can use the `max_retries` option to configure or disable this:\n\n```ruby\n# Configure the default for all requests:\nimage_kit = Imagekitio::Client.new(\n  max_retries: 0 # default is 2\n)\n\n# Or, configure per-request:\nimage_kit.assets.upload(\n  file: StringIO.new("https://www.example.com/public-url.jpg"),\n  file_name: "file-name.jpg",\n  request_options: {max_retries: 5}\n)\n```\n\n### Timeouts\n\nBy default, requests will time out after 60 seconds. You can use the timeout option to configure or disable this:\n\n```ruby\n# Configure the default for all requests:\nimage_kit = Imagekitio::Client.new(\n  timeout: nil # default is 60\n)\n\n# Or, configure per-request:\nimage_kit.assets.upload(\n  file: StringIO.new("https://www.example.com/public-url.jpg"),\n  file_name: "file-name.jpg",\n  request_options: {timeout: 5}\n)\n```\n\nOn timeout, `Imagekitio::Errors::APITimeoutError` is raised.\n\nNote that requests that time out are retried by default.\n\n## Advanced concepts\n\n### BaseModel\n\nAll parameter and response objects inherit from `Imagekitio::Internal::Type::BaseModel`, which provides several conveniences, including:\n\n1. All fields, including unknown ones, are accessible with `obj[:prop]` syntax, and can be destructured with `obj => {prop: prop}` or pattern-matching syntax.\n\n2. Structural equivalence for equality; if two API calls return the same values, comparing the responses with == will return true.\n\n3. Both instances and the classes themselves can be pretty-printed.\n\n4. Helpers such as `#to_h`, `#deep_to_h`, `#to_json`, and `#to_yaml`.\n\n### Making custom or undocumented requests\n\n#### Undocumented properties\n\nYou can send undocumented parameters to any endpoint, and read undocumented response properties, like so:\n\nNote: the `extra_` parameters of the same name overrides the documented parameters.\n\n```ruby\nupload_response =\n  image_kit.assets.upload(\n    file: StringIO.new("https://www.example.com/public-url.jpg"),\n    file_name: "file-name.jpg",\n    request_options: {\n      extra_query: {my_query_parameter: value},\n      extra_body: {my_body_parameter: value},\n      extra_headers: {"my-header": value}\n    }\n  )\n\nputs(upload_response[:my_undocumented_property])\n```\n\n#### Undocumented request params\n\nIf you want to explicitly send an extra param, you can do so with the `extra_query`, `extra_body`, and `extra_headers` under the `request_options:` parameter when making a request, as seen in the examples above.\n\n#### Undocumented endpoints\n\nTo make requests to undocumented endpoints while retaining the benefit of auth, retries, and so on, you can make requests using `client.request`, like so:\n\n```ruby\nresponse = client.request(\n  method: :post,\n  path: \'/undocumented/endpoint\',\n  query: {"dog": "woof"},\n  headers: {"useful-header": "interesting-value"},\n  body: {"hello": "world"}\n)\n```\n\n### Concurrency & connection pooling\n\nThe `Imagekitio::Client` instances are threadsafe, but are only are fork-safe when there are no in-flight HTTP requests.\n\nEach instance of `Imagekitio::Client` has its own HTTP connection pool with a default size of 99. As such, we recommend instantiating the client once per application in most settings.\n\nWhen all available connections from the pool are checked out, requests wait for a new connection to become available, with queue time counting towards the request timeout.\n\nUnless otherwise specified, other classes in the SDK do not have locks protecting their underlying data structure.\n\n## Sorbet\n\nThis library provides comprehensive [RBI](https://sorbet.org/docs/rbi) definitions, and has no dependency on sorbet-runtime.\n\nYou can provide typesafe request parameters like so:\n\n```ruby\nimage_kit.assets.upload(\n  file: StringIO.new("https://www.example.com/public-url.jpg"),\n  file_name: "file-name.jpg"\n)\n```\n\nOr, equivalently:\n\n```ruby\n# Hashes work, but are not typesafe:\nimage_kit.assets.upload(\n  file: StringIO.new("https://www.example.com/public-url.jpg"),\n  file_name: "file-name.jpg"\n)\n\n# You can also splat a full Params class:\nparams = Imagekitio::AssetUploadParams.new(\n  file: StringIO.new("https://www.example.com/public-url.jpg"),\n  file_name: "file-name.jpg"\n)\nimage_kit.assets.upload(**params)\n```\n\n### Enums\n\nSince this library does not depend on `sorbet-runtime`, it cannot provide [`T::Enum`](https://sorbet.org/docs/tenum) instances. Instead, we provide "tagged symbols" instead, which is always a primitive at runtime:\n\n```ruby\n# :ASC_NAME\nputs(Imagekitio::AssetListParams::Sort::ASC_NAME)\n\n# Revealed type: `T.all(Imagekitio::AssetListParams::Sort, Symbol)`\nT.reveal_type(Imagekitio::AssetListParams::Sort::ASC_NAME)\n```\n\nEnum parameters have a "relaxed" type, so you can either pass in enum constants or their literal value:\n\n```ruby\n# Using the enum constants preserves the tagged type information:\nimage_kit.assets.list(\n  sort: Imagekitio::AssetListParams::Sort::ASC_NAME,\n  # …\n)\n\n# Literal values are also permissible:\nimage_kit.assets.list(\n  sort: :ASC_NAME,\n  # …\n)\n```\n\n## Versioning\n\nThis package follows [SemVer](https://semver.org/spec/v2.0.0.html) conventions. As the library is in initial development and has a major version of `0`, APIs may change at any time.\n\nThis package considers improvements to the (non-runtime) `*.rbi` and `*.rbs` type definitions to be non-breaking changes.\n\n## Requirements\n\nRuby 3.2.0 or higher.\n\n## Contributing\n\nSee [the contributing documentation](https://github.com/imagekit-developer/imagekit-ruby/tree/master/CONTRIBUTING.md).\n',
  },
  {
    language: 'typescript',
    content:
      "# Image Kit TypeScript API Library\n\n[![NPM version](https://img.shields.io/npm/v/@imagekit/nodejs.svg?label=npm%20(stable))](https://npmjs.org/package/@imagekit/nodejs) ![npm bundle size](https://img.shields.io/bundlephobia/minzip/@imagekit/nodejs)\n\nThis library provides convenient access to the Image Kit REST API from server-side TypeScript or JavaScript.\n\n\n\nThe REST API documentation can be found on [imagekit.io](https://imagekit.io/docs/api-reference). The full API of this library can be found in [api.md](api.md).\n\n\n\n## MCP Server\n\nUse the Image Kit MCP Server to enable AI assistants to interact with this API, allowing them to explore endpoints, make test requests, and use documentation to help integrate this SDK into your application.\n\n[![Add to Cursor](https://cursor.com/deeplink/mcp-install-dark.svg)](https://cursor.com/en-US/install-mcp?name=%40imagekit%2Fapi-mcp&config=eyJjb21tYW5kIjoibnB4IiwiYXJncyI6WyIteSIsIkBpbWFnZWtpdC9hcGktbWNwIl0sImVudiI6eyJJTUFHRUtJVF9QUklWQVRFX0tFWSI6Ik15IFByaXZhdGUgS2V5IiwiT1BUSU9OQUxfSU1BR0VLSVRfSUdOT1JFU19USElTIjoiTXkgUGFzc3dvcmQiLCJJTUFHRUtJVF9XRUJIT09LX1NFQ1JFVCI6Ik15IFdlYmhvb2sgU2VjcmV0In19)\n[![Install in VS Code](https://img.shields.io/badge/_-Add_to_VS_Code-blue?style=for-the-badge&logo=data:image/svg%2bxml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHZpZXdCb3g9IjAgMCA0MCA0MCI+PHBhdGggZmlsbD0iI0VFRSIgZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNMzAuMjM1IDM5Ljg4NGEyLjQ5MSAyLjQ5MSAwIDAgMS0xLjc4MS0uNzNMMTIuNyAyNC43OGwtMy40NiAyLjYyNC0zLjQwNiAyLjU4MmExLjY2NSAxLjY2NSAwIDAgMS0xLjA4Mi4zMzggMS42NjQgMS42NjQgMCAwIDEtMS4wNDYtLjQzMWwtMi4yLTJhMS42NjYgMS42NjYgMCAwIDEgMC0yLjQ2M0w3LjQ1OCAyMCA0LjY3IDE3LjQ1MyAxLjUwNyAxNC41N2ExLjY2NSAxLjY2NSAwIDAgMSAwLTIuNDYzbDIuMi0yYTEuNjY1IDEuNjY1IDAgMCAxIDIuMTMtLjA5N2w2Ljg2MyA1LjIwOUwyOC40NTIuODQ0YTIuNDg4IDIuNDg4IDAgMCAxIDEuODQxLS43MjljLjM1MS4wMDkuNjk5LjA5MSAxLjAxOS4yNDVsOC4yMzYgMy45NjFhMi41IDIuNSAwIDAgMSAxLjQxNSAyLjI1M3YuMDk5LS4wNDVWMzMuMzd2LS4wNDUuMDk1YTIuNTAxIDIuNTAxIDAgMCAxLTEuNDE2IDIuMjU3bC04LjIzNSAzLjk2MWEyLjQ5MiAyLjQ5MiAwIDAgMS0xLjA3Ny4yNDZabS43MTYtMjguOTQ3LTExLjk0OCA5LjA2MiAxMS45NTIgOS4wNjUtLjAwNC0xOC4xMjdaIi8+PC9zdmc+)](https://vscode.stainless.com/mcp/%7B%22name%22%3A%22%40imagekit%2Fapi-mcp%22%2C%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22%40imagekit%2Fapi-mcp%22%5D%2C%22env%22%3A%7B%22IMAGEKIT_PRIVATE_KEY%22%3A%22My%20Private%20Key%22%2C%22OPTIONAL_IMAGEKIT_IGNORES_THIS%22%3A%22My%20Password%22%2C%22IMAGEKIT_WEBHOOK_SECRET%22%3A%22My%20Webhook%20Secret%22%7D%7D)\n\n> Note: You may need to set environment variables in your MCP client.\n\n## Installation\n\n```sh\nnpm install @imagekit/nodejs\n```\n\n\n\n## Usage\n\nThe full API of this library can be found in [api.md](api.md).\n\n<!-- prettier-ignore -->\n```js\nimport ImageKit from '@imagekit/nodejs';\n\nconst client = new ImageKit({\n  privateKey: process.env['IMAGEKIT_PRIVATE_KEY'], // This is the default and can be omitted\n  password: process.env['OPTIONAL_IMAGEKIT_IGNORES_THIS'], // This is the default and can be omitted\n});\n\nconst uploadResponse = await client.assets.upload({\n  file: fs.createReadStream('path/to/file'),\n  file_name: 'file-name.jpg',\n});\n```\n\n\n\n### Request & Response types\n\nThis library includes TypeScript definitions for all request params and response fields. You may import and use them like so:\n\n<!-- prettier-ignore -->\n```ts\nimport ImageKit from '@imagekit/nodejs';\n\nconst client = new ImageKit({\n  privateKey: process.env['IMAGEKIT_PRIVATE_KEY'], // This is the default and can be omitted\n  password: process.env['OPTIONAL_IMAGEKIT_IGNORES_THIS'], // This is the default and can be omitted\n});\n\nconst params: ImageKit.AssetUploadParams = {\n  file: fs.createReadStream('path/to/file'),\n  file_name: 'file-name.jpg',\n};\nconst uploadResponse: ImageKit.UploadResponse = await client.assets.upload(params);\n```\n\nDocumentation for each method, request param, and response field are available in docstrings and will appear on hover in most modern editors.\n\n## File uploads\n\nRequest parameters that correspond to file uploads can be passed in many different forms:\n- `File` (or an object with the same structure)\n- a `fetch` `Response` (or an object with the same structure)\n- an `fs.ReadStream`\n- the return value of our `toFile` helper\n\n```ts\nimport fs from 'fs';\nimport ImageKit, { toFile } from '@imagekit/nodejs';\n\nconst client = new ImageKit();\n\n// If you have access to Node `fs` we recommend using `fs.createReadStream()`:\nawait client.assets.upload({ file: fs.createReadStream('/path/to/file'), file_name: 'file_name' });\n\n// Or if you have the web `File` API you can pass a `File` instance:\nawait client.assets.upload({ file: new File(['my bytes'], 'file'), file_name: 'file_name' });\n\n// You can also pass a `fetch` `Response`:\nawait client.assets.upload({ file: await fetch('https://somesite/file'), file_name: 'file_name' });\n\n// Finally, if none of the above are convenient, you can use our `toFile` helper:\nawait client.assets.upload({\n  file: await toFile(Buffer.from('my bytes'), 'file'),\n  file_name: 'file_name',\n});\nawait client.assets.upload({\n  file: await toFile(new Uint8Array([0, 1, 2]), 'file'),\n  file_name: 'file_name',\n});\n```\n\n\n\n## Handling errors\n\nWhen the library is unable to connect to the API,\nor if the API returns a non-success status code (i.e., 4xx or 5xx response),\na subclass of `APIError` will be thrown:\n\n<!-- prettier-ignore -->\n```ts\nconst uploadResponse = await client.assets\n  .upload({ file: fs.createReadStream('path/to/file'), file_name: 'file-name.jpg' })\n  .catch(async (err) => {\n    if (err instanceof ImageKit.APIError) {\n      console.log(err.status); // 400\n      console.log(err.name); // BadRequestError\n      console.log(err.headers); // {server: 'nginx', ...}\n    } else {\n      throw err;\n    }\n  });\n```\n\nError codes are as follows:\n\n| Status Code | Error Type                 |\n| ----------- | -------------------------- |\n| 400         | `BadRequestError`          |\n| 401         | `AuthenticationError`      |\n| 403         | `PermissionDeniedError`    |\n| 404         | `NotFoundError`            |\n| 422         | `UnprocessableEntityError` |\n| 429         | `RateLimitError`           |\n| >=500       | `InternalServerError`      |\n| N/A         | `APIConnectionError`       |\n\n### Retries\n\nCertain errors will be automatically retried 2 times by default, with a short exponential backoff.\nConnection errors (for example, due to a network connectivity problem), 408 Request Timeout, 409 Conflict,\n429 Rate Limit, and >=500 Internal errors will all be retried by default.\n\nYou can use the `maxRetries` option to configure or disable this:\n\n<!-- prettier-ignore -->\n```js\n// Configure the default for all requests:\nconst client = new ImageKit({\n  maxRetries: 0, // default is 2\n});\n\n// Or, configure per-request:\nawait client.assets.upload({ file: fs.createReadStream('path/to/file'), file_name: 'file-name.jpg' }, {\n  maxRetries: 5,\n});\n```\n\n### Timeouts\n\nRequests time out after 1 minute by default. You can configure this with a `timeout` option:\n\n<!-- prettier-ignore -->\n```ts\n// Configure the default for all requests:\nconst client = new ImageKit({\n  timeout: 20 * 1000, // 20 seconds (default is 1 minute)\n});\n\n// Override per-request:\nawait client.assets.upload({ file: fs.createReadStream('path/to/file'), file_name: 'file-name.jpg' }, {\n  timeout: 5 * 1000,\n});\n```\n\nOn timeout, an `APIConnectionTimeoutError` is thrown.\n\nNote that requests which time out will be [retried twice by default](#retries).\n\n## Auto-pagination\n\nList methods in the ImageKit API are paginated.\nYou can use the `for await … of` syntax to iterate through items across all pages:\n\n```ts\nasync function fetchAllAssetListResponses(params) {\n  const allAssetListResponses = [];\n  // Automatically fetches more pages as needed.\n  for await (const assetListResponse of client.assets.list()) {\n    allAssetListResponses.push(assetListResponse);\n  }\n  return allAssetListResponses;\n}\n```\n\nAlternatively, you can request a single page at a time:\n\n```ts\nlet page = await client.assets.list();\nfor (const assetListResponse of page.items) {\n  console.log(assetListResponse);\n}\n\n// Convenience methods are provided for manually paginating:\nwhile (page.hasNextPage()) {\n  page = await page.getNextPage();\n  // ...\n}\n```\n\n\n\n## Advanced Usage\n\n### Accessing raw Response data (e.g., headers)\n\nThe \"raw\" `Response` returned by `fetch()` can be accessed through the `.asResponse()` method on the `APIPromise` type that all methods return.\nThis method returns as soon as the headers for a successful response are received and does not consume the response body, so you are free to write custom parsing or streaming logic.\n\nYou can also use the `.withResponse()` method to get the raw `Response` along with the parsed data.\nUnlike `.asResponse()` this method consumes the body, returning once it is parsed.\n\n<!-- prettier-ignore -->\n```ts\nconst client = new ImageKit();\n\nconst response = await client.assets\n  .upload({ file: fs.createReadStream('path/to/file'), file_name: 'file-name.jpg' })\n  .asResponse();\nconsole.log(response.headers.get('X-My-Header'));\nconsole.log(response.statusText); // access the underlying Response object\n\nconst { data: uploadResponse, response: raw } = await client.assets\n  .upload({ file: fs.createReadStream('path/to/file'), file_name: 'file-name.jpg' })\n  .withResponse();\nconsole.log(raw.headers.get('X-My-Header'));\nconsole.log(uploadResponse);\n```\n\n### Logging\n\n> [!IMPORTANT]\n> All log messages are intended for debugging only. The format and content of log messages\n> may change between releases.\n\n#### Log levels\n\nThe log level can be configured in two ways:\n\n1. Via the `IMAGE_KIT_LOG` environment variable\n2. Using the `logLevel` client option (overrides the environment variable if set)\n\n```ts\nimport ImageKit from '@imagekit/nodejs';\n\nconst client = new ImageKit({\n  logLevel: 'debug', // Show all log messages\n});\n```\n\nAvailable log levels, from most to least verbose:\n\n- `'debug'` - Show debug messages, info, warnings, and errors\n- `'info'` - Show info messages, warnings, and errors\n- `'warn'` - Show warnings and errors (default)\n- `'error'` - Show only errors\n- `'off'` - Disable all logging\n\nAt the `'debug'` level, all HTTP requests and responses are logged, including headers and bodies.\nSome authentication-related headers are redacted, but sensitive data in request and response bodies\nmay still be visible.\n\n#### Custom logger\n\nBy default, this library logs to `globalThis.console`. You can also provide a custom logger.\nMost logging libraries are supported, including [pino](https://www.npmjs.com/package/pino), [winston](https://www.npmjs.com/package/winston), [bunyan](https://www.npmjs.com/package/bunyan), [consola](https://www.npmjs.com/package/consola), [signale](https://www.npmjs.com/package/signale), and [@std/log](https://jsr.io/@std/log). If your logger doesn't work, please open an issue.\n\nWhen providing a custom logger, the `logLevel` option still controls which messages are emitted, messages\nbelow the configured level will not be sent to your logger.\n\n```ts\nimport ImageKit from '@imagekit/nodejs';\nimport pino from 'pino';\n\nconst logger = pino();\n\nconst client = new ImageKit({\n  logger: logger.child({ name: 'ImageKit' }),\n  logLevel: 'debug', // Send all messages to pino, allowing it to filter\n});\n```\n\n### Making custom/undocumented requests\n\nThis library is typed for convenient access to the documented API. If you need to access undocumented\nendpoints, params, or response properties, the library can still be used.\n\n#### Undocumented endpoints\n\nTo make requests to undocumented endpoints, you can use `client.get`, `client.post`, and other HTTP verbs.\nOptions on the client, such as retries, will be respected when making these requests.\n\n```ts\nawait client.post('/some/path', {\n  body: { some_prop: 'foo' },\n  query: { some_query_arg: 'bar' },\n});\n```\n\n#### Undocumented request params\n\nTo make requests using undocumented parameters, you may use `// @ts-expect-error` on the undocumented\nparameter. This library doesn't validate at runtime that the request matches the type, so any extra values you\nsend will be sent as-is.\n\n```ts\nclient.assets.upload({\n  // ...\n  // @ts-expect-error baz is not yet public\n  baz: 'undocumented option',\n});\n```\n\nFor requests with the `GET` verb, any extra params will be in the query, all other requests will send the\nextra param in the body.\n\nIf you want to explicitly send an extra argument, you can do so with the `query`, `body`, and `headers` request\noptions.\n\n#### Undocumented response properties\n\nTo access undocumented response properties, you may access the response object with `// @ts-expect-error` on\nthe response object, or cast the response object to the requisite type. Like the request params, we do not\nvalidate or strip extra properties from the response from the API.\n\n### Customizing the fetch client\n\nBy default, this library expects a global `fetch` function is defined.\n\nIf you want to use a different `fetch` function, you can either polyfill the global:\n\n```ts\nimport fetch from 'my-fetch';\n\nglobalThis.fetch = fetch;\n```\n\nOr pass it to the client:\n\n```ts\nimport ImageKit from '@imagekit/nodejs';\nimport fetch from 'my-fetch';\n\nconst client = new ImageKit({ fetch });\n```\n\n### Fetch options\n\nIf you want to set custom `fetch` options without overriding the `fetch` function, you can provide a `fetchOptions` object when instantiating the client or making a request. (Request-specific options override client options.)\n\n```ts\nimport ImageKit from '@imagekit/nodejs';\n\nconst client = new ImageKit({\n  fetchOptions: {\n    // `RequestInit` options\n  },\n});\n```\n\n#### Configuring proxies\n\nTo modify proxy behavior, you can provide custom `fetchOptions` that add runtime-specific proxy\noptions to requests:\n\n<img src=\"https://raw.githubusercontent.com/stainless-api/sdk-assets/refs/heads/main/node.svg\" align=\"top\" width=\"18\" height=\"21\"> **Node** <sup>[[docs](https://github.com/nodejs/undici/blob/main/docs/docs/api/ProxyAgent.md#example---proxyagent-with-fetch)]</sup>\n\n```ts\nimport ImageKit from '@imagekit/nodejs';\nimport * as undici from 'undici';\n\nconst proxyAgent = new undici.ProxyAgent('http://localhost:8888');\nconst client = new ImageKit({\n  fetchOptions: {\n    dispatcher: proxyAgent,\n  },\n});\n```\n\n<img src=\"https://raw.githubusercontent.com/stainless-api/sdk-assets/refs/heads/main/bun.svg\" align=\"top\" width=\"18\" height=\"21\"> **Bun** <sup>[[docs](https://bun.sh/guides/http/proxy)]</sup>\n\n```ts\nimport ImageKit from '@imagekit/nodejs';\n\nconst client = new ImageKit({\n  fetchOptions: {\n    proxy: 'http://localhost:8888',\n  },\n});\n```\n\n<img src=\"https://raw.githubusercontent.com/stainless-api/sdk-assets/refs/heads/main/deno.svg\" align=\"top\" width=\"18\" height=\"21\"> **Deno** <sup>[[docs](https://docs.deno.com/api/deno/~/Deno.createHttpClient)]</sup>\n\n```ts\nimport ImageKit from 'npm:@imagekit/nodejs';\n\nconst httpClient = Deno.createHttpClient({ proxy: { url: 'http://localhost:8888' } });\nconst client = new ImageKit({\n  fetchOptions: {\n    client: httpClient,\n  },\n});\n```\n\n## Frequently Asked Questions\n\n## Semantic versioning\n\nThis package generally follows [SemVer](https://semver.org/spec/v2.0.0.html) conventions, though certain backwards-incompatible changes may be released as minor versions:\n\n1. Changes that only affect static types, without breaking runtime behavior.\n2. Changes to library internals which are technically public but not intended or documented for external use. _(Please open a GitHub issue to let us know if you are relying on such internals.)_\n3. Changes that we do not expect to impact the vast majority of users in practice.\n\nWe take backwards-compatibility seriously and work hard to ensure you can rely on a smooth upgrade experience.\n\nWe are keen for your feedback; please open an [issue](https://www.github.com/imagekit-developer/imagekit-nodejs/issues) with questions, bugs, or suggestions.\n\n## Requirements\n\nTypeScript >= 4.9 is supported.\n\nThe following runtimes are supported:\n\n- Web browsers (Up-to-date Chrome, Firefox, Safari, Edge, and more)\n- Node.js 20 LTS or later ([non-EOL](https://endoflife.date/nodejs)) versions.\n- Deno v1.28.0 or higher.\n- Bun 1.0 or later.\n- Cloudflare Workers.\n- Vercel Edge Runtime.\n- Jest 28 or greater with the `\"node\"` environment (`\"jsdom\"` is not supported at this time).\n- Nitro v2.6 or greater.\n\nNote that React Native is not supported at this time.\n\nIf you are interested in other runtime environments, please open or upvote an issue on GitHub.\n\n## Contributing\n\nSee [the contributing documentation](./CONTRIBUTING.md).\n",
  },
  {
    language: 'csharp',
    content:
      '# Image Kit C# API Library\n\nThe Image Kit C# SDK provides convenient access to the [Image Kit REST API](https://imagekit.io/docs/api-reference) from applications written in   C#.\n\n## Installation\n\n```bash\ngit clone git@github.com:stainless-sdks/imagekit-csharp.git\ndotnet add reference imagekit-csharp/src/Imagekit\n```\n\n## Requirements\n\nThis library requires .NET Standard 2.0 or later.\n\n## Usage\n\nSee the [`examples`](examples) directory for complete and runnable examples.\n\n```csharp\nImageKitClient client = new();\n\nAssetUploadParams parameters = new()\n{\n    File = Encoding.UTF8.GetBytes("https://www.example.com/public-url.jpg"),\n    FileName = "file-name.jpg",\n};\n\nvar uploadResponse = await client.Assets.Upload(parameters);\n\nConsole.WriteLine(uploadResponse);\n```',
  },
];

const INDEX_OPTIONS = {
  fields: [
    'name',
    'endpoint',
    'summary',
    'description',
    'qualified',
    'stainlessPath',
    'content',
    'sectionContext',
  ],
  storeFields: ['kind', '_original'],
  searchOptions: {
    prefix: true,
    fuzzy: 0.1,
    boost: {
      name: 5,
      stainlessPath: 3,
      endpoint: 3,
      qualified: 3,
      summary: 2,
      content: 1,
      description: 1,
    } as Record<string, number>,
  },
};

/**
 * Self-contained local search engine backed by MiniSearch.
 * Method data is embedded at SDK build time; prose documents
 * can be loaded from an optional docs directory at runtime.
 */
export class LocalDocsSearch {
  private methodIndex: MiniSearch<MiniSearchDocument>;
  private proseIndex: MiniSearch<MiniSearchDocument>;

  private constructor() {
    this.methodIndex = new MiniSearch<MiniSearchDocument>(INDEX_OPTIONS);
    this.proseIndex = new MiniSearch<MiniSearchDocument>(INDEX_OPTIONS);
  }

  static async create(opts?: { docsDir?: string }): Promise<LocalDocsSearch> {
    const instance = new LocalDocsSearch();
    instance.indexMethods(EMBEDDED_METHODS);
    for (const readme of EMBEDDED_READMES) {
      instance.indexProse(readme.content, `readme:${readme.language}`);
    }
    if (opts?.docsDir) {
      await instance.loadDocsDirectory(opts.docsDir);
    }
    return instance;
  }

  search(props: {
    query: string;
    language?: string;
    detail?: string;
    maxResults?: number;
    maxLength?: number;
  }): SearchResult {
    const { query, language = 'typescript', detail = 'default', maxResults = 5, maxLength = 100_000 } = props;

    const useMarkdown = detail === 'verbose' || detail === 'high';

    // Search both indices and merge results by score.
    // Filter prose hits so language-tagged content (READMEs and docs with
    // frontmatter) only matches the requested language.
    const methodHits = this.methodIndex
      .search(query)
      .map((hit) => ({ ...hit, _kind: 'http_method' as const }));
    const proseHits = this.proseIndex
      .search(query)
      .filter((hit) => {
        const source = ((hit as Record<string, unknown>)['_original'] as ProseChunk | undefined)?.source;
        if (!source) return true;
        // Check for language-tagged sources: "readme:<lang>" or "lang:<lang>:<filename>"
        let taggedLang: string | undefined;
        if (source.startsWith('readme:')) taggedLang = source.slice('readme:'.length);
        else if (source.startsWith('lang:')) taggedLang = source.split(':')[1];
        if (!taggedLang) return true;
        return taggedLang === language || (language === 'javascript' && taggedLang === 'typescript');
      })
      .map((hit) => ({ ...hit, _kind: 'prose' as const }));
    const merged = [...methodHits, ...proseHits].sort((a, b) => b.score - a.score);
    const top = merged.slice(0, maxResults);

    const fullResults: (string | Record<string, unknown>)[] = [];

    for (const hit of top) {
      const original = (hit as Record<string, unknown>)['_original'];
      if (hit._kind === 'http_method') {
        const m = original as MethodEntry;
        if (useMarkdown && m.markdown) {
          fullResults.push(m.markdown);
        } else {
          // Use per-language data when available, falling back to the
          // top-level fields (which are TypeScript-specific in the
          // legacy codepath).
          const langData = m.perLanguage?.[language];
          fullResults.push({
            method: langData?.method ?? m.qualified,
            summary: m.summary,
            description: m.description,
            endpoint: `${m.httpMethod.toUpperCase()} ${m.endpoint}`,
            ...(langData?.example ? { example: langData.example } : {}),
            ...(m.params ? { params: m.params } : {}),
            ...(m.response ? { response: m.response } : {}),
          });
        }
      } else {
        const c = original as ProseChunk;
        fullResults.push({
          content: c.content,
          ...(c.source ? { source: c.source } : {}),
        });
      }
    }

    let totalLength = 0;
    const results: (string | Record<string, unknown>)[] = [];
    for (const result of fullResults) {
      const len = typeof result === 'string' ? result.length : JSON.stringify(result).length;
      totalLength += len;
      if (totalLength > maxLength) break;
      results.push(result);
    }

    if (results.length < fullResults.length) {
      results.unshift(`Truncated; showing ${results.length} of ${fullResults.length} results.`);
    }

    return { results };
  }

  private indexMethods(methods: MethodEntry[]): void {
    const docs: MiniSearchDocument[] = methods.map((m, i) => ({
      id: `method-${i}`,
      kind: 'http_method' as const,
      name: m.name,
      endpoint: m.endpoint,
      summary: m.summary,
      description: m.description,
      qualified: m.qualified,
      stainlessPath: m.stainlessPath,
      _original: m as unknown as Record<string, unknown>,
    }));
    if (docs.length > 0) {
      this.methodIndex.addAll(docs);
    }
  }

  private async loadDocsDirectory(docsDir: string): Promise<void> {
    let entries;
    try {
      entries = await fs.readdir(docsDir, { withFileTypes: true });
    } catch (err) {
      getLogger().warn({ err, docsDir }, 'Could not read docs directory');
      return;
    }

    const files = entries
      .filter((e) => e.isFile())
      .filter((e) => e.name.endsWith('.md') || e.name.endsWith('.markdown') || e.name.endsWith('.json'));

    for (const file of files) {
      try {
        const filePath = path.join(docsDir, file.name);
        const content = await fs.readFile(filePath, 'utf-8');

        if (file.name.endsWith('.json')) {
          const texts = extractTexts(JSON.parse(content));
          if (texts.length > 0) {
            this.indexProse(texts.join('\n\n'), file.name);
          }
        } else {
          // Parse optional YAML frontmatter for language tagging.
          // Files with a "language" field in frontmatter will only
          // surface in searches for that language.
          //
          // Example:
          //   ---
          //   language: python
          //   ---
          //   # Error handling in Python
          //   ...
          const frontmatter = parseFrontmatter(content);
          const source = frontmatter.language ? `lang:${frontmatter.language}:${file.name}` : file.name;
          this.indexProse(content, source);
        }
      } catch (err) {
        getLogger().warn({ err, file: file.name }, 'Failed to index docs file');
      }
    }
  }

  private indexProse(markdown: string, source: string): void {
    const chunks = chunkMarkdown(markdown);
    const baseId = this.proseIndex.documentCount;

    const docs: MiniSearchDocument[] = chunks.map((chunk, i) => ({
      id: `prose-${baseId + i}`,
      kind: 'prose' as const,
      content: chunk.content,
      ...(chunk.sectionContext != null ? { sectionContext: chunk.sectionContext } : {}),
      _original: { ...chunk, source } as unknown as Record<string, unknown>,
    }));

    if (docs.length > 0) {
      this.proseIndex.addAll(docs);
    }
  }
}

/** Lightweight markdown chunker — splits on headers, chunks by word count. */
function chunkMarkdown(markdown: string): { content: string; tag: string; sectionContext?: string }[] {
  // Strip YAML frontmatter
  const stripped = markdown.replace(/^---\n[\s\S]*?\n---\n?/, '');
  const lines = stripped.split('\n');

  const chunks: { content: string; tag: string; sectionContext?: string }[] = [];
  const headers: string[] = [];
  let current: string[] = [];

  const flush = () => {
    const text = current.join('\n').trim();
    if (!text) return;
    const sectionContext = headers.length > 0 ? headers.join(' > ') : undefined;
    // Split into ~200-word chunks
    const words = text.split(/\s+/);
    for (let i = 0; i < words.length; i += 200) {
      const slice = words.slice(i, i + 200).join(' ');
      if (slice) {
        chunks.push({ content: slice, tag: 'p', ...(sectionContext != null ? { sectionContext } : {}) });
      }
    }
    current = [];
  };

  for (const line of lines) {
    const headerMatch = line.match(/^(#{1,6})\s+(.+)/);
    if (headerMatch) {
      flush();
      const level = headerMatch[1]!.length;
      const text = headerMatch[2]!.trim();
      while (headers.length >= level) headers.pop();
      headers.push(text);
    } else {
      current.push(line);
    }
  }
  flush();

  return chunks;
}

/** Recursively extracts string values from a JSON structure. */
function extractTexts(data: unknown, depth = 0): string[] {
  if (depth > 10) return [];
  if (typeof data === 'string') return data.trim() ? [data] : [];
  if (Array.isArray(data)) return data.flatMap((item) => extractTexts(item, depth + 1));
  if (typeof data === 'object' && data !== null) {
    return Object.values(data).flatMap((v) => extractTexts(v, depth + 1));
  }
  return [];
}

/** Parses YAML frontmatter from a markdown string, extracting the language field if present. */
function parseFrontmatter(markdown: string): { language?: string } {
  const match = markdown.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return {};
  const body = match[1] ?? '';
  const langMatch = body.match(/^language:\s*(.+)$/m);
  return langMatch ? { language: langMatch[1]!.trim() } : {};
}
