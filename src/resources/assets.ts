// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

export class Assets extends APIResource {
  /**
   * This API can list all the uploaded files and folders in your ImageKit.io media
   * library. In addition, you can fine-tune your query by specifying various filters
   * by generating a query string in a Lucene-like syntax and provide this generated
   * string as the value of the `searchQuery`.
   */
  list(
    query: AssetListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<AssetListResponse> {
    return this._client.get('/v1/files', { query, ...options });
  }
}

export type AssetListResponse = Array<AssetListResponse.FileDetails | AssetListResponse.FolderDetails>;

export namespace AssetListResponse {
  /**
   * Object containing details of a file or file version.
   */
  export interface FileDetails {
    /**
     * An array of tags assigned to the file by auto tagging.
     */
    AITags?: Array<FileDetails.AITag> | null;

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
    versionInfo?: FileDetails.VersionInfo;

    /**
     * Width of the file.
     */
    width?: number;
  }

  export namespace FileDetails {
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

  export interface FolderDetails {
    /**
     * Date and time when the folder was created. The date and time is in ISO8601
     * format.
     */
    createdAt?: string;

    /**
     * Unique identifier of the asset.
     */
    folderId?: string;

    /**
     * Path of the folder. This is the path you would use in the URL to access the
     * folder. For example, if the folder is at the root of the media library, the path
     * will be /folder. If the folder is inside another folder named images, the path
     * will be /images/folder.
     */
    folderPath?: string;

    /**
     * Name of the asset.
     */
    name?: string;

    /**
     * Type of the asset.
     */
    type?: 'folder';

    /**
     * Date and time when the folder was last updated. The date and time is in ISO8601
     * format.
     */
    updatedAt?: string;
  }
}

export interface AssetListParams {
  /**
   * Filter results by file type.
   *
   * - `all` — include all file types
   * - `image` — include only image files
   * - `non-image` — include only non-image files (e.g., JS, CSS, video)
   */
  fileType?: 'all' | 'image' | 'non-image';

  /**
   * The maximum number of results to return in response.
   */
  limit?: number;

  /**
   * Folder path if you want to limit the search within a specific folder. For
   * example, `/sales-banner/` will only search in folder sales-banner.
   *
   * Note : If your use case involves searching within a folder as well as its
   * subfolders, you can use `path` parameter in `searchQuery` with appropriate
   * operator. Checkout
   * [Supported parameters](/docs/api-reference/digital-asset-management-dam/list-and-search-assets#supported-parameters)
   * for more information.
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
   * The number of results to skip before returning results.
   */
  skip?: number;

  /**
   * Sort the results by one of the supported fields in ascending or descending
   * order.
   */
  sort?:
    | 'ASC_NAME'
    | 'DESC_NAME'
    | 'ASC_CREATED'
    | 'DESC_CREATED'
    | 'ASC_UPDATED'
    | 'DESC_UPDATED'
    | 'ASC_HEIGHT'
    | 'DESC_HEIGHT'
    | 'ASC_WIDTH'
    | 'DESC_WIDTH'
    | 'ASC_SIZE'
    | 'DESC_SIZE'
    | 'ASC_RELEVANCE'
    | 'DESC_RELEVANCE';

  /**
   * Filter results by asset type.
   *
   * - `file` — returns only files
   * - `file-version` — returns specific file versions
   * - `folder` — returns only folders
   * - `all` — returns both files and folders (excludes `file-version`)
   */
  type?: 'file' | 'file-version' | 'folder' | 'all';
}

export declare namespace Assets {
  export { type AssetListResponse as AssetListResponse, type AssetListParams as AssetListParams };
}
