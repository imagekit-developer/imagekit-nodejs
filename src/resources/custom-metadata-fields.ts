// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class CustomMetadataFields extends APIResource {
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
   *       minValue: 1000,
   *       maxValue: 3000,
   *     },
   *   });
   * ```
   */
  create(body: CustomMetadataFieldCreateParams, options?: RequestOptions): APIPromise<CustomMetadataField> {
    return this._client.post('/v1/customMetadataFields', { body, ...options });
  }

  /**
   * This API updates the label or schema of an existing custom metadata field.
   *
   * @example
   * ```ts
   * const customMetadataField =
   *   await client.customMetadataFields.update('id', {
   *     label: 'price',
   *     schema: {
   *       type: 'Number',
   *       minValue: 1000,
   *       maxValue: 3000,
   *     },
   *   });
   * ```
   */
  update(
    id: string,
    body: CustomMetadataFieldUpdateParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<CustomMetadataField> {
    return this._client.patch(path`/v1/customMetadataFields/${id}`, { body, ...options });
  }

  /**
   * This API returns the array of created custom metadata field objects. By default
   * the API returns only non deleted field objects, but you can include deleted
   * fields in the API response.
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
    return this._client.get('/v1/customMetadataFields', { query, ...options });
  }

  /**
   * This API deletes a custom metadata field. Even after deleting a custom metadata
   * field, you cannot create any new custom metadata field with the same name.
   *
   * @example
   * ```ts
   * const customMetadataField =
   *   await client.customMetadataFields.delete('id');
   * ```
   */
  delete(id: string, options?: RequestOptions): APIPromise<CustomMetadataFieldDeleteResponse> {
    return this._client.delete(path`/v1/customMetadataFields/${id}`, options);
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
   * An object that describes the rules for the custom metadata field value.
   */
  schema: CustomMetadataField.Schema;
}

export namespace CustomMetadataField {
  /**
   * An object that describes the rules for the custom metadata field value.
   */
  export interface Schema {
    /**
     * Type of the custom metadata field.
     */
    type: 'Text' | 'Textarea' | 'Number' | 'Date' | 'Boolean' | 'SingleSelect' | 'MultiSelect';

    /**
     * The default value for this custom metadata field. Date type of default value
     * depends on the field type.
     */
    defaultValue?: string | number | boolean | Array<string | number | boolean>;

    /**
     * Specifies if the this custom metadata field is required or not.
     */
    isValueRequired?: boolean;

    /**
     * Maximum length of string. Only set if `type` is set to `Text` or `Textarea`.
     */
    maxLength?: number;

    /**
     * Maximum value of the field. Only set if field type is `Date` or `Number`. For
     * `Date` type field, the value will be in ISO8601 string format. For `Number` type
     * field, it will be a numeric value.
     */
    maxValue?: string | number;

    /**
     * Minimum length of string. Only set if `type` is set to `Text` or `Textarea`.
     */
    minLength?: number;

    /**
     * Minimum value of the field. Only set if field type is `Date` or `Number`. For
     * `Date` type field, the value will be in ISO8601 string format. For `Number` type
     * field, it will be a numeric value.
     */
    minValue?: string | number;

    /**
     * An array of allowed values when field type is `SingleSelect` or `MultiSelect`.
     */
    selectOptions?: Array<string | number | boolean>;
  }
}

export type CustomMetadataFieldListResponse = Array<CustomMetadataField>;

export interface CustomMetadataFieldDeleteResponse {}

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
     * if `isValueRequired` property is set to `true`. The value should match the
     * `type` of custom metadata field.
     */
    defaultValue?: string | number | boolean | Array<string | number | boolean>;

    /**
     * Sets this custom metadata field as required. Setting custom metadata fields on
     * an asset will throw error if the value for all required fields are not present
     * in upload or update asset API request body.
     */
    isValueRequired?: boolean;

    /**
     * Maximum length of string. Only set this property if `type` is set to `Text` or
     * `Textarea`.
     */
    maxLength?: number;

    /**
     * Maximum value of the field. Only set this property if field type is `Date` or
     * `Number`. For `Date` type field, set the minimum date in ISO8601 string format.
     * For `Number` type field, set the minimum numeric value.
     */
    maxValue?: string | number;

    /**
     * Minimum length of string. Only set this property if `type` is set to `Text` or
     * `Textarea`.
     */
    minLength?: number;

    /**
     * Minimum value of the field. Only set this property if field type is `Date` or
     * `Number`. For `Date` type field, set the minimum date in ISO8601 string format.
     * For `Number` type field, set the minimum numeric value.
     */
    minValue?: string | number;

    /**
     * An array of allowed values. This property is only required if `type` property is
     * set to `SingleSelect` or `MultiSelect`.
     */
    selectOptions?: Array<string | number | boolean>;
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
     * if `isValueRequired` property is set to `true`. The value should match the
     * `type` of custom metadata field.
     */
    defaultValue?: string | number | boolean | Array<string | number | boolean>;

    /**
     * Sets this custom metadata field as required. Setting custom metadata fields on
     * an asset will throw error if the value for all required fields are not present
     * in upload or update asset API request body.
     */
    isValueRequired?: boolean;

    /**
     * Maximum length of string. Only set this property if `type` is set to `Text` or
     * `Textarea`.
     */
    maxLength?: number;

    /**
     * Maximum value of the field. Only set this property if field type is `Date` or
     * `Number`. For `Date` type field, set the minimum date in ISO8601 string format.
     * For `Number` type field, set the minimum numeric value.
     */
    maxValue?: string | number;

    /**
     * Minimum length of string. Only set this property if `type` is set to `Text` or
     * `Textarea`.
     */
    minLength?: number;

    /**
     * Minimum value of the field. Only set this property if field type is `Date` or
     * `Number`. For `Date` type field, set the minimum date in ISO8601 string format.
     * For `Number` type field, set the minimum numeric value.
     */
    minValue?: string | number;

    /**
     * An array of allowed values. This property is only required if `type` property is
     * set to `SingleSelect` or `MultiSelect`.
     */
    selectOptions?: Array<string | number | boolean>;
  }
}

export interface CustomMetadataFieldListParams {
  /**
   * Set it to `true` to include deleted field objects in the API response.
   */
  includeDeleted?: boolean;
}

export declare namespace CustomMetadataFields {
  export {
    type CustomMetadataField as CustomMetadataField,
    type CustomMetadataFieldListResponse as CustomMetadataFieldListResponse,
    type CustomMetadataFieldDeleteResponse as CustomMetadataFieldDeleteResponse,
    type CustomMetadataFieldCreateParams as CustomMetadataFieldCreateParams,
    type CustomMetadataFieldUpdateParams as CustomMetadataFieldUpdateParams,
    type CustomMetadataFieldListParams as CustomMetadataFieldListParams,
  };
}
