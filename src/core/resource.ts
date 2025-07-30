// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import type { Imagekit } from '../client';

export abstract class APIResource {
  protected _client: Imagekit;

  constructor(client: Imagekit) {
    this._client = client;
  }
}
