// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import ImageKit from '@imagekit/nodejs';

const client = new ImageKit({
  username: 'My Username',
  password: 'My Password',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource details', () => {
  // skipped: tests are disabled for the time being
  test.skip('retrieve', async () => {
    const responsePromise = client.files.details.retrieve('fileId');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // skipped: tests are disabled for the time being
  test.skip('update', async () => {
    const responsePromise = client.files.details.update('fileId');
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
      client.files.details.update(
        'fileId',
        {
          customCoordinates: 'customCoordinates',
          customMetadata: {},
          extensions: [
            {
              name: 'remove-bg',
              options: {
                add_shadow: true,
                bg_color: 'bg_color',
                bg_image_url: 'bg_image_url',
                semitransparency: true,
              },
            },
          ],
          removeAITags: ['string'],
          tags: ['tag1', 'tag2'],
          webhookUrl: 'webhookUrl',
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(ImageKit.NotFoundError);
  });
});
