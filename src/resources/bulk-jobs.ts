// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class BulkJobs extends APIResource {
  /**
   * This will copy one folder into another. The selected folder, its nested folders,
   * files, and their versions (in `includeVersions` is set to true) are copied in
   * this operation. Note: If any file at the destination has the same name as the
   * source file, then the source file and its versions will be appended to the
   * destination file version history.
   *
   * @example
   * ```ts
   * const response = await client.bulkJobs.copyFolder({
   *   destinationPath: '/path/of/destination/folder',
   *   sourceFolderPath: '/path/of/source/folder',
   * });
   * ```
   */
  copyFolder(body: BulkJobCopyFolderParams, options?: RequestOptions): APIPromise<BulkJobCopyFolderResponse> {
    return this._client.post('/v1/bulkJobs/copyFolder', { body, ...options });
  }

  /**
   * This will move one folder into another. The selected folder, its nested folders,
   * files, and their versions are moved in this operation. Note: If any file at the
   * destination has the same name as the source file, then the source file and its
   * versions will be appended to the destination file version history.
   *
   * @example
   * ```ts
   * const response = await client.bulkJobs.moveFolder({
   *   destinationPath: '/path/of/destination/folder',
   *   sourceFolderPath: '/path/of/source/folder',
   * });
   * ```
   */
  moveFolder(body: BulkJobMoveFolderParams, options?: RequestOptions): APIPromise<BulkJobMoveFolderResponse> {
    return this._client.post('/v1/bulkJobs/moveFolder', { body, ...options });
  }

  /**
   * This API returns the status of a bulk job like copy and move folder operations.
   *
   * @example
   * ```ts
   * const response = await client.bulkJobs.retrieveStatus(
   *   'jobId',
   * );
   * ```
   */
  retrieveStatus(jobID: string, options?: RequestOptions): APIPromise<BulkJobRetrieveStatusResponse> {
    return this._client.get(path`/v1/bulkJobs/${jobID}`, options);
  }
}

export interface BulkJobCopyFolderResponse {
  /**
   * Unique identifier of the bulk job. This can be used to check the status of the
   * bulk job.
   */
  jobId?: string;
}

export interface BulkJobMoveFolderResponse {
  /**
   * Unique identifier of the bulk job. This can be used to check the status of the
   * bulk job.
   */
  jobId?: string;
}

export interface BulkJobRetrieveStatusResponse {
  /**
   * Unique identifier of the bulk job.
   */
  jobId?: string;

  /**
   * Status of the bulk job. Possible values - `Pending`, `Completed`.
   */
  status?: string;

  /**
   * Type of the bulk job. Possible values - `COPY_FOLDER`, `MOVE_FOLDER`.
   */
  type?: string;
}

export interface BulkJobCopyFolderParams {
  /**
   * Full path to the destination folder where you want to copy the source folder
   * into.
   */
  destinationPath: string;

  /**
   * The full path to the source folder you want to copy.
   */
  sourceFolderPath: string;

  /**
   * Option to copy all versions of files that are nested inside the selected folder.
   * By default, only the current version of each file will be copied. When set to
   * true, all versions of each file will be copied. Default value - `false`.
   */
  includeVersions?: boolean;
}

export interface BulkJobMoveFolderParams {
  /**
   * Full path to the destination folder where you want to move the source folder
   * into.
   */
  destinationPath: string;

  /**
   * The full path to the source folder you want to move.
   */
  sourceFolderPath: string;
}

export declare namespace BulkJobs {
  export {
    type BulkJobCopyFolderResponse as BulkJobCopyFolderResponse,
    type BulkJobMoveFolderResponse as BulkJobMoveFolderResponse,
    type BulkJobRetrieveStatusResponse as BulkJobRetrieveStatusResponse,
    type BulkJobCopyFolderParams as BulkJobCopyFolderParams,
    type BulkJobMoveFolderParams as BulkJobMoveFolderParams,
  };
}
