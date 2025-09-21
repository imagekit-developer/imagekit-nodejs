// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';

export class Usage extends APIResource {
  /**
   * Get the account usage information between two dates. Note that the API response
   * includes data from the start date while excluding data from the end date. In
   * other words, the data covers the period starting from the specified start date
   * up to, but not including, the end date.
   *
   * @example
   * ```ts
   * const usage = await client.accounts.usage.get({
   *   endDate: '2019-12-27',
   *   startDate: '2019-12-27',
   * });
   * ```
   */
  get(query: UsageGetParams, options?: RequestOptions): APIPromise<UsageGetResponse> {
    return this._client.get('/v1/accounts/usage', { query, ...options });
  }
}

export interface UsageGetResponse {
  /**
   * Amount of bandwidth used in bytes.
   */
  bandwidthBytes?: number;

  /**
   * Number of extension units used.
   */
  extensionUnitsCount?: number;

  /**
   * Storage used by media library in bytes.
   */
  mediaLibraryStorageBytes?: number;

  /**
   * Storage used by the original cache in bytes.
   */
  originalCacheStorageBytes?: number;

  /**
   * Number of video processing units used.
   */
  videoProcessingUnitsCount?: number;
}

export interface UsageGetParams {
  /**
   * Specify a `endDate` in `YYYY-MM-DD` format. It should be after the `startDate`.
   * The difference between `startDate` and `endDate` should be less than 90 days.
   */
  endDate: string;

  /**
   * Specify a `startDate` in `YYYY-MM-DD` format. It should be before the `endDate`.
   * The difference between `startDate` and `endDate` should be less than 90 days.
   */
  startDate: string;
}

export declare namespace Usage {
  export { type UsageGetResponse as UsageGetResponse, type UsageGetParams as UsageGetParams };
}
