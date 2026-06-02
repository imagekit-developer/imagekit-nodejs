// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { buildHeaders } from '../internal/headers';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class CustomMetadataFields extends APIResource {
  /**
   * This API returns the array of created custom metadata field objects. By default
   * the API returns only non deleted field objects, but you can include deleted
   * fields in the API response.
   *
   * You can also filter results by a specific folder path to retrieve custom
   * metadata fields applicable at that location. This path-specific filtering is
   * useful when using the **Path policy** feature to determine which custom metadata
   * fields are selected for a given path.
   *
   * @example
   * ```ts
   * const customMetadataFields =
   *   await client.customMetadataFields.list();
   * ```
   */
  list(
    query: CustomMetadataFieldListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<CustomMetadataFieldListResponse> {
    return this._client.get('/v2/custom-metadata-fields', { query, ...options });
  }

  /**
   * This API creates a new custom metadata field. Once a custom metadata field is
   * created either through this API or using the dashboard UI, its value can be set
   * on the assets. The value of a field for an asset can be set using the media
   * library UI or programmatically through upload or update assets API.
   *
   * @example
   * ```ts
   * const customMetadataField =
   *   await client.customMetadataFields.create({
   *     label: 'price',
   *     name: 'price',
   *     schema: {
   *       type: 'Number',
   *       min_value: 1000,
   *       max_value: 3000,
   *     },
   *   });
   * ```
   */
  create(body: CustomMetadataFieldCreateParams, options?: RequestOptions): APIPromise<CustomMetadataField> {
    return this._client.post('/v2/custom-metadata-fields', { body, ...options });
  }

  /**
   * This API updates the label or schema of an existing custom metadata field.
   *
   * @example
   * ```ts
   * const customMetadataField =
   *   await client.customMetadataFields.update('id', {
   *     label: 'price',
   *     schema: { min_value: 1000, max_value: 3000 },
   *   });
   * ```
   */
  update(
    id: string,
    body: CustomMetadataFieldUpdateParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<CustomMetadataField> {
    return this._client.patch(path`/v2/custom-metadata-fields/${id}`, { body, ...options });
  }

  /**
   * This API deletes a custom metadata field. Even after deleting a custom metadata
   * field, you cannot create any new custom metadata field with the same name.
   *
   * @example
   * ```ts
   * await client.customMetadataFields.delete('id');
   * ```
   */
  delete(id: string, options?: RequestOptions): APIPromise<void> {
    return this._client.delete(path`/v2/custom-metadata-fields/${id}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }
}

/**
 * Object containing details of a custom metadata field.
 */
export interface CustomMetadataField {
  /**
   * Unique identifier for the custom metadata field. Use this to update the field.
   */
  id: string;

  /**
   * Human readable name of the custom metadata field. This name is displayed as form
   * field label to the users while setting field value on the asset in the media
   * library UI.
   */
  label: string;

  /**
   * API name of the custom metadata field. This becomes the key while setting
   * `customMetadata` (key-value object) for an asset using upload or update API.
   */
  name: string;

  /**
   * Schema rules for a custom metadata field value.
   */
  schema: CustomMetadataFieldSchema;
}

/**
 * Schema rules for a custom metadata field value.
 */
export interface CustomMetadataFieldSchema {
  /**
   * Type of the custom metadata field.
   */
  type: 'Text' | 'Textarea' | 'Number' | 'Date' | 'Boolean' | 'SingleSelect' | 'MultiSelect';

  /**
   * The default value for this custom metadata field. Data type of default value
   * depends on the field type.
   */
  default_value?: string | number | boolean | Array<string | number | boolean>;

  /**
   * Specifies if the custom metadata field is required or not.
   */
  is_value_required?: boolean;

  /**
   * Maximum length of string. Only set if `type` is set to `Text` or `Textarea`.
   */
  max_length?: number;

  /**
   * Maximum value of the field. Only set if field type is `Date` or `Number`. For
   * `Date` type field, the value will be in ISO8601 string format. For `Number` type
   * field, it will be a numeric value.
   */
  max_value?: string | number;

  /**
   * Minimum length of string. Only set if `type` is set to `Text` or `Textarea`.
   */
  min_length?: number;

  /**
   * Minimum value of the field. Only set if field type is `Date` or `Number`. For
   * `Date` type field, the value will be in ISO8601 string format. For `Number` type
   * field, it will be a numeric value.
   */
  min_value?: string | number;

  /**
   * An array of allowed values when field type is `SingleSelect` or `MultiSelect`.
   */
  select_options?: Array<string | number | boolean>;
}

export type CustomMetadataFieldListResponse = Array<CustomMetadataField>;

export interface CustomMetadataFieldListParams {
  /**
   * The folder path (e.g., `/path/to/folder`) for which to retrieve applicable
   * custom metadata fields. Useful for determining path-specific field selections
   * when the [Path policy](https://imagekit.io/docs/dam/path-policy) feature is in
   * use.
   */
  folder_path?: string;

  /**
   * Set it to `true` to include deleted field objects in the API response.
   */
  include_deleted?: boolean;
}

export interface CustomMetadataFieldCreateParams {
  /**
   * Human readable name of the custom metadata field. This should be unique across
   * all non deleted custom metadata fields. This name is displayed as form field
   * label to the users while setting field value on an asset in the media library
   * UI.
   */
  label: string;

  /**
   * API name of the custom metadata field. This should be unique across all
   * (including deleted) custom metadata fields.
   */
  name: string;

  schema: CustomMetadataFieldCreateParams.Schema;
}

export namespace CustomMetadataFieldCreateParams {
  export interface Schema {
    /**
     * Type of the custom metadata field.
     */
    type: 'Text' | 'Textarea' | 'Number' | 'Date' | 'Boolean' | 'SingleSelect' | 'MultiSelect';

    /**
     * The default value for this custom metadata field. This property is only required
     * if `is_value_required` property is set to `true`. The value should match the
     * `type` of custom metadata field.
     */
    default_value?: string | number | boolean | Array<string | number | boolean>;

    /**
     * Sets this custom metadata field as required. Setting custom metadata fields on
     * an asset will throw error if the value for all required fields are not present
     * in upload or update asset API request body.
     */
    is_value_required?: boolean;

    /**
     * Maximum length of string. Only set this property if `type` is set to `Text` or
     * `Textarea`.
     */
    max_length?: number;

    /**
     * Maximum value of the field. Only set this property if field type is `Date` or
     * `Number`. For `Date` type field, set the minimum date in ISO8601 string format.
     * For `Number` type field, set the minimum numeric value.
     */
    max_value?: string | number;

    /**
     * Minimum length of string. Only set this property if `type` is set to `Text` or
     * `Textarea`.
     */
    min_length?: number;

    /**
     * Minimum value of the field. Only set this property if field type is `Date` or
     * `Number`. For `Date` type field, set the minimum date in ISO8601 string format.
     * For `Number` type field, set the minimum numeric value.
     */
    min_value?: string | number;

    /**
     * An array of allowed values. This property is only required if `type` property is
     * set to `SingleSelect` or `MultiSelect`.
     */
    select_options?: Array<string | number | boolean>;
  }
}

export interface CustomMetadataFieldUpdateParams {
  /**
   * Human readable name of the custom metadata field. This should be unique across
   * all non deleted custom metadata fields. This name is displayed as form field
   * label to the users while setting field value on an asset in the media library
   * UI. This parameter is required if `schema` is not provided.
   */
  label?: string;

  /**
   * An object that describes the rules for the custom metadata key. This parameter
   * is required if `label` is not provided. Note: `type` cannot be updated and will
   * be ignored if sent with the `schema`. The schema will be validated as per the
   * existing `type`.
   */
  schema?: CustomMetadataFieldUpdateParams.Schema;
}

export namespace CustomMetadataFieldUpdateParams {
  /**
   * An object that describes the rules for the custom metadata key. This parameter
   * is required if `label` is not provided. Note: `type` cannot be updated and will
   * be ignored if sent with the `schema`. The schema will be validated as per the
   * existing `type`.
   */
  export interface Schema {
    /**
     * The default value for this custom metadata field. This property is only required
     * if `is_value_required` property is set to `true`. The value should match the
     * `type` of custom metadata field.
     */
    default_value?: string | number | boolean | Array<string | number | boolean>;

    /**
     * Sets this custom metadata field as required. Setting custom metadata fields on
     * an asset will throw error if the value for all required fields are not present
     * in upload or update asset API request body.
     */
    is_value_required?: boolean;

    /**
     * Maximum length of string. Only set this property if `type` is set to `Text` or
     * `Textarea`.
     */
    max_length?: number;

    /**
     * Maximum value of the field. Only set this property if field type is `Date` or
     * `Number`. For `Date` type field, set the minimum date in ISO8601 string format.
     * For `Number` type field, set the minimum numeric value.
     */
    max_value?: string | number;

    /**
     * Minimum length of string. Only set this property if `type` is set to `Text` or
     * `Textarea`.
     */
    min_length?: number;

    /**
     * Minimum value of the field. Only set this property if field type is `Date` or
     * `Number`. For `Date` type field, set the minimum date in ISO8601 string format.
     * For `Number` type field, set the minimum numeric value.
     */
    min_value?: string | number;

    /**
     * An array of allowed values. This property is only required if `type` property is
     * set to `SingleSelect` or `MultiSelect`.
     */
    select_options?: Array<string | number | boolean>;
  }
}

export declare namespace CustomMetadataFields {
  export {
    type CustomMetadataField as CustomMetadataField,
    type CustomMetadataFieldSchema as CustomMetadataFieldSchema,
    type CustomMetadataFieldListResponse as CustomMetadataFieldListResponse,
    type CustomMetadataFieldListParams as CustomMetadataFieldListParams,
    type CustomMetadataFieldCreateParams as CustomMetadataFieldCreateParams,
    type CustomMetadataFieldUpdateParams as CustomMetadataFieldUpdateParams,
  };
}
