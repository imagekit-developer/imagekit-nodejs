// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { Cursor, type CursorParams, PagePromise } from '../core/pagination';
import { RequestOptions } from '../internal/request-options';

export class Tags extends APIResource {
  /**
   * This API lists the distinct tags in use across your media library, with the
   * number of assets each tag is applied to and when it was last used. Tags are
   * matched case-insensitively, so `Summer` and `summer` are one entry: `name` is
   * the lowercased form and `label` is the spelling that was used most recently.
   *
   * Use `tagSource` and `fileType` to list only the tags in use on matching assets.
   * `lastUsedAt` and the `ASC_LAST_USED` / `DESC_LAST_USED` sorts follow those
   * filters, while `assetCount` always counts every asset carrying the tag. Use
   * `search` or `prefix` to narrow the listing and `cursor` to page through it.
   *
   * Tag counts are updated asynchronously. Changes to a file's tags usually appear
   * in this list within about a minute, but can take longer during heavy tagging
   * activity, so a tag you just added or removed may not be reflected immediately.
   */
  list(query: TagListParams | null | undefined = {}, options?: RequestOptions): PagePromise<TagsCursor, Tag> {
    return this._client.getAPIList('/v1/tags', Cursor<Tag>, { query, ...options });
  }
}

export type TagsCursor = Cursor<Tag>;

/**
 * A tag in use in your media library, aggregated case-insensitively across the
 * assets that carry it.
 */
export interface Tag {
  /**
   * The number of assets carrying the tag, counted across both tag sources
   * (user-generated tags and AI-generated tags) and all file types regardless of the
   * request's filters.
   */
  assetCount: number;

  /**
   * The tag as it was spelled when it was last applied to any asset. Use it for
   * display.
   */
  label: string;

  /**
   * When the tag was last applied to an asset matching the `tagSource` and
   * `fileType` filters of the request, in ISO 8601 format.
   */
  lastUsedAt: string;

  /**
   * The tag in lowercase. Tags are case-insensitive, so this is the unique key of
   * the tag within your account.
   */
  name: string;
}

export interface TagListParams extends CursorParams {
  /**
   * Filter tags by the type of asset they are applied to.
   *
   * - `image` — tags in use on images
   * - `video` — tags in use on videos
   * - `static` — tags in use on any other file, such as documents, scripts and
   *   stylesheets
   * - `all` — tags in use on any asset
   */
  fileType?: 'image' | 'video' | 'static' | 'all';

  /**
   * Only return tags that begin with this value. Matching is case-insensitive.
   */
  prefix?: string;

  /**
   * Only return tags that contain this text. Every word in the value must appear in
   * the tag and the last word may be incomplete, which suits search-as-you-type.
   * Matching is case-insensitive.
   */
  search?: string;

  /**
   * Sort the results.
   *
   * - `ASC_NAME` / `DESC_NAME` — by `name`
   * - `ASC_LAST_USED` / `DESC_LAST_USED` — by `lastUsedAt` within the requested
   *   `tagSource` and `fileType`, ties broken by `name`
   */
  sort?: 'ASC_NAME' | 'DESC_NAME' | 'ASC_LAST_USED' | 'DESC_LAST_USED';

  /**
   * Filter tags by who added them.
   *
   * - `user` — tags added by users through the dashboard or the API
   * - `ai` — tags added by AI auto-tagging extensions
   * - `all` — both
   */
  tagSource?: 'user' | 'ai' | 'all';
}

export declare namespace Tags {
  export { type Tag as Tag, type TagsCursor as TagsCursor, type TagListParams as TagListParams };
}
