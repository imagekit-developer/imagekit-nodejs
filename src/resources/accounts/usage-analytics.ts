// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as UsageAnalyticsAPI from './usage-analytics';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';

export class UsageAnalytics extends APIResource {
  /**
   * **Note:** This API is currently in beta.
   *
   * Get the account analytics data between two dates. The response covers the period
   * from the start date to the end date, both dates inclusive. Both dates are
   * interpreted as UTC calendar days.
   *
   * The returned data is scoped to the requesting account only. Unlike
   * `/v1/accounts/usage`, an agency account's analytics are not aggregated across
   * its child accounts.
   *
   * The response is cached for 5 minutes per account and date range. Use
   * `generatedAt` to check how fresh the returned data is.
   *
   * @example
   * ```ts
   * const usageAnalyticsResponse =
   *   await client.accounts.usageAnalytics.get({
   *     endDate: '2019-12-27',
   *     startDate: '2019-12-27',
   *   });
   * ```
   */
  get(query: UsageAnalyticsGetParams, options?: RequestOptions): APIPromise<UsageAnalyticsResponse> {
    return this._client.get('/v1/accounts/usage-analytics', { query, ...options });
  }
}

export interface RequestBandwidthEntry {
  /**
   * Total bandwidth used in bytes.
   */
  bandwidthBytes: number;

  /**
   * Number of requests.
   */
  requestCount: number;
}

export interface UsageAnalyticsResponse {
  /**
   * Total bandwidth, in bytes, utilized during the specified date range.
   */
  bandwidthBytes: number;

  /**
   * CDN traffic grouped by browser.
   */
  browser: UsageAnalyticsResponse.Browser;

  /**
   * CDN cache hit, miss and error counts for the date range.
   */
  cache: UsageAnalyticsResponse.Cache;

  /**
   * CDN traffic grouped by country.
   */
  country: UsageAnalyticsResponse.Country;

  /**
   * CDN traffic grouped by device and operating system (e.g. `Desktop - Apple Mac`,
   * `Smartphone - Apple iPhone`).
   */
  device: UsageAnalyticsResponse.Device;

  /**
   * End date of the computed analytics data.
   */
  endDate: string;

  /**
   * Request count grouped by origin error reason. This covers failed origin fetches,
   * such as an asset not found at origin or an origin timeout. It is not the HTTP
   * status code returned to the client, see `statusCodes` for that.
   */
  errorReasons: Array<UsageAnalyticsResponse.ErrorReason>;

  /**
   * Raw per-extension operation counts for the date range. These are raw operation
   * counts, not billable extension units. For billable usage, use the
   * `/v1/accounts/usage` endpoint.
   */
  extensions: Array<UsageAnalyticsResponse.Extension>;

  /**
   * CDN traffic grouped by response `Content-Type`.
   */
  format: UsageAnalyticsResponse.Format;

  /**
   * Date and time when the analytics data was computed. Use this to gauge how fresh
   * the returned data is. The date and time is in ISO8601 format.
   */
  generatedAt: string;

  /**
   * Total number of requests made during the specified date range.
   */
  requestCount: number;

  /**
   * Start date of the computed analytics data.
   */
  startDate: string;

  /**
   * Request count grouped by HTTP status code.
   */
  statusCodes: Array<UsageAnalyticsResponse.StatusCode>;

  /**
   * Top URLs that returned a 404 response.
   */
  top404Assets: Array<UsageAnalyticsResponse.Top404Asset>;

  /**
   * Top image assets by traffic.
   */
  topImages: UsageAnalyticsResponse.TopImages;

  /**
   * Top image transformation strings by traffic.
   */
  topImageTransforms: UsageAnalyticsResponse.TopImageTransforms;

  /**
   * Top non-image, non-video assets by traffic.
   */
  topOtherAssets: UsageAnalyticsResponse.TopOtherAssets;

  /**
   * Top HTTP referrers by traffic.
   */
  topReferrers: UsageAnalyticsResponse.TopReferrers;

  /**
   * Top user agents by traffic.
   */
  topUserAgents: UsageAnalyticsResponse.TopUserAgents;

  /**
   * Top video assets by traffic.
   */
  topVideos: UsageAnalyticsResponse.TopVideos;

