// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import ImageKit from '@imagekit/nodejs';

const client = new ImageKit({
  privateAPIKey: 'My Private API Key',
  myPassword: 'My My Password',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource bulkJobs', () => {
  // skipped: tests are disabled for the time being
  test.skip('copyFolder: only required params', async () => {
    const responsePromise = client.bulkJobs.copyFolder({
      destinationPath: '/path/of/destination/folder',
      sourceFolderPath: '/path/of/source/folder',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // skipped: tests are disabled for the time being
  test.skip('copyFolder: required and optional params', async () => {
    const response = await client.bulkJobs.copyFolder({
      destinationPath: '/path/of/destination/folder',
      sourceFolderPath: '/path/of/source/folder',
      includeVersions: true,
    });
  });

  // skipped: tests are disabled for the time being
  test.skip('moveFolder: only required params', async () => {
    const responsePromise = client.bulkJobs.moveFolder({
      destinationPath: '/path/of/destination/folder',
      sourceFolderPath: '/path/of/source/folder',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // skipped: tests are disabled for the time being
  test.skip('moveFolder: required and optional params', async () => {
    const response = await client.bulkJobs.moveFolder({
      destinationPath: '/path/of/destination/folder',
      sourceFolderPath: '/path/of/source/folder',
    });
  });

  // skipped: tests are disabled for the time being
  test.skip('retrieveStatus', async () => {
    const responsePromise = client.bulkJobs.retrieveStatus('jobId');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });
});
