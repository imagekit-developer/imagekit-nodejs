// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as InvalidationAPI from './invalidation';
import {
  Invalidation,
  InvalidationCreateParams,
  InvalidationCreateResponse,
  InvalidationGetResponse,
} from './invalidation';

export class Cache extends APIResource {
  invalidation: InvalidationAPI.Invalidation = new InvalidationAPI.Invalidation(this._client);
}

Cache.Invalidation = Invalidation;

export declare namespace Cache {
  export {
    Invalidation as Invalidation,
    type InvalidationCreateResponse as InvalidationCreateResponse,
    type InvalidationGetResponse as InvalidationGetResponse,
    type InvalidationCreateParams as InvalidationCreateParams,
  };
}