  /**
   * Top video transformation strings by traffic.
   */
  topVideoTransforms: UsageAnalyticsResponse.TopVideoTransforms;

  /**
   * CDN traffic grouped by configured URL endpoint. Traffic that does not match any
   * named URL endpoint pattern is grouped under `Default`.
   */
  urlEndpoints: UsageAnalyticsResponse.URLEndpoints;

  /**
   * Raw observed video transcode output duration, in seconds, grouped by resolution
   * and codec. These are raw seconds, not billable Video Processing Units (VPU). For
   * billable VPU totals, use the `/v1/accounts/usage` endpoint.
   */
  videoProcessing: Array<UsageAnalyticsResponse.VideoProcessing>;

  [k: string]: unknown;
}

export namespace UsageAnalyticsResponse {
  /**
   * CDN traffic grouped by browser.
   */
  export interface Browser {
    /**
     * Top browsers sorted by bandwidth utilized.
     */
    byBandwidth: Array<Browser.ByBandwidth>;

    /**
     * Top browsers sorted by request count.
     */
    byRequests: Array<Browser.ByRequest>;
  }

  export namespace Browser {
    export interface ByBandwidth extends UsageAnalyticsAPI.RequestBandwidthEntry {
      /**
       * Browser name (e.g. `Chrome`).
       */
      name: string;
    }

    export interface ByRequest extends UsageAnalyticsAPI.RequestBandwidthEntry {
      /**
       * Browser name (e.g. `Chrome`).
       */
      name: string;
    }
  }

  /**
   * CDN cache hit, miss and error counts for the date range.
   */
  export interface Cache {
    /**
     * Number of requests where the CDN encountered a cache error or exceeded capacity
     * while serving the response.
     */
    errorCount: number;

    /**
     * Number of requests served from cache, including full hits and revalidated hits.
     */
    hitCount: number;

    /**
     * Number of requests that were not found in cache and had to be fetched from
     * origin.
     */
    missCount: number;
  }

  /**
   * CDN traffic grouped by country.
   */
  export interface Country {
    /**
     * Top requesting countries sorted by total bandwidth utilized.
     */
    byBandwidth: Array<Country.ByBandwidth>;

    /**
     * Top requesting countries sorted by request count.
     */
    byRequests: Array<Country.ByRequest>;
  }

  export namespace Country {
    export interface ByBandwidth extends UsageAnalyticsAPI.RequestBandwidthEntry {
      /**
       * ISO country code.
       */
      code: string;

      /**
       * Country name.
       */
      name: string;
    }

    export interface ByRequest extends UsageAnalyticsAPI.RequestBandwidthEntry {
      /**
       * ISO country code.
       */
      code: string;

      /**
       * Country name.
       */
      name: string;
    }
  }

  /**
   * CDN traffic grouped by device and operating system (e.g. `Desktop - Apple Mac`,
   * `Smartphone - Apple iPhone`).
   */
  export interface Device {
    /**
     * Top device/OS combinations sorted by bandwidth utilized.
     */
    byBandwidth: Array<Device.ByBandwidth>;

    /**
     * Top device/OS combinations sorted by request count.
     */
    byRequests: Array<Device.ByRequest>;
  }

  export namespace Device {
    export interface ByBandwidth extends UsageAnalyticsAPI.RequestBandwidthEntry {
      /**
       * Device category combined with operating system or vendor (e.g.
       * `Desktop - Windows PC`).
       */
      name: string;
    }

    export interface ByRequest extends UsageAnalyticsAPI.RequestBandwidthEntry {
      /**
       * Device category combined with operating system or vendor (e.g.
       * `Desktop - Windows PC`).
       */
      name: string;
    }
  }

  export interface ErrorReason {
    /**
     * Description of the error reason.
     */
    name: string;

    /**
     * Number of requests that failed with this error reason.
     */
    requestCount: number;
  }

  export interface Extension {
    /**
     * Extension identifier.
     */
    name: string;

    /**
     * Number of times this extension ran during the date range.
     */
    operationCount: number;
  }

  /**
   * CDN traffic grouped by response `Content-Type`.
   */
  export interface Format {
    /**
     * Top content types sorted by bandwidth utilized.
     */
    byBandwidth: Array<Format.ByBandwidth>;

