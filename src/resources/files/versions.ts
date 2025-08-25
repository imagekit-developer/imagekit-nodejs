// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as FilesAPI from './files';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Versions extends APIResource {
  /**
   * This API returns details of all versions of a file.
   *
   * @example
   * ```ts
   * const files = await client.files.versions.list('fileId');
   * ```
   */
  list(fileID: string, options?: RequestOptions): APIPromise<VersionListResponse> {
    return this._client.get(path`/v1/files/${fileID}/versions`, options);
  }

  /**
   * This API deletes a non-current file version permanently. The API returns an
   * empty response.
   *
   * Note: If you want to delete all versions of a file, use the delete file API.
   *
   * @example
   * ```ts
   * const version = await client.files.versions.delete(
   *   'versionId',
   *   { fileId: 'fileId' },
   * );
   * ```
   */
  delete(
    versionID: string,
    params: VersionDeleteParams,
    options?: RequestOptions,
  ): APIPromise<VersionDeleteResponse> {
    const { fileId } = params;
    return this._client.delete(path`/v1/files/${fileId}/versions/${versionID}`, options);
  }

  /**
   * This API returns an object with details or attributes of a file version.
   *
   * @example
   * ```ts
   * const file = await client.files.versions.get('versionId', {
   *   fileId: 'fileId',
   * });
   * ```
   */
  get(versionID: string, params: VersionGetParams, options?: RequestOptions): APIPromise<FilesAPI.File> {
    const { fileId } = params;
    return this._client.get(path`/v1/files/${fileId}/versions/${versionID}`, options);
  }

  /**
   * This API restores a file version as the current file version.
   *
   * @example
   * ```ts
   * const file = await client.files.versions.restore(
   *   'versionId',
   *   { fileId: 'fileId' },
   * );
   * ```
   */
  restore(
    versionID: string,
    params: VersionRestoreParams,
    options?: RequestOptions,
  ): APIPromise<FilesAPI.File> {
    const { fileId } = params;
    return this._client.put(path`/v1/files/${fileId}/versions/${versionID}/restore`, options);
  }
}

export type VersionListResponse = Array<FilesAPI.File>;

export interface VersionDeleteResponse {}

export interface VersionDeleteParams {
  /**
   * The unique `fileId` of the uploaded file. `fileId` is returned in list and
   * search assets API and upload API.
   */
  fileId: string;
}

export interface VersionGetParams {
  /**
   * The unique `fileId` of the uploaded file. `fileId` is returned in list and
   * search assets API and upload API.
   */
  fileId: string;
}

export interface VersionRestoreParams {
  /**
   * The unique `fileId` of the uploaded file. `fileId` is returned in list and
   * search assets API and upload API.
   */
  fileId: string;
}

export declare namespace Versions {
  export {
    type VersionListResponse as VersionListResponse,
    type VersionDeleteResponse as VersionDeleteResponse,
    type VersionDeleteParams as VersionDeleteParams,
    type VersionGetParams as VersionGetParams,
    type VersionRestoreParams as VersionRestoreParams,
  };
}
