// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as AssetsAPI from './assets';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';

export class Bulk extends APIResource {
  /**
   * Permanently deletes multiple assets — files (including all of their versions)
   * and folders (including their contents) — in a single request. Identify each
   * asset by its `asset_id`.
   *
   * A maximum of 100 assets can be deleted in one request.
   *
   * Note: If a file or specific transformation has been requested in the past, then
   * the response is cached. Deleting an asset does not purge the cache. Use the
   * purge cache API to purge cached URLs.
   *
   * @example
   * ```ts
   * const bulk = await client.assets.bulk.delete({
   *   asset_ids: [
   *     '598821f949c0a938d57563bd',
   *     '6441fce4e809dd54b0dee029',
   *   ],
   * });
   * ```
   */
  delete(body: BulkDeleteParams, options?: RequestOptions): APIPromise<BulkDeleteResponse> {
    return this._client.delete('/v2/assets', { body, ...options });
  }

  /**
   * Adds one or more tags to multiple files in a single call. A maximum of 50 files
   * can be specified per request.
   *
   * Tags are merged with any tags already present on each file; duplicates are
   * ignored.
   *
   * @example
   * ```ts
   * const bulkTagUpdateResult =
   *   await client.assets.bulk.addTags({
   *     asset_ids: [
   *       '598821f949c0a938d57563bd',
   *       '598821f949c0a938d57563be',
   *     ],
   *     tags: ['t-shirt', 'round-neck', 'sale2019'],
   *   });
   * ```
   */
  addTags(body: BulkAddTagsParams, options?: RequestOptions): APIPromise<AssetsAPI.BulkTagUpdateResult> {
    return this._client.post('/v2/assets/tags', { body, ...options });
  }

  /**
   * Removes user-applied tags and/or AI-generated tags from multiple files in a
   * single call. A maximum of 50 files can be specified per request.
   *
   * At least one of `tags` or `ai_tags` must be provided. Both may be specified
   * together; each list is removed from the corresponding tag set on every file.
   * Tags that are not present on a file are silently ignored.
   *
   * @example
   * ```ts
   * const bulkTagUpdateResult =
   *   await client.assets.bulk.removeTags({
   *     asset_ids: [
   *       '598821f949c0a938d57563bd',
   *       '598821f949c0a938d57563be',
   *     ],
   *     tags: ['sale2019'],
   *   });
   * ```
   */
  removeTags(
    body: BulkRemoveTagsParams,
    options?: RequestOptions,
  ): APIPromise<AssetsAPI.BulkTagUpdateResult> {
    return this._client.delete('/v2/assets/tags', { body, ...options });
  }
}

export interface BulkDeleteResponse {
  /**
   * Asset ids that were successfully deleted.
   */
  successfully_deleted_asset_ids: Array<string>;
}

export interface BulkDeleteParams {
  /**
   * An array of asset ids to delete. Each id can refer to a file or a folder, as
   * returned by the list and search assets, upload, or create folder APIs.
   */
  asset_ids: Array<string>;
}

export interface BulkAddTagsParams {
  /**
   * Array of file `asset_id`s to which the tags will be added.
   */
  asset_ids: Array<string>;

  /**
   * Array of tags to add. Combined length of all tags must not exceed 500
   * characters.
   */
  tags: Array<string>;
}

export interface BulkRemoveTagsParams {
  /**
   * Array of file `asset_id`s from which the tags will be removed.
   */
  asset_ids: Array<string>;

  /**
   * AI-generated tags to remove from each file.
   */
  ai_tags?: Array<string>;

  /**
   * User-applied tags to remove from each file.
   */
  tags?: Array<string>;
}

export declare namespace Bulk {
  export {
    type BulkDeleteResponse as BulkDeleteResponse,
    type BulkDeleteParams as BulkDeleteParams,
    type BulkAddTagsParams as BulkAddTagsParams,
    type BulkRemoveTagsParams as BulkRemoveTagsParams,
  };
}
