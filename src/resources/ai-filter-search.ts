// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

export class AIFilterSearch extends APIResource {
  /**
   * Convert a natural-language prompt into a structured ImageKit media-library
   * search query. The response returns a `searchQuery` string (the same Lucene-like
   * syntax accepted by the list and search assets API) plus suggested filter
   * parameters. This endpoint only generates the query; it does not execute the
   * search.
   *
   * @example
   * ```ts
   * const aiFilterSearch = await client.aiFilterSearch.create({
   *   prompt: 'red dresses tagged summer uploaded last month',
   *   currentFolder: '/products',
   *   timezone: 'Asia/Kolkata',
   * });
   * ```
   */
  create(
    body: AIFilterSearchCreateParams,
    options?: RequestOptions,
  ): APIPromise<AIFilterSearchCreateResponse> {
    return this._client.post('/v1/ai-filter-search', { body, ...options });
  }
}

export interface AIFilterSearchCreateResponse {
  /**
   * Suggested asset-type filter derived from the prompt. Empty string means no
   * file-type restriction.
   */
  fileType?: '' | 'images' | 'videos' | 'cssJs' | 'others';

  /**
   * Whether previous file versions should be included in the search results.
   */
  isVersionIncludedInSearch?: boolean;

  /**
   * Generated query in ImageKit's Lucene-like syntax. Pass this as the `searchQuery`
   * parameter to the list and search assets API. Empty string when no filters could
   * be derived from the prompt.
   */
  searchQuery?: string;
}

export interface AIFilterSearchCreateParams {
  /**
   * Natural-language description of what to search for, e.g. "red dresses tagged
   * summer uploaded last month".
   */
  prompt: string;

  /**
   * Absolute path of the folder the user is currently in. Used to resolve relative
   * references like "this folder" in the prompt.
   */
  currentFolder?: string;

  /**
   * IANA timezone (e.g. `Asia/Kolkata`) used to resolve relative date references in
   * the prompt. Defaults to UTC when omitted.
   */
  timezone?: string;
}

export declare namespace AIFilterSearch {
  export {
    type AIFilterSearchCreateResponse as AIFilterSearchCreateResponse,
    type AIFilterSearchCreateParams as AIFilterSearchCreateParams,
  };
}
