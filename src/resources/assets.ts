// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as FilesAPI from './files/files';
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

export type AssetListResponse = Array<FilesAPI.File | FilesAPI.Folder>;

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
