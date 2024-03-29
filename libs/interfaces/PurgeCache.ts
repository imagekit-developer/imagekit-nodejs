/**
 * Response when purging CDN and ImageKit.io internal cache
 *
 * @see {@link https://docs.imagekit.io/api-reference/media-api/purge-cache#response-structure-and-status-code}
 */

export interface PurgeCacheResponse {
  /**
   * requestId can be used to fetch the status of submitted purge request.
   */
  requestId: string;
}

/**
 * Response when getting the status of submitted purge request.
 *
 * @see {@link https://docs.imagekit.io/api-reference/media-api/purge-cache-status#understanding-response}
 */

export interface PurgeCacheStatusResponse {
  /**
   * Pending - The request has been successfully submitted, and purging is in progress.
   * Complete - The purge request has been successfully completed. And now you should get a fresh object.
   * Check the Age header in response to confirm this.
   */
  status: "Pending" | "Completed";
}
