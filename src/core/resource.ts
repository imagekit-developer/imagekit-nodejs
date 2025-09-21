// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import type { ImageKit } from '../client';

export abstract class APIResource {
  protected _client: ImageKit;

  constructor(client: ImageKit) {
    this._client = client;
  }
}
