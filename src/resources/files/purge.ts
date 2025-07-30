// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Purge extends APIResource {
  /**
   * This API will purge CDN cache and ImageKit.io's internal cache for a file. Note:
   * Purge cache is an asynchronous process and it may take some time to reflect the
   * changes.
   *
   * @example
   * ```ts
   * const response = await client.files.purge.execute({
   *   url: 'https://ik.imagekit.io/your_imagekit_id/default-image.jpg',
   * });
   * ```
   */
  execute(body: PurgeExecuteParams, options?: RequestOptions): APIPromise<PurgeExecuteResponse> {
    return this._client.post('/v1/files/purge', { body, ...options });
  }

  /**
   * This API returns the status of a purge cache request.
   *
   * @example
   * ```ts
   * const response = await client.files.purge.status(
   *   'requestId',
   * );
   * ```
   */
  status(requestID: string, options?: RequestOptions): APIPromise<PurgeStatusResponse> {
    return this._client.get(path`/v1/files/purge/${requestID}`, options);
  }
}

export interface PurgeExecuteResponse {
  /**
   * Unique identifier of the purge request. This can be used to check the status of
   * the purge request.
   */
  requestId?: string;
}

export interface PurgeStatusResponse {
  /**
   * Status of the purge request.
   */
  status?: 'Pending' | 'Completed';
}

export interface PurgeExecuteParams {
  /**
   * The full URL of the file to be purged.
   */
  url: string;
}

export declare namespace Purge {
  export {
    type PurgeExecuteResponse as PurgeExecuteResponse,
    type PurgeStatusResponse as PurgeStatusResponse,
    type PurgeExecuteParams as PurgeExecuteParams,
  };
}
