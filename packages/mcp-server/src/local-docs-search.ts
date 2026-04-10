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
    endpoint: '/v1/customMetadataFields',
    httpMethod: 'post',
    summary: 'Create new field',
    description:
      'This API creates a new custom metadata field. Once a custom metadata field is created either through this API or using the dashboard UI, its value can be set on the assets. The value of a field for an asset can be set using the media library UI or programmatically through upload or update assets API.\n',
    stainlessPath: '(resource) customMetadataFields > (method) create',
    qualified: 'client.customMetadataFields.create',
    params: [
      'label: string;',
      'name: string;',
      "schema: { type: 'Text' | 'Textarea' | 'Number' | 'Date' | 'Boolean' | 'SingleSelect' | 'MultiSelect'; defaultValue?: string | number | boolean | string | number | boolean[]; isValueRequired?: boolean; maxLength?: number; maxValue?: string | number; minLength?: number; minValue?: string | number; selectOptions?: string | number | boolean[]; };",
    ],
    response:
      "{ id: string; label: string; name: string; schema: { type: 'Text' | 'Textarea' | 'Number' | 'Date' | 'Boolean' | 'SingleSelect' | 'MultiSelect'; defaultValue?: string | number | boolean | string | number | boolean[]; isValueRequired?: boolean; maxLength?: number; maxValue?: string | number; minLength?: number; minValue?: string | number; selectOptions?: string | number | boolean[]; }; }",
    markdown:
      "## create\n\n`client.customMetadataFields.create(label: string, name: string, schema: { type: 'Text' | 'Textarea' | 'Number' | 'Date' | 'Boolean' | 'SingleSelect' | 'MultiSelect'; defaultValue?: string | number | boolean | string | number | boolean[]; isValueRequired?: boolean; maxLength?: number; maxValue?: string | number; minLength?: number; minValue?: string | number; selectOptions?: string | number | boolean[]; }): { id: string; label: string; name: string; schema: object; }`\n\n**post** `/v1/customMetadataFields`\n\nThis API creates a new custom metadata field. Once a custom metadata field is created either through this API or using the dashboard UI, its value can be set on the assets. The value of a field for an asset can be set using the media library UI or programmatically through upload or update assets API.\n\n\n### Parameters\n\n- `label: string`\n  Human readable name of the custom metadata field. This should be unique across all non deleted custom metadata fields. This name is displayed as form field label to the users while setting field value on an asset in the media library UI.\n\n- `name: string`\n  API name of the custom metadata field. This should be unique across all (including deleted) custom metadata fields.\n\n- `schema: { type: 'Text' | 'Textarea' | 'Number' | 'Date' | 'Boolean' | 'SingleSelect' | 'MultiSelect'; defaultValue?: string | number | boolean | string | number | boolean[]; isValueRequired?: boolean; maxLength?: number; maxValue?: string | number; minLength?: number; minValue?: string | number; selectOptions?: string | number | boolean[]; }`\n  - `type: 'Text' | 'Textarea' | 'Number' | 'Date' | 'Boolean' | 'SingleSelect' | 'MultiSelect'`\n    Type of the custom metadata field.\n  - `defaultValue?: string | number | boolean | string | number | boolean[]`\n    The default value for this custom metadata field. This property is only required if `isValueRequired` property is set to `true`. The value should match the `type` of custom metadata field.\n\n  - `isValueRequired?: boolean`\n    Sets this custom metadata field as required. Setting custom metadata fields on an asset will throw error if the value for all required fields are not present in upload or update asset API request body.\n\n  - `maxLength?: number`\n    Maximum length of string. Only set this property if `type` is set to `Text` or `Textarea`.\n\n  - `maxValue?: string | number`\n    Maximum value of the field. Only set this property if field type is `Date` or `Number`. For `Date` type field, set the minimum date in ISO8601 string format. For `Number` type field, set the minimum numeric value.\n\n  - `minLength?: number`\n    Minimum length of string. Only set this property if `type` is set to `Text` or `Textarea`.\n\n  - `minValue?: string | number`\n    Minimum value of the field. Only set this property if field type is `Date` or `Number`. For `Date` type field, set the minimum date in ISO8601 string format. For `Number` type field, set the minimum numeric value.\n\n  - `selectOptions?: string | number | boolean[]`\n    An array of allowed values. This property is only required if `type` property is set to `SingleSelect` or `MultiSelect`.\n\n\n### Returns\n\n- `{ id: string; label: string; name: string; schema: { type: 'Text' | 'Textarea' | 'Number' | 'Date' | 'Boolean' | 'SingleSelect' | 'MultiSelect'; defaultValue?: string | number | boolean | string | number | boolean[]; isValueRequired?: boolean; maxLength?: number; maxValue?: string | number; minLength?: number; minValue?: string | number; selectOptions?: string | number | boolean[]; }; }`\n  Object containing details of a custom metadata field.\n\n  - `id: string`\n  - `label: string`\n  - `name: string`\n  - `schema: { type: 'Text' | 'Textarea' | 'Number' | 'Date' | 'Boolean' | 'SingleSelect' | 'MultiSelect'; defaultValue?: string | number | boolean | string | number | boolean[]; isValueRequired?: boolean; maxLength?: number; maxValue?: string | number; minLength?: number; minValue?: string | number; selectOptions?: string | number | boolean[]; }`\n\n### Example\n\n```typescript\nimport ImageKit from '@imagekit/nodejs';\n\nconst client = new ImageKit();\n\nconst customMetadataField = await client.customMetadataFields.create({\n  label: 'price',\n  name: 'price',\n  schema: { type: 'Number' },\n});\n\nconsole.log(customMetadataField);\n```",
    perLanguage: {
      cli: {
        method: 'customMetadataFields create',
        example:
          "imagekit custom-metadata-fields create \\\n  --private-key 'My Private Key' \\\n  --password 'My Password' \\\n  --label price \\\n  --name price \\\n  --schema '{type: Number}'",
      },
      csharp: {
        method: 'CustomMetadataFields.Create',
        example:
          'CustomMetadataFieldCreateParams parameters = new()\n{\n    Label = "price",\n    Name = "price",\n    Schema = new()\n    {\n        Type = Type.Number,\n        DefaultValue = new(\n\n            [\n                new UnnamedSchemaWithArrayParent1(true),\n                new UnnamedSchemaWithArrayParent1(10),\n                new UnnamedSchemaWithArrayParent1("Hello"),\n            ]\n        ),\n        IsValueRequired = true,\n        MaxLength = 0,\n        MaxValue = 3000,\n        MinLength = 0,\n        MinValue = 1000,\n        SelectOptions =\n        [\n            "small", "medium", "large", 30, 40, true\n        ],\n    },\n};\n\nvar customMetadataField = await client.CustomMetadataFields.Create(parameters);\n\nConsole.WriteLine(customMetadataField);',
      },
      go: {
        method: 'client.CustomMetadataFields.New',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/imagekit-developer/imagekit-go"\n\t"github.com/imagekit-developer/imagekit-go/option"\n)\n\nfunc main() {\n\tclient := imagekit.NewClient(\n\t\toption.WithPrivateKey("My Private Key"),\n\t\toption.WithPassword("My Password"),\n\t)\n\tcustomMetadataField, err := client.CustomMetadataFields.New(context.TODO(), imagekit.CustomMetadataFieldNewParams{\n\t\tLabel: "price",\n\t\tName:  "price",\n\t\tSchema: imagekit.CustomMetadataFieldNewParamsSchema{\n\t\t\tType: "Number",\n\t\t\tMinValue: imagekit.CustomMetadataFieldNewParamsSchemaMinValueUnion{\n\t\t\t\tOfFloat: imagekit.Float(1000),\n\t\t\t},\n\t\t\tMaxValue: imagekit.CustomMetadataFieldNewParamsSchemaMaxValueUnion{\n\t\t\t\tOfFloat: imagekit.Float(3000),\n\t\t\t},\n\t\t},\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", customMetadataField.ID)\n}\n',
      },
      http: {
        example:
          'curl https://api.imagekit.io/v1/customMetadataFields \\\n    -H \'Content-Type: application/json\' \\\n    -u "$IMAGEKIT_PRIVATE_KEY:OPTIONAL_IMAGEKIT_IGNORES_THIS" \\\n    -d \'{\n          "label": "price",\n          "name": "price",\n          "schema": {\n            "type": "Number",\n            "maxValue": 3000,\n            "minValue": 1000\n          }\n        }\'',
      },
      java: {
        method: 'customMetadataFields().create',
        example:
          'package com.imagekit.api.example;\n\nimport com.imagekit.api.client.ImageKitClient;\nimport com.imagekit.api.client.okhttp.ImageKitOkHttpClient;\nimport com.imagekit.api.models.custommetadatafields.CustomMetadataField;\nimport com.imagekit.api.models.custommetadatafields.CustomMetadataFieldCreateParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        ImageKitClient client = ImageKitOkHttpClient.fromEnv();\n\n        CustomMetadataFieldCreateParams params = CustomMetadataFieldCreateParams.builder()\n            .label("price")\n            .name("price")\n            .schema(CustomMetadataFieldCreateParams.Schema.builder()\n                .type(CustomMetadataFieldCreateParams.Schema.Type.NUMBER)\n                .build())\n            .build();\n        CustomMetadataField customMetadataField = client.customMetadataFields().create(params);\n    }\n}',
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
          "import ImageKit from '@imagekit/nodejs';\n\nconst client = new ImageKit({\n  privateKey: process.env['IMAGEKIT_PRIVATE_KEY'], // This is the default and can be omitted\n  password: process.env['OPTIONAL_IMAGEKIT_IGNORES_THIS'], // This is the default and can be omitted\n});\n\nconst customMetadataField = await client.customMetadataFields.create({\n  label: 'price',\n  name: 'price',\n  schema: {\n    type: 'Number',\n    minValue: 1000,\n    maxValue: 3000,\n  },\n});\n\nconsole.log(customMetadataField.id);",
      },
    },
  },
  {
    name: 'list',
    endpoint: '/v1/customMetadataFields',
    httpMethod: 'get',
    summary: 'List all fields',
    description:
      'This API returns the array of created custom metadata field objects. By default the API returns only non deleted field objects, but you can include deleted fields in the API response.\n\nYou can also filter results by a specific folder path to retrieve custom metadata fields applicable at that location. This path-specific filtering is useful when using the **Path policy** feature to determine which custom metadata fields are selected for a given path.\n',
    stainlessPath: '(resource) customMetadataFields > (method) list',
    qualified: 'client.customMetadataFields.list',
    params: ['folderPath?: string;', 'includeDeleted?: boolean;'],
    response:
      "{ id: string; label: string; name: string; schema: { type: 'Text' | 'Textarea' | 'Number' | 'Date' | 'Boolean' | 'SingleSelect' | 'MultiSelect'; defaultValue?: string | number | boolean | string | number | boolean[]; isValueRequired?: boolean; maxLength?: number; maxValue?: string | number; minLength?: number; minValue?: string | number; selectOptions?: string | number | boolean[]; }; }[]",
    markdown:
      "## list\n\n`client.customMetadataFields.list(folderPath?: string, includeDeleted?: boolean): object[]`\n\n**get** `/v1/customMetadataFields`\n\nThis API returns the array of created custom metadata field objects. By default the API returns only non deleted field objects, but you can include deleted fields in the API response.\n\nYou can also filter results by a specific folder path to retrieve custom metadata fields applicable at that location. This path-specific filtering is useful when using the **Path policy** feature to determine which custom metadata fields are selected for a given path.\n\n\n### Parameters\n\n- `folderPath?: string`\n  The folder path (e.g., `/path/to/folder`) for which to retrieve applicable custom metadata fields. Useful for determining path-specific field selections when the [Path policy](https://imagekit.io/docs/dam/path-policy) feature is in use.\n\n\n- `includeDeleted?: boolean`\n  Set it to `true` to include deleted field objects in the API response.\n\n\n### Returns\n\n- `{ id: string; label: string; name: string; schema: { type: 'Text' | 'Textarea' | 'Number' | 'Date' | 'Boolean' | 'SingleSelect' | 'MultiSelect'; defaultValue?: string | number | boolean | string | number | boolean[]; isValueRequired?: boolean; maxLength?: number; maxValue?: string | number; minLength?: number; minValue?: string | number; selectOptions?: string | number | boolean[]; }; }[]`\n\n### Example\n\n```typescript\nimport ImageKit from '@imagekit/nodejs';\n\nconst client = new ImageKit();\n\nconst customMetadataFields = await client.customMetadataFields.list();\n\nconsole.log(customMetadataFields);\n```",
    perLanguage: {
      cli: {
        method: 'customMetadataFields list',
        example:
          "imagekit custom-metadata-fields list \\\n  --private-key 'My Private Key' \\\n  --password 'My Password'",
      },
      csharp: {
        method: 'CustomMetadataFields.List',
        example:
          'CustomMetadataFieldListParams parameters = new();\n\nvar customMetadataFields = await client.CustomMetadataFields.List(parameters);\n\nConsole.WriteLine(customMetadataFields);',
      },
      go: {
        method: 'client.CustomMetadataFields.List',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/imagekit-developer/imagekit-go"\n\t"github.com/imagekit-developer/imagekit-go/option"\n)\n\nfunc main() {\n\tclient := imagekit.NewClient(\n\t\toption.WithPrivateKey("My Private Key"),\n\t\toption.WithPassword("My Password"),\n\t)\n\tcustomMetadataFields, err := client.CustomMetadataFields.List(context.TODO(), imagekit.CustomMetadataFieldListParams{})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", customMetadataFields)\n}\n',
      },
      http: {
        example:
          'curl https://api.imagekit.io/v1/customMetadataFields \\\n    -u "$IMAGEKIT_PRIVATE_KEY:OPTIONAL_IMAGEKIT_IGNORES_THIS"',
      },
      java: {
        method: 'customMetadataFields().list',
        example:
          'package com.imagekit.api.example;\n\nimport com.imagekit.api.client.ImageKitClient;\nimport com.imagekit.api.client.okhttp.ImageKitOkHttpClient;\nimport com.imagekit.api.models.custommetadatafields.CustomMetadataField;\nimport com.imagekit.api.models.custommetadatafields.CustomMetadataFieldListParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        ImageKitClient client = ImageKitOkHttpClient.fromEnv();\n\n        List<CustomMetadataField> customMetadataFields = client.customMetadataFields().list();\n    }\n}',
      },
      php: {
        method: 'customMetadataFields->list',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(privateKey: 'My Private Key', password: 'My Password');\n\n$customMetadataFields = $client->customMetadataFields->list(\n  folderPath: 'folderPath', includeDeleted: true\n);\n\nvar_dump($customMetadataFields);",
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
    },
  },
  {
    name: 'update',
    endpoint: '/v1/customMetadataFields/{id}',
    httpMethod: 'patch',
    summary: 'Update existing field',
    description: 'This API updates the label or schema of an existing custom metadata field.\n',
    stainlessPath: '(resource) customMetadataFields > (method) update',
    qualified: 'client.customMetadataFields.update',
    params: [
      'id: string;',
      'label?: string;',
      'schema?: { defaultValue?: string | number | boolean | string | number | boolean[]; isValueRequired?: boolean; maxLength?: number; maxValue?: string | number; minLength?: number; minValue?: string | number; selectOptions?: string | number | boolean[]; };',
    ],
    response:
      "{ id: string; label: string; name: string; schema: { type: 'Text' | 'Textarea' | 'Number' | 'Date' | 'Boolean' | 'SingleSelect' | 'MultiSelect'; defaultValue?: string | number | boolean | string | number | boolean[]; isValueRequired?: boolean; maxLength?: number; maxValue?: string | number; minLength?: number; minValue?: string | number; selectOptions?: string | number | boolean[]; }; }",
    markdown:
      "## update\n\n`client.customMetadataFields.update(id: string, label?: string, schema?: { defaultValue?: string | number | boolean | string | number | boolean[]; isValueRequired?: boolean; maxLength?: number; maxValue?: string | number; minLength?: number; minValue?: string | number; selectOptions?: string | number | boolean[]; }): { id: string; label: string; name: string; schema: object; }`\n\n**patch** `/v1/customMetadataFields/{id}`\n\nThis API updates the label or schema of an existing custom metadata field.\n\n\n### Parameters\n\n- `id: string`\n\n- `label?: string`\n  Human readable name of the custom metadata field. This should be unique across all non deleted custom metadata fields. This name is displayed as form field label to the users while setting field value on an asset in the media library UI. This parameter is required if `schema` is not provided.\n\n- `schema?: { defaultValue?: string | number | boolean | string | number | boolean[]; isValueRequired?: boolean; maxLength?: number; maxValue?: string | number; minLength?: number; minValue?: string | number; selectOptions?: string | number | boolean[]; }`\n  An object that describes the rules for the custom metadata key. This parameter is required if `label` is not provided. Note: `type` cannot be updated and will be ignored if sent with the `schema`. The schema will be validated as per the existing `type`.\n\n  - `defaultValue?: string | number | boolean | string | number | boolean[]`\n    The default value for this custom metadata field. This property is only required if `isValueRequired` property is set to `true`. The value should match the `type` of custom metadata field.\n\n  - `isValueRequired?: boolean`\n    Sets this custom metadata field as required. Setting custom metadata fields on an asset will throw error if the value for all required fields are not present in upload or update asset API request body.\n\n  - `maxLength?: number`\n    Maximum length of string. Only set this property if `type` is set to `Text` or `Textarea`.\n\n  - `maxValue?: string | number`\n    Maximum value of the field. Only set this property if field type is `Date` or `Number`. For `Date` type field, set the minimum date in ISO8601 string format. For `Number` type field, set the minimum numeric value.\n\n  - `minLength?: number`\n    Minimum length of string. Only set this property if `type` is set to `Text` or `Textarea`.\n\n  - `minValue?: string | number`\n    Minimum value of the field. Only set this property if field type is `Date` or `Number`. For `Date` type field, set the minimum date in ISO8601 string format. For `Number` type field, set the minimum numeric value.\n\n  - `selectOptions?: string | number | boolean[]`\n    An array of allowed values. This property is only required if `type` property is set to `SingleSelect` or `MultiSelect`.\n\n\n### Returns\n\n- `{ id: string; label: string; name: string; schema: { type: 'Text' | 'Textarea' | 'Number' | 'Date' | 'Boolean' | 'SingleSelect' | 'MultiSelect'; defaultValue?: string | number | boolean | string | number | boolean[]; isValueRequired?: boolean; maxLength?: number; maxValue?: string | number; minLength?: number; minValue?: string | number; selectOptions?: string | number | boolean[]; }; }`\n  Object containing details of a custom metadata field.\n\n  - `id: string`\n  - `label: string`\n  - `name: string`\n  - `schema: { type: 'Text' | 'Textarea' | 'Number' | 'Date' | 'Boolean' | 'SingleSelect' | 'MultiSelect'; defaultValue?: string | number | boolean | string | number | boolean[]; isValueRequired?: boolean; maxLength?: number; maxValue?: string | number; minLength?: number; minValue?: string | number; selectOptions?: string | number | boolean[]; }`\n\n### Example\n\n```typescript\nimport ImageKit from '@imagekit/nodejs';\n\nconst client = new ImageKit();\n\nconst customMetadataField = await client.customMetadataFields.update('id');\n\nconsole.log(customMetadataField);\n```",
    perLanguage: {
      cli: {
        method: 'customMetadataFields update',
        example:
          "imagekit custom-metadata-fields update \\\n  --private-key 'My Private Key' \\\n  --password 'My Password' \\\n  --id id",
      },
      csharp: {
        method: 'CustomMetadataFields.Update',
        example:
          'CustomMetadataFieldUpdateParams parameters = new() { ID = "id" };\n\nvar customMetadataField = await client.CustomMetadataFields.Update(parameters);\n\nConsole.WriteLine(customMetadataField);',
      },
      go: {
        method: 'client.CustomMetadataFields.Update',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/imagekit-developer/imagekit-go"\n\t"github.com/imagekit-developer/imagekit-go/option"\n)\n\nfunc main() {\n\tclient := imagekit.NewClient(\n\t\toption.WithPrivateKey("My Private Key"),\n\t\toption.WithPassword("My Password"),\n\t)\n\tcustomMetadataField, err := client.CustomMetadataFields.Update(\n\t\tcontext.TODO(),\n\t\t"id",\n\t\timagekit.CustomMetadataFieldUpdateParams{\n\t\t\tLabel: imagekit.String("price"),\n\t\t\tSchema: imagekit.CustomMetadataFieldUpdateParamsSchema{\n\t\t\t\tMinValue: imagekit.CustomMetadataFieldUpdateParamsSchemaMinValueUnion{\n\t\t\t\t\tOfFloat: imagekit.Float(1000),\n\t\t\t\t},\n\t\t\t\tMaxValue: imagekit.CustomMetadataFieldUpdateParamsSchemaMaxValueUnion{\n\t\t\t\t\tOfFloat: imagekit.Float(3000),\n\t\t\t\t},\n\t\t\t},\n\t\t},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", customMetadataField.ID)\n}\n',
      },
      http: {
        example:
          'curl https://api.imagekit.io/v1/customMetadataFields/$ID \\\n    -X PATCH \\\n    -u "$IMAGEKIT_PRIVATE_KEY:OPTIONAL_IMAGEKIT_IGNORES_THIS"',
      },
      java: {
        method: 'customMetadataFields().update',
        example:
          'package com.imagekit.api.example;\n\nimport com.imagekit.api.client.ImageKitClient;\nimport com.imagekit.api.client.okhttp.ImageKitOkHttpClient;\nimport com.imagekit.api.models.custommetadatafields.CustomMetadataField;\nimport com.imagekit.api.models.custommetadatafields.CustomMetadataFieldUpdateParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        ImageKitClient client = ImageKitOkHttpClient.fromEnv();\n\n        CustomMetadataField customMetadataField = client.customMetadataFields().update("id");\n    }\n}',
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
          "import ImageKit from '@imagekit/nodejs';\n\nconst client = new ImageKit({\n  privateKey: process.env['IMAGEKIT_PRIVATE_KEY'], // This is the default and can be omitted\n  password: process.env['OPTIONAL_IMAGEKIT_IGNORES_THIS'], // This is the default and can be omitted\n});\n\nconst customMetadataField = await client.customMetadataFields.update('id', {\n  label: 'price',\n  schema: { minValue: 1000, maxValue: 3000 },\n});\n\nconsole.log(customMetadataField.id);",
      },
    },
  },
  {
    name: 'delete',
    endpoint: '/v1/customMetadataFields/{id}',
    httpMethod: 'delete',
    summary: 'Delete a field',
    description:
      'This API deletes a custom metadata field. Even after deleting a custom metadata field, you cannot create any new custom metadata field with the same name.\n',
    stainlessPath: '(resource) customMetadataFields > (method) delete',
    qualified: 'client.customMetadataFields.delete',
    params: ['id: string;'],
    response: '{  }',
    markdown:
      "## delete\n\n`client.customMetadataFields.delete(id: string): {  }`\n\n**delete** `/v1/customMetadataFields/{id}`\n\nThis API deletes a custom metadata field. Even after deleting a custom metadata field, you cannot create any new custom metadata field with the same name.\n\n\n### Parameters\n\n- `id: string`\n\n### Returns\n\n- `{  }`\n\n\n### Example\n\n```typescript\nimport ImageKit from '@imagekit/nodejs';\n\nconst client = new ImageKit();\n\nconst customMetadataField = await client.customMetadataFields.delete('id');\n\nconsole.log(customMetadataField);\n```",
    perLanguage: {
      cli: {
        method: 'customMetadataFields delete',
        example:
          "imagekit custom-metadata-fields delete \\\n  --private-key 'My Private Key' \\\n  --password 'My Password' \\\n  --id id",
      },
      csharp: {
        method: 'CustomMetadataFields.Delete',
        example:
          'CustomMetadataFieldDeleteParams parameters = new() { ID = "id" };\n\nvar customMetadataField = await client.CustomMetadataFields.Delete(parameters);\n\nConsole.WriteLine(customMetadataField);',
      },
      go: {
        method: 'client.CustomMetadataFields.Delete',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/imagekit-developer/imagekit-go"\n\t"github.com/imagekit-developer/imagekit-go/option"\n)\n\nfunc main() {\n\tclient := imagekit.NewClient(\n\t\toption.WithPrivateKey("My Private Key"),\n\t\toption.WithPassword("My Password"),\n\t)\n\tcustomMetadataField, err := client.CustomMetadataFields.Delete(context.TODO(), "id")\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", customMetadataField)\n}\n',
      },
      http: {
        example:
          'curl https://api.imagekit.io/v1/customMetadataFields/$ID \\\n    -X DELETE \\\n    -u "$IMAGEKIT_PRIVATE_KEY:OPTIONAL_IMAGEKIT_IGNORES_THIS"',
      },
      java: {
        method: 'customMetadataFields().delete',
        example:
          'package com.imagekit.api.example;\n\nimport com.imagekit.api.client.ImageKitClient;\nimport com.imagekit.api.client.okhttp.ImageKitOkHttpClient;\nimport com.imagekit.api.models.custommetadatafields.CustomMetadataFieldDeleteParams;\nimport com.imagekit.api.models.custommetadatafields.CustomMetadataFieldDeleteResponse;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        ImageKitClient client = ImageKitOkHttpClient.fromEnv();\n\n        CustomMetadataFieldDeleteResponse customMetadataField = client.customMetadataFields().delete("id");\n    }\n}',
      },
      php: {
        method: 'customMetadataFields->delete',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(privateKey: 'My Private Key', password: 'My Password');\n\n$customMetadataField = $client->customMetadataFields->delete('id');\n\nvar_dump($customMetadataField);",
      },
      python: {
        method: 'custom_metadata_fields.delete',
        example:
          'import os\nfrom imagekitio import ImageKit\n\nclient = ImageKit(\n    private_key=os.environ.get("IMAGEKIT_PRIVATE_KEY"),  # This is the default and can be omitted\n    password=os.environ.get("OPTIONAL_IMAGEKIT_IGNORES_THIS"),  # This is the default and can be omitted\n)\ncustom_metadata_field = client.custom_metadata_fields.delete(\n    "id",\n)\nprint(custom_metadata_field)',
      },
      ruby: {
        method: 'custom_metadata_fields.delete',
        example:
          'require "imagekitio"\n\nimage_kit = Imagekitio::Client.new(private_key: "My Private Key", password: "My Password")\n\ncustom_metadata_field = image_kit.custom_metadata_fields.delete("id")\n\nputs(custom_metadata_field)',
      },
      typescript: {
        method: 'client.customMetadataFields.delete',
        example:
          "import ImageKit from '@imagekit/nodejs';\n\nconst client = new ImageKit({\n  privateKey: process.env['IMAGEKIT_PRIVATE_KEY'], // This is the default and can be omitted\n  password: process.env['OPTIONAL_IMAGEKIT_IGNORES_THIS'], // This is the default and can be omitted\n});\n\nconst customMetadataField = await client.customMetadataFields.delete('id');\n\nconsole.log(customMetadataField);",
      },
    },
  },
  {
    name: 'upload',
    endpoint: '/api/v1/files/upload',
    httpMethod: 'post',
    summary: 'Upload file V1',
    description:
      'ImageKit.io allows you to upload files directly from both the server and client sides. For server-side uploads, private API key authentication is used. For client-side uploads, generate a one-time `token`, `signature`, and `expire` from your secure backend using private API. [Learn more](/docs/api-reference/upload-file/upload-file#how-to-implement-client-side-file-upload) about how to implement client-side file upload.\n\nThe [V2 API](/docs/api-reference/upload-file/upload-file-v2) enhances security by verifying the entire payload using JWT.\n\n**File size limit** \\\nOn the free plan, the maximum upload file sizes are 25MB for images, audio, and raw files and 100MB for videos. On the Lite paid plan, these limits increase to 40MB for images, audio, and raw files and 300MB for videos, whereas on the Pro paid plan, these limits increase to 50MB for images, audio, and raw files and 2GB for videos. These limits can be further increased with enterprise plans.\n\n**Version limit** \\\nA file can have a maximum of 100 versions.\n\n**Demo applications**\n\n- A full-fledged [upload widget using Uppy](https://github.com/imagekit-samples/uppy-uploader), supporting file selections from local storage, URL, Dropbox, Google Drive, Instagram, and more.\n- [Quick start guides](/docs/quick-start-guides) for various frameworks and technologies.\n',
    stainlessPath: '(resource) files > (method) upload',
    qualified: 'client.files.upload',
    params: [
      'file: string;',
      'fileName: string;',
      'token?: string;',
      'checks?: string;',
      'customCoordinates?: string;',
      'customMetadata?: object;',
      'description?: string;',
      'expire?: number;',
      "extensions?: { name: 'remove-bg'; options?: { add_shadow?: boolean; bg_color?: string; bg_image_url?: string; semitransparency?: boolean; }; } | { maxTags: number; minConfidence: number; name: 'google-auto-tagging' | 'aws-auto-tagging'; } | { name: 'ai-auto-description'; } | { name: 'ai-tasks'; tasks: { instruction: string; type: 'select_tags'; max_selections?: number; min_selections?: number; vocabulary?: string[]; } | { field: string; instruction: string; type: 'select_metadata'; max_selections?: number; min_selections?: number; vocabulary?: string | number | boolean[]; } | { instruction: string; type: 'yes_no'; on_no?: { add_tags?: string[]; remove_tags?: string[]; set_metadata?: object[]; unset_metadata?: object[]; }; on_unknown?: { add_tags?: string[]; remove_tags?: string[]; set_metadata?: object[]; unset_metadata?: object[]; }; on_yes?: { add_tags?: string[]; remove_tags?: string[]; set_metadata?: object[]; unset_metadata?: object[]; }; }[]; } | { id: string; name: 'saved-extension'; }[];",
      'folder?: string;',
      'isPrivateFile?: boolean;',
      'isPublished?: boolean;',
      'overwriteAITags?: boolean;',
      'overwriteCustomMetadata?: boolean;',
      'overwriteFile?: boolean;',
      'overwriteTags?: boolean;',
      'publicKey?: string;',
      'responseFields?: string[];',
      'signature?: string;',
      'tags?: string[];',
      "transformation?: { post?: { type: 'transformation'; value: string; } | { type: 'gif-to-video'; value?: string; } | { type: 'thumbnail'; value?: string; } | { protocol: 'hls' | 'dash'; type: 'abs'; value: string; }[]; pre?: string; };",
      'useUniqueFileName?: boolean;',
      'webhookUrl?: string;',
    ],
    response:
      "{ AITags?: { confidence?: number; name?: string; source?: string; }[]; audioCodec?: string; bitRate?: number; customCoordinates?: string; customMetadata?: object; description?: string; duration?: number; embeddedMetadata?: object; extensionStatus?: { ai-auto-description?: 'success' | 'pending' | 'failed'; ai-tasks?: 'success' | 'pending' | 'failed'; aws-auto-tagging?: 'success' | 'pending' | 'failed'; google-auto-tagging?: 'success' | 'pending' | 'failed'; remove-bg?: 'success' | 'pending' | 'failed'; }; fileId?: string; filePath?: string; fileType?: string; height?: number; isPrivateFile?: boolean; isPublished?: boolean; metadata?: { audioCodec?: string; bitRate?: number; density?: number; duration?: number; exif?: object; format?: string; hasColorProfile?: boolean; hasTransparency?: boolean; height?: number; pHash?: string; quality?: number; size?: number; videoCodec?: string; width?: number; }; name?: string; selectedFieldsSchema?: object; size?: number; tags?: string[]; thumbnailUrl?: string; url?: string; versionInfo?: { id?: string; name?: string; }; videoCodec?: string; width?: number; }",
    markdown:
      "## upload\n\n`client.files.upload(file: string, fileName: string, token?: string, checks?: string, customCoordinates?: string, customMetadata?: object, description?: string, expire?: number, extensions?: { name: 'remove-bg'; options?: object; } | { maxTags: number; minConfidence: number; name: 'google-auto-tagging' | 'aws-auto-tagging'; } | { name: 'ai-auto-description'; } | { name: 'ai-tasks'; tasks: object | object | object[]; } | { id: string; name: 'saved-extension'; }[], folder?: string, isPrivateFile?: boolean, isPublished?: boolean, overwriteAITags?: boolean, overwriteCustomMetadata?: boolean, overwriteFile?: boolean, overwriteTags?: boolean, publicKey?: string, responseFields?: string[], signature?: string, tags?: string[], transformation?: { post?: { type: 'transformation'; value: string; } | { type: 'gif-to-video'; value?: string; } | { type: 'thumbnail'; value?: string; } | { protocol: 'hls' | 'dash'; type: 'abs'; value: string; }[]; pre?: string; }, useUniqueFileName?: boolean, webhookUrl?: string): { AITags?: object[]; audioCodec?: string; bitRate?: number; customCoordinates?: string; customMetadata?: object; description?: string; duration?: number; embeddedMetadata?: object; extensionStatus?: object; fileId?: string; filePath?: string; fileType?: string; height?: number; isPrivateFile?: boolean; isPublished?: boolean; metadata?: metadata; name?: string; selectedFieldsSchema?: object; size?: number; tags?: string[]; thumbnailUrl?: string; url?: string; versionInfo?: object; videoCodec?: string; width?: number; }`\n\n**post** `/api/v1/files/upload`\n\nImageKit.io allows you to upload files directly from both the server and client sides. For server-side uploads, private API key authentication is used. For client-side uploads, generate a one-time `token`, `signature`, and `expire` from your secure backend using private API. [Learn more](/docs/api-reference/upload-file/upload-file#how-to-implement-client-side-file-upload) about how to implement client-side file upload.\n\nThe [V2 API](/docs/api-reference/upload-file/upload-file-v2) enhances security by verifying the entire payload using JWT.\n\n**File size limit** \\\nOn the free plan, the maximum upload file sizes are 25MB for images, audio, and raw files and 100MB for videos. On the Lite paid plan, these limits increase to 40MB for images, audio, and raw files and 300MB for videos, whereas on the Pro paid plan, these limits increase to 50MB for images, audio, and raw files and 2GB for videos. These limits can be further increased with enterprise plans.\n\n**Version limit** \\\nA file can have a maximum of 100 versions.\n\n**Demo applications**\n\n- A full-fledged [upload widget using Uppy](https://github.com/imagekit-samples/uppy-uploader), supporting file selections from local storage, URL, Dropbox, Google Drive, Instagram, and more.\n- [Quick start guides](/docs/quick-start-guides) for various frameworks and technologies.\n\n\n### Parameters\n\n- `file: string`\n  The API accepts any of the following:\n\n- **Binary data** – send the raw bytes as `multipart/form-data`.\n- **HTTP / HTTPS URL** – a publicly reachable URL that ImageKit’s servers can fetch.\n- **Base64 string** – the file encoded as a Base64 data URI or plain Base64.\n\nWhen supplying a URL, the server must receive the response headers within 8 seconds; otherwise the request fails with 400 Bad Request.\n\n\n- `fileName: string`\n  The name with which the file has to be uploaded.\nThe file name can contain:\n\n  - Alphanumeric Characters: `a-z`, `A-Z`, `0-9`.\n  - Special Characters: `.`, `-`\n\nAny other character including space will be replaced by `_`\n\n\n- `token?: string`\n  A unique value that the ImageKit.io server will use to recognize and prevent subsequent retries for the same request. We suggest using V4 UUIDs, or another random string with enough entropy to avoid collisions. This field is only required for authentication when uploading a file from the client side.\n\n**Note**: Sending a value that has been used in the past will result in a validation error. Even if your previous request resulted in an error, you should always send a new value for this field.\n\n\n- `checks?: string`\n  Server-side checks to run on the asset.\nRead more about [Upload API checks](/docs/api-reference/upload-file/upload-file#upload-api-checks).\n\n\n- `customCoordinates?: string`\n  Define an important area in the image. This is only relevant for image type files.\n\n  - To be passed as a string with the x and y coordinates of the top-left corner, and width and height of the area of interest in the format `x,y,width,height`. For example - `10,10,100,100`\n  - Can be used with fo-customtransformation.\n  - If this field is not specified and the file is overwritten, then customCoordinates will be removed.\n\n\n- `customMetadata?: object`\n  JSON key-value pairs to associate with the asset. Create the custom metadata fields before setting these values.\n\n\n- `description?: string`\n  Optional text to describe the contents of the file.\n\n\n- `expire?: number`\n  The time until your signature is valid. It must be a [Unix time](https://en.wikipedia.org/wiki/Unix_time) in less than 1 hour into the future. It should be in seconds. This field is only required for authentication when uploading a file from the client side.\n\n\n- `extensions?: { name: 'remove-bg'; options?: { add_shadow?: boolean; bg_color?: string; bg_image_url?: string; semitransparency?: boolean; }; } | { maxTags: number; minConfidence: number; name: 'google-auto-tagging' | 'aws-auto-tagging'; } | { name: 'ai-auto-description'; } | { name: 'ai-tasks'; tasks: { instruction: string; type: 'select_tags'; max_selections?: number; min_selections?: number; vocabulary?: string[]; } | { field: string; instruction: string; type: 'select_metadata'; max_selections?: number; min_selections?: number; vocabulary?: string | number | boolean[]; } | { instruction: string; type: 'yes_no'; on_no?: { add_tags?: string[]; remove_tags?: string[]; set_metadata?: object[]; unset_metadata?: object[]; }; on_unknown?: { add_tags?: string[]; remove_tags?: string[]; set_metadata?: object[]; unset_metadata?: object[]; }; on_yes?: { add_tags?: string[]; remove_tags?: string[]; set_metadata?: object[]; unset_metadata?: object[]; }; }[]; } | { id: string; name: 'saved-extension'; }[]`\n  Array of extensions to be applied to the asset. Each extension can be configured with specific parameters based on the extension type.\n\n\n- `folder?: string`\n  The folder path in which the image has to be uploaded. If the folder(s) didn't exist before, a new folder(s) is created.\n\nThe folder name can contain:\n\n  - Alphanumeric Characters: `a-z` , `A-Z` , `0-9`\n  - Special Characters: `/` , `_` , `-`\n\nUsing multiple `/` creates a nested folder.\n\n\n- `isPrivateFile?: boolean`\n  Whether to mark the file as private or not.\n\nIf `true`, the file is marked as private and is accessible only using named transformation or signed URL.\n\n\n- `isPublished?: boolean`\n  Whether to upload file as published or not.\n\nIf `false`, the file is marked as unpublished, which restricts access to the file only via the media library. Files in draft or unpublished state can only be publicly accessed after being published.\n\nThe option to upload in draft state is only available in custom enterprise pricing plans.\n\n\n- `overwriteAITags?: boolean`\n  If set to `true` and a file already exists at the exact location, its AITags will be removed. Set `overwriteAITags` to `false` to preserve AITags.\n\n\n- `overwriteCustomMetadata?: boolean`\n  If the request does not have `customMetadata`, and a file already exists at the exact location, existing customMetadata will be removed.\n\n\n- `overwriteFile?: boolean`\n  If `false` and `useUniqueFileName` is also `false`, and a file already exists at the exact location, upload API will return an error immediately.\n\n\n- `overwriteTags?: boolean`\n  If the request does not have `tags`, and a file already exists at the exact location, existing tags will be removed.\n\n\n- `publicKey?: string`\n  Your ImageKit.io public key. This field is only required for authentication when uploading a file from the client side.\n\n\n- `responseFields?: string[]`\n  Array of response field keys to include in the API response body.\n\n\n- `signature?: string`\n  HMAC-SHA1 digest of the token+expire using your ImageKit.io private API key as a key. Learn how to create a signature on the page below. This should be in lowercase.\n\nSignature must be calculated on the server-side. This field is only required for authentication when uploading a file from the client side.\n\n\n- `tags?: string[]`\n  Set the tags while uploading the file.\nProvide an array of tag strings (e.g. `[\"tag1\", \"tag2\", \"tag3\"]`). The combined length of all tag characters must not exceed 500, and the `%` character is not allowed.\nIf this field is not specified and the file is overwritten, the existing tags will be removed.\n\n\n- `transformation?: { post?: { type: 'transformation'; value: string; } | { type: 'gif-to-video'; value?: string; } | { type: 'thumbnail'; value?: string; } | { protocol: 'hls' | 'dash'; type: 'abs'; value: string; }[]; pre?: string; }`\n  Configure pre-processing (`pre`) and post-processing (`post`) transformations.\n\n- `pre` — applied before the file is uploaded to the Media Library.  \n  Useful for reducing file size or applying basic optimizations upfront (e.g., resize, compress).\n\n- `post` — applied immediately after upload.  \n  Ideal for generating transformed versions (like video encodes or thumbnails) in advance, so they're ready for delivery without delay.\n\nYou can mix and match any combination of post-processing types.\n\n  - `post?: { type: 'transformation'; value: string; } | { type: 'gif-to-video'; value?: string; } | { type: 'thumbnail'; value?: string; } | { protocol: 'hls' | 'dash'; type: 'abs'; value: string; }[]`\n    List of transformations to apply *after* the file is uploaded.  \nEach item must match one of the following types:\n`transformation`, `gif-to-video`, `thumbnail`, `abs`.\n\n  - `pre?: string`\n    Transformation string to apply before uploading the file to the Media Library. Useful for optimizing files at ingestion.\n\n\n- `useUniqueFileName?: boolean`\n  Whether to use a unique filename for this file or not.\n\nIf `true`, ImageKit.io will add a unique suffix to the filename parameter to get a unique filename.\n\nIf `false`, then the image is uploaded with the provided filename parameter, and any existing file with the same name is replaced.\n\n\n- `webhookUrl?: string`\n  The final status of extensions after they have completed execution will be delivered to this endpoint as a POST request. [Learn more](/docs/api-reference/digital-asset-management-dam/managing-assets/update-file-details#webhook-payload-structure) about the webhook payload structure.\n\n\n### Returns\n\n- `{ AITags?: { confidence?: number; name?: string; source?: string; }[]; audioCodec?: string; bitRate?: number; customCoordinates?: string; customMetadata?: object; description?: string; duration?: number; embeddedMetadata?: object; extensionStatus?: { ai-auto-description?: 'success' | 'pending' | 'failed'; ai-tasks?: 'success' | 'pending' | 'failed'; aws-auto-tagging?: 'success' | 'pending' | 'failed'; google-auto-tagging?: 'success' | 'pending' | 'failed'; remove-bg?: 'success' | 'pending' | 'failed'; }; fileId?: string; filePath?: string; fileType?: string; height?: number; isPrivateFile?: boolean; isPublished?: boolean; metadata?: { audioCodec?: string; bitRate?: number; density?: number; duration?: number; exif?: object; format?: string; hasColorProfile?: boolean; hasTransparency?: boolean; height?: number; pHash?: string; quality?: number; size?: number; videoCodec?: string; width?: number; }; name?: string; selectedFieldsSchema?: object; size?: number; tags?: string[]; thumbnailUrl?: string; url?: string; versionInfo?: { id?: string; name?: string; }; videoCodec?: string; width?: number; }`\n  Object containing details of a successful upload.\n\n  - `AITags?: { confidence?: number; name?: string; source?: string; }[]`\n  - `audioCodec?: string`\n  - `bitRate?: number`\n  - `customCoordinates?: string`\n  - `customMetadata?: object`\n  - `description?: string`\n  - `duration?: number`\n  - `embeddedMetadata?: object`\n  - `extensionStatus?: { ai-auto-description?: 'success' | 'pending' | 'failed'; ai-tasks?: 'success' | 'pending' | 'failed'; aws-auto-tagging?: 'success' | 'pending' | 'failed'; google-auto-tagging?: 'success' | 'pending' | 'failed'; remove-bg?: 'success' | 'pending' | 'failed'; }`\n  - `fileId?: string`\n  - `filePath?: string`\n  - `fileType?: string`\n  - `height?: number`\n  - `isPrivateFile?: boolean`\n  - `isPublished?: boolean`\n  - `metadata?: { audioCodec?: string; bitRate?: number; density?: number; duration?: number; exif?: { exif?: { ApertureValue?: number; ColorSpace?: number; CreateDate?: string; CustomRendered?: number; DateTimeOriginal?: string; ExifImageHeight?: number; ExifImageWidth?: number; ExifVersion?: string; ExposureCompensation?: number; ExposureMode?: number; ExposureProgram?: number; ExposureTime?: number; Flash?: number; FlashpixVersion?: string; FNumber?: number; FocalLength?: number; FocalPlaneResolutionUnit?: number; FocalPlaneXResolution?: number; FocalPlaneYResolution?: number; InteropOffset?: number; ISO?: number; MeteringMode?: number; SceneCaptureType?: number; ShutterSpeedValue?: number; SubSecTime?: string; WhiteBalance?: number; }; gps?: { GPSVersionID?: number[]; }; image?: { ExifOffset?: number; GPSInfo?: number; Make?: string; Model?: string; ModifyDate?: string; Orientation?: number; ResolutionUnit?: number; Software?: string; XResolution?: number; YCbCrPositioning?: number; YResolution?: number; }; interoperability?: { InteropIndex?: string; InteropVersion?: string; }; makernote?: object; thumbnail?: { Compression?: number; ResolutionUnit?: number; ThumbnailLength?: number; ThumbnailOffset?: number; XResolution?: number; YResolution?: number; }; }; format?: string; hasColorProfile?: boolean; hasTransparency?: boolean; height?: number; pHash?: string; quality?: number; size?: number; videoCodec?: string; width?: number; }`\n  - `name?: string`\n  - `selectedFieldsSchema?: object`\n  - `size?: number`\n  - `tags?: string[]`\n  - `thumbnailUrl?: string`\n  - `url?: string`\n  - `versionInfo?: { id?: string; name?: string; }`\n  - `videoCodec?: string`\n  - `width?: number`\n\n### Example\n\n```typescript\nimport ImageKit from '@imagekit/nodejs';\n\nconst client = new ImageKit();\n\nconst response = await client.files.upload({ file: fs.createReadStream('path/to/file'), fileName: 'fileName' });\n\nconsole.log(response);\n```",
    perLanguage: {
      cli: {
        method: 'files upload',
        example:
          "imagekit files upload \\\n  --private-key 'My Private Key' \\\n  --password 'My Password' \\\n  --file 'Example data' \\\n  --file-name fileName",
      },
      csharp: {
        method: 'Files.Upload',
        example:
          'FileUploadParams parameters = new()\n{\n    File = Encoding.UTF8.GetBytes("Example data"),\n    FileName = "fileName",\n};\n\nvar response = await client.Files.Upload(parameters);\n\nConsole.WriteLine(response);',
      },
      go: {
        method: 'client.Files.Upload',
        example:
          'package main\n\nimport (\n\t"bytes"\n\t"context"\n\t"fmt"\n\t"io"\n\n\t"github.com/imagekit-developer/imagekit-go"\n\t"github.com/imagekit-developer/imagekit-go/option"\n)\n\nfunc main() {\n\tclient := imagekit.NewClient(\n\t\toption.WithPrivateKey("My Private Key"),\n\t\toption.WithPassword("My Password"),\n\t)\n\tresponse, err := client.Files.Upload(context.TODO(), imagekit.FileUploadParams{\n\t\tFile:     io.Reader(bytes.NewBuffer([]byte("Example data"))),\n\t\tFileName: "fileName",\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.VideoCodec)\n}\n',
      },
      http: {
        example:
          'curl https://upload.imagekit.io/api/v1/files/upload \\\n    -H \'Content-Type: multipart/form-data\' \\\n    -u "$IMAGEKIT_PRIVATE_KEY:OPTIONAL_IMAGEKIT_IGNORES_THIS" \\\n    -F \'file=@/path/to/file\' \\\n    -F fileName=fileName \\\n    -F checks=\'"request.folder" : "marketing/"\n    \' \\\n    -F customMetadata=\'{"brand":"bar","color":"bar"}\' \\\n    -F description=\'Running shoes\' \\\n    -F extensions=\'[{"name":"remove-bg","options":{"add_shadow":true}},{"maxTags":5,"minConfidence":95,"name":"google-auto-tagging"},{"name":"ai-auto-description"},{"name":"ai-tasks","tasks":[{"instruction":"What types of clothing items are visible in this image?","type":"select_tags","vocabulary":["shirt","tshirt","dress","trousers","jacket"]},{"instruction":"Is this a luxury or high-end fashion item?","type":"yes_no","on_yes":{"add_tags":["luxury","premium"]}}]},{"id":"ext_abc123","name":"saved-extension"}]\' \\\n    -F responseFields=\'["tags","customCoordinates","isPrivateFile"]\' \\\n    -F tags=\'["t-shirt","round-neck","men"]\' \\\n    -F transformation=\'{"post":[{"type":"thumbnail","value":"w-150,h-150"},{"protocol":"dash","type":"abs","value":"sr-240_360_480_720_1080"}]}\'',
      },
      java: {
        method: 'files().upload',
        example:
          'package com.imagekit.api.example;\n\nimport com.imagekit.api.client.ImageKitClient;\nimport com.imagekit.api.client.okhttp.ImageKitOkHttpClient;\nimport com.imagekit.api.models.files.FileUploadParams;\nimport com.imagekit.api.models.files.FileUploadResponse;\nimport java.io.ByteArrayInputStream;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        ImageKitClient client = ImageKitOkHttpClient.fromEnv();\n\n        FileUploadParams params = FileUploadParams.builder()\n            .file(new ByteArrayInputStream("Example data".getBytes()))\n            .fileName("fileName")\n            .build();\n        FileUploadResponse response = client.files().upload(params);\n    }\n}',
      },
      php: {
        method: 'files->upload',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(privateKey: 'My Private Key', password: 'My Password');\n\n$response = $client->files->upload(\n  file: FileParam::fromString('Example data', filename: uniqid('file-upload-', true)),\n  fileName: 'fileName',\n  token: 'token',\n  checks: \"\\\"request.folder\\\" : \\\"marketing/\\\"\\n\",\n  customCoordinates: 'customCoordinates',\n  customMetadata: ['brand' => 'bar', 'color' => 'bar'],\n  description: 'Running shoes',\n  expire: 0,\n  extensions: [\n    [\n      'name' => 'remove-bg',\n      'options' => [\n        'addShadow' => true,\n        'bgColor' => 'bg_color',\n        'bgImageURL' => 'bg_image_url',\n        'semitransparency' => true,\n      ],\n    ],\n    ['maxTags' => 5, 'minConfidence' => 95, 'name' => 'google-auto-tagging'],\n    ['name' => 'ai-auto-description'],\n    [\n      'name' => 'ai-tasks',\n      'tasks' => [\n        [\n          'instruction' => 'What types of clothing items are visible in this image?',\n          'type' => 'select_tags',\n          'maxSelections' => 1,\n          'minSelections' => 0,\n          'vocabulary' => ['shirt', 'tshirt', 'dress', 'trousers', 'jacket'],\n        ],\n        [\n          'instruction' => 'Is this a luxury or high-end fashion item?',\n          'type' => 'yes_no',\n          'onNo' => [\n            'addTags' => ['luxury', 'premium'],\n            'removeTags' => ['budget', 'affordable'],\n            'setMetadata' => [['field' => 'price_range', 'value' => 'premium']],\n            'unsetMetadata' => [['field' => 'price_range']],\n          ],\n          'onUnknown' => [\n            'addTags' => ['luxury', 'premium'],\n            'removeTags' => ['budget', 'affordable'],\n            'setMetadata' => [['field' => 'price_range', 'value' => 'premium']],\n            'unsetMetadata' => [['field' => 'price_range']],\n          ],\n          'onYes' => [\n            'addTags' => ['luxury', 'premium'],\n            'removeTags' => ['budget', 'affordable'],\n            'setMetadata' => [['field' => 'price_range', 'value' => 'premium']],\n            'unsetMetadata' => [['field' => 'price_range']],\n          ],\n        ],\n      ],\n    ],\n    ['id' => 'ext_abc123', 'name' => 'saved-extension'],\n  ],\n  folder: 'folder',\n  isPrivateFile: true,\n  isPublished: true,\n  overwriteAITags: true,\n  overwriteCustomMetadata: true,\n  overwriteFile: true,\n  overwriteTags: true,\n  publicKey: 'publicKey',\n  responseFields: ['tags', 'customCoordinates', 'isPrivateFile'],\n  signature: 'signature',\n  tags: ['t-shirt', 'round-neck', 'men'],\n  transformation: [\n    'post' => [\n      ['type' => 'thumbnail', 'value' => 'w-150,h-150'],\n      [\n        'protocol' => 'dash',\n        'type' => 'abs',\n        'value' => 'sr-240_360_480_720_1080',\n      ],\n    ],\n    'pre' => 'w-300,h-300,q-80',\n  ],\n  useUniqueFileName: true,\n  webhookURL: 'https://example.com',\n);\n\nvar_dump($response);",
      },
      python: {
        method: 'files.upload',
        example:
          'import os\nfrom imagekitio import ImageKit\n\nclient = ImageKit(\n    private_key=os.environ.get("IMAGEKIT_PRIVATE_KEY"),  # This is the default and can be omitted\n    password=os.environ.get("OPTIONAL_IMAGEKIT_IGNORES_THIS"),  # This is the default and can be omitted\n)\nresponse = client.files.upload(\n    file=b"Example data",\n    file_name="fileName",\n)\nprint(response.video_codec)',
      },
      ruby: {
        method: 'files.upload',
        example:
          'require "imagekitio"\n\nimage_kit = Imagekitio::Client.new(private_key: "My Private Key", password: "My Password")\n\nresponse = image_kit.files.upload(file: StringIO.new("Example data"), file_name: "fileName")\n\nputs(response)',
      },
      typescript: {
        method: 'client.files.upload',
        example:
          "import ImageKit from '@imagekit/nodejs';\n\nconst client = new ImageKit({\n  privateKey: process.env['IMAGEKIT_PRIVATE_KEY'], // This is the default and can be omitted\n  password: process.env['OPTIONAL_IMAGEKIT_IGNORES_THIS'], // This is the default and can be omitted\n});\n\nconst response = await client.files.upload({\n  file: fs.createReadStream('path/to/file'),\n  fileName: 'fileName',\n});\n\nconsole.log(response.videoCodec);",
      },
    },
  },
  {
    name: 'get',
    endpoint: '/v1/files/{fileId}/details',
    httpMethod: 'get',
    summary: 'Get file details',
    description:
      'This API returns an object with details or attributes about the current version of the file.',
    stainlessPath: '(resource) files > (method) get',
    qualified: 'client.files.get',
    params: ['fileId: string;'],
    response:
      "{ AITags?: { confidence?: number; name?: string; source?: string; }[]; audioCodec?: string; bitRate?: number; createdAt?: string; customCoordinates?: string; customMetadata?: object; description?: string; duration?: number; embeddedMetadata?: object; fileId?: string; filePath?: string; fileType?: string; hasAlpha?: boolean; height?: number; isPrivateFile?: boolean; isPublished?: boolean; mime?: string; name?: string; selectedFieldsSchema?: object; size?: number; tags?: string[]; thumbnail?: string; type?: 'file' | 'file-version'; updatedAt?: string; url?: string; versionInfo?: { id?: string; name?: string; }; videoCodec?: string; width?: number; }",
    markdown:
      "## get\n\n`client.files.get(fileId: string): { AITags?: object[]; audioCodec?: string; bitRate?: number; createdAt?: string; customCoordinates?: string; customMetadata?: object; description?: string; duration?: number; embeddedMetadata?: object; fileId?: string; filePath?: string; fileType?: string; hasAlpha?: boolean; height?: number; isPrivateFile?: boolean; isPublished?: boolean; mime?: string; name?: string; selectedFieldsSchema?: object; size?: number; tags?: string[]; thumbnail?: string; type?: 'file' | 'file-version'; updatedAt?: string; url?: string; versionInfo?: object; videoCodec?: string; width?: number; }`\n\n**get** `/v1/files/{fileId}/details`\n\nThis API returns an object with details or attributes about the current version of the file.\n\n### Parameters\n\n- `fileId: string`\n\n### Returns\n\n- `{ AITags?: { confidence?: number; name?: string; source?: string; }[]; audioCodec?: string; bitRate?: number; createdAt?: string; customCoordinates?: string; customMetadata?: object; description?: string; duration?: number; embeddedMetadata?: object; fileId?: string; filePath?: string; fileType?: string; hasAlpha?: boolean; height?: number; isPrivateFile?: boolean; isPublished?: boolean; mime?: string; name?: string; selectedFieldsSchema?: object; size?: number; tags?: string[]; thumbnail?: string; type?: 'file' | 'file-version'; updatedAt?: string; url?: string; versionInfo?: { id?: string; name?: string; }; videoCodec?: string; width?: number; }`\n  Object containing details of a file or file version.\n\n  - `AITags?: { confidence?: number; name?: string; source?: string; }[]`\n  - `audioCodec?: string`\n  - `bitRate?: number`\n  - `createdAt?: string`\n  - `customCoordinates?: string`\n  - `customMetadata?: object`\n  - `description?: string`\n  - `duration?: number`\n  - `embeddedMetadata?: object`\n  - `fileId?: string`\n  - `filePath?: string`\n  - `fileType?: string`\n  - `hasAlpha?: boolean`\n  - `height?: number`\n  - `isPrivateFile?: boolean`\n  - `isPublished?: boolean`\n  - `mime?: string`\n  - `name?: string`\n  - `selectedFieldsSchema?: object`\n  - `size?: number`\n  - `tags?: string[]`\n  - `thumbnail?: string`\n  - `type?: 'file' | 'file-version'`\n  - `updatedAt?: string`\n  - `url?: string`\n  - `versionInfo?: { id?: string; name?: string; }`\n  - `videoCodec?: string`\n  - `width?: number`\n\n### Example\n\n```typescript\nimport ImageKit from '@imagekit/nodejs';\n\nconst client = new ImageKit();\n\nconst file = await client.files.get('fileId');\n\nconsole.log(file);\n```",
    perLanguage: {
      cli: {
        method: 'files get',
        example:
          "imagekit files get \\\n  --private-key 'My Private Key' \\\n  --password 'My Password' \\\n  --file-id fileId",
      },
      csharp: {
        method: 'Files.Get',
        example:
          'FileGetParams parameters = new() { FileID = "fileId" };\n\nvar file = await client.Files.Get(parameters);\n\nConsole.WriteLine(file);',
      },
      go: {
        method: 'client.Files.Get',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/imagekit-developer/imagekit-go"\n\t"github.com/imagekit-developer/imagekit-go/option"\n)\n\nfunc main() {\n\tclient := imagekit.NewClient(\n\t\toption.WithPrivateKey("My Private Key"),\n\t\toption.WithPassword("My Password"),\n\t)\n\tfile, err := client.Files.Get(context.TODO(), "fileId")\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", file.VideoCodec)\n}\n',
      },
      http: {
        example:
          'curl https://api.imagekit.io/v1/files/$FILE_ID/details \\\n    -u "$IMAGEKIT_PRIVATE_KEY:OPTIONAL_IMAGEKIT_IGNORES_THIS"',
      },
      java: {
        method: 'files().get',
        example:
          'package com.imagekit.api.example;\n\nimport com.imagekit.api.client.ImageKitClient;\nimport com.imagekit.api.client.okhttp.ImageKitOkHttpClient;\nimport com.imagekit.api.models.files.File;\nimport com.imagekit.api.models.files.FileGetParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        ImageKitClient client = ImageKitOkHttpClient.fromEnv();\n\n        File file = client.files().get("fileId");\n    }\n}',
      },
      php: {
        method: 'files->get',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(privateKey: 'My Private Key', password: 'My Password');\n\n$file = $client->files->get('fileId');\n\nvar_dump($file);",
      },
      python: {
        method: 'files.get',
        example:
          'import os\nfrom imagekitio import ImageKit\n\nclient = ImageKit(\n    private_key=os.environ.get("IMAGEKIT_PRIVATE_KEY"),  # This is the default and can be omitted\n    password=os.environ.get("OPTIONAL_IMAGEKIT_IGNORES_THIS"),  # This is the default and can be omitted\n)\nfile = client.files.get(\n    "fileId",\n)\nprint(file.video_codec)',
      },
      ruby: {
        method: 'files.get',
        example:
          'require "imagekitio"\n\nimage_kit = Imagekitio::Client.new(private_key: "My Private Key", password: "My Password")\n\nfile = image_kit.files.get("fileId")\n\nputs(file)',
      },
      typescript: {
        method: 'client.files.get',
        example:
          "import ImageKit from '@imagekit/nodejs';\n\nconst client = new ImageKit({\n  privateKey: process.env['IMAGEKIT_PRIVATE_KEY'], // This is the default and can be omitted\n  password: process.env['OPTIONAL_IMAGEKIT_IGNORES_THIS'], // This is the default and can be omitted\n});\n\nconst file = await client.files.get('fileId');\n\nconsole.log(file.videoCodec);",
      },
    },
  },
  {
    name: 'update',
    endpoint: '/v1/files/{fileId}/details',
    httpMethod: 'patch',
    summary: 'Update file details',
    description:
      'This API updates the details or attributes of the current version of the file. You can update `tags`, `customCoordinates`, `customMetadata`, publication status, remove existing `AITags` and apply extensions using this API.\n',
    stainlessPath: '(resource) files > (method) update',
    qualified: 'client.files.update',
    params: [
      'fileId: string;',
      "UpdateFileRequest: { customCoordinates?: string; customMetadata?: object; description?: string; extensions?: { name: 'remove-bg'; options?: object; } | { maxTags: number; minConfidence: number; name: 'google-auto-tagging' | 'aws-auto-tagging'; } | { name: 'ai-auto-description'; } | { name: 'ai-tasks'; tasks: object | object | object[]; } | { id: string; name: 'saved-extension'; }[]; removeAITags?: string[] | 'all'; tags?: string[]; webhookUrl?: string; } | { publish?: { isPublished: boolean; includeFileVersions?: boolean; }; };",
    ],
    response:
      "{ AITags?: { confidence?: number; name?: string; source?: string; }[]; audioCodec?: string; bitRate?: number; createdAt?: string; customCoordinates?: string; customMetadata?: object; description?: string; duration?: number; embeddedMetadata?: object; fileId?: string; filePath?: string; fileType?: string; hasAlpha?: boolean; height?: number; isPrivateFile?: boolean; isPublished?: boolean; mime?: string; name?: string; selectedFieldsSchema?: object; size?: number; tags?: string[]; thumbnail?: string; type?: 'file' | 'file-version'; updatedAt?: string; url?: string; versionInfo?: { id?: string; name?: string; }; videoCodec?: string; width?: number; }",
    perLanguage: {
      cli: {
        method: 'files update',
        example:
          "imagekit files update \\\n  --private-key 'My Private Key' \\\n  --password 'My Password' \\\n  --file-id fileId",
      },
      csharp: {
        method: 'Files.Update',
        example:
          'FileUpdateParams parameters = new()\n{\n    FileID = "fileId",\n    UpdateFileRequest = new UpdateFileDetails()\n    {\n        CustomCoordinates = "10,10,100,100",\n        CustomMetadata = new Dictionary<string, JsonElement>()\n        {\n            { "brand", JsonSerializer.SerializeToElement("bar") },\n            { "color", JsonSerializer.SerializeToElement("bar") },\n        },\n        Description = "description",\n        Extensions =\n        [\n            new RemoveBg()\n            {\n                Options = new()\n                {\n                    AddShadow = true,\n                    BgColor = "bg_color",\n                    BgImageUrl = "bg_image_url",\n                    Semitransparency = true,\n                },\n            },\n            new AutoTaggingExtension()\n            {\n                MaxTags = 10,\n                MinConfidence = 80,\n                Name = Name.GoogleAutoTagging,\n            },\n            new AutoTaggingExtension()\n            {\n                MaxTags = 10,\n                MinConfidence = 80,\n                Name = Name.AwsAutoTagging,\n            },\n            new AIAutoDescription(),\n            new AITasks(\n\n                [\n                    new SelectTags()\n                    {\n                        Instruction = "What types of clothing items are visible?",\n                        MaxSelections = 1,\n                        MinSelections = 0,\n                        Vocabulary =\n                        [\n                            "shirt", "dress", "jacket"\n                        ],\n                    },\n                ]\n            ),\n            new SavedExtension("ext_abc123"),\n        ],\n        RemoveAITags = new(\n\n            [\n                "car", "vehicle", "motorsports"\n            ]\n        ),\n        Tags =\n        [\n            "tag1", "tag2"\n        ],\n        WebhookUrl = "https://webhook.site/0d6b6c7a-8e5a-4b3a-8b7c-0d6b6c7a8e5a",\n    },\n};\n\nvar file = await client.Files.Update(parameters);\n\nConsole.WriteLine(file);',
      },
      go: {
        method: 'client.Files.Update',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/imagekit-developer/imagekit-go"\n\t"github.com/imagekit-developer/imagekit-go/option"\n)\n\nfunc main() {\n\tclient := imagekit.NewClient(\n\t\toption.WithPrivateKey("My Private Key"),\n\t\toption.WithPassword("My Password"),\n\t)\n\tfile, err := client.Files.Update(\n\t\tcontext.TODO(),\n\t\t"fileId",\n\t\timagekit.FileUpdateParams{\n\t\t\tUpdateFileRequest: imagekit.UpdateFileRequestUnionParam{\n\t\t\t\tOfUpdateFileDetails: &imagekit.UpdateFileRequestUpdateFileDetailsParam{},\n\t\t\t},\n\t\t},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", file)\n}\n',
      },
      http: {
        example:
          'curl https://api.imagekit.io/v1/files/$FILE_ID/details \\\n    -X PATCH \\\n    -H \'Content-Type: application/json\' \\\n    -u "$IMAGEKIT_PRIVATE_KEY:OPTIONAL_IMAGEKIT_IGNORES_THIS" \\\n    -d \'{\n          "extensions": [\n            {\n              "name": "remove-bg",\n              "options": {\n                "add_shadow": true\n              }\n            },\n            {\n              "maxTags": 5,\n              "minConfidence": 95,\n              "name": "google-auto-tagging"\n            },\n            {\n              "name": "ai-auto-description"\n            },\n            {\n              "name": "ai-tasks",\n              "tasks": [\n                {\n                  "instruction": "What types of clothing items are visible in this image?",\n                  "type": "select_tags",\n                  "vocabulary": [\n                    "shirt",\n                    "tshirt",\n                    "dress",\n                    "trousers",\n                    "jacket"\n                  ]\n                },\n                {\n                  "instruction": "Is this a luxury or high-end fashion item?",\n                  "type": "yes_no",\n                  "on_yes": {\n                    "add_tags": [\n                      "luxury",\n                      "premium"\n                    ]\n                  }\n                }\n              ]\n            },\n            {\n              "id": "ext_abc123",\n              "name": "saved-extension"\n            }\n          ],\n          "tags": [\n            "tag1",\n            "tag2"\n          ]\n        }\'',
      },
      java: {
        method: 'files().update',
        example:
          'package com.imagekit.api.example;\n\nimport com.imagekit.api.client.ImageKitClient;\nimport com.imagekit.api.client.okhttp.ImageKitOkHttpClient;\nimport com.imagekit.api.models.files.FileUpdateParams;\nimport com.imagekit.api.models.files.FileUpdateResponse;\nimport com.imagekit.api.models.files.UpdateFileRequest;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        ImageKitClient client = ImageKitOkHttpClient.fromEnv();\n\n        FileUpdateParams params = FileUpdateParams.builder()\n            .fileId("fileId")\n            .updateFileRequest(UpdateFileRequest.UpdateFileDetails.builder().build())\n            .build();\n        FileUpdateResponse file = client.files().update(params);\n    }\n}',
      },
      php: {
        method: 'files->update',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(privateKey: 'My Private Key', password: 'My Password');\n\n$file = $client->files->update(\n  'fileId',\n  customCoordinates: 'customCoordinates',\n  customMetadata: ['foo' => 'bar'],\n  description: 'description',\n  extensions: [\n    [\n      'name' => 'remove-bg',\n      'options' => [\n        'addShadow' => true,\n        'bgColor' => 'bg_color',\n        'bgImageURL' => 'bg_image_url',\n        'semitransparency' => true,\n      ],\n    ],\n    ['maxTags' => 5, 'minConfidence' => 95, 'name' => 'google-auto-tagging'],\n    ['name' => 'ai-auto-description'],\n    [\n      'name' => 'ai-tasks',\n      'tasks' => [\n        [\n          'instruction' => 'What types of clothing items are visible in this image?',\n          'type' => 'select_tags',\n          'maxSelections' => 1,\n          'minSelections' => 0,\n          'vocabulary' => ['shirt', 'tshirt', 'dress', 'trousers', 'jacket'],\n        ],\n        [\n          'instruction' => 'Is this a luxury or high-end fashion item?',\n          'type' => 'yes_no',\n          'onNo' => [\n            'addTags' => ['luxury', 'premium'],\n            'removeTags' => ['budget', 'affordable'],\n            'setMetadata' => [['field' => 'price_range', 'value' => 'premium']],\n            'unsetMetadata' => [['field' => 'price_range']],\n          ],\n          'onUnknown' => [\n            'addTags' => ['luxury', 'premium'],\n            'removeTags' => ['budget', 'affordable'],\n            'setMetadata' => [['field' => 'price_range', 'value' => 'premium']],\n            'unsetMetadata' => [['field' => 'price_range']],\n          ],\n          'onYes' => [\n            'addTags' => ['luxury', 'premium'],\n            'removeTags' => ['budget', 'affordable'],\n            'setMetadata' => [['field' => 'price_range', 'value' => 'premium']],\n            'unsetMetadata' => [['field' => 'price_range']],\n          ],\n        ],\n      ],\n    ],\n    ['id' => 'ext_abc123', 'name' => 'saved-extension'],\n  ],\n  removeAITags: 'all',\n  tags: ['tag1', 'tag2'],\n  webhookURL: 'https://example.com',\n  publish: ['isPublished' => true, 'includeFileVersions' => true],\n);\n\nvar_dump($file);",
      },
      python: {
        method: 'files.update',
        example:
          'import os\nfrom imagekitio import ImageKit\n\nclient = ImageKit(\n    private_key=os.environ.get("IMAGEKIT_PRIVATE_KEY"),  # This is the default and can be omitted\n    password=os.environ.get("OPTIONAL_IMAGEKIT_IGNORES_THIS"),  # This is the default and can be omitted\n)\nfile = client.files.update(\n    file_id="fileId",\n)\nprint(file)',
      },
      ruby: {
        method: 'files.update',
        example:
          'require "imagekitio"\n\nimage_kit = Imagekitio::Client.new(private_key: "My Private Key", password: "My Password")\n\nfile = image_kit.files.update("fileId", update_file_request: {})\n\nputs(file)',
      },
      typescript: {
        method: 'client.files.update',
        example:
          "import ImageKit from '@imagekit/nodejs';\n\nconst client = new ImageKit({\n  privateKey: process.env['IMAGEKIT_PRIVATE_KEY'], // This is the default and can be omitted\n  password: process.env['OPTIONAL_IMAGEKIT_IGNORES_THIS'], // This is the default and can be omitted\n});\n\nconst file = await client.files.update('fileId');\n\nconsole.log(file);",
      },
    },
  },
  {
    name: 'delete',
    endpoint: '/v1/files/{fileId}',
    httpMethod: 'delete',
    summary: 'Delete file',
    description:
      'This API deletes the file and all its file versions permanently.\n\nNote: If a file or specific transformation has been requested in the past, then the response is cached. Deleting a file does not purge the cache. You can purge the cache using purge cache API.\n',
    stainlessPath: '(resource) files > (method) delete',
    qualified: 'client.files.delete',
    params: ['fileId: string;'],
    markdown:
      "## delete\n\n`client.files.delete(fileId: string): void`\n\n**delete** `/v1/files/{fileId}`\n\nThis API deletes the file and all its file versions permanently.\n\nNote: If a file or specific transformation has been requested in the past, then the response is cached. Deleting a file does not purge the cache. You can purge the cache using purge cache API.\n\n\n### Parameters\n\n- `fileId: string`\n\n### Example\n\n```typescript\nimport ImageKit from '@imagekit/nodejs';\n\nconst client = new ImageKit();\n\nawait client.files.delete('fileId')\n```",
    perLanguage: {
      cli: {
        method: 'files delete',
        example:
          "imagekit files delete \\\n  --private-key 'My Private Key' \\\n  --password 'My Password' \\\n  --file-id fileId",
      },
      csharp: {
        method: 'Files.Delete',
        example:
          'FileDeleteParams parameters = new() { FileID = "fileId" };\n\nawait client.Files.Delete(parameters);',
      },
      go: {
        method: 'client.Files.Delete',
        example:
          'package main\n\nimport (\n\t"context"\n\n\t"github.com/imagekit-developer/imagekit-go"\n\t"github.com/imagekit-developer/imagekit-go/option"\n)\n\nfunc main() {\n\tclient := imagekit.NewClient(\n\t\toption.WithPrivateKey("My Private Key"),\n\t\toption.WithPassword("My Password"),\n\t)\n\terr := client.Files.Delete(context.TODO(), "fileId")\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n}\n',
      },
      http: {
        example:
          'curl https://api.imagekit.io/v1/files/$FILE_ID \\\n    -X DELETE \\\n    -u "$IMAGEKIT_PRIVATE_KEY:OPTIONAL_IMAGEKIT_IGNORES_THIS"',
      },
      java: {
        method: 'files().delete',
        example:
          'package com.imagekit.api.example;\n\nimport com.imagekit.api.client.ImageKitClient;\nimport com.imagekit.api.client.okhttp.ImageKitOkHttpClient;\nimport com.imagekit.api.models.files.FileDeleteParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        ImageKitClient client = ImageKitOkHttpClient.fromEnv();\n\n        client.files().delete("fileId");\n    }\n}',
      },
      php: {
        method: 'files->delete',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(privateKey: 'My Private Key', password: 'My Password');\n\n$result = $client->files->delete('fileId');\n\nvar_dump($result);",
      },
      python: {
        method: 'files.delete',
        example:
          'import os\nfrom imagekitio import ImageKit\n\nclient = ImageKit(\n    private_key=os.environ.get("IMAGEKIT_PRIVATE_KEY"),  # This is the default and can be omitted\n    password=os.environ.get("OPTIONAL_IMAGEKIT_IGNORES_THIS"),  # This is the default and can be omitted\n)\nclient.files.delete(\n    "fileId",\n)',
      },
      ruby: {
        method: 'files.delete',
        example:
          'require "imagekitio"\n\nimage_kit = Imagekitio::Client.new(private_key: "My Private Key", password: "My Password")\n\nresult = image_kit.files.delete("fileId")\n\nputs(result)',
      },
      typescript: {
        method: 'client.files.delete',
        example:
          "import ImageKit from '@imagekit/nodejs';\n\nconst client = new ImageKit({\n  privateKey: process.env['IMAGEKIT_PRIVATE_KEY'], // This is the default and can be omitted\n  password: process.env['OPTIONAL_IMAGEKIT_IGNORES_THIS'], // This is the default and can be omitted\n});\n\nawait client.files.delete('fileId');",
      },
    },
  },
  {
    name: 'copy',
    endpoint: '/v1/files/copy',
    httpMethod: 'post',
    summary: 'Copy file',
    description:
      'This will copy a file from one folder to another. \n\nNote: If any file at the destination has the same name as the source file, then the source file and its versions (if `includeFileVersions` is set to true) will be appended to the destination file version history.\n',
    stainlessPath: '(resource) files > (method) copy',
    qualified: 'client.files.copy',
    params: ['destinationPath: string;', 'sourceFilePath: string;', 'includeFileVersions?: boolean;'],
    response: '{  }',
    markdown:
      "## copy\n\n`client.files.copy(destinationPath: string, sourceFilePath: string, includeFileVersions?: boolean): {  }`\n\n**post** `/v1/files/copy`\n\nThis will copy a file from one folder to another. \n\nNote: If any file at the destination has the same name as the source file, then the source file and its versions (if `includeFileVersions` is set to true) will be appended to the destination file version history.\n\n\n### Parameters\n\n- `destinationPath: string`\n  Full path to the folder you want to copy the above file into.\n\n\n- `sourceFilePath: string`\n  The full path of the file you want to copy.\n\n\n- `includeFileVersions?: boolean`\n  Option to copy all versions of a file. By default, only the current version of the file is copied. When set to true, all versions of the file will be copied. Default value - `false`.\n\n\n### Returns\n\n- `{  }`\n\n\n### Example\n\n```typescript\nimport ImageKit from '@imagekit/nodejs';\n\nconst client = new ImageKit();\n\nconst response = await client.files.copy({ destinationPath: '/folder/to/copy/into/', sourceFilePath: '/path/to/file.jpg' });\n\nconsole.log(response);\n```",
    perLanguage: {
      cli: {
        method: 'files copy',
        example:
          "imagekit files copy \\\n  --private-key 'My Private Key' \\\n  --password 'My Password' \\\n  --destination-path /folder/to/copy/into/ \\\n  --source-file-path /path/to/file.jpg",
      },
      csharp: {
        method: 'Files.Copy',
        example:
          'FileCopyParams parameters = new()\n{\n    DestinationPath = "/folder/to/copy/into/",\n    SourceFilePath = "/path/to/file.jpg",\n};\n\nvar response = await client.Files.Copy(parameters);\n\nConsole.WriteLine(response);',
      },
      go: {
        method: 'client.Files.Copy',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/imagekit-developer/imagekit-go"\n\t"github.com/imagekit-developer/imagekit-go/option"\n)\n\nfunc main() {\n\tclient := imagekit.NewClient(\n\t\toption.WithPrivateKey("My Private Key"),\n\t\toption.WithPassword("My Password"),\n\t)\n\tresponse, err := client.Files.Copy(context.TODO(), imagekit.FileCopyParams{\n\t\tDestinationPath: "/folder/to/copy/into/",\n\t\tSourceFilePath:  "/path/to/file.jpg",\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response)\n}\n',
      },
      http: {
        example:
          'curl https://api.imagekit.io/v1/files/copy \\\n    -H \'Content-Type: application/json\' \\\n    -u "$IMAGEKIT_PRIVATE_KEY:OPTIONAL_IMAGEKIT_IGNORES_THIS" \\\n    -d \'{\n          "destinationPath": "/folder/to/copy/into/",\n          "sourceFilePath": "/path/to/file.jpg"\n        }\'',
      },
      java: {
        method: 'files().copy',
        example:
          'package com.imagekit.api.example;\n\nimport com.imagekit.api.client.ImageKitClient;\nimport com.imagekit.api.client.okhttp.ImageKitOkHttpClient;\nimport com.imagekit.api.models.files.FileCopyParams;\nimport com.imagekit.api.models.files.FileCopyResponse;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        ImageKitClient client = ImageKitOkHttpClient.fromEnv();\n\n        FileCopyParams params = FileCopyParams.builder()\n            .destinationPath("/folder/to/copy/into/")\n            .sourceFilePath("/path/to/file.jpg")\n            .build();\n        FileCopyResponse response = client.files().copy(params);\n    }\n}',
      },
      php: {
        method: 'files->copy',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(privateKey: 'My Private Key', password: 'My Password');\n\n$response = $client->files->copy(\n  destinationPath: '/folder/to/copy/into/',\n  sourceFilePath: '/path/to/file.jpg',\n  includeFileVersions: false,\n);\n\nvar_dump($response);",
      },
      python: {
        method: 'files.copy',
        example:
          'import os\nfrom imagekitio import ImageKit\n\nclient = ImageKit(\n    private_key=os.environ.get("IMAGEKIT_PRIVATE_KEY"),  # This is the default and can be omitted\n    password=os.environ.get("OPTIONAL_IMAGEKIT_IGNORES_THIS"),  # This is the default and can be omitted\n)\nresponse = client.files.copy(\n    destination_path="/folder/to/copy/into/",\n    source_file_path="/path/to/file.jpg",\n)\nprint(response)',
      },
      ruby: {
        method: 'files.copy',
        example:
          'require "imagekitio"\n\nimage_kit = Imagekitio::Client.new(private_key: "My Private Key", password: "My Password")\n\nresponse = image_kit.files.copy(destination_path: "/folder/to/copy/into/", source_file_path: "/path/to/file.jpg")\n\nputs(response)',
      },
      typescript: {
        method: 'client.files.copy',
        example:
          "import ImageKit from '@imagekit/nodejs';\n\nconst client = new ImageKit({\n  privateKey: process.env['IMAGEKIT_PRIVATE_KEY'], // This is the default and can be omitted\n  password: process.env['OPTIONAL_IMAGEKIT_IGNORES_THIS'], // This is the default and can be omitted\n});\n\nconst response = await client.files.copy({\n  destinationPath: '/folder/to/copy/into/',\n  sourceFilePath: '/path/to/file.jpg',\n});\n\nconsole.log(response);",
      },
    },
  },
  {
    name: 'move',
    endpoint: '/v1/files/move',
    httpMethod: 'post',
    summary: 'Move file',
    description:
      'This will move a file and all its versions from one folder to another. \n\nNote: If any file at the destination has the same name as the source file, then the source file and its versions will be appended to the destination file.\n',
    stainlessPath: '(resource) files > (method) move',
    qualified: 'client.files.move',
    params: ['destinationPath: string;', 'sourceFilePath: string;'],
    response: '{  }',
    markdown:
      "## move\n\n`client.files.move(destinationPath: string, sourceFilePath: string): {  }`\n\n**post** `/v1/files/move`\n\nThis will move a file and all its versions from one folder to another. \n\nNote: If any file at the destination has the same name as the source file, then the source file and its versions will be appended to the destination file.\n\n\n### Parameters\n\n- `destinationPath: string`\n  Full path to the folder you want to move the above file into.\n\n\n- `sourceFilePath: string`\n  The full path of the file you want to move.\n\n\n### Returns\n\n- `{  }`\n\n\n### Example\n\n```typescript\nimport ImageKit from '@imagekit/nodejs';\n\nconst client = new ImageKit();\n\nconst response = await client.files.move({ destinationPath: '/folder/to/move/into/', sourceFilePath: '/path/to/file.jpg' });\n\nconsole.log(response);\n```",
    perLanguage: {
      cli: {
        method: 'files move',
        example:
          "imagekit files move \\\n  --private-key 'My Private Key' \\\n  --password 'My Password' \\\n  --destination-path /folder/to/move/into/ \\\n  --source-file-path /path/to/file.jpg",
      },
      csharp: {
        method: 'Files.Move',
        example:
          'FileMoveParams parameters = new()\n{\n    DestinationPath = "/folder/to/move/into/",\n    SourceFilePath = "/path/to/file.jpg",\n};\n\nvar response = await client.Files.Move(parameters);\n\nConsole.WriteLine(response);',
      },
      go: {
        method: 'client.Files.Move',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/imagekit-developer/imagekit-go"\n\t"github.com/imagekit-developer/imagekit-go/option"\n)\n\nfunc main() {\n\tclient := imagekit.NewClient(\n\t\toption.WithPrivateKey("My Private Key"),\n\t\toption.WithPassword("My Password"),\n\t)\n\tresponse, err := client.Files.Move(context.TODO(), imagekit.FileMoveParams{\n\t\tDestinationPath: "/folder/to/move/into/",\n\t\tSourceFilePath:  "/path/to/file.jpg",\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response)\n}\n',
      },
      http: {
        example:
          'curl https://api.imagekit.io/v1/files/move \\\n    -H \'Content-Type: application/json\' \\\n    -u "$IMAGEKIT_PRIVATE_KEY:OPTIONAL_IMAGEKIT_IGNORES_THIS" \\\n    -d \'{\n          "destinationPath": "/folder/to/move/into/",\n          "sourceFilePath": "/path/to/file.jpg"\n        }\'',
      },
      java: {
        method: 'files().move',
        example:
          'package com.imagekit.api.example;\n\nimport com.imagekit.api.client.ImageKitClient;\nimport com.imagekit.api.client.okhttp.ImageKitOkHttpClient;\nimport com.imagekit.api.models.files.FileMoveParams;\nimport com.imagekit.api.models.files.FileMoveResponse;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        ImageKitClient client = ImageKitOkHttpClient.fromEnv();\n\n        FileMoveParams params = FileMoveParams.builder()\n            .destinationPath("/folder/to/move/into/")\n            .sourceFilePath("/path/to/file.jpg")\n            .build();\n        FileMoveResponse response = client.files().move(params);\n    }\n}',
      },
      php: {
        method: 'files->move',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(privateKey: 'My Private Key', password: 'My Password');\n\n$response = $client->files->move(\n  destinationPath: '/folder/to/move/into/', sourceFilePath: '/path/to/file.jpg'\n);\n\nvar_dump($response);",
      },
      python: {
        method: 'files.move',
        example:
          'import os\nfrom imagekitio import ImageKit\n\nclient = ImageKit(\n    private_key=os.environ.get("IMAGEKIT_PRIVATE_KEY"),  # This is the default and can be omitted\n    password=os.environ.get("OPTIONAL_IMAGEKIT_IGNORES_THIS"),  # This is the default and can be omitted\n)\nresponse = client.files.move(\n    destination_path="/folder/to/move/into/",\n    source_file_path="/path/to/file.jpg",\n)\nprint(response)',
      },
      ruby: {
        method: 'files.move',
        example:
          'require "imagekitio"\n\nimage_kit = Imagekitio::Client.new(private_key: "My Private Key", password: "My Password")\n\nresponse = image_kit.files.move(destination_path: "/folder/to/move/into/", source_file_path: "/path/to/file.jpg")\n\nputs(response)',
      },
      typescript: {
        method: 'client.files.move',
        example:
          "import ImageKit from '@imagekit/nodejs';\n\nconst client = new ImageKit({\n  privateKey: process.env['IMAGEKIT_PRIVATE_KEY'], // This is the default and can be omitted\n  password: process.env['OPTIONAL_IMAGEKIT_IGNORES_THIS'], // This is the default and can be omitted\n});\n\nconst response = await client.files.move({\n  destinationPath: '/folder/to/move/into/',\n  sourceFilePath: '/path/to/file.jpg',\n});\n\nconsole.log(response);",
      },
    },
  },
  {
    name: 'rename',
    endpoint: '/v1/files/rename',
    httpMethod: 'put',
    summary: 'Rename file',
    description:
      'You can rename an already existing file in the media library using rename file API. This operation would rename all file versions of the file. \n\nNote: The old URLs will stop working. The file/file version URLs cached on CDN will continue to work unless a purge is requested.\n',
    stainlessPath: '(resource) files > (method) rename',
    qualified: 'client.files.rename',
    params: ['filePath: string;', 'newFileName: string;', 'purgeCache?: boolean;'],
    response: '{ purgeRequestId?: string; }',
    markdown:
      "## rename\n\n`client.files.rename(filePath: string, newFileName: string, purgeCache?: boolean): { purgeRequestId?: string; }`\n\n**put** `/v1/files/rename`\n\nYou can rename an already existing file in the media library using rename file API. This operation would rename all file versions of the file. \n\nNote: The old URLs will stop working. The file/file version URLs cached on CDN will continue to work unless a purge is requested.\n\n\n### Parameters\n\n- `filePath: string`\n  The full path of the file you want to rename.\n\n\n- `newFileName: string`\n  The new name of the file. A filename can contain:\n\nAlphanumeric Characters: `a-z`, `A-Z`, `0-9` (including Unicode letters, marks, and numerals in other languages).\nSpecial Characters: `.`, `_`, and `-`.\n\nAny other character, including space, will be replaced by `_`.\n\n\n- `purgeCache?: boolean`\n  Option to purge cache for the old file and its versions' URLs.\n\nWhen set to true, it will internally issue a purge cache request on CDN to remove cached content of old file and its versions. This purge request is counted against your monthly purge quota.\n\nNote: If the old file were accessible at `https://ik.imagekit.io/demo/old-filename.jpg`, a purge cache request would be issued against `https://ik.imagekit.io/demo/old-filename.jpg*` (with a wildcard at the end). It will remove the file and its versions' URLs and any transformations made using query parameters on this file or its versions. However, the cache for file transformations made using path parameters will persist. You can purge them using the purge API. For more details, refer to the purge API documentation.\n\n\n\nDefault value - `false`\n\n\n### Returns\n\n- `{ purgeRequestId?: string; }`\n\n  - `purgeRequestId?: string`\n\n### Example\n\n```typescript\nimport ImageKit from '@imagekit/nodejs';\n\nconst client = new ImageKit();\n\nconst response = await client.files.rename({ filePath: '/path/to/file.jpg', newFileName: 'newFileName.jpg' });\n\nconsole.log(response);\n```",
    perLanguage: {
      cli: {
        method: 'files rename',
        example:
          "imagekit files rename \\\n  --private-key 'My Private Key' \\\n  --password 'My Password' \\\n  --file-path /path/to/file.jpg \\\n  --new-file-name newFileName.jpg",
      },
      csharp: {
        method: 'Files.Rename',
        example:
          'FileRenameParams parameters = new()\n{\n    FilePath = "/path/to/file.jpg",\n    NewFileName = "newFileName.jpg",\n};\n\nvar response = await client.Files.Rename(parameters);\n\nConsole.WriteLine(response);',
      },
      go: {
        method: 'client.Files.Rename',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/imagekit-developer/imagekit-go"\n\t"github.com/imagekit-developer/imagekit-go/option"\n)\n\nfunc main() {\n\tclient := imagekit.NewClient(\n\t\toption.WithPrivateKey("My Private Key"),\n\t\toption.WithPassword("My Password"),\n\t)\n\tresponse, err := client.Files.Rename(context.TODO(), imagekit.FileRenameParams{\n\t\tFilePath:    "/path/to/file.jpg",\n\t\tNewFileName: "newFileName.jpg",\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.PurgeRequestID)\n}\n',
      },
      http: {
        example:
          'curl https://api.imagekit.io/v1/files/rename \\\n    -X PUT \\\n    -H \'Content-Type: application/json\' \\\n    -u "$IMAGEKIT_PRIVATE_KEY:OPTIONAL_IMAGEKIT_IGNORES_THIS" \\\n    -d \'{\n          "filePath": "/path/to/file.jpg",\n          "newFileName": "newFileName.jpg",\n          "purgeCache": true\n        }\'',
      },
      java: {
        method: 'files().rename',
        example:
          'package com.imagekit.api.example;\n\nimport com.imagekit.api.client.ImageKitClient;\nimport com.imagekit.api.client.okhttp.ImageKitOkHttpClient;\nimport com.imagekit.api.models.files.FileRenameParams;\nimport com.imagekit.api.models.files.FileRenameResponse;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        ImageKitClient client = ImageKitOkHttpClient.fromEnv();\n\n        FileRenameParams params = FileRenameParams.builder()\n            .filePath("/path/to/file.jpg")\n            .newFileName("newFileName.jpg")\n            .build();\n        FileRenameResponse response = client.files().rename(params);\n    }\n}',
      },
      php: {
        method: 'files->rename',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(privateKey: 'My Private Key', password: 'My Password');\n\n$response = $client->files->rename(\n  filePath: '/path/to/file.jpg',\n  newFileName: 'newFileName.jpg',\n  purgeCache: true,\n);\n\nvar_dump($response);",
      },
      python: {
        method: 'files.rename',
        example:
          'import os\nfrom imagekitio import ImageKit\n\nclient = ImageKit(\n    private_key=os.environ.get("IMAGEKIT_PRIVATE_KEY"),  # This is the default and can be omitted\n    password=os.environ.get("OPTIONAL_IMAGEKIT_IGNORES_THIS"),  # This is the default and can be omitted\n)\nresponse = client.files.rename(\n    file_path="/path/to/file.jpg",\n    new_file_name="newFileName.jpg",\n)\nprint(response.purge_request_id)',
      },
      ruby: {
        method: 'files.rename',
        example:
          'require "imagekitio"\n\nimage_kit = Imagekitio::Client.new(private_key: "My Private Key", password: "My Password")\n\nresponse = image_kit.files.rename(file_path: "/path/to/file.jpg", new_file_name: "newFileName.jpg")\n\nputs(response)',
      },
      typescript: {
        method: 'client.files.rename',
        example:
          "import ImageKit from '@imagekit/nodejs';\n\nconst client = new ImageKit({\n  privateKey: process.env['IMAGEKIT_PRIVATE_KEY'], // This is the default and can be omitted\n  password: process.env['OPTIONAL_IMAGEKIT_IGNORES_THIS'], // This is the default and can be omitted\n});\n\nconst response = await client.files.rename({\n  filePath: '/path/to/file.jpg',\n  newFileName: 'newFileName.jpg',\n});\n\nconsole.log(response.purgeRequestId);",
      },
    },
  },
  {
    name: 'delete',
    endpoint: '/v1/files/batch/deleteByFileIds',
    httpMethod: 'post',
    summary: 'Delete multiple files',
    description:
      'This API deletes multiple files and all their file versions permanently.\n\nNote: If a file or specific transformation has been requested in the past, then the response is cached. Deleting a file does not purge the cache. You can purge the cache using purge cache API.\n\nA maximum of 100 files can be deleted at a time.\n',
    stainlessPath: '(resource) files.bulk > (method) delete',
    qualified: 'client.files.bulk.delete',
    params: ['fileIds: string[];'],
    response: '{ successfullyDeletedFileIds?: string[]; }',
    markdown:
      "## delete\n\n`client.files.bulk.delete(fileIds: string[]): { successfullyDeletedFileIds?: string[]; }`\n\n**post** `/v1/files/batch/deleteByFileIds`\n\nThis API deletes multiple files and all their file versions permanently.\n\nNote: If a file or specific transformation has been requested in the past, then the response is cached. Deleting a file does not purge the cache. You can purge the cache using purge cache API.\n\nA maximum of 100 files can be deleted at a time.\n\n\n### Parameters\n\n- `fileIds: string[]`\n  An array of fileIds which you want to delete.\n\n\n### Returns\n\n- `{ successfullyDeletedFileIds?: string[]; }`\n\n  - `successfullyDeletedFileIds?: string[]`\n\n### Example\n\n```typescript\nimport ImageKit from '@imagekit/nodejs';\n\nconst client = new ImageKit();\n\nconst bulk = await client.files.bulk.delete({ fileIds: ['598821f949c0a938d57563bd', '598821f949c0a938d57563be'] });\n\nconsole.log(bulk);\n```",
    perLanguage: {
      cli: {
        method: 'bulk delete',
        example:
          "imagekit files:bulk delete \\\n  --private-key 'My Private Key' \\\n  --password 'My Password' \\\n  --file-id 598821f949c0a938d57563bd \\\n  --file-id 598821f949c0a938d57563be",
      },
      csharp: {
        method: 'Files.Bulk.Delete',
        example:
          'BulkDeleteParams parameters = new()\n{\n    FileIds =\n    [\n        "598821f949c0a938d57563bd", "598821f949c0a938d57563be"\n    ],\n};\n\nvar bulk = await client.Files.Bulk.Delete(parameters);\n\nConsole.WriteLine(bulk);',
      },
      go: {
        method: 'client.Files.Bulk.Delete',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/imagekit-developer/imagekit-go"\n\t"github.com/imagekit-developer/imagekit-go/option"\n)\n\nfunc main() {\n\tclient := imagekit.NewClient(\n\t\toption.WithPrivateKey("My Private Key"),\n\t\toption.WithPassword("My Password"),\n\t)\n\tbulk, err := client.Files.Bulk.Delete(context.TODO(), imagekit.FileBulkDeleteParams{\n\t\tFileIDs: []string{"598821f949c0a938d57563bd", "598821f949c0a938d57563be"},\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", bulk.SuccessfullyDeletedFileIDs)\n}\n',
      },
      http: {
        example:
          'curl https://api.imagekit.io/v1/files/batch/deleteByFileIds \\\n    -H \'Content-Type: application/json\' \\\n    -u "$IMAGEKIT_PRIVATE_KEY:OPTIONAL_IMAGEKIT_IGNORES_THIS" \\\n    -d \'{\n          "fileIds": [\n            "598821f949c0a938d57563bd",\n            "598821f949c0a938d57563be"\n          ]\n        }\'',
      },
      java: {
        method: 'files().bulk().delete',
        example:
          'package com.imagekit.api.example;\n\nimport com.imagekit.api.client.ImageKitClient;\nimport com.imagekit.api.client.okhttp.ImageKitOkHttpClient;\nimport com.imagekit.api.models.files.bulk.BulkDeleteParams;\nimport com.imagekit.api.models.files.bulk.BulkDeleteResponse;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        ImageKitClient client = ImageKitOkHttpClient.fromEnv();\n\n        BulkDeleteParams params = BulkDeleteParams.builder()\n            .addFileId("598821f949c0a938d57563bd")\n            .addFileId("598821f949c0a938d57563be")\n            .build();\n        BulkDeleteResponse bulk = client.files().bulk().delete(params);\n    }\n}',
      },
      php: {
        method: 'files->bulk->delete',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(privateKey: 'My Private Key', password: 'My Password');\n\n$bulk = $client->files->bulk->delete(\n  fileIDs: ['598821f949c0a938d57563bd', '598821f949c0a938d57563be']\n);\n\nvar_dump($bulk);",
      },
      python: {
        method: 'files.bulk.delete',
        example:
          'import os\nfrom imagekitio import ImageKit\n\nclient = ImageKit(\n    private_key=os.environ.get("IMAGEKIT_PRIVATE_KEY"),  # This is the default and can be omitted\n    password=os.environ.get("OPTIONAL_IMAGEKIT_IGNORES_THIS"),  # This is the default and can be omitted\n)\nbulk = client.files.bulk.delete(\n    file_ids=["598821f949c0a938d57563bd", "598821f949c0a938d57563be"],\n)\nprint(bulk.successfully_deleted_file_ids)',
      },
      ruby: {
        method: 'files.bulk.delete',
        example:
          'require "imagekitio"\n\nimage_kit = Imagekitio::Client.new(private_key: "My Private Key", password: "My Password")\n\nbulk = image_kit.files.bulk.delete(file_ids: ["598821f949c0a938d57563bd", "598821f949c0a938d57563be"])\n\nputs(bulk)',
      },
      typescript: {
        method: 'client.files.bulk.delete',
        example:
          "import ImageKit from '@imagekit/nodejs';\n\nconst client = new ImageKit({\n  privateKey: process.env['IMAGEKIT_PRIVATE_KEY'], // This is the default and can be omitted\n  password: process.env['OPTIONAL_IMAGEKIT_IGNORES_THIS'], // This is the default and can be omitted\n});\n\nconst bulk = await client.files.bulk.delete({\n  fileIds: ['598821f949c0a938d57563bd', '598821f949c0a938d57563be'],\n});\n\nconsole.log(bulk.successfullyDeletedFileIds);",
      },
    },
  },
  {
    name: 'addTags',
    endpoint: '/v1/files/addTags',
    httpMethod: 'post',
    summary: 'Add tags (bulk)',
    description:
      'This API adds tags to multiple files in bulk. A maximum of 50 files can be specified at a time.\n',
    stainlessPath: '(resource) files.bulk > (method) addTags',
    qualified: 'client.files.bulk.addTags',
    params: ['fileIds: string[];', 'tags: string[];'],
    response: '{ successfullyUpdatedFileIds?: string[]; }',
    markdown:
      "## addTags\n\n`client.files.bulk.addTags(fileIds: string[], tags: string[]): { successfullyUpdatedFileIds?: string[]; }`\n\n**post** `/v1/files/addTags`\n\nThis API adds tags to multiple files in bulk. A maximum of 50 files can be specified at a time.\n\n\n### Parameters\n\n- `fileIds: string[]`\n  An array of fileIds to which you want to add tags.\n\n\n- `tags: string[]`\n  An array of tags that you want to add to the files.\n\n\n### Returns\n\n- `{ successfullyUpdatedFileIds?: string[]; }`\n\n  - `successfullyUpdatedFileIds?: string[]`\n\n### Example\n\n```typescript\nimport ImageKit from '@imagekit/nodejs';\n\nconst client = new ImageKit();\n\nconst response = await client.files.bulk.addTags({ fileIds: ['598821f949c0a938d57563bd', '598821f949c0a938d57563be'], tags: ['t-shirt', 'round-neck', 'sale2019'] });\n\nconsole.log(response);\n```",
    perLanguage: {
      cli: {
        method: 'bulk addTags',
        example:
          "imagekit files:bulk add-tags \\\n  --private-key 'My Private Key' \\\n  --password 'My Password' \\\n  --file-id 598821f949c0a938d57563bd \\\n  --file-id 598821f949c0a938d57563be \\\n  --tag t-shirt \\\n  --tag round-neck \\\n  --tag sale2019",
      },
      csharp: {
        method: 'Files.Bulk.AddTags',
        example:
          'BulkAddTagsParams parameters = new()\n{\n    FileIds =\n    [\n        "598821f949c0a938d57563bd", "598821f949c0a938d57563be"\n    ],\n    Tags =\n    [\n        "t-shirt", "round-neck", "sale2019"\n    ],\n};\n\nvar response = await client.Files.Bulk.AddTags(parameters);\n\nConsole.WriteLine(response);',
      },
      go: {
        method: 'client.Files.Bulk.AddTags',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/imagekit-developer/imagekit-go"\n\t"github.com/imagekit-developer/imagekit-go/option"\n)\n\nfunc main() {\n\tclient := imagekit.NewClient(\n\t\toption.WithPrivateKey("My Private Key"),\n\t\toption.WithPassword("My Password"),\n\t)\n\tresponse, err := client.Files.Bulk.AddTags(context.TODO(), imagekit.FileBulkAddTagsParams{\n\t\tFileIDs: []string{"598821f949c0a938d57563bd", "598821f949c0a938d57563be"},\n\t\tTags:    []string{"t-shirt", "round-neck", "sale2019"},\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.SuccessfullyUpdatedFileIDs)\n}\n',
      },
      http: {
        example:
          'curl https://api.imagekit.io/v1/files/addTags \\\n    -H \'Content-Type: application/json\' \\\n    -u "$IMAGEKIT_PRIVATE_KEY:OPTIONAL_IMAGEKIT_IGNORES_THIS" \\\n    -d \'{\n          "fileIds": [\n            "598821f949c0a938d57563bd",\n            "598821f949c0a938d57563be"\n          ],\n          "tags": [\n            "t-shirt",\n            "round-neck",\n            "sale2019"\n          ]\n        }\'',
      },
      java: {
        method: 'files().bulk().addTags',
        example:
          'package com.imagekit.api.example;\n\nimport com.imagekit.api.client.ImageKitClient;\nimport com.imagekit.api.client.okhttp.ImageKitOkHttpClient;\nimport com.imagekit.api.models.files.bulk.BulkAddTagsParams;\nimport com.imagekit.api.models.files.bulk.BulkAddTagsResponse;\nimport java.util.List;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        ImageKitClient client = ImageKitOkHttpClient.fromEnv();\n\n        BulkAddTagsParams params = BulkAddTagsParams.builder()\n            .addFileId("598821f949c0a938d57563bd")\n            .addFileId("598821f949c0a938d57563be")\n            .tags(List.of(\n              "t-shirt",\n              "round-neck",\n              "sale2019"\n            ))\n            .build();\n        BulkAddTagsResponse response = client.files().bulk().addTags(params);\n    }\n}',
      },
      php: {
        method: 'files->bulk->addTags',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(privateKey: 'My Private Key', password: 'My Password');\n\n$response = $client->files->bulk->addTags(\n  fileIDs: ['598821f949c0a938d57563bd', '598821f949c0a938d57563be'],\n  tags: ['t-shirt', 'round-neck', 'sale2019'],\n);\n\nvar_dump($response);",
      },
      python: {
        method: 'files.bulk.add_tags',
        example:
          'import os\nfrom imagekitio import ImageKit\n\nclient = ImageKit(\n    private_key=os.environ.get("IMAGEKIT_PRIVATE_KEY"),  # This is the default and can be omitted\n    password=os.environ.get("OPTIONAL_IMAGEKIT_IGNORES_THIS"),  # This is the default and can be omitted\n)\nresponse = client.files.bulk.add_tags(\n    file_ids=["598821f949c0a938d57563bd", "598821f949c0a938d57563be"],\n    tags=["t-shirt", "round-neck", "sale2019"],\n)\nprint(response.successfully_updated_file_ids)',
      },
      ruby: {
        method: 'files.bulk.add_tags',
        example:
          'require "imagekitio"\n\nimage_kit = Imagekitio::Client.new(private_key: "My Private Key", password: "My Password")\n\nresponse = image_kit.files.bulk.add_tags(\n  file_ids: ["598821f949c0a938d57563bd", "598821f949c0a938d57563be"],\n  tags: ["t-shirt", "round-neck", "sale2019"]\n)\n\nputs(response)',
      },
      typescript: {
        method: 'client.files.bulk.addTags',
        example:
          "import ImageKit from '@imagekit/nodejs';\n\nconst client = new ImageKit({\n  privateKey: process.env['IMAGEKIT_PRIVATE_KEY'], // This is the default and can be omitted\n  password: process.env['OPTIONAL_IMAGEKIT_IGNORES_THIS'], // This is the default and can be omitted\n});\n\nconst response = await client.files.bulk.addTags({\n  fileIds: ['598821f949c0a938d57563bd', '598821f949c0a938d57563be'],\n  tags: ['t-shirt', 'round-neck', 'sale2019'],\n});\n\nconsole.log(response.successfullyUpdatedFileIds);",
      },
    },
  },
  {
    name: 'removeTags',
    endpoint: '/v1/files/removeTags',
    httpMethod: 'post',
    summary: 'Remove tags (bulk)',
    description:
      'This API removes tags from multiple files in bulk. A maximum of 50 files can be specified at a time.\n',
    stainlessPath: '(resource) files.bulk > (method) removeTags',
    qualified: 'client.files.bulk.removeTags',
    params: ['fileIds: string[];', 'tags: string[];'],
    response: '{ successfullyUpdatedFileIds?: string[]; }',
    markdown:
      "## removeTags\n\n`client.files.bulk.removeTags(fileIds: string[], tags: string[]): { successfullyUpdatedFileIds?: string[]; }`\n\n**post** `/v1/files/removeTags`\n\nThis API removes tags from multiple files in bulk. A maximum of 50 files can be specified at a time.\n\n\n### Parameters\n\n- `fileIds: string[]`\n  An array of fileIds from which you want to remove tags.\n\n\n- `tags: string[]`\n  An array of tags that you want to remove from the files.\n\n\n### Returns\n\n- `{ successfullyUpdatedFileIds?: string[]; }`\n\n  - `successfullyUpdatedFileIds?: string[]`\n\n### Example\n\n```typescript\nimport ImageKit from '@imagekit/nodejs';\n\nconst client = new ImageKit();\n\nconst response = await client.files.bulk.removeTags({ fileIds: ['598821f949c0a938d57563bd', '598821f949c0a938d57563be'], tags: ['t-shirt', 'round-neck', 'sale2019'] });\n\nconsole.log(response);\n```",
    perLanguage: {
      cli: {
        method: 'bulk removeTags',
        example:
          "imagekit files:bulk remove-tags \\\n  --private-key 'My Private Key' \\\n  --password 'My Password' \\\n  --file-id 598821f949c0a938d57563bd \\\n  --file-id 598821f949c0a938d57563be \\\n  --tag t-shirt \\\n  --tag round-neck \\\n  --tag sale2019",
      },
      csharp: {
        method: 'Files.Bulk.RemoveTags',
        example:
          'BulkRemoveTagsParams parameters = new()\n{\n    FileIds =\n    [\n        "598821f949c0a938d57563bd", "598821f949c0a938d57563be"\n    ],\n    Tags =\n    [\n        "t-shirt", "round-neck", "sale2019"\n    ],\n};\n\nvar response = await client.Files.Bulk.RemoveTags(parameters);\n\nConsole.WriteLine(response);',
      },
      go: {
        method: 'client.Files.Bulk.RemoveTags',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/imagekit-developer/imagekit-go"\n\t"github.com/imagekit-developer/imagekit-go/option"\n)\n\nfunc main() {\n\tclient := imagekit.NewClient(\n\t\toption.WithPrivateKey("My Private Key"),\n\t\toption.WithPassword("My Password"),\n\t)\n\tresponse, err := client.Files.Bulk.RemoveTags(context.TODO(), imagekit.FileBulkRemoveTagsParams{\n\t\tFileIDs: []string{"598821f949c0a938d57563bd", "598821f949c0a938d57563be"},\n\t\tTags:    []string{"t-shirt", "round-neck", "sale2019"},\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.SuccessfullyUpdatedFileIDs)\n}\n',
      },
      http: {
        example:
          'curl https://api.imagekit.io/v1/files/removeTags \\\n    -H \'Content-Type: application/json\' \\\n    -u "$IMAGEKIT_PRIVATE_KEY:OPTIONAL_IMAGEKIT_IGNORES_THIS" \\\n    -d \'{\n          "fileIds": [\n            "598821f949c0a938d57563bd",\n            "598821f949c0a938d57563be"\n          ],\n          "tags": [\n            "t-shirt",\n            "round-neck",\n            "sale2019"\n          ]\n        }\'',
      },
      java: {
        method: 'files().bulk().removeTags',
        example:
          'package com.imagekit.api.example;\n\nimport com.imagekit.api.client.ImageKitClient;\nimport com.imagekit.api.client.okhttp.ImageKitOkHttpClient;\nimport com.imagekit.api.models.files.bulk.BulkRemoveTagsParams;\nimport com.imagekit.api.models.files.bulk.BulkRemoveTagsResponse;\nimport java.util.List;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        ImageKitClient client = ImageKitOkHttpClient.fromEnv();\n\n        BulkRemoveTagsParams params = BulkRemoveTagsParams.builder()\n            .addFileId("598821f949c0a938d57563bd")\n            .addFileId("598821f949c0a938d57563be")\n            .tags(List.of(\n              "t-shirt",\n              "round-neck",\n              "sale2019"\n            ))\n            .build();\n        BulkRemoveTagsResponse response = client.files().bulk().removeTags(params);\n    }\n}',
      },
      php: {
        method: 'files->bulk->removeTags',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(privateKey: 'My Private Key', password: 'My Password');\n\n$response = $client->files->bulk->removeTags(\n  fileIDs: ['598821f949c0a938d57563bd', '598821f949c0a938d57563be'],\n  tags: ['t-shirt', 'round-neck', 'sale2019'],\n);\n\nvar_dump($response);",
      },
      python: {
        method: 'files.bulk.remove_tags',
        example:
          'import os\nfrom imagekitio import ImageKit\n\nclient = ImageKit(\n    private_key=os.environ.get("IMAGEKIT_PRIVATE_KEY"),  # This is the default and can be omitted\n    password=os.environ.get("OPTIONAL_IMAGEKIT_IGNORES_THIS"),  # This is the default and can be omitted\n)\nresponse = client.files.bulk.remove_tags(\n    file_ids=["598821f949c0a938d57563bd", "598821f949c0a938d57563be"],\n    tags=["t-shirt", "round-neck", "sale2019"],\n)\nprint(response.successfully_updated_file_ids)',
      },
      ruby: {
        method: 'files.bulk.remove_tags',
        example:
          'require "imagekitio"\n\nimage_kit = Imagekitio::Client.new(private_key: "My Private Key", password: "My Password")\n\nresponse = image_kit.files.bulk.remove_tags(\n  file_ids: ["598821f949c0a938d57563bd", "598821f949c0a938d57563be"],\n  tags: ["t-shirt", "round-neck", "sale2019"]\n)\n\nputs(response)',
      },
      typescript: {
        method: 'client.files.bulk.removeTags',
        example:
          "import ImageKit from '@imagekit/nodejs';\n\nconst client = new ImageKit({\n  privateKey: process.env['IMAGEKIT_PRIVATE_KEY'], // This is the default and can be omitted\n  password: process.env['OPTIONAL_IMAGEKIT_IGNORES_THIS'], // This is the default and can be omitted\n});\n\nconst response = await client.files.bulk.removeTags({\n  fileIds: ['598821f949c0a938d57563bd', '598821f949c0a938d57563be'],\n  tags: ['t-shirt', 'round-neck', 'sale2019'],\n});\n\nconsole.log(response.successfullyUpdatedFileIds);",
      },
    },
  },
  {
    name: 'removeAiTags',
    endpoint: '/v1/files/removeAITags',
    httpMethod: 'post',
    summary: 'Remove AI tags (bulk)',
    description:
      'This API removes AITags from multiple files in bulk. A maximum of 50 files can be specified at a time.\n',
    stainlessPath: '(resource) files.bulk > (method) removeAiTags',
    qualified: 'client.files.bulk.removeAITags',
    params: ['AITags: string[];', 'fileIds: string[];'],
    response: '{ successfullyUpdatedFileIds?: string[]; }',
    markdown:
      "## removeAiTags\n\n`client.files.bulk.removeAITags(AITags: string[], fileIds: string[]): { successfullyUpdatedFileIds?: string[]; }`\n\n**post** `/v1/files/removeAITags`\n\nThis API removes AITags from multiple files in bulk. A maximum of 50 files can be specified at a time.\n\n\n### Parameters\n\n- `AITags: string[]`\n  An array of AITags that you want to remove from the files.\n\n\n- `fileIds: string[]`\n  An array of fileIds from which you want to remove AITags.\n\n\n### Returns\n\n- `{ successfullyUpdatedFileIds?: string[]; }`\n\n  - `successfullyUpdatedFileIds?: string[]`\n\n### Example\n\n```typescript\nimport ImageKit from '@imagekit/nodejs';\n\nconst client = new ImageKit();\n\nconst response = await client.files.bulk.removeAITags({ AITags: ['t-shirt', 'round-neck', 'sale2019'], fileIds: ['598821f949c0a938d57563bd', '598821f949c0a938d57563be'] });\n\nconsole.log(response);\n```",
    perLanguage: {
      cli: {
        method: 'bulk removeAiTags',
        example:
          "imagekit files:bulk remove-ai-tags \\\n  --private-key 'My Private Key' \\\n  --password 'My Password' \\\n  --ai-tag t-shirt \\\n  --ai-tag round-neck \\\n  --ai-tag sale2019 \\\n  --file-id 598821f949c0a938d57563bd \\\n  --file-id 598821f949c0a938d57563be",
      },
      csharp: {
        method: 'Files.Bulk.RemoveAITags',
        example:
          'BulkRemoveAITagsParams parameters = new()\n{\n    AITags =\n    [\n        "t-shirt", "round-neck", "sale2019"\n    ],\n    FileIds =\n    [\n        "598821f949c0a938d57563bd", "598821f949c0a938d57563be"\n    ],\n};\n\nvar response = await client.Files.Bulk.RemoveAITags(parameters);\n\nConsole.WriteLine(response);',
      },
      go: {
        method: 'client.Files.Bulk.RemoveAITags',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/imagekit-developer/imagekit-go"\n\t"github.com/imagekit-developer/imagekit-go/option"\n)\n\nfunc main() {\n\tclient := imagekit.NewClient(\n\t\toption.WithPrivateKey("My Private Key"),\n\t\toption.WithPassword("My Password"),\n\t)\n\tresponse, err := client.Files.Bulk.RemoveAITags(context.TODO(), imagekit.FileBulkRemoveAITagsParams{\n\t\tAITags:  []string{"t-shirt", "round-neck", "sale2019"},\n\t\tFileIDs: []string{"598821f949c0a938d57563bd", "598821f949c0a938d57563be"},\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.SuccessfullyUpdatedFileIDs)\n}\n',
      },
      http: {
        example:
          'curl https://api.imagekit.io/v1/files/removeAITags \\\n    -H \'Content-Type: application/json\' \\\n    -u "$IMAGEKIT_PRIVATE_KEY:OPTIONAL_IMAGEKIT_IGNORES_THIS" \\\n    -d \'{\n          "AITags": [\n            "t-shirt",\n            "round-neck",\n            "sale2019"\n          ],\n          "fileIds": [\n            "598821f949c0a938d57563bd",\n            "598821f949c0a938d57563be"\n          ]\n        }\'',
      },
      java: {
        method: 'files().bulk().removeAiTags',
        example:
          'package com.imagekit.api.example;\n\nimport com.imagekit.api.client.ImageKitClient;\nimport com.imagekit.api.client.okhttp.ImageKitOkHttpClient;\nimport com.imagekit.api.models.files.bulk.BulkRemoveAiTagsParams;\nimport com.imagekit.api.models.files.bulk.BulkRemoveAiTagsResponse;\nimport java.util.List;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        ImageKitClient client = ImageKitOkHttpClient.fromEnv();\n\n        BulkRemoveAiTagsParams params = BulkRemoveAiTagsParams.builder()\n            .aiTags(List.of(\n              "t-shirt",\n              "round-neck",\n              "sale2019"\n            ))\n            .addFileId("598821f949c0a938d57563bd")\n            .addFileId("598821f949c0a938d57563be")\n            .build();\n        BulkRemoveAiTagsResponse response = client.files().bulk().removeAiTags(params);\n    }\n}',
      },
      php: {
        method: 'files->bulk->removeAITags',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(privateKey: 'My Private Key', password: 'My Password');\n\n$response = $client->files->bulk->removeAITags(\n  aiTags: ['t-shirt', 'round-neck', 'sale2019'],\n  fileIDs: ['598821f949c0a938d57563bd', '598821f949c0a938d57563be'],\n);\n\nvar_dump($response);",
      },
      python: {
        method: 'files.bulk.remove_ai_tags',
        example:
          'import os\nfrom imagekitio import ImageKit\n\nclient = ImageKit(\n    private_key=os.environ.get("IMAGEKIT_PRIVATE_KEY"),  # This is the default and can be omitted\n    password=os.environ.get("OPTIONAL_IMAGEKIT_IGNORES_THIS"),  # This is the default and can be omitted\n)\nresponse = client.files.bulk.remove_ai_tags(\n    ai_tags=["t-shirt", "round-neck", "sale2019"],\n    file_ids=["598821f949c0a938d57563bd", "598821f949c0a938d57563be"],\n)\nprint(response.successfully_updated_file_ids)',
      },
      ruby: {
        method: 'files.bulk.remove_ai_tags',
        example:
          'require "imagekitio"\n\nimage_kit = Imagekitio::Client.new(private_key: "My Private Key", password: "My Password")\n\nresponse = image_kit.files.bulk.remove_ai_tags(\n  ai_tags: ["t-shirt", "round-neck", "sale2019"],\n  file_ids: ["598821f949c0a938d57563bd", "598821f949c0a938d57563be"]\n)\n\nputs(response)',
      },
      typescript: {
        method: 'client.files.bulk.removeAITags',
        example:
          "import ImageKit from '@imagekit/nodejs';\n\nconst client = new ImageKit({\n  privateKey: process.env['IMAGEKIT_PRIVATE_KEY'], // This is the default and can be omitted\n  password: process.env['OPTIONAL_IMAGEKIT_IGNORES_THIS'], // This is the default and can be omitted\n});\n\nconst response = await client.files.bulk.removeAITags({\n  AITags: ['t-shirt', 'round-neck', 'sale2019'],\n  fileIds: ['598821f949c0a938d57563bd', '598821f949c0a938d57563be'],\n});\n\nconsole.log(response.successfullyUpdatedFileIds);",
      },
    },
  },
  {
    name: 'list',
    endpoint: '/v1/files/{fileId}/versions',
    httpMethod: 'get',
    summary: 'List file versions',
    description: 'This API returns details of all versions of a file.\n',
    stainlessPath: '(resource) files.versions > (method) list',
    qualified: 'client.files.versions.list',
    params: ['fileId: string;'],
    response:
      "{ AITags?: { confidence?: number; name?: string; source?: string; }[]; audioCodec?: string; bitRate?: number; createdAt?: string; customCoordinates?: string; customMetadata?: object; description?: string; duration?: number; embeddedMetadata?: object; fileId?: string; filePath?: string; fileType?: string; hasAlpha?: boolean; height?: number; isPrivateFile?: boolean; isPublished?: boolean; mime?: string; name?: string; selectedFieldsSchema?: object; size?: number; tags?: string[]; thumbnail?: string; type?: 'file' | 'file-version'; updatedAt?: string; url?: string; versionInfo?: { id?: string; name?: string; }; videoCodec?: string; width?: number; }[]",
    markdown:
      "## list\n\n`client.files.versions.list(fileId: string): object[]`\n\n**get** `/v1/files/{fileId}/versions`\n\nThis API returns details of all versions of a file.\n\n\n### Parameters\n\n- `fileId: string`\n\n### Returns\n\n- `{ AITags?: { confidence?: number; name?: string; source?: string; }[]; audioCodec?: string; bitRate?: number; createdAt?: string; customCoordinates?: string; customMetadata?: object; description?: string; duration?: number; embeddedMetadata?: object; fileId?: string; filePath?: string; fileType?: string; hasAlpha?: boolean; height?: number; isPrivateFile?: boolean; isPublished?: boolean; mime?: string; name?: string; selectedFieldsSchema?: object; size?: number; tags?: string[]; thumbnail?: string; type?: 'file' | 'file-version'; updatedAt?: string; url?: string; versionInfo?: { id?: string; name?: string; }; videoCodec?: string; width?: number; }[]`\n\n### Example\n\n```typescript\nimport ImageKit from '@imagekit/nodejs';\n\nconst client = new ImageKit();\n\nconst files = await client.files.versions.list('fileId');\n\nconsole.log(files);\n```",
    perLanguage: {
      cli: {
        method: 'versions list',
        example:
          "imagekit files:versions list \\\n  --private-key 'My Private Key' \\\n  --password 'My Password' \\\n  --file-id fileId",
      },
      csharp: {
        method: 'Files.Versions.List',
        example:
          'VersionListParams parameters = new() { FileID = "fileId" };\n\nvar files = await client.Files.Versions.List(parameters);\n\nConsole.WriteLine(files);',
      },
      go: {
        method: 'client.Files.Versions.List',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/imagekit-developer/imagekit-go"\n\t"github.com/imagekit-developer/imagekit-go/option"\n)\n\nfunc main() {\n\tclient := imagekit.NewClient(\n\t\toption.WithPrivateKey("My Private Key"),\n\t\toption.WithPassword("My Password"),\n\t)\n\tfiles, err := client.Files.Versions.List(context.TODO(), "fileId")\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", files)\n}\n',
      },
      http: {
        example:
          'curl https://api.imagekit.io/v1/files/$FILE_ID/versions \\\n    -u "$IMAGEKIT_PRIVATE_KEY:OPTIONAL_IMAGEKIT_IGNORES_THIS"',
      },
      java: {
        method: 'files().versions().list',
        example:
          'package com.imagekit.api.example;\n\nimport com.imagekit.api.client.ImageKitClient;\nimport com.imagekit.api.client.okhttp.ImageKitOkHttpClient;\nimport com.imagekit.api.models.files.File;\nimport com.imagekit.api.models.files.versions.VersionListParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        ImageKitClient client = ImageKitOkHttpClient.fromEnv();\n\n        List<File> files = client.files().versions().list("fileId");\n    }\n}',
      },
      php: {
        method: 'files->versions->list',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(privateKey: 'My Private Key', password: 'My Password');\n\n$files = $client->files->versions->list('fileId');\n\nvar_dump($files);",
      },
      python: {
        method: 'files.versions.list',
        example:
          'import os\nfrom imagekitio import ImageKit\n\nclient = ImageKit(\n    private_key=os.environ.get("IMAGEKIT_PRIVATE_KEY"),  # This is the default and can be omitted\n    password=os.environ.get("OPTIONAL_IMAGEKIT_IGNORES_THIS"),  # This is the default and can be omitted\n)\nfiles = client.files.versions.list(\n    "fileId",\n)\nprint(files)',
      },
      ruby: {
        method: 'files.versions.list',
        example:
          'require "imagekitio"\n\nimage_kit = Imagekitio::Client.new(private_key: "My Private Key", password: "My Password")\n\nfiles = image_kit.files.versions.list("fileId")\n\nputs(files)',
      },
      typescript: {
        method: 'client.files.versions.list',
        example:
          "import ImageKit from '@imagekit/nodejs';\n\nconst client = new ImageKit({\n  privateKey: process.env['IMAGEKIT_PRIVATE_KEY'], // This is the default and can be omitted\n  password: process.env['OPTIONAL_IMAGEKIT_IGNORES_THIS'], // This is the default and can be omitted\n});\n\nconst files = await client.files.versions.list('fileId');\n\nconsole.log(files);",
      },
    },
  },
  {
    name: 'get',
    endpoint: '/v1/files/{fileId}/versions/{versionId}',
    httpMethod: 'get',
    summary: 'Get file version details',
    description: 'This API returns an object with details or attributes of a file version.',
    stainlessPath: '(resource) files.versions > (method) get',
    qualified: 'client.files.versions.get',
    params: ['fileId: string;', 'versionId: string;'],
    response:
      "{ AITags?: { confidence?: number; name?: string; source?: string; }[]; audioCodec?: string; bitRate?: number; createdAt?: string; customCoordinates?: string; customMetadata?: object; description?: string; duration?: number; embeddedMetadata?: object; fileId?: string; filePath?: string; fileType?: string; hasAlpha?: boolean; height?: number; isPrivateFile?: boolean; isPublished?: boolean; mime?: string; name?: string; selectedFieldsSchema?: object; size?: number; tags?: string[]; thumbnail?: string; type?: 'file' | 'file-version'; updatedAt?: string; url?: string; versionInfo?: { id?: string; name?: string; }; videoCodec?: string; width?: number; }",
    markdown:
      "## get\n\n`client.files.versions.get(fileId: string, versionId: string): { AITags?: object[]; audioCodec?: string; bitRate?: number; createdAt?: string; customCoordinates?: string; customMetadata?: object; description?: string; duration?: number; embeddedMetadata?: object; fileId?: string; filePath?: string; fileType?: string; hasAlpha?: boolean; height?: number; isPrivateFile?: boolean; isPublished?: boolean; mime?: string; name?: string; selectedFieldsSchema?: object; size?: number; tags?: string[]; thumbnail?: string; type?: 'file' | 'file-version'; updatedAt?: string; url?: string; versionInfo?: object; videoCodec?: string; width?: number; }`\n\n**get** `/v1/files/{fileId}/versions/{versionId}`\n\nThis API returns an object with details or attributes of a file version.\n\n### Parameters\n\n- `fileId: string`\n\n- `versionId: string`\n\n### Returns\n\n- `{ AITags?: { confidence?: number; name?: string; source?: string; }[]; audioCodec?: string; bitRate?: number; createdAt?: string; customCoordinates?: string; customMetadata?: object; description?: string; duration?: number; embeddedMetadata?: object; fileId?: string; filePath?: string; fileType?: string; hasAlpha?: boolean; height?: number; isPrivateFile?: boolean; isPublished?: boolean; mime?: string; name?: string; selectedFieldsSchema?: object; size?: number; tags?: string[]; thumbnail?: string; type?: 'file' | 'file-version'; updatedAt?: string; url?: string; versionInfo?: { id?: string; name?: string; }; videoCodec?: string; width?: number; }`\n  Object containing details of a file or file version.\n\n  - `AITags?: { confidence?: number; name?: string; source?: string; }[]`\n  - `audioCodec?: string`\n  - `bitRate?: number`\n  - `createdAt?: string`\n  - `customCoordinates?: string`\n  - `customMetadata?: object`\n  - `description?: string`\n  - `duration?: number`\n  - `embeddedMetadata?: object`\n  - `fileId?: string`\n  - `filePath?: string`\n  - `fileType?: string`\n  - `hasAlpha?: boolean`\n  - `height?: number`\n  - `isPrivateFile?: boolean`\n  - `isPublished?: boolean`\n  - `mime?: string`\n  - `name?: string`\n  - `selectedFieldsSchema?: object`\n  - `size?: number`\n  - `tags?: string[]`\n  - `thumbnail?: string`\n  - `type?: 'file' | 'file-version'`\n  - `updatedAt?: string`\n  - `url?: string`\n  - `versionInfo?: { id?: string; name?: string; }`\n  - `videoCodec?: string`\n  - `width?: number`\n\n### Example\n\n```typescript\nimport ImageKit from '@imagekit/nodejs';\n\nconst client = new ImageKit();\n\nconst file = await client.files.versions.get('versionId', { fileId: 'fileId' });\n\nconsole.log(file);\n```",
    perLanguage: {
      cli: {
        method: 'versions get',
        example:
          "imagekit files:versions get \\\n  --private-key 'My Private Key' \\\n  --password 'My Password' \\\n  --file-id fileId \\\n  --version-id versionId",
      },
      csharp: {
        method: 'Files.Versions.Get',
        example:
          'VersionGetParams parameters = new()\n{\n    FileID = "fileId",\n    VersionID = "versionId",\n};\n\nvar file = await client.Files.Versions.Get(parameters);\n\nConsole.WriteLine(file);',
      },
      go: {
        method: 'client.Files.Versions.Get',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/imagekit-developer/imagekit-go"\n\t"github.com/imagekit-developer/imagekit-go/option"\n)\n\nfunc main() {\n\tclient := imagekit.NewClient(\n\t\toption.WithPrivateKey("My Private Key"),\n\t\toption.WithPassword("My Password"),\n\t)\n\tfile, err := client.Files.Versions.Get(\n\t\tcontext.TODO(),\n\t\t"versionId",\n\t\timagekit.FileVersionGetParams{\n\t\t\tFileID: "fileId",\n\t\t},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", file.VideoCodec)\n}\n',
      },
      http: {
        example:
          'curl https://api.imagekit.io/v1/files/$FILE_ID/versions/$VERSION_ID \\\n    -u "$IMAGEKIT_PRIVATE_KEY:OPTIONAL_IMAGEKIT_IGNORES_THIS"',
      },
      java: {
        method: 'files().versions().get',
        example:
          'package com.imagekit.api.example;\n\nimport com.imagekit.api.client.ImageKitClient;\nimport com.imagekit.api.client.okhttp.ImageKitOkHttpClient;\nimport com.imagekit.api.models.files.File;\nimport com.imagekit.api.models.files.versions.VersionGetParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        ImageKitClient client = ImageKitOkHttpClient.fromEnv();\n\n        VersionGetParams params = VersionGetParams.builder()\n            .fileId("fileId")\n            .versionId("versionId")\n            .build();\n        File file = client.files().versions().get(params);\n    }\n}',
      },
      php: {
        method: 'files->versions->get',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(privateKey: 'My Private Key', password: 'My Password');\n\n$file = $client->files->versions->get('versionId', fileID: 'fileId');\n\nvar_dump($file);",
      },
      python: {
        method: 'files.versions.get',
        example:
          'import os\nfrom imagekitio import ImageKit\n\nclient = ImageKit(\n    private_key=os.environ.get("IMAGEKIT_PRIVATE_KEY"),  # This is the default and can be omitted\n    password=os.environ.get("OPTIONAL_IMAGEKIT_IGNORES_THIS"),  # This is the default and can be omitted\n)\nfile = client.files.versions.get(\n    version_id="versionId",\n    file_id="fileId",\n)\nprint(file.video_codec)',
      },
      ruby: {
        method: 'files.versions.get',
        example:
          'require "imagekitio"\n\nimage_kit = Imagekitio::Client.new(private_key: "My Private Key", password: "My Password")\n\nfile = image_kit.files.versions.get("versionId", file_id: "fileId")\n\nputs(file)',
      },
      typescript: {
        method: 'client.files.versions.get',
        example:
          "import ImageKit from '@imagekit/nodejs';\n\nconst client = new ImageKit({\n  privateKey: process.env['IMAGEKIT_PRIVATE_KEY'], // This is the default and can be omitted\n  password: process.env['OPTIONAL_IMAGEKIT_IGNORES_THIS'], // This is the default and can be omitted\n});\n\nconst file = await client.files.versions.get('versionId', { fileId: 'fileId' });\n\nconsole.log(file.videoCodec);",
      },
    },
  },
  {
    name: 'delete',
    endpoint: '/v1/files/{fileId}/versions/{versionId}',
    httpMethod: 'delete',
    summary: 'Delete file version',
    description:
      'This API deletes a non-current file version permanently. The API returns an empty response.\n\nNote: If you want to delete all versions of a file, use the delete file API.\n',
    stainlessPath: '(resource) files.versions > (method) delete',
    qualified: 'client.files.versions.delete',
    params: ['fileId: string;', 'versionId: string;'],
    response: '{  }',
    markdown:
      "## delete\n\n`client.files.versions.delete(fileId: string, versionId: string): {  }`\n\n**delete** `/v1/files/{fileId}/versions/{versionId}`\n\nThis API deletes a non-current file version permanently. The API returns an empty response.\n\nNote: If you want to delete all versions of a file, use the delete file API.\n\n\n### Parameters\n\n- `fileId: string`\n\n- `versionId: string`\n\n### Returns\n\n- `{  }`\n\n\n### Example\n\n```typescript\nimport ImageKit from '@imagekit/nodejs';\n\nconst client = new ImageKit();\n\nconst version = await client.files.versions.delete('versionId', { fileId: 'fileId' });\n\nconsole.log(version);\n```",
    perLanguage: {
      cli: {
        method: 'versions delete',
        example:
          "imagekit files:versions delete \\\n  --private-key 'My Private Key' \\\n  --password 'My Password' \\\n  --file-id fileId \\\n  --version-id versionId",
      },
      csharp: {
        method: 'Files.Versions.Delete',
        example:
          'VersionDeleteParams parameters = new()\n{\n    FileID = "fileId",\n    VersionID = "versionId",\n};\n\nvar version = await client.Files.Versions.Delete(parameters);\n\nConsole.WriteLine(version);',
      },
      go: {
        method: 'client.Files.Versions.Delete',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/imagekit-developer/imagekit-go"\n\t"github.com/imagekit-developer/imagekit-go/option"\n)\n\nfunc main() {\n\tclient := imagekit.NewClient(\n\t\toption.WithPrivateKey("My Private Key"),\n\t\toption.WithPassword("My Password"),\n\t)\n\tversion, err := client.Files.Versions.Delete(\n\t\tcontext.TODO(),\n\t\t"versionId",\n\t\timagekit.FileVersionDeleteParams{\n\t\t\tFileID: "fileId",\n\t\t},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", version)\n}\n',
      },
      http: {
        example:
          'curl https://api.imagekit.io/v1/files/$FILE_ID/versions/$VERSION_ID \\\n    -X DELETE \\\n    -u "$IMAGEKIT_PRIVATE_KEY:OPTIONAL_IMAGEKIT_IGNORES_THIS"',
      },
      java: {
        method: 'files().versions().delete',
        example:
          'package com.imagekit.api.example;\n\nimport com.imagekit.api.client.ImageKitClient;\nimport com.imagekit.api.client.okhttp.ImageKitOkHttpClient;\nimport com.imagekit.api.models.files.versions.VersionDeleteParams;\nimport com.imagekit.api.models.files.versions.VersionDeleteResponse;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        ImageKitClient client = ImageKitOkHttpClient.fromEnv();\n\n        VersionDeleteParams params = VersionDeleteParams.builder()\n            .fileId("fileId")\n            .versionId("versionId")\n            .build();\n        VersionDeleteResponse version = client.files().versions().delete(params);\n    }\n}',
      },
      php: {
        method: 'files->versions->delete',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(privateKey: 'My Private Key', password: 'My Password');\n\n$version = $client->files->versions->delete('versionId', fileID: 'fileId');\n\nvar_dump($version);",
      },
      python: {
        method: 'files.versions.delete',
        example:
          'import os\nfrom imagekitio import ImageKit\n\nclient = ImageKit(\n    private_key=os.environ.get("IMAGEKIT_PRIVATE_KEY"),  # This is the default and can be omitted\n    password=os.environ.get("OPTIONAL_IMAGEKIT_IGNORES_THIS"),  # This is the default and can be omitted\n)\nversion = client.files.versions.delete(\n    version_id="versionId",\n    file_id="fileId",\n)\nprint(version)',
      },
      ruby: {
        method: 'files.versions.delete',
        example:
          'require "imagekitio"\n\nimage_kit = Imagekitio::Client.new(private_key: "My Private Key", password: "My Password")\n\nversion = image_kit.files.versions.delete("versionId", file_id: "fileId")\n\nputs(version)',
      },
      typescript: {
        method: 'client.files.versions.delete',
        example:
          "import ImageKit from '@imagekit/nodejs';\n\nconst client = new ImageKit({\n  privateKey: process.env['IMAGEKIT_PRIVATE_KEY'], // This is the default and can be omitted\n  password: process.env['OPTIONAL_IMAGEKIT_IGNORES_THIS'], // This is the default and can be omitted\n});\n\nconst version = await client.files.versions.delete('versionId', { fileId: 'fileId' });\n\nconsole.log(version);",
      },
    },
  },
  {
    name: 'restore',
    endpoint: '/v1/files/{fileId}/versions/{versionId}/restore',
    httpMethod: 'put',
    summary: 'Restore file version',
    description: 'This API restores a file version as the current file version.\n',
    stainlessPath: '(resource) files.versions > (method) restore',
    qualified: 'client.files.versions.restore',
    params: ['fileId: string;', 'versionId: string;'],
    response:
      "{ AITags?: { confidence?: number; name?: string; source?: string; }[]; audioCodec?: string; bitRate?: number; createdAt?: string; customCoordinates?: string; customMetadata?: object; description?: string; duration?: number; embeddedMetadata?: object; fileId?: string; filePath?: string; fileType?: string; hasAlpha?: boolean; height?: number; isPrivateFile?: boolean; isPublished?: boolean; mime?: string; name?: string; selectedFieldsSchema?: object; size?: number; tags?: string[]; thumbnail?: string; type?: 'file' | 'file-version'; updatedAt?: string; url?: string; versionInfo?: { id?: string; name?: string; }; videoCodec?: string; width?: number; }",
    markdown:
      "## restore\n\n`client.files.versions.restore(fileId: string, versionId: string): { AITags?: object[]; audioCodec?: string; bitRate?: number; createdAt?: string; customCoordinates?: string; customMetadata?: object; description?: string; duration?: number; embeddedMetadata?: object; fileId?: string; filePath?: string; fileType?: string; hasAlpha?: boolean; height?: number; isPrivateFile?: boolean; isPublished?: boolean; mime?: string; name?: string; selectedFieldsSchema?: object; size?: number; tags?: string[]; thumbnail?: string; type?: 'file' | 'file-version'; updatedAt?: string; url?: string; versionInfo?: object; videoCodec?: string; width?: number; }`\n\n**put** `/v1/files/{fileId}/versions/{versionId}/restore`\n\nThis API restores a file version as the current file version.\n\n\n### Parameters\n\n- `fileId: string`\n\n- `versionId: string`\n\n### Returns\n\n- `{ AITags?: { confidence?: number; name?: string; source?: string; }[]; audioCodec?: string; bitRate?: number; createdAt?: string; customCoordinates?: string; customMetadata?: object; description?: string; duration?: number; embeddedMetadata?: object; fileId?: string; filePath?: string; fileType?: string; hasAlpha?: boolean; height?: number; isPrivateFile?: boolean; isPublished?: boolean; mime?: string; name?: string; selectedFieldsSchema?: object; size?: number; tags?: string[]; thumbnail?: string; type?: 'file' | 'file-version'; updatedAt?: string; url?: string; versionInfo?: { id?: string; name?: string; }; videoCodec?: string; width?: number; }`\n  Object containing details of a file or file version.\n\n  - `AITags?: { confidence?: number; name?: string; source?: string; }[]`\n  - `audioCodec?: string`\n  - `bitRate?: number`\n  - `createdAt?: string`\n  - `customCoordinates?: string`\n  - `customMetadata?: object`\n  - `description?: string`\n  - `duration?: number`\n  - `embeddedMetadata?: object`\n  - `fileId?: string`\n  - `filePath?: string`\n  - `fileType?: string`\n  - `hasAlpha?: boolean`\n  - `height?: number`\n  - `isPrivateFile?: boolean`\n  - `isPublished?: boolean`\n  - `mime?: string`\n  - `name?: string`\n  - `selectedFieldsSchema?: object`\n  - `size?: number`\n  - `tags?: string[]`\n  - `thumbnail?: string`\n  - `type?: 'file' | 'file-version'`\n  - `updatedAt?: string`\n  - `url?: string`\n  - `versionInfo?: { id?: string; name?: string; }`\n  - `videoCodec?: string`\n  - `width?: number`\n\n### Example\n\n```typescript\nimport ImageKit from '@imagekit/nodejs';\n\nconst client = new ImageKit();\n\nconst file = await client.files.versions.restore('versionId', { fileId: 'fileId' });\n\nconsole.log(file);\n```",
    perLanguage: {
      cli: {
        method: 'versions restore',
        example:
          "imagekit files:versions restore \\\n  --private-key 'My Private Key' \\\n  --password 'My Password' \\\n  --file-id fileId \\\n  --version-id versionId",
      },
      csharp: {
        method: 'Files.Versions.Restore',
        example:
          'VersionRestoreParams parameters = new()\n{\n    FileID = "fileId",\n    VersionID = "versionId",\n};\n\nvar file = await client.Files.Versions.Restore(parameters);\n\nConsole.WriteLine(file);',
      },
      go: {
        method: 'client.Files.Versions.Restore',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/imagekit-developer/imagekit-go"\n\t"github.com/imagekit-developer/imagekit-go/option"\n)\n\nfunc main() {\n\tclient := imagekit.NewClient(\n\t\toption.WithPrivateKey("My Private Key"),\n\t\toption.WithPassword("My Password"),\n\t)\n\tfile, err := client.Files.Versions.Restore(\n\t\tcontext.TODO(),\n\t\t"versionId",\n\t\timagekit.FileVersionRestoreParams{\n\t\t\tFileID: "fileId",\n\t\t},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", file.VideoCodec)\n}\n',
      },
      http: {
        example:
          'curl https://api.imagekit.io/v1/files/$FILE_ID/versions/$VERSION_ID/restore \\\n    -X PUT \\\n    -u "$IMAGEKIT_PRIVATE_KEY:OPTIONAL_IMAGEKIT_IGNORES_THIS"',
      },
      java: {
        method: 'files().versions().restore',
        example:
          'package com.imagekit.api.example;\n\nimport com.imagekit.api.client.ImageKitClient;\nimport com.imagekit.api.client.okhttp.ImageKitOkHttpClient;\nimport com.imagekit.api.models.files.File;\nimport com.imagekit.api.models.files.versions.VersionRestoreParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        ImageKitClient client = ImageKitOkHttpClient.fromEnv();\n\n        VersionRestoreParams params = VersionRestoreParams.builder()\n            .fileId("fileId")\n            .versionId("versionId")\n            .build();\n        File file = client.files().versions().restore(params);\n    }\n}',
      },
      php: {
        method: 'files->versions->restore',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(privateKey: 'My Private Key', password: 'My Password');\n\n$file = $client->files->versions->restore('versionId', fileID: 'fileId');\n\nvar_dump($file);",
      },
      python: {
        method: 'files.versions.restore',
        example:
          'import os\nfrom imagekitio import ImageKit\n\nclient = ImageKit(\n    private_key=os.environ.get("IMAGEKIT_PRIVATE_KEY"),  # This is the default and can be omitted\n    password=os.environ.get("OPTIONAL_IMAGEKIT_IGNORES_THIS"),  # This is the default and can be omitted\n)\nfile = client.files.versions.restore(\n    version_id="versionId",\n    file_id="fileId",\n)\nprint(file.video_codec)',
      },
      ruby: {
        method: 'files.versions.restore',
        example:
          'require "imagekitio"\n\nimage_kit = Imagekitio::Client.new(private_key: "My Private Key", password: "My Password")\n\nfile = image_kit.files.versions.restore("versionId", file_id: "fileId")\n\nputs(file)',
      },
      typescript: {
        method: 'client.files.versions.restore',
        example:
          "import ImageKit from '@imagekit/nodejs';\n\nconst client = new ImageKit({\n  privateKey: process.env['IMAGEKIT_PRIVATE_KEY'], // This is the default and can be omitted\n  password: process.env['OPTIONAL_IMAGEKIT_IGNORES_THIS'], // This is the default and can be omitted\n});\n\nconst file = await client.files.versions.restore('versionId', { fileId: 'fileId' });\n\nconsole.log(file.videoCodec);",
      },
    },
  },
  {
    name: 'get',
    endpoint: '/v1/files/{fileId}/metadata',
    httpMethod: 'get',
    summary: 'Get uploaded file metadata',
    description:
      'You can programmatically get image EXIF, pHash, and other metadata for uploaded files in the ImageKit.io media library using this API.\n\nYou can also get the metadata in upload API response by passing `metadata` in `responseFields` parameter.\n',
    stainlessPath: '(resource) files.metadata > (method) get',
    qualified: 'client.files.metadata.get',
    params: ['fileId: string;'],
    response:
      '{ audioCodec?: string; bitRate?: number; density?: number; duration?: number; exif?: { exif?: object; gps?: object; image?: object; interoperability?: object; makernote?: object; thumbnail?: object; }; format?: string; hasColorProfile?: boolean; hasTransparency?: boolean; height?: number; pHash?: string; quality?: number; size?: number; videoCodec?: string; width?: number; }',
    markdown:
      "## get\n\n`client.files.metadata.get(fileId: string): { audioCodec?: string; bitRate?: number; density?: number; duration?: number; exif?: object; format?: string; hasColorProfile?: boolean; hasTransparency?: boolean; height?: number; pHash?: string; quality?: number; size?: number; videoCodec?: string; width?: number; }`\n\n**get** `/v1/files/{fileId}/metadata`\n\nYou can programmatically get image EXIF, pHash, and other metadata for uploaded files in the ImageKit.io media library using this API.\n\nYou can also get the metadata in upload API response by passing `metadata` in `responseFields` parameter.\n\n\n### Parameters\n\n- `fileId: string`\n\n### Returns\n\n- `{ audioCodec?: string; bitRate?: number; density?: number; duration?: number; exif?: { exif?: { ApertureValue?: number; ColorSpace?: number; CreateDate?: string; CustomRendered?: number; DateTimeOriginal?: string; ExifImageHeight?: number; ExifImageWidth?: number; ExifVersion?: string; ExposureCompensation?: number; ExposureMode?: number; ExposureProgram?: number; ExposureTime?: number; Flash?: number; FlashpixVersion?: string; FNumber?: number; FocalLength?: number; FocalPlaneResolutionUnit?: number; FocalPlaneXResolution?: number; FocalPlaneYResolution?: number; InteropOffset?: number; ISO?: number; MeteringMode?: number; SceneCaptureType?: number; ShutterSpeedValue?: number; SubSecTime?: string; WhiteBalance?: number; }; gps?: { GPSVersionID?: number[]; }; image?: { ExifOffset?: number; GPSInfo?: number; Make?: string; Model?: string; ModifyDate?: string; Orientation?: number; ResolutionUnit?: number; Software?: string; XResolution?: number; YCbCrPositioning?: number; YResolution?: number; }; interoperability?: { InteropIndex?: string; InteropVersion?: string; }; makernote?: object; thumbnail?: { Compression?: number; ResolutionUnit?: number; ThumbnailLength?: number; ThumbnailOffset?: number; XResolution?: number; YResolution?: number; }; }; format?: string; hasColorProfile?: boolean; hasTransparency?: boolean; height?: number; pHash?: string; quality?: number; size?: number; videoCodec?: string; width?: number; }`\n  JSON object containing metadata.\n\n  - `audioCodec?: string`\n  - `bitRate?: number`\n  - `density?: number`\n  - `duration?: number`\n  - `exif?: { exif?: { ApertureValue?: number; ColorSpace?: number; CreateDate?: string; CustomRendered?: number; DateTimeOriginal?: string; ExifImageHeight?: number; ExifImageWidth?: number; ExifVersion?: string; ExposureCompensation?: number; ExposureMode?: number; ExposureProgram?: number; ExposureTime?: number; Flash?: number; FlashpixVersion?: string; FNumber?: number; FocalLength?: number; FocalPlaneResolutionUnit?: number; FocalPlaneXResolution?: number; FocalPlaneYResolution?: number; InteropOffset?: number; ISO?: number; MeteringMode?: number; SceneCaptureType?: number; ShutterSpeedValue?: number; SubSecTime?: string; WhiteBalance?: number; }; gps?: { GPSVersionID?: number[]; }; image?: { ExifOffset?: number; GPSInfo?: number; Make?: string; Model?: string; ModifyDate?: string; Orientation?: number; ResolutionUnit?: number; Software?: string; XResolution?: number; YCbCrPositioning?: number; YResolution?: number; }; interoperability?: { InteropIndex?: string; InteropVersion?: string; }; makernote?: object; thumbnail?: { Compression?: number; ResolutionUnit?: number; ThumbnailLength?: number; ThumbnailOffset?: number; XResolution?: number; YResolution?: number; }; }`\n  - `format?: string`\n  - `hasColorProfile?: boolean`\n  - `hasTransparency?: boolean`\n  - `height?: number`\n  - `pHash?: string`\n  - `quality?: number`\n  - `size?: number`\n  - `videoCodec?: string`\n  - `width?: number`\n\n### Example\n\n```typescript\nimport ImageKit from '@imagekit/nodejs';\n\nconst client = new ImageKit();\n\nconst metadata = await client.files.metadata.get('fileId');\n\nconsole.log(metadata);\n```",
    perLanguage: {
      cli: {
        method: 'metadata get',
        example:
          "imagekit files:metadata get \\\n  --private-key 'My Private Key' \\\n  --password 'My Password' \\\n  --file-id fileId",
      },
      csharp: {
        method: 'Files.Metadata.Get',
        example:
          'MetadataGetParams parameters = new() { FileID = "fileId" };\n\nvar metadata = await client.Files.Metadata.Get(parameters);\n\nConsole.WriteLine(metadata);',
      },
      go: {
        method: 'client.Files.Metadata.Get',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/imagekit-developer/imagekit-go"\n\t"github.com/imagekit-developer/imagekit-go/option"\n)\n\nfunc main() {\n\tclient := imagekit.NewClient(\n\t\toption.WithPrivateKey("My Private Key"),\n\t\toption.WithPassword("My Password"),\n\t)\n\tmetadata, err := client.Files.Metadata.Get(context.TODO(), "fileId")\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", metadata.VideoCodec)\n}\n',
      },
      http: {
        example:
          'curl https://api.imagekit.io/v1/files/$FILE_ID/metadata \\\n    -u "$IMAGEKIT_PRIVATE_KEY:OPTIONAL_IMAGEKIT_IGNORES_THIS"',
      },
      java: {
        method: 'files().metadata().get',
        example:
          'package com.imagekit.api.example;\n\nimport com.imagekit.api.client.ImageKitClient;\nimport com.imagekit.api.client.okhttp.ImageKitOkHttpClient;\nimport com.imagekit.api.models.files.Metadata;\nimport com.imagekit.api.models.files.metadata.MetadataGetParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        ImageKitClient client = ImageKitOkHttpClient.fromEnv();\n\n        Metadata metadata = client.files().metadata().get("fileId");\n    }\n}',
      },
      php: {
        method: 'files->metadata->get',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(privateKey: 'My Private Key', password: 'My Password');\n\n$metadata = $client->files->metadata->get('fileId');\n\nvar_dump($metadata);",
      },
      python: {
        method: 'files.metadata.get',
        example:
          'import os\nfrom imagekitio import ImageKit\n\nclient = ImageKit(\n    private_key=os.environ.get("IMAGEKIT_PRIVATE_KEY"),  # This is the default and can be omitted\n    password=os.environ.get("OPTIONAL_IMAGEKIT_IGNORES_THIS"),  # This is the default and can be omitted\n)\nmetadata = client.files.metadata.get(\n    "fileId",\n)\nprint(metadata.video_codec)',
      },
      ruby: {
        method: 'files.metadata.get',
        example:
          'require "imagekitio"\n\nimage_kit = Imagekitio::Client.new(private_key: "My Private Key", password: "My Password")\n\nmetadata = image_kit.files.metadata.get("fileId")\n\nputs(metadata)',
      },
      typescript: {
        method: 'client.files.metadata.get',
        example:
          "import ImageKit from '@imagekit/nodejs';\n\nconst client = new ImageKit({\n  privateKey: process.env['IMAGEKIT_PRIVATE_KEY'], // This is the default and can be omitted\n  password: process.env['OPTIONAL_IMAGEKIT_IGNORES_THIS'], // This is the default and can be omitted\n});\n\nconst metadata = await client.files.metadata.get('fileId');\n\nconsole.log(metadata.videoCodec);",
      },
    },
  },
  {
    name: 'getFromURL',
    endpoint: '/v1/metadata',
    httpMethod: 'get',
    summary: 'Get metadata from remote URL',
    description:
      'Get image EXIF, pHash, and other metadata from ImageKit.io powered remote URL using this API.\n',
    stainlessPath: '(resource) files.metadata > (method) getFromURL',
    qualified: 'client.files.metadata.getFromURL',
    params: ['url: string;'],
    response:
      '{ audioCodec?: string; bitRate?: number; density?: number; duration?: number; exif?: { exif?: object; gps?: object; image?: object; interoperability?: object; makernote?: object; thumbnail?: object; }; format?: string; hasColorProfile?: boolean; hasTransparency?: boolean; height?: number; pHash?: string; quality?: number; size?: number; videoCodec?: string; width?: number; }',
    markdown:
      "## getFromURL\n\n`client.files.metadata.getFromURL(url: string): { audioCodec?: string; bitRate?: number; density?: number; duration?: number; exif?: object; format?: string; hasColorProfile?: boolean; hasTransparency?: boolean; height?: number; pHash?: string; quality?: number; size?: number; videoCodec?: string; width?: number; }`\n\n**get** `/v1/metadata`\n\nGet image EXIF, pHash, and other metadata from ImageKit.io powered remote URL using this API.\n\n\n### Parameters\n\n- `url: string`\n  Should be a valid file URL. It should be accessible using your ImageKit.io account.\n\n\n### Returns\n\n- `{ audioCodec?: string; bitRate?: number; density?: number; duration?: number; exif?: { exif?: { ApertureValue?: number; ColorSpace?: number; CreateDate?: string; CustomRendered?: number; DateTimeOriginal?: string; ExifImageHeight?: number; ExifImageWidth?: number; ExifVersion?: string; ExposureCompensation?: number; ExposureMode?: number; ExposureProgram?: number; ExposureTime?: number; Flash?: number; FlashpixVersion?: string; FNumber?: number; FocalLength?: number; FocalPlaneResolutionUnit?: number; FocalPlaneXResolution?: number; FocalPlaneYResolution?: number; InteropOffset?: number; ISO?: number; MeteringMode?: number; SceneCaptureType?: number; ShutterSpeedValue?: number; SubSecTime?: string; WhiteBalance?: number; }; gps?: { GPSVersionID?: number[]; }; image?: { ExifOffset?: number; GPSInfo?: number; Make?: string; Model?: string; ModifyDate?: string; Orientation?: number; ResolutionUnit?: number; Software?: string; XResolution?: number; YCbCrPositioning?: number; YResolution?: number; }; interoperability?: { InteropIndex?: string; InteropVersion?: string; }; makernote?: object; thumbnail?: { Compression?: number; ResolutionUnit?: number; ThumbnailLength?: number; ThumbnailOffset?: number; XResolution?: number; YResolution?: number; }; }; format?: string; hasColorProfile?: boolean; hasTransparency?: boolean; height?: number; pHash?: string; quality?: number; size?: number; videoCodec?: string; width?: number; }`\n  JSON object containing metadata.\n\n  - `audioCodec?: string`\n  - `bitRate?: number`\n  - `density?: number`\n  - `duration?: number`\n  - `exif?: { exif?: { ApertureValue?: number; ColorSpace?: number; CreateDate?: string; CustomRendered?: number; DateTimeOriginal?: string; ExifImageHeight?: number; ExifImageWidth?: number; ExifVersion?: string; ExposureCompensation?: number; ExposureMode?: number; ExposureProgram?: number; ExposureTime?: number; Flash?: number; FlashpixVersion?: string; FNumber?: number; FocalLength?: number; FocalPlaneResolutionUnit?: number; FocalPlaneXResolution?: number; FocalPlaneYResolution?: number; InteropOffset?: number; ISO?: number; MeteringMode?: number; SceneCaptureType?: number; ShutterSpeedValue?: number; SubSecTime?: string; WhiteBalance?: number; }; gps?: { GPSVersionID?: number[]; }; image?: { ExifOffset?: number; GPSInfo?: number; Make?: string; Model?: string; ModifyDate?: string; Orientation?: number; ResolutionUnit?: number; Software?: string; XResolution?: number; YCbCrPositioning?: number; YResolution?: number; }; interoperability?: { InteropIndex?: string; InteropVersion?: string; }; makernote?: object; thumbnail?: { Compression?: number; ResolutionUnit?: number; ThumbnailLength?: number; ThumbnailOffset?: number; XResolution?: number; YResolution?: number; }; }`\n  - `format?: string`\n  - `hasColorProfile?: boolean`\n  - `hasTransparency?: boolean`\n  - `height?: number`\n  - `pHash?: string`\n  - `quality?: number`\n  - `size?: number`\n  - `videoCodec?: string`\n  - `width?: number`\n\n### Example\n\n```typescript\nimport ImageKit from '@imagekit/nodejs';\n\nconst client = new ImageKit();\n\nconst metadata = await client.files.metadata.getFromURL({ url: 'https://example.com' });\n\nconsole.log(metadata);\n```",
    perLanguage: {
      cli: {
        method: 'metadata getFromURL',
        example:
          "imagekit files:metadata get-from-url \\\n  --private-key 'My Private Key' \\\n  --password 'My Password' \\\n  --url https://example.com",
      },
      csharp: {
        method: 'Files.Metadata.GetFromUrl',
        example:
          'MetadataGetFromUrlParams parameters = new() { Url = "https://example.com" };\n\nvar metadata = await client.Files.Metadata.GetFromUrl(parameters);\n\nConsole.WriteLine(metadata);',
      },
      go: {
        method: 'client.Files.Metadata.GetFromURL',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/imagekit-developer/imagekit-go"\n\t"github.com/imagekit-developer/imagekit-go/option"\n)\n\nfunc main() {\n\tclient := imagekit.NewClient(\n\t\toption.WithPrivateKey("My Private Key"),\n\t\toption.WithPassword("My Password"),\n\t)\n\tmetadata, err := client.Files.Metadata.GetFromURL(context.TODO(), imagekit.FileMetadataGetFromURLParams{\n\t\tURL: "https://example.com",\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", metadata.VideoCodec)\n}\n',
      },
      http: {
        example:
          'curl https://api.imagekit.io/v1/metadata \\\n    -u "$IMAGEKIT_PRIVATE_KEY:OPTIONAL_IMAGEKIT_IGNORES_THIS"',
      },
      java: {
        method: 'files().metadata().getFromUrl',
        example:
          'package com.imagekit.api.example;\n\nimport com.imagekit.api.client.ImageKitClient;\nimport com.imagekit.api.client.okhttp.ImageKitOkHttpClient;\nimport com.imagekit.api.models.files.Metadata;\nimport com.imagekit.api.models.files.metadata.MetadataGetFromUrlParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        ImageKitClient client = ImageKitOkHttpClient.fromEnv();\n\n        MetadataGetFromUrlParams params = MetadataGetFromUrlParams.builder()\n            .url("https://example.com")\n            .build();\n        Metadata metadata = client.files().metadata().getFromUrl(params);\n    }\n}',
      },
      php: {
        method: 'files->metadata->getFromURL',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(privateKey: 'My Private Key', password: 'My Password');\n\n$metadata = $client->files->metadata->getFromURL(url: 'https://example.com');\n\nvar_dump($metadata);",
      },
      python: {
        method: 'files.metadata.get_from_url',
        example:
          'import os\nfrom imagekitio import ImageKit\n\nclient = ImageKit(\n    private_key=os.environ.get("IMAGEKIT_PRIVATE_KEY"),  # This is the default and can be omitted\n    password=os.environ.get("OPTIONAL_IMAGEKIT_IGNORES_THIS"),  # This is the default and can be omitted\n)\nmetadata = client.files.metadata.get_from_url(\n    url="https://example.com",\n)\nprint(metadata.video_codec)',
      },
      ruby: {
        method: 'files.metadata.get_from_url',
        example:
          'require "imagekitio"\n\nimage_kit = Imagekitio::Client.new(private_key: "My Private Key", password: "My Password")\n\nmetadata = image_kit.files.metadata.get_from_url(url: "https://example.com")\n\nputs(metadata)',
      },
      typescript: {
        method: 'client.files.metadata.getFromURL',
        example:
          "import ImageKit from '@imagekit/nodejs';\n\nconst client = new ImageKit({\n  privateKey: process.env['IMAGEKIT_PRIVATE_KEY'], // This is the default and can be omitted\n  password: process.env['OPTIONAL_IMAGEKIT_IGNORES_THIS'], // This is the default and can be omitted\n});\n\nconst metadata = await client.files.metadata.getFromURL({ url: 'https://example.com' });\n\nconsole.log(metadata.videoCodec);",
      },
    },
  },
  {
    name: 'list',
    endpoint: '/v1/saved-extensions',
    httpMethod: 'get',
    summary: 'List all saved extensions',
    description:
      'This API returns an array of all saved extensions for your account. Saved extensions allow you to save complex extension configurations and reuse them by referencing them by ID in upload or update file APIs.\n',
    stainlessPath: '(resource) savedExtensions > (method) list',
    qualified: 'client.savedExtensions.list',
    response:
      '{ id?: string; config?: object | object | object | object; createdAt?: string; description?: string; name?: string; updatedAt?: string; }[]',
    markdown:
      "## list\n\n`client.savedExtensions.list(): object[]`\n\n**get** `/v1/saved-extensions`\n\nThis API returns an array of all saved extensions for your account. Saved extensions allow you to save complex extension configurations and reuse them by referencing them by ID in upload or update file APIs.\n\n\n### Returns\n\n- `{ id?: string; config?: object | object | object | object; createdAt?: string; description?: string; name?: string; updatedAt?: string; }[]`\n\n### Example\n\n```typescript\nimport ImageKit from '@imagekit/nodejs';\n\nconst client = new ImageKit();\n\nconst savedExtensions = await client.savedExtensions.list();\n\nconsole.log(savedExtensions);\n```",
    perLanguage: {
      cli: {
        method: 'savedExtensions list',
        example:
          "imagekit saved-extensions list \\\n  --private-key 'My Private Key' \\\n  --password 'My Password'",
      },
      csharp: {
        method: 'SavedExtensions.List',
        example:
          'SavedExtensionListParams parameters = new();\n\nvar savedExtensions = await client.SavedExtensions.List(parameters);\n\nConsole.WriteLine(savedExtensions);',
      },
      go: {
        method: 'client.SavedExtensions.List',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/imagekit-developer/imagekit-go"\n\t"github.com/imagekit-developer/imagekit-go/option"\n)\n\nfunc main() {\n\tclient := imagekit.NewClient(\n\t\toption.WithPrivateKey("My Private Key"),\n\t\toption.WithPassword("My Password"),\n\t)\n\tsavedExtensions, err := client.SavedExtensions.List(context.TODO())\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", savedExtensions)\n}\n',
      },
      http: {
        example:
          'curl https://api.imagekit.io/v1/saved-extensions \\\n    -u "$IMAGEKIT_PRIVATE_KEY:OPTIONAL_IMAGEKIT_IGNORES_THIS"',
      },
      java: {
        method: 'savedExtensions().list',
        example:
          'package com.imagekit.api.example;\n\nimport com.imagekit.api.client.ImageKitClient;\nimport com.imagekit.api.client.okhttp.ImageKitOkHttpClient;\nimport com.imagekit.api.models.SavedExtension;\nimport com.imagekit.api.models.savedextensions.SavedExtensionListParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        ImageKitClient client = ImageKitOkHttpClient.fromEnv();\n\n        List<SavedExtension> savedExtensions = client.savedExtensions().list();\n    }\n}',
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
    },
  },
  {
    name: 'create',
    endpoint: '/v1/saved-extensions',
    httpMethod: 'post',
    summary: 'Create saved extension',
    description:
      'This API creates a new saved extension. Saved extensions allow you to save complex extension configurations (like AI tasks) and reuse them by referencing the ID in upload or update file APIs.\n\n**Saved extension limit** \\\nYou can create a maximum of 100 saved extensions per account.\n',
    stainlessPath: '(resource) savedExtensions > (method) create',
    qualified: 'client.savedExtensions.create',
    params: [
      "config: { name: 'remove-bg'; options?: { add_shadow?: boolean; bg_color?: string; bg_image_url?: string; semitransparency?: boolean; }; } | { maxTags: number; minConfidence: number; name: 'google-auto-tagging' | 'aws-auto-tagging'; } | { name: 'ai-auto-description'; } | { name: 'ai-tasks'; tasks: { instruction: string; type: 'select_tags'; max_selections?: number; min_selections?: number; vocabulary?: string[]; } | { field: string; instruction: string; type: 'select_metadata'; max_selections?: number; min_selections?: number; vocabulary?: string | number | boolean[]; } | { instruction: string; type: 'yes_no'; on_no?: { add_tags?: string[]; remove_tags?: string[]; set_metadata?: object[]; unset_metadata?: object[]; }; on_unknown?: { add_tags?: string[]; remove_tags?: string[]; set_metadata?: object[]; unset_metadata?: object[]; }; on_yes?: { add_tags?: string[]; remove_tags?: string[]; set_metadata?: object[]; unset_metadata?: object[]; }; }[]; };",
      'description: string;',
      'name: string;',
    ],
    response:
      "{ id?: string; config?: { name: 'remove-bg'; options?: object; } | { maxTags: number; minConfidence: number; name: 'google-auto-tagging' | 'aws-auto-tagging'; } | { name: 'ai-auto-description'; } | { name: 'ai-tasks'; tasks: object | object | object[]; }; createdAt?: string; description?: string; name?: string; updatedAt?: string; }",
    markdown:
      "## create\n\n`client.savedExtensions.create(config: { name: 'remove-bg'; options?: object; } | { maxTags: number; minConfidence: number; name: 'google-auto-tagging' | 'aws-auto-tagging'; } | { name: 'ai-auto-description'; } | { name: 'ai-tasks'; tasks: object | object | object[]; }, description: string, name: string): { id?: string; config?: extension_config; createdAt?: string; description?: string; name?: string; updatedAt?: string; }`\n\n**post** `/v1/saved-extensions`\n\nThis API creates a new saved extension. Saved extensions allow you to save complex extension configurations (like AI tasks) and reuse them by referencing the ID in upload or update file APIs.\n\n**Saved extension limit** \\\nYou can create a maximum of 100 saved extensions per account.\n\n\n### Parameters\n\n- `config: { name: 'remove-bg'; options?: { add_shadow?: boolean; bg_color?: string; bg_image_url?: string; semitransparency?: boolean; }; } | { maxTags: number; minConfidence: number; name: 'google-auto-tagging' | 'aws-auto-tagging'; } | { name: 'ai-auto-description'; } | { name: 'ai-tasks'; tasks: { instruction: string; type: 'select_tags'; max_selections?: number; min_selections?: number; vocabulary?: string[]; } | { field: string; instruction: string; type: 'select_metadata'; max_selections?: number; min_selections?: number; vocabulary?: string | number | boolean[]; } | { instruction: string; type: 'yes_no'; on_no?: { add_tags?: string[]; remove_tags?: string[]; set_metadata?: object[]; unset_metadata?: object[]; }; on_unknown?: { add_tags?: string[]; remove_tags?: string[]; set_metadata?: object[]; unset_metadata?: object[]; }; on_yes?: { add_tags?: string[]; remove_tags?: string[]; set_metadata?: object[]; unset_metadata?: object[]; }; }[]; }`\n  Configuration object for an extension (base extensions only, not saved extension references).\n\n- `description: string`\n  Description of what the saved extension does.\n\n- `name: string`\n  Name of the saved extension.\n\n### Returns\n\n- `{ id?: string; config?: { name: 'remove-bg'; options?: object; } | { maxTags: number; minConfidence: number; name: 'google-auto-tagging' | 'aws-auto-tagging'; } | { name: 'ai-auto-description'; } | { name: 'ai-tasks'; tasks: object | object | object[]; }; createdAt?: string; description?: string; name?: string; updatedAt?: string; }`\n  Saved extension object containing extension configuration.\n\n  - `id?: string`\n  - `config?: { name: 'remove-bg'; options?: { add_shadow?: boolean; bg_color?: string; bg_image_url?: string; semitransparency?: boolean; }; } | { maxTags: number; minConfidence: number; name: 'google-auto-tagging' | 'aws-auto-tagging'; } | { name: 'ai-auto-description'; } | { name: 'ai-tasks'; tasks: { instruction: string; type: 'select_tags'; max_selections?: number; min_selections?: number; vocabulary?: string[]; } | { field: string; instruction: string; type: 'select_metadata'; max_selections?: number; min_selections?: number; vocabulary?: string | number | boolean[]; } | { instruction: string; type: 'yes_no'; on_no?: { add_tags?: string[]; remove_tags?: string[]; set_metadata?: object[]; unset_metadata?: object[]; }; on_unknown?: { add_tags?: string[]; remove_tags?: string[]; set_metadata?: object[]; unset_metadata?: object[]; }; on_yes?: { add_tags?: string[]; remove_tags?: string[]; set_metadata?: object[]; unset_metadata?: object[]; }; }[]; }`\n  - `createdAt?: string`\n  - `description?: string`\n  - `name?: string`\n  - `updatedAt?: string`\n\n### Example\n\n```typescript\nimport ImageKit from '@imagekit/nodejs';\n\nconst client = new ImageKit();\n\nconst savedExtension = await client.savedExtensions.create({\n  config: { name: 'remove-bg' },\n  description: 'Analyzes vehicle images for type, condition, and quality assessment',\n  name: 'Car Quality Analysis',\n});\n\nconsole.log(savedExtension);\n```",
    perLanguage: {
      cli: {
        method: 'savedExtensions create',
        example:
          "imagekit saved-extensions create \\\n  --private-key 'My Private Key' \\\n  --password 'My Password' \\\n  --config '{name: remove-bg}' \\\n  --description 'Analyzes vehicle images for type, condition, and quality assessment' \\\n  --name 'Car Quality Analysis'",
      },
      csharp: {
        method: 'SavedExtensions.Create',
        example:
          'SavedExtensionCreateParams parameters = new()\n{\n    Config = new RemoveBg()\n    {\n        Options = new()\n        {\n            AddShadow = true,\n            BgColor = "bg_color",\n            BgImageUrl = "bg_image_url",\n            Semitransparency = true,\n        },\n    },\n    Description = "Analyzes vehicle images for type, condition, and quality assessment",\n    Name = "Car Quality Analysis",\n};\n\nvar savedExtension = await client.SavedExtensions.Create(parameters);\n\nConsole.WriteLine(savedExtension);',
      },
      go: {
        method: 'client.SavedExtensions.New',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/imagekit-developer/imagekit-go"\n\t"github.com/imagekit-developer/imagekit-go/option"\n\t"github.com/imagekit-developer/imagekit-go/shared"\n)\n\nfunc main() {\n\tclient := imagekit.NewClient(\n\t\toption.WithPrivateKey("My Private Key"),\n\t\toption.WithPassword("My Password"),\n\t)\n\tsavedExtension, err := client.SavedExtensions.New(context.TODO(), imagekit.SavedExtensionNewParams{\n\t\tConfig: shared.ExtensionConfigUnionParam{\n\t\t\tOfRemoveBg: &shared.ExtensionConfigRemoveBgParam{},\n\t\t},\n\t\tDescription: "Analyzes vehicle images for type, condition, and quality assessment",\n\t\tName:        "Car Quality Analysis",\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", savedExtension.ID)\n}\n',
      },
      http: {
        example:
          'curl https://api.imagekit.io/v1/saved-extensions \\\n    -H \'Content-Type: application/json\' \\\n    -u "$IMAGEKIT_PRIVATE_KEY:OPTIONAL_IMAGEKIT_IGNORES_THIS" \\\n    -d \'{\n          "config": {\n            "name": "remove-bg"\n          },\n          "description": "Analyzes vehicle images for type, condition, and quality assessment",\n          "name": "Car Quality Analysis"\n        }\'',
      },
      java: {
        method: 'savedExtensions().create',
        example:
          'package com.imagekit.api.example;\n\nimport com.imagekit.api.client.ImageKitClient;\nimport com.imagekit.api.client.okhttp.ImageKitOkHttpClient;\nimport com.imagekit.api.models.ExtensionConfig;\nimport com.imagekit.api.models.SavedExtension;\nimport com.imagekit.api.models.savedextensions.SavedExtensionCreateParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        ImageKitClient client = ImageKitOkHttpClient.fromEnv();\n\n        SavedExtensionCreateParams params = SavedExtensionCreateParams.builder()\n            .config(ExtensionConfig.RemoveBg.builder().build())\n            .description("Analyzes vehicle images for type, condition, and quality assessment")\n            .name("Car Quality Analysis")\n            .build();\n        SavedExtension savedExtension = client.savedExtensions().create(params);\n    }\n}',
      },
      php: {
        method: 'savedExtensions->create',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(privateKey: 'My Private Key', password: 'My Password');\n\n$savedExtension = $client->savedExtensions->create(\n  config: [\n    'name' => 'remove-bg',\n    'options' => [\n      'addShadow' => true,\n      'bgColor' => 'bg_color',\n      'bgImageURL' => 'bg_image_url',\n      'semitransparency' => true,\n    ],\n  ],\n  description: 'Analyzes vehicle images for type, condition, and quality assessment',\n  name: 'Car Quality Analysis',\n);\n\nvar_dump($savedExtension);",
      },
      python: {
        method: 'saved_extensions.create',
        example:
          'import os\nfrom imagekitio import ImageKit\n\nclient = ImageKit(\n    private_key=os.environ.get("IMAGEKIT_PRIVATE_KEY"),  # This is the default and can be omitted\n    password=os.environ.get("OPTIONAL_IMAGEKIT_IGNORES_THIS"),  # This is the default and can be omitted\n)\nsaved_extension = client.saved_extensions.create(\n    config={\n        "name": "remove-bg"\n    },\n    description="Analyzes vehicle images for type, condition, and quality assessment",\n    name="Car Quality Analysis",\n)\nprint(saved_extension.id)',
      },
      ruby: {
        method: 'saved_extensions.create',
        example:
          'require "imagekitio"\n\nimage_kit = Imagekitio::Client.new(private_key: "My Private Key", password: "My Password")\n\nsaved_extension = image_kit.saved_extensions.create(\n  config: {name: :"remove-bg"},\n  description: "Analyzes vehicle images for type, condition, and quality assessment",\n  name: "Car Quality Analysis"\n)\n\nputs(saved_extension)',
      },
      typescript: {
        method: 'client.savedExtensions.create',
        example:
          "import ImageKit from '@imagekit/nodejs';\n\nconst client = new ImageKit({\n  privateKey: process.env['IMAGEKIT_PRIVATE_KEY'], // This is the default and can be omitted\n  password: process.env['OPTIONAL_IMAGEKIT_IGNORES_THIS'], // This is the default and can be omitted\n});\n\nconst savedExtension = await client.savedExtensions.create({\n  config: { name: 'remove-bg' },\n  description: 'Analyzes vehicle images for type, condition, and quality assessment',\n  name: 'Car Quality Analysis',\n});\n\nconsole.log(savedExtension.id);",
      },
    },
  },
  {
    name: 'get',
    endpoint: '/v1/saved-extensions/{id}',
    httpMethod: 'get',
    summary: 'Get saved extension details',
    description: 'This API returns details of a specific saved extension by ID.\n',
    stainlessPath: '(resource) savedExtensions > (method) get',
    qualified: 'client.savedExtensions.get',
    params: ['id: string;'],
    response:
      "{ id?: string; config?: { name: 'remove-bg'; options?: object; } | { maxTags: number; minConfidence: number; name: 'google-auto-tagging' | 'aws-auto-tagging'; } | { name: 'ai-auto-description'; } | { name: 'ai-tasks'; tasks: object | object | object[]; }; createdAt?: string; description?: string; name?: string; updatedAt?: string; }",
    markdown:
      "## get\n\n`client.savedExtensions.get(id: string): { id?: string; config?: extension_config; createdAt?: string; description?: string; name?: string; updatedAt?: string; }`\n\n**get** `/v1/saved-extensions/{id}`\n\nThis API returns details of a specific saved extension by ID.\n\n\n### Parameters\n\n- `id: string`\n\n### Returns\n\n- `{ id?: string; config?: { name: 'remove-bg'; options?: object; } | { maxTags: number; minConfidence: number; name: 'google-auto-tagging' | 'aws-auto-tagging'; } | { name: 'ai-auto-description'; } | { name: 'ai-tasks'; tasks: object | object | object[]; }; createdAt?: string; description?: string; name?: string; updatedAt?: string; }`\n  Saved extension object containing extension configuration.\n\n  - `id?: string`\n  - `config?: { name: 'remove-bg'; options?: { add_shadow?: boolean; bg_color?: string; bg_image_url?: string; semitransparency?: boolean; }; } | { maxTags: number; minConfidence: number; name: 'google-auto-tagging' | 'aws-auto-tagging'; } | { name: 'ai-auto-description'; } | { name: 'ai-tasks'; tasks: { instruction: string; type: 'select_tags'; max_selections?: number; min_selections?: number; vocabulary?: string[]; } | { field: string; instruction: string; type: 'select_metadata'; max_selections?: number; min_selections?: number; vocabulary?: string | number | boolean[]; } | { instruction: string; type: 'yes_no'; on_no?: { add_tags?: string[]; remove_tags?: string[]; set_metadata?: object[]; unset_metadata?: object[]; }; on_unknown?: { add_tags?: string[]; remove_tags?: string[]; set_metadata?: object[]; unset_metadata?: object[]; }; on_yes?: { add_tags?: string[]; remove_tags?: string[]; set_metadata?: object[]; unset_metadata?: object[]; }; }[]; }`\n  - `createdAt?: string`\n  - `description?: string`\n  - `name?: string`\n  - `updatedAt?: string`\n\n### Example\n\n```typescript\nimport ImageKit from '@imagekit/nodejs';\n\nconst client = new ImageKit();\n\nconst savedExtension = await client.savedExtensions.get('id');\n\nconsole.log(savedExtension);\n```",
    perLanguage: {
      cli: {
        method: 'savedExtensions get',
        example:
          "imagekit saved-extensions get \\\n  --private-key 'My Private Key' \\\n  --password 'My Password' \\\n  --id id",
      },
      csharp: {
        method: 'SavedExtensions.Get',
        example:
          'SavedExtensionGetParams parameters = new() { ID = "id" };\n\nvar savedExtension = await client.SavedExtensions.Get(parameters);\n\nConsole.WriteLine(savedExtension);',
      },
      go: {
        method: 'client.SavedExtensions.Get',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/imagekit-developer/imagekit-go"\n\t"github.com/imagekit-developer/imagekit-go/option"\n)\n\nfunc main() {\n\tclient := imagekit.NewClient(\n\t\toption.WithPrivateKey("My Private Key"),\n\t\toption.WithPassword("My Password"),\n\t)\n\tsavedExtension, err := client.SavedExtensions.Get(context.TODO(), "id")\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", savedExtension.ID)\n}\n',
      },
      http: {
        example:
          'curl https://api.imagekit.io/v1/saved-extensions/$ID \\\n    -u "$IMAGEKIT_PRIVATE_KEY:OPTIONAL_IMAGEKIT_IGNORES_THIS"',
      },
      java: {
        method: 'savedExtensions().get',
        example:
          'package com.imagekit.api.example;\n\nimport com.imagekit.api.client.ImageKitClient;\nimport com.imagekit.api.client.okhttp.ImageKitOkHttpClient;\nimport com.imagekit.api.models.SavedExtension;\nimport com.imagekit.api.models.savedextensions.SavedExtensionGetParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        ImageKitClient client = ImageKitOkHttpClient.fromEnv();\n\n        SavedExtension savedExtension = client.savedExtensions().get("id");\n    }\n}',
      },
      php: {
        method: 'savedExtensions->get',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(privateKey: 'My Private Key', password: 'My Password');\n\n$savedExtension = $client->savedExtensions->get('id');\n\nvar_dump($savedExtension);",
      },
      python: {
        method: 'saved_extensions.get',
        example:
          'import os\nfrom imagekitio import ImageKit\n\nclient = ImageKit(\n    private_key=os.environ.get("IMAGEKIT_PRIVATE_KEY"),  # This is the default and can be omitted\n    password=os.environ.get("OPTIONAL_IMAGEKIT_IGNORES_THIS"),  # This is the default and can be omitted\n)\nsaved_extension = client.saved_extensions.get(\n    "id",\n)\nprint(saved_extension.id)',
      },
      ruby: {
        method: 'saved_extensions.get',
        example:
          'require "imagekitio"\n\nimage_kit = Imagekitio::Client.new(private_key: "My Private Key", password: "My Password")\n\nsaved_extension = image_kit.saved_extensions.get("id")\n\nputs(saved_extension)',
      },
      typescript: {
        method: 'client.savedExtensions.get',
        example:
          "import ImageKit from '@imagekit/nodejs';\n\nconst client = new ImageKit({\n  privateKey: process.env['IMAGEKIT_PRIVATE_KEY'], // This is the default and can be omitted\n  password: process.env['OPTIONAL_IMAGEKIT_IGNORES_THIS'], // This is the default and can be omitted\n});\n\nconst savedExtension = await client.savedExtensions.get('id');\n\nconsole.log(savedExtension.id);",
      },
    },
  },
  {
    name: 'update',
    endpoint: '/v1/saved-extensions/{id}',
    httpMethod: 'patch',
    summary: 'Update saved extension',
    description:
      'This API updates an existing saved extension. You can update the name, description, or config.\n',
    stainlessPath: '(resource) savedExtensions > (method) update',
    qualified: 'client.savedExtensions.update',
    params: [
      'id: string;',
      "config?: { name: 'remove-bg'; options?: { add_shadow?: boolean; bg_color?: string; bg_image_url?: string; semitransparency?: boolean; }; } | { maxTags: number; minConfidence: number; name: 'google-auto-tagging' | 'aws-auto-tagging'; } | { name: 'ai-auto-description'; } | { name: 'ai-tasks'; tasks: { instruction: string; type: 'select_tags'; max_selections?: number; min_selections?: number; vocabulary?: string[]; } | { field: string; instruction: string; type: 'select_metadata'; max_selections?: number; min_selections?: number; vocabulary?: string | number | boolean[]; } | { instruction: string; type: 'yes_no'; on_no?: { add_tags?: string[]; remove_tags?: string[]; set_metadata?: object[]; unset_metadata?: object[]; }; on_unknown?: { add_tags?: string[]; remove_tags?: string[]; set_metadata?: object[]; unset_metadata?: object[]; }; on_yes?: { add_tags?: string[]; remove_tags?: string[]; set_metadata?: object[]; unset_metadata?: object[]; }; }[]; };",
      'description?: string;',
      'name?: string;',
    ],
    response:
      "{ id?: string; config?: { name: 'remove-bg'; options?: object; } | { maxTags: number; minConfidence: number; name: 'google-auto-tagging' | 'aws-auto-tagging'; } | { name: 'ai-auto-description'; } | { name: 'ai-tasks'; tasks: object | object | object[]; }; createdAt?: string; description?: string; name?: string; updatedAt?: string; }",
    markdown:
      "## update\n\n`client.savedExtensions.update(id: string, config?: { name: 'remove-bg'; options?: object; } | { maxTags: number; minConfidence: number; name: 'google-auto-tagging' | 'aws-auto-tagging'; } | { name: 'ai-auto-description'; } | { name: 'ai-tasks'; tasks: object | object | object[]; }, description?: string, name?: string): { id?: string; config?: extension_config; createdAt?: string; description?: string; name?: string; updatedAt?: string; }`\n\n**patch** `/v1/saved-extensions/{id}`\n\nThis API updates an existing saved extension. You can update the name, description, or config.\n\n\n### Parameters\n\n- `id: string`\n\n- `config?: { name: 'remove-bg'; options?: { add_shadow?: boolean; bg_color?: string; bg_image_url?: string; semitransparency?: boolean; }; } | { maxTags: number; minConfidence: number; name: 'google-auto-tagging' | 'aws-auto-tagging'; } | { name: 'ai-auto-description'; } | { name: 'ai-tasks'; tasks: { instruction: string; type: 'select_tags'; max_selections?: number; min_selections?: number; vocabulary?: string[]; } | { field: string; instruction: string; type: 'select_metadata'; max_selections?: number; min_selections?: number; vocabulary?: string | number | boolean[]; } | { instruction: string; type: 'yes_no'; on_no?: { add_tags?: string[]; remove_tags?: string[]; set_metadata?: object[]; unset_metadata?: object[]; }; on_unknown?: { add_tags?: string[]; remove_tags?: string[]; set_metadata?: object[]; unset_metadata?: object[]; }; on_yes?: { add_tags?: string[]; remove_tags?: string[]; set_metadata?: object[]; unset_metadata?: object[]; }; }[]; }`\n  Configuration object for an extension (base extensions only, not saved extension references).\n\n- `description?: string`\n  Updated description of the saved extension.\n\n- `name?: string`\n  Updated name of the saved extension.\n\n### Returns\n\n- `{ id?: string; config?: { name: 'remove-bg'; options?: object; } | { maxTags: number; minConfidence: number; name: 'google-auto-tagging' | 'aws-auto-tagging'; } | { name: 'ai-auto-description'; } | { name: 'ai-tasks'; tasks: object | object | object[]; }; createdAt?: string; description?: string; name?: string; updatedAt?: string; }`\n  Saved extension object containing extension configuration.\n\n  - `id?: string`\n  - `config?: { name: 'remove-bg'; options?: { add_shadow?: boolean; bg_color?: string; bg_image_url?: string; semitransparency?: boolean; }; } | { maxTags: number; minConfidence: number; name: 'google-auto-tagging' | 'aws-auto-tagging'; } | { name: 'ai-auto-description'; } | { name: 'ai-tasks'; tasks: { instruction: string; type: 'select_tags'; max_selections?: number; min_selections?: number; vocabulary?: string[]; } | { field: string; instruction: string; type: 'select_metadata'; max_selections?: number; min_selections?: number; vocabulary?: string | number | boolean[]; } | { instruction: string; type: 'yes_no'; on_no?: { add_tags?: string[]; remove_tags?: string[]; set_metadata?: object[]; unset_metadata?: object[]; }; on_unknown?: { add_tags?: string[]; remove_tags?: string[]; set_metadata?: object[]; unset_metadata?: object[]; }; on_yes?: { add_tags?: string[]; remove_tags?: string[]; set_metadata?: object[]; unset_metadata?: object[]; }; }[]; }`\n  - `createdAt?: string`\n  - `description?: string`\n  - `name?: string`\n  - `updatedAt?: string`\n\n### Example\n\n```typescript\nimport ImageKit from '@imagekit/nodejs';\n\nconst client = new ImageKit();\n\nconst savedExtension = await client.savedExtensions.update('id');\n\nconsole.log(savedExtension);\n```",
    perLanguage: {
      cli: {
        method: 'savedExtensions update',
        example:
          "imagekit saved-extensions update \\\n  --private-key 'My Private Key' \\\n  --password 'My Password' \\\n  --id id",
      },
      csharp: {
        method: 'SavedExtensions.Update',
        example:
          'SavedExtensionUpdateParams parameters = new() { ID = "id" };\n\nvar savedExtension = await client.SavedExtensions.Update(parameters);\n\nConsole.WriteLine(savedExtension);',
      },
      go: {
        method: 'client.SavedExtensions.Update',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/imagekit-developer/imagekit-go"\n\t"github.com/imagekit-developer/imagekit-go/option"\n)\n\nfunc main() {\n\tclient := imagekit.NewClient(\n\t\toption.WithPrivateKey("My Private Key"),\n\t\toption.WithPassword("My Password"),\n\t)\n\tsavedExtension, err := client.SavedExtensions.Update(\n\t\tcontext.TODO(),\n\t\t"id",\n\t\timagekit.SavedExtensionUpdateParams{},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", savedExtension.ID)\n}\n',
      },
      http: {
        example:
          "curl https://api.imagekit.io/v1/saved-extensions/$ID \\\n    -X PATCH \\\n    -H 'Content-Type: application/json' \\\n    -u \"$IMAGEKIT_PRIVATE_KEY:OPTIONAL_IMAGEKIT_IGNORES_THIS\" \\\n    -d '{}'",
      },
      java: {
        method: 'savedExtensions().update',
        example:
          'package com.imagekit.api.example;\n\nimport com.imagekit.api.client.ImageKitClient;\nimport com.imagekit.api.client.okhttp.ImageKitOkHttpClient;\nimport com.imagekit.api.models.SavedExtension;\nimport com.imagekit.api.models.savedextensions.SavedExtensionUpdateParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        ImageKitClient client = ImageKitOkHttpClient.fromEnv();\n\n        SavedExtension savedExtension = client.savedExtensions().update("id");\n    }\n}',
      },
      php: {
        method: 'savedExtensions->update',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(privateKey: 'My Private Key', password: 'My Password');\n\n$savedExtension = $client->savedExtensions->update(\n  'id',\n  config: [\n    'name' => 'remove-bg',\n    'options' => [\n      'addShadow' => true,\n      'bgColor' => 'bg_color',\n      'bgImageURL' => 'bg_image_url',\n      'semitransparency' => true,\n    ],\n  ],\n  description: 'x',\n  name: 'x',\n);\n\nvar_dump($savedExtension);",
      },
      python: {
        method: 'saved_extensions.update',
        example:
          'import os\nfrom imagekitio import ImageKit\n\nclient = ImageKit(\n    private_key=os.environ.get("IMAGEKIT_PRIVATE_KEY"),  # This is the default and can be omitted\n    password=os.environ.get("OPTIONAL_IMAGEKIT_IGNORES_THIS"),  # This is the default and can be omitted\n)\nsaved_extension = client.saved_extensions.update(\n    id="id",\n)\nprint(saved_extension.id)',
      },
      ruby: {
        method: 'saved_extensions.update',
        example:
          'require "imagekitio"\n\nimage_kit = Imagekitio::Client.new(private_key: "My Private Key", password: "My Password")\n\nsaved_extension = image_kit.saved_extensions.update("id")\n\nputs(saved_extension)',
      },
      typescript: {
        method: 'client.savedExtensions.update',
        example:
          "import ImageKit from '@imagekit/nodejs';\n\nconst client = new ImageKit({\n  privateKey: process.env['IMAGEKIT_PRIVATE_KEY'], // This is the default and can be omitted\n  password: process.env['OPTIONAL_IMAGEKIT_IGNORES_THIS'], // This is the default and can be omitted\n});\n\nconst savedExtension = await client.savedExtensions.update('id');\n\nconsole.log(savedExtension.id);",
      },
    },
  },
  {
    name: 'delete',
    endpoint: '/v1/saved-extensions/{id}',
    httpMethod: 'delete',
    summary: 'Delete saved extension',
    description: 'This API deletes a saved extension permanently.\n',
    stainlessPath: '(resource) savedExtensions > (method) delete',
    qualified: 'client.savedExtensions.delete',
    params: ['id: string;'],
    markdown:
      "## delete\n\n`client.savedExtensions.delete(id: string): void`\n\n**delete** `/v1/saved-extensions/{id}`\n\nThis API deletes a saved extension permanently.\n\n\n### Parameters\n\n- `id: string`\n\n### Example\n\n```typescript\nimport ImageKit from '@imagekit/nodejs';\n\nconst client = new ImageKit();\n\nawait client.savedExtensions.delete('id')\n```",
    perLanguage: {
      cli: {
        method: 'savedExtensions delete',
        example:
          "imagekit saved-extensions delete \\\n  --private-key 'My Private Key' \\\n  --password 'My Password' \\\n  --id id",
      },
      csharp: {
        method: 'SavedExtensions.Delete',
        example:
          'SavedExtensionDeleteParams parameters = new() { ID = "id" };\n\nawait client.SavedExtensions.Delete(parameters);',
      },
      go: {
        method: 'client.SavedExtensions.Delete',
        example:
          'package main\n\nimport (\n\t"context"\n\n\t"github.com/imagekit-developer/imagekit-go"\n\t"github.com/imagekit-developer/imagekit-go/option"\n)\n\nfunc main() {\n\tclient := imagekit.NewClient(\n\t\toption.WithPrivateKey("My Private Key"),\n\t\toption.WithPassword("My Password"),\n\t)\n\terr := client.SavedExtensions.Delete(context.TODO(), "id")\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n}\n',
      },
      http: {
        example:
          'curl https://api.imagekit.io/v1/saved-extensions/$ID \\\n    -X DELETE \\\n    -u "$IMAGEKIT_PRIVATE_KEY:OPTIONAL_IMAGEKIT_IGNORES_THIS"',
      },
      java: {
        method: 'savedExtensions().delete',
        example:
          'package com.imagekit.api.example;\n\nimport com.imagekit.api.client.ImageKitClient;\nimport com.imagekit.api.client.okhttp.ImageKitOkHttpClient;\nimport com.imagekit.api.models.savedextensions.SavedExtensionDeleteParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        ImageKitClient client = ImageKitOkHttpClient.fromEnv();\n\n        client.savedExtensions().delete("id");\n    }\n}',
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
    },
  },
  {
    name: 'list',
    endpoint: '/v1/files',
    httpMethod: 'get',
    summary: 'List and search assets',
    description:
      'This API can list all the uploaded files and folders in your ImageKit.io media library. In addition, you can fine-tune your query by specifying various filters by generating a query string in a Lucene-like syntax and provide this generated string as the value of the `searchQuery`.\n',
    stainlessPath: '(resource) assets > (method) list',
    qualified: 'client.assets.list',
    params: [
      "fileType?: 'all' | 'image' | 'non-image';",
      'limit?: number;',
      'path?: string;',
      'searchQuery?: string;',
      'skip?: number;',
      'sort?: string;',
      "type?: 'file' | 'file-version' | 'folder' | 'all';",
    ],
    response:
      "{ AITags?: { confidence?: number; name?: string; source?: string; }[]; audioCodec?: string; bitRate?: number; createdAt?: string; customCoordinates?: string; customMetadata?: object; description?: string; duration?: number; embeddedMetadata?: object; fileId?: string; filePath?: string; fileType?: string; hasAlpha?: boolean; height?: number; isPrivateFile?: boolean; isPublished?: boolean; mime?: string; name?: string; selectedFieldsSchema?: object; size?: number; tags?: string[]; thumbnail?: string; type?: 'file' | 'file-version'; updatedAt?: string; url?: string; versionInfo?: { id?: string; name?: string; }; videoCodec?: string; width?: number; } | { createdAt?: string; customMetadata?: object; folderId?: string; folderPath?: string; name?: string; type?: 'folder'; updatedAt?: string; }[]",
    markdown:
      "## list\n\n`client.assets.list(fileType?: 'all' | 'image' | 'non-image', limit?: number, path?: string, searchQuery?: string, skip?: number, sort?: string, type?: 'file' | 'file-version' | 'folder' | 'all'): object | object[]`\n\n**get** `/v1/files`\n\nThis API can list all the uploaded files and folders in your ImageKit.io media library. In addition, you can fine-tune your query by specifying various filters by generating a query string in a Lucene-like syntax and provide this generated string as the value of the `searchQuery`.\n\n\n### Parameters\n\n- `fileType?: 'all' | 'image' | 'non-image'`\n  Filter results by file type.\n\n- `all` — include all file types  \n- `image` — include only image files  \n- `non-image` — include only non-image files (e.g., JS, CSS, video)\n\n- `limit?: number`\n  The maximum number of results to return in response.\n\n\n- `path?: string`\n  Folder path if you want to limit the search within a specific folder. For example, `/sales-banner/` will only search in folder sales-banner.\n\nNote : If your use case involves searching within a folder as well as its subfolders, you can use `path` parameter in `searchQuery` with appropriate operator.\nCheckout [Supported parameters](/docs/api-reference/digital-asset-management-dam/list-and-search-assets#supported-parameters) for more information.\n\n\n- `searchQuery?: string`\n  Query string in a Lucene-like query language e.g. `createdAt > \"7d\"`.\n\nNote : When the searchQuery parameter is present, the following query parameters will have no effect on the result:\n\n1. `tags`\n2. `type`\n3. `name`\n\n[Learn more](/docs/api-reference/digital-asset-management-dam/list-and-search-assets#advanced-search-queries) from examples.\n\n\n- `skip?: number`\n  The number of results to skip before returning results.\n\n\n- `sort?: string`\n  Sort the results by one of the supported fields in ascending or descending order.\n\n- `type?: 'file' | 'file-version' | 'folder' | 'all'`\n  Filter results by asset type.\n\n- `file` — returns only files  \n- `file-version` — returns specific file versions  \n- `folder` — returns only folders  \n- `all` — returns both files and folders (excludes `file-version`)\n\n### Returns\n\n- `{ AITags?: { confidence?: number; name?: string; source?: string; }[]; audioCodec?: string; bitRate?: number; createdAt?: string; customCoordinates?: string; customMetadata?: object; description?: string; duration?: number; embeddedMetadata?: object; fileId?: string; filePath?: string; fileType?: string; hasAlpha?: boolean; height?: number; isPrivateFile?: boolean; isPublished?: boolean; mime?: string; name?: string; selectedFieldsSchema?: object; size?: number; tags?: string[]; thumbnail?: string; type?: 'file' | 'file-version'; updatedAt?: string; url?: string; versionInfo?: { id?: string; name?: string; }; videoCodec?: string; width?: number; } | { createdAt?: string; customMetadata?: object; folderId?: string; folderPath?: string; name?: string; type?: 'folder'; updatedAt?: string; }[]`\n\n### Example\n\n```typescript\nimport ImageKit from '@imagekit/nodejs';\n\nconst client = new ImageKit();\n\nconst assets = await client.assets.list();\n\nconsole.log(assets);\n```",
    perLanguage: {
      cli: {
        method: 'assets list',
        example: "imagekit assets list \\\n  --private-key 'My Private Key' \\\n  --password 'My Password'",
      },
      csharp: {
        method: 'Assets.List',
        example:
          'AssetListParams parameters = new();\n\nvar assets = await client.Assets.List(parameters);\n\nConsole.WriteLine(assets);',
      },
      go: {
        method: 'client.Assets.List',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/imagekit-developer/imagekit-go"\n\t"github.com/imagekit-developer/imagekit-go/option"\n)\n\nfunc main() {\n\tclient := imagekit.NewClient(\n\t\toption.WithPrivateKey("My Private Key"),\n\t\toption.WithPassword("My Password"),\n\t)\n\tassets, err := client.Assets.List(context.TODO(), imagekit.AssetListParams{})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", assets)\n}\n',
      },
      http: {
        example:
          'curl https://api.imagekit.io/v1/files \\\n    -u "$IMAGEKIT_PRIVATE_KEY:OPTIONAL_IMAGEKIT_IGNORES_THIS"',
      },
      java: {
        method: 'assets().list',
        example:
          'package com.imagekit.api.example;\n\nimport com.imagekit.api.client.ImageKitClient;\nimport com.imagekit.api.client.okhttp.ImageKitOkHttpClient;\nimport com.imagekit.api.models.assets.AssetListParams;\nimport com.imagekit.api.models.assets.AssetListResponse;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        ImageKitClient client = ImageKitOkHttpClient.fromEnv();\n\n        List<AssetListResponse> assets = client.assets().list();\n    }\n}',
      },
      php: {
        method: 'assets->list',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(privateKey: 'My Private Key', password: 'My Password');\n\n$assets = $client->assets->list(\n  fileType: 'all',\n  limit: 1,\n  path: 'path',\n  searchQuery: 'searchQuery',\n  skip: 0,\n  sort: 'ASC_NAME',\n  type: 'file',\n);\n\nvar_dump($assets);",
      },
      python: {
        method: 'assets.list',
        example:
          'import os\nfrom imagekitio import ImageKit\n\nclient = ImageKit(\n    private_key=os.environ.get("IMAGEKIT_PRIVATE_KEY"),  # This is the default and can be omitted\n    password=os.environ.get("OPTIONAL_IMAGEKIT_IGNORES_THIS"),  # This is the default and can be omitted\n)\nassets = client.assets.list()\nprint(assets)',
      },
      ruby: {
        method: 'assets.list',
        example:
          'require "imagekitio"\n\nimage_kit = Imagekitio::Client.new(private_key: "My Private Key", password: "My Password")\n\nassets = image_kit.assets.list\n\nputs(assets)',
      },
      typescript: {
        method: 'client.assets.list',
        example:
          "import ImageKit from '@imagekit/nodejs';\n\nconst client = new ImageKit({\n  privateKey: process.env['IMAGEKIT_PRIVATE_KEY'], // This is the default and can be omitted\n  password: process.env['OPTIONAL_IMAGEKIT_IGNORES_THIS'], // This is the default and can be omitted\n});\n\nconst assets = await client.assets.list();\n\nconsole.log(assets);",
      },
    },
  },
  {
    name: 'create',
    endpoint: '/v1/files/purge',
    httpMethod: 'post',
    summary: 'Purge cache',
    description:
      "This API will purge CDN cache and ImageKit.io's internal cache for a file.  Note: Purge cache is an asynchronous process and it may take some time to reflect the changes.\n",
    stainlessPath: '(resource) cache.invalidation > (method) create',
    qualified: 'client.cache.invalidation.create',
    params: ['url: string;'],
    response: '{ requestId?: string; }',
    markdown:
      "## create\n\n`client.cache.invalidation.create(url: string): { requestId?: string; }`\n\n**post** `/v1/files/purge`\n\nThis API will purge CDN cache and ImageKit.io's internal cache for a file.  Note: Purge cache is an asynchronous process and it may take some time to reflect the changes.\n\n\n### Parameters\n\n- `url: string`\n  The full URL of the file to be purged.\n\n\n### Returns\n\n- `{ requestId?: string; }`\n\n  - `requestId?: string`\n\n### Example\n\n```typescript\nimport ImageKit from '@imagekit/nodejs';\n\nconst client = new ImageKit();\n\nconst invalidation = await client.cache.invalidation.create({ url: 'https://ik.imagekit.io/your_imagekit_id/default-image.jpg' });\n\nconsole.log(invalidation);\n```",
    perLanguage: {
      cli: {
        method: 'invalidation create',
        example:
          "imagekit cache:invalidation create \\\n  --private-key 'My Private Key' \\\n  --password 'My Password' \\\n  --url https://ik.imagekit.io/your_imagekit_id/default-image.jpg",
      },
      csharp: {
        method: 'Cache.Invalidation.Create',
        example:
          'InvalidationCreateParams parameters = new()\n{\n    Url = "https://ik.imagekit.io/your_imagekit_id/default-image.jpg"\n};\n\nvar invalidation = await client.Cache.Invalidation.Create(parameters);\n\nConsole.WriteLine(invalidation);',
      },
      go: {
        method: 'client.Cache.Invalidation.New',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/imagekit-developer/imagekit-go"\n\t"github.com/imagekit-developer/imagekit-go/option"\n)\n\nfunc main() {\n\tclient := imagekit.NewClient(\n\t\toption.WithPrivateKey("My Private Key"),\n\t\toption.WithPassword("My Password"),\n\t)\n\tinvalidation, err := client.Cache.Invalidation.New(context.TODO(), imagekit.CacheInvalidationNewParams{\n\t\tURL: "https://ik.imagekit.io/your_imagekit_id/default-image.jpg",\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", invalidation.RequestID)\n}\n',
      },
      http: {
        example:
          'curl https://api.imagekit.io/v1/files/purge \\\n    -H \'Content-Type: application/json\' \\\n    -u "$IMAGEKIT_PRIVATE_KEY:OPTIONAL_IMAGEKIT_IGNORES_THIS" \\\n    -d \'{\n          "url": "https://ik.imagekit.io/your_imagekit_id/default-image.jpg"\n        }\'',
      },
      java: {
        method: 'cache().invalidation().create',
        example:
          'package com.imagekit.api.example;\n\nimport com.imagekit.api.client.ImageKitClient;\nimport com.imagekit.api.client.okhttp.ImageKitOkHttpClient;\nimport com.imagekit.api.models.cache.invalidation.InvalidationCreateParams;\nimport com.imagekit.api.models.cache.invalidation.InvalidationCreateResponse;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        ImageKitClient client = ImageKitOkHttpClient.fromEnv();\n\n        InvalidationCreateParams params = InvalidationCreateParams.builder()\n            .url("https://ik.imagekit.io/your_imagekit_id/default-image.jpg")\n            .build();\n        InvalidationCreateResponse invalidation = client.cache().invalidation().create(params);\n    }\n}',
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
          "import ImageKit from '@imagekit/nodejs';\n\nconst client = new ImageKit({\n  privateKey: process.env['IMAGEKIT_PRIVATE_KEY'], // This is the default and can be omitted\n  password: process.env['OPTIONAL_IMAGEKIT_IGNORES_THIS'], // This is the default and can be omitted\n});\n\nconst invalidation = await client.cache.invalidation.create({\n  url: 'https://ik.imagekit.io/your_imagekit_id/default-image.jpg',\n});\n\nconsole.log(invalidation.requestId);",
      },
    },
  },
  {
    name: 'get',
    endpoint: '/v1/files/purge/{requestId}',
    httpMethod: 'get',
    summary: 'Get purge status',
    description: 'This API returns the status of a purge cache request.\n',
    stainlessPath: '(resource) cache.invalidation > (method) get',
    qualified: 'client.cache.invalidation.get',
    params: ['requestId: string;'],
    response: "{ status?: 'Pending' | 'Completed'; }",
    markdown:
      "## get\n\n`client.cache.invalidation.get(requestId: string): { status?: 'Pending' | 'Completed'; }`\n\n**get** `/v1/files/purge/{requestId}`\n\nThis API returns the status of a purge cache request.\n\n\n### Parameters\n\n- `requestId: string`\n\n### Returns\n\n- `{ status?: 'Pending' | 'Completed'; }`\n\n  - `status?: 'Pending' | 'Completed'`\n\n### Example\n\n```typescript\nimport ImageKit from '@imagekit/nodejs';\n\nconst client = new ImageKit();\n\nconst invalidation = await client.cache.invalidation.get('requestId');\n\nconsole.log(invalidation);\n```",
    perLanguage: {
      cli: {
        method: 'invalidation get',
        example:
          "imagekit cache:invalidation get \\\n  --private-key 'My Private Key' \\\n  --password 'My Password' \\\n  --request-id requestId",
      },
      csharp: {
        method: 'Cache.Invalidation.Get',
        example:
          'InvalidationGetParams parameters = new() { RequestID = "requestId" };\n\nvar invalidation = await client.Cache.Invalidation.Get(parameters);\n\nConsole.WriteLine(invalidation);',
      },
      go: {
        method: 'client.Cache.Invalidation.Get',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/imagekit-developer/imagekit-go"\n\t"github.com/imagekit-developer/imagekit-go/option"\n)\n\nfunc main() {\n\tclient := imagekit.NewClient(\n\t\toption.WithPrivateKey("My Private Key"),\n\t\toption.WithPassword("My Password"),\n\t)\n\tinvalidation, err := client.Cache.Invalidation.Get(context.TODO(), "requestId")\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", invalidation.Status)\n}\n',
      },
      http: {
        example:
          'curl https://api.imagekit.io/v1/files/purge/$REQUEST_ID \\\n    -u "$IMAGEKIT_PRIVATE_KEY:OPTIONAL_IMAGEKIT_IGNORES_THIS"',
      },
      java: {
        method: 'cache().invalidation().get',
        example:
          'package com.imagekit.api.example;\n\nimport com.imagekit.api.client.ImageKitClient;\nimport com.imagekit.api.client.okhttp.ImageKitOkHttpClient;\nimport com.imagekit.api.models.cache.invalidation.InvalidationGetParams;\nimport com.imagekit.api.models.cache.invalidation.InvalidationGetResponse;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        ImageKitClient client = ImageKitOkHttpClient.fromEnv();\n\n        InvalidationGetResponse invalidation = client.cache().invalidation().get("requestId");\n    }\n}',
      },
      php: {
        method: 'cache->invalidation->get',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(privateKey: 'My Private Key', password: 'My Password');\n\n$invalidation = $client->cache->invalidation->get('requestId');\n\nvar_dump($invalidation);",
      },
      python: {
        method: 'cache.invalidation.get',
        example:
          'import os\nfrom imagekitio import ImageKit\n\nclient = ImageKit(\n    private_key=os.environ.get("IMAGEKIT_PRIVATE_KEY"),  # This is the default and can be omitted\n    password=os.environ.get("OPTIONAL_IMAGEKIT_IGNORES_THIS"),  # This is the default and can be omitted\n)\ninvalidation = client.cache.invalidation.get(\n    "requestId",\n)\nprint(invalidation.status)',
      },
      ruby: {
        method: 'cache.invalidation.get',
        example:
          'require "imagekitio"\n\nimage_kit = Imagekitio::Client.new(private_key: "My Private Key", password: "My Password")\n\ninvalidation = image_kit.cache.invalidation.get("requestId")\n\nputs(invalidation)',
      },
      typescript: {
        method: 'client.cache.invalidation.get',
        example:
          "import ImageKit from '@imagekit/nodejs';\n\nconst client = new ImageKit({\n  privateKey: process.env['IMAGEKIT_PRIVATE_KEY'], // This is the default and can be omitted\n  password: process.env['OPTIONAL_IMAGEKIT_IGNORES_THIS'], // This is the default and can be omitted\n});\n\nconst invalidation = await client.cache.invalidation.get('requestId');\n\nconsole.log(invalidation.status);",
      },
    },
  },
  {
    name: 'create',
    endpoint: '/v1/folder',
    httpMethod: 'post',
    summary: 'Create folder',
    description:
      'This will create a new folder. You can specify the folder name and location of the parent folder where this new folder should be created.\n',
    stainlessPath: '(resource) folders > (method) create',
    qualified: 'client.folders.create',
    params: ['folderName: string;', 'parentFolderPath: string;'],
    response: '{  }',
    markdown:
      "## create\n\n`client.folders.create(folderName: string, parentFolderPath: string): {  }`\n\n**post** `/v1/folder`\n\nThis will create a new folder. You can specify the folder name and location of the parent folder where this new folder should be created.\n\n\n### Parameters\n\n- `folderName: string`\n  The folder will be created with this name. \n\nAll characters except alphabets and numbers (inclusive of unicode letters, marks, and numerals in other languages) will be replaced by an underscore i.e. `_`.\n\n\n- `parentFolderPath: string`\n  The folder where the new folder should be created, for root use `/` else the path e.g. `containing/folder/`.\n\nNote: If any folder(s) is not present in the parentFolderPath parameter, it will be automatically created. For example, if you pass `/product/images/summer`, then `product`, `images`, and `summer` folders will be created if they don't already exist.\n\n\n### Returns\n\n- `{  }`\n\n\n### Example\n\n```typescript\nimport ImageKit from '@imagekit/nodejs';\n\nconst client = new ImageKit();\n\nconst folder = await client.folders.create({ folderName: 'summer', parentFolderPath: '/product/images/' });\n\nconsole.log(folder);\n```",
    perLanguage: {
      cli: {
        method: 'folders create',
        example:
          "imagekit folders create \\\n  --private-key 'My Private Key' \\\n  --password 'My Password' \\\n  --folder-name summer \\\n  --parent-folder-path /product/images/",
      },
      csharp: {
        method: 'Folders.Create',
        example:
          'FolderCreateParams parameters = new()\n{\n    FolderName = "summer",\n    ParentFolderPath = "/product/images/",\n};\n\nvar folder = await client.Folders.Create(parameters);\n\nConsole.WriteLine(folder);',
      },
      go: {
        method: 'client.Folders.New',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/imagekit-developer/imagekit-go"\n\t"github.com/imagekit-developer/imagekit-go/option"\n)\n\nfunc main() {\n\tclient := imagekit.NewClient(\n\t\toption.WithPrivateKey("My Private Key"),\n\t\toption.WithPassword("My Password"),\n\t)\n\tfolder, err := client.Folders.New(context.TODO(), imagekit.FolderNewParams{\n\t\tFolderName:       "summer",\n\t\tParentFolderPath: "/product/images/",\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", folder)\n}\n',
      },
      http: {
        example:
          'curl https://api.imagekit.io/v1/folder \\\n    -H \'Content-Type: application/json\' \\\n    -u "$IMAGEKIT_PRIVATE_KEY:OPTIONAL_IMAGEKIT_IGNORES_THIS" \\\n    -d \'{\n          "folderName": "summer",\n          "parentFolderPath": "/product/images/"\n        }\'',
      },
      java: {
        method: 'folders().create',
        example:
          'package com.imagekit.api.example;\n\nimport com.imagekit.api.client.ImageKitClient;\nimport com.imagekit.api.client.okhttp.ImageKitOkHttpClient;\nimport com.imagekit.api.models.folders.FolderCreateParams;\nimport com.imagekit.api.models.folders.FolderCreateResponse;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        ImageKitClient client = ImageKitOkHttpClient.fromEnv();\n\n        FolderCreateParams params = FolderCreateParams.builder()\n            .folderName("summer")\n            .parentFolderPath("/product/images/")\n            .build();\n        FolderCreateResponse folder = client.folders().create(params);\n    }\n}',
      },
      php: {
        method: 'folders->create',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(privateKey: 'My Private Key', password: 'My Password');\n\n$folder = $client->folders->create(\n  folderName: 'summer', parentFolderPath: '/product/images/'\n);\n\nvar_dump($folder);",
      },
      python: {
        method: 'folders.create',
        example:
          'import os\nfrom imagekitio import ImageKit\n\nclient = ImageKit(\n    private_key=os.environ.get("IMAGEKIT_PRIVATE_KEY"),  # This is the default and can be omitted\n    password=os.environ.get("OPTIONAL_IMAGEKIT_IGNORES_THIS"),  # This is the default and can be omitted\n)\nfolder = client.folders.create(\n    folder_name="summer",\n    parent_folder_path="/product/images/",\n)\nprint(folder)',
      },
      ruby: {
        method: 'folders.create',
        example:
          'require "imagekitio"\n\nimage_kit = Imagekitio::Client.new(private_key: "My Private Key", password: "My Password")\n\nfolder = image_kit.folders.create(folder_name: "summer", parent_folder_path: "/product/images/")\n\nputs(folder)',
      },
      typescript: {
        method: 'client.folders.create',
        example:
          "import ImageKit from '@imagekit/nodejs';\n\nconst client = new ImageKit({\n  privateKey: process.env['IMAGEKIT_PRIVATE_KEY'], // This is the default and can be omitted\n  password: process.env['OPTIONAL_IMAGEKIT_IGNORES_THIS'], // This is the default and can be omitted\n});\n\nconst folder = await client.folders.create({\n  folderName: 'summer',\n  parentFolderPath: '/product/images/',\n});\n\nconsole.log(folder);",
      },
    },
  },
  {
    name: 'delete',
    endpoint: '/v1/folder',
    httpMethod: 'delete',
    summary: 'Delete folder',
    description:
      'This will delete a folder and all its contents permanently. The API returns an empty response.\n',
    stainlessPath: '(resource) folders > (method) delete',
    qualified: 'client.folders.delete',
    params: ['folderPath: string;'],
    response: '{  }',
    markdown:
      "## delete\n\n`client.folders.delete(folderPath: string): {  }`\n\n**delete** `/v1/folder`\n\nThis will delete a folder and all its contents permanently. The API returns an empty response.\n\n\n### Parameters\n\n- `folderPath: string`\n  Full path to the folder you want to delete. For example `/folder/to/delete/`.\n\n\n### Returns\n\n- `{  }`\n\n\n### Example\n\n```typescript\nimport ImageKit from '@imagekit/nodejs';\n\nconst client = new ImageKit();\n\nconst folder = await client.folders.delete({ folderPath: '/folder/to/delete/' });\n\nconsole.log(folder);\n```",
    perLanguage: {
      cli: {
        method: 'folders delete',
        example:
          "imagekit folders delete \\\n  --private-key 'My Private Key' \\\n  --password 'My Password' \\\n  --folder-path /folder/to/delete/",
      },
      csharp: {
        method: 'Folders.Delete',
        example:
          'FolderDeleteParams parameters = new() { FolderPath = "/folder/to/delete/" };\n\nvar folder = await client.Folders.Delete(parameters);\n\nConsole.WriteLine(folder);',
      },
      go: {
        method: 'client.Folders.Delete',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/imagekit-developer/imagekit-go"\n\t"github.com/imagekit-developer/imagekit-go/option"\n)\n\nfunc main() {\n\tclient := imagekit.NewClient(\n\t\toption.WithPrivateKey("My Private Key"),\n\t\toption.WithPassword("My Password"),\n\t)\n\tfolder, err := client.Folders.Delete(context.TODO(), imagekit.FolderDeleteParams{\n\t\tFolderPath: "/folder/to/delete/",\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", folder)\n}\n',
      },
      http: {
        example:
          'curl https://api.imagekit.io/v1/folder \\\n    -X DELETE \\\n    -u "$IMAGEKIT_PRIVATE_KEY:OPTIONAL_IMAGEKIT_IGNORES_THIS"',
      },
      java: {
        method: 'folders().delete',
        example:
          'package com.imagekit.api.example;\n\nimport com.imagekit.api.client.ImageKitClient;\nimport com.imagekit.api.client.okhttp.ImageKitOkHttpClient;\nimport com.imagekit.api.models.folders.FolderDeleteParams;\nimport com.imagekit.api.models.folders.FolderDeleteResponse;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        ImageKitClient client = ImageKitOkHttpClient.fromEnv();\n\n        FolderDeleteParams params = FolderDeleteParams.builder()\n            .folderPath("/folder/to/delete/")\n            .build();\n        FolderDeleteResponse folder = client.folders().delete(params);\n    }\n}',
      },
      php: {
        method: 'folders->delete',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(privateKey: 'My Private Key', password: 'My Password');\n\n$folder = $client->folders->delete(folderPath: '/folder/to/delete/');\n\nvar_dump($folder);",
      },
      python: {
        method: 'folders.delete',
        example:
          'import os\nfrom imagekitio import ImageKit\n\nclient = ImageKit(\n    private_key=os.environ.get("IMAGEKIT_PRIVATE_KEY"),  # This is the default and can be omitted\n    password=os.environ.get("OPTIONAL_IMAGEKIT_IGNORES_THIS"),  # This is the default and can be omitted\n)\nfolder = client.folders.delete(\n    folder_path="/folder/to/delete/",\n)\nprint(folder)',
      },
      ruby: {
        method: 'folders.delete',
        example:
          'require "imagekitio"\n\nimage_kit = Imagekitio::Client.new(private_key: "My Private Key", password: "My Password")\n\nfolder = image_kit.folders.delete(folder_path: "/folder/to/delete/")\n\nputs(folder)',
      },
      typescript: {
        method: 'client.folders.delete',
        example:
          "import ImageKit from '@imagekit/nodejs';\n\nconst client = new ImageKit({\n  privateKey: process.env['IMAGEKIT_PRIVATE_KEY'], // This is the default and can be omitted\n  password: process.env['OPTIONAL_IMAGEKIT_IGNORES_THIS'], // This is the default and can be omitted\n});\n\nconst folder = await client.folders.delete({ folderPath: '/folder/to/delete/' });\n\nconsole.log(folder);",
      },
    },
  },
  {
    name: 'copy',
    endpoint: '/v1/bulkJobs/copyFolder',
    httpMethod: 'post',
    summary: 'Copy folder',
    description:
      'This will copy one folder into another. The selected folder, its nested folders, files, and their versions (in `includeVersions` is set to true) are copied in this operation. Note: If any file at the destination has the same name as the source file, then the source file and its versions will be appended to the destination file version history.\n',
    stainlessPath: '(resource) folders > (method) copy',
    qualified: 'client.folders.copy',
    params: ['destinationPath: string;', 'sourceFolderPath: string;', 'includeVersions?: boolean;'],
    response: '{ jobId: string; }',
    markdown:
      "## copy\n\n`client.folders.copy(destinationPath: string, sourceFolderPath: string, includeVersions?: boolean): { jobId: string; }`\n\n**post** `/v1/bulkJobs/copyFolder`\n\nThis will copy one folder into another. The selected folder, its nested folders, files, and their versions (in `includeVersions` is set to true) are copied in this operation. Note: If any file at the destination has the same name as the source file, then the source file and its versions will be appended to the destination file version history.\n\n\n### Parameters\n\n- `destinationPath: string`\n  Full path to the destination folder where you want to copy the source folder into.\n\n\n- `sourceFolderPath: string`\n  The full path to the source folder you want to copy.\n\n\n- `includeVersions?: boolean`\n  Option to copy all versions of files that are nested inside the selected folder. By default, only the current version of each file will be copied. When set to true, all versions of each file will be copied. Default value - `false`.\n\n\n### Returns\n\n- `{ jobId: string; }`\n  Job submitted successfully. A `jobId` will be returned.\n\n  - `jobId: string`\n\n### Example\n\n```typescript\nimport ImageKit from '@imagekit/nodejs';\n\nconst client = new ImageKit();\n\nconst response = await client.folders.copy({ destinationPath: '/path/of/destination/folder', sourceFolderPath: '/path/of/source/folder' });\n\nconsole.log(response);\n```",
    perLanguage: {
      cli: {
        method: 'folders copy',
        example:
          "imagekit folders copy \\\n  --private-key 'My Private Key' \\\n  --password 'My Password' \\\n  --destination-path /path/of/destination/folder \\\n  --source-folder-path /path/of/source/folder",
      },
      csharp: {
        method: 'Folders.Copy',
        example:
          'FolderCopyParams parameters = new()\n{\n    DestinationPath = "/path/of/destination/folder",\n    SourceFolderPath = "/path/of/source/folder",\n};\n\nvar response = await client.Folders.Copy(parameters);\n\nConsole.WriteLine(response);',
      },
      go: {
        method: 'client.Folders.Copy',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/imagekit-developer/imagekit-go"\n\t"github.com/imagekit-developer/imagekit-go/option"\n)\n\nfunc main() {\n\tclient := imagekit.NewClient(\n\t\toption.WithPrivateKey("My Private Key"),\n\t\toption.WithPassword("My Password"),\n\t)\n\tresponse, err := client.Folders.Copy(context.TODO(), imagekit.FolderCopyParams{\n\t\tDestinationPath:  "/path/of/destination/folder",\n\t\tSourceFolderPath: "/path/of/source/folder",\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.JobID)\n}\n',
      },
      http: {
        example:
          'curl https://api.imagekit.io/v1/bulkJobs/copyFolder \\\n    -H \'Content-Type: application/json\' \\\n    -u "$IMAGEKIT_PRIVATE_KEY:OPTIONAL_IMAGEKIT_IGNORES_THIS" \\\n    -d \'{\n          "destinationPath": "/path/of/destination/folder",\n          "sourceFolderPath": "/path/of/source/folder",\n          "includeVersions": true\n        }\'',
      },
      java: {
        method: 'folders().copy',
        example:
          'package com.imagekit.api.example;\n\nimport com.imagekit.api.client.ImageKitClient;\nimport com.imagekit.api.client.okhttp.ImageKitOkHttpClient;\nimport com.imagekit.api.models.folders.FolderCopyParams;\nimport com.imagekit.api.models.folders.FolderCopyResponse;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        ImageKitClient client = ImageKitOkHttpClient.fromEnv();\n\n        FolderCopyParams params = FolderCopyParams.builder()\n            .destinationPath("/path/of/destination/folder")\n            .sourceFolderPath("/path/of/source/folder")\n            .build();\n        FolderCopyResponse response = client.folders().copy(params);\n    }\n}',
      },
      php: {
        method: 'folders->copy',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(privateKey: 'My Private Key', password: 'My Password');\n\n$response = $client->folders->copy(\n  destinationPath: '/path/of/destination/folder',\n  sourceFolderPath: '/path/of/source/folder',\n  includeVersions: true,\n);\n\nvar_dump($response);",
      },
      python: {
        method: 'folders.copy',
        example:
          'import os\nfrom imagekitio import ImageKit\n\nclient = ImageKit(\n    private_key=os.environ.get("IMAGEKIT_PRIVATE_KEY"),  # This is the default and can be omitted\n    password=os.environ.get("OPTIONAL_IMAGEKIT_IGNORES_THIS"),  # This is the default and can be omitted\n)\nresponse = client.folders.copy(\n    destination_path="/path/of/destination/folder",\n    source_folder_path="/path/of/source/folder",\n)\nprint(response.job_id)',
      },
      ruby: {
        method: 'folders.copy',
        example:
          'require "imagekitio"\n\nimage_kit = Imagekitio::Client.new(private_key: "My Private Key", password: "My Password")\n\nresponse = image_kit.folders.copy(\n  destination_path: "/path/of/destination/folder",\n  source_folder_path: "/path/of/source/folder"\n)\n\nputs(response)',
      },
      typescript: {
        method: 'client.folders.copy',
        example:
          "import ImageKit from '@imagekit/nodejs';\n\nconst client = new ImageKit({\n  privateKey: process.env['IMAGEKIT_PRIVATE_KEY'], // This is the default and can be omitted\n  password: process.env['OPTIONAL_IMAGEKIT_IGNORES_THIS'], // This is the default and can be omitted\n});\n\nconst response = await client.folders.copy({\n  destinationPath: '/path/of/destination/folder',\n  sourceFolderPath: '/path/of/source/folder',\n});\n\nconsole.log(response.jobId);",
      },
    },
  },
  {
    name: 'move',
    endpoint: '/v1/bulkJobs/moveFolder',
    httpMethod: 'post',
    summary: 'Move folder',
    description:
      'This will move one folder into another. The selected folder, its nested folders, files, and their versions are moved in this operation. Note: If any file at the destination has the same name as the source file, then the source file and its versions will be appended to the destination file version history.\n',
    stainlessPath: '(resource) folders > (method) move',
    qualified: 'client.folders.move',
    params: ['destinationPath: string;', 'sourceFolderPath: string;'],
    response: '{ jobId: string; }',
    markdown:
      "## move\n\n`client.folders.move(destinationPath: string, sourceFolderPath: string): { jobId: string; }`\n\n**post** `/v1/bulkJobs/moveFolder`\n\nThis will move one folder into another. The selected folder, its nested folders, files, and their versions are moved in this operation. Note: If any file at the destination has the same name as the source file, then the source file and its versions will be appended to the destination file version history.\n\n\n### Parameters\n\n- `destinationPath: string`\n  Full path to the destination folder where you want to move the source folder into.\n\n\n- `sourceFolderPath: string`\n  The full path to the source folder you want to move.\n\n\n### Returns\n\n- `{ jobId: string; }`\n  Job submitted successfully. A `jobId` will be returned.\n\n  - `jobId: string`\n\n### Example\n\n```typescript\nimport ImageKit from '@imagekit/nodejs';\n\nconst client = new ImageKit();\n\nconst response = await client.folders.move({ destinationPath: '/path/of/destination/folder', sourceFolderPath: '/path/of/source/folder' });\n\nconsole.log(response);\n```",
    perLanguage: {
      cli: {
        method: 'folders move',
        example:
          "imagekit folders move \\\n  --private-key 'My Private Key' \\\n  --password 'My Password' \\\n  --destination-path /path/of/destination/folder \\\n  --source-folder-path /path/of/source/folder",
      },
      csharp: {
        method: 'Folders.Move',
        example:
          'FolderMoveParams parameters = new()\n{\n    DestinationPath = "/path/of/destination/folder",\n    SourceFolderPath = "/path/of/source/folder",\n};\n\nvar response = await client.Folders.Move(parameters);\n\nConsole.WriteLine(response);',
      },
      go: {
        method: 'client.Folders.Move',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/imagekit-developer/imagekit-go"\n\t"github.com/imagekit-developer/imagekit-go/option"\n)\n\nfunc main() {\n\tclient := imagekit.NewClient(\n\t\toption.WithPrivateKey("My Private Key"),\n\t\toption.WithPassword("My Password"),\n\t)\n\tresponse, err := client.Folders.Move(context.TODO(), imagekit.FolderMoveParams{\n\t\tDestinationPath:  "/path/of/destination/folder",\n\t\tSourceFolderPath: "/path/of/source/folder",\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.JobID)\n}\n',
      },
      http: {
        example:
          'curl https://api.imagekit.io/v1/bulkJobs/moveFolder \\\n    -H \'Content-Type: application/json\' \\\n    -u "$IMAGEKIT_PRIVATE_KEY:OPTIONAL_IMAGEKIT_IGNORES_THIS" \\\n    -d \'{\n          "destinationPath": "/path/of/destination/folder",\n          "sourceFolderPath": "/path/of/source/folder"\n        }\'',
      },
      java: {
        method: 'folders().move',
        example:
          'package com.imagekit.api.example;\n\nimport com.imagekit.api.client.ImageKitClient;\nimport com.imagekit.api.client.okhttp.ImageKitOkHttpClient;\nimport com.imagekit.api.models.folders.FolderMoveParams;\nimport com.imagekit.api.models.folders.FolderMoveResponse;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        ImageKitClient client = ImageKitOkHttpClient.fromEnv();\n\n        FolderMoveParams params = FolderMoveParams.builder()\n            .destinationPath("/path/of/destination/folder")\n            .sourceFolderPath("/path/of/source/folder")\n            .build();\n        FolderMoveResponse response = client.folders().move(params);\n    }\n}',
      },
      php: {
        method: 'folders->move',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(privateKey: 'My Private Key', password: 'My Password');\n\n$response = $client->folders->move(\n  destinationPath: '/path/of/destination/folder',\n  sourceFolderPath: '/path/of/source/folder',\n);\n\nvar_dump($response);",
      },
      python: {
        method: 'folders.move',
        example:
          'import os\nfrom imagekitio import ImageKit\n\nclient = ImageKit(\n    private_key=os.environ.get("IMAGEKIT_PRIVATE_KEY"),  # This is the default and can be omitted\n    password=os.environ.get("OPTIONAL_IMAGEKIT_IGNORES_THIS"),  # This is the default and can be omitted\n)\nresponse = client.folders.move(\n    destination_path="/path/of/destination/folder",\n    source_folder_path="/path/of/source/folder",\n)\nprint(response.job_id)',
      },
      ruby: {
        method: 'folders.move',
        example:
          'require "imagekitio"\n\nimage_kit = Imagekitio::Client.new(private_key: "My Private Key", password: "My Password")\n\nresponse = image_kit.folders.move(\n  destination_path: "/path/of/destination/folder",\n  source_folder_path: "/path/of/source/folder"\n)\n\nputs(response)',
      },
      typescript: {
        method: 'client.folders.move',
        example:
          "import ImageKit from '@imagekit/nodejs';\n\nconst client = new ImageKit({\n  privateKey: process.env['IMAGEKIT_PRIVATE_KEY'], // This is the default and can be omitted\n  password: process.env['OPTIONAL_IMAGEKIT_IGNORES_THIS'], // This is the default and can be omitted\n});\n\nconst response = await client.folders.move({\n  destinationPath: '/path/of/destination/folder',\n  sourceFolderPath: '/path/of/source/folder',\n});\n\nconsole.log(response.jobId);",
      },
    },
  },
  {
    name: 'rename',
    endpoint: '/v1/bulkJobs/renameFolder',
    httpMethod: 'post',
    summary: 'Rename folder',
    description:
      'This API allows you to rename an existing folder. The folder and all its nested assets and sub-folders will remain unchanged, but their paths will be updated to reflect the new folder name.\n',
    stainlessPath: '(resource) folders > (method) rename',
    qualified: 'client.folders.rename',
    params: ['folderPath: string;', 'newFolderName: string;', 'purgeCache?: boolean;'],
    response: '{ jobId: string; }',
    markdown:
      "## rename\n\n`client.folders.rename(folderPath: string, newFolderName: string, purgeCache?: boolean): { jobId: string; }`\n\n**post** `/v1/bulkJobs/renameFolder`\n\nThis API allows you to rename an existing folder. The folder and all its nested assets and sub-folders will remain unchanged, but their paths will be updated to reflect the new folder name.\n\n\n### Parameters\n\n- `folderPath: string`\n  The full path to the folder you want to rename.\n\n\n- `newFolderName: string`\n  The new name for the folder.\n\nAll characters except alphabets and numbers (inclusive of unicode letters, marks, and numerals in other languages) and `-` will be replaced by an underscore i.e. `_`.\n\n\n- `purgeCache?: boolean`\n  Option to purge cache for the old nested files and their versions' URLs.\n\nWhen set to true, it will internally issue a purge cache request on CDN to remove the cached content of the old nested files and their versions. There will only be one purge request for all the nested files, which will be counted against your monthly purge quota.\n\nNote: A purge cache request will be issued against `https://ik.imagekit.io/old/folder/path*` (with a wildcard at the end). This will remove all nested files, their versions' URLs, and any transformations made using query parameters on these files or their versions. However, the cache for file transformations made using path parameters will persist. You can purge them using the purge API. For more details, refer to the purge API documentation.\n\nDefault value - `false`\n\n\n### Returns\n\n- `{ jobId: string; }`\n  Job submitted successfully. A `jobId` will be returned.\n\n  - `jobId: string`\n\n### Example\n\n```typescript\nimport ImageKit from '@imagekit/nodejs';\n\nconst client = new ImageKit();\n\nconst response = await client.folders.rename({ folderPath: '/path/of/folder', newFolderName: 'new-folder-name' });\n\nconsole.log(response);\n```",
    perLanguage: {
      cli: {
        method: 'folders rename',
        example:
          "imagekit folders rename \\\n  --private-key 'My Private Key' \\\n  --password 'My Password' \\\n  --folder-path /path/of/folder \\\n  --new-folder-name new-folder-name",
      },
      csharp: {
        method: 'Folders.Rename',
        example:
          'FolderRenameParams parameters = new()\n{\n    FolderPath = "/path/of/folder",\n    NewFolderName = "new-folder-name",\n};\n\nvar response = await client.Folders.Rename(parameters);\n\nConsole.WriteLine(response);',
      },
      go: {
        method: 'client.Folders.Rename',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/imagekit-developer/imagekit-go"\n\t"github.com/imagekit-developer/imagekit-go/option"\n)\n\nfunc main() {\n\tclient := imagekit.NewClient(\n\t\toption.WithPrivateKey("My Private Key"),\n\t\toption.WithPassword("My Password"),\n\t)\n\tresponse, err := client.Folders.Rename(context.TODO(), imagekit.FolderRenameParams{\n\t\tFolderPath:    "/path/of/folder",\n\t\tNewFolderName: "new-folder-name",\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.JobID)\n}\n',
      },
      http: {
        example:
          'curl https://api.imagekit.io/v1/bulkJobs/renameFolder \\\n    -H \'Content-Type: application/json\' \\\n    -u "$IMAGEKIT_PRIVATE_KEY:OPTIONAL_IMAGEKIT_IGNORES_THIS" \\\n    -d \'{\n          "folderPath": "/path/of/folder",\n          "newFolderName": "new-folder-name",\n          "purgeCache": true\n        }\'',
      },
      java: {
        method: 'folders().rename',
        example:
          'package com.imagekit.api.example;\n\nimport com.imagekit.api.client.ImageKitClient;\nimport com.imagekit.api.client.okhttp.ImageKitOkHttpClient;\nimport com.imagekit.api.models.folders.FolderRenameParams;\nimport com.imagekit.api.models.folders.FolderRenameResponse;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        ImageKitClient client = ImageKitOkHttpClient.fromEnv();\n\n        FolderRenameParams params = FolderRenameParams.builder()\n            .folderPath("/path/of/folder")\n            .newFolderName("new-folder-name")\n            .build();\n        FolderRenameResponse response = client.folders().rename(params);\n    }\n}',
      },
      php: {
        method: 'folders->rename',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(privateKey: 'My Private Key', password: 'My Password');\n\n$response = $client->folders->rename(\n  folderPath: '/path/of/folder',\n  newFolderName: 'new-folder-name',\n  purgeCache: true,\n);\n\nvar_dump($response);",
      },
      python: {
        method: 'folders.rename',
        example:
          'import os\nfrom imagekitio import ImageKit\n\nclient = ImageKit(\n    private_key=os.environ.get("IMAGEKIT_PRIVATE_KEY"),  # This is the default and can be omitted\n    password=os.environ.get("OPTIONAL_IMAGEKIT_IGNORES_THIS"),  # This is the default and can be omitted\n)\nresponse = client.folders.rename(\n    folder_path="/path/of/folder",\n    new_folder_name="new-folder-name",\n)\nprint(response.job_id)',
      },
      ruby: {
        method: 'folders.rename',
        example:
          'require "imagekitio"\n\nimage_kit = Imagekitio::Client.new(private_key: "My Private Key", password: "My Password")\n\nresponse = image_kit.folders.rename(folder_path: "/path/of/folder", new_folder_name: "new-folder-name")\n\nputs(response)',
      },
      typescript: {
        method: 'client.folders.rename',
        example:
          "import ImageKit from '@imagekit/nodejs';\n\nconst client = new ImageKit({\n  privateKey: process.env['IMAGEKIT_PRIVATE_KEY'], // This is the default and can be omitted\n  password: process.env['OPTIONAL_IMAGEKIT_IGNORES_THIS'], // This is the default and can be omitted\n});\n\nconst response = await client.folders.rename({\n  folderPath: '/path/of/folder',\n  newFolderName: 'new-folder-name',\n});\n\nconsole.log(response.jobId);",
      },
    },
  },
  {
    name: 'get',
    endpoint: '/v1/bulkJobs/{jobId}',
    httpMethod: 'get',
    summary: 'Bulk job status',
    description: 'This API returns the status of a bulk job like copy and move folder operations.\n',
    stainlessPath: '(resource) folders.job > (method) get',
    qualified: 'client.folders.job.get',
    params: ['jobId: string;'],
    response:
      "{ jobId?: string; purgeRequestId?: string; status?: 'Pending' | 'Completed'; type?: 'COPY_FOLDER' | 'MOVE_FOLDER' | 'RENAME_FOLDER'; }",
    markdown:
      "## get\n\n`client.folders.job.get(jobId: string): { jobId?: string; purgeRequestId?: string; status?: 'Pending' | 'Completed'; type?: 'COPY_FOLDER' | 'MOVE_FOLDER' | 'RENAME_FOLDER'; }`\n\n**get** `/v1/bulkJobs/{jobId}`\n\nThis API returns the status of a bulk job like copy and move folder operations.\n\n\n### Parameters\n\n- `jobId: string`\n\n### Returns\n\n- `{ jobId?: string; purgeRequestId?: string; status?: 'Pending' | 'Completed'; type?: 'COPY_FOLDER' | 'MOVE_FOLDER' | 'RENAME_FOLDER'; }`\n\n  - `jobId?: string`\n  - `purgeRequestId?: string`\n  - `status?: 'Pending' | 'Completed'`\n  - `type?: 'COPY_FOLDER' | 'MOVE_FOLDER' | 'RENAME_FOLDER'`\n\n### Example\n\n```typescript\nimport ImageKit from '@imagekit/nodejs';\n\nconst client = new ImageKit();\n\nconst job = await client.folders.job.get('jobId');\n\nconsole.log(job);\n```",
    perLanguage: {
      cli: {
        method: 'job get',
        example:
          "imagekit folders:job get \\\n  --private-key 'My Private Key' \\\n  --password 'My Password' \\\n  --job-id jobId",
      },
      csharp: {
        method: 'Folders.Job.Get',
        example:
          'JobGetParams parameters = new() { JobID = "jobId" };\n\nvar job = await client.Folders.Job.Get(parameters);\n\nConsole.WriteLine(job);',
      },
      go: {
        method: 'client.Folders.Job.Get',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/imagekit-developer/imagekit-go"\n\t"github.com/imagekit-developer/imagekit-go/option"\n)\n\nfunc main() {\n\tclient := imagekit.NewClient(\n\t\toption.WithPrivateKey("My Private Key"),\n\t\toption.WithPassword("My Password"),\n\t)\n\tjob, err := client.Folders.Job.Get(context.TODO(), "jobId")\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", job.JobID)\n}\n',
      },
      http: {
        example:
          'curl https://api.imagekit.io/v1/bulkJobs/$JOB_ID \\\n    -u "$IMAGEKIT_PRIVATE_KEY:OPTIONAL_IMAGEKIT_IGNORES_THIS"',
      },
      java: {
        method: 'folders().job().get',
        example:
          'package com.imagekit.api.example;\n\nimport com.imagekit.api.client.ImageKitClient;\nimport com.imagekit.api.client.okhttp.ImageKitOkHttpClient;\nimport com.imagekit.api.models.folders.job.JobGetParams;\nimport com.imagekit.api.models.folders.job.JobGetResponse;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        ImageKitClient client = ImageKitOkHttpClient.fromEnv();\n\n        JobGetResponse job = client.folders().job().get("jobId");\n    }\n}',
      },
      php: {
        method: 'folders->job->get',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(privateKey: 'My Private Key', password: 'My Password');\n\n$job = $client->folders->job->get('jobId');\n\nvar_dump($job);",
      },
      python: {
        method: 'folders.job.get',
        example:
          'import os\nfrom imagekitio import ImageKit\n\nclient = ImageKit(\n    private_key=os.environ.get("IMAGEKIT_PRIVATE_KEY"),  # This is the default and can be omitted\n    password=os.environ.get("OPTIONAL_IMAGEKIT_IGNORES_THIS"),  # This is the default and can be omitted\n)\njob = client.folders.job.get(\n    "jobId",\n)\nprint(job.job_id)',
      },
      ruby: {
        method: 'folders.job.get',
        example:
          'require "imagekitio"\n\nimage_kit = Imagekitio::Client.new(private_key: "My Private Key", password: "My Password")\n\njob = image_kit.folders.job.get("jobId")\n\nputs(job)',
      },
      typescript: {
        method: 'client.folders.job.get',
        example:
          "import ImageKit from '@imagekit/nodejs';\n\nconst client = new ImageKit({\n  privateKey: process.env['IMAGEKIT_PRIVATE_KEY'], // This is the default and can be omitted\n  password: process.env['OPTIONAL_IMAGEKIT_IGNORES_THIS'], // This is the default and can be omitted\n});\n\nconst job = await client.folders.job.get('jobId');\n\nconsole.log(job.jobId);",
      },
    },
  },
  {
    name: 'get',
    endpoint: '/v1/accounts/usage',
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
      "## get\n\n`client.accounts.usage.get(endDate: string, startDate: string): { bandwidthBytes?: number; extensionUnitsCount?: number; mediaLibraryStorageBytes?: number; originalCacheStorageBytes?: number; videoProcessingUnitsCount?: number; }`\n\n**get** `/v1/accounts/usage`\n\nGet the account usage information between two dates. Note that the API response includes data from the start date while excluding data from the end date. In other words, the data covers the period starting from the specified start date up to, but not including, the end date.\n\n\n### Parameters\n\n- `endDate: string`\n  Specify a `endDate` in `YYYY-MM-DD` format. It should be after the `startDate`. The difference between `startDate` and `endDate` should be less than 90 days.\n\n- `startDate: string`\n  Specify a `startDate` in `YYYY-MM-DD` format. It should be before the `endDate`. The difference between `startDate` and `endDate` should be less than 90 days.\n\n### Returns\n\n- `{ bandwidthBytes?: number; extensionUnitsCount?: number; mediaLibraryStorageBytes?: number; originalCacheStorageBytes?: number; videoProcessingUnitsCount?: number; }`\n\n  - `bandwidthBytes?: number`\n  - `extensionUnitsCount?: number`\n  - `mediaLibraryStorageBytes?: number`\n  - `originalCacheStorageBytes?: number`\n  - `videoProcessingUnitsCount?: number`\n\n### Example\n\n```typescript\nimport ImageKit from '@imagekit/nodejs';\n\nconst client = new ImageKit();\n\nconst usage = await client.accounts.usage.get({ endDate: '2019-12-27', startDate: '2019-12-27' });\n\nconsole.log(usage);\n```",
    perLanguage: {
      cli: {
        method: 'usage get',
        example:
          "imagekit accounts:usage get \\\n  --private-key 'My Private Key' \\\n  --password 'My Password' \\\n  --end-date \"'2019-12-27'\" \\\n  --start-date \"'2019-12-27'\"",
      },
      csharp: {
        method: 'Accounts.Usage.Get',
        example:
          'UsageGetParams parameters = new()\n{\n    EndDate = "2019-12-27",\n    StartDate = "2019-12-27",\n};\n\nvar usage = await client.Accounts.Usage.Get(parameters);\n\nConsole.WriteLine(usage);',
      },
      go: {
        method: 'client.Accounts.Usage.Get',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\t"time"\n\n\t"github.com/imagekit-developer/imagekit-go"\n\t"github.com/imagekit-developer/imagekit-go/option"\n)\n\nfunc main() {\n\tclient := imagekit.NewClient(\n\t\toption.WithPrivateKey("My Private Key"),\n\t\toption.WithPassword("My Password"),\n\t)\n\tusage, err := client.Accounts.Usage.Get(context.TODO(), imagekit.AccountUsageGetParams{\n\t\tEndDate:   time.Now(),\n\t\tStartDate: time.Now(),\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", usage.BandwidthBytes)\n}\n',
      },
      http: {
        example:
          'curl https://api.imagekit.io/v1/accounts/usage \\\n    -u "$IMAGEKIT_PRIVATE_KEY:OPTIONAL_IMAGEKIT_IGNORES_THIS"',
      },
      java: {
        method: 'accounts().usage().get',
        example:
          'package com.imagekit.api.example;\n\nimport com.imagekit.api.client.ImageKitClient;\nimport com.imagekit.api.client.okhttp.ImageKitOkHttpClient;\nimport com.imagekit.api.models.accounts.usage.UsageGetParams;\nimport com.imagekit.api.models.accounts.usage.UsageGetResponse;\nimport java.time.LocalDate;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        ImageKitClient client = ImageKitOkHttpClient.fromEnv();\n\n        UsageGetParams params = UsageGetParams.builder()\n            .endDate(LocalDate.parse("2019-12-27"))\n            .startDate(LocalDate.parse("2019-12-27"))\n            .build();\n        UsageGetResponse usage = client.accounts().usage().get(params);\n    }\n}',
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
    },
  },
  {
    name: 'list',
    endpoint: '/v1/accounts/origins',
    httpMethod: 'get',
    summary: 'List origins',
    description:
      '**Note:** This API is currently in beta.  \nReturns an array of all configured origins for the current account.\n',
    stainlessPath: '(resource) accounts.origins > (method) list',
    qualified: 'client.accounts.origins.list',
    response: 'object | object | object | object | object | object | object | object[]',
    markdown:
      "## list\n\n`client.accounts.origins.list(): object | object | object | object | object | object | object | object[]`\n\n**get** `/v1/accounts/origins`\n\n**Note:** This API is currently in beta.  \nReturns an array of all configured origins for the current account.\n\n\n### Returns\n\n- `{ id: string; bucket: string; includeCanonicalHeader: boolean; name: string; prefix: string; type: 'S3'; baseUrlForCanonicalHeader?: string; } | { id: string; bucket: string; endpoint: string; includeCanonicalHeader: boolean; name: string; prefix: string; s3ForcePathStyle: boolean; type: 'S3_COMPATIBLE'; baseUrlForCanonicalHeader?: string; } | { id: string; bucket: string; includeCanonicalHeader: boolean; name: string; prefix: string; type: 'CLOUDINARY_BACKUP'; baseUrlForCanonicalHeader?: string; } | { id: string; baseUrl: string; forwardHostHeaderToOrigin: boolean; includeCanonicalHeader: boolean; name: string; type: 'WEB_FOLDER'; baseUrlForCanonicalHeader?: string; } | { id: string; includeCanonicalHeader: boolean; name: string; type: 'WEB_PROXY'; baseUrlForCanonicalHeader?: string; } | { id: string; bucket: string; clientEmail: string; includeCanonicalHeader: boolean; name: string; prefix: string; type: 'GCS'; baseUrlForCanonicalHeader?: string; } | { id: string; accountName: string; container: string; includeCanonicalHeader: boolean; name: string; prefix: string; type: 'AZURE_BLOB'; baseUrlForCanonicalHeader?: string; } | { id: string; baseUrl: string; includeCanonicalHeader: boolean; name: string; type: 'AKENEO_PIM'; baseUrlForCanonicalHeader?: string; }[]`\n\n### Example\n\n```typescript\nimport ImageKit from '@imagekit/nodejs';\n\nconst client = new ImageKit();\n\nconst originResponses = await client.accounts.origins.list();\n\nconsole.log(originResponses);\n```",
    perLanguage: {
      cli: {
        method: 'origins list',
        example:
          "imagekit accounts:origins list \\\n  --private-key 'My Private Key' \\\n  --password 'My Password'",
      },
      csharp: {
        method: 'Accounts.Origins.List',
        example:
          'OriginListParams parameters = new();\n\nvar originResponses = await client.Accounts.Origins.List(parameters);\n\nConsole.WriteLine(originResponses);',
      },
      go: {
        method: 'client.Accounts.Origins.List',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/imagekit-developer/imagekit-go"\n\t"github.com/imagekit-developer/imagekit-go/option"\n)\n\nfunc main() {\n\tclient := imagekit.NewClient(\n\t\toption.WithPrivateKey("My Private Key"),\n\t\toption.WithPassword("My Password"),\n\t)\n\toriginResponses, err := client.Accounts.Origins.List(context.TODO())\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", originResponses)\n}\n',
      },
      http: {
        example:
          'curl https://api.imagekit.io/v1/accounts/origins \\\n    -u "$IMAGEKIT_PRIVATE_KEY:OPTIONAL_IMAGEKIT_IGNORES_THIS"',
      },
      java: {
        method: 'accounts().origins().list',
        example:
          'package com.imagekit.api.example;\n\nimport com.imagekit.api.client.ImageKitClient;\nimport com.imagekit.api.client.okhttp.ImageKitOkHttpClient;\nimport com.imagekit.api.models.accounts.origins.OriginListParams;\nimport com.imagekit.api.models.accounts.origins.OriginResponse;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        ImageKitClient client = ImageKitOkHttpClient.fromEnv();\n\n        List<OriginResponse> originResponses = client.accounts().origins().list();\n    }\n}',
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
    },
  },
  {
    name: 'create',
    endpoint: '/v1/accounts/origins',
    httpMethod: 'post',
    summary: 'Create origin',
    description:
      '**Note:** This API is currently in beta.  \nCreates a new origin and returns the origin object.\n',
    stainlessPath: '(resource) accounts.origins > (method) create',
    qualified: 'client.accounts.origins.create',
    params: [
      "OriginRequest: { accessKey: string; bucket: string; name: string; secretKey: string; type: 'S3'; baseUrlForCanonicalHeader?: string; includeCanonicalHeader?: boolean; prefix?: string; } | { accessKey: string; bucket: string; endpoint: string; name: string; secretKey: string; type: 'S3_COMPATIBLE'; baseUrlForCanonicalHeader?: string; includeCanonicalHeader?: boolean; prefix?: string; s3ForcePathStyle?: boolean; } | { accessKey: string; bucket: string; name: string; secretKey: string; type: 'CLOUDINARY_BACKUP'; baseUrlForCanonicalHeader?: string; includeCanonicalHeader?: boolean; prefix?: string; } | { baseUrl: string; name: string; type: 'WEB_FOLDER'; baseUrlForCanonicalHeader?: string; forwardHostHeaderToOrigin?: boolean; includeCanonicalHeader?: boolean; } | { name: string; type: 'WEB_PROXY'; baseUrlForCanonicalHeader?: string; includeCanonicalHeader?: boolean; } | { bucket: string; clientEmail: string; name: string; privateKey: string; type: 'GCS'; baseUrlForCanonicalHeader?: string; includeCanonicalHeader?: boolean; prefix?: string; } | { accountName: string; container: string; name: string; sasToken: string; type: 'AZURE_BLOB'; baseUrlForCanonicalHeader?: string; includeCanonicalHeader?: boolean; prefix?: string; } | { baseUrl: string; clientId: string; clientSecret: string; name: string; password: string; type: 'AKENEO_PIM'; username: string; baseUrlForCanonicalHeader?: string; includeCanonicalHeader?: boolean; };",
    ],
    response: 'object | object | object | object | object | object | object | object',
    perLanguage: {
      cli: {
        method: 'origins create',
        example:
          "imagekit accounts:origins create \\\n  --private-key 'My Private Key' \\\n  --password 'My Password' \\\n  --access-key AKIAIOSFODNN7EXAMPLE \\\n  --bucket product-images \\\n  --name 'US S3 Storage' \\\n  --secret-key wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY \\\n  --type S3 \\\n  --endpoint https://s3.eu-central-1.wasabisys.com \\\n  --base-url https://images.example.com/assets \\\n  --client-email service-account@project.iam.gserviceaccount.com \\\n  --private-key '-----BEGIN PRIVATE KEY-----\\\\nMIIEv...' \\\n  --account-name account123 \\\n  --container images \\\n  --sas-token '?sv=2023-01-03&sr=c&sig=abc123' \\\n  --client-id akeneo-client-id \\\n  --client-secret akeneo-client-secret \\\n  --password strongpassword123 \\\n  --username integration-user",
      },
      csharp: {
        method: 'Accounts.Origins.Create',
        example:
          'OriginCreateParams parameters = new()\n{\n    OriginRequest = new S3()\n    {\n        AccessKey = "AKIATEST123",\n        Bucket = "test-bucket",\n        Name = "My S3 Origin",\n        SecretKey = "secrettest123",\n        BaseUrlForCanonicalHeader = "https://cdn.example.com",\n        IncludeCanonicalHeader = false,\n        Prefix = "images",\n    },\n};\n\nvar originResponse = await client.Accounts.Origins.Create(parameters);\n\nConsole.WriteLine(originResponse);',
      },
      go: {
        method: 'client.Accounts.Origins.New',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/imagekit-developer/imagekit-go"\n\t"github.com/imagekit-developer/imagekit-go/option"\n)\n\nfunc main() {\n\tclient := imagekit.NewClient(\n\t\toption.WithPrivateKey("My Private Key"),\n\t\toption.WithPassword("My Password"),\n\t)\n\toriginResponse, err := client.Accounts.Origins.New(context.TODO(), imagekit.AccountOriginNewParams{\n\t\tOriginRequest: imagekit.OriginRequestUnionParam{\n\t\t\tOfS3: &imagekit.OriginRequestS3Param{\n\t\t\t\tAccessKey: "AKIATEST123",\n\t\t\t\tBucket:    "test-bucket",\n\t\t\t\tName:      "My S3 Origin",\n\t\t\t\tSecretKey: "secrettest123",\n\t\t\t},\n\t\t},\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", originResponse)\n}\n',
      },
      http: {
        example:
          'curl https://api.imagekit.io/v1/accounts/origins \\\n    -H \'Content-Type: application/json\' \\\n    -u "$IMAGEKIT_PRIVATE_KEY:OPTIONAL_IMAGEKIT_IGNORES_THIS" \\\n    -d \'{\n          "accessKey": "AKIAIOSFODNN7EXAMPLE",\n          "bucket": "product-images",\n          "name": "US S3 Storage",\n          "secretKey": "wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY",\n          "type": "S3",\n          "baseUrlForCanonicalHeader": "https://cdn.example.com",\n          "prefix": "raw-assets"\n        }\'',
      },
      java: {
        method: 'accounts().origins().create',
        example:
          'package com.imagekit.api.example;\n\nimport com.imagekit.api.client.ImageKitClient;\nimport com.imagekit.api.client.okhttp.ImageKitOkHttpClient;\nimport com.imagekit.api.models.accounts.origins.OriginCreateParams;\nimport com.imagekit.api.models.accounts.origins.OriginRequest;\nimport com.imagekit.api.models.accounts.origins.OriginResponse;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        ImageKitClient client = ImageKitOkHttpClient.fromEnv();\n\n        OriginRequest.S3 params = OriginRequest.S3.builder()\n            .accessKey("AKIATEST123")\n            .bucket("test-bucket")\n            .name("My S3 Origin")\n            .secretKey("secrettest123")\n            .build();\n        OriginResponse originResponse = client.accounts().origins().create(params);\n    }\n}',
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
          'require "imagekitio"\n\nimage_kit = Imagekitio::Client.new(private_key: "My Private Key", password: "My Password")\n\norigin_response = image_kit.accounts.origins.create(\n  origin_request: {accessKey: "AKIATEST123", bucket: "test-bucket", name: "My S3 Origin", secretKey: "secrettest123", type: :S3}\n)\n\nputs(origin_response)',
      },
      typescript: {
        method: 'client.accounts.origins.create',
        example:
          "import ImageKit from '@imagekit/nodejs';\n\nconst client = new ImageKit({\n  privateKey: process.env['IMAGEKIT_PRIVATE_KEY'], // This is the default and can be omitted\n  password: process.env['OPTIONAL_IMAGEKIT_IGNORES_THIS'], // This is the default and can be omitted\n});\n\nconst originResponse = await client.accounts.origins.create({\n  accessKey: 'AKIAIOSFODNN7EXAMPLE',\n  bucket: 'product-images',\n  name: 'US S3 Storage',\n  secretKey: 'wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY',\n  type: 'S3',\n});\n\nconsole.log(originResponse);",
      },
    },
  },
  {
    name: 'get',
    endpoint: '/v1/accounts/origins/{id}',
    httpMethod: 'get',
    summary: 'Get origin',
    description: '**Note:** This API is currently in beta.  \nRetrieves the origin identified by `id`.\n',
    stainlessPath: '(resource) accounts.origins > (method) get',
    qualified: 'client.accounts.origins.get',
    params: ['id: string;'],
    response: 'object | object | object | object | object | object | object | object',
    markdown:
      "## get\n\n`client.accounts.origins.get(id: string): { id: string; bucket: string; includeCanonicalHeader: boolean; name: string; prefix: string; type: 'S3'; baseUrlForCanonicalHeader?: string; } | { id: string; bucket: string; endpoint: string; includeCanonicalHeader: boolean; name: string; prefix: string; s3ForcePathStyle: boolean; type: 'S3_COMPATIBLE'; baseUrlForCanonicalHeader?: string; } | { id: string; bucket: string; includeCanonicalHeader: boolean; name: string; prefix: string; type: 'CLOUDINARY_BACKUP'; baseUrlForCanonicalHeader?: string; } | { id: string; baseUrl: string; forwardHostHeaderToOrigin: boolean; includeCanonicalHeader: boolean; name: string; type: 'WEB_FOLDER'; baseUrlForCanonicalHeader?: string; } | { id: string; includeCanonicalHeader: boolean; name: string; type: 'WEB_PROXY'; baseUrlForCanonicalHeader?: string; } | { id: string; bucket: string; clientEmail: string; includeCanonicalHeader: boolean; name: string; prefix: string; type: 'GCS'; baseUrlForCanonicalHeader?: string; } | { id: string; accountName: string; container: string; includeCanonicalHeader: boolean; name: string; prefix: string; type: 'AZURE_BLOB'; baseUrlForCanonicalHeader?: string; } | { id: string; baseUrl: string; includeCanonicalHeader: boolean; name: string; type: 'AKENEO_PIM'; baseUrlForCanonicalHeader?: string; }`\n\n**get** `/v1/accounts/origins/{id}`\n\n**Note:** This API is currently in beta.  \nRetrieves the origin identified by `id`.\n\n\n### Parameters\n\n- `id: string`\n  Unique identifier for the origin. This is generated by ImageKit when you create a new origin.\n\n### Returns\n\n- `{ id: string; bucket: string; includeCanonicalHeader: boolean; name: string; prefix: string; type: 'S3'; baseUrlForCanonicalHeader?: string; } | { id: string; bucket: string; endpoint: string; includeCanonicalHeader: boolean; name: string; prefix: string; s3ForcePathStyle: boolean; type: 'S3_COMPATIBLE'; baseUrlForCanonicalHeader?: string; } | { id: string; bucket: string; includeCanonicalHeader: boolean; name: string; prefix: string; type: 'CLOUDINARY_BACKUP'; baseUrlForCanonicalHeader?: string; } | { id: string; baseUrl: string; forwardHostHeaderToOrigin: boolean; includeCanonicalHeader: boolean; name: string; type: 'WEB_FOLDER'; baseUrlForCanonicalHeader?: string; } | { id: string; includeCanonicalHeader: boolean; name: string; type: 'WEB_PROXY'; baseUrlForCanonicalHeader?: string; } | { id: string; bucket: string; clientEmail: string; includeCanonicalHeader: boolean; name: string; prefix: string; type: 'GCS'; baseUrlForCanonicalHeader?: string; } | { id: string; accountName: string; container: string; includeCanonicalHeader: boolean; name: string; prefix: string; type: 'AZURE_BLOB'; baseUrlForCanonicalHeader?: string; } | { id: string; baseUrl: string; includeCanonicalHeader: boolean; name: string; type: 'AKENEO_PIM'; baseUrlForCanonicalHeader?: string; }`\n  Origin object as returned by the API (sensitive fields removed).\n\n### Example\n\n```typescript\nimport ImageKit from '@imagekit/nodejs';\n\nconst client = new ImageKit();\n\nconst originResponse = await client.accounts.origins.get('id');\n\nconsole.log(originResponse);\n```",
    perLanguage: {
      cli: {
        method: 'origins get',
        example:
          "imagekit accounts:origins get \\\n  --private-key 'My Private Key' \\\n  --password 'My Password' \\\n  --id id",
      },
      csharp: {
        method: 'Accounts.Origins.Get',
        example:
          'OriginGetParams parameters = new() { ID = "id" };\n\nvar originResponse = await client.Accounts.Origins.Get(parameters);\n\nConsole.WriteLine(originResponse);',
      },
      go: {
        method: 'client.Accounts.Origins.Get',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/imagekit-developer/imagekit-go"\n\t"github.com/imagekit-developer/imagekit-go/option"\n)\n\nfunc main() {\n\tclient := imagekit.NewClient(\n\t\toption.WithPrivateKey("My Private Key"),\n\t\toption.WithPassword("My Password"),\n\t)\n\toriginResponse, err := client.Accounts.Origins.Get(context.TODO(), "id")\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", originResponse)\n}\n',
      },
      http: {
        example:
          'curl https://api.imagekit.io/v1/accounts/origins/$ID \\\n    -u "$IMAGEKIT_PRIVATE_KEY:OPTIONAL_IMAGEKIT_IGNORES_THIS"',
      },
      java: {
        method: 'accounts().origins().get',
        example:
          'package com.imagekit.api.example;\n\nimport com.imagekit.api.client.ImageKitClient;\nimport com.imagekit.api.client.okhttp.ImageKitOkHttpClient;\nimport com.imagekit.api.models.accounts.origins.OriginGetParams;\nimport com.imagekit.api.models.accounts.origins.OriginResponse;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        ImageKitClient client = ImageKitOkHttpClient.fromEnv();\n\n        OriginResponse originResponse = client.accounts().origins().get("id");\n    }\n}',
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
    },
  },
  {
    name: 'update',
    endpoint: '/v1/accounts/origins/{id}',
    httpMethod: 'put',
    summary: 'Update origin',
    description:
      '**Note:** This API is currently in beta.  \nUpdates the origin identified by `id` and returns the updated origin object.\n',
    stainlessPath: '(resource) accounts.origins > (method) update',
    qualified: 'client.accounts.origins.update',
    params: [
      'id: string;',
      "OriginRequest: { accessKey: string; bucket: string; name: string; secretKey: string; type: 'S3'; baseUrlForCanonicalHeader?: string; includeCanonicalHeader?: boolean; prefix?: string; } | { accessKey: string; bucket: string; endpoint: string; name: string; secretKey: string; type: 'S3_COMPATIBLE'; baseUrlForCanonicalHeader?: string; includeCanonicalHeader?: boolean; prefix?: string; s3ForcePathStyle?: boolean; } | { accessKey: string; bucket: string; name: string; secretKey: string; type: 'CLOUDINARY_BACKUP'; baseUrlForCanonicalHeader?: string; includeCanonicalHeader?: boolean; prefix?: string; } | { baseUrl: string; name: string; type: 'WEB_FOLDER'; baseUrlForCanonicalHeader?: string; forwardHostHeaderToOrigin?: boolean; includeCanonicalHeader?: boolean; } | { name: string; type: 'WEB_PROXY'; baseUrlForCanonicalHeader?: string; includeCanonicalHeader?: boolean; } | { bucket: string; clientEmail: string; name: string; privateKey: string; type: 'GCS'; baseUrlForCanonicalHeader?: string; includeCanonicalHeader?: boolean; prefix?: string; } | { accountName: string; container: string; name: string; sasToken: string; type: 'AZURE_BLOB'; baseUrlForCanonicalHeader?: string; includeCanonicalHeader?: boolean; prefix?: string; } | { baseUrl: string; clientId: string; clientSecret: string; name: string; password: string; type: 'AKENEO_PIM'; username: string; baseUrlForCanonicalHeader?: string; includeCanonicalHeader?: boolean; };",
    ],
    response: 'object | object | object | object | object | object | object | object',
    perLanguage: {
      cli: {
        method: 'origins update',
        example:
          "imagekit accounts:origins update \\\n  --private-key 'My Private Key' \\\n  --password 'My Password' \\\n  --id id \\\n  --access-key AKIAIOSFODNN7EXAMPLE \\\n  --bucket product-images \\\n  --name 'US S3 Storage' \\\n  --secret-key wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY \\\n  --type S3 \\\n  --endpoint https://s3.eu-central-1.wasabisys.com \\\n  --base-url https://images.example.com/assets \\\n  --client-email service-account@project.iam.gserviceaccount.com \\\n  --private-key '-----BEGIN PRIVATE KEY-----\\\\nMIIEv...' \\\n  --account-name account123 \\\n  --container images \\\n  --sas-token '?sv=2023-01-03&sr=c&sig=abc123' \\\n  --client-id akeneo-client-id \\\n  --client-secret akeneo-client-secret \\\n  --password strongpassword123 \\\n  --username integration-user",
      },
      csharp: {
        method: 'Accounts.Origins.Update',
        example:
          'OriginUpdateParams parameters = new()\n{\n    ID = "id",\n    OriginRequest = new S3()\n    {\n        AccessKey = "AKIATEST123",\n        Bucket = "test-bucket",\n        Name = "My S3 Origin",\n        SecretKey = "secrettest123",\n        BaseUrlForCanonicalHeader = "https://cdn.example.com",\n        IncludeCanonicalHeader = false,\n        Prefix = "images",\n    },\n};\n\nvar originResponse = await client.Accounts.Origins.Update(parameters);\n\nConsole.WriteLine(originResponse);',
      },
      go: {
        method: 'client.Accounts.Origins.Update',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/imagekit-developer/imagekit-go"\n\t"github.com/imagekit-developer/imagekit-go/option"\n)\n\nfunc main() {\n\tclient := imagekit.NewClient(\n\t\toption.WithPrivateKey("My Private Key"),\n\t\toption.WithPassword("My Password"),\n\t)\n\toriginResponse, err := client.Accounts.Origins.Update(\n\t\tcontext.TODO(),\n\t\t"id",\n\t\timagekit.AccountOriginUpdateParams{\n\t\t\tOriginRequest: imagekit.OriginRequestUnionParam{\n\t\t\t\tOfS3: &imagekit.OriginRequestS3Param{\n\t\t\t\t\tAccessKey: "AKIATEST123",\n\t\t\t\t\tBucket:    "test-bucket",\n\t\t\t\t\tName:      "My S3 Origin",\n\t\t\t\t\tSecretKey: "secrettest123",\n\t\t\t\t},\n\t\t\t},\n\t\t},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", originResponse)\n}\n',
      },
      http: {
        example:
          'curl https://api.imagekit.io/v1/accounts/origins/$ID \\\n    -X PUT \\\n    -H \'Content-Type: application/json\' \\\n    -u "$IMAGEKIT_PRIVATE_KEY:OPTIONAL_IMAGEKIT_IGNORES_THIS" \\\n    -d \'{\n          "accessKey": "AKIAIOSFODNN7EXAMPLE",\n          "bucket": "product-images",\n          "name": "US S3 Storage",\n          "secretKey": "wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY",\n          "type": "S3",\n          "baseUrlForCanonicalHeader": "https://cdn.example.com",\n          "prefix": "raw-assets"\n        }\'',
      },
      java: {
        method: 'accounts().origins().update',
        example:
          'package com.imagekit.api.example;\n\nimport com.imagekit.api.client.ImageKitClient;\nimport com.imagekit.api.client.okhttp.ImageKitOkHttpClient;\nimport com.imagekit.api.models.accounts.origins.OriginRequest;\nimport com.imagekit.api.models.accounts.origins.OriginResponse;\nimport com.imagekit.api.models.accounts.origins.OriginUpdateParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        ImageKitClient client = ImageKitOkHttpClient.fromEnv();\n\n        OriginUpdateParams params = OriginUpdateParams.builder()\n            .id("id")\n            .originRequest(OriginRequest.S3.builder()\n                .accessKey("AKIATEST123")\n                .bucket("test-bucket")\n                .name("My S3 Origin")\n                .secretKey("secrettest123")\n                .build())\n            .build();\n        OriginResponse originResponse = client.accounts().origins().update(params);\n    }\n}',
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
          'require "imagekitio"\n\nimage_kit = Imagekitio::Client.new(private_key: "My Private Key", password: "My Password")\n\norigin_response = image_kit.accounts.origins.update(\n  "id",\n  origin_request: {accessKey: "AKIATEST123", bucket: "test-bucket", name: "My S3 Origin", secretKey: "secrettest123", type: :S3}\n)\n\nputs(origin_response)',
      },
      typescript: {
        method: 'client.accounts.origins.update',
        example:
          "import ImageKit from '@imagekit/nodejs';\n\nconst client = new ImageKit({\n  privateKey: process.env['IMAGEKIT_PRIVATE_KEY'], // This is the default and can be omitted\n  password: process.env['OPTIONAL_IMAGEKIT_IGNORES_THIS'], // This is the default and can be omitted\n});\n\nconst originResponse = await client.accounts.origins.update('id', {\n  accessKey: 'AKIAIOSFODNN7EXAMPLE',\n  bucket: 'product-images',\n  name: 'US S3 Storage',\n  secretKey: 'wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY',\n  type: 'S3',\n});\n\nconsole.log(originResponse);",
      },
    },
  },
  {
    name: 'delete',
    endpoint: '/v1/accounts/origins/{id}',
    httpMethod: 'delete',
    summary: 'Delete origin',
    description:
      '**Note:** This API is currently in beta.  \nPermanently removes the origin identified by `id`. If the origin is in use by any URL‑endpoints, the API will return an error.\n',
    stainlessPath: '(resource) accounts.origins > (method) delete',
    qualified: 'client.accounts.origins.delete',
    params: ['id: string;'],
    markdown:
      "## delete\n\n`client.accounts.origins.delete(id: string): void`\n\n**delete** `/v1/accounts/origins/{id}`\n\n**Note:** This API is currently in beta.  \nPermanently removes the origin identified by `id`. If the origin is in use by any URL‑endpoints, the API will return an error.\n\n\n### Parameters\n\n- `id: string`\n  Unique identifier for the origin. This is generated by ImageKit when you create a new origin.\n\n### Example\n\n```typescript\nimport ImageKit from '@imagekit/nodejs';\n\nconst client = new ImageKit();\n\nawait client.accounts.origins.delete('id')\n```",
    perLanguage: {
      cli: {
        method: 'origins delete',
        example:
          "imagekit accounts:origins delete \\\n  --private-key 'My Private Key' \\\n  --password 'My Password' \\\n  --id id",
      },
      csharp: {
        method: 'Accounts.Origins.Delete',
        example:
          'OriginDeleteParams parameters = new() { ID = "id" };\n\nawait client.Accounts.Origins.Delete(parameters);',
      },
      go: {
        method: 'client.Accounts.Origins.Delete',
        example:
          'package main\n\nimport (\n\t"context"\n\n\t"github.com/imagekit-developer/imagekit-go"\n\t"github.com/imagekit-developer/imagekit-go/option"\n)\n\nfunc main() {\n\tclient := imagekit.NewClient(\n\t\toption.WithPrivateKey("My Private Key"),\n\t\toption.WithPassword("My Password"),\n\t)\n\terr := client.Accounts.Origins.Delete(context.TODO(), "id")\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n}\n',
      },
      http: {
        example:
          'curl https://api.imagekit.io/v1/accounts/origins/$ID \\\n    -X DELETE \\\n    -u "$IMAGEKIT_PRIVATE_KEY:OPTIONAL_IMAGEKIT_IGNORES_THIS"',
      },
      java: {
        method: 'accounts().origins().delete',
        example:
          'package com.imagekit.api.example;\n\nimport com.imagekit.api.client.ImageKitClient;\nimport com.imagekit.api.client.okhttp.ImageKitOkHttpClient;\nimport com.imagekit.api.models.accounts.origins.OriginDeleteParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        ImageKitClient client = ImageKitOkHttpClient.fromEnv();\n\n        client.accounts().origins().delete("id");\n    }\n}',
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
    },
  },
  {
    name: 'list',
    endpoint: '/v1/accounts/url-endpoints',
    httpMethod: 'get',
    summary: 'List URL‑endpoints',
    description:
      '**Note:** This API is currently in beta.  \nReturns an array of all URL‑endpoints configured including the default URL-endpoint generated by ImageKit during account creation.\n',
    stainlessPath: '(resource) accounts.urlEndpoints > (method) list',
    qualified: 'client.accounts.urlEndpoints.list',
    response:
      "{ id: string; description: string; origins: string[]; urlPrefix: string; urlRewriter?: { preserveAssetDeliveryTypes: boolean; type: 'CLOUDINARY'; } | { type: 'IMGIX'; } | { type: 'AKAMAI'; }; }[]",
    markdown:
      "## list\n\n`client.accounts.urlEndpoints.list(): object[]`\n\n**get** `/v1/accounts/url-endpoints`\n\n**Note:** This API is currently in beta.  \nReturns an array of all URL‑endpoints configured including the default URL-endpoint generated by ImageKit during account creation.\n\n\n### Returns\n\n- `{ id: string; description: string; origins: string[]; urlPrefix: string; urlRewriter?: { preserveAssetDeliveryTypes: boolean; type: 'CLOUDINARY'; } | { type: 'IMGIX'; } | { type: 'AKAMAI'; }; }[]`\n\n### Example\n\n```typescript\nimport ImageKit from '@imagekit/nodejs';\n\nconst client = new ImageKit();\n\nconst urlEndpointResponses = await client.accounts.urlEndpoints.list();\n\nconsole.log(urlEndpointResponses);\n```",
    perLanguage: {
      cli: {
        method: 'urlEndpoints list',
        example:
          "imagekit accounts:url-endpoints list \\\n  --private-key 'My Private Key' \\\n  --password 'My Password'",
      },
      csharp: {
        method: 'Accounts.UrlEndpoints.List',
        example:
          'UrlEndpointListParams parameters = new();\n\nvar urlEndpointResponses = await client.Accounts.UrlEndpoints.List(parameters);\n\nConsole.WriteLine(urlEndpointResponses);',
      },
      go: {
        method: 'client.Accounts.URLEndpoints.List',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/imagekit-developer/imagekit-go"\n\t"github.com/imagekit-developer/imagekit-go/option"\n)\n\nfunc main() {\n\tclient := imagekit.NewClient(\n\t\toption.WithPrivateKey("My Private Key"),\n\t\toption.WithPassword("My Password"),\n\t)\n\turlEndpointResponses, err := client.Accounts.URLEndpoints.List(context.TODO())\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", urlEndpointResponses)\n}\n',
      },
      http: {
        example:
          'curl https://api.imagekit.io/v1/accounts/url-endpoints \\\n    -u "$IMAGEKIT_PRIVATE_KEY:OPTIONAL_IMAGEKIT_IGNORES_THIS"',
      },
      java: {
        method: 'accounts().urlEndpoints().list',
        example:
          'package com.imagekit.api.example;\n\nimport com.imagekit.api.client.ImageKitClient;\nimport com.imagekit.api.client.okhttp.ImageKitOkHttpClient;\nimport com.imagekit.api.models.accounts.urlendpoints.UrlEndpointListParams;\nimport com.imagekit.api.models.accounts.urlendpoints.UrlEndpointResponse;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        ImageKitClient client = ImageKitOkHttpClient.fromEnv();\n\n        List<UrlEndpointResponse> urlEndpointResponses = client.accounts().urlEndpoints().list();\n    }\n}',
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
    },
  },
  {
    name: 'create',
    endpoint: '/v1/accounts/url-endpoints',
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
      "{ id: string; description: string; origins: string[]; urlPrefix: string; urlRewriter?: { preserveAssetDeliveryTypes: boolean; type: 'CLOUDINARY'; } | { type: 'IMGIX'; } | { type: 'AKAMAI'; }; }",
    markdown:
      "## create\n\n`client.accounts.urlEndpoints.create(description: string, origins?: string[], urlPrefix?: string, urlRewriter?: { type: 'CLOUDINARY'; preserveAssetDeliveryTypes?: boolean; } | { type: 'IMGIX'; } | { type: 'AKAMAI'; }): { id: string; description: string; origins: string[]; urlPrefix: string; urlRewriter?: object | object | object; }`\n\n**post** `/v1/accounts/url-endpoints`\n\n**Note:** This API is currently in beta.  \nCreates a new URL‑endpoint and returns the resulting object.\n\n\n### Parameters\n\n- `description: string`\n  Description of the URL endpoint.\n\n- `origins?: string[]`\n  Ordered list of origin IDs to try when the file isn’t in the Media Library; ImageKit checks them in the sequence provided. Origin must be created before it can be used in a URL endpoint.\n\n- `urlPrefix?: string`\n  Path segment appended to your base URL to form the endpoint (letters, digits, and hyphens only — or empty for the default endpoint).\n\n- `urlRewriter?: { type: 'CLOUDINARY'; preserveAssetDeliveryTypes?: boolean; } | { type: 'IMGIX'; } | { type: 'AKAMAI'; }`\n  Configuration for third-party URL rewriting.\n\n### Returns\n\n- `{ id: string; description: string; origins: string[]; urlPrefix: string; urlRewriter?: { preserveAssetDeliveryTypes: boolean; type: 'CLOUDINARY'; } | { type: 'IMGIX'; } | { type: 'AKAMAI'; }; }`\n  URL‑endpoint object as returned by the API.\n\n  - `id: string`\n  - `description: string`\n  - `origins: string[]`\n  - `urlPrefix: string`\n  - `urlRewriter?: { preserveAssetDeliveryTypes: boolean; type: 'CLOUDINARY'; } | { type: 'IMGIX'; } | { type: 'AKAMAI'; }`\n\n### Example\n\n```typescript\nimport ImageKit from '@imagekit/nodejs';\n\nconst client = new ImageKit();\n\nconst urlEndpointResponse = await client.accounts.urlEndpoints.create({ description: 'My custom URL endpoint' });\n\nconsole.log(urlEndpointResponse);\n```",
    perLanguage: {
      cli: {
        method: 'urlEndpoints create',
        example:
          "imagekit accounts:url-endpoints create \\\n  --private-key 'My Private Key' \\\n  --password 'My Password' \\\n  --description 'My custom URL endpoint'",
      },
      csharp: {
        method: 'Accounts.UrlEndpoints.Create',
        example:
          'UrlEndpointCreateParams parameters = new()\n{\n    Description = "My custom URL endpoint"\n};\n\nvar urlEndpointResponse = await client.Accounts.UrlEndpoints.Create(parameters);\n\nConsole.WriteLine(urlEndpointResponse);',
      },
      go: {
        method: 'client.Accounts.URLEndpoints.New',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/imagekit-developer/imagekit-go"\n\t"github.com/imagekit-developer/imagekit-go/option"\n)\n\nfunc main() {\n\tclient := imagekit.NewClient(\n\t\toption.WithPrivateKey("My Private Key"),\n\t\toption.WithPassword("My Password"),\n\t)\n\turlEndpointResponse, err := client.Accounts.URLEndpoints.New(context.TODO(), imagekit.AccountURLEndpointNewParams{\n\t\tURLEndpointRequest: imagekit.URLEndpointRequestParam{\n\t\t\tDescription: "My custom URL endpoint",\n\t\t},\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", urlEndpointResponse.ID)\n}\n',
      },
      http: {
        example:
          'curl https://api.imagekit.io/v1/accounts/url-endpoints \\\n    -H \'Content-Type: application/json\' \\\n    -u "$IMAGEKIT_PRIVATE_KEY:OPTIONAL_IMAGEKIT_IGNORES_THIS" \\\n    -d \'{\n          "description": "My custom URL endpoint",\n          "origins": [\n            "origin-id-1"\n          ],\n          "urlPrefix": "product-images"\n        }\'',
      },
      java: {
        method: 'accounts().urlEndpoints().create',
        example:
          'package com.imagekit.api.example;\n\nimport com.imagekit.api.client.ImageKitClient;\nimport com.imagekit.api.client.okhttp.ImageKitOkHttpClient;\nimport com.imagekit.api.models.accounts.urlendpoints.UrlEndpointCreateParams;\nimport com.imagekit.api.models.accounts.urlendpoints.UrlEndpointRequest;\nimport com.imagekit.api.models.accounts.urlendpoints.UrlEndpointResponse;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        ImageKitClient client = ImageKitOkHttpClient.fromEnv();\n\n        UrlEndpointRequest params = UrlEndpointRequest.builder()\n            .description("My custom URL endpoint")\n            .build();\n        UrlEndpointResponse urlEndpointResponse = client.accounts().urlEndpoints().create(params);\n    }\n}',
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
    },
  },
  {
    name: 'get',
    endpoint: '/v1/accounts/url-endpoints/{id}',
    httpMethod: 'get',
    summary: 'Get URL‑endpoint',
    description:
      '**Note:** This API is currently in beta.  \nRetrieves the URL‑endpoint identified by `id`.\n',
    stainlessPath: '(resource) accounts.urlEndpoints > (method) get',
    qualified: 'client.accounts.urlEndpoints.get',
    params: ['id: string;'],
    response:
      "{ id: string; description: string; origins: string[]; urlPrefix: string; urlRewriter?: { preserveAssetDeliveryTypes: boolean; type: 'CLOUDINARY'; } | { type: 'IMGIX'; } | { type: 'AKAMAI'; }; }",
    markdown:
      "## get\n\n`client.accounts.urlEndpoints.get(id: string): { id: string; description: string; origins: string[]; urlPrefix: string; urlRewriter?: object | object | object; }`\n\n**get** `/v1/accounts/url-endpoints/{id}`\n\n**Note:** This API is currently in beta.  \nRetrieves the URL‑endpoint identified by `id`.\n\n\n### Parameters\n\n- `id: string`\n  Unique identifier for the URL-endpoint. This is generated by ImageKit when you create a new URL-endpoint. For the default URL-endpoint, this is always `default`.\n\n### Returns\n\n- `{ id: string; description: string; origins: string[]; urlPrefix: string; urlRewriter?: { preserveAssetDeliveryTypes: boolean; type: 'CLOUDINARY'; } | { type: 'IMGIX'; } | { type: 'AKAMAI'; }; }`\n  URL‑endpoint object as returned by the API.\n\n  - `id: string`\n  - `description: string`\n  - `origins: string[]`\n  - `urlPrefix: string`\n  - `urlRewriter?: { preserveAssetDeliveryTypes: boolean; type: 'CLOUDINARY'; } | { type: 'IMGIX'; } | { type: 'AKAMAI'; }`\n\n### Example\n\n```typescript\nimport ImageKit from '@imagekit/nodejs';\n\nconst client = new ImageKit();\n\nconst urlEndpointResponse = await client.accounts.urlEndpoints.get('id');\n\nconsole.log(urlEndpointResponse);\n```",
    perLanguage: {
      cli: {
        method: 'urlEndpoints get',
        example:
          "imagekit accounts:url-endpoints get \\\n  --private-key 'My Private Key' \\\n  --password 'My Password' \\\n  --id id",
      },
      csharp: {
        method: 'Accounts.UrlEndpoints.Get',
        example:
          'UrlEndpointGetParams parameters = new() { ID = "id" };\n\nvar urlEndpointResponse = await client.Accounts.UrlEndpoints.Get(parameters);\n\nConsole.WriteLine(urlEndpointResponse);',
      },
      go: {
        method: 'client.Accounts.URLEndpoints.Get',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/imagekit-developer/imagekit-go"\n\t"github.com/imagekit-developer/imagekit-go/option"\n)\n\nfunc main() {\n\tclient := imagekit.NewClient(\n\t\toption.WithPrivateKey("My Private Key"),\n\t\toption.WithPassword("My Password"),\n\t)\n\turlEndpointResponse, err := client.Accounts.URLEndpoints.Get(context.TODO(), "id")\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", urlEndpointResponse.ID)\n}\n',
      },
      http: {
        example:
          'curl https://api.imagekit.io/v1/accounts/url-endpoints/$ID \\\n    -u "$IMAGEKIT_PRIVATE_KEY:OPTIONAL_IMAGEKIT_IGNORES_THIS"',
      },
      java: {
        method: 'accounts().urlEndpoints().get',
        example:
          'package com.imagekit.api.example;\n\nimport com.imagekit.api.client.ImageKitClient;\nimport com.imagekit.api.client.okhttp.ImageKitOkHttpClient;\nimport com.imagekit.api.models.accounts.urlendpoints.UrlEndpointGetParams;\nimport com.imagekit.api.models.accounts.urlendpoints.UrlEndpointResponse;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        ImageKitClient client = ImageKitOkHttpClient.fromEnv();\n\n        UrlEndpointResponse urlEndpointResponse = client.accounts().urlEndpoints().get("id");\n    }\n}',
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
    },
  },
  {
    name: 'update',
    endpoint: '/v1/accounts/url-endpoints/{id}',
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
      "{ id: string; description: string; origins: string[]; urlPrefix: string; urlRewriter?: { preserveAssetDeliveryTypes: boolean; type: 'CLOUDINARY'; } | { type: 'IMGIX'; } | { type: 'AKAMAI'; }; }",
    markdown:
      "## update\n\n`client.accounts.urlEndpoints.update(id: string, description: string, origins?: string[], urlPrefix?: string, urlRewriter?: { type: 'CLOUDINARY'; preserveAssetDeliveryTypes?: boolean; } | { type: 'IMGIX'; } | { type: 'AKAMAI'; }): { id: string; description: string; origins: string[]; urlPrefix: string; urlRewriter?: object | object | object; }`\n\n**put** `/v1/accounts/url-endpoints/{id}`\n\n**Note:** This API is currently in beta.  \nUpdates the URL‑endpoint identified by `id` and returns the updated object.\n\n\n### Parameters\n\n- `id: string`\n  Unique identifier for the URL-endpoint. This is generated by ImageKit when you create a new URL-endpoint. For the default URL-endpoint, this is always `default`.\n\n- `description: string`\n  Description of the URL endpoint.\n\n- `origins?: string[]`\n  Ordered list of origin IDs to try when the file isn’t in the Media Library; ImageKit checks them in the sequence provided. Origin must be created before it can be used in a URL endpoint.\n\n- `urlPrefix?: string`\n  Path segment appended to your base URL to form the endpoint (letters, digits, and hyphens only — or empty for the default endpoint).\n\n- `urlRewriter?: { type: 'CLOUDINARY'; preserveAssetDeliveryTypes?: boolean; } | { type: 'IMGIX'; } | { type: 'AKAMAI'; }`\n  Configuration for third-party URL rewriting.\n\n### Returns\n\n- `{ id: string; description: string; origins: string[]; urlPrefix: string; urlRewriter?: { preserveAssetDeliveryTypes: boolean; type: 'CLOUDINARY'; } | { type: 'IMGIX'; } | { type: 'AKAMAI'; }; }`\n  URL‑endpoint object as returned by the API.\n\n  - `id: string`\n  - `description: string`\n  - `origins: string[]`\n  - `urlPrefix: string`\n  - `urlRewriter?: { preserveAssetDeliveryTypes: boolean; type: 'CLOUDINARY'; } | { type: 'IMGIX'; } | { type: 'AKAMAI'; }`\n\n### Example\n\n```typescript\nimport ImageKit from '@imagekit/nodejs';\n\nconst client = new ImageKit();\n\nconst urlEndpointResponse = await client.accounts.urlEndpoints.update('id', { description: 'My custom URL endpoint' });\n\nconsole.log(urlEndpointResponse);\n```",
    perLanguage: {
      cli: {
        method: 'urlEndpoints update',
        example:
          "imagekit accounts:url-endpoints update \\\n  --private-key 'My Private Key' \\\n  --password 'My Password' \\\n  --id id \\\n  --description 'My custom URL endpoint'",
      },
      csharp: {
        method: 'Accounts.UrlEndpoints.Update',
        example:
          'UrlEndpointUpdateParams parameters = new()\n{\n    ID = "id",\n    Description = "My custom URL endpoint",\n};\n\nvar urlEndpointResponse = await client.Accounts.UrlEndpoints.Update(parameters);\n\nConsole.WriteLine(urlEndpointResponse);',
      },
      go: {
        method: 'client.Accounts.URLEndpoints.Update',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/imagekit-developer/imagekit-go"\n\t"github.com/imagekit-developer/imagekit-go/option"\n)\n\nfunc main() {\n\tclient := imagekit.NewClient(\n\t\toption.WithPrivateKey("My Private Key"),\n\t\toption.WithPassword("My Password"),\n\t)\n\turlEndpointResponse, err := client.Accounts.URLEndpoints.Update(\n\t\tcontext.TODO(),\n\t\t"id",\n\t\timagekit.AccountURLEndpointUpdateParams{\n\t\t\tURLEndpointRequest: imagekit.URLEndpointRequestParam{\n\t\t\t\tDescription: "My custom URL endpoint",\n\t\t\t},\n\t\t},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", urlEndpointResponse.ID)\n}\n',
      },
      http: {
        example:
          'curl https://api.imagekit.io/v1/accounts/url-endpoints/$ID \\\n    -X PUT \\\n    -H \'Content-Type: application/json\' \\\n    -u "$IMAGEKIT_PRIVATE_KEY:OPTIONAL_IMAGEKIT_IGNORES_THIS" \\\n    -d \'{\n          "description": "My custom URL endpoint",\n          "origins": [\n            "origin-id-1"\n          ],\n          "urlPrefix": "product-images"\n        }\'',
      },
      java: {
        method: 'accounts().urlEndpoints().update',
        example:
          'package com.imagekit.api.example;\n\nimport com.imagekit.api.client.ImageKitClient;\nimport com.imagekit.api.client.okhttp.ImageKitOkHttpClient;\nimport com.imagekit.api.models.accounts.urlendpoints.UrlEndpointRequest;\nimport com.imagekit.api.models.accounts.urlendpoints.UrlEndpointResponse;\nimport com.imagekit.api.models.accounts.urlendpoints.UrlEndpointUpdateParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        ImageKitClient client = ImageKitOkHttpClient.fromEnv();\n\n        UrlEndpointUpdateParams params = UrlEndpointUpdateParams.builder()\n            .id("id")\n            .urlEndpointRequest(UrlEndpointRequest.builder()\n                .description("My custom URL endpoint")\n                .build())\n            .build();\n        UrlEndpointResponse urlEndpointResponse = client.accounts().urlEndpoints().update(params);\n    }\n}',
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
    },
  },
  {
    name: 'delete',
    endpoint: '/v1/accounts/url-endpoints/{id}',
    httpMethod: 'delete',
    summary: 'Delete URL‑endpoint',
    description:
      '**Note:** This API is currently in beta.  \nDeletes the URL‑endpoint identified by `id`. You cannot delete the default URL‑endpoint created by ImageKit during account creation.\n',
    stainlessPath: '(resource) accounts.urlEndpoints > (method) delete',
    qualified: 'client.accounts.urlEndpoints.delete',
    params: ['id: string;'],
    markdown:
      "## delete\n\n`client.accounts.urlEndpoints.delete(id: string): void`\n\n**delete** `/v1/accounts/url-endpoints/{id}`\n\n**Note:** This API is currently in beta.  \nDeletes the URL‑endpoint identified by `id`. You cannot delete the default URL‑endpoint created by ImageKit during account creation.\n\n\n### Parameters\n\n- `id: string`\n  Unique identifier for the URL-endpoint. This is generated by ImageKit when you create a new URL-endpoint. For the default URL-endpoint, this is always `default`.\n\n### Example\n\n```typescript\nimport ImageKit from '@imagekit/nodejs';\n\nconst client = new ImageKit();\n\nawait client.accounts.urlEndpoints.delete('id')\n```",
    perLanguage: {
      cli: {
        method: 'urlEndpoints delete',
        example:
          "imagekit accounts:url-endpoints delete \\\n  --private-key 'My Private Key' \\\n  --password 'My Password' \\\n  --id id",
      },
      csharp: {
        method: 'Accounts.UrlEndpoints.Delete',
        example:
          'UrlEndpointDeleteParams parameters = new() { ID = "id" };\n\nawait client.Accounts.UrlEndpoints.Delete(parameters);',
      },
      go: {
        method: 'client.Accounts.URLEndpoints.Delete',
        example:
          'package main\n\nimport (\n\t"context"\n\n\t"github.com/imagekit-developer/imagekit-go"\n\t"github.com/imagekit-developer/imagekit-go/option"\n)\n\nfunc main() {\n\tclient := imagekit.NewClient(\n\t\toption.WithPrivateKey("My Private Key"),\n\t\toption.WithPassword("My Password"),\n\t)\n\terr := client.Accounts.URLEndpoints.Delete(context.TODO(), "id")\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n}\n',
      },
      http: {
        example:
          'curl https://api.imagekit.io/v1/accounts/url-endpoints/$ID \\\n    -X DELETE \\\n    -u "$IMAGEKIT_PRIVATE_KEY:OPTIONAL_IMAGEKIT_IGNORES_THIS"',
      },
      java: {
        method: 'accounts().urlEndpoints().delete',
        example:
          'package com.imagekit.api.example;\n\nimport com.imagekit.api.client.ImageKitClient;\nimport com.imagekit.api.client.okhttp.ImageKitOkHttpClient;\nimport com.imagekit.api.models.accounts.urlendpoints.UrlEndpointDeleteParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        ImageKitClient client = ImageKitOkHttpClient.fromEnv();\n\n        client.accounts().urlEndpoints().delete("id");\n    }\n}',
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
    },
  },
  {
    name: 'upload',
    endpoint: '/api/v2/files/upload',
    httpMethod: 'post',
    summary: 'Upload file V2',
    description:
      'The V2 API enhances security by verifying the entire payload using JWT. This API is in beta.\n\nImageKit.io allows you to upload files directly from both the server and client sides. For server-side uploads, private API key authentication is used. For client-side uploads, generate a one-time `token` from your secure backend using private API. [Learn more](/docs/api-reference/upload-file/upload-file-v2#how-to-implement-secure-client-side-file-upload) about how to implement secure client-side file upload.\n\n**File size limit** \\\nOn the free plan, the maximum upload file sizes are 25MB for images, audio, and raw files, and 100MB for videos. On the Lite paid plan, these limits increase to 40MB for images, audio, and raw files and 300MB for videos, whereas on the Pro paid plan, these limits increase to 50MB for images, audio, and raw files and 2GB for videos. These limits can be further increased with enterprise plans.\n\n**Version limit** \\\nA file can have a maximum of 100 versions.\n\n**Demo applications**\n\n- A full-fledged [upload widget using Uppy](https://github.com/imagekit-samples/uppy-uploader), supporting file selections from local storage, URL, Dropbox, Google Drive, Instagram, and more.\n- [Quick start guides](/docs/quick-start-guides) for various frameworks and technologies.\n',
    stainlessPath: '(resource) beta.v2.files > (method) upload',
    qualified: 'client.beta.v2.files.upload',
    params: [
      'file: string;',
      'fileName: string;',
      'token?: string;',
      'checks?: string;',
      'customCoordinates?: string;',
      'customMetadata?: object;',
      'description?: string;',
      "extensions?: { name: 'remove-bg'; options?: { add_shadow?: boolean; bg_color?: string; bg_image_url?: string; semitransparency?: boolean; }; } | { maxTags: number; minConfidence: number; name: 'google-auto-tagging' | 'aws-auto-tagging'; } | { name: 'ai-auto-description'; } | { name: 'ai-tasks'; tasks: { instruction: string; type: 'select_tags'; max_selections?: number; min_selections?: number; vocabulary?: string[]; } | { field: string; instruction: string; type: 'select_metadata'; max_selections?: number; min_selections?: number; vocabulary?: string | number | boolean[]; } | { instruction: string; type: 'yes_no'; on_no?: { add_tags?: string[]; remove_tags?: string[]; set_metadata?: object[]; unset_metadata?: object[]; }; on_unknown?: { add_tags?: string[]; remove_tags?: string[]; set_metadata?: object[]; unset_metadata?: object[]; }; on_yes?: { add_tags?: string[]; remove_tags?: string[]; set_metadata?: object[]; unset_metadata?: object[]; }; }[]; } | { id: string; name: 'saved-extension'; }[];",
      'folder?: string;',
      'isPrivateFile?: boolean;',
      'isPublished?: boolean;',
      'overwriteAITags?: boolean;',
      'overwriteCustomMetadata?: boolean;',
      'overwriteFile?: boolean;',
      'overwriteTags?: boolean;',
      'responseFields?: string[];',
      'tags?: string[];',
      "transformation?: { post?: { type: 'transformation'; value: string; } | { type: 'gif-to-video'; value?: string; } | { type: 'thumbnail'; value?: string; } | { protocol: 'hls' | 'dash'; type: 'abs'; value: string; }[]; pre?: string; };",
      'useUniqueFileName?: boolean;',
      'webhookUrl?: string;',
    ],
    response:
      "{ AITags?: { confidence?: number; name?: string; source?: string; }[]; audioCodec?: string; bitRate?: number; customCoordinates?: string; customMetadata?: object; description?: string; duration?: number; embeddedMetadata?: object; extensionStatus?: { ai-auto-description?: 'success' | 'pending' | 'failed'; ai-tasks?: 'success' | 'pending' | 'failed'; aws-auto-tagging?: 'success' | 'pending' | 'failed'; google-auto-tagging?: 'success' | 'pending' | 'failed'; remove-bg?: 'success' | 'pending' | 'failed'; }; fileId?: string; filePath?: string; fileType?: string; height?: number; isPrivateFile?: boolean; isPublished?: boolean; metadata?: { audioCodec?: string; bitRate?: number; density?: number; duration?: number; exif?: object; format?: string; hasColorProfile?: boolean; hasTransparency?: boolean; height?: number; pHash?: string; quality?: number; size?: number; videoCodec?: string; width?: number; }; name?: string; selectedFieldsSchema?: object; size?: number; tags?: string[]; thumbnailUrl?: string; url?: string; versionInfo?: { id?: string; name?: string; }; videoCodec?: string; width?: number; }",
    markdown:
      "## upload\n\n`client.beta.v2.files.upload(file: string, fileName: string, token?: string, checks?: string, customCoordinates?: string, customMetadata?: object, description?: string, extensions?: { name: 'remove-bg'; options?: object; } | { maxTags: number; minConfidence: number; name: 'google-auto-tagging' | 'aws-auto-tagging'; } | { name: 'ai-auto-description'; } | { name: 'ai-tasks'; tasks: object | object | object[]; } | { id: string; name: 'saved-extension'; }[], folder?: string, isPrivateFile?: boolean, isPublished?: boolean, overwriteAITags?: boolean, overwriteCustomMetadata?: boolean, overwriteFile?: boolean, overwriteTags?: boolean, responseFields?: string[], tags?: string[], transformation?: { post?: { type: 'transformation'; value: string; } | { type: 'gif-to-video'; value?: string; } | { type: 'thumbnail'; value?: string; } | { protocol: 'hls' | 'dash'; type: 'abs'; value: string; }[]; pre?: string; }, useUniqueFileName?: boolean, webhookUrl?: string): { AITags?: object[]; audioCodec?: string; bitRate?: number; customCoordinates?: string; customMetadata?: object; description?: string; duration?: number; embeddedMetadata?: object; extensionStatus?: object; fileId?: string; filePath?: string; fileType?: string; height?: number; isPrivateFile?: boolean; isPublished?: boolean; metadata?: metadata; name?: string; selectedFieldsSchema?: object; size?: number; tags?: string[]; thumbnailUrl?: string; url?: string; versionInfo?: object; videoCodec?: string; width?: number; }`\n\n**post** `/api/v2/files/upload`\n\nThe V2 API enhances security by verifying the entire payload using JWT. This API is in beta.\n\nImageKit.io allows you to upload files directly from both the server and client sides. For server-side uploads, private API key authentication is used. For client-side uploads, generate a one-time `token` from your secure backend using private API. [Learn more](/docs/api-reference/upload-file/upload-file-v2#how-to-implement-secure-client-side-file-upload) about how to implement secure client-side file upload.\n\n**File size limit** \\\nOn the free plan, the maximum upload file sizes are 25MB for images, audio, and raw files, and 100MB for videos. On the Lite paid plan, these limits increase to 40MB for images, audio, and raw files and 300MB for videos, whereas on the Pro paid plan, these limits increase to 50MB for images, audio, and raw files and 2GB for videos. These limits can be further increased with enterprise plans.\n\n**Version limit** \\\nA file can have a maximum of 100 versions.\n\n**Demo applications**\n\n- A full-fledged [upload widget using Uppy](https://github.com/imagekit-samples/uppy-uploader), supporting file selections from local storage, URL, Dropbox, Google Drive, Instagram, and more.\n- [Quick start guides](/docs/quick-start-guides) for various frameworks and technologies.\n\n\n### Parameters\n\n- `file: string`\n  The API accepts any of the following:\n\n- **Binary data** – send the raw bytes as `multipart/form-data`.\n- **HTTP / HTTPS URL** – a publicly reachable URL that ImageKit’s servers can fetch.\n- **Base64 string** – the file encoded as a Base64 data URI or plain Base64.\n\nWhen supplying a URL, the server must receive the response headers within 8 seconds; otherwise the request fails with 400 Bad Request.\n\n\n- `fileName: string`\n  The name with which the file has to be uploaded.\n\n\n- `token?: string`\n  This is the client-generated JSON Web Token (JWT). The ImageKit.io server uses it to authenticate and check that the upload request parameters have not been tampered with after the token has been generated. Learn how to create the token on the page below. This field is only required for authentication when uploading a file from the client side.\n\n\n**Note**: Sending a JWT that has been used in the past will result in a validation error. Even if your previous request resulted in an error, you should always send a new token.\n\n\n**⚠️Warning**: JWT must be generated on the server-side because it is generated using your account's private API key. This field is required for authentication when uploading a file from the client-side.\n\n\n- `checks?: string`\n  Server-side checks to run on the asset.\nRead more about [Upload API checks](/docs/api-reference/upload-file/upload-file-v2#upload-api-checks).\n\n\n- `customCoordinates?: string`\n  Define an important area in the image. This is only relevant for image type files.\n\n  - To be passed as a string with the x and y coordinates of the top-left corner, and width and height of the area of interest in the format `x,y,width,height`. For example - `10,10,100,100`\n  - Can be used with fo-customtransformation.\n  - If this field is not specified and the file is overwritten, then customCoordinates will be removed.\n\n\n- `customMetadata?: object`\n  JSON key-value pairs to associate with the asset. Create the custom metadata fields before setting these values.\n\n\n- `description?: string`\n  Optional text to describe the contents of the file.\n\n\n- `extensions?: { name: 'remove-bg'; options?: { add_shadow?: boolean; bg_color?: string; bg_image_url?: string; semitransparency?: boolean; }; } | { maxTags: number; minConfidence: number; name: 'google-auto-tagging' | 'aws-auto-tagging'; } | { name: 'ai-auto-description'; } | { name: 'ai-tasks'; tasks: { instruction: string; type: 'select_tags'; max_selections?: number; min_selections?: number; vocabulary?: string[]; } | { field: string; instruction: string; type: 'select_metadata'; max_selections?: number; min_selections?: number; vocabulary?: string | number | boolean[]; } | { instruction: string; type: 'yes_no'; on_no?: { add_tags?: string[]; remove_tags?: string[]; set_metadata?: object[]; unset_metadata?: object[]; }; on_unknown?: { add_tags?: string[]; remove_tags?: string[]; set_metadata?: object[]; unset_metadata?: object[]; }; on_yes?: { add_tags?: string[]; remove_tags?: string[]; set_metadata?: object[]; unset_metadata?: object[]; }; }[]; } | { id: string; name: 'saved-extension'; }[]`\n  Array of extensions to be applied to the asset. Each extension can be configured with specific parameters based on the extension type.\n\n\n- `folder?: string`\n  The folder path in which the image has to be uploaded. If the folder(s) didn't exist before, a new folder(s) is created. Using multiple `/` creates a nested folder.\n\n\n- `isPrivateFile?: boolean`\n  Whether to mark the file as private or not.\n\nIf `true`, the file is marked as private and is accessible only using named transformation or signed URL.\n\n\n- `isPublished?: boolean`\n  Whether to upload file as published or not.\n\nIf `false`, the file is marked as unpublished, which restricts access to the file only via the media library. Files in draft or unpublished state can only be publicly accessed after being published.\n\nThe option to upload in draft state is only available in custom enterprise pricing plans.\n\n\n- `overwriteAITags?: boolean`\n  If set to `true` and a file already exists at the exact location, its AITags will be removed. Set `overwriteAITags` to `false` to preserve AITags.\n\n\n- `overwriteCustomMetadata?: boolean`\n  If the request does not have `customMetadata`, and a file already exists at the exact location, existing customMetadata will be removed.\n\n\n- `overwriteFile?: boolean`\n  If `false` and `useUniqueFileName` is also `false`, and a file already exists at the exact location, upload API will return an error immediately.\n\n\n- `overwriteTags?: boolean`\n  If the request does not have `tags`, and a file already exists at the exact location, existing tags will be removed.\n\n\n- `responseFields?: string[]`\n  Array of response field keys to include in the API response body.\n\n\n- `tags?: string[]`\n  Set the tags while uploading the file.\nProvide an array of tag strings (e.g. `[\"tag1\", \"tag2\", \"tag3\"]`). The combined length of all tag characters must not exceed 500, and the `%` character is not allowed.\nIf this field is not specified and the file is overwritten, the existing tags will be removed.\n\n\n- `transformation?: { post?: { type: 'transformation'; value: string; } | { type: 'gif-to-video'; value?: string; } | { type: 'thumbnail'; value?: string; } | { protocol: 'hls' | 'dash'; type: 'abs'; value: string; }[]; pre?: string; }`\n  Configure pre-processing (`pre`) and post-processing (`post`) transformations.\n\n- `pre` — applied before the file is uploaded to the Media Library.  \n  Useful for reducing file size or applying basic optimizations upfront (e.g., resize, compress).\n\n- `post` — applied immediately after upload.  \n  Ideal for generating transformed versions (like video encodes or thumbnails) in advance, so they're ready for delivery without delay.\n\nYou can mix and match any combination of post-processing types.\n\n  - `post?: { type: 'transformation'; value: string; } | { type: 'gif-to-video'; value?: string; } | { type: 'thumbnail'; value?: string; } | { protocol: 'hls' | 'dash'; type: 'abs'; value: string; }[]`\n    List of transformations to apply *after* the file is uploaded.  \nEach item must match one of the following types:\n`transformation`, `gif-to-video`, `thumbnail`, `abs`.\n\n  - `pre?: string`\n    Transformation string to apply before uploading the file to the Media Library. Useful for optimizing files at ingestion.\n\n\n- `useUniqueFileName?: boolean`\n  Whether to use a unique filename for this file or not.\n\nIf `true`, ImageKit.io will add a unique suffix to the filename parameter to get a unique filename.\n\nIf `false`, then the image is uploaded with the provided filename parameter, and any existing file with the same name is replaced.\n\n\n- `webhookUrl?: string`\n  The final status of extensions after they have completed execution will be delivered to this endpoint as a POST request. [Learn more](/docs/api-reference/digital-asset-management-dam/managing-assets/update-file-details#webhook-payload-structure) about the webhook payload structure.\n\n\n### Returns\n\n- `{ AITags?: { confidence?: number; name?: string; source?: string; }[]; audioCodec?: string; bitRate?: number; customCoordinates?: string; customMetadata?: object; description?: string; duration?: number; embeddedMetadata?: object; extensionStatus?: { ai-auto-description?: 'success' | 'pending' | 'failed'; ai-tasks?: 'success' | 'pending' | 'failed'; aws-auto-tagging?: 'success' | 'pending' | 'failed'; google-auto-tagging?: 'success' | 'pending' | 'failed'; remove-bg?: 'success' | 'pending' | 'failed'; }; fileId?: string; filePath?: string; fileType?: string; height?: number; isPrivateFile?: boolean; isPublished?: boolean; metadata?: { audioCodec?: string; bitRate?: number; density?: number; duration?: number; exif?: object; format?: string; hasColorProfile?: boolean; hasTransparency?: boolean; height?: number; pHash?: string; quality?: number; size?: number; videoCodec?: string; width?: number; }; name?: string; selectedFieldsSchema?: object; size?: number; tags?: string[]; thumbnailUrl?: string; url?: string; versionInfo?: { id?: string; name?: string; }; videoCodec?: string; width?: number; }`\n  Object containing details of a successful upload.\n\n  - `AITags?: { confidence?: number; name?: string; source?: string; }[]`\n  - `audioCodec?: string`\n  - `bitRate?: number`\n  - `customCoordinates?: string`\n  - `customMetadata?: object`\n  - `description?: string`\n  - `duration?: number`\n  - `embeddedMetadata?: object`\n  - `extensionStatus?: { ai-auto-description?: 'success' | 'pending' | 'failed'; ai-tasks?: 'success' | 'pending' | 'failed'; aws-auto-tagging?: 'success' | 'pending' | 'failed'; google-auto-tagging?: 'success' | 'pending' | 'failed'; remove-bg?: 'success' | 'pending' | 'failed'; }`\n  - `fileId?: string`\n  - `filePath?: string`\n  - `fileType?: string`\n  - `height?: number`\n  - `isPrivateFile?: boolean`\n  - `isPublished?: boolean`\n  - `metadata?: { audioCodec?: string; bitRate?: number; density?: number; duration?: number; exif?: { exif?: { ApertureValue?: number; ColorSpace?: number; CreateDate?: string; CustomRendered?: number; DateTimeOriginal?: string; ExifImageHeight?: number; ExifImageWidth?: number; ExifVersion?: string; ExposureCompensation?: number; ExposureMode?: number; ExposureProgram?: number; ExposureTime?: number; Flash?: number; FlashpixVersion?: string; FNumber?: number; FocalLength?: number; FocalPlaneResolutionUnit?: number; FocalPlaneXResolution?: number; FocalPlaneYResolution?: number; InteropOffset?: number; ISO?: number; MeteringMode?: number; SceneCaptureType?: number; ShutterSpeedValue?: number; SubSecTime?: string; WhiteBalance?: number; }; gps?: { GPSVersionID?: number[]; }; image?: { ExifOffset?: number; GPSInfo?: number; Make?: string; Model?: string; ModifyDate?: string; Orientation?: number; ResolutionUnit?: number; Software?: string; XResolution?: number; YCbCrPositioning?: number; YResolution?: number; }; interoperability?: { InteropIndex?: string; InteropVersion?: string; }; makernote?: object; thumbnail?: { Compression?: number; ResolutionUnit?: number; ThumbnailLength?: number; ThumbnailOffset?: number; XResolution?: number; YResolution?: number; }; }; format?: string; hasColorProfile?: boolean; hasTransparency?: boolean; height?: number; pHash?: string; quality?: number; size?: number; videoCodec?: string; width?: number; }`\n  - `name?: string`\n  - `selectedFieldsSchema?: object`\n  - `size?: number`\n  - `tags?: string[]`\n  - `thumbnailUrl?: string`\n  - `url?: string`\n  - `versionInfo?: { id?: string; name?: string; }`\n  - `videoCodec?: string`\n  - `width?: number`\n\n### Example\n\n```typescript\nimport ImageKit from '@imagekit/nodejs';\n\nconst client = new ImageKit();\n\nconst response = await client.beta.v2.files.upload({ file: fs.createReadStream('path/to/file'), fileName: 'fileName' });\n\nconsole.log(response);\n```",
    perLanguage: {
      cli: {
        method: 'files upload',
        example:
          "imagekit beta:v2:files upload \\\n  --private-key 'My Private Key' \\\n  --password 'My Password' \\\n  --file 'Example data' \\\n  --file-name fileName",
      },
      csharp: {
        method: 'Beta.V2.Files.Upload',
        example:
          'FileUploadParams parameters = new()\n{\n    File = Encoding.UTF8.GetBytes("Example data"),\n    FileName = "fileName",\n};\n\nvar response = await client.Beta.V2.Files.Upload(parameters);\n\nConsole.WriteLine(response);',
      },
      go: {
        method: 'client.Beta.V2.Files.Upload',
        example:
          'package main\n\nimport (\n\t"bytes"\n\t"context"\n\t"fmt"\n\t"io"\n\n\t"github.com/imagekit-developer/imagekit-go"\n\t"github.com/imagekit-developer/imagekit-go/option"\n)\n\nfunc main() {\n\tclient := imagekit.NewClient(\n\t\toption.WithPrivateKey("My Private Key"),\n\t\toption.WithPassword("My Password"),\n\t)\n\tresponse, err := client.Beta.V2.Files.Upload(context.TODO(), imagekit.BetaV2FileUploadParams{\n\t\tFile:     io.Reader(bytes.NewBuffer([]byte("Example data"))),\n\t\tFileName: "fileName",\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.VideoCodec)\n}\n',
      },
      http: {
        example:
          'curl https://upload.imagekit.io/api/v2/files/upload \\\n    -H \'Content-Type: multipart/form-data\' \\\n    -u "$IMAGEKIT_PRIVATE_KEY:OPTIONAL_IMAGEKIT_IGNORES_THIS" \\\n    -F \'file=@/path/to/file\' \\\n    -F fileName=fileName \\\n    -F checks=\'"request.folder" : "marketing/"\n    \' \\\n    -F customMetadata=\'{"brand":"bar","color":"bar"}\' \\\n    -F description=\'Running shoes\' \\\n    -F extensions=\'[{"name":"remove-bg","options":{"add_shadow":true}},{"maxTags":5,"minConfidence":95,"name":"google-auto-tagging"},{"name":"ai-auto-description"},{"name":"ai-tasks","tasks":[{"instruction":"What types of clothing items are visible in this image?","type":"select_tags","vocabulary":["shirt","tshirt","dress","trousers","jacket"]},{"instruction":"Is this a luxury or high-end fashion item?","type":"yes_no","on_yes":{"add_tags":["luxury","premium"]}}]},{"id":"ext_abc123","name":"saved-extension"}]\' \\\n    -F responseFields=\'["tags","customCoordinates","isPrivateFile"]\' \\\n    -F tags=\'["t-shirt","round-neck","men"]\' \\\n    -F transformation=\'{"post":[{"type":"thumbnail","value":"w-150,h-150"},{"protocol":"dash","type":"abs","value":"sr-240_360_480_720_1080"}]}\'',
      },
      java: {
        method: 'beta().v2().files().upload',
        example:
          'package com.imagekit.api.example;\n\nimport com.imagekit.api.client.ImageKitClient;\nimport com.imagekit.api.client.okhttp.ImageKitOkHttpClient;\nimport com.imagekit.api.models.beta.v2.files.FileUploadParams;\nimport com.imagekit.api.models.beta.v2.files.FileUploadResponse;\nimport java.io.ByteArrayInputStream;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        ImageKitClient client = ImageKitOkHttpClient.fromEnv();\n\n        FileUploadParams params = FileUploadParams.builder()\n            .file(new ByteArrayInputStream("Example data".getBytes()))\n            .fileName("fileName")\n            .build();\n        FileUploadResponse response = client.beta().v2().files().upload(params);\n    }\n}',
      },
      php: {
        method: 'beta->v2->files->upload',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(privateKey: 'My Private Key', password: 'My Password');\n\n$response = $client->beta->v2->files->upload(\n  file: FileParam::fromString('Example data', filename: uniqid('file-upload-', true)),\n  fileName: 'fileName',\n  token: 'token',\n  checks: \"\\\"request.folder\\\" : \\\"marketing/\\\"\\n\",\n  customCoordinates: 'customCoordinates',\n  customMetadata: ['brand' => 'bar', 'color' => 'bar'],\n  description: 'Running shoes',\n  extensions: [\n    [\n      'name' => 'remove-bg',\n      'options' => [\n        'addShadow' => true,\n        'bgColor' => 'bg_color',\n        'bgImageURL' => 'bg_image_url',\n        'semitransparency' => true,\n      ],\n    ],\n    ['maxTags' => 5, 'minConfidence' => 95, 'name' => 'google-auto-tagging'],\n    ['name' => 'ai-auto-description'],\n    [\n      'name' => 'ai-tasks',\n      'tasks' => [\n        [\n          'instruction' => 'What types of clothing items are visible in this image?',\n          'type' => 'select_tags',\n          'maxSelections' => 1,\n          'minSelections' => 0,\n          'vocabulary' => ['shirt', 'tshirt', 'dress', 'trousers', 'jacket'],\n        ],\n        [\n          'instruction' => 'Is this a luxury or high-end fashion item?',\n          'type' => 'yes_no',\n          'onNo' => [\n            'addTags' => ['luxury', 'premium'],\n            'removeTags' => ['budget', 'affordable'],\n            'setMetadata' => [['field' => 'price_range', 'value' => 'premium']],\n            'unsetMetadata' => [['field' => 'price_range']],\n          ],\n          'onUnknown' => [\n            'addTags' => ['luxury', 'premium'],\n            'removeTags' => ['budget', 'affordable'],\n            'setMetadata' => [['field' => 'price_range', 'value' => 'premium']],\n            'unsetMetadata' => [['field' => 'price_range']],\n          ],\n          'onYes' => [\n            'addTags' => ['luxury', 'premium'],\n            'removeTags' => ['budget', 'affordable'],\n            'setMetadata' => [['field' => 'price_range', 'value' => 'premium']],\n            'unsetMetadata' => [['field' => 'price_range']],\n          ],\n        ],\n      ],\n    ],\n    ['id' => 'ext_abc123', 'name' => 'saved-extension'],\n  ],\n  folder: 'folder',\n  isPrivateFile: true,\n  isPublished: true,\n  overwriteAITags: true,\n  overwriteCustomMetadata: true,\n  overwriteFile: true,\n  overwriteTags: true,\n  responseFields: ['tags', 'customCoordinates', 'isPrivateFile'],\n  tags: ['t-shirt', 'round-neck', 'men'],\n  transformation: [\n    'post' => [\n      ['type' => 'thumbnail', 'value' => 'w-150,h-150'],\n      [\n        'protocol' => 'dash',\n        'type' => 'abs',\n        'value' => 'sr-240_360_480_720_1080',\n      ],\n    ],\n    'pre' => 'w-300,h-300,q-80',\n  ],\n  useUniqueFileName: true,\n  webhookURL: 'https://example.com',\n);\n\nvar_dump($response);",
      },
      python: {
        method: 'beta.v2.files.upload',
        example:
          'import os\nfrom imagekitio import ImageKit\n\nclient = ImageKit(\n    private_key=os.environ.get("IMAGEKIT_PRIVATE_KEY"),  # This is the default and can be omitted\n    password=os.environ.get("OPTIONAL_IMAGEKIT_IGNORES_THIS"),  # This is the default and can be omitted\n)\nresponse = client.beta.v2.files.upload(\n    file=b"Example data",\n    file_name="fileName",\n)\nprint(response.video_codec)',
      },
      ruby: {
        method: 'beta.v2.files.upload',
        example:
          'require "imagekitio"\n\nimage_kit = Imagekitio::Client.new(private_key: "My Private Key", password: "My Password")\n\nresponse = image_kit.beta.v2.files.upload(file: StringIO.new("Example data"), file_name: "fileName")\n\nputs(response)',
      },
      typescript: {
        method: 'client.beta.v2.files.upload',
        example:
          "import ImageKit from '@imagekit/nodejs';\n\nconst client = new ImageKit({\n  privateKey: process.env['IMAGEKIT_PRIVATE_KEY'], // This is the default and can be omitted\n  password: process.env['OPTIONAL_IMAGEKIT_IGNORES_THIS'], // This is the default and can be omitted\n});\n\nconst response = await client.beta.v2.files.upload({\n  file: fs.createReadStream('path/to/file'),\n  fileName: 'fileName',\n});\n\nconsole.log(response.videoCodec);",
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
      cli: {
        example:
          "imagekit webhooks unwrap \\\n  --private-key 'My Private Key' \\\n  --password 'My Password'",
      },
      csharp: {
        example: 'WebhookUnwrapParams parameters = new();\n\nawait client.Webhooks.Unwrap(parameters);',
      },
      go: {
        method: 'client.Webhooks.Unwrap',
        example:
          'package main\n\nimport (\n\t"context"\n\n\t"github.com/imagekit-developer/imagekit-go"\n\t"github.com/imagekit-developer/imagekit-go/option"\n)\n\nfunc main() {\n\tclient := imagekit.NewClient(\n\t\toption.WithPrivateKey("My Private Key"),\n\t\toption.WithPassword("My Password"),\n\t)\n\terr := client.Webhooks.Unwrap(context.TODO())\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n}\n',
      },
      java: {
        example:
          'package com.imagekit.api.example;\n\nimport com.imagekit.api.client.ImageKitClient;\nimport com.imagekit.api.client.okhttp.ImageKitOkHttpClient;\nimport com.imagekit.api.models.webhooks.WebhookUnwrapParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        ImageKitClient client = ImageKitOkHttpClient.fromEnv();\n\n        client.webhooks().unwrap();\n    }\n}',
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
      cli: {
        example:
          "imagekit webhooks unsafe-unwrap \\\n  --private-key 'My Private Key' \\\n  --password 'My Password'",
      },
      csharp: {
        example:
          'WebhookUnsafeUnwrapParams parameters = new();\n\nawait client.Webhooks.UnsafeUnwrap(parameters);',
      },
      go: {
        method: 'client.Webhooks.UnsafeUnwrap',
        example:
          'package main\n\nimport (\n\t"context"\n\n\t"github.com/imagekit-developer/imagekit-go"\n\t"github.com/imagekit-developer/imagekit-go/option"\n)\n\nfunc main() {\n\tclient := imagekit.NewClient(\n\t\toption.WithPrivateKey("My Private Key"),\n\t\toption.WithPassword("My Password"),\n\t)\n\terr := client.Webhooks.UnsafeUnwrap(context.TODO())\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n}\n',
      },
      java: {
        example:
          'package com.imagekit.api.example;\n\nimport com.imagekit.api.client.ImageKitClient;\nimport com.imagekit.api.client.okhttp.ImageKitOkHttpClient;\nimport com.imagekit.api.models.webhooks.WebhookUnsafeUnwrapParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        ImageKitClient client = ImageKitOkHttpClient.fromEnv();\n\n        client.webhooks().unsafeUnwrap();\n    }\n}',
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
    },
  },
];

const EMBEDDED_READMES: { language: string; content: string }[] = [
  {
    language: 'python',
    content:
      '# Image Kit Python API library\n\n<!-- prettier-ignore -->\n[![PyPI version](https://img.shields.io/pypi/v/imagekitio.svg?label=pypi%20(stable))](https://pypi.org/project/imagekitio/)\n\nThe Image Kit Python library provides convenient access to the Image Kit REST API from any Python 3.9+\napplication. The library includes type definitions for all request params and response fields,\nand offers both synchronous and asynchronous clients powered by [httpx](https://github.com/encode/httpx).\n\n\n\n\n\n## MCP Server\n\nUse the Image Kit MCP Server to enable AI assistants to interact with this API, allowing them to explore endpoints, make test requests, and use documentation to help integrate this SDK into your application.\n\n[![Add to Cursor](https://cursor.com/deeplink/mcp-install-dark.svg)](https://cursor.com/en-US/install-mcp?name=%40imagekit%2Fapi-mcp&config=eyJjb21tYW5kIjoibnB4IiwiYXJncyI6WyIteSIsIkBpbWFnZWtpdC9hcGktbWNwIl0sImVudiI6eyJJTUFHRUtJVF9QUklWQVRFX0tFWSI6Ik15IFByaXZhdGUgS2V5IiwiT1BUSU9OQUxfSU1BR0VLSVRfSUdOT1JFU19USElTIjoiTXkgUGFzc3dvcmQiLCJJTUFHRUtJVF9XRUJIT09LX1NFQ1JFVCI6Ik15IFdlYmhvb2sgU2VjcmV0In19)\n[![Install in VS Code](https://img.shields.io/badge/_-Add_to_VS_Code-blue?style=for-the-badge&logo=data:image/svg%2bxml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHZpZXdCb3g9IjAgMCA0MCA0MCI+PHBhdGggZmlsbD0iI0VFRSIgZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNMzAuMjM1IDM5Ljg4NGEyLjQ5MSAyLjQ5MSAwIDAgMS0xLjc4MS0uNzNMMTIuNyAyNC43OGwtMy40NiAyLjYyNC0zLjQwNiAyLjU4MmExLjY2NSAxLjY2NSAwIDAgMS0xLjA4Mi4zMzggMS42NjQgMS42NjQgMCAwIDEtMS4wNDYtLjQzMWwtMi4yLTJhMS42NjYgMS42NjYgMCAwIDEgMC0yLjQ2M0w3LjQ1OCAyMCA0LjY3IDE3LjQ1MyAxLjUwNyAxNC41N2ExLjY2NSAxLjY2NSAwIDAgMSAwLTIuNDYzbDIuMi0yYTEuNjY1IDEuNjY1IDAgMCAxIDIuMTMtLjA5N2w2Ljg2MyA1LjIwOUwyOC40NTIuODQ0YTIuNDg4IDIuNDg4IDAgMCAxIDEuODQxLS43MjljLjM1MS4wMDkuNjk5LjA5MSAxLjAxOS4yNDVsOC4yMzYgMy45NjFhMi41IDIuNSAwIDAgMSAxLjQxNSAyLjI1M3YuMDk5LS4wNDVWMzMuMzd2LS4wNDUuMDk1YTIuNTAxIDIuNTAxIDAgMCAxLTEuNDE2IDIuMjU3bC04LjIzNSAzLjk2MWEyLjQ5MiAyLjQ5MiAwIDAgMS0xLjA3Ny4yNDZabS43MTYtMjguOTQ3LTExLjk0OCA5LjA2MiAxMS45NTIgOS4wNjUtLjAwNC0xOC4xMjdaIi8+PC9zdmc+)](https://vscode.stainless.com/mcp/%7B%22name%22%3A%22%40imagekit%2Fapi-mcp%22%2C%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22%40imagekit%2Fapi-mcp%22%5D%2C%22env%22%3A%7B%22IMAGEKIT_PRIVATE_KEY%22%3A%22My%20Private%20Key%22%2C%22OPTIONAL_IMAGEKIT_IGNORES_THIS%22%3A%22My%20Password%22%2C%22IMAGEKIT_WEBHOOK_SECRET%22%3A%22My%20Webhook%20Secret%22%7D%7D)\n\n> Note: You may need to set environment variables in your MCP client.\n\n## Documentation\n\nThe REST API documentation can be found on [imagekit.io](https://imagekit.io/docs/api-reference). The full API of this library can be found in [api.md](api.md).\n\n## Installation\n\n```sh\n# install from PyPI\npip install imagekitio\n```\n\n## Usage\n\nThe full API of this library can be found in [api.md](api.md).\n\n```python\nimport os\nfrom imagekitio import ImageKit\n\nclient = ImageKit(\n    private_key=os.environ.get("IMAGEKIT_PRIVATE_KEY"),  # This is the default and can be omitted\n    password=os.environ.get("OPTIONAL_IMAGEKIT_IGNORES_THIS"),  # This is the default and can be omitted\n)\n\nresponse = client.files.upload(\n    file=b"https://www.example.com/public-url.jpg",\n    file_name="file-name.jpg",\n)\nprint(response.video_codec)\n```\n\nWhile you can provide a `private_key` keyword argument,\nwe recommend using [python-dotenv](https://pypi.org/project/python-dotenv/)\nto add `IMAGEKIT_PRIVATE_KEY="My Private Key"` to your `.env` file\nso that your Private Key is not stored in source control.\n\n## Async usage\n\nSimply import `AsyncImageKit` instead of `ImageKit` and use `await` with each API call:\n\n```python\nimport os\nimport asyncio\nfrom imagekitio import AsyncImageKit\n\nclient = AsyncImageKit(\n    private_key=os.environ.get("IMAGEKIT_PRIVATE_KEY"),  # This is the default and can be omitted\n    password=os.environ.get("OPTIONAL_IMAGEKIT_IGNORES_THIS"),  # This is the default and can be omitted\n)\n\nasync def main() -> None:\n  response = await client.files.upload(\n      file=b"https://www.example.com/public-url.jpg",\n      file_name="file-name.jpg",\n  )\n  print(response.video_codec)\n\nasyncio.run(main())\n```\n\nFunctionality between the synchronous and asynchronous clients is otherwise identical.\n\n### With aiohttp\n\nBy default, the async client uses `httpx` for HTTP requests. However, for improved concurrency performance you may also use `aiohttp` as the HTTP backend.\n\nYou can enable this by installing `aiohttp`:\n\n```sh\n# install from PyPI\npip install imagekitio[aiohttp]\n```\n\nThen you can enable it by instantiating the client with `http_client=DefaultAioHttpClient()`:\n\n```python\nimport os\nimport asyncio\nfrom imagekitio import DefaultAioHttpClient\nfrom imagekitio import AsyncImageKit\n\nasync def main() -> None:\n  async with AsyncImageKit(\n    private_key=os.environ.get("IMAGEKIT_PRIVATE_KEY"),  # This is the default and can be omitted\n    password=os.environ.get("OPTIONAL_IMAGEKIT_IGNORES_THIS"),  # This is the default and can be omitted\n    http_client=DefaultAioHttpClient(),\n) as client:\n    response = await client.files.upload(\n        file=b"https://www.example.com/public-url.jpg",\n        file_name="file-name.jpg",\n    )\n    print(response.video_codec)\n\nasyncio.run(main())\n```\n\n\n\n## Using types\n\nNested request parameters are [TypedDicts](https://docs.python.org/3/library/typing.html#typing.TypedDict). Responses are [Pydantic models](https://docs.pydantic.dev) which also provide helper methods for things like:\n\n- Serializing back into JSON, `model.to_json()`\n- Converting to a dictionary, `model.to_dict()`\n\nTyped requests and responses provide autocomplete and documentation within your editor. If you would like to see type errors in VS Code to help catch bugs earlier, set `python.analysis.typeCheckingMode` to `basic`.\n\n\n\n## Nested params\n\nNested parameters are dictionaries, typed using `TypedDict`, for example:\n\n```python\nfrom imagekitio import ImageKit\n\nclient = ImageKit()\n\nresponse = client.files.upload(\n    file=b"Example data",\n    file_name="fileName",\n    transformation={\n        "post": [{\n            "type": "thumbnail",\n            "value": "w-150,h-150",\n        }, {\n            "protocol": "dash",\n            "type": "abs",\n            "value": "sr-240_360_480_720_1080",\n        }]\n    },\n)\nprint(response.transformation)\n```\n\n## File uploads\n\nRequest parameters that correspond to file uploads can be passed as `bytes`, or a [`PathLike`](https://docs.python.org/3/library/os.html#os.PathLike) instance or a tuple of `(filename, contents, media type)`.\n\n```python\nfrom pathlib import Path\nfrom imagekitio import ImageKit\n\nclient = ImageKit()\n\nclient.files.upload(\n    file=Path("/path/to/file"),\n    file_name="fileName",\n)\n```\n\nThe async client uses the exact same interface. If you pass a [`PathLike`](https://docs.python.org/3/library/os.html#os.PathLike) instance, the file contents will be read asynchronously automatically.\n\n## Handling errors\n\nWhen the library is unable to connect to the API (for example, due to network connection problems or a timeout), a subclass of `imagekitio.APIConnectionError` is raised.\n\nWhen the API returns a non-success status code (that is, 4xx or 5xx\nresponse), a subclass of `imagekitio.APIStatusError` is raised, containing `status_code` and `response` properties.\n\nAll errors inherit from `imagekitio.APIError`.\n\n```python\nimport imagekitio\nfrom imagekitio import ImageKit\n\nclient = ImageKit()\n\ntry:\n    client.files.upload(\n        file=b"https://www.example.com/public-url.jpg",\n        file_name="file-name.jpg",\n    )\nexcept imagekitio.APIConnectionError as e:\n    print("The server could not be reached")\n    print(e.__cause__) # an underlying Exception, likely raised within httpx.\nexcept imagekitio.RateLimitError as e:\n    print("A 429 status code was received; we should back off a bit.")\nexcept imagekitio.APIStatusError as e:\n    print("Another non-200-range status code was received")\n    print(e.status_code)\n    print(e.response)\n```\n\nError codes are as follows:\n\n| Status Code | Error Type                 |\n| ----------- | -------------------------- |\n| 400         | `BadRequestError`          |\n| 401         | `AuthenticationError`      |\n| 403         | `PermissionDeniedError`    |\n| 404         | `NotFoundError`            |\n| 422         | `UnprocessableEntityError` |\n| 429         | `RateLimitError`           |\n| >=500       | `InternalServerError`      |\n| N/A         | `APIConnectionError`       |\n\n### Retries\n\nCertain errors are automatically retried 2 times by default, with a short exponential backoff.\nConnection errors (for example, due to a network connectivity problem), 408 Request Timeout, 409 Conflict,\n429 Rate Limit, and >=500 Internal errors are all retried by default.\n\nYou can use the `max_retries` option to configure or disable retry settings:\n\n```python\nfrom imagekitio import ImageKit\n\n# Configure the default for all requests:\nclient = ImageKit(\n    # default is 2\n    max_retries=0,\n)\n\n# Or, configure per-request:\nclient.with_options(max_retries = 5).files.upload(\n    file=b"https://www.example.com/public-url.jpg",\n    file_name="file-name.jpg",\n)\n```\n\n### Timeouts\n\nBy default requests time out after 1 minute. You can configure this with a `timeout` option,\nwhich accepts a float or an [`httpx.Timeout`](https://www.python-httpx.org/advanced/timeouts/#fine-tuning-the-configuration) object:\n\n```python\nfrom imagekitio import ImageKit\n\n# Configure the default for all requests:\nclient = ImageKit(\n    # 20 seconds (default is 1 minute)\n    timeout=20.0,\n)\n\n# More granular control:\nclient = ImageKit(\n    timeout=httpx.Timeout(60.0, read=5.0, write=10.0, connect=2.0),\n)\n\n# Override per-request:\nclient.with_options(timeout = 5.0).files.upload(\n    file=b"https://www.example.com/public-url.jpg",\n    file_name="file-name.jpg",\n)\n```\n\nOn timeout, an `APITimeoutError` is thrown.\n\nNote that requests that time out are [retried twice by default](#retries).\n\n\n\n## Advanced\n\n### Logging\n\nWe use the standard library [`logging`](https://docs.python.org/3/library/logging.html) module.\n\nYou can enable logging by setting the environment variable `IMAGE_KIT_LOG` to `info`.\n\n```shell\n$ export IMAGE_KIT_LOG=info\n```\n\nOr to `debug` for more verbose logging.\n\n### How to tell whether `None` means `null` or missing\n\nIn an API response, a field may be explicitly `null`, or missing entirely; in either case, its value is `None` in this library. You can differentiate the two cases with `.model_fields_set`:\n\n```py\nif response.my_field is None:\n  if \'my_field\' not in response.model_fields_set:\n    print(\'Got json like {}, without a "my_field" key present at all.\')\n  else:\n    print(\'Got json like {"my_field": null}.\')\n```\n\n### Accessing raw response data (e.g. headers)\n\nThe "raw" Response object can be accessed by prefixing `.with_raw_response.` to any HTTP method call, e.g.,\n\n```py\nfrom imagekitio import ImageKit\n\nclient = ImageKit()\nresponse = client.files.with_raw_response.upload(\n    file=b"https://www.example.com/public-url.jpg",\n    file_name="file-name.jpg",\n)\nprint(response.headers.get(\'X-My-Header\'))\n\nfile = response.parse()  # get the object that `files.upload()` would have returned\nprint(file.video_codec)\n```\n\nThese methods return an [`APIResponse`](https://github.com/imagekit-developer/imagekit-python/tree/master/src/imagekitio/_response.py) object.\n\nThe async client returns an [`AsyncAPIResponse`](https://github.com/imagekit-developer/imagekit-python/tree/master/src/imagekitio/_response.py) with the same structure, the only difference being `await`able methods for reading the response content.\n\n#### `.with_streaming_response`\n\nThe above interface eagerly reads the full response body when you make the request, which may not always be what you want.\n\nTo stream the response body, use `.with_streaming_response` instead, which requires a context manager and only reads the response body once you call `.read()`, `.text()`, `.json()`, `.iter_bytes()`, `.iter_text()`, `.iter_lines()` or `.parse()`. In the async client, these are async methods.\n\n```python\nwith client.files.with_streaming_response.upload(\n    file=b"https://www.example.com/public-url.jpg",\n    file_name="file-name.jpg",\n) as response :\n    print(response.headers.get(\'X-My-Header\'))\n\n    for line in response.iter_lines():\n      print(line)\n```\n\nThe context manager is required so that the response will reliably be closed.\n\n### Making custom/undocumented requests\n\nThis library is typed for convenient access to the documented API.\n\nIf you need to access undocumented endpoints, params, or response properties, the library can still be used.\n\n#### Undocumented endpoints\n\nTo make requests to undocumented endpoints, you can make requests using `client.get`, `client.post`, and other\nhttp verbs. Options on the client will be respected (such as retries) when making this request.\n\n```py\nimport httpx\n\nresponse = client.post(\n    "/foo",\n    cast_to=httpx.Response,\n    body={"my_param": True},\n)\n\nprint(response.headers.get("x-foo"))\n```\n\n#### Undocumented request params\n\nIf you want to explicitly send an extra param, you can do so with the `extra_query`, `extra_body`, and `extra_headers` request\noptions.\n\n#### Undocumented response properties\n\nTo access undocumented response properties, you can access the extra fields like `response.unknown_prop`. You\ncan also get all the extra fields on the Pydantic model as a dict with\n[`response.model_extra`](https://docs.pydantic.dev/latest/api/base_model/#pydantic.BaseModel.model_extra).\n\n### Configuring the HTTP client\n\nYou can directly override the [httpx client](https://www.python-httpx.org/api/#client) to customize it for your use case, including:\n\n- Support for [proxies](https://www.python-httpx.org/advanced/proxies/)\n- Custom [transports](https://www.python-httpx.org/advanced/transports/)\n- Additional [advanced](https://www.python-httpx.org/advanced/clients/) functionality\n\n```python\nimport httpx\nfrom imagekitio import ImageKit, DefaultHttpxClient\n\nclient = ImageKit(\n    # Or use the `IMAGE_KIT_BASE_URL` env var\n    base_url="http://my.test.server.example.com:8083",\n    http_client=DefaultHttpxClient(proxy="http://my.test.proxy.example.com", transport=httpx.HTTPTransport(local_address="0.0.0.0")),\n)\n```\n\nYou can also customize the client on a per-request basis by using `with_options()`:\n\n```python\nclient.with_options(http_client=DefaultHttpxClient(...))\n```\n\n### Managing HTTP resources\n\nBy default the library closes underlying HTTP connections whenever the client is [garbage collected](https://docs.python.org/3/reference/datamodel.html#object.__del__). You can manually close the client using the `.close()` method if desired, or with a context manager that closes when exiting.\n\n```py\nfrom imagekitio import ImageKit\n\nwith ImageKit() as client:\n  # make requests here\n  ...\n\n# HTTP client is now closed\n```\n\n## Versioning\n\nThis package generally follows [SemVer](https://semver.org/spec/v2.0.0.html) conventions, though certain backwards-incompatible changes may be released as minor versions:\n\n1. Changes that only affect static types, without breaking runtime behavior.\n2. Changes to library internals which are technically public but not intended or documented for external use. _(Please open a GitHub issue to let us know if you are relying on such internals.)_\n3. Changes that we do not expect to impact the vast majority of users in practice.\n\nWe take backwards-compatibility seriously and work hard to ensure you can rely on a smooth upgrade experience.\n\nWe are keen for your feedback; please open an [issue](https://www.github.com/imagekit-developer/imagekit-python/issues) with questions, bugs, or suggestions.\n\n### Determining the installed version\n\nIf you\'ve upgraded to the latest version but aren\'t seeing any new features you were expecting then your python environment is likely still using an older version.\n\nYou can determine the version that is being used at runtime with:\n\n```py\nimport imagekitio\nprint(imagekitio.__version__)\n```\n\n## Requirements\n\nPython 3.9 or higher.\n\n## Contributing\n\nSee [the contributing documentation](./CONTRIBUTING.md).\n',
  },
  {
    language: 'go',
    content:
      '# Image Kit Go API Library\n\n<a href="https://pkg.go.dev/github.com/imagekit-developer/imagekit-go"><img src="https://pkg.go.dev/badge/github.com/imagekit-developer/imagekit-go.svg" alt="Go Reference"></a>\n\nThe Image Kit Go library provides convenient access to the [Image Kit REST API](https://imagekit.io/docs/api-reference)\nfrom applications written in Go.\n\n\n\n## MCP Server\n\nUse the Image Kit MCP Server to enable AI assistants to interact with this API, allowing them to explore endpoints, make test requests, and use documentation to help integrate this SDK into your application.\n\n[![Add to Cursor](https://cursor.com/deeplink/mcp-install-dark.svg)](https://cursor.com/en-US/install-mcp?name=%40imagekit%2Fapi-mcp&config=eyJjb21tYW5kIjoibnB4IiwiYXJncyI6WyIteSIsIkBpbWFnZWtpdC9hcGktbWNwIl0sImVudiI6eyJJTUFHRUtJVF9QUklWQVRFX0tFWSI6Ik15IFByaXZhdGUgS2V5IiwiT1BUSU9OQUxfSU1BR0VLSVRfSUdOT1JFU19USElTIjoiTXkgUGFzc3dvcmQiLCJJTUFHRUtJVF9XRUJIT09LX1NFQ1JFVCI6Ik15IFdlYmhvb2sgU2VjcmV0In19)\n[![Install in VS Code](https://img.shields.io/badge/_-Add_to_VS_Code-blue?style=for-the-badge&logo=data:image/svg%2bxml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHZpZXdCb3g9IjAgMCA0MCA0MCI+PHBhdGggZmlsbD0iI0VFRSIgZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNMzAuMjM1IDM5Ljg4NGEyLjQ5MSAyLjQ5MSAwIDAgMS0xLjc4MS0uNzNMMTIuNyAyNC43OGwtMy40NiAyLjYyNC0zLjQwNiAyLjU4MmExLjY2NSAxLjY2NSAwIDAgMS0xLjA4Mi4zMzggMS42NjQgMS42NjQgMCAwIDEtMS4wNDYtLjQzMWwtMi4yLTJhMS42NjYgMS42NjYgMCAwIDEgMC0yLjQ2M0w3LjQ1OCAyMCA0LjY3IDE3LjQ1MyAxLjUwNyAxNC41N2ExLjY2NSAxLjY2NSAwIDAgMSAwLTIuNDYzbDIuMi0yYTEuNjY1IDEuNjY1IDAgMCAxIDIuMTMtLjA5N2w2Ljg2MyA1LjIwOUwyOC40NTIuODQ0YTIuNDg4IDIuNDg4IDAgMCAxIDEuODQxLS43MjljLjM1MS4wMDkuNjk5LjA5MSAxLjAxOS4yNDVsOC4yMzYgMy45NjFhMi41IDIuNSAwIDAgMSAxLjQxNSAyLjI1M3YuMDk5LS4wNDVWMzMuMzd2LS4wNDUuMDk1YTIuNTAxIDIuNTAxIDAgMCAxLTEuNDE2IDIuMjU3bC04LjIzNSAzLjk2MWEyLjQ5MiAyLjQ5MiAwIDAgMS0xLjA3Ny4yNDZabS43MTYtMjguOTQ3LTExLjk0OCA5LjA2MiAxMS45NTIgOS4wNjUtLjAwNC0xOC4xMjdaIi8+PC9zdmc+)](https://vscode.stainless.com/mcp/%7B%22name%22%3A%22%40imagekit%2Fapi-mcp%22%2C%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22%40imagekit%2Fapi-mcp%22%5D%2C%22env%22%3A%7B%22IMAGEKIT_PRIVATE_KEY%22%3A%22My%20Private%20Key%22%2C%22OPTIONAL_IMAGEKIT_IGNORES_THIS%22%3A%22My%20Password%22%2C%22IMAGEKIT_WEBHOOK_SECRET%22%3A%22My%20Webhook%20Secret%22%7D%7D)\n\n> Note: You may need to set environment variables in your MCP client.\n\n## Installation\n\n<!-- x-release-please-start-version -->\n\n```go\nimport (\n\t"github.com/imagekit-developer/imagekit-go" // imported as SDK_PackageName\n)\n```\n\n<!-- x-release-please-end -->\n\nOr to pin the version:\n\n<!-- x-release-please-start-version -->\n\n```sh\ngo get -u \'github.com/imagekit-developer/imagekit-go@v0.0.1\'\n```\n\n<!-- x-release-please-end -->\n\n## Requirements\n\nThis library requires Go 1.22+.\n\n## Usage\n\nThe full API of this library can be found in [api.md](api.md).\n\n```go\npackage main\n\nimport (\n\t"bytes"\n\t"context"\n\t"fmt"\n\t"io"\n\n\t"github.com/imagekit-developer/imagekit-go"\n\t"github.com/imagekit-developer/imagekit-go/option"\n)\n\nfunc main() {\n\tclient := imagekit.NewClient(\n\t\toption.WithPrivateKey("My Private Key"), // defaults to os.LookupEnv("IMAGEKIT_PRIVATE_KEY")\n\t\toption.WithPassword("My Password"),      // defaults to os.LookupEnv("OPTIONAL_IMAGEKIT_IGNORES_THIS")\n\t)\n\tresponse, err := client.Files.Upload(context.TODO(), imagekit.FileUploadParams{\n\t\tFile:     io.Reader(bytes.NewBuffer([]byte("https://www.example.com/public-url.jpg"))),\n\t\tFileName: "file-name.jpg",\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.VideoCodec)\n}\n\n```\n\n### Request fields\n\nAll request parameters are wrapped in a generic `Field` type,\nwhich we use to distinguish zero values from null or omitted fields.\n\nThis prevents accidentally sending a zero value if you forget a required parameter,\nand enables explicitly sending `null`, `false`, `\'\'`, or `0` on optional parameters.\nAny field not specified is not sent.\n\nTo construct fields with values, use the helpers `String()`, `Int()`, `Float()`, or most commonly, the generic `F[T]()`.\nTo send a null, use `Null[T]()`, and to send a nonconforming value, use `Raw[T](any)`. For example:\n\n```go\nparams := FooParams{\n\tName: SDK_PackageName.F("hello"),\n\n\t// Explicitly send `"description": null`\n\tDescription: SDK_PackageName.Null[string](),\n\n\tPoint: SDK_PackageName.F(SDK_PackageName.Point{\n\t\tX: SDK_PackageName.Int(0),\n\t\tY: SDK_PackageName.Int(1),\n\n\t\t// In cases where the API specifies a given type,\n\t\t// but you want to send something else, use `Raw`:\n\t\tZ: SDK_PackageName.Raw[int64](0.01), // sends a float\n\t}),\n}\n```\n\n### Response objects\n\nAll fields in response structs are value types (not pointers or wrappers).\n\nIf a given field is `null`, not present, or invalid, the corresponding field\nwill simply be its zero value.\n\nAll response structs also include a special `JSON` field, containing more detailed\ninformation about each property, which you can use like so:\n\n```go\nif res.Name == "" {\n\t// true if `"name"` is either not present or explicitly null\n\tres.JSON.Name.IsNull()\n\n\t// true if the `"name"` key was not present in the response JSON at all\n\tres.JSON.Name.IsMissing()\n\n\t// When the API returns data that cannot be coerced to the expected type:\n\tif res.JSON.Name.IsInvalid() {\n\t\traw := res.JSON.Name.Raw()\n\n\t\tlegacyName := struct{\n\t\t\tFirst string `json:"first"`\n\t\t\tLast  string `json:"last"`\n\t\t}{}\n\t\tjson.Unmarshal([]byte(raw), &legacyName)\n\t\tname = legacyName.First + " " + legacyName.Last\n\t}\n}\n```\n\nThese `.JSON` structs also include an `Extras` map containing\nany properties in the json response that were not specified\nin the struct. This can be useful for API features not yet\npresent in the SDK.\n\n```go\nbody := res.JSON.ExtraFields["my_unexpected_field"].Raw()\n```\n\n### RequestOptions\n\nThis library uses the functional options pattern. Functions defined in the\n`SDK_PackageOptionName` package return a `RequestOption`, which is a closure that mutates a\n`RequestConfig`. These options can be supplied to the client or at individual\nrequests. For example:\n\n```go\nclient := SDK_PackageName.SDK_ClientInitializerName(\n\t// Adds a header to every request made by the client\n\tSDK_PackageOptionName.WithHeader("X-Some-Header", "custom_header_info"),\n)\n\nclient.Files.Upload(context.TODO(), ...,\n\t// Override the header\n\tSDK_PackageOptionName.WithHeader("X-Some-Header", "some_other_custom_header_info"),\n\t// Add an undocumented field to the request body, using sjson syntax\n\tSDK_PackageOptionName.WithJSONSet("some.json.path", map[string]string{"my": "object"}),\n)\n```\n\nSee the [full list of request options](https://pkg.go.dev/github.com/imagekit-developer/imagekit-go/SDK_PackageOptionName).\n\n### Pagination\n\nThis library provides some conveniences for working with paginated list endpoints.\n\nYou can use `.ListAutoPaging()` methods to iterate through items across all pages:\n\n\n\nOr you can use simple `.List()` methods to fetch a single page and receive a standard response object\nwith additional helper methods like `.GetNextPage()`, e.g.:\n\n\n\n### Errors\n\nWhen the API returns a non-success status code, we return an error with type\n`*SDK_PackageName.Error`. This contains the `StatusCode`, `*http.Request`, and\n`*http.Response` values of the request, as well as the JSON of the error body\n(much like other response objects in the SDK).\n\nTo handle errors, we recommend that you use the `errors.As` pattern:\n\n```go\n_, err := client.Files.Upload(context.TODO(), imagekit.FileUploadParams{\n\tFile:     io.Reader(bytes.NewBuffer([]byte("https://www.example.com/public-url.jpg"))),\n\tFileName: "file-name.jpg",\n})\nif err != nil {\n\tvar apierr *imagekit.Error\n\tif errors.As(err, &apierr) {\n\t\tprintln(string(apierr.DumpRequest(true)))  // Prints the serialized HTTP request\n\t\tprintln(string(apierr.DumpResponse(true))) // Prints the serialized HTTP response\n\t}\n\tpanic(err.Error()) // GET "/api/v1/files/upload": 400 Bad Request { ... }\n}\n```\n\nWhen other errors occur, they are returned unwrapped; for example,\nif HTTP transport fails, you might receive `*url.Error` wrapping `*net.OpError`.\n\n### Timeouts\n\nRequests do not time out by default; use context to configure a timeout for a request lifecycle.\n\nNote that if a request is [retried](#retries), the context timeout does not start over.\nTo set a per-retry timeout, use `SDK_PackageOptionName.WithRequestTimeout()`.\n\n```go\n// This sets the timeout for the request, including all the retries.\nctx, cancel := context.WithTimeout(context.Background(), 5*time.Minute)\ndefer cancel()\nclient.Files.Upload(\n\tctx,\n\timagekit.FileUploadParams{\n\t\tFile:     io.Reader(bytes.NewBuffer([]byte("https://www.example.com/public-url.jpg"))),\n\t\tFileName: "file-name.jpg",\n\t},\n\t// This sets the per-retry timeout\n\toption.WithRequestTimeout(20*time.Second),\n)\n```\n\n### File uploads\n\nRequest parameters that correspond to file uploads in multipart requests are typed as\n`param.Field[io.Reader]`. The contents of the `io.Reader` will by default be sent as a multipart form\npart with the file name of "anonymous_file" and content-type of "application/octet-stream".\n\nThe file name and content-type can be customized by implementing `Name() string` or `ContentType()\nstring` on the run-time type of `io.Reader`. Note that `os.File` implements `Name() string`, so a\nfile returned by `os.Open` will be sent with the file name on disk.\n\nWe also provide a helper `SDK_PackageName.FileParam(reader io.Reader, filename string, contentType string)`\nwhich can be used to wrap any `io.Reader` with the appropriate file name and content type.\n\n```go\n// A file from the file system\nfile, err := os.Open("/path/to/file")\nimagekit.FileUploadParams{\n\tFile:     file,\n\tFileName: "fileName",\n}\n\n// A file from a string\nimagekit.FileUploadParams{\n\tFile:     strings.NewReader("my file contents"),\n\tFileName: "fileName",\n}\n\n// With a custom filename and contentType\nimagekit.FileUploadParams{\n\tFile:     imagekit.NewFile(strings.NewReader(`{"hello": "foo"}`), "file.go", "application/json"),\n\tFileName: "fileName",\n}\n```\n\n### Retries\n\nCertain errors will be automatically retried 2 times by default, with a short exponential backoff.\nWe retry by default all connection errors, 408 Request Timeout, 409 Conflict, 429 Rate Limit,\nand >=500 Internal errors.\n\nYou can use the `WithMaxRetries` option to configure or disable this:\n\n```go\n// Configure the default for all requests:\nclient := imagekit.NewClient(\n\toption.WithMaxRetries(0), // default is 2\n)\n\n// Override per-request:\nclient.Files.Upload(\n\tcontext.TODO(),\n\timagekit.FileUploadParams{\n\t\tFile:     io.Reader(bytes.NewBuffer([]byte("https://www.example.com/public-url.jpg"))),\n\t\tFileName: "file-name.jpg",\n\t},\n\toption.WithMaxRetries(5),\n)\n```\n\n\n### Accessing raw response data (e.g. response headers)\n\nYou can access the raw HTTP response data by using the `option.WithResponseInto()` request option. This is useful when\nyou need to examine response headers, status codes, or other details.\n\n```go\n// Create a variable to store the HTTP response\nvar response *http.Response\nresponse, err := client.Files.Upload(\n\tcontext.TODO(),\n\timagekit.FileUploadParams{\n\t\tFile:     io.Reader(bytes.NewBuffer([]byte("https://www.example.com/public-url.jpg"))),\n\t\tFileName: "file-name.jpg",\n\t},\n\toption.WithResponseInto(&response),\n)\nif err != nil {\n\t// handle error\n}\nfmt.Printf("%+v\\n", response)\n\nfmt.Printf("Status Code: %d\\n", response.StatusCode)\nfmt.Printf("Headers: %+#v\\n", response.Header)\n```\n\n### Making custom/undocumented requests\n\nThis library is typed for convenient access to the documented API. If you need to access undocumented\nendpoints, params, or response properties, the library can still be used.\n\n#### Undocumented endpoints\n\nTo make requests to undocumented endpoints, you can use `client.Get`, `client.Post`, and other HTTP verbs.\n`RequestOptions` on the client, such as retries, will be respected when making these requests.\n\n```go\nvar (\n    // params can be an io.Reader, a []byte, an encoding/json serializable object,\n    // or a "…Params" struct defined in this library.\n    params map[string]interface{}\n\n    // result can be an []byte, *http.Response, a encoding/json deserializable object,\n    // or a model defined in this library.\n    result *http.Response\n)\nerr := client.Post(context.Background(), "/unspecified", params, &result)\nif err != nil {\n    …\n}\n```\n\n#### Undocumented request params\n\nTo make requests using undocumented parameters, you may use either the `SDK_PackageOptionName.WithQuerySet()`\nor the `SDK_PackageOptionName.WithJSONSet()` methods.\n\n```go\nparams := FooNewParams{\n    ID:   SDK_PackageName.F("id_xxxx"),\n    Data: SDK_PackageName.F(FooNewParamsData{\n        FirstName: SDK_PackageName.F("John"),\n    }),\n}\nclient.Foo.New(context.Background(), params, SDK_PackageOptionName.WithJSONSet("data.last_name", "Doe"))\n```\n\n#### Undocumented response properties\n\nTo access undocumented response properties, you may either access the raw JSON of the response as a string\nwith `result.JSON.RawJSON()`, or get the raw JSON of a particular field on the result with\n`result.JSON.Foo.Raw()`.\n\nAny fields that are not present on the response struct will be saved and can be accessed by `result.JSON.ExtraFields()` which returns the extra fields as a `map[string]Field`.\n\n### Middleware\n\nWe provide `SDK_PackageOptionName.WithMiddleware` which applies the given\nmiddleware to requests.\n\n```go\nfunc Logger(req *http.Request, next SDK_PackageOptionName.MiddlewareNext) (res *http.Response, err error) {\n\t// Before the request\n\tstart := time.Now()\n\tLogReq(req)\n\n\t// Forward the request to the next handler\n\tres, err = next(req)\n\n\t// Handle stuff after the request\n\tend := time.Now()\n\tLogRes(res, err, start - end)\n\n    return res, err\n}\n\nclient := SDK_PackageName.SDK_ClientInitializerName(\n\tSDK_PackageOptionName.WithMiddleware(Logger),\n)\n```\n\nWhen multiple middlewares are provided as variadic arguments, the middlewares\nare applied left to right. If `SDK_PackageOptionName.WithMiddleware` is given\nmultiple times, for example first in the client then the method, the\nmiddleware in the client will run first and the middleware given in the method\nwill run next.\n\nYou may also replace the default `http.Client` with\n`SDK_PackageOptionName.WithHTTPClient(client)`. Only one http client is\naccepted (this overwrites any previous client) and receives requests after any\nmiddleware has been applied.\n\n## Semantic versioning\n\nThis package generally follows [SemVer](https://semver.org/spec/v2.0.0.html) conventions, though certain backwards-incompatible changes may be released as minor versions:\n\n1. Changes to library internals which are technically public but not intended or documented for external use. _(Please open a GitHub issue to let us know if you are relying on such internals.)_\n2. Changes that we do not expect to impact the vast majority of users in practice.\n\nWe take backwards-compatibility seriously and work hard to ensure you can rely on a smooth upgrade experience.\n\nWe are keen for your feedback; please open an [issue](https://www.github.com/imagekit-developer/imagekit-go/issues) with questions, bugs, or suggestions.\n\n## Contributing\n\nSee [the contributing documentation](./CONTRIBUTING.md).\n',
  },
  {
    language: 'terraform',
    content:
      '# Image Kit Terraform Provider\n\nThe [Image Kit Terraform provider](https://registry.terraform.io/providers/stainless-sdks/imagekit/latest/docs) provides convenient access to\nthe [Image Kit REST API](https://imagekit.io/docs/api-reference) from Terraform.\n\n\n\n## Requirements\n\nThis provider requires Terraform CLI 1.0 or later. You can [install it for your system](https://developer.hashicorp.com/terraform/install)\non Hashicorp\'s website.\n\n## Usage\n\nAdd the following to your `main.tf` file:\n\n\n\n```hcl\n# Declare the provider and version\nterraform {\n  required_providers {\n    SDK_ProviderTypeName = {\n      source  = "stainless-sdks/imagekit"\n      version = "~> 0.0.1"\n    }\n  }\n}\n\n# Initialize the provider\nprovider "imagekit" {\n  # Your ImageKit private API key (starts with `private_`).\n  You can find this in the [ImageKit dashboard](https://imagekit.io/dashboard/developer/api-keys).\n  private_key = "My Private Key" # or set IMAGEKIT_PRIVATE_KEY env variable\n  # ImageKit uses your API key as username and ignores the password. \n  The SDK sets a dummy value. You can ignore this field.\n  password = "My Password" # or set OPTIONAL_IMAGEKIT_IGNORES_THIS env variable\n  # Your ImageKit webhook secret for verifying webhook signatures (starts with `whsec_`).\n  You can find this in the [ImageKit dashboard](https://imagekit.io/dashboard/developer/webhooks).\n  Only required if you\'re using webhooks.\n  webhook_secret = "My Webhook Secret" # or set IMAGEKIT_WEBHOOK_SECRET env variable\n}\n\n# Configure a resource\nresource "imagekit_account_origin" "example_account_origin" {\n  access_key = "AKIAIOSFODNN7EXAMPLE"\n  bucket = "product-images"\n  name = "US S3 Storage"\n  secret_key = "wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY"\n  type = "S3"\n  base_url_for_canonical_header = "https://cdn.example.com"\n  include_canonical_header = false\n  prefix = "raw-assets"\n}\n```\n\n\n\nInitialize your project by running `terraform init` in the directory.\n\nAdditional examples can be found in the [./examples](./examples) folder within this repository, and you can\nrefer to the full documentation on [the Terraform Registry](https://registry.terraform.io/providers/stainless-sdks/imagekit/latest/docs).\n\n### Provider Options\nWhen you initialize the provider, the following options are supported. It is recommended to use environment variables for sensitive values like access tokens.\nIf an environment variable is provided, then the option does not need to be set in the terraform source.\n\n| Property       | Environment variable             | Required | Default value  |\n| -------------- | -------------------------------- | -------- | -------------- |\n| private_key    | `IMAGEKIT_PRIVATE_KEY`           | true     | —              |\n| webhook_secret | `IMAGEKIT_WEBHOOK_SECRET`        | false    | —              |\n| password       | `OPTIONAL_IMAGEKIT_IGNORES_THIS` | false    | `"do_not_set"` |\n\n\n## Semantic versioning\n\nThis package generally follows [SemVer](https://semver.org/spec/v2.0.0.html) conventions, though certain backwards-incompatible changes may be released as minor versions:\n\n1. Changes to library internals which are technically public but not intended or documented for external use. _(Please open a GitHub issue to let us know if you are relying on such internals.)_\n2. Changes that we do not expect to impact the vast majority of users in practice.\n\nWe take backwards-compatibility seriously and work hard to ensure you can rely on a smooth upgrade experience.\n\nWe are keen for your feedback; please open an [issue](https://www.github.com/stainless-sdks/imagekit-terraform/issues) with questions, bugs, or suggestions.\n\n## Contributing\n\nSee [the contributing documentation](./CONTRIBUTING.md).\n',
  },
  {
    language: 'typescript',
    content:
      "# Image Kit TypeScript API Library\n\n[![NPM version](https://img.shields.io/npm/v/@imagekit/nodejs.svg?label=npm%20(stable))](https://npmjs.org/package/@imagekit/nodejs) ![npm bundle size](https://img.shields.io/bundlephobia/minzip/@imagekit/nodejs)\n\nThis library provides convenient access to the Image Kit REST API from server-side TypeScript or JavaScript.\n\n\n\nThe REST API documentation can be found on [imagekit.io](https://imagekit.io/docs/api-reference). The full API of this library can be found in [api.md](api.md).\n\n\n\n## MCP Server\n\nUse the Image Kit MCP Server to enable AI assistants to interact with this API, allowing them to explore endpoints, make test requests, and use documentation to help integrate this SDK into your application.\n\n[![Add to Cursor](https://cursor.com/deeplink/mcp-install-dark.svg)](https://cursor.com/en-US/install-mcp?name=%40imagekit%2Fapi-mcp&config=eyJjb21tYW5kIjoibnB4IiwiYXJncyI6WyIteSIsIkBpbWFnZWtpdC9hcGktbWNwIl0sImVudiI6eyJJTUFHRUtJVF9QUklWQVRFX0tFWSI6Ik15IFByaXZhdGUgS2V5IiwiT1BUSU9OQUxfSU1BR0VLSVRfSUdOT1JFU19USElTIjoiTXkgUGFzc3dvcmQiLCJJTUFHRUtJVF9XRUJIT09LX1NFQ1JFVCI6Ik15IFdlYmhvb2sgU2VjcmV0In19)\n[![Install in VS Code](https://img.shields.io/badge/_-Add_to_VS_Code-blue?style=for-the-badge&logo=data:image/svg%2bxml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHZpZXdCb3g9IjAgMCA0MCA0MCI+PHBhdGggZmlsbD0iI0VFRSIgZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNMzAuMjM1IDM5Ljg4NGEyLjQ5MSAyLjQ5MSAwIDAgMS0xLjc4MS0uNzNMMTIuNyAyNC43OGwtMy40NiAyLjYyNC0zLjQwNiAyLjU4MmExLjY2NSAxLjY2NSAwIDAgMS0xLjA4Mi4zMzggMS42NjQgMS42NjQgMCAwIDEtMS4wNDYtLjQzMWwtMi4yLTJhMS42NjYgMS42NjYgMCAwIDEgMC0yLjQ2M0w3LjQ1OCAyMCA0LjY3IDE3LjQ1MyAxLjUwNyAxNC41N2ExLjY2NSAxLjY2NSAwIDAgMSAwLTIuNDYzbDIuMi0yYTEuNjY1IDEuNjY1IDAgMCAxIDIuMTMtLjA5N2w2Ljg2MyA1LjIwOUwyOC40NTIuODQ0YTIuNDg4IDIuNDg4IDAgMCAxIDEuODQxLS43MjljLjM1MS4wMDkuNjk5LjA5MSAxLjAxOS4yNDVsOC4yMzYgMy45NjFhMi41IDIuNSAwIDAgMSAxLjQxNSAyLjI1M3YuMDk5LS4wNDVWMzMuMzd2LS4wNDUuMDk1YTIuNTAxIDIuNTAxIDAgMCAxLTEuNDE2IDIuMjU3bC04LjIzNSAzLjk2MWEyLjQ5MiAyLjQ5MiAwIDAgMS0xLjA3Ny4yNDZabS43MTYtMjguOTQ3LTExLjk0OCA5LjA2MiAxMS45NTIgOS4wNjUtLjAwNC0xOC4xMjdaIi8+PC9zdmc+)](https://vscode.stainless.com/mcp/%7B%22name%22%3A%22%40imagekit%2Fapi-mcp%22%2C%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22%40imagekit%2Fapi-mcp%22%5D%2C%22env%22%3A%7B%22IMAGEKIT_PRIVATE_KEY%22%3A%22My%20Private%20Key%22%2C%22OPTIONAL_IMAGEKIT_IGNORES_THIS%22%3A%22My%20Password%22%2C%22IMAGEKIT_WEBHOOK_SECRET%22%3A%22My%20Webhook%20Secret%22%7D%7D)\n\n> Note: You may need to set environment variables in your MCP client.\n\n## Installation\n\n```sh\nnpm install @imagekit/nodejs\n```\n\n\n\n## Usage\n\nThe full API of this library can be found in [api.md](api.md).\n\n<!-- prettier-ignore -->\n```js\nimport ImageKit from '@imagekit/nodejs';\n\nconst client = new ImageKit({\n  privateKey: process.env['IMAGEKIT_PRIVATE_KEY'], // This is the default and can be omitted\n  password: process.env['OPTIONAL_IMAGEKIT_IGNORES_THIS'], // This is the default and can be omitted\n});\n\nconst response = await client.files.upload({\n  file: fs.createReadStream('path/to/file'),\n  fileName: 'file-name.jpg',\n});\n\nconsole.log(response.videoCodec);\n```\n\n\n\n### Request & Response types\n\nThis library includes TypeScript definitions for all request params and response fields. You may import and use them like so:\n\n<!-- prettier-ignore -->\n```ts\nimport ImageKit from '@imagekit/nodejs';\n\nconst client = new ImageKit({\n  privateKey: process.env['IMAGEKIT_PRIVATE_KEY'], // This is the default and can be omitted\n  password: process.env['OPTIONAL_IMAGEKIT_IGNORES_THIS'], // This is the default and can be omitted\n});\n\nconst params: ImageKit.FileUploadParams = {\n  file: fs.createReadStream('path/to/file'),\n  fileName: 'file-name.jpg',\n};\nconst response: ImageKit.FileUploadResponse = await client.files.upload(params);\n```\n\nDocumentation for each method, request param, and response field are available in docstrings and will appear on hover in most modern editors.\n\n## File uploads\n\nRequest parameters that correspond to file uploads can be passed in many different forms:\n- `File` (or an object with the same structure)\n- a `fetch` `Response` (or an object with the same structure)\n- an `fs.ReadStream`\n- the return value of our `toFile` helper\n\n```ts\nimport fs from 'fs';\nimport ImageKit, { toFile } from '@imagekit/nodejs';\n\nconst client = new ImageKit();\n\n// If you have access to Node `fs` we recommend using `fs.createReadStream()`:\nawait client.files.upload({ file: fs.createReadStream('/path/to/file'), fileName: 'fileName' });\n\n// Or if you have the web `File` API you can pass a `File` instance:\nawait client.files.upload({ file: new File(['my bytes'], 'file'), fileName: 'fileName' });\n\n// You can also pass a `fetch` `Response`:\nawait client.files.upload({ file: await fetch('https://somesite/file'), fileName: 'fileName' });\n\n// Finally, if none of the above are convenient, you can use our `toFile` helper:\nawait client.files.upload({\n  file: await toFile(Buffer.from('my bytes'), 'file'),\n  fileName: 'fileName',\n});\nawait client.files.upload({\n  file: await toFile(new Uint8Array([0, 1, 2]), 'file'),\n  fileName: 'fileName',\n});\n```\n\n\n\n## Handling errors\n\nWhen the library is unable to connect to the API,\nor if the API returns a non-success status code (i.e., 4xx or 5xx response),\na subclass of `APIError` will be thrown:\n\n<!-- prettier-ignore -->\n```ts\nconst response = await client.files\n  .upload({ file: fs.createReadStream('path/to/file'), fileName: 'file-name.jpg' })\n  .catch(async (err) => {\n    if (err instanceof ImageKit.APIError) {\n      console.log(err.status); // 400\n      console.log(err.name); // BadRequestError\n      console.log(err.headers); // {server: 'nginx', ...}\n    } else {\n      throw err;\n    }\n  });\n```\n\nError codes are as follows:\n\n| Status Code | Error Type                 |\n| ----------- | -------------------------- |\n| 400         | `BadRequestError`          |\n| 401         | `AuthenticationError`      |\n| 403         | `PermissionDeniedError`    |\n| 404         | `NotFoundError`            |\n| 422         | `UnprocessableEntityError` |\n| 429         | `RateLimitError`           |\n| >=500       | `InternalServerError`      |\n| N/A         | `APIConnectionError`       |\n\n### Retries\n\nCertain errors will be automatically retried 2 times by default, with a short exponential backoff.\nConnection errors (for example, due to a network connectivity problem), 408 Request Timeout, 409 Conflict,\n429 Rate Limit, and >=500 Internal errors will all be retried by default.\n\nYou can use the `maxRetries` option to configure or disable this:\n\n<!-- prettier-ignore -->\n```js\n// Configure the default for all requests:\nconst client = new ImageKit({\n  maxRetries: 0, // default is 2\n});\n\n// Or, configure per-request:\nawait client.files.upload({ file: fs.createReadStream('path/to/file'), fileName: 'file-name.jpg' }, {\n  maxRetries: 5,\n});\n```\n\n### Timeouts\n\nRequests time out after 1 minute by default. You can configure this with a `timeout` option:\n\n<!-- prettier-ignore -->\n```ts\n// Configure the default for all requests:\nconst client = new ImageKit({\n  timeout: 20 * 1000, // 20 seconds (default is 1 minute)\n});\n\n// Override per-request:\nawait client.files.upload({ file: fs.createReadStream('path/to/file'), fileName: 'file-name.jpg' }, {\n  timeout: 5 * 1000,\n});\n```\n\nOn timeout, an `APIConnectionTimeoutError` is thrown.\n\nNote that requests which time out will be [retried twice by default](#retries).\n\n\n\n\n\n## Advanced Usage\n\n### Accessing raw Response data (e.g., headers)\n\nThe \"raw\" `Response` returned by `fetch()` can be accessed through the `.asResponse()` method on the `APIPromise` type that all methods return.\nThis method returns as soon as the headers for a successful response are received and does not consume the response body, so you are free to write custom parsing or streaming logic.\n\nYou can also use the `.withResponse()` method to get the raw `Response` along with the parsed data.\nUnlike `.asResponse()` this method consumes the body, returning once it is parsed.\n\n<!-- prettier-ignore -->\n```ts\nconst client = new ImageKit();\n\nconst response = await client.files\n  .upload({ file: fs.createReadStream('path/to/file'), fileName: 'file-name.jpg' })\n  .asResponse();\nconsole.log(response.headers.get('X-My-Header'));\nconsole.log(response.statusText); // access the underlying Response object\n\nconst { data: response, response: raw } = await client.files\n  .upload({ file: fs.createReadStream('path/to/file'), fileName: 'file-name.jpg' })\n  .withResponse();\nconsole.log(raw.headers.get('X-My-Header'));\nconsole.log(response.videoCodec);\n```\n\n### Logging\n\n> [!IMPORTANT]\n> All log messages are intended for debugging only. The format and content of log messages\n> may change between releases.\n\n#### Log levels\n\nThe log level can be configured in two ways:\n\n1. Via the `IMAGE_KIT_LOG` environment variable\n2. Using the `logLevel` client option (overrides the environment variable if set)\n\n```ts\nimport ImageKit from '@imagekit/nodejs';\n\nconst client = new ImageKit({\n  logLevel: 'debug', // Show all log messages\n});\n```\n\nAvailable log levels, from most to least verbose:\n\n- `'debug'` - Show debug messages, info, warnings, and errors\n- `'info'` - Show info messages, warnings, and errors\n- `'warn'` - Show warnings and errors (default)\n- `'error'` - Show only errors\n- `'off'` - Disable all logging\n\nAt the `'debug'` level, all HTTP requests and responses are logged, including headers and bodies.\nSome authentication-related headers are redacted, but sensitive data in request and response bodies\nmay still be visible.\n\n#### Custom logger\n\nBy default, this library logs to `globalThis.console`. You can also provide a custom logger.\nMost logging libraries are supported, including [pino](https://www.npmjs.com/package/pino), [winston](https://www.npmjs.com/package/winston), [bunyan](https://www.npmjs.com/package/bunyan), [consola](https://www.npmjs.com/package/consola), [signale](https://www.npmjs.com/package/signale), and [@std/log](https://jsr.io/@std/log). If your logger doesn't work, please open an issue.\n\nWhen providing a custom logger, the `logLevel` option still controls which messages are emitted, messages\nbelow the configured level will not be sent to your logger.\n\n```ts\nimport ImageKit from '@imagekit/nodejs';\nimport pino from 'pino';\n\nconst logger = pino();\n\nconst client = new ImageKit({\n  logger: logger.child({ name: 'ImageKit' }),\n  logLevel: 'debug', // Send all messages to pino, allowing it to filter\n});\n```\n\n### Making custom/undocumented requests\n\nThis library is typed for convenient access to the documented API. If you need to access undocumented\nendpoints, params, or response properties, the library can still be used.\n\n#### Undocumented endpoints\n\nTo make requests to undocumented endpoints, you can use `client.get`, `client.post`, and other HTTP verbs.\nOptions on the client, such as retries, will be respected when making these requests.\n\n```ts\nawait client.post('/some/path', {\n  body: { some_prop: 'foo' },\n  query: { some_query_arg: 'bar' },\n});\n```\n\n#### Undocumented request params\n\nTo make requests using undocumented parameters, you may use `// @ts-expect-error` on the undocumented\nparameter. This library doesn't validate at runtime that the request matches the type, so any extra values you\nsend will be sent as-is.\n\n```ts\nclient.files.upload({\n  // ...\n  // @ts-expect-error baz is not yet public\n  baz: 'undocumented option',\n});\n```\n\nFor requests with the `GET` verb, any extra params will be in the query, all other requests will send the\nextra param in the body.\n\nIf you want to explicitly send an extra argument, you can do so with the `query`, `body`, and `headers` request\noptions.\n\n#### Undocumented response properties\n\nTo access undocumented response properties, you may access the response object with `// @ts-expect-error` on\nthe response object, or cast the response object to the requisite type. Like the request params, we do not\nvalidate or strip extra properties from the response from the API.\n\n### Customizing the fetch client\n\nBy default, this library expects a global `fetch` function is defined.\n\nIf you want to use a different `fetch` function, you can either polyfill the global:\n\n```ts\nimport fetch from 'my-fetch';\n\nglobalThis.fetch = fetch;\n```\n\nOr pass it to the client:\n\n```ts\nimport ImageKit from '@imagekit/nodejs';\nimport fetch from 'my-fetch';\n\nconst client = new ImageKit({ fetch });\n```\n\n### Fetch options\n\nIf you want to set custom `fetch` options without overriding the `fetch` function, you can provide a `fetchOptions` object when instantiating the client or making a request. (Request-specific options override client options.)\n\n```ts\nimport ImageKit from '@imagekit/nodejs';\n\nconst client = new ImageKit({\n  fetchOptions: {\n    // `RequestInit` options\n  },\n});\n```\n\n#### Configuring proxies\n\nTo modify proxy behavior, you can provide custom `fetchOptions` that add runtime-specific proxy\noptions to requests:\n\n<img src=\"https://raw.githubusercontent.com/stainless-api/sdk-assets/refs/heads/main/node.svg\" align=\"top\" width=\"18\" height=\"21\"> **Node** <sup>[[docs](https://github.com/nodejs/undici/blob/main/docs/docs/api/ProxyAgent.md#example---proxyagent-with-fetch)]</sup>\n\n```ts\nimport ImageKit from '@imagekit/nodejs';\nimport * as undici from 'undici';\n\nconst proxyAgent = new undici.ProxyAgent('http://localhost:8888');\nconst client = new ImageKit({\n  fetchOptions: {\n    dispatcher: proxyAgent,\n  },\n});\n```\n\n<img src=\"https://raw.githubusercontent.com/stainless-api/sdk-assets/refs/heads/main/bun.svg\" align=\"top\" width=\"18\" height=\"21\"> **Bun** <sup>[[docs](https://bun.sh/guides/http/proxy)]</sup>\n\n```ts\nimport ImageKit from '@imagekit/nodejs';\n\nconst client = new ImageKit({\n  fetchOptions: {\n    proxy: 'http://localhost:8888',\n  },\n});\n```\n\n<img src=\"https://raw.githubusercontent.com/stainless-api/sdk-assets/refs/heads/main/deno.svg\" align=\"top\" width=\"18\" height=\"21\"> **Deno** <sup>[[docs](https://docs.deno.com/api/deno/~/Deno.createHttpClient)]</sup>\n\n```ts\nimport ImageKit from 'npm:@imagekit/nodejs';\n\nconst httpClient = Deno.createHttpClient({ proxy: { url: 'http://localhost:8888' } });\nconst client = new ImageKit({\n  fetchOptions: {\n    client: httpClient,\n  },\n});\n```\n\n## Frequently Asked Questions\n\n## Semantic versioning\n\nThis package generally follows [SemVer](https://semver.org/spec/v2.0.0.html) conventions, though certain backwards-incompatible changes may be released as minor versions:\n\n1. Changes that only affect static types, without breaking runtime behavior.\n2. Changes to library internals which are technically public but not intended or documented for external use. _(Please open a GitHub issue to let us know if you are relying on such internals.)_\n3. Changes that we do not expect to impact the vast majority of users in practice.\n\nWe take backwards-compatibility seriously and work hard to ensure you can rely on a smooth upgrade experience.\n\nWe are keen for your feedback; please open an [issue](https://www.github.com/imagekit-developer/imagekit-nodejs/issues) with questions, bugs, or suggestions.\n\n## Requirements\n\nTypeScript >= 4.9 is supported.\n\nThe following runtimes are supported:\n\n- Web browsers (Up-to-date Chrome, Firefox, Safari, Edge, and more)\n- Node.js 20 LTS or later ([non-EOL](https://endoflife.date/nodejs)) versions.\n- Deno v1.28.0 or higher.\n- Bun 1.0 or later.\n- Cloudflare Workers.\n- Vercel Edge Runtime.\n- Jest 28 or greater with the `\"node\"` environment (`\"jsdom\"` is not supported at this time).\n- Nitro v2.6 or greater.\n\nNote that React Native is not supported at this time.\n\nIf you are interested in other runtime environments, please open or upvote an issue on GitHub.\n\n## Contributing\n\nSee [the contributing documentation](./CONTRIBUTING.md).\n",
  },
  {
    language: 'ruby',
    content:
      '# Image Kit Ruby API library\n\nThe Image Kit Ruby library provides convenient access to the Image Kit REST API from any Ruby 3.2.0+ application. It ships with comprehensive types & docstrings in Yard, RBS, and RBI – [see below](https://github.com/imagekit-developer/imagekit-ruby#Sorbet) for usage with Sorbet. The standard library\'s `net/http` is used as the HTTP transport, with connection pooling via the `connection_pool` gem.\n\n\n\n\n\n## MCP Server\n\nUse the Image Kit MCP Server to enable AI assistants to interact with this API, allowing them to explore endpoints, make test requests, and use documentation to help integrate this SDK into your application.\n\n[![Add to Cursor](https://cursor.com/deeplink/mcp-install-dark.svg)](https://cursor.com/en-US/install-mcp?name=%40imagekit%2Fapi-mcp&config=eyJjb21tYW5kIjoibnB4IiwiYXJncyI6WyIteSIsIkBpbWFnZWtpdC9hcGktbWNwIl0sImVudiI6eyJJTUFHRUtJVF9QUklWQVRFX0tFWSI6Ik15IFByaXZhdGUgS2V5IiwiT1BUSU9OQUxfSU1BR0VLSVRfSUdOT1JFU19USElTIjoiTXkgUGFzc3dvcmQiLCJJTUFHRUtJVF9XRUJIT09LX1NFQ1JFVCI6Ik15IFdlYmhvb2sgU2VjcmV0In19)\n[![Install in VS Code](https://img.shields.io/badge/_-Add_to_VS_Code-blue?style=for-the-badge&logo=data:image/svg%2bxml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHZpZXdCb3g9IjAgMCA0MCA0MCI+PHBhdGggZmlsbD0iI0VFRSIgZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNMzAuMjM1IDM5Ljg4NGEyLjQ5MSAyLjQ5MSAwIDAgMS0xLjc4MS0uNzNMMTIuNyAyNC43OGwtMy40NiAyLjYyNC0zLjQwNiAyLjU4MmExLjY2NSAxLjY2NSAwIDAgMS0xLjA4Mi4zMzggMS42NjQgMS42NjQgMCAwIDEtMS4wNDYtLjQzMWwtMi4yLTJhMS42NjYgMS42NjYgMCAwIDEgMC0yLjQ2M0w3LjQ1OCAyMCA0LjY3IDE3LjQ1MyAxLjUwNyAxNC41N2ExLjY2NSAxLjY2NSAwIDAgMSAwLTIuNDYzbDIuMi0yYTEuNjY1IDEuNjY1IDAgMCAxIDIuMTMtLjA5N2w2Ljg2MyA1LjIwOUwyOC40NTIuODQ0YTIuNDg4IDIuNDg4IDAgMCAxIDEuODQxLS43MjljLjM1MS4wMDkuNjk5LjA5MSAxLjAxOS4yNDVsOC4yMzYgMy45NjFhMi41IDIuNSAwIDAgMSAxLjQxNSAyLjI1M3YuMDk5LS4wNDVWMzMuMzd2LS4wNDUuMDk1YTIuNTAxIDIuNTAxIDAgMCAxLTEuNDE2IDIuMjU3bC04LjIzNSAzLjk2MWEyLjQ5MiAyLjQ5MiAwIDAgMS0xLjA3Ny4yNDZabS43MTYtMjguOTQ3LTExLjk0OCA5LjA2MiAxMS45NTIgOS4wNjUtLjAwNC0xOC4xMjdaIi8+PC9zdmc+)](https://vscode.stainless.com/mcp/%7B%22name%22%3A%22%40imagekit%2Fapi-mcp%22%2C%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22%40imagekit%2Fapi-mcp%22%5D%2C%22env%22%3A%7B%22IMAGEKIT_PRIVATE_KEY%22%3A%22My%20Private%20Key%22%2C%22OPTIONAL_IMAGEKIT_IGNORES_THIS%22%3A%22My%20Password%22%2C%22IMAGEKIT_WEBHOOK_SECRET%22%3A%22My%20Webhook%20Secret%22%7D%7D)\n\n> Note: You may need to set environment variables in your MCP client.\n\n## Documentation\n\nDocumentation for releases of this gem can be found [on RubyDoc](https://gemdocs.org/gems/imagekitio).\n\nThe REST API documentation can be found on [imagekit.io](https://imagekit.io/docs/api-reference).\n\n## Installation\n\nTo use this gem, install via Bundler by adding the following to your application\'s `Gemfile`:\n\n<!-- x-release-please-start-version -->\n\n```ruby\ngem "imagekitio", "~> 0.0.1"\n```\n\n<!-- x-release-please-end -->\n\n## Usage\n\n```ruby\nrequire "bundler/setup"\nrequire "imagekitio"\n\nimage_kit = Imagekitio::Client.new(\n  private_key: ENV["IMAGEKIT_PRIVATE_KEY"], # This is the default and can be omitted\n  password: ENV["OPTIONAL_IMAGEKIT_IGNORES_THIS"] # This is the default and can be omitted\n)\n\nresponse = image_kit.files.upload(\n  file: StringIO.new("https://www.example.com/public-url.jpg"),\n  file_name: "file-name.jpg"\n)\n\nputs(response.videoCodec)\n```\n\n\n\n\n\n### File uploads\n\nRequest parameters that correspond to file uploads can be passed as raw contents, a [`Pathname`](https://rubyapi.org/3.2/o/pathname) instance, [`StringIO`](https://rubyapi.org/3.2/o/stringio), or more.\n\n```ruby\nrequire "pathname"\n\n# Use `Pathname` to send the filename and/or avoid paging a large file into memory:\nresponse = image_kit.files.upload(file: Pathname("/path/to/file"))\n\n# Alternatively, pass file contents or a `StringIO` directly:\nresponse = image_kit.files.upload(file: File.read("/path/to/file"))\n\n# Or, to control the filename and/or content type:\nfile = Imagekitio::FilePart.new(File.read("/path/to/file"), filename: "/path/to/file", content_type: "…")\nresponse = image_kit.files.upload(file: file)\n\nputs(response.videoCodec)\n```\n\nNote that you can also pass a raw `IO` descriptor, but this disables retries, as the library can\'t be sure if the descriptor is a file or pipe (which cannot be rewound).\n\n### Handling errors\n\nWhen the library is unable to connect to the API, or if the API returns a non-success status code (i.e., 4xx or 5xx response), a subclass of `Imagekitio::Errors::APIError` will be thrown:\n\n```ruby\nbegin\n  file = image_kit.files.upload(\n    file: StringIO.new("https://www.example.com/public-url.jpg"),\n    file_name: "file-name.jpg"\n  )\nrescue Imagekitio::Errors::APIConnectionError => e\n  puts("The server could not be reached")\n  puts(e.cause)  # an underlying Exception, likely raised within `net/http`\nrescue Imagekitio::Errors::RateLimitError => e\n  puts("A 429 status code was received; we should back off a bit.")\nrescue Imagekitio::Errors::APIStatusError => e\n  puts("Another non-200-range status code was received")\n  puts(e.status)\nend\n```\n\nError codes are as follows:\n\n| Cause            | Error Type                 |\n| ---------------- | -------------------------- |\n| HTTP 400         | `BadRequestError`          |\n| HTTP 401         | `AuthenticationError`      |\n| HTTP 403         | `PermissionDeniedError`    |\n| HTTP 404         | `NotFoundError`            |\n| HTTP 409         | `ConflictError`            |\n| HTTP 422         | `UnprocessableEntityError` |\n| HTTP 429         | `RateLimitError`           |\n| HTTP >= 500      | `InternalServerError`      |\n| Other HTTP error | `APIStatusError`           |\n| Timeout          | `APITimeoutError`          |\n| Network error    | `APIConnectionError`       |\n\n### Retries\n\nCertain errors will be automatically retried 2 times by default, with a short exponential backoff.\n\nConnection errors (for example, due to a network connectivity problem), 408 Request Timeout, 409 Conflict, 429 Rate Limit, >=500 Internal errors, and timeouts will all be retried by default.\n\nYou can use the `max_retries` option to configure or disable this:\n\n```ruby\n# Configure the default for all requests:\nimage_kit = Imagekitio::Client.new(\n  max_retries: 0 # default is 2\n)\n\n# Or, configure per-request:\nimage_kit.files.upload(\n  file: StringIO.new("https://www.example.com/public-url.jpg"),\n  file_name: "file-name.jpg",\n  request_options: {max_retries: 5}\n)\n```\n\n### Timeouts\n\nBy default, requests will time out after 60 seconds. You can use the timeout option to configure or disable this:\n\n```ruby\n# Configure the default for all requests:\nimage_kit = Imagekitio::Client.new(\n  timeout: nil # default is 60\n)\n\n# Or, configure per-request:\nimage_kit.files.upload(\n  file: StringIO.new("https://www.example.com/public-url.jpg"),\n  file_name: "file-name.jpg",\n  request_options: {timeout: 5}\n)\n```\n\nOn timeout, `Imagekitio::Errors::APITimeoutError` is raised.\n\nNote that requests that time out are retried by default.\n\n## Advanced concepts\n\n### BaseModel\n\nAll parameter and response objects inherit from `Imagekitio::Internal::Type::BaseModel`, which provides several conveniences, including:\n\n1. All fields, including unknown ones, are accessible with `obj[:prop]` syntax, and can be destructured with `obj => {prop: prop}` or pattern-matching syntax.\n\n2. Structural equivalence for equality; if two API calls return the same values, comparing the responses with == will return true.\n\n3. Both instances and the classes themselves can be pretty-printed.\n\n4. Helpers such as `#to_h`, `#deep_to_h`, `#to_json`, and `#to_yaml`.\n\n### Making custom or undocumented requests\n\n#### Undocumented properties\n\nYou can send undocumented parameters to any endpoint, and read undocumented response properties, like so:\n\nNote: the `extra_` parameters of the same name overrides the documented parameters.\n\n```ruby\nresponse =\n  image_kit.files.upload(\n    file: StringIO.new("https://www.example.com/public-url.jpg"),\n    file_name: "file-name.jpg",\n    request_options: {\n      extra_query: {my_query_parameter: value},\n      extra_body: {my_body_parameter: value},\n      extra_headers: {"my-header": value}\n    }\n  )\n\nputs(response[:my_undocumented_property])\n```\n\n#### Undocumented request params\n\nIf you want to explicitly send an extra param, you can do so with the `extra_query`, `extra_body`, and `extra_headers` under the `request_options:` parameter when making a request, as seen in the examples above.\n\n#### Undocumented endpoints\n\nTo make requests to undocumented endpoints while retaining the benefit of auth, retries, and so on, you can make requests using `client.request`, like so:\n\n```ruby\nresponse = client.request(\n  method: :post,\n  path: \'/undocumented/endpoint\',\n  query: {"dog": "woof"},\n  headers: {"useful-header": "interesting-value"},\n  body: {"hello": "world"}\n)\n```\n\n### Concurrency & connection pooling\n\nThe `Imagekitio::Client` instances are threadsafe, but are only are fork-safe when there are no in-flight HTTP requests.\n\nEach instance of `Imagekitio::Client` has its own HTTP connection pool with a default size of 99. As such, we recommend instantiating the client once per application in most settings.\n\nWhen all available connections from the pool are checked out, requests wait for a new connection to become available, with queue time counting towards the request timeout.\n\nUnless otherwise specified, other classes in the SDK do not have locks protecting their underlying data structure.\n\n## Sorbet\n\nThis library provides comprehensive [RBI](https://sorbet.org/docs/rbi) definitions, and has no dependency on sorbet-runtime.\n\nYou can provide typesafe request parameters like so:\n\n```ruby\nimage_kit.files.upload(\n  file: StringIO.new("https://www.example.com/public-url.jpg"),\n  file_name: "file-name.jpg"\n)\n```\n\nOr, equivalently:\n\n```ruby\n# Hashes work, but are not typesafe:\nimage_kit.files.upload(\n  file: StringIO.new("https://www.example.com/public-url.jpg"),\n  file_name: "file-name.jpg"\n)\n\n# You can also splat a full Params class:\nparams = Imagekitio::FileUploadParams.new(\n  file: StringIO.new("https://www.example.com/public-url.jpg"),\n  file_name: "file-name.jpg"\n)\nimage_kit.files.upload(**params)\n```\n\n### Enums\n\nSince this library does not depend on `sorbet-runtime`, it cannot provide [`T::Enum`](https://sorbet.org/docs/tenum) instances. Instead, we provide "tagged symbols" instead, which is always a primitive at runtime:\n\n```ruby\n# :all\nputs(Imagekitio::AssetListParams::FileType::ALL)\n\n# Revealed type: `T.all(Imagekitio::AssetListParams::FileType, Symbol)`\nT.reveal_type(Imagekitio::AssetListParams::FileType::ALL)\n```\n\nEnum parameters have a "relaxed" type, so you can either pass in enum constants or their literal value:\n\n```ruby\n# Using the enum constants preserves the tagged type information:\nimage_kit.assets.list(\n  file_type: Imagekitio::AssetListParams::FileType::ALL,\n  # …\n)\n\n# Literal values are also permissible:\nimage_kit.assets.list(\n  file_type: :all,\n  # …\n)\n```\n\n## Versioning\n\nThis package follows [SemVer](https://semver.org/spec/v2.0.0.html) conventions. As the library is in initial development and has a major version of `0`, APIs may change at any time.\n\nThis package considers improvements to the (non-runtime) `*.rbi` and `*.rbs` type definitions to be non-breaking changes.\n\n## Requirements\n\nRuby 3.2.0 or higher.\n\n## Contributing\n\nSee [the contributing documentation](https://github.com/imagekit-developer/imagekit-ruby/tree/master/CONTRIBUTING.md).\n',
  },
  {
    language: 'java',
    content:
      '# Image Kit Java API Library\n\n\n[![Maven Central](https://img.shields.io/maven-central/v/com.imagekit.api/image-kit-java)](https://central.sonatype.com/artifact/com.imagekit.api/image-kit-java/0.0.1)\n[![javadoc](https://javadoc.io/badge2/com.imagekit.api/image-kit-java/0.0.1/javadoc.svg)](https://javadoc.io/doc/com.imagekit.api/image-kit-java/0.0.1)\n\n\nThe Image Kit Java SDK provides convenient access to the [Image Kit REST API](https://imagekit.io/docs/api-reference)   from applications written in Java.\n\n\n\n\n\n## MCP Server\n\nUse the Image Kit MCP Server to enable AI assistants to interact with this API, allowing them to explore endpoints, make test requests, and use documentation to help integrate this SDK into your application.\n\n[![Add to Cursor](https://cursor.com/deeplink/mcp-install-dark.svg)](https://cursor.com/en-US/install-mcp?name=%40imagekit%2Fapi-mcp&config=eyJjb21tYW5kIjoibnB4IiwiYXJncyI6WyIteSIsIkBpbWFnZWtpdC9hcGktbWNwIl0sImVudiI6eyJJTUFHRUtJVF9QUklWQVRFX0tFWSI6Ik15IFByaXZhdGUgS2V5IiwiT1BUSU9OQUxfSU1BR0VLSVRfSUdOT1JFU19USElTIjoiTXkgUGFzc3dvcmQiLCJJTUFHRUtJVF9XRUJIT09LX1NFQ1JFVCI6Ik15IFdlYmhvb2sgU2VjcmV0In19)\n[![Install in VS Code](https://img.shields.io/badge/_-Add_to_VS_Code-blue?style=for-the-badge&logo=data:image/svg%2bxml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHZpZXdCb3g9IjAgMCA0MCA0MCI+PHBhdGggZmlsbD0iI0VFRSIgZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNMzAuMjM1IDM5Ljg4NGEyLjQ5MSAyLjQ5MSAwIDAgMS0xLjc4MS0uNzNMMTIuNyAyNC43OGwtMy40NiAyLjYyNC0zLjQwNiAyLjU4MmExLjY2NSAxLjY2NSAwIDAgMS0xLjA4Mi4zMzggMS42NjQgMS42NjQgMCAwIDEtMS4wNDYtLjQzMWwtMi4yLTJhMS42NjYgMS42NjYgMCAwIDEgMC0yLjQ2M0w3LjQ1OCAyMCA0LjY3IDE3LjQ1MyAxLjUwNyAxNC41N2ExLjY2NSAxLjY2NSAwIDAgMSAwLTIuNDYzbDIuMi0yYTEuNjY1IDEuNjY1IDAgMCAxIDIuMTMtLjA5N2w2Ljg2MyA1LjIwOUwyOC40NTIuODQ0YTIuNDg4IDIuNDg4IDAgMCAxIDEuODQxLS43MjljLjM1MS4wMDkuNjk5LjA5MSAxLjAxOS4yNDVsOC4yMzYgMy45NjFhMi41IDIuNSAwIDAgMSAxLjQxNSAyLjI1M3YuMDk5LS4wNDVWMzMuMzd2LS4wNDUuMDk1YTIuNTAxIDIuNTAxIDAgMCAxLTEuNDE2IDIuMjU3bC04LjIzNSAzLjk2MWEyLjQ5MiAyLjQ5MiAwIDAgMS0xLjA3Ny4yNDZabS43MTYtMjguOTQ3LTExLjk0OCA5LjA2MiAxMS45NTIgOS4wNjUtLjAwNC0xOC4xMjdaIi8+PC9zdmc+)](https://vscode.stainless.com/mcp/%7B%22name%22%3A%22%40imagekit%2Fapi-mcp%22%2C%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22%40imagekit%2Fapi-mcp%22%5D%2C%22env%22%3A%7B%22IMAGEKIT_PRIVATE_KEY%22%3A%22My%20Private%20Key%22%2C%22OPTIONAL_IMAGEKIT_IGNORES_THIS%22%3A%22My%20Password%22%2C%22IMAGEKIT_WEBHOOK_SECRET%22%3A%22My%20Webhook%20Secret%22%7D%7D)\n\n> Note: You may need to set environment variables in your MCP client.\n\nThe REST API documentation can be found on [imagekit.io](https://imagekit.io/docs/api-reference). Javadocs are available on [javadoc.io](https://javadoc.io/doc/com.imagekit.api/image-kit-java/0.0.1).\n\n## Installation\n\n### Gradle\n\n~~~kotlin\nimplementation("com.imagekit.api:image-kit-java:0.0.1")\n~~~\n\n### Maven\n\n~~~xml\n<dependency>\n  <groupId>com.imagekit.api</groupId>\n  <artifactId>image-kit-java</artifactId>\n  <version>0.0.1</version>\n</dependency>\n~~~\n\n## Requirements\n\nThis library requires Java 8 or later.\n\n## Usage\n\n```java\nimport com.imagekit.api.client.ImageKitClient;\nimport com.imagekit.api.client.okhttp.ImageKitOkHttpClient;\nimport com.imagekit.api.models.files.FileUploadParams;\nimport com.imagekit.api.models.files.FileUploadResponse;\nimport java.io.ByteArrayInputStream;\n\n// Configures using the `imagekit.imagekitPrivateKey`, `imagekit.optionalImagekitIgnoresThis`, `imagekit.imagekitWebhookSecret` and `imagekit.baseUrl` system properties\n// Or configures using the `IMAGEKIT_PRIVATE_KEY`, `OPTIONAL_IMAGEKIT_IGNORES_THIS`, `IMAGEKIT_WEBHOOK_SECRET` and `IMAGE_KIT_BASE_URL` environment variables\nImageKitClient client = ImageKitOkHttpClient.fromEnv();\n\nFileUploadParams params = FileUploadParams.builder()\n    .file(new ByteArrayInputStream("https://www.example.com/public-url.jpg".getBytes()))\n    .fileName("file-name.jpg")\n    .build();\nFileUploadResponse response = client.files().upload(params);\n```\n\n## Client configuration\n\nConfigure the client using system properties or environment variables:\n\n```java\nimport com.imagekit.api.client.ImageKitClient;\nimport com.imagekit.api.client.okhttp.ImageKitOkHttpClient;\n\n// Configures using the `imagekit.imagekitPrivateKey`, `imagekit.optionalImagekitIgnoresThis`, `imagekit.imagekitWebhookSecret` and `imagekit.baseUrl` system properties\n// Or configures using the `IMAGEKIT_PRIVATE_KEY`, `OPTIONAL_IMAGEKIT_IGNORES_THIS`, `IMAGEKIT_WEBHOOK_SECRET` and `IMAGE_KIT_BASE_URL` environment variables\nImageKitClient client = ImageKitOkHttpClient.fromEnv();\n```\n\nOr manually:\n\n```java\nimport com.imagekit.api.client.ImageKitClient;\nimport com.imagekit.api.client.okhttp.ImageKitOkHttpClient;\n\nImageKitClient client = ImageKitOkHttpClient.builder()\n    .privateKey("My Private Key")\n    .password("My Password")\n    .build();\n```\n\nOr using a combination of the two approaches:\n\n```java\nimport com.imagekit.api.client.ImageKitClient;\nimport com.imagekit.api.client.okhttp.ImageKitOkHttpClient;\n\nImageKitClient client = ImageKitOkHttpClient.builder()\n    // Configures using the `imagekit.imagekitPrivateKey`, `imagekit.optionalImagekitIgnoresThis`, `imagekit.imagekitWebhookSecret` and `imagekit.baseUrl` system properties\n    // Or configures using the `IMAGEKIT_PRIVATE_KEY`, `OPTIONAL_IMAGEKIT_IGNORES_THIS`, `IMAGEKIT_WEBHOOK_SECRET` and `IMAGE_KIT_BASE_URL` environment variables\n    .fromEnv()\n    .privateKey("My Private Key")\n    .build();\n```\n\nSee this table for the available options:\n\n| Setter          | System property                        | Environment variable             | Required | Default value               |\n| --------------- | -------------------------------------- | -------------------------------- | -------- | --------------------------- |\n| `privateKey`    | `imagekit.imagekitPrivateKey`          | `IMAGEKIT_PRIVATE_KEY`           | true     | -                           |\n| `password`      | `imagekit.optionalImagekitIgnoresThis` | `OPTIONAL_IMAGEKIT_IGNORES_THIS` | false    | `"do_not_set"`              |\n| `webhookSecret` | `imagekit.imagekitWebhookSecret`       | `IMAGEKIT_WEBHOOK_SECRET`        | false    | -                           |\n| `baseUrl`       | `imagekit.baseUrl`                     | `IMAGE_KIT_BASE_URL`             | true     | `"https://api.imagekit.io"` |\n\nSystem properties take precedence over environment variables.\n\n> [!TIP]\n> Don\'t create more than one client in the same application. Each client has a connection pool and\n> thread pools, which are more efficient to share between requests.\n\n### Modifying configuration\n\nTo temporarily use a modified client configuration, while reusing the same connection and thread       pools, call `withOptions()` on any client or service:\n\n```java\nimport com.imagekit.api.client.ImageKitClient;\n\nImageKitClient clientWithOptions = client.withOptions(optionsBuilder -> {\n    optionsBuilder.baseUrl("https://example.com");\n    optionsBuilder.maxRetries(42);\n});\n```\n\nThe `withOptions()` method does not affect the original client or service.\n\n## Requests and responses\n\nTo send a request to the Image Kit API, build an instance of some `Params` class and pass it to the     corresponding client method. When the response is received, it will be deserialized into an instance of     a Java class.\n\nFor example, `client.files().upload(...)` should be called with an instance of `FileUploadParams`, and it     will return an instance of `FileUploadResponse`.\n\n## Immutability\n\nEach class in the SDK has an associated   [builder](https://blogs.oracle.com/javamagazine/post/exploring-joshua-blochs-builder-design-pattern-in-java)   or factory method for constructing it.\n\nEach class is [immutable](https://docs.oracle.com/javase/tutorial/essential/concurrency/immutable.html)   once constructed. If the class has an associated builder, then it has a `toBuilder()` method, which can   be used to convert it back to a builder for making a modified copy.\n\nBecause each class is immutable, builder modification will _never_ affect already built class instances.\n\n## Asynchronous execution\n\nThe default client is synchronous. To switch to asynchronous execution, call the `async()` method:\n\n```java\nimport com.imagekit.api.client.ImageKitClient;\nimport com.imagekit.api.client.okhttp.ImageKitOkHttpClient;\nimport com.imagekit.api.models.files.FileUploadParams;\nimport com.imagekit.api.models.files.FileUploadResponse;\nimport java.io.ByteArrayInputStream;\nimport java.util.concurrent.CompletableFuture;\n\n// Configures using the `imagekit.imagekitPrivateKey`, `imagekit.optionalImagekitIgnoresThis`, `imagekit.imagekitWebhookSecret` and `imagekit.baseUrl` system properties\n// Or configures using the `IMAGEKIT_PRIVATE_KEY`, `OPTIONAL_IMAGEKIT_IGNORES_THIS`, `IMAGEKIT_WEBHOOK_SECRET` and `IMAGE_KIT_BASE_URL` environment variables\nImageKitClient client = ImageKitOkHttpClient.fromEnv();\n\nFileUploadParams params = FileUploadParams.builder()\n    .file(new ByteArrayInputStream("https://www.example.com/public-url.jpg".getBytes()))\n    .fileName("file-name.jpg")\n    .build();\nCompletableFuture<FileUploadResponse> response = client.async().files().upload(params);\n```\n\nOr create an asynchronous client from the beginning:\n\n```java\nimport com.imagekit.api.client.ImageKitClientAsync;\nimport com.imagekit.api.client.okhttp.ImageKitOkHttpClientAsync;\nimport com.imagekit.api.models.files.FileUploadParams;\nimport com.imagekit.api.models.files.FileUploadResponse;\nimport java.io.ByteArrayInputStream;\nimport java.util.concurrent.CompletableFuture;\n\n// Configures using the `imagekit.imagekitPrivateKey`, `imagekit.optionalImagekitIgnoresThis`, `imagekit.imagekitWebhookSecret` and `imagekit.baseUrl` system properties\n// Or configures using the `IMAGEKIT_PRIVATE_KEY`, `OPTIONAL_IMAGEKIT_IGNORES_THIS`, `IMAGEKIT_WEBHOOK_SECRET` and `IMAGE_KIT_BASE_URL` environment variables\nImageKitClientAsync client = ImageKitOkHttpClientAsync.fromEnv();\n\nFileUploadParams params = FileUploadParams.builder()\n    .file(new ByteArrayInputStream("https://www.example.com/public-url.jpg".getBytes()))\n    .fileName("file-name.jpg")\n    .build();\nCompletableFuture<FileUploadResponse> response = client.files().upload(params);\n```\n\nThe asynchronous client supports the same options as the synchronous one, except most methods return `CompletableFuture`s.\n\n\n\n## File uploads\n\nThe SDK defines methods that accept files.\n\nTo upload a file, pass a [`Path`](https://docs.oracle.com/javase/8/docs/api/java/nio/file/Path.html):\n\n```java\nimport com.imagekit.api.models.files.FileUploadParams;\nimport com.imagekit.api.models.files.FileUploadResponse;\nimport java.nio.file.Paths;\n\nFileUploadParams params = FileUploadParams.builder()\n    .fileName("fileName")\n    .file(Paths.get("/path/to/file"))\n    .build();\nFileUploadResponse response = client.files().upload(params);\n```\n\nOr an arbitrary [`InputStream`](https://docs.oracle.com/javase/8/docs/api/java/io/InputStream.html):\n\n```java\nimport com.imagekit.api.models.files.FileUploadParams;\nimport com.imagekit.api.models.files.FileUploadResponse;\nimport java.net.URL;\n\nFileUploadParams params = FileUploadParams.builder()\n    .fileName("fileName")\n    .file(new URL("https://example.com//path/to/file").openStream())\n    .build();\nFileUploadResponse response = client.files().upload(params);\n```\n\nOr a `byte[]` array:\n\n```java\nimport com.imagekit.api.models.files.FileUploadParams;\nimport com.imagekit.api.models.files.FileUploadResponse;\n\nFileUploadParams params = FileUploadParams.builder()\n    .fileName("fileName")\n    .file("content".getBytes())\n    .build();\nFileUploadResponse response = client.files().upload(params);\n```\n\nNote that when passing a non-`Path` its filename is unknown so it will not be included in the request.     To manually set a filename, pass a [`MultipartField`](image-kit-java-core/src/main/kotlin/com/imagekit/api/core/Values.kt):\n\n```java\nimport com.imagekit.api.core.MultipartField;\nimport com.imagekit.api.models.files.FileUploadParams;\nimport com.imagekit.api.models.files.FileUploadResponse;\nimport java.io.InputStream;\nimport java.net.URL;\n\nFileUploadParams params = FileUploadParams.builder()\n    .fileName("fileName")\n    .file(MultipartField.<InputStream>builder()\n        .value(new URL("https://example.com//path/to/file").openStream())\n        .filename("/path/to/file")\n        .build())\n    .build();\nFileUploadResponse response = client.files().upload(params);\n```\n\n\n\n## Raw responses\n\nThe SDK defines methods that deserialize responses into instances of Java classes.       However, these methods don\'t provide access to the response headers, status code, or the raw response       body.\n\nTo access this data, prefix any HTTP method call on a client or service with `withRawResponse()`:\n\n```java\nimport com.imagekit.api.core.http.Headers;\nimport com.imagekit.api.core.http.HttpResponseFor;\nimport com.imagekit.api.models.files.FileUploadParams;\nimport com.imagekit.api.models.files.FileUploadResponse;\nimport java.io.ByteArrayInputStream;\n\nFileUploadParams params = FileUploadParams.builder()\n    .file(new ByteArrayInputStream("https://www.example.com/public-url.jpg".getBytes()))\n    .fileName("file-name.jpg")\n    .build();\nHttpResponseFor<FileUploadResponse> response = client.files().withRawResponse().upload(params);\n\nint statusCode = response.statusCode();\nHeaders headers = response.headers();\n```\n\nYou can still deserialize the response into an instance of a Java class if needed:\n\n```java\nimport com.imagekit.api.models.files.FileUploadResponse;\n\nFileUploadResponse parsedResponse = response.parse();\n```\n\n## Error handling\n\nThe SDK throws custom unchecked exception types:\n\n- [`ImageKitServiceException`](image-kit-java-core/src/main/kotlin/com/imagekit/api/errors/ImageKitServiceException.kt): Base class for HTTP errors. See this table for which exception       subclass is thrown for each HTTP status code:\n\n  | Status | Exception                                          |\n  | ------ | -------------------------------------------------- |\n  | 400    | [`BadRequestException`](image-kit-java-core/src/main/kotlin/com/imagekit/api/errors/BadRequestException.kt)           |\n  | 401    | [`UnauthorizedException`](image-kit-java-core/src/main/kotlin/com/imagekit/api/errors/UnauthorizedException.kt)         |\n  | 403    | [`PermissionDeniedException`](image-kit-java-core/src/main/kotlin/com/imagekit/api/errors/PermissionDeniedException.kt)     |\n  | 404    | [`NotFoundException`](image-kit-java-core/src/main/kotlin/com/imagekit/api/errors/NotFoundException.kt)             |\n  | 422    | [`UnprocessableEntityException`](image-kit-java-core/src/main/kotlin/com/imagekit/api/errors/UnprocessableEntityException.kt)  |\n  | 429    | [`RateLimitException`](image-kit-java-core/src/main/kotlin/com/imagekit/api/errors/RateLimitException.kt)            |\n  | 5xx    | [`InternalServerException`](image-kit-java-core/src/main/kotlin/com/imagekit/api/errors/InternalServerException.kt)       |\n  | others | [`UnexpectedStatusCodeException`](image-kit-java-core/src/main/kotlin/com/imagekit/api/errors/UnexpectedStatusCodeException.kt) |\n\n- [`ImageKitIoException`](image-kit-java-core/src/main/kotlin/com/imagekit/api/errors/ImageKitIoException.kt): I/O networking errors.\n\n- [`ImageKitRetryableException`](image-kit-java-core/src/main/kotlin/com/imagekit/api/errors/ImageKitRetryableException.kt): Generic error indicating a failure that could be retried by the client.\n\n- [`ImageKitInvalidDataException`](image-kit-java-core/src/main/kotlin/com/imagekit/api/errors/ImageKitInvalidDataException.kt): Failure to interpret successfully parsed data. For example,       when accessing a property that\'s supposed to be required, but the API unexpectedly omitted it from the       response.\n\n- [`ImageKitException`](image-kit-java-core/src/main/kotlin/com/imagekit/api/errors/ImageKitException.kt): Base class for all exceptions. Most errors will result in one of the       previously mentioned ones, but completely generic errors may be thrown using the base class.\n\n\n\n## Logging\n\nThe SDK uses the standard   [OkHttp logging interceptor](https://github.com/square/okhttp/tree/master/okhttp-logging-interceptor).\n\nEnable logging by setting the `IMAGE_KIT_LOG` environment variable to   `info`:\n\n```sh\nexport IMAGE_KIT_LOG=info\n```\n\nOr to `debug` for more verbose logging:\n\n```sh\nexport IMAGE_KIT_LOG=debug\n```\n\n## ProGuard and R8\n\nAlthough the SDK uses reflection, it is still usable with     [ProGuard](https://github.com/Guardsquare/proguard) and     [R8](https://developer.android.com/topic/performance/app-optimization/enable-app-optimization) because     `image-kit-java-core` is published with a     [configuration file](image-kit-java-core/src/main/resources/META-INF/proguard/image-kit-java-core.pro) containing     [keep rules](https://www.guardsquare.com/manual/configuration/usage).\n\nProGuard and R8 should automatically detect and use the published rules, but you can also manually copy     the keep rules if necessary.\n\n\n\n\n\n## Jackson\n\nThe SDK depends on [Jackson](https://github.com/FasterXML/jackson) for JSON     serialization/deserialization. It is compatible with version 2.13.4 or higher,     but depends on version 2.18.2 by default.\n\nThe SDK throws an exception if it detects an incompatible Jackson version at runtime (e.g. if the     default version was overridden in your Maven or Gradle config).\n\nIf the SDK threw an exception, but you\'re _certain_ the version is compatible, then disable the version     check using the `checkJacksonVersionCompatibility` on [`ImageKitOkHttpClient`](image-kit-java-client-okhttp/src/main/kotlin/com/imagekit/api/client/okhttp/ImageKitOkHttpClient.kt) or     [`ImageKitOkHttpClientAsync`](image-kit-java-client-okhttp/src/main/kotlin/com/imagekit/api/client/okhttp/ImageKitOkHttpClientAsync.kt).\n\n> [!CAUTION]\n> We make no guarantee that the SDK works correctly when the Jackson version check is disabled.\n\nAlso note that there are bugs in older Jackson versions that can affect the SDK. We don\'t work around all     Jackson bugs ([example](https://github.com/FasterXML/jackson-databind/issues/3240)) and expect users to     upgrade Jackson for those instead.\n\n## Network options\n\n### Retries\n\nThe SDK automatically retries 2 times by default, with a short exponential backoff between requests.\n\nOnly the following error types are retried:\n- Connection errors (for example, due to a network connectivity problem)\n- 408 Request Timeout\n- 409 Conflict\n- 429 Rate Limit\n- 5xx Internal\n\nThe API may also explicitly instruct the SDK to retry or not retry a request.\n\nTo set a custom number of retries, configure the client using the `maxRetries` method:\n\n```java\nimport com.imagekit.api.client.ImageKitClient;\nimport com.imagekit.api.client.okhttp.ImageKitOkHttpClient;\n\nImageKitClient client = ImageKitOkHttpClient.builder()\n    .fromEnv()\n    .maxRetries(4)\n    .build();\n```\n\n### Timeouts\n\nRequests time out after 1 minute by default.\n\nTo set a custom timeout, configure the method call using the `timeout` method:\n\n```java\nimport com.imagekit.api.models.files.FileUploadResponse;\n\nFileUploadResponse response = client.files().upload(\n  params, RequestOptions.builder().timeout(Duration.ofSeconds(30)).build()\n);\n```\n\nOr configure the default for all method calls at the client level:\n\n```java\nimport com.imagekit.api.client.ImageKitClient;\nimport com.imagekit.api.client.okhttp.ImageKitOkHttpClient;\nimport java.time.Duration;\n\nImageKitClient client = ImageKitOkHttpClient.builder()\n    .fromEnv()\n    .timeout(Duration.ofSeconds(30))\n    .build();\n```\n\n### Proxies\n\nTo route requests through a proxy, configure the client using the `proxy` method:\n\n```java\nimport com.imagekit.api.client.ImageKitClient;\nimport com.imagekit.api.client.okhttp.ImageKitOkHttpClient;\nimport java.net.InetSocketAddress;\nimport java.net.Proxy;\n\nImageKitClient client = ImageKitOkHttpClient.builder()\n    .fromEnv()\n    .proxy(new Proxy(\n      Proxy.Type.HTTP, new InetSocketAddress(\n        "https://example.com", 8080\n      )\n    ))\n    .build();\n```\n\n### Connection pooling\n\nTo customize the underlying OkHttp connection pool, configure the client using the   `maxIdleConnections` and `keepAliveDuration` methods:\n\n```java\nimport com.imagekit.api.client.ImageKitClient;\nimport com.imagekit.api.client.okhttp.ImageKitOkHttpClient;\nimport java.time.Duration;\n\nImageKitClient client = ImageKitOkHttpClient.builder()\n    .fromEnv()\n    // If `maxIdleConnections` is set, then `keepAliveDuration` must be set, and vice versa.\n    .maxIdleConnections(10)\n    .keepAliveDuration(Duration.ofMinutes(2))\n    .build();\n```\n\nIf both options are unset, OkHttp\'s default connection pool settings are used.\n\n### HTTPS\n\n> [!NOTE]\n> Most applications should not call these methods, and instead use the system defaults. The defaults include\n> special optimizations that can be lost if the implementations are modified.\n\nTo configure how HTTPS connections are secured, configure the client using the `sslSocketFactory`,   `trustManager`, and `hostnameVerifier` methods:\n\n```java\nimport com.imagekit.api.client.ImageKitClient;\nimport com.imagekit.api.client.okhttp.ImageKitOkHttpClient;\n\nImageKitClient client = ImageKitOkHttpClient.builder()\n    .fromEnv()\n    // If `sslSocketFactory` is set, then `trustManager` must be set, and vice versa.\n    .sslSocketFactory(yourSSLSocketFactory)\n    .trustManager(yourTrustManager)\n    .hostnameVerifier(yourHostnameVerifier)\n    .build();\n```\n\n\n\n### Custom HTTP client\n\nThe SDK consists of three artifacts:\n- `image-kit-java-core`\n  - Contains core SDK logic\n  - Does not depend on [OkHttp](https://square.github.io/okhttp)\n  - Exposes [`ImageKitClient`](image-kit-java-core/src/main/kotlin/com/imagekit/api/client/ImageKitClient.kt), [`ImageKitClientAsync`](image-kit-java-core/src/main/kotlin/com/imagekit/api/client/ImageKitClientAsync.kt),             [`ImageKitClientImpl`](image-kit-java-core/src/main/kotlin/com/imagekit/api/client/ImageKitClientImpl.kt), and [`ImageKitClientAsyncImpl`](image-kit-java-core/src/main/kotlin/com/imagekit/api/client/ImageKitClientAsyncImpl.kt), all of which can             work with any HTTP client\n- `image-kit-java-client-okhttp`\n  - Depends on [OkHttp](https://square.github.io/okhttp)\n  - Exposes [`ImageKitOkHttpClient`](image-kit-java-client-okhttp/src/main/kotlin/com/imagekit/api/client/okhttp/ImageKitOkHttpClient.kt) and [`ImageKitOkHttpClientAsync`](image-kit-java-client-okhttp/src/main/kotlin/com/imagekit/api/client/okhttp/ImageKitOkHttpClientAsync.kt), which             provide a way to construct [`ImageKitClientImpl`](image-kit-java-core/src/main/kotlin/com/imagekit/api/client/ImageKitClientImpl.kt) and             [`ImageKitClientAsyncImpl`](image-kit-java-core/src/main/kotlin/com/imagekit/api/client/ImageKitClientAsyncImpl.kt), respectively, using OkHttp\n- `image-kit-java`\n  - Depends on and exposes the APIs of both `image-kit-java-core` and `image-kit-java-client-okhttp`\n  - Does not have its own logic\n\nThis structure allows replacing the SDK\'s default HTTP client without pulling in unnecessary dependencies.\n\n#### Customized [`OkHttpClient`](https://square.github.io/okhttp/3.x/okhttp/okhttp3/OkHttpClient.html)\n\n> [!TIP]\n> Try the available [network options](#network-options) before replacing the default client.\n\nTo use a customized `OkHttpClient`:\n\n1. Replace your [`image-kit-java` dependency](#installation) with `image-kit-java-core`\n2. Copy `image-kit-java-client-okhttp`\'s [`OkHttpClient`](image-kit-java-client-okhttp/src/main/kotlin/com/imagekit/api/client/okhttp/OkHttpClient.kt) class into your code and        customize it\n3. Construct [`ImageKitClientImpl`](image-kit-java-core/src/main/kotlin/com/imagekit/api/client/ImageKitClientImpl.kt) or [`ImageKitClientAsyncImpl`](image-kit-java-core/src/main/kotlin/com/imagekit/api/client/ImageKitClientAsyncImpl.kt), similarly to        [`ImageKitOkHttpClient`](image-kit-java-client-okhttp/src/main/kotlin/com/imagekit/api/client/okhttp/ImageKitOkHttpClient.kt) or [`ImageKitOkHttpClientAsync`](image-kit-java-client-okhttp/src/main/kotlin/com/imagekit/api/client/okhttp/ImageKitOkHttpClientAsync.kt), using your        customized client\n\n### Completely custom HTTP client\n\nTo use a completely custom HTTP client:\n\n1. Replace your [`image-kit-java` dependency](#installation) with `image-kit-java-core`\n2. Write a class that implements the [`HttpClient`](image-kit-java-core/src/main/kotlin/com/imagekit/api/core/http/HttpClient.kt) interface\n3. Construct [`ImageKitClientImpl`](image-kit-java-core/src/main/kotlin/com/imagekit/api/client/ImageKitClientImpl.kt) or [`ImageKitClientAsyncImpl`](image-kit-java-core/src/main/kotlin/com/imagekit/api/client/ImageKitClientAsyncImpl.kt), similarly to        [`ImageKitOkHttpClient`](image-kit-java-client-okhttp/src/main/kotlin/com/imagekit/api/client/okhttp/ImageKitOkHttpClient.kt) or [`ImageKitOkHttpClientAsync`](image-kit-java-client-okhttp/src/main/kotlin/com/imagekit/api/client/okhttp/ImageKitOkHttpClientAsync.kt), using your new        client class\n\n## Undocumented API functionality\n\nThe SDK is typed for convenient usage of the documented API. However, it also supports working with undocumented or not yet supported parts of the API.\n\n### Parameters\n\nTo set undocumented parameters, call the `putAdditionalHeader`, `putAdditionalQueryParam`, or       `putAdditionalBodyProperty` methods on any `Params` class:\n\n```java\nimport com.imagekit.api.core.JsonValue;\nimport com.imagekit.api.models.files.FileUploadParams;\n\nFileUploadParams params = FileUploadParams.builder()\n    .putAdditionalHeader("Secret-Header", "42")\n    .putAdditionalQueryParam("secret_query_param", "42")\n    .putAdditionalBodyProperty("secretProperty", JsonValue.from("42"))\n    .build();\n```\n\nThese can be accessed on the built object later using the `_additionalHeaders()`,       `_additionalQueryParams()`, and `_additionalBodyProperties()` methods.\n\nTo set undocumented parameters on _nested_ headers, query params, or body classes, call the         `putAdditionalProperty` method on the nested class:\n\n```java\nimport com.imagekit.api.core.JsonValue;\nimport com.imagekit.api.models.files.FileUploadParams;\n\nFileUploadParams params = FileUploadParams.builder()\n    .transformation(FileUploadParams.Transformation.builder()\n        .putAdditionalProperty("secretProperty", JsonValue.from("42"))\n        .build())\n    .build();\n```\n\nThese properties can be accessed on the nested built object later using the         `_additionalProperties()` method.\n\nTo set a documented parameter or property to an undocumented or not yet supported _value_, pass a       [`JsonValue`](image-kit-java-core/src/main/kotlin/com/imagekit/api/core/Values.kt) object to its setter:\n\n```java\nimport com.imagekit.api.core.JsonValue;\nimport com.imagekit.api.models.files.FileUploadParams;\n\nFileUploadParams params = FileUploadParams.builder()\n    .file(JsonValue.from(42))\n    .fileName("file-name.jpg")\n    .build();\n```\n\nThe most straightforward way to create a [`JsonValue`](image-kit-java-core/src/main/kotlin/com/imagekit/api/core/Values.kt) is using its       `from(...)` method:\n\n```java\nimport com.imagekit.api.core.JsonValue;\nimport java.util.List;\nimport java.util.Map;\n\n// Create primitive JSON values\nJsonValue nullValue = JsonValue.from(null);\nJsonValue booleanValue = JsonValue.from(true);\nJsonValue numberValue = JsonValue.from(42);\nJsonValue stringValue = JsonValue.from("Hello World!");\n\n// Create a JSON array value equivalent to `["Hello", "World"]`\nJsonValue arrayValue = JsonValue.from(List.of(\n  "Hello", "World"\n));\n\n// Create a JSON object value equivalent to `{ "a": 1, "b": 2 }`\nJsonValue objectValue = JsonValue.from(Map.of(\n  "a", 1,\n  "b", 2\n));\n\n// Create an arbitrarily nested JSON equivalent to:\n// {\n//   "a": [1, 2],\n//   "b": [3, 4]\n// }\nJsonValue complexValue = JsonValue.from(Map.of(\n  "a", List.of(\n    1, 2\n  ),\n  "b", List.of(\n    3, 4\n  )\n));\n```\n\nNormally a `Builder` class\'s `build` method will throw         [`IllegalStateException`](https://docs.oracle.com/javase/8/docs/api/java/lang/IllegalStateException.html)         if any required parameter or property is unset.\n\nTo forcibly omit a required parameter or property, pass [`JsonMissing`](image-kit-java-core/src/main/kotlin/com/imagekit/api/core/Values.kt):\n\n```java\nimport com.imagekit.api.core.JsonMissing;\nimport com.imagekit.api.models.files.FileUploadParams;\n\nFileUploadParams params = FileUploadParams.builder()\n    .fileName("fileName")\n    .file(JsonMissing.of())\n    .build();\n```\n\n### Response properties\n\nTo access undocumented response properties, call the `_additionalProperties()` method:\n\n```java\nimport com.imagekit.api.core.JsonValue;\nimport java.util.Map;\n\nMap<String, JsonValue> additionalProperties = client.files().upload(params)._additionalProperties();\nJsonValue secretPropertyValue = additionalProperties.get("secretProperty");\n\nString result = secretPropertyValue.accept(new JsonValue.Visitor<>() {\n    @Override\n    public String visitNull() {\n        return "It\'s null!";\n    }\n\n    @Override\n    public String visitBoolean(boolean value) {\n        return "It\'s a boolean!";\n    }\n\n    @Override\n    public String visitNumber(Number value) {\n        return "It\'s a number!";\n    }\n\n    // Other methods include `visitMissing`, `visitString`, `visitArray`, and `visitObject`\n    // The default implementation of each unimplemented method delegates to `visitDefault`, which throws by default, but can also be overridden\n});\n```\n\nTo access a property\'s raw JSON value, which may be undocumented, call its `_` prefixed method:\n\n```java\nimport com.imagekit.api.core.JsonField;\nimport java.io.InputStream;\nimport java.util.Optional;\n\nJsonField<InputStream> file = client.files().upload(params)._file();\n\nif (file.isMissing()) {\n  // The property is absent from the JSON response\n} else if (file.isNull()) {\n  // The property was set to literal null\n} else {\n  // Check if value was provided as a string\n  // Other methods include `asNumber()`, `asBoolean()`, etc.\n  Optional<String> jsonString = file.asString();\n\n  // Try to deserialize into a custom type\n  MyClass myObject = file.asUnknown().orElseThrow().convert(MyClass.class);\n}\n```\n\n### Response validation\n\nIn rare cases, the API may return a response that doesn\'t match the expected type. For example, the SDK     may expect a property to contain a `String`, but the API could return something else.\n\nBy default, the SDK will not throw an exception in this case. It will throw     [`ImageKitInvalidDataException`](image-kit-java-core/src/main/kotlin/com/imagekit/api/errors/ImageKitInvalidDataException.kt) only if you directly access the property.\n\nIf you would prefer to check that the response is completely well-typed upfront, then either call     `validate()`:\n\n```java\nimport com.imagekit.api.models.files.FileUploadResponse;\n\nFileUploadResponse response = client.files().upload(params).validate();\n```\n\nOr configure the method call to validate the response using the `responseValidation` method:\n\n```java\nimport com.imagekit.api.models.files.FileUploadResponse;\n\nFileUploadResponse response = client.files().upload(\n  params, RequestOptions.builder().responseValidation(true).build()\n);\n```\n\nOr configure the default for all method calls at the client level:\n\n```java\nimport com.imagekit.api.client.ImageKitClient;\nimport com.imagekit.api.client.okhttp.ImageKitOkHttpClient;\n\nImageKitClient client = ImageKitOkHttpClient.builder()\n    .fromEnv()\n    .responseValidation(true)\n    .build();\n```\n\n## FAQ\n\n### Why don\'t you use plain `enum` classes?\n\nJava `enum` classes are not trivially   [forwards compatible](https://www.stainless.com/blog/making-java-enums-forwards-compatible). Using them in   the SDK could cause runtime exceptions if the API is updated to respond with a new enum value.\n\n### Why do you represent fields using `JsonField<T>` instead of just plain `T`?\n\nUsing `JsonField<T>` enables a few features:\n\n- Allowing usage of [undocumented API functionality](#undocumented-api-functionality)\n- Lazily [validating the API response against the expected shape](#response-validation)\n- Representing absent vs explicitly null values\n\n### Why don\'t you use [`data` classes](https://kotlinlang.org/docs/data-classes.html)?\n\nIt is not [backwards compatible to add new fields to a data class](https://kotlinlang.org/docs/api-guidelines-backward-compatibility.html#avoid-using-data-classes-in-your-api)   and we don\'t want to introduce a breaking change every time we add a field to a class.\n\n### Why don\'t you use checked exceptions?\n\nChecked exceptions are widely considered a mistake in the Java programming language. In fact, they were   omitted from Kotlin for this reason.\n\nChecked exceptions:\n\n- Are verbose to handle\n- Encourage error handling at the wrong level of abstraction, where nothing can be done about the error\n- Are tedious to propagate due to the [function coloring problem](https://journal.stuffwithstuff.com/2015/02/01/what-color-is-your-function)\n- Don\'t play well with lambdas (also due to the function coloring problem)\n\n## Semantic versioning\n\nThis package generally follows [SemVer](https://semver.org/spec/v2.0.0.html) conventions, though certain backwards-incompatible changes may be released as minor versions:\n\n1. Changes to library internals which are technically public but not intended or documented for external use. _(Please open a GitHub issue to let us know if you are relying on such internals.)_\n2. Changes that we do not expect to impact the vast majority of users in practice.\n\nWe take backwards-compatibility seriously and work hard to ensure you can rely on a smooth upgrade experience.\n\nWe are keen for your feedback; please open an [issue](https://www.github.com/stainless-sdks/imagekit-java/issues) with questions, bugs, or suggestions.\n',
  },
  {
    language: 'csharp',
    content:
      '# Image Kit C# API Library\n\nThe Image Kit C# SDK provides convenient access to the [Image Kit REST API](https://imagekit.io/docs/api-reference) from applications written in   C#.\n\n## Installation\n\n```bash\ngit clone git@github.com:stainless-sdks/imagekit-csharp.git\ndotnet add reference imagekit-csharp/src/ImageKit\n```\n\n## Requirements\n\nThis library requires .NET Standard 2.0 or later.\n\n## Usage\n\nSee the [`examples`](examples) directory for complete and runnable examples.\n\n```csharp\nImageKitClient client = new();\n\nFileUploadParams parameters = new()\n{\n    File = Encoding.UTF8.GetBytes("https://www.example.com/public-url.jpg"),\n    FileName = "file-name.jpg",\n};\n\nvar response = await client.Files.Upload(parameters);\n\nConsole.WriteLine(response);\n```',
  },
  {
    language: 'cli',
    content:
      "# Image Kit CLI\n\nThe official CLI for the [Image Kit REST API](https://imagekit.io/docs/api-reference).\n\n## Installation\n\n### Installing with Go\n\nTo test or install the CLI locally, you need [Go](https://go.dev/doc/install) version 1.22 or later installed.\n\n~~~sh\ngo install 'github.com/stainless-sdks/imagekit-cli/cmd/imagekit@latest'\n~~~\n\nOnce you have run `go install`, the binary is placed in your Go bin directory:\n\n- **Default location**: `$HOME/go/bin` (or `$GOPATH/bin` if GOPATH is set)\n- **Check your path**: Run `go env GOPATH` to see the base directory\n\nIf commands aren't found after installation, add the Go bin directory to your PATH:\n\n~~~sh\n# Add to your shell profile (.zshrc, .bashrc, etc.)\nexport PATH=\"$PATH:$(go env GOPATH)/bin\"\n~~~\n\n### Running Locally\n\nAfter cloning the git repository for this project, you can use the\n`scripts/run` script to run the tool locally:\n\n~~~sh\n./scripts/run args...\n~~~\n\n## Usage\n\nThe CLI follows a resource-based command structure:\n\n~~~sh\nimagekit [resource] <command> [flags...]\n~~~\n\n~~~sh\nimagekit files upload \\\n  --private-key 'My Private Key' \\\n  --password 'My Password' \\\n  --file 'Example data' \\\n  --file-name file-name.jpg\n~~~\n\nFor details about specific commands, use the `--help` flag.\n\n### Environment variables\n\n| Environment variable             | Description                                                                                                                                                                                                                     | Required | Default value  |\n| -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | -------------- |\n| `IMAGEKIT_PRIVATE_KEY`           | Your ImageKit private API key (starts with `private_`).\nYou can find this in the [ImageKit dashboard](https://imagekit.io/dashboard/developer/api-keys).\n                                                                       | yes      |                |\n| `OPTIONAL_IMAGEKIT_IGNORES_THIS` | ImageKit uses your API key as username and ignores the password. \nThe SDK sets a dummy value. You can ignore this field.\n                                                                                                       | no       | `\"do_not_set\"` |\n| `IMAGEKIT_WEBHOOK_SECRET`        | Your ImageKit webhook secret for verifying webhook signatures (starts with `whsec_`).\nYou can find this in the [ImageKit dashboard](https://imagekit.io/dashboard/developer/webhooks).\nOnly required if you're using webhooks.\n | no       | `null`         |\n\n### Global flags\n\n- `--private-key` - Your ImageKit private API key (starts with `private_`).\nYou can find this in the [ImageKit dashboard](https://imagekit.io/dashboard/developer/api-keys).\n (can also be set with `IMAGEKIT_PRIVATE_KEY` env var)\n- `--password` - ImageKit uses your API key as username and ignores the password. \nThe SDK sets a dummy value. You can ignore this field.\n (can also be set with `OPTIONAL_IMAGEKIT_IGNORES_THIS` env var)\n- `--webhook-secret` - Your ImageKit webhook secret for verifying webhook signatures (starts with `whsec_`).\nYou can find this in the [ImageKit dashboard](https://imagekit.io/dashboard/developer/webhooks).\nOnly required if you're using webhooks.\n (can also be set with `IMAGEKIT_WEBHOOK_SECRET` env var)\n- `--help` - Show command line usage\n- `--debug` - Enable debug logging (includes HTTP request/response details)\n- `--version`, `-v` - Show the CLI version\n- `--base-url` - Use a custom API backend URL\n- `--format` - Change the output format (`auto`, `explore`, `json`, `jsonl`, `pretty`, `raw`, `yaml`)\n- `--format-error` - Change the output format for errors (`auto`, `explore`, `json`, `jsonl`, `pretty`, `raw`, `yaml`)\n- `--transform` - Transform the data output using [GJSON syntax](https://github.com/tidwall/gjson/blob/master/SYNTAX.md)\n- `--transform-error` - Transform the error output using [GJSON syntax](https://github.com/tidwall/gjson/blob/master/SYNTAX.md)\n\n### Passing files as arguments\n\nTo pass files to your API, you can use the `@myfile.ext` syntax:\n\n~~~bash\nimagekit <command> --arg @abe.jpg\n~~~\n\nFiles can also be passed inside JSON or YAML blobs:\n\n~~~bash\nimagekit <command> --arg '{image: \"@abe.jpg\"}'\n# Equivalent:\nimagekit <command> <<YAML\narg:\n  image: \"@abe.jpg\"\nYAML\n~~~\n\nIf you need to pass a string literal that begins with an `@` sign, you can\nescape the `@` sign to avoid accidentally passing a file.\n\n~~~bash\nimagekit <command> --username '\\@abe'\n~~~\n\n#### Explicit encoding\n\nFor JSON endpoints, the CLI tool does filetype sniffing to determine whether the\nfile contents should be sent as a string literal (for plain text files) or as a\nbase64-encoded string literal (for binary files). If you need to explicitly send\nthe file as either plain text or base64-encoded data, you can use\n`@file://myfile.txt` (for string encoding) or `@data://myfile.dat` (for\nbase64-encoding). Note that absolute paths will begin with `@file://` or\n`@data://`, followed by a third `/` (for example, `@file:///tmp/file.txt`).\n\n~~~bash\nimagekit <command> --arg @data://file.txt\n~~~\n",
  },
  {
    language: 'php',
    content:
      '# Image Kit PHP API Library\n\nThe Image Kit PHP library provides convenient access to the Image Kit REST API from any PHP 8.1.0+ application.\n\n## Installation\n\nTo use this package, install via Composer by adding the following to your application\'s `composer.json`:\n\n```json\n{\n  "repositories": [\n    {\n      "type": "vcs",\n      "url": "git@github.com:stainless-sdks/imagekit-php.git"\n    }\n  ],\n  "require": {\n    "imagekit/imagekit": "dev-main"\n  }\n}\n```\n\n## Usage\n\n```php\n<?php\n\n$client = new Client(\n  privateKey: getenv(\'IMAGEKIT_PRIVATE_KEY\') ?: \'My Private Key\',\n  password: getenv(\'OPTIONAL_IMAGEKIT_IGNORES_THIS\') ?: \'do_not_set\',\n);\n\n$response = $client->files->upload(\n  file: FileParam::fromString(\'https://www.example.com/public-url.jpg\', filename: uniqid(\'file-upload-\', true)),\n  fileName: \'file-name.jpg\',\n);\n\nvar_dump($response->videoCodec);\n```',
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
