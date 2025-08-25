// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Versions extends APIResource {
  /**
   * This API returns details of all versions of a file.
   *
   * @example
   * ```ts
   * const versions = await client.files.versions.list('fileId');
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
   * const version = await client.files.versions.get(
   *   'versionId',
   *   { fileId: 'fileId' },
   * );
   * ```
   */
  get(versionID: string, params: VersionGetParams, options?: RequestOptions): APIPromise<VersionGetResponse> {
    const { fileId } = params;
    return this._client.get(path`/v1/files/${fileId}/versions/${versionID}`, options);
  }

  /**
   * This API restores a file version as the current file version.
   *
   * @example
   * ```ts
   * const response = await client.files.versions.restore(
   *   'versionId',
   *   { fileId: 'fileId' },
   * );
   * ```
   */
  restore(
    versionID: string,
    params: VersionRestoreParams,
    options?: RequestOptions,
  ): APIPromise<VersionRestoreResponse> {
    const { fileId } = params;
    return this._client.put(path`/v1/files/${fileId}/versions/${versionID}/restore`, options);
  }
}

export type VersionListResponse = Array<VersionListResponse.VersionListResponseItem>;

export namespace VersionListResponse {
  /**
   * Object containing details of a file or file version.
   */
  export interface VersionListResponseItem {
    /**
     * An array of tags assigned to the file by auto tagging.
     */
    AITags?: Array<VersionListResponseItem.AITag> | null;

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
    customMetadata?: { [key: string]: unknown };

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
    type?: 'file' | 'file-version';

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
    versionInfo?: VersionListResponseItem.VersionInfo;

    /**
     * Width of the file.
     */
    width?: number;
  }

  export namespace VersionListResponseItem {
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

export interface VersionDeleteResponse {}

/**
 * Object containing details of a file or file version.
 */
export interface VersionGetResponse {
  /**
   * An array of tags assigned to the file by auto tagging.
   */
  AITags?: Array<VersionGetResponse.AITag> | null;

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
  customMetadata?: { [key: string]: unknown };

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
  type?: 'file' | 'file-version';

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
  versionInfo?: VersionGetResponse.VersionInfo;

  /**
   * Width of the file.
   */
  width?: number;
}

export namespace VersionGetResponse {
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

/**
 * Object containing details of a file or file version.
 */
export interface VersionRestoreResponse {
  /**
   * An array of tags assigned to the file by auto tagging.
   */
  AITags?: Array<VersionRestoreResponse.AITag> | null;

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
  customMetadata?: { [key: string]: unknown };

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
  type?: 'file' | 'file-version';

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
  versionInfo?: VersionRestoreResponse.VersionInfo;

  /**
   * Width of the file.
   */
  width?: number;
}

export namespace VersionRestoreResponse {
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
    type VersionGetResponse as VersionGetResponse,
    type VersionRestoreResponse as VersionRestoreResponse,
    type VersionDeleteParams as VersionDeleteParams,
    type VersionGetParams as VersionGetParams,
    type VersionRestoreParams as VersionRestoreParams,
  };
}
