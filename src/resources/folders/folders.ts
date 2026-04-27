// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as JobAPI from './job';
import { Job, JobGetResponse } from './job';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';

export class Folders extends APIResource {
  job: JobAPI.Job = new JobAPI.Job(this._client);

  /**
   * This will create a new folder. You can specify the folder name and location of
   * the parent folder where this new folder should be created.
   *
   * @example
   * ```ts
   * const folder = await client.folders.create({
   *   folderName: 'summer',
   *   parentFolderPath: '/product/images/',
   * });
   * ```
   */
  create(body: FolderCreateParams, options?: RequestOptions): APIPromise<FolderCreateResponse> {
    return this._client.post('/v1/folder', { body, ...options });
  }

  /**
   * This will delete a folder and all its contents permanently. The API returns an
   * empty response.
   *
   * @example
   * ```ts
   * const folder = await client.folders.delete({
   *   folderPath: '/folder/to/delete/',
   * });
   * ```
   */
  delete(body: FolderDeleteParams, options?: RequestOptions): APIPromise<FolderDeleteResponse> {
    return this._client.delete('/v1/folder', { body, ...options });
  }

  /**
   * This will copy one folder into another. The selected folder, its nested folders,
   * files, and their versions (in `includeVersions` is set to true) are copied in
   * this operation. Note: If any file at the destination has the same name as the
   * source file, then the source file and its versions will be appended to the
   * destination file version history.
   *
   * @example
   * ```ts
   * const response = await client.folders.copy({
   *   destinationPath: '/path/of/destination/folder',
   *   sourceFolderPath: '/path/of/source/folder',
   * });
   * ```
   */
  copy(body: FolderCopyParams, options?: RequestOptions): APIPromise<FolderCopyResponse> {
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
   * const response = await client.folders.move({
   *   destinationPath: '/path/of/destination/folder',
   *   sourceFolderPath: '/path/of/source/folder',
   * });
   * ```
   */
  move(body: FolderMoveParams, options?: RequestOptions): APIPromise<FolderMoveResponse> {
    return this._client.post('/v1/bulkJobs/moveFolder', { body, ...options });
  }

  /**
   * This API allows you to rename an existing folder. The folder and all its nested
   * assets and sub-folders will remain unchanged, but their paths will be updated to
   * reflect the new folder name.
   *
   * @example
   * ```ts
   * const response = await client.folders.rename({
   *   folderPath: '/path/of/folder',
   *   newFolderName: 'new-folder-name',
   * });
   * ```
   */
  rename(body: FolderRenameParams, options?: RequestOptions): APIPromise<FolderRenameResponse> {
    return this._client.post('/v1/bulkJobs/renameFolder', { body, ...options });
  }
}

export interface FolderCreateResponse {}

export interface FolderDeleteResponse {}

/**
 * Job submitted successfully. A `jobId` will be returned.
 */
export interface FolderCopyResponse {
  /**
   * Unique identifier of the bulk job. This can be used to check the status of the
   * bulk job.
   */
  jobId: string;
}

/**
 * Job submitted successfully. A `jobId` will be returned.
 */
export interface FolderMoveResponse {
  /**
   * Unique identifier of the bulk job. This can be used to check the status of the
   * bulk job.
   */
  jobId: string;
}

/**
 * Job submitted successfully. A `jobId` will be returned.
 */
export interface FolderRenameResponse {
  /**
   * Unique identifier of the bulk job. This can be used to check the status of the
   * bulk job.
   */
  jobId: string;
}

export interface FolderCreateParams {
  /**
   * The folder will be created with this name.
   *
   * All characters except alphabets and numbers (inclusive of unicode letters,
   * marks, and numerals in other languages) will be replaced by an underscore i.e.
   * `_`.
   */
  folderName: string;

  /**
   * The folder where the new folder should be created, for root use `/` else the
   * path e.g. `containing/folder/`.
   *
   * Note: If any folder(s) is not present in the parentFolderPath parameter, it will
   * be automatically created. For example, if you pass `/product/images/summer`,
   * then `product`, `images`, and `summer` folders will be created if they don't
   * already exist.
   */
  parentFolderPath: string;
}

export interface FolderDeleteParams {
  /**
   * Full path to the folder you want to delete. For example `/folder/to/delete/`.
   */
  folderPath: string;
}

export interface FolderCopyParams {
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

export interface FolderMoveParams {
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

export interface FolderRenameParams {
  /**
   * The full path to the folder you want to rename.
   */
  folderPath: string;

  /**
   * The new name for the folder.
   *
   * All characters except alphabets and numbers (inclusive of unicode letters,
   * marks, and numerals in other languages) and `-` will be replaced by an
   * underscore i.e. `_`.
   */
  newFolderName: string;

  /**
   * Option to purge cache for the old nested files and their versions' URLs.
   *
   * When set to true, it will internally issue a purge cache request on CDN to
   * remove the cached content of the old nested files and their versions. There will
   * only be one purge request for all the nested files, which will be counted
   * against your monthly purge quota.
   *
   * Note: A purge cache request will be issued against
   * `https://ik.imagekit.io/old/folder/path*` (with a wildcard at the end). This
   * will remove all nested files, their versions' URLs, and any transformations made
   * using query parameters on these files or their versions. However, the cache for
   * file transformations made using path parameters will persist. You can purge them
   * using the purge API. For more details, refer to the purge API documentation.
   *
   * Default value - `false`
   */
  purgeCache?: boolean;
}

Folders.Job = Job;

export declare namespace Folders {
  export {
    type FolderCreateResponse as FolderCreateResponse,
    type FolderDeleteResponse as FolderDeleteResponse,
    type FolderCopyResponse as FolderCopyResponse,
    type FolderMoveResponse as FolderMoveResponse,
    type FolderRenameResponse as FolderRenameResponse,
    type FolderCreateParams as FolderCreateParams,
    type FolderDeleteParams as FolderDeleteParams,
    type FolderCopyParams as FolderCopyParams,
    type FolderMoveParams as FolderMoveParams,
    type FolderRenameParams as FolderRenameParams,
  };

  export { Job as Job, type JobGetResponse as JobGetResponse };
}
