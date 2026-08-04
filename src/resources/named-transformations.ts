// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as Shared from './shared';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class NamedTransformations extends APIResource {
  /**
   * Returns an array of all named transformations configured for your account.
   *
   * @example
   * ```ts
   * const namedTransformations =
   *   await client.namedTransformations.list();
   * ```
   */
  list(options?: RequestOptions): APIPromise<NamedTransformationListResponse> {
    return this._client.get('/v1/named-transformations', options);
  }

  /**
   * Creates a new named transformation and returns the created object.
   *
   * Named transformations let you assign a short, reusable name to a complex
   * transformation string, so it can be applied in image and video URLs as
   * `tr:n-<name>` and later updated without changing any existing URLs.
   *
   * Learn more about
   * [named transformations](https://imagekit.io/docs/transformations#named-transformations).
   *
   * @example
   * ```ts
   * const namedTransformation =
   *   await client.namedTransformations.create({
   *     name: 'small_thumbnail',
   *     transformation: 'tr:w-150,h-150,fo-center,cm-resize',
   *   });
   * ```
   */
  create(
    body: NamedTransformationCreateParams,
    options?: RequestOptions,
  ): APIPromise<Shared.NamedTransformation> {
    return this._client.post('/v1/named-transformations', { body, ...options });
  }

  /**
   * Retrieves the named transformation identified by `id`.
   *
   * @example
   * ```ts
   * const namedTransformation =
   *   await client.namedTransformations.get('id');
   * ```
   */
  get(id: string, options?: RequestOptions): APIPromise<Shared.NamedTransformation> {
    return this._client.get(path`/v1/named-transformations/${id}`, options);
  }

  /**
   * Updates the named transformation identified by `id` and returns the updated
   * object. Only the fields present in the request body are updated; omitted fields
   * are left unchanged.
   *
   * @example
   * ```ts
   * const namedTransformation =
   *   await client.namedTransformations.update('id', {
   *     transformation: 'tr:w-200,h-200,fo-center,cm-resize',
   *   });
   * ```
   */
  update(
    id: string,
    body: NamedTransformationUpdateParams,
    options?: RequestOptions,
  ): APIPromise<Shared.NamedTransformation> {
    return this._client.patch(path`/v1/named-transformations/${id}`, { body, ...options });
  }

  /**
   * Permanently deletes the named transformation identified by `id` and returns the
   * deleted object.
   *
   * **Note:**
   *
   * - If another named transformation, or your account's upload
   *   pre-transformation/post-transformation settings, reference this named
   *   transformation (via the `n-<name>` token), the request fails with a `409`
   *   error whose `message` describes what it is referenced by. Remove those
   *   references first, then retry the deletion. This is a best-effort check and
   *   cannot detect references baked into your own application code or previously
   *   generated URLs.
   *
   * @example
   * ```ts
   * const namedTransformation =
   *   await client.namedTransformations.delete('id');
   * ```
   */
  delete(id: string, options?: RequestOptions): APIPromise<Shared.NamedTransformation> {
    return this._client.delete(path`/v1/named-transformations/${id}`, options);
  }
}

export type NamedTransformationListResponse = Array<Shared.NamedTransformation>;

export interface NamedTransformationCreateParams {
  /**
   * Name of the named transformation. This is the alias used to refer to the
   * transformation string in image and video URLs, for example `tr:n-<name>`. Can
   * only contain alphanumeric characters, `_` and `-`, and must be unique for your
   * account (case-insensitive).
   */
  name: string;

  /**
   * The transformation string this name refers to. It must start with `tr:` followed
   * by one or more transformation parameters, for example
   * `tr:w-150,h-150,fo-center,cm-resize`. Learn more about the
   * [transformation syntax](https://imagekit.io/docs/transformations).
   */
  transformation: string;

  /**
   * Whether this named transformation is disabled. Set to `true` to temporarily
   * disable it without deleting it — requests using a disabled named transformation
   * fail at delivery time.
   */
  disabled?: boolean;
}

export interface NamedTransformationUpdateParams {
  /**
   * Whether this named transformation is disabled.
   */
  disabled?: boolean;

  /**
   * Updated name of the named transformation. Can only contain alphanumeric
   * characters, `_` and `-`, and must be unique for your account (case-insensitive).
   */
  name?: string;

  /**
   * Updated transformation string. It must start with `tr:` followed by one or more
   * transformation parameters.
   */
  transformation?: string;
}

export declare namespace NamedTransformations {
  export {
    type NamedTransformationListResponse as NamedTransformationListResponse,
    type NamedTransformationCreateParams as NamedTransformationCreateParams,
    type NamedTransformationUpdateParams as NamedTransformationUpdateParams,
  };
}