    /**
     * Top content types sorted by request count.
     */
    byRequests: Array<Format.ByRequest>;
  }

  export namespace Format {
    export interface ByBandwidth extends UsageAnalyticsAPI.RequestBandwidthEntry {
      /**
       * MIME type (e.g. `image/webp`).
       */
      name: string;
    }

    export interface ByRequest extends UsageAnalyticsAPI.RequestBandwidthEntry {
      /**
       * MIME type (e.g. `image/webp`).
       */
      name: string;
    }
  }

  export interface StatusCode {
    /**
     * HTTP status code.
     */
    name: string;

    /**
     * Number of requests that received this status code.
     */
    requestCount: number;
  }

  export interface Top404Asset {
    /**
     * URL that returned a 404 response.
     */
    name: string;

    /**
     * Number of requests to this URL that returned a 404 response.
     */
    requestCount: number;
  }

  /**
   * Top image assets by traffic.
   */
  export interface TopImages {
    /**
     * Top image assets sorted by bandwidth utilized.
     */
    byBandwidth: Array<TopImages.ByBandwidth>;

    /**
     * Top image assets sorted by request count.
     */
    byRequests: Array<TopImages.ByRequest>;
  }

  export namespace TopImages {
    export interface ByBandwidth extends UsageAnalyticsAPI.RequestBandwidthEntry {
      /**
       * URL of the image asset.
       */
      name: string;
    }

    export interface ByRequest extends UsageAnalyticsAPI.RequestBandwidthEntry {
      /**
       * URL of the image asset.
       */
      name: string;
    }
  }

  /**
   * Top image transformation strings by traffic.
   */
  export interface TopImageTransforms {
    /**
     * Top image transformation strings sorted by bandwidth utilized.
     */
    byBandwidth: Array<TopImageTransforms.ByBandwidth>;

    /**
     * Top image transformation strings sorted by request count.
     */
    byRequests: Array<TopImageTransforms.ByRequest>;
  }

  export namespace TopImageTransforms {
    export interface ByBandwidth extends UsageAnalyticsAPI.RequestBandwidthEntry {
      /**
       * Image transformation string (e.g. `tr:w-400,h-400`).
       */
      name: string;
    }

    export interface ByRequest extends UsageAnalyticsAPI.RequestBandwidthEntry {
      /**
       * Image transformation string (e.g. `tr:w-400,h-400`).
       */
      name: string;
    }
  }

  /**
   * Top non-image, non-video assets by traffic.
   */
  export interface TopOtherAssets {
    /**
     * Top non-image, non-video assets sorted by bandwidth utilized.
     */
    byBandwidth: Array<TopOtherAssets.ByBandwidth>;

    /**
     * Top non-image, non-video assets sorted by request count.
     */
    byRequests: Array<TopOtherAssets.ByRequest>;
  }

  export namespace TopOtherAssets {
    export interface ByBandwidth extends UsageAnalyticsAPI.RequestBandwidthEntry {
      /**
       * URL of the non-image, non-video asset.
       */
      name: string;
    }

    export interface ByRequest extends UsageAnalyticsAPI.RequestBandwidthEntry {
      /**
       * URL of the non-image, non-video asset.
       */
      name: string;
    }
  }

  /**
   * Top HTTP referrers by traffic.
   */
  export interface TopReferrers {
    /**
     * Top HTTP referrers sorted by bandwidth utilized.
     */
    byBandwidth: Array<TopReferrers.ByBandwidth>;

    /**
     * Top HTTP referrers sorted by request count.
     */
    byRequests: Array<TopReferrers.ByRequest>;
  }

  export namespace TopReferrers {
    export interface ByBandwidth extends UsageAnalyticsAPI.RequestBandwidthEntry {
      /**
       * Referrer URL.
       */
      name: string;
    }

    export interface ByRequest extends UsageAnalyticsAPI.RequestBandwidthEntry {
      /**
       * Referrer URL.
       */
      name: string;
    }
  }

  /**
   * Top user agents by traffic.
   */
  export interface TopUserAgents {
    /**
     * Top user agents sorted by bandwidth utilized.
     */
    byBandwidth: Array<TopUserAgents.ByBandwidth>;

