// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as AssetsAPI from './assets';
import { FileVersionDetailsCursor } from './assets';
import { APIPromise } from '../../core/api-promise';
import { Cursor, type CursorParams, PagePromise } from '../../core/pagination';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Versions extends APIResource {
  /**
   * Returns details of all versions of a file.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const fileVersionDetails of client.assets.versions.list(
   *   'asset_id',
   * )) {
   *   // ...
   * }
   * ```
   */
  list(
    assetID: string,
    query: VersionListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<FileVersionDetailsCursor, AssetsAPI.FileVersionDetails> {
    return this._client.getAPIList(
      path`/v2/assets/${assetID}/versions`,
      Cursor<AssetsAPI.FileVersionDetails>,
      { query, ...options },
    );
  }

  /**
   * Returns details of a single version of a file.
   *
   * @example
   * ```ts
   * const fileVersionDetails = await client.assets.versions.get(
   *   'version_id',
   *   { asset_id: 'asset_id' },
   * );
   * ```
   */
  get(
    versionID: string,
    params: VersionGetParams,
    options?: RequestOptions,
  ): APIPromise<AssetsAPI.FileVersionDetails> {
    const { asset_id } = params;
    return this._client.get(path`/v2/assets/${asset_id}/versions/${versionID}`, options);
  }

  /**
   * Deletes a non-current file version permanently. The API returns an empty
   * response.
   *
   * Note: If you want to delete all versions of a file, use the delete asset API.
   *
   * @example
   * ```ts
   * await client.assets.versions.delete('version_id', {
   *   asset_id: 'asset_id',
   * });
   * ```
   */
  delete(versionID: string, params: VersionDeleteParams, options?: RequestOptions): APIPromise<void> {
    const { asset_id } = params;
    return this._client.delete(path`/v2/assets/${asset_id}/versions/${versionID}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }

  /**
   * Restores a file version as the current file version.
   *
   * @example
   * ```ts
   * const fileDetails = await client.assets.versions.restore(
   *   'version_id',
   *   { asset_id: 'asset_id' },
   * );
   * ```
   */
  restore(
    versionID: string,
    params: VersionRestoreParams,
    options?: RequestOptions,
  ): APIPromise<AssetsAPI.FileDetails> {
    const { asset_id } = params;
    return this._client.post(path`/v2/assets/${asset_id}/versions/${versionID}/restore`, options);
  }
}

export interface VersionListParams extends CursorParams {}

export interface VersionGetParams {
  /**
   * Unique identifier of the file. Returned by the list and search assets API and
   * the upload API.
   */
  asset_id: string;
}

export interface VersionDeleteParams {
  /**
   * Unique identifier of the file. Returned by the list and search assets API and
   * the upload API.
   */
  asset_id: string;
}

export interface VersionRestoreParams {
  /**
   * Unique identifier of the file. Returned by the list and search assets API and
   * the upload API.
   */
  asset_id: string;
}

export declare namespace Versions {
  export {
    type VersionListParams as VersionListParams,
    type VersionGetParams as VersionGetParams,
    type VersionDeleteParams as VersionDeleteParams,
    type VersionRestoreParams as VersionRestoreParams,
  };
}

export { type FileVersionDetailsCursor };
