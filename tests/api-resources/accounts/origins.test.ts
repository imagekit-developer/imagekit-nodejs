// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import ImageKit from '@imagekit/nodejs';

const client = new ImageKit({
  privateAPIKey: 'My Private API Key',
  password: 'My Password',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource origins', () => {
  // Prism tests are disabled
  test.skip('create: only required params', async () => {
    const responsePromise = client.accounts.origins.create({ body: { name: 'name', type: 'S3' } });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('create: required and optional params', async () => {
    const response = await client.accounts.origins.create({
      body: {
        name: 'name',
        type: 'S3',
        accessKey: 'x',
        accountName: 'x',
        baseUrl: 'https://example.com',
        baseUrlForCanonicalHeader: 'https://example.com',
        bucket: 'x',
        clientEmail: 'dev@stainless.com',
        clientId: 'x',
        clientSecret: 'x',
        container: 'x',
        endpoint: 'https://example.com',
        forwardHostHeaderToOrigin: true,
        includeCanonicalHeader: true,
        password: 'x',
        prefix: 'prefix',
        privateKey: 'x',
        s3ForcePathStyle: true,
        sasToken: 'x',
        secretKey: 'x',
        username: 'x',
      },
    });
  });

  // Prism tests are disabled
  test.skip('update: only required params', async () => {
    const responsePromise = client.accounts.origins.update('id', { body: { name: 'name', type: 'S3' } });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('update: required and optional params', async () => {
    const response = await client.accounts.origins.update('id', {
      body: {
        name: 'name',
        type: 'S3',
        accessKey: 'x',
        accountName: 'x',
        baseUrl: 'https://example.com',
        baseUrlForCanonicalHeader: 'https://example.com',
        bucket: 'x',
        clientEmail: 'dev@stainless.com',
        clientId: 'x',
        clientSecret: 'x',
        container: 'x',
        endpoint: 'https://example.com',
        forwardHostHeaderToOrigin: true,
        includeCanonicalHeader: true,
        password: 'x',
        prefix: 'prefix',
        privateKey: 'x',
        s3ForcePathStyle: true,
        sasToken: 'x',
        secretKey: 'x',
        username: 'x',
      },
    });
  });

  // Prism tests are disabled
  test.skip('list', async () => {
    const responsePromise = client.accounts.origins.list();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('delete', async () => {
    const responsePromise = client.accounts.origins.delete('id');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('get', async () => {
    const responsePromise = client.accounts.origins.get('id');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });
});
