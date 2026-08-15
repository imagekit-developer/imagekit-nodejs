// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as Shared from './shared';
import { APIPromise } from '../core/api-promise';
import { buildHeaders } from '../internal/headers';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class SavedExtensions extends APIResource {
  /**
   * This API creates a new saved extension. Saved extensions allow you to save
   * complex extension configurations (like AI tasks) and reuse them by referencing
   * the ID in upload or update file APIs.
   *
   * **Saved extension limit** \
   * You can create a maximum of 100 saved extensions per account.
   *
   * @example
   * ```ts
   * const savedExtension = await client.savedExtensions.create({
   *   config: {
   *     name: 'ai-tasks',
   *     tasks: [
   *       {
   *         instruction: 'What types of clothing items are visible in this image?',
   *         type: 'select_tags',
   *         vocabulary: ['shirt', 'dress', 'pants', 'jacket', 'shoes'],
   *         max_selections: 3,
   *       },
   *     ],
   *   },
   *   description: 'Automatically categorizes clothing items in fashion images',
   *   name: 'Fashion Item Categorization',
   * });
   * ```
   */
  create(body: SavedExtensionCreateParams, options?: RequestOptions): APIPromise<Shared.SavedExtension> {
    return this._client.post('/v1/saved-extensions', { body, ...options });
  }

  /**
   * This API updates an existing saved extension. You can update the name,
   * description, or config.
   *
   * @example
   * ```ts
   * const savedExtension = await client.savedExtensions.update(
   *   'id',
   * );
   * ```
   */
  update(
    id: string,
    body: SavedExtensionUpdateParams,
    options?: RequestOptions,
  ): APIPromise<Shared.SavedExtension> {
    return this._client.patch(path`/v1/saved-extensions/${id}`, { body, ...options });
  }

  /**
   * This API returns an array of all saved extensions for your account. Saved
   * extensions allow you to save complex extension configurations and reuse them by
   * referencing them by ID in upload or update file APIs.
   *
   * @example
   * ```ts
   * const savedExtensions = await client.savedExtensions.list();
   * ```
   */
  list(options?: RequestOptions): APIPromise<SavedExtensionListResponse> {
    return this._client.get('/v1/saved-extensions', options);
  }

  /**
   * This API deletes a saved extension permanently.
   *
   * @example
   * ```ts
   * await client.savedExtensions.delete('id');
   * ```
   */
  delete(id: string, options?: RequestOptions): APIPromise<void> {
    return this._client.delete(path`/v1/saved-extensions/${id}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }

  /**
   * This API returns details of a specific saved extension by ID.
   *
   * @example
   * ```ts
   * const savedExtension = await client.savedExtensions.get(
   *   'id',
   * );
   * ```
   */
  get(id: string, options?: RequestOptions): APIPromise<Shared.SavedExtension> {
    return this._client.get(path`/v1/saved-extensions/${id}`, options);
  }
}

export type SavedExtensionListResponse = Array<Shared.SavedExtension>;

export interface SavedExtensionCreateParams {
  /**
   * Configuration object for an extension (base extensions only, not saved extension
   * references).
   */
  config: Shared.ExtensionConfig;

  /**
   * Description of what the saved extension does.
   */
  description: string;

  /**
   * Name of the saved extension.
   */
  name: string;
}

export interface SavedExtensionUpdateParams {
  /**
   * Configuration object for an extension (base extensions only, not saved extension
   * references).
   */
  config?: Shared.ExtensionConfig;

  /**
   * Updated description of the saved extension.
   */
  description?: string;

  /**
   * Updated name of the saved extension.
   */
  name?: string;
}

export declare namespace SavedExtensions {
  export {
    type SavedExtensionListResponse as SavedExtensionListResponse,
    type SavedExtensionCreateParams as SavedExtensionCreateParams,
    type SavedExtensionUpdateParams as SavedExtensionUpdateParams,
  };
}
