// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import ImageKit, { toFile } from '@imagekit/nodejs';

const client = new ImageKit({
  privateKey: 'My Private Key',
  password: 'My Password',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource assets', () => {
  // Mock server tests are disabled
  test.skip('upload: only required params', async () => {
    const responsePromise = client.assets.upload({
      file: await toFile(Buffer.from('Example data'), 'README.md'),
      file_name: 'file_name',
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
  test.skip('upload: required and optional params', async () => {
    const response = await client.assets.upload({
      file: await toFile(Buffer.from('Example data'), 'README.md'),
      file_name: 'file_name',
      token: 'token',
      checks: '"request.folder" : "marketing/"\n',
      custom_coordinates: 'custom_coordinates',
      custom_metadata: { brand: 'bar', color: 'bar' },
      description: 'Running shoes',
      extensions: [
        {
          name: 'remove-bg',
          options: {
            add_shadow: true,
            bg_color: 'bg_color',
            bg_image_url: 'bg_image_url',
            semi_transparency: true,
          },
        },
        {
          name: 'remove-bg',
          options: {
            add_shadow: true,
            bg_color: 'bg_color',
            bg_image_url: 'bg_image_url',
            semi_transparency: true,
          },
        },
        { name: 'ai-auto-description' },
        {
          name: 'ai-tasks',
          tasks: [
            {
              instruction: 'What types of clothing items are visible in this image?',
              type: 'select_tags',
              max_selections: 1,
              min_selections: 0,
              vocabulary: ['shirt', 'tshirt', 'dress', 'trousers', 'jacket'],
            },
            {
              instruction: 'Is this a luxury or high-end fashion item?',
              type: 'yes_no',
              on_no: {
                add_tags: ['luxury', 'premium'],
                remove_tags: ['budget', 'affordable'],
                set_metadata: [{ field: 'price_range', value: 'premium' }],
                unset_metadata: [{ field: 'price_range' }],
              },
              on_unknown: {
                add_tags: ['luxury', 'premium'],
                remove_tags: ['budget', 'affordable'],
                set_metadata: [{ field: 'price_range', value: 'premium' }],
                unset_metadata: [{ field: 'price_range' }],
              },
              on_yes: {
                add_tags: ['luxury', 'premium'],
                remove_tags: ['budget', 'affordable'],
                set_metadata: [{ field: 'price_range', value: 'premium' }],
                unset_metadata: [{ field: 'price_range' }],
              },
            },
          ],
        },
        { id: 'ext_abc123', name: 'saved-extension' },
      ],
      folder: 'folder',
      is_private_file: true,
      is_published: true,
      overwrite: {
        ai_tags: true,
        custom_metadata: true,
        file: true,
        tags: true,
      },
      tags: ['t-shirt', 'round-neck', 'men'],
      transformation: {
        post: [
          { type: 'thumbnail', value: 'w-150,h-150' },
          {
            protocol: 'dash',
            type: 'abs',
            value: 'sr-240_360_480_720_1080',
          },
        ],
        pre: 'w-300,h-300,q-80',
      },
      use_unique_file_name: true,
    });
  });

  // Mock server tests are disabled
  test.skip('list', async () => {
    const responsePromise = client.assets.list();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('list: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.assets.list(
        {
          cursor: 'cursor',
          limit: 1,
          searchQuery: 'searchQuery',
          sort: 'ASC_NAME',
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(ImageKit.NotFoundError);
  });

  // Mock server tests are disabled
  test.skip('get', async () => {
    const responsePromise = client.assets.get('asset_id');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('update', async () => {
    const responsePromise = client.assets.update('asset_id', {});
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('delete', async () => {
    const responsePromise = client.assets.delete('asset_id');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('copy: only required params', async () => {
    const responsePromise = client.assets.copy({
      destination_path: '/folder/to/copy/into/',
      source_path: '/path/to/file.jpg',
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
  test.skip('copy: required and optional params', async () => {
    const response = await client.assets.copy({
      destination_path: '/folder/to/copy/into/',
      source_path: '/path/to/file.jpg',
      include_versions: true,
    });
  });

  // Mock server tests are disabled
  test.skip('move: only required params', async () => {
    const responsePromise = client.assets.move({
      destination_path: '/folder/to/move/into/',
      source_path: '/path/to/file.jpg',
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
  test.skip('move: required and optional params', async () => {
    const response = await client.assets.move({
      destination_path: '/folder/to/move/into/',
      source_path: '/path/to/file.jpg',
    });
  });

  // Mock server tests are disabled
  test.skip('rename: only required params', async () => {
    const responsePromise = client.assets.rename({
      new_name: 'new_file_name.jpg',
      path: '/path/to/file.jpg',
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
  test.skip('rename: required and optional params', async () => {
    const response = await client.assets.rename({
      new_name: 'new_file_name.jpg',
      path: '/path/to/file.jpg',
      purge_cache: true,
    });
  });
});
