// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import ImageKit from '@imagekit/nodejs';

const client = new ImageKit({
  username: 'My Username',
  password: 'My Password',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource purge', () => {
  // skipped: tests are disabled for the time being
  test.skip('execute: only required params', async () => {
    const responsePromise = client.files.purge.execute({
      url: 'https://ik.imagekit.io/your_imagekit_id/default-image.jpg',
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
  test.skip('execute: required and optional params', async () => {
    const response = await client.files.purge.execute({
      url: 'https://ik.imagekit.io/your_imagekit_id/default-image.jpg',
    });
  });

  // skipped: tests are disabled for the time being
  test.skip('status', async () => {
    const responsePromise = client.files.purge.status('requestId');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });
});
