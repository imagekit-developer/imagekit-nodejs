// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Job extends APIResource {
  /**
   * This API returns the status of a bulk job like copy and move folder operations.
   *
   * @example
   * ```ts
   * const job = await client.folders.job.get('jobId');
   * ```
   */
  get(jobID: string, options?: RequestOptions): APIPromise<JobGetResponse> {
    return this._client.get(path`/v1/bulkJobs/${jobID}`, options);
  }
}

export interface JobGetResponse {
  /**
   * Unique identifier of the bulk job.
   */
  jobId?: string;

  /**
   * Unique identifier of the purge request. This will be present only if
   * `purgeCache` is set to `true` in the rename folder API request.
   */
  purgeRequestId?: string;

  /**
   * Status of the bulk job.
   */
  status?: 'Pending' | 'Completed';

  /**
   * Type of the bulk job.
   */
  type?: 'COPY_FOLDER' | 'MOVE_FOLDER' | 'RENAME_FOLDER';
}

export declare namespace Job {
  export { type JobGetResponse as JobGetResponse };
}
