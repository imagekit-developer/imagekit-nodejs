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
   * A named transformation is a short, reusable name for a transformation string.
   * Use it in image and video URLs as `tr:n-<name>`, and update the underlying
   * transformation later without changing existing URLs. Learn more about
   * [named transformations](https://imagekit.io/docs/transformations#named-transformations).
   *
   * You can create up to 250 named transformations per account.
   *
   * @example
   * ```ts
   * const namedTransformation =
   *   await client.namedTransformations.create({
   *     name: 'small_thumbnail',
   *     transformation: 'w-150,h-150,fo-center,cm-resize',
   *     enabled: true,
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
   *   await client.namedTransformations.get('6bZ9x2ZUx');
   * ```
   */
  get(id: string, options?: RequestOptions): APIPromise<Shared.NamedTransformation> {
    return this._client.get(path`/v1/named-transformations/${id}`, options);
  }

  /**
   * Updates the named transformation identified by `id` and returns the updated
   * object. Only the fields present in the request body are updated; other fields
   * stay unchanged.
   *
   * Renaming or disabling a named transformation fails with a `409` error if it is
   * still referenced (via the `n-<name>` token) by an upload pre-transformation or
   * post-transformation setting. This check is best-effort and can't detect
   * references in your own application code or in previously generated URLs.
   *
   * @example
   * ```ts
   * const namedTransformation =
   *   await client.namedTransformations.update('6bZ9x2ZUx', {
   *     transformation: 'w-200,h-200,fo-center,cm-resize',
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
   * Permanently deletes the named transformation identified by `id`.
   *
   * Deletion fails with a `409` error if the named transformation is still
   * referenced (via the `n-<name>` token) by an upload pre-transformation or
   * post-transformation setting. This check is best-effort and can't detect
   * references in your own application code or in previously generated URLs.
   *
   * @example
   * ```ts
   * const namedTransformation =
   *   await client.namedTransformations.delete('6bZ9x2ZUx');
   * ```
   */
  delete(id: string, options?: RequestOptions): APIPromise<NamedTransformationDeleteResponse> {
    return this._client.delete(path`/v1/named-transformations/${id}`, options);
  }
}

export type NamedTransformationListResponse = Array<Shared.NamedTransformation>;

export interface NamedTransformationDeleteResponse {}

export interface NamedTransformationCreateParams {
  /**
   * Alias for the transformation string, used in URLs as `tr:n-<name>`. Must contain
   * only alphanumeric characters or `_` (no hyphens), and be unique for your
   * account. Name matching is case-sensitive.
   */
  name: string;

  /**
   * The transformation string this name refers to, for example
   * `w-150,h-150,fo-center,cm-resize`. The `tr:` prefix is optional; if present, it
   * is validated. The string must be a valid ImageKit transformation and cannot
   * itself reference another named transformation (no nesting). Learn more about the
   * [transformation syntax](https://imagekit.io/docs/transformations).
   */
  transformation: string;

  /**
   * Whether the named transformation is currently enabled. When this is set to
   * `false`, requests using such disabled named transformations fail at delivery
   * time.
   */
  enabled?: boolean;
}

export interface NamedTransformationUpdateParams {
  /**
   * Whether the named transformation is enabled. Omit to leave the current value
   * unchanged.
   */
  enabled?: boolean;

  /**
   * Alias for the transformation string, used in URLs as `tr:n-<name>`. Must contain
   * only alphanumeric characters or `_` (no hyphens), and be unique for your
   * account. Name matching is case-sensitive.
   */
  name?: string;

  /**
   * The transformation string this name refers to, for example
   * `w-150,h-150,fo-center,cm-resize`. The `tr:` prefix is optional; if present, it
   * is validated. The string must be a valid ImageKit transformation and cannot
   * itself reference another named transformation (no nesting). Learn more about the
   * [transformation syntax](https://imagekit.io/docs/transformations).
   */
  transformation?: string;
}

export declare namespace NamedTransformations {
  export {
    type NamedTransformationListResponse as NamedTransformationListResponse,
    type NamedTransformationDeleteResponse as NamedTransformationDeleteResponse,
    type NamedTransformationCreateParams as NamedTransformationCreateParams,
    type NamedTransformationUpdateParams as NamedTransformationUpdateParams,
  };
}
