// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';

export class Folders extends APIResource {
  /**
   * Creates a new (empty) folder. Specify the folder name and the path of the parent
   * folder under which the new folder should be created.
   *
   * If any folder in `parent_folder_path` does not exist, the missing folders are
   * created automatically. For example, when `parent_folder_path` is
   * `/product/images/summer`, the folders `product`, `images`, and `summer` are
   * created if they don't already exist.
   *
   * @example
   * ```ts
   * const folder = await client.assets.folders.create({
   *   folder_name: 'summer',
   *   parent_folder_path: '/product/images/',
   * });
   * ```
   */
  create(body: FolderCreateParams, options?: RequestOptions): APIPromise<FolderCreateResponse> {
    return this._client.post('/v2/assets/folders', { body, ...options });
  }
}

export interface FolderCreateResponse {
  /**
   * Unique identifier of the newly created folder.
   */
  asset_id: string;
}

export interface FolderCreateParams {
  /**
   * Name of the folder to create.
   *
   * All characters except alphabets and numbers (including Unicode letters, marks,
   * and numerals in other languages) are replaced by an underscore `_`.
   */
  folder_name: string;

  /**
   * Full path of the parent folder under which the new folder should be created. Use
   * `/` for the root, otherwise a path like `/containing/folder/`.
   */
  parent_folder_path: string;
}

export declare namespace Folders {
  export { type FolderCreateResponse as FolderCreateResponse, type FolderCreateParams as FolderCreateParams };
}