    /**
     * Top user agents sorted by request count.
     */
    byRequests: Array<TopUserAgents.ByRequest>;
  }

  export namespace TopUserAgents {
    export interface ByBandwidth extends UsageAnalyticsAPI.RequestBandwidthEntry {
      /**
       * User agent string.
       */
      name: string;
    }

    export interface ByRequest extends UsageAnalyticsAPI.RequestBandwidthEntry {
      /**
       * User agent string.
       */
      name: string;
    }
  }

  /**
   * Top video assets by traffic.
   */
  export interface TopVideos {
    /**
     * Top video assets sorted by bandwidth utilized.
     */
    byBandwidth: Array<TopVideos.ByBandwidth>;

    /**
     * Top video assets sorted by request count.
     */
    byRequests: Array<TopVideos.ByRequest>;
  }

  export namespace TopVideos {
    export interface ByBandwidth extends UsageAnalyticsAPI.RequestBandwidthEntry {
      /**
       * URL of the video asset.
       */
      name: string;
    }

    export interface ByRequest extends UsageAnalyticsAPI.RequestBandwidthEntry {
      /**
       * Full URL of the video asset (e.g. `https://ik.imagekit.io/demo/clip.mp4`).
       */
      name: string;
    }
  }

  /**
   * Top video transformation strings by traffic.
   */
  export interface TopVideoTransforms {
    /**
     * Top video transformation strings sorted by bandwidth utilized.
     */
    byBandwidth: Array<TopVideoTransforms.ByBandwidth>;

    /**
     * Top video transformation strings sorted by request count.
     */
    byRequests: Array<TopVideoTransforms.ByRequest>;
  }

  export namespace TopVideoTransforms {
    export interface ByBandwidth extends UsageAnalyticsAPI.RequestBandwidthEntry {
      /**
       * Video transformation string (e.g. `tr:h-720,f-mp4`).
       */
      name: string;
    }

    export interface ByRequest extends UsageAnalyticsAPI.RequestBandwidthEntry {
      /**
       * Video transformation string (e.g. `tr:h-720,f-mp4`).
       */
      name: string;
    }
  }

  /**
   * CDN traffic grouped by configured URL endpoint. Traffic that does not match any
   * named URL endpoint pattern is grouped under `Default`.
   */
  export interface URLEndpoints {
    /**
     * Top URL endpoints sorted by bandwidth utilized.
     */
    byBandwidth: Array<URLEndpoints.ByBandwidth>;

    /**
     * Top URL endpoints sorted by request count.
     */
    byRequests: Array<URLEndpoints.ByRequest>;
  }

  export namespace URLEndpoints {
    export interface ByBandwidth extends UsageAnalyticsAPI.RequestBandwidthEntry {
      /**
       * URL endpoint name, or `Default` for traffic that does not match a named
       * endpoint.
       */
      name: string;
    }

    export interface ByRequest extends UsageAnalyticsAPI.RequestBandwidthEntry {
      /**
       * URL endpoint name, or `Default` for traffic that does not match a named
       * endpoint.
       */
      name: string;
    }
  }

  export interface VideoProcessing {
    /**
     * Video codec used for the output (e.g. `h264`, `av1`).
     */
    codec: string;

    /**
     * Total output duration, in seconds, for this resolution and codec combination.
     */
    durationSeconds: number;

    /**
     * Output resolution tier (e.g. `SD`, `HD`, `4K`).
     */
    resolution: string;
  }
}

export interface UsageAnalyticsGetParams {
  /**
   * Specify an `endDate` in `YYYY-MM-DD` format, interpreted as a UTC calendar day.
   * It should be after the `startDate`. The difference between `startDate` and
   * `endDate` should be less than 90 days.
   */
  endDate: string;

  /**
   * Specify a `startDate` in `YYYY-MM-DD` format, interpreted as a UTC calendar day.
   * It should be before the `endDate`. The difference between `startDate` and
   * `endDate` should be less than 90 days.
   */
  startDate: string;
}

export declare namespace UsageAnalytics {
  export {
    type RequestBandwidthEntry as RequestBandwidthEntry,
    type UsageAnalyticsResponse as UsageAnalyticsResponse,
    type UsageAnalyticsGetParams as UsageAnalyticsGetParams,
  };
}
