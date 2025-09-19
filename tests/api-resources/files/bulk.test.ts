// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import ImageKit from '@imagekit/nodejs';

const client = new ImageKit({
  privateKey: 'My Private Key',
  password: 'My Password',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource bulk', () => {
  // Prism tests are disabled
  test.skip('delete: only required params', async () => {
    const responsePromise = client.files.bulk.delete({
      fileIds: ['598821f949c0a938d57563bd', '598821f949c0a938d57563be'],
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('delete: required and optional params', async () => {
    const response = await client.files.bulk.delete({
      fileIds: ['598821f949c0a938d57563bd', '598821f949c0a938d57563be'],
    });
  });

  // Prism tests are disabled
  test.skip('addTags: only required params', async () => {
    const responsePromise = client.files.bulk.addTags({
      fileIds: ['598821f949c0a938d57563bd', '598821f949c0a938d57563be'],
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

  // Prism tests are disabled
  test.skip('addTags: required and optional params', async () => {
    const response = await client.files.bulk.addTags({
      fileIds: ['598821f949c0a938d57563bd', '598821f949c0a938d57563be'],
      tags: ['t-shirt', 'round-neck', 'sale2019'],
    });
  });

  // Prism tests are disabled
  test.skip('removeAITags: only required params', async () => {
    const responsePromise = client.files.bulk.removeAITags({
      AITags: ['t-shirt', 'round-neck', 'sale2019'],
      fileIds: ['598821f949c0a938d57563bd', '598821f949c0a938d57563be'],
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('removeAITags: required and optional params', async () => {
    const response = await client.files.bulk.removeAITags({
      AITags: ['t-shirt', 'round-neck', 'sale2019'],
      fileIds: ['598821f949c0a938d57563bd', '598821f949c0a938d57563be'],
    });
  });

  // Prism tests are disabled
  test.skip('removeTags: only required params', async () => {
    const responsePromise = client.files.bulk.removeTags({
      fileIds: ['598821f949c0a938d57563bd', '598821f949c0a938d57563be'],
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

  // Prism tests are disabled
  test.skip('removeTags: required and optional params', async () => {
    const response = await client.files.bulk.removeTags({
      fileIds: ['598821f949c0a938d57563bd', '598821f949c0a938d57563be'],
      tags: ['t-shirt', 'round-neck', 'sale2019'],
    });
  });
});
