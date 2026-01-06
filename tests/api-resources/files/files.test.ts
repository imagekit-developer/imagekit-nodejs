// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import ImageKit, { toFile } from '@imagekit/nodejs';

const client = new ImageKit({
  privateKey: 'My Private Key',
  password: 'My Password',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource files', () => {
  // Prism tests are disabled
  test.skip('update', async () => {
    const responsePromise = client.files.update('fileId', {});
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
    const responsePromise = client.files.delete('fileId');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('copy: only required params', async () => {
    const responsePromise = client.files.copy({
      destinationPath: '/folder/to/copy/into/',
      sourceFilePath: '/path/to/file.jpg',
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
  test.skip('copy: required and optional params', async () => {
    const response = await client.files.copy({
      destinationPath: '/folder/to/copy/into/',
      sourceFilePath: '/path/to/file.jpg',
      includeFileVersions: false,
    });
  });

  // Prism tests are disabled
  test.skip('get', async () => {
    const responsePromise = client.files.get('fileId');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('move: only required params', async () => {
    const responsePromise = client.files.move({
      destinationPath: '/folder/to/move/into/',
      sourceFilePath: '/path/to/file.jpg',
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
  test.skip('move: required and optional params', async () => {
    const response = await client.files.move({
      destinationPath: '/folder/to/move/into/',
      sourceFilePath: '/path/to/file.jpg',
    });
  });

  // Prism tests are disabled
  test.skip('rename: only required params', async () => {
    const responsePromise = client.files.rename({
      filePath: '/path/to/file.jpg',
      newFileName: 'newFileName.jpg',
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
  test.skip('rename: required and optional params', async () => {
    const response = await client.files.rename({
      filePath: '/path/to/file.jpg',
      newFileName: 'newFileName.jpg',
      purgeCache: true,
    });
  });

  // Prism tests are disabled
  test.skip('upload: only required params', async () => {
    const responsePromise = client.files.upload({
      file: await toFile(Buffer.from('# my file contents'), 'README.md'),
      fileName: 'fileName',
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
  test.skip('upload: required and optional params', async () => {
    const response = await client.files.upload({
      file: await toFile(Buffer.from('# my file contents'), 'README.md'),
      fileName: 'fileName',
      token: 'token',
      checks: '"request.folder" : "marketing/"\n',
      customCoordinates: 'customCoordinates',
      customMetadata: { brand: 'bar', color: 'bar' },
      description: 'Running shoes',
      expire: 0,
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
        {
          maxTags: 5,
          minConfidence: 95,
          name: 'google-auto-tagging',
        },
        { name: 'ai-auto-description' },
      ],
      folder: 'folder',
      isPrivateFile: true,
      isPublished: true,
      overwriteAITags: true,
      overwriteCustomMetadata: true,
      overwriteFile: true,
      overwriteTags: true,
      publicKey: 'publicKey',
      responseFields: ['tags', 'customCoordinates', 'isPrivateFile'],
      signature: 'signature',
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
      useUniqueFileName: true,
      webhookUrl: 'https://example.com',
    });
  });
});
