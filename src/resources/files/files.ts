// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as BatchAPI from './batch';
import { Batch, BatchDeleteParams, BatchDeleteResponse } from './batch';
import * as DetailsAPI from './details';
import { DetailRetrieveResponse, DetailUpdateParams, DetailUpdateResponse, Details } from './details';
import * as MetadataAPI from './metadata';
import {
  Metadata,
  MetadataFromURLParams,
  MetadataFromURLResponse,
  MetadataRetrieveResponse,
} from './metadata';
import * as PurgeAPI from './purge';
import { Purge, PurgeExecuteParams, PurgeExecuteResponse, PurgeStatusResponse } from './purge';
import * as VersionsAPI from './versions';
import {
  VersionDeleteParams,
  VersionDeleteResponse,
  VersionListResponse,
  VersionRestoreParams,
  VersionRestoreResponse,
  VersionRetrieveParams,
  VersionRetrieveResponse,
  Versions,
} from './versions';
import { APIPromise } from '../../core/api-promise';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Files extends APIResource {
  details: DetailsAPI.Details = new DetailsAPI.Details(this._client);
  batch: BatchAPI.Batch = new BatchAPI.Batch(this._client);
  versions: VersionsAPI.Versions = new VersionsAPI.Versions(this._client);
  purge: PurgeAPI.Purge = new PurgeAPI.Purge(this._client);
  metadata: MetadataAPI.Metadata = new MetadataAPI.Metadata(this._client);

  /**
   * This API can list all the uploaded files and folders in your ImageKit.io media
   * library. In addition, you can fine-tune your query by specifying various filters
   * by generating a query string in a Lucene-like syntax and provide this generated
   * string as the value of the `searchQuery`.
   *
   * @example
   * ```ts
   * const files = await client.files.list();
   * ```
   */
  list(
    query: FileListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<FileListResponse> {
    return this._client.get('/v1/files', { query, ...options });
  }

  /**
   * This API deletes the file and all its file versions permanently.
   *
   * Note: If a file or specific transformation has been requested in the past, then
   * the response is cached. Deleting a file does not purge the cache. You can purge
   * the cache using purge cache API.
   *
   * @example
   * ```ts
   * await client.files.delete('fileId');
   * ```
   */
  delete(fileID: string, options?: RequestOptions): APIPromise<void> {
    return this._client.delete(path`/v1/files/${fileID}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }

  /**
   * This API adds tags to multiple files in bulk. A maximum of 50 files can be
   * specified at a time.
   *
   * @example
   * ```ts
   * const response = await client.files.addTags({
   *   fileIds: [
   *     '598821f949c0a938d57563bd',
   *     '598821f949c0a938d57563be',
   *   ],
   *   tags: ['t-shirt', 'round-neck', 'sale2019'],
   * });
   * ```
   */
  addTags(body: FileAddTagsParams, options?: RequestOptions): APIPromise<FileAddTagsResponse> {
    return this._client.post('/v1/files/addTags', { body, ...options });
  }

  /**
   * This will copy a file from one folder to another.
   *
   * Note: If any file at the destination has the same name as the source file, then
   * the source file and its versions (if `includeFileVersions` is set to true) will
   * be appended to the destination file version history.
   *
   * @example
   * ```ts
   * const response = await client.files.copy({
   *   destinationPath: '/folder/to/copy/into/',
   *   sourceFilePath: '/path/to/file.jpg',
   * });
   * ```
   */
  copy(body: FileCopyParams, options?: RequestOptions): APIPromise<unknown> {
    return this._client.post('/v1/files/copy', { body, ...options });
  }

  /**
   * This will move a file and all its versions from one folder to another.
   *
   * Note: If any file at the destination has the same name as the source file, then
   * the source file and its versions will be appended to the destination file.
   *
   * @example
   * ```ts
   * const response = await client.files.move({
   *   destinationPath: '/folder/to/move/into/',
   *   sourceFilePath: '/path/to/file.jpg',
   * });
   * ```
   */
  move(body: FileMoveParams, options?: RequestOptions): APIPromise<unknown> {
    return this._client.post('/v1/files/move', { body, ...options });
  }

  /**
   * This API removes AITags from multiple files in bulk. A maximum of 50 files can
   * be specified at a time.
   *
   * @example
   * ```ts
   * const response = await client.files.removeAITags({
   *   AITags: ['t-shirt', 'round-neck', 'sale2019'],
   *   fileIds: [
   *     '598821f949c0a938d57563bd',
   *     '598821f949c0a938d57563be',
   *   ],
   * });
   * ```
   */
  removeAITags(body: FileRemoveAITagsParams, options?: RequestOptions): APIPromise<FileRemoveAITagsResponse> {
    return this._client.post('/v1/files/removeAITags', { body, ...options });
  }

  /**
   * This API removes tags from multiple files in bulk. A maximum of 50 files can be
   * specified at a time.
   *
   * @example
   * ```ts
   * const response = await client.files.removeTags({
   *   fileIds: [
   *     '598821f949c0a938d57563bd',
   *     '598821f949c0a938d57563be',
   *   ],
   *   tags: ['t-shirt', 'round-neck', 'sale2019'],
   * });
   * ```
   */
  removeTags(body: FileRemoveTagsParams, options?: RequestOptions): APIPromise<FileRemoveTagsResponse> {
    return this._client.post('/v1/files/removeTags', { body, ...options });
  }

  /**
   * You can rename an already existing file in the media library using rename file
   * API. This operation would rename all file versions of the file.
   *
   * Note: The old URLs will stop working. The file/file version URLs cached on CDN
   * will continue to work unless a purge is requested.
   *
   * @example
   * ```ts
   * const response = await client.files.rename({
   *   filePath: '/path/to/file.jpg',
   *   newFileName: 'newFileName.jpg',
   * });
   * ```
   */
  rename(body: FileRenameParams, options?: RequestOptions): APIPromise<FileRenameResponse> {
    return this._client.put('/v1/files/rename', { body, ...options });
  }
}

export type FileListResponse = Array<FileListResponse.FileListResponseItem>;

export namespace FileListResponse {
  /**
   * Object containing details of a file or file version.
   */
  export interface FileListResponseItem {
    /**
     * An array of tags assigned to the file by auto tagging.
     */
    AITags?: Array<FileListResponseItem.AITag> | null;

    /**
     * Date and time when the file was uploaded. The date and time is in ISO8601
     * format.
     */
    createdAt?: string;

    /**
     * An string with custom coordinates of the file.
     */
    customCoordinates?: string | null;

    /**
     * An object with custom metadata for the file.
     */
    customMetadata?: unknown;

    /**
     * Unique identifier of the asset.
     */
    fileId?: string;

    /**
     * Path of the file. This is the path you would use in the URL to access the file.
     * For example, if the file is at the root of the media library, the path will be
     * `/file.jpg`. If the file is inside a folder named `images`, the path will be
     * `/images/file.jpg`.
     */
    filePath?: string;

    /**
     * Type of the file. Possible values are `image`, `non-image`.
     */
    fileType?: string;

    /**
     * Specifies if the image has an alpha channel.
     */
    hasAlpha?: boolean;

    /**
     * Height of the file.
     */
    height?: number;

    /**
     * Specifies if the file is private or not.
     */
    isPrivateFile?: boolean;

    /**
     * Specifies if the file is published or not.
     */
    isPublished?: boolean;

    /**
     * MIME type of the file.
     */
    mime?: string;

    /**
     * Name of the asset.
     */
    name?: string;

    /**
     * Size of the file in bytes.
     */
    size?: number;

    /**
     * An array of tags assigned to the file. Tags are used to search files in the
     * media library.
     */
    tags?: Array<string> | null;

    /**
     * URL of the thumbnail image. This URL is used to access the thumbnail image of
     * the file in the media library.
     */
    thumbnail?: string;

    /**
     * Type of the asset.
     */
    type?: string;

    /**
     * Date and time when the file was last updated. The date and time is in ISO8601
     * format.
     */
    updatedAt?: string;

    /**
     * URL of the file.
     */
    url?: string;

    /**
     * An object with details of the file version.
     */
    versionInfo?: FileListResponseItem.VersionInfo;

    /**
     * Width of the file.
     */
    width?: number;
  }

  export namespace FileListResponseItem {
    export interface AITag {
      /**
       * Confidence score of the tag.
       */
      confidence?: number;

      /**
       * Name of the tag.
       */
      name?: string;

      /**
       * Source of the tag. Possible values are `google-auto-tagging` and
       * `aws-auto-tagging`.
       */
      source?: string;
    }

    /**
     * An object with details of the file version.
     */
    export interface VersionInfo {
      /**
       * Unique identifier of the file version.
       */
      id?: string;

      /**
       * Name of the file version.
       */
      name?: string;
    }
  }
}

export interface FileAddTagsResponse {
  /**
   * An array of fileIds that in which tags were successfully added.
   */
  successfullyUpdatedFileIds?: Array<string>;
}

export type FileCopyResponse = unknown;

export type FileMoveResponse = unknown;

export interface FileRemoveAITagsResponse {
  /**
   * An array of fileIds that in which AITags were successfully removed.
   */
  successfullyUpdatedFileIds?: Array<string>;
}

export interface FileRemoveTagsResponse {
  /**
   * An array of fileIds that in which tags were successfully removed.
   */
  successfullyUpdatedFileIds?: Array<string>;
}

export interface FileRenameResponse {
  /**
   * Unique identifier of the purge request. This can be used to check the status of
   * the purge request.
   */
  purgeRequestId?: string;
}

export interface FileListParams {
  /**
   * Type of files to include in the result set. Accepts three values:
   *
   * `all` - include all types of files in the result set. `image` - only search in
   * image type files. `non-image` - only search in files that are not images, e.g.,
   * JS or CSS or video files.
   *
   * Default value - `all`
   */
  fileType?: string;

  /**
   * The maximum number of results to return in response:
   *
   * Minimum value - 1
   *
   * Maximum value - 1000
   *
   * Default value - 1000
   */
  limit?: string;

  /**
   * Folder path if you want to limit the search within a specific folder. For
   * example, `/sales-banner/` will only search in folder sales-banner.
   */
  path?: string;

  /**
   * Query string in a Lucene-like query language e.g. `createdAt > "7d"`.
   *
   * Note : When the searchQuery parameter is present, the following query parameters
   * will have no effect on the result:
   *
   * 1. `tags`
   * 2. `type`
   * 3. `name`
   *
   * [Learn more](/docs/api-reference/digital-asset-management-dam/list-and-search-assets#advanced-search-queries)
   * from examples.
   */
  searchQuery?: string;

  /**
   * The number of results to skip before returning results:
   *
   * Minimum value - 0
   *
   * Default value - 0
   */
  skip?: string;

  /**
   * You can sort based on the following fields:
   *
   * 1. name - `ASC_NAME` or `DESC_NAME`
   * 2. createdAt - `ASC_CREATED` or `DESC_CREATED`
   * 3. updatedAt - `ASC_UPDATED` or `DESC_UPDATED`
   * 4. height - `ASC_HEIGHT` or `DESC_HEIGHT`
   * 5. width - `ASC_WIDTH` or `DESC_WIDTH`
   * 6. size - `ASC_SIZE` or `DESC_SIZE`
   *
   * Default value - `ASC_CREATED`
   */
  sort?: string;

  /**
   * Limit search to one of `file`, `file-version`, or `folder`. Pass `all` to
   * include `files` and `folders` in search results (`file-version` will not be
   * included in this case).
   *
   * Default value - `file`
   */
  type?: 'file' | 'file-version' | 'folder' | 'all';
}

export interface FileAddTagsParams {
  /**
   * An array of fileIds to which you want to add tags.
   */
  fileIds: Array<string>;

  /**
   * An array of tags that you want to add to the files.
   */
  tags: Array<string>;
}

export interface FileCopyParams {
  /**
   * Full path to the folder you want to copy the above file into.
   */
  destinationPath: string;

  /**
   * The full path of the file you want to copy.
   */
  sourceFilePath: string;

  /**
   * Option to copy all versions of a file. By default, only the current version of
   * the file is copied. When set to true, all versions of the file will be copied.
   * Default value - `false`.
   */
  includeFileVersions?: boolean;
}

export interface FileMoveParams {
  /**
   * Full path to the folder you want to move the above file into.
   */
  destinationPath: string;

  /**
   * The full path of the file you want to move.
   */
  sourceFilePath: string;
}

export interface FileRemoveAITagsParams {
  /**
   * An array of AITags that you want to remove from the files.
   */
  AITags: Array<string>;

  /**
   * An array of fileIds from which you want to remove AITags.
   */
  fileIds: Array<string>;
}

export interface FileRemoveTagsParams {
  /**
   * An array of fileIds from which you want to remove tags.
   */
  fileIds: Array<string>;

  /**
   * An array of tags that you want to remove from the files.
   */
  tags: Array<string>;
}

export interface FileRenameParams {
  /**
   * The full path of the file you want to rename.
   */
  filePath: string;

  /**
   * The new name of the file. A filename can contain:
   *
   * Alphanumeric Characters: `a-z`, `A-Z`, `0-9` (including Unicode letters, marks,
   * and numerals in other languages). Special Characters: `.`, `_`, and `-`.
   *
   * Any other character, including space, will be replaced by `_`.
   */
  newFileName: string;

  /**
   * Option to purge cache for the old file and its versions' URLs.
   *
   * When set to true, it will internally issue a purge cache request on CDN to
   * remove cached content of old file and its versions. This purge request is
   * counted against your monthly purge quota.
   *
   * Note: If the old file were accessible at
   * `https://ik.imagekit.io/demo/old-filename.jpg`, a purge cache request would be
   * issued against `https://ik.imagekit.io/demo/old-filename.jpg*` (with a wildcard
   * at the end). It will remove the file and its versions' URLs and any
   * transformations made using query parameters on this file or its versions.
   * However, the cache for file transformations made using path parameters will
   * persist. You can purge them using the purge API. For more details, refer to the
   * purge API documentation.
   *
   * Default value - `false`
   */
  purgeCache?: boolean;
}

Files.Details = Details;
Files.Batch = Batch;
Files.Versions = Versions;
Files.Purge = Purge;
Files.Metadata = Metadata;

export declare namespace Files {
  export {
    type FileListResponse as FileListResponse,
    type FileAddTagsResponse as FileAddTagsResponse,
    type FileCopyResponse as FileCopyResponse,
    type FileMoveResponse as FileMoveResponse,
    type FileRemoveAITagsResponse as FileRemoveAITagsResponse,
    type FileRemoveTagsResponse as FileRemoveTagsResponse,
    type FileRenameResponse as FileRenameResponse,
    type FileListParams as FileListParams,
    type FileAddTagsParams as FileAddTagsParams,
    type FileCopyParams as FileCopyParams,
    type FileMoveParams as FileMoveParams,
    type FileRemoveAITagsParams as FileRemoveAITagsParams,
    type FileRemoveTagsParams as FileRemoveTagsParams,
    type FileRenameParams as FileRenameParams,
  };

  export {
    Details as Details,
    type DetailRetrieveResponse as DetailRetrieveResponse,
    type DetailUpdateResponse as DetailUpdateResponse,
    type DetailUpdateParams as DetailUpdateParams,
  };

  export {
    Batch as Batch,
    type BatchDeleteResponse as BatchDeleteResponse,
    type BatchDeleteParams as BatchDeleteParams,
  };

  export {
    Versions as Versions,
    type VersionRetrieveResponse as VersionRetrieveResponse,
    type VersionListResponse as VersionListResponse,
    type VersionDeleteResponse as VersionDeleteResponse,
    type VersionRestoreResponse as VersionRestoreResponse,
    type VersionRetrieveParams as VersionRetrieveParams,
    type VersionDeleteParams as VersionDeleteParams,
    type VersionRestoreParams as VersionRestoreParams,
  };

  export {
    Purge as Purge,
    type PurgeExecuteResponse as PurgeExecuteResponse,
    type PurgeStatusResponse as PurgeStatusResponse,
    type PurgeExecuteParams as PurgeExecuteParams,
  };

  export {
    Metadata as Metadata,
    type MetadataRetrieveResponse as MetadataRetrieveResponse,
    type MetadataFromURLResponse as MetadataFromURLResponse,
    type MetadataFromURLParams as MetadataFromURLParams,
  };
}
