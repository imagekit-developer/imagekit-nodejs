// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import ImageKit from '@imagekit/nodejs';

const client = new ImageKit({
  username: 'My Username',
  password: 'My Password',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource customMetadataFields', () => {
  // skipped: tests are disabled for the time being
  test.skip('create: only required params', async () => {
    const responsePromise = client.customMetadataFields.create({
      label: 'price',
      name: 'price',
      schema: { type: 'Number' },
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
  test.skip('create: required and optional params', async () => {
    const response = await client.customMetadataFields.create({
      label: 'price',
      name: 'price',
      schema: {
        type: 'Number',
        defaultValue: 'string',
        isValueRequired: true,
        maxLength: 0,
        maxValue: 3000,
        minLength: 0,
        minValue: 1000,
        selectOptions: ['small', 'medium', 'large', 30, 40, true],
      },
    });
  });

  // skipped: tests are disabled for the time being
  test.skip('update', async () => {
    const responsePromise = client.customMetadataFields.update('id');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // skipped: tests are disabled for the time being
  test.skip('update: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.customMetadataFields.update(
        'id',
        {
          label: 'price',
          schema: {
            defaultValue: 'string',
            isValueRequired: true,
            maxLength: 0,
            maxValue: 3000,
            minLength: 0,
            minValue: 1000,
            selectOptions: ['small', 'medium', 'large', 30, 40, true],
          },
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(ImageKit.NotFoundError);
  });

  // skipped: tests are disabled for the time being
  test.skip('list', async () => {
    const responsePromise = client.customMetadataFields.list();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // skipped: tests are disabled for the time being
  test.skip('list: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.customMetadataFields.list({ includeDeleted: true }, { path: '/_stainless_unknown_path' }),
    ).rejects.toThrow(ImageKit.NotFoundError);
  });

  // skipped: tests are disabled for the time being
  test.skip('delete', async () => {
    const responsePromise = client.customMetadataFields.delete('id');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });
});
