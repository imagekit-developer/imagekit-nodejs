// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';

export class Batch extends APIResource {
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
   * const batch = await client.files.batch.delete({
   *   fileIds: [
   *     '598821f949c0a938d57563bd',
   *     '598821f949c0a938d57563be',
   *   ],
   * });
   * ```
   */
  delete(body: BatchDeleteParams, options?: RequestOptions): APIPromise<BatchDeleteResponse> {
    return this._client.post('/v1/files/batch/deleteByFileIds', { body, ...options });
  }
}

export interface BatchDeleteResponse {
  /**
   * An array of fileIds that were successfully deleted.
   */
  successfullyDeletedFileIds?: Array<string>;
}

export interface BatchDeleteParams {
  /**
   * An array of fileIds which you want to delete.
   */
  fileIds: Array<string>;
}

export declare namespace Batch {
  export { type BatchDeleteResponse as BatchDeleteResponse, type BatchDeleteParams as BatchDeleteParams };
}
