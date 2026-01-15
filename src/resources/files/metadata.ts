// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as FilesAPI from './files';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Metadata extends APIResource {
  /**
   * You can programmatically get image EXIF, pHash, and other metadata for uploaded
   * files in the ImageKit.io media library using this API.
   *
   * You can also get the metadata in upload API response by passing `metadata` in
   * `responseFields` parameter.
   *
   * @example
   * ```ts
   * const metadata = await client.files.metadata.get('fileId');
   * ```
   */
  get(fileID: string, options?: RequestOptions): APIPromise<FilesAPI.Metadata> {
    return this._client.get(path`/v1/files/${fileID}/metadata`, options);
  }

  /**
   * Get image EXIF, pHash, and other metadata from ImageKit.io powered remote URL
   * using this API.
   *
   * @example
   * ```ts
   * const metadata = await client.files.metadata.getFromURL({
   *   url: 'https://example.com',
   * });
   * ```
   */
  getFromURL(query: MetadataGetFromURLParams, options?: RequestOptions): APIPromise<FilesAPI.Metadata> {
    return this._client.get('/v1/metadata', { query, ...options });
  }
}

export interface MetadataGetFromURLParams {
  /**
   * Should be a valid file URL. It should be accessible using your ImageKit.io
   * account.
   */
  url: string;
}

export declare namespace Metadata {
  export { type MetadataGetFromURLParams as MetadataGetFromURLParams };
}
