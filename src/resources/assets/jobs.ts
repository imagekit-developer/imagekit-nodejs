// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Jobs extends APIResource {
  /**
   * Returns the status of a bulk job such as a copy, move, or rename folder
   * operation.
   *
   * @example
   * ```ts
   * const job = await client.assets.jobs.get('job_id');
   * ```
   */
  get(jobID: string, options?: RequestOptions): APIPromise<JobGetResponse> {
    return this._client.get(path`/v2/assets/jobs/${jobID}`, options);
  }
}

export interface JobGetResponse {
  /**
   * Unique identifier of the bulk job.
   */
  job_id: string;

  /**
   * Status of the bulk job.
   */
  status: 'Pending' | 'Completed';

  /**
   * Type of the bulk job.
   */
  type: 'COPY_FOLDER' | 'MOVE_FOLDER' | 'RENAME_FOLDER';

  /**
   * Unique identifier of the purge request. Present only if `purge_cache` was set to
   * `true` in the rename folder API request.
   */
  purge_request_id?: string;
}

export declare namespace Jobs {
  export { type JobGetResponse as JobGetResponse };
}
