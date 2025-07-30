// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

export class Folder extends APIResource {
  /**
   * This will create a new folder. You can specify the folder name and location of
   * the parent folder where this new folder should be created.
   *
   * @example
   * ```ts
   * const folder = await client.folder.create({
   *   folderName: 'summer',
   *   parentFolderPath: '/product/images/',
   * });
   * ```
   */
  create(body: FolderCreateParams, options?: RequestOptions): APIPromise<unknown> {
    return this._client.post('/v1/folder', { body, ...options });
  }

  /**
   * This will delete a folder and all its contents permanently. The API returns an
   * empty response.
   *
   * @example
   * ```ts
   * const folder = await client.folder.delete({
   *   folderPath: '/folder/to/delete/',
   * });
   * ```
   */
  delete(body: FolderDeleteParams, options?: RequestOptions): APIPromise<unknown> {
    return this._client.delete('/v1/folder', { body, ...options });
  }
}

export type FolderCreateResponse = unknown;

export type FolderDeleteResponse = unknown;

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

export declare namespace Folder {
  export {
    type FolderCreateResponse as FolderCreateResponse,
    type FolderDeleteResponse as FolderDeleteResponse,
    type FolderCreateParams as FolderCreateParams,
    type FolderDeleteParams as FolderDeleteParams,
  };
}
