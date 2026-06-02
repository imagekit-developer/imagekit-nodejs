// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Invalidation extends APIResource {
  /**
   * This API will invalidate CDN cache and ImageKit.io's internal cache for an
   * asset. Note: Purge cache is an asynchronous process and it may take some time to
   * reflect the changes.
   *
   * @example
   * ```ts
   * const invalidation = await client.cache.invalidation.create(
   *   {
   *     url: 'https://ik.imagekit.io/your_imagekit_id/default-image.jpg',
   *   },
   * );
   * ```
   */
  create(body: InvalidationCreateParams, options?: RequestOptions): APIPromise<InvalidationCreateResponse> {
    return this._client.post('/v2/cache/invalidations', { body, ...options });
  }

  /**
   * This API returns the status of a cache invalidation request.
   *
   * @example
   * ```ts
   * const invalidation = await client.cache.invalidation.get(
   *   'request_id',
   * );
   * ```
   */
  get(requestID: string, options?: RequestOptions): APIPromise<InvalidationGetResponse> {
    return this._client.get(path`/v2/cache/invalidations/${requestID}`, options);
  }
}

export interface InvalidationCreateResponse {
  /**
   * Unique identifier of the purge request. This can be used to check the status of
   * the purge request.
   */
  request_id?: string;
}

export interface InvalidationGetResponse {
  /**
   * Status of the purge request.
   */
  status?: 'Pending' | 'Completed';
}

export interface InvalidationCreateParams {
  /**
   * The full URL of the file to be purged.
   */
  url: string;
}

export declare namespace Invalidation {
  export {
    type InvalidationCreateResponse as InvalidationCreateResponse,
    type InvalidationGetResponse as InvalidationGetResponse,
    type InvalidationCreateParams as InvalidationCreateParams,
  };
}
