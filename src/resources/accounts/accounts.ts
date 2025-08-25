// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as OriginsAPI from './origins';
import {
  Origin,
  OriginCreateParams,
  OriginListResponse,
  OriginResponse,
  OriginUpdateParams,
  Origins,
} from './origins';
import * as URLEndpointsAPI from './url-endpoints';
import {
  URLEndpoint,
  URLEndpointCreateParams,
  URLEndpointCreateResponse,
  URLEndpointGetResponse,
  URLEndpointListResponse,
  URLEndpointUpdateParams,
  URLEndpointUpdateResponse,
  URLEndpoints,
} from './url-endpoints';
import * as UsageAPI from './usage';
import { Usage, UsageGetParams, UsageGetResponse } from './usage';

export class Accounts extends APIResource {
  usage: UsageAPI.Usage = new UsageAPI.Usage(this._client);
  origins: OriginsAPI.Origins = new OriginsAPI.Origins(this._client);
  urlEndpoints: URLEndpointsAPI.URLEndpoints = new URLEndpointsAPI.URLEndpoints(this._client);
}

Accounts.Usage = Usage;
Accounts.Origins = Origins;
Accounts.URLEndpoints = URLEndpoints;

export declare namespace Accounts {
  export { Usage as Usage, type UsageGetResponse as UsageGetResponse, type UsageGetParams as UsageGetParams };

  export {
    Origins as Origins,
    type Origin as Origin,
    type OriginResponse as OriginResponse,
    type OriginListResponse as OriginListResponse,
    type OriginCreateParams as OriginCreateParams,
    type OriginUpdateParams as OriginUpdateParams,
  };

  export {
    URLEndpoints as URLEndpoints,
    type URLEndpoint as URLEndpoint,
    type URLEndpointCreateResponse as URLEndpointCreateResponse,
    type URLEndpointUpdateResponse as URLEndpointUpdateResponse,
    type URLEndpointListResponse as URLEndpointListResponse,
    type URLEndpointGetResponse as URLEndpointGetResponse,
    type URLEndpointCreateParams as URLEndpointCreateParams,
    type URLEndpointUpdateParams as URLEndpointUpdateParams,
  };
}
