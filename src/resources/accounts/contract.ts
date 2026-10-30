// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';

export class Contract extends APIResource {
  /**
   * Get the account's contract terms and the usage consumed against them in the
   * current contract term. Bandwidth is in bytes; video processing units, extension
   * units and purge cache requests are counts.
   *
   * For an agency account, consumption includes the child accounts billed to it. A
   * child account billed to its parent cannot call this endpoint; call it with the
   * parent account's credentials instead.
   *
   * Contract terms are read live; consumption is refreshed periodically, not on
   * every request. Use `asOf` to check how fresh it is. Contracts of one month or
   * less are reported as `hasContract: false`. The response is cached for 5 minutes
   * per account.
   *
   * Requires an API key with account management access.
   *
   * @example
   * ```ts
   * const contract = await client.accounts.contract.get();
   * ```
   */
  get(options?: RequestOptions): APIPromise<ContractGetResponse> {
    return this._client.get('/v1/accounts/contract', options);
  }
}

export interface ContractUnits {
  /**
   * Bandwidth in bytes.
   */
  bandwidthBytes: number;

  /**
   * Number of extension units.
   */
  extensionUnitsCount: number;

  /**
   * Number of purge cache requests.
   */
  purgeCacheRequests: number;

  /**
   * Number of video processing units.
   */
  videoProcessingUnitsCount: number;
}

export interface ContractGetResponse {
  /**
   * Whether the account has an active contract. The other fields are present only
   * when it does.
   */
  hasContract: boolean;

  /**
   * When `consumed` was last computed. `null` if it has not been computed for the
   * contract yet; `consumed` is then all zeros.
   */
  asOf?: string | null;

  /**
   * Usage consumed in the current contract term. For an agency account, this
   * includes the child accounts billed to it.
   */
  consumed?: ContractUnits;

  /**
   * Length of each contract term in months.
   */
  contractMonths?: number;

  /**
   * End date of the current contract term.
   */
  effectiveContractEndDate?: string;

  /**
   * Start date of the current contract term. It moves forward when the contract
   * renews.
   */
  effectiveContractStartDate?: string;

  /**
   * Start date of the first contract term.
   */
  originalContractStartDate?: string;

  /**
   * Usage included in the current contract term.
   */
  quota?: ContractUnits;
}

export declare namespace Contract {
  export { type ContractUnits as ContractUnits, type ContractGetResponse as ContractGetResponse };
}
