// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Origins extends APIResource {
  /**
   * **Note:** This API is currently in beta.
   * Creates a new origin and returns the origin object.
   *
   * @example
   * ```ts
   * const originResponse = await client.accounts.origins.create(
   *   {
   *     accessKey: 'AKIAIOSFODNN7EXAMPLE',
   *     bucket: 'product-images',
   *     name: 'US S3 Storage',
   *     secretKey: 'wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY',
   *     type: 'S3',
   *   },
   * );
   * ```
   */
  create(body: OriginCreateParams, options?: RequestOptions): APIPromise<OriginResponse> {
    return this._client.post('/v1/accounts/origins', { body, ...options });
  }

  /**
   * **Note:** This API is currently in beta.
   * Updates the origin identified by `id` and returns the updated origin object.
   *
   * @example
   * ```ts
   * const originResponse = await client.accounts.origins.update(
   *   'id',
   *   {
   *     accessKey: 'AKIAIOSFODNN7EXAMPLE',
   *     bucket: 'product-images',
   *     name: 'US S3 Storage',
   *     secretKey: 'wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY',
   *     type: 'S3',
   *   },
   * );
   * ```
   */
  update(id: string, body: OriginUpdateParams, options?: RequestOptions): APIPromise<OriginResponse> {
    return this._client.put(path`/v1/accounts/origins/${id}`, { body, ...options });
  }

  /**
   * **Note:** This API is currently in beta.
   * Returns an array of all configured origins for the current account.
   *
   * @example
   * ```ts
   * const originResponses =
   *   await client.accounts.origins.list();
   * ```
   */
  list(options?: RequestOptions): APIPromise<OriginListResponse> {
    return this._client.get('/v1/accounts/origins', options);
  }

  /**
   * **Note:** This API is currently in beta.
   * Permanently removes the origin identified by `id`. If the origin is in use by
   * any URL‑endpoints, the API will return an error.
   *
   * @example
   * ```ts
   * await client.accounts.origins.delete('id');
   * ```
   */
  delete(id: string, options?: RequestOptions): APIPromise<void> {
    return this._client.delete(path`/v1/accounts/origins/${id}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }

  /**
   * **Note:** This API is currently in beta.
   * Retrieves the origin identified by `id`.
   *
   * @example
   * ```ts
   * const originResponse = await client.accounts.origins.get(
   *   'id',
   * );
   * ```
   */
  get(id: string, options?: RequestOptions): APIPromise<OriginResponse> {
    return this._client.get(path`/v1/accounts/origins/${id}`, options);
  }
}

/**
 * Schema for origin request resources.
 */
export type OriginRequest =
  | OriginRequest.S3
  | OriginRequest.S3Compatible
  | OriginRequest.CloudinaryBackup
  | OriginRequest.WebFolder
  | OriginRequest.WebProxy
  | OriginRequest.Gcs
  | OriginRequest.AzureBlob
  | OriginRequest.AkeneoPim;

export namespace OriginRequest {
  export interface S3 {
    /**
     * Access key for the bucket.
     */
    accessKey: string;

    /**
     * S3 bucket name.
     */
    bucket: string;

    /**
     * Display name of the origin.
     */
    name: string;

    /**
     * Secret key for the bucket.
     */
    secretKey: string;

    type: 'S3';

    /**
     * URL used in the Canonical header (if enabled).
     */
    baseUrlForCanonicalHeader?: string;

    /**
     * Whether to send a Canonical header.
     */
    includeCanonicalHeader?: boolean;

    /**
     * Path prefix inside the bucket.
     */
    prefix?: string;
  }

  export interface S3Compatible {
    /**
     * Access key for the bucket.
     */
    accessKey: string;

    /**
     * S3 bucket name.
     */
    bucket: string;

    /**
     * Custom S3-compatible endpoint.
     */
    endpoint: string;

    /**
     * Display name of the origin.
     */
    name: string;

    /**
     * Secret key for the bucket.
     */
    secretKey: string;

    type: 'S3_COMPATIBLE';

    /**
     * URL used in the Canonical header (if enabled).
     */
    baseUrlForCanonicalHeader?: string;

    /**
     * Whether to send a Canonical header.
     */
    includeCanonicalHeader?: boolean;

    /**
     * Path prefix inside the bucket.
     */
    prefix?: string;

    /**
     * Use path-style S3 URLs?
     */
    s3ForcePathStyle?: boolean;
  }

  export interface CloudinaryBackup {
    /**
     * Access key for the bucket.
     */
    accessKey: string;

    /**
     * S3 bucket name.
     */
    bucket: string;

    /**
     * Display name of the origin.
     */
    name: string;

    /**
     * Secret key for the bucket.
     */
    secretKey: string;

    type: 'CLOUDINARY_BACKUP';

    /**
     * URL used in the Canonical header (if enabled).
     */
    baseUrlForCanonicalHeader?: string;

    /**
     * Whether to send a Canonical header.
     */
    includeCanonicalHeader?: boolean;

    /**
     * Path prefix inside the bucket.
     */
    prefix?: string;
  }

  export interface WebFolder {
    /**
     * Root URL for the web folder origin.
     */
    baseUrl: string;

    /**
     * Display name of the origin.
     */
    name: string;

    type: 'WEB_FOLDER';

    /**
     * URL used in the Canonical header (if enabled).
     */
    baseUrlForCanonicalHeader?: string;

    /**
     * Forward the Host header to origin?
     */
    forwardHostHeaderToOrigin?: boolean;

    /**
     * Whether to send a Canonical header.
     */
    includeCanonicalHeader?: boolean;
  }

  export interface WebProxy {
    /**
     * Display name of the origin.
     */
    name: string;

    type: 'WEB_PROXY';

    /**
     * URL used in the Canonical header (if enabled).
     */
    baseUrlForCanonicalHeader?: string;

    /**
     * Whether to send a Canonical header.
     */
    includeCanonicalHeader?: boolean;
  }

  export interface Gcs {
    bucket: string;

    clientEmail: string;

    /**
     * Display name of the origin.
     */
    name: string;

    privateKey: string;

    type: 'GCS';

    /**
     * URL used in the Canonical header (if enabled).
     */
    baseUrlForCanonicalHeader?: string;

    /**
     * Whether to send a Canonical header.
     */
    includeCanonicalHeader?: boolean;

    prefix?: string;
  }

  export interface AzureBlob {
    accountName: string;

    container: string;

    /**
     * Display name of the origin.
     */
    name: string;

    sasToken: string;

    type: 'AZURE_BLOB';

    /**
     * URL used in the Canonical header (if enabled).
     */
    baseUrlForCanonicalHeader?: string;

    /**
     * Whether to send a Canonical header.
     */
    includeCanonicalHeader?: boolean;

    prefix?: string;
  }

  export interface AkeneoPim {
    /**
     * Akeneo instance base URL.
     */
    baseUrl: string;

    /**
     * Akeneo API client ID.
     */
    clientId: string;

    /**
     * Akeneo API client secret.
     */
    clientSecret: string;

    /**
     * Display name of the origin.
     */
    name: string;

    /**
     * Akeneo API password.
     */
    password: string;

    type: 'AKENEO_PIM';

    /**
     * Akeneo API username.
     */
    username: string;

    /**
     * URL used in the Canonical header (if enabled).
     */
    baseUrlForCanonicalHeader?: string;

    /**
     * Whether to send a Canonical header.
     */
    includeCanonicalHeader?: boolean;
  }
}

/**
 * Origin object as returned by the API (sensitive fields removed).
 */
export type OriginResponse =
  | OriginResponse.S3
  | OriginResponse.S3Compatible
  | OriginResponse.CloudinaryBackup
  | OriginResponse.WebFolder
  | OriginResponse.WebProxy
  | OriginResponse.Gcs
  | OriginResponse.AzureBlob
  | OriginResponse.AkeneoPim;

export namespace OriginResponse {
  export interface S3 {
    /**
     * Unique identifier for the origin. This is generated by ImageKit when you create
     * a new origin.
     */
    id: string;

    /**
     * S3 bucket name.
     */
    bucket: string;

    /**
     * Whether to send a Canonical header.
     */
    includeCanonicalHeader: boolean;

    /**
     * Display name of the origin.
     */
    name: string;

    /**
     * Path prefix inside the bucket.
     */
    prefix: string;

    type: 'S3';

    /**
     * URL used in the Canonical header (if enabled).
     */
    baseUrlForCanonicalHeader?: string;
  }

  export interface S3Compatible {
    /**
     * Unique identifier for the origin. This is generated by ImageKit when you create
     * a new origin.
     */
    id: string;

    /**
     * S3 bucket name.
     */
    bucket: string;

    /**
     * Custom S3-compatible endpoint.
     */
    endpoint: string;

    /**
     * Whether to send a Canonical header.
     */
    includeCanonicalHeader: boolean;

    /**
     * Display name of the origin.
     */
    name: string;

    /**
     * Path prefix inside the bucket.
     */
    prefix: string;

    /**
     * Use path-style S3 URLs?
     */
    s3ForcePathStyle: boolean;

    type: 'S3_COMPATIBLE';

    /**
     * URL used in the Canonical header (if enabled).
     */
    baseUrlForCanonicalHeader?: string;
  }

  export interface CloudinaryBackup {
    /**
     * Unique identifier for the origin. This is generated by ImageKit when you create
     * a new origin.
     */
    id: string;

    /**
     * S3 bucket name.
     */
    bucket: string;

    /**
     * Whether to send a Canonical header.
     */
    includeCanonicalHeader: boolean;

    /**
     * Display name of the origin.
     */
    name: string;

    /**
     * Path prefix inside the bucket.
     */
    prefix: string;

    type: 'CLOUDINARY_BACKUP';

    /**
     * URL used in the Canonical header (if enabled).
     */
    baseUrlForCanonicalHeader?: string;
  }

  export interface WebFolder {
    /**
     * Unique identifier for the origin. This is generated by ImageKit when you create
     * a new origin.
     */
    id: string;

    /**
     * Root URL for the web folder origin.
     */
    baseUrl: string;

    /**
     * Forward the Host header to origin?
     */
    forwardHostHeaderToOrigin: boolean;

    /**
     * Whether to send a Canonical header.
     */
    includeCanonicalHeader: boolean;

    /**
     * Display name of the origin.
     */
    name: string;

    type: 'WEB_FOLDER';

    /**
     * URL used in the Canonical header (if enabled).
     */
    baseUrlForCanonicalHeader?: string;
  }

  export interface WebProxy {
    /**
     * Unique identifier for the origin. This is generated by ImageKit when you create
     * a new origin.
     */
    id: string;

    /**
     * Whether to send a Canonical header.
     */
    includeCanonicalHeader: boolean;

    /**
     * Display name of the origin.
     */
    name: string;

    type: 'WEB_PROXY';

    /**
     * URL used in the Canonical header (if enabled).
     */
    baseUrlForCanonicalHeader?: string;
  }

  export interface Gcs {
    /**
     * Unique identifier for the origin. This is generated by ImageKit when you create
     * a new origin.
     */
    id: string;

    bucket: string;

    clientEmail: string;

    /**
     * Whether to send a Canonical header.
     */
    includeCanonicalHeader: boolean;

    /**
     * Display name of the origin.
     */
    name: string;

    prefix: string;

    type: 'GCS';

    /**
     * URL used in the Canonical header (if enabled).
     */
    baseUrlForCanonicalHeader?: string;
  }

  export interface AzureBlob {
    /**
     * Unique identifier for the origin. This is generated by ImageKit when you create
     * a new origin.
     */
    id: string;

    accountName: string;

    container: string;

    /**
     * Whether to send a Canonical header.
     */
    includeCanonicalHeader: boolean;

    /**
     * Display name of the origin.
     */
    name: string;

    prefix: string;

    type: 'AZURE_BLOB';

    /**
     * URL used in the Canonical header (if enabled).
     */
    baseUrlForCanonicalHeader?: string;
  }

  export interface AkeneoPim {
    /**
     * Unique identifier for the origin. This is generated by ImageKit when you create
     * a new origin.
     */
    id: string;

    /**
     * Akeneo instance base URL.
     */
    baseUrl: string;

    /**
     * Whether to send a Canonical header.
     */
    includeCanonicalHeader: boolean;

    /**
     * Display name of the origin.
     */
    name: string;

    type: 'AKENEO_PIM';

    /**
     * URL used in the Canonical header (if enabled).
     */
    baseUrlForCanonicalHeader?: string;
  }
}

export type OriginListResponse = Array<OriginResponse>;

export type OriginCreateParams =
  | OriginCreateParams.S3
  | OriginCreateParams.S3Compatible
  | OriginCreateParams.CloudinaryBackup
  | OriginCreateParams.WebFolder
  | OriginCreateParams.WebProxy
  | OriginCreateParams.GoogleCloudStorageGcs
  | OriginCreateParams.AzureBlobStorage
  | OriginCreateParams.AkeneoPim;

export declare namespace OriginCreateParams {
  export interface S3 {
    /**
     * Access key for the bucket.
     */
    accessKey: string;

    /**
     * S3 bucket name.
     */
    bucket: string;

    /**
     * Display name of the origin.
     */
    name: string;

    /**
     * Secret key for the bucket.
     */
    secretKey: string;

    type: 'S3';

    /**
     * URL used in the Canonical header (if enabled).
     */
    baseUrlForCanonicalHeader?: string;

    /**
     * Whether to send a Canonical header.
     */
    includeCanonicalHeader?: boolean;

    /**
     * Path prefix inside the bucket.
     */
    prefix?: string;
  }

  export interface S3Compatible {
    /**
     * Access key for the bucket.
     */
    accessKey: string;

    /**
     * S3 bucket name.
     */
    bucket: string;

    /**
     * Custom S3-compatible endpoint.
     */
    endpoint: string;

    /**
     * Display name of the origin.
     */
    name: string;

    /**
     * Secret key for the bucket.
     */
    secretKey: string;

    type: 'S3_COMPATIBLE';

    /**
     * URL used in the Canonical header (if enabled).
     */
    baseUrlForCanonicalHeader?: string;

    /**
     * Whether to send a Canonical header.
     */
    includeCanonicalHeader?: boolean;

    /**
     * Path prefix inside the bucket.
     */
    prefix?: string;

    /**
     * Use path-style S3 URLs?
     */
    s3ForcePathStyle?: boolean;
  }

  export interface CloudinaryBackup {
    /**
     * Access key for the bucket.
     */
    accessKey: string;

    /**
     * S3 bucket name.
     */
    bucket: string;

    /**
     * Display name of the origin.
     */
    name: string;

    /**
     * Secret key for the bucket.
     */
    secretKey: string;

    type: 'CLOUDINARY_BACKUP';

    /**
     * URL used in the Canonical header (if enabled).
     */
    baseUrlForCanonicalHeader?: string;

    /**
     * Whether to send a Canonical header.
     */
    includeCanonicalHeader?: boolean;

    /**
     * Path prefix inside the bucket.
     */
    prefix?: string;
  }

  export interface WebFolder {
    /**
     * Root URL for the web folder origin.
     */
    baseUrl: string;

    /**
     * Display name of the origin.
     */
    name: string;

    type: 'WEB_FOLDER';

    /**
     * URL used in the Canonical header (if enabled).
     */
    baseUrlForCanonicalHeader?: string;

    /**
     * Forward the Host header to origin?
     */
    forwardHostHeaderToOrigin?: boolean;

    /**
     * Whether to send a Canonical header.
     */
    includeCanonicalHeader?: boolean;
  }

  export interface WebProxy {
    /**
     * Display name of the origin.
     */
    name: string;

    type: 'WEB_PROXY';

    /**
     * URL used in the Canonical header (if enabled).
     */
    baseUrlForCanonicalHeader?: string;

    /**
     * Whether to send a Canonical header.
     */
    includeCanonicalHeader?: boolean;
  }

  export interface GoogleCloudStorageGcs {
    bucket: string;

    clientEmail: string;

    /**
     * Display name of the origin.
     */
    name: string;

    privateKey: string;

    type: 'GCS';

    /**
     * URL used in the Canonical header (if enabled).
     */
    baseUrlForCanonicalHeader?: string;

    /**
     * Whether to send a Canonical header.
     */
    includeCanonicalHeader?: boolean;

    prefix?: string;
  }

  export interface AzureBlobStorage {
    accountName: string;

    container: string;

    /**
     * Display name of the origin.
     */
    name: string;

    sasToken: string;

    type: 'AZURE_BLOB';

    /**
     * URL used in the Canonical header (if enabled).
     */
    baseUrlForCanonicalHeader?: string;

    /**
     * Whether to send a Canonical header.
     */
    includeCanonicalHeader?: boolean;

    prefix?: string;
  }

  export interface AkeneoPim {
    /**
     * Akeneo instance base URL.
     */
    baseUrl: string;

    /**
     * Akeneo API client ID.
     */
    clientId: string;

    /**
     * Akeneo API client secret.
     */
    clientSecret: string;

    /**
     * Display name of the origin.
     */
    name: string;

    /**
     * Akeneo API password.
     */
    password: string;

    type: 'AKENEO_PIM';

    /**
     * Akeneo API username.
     */
    username: string;

    /**
     * URL used in the Canonical header (if enabled).
     */
    baseUrlForCanonicalHeader?: string;

    /**
     * Whether to send a Canonical header.
     */
    includeCanonicalHeader?: boolean;
  }
}

export type OriginUpdateParams =
  | OriginUpdateParams.S3
  | OriginUpdateParams.S3Compatible
  | OriginUpdateParams.CloudinaryBackup
  | OriginUpdateParams.WebFolder
  | OriginUpdateParams.WebProxy
  | OriginUpdateParams.GoogleCloudStorageGcs
  | OriginUpdateParams.AzureBlobStorage
  | OriginUpdateParams.AkeneoPim;

export declare namespace OriginUpdateParams {
  export interface S3 {
    /**
     * Access key for the bucket.
     */
    accessKey: string;

    /**
     * S3 bucket name.
     */
    bucket: string;

    /**
     * Display name of the origin.
     */
    name: string;

    /**
     * Secret key for the bucket.
     */
    secretKey: string;

    type: 'S3';

    /**
     * URL used in the Canonical header (if enabled).
     */
    baseUrlForCanonicalHeader?: string;

    /**
     * Whether to send a Canonical header.
     */
    includeCanonicalHeader?: boolean;

    /**
     * Path prefix inside the bucket.
     */
    prefix?: string;
  }

  export interface S3Compatible {
    /**
     * Access key for the bucket.
     */
    accessKey: string;

    /**
     * S3 bucket name.
     */
    bucket: string;

    /**
     * Custom S3-compatible endpoint.
     */
    endpoint: string;

    /**
     * Display name of the origin.
     */
    name: string;

    /**
     * Secret key for the bucket.
     */
    secretKey: string;

    type: 'S3_COMPATIBLE';

    /**
     * URL used in the Canonical header (if enabled).
     */
    baseUrlForCanonicalHeader?: string;

    /**
     * Whether to send a Canonical header.
     */
    includeCanonicalHeader?: boolean;

    /**
     * Path prefix inside the bucket.
     */
    prefix?: string;

    /**
     * Use path-style S3 URLs?
     */
    s3ForcePathStyle?: boolean;
  }

  export interface CloudinaryBackup {
    /**
     * Access key for the bucket.
     */
    accessKey: string;

    /**
     * S3 bucket name.
     */
    bucket: string;

    /**
     * Display name of the origin.
     */
    name: string;

    /**
     * Secret key for the bucket.
     */
    secretKey: string;

    type: 'CLOUDINARY_BACKUP';

    /**
     * URL used in the Canonical header (if enabled).
     */
    baseUrlForCanonicalHeader?: string;

    /**
     * Whether to send a Canonical header.
     */
    includeCanonicalHeader?: boolean;

    /**
     * Path prefix inside the bucket.
     */
    prefix?: string;
  }

  export interface WebFolder {
    /**
     * Root URL for the web folder origin.
     */
    baseUrl: string;

    /**
     * Display name of the origin.
     */
    name: string;

    type: 'WEB_FOLDER';

    /**
     * URL used in the Canonical header (if enabled).
     */
    baseUrlForCanonicalHeader?: string;

    /**
     * Forward the Host header to origin?
     */
    forwardHostHeaderToOrigin?: boolean;

    /**
     * Whether to send a Canonical header.
     */
    includeCanonicalHeader?: boolean;
  }

  export interface WebProxy {
    /**
     * Display name of the origin.
     */
    name: string;

    type: 'WEB_PROXY';

    /**
     * URL used in the Canonical header (if enabled).
     */
    baseUrlForCanonicalHeader?: string;

    /**
     * Whether to send a Canonical header.
     */
    includeCanonicalHeader?: boolean;
  }

  export interface GoogleCloudStorageGcs {
    bucket: string;

    clientEmail: string;

    /**
     * Display name of the origin.
     */
    name: string;

    privateKey: string;

    type: 'GCS';

    /**
     * URL used in the Canonical header (if enabled).
     */
    baseUrlForCanonicalHeader?: string;

    /**
     * Whether to send a Canonical header.
     */
    includeCanonicalHeader?: boolean;

    prefix?: string;
  }

  export interface AzureBlobStorage {
    accountName: string;

    container: string;

    /**
     * Display name of the origin.
     */
    name: string;

    sasToken: string;

    type: 'AZURE_BLOB';

    /**
     * URL used in the Canonical header (if enabled).
     */
    baseUrlForCanonicalHeader?: string;

    /**
     * Whether to send a Canonical header.
     */
    includeCanonicalHeader?: boolean;

    prefix?: string;
  }

  export interface AkeneoPim {
    /**
     * Akeneo instance base URL.
     */
    baseUrl: string;

    /**
     * Akeneo API client ID.
     */
    clientId: string;

    /**
     * Akeneo API client secret.
     */
    clientSecret: string;

    /**
     * Display name of the origin.
     */
    name: string;

    /**
     * Akeneo API password.
     */
    password: string;

    type: 'AKENEO_PIM';

    /**
     * Akeneo API username.
     */
    username: string;

    /**
     * URL used in the Canonical header (if enabled).
     */
    baseUrlForCanonicalHeader?: string;

    /**
     * Whether to send a Canonical header.
     */
    includeCanonicalHeader?: boolean;
  }
}

export declare namespace Origins {
  export {
    type OriginRequest as OriginRequest,
    type OriginResponse as OriginResponse,
    type OriginListResponse as OriginListResponse,
    type OriginCreateParams as OriginCreateParams,
    type OriginUpdateParams as OriginUpdateParams,
  };
}
