// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import ImageKit from '@imagekit/nodejs';

const client = new ImageKit({
  privateKey: 'My Private Key',
  password: 'My Password',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource bulk', () => {
  // Mock server tests are disabled
  test.skip('delete: only required params', async () => {
    const responsePromise = client.assets.bulk.delete({
      asset_ids: ['598821f949c0a938d57563bd', '6441fce4e809dd54b0dee029'],
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('delete: required and optional params', async () => {
    const response = await client.assets.bulk.delete({
      asset_ids: ['598821f949c0a938d57563bd', '6441fce4e809dd54b0dee029'],
    });
  });

  // Mock server tests are disabled
  test.skip('addTags: only required params', async () => {
    const responsePromise = client.assets.bulk.addTags({
      asset_ids: ['598821f949c0a938d57563bd', '598821f949c0a938d57563be'],
      tags: ['t-shirt', 'round-neck', 'sale2019'],
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('addTags: required and optional params', async () => {
    const response = await client.assets.bulk.addTags({
      asset_ids: ['598821f949c0a938d57563bd', '598821f949c0a938d57563be'],
      tags: ['t-shirt', 'round-neck', 'sale2019'],
    });
  });

  // Mock server tests are disabled
  test.skip('removeTags: only required params', async () => {
    const responsePromise = client.assets.bulk.removeTags({
      asset_ids: ['598821f949c0a938d57563bd', '598821f949c0a938d57563be'],
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('removeTags: required and optional params', async () => {
    const response = await client.assets.bulk.removeTags({
      asset_ids: ['598821f949c0a938d57563bd', '598821f949c0a938d57563be'],
      ai_tags: ['string'],
      tags: ['sale2019'],
    });
  });
});
