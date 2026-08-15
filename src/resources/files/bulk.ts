// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';

export class Bulk extends APIResource {
  /**
   * This API deletes multiple files and all their file versions permanently.
   *
   * Note: If a file or specific transformation has been requested in the past, then
   * the response is cached. Deleting a file does not purge the cache. You can purge
   * the cache using purge cache API.
   *
   * A maximum of 100 files can be deleted at a time.
   *
   * @example
   * ```ts
   * const bulk = await client.files.bulk.delete({
   *   fileIds: [
   *     '598821f949c0a938d57563bd',
   *     '598821f949c0a938d57563be',
   *   ],
   * });
   * ```
   */
  delete(body: BulkDeleteParams, options?: RequestOptions): APIPromise<BulkDeleteResponse> {
    return this._client.post('/v1/files/batch/deleteByFileIds', { body, ...options });
  }

  /**
   * This API adds tags to multiple files in bulk. A maximum of 50 files can be
   * specified at a time.
   *
   * @example
   * ```ts
   * const response = await client.files.bulk.addTags({
   *   fileIds: [
   *     '598821f949c0a938d57563bd',
   *     '598821f949c0a938d57563be',
   *   ],
   *   tags: ['t-shirt', 'round-neck', 'sale2019'],
   * });
   * ```
   */
  addTags(body: BulkAddTagsParams, options?: RequestOptions): APIPromise<BulkAddTagsResponse> {
    return this._client.post('/v1/files/addTags', { body, ...options });
  }

  /**
   * This API removes AITags from multiple files in bulk. A maximum of 50 files can
   * be specified at a time.
   *
   * @example
   * ```ts
   * const response = await client.files.bulk.removeAITags({
   *   AITags: ['t-shirt', 'round-neck', 'sale2019'],
   *   fileIds: [
   *     '598821f949c0a938d57563bd',
   *     '598821f949c0a938d57563be',
   *   ],
   * });
   * ```
   */
  removeAITags(body: BulkRemoveAITagsParams, options?: RequestOptions): APIPromise<BulkRemoveAITagsResponse> {
    return this._client.post('/v1/files/removeAITags', { body, ...options });
  }

  /**
   * This API removes tags from multiple files in bulk. A maximum of 50 files can be
   * specified at a time.
   *
   * @example
   * ```ts
   * const response = await client.files.bulk.removeTags({
   *   fileIds: [
   *     '598821f949c0a938d57563bd',
   *     '598821f949c0a938d57563be',
   *   ],
   *   tags: ['t-shirt', 'round-neck', 'sale2019'],
   * });
   * ```
   */
  removeTags(body: BulkRemoveTagsParams, options?: RequestOptions): APIPromise<BulkRemoveTagsResponse> {
    return this._client.post('/v1/files/removeTags', { body, ...options });
  }
}

export interface BulkDeleteResponse {
  /**
   * An array of fileIds that were successfully deleted.
   */
  successfullyDeletedFileIds?: Array<string>;
}

export interface BulkAddTagsResponse {
  /**
   * An array of fileIds that in which tags were successfully added.
   */
  successfullyUpdatedFileIds?: Array<string>;
}

export interface BulkRemoveAITagsResponse {
  /**
   * An array of fileIds that in which AITags were successfully removed.
   */
  successfullyUpdatedFileIds?: Array<string>;
}

export interface BulkRemoveTagsResponse {
  /**
   * An array of fileIds that in which tags were successfully removed.
   */
  successfullyUpdatedFileIds?: Array<string>;
}

export interface BulkDeleteParams {
  /**
   * An array of fileIds which you want to delete.
   */
  fileIds: Array<string>;
}

export interface BulkAddTagsParams {
  /**
   * An array of fileIds to which you want to add tags.
   */
  fileIds: Array<string>;

  /**
   * An array of tags that you want to add to the files.
   */
  tags: Array<string>;
}

export interface BulkRemoveAITagsParams {
  /**
   * An array of AITags that you want to remove from the files.
   */
  AITags: Array<string>;

  /**
   * An array of fileIds from which you want to remove AITags.
   */
  fileIds: Array<string>;
}

export interface BulkRemoveTagsParams {
  /**
   * An array of fileIds from which you want to remove tags.
   */
  fileIds: Array<string>;

  /**
   * An array of tags that you want to remove from the files.
   */
  tags: Array<string>;
}

export declare namespace Bulk {
  export {
    type BulkDeleteResponse as BulkDeleteResponse,
    type BulkAddTagsResponse as BulkAddTagsResponse,
    type BulkRemoveAITagsResponse as BulkRemoveAITagsResponse,
    type BulkRemoveTagsResponse as BulkRemoveTagsResponse,
    type BulkDeleteParams as BulkDeleteParams,
    type BulkAddTagsParams as BulkAddTagsParams,
    type BulkRemoveAITagsParams as BulkRemoveAITagsParams,
    type BulkRemoveTagsParams as BulkRemoveTagsParams,
  };
}
