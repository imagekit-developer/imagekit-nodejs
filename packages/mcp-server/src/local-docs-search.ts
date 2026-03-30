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
  },
];

const EMBEDDED_READMES: { language: string; content: string }[] = [];

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
