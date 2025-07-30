// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import ImageKit, { toFile } from '@imagekit/nodejs';

const client = new ImageKit({
  privateAPIKey: 'My Private API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource files', () => {
  // skipped: tests are disabled for the time being
  test.skip('list', async () => {
    const responsePromise = client.files.list();
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
      client.files.list(
        {
          fileType: 'fileType',
          limit: 'limit',
          path: 'path',
          searchQuery: 'searchQuery',
          skip: 'skip',
          sort: 'sort',
          type: 'file',
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(ImageKit.NotFoundError);
  });

  // skipped: tests are disabled for the time being
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

  // skipped: tests are disabled for the time being
  test.skip('addTags: only required params', async () => {
    const responsePromise = client.files.addTags({
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

  // skipped: tests are disabled for the time being
  test.skip('addTags: required and optional params', async () => {
    const response = await client.files.addTags({
      fileIds: ['598821f949c0a938d57563bd', '598821f949c0a938d57563be'],
      tags: ['t-shirt', 'round-neck', 'sale2019'],
    });
  });

  // skipped: tests are disabled for the time being
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

  // skipped: tests are disabled for the time being
  test.skip('copy: required and optional params', async () => {
    const response = await client.files.copy({
      destinationPath: '/folder/to/copy/into/',
      sourceFilePath: '/path/to/file.jpg',
      includeFileVersions: false,
    });
  });

  // skipped: tests are disabled for the time being
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

  // skipped: tests are disabled for the time being
  test.skip('move: required and optional params', async () => {
    const response = await client.files.move({
      destinationPath: '/folder/to/move/into/',
      sourceFilePath: '/path/to/file.jpg',
    });
  });

  // skipped: tests are disabled for the time being
  test.skip('removeAITags: only required params', async () => {
    const responsePromise = client.files.removeAITags({
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

  // skipped: tests are disabled for the time being
  test.skip('removeAITags: required and optional params', async () => {
    const response = await client.files.removeAITags({
      AITags: ['t-shirt', 'round-neck', 'sale2019'],
      fileIds: ['598821f949c0a938d57563bd', '598821f949c0a938d57563be'],
    });
  });

  // skipped: tests are disabled for the time being
  test.skip('removeTags: only required params', async () => {
    const responsePromise = client.files.removeTags({
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

  // skipped: tests are disabled for the time being
  test.skip('removeTags: required and optional params', async () => {
    const response = await client.files.removeTags({
      fileIds: ['598821f949c0a938d57563bd', '598821f949c0a938d57563be'],
      tags: ['t-shirt', 'round-neck', 'sale2019'],
    });
  });

  // skipped: tests are disabled for the time being
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

  // skipped: tests are disabled for the time being
  test.skip('rename: required and optional params', async () => {
    const response = await client.files.rename({
      filePath: '/path/to/file.jpg',
      newFileName: 'newFileName.jpg',
      purgeCache: true,
    });
  });

  // skipped: tests are disabled for the time being
  test.skip('uploadV1: only required params', async () => {
    const responsePromise = client.files.uploadV1({
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

  // skipped: tests are disabled for the time being
  test.skip('uploadV1: required and optional params', async () => {
    const response = await client.files.uploadV1({
      file: await toFile(Buffer.from('# my file contents'), 'README.md'),
      fileName: 'fileName',
      token: 'token',
      checks: '"request.folder" : "marketing/"\n',
      customCoordinates: 'customCoordinates',
      customMetadata: '"\n  {\n    "brand": "Nike",\n    "color":"red"\n  }\n"\n',
      expire: 'expire',
      extensions:
        '"\n[\n  {"name":"remove-bg","options":{"add_shadow":true,"bg_colour":"green"}},\n  {"name":"google-auto-tagging","maxTags":5,"minConfidence":95}\n]\n"\n',
      folder: 'folder',
      isPrivateFile: 'true',
      isPublished: 'true',
      overwriteAITags: 'true',
      overwriteCustomMetadata: 'true',
      overwriteFile: 'overwriteFile',
      overwriteTags: 'true',
      publicKey: 'publicKey',
      responseFields: 'responseFields',
      signature: 'signature',
      tags: 't-shirt,round-neck,men',
      transformation:
        '\'{"pre":"width:300,height:300,quality:80","post":[{"type":"thumbnail","value":"width:100,height:100"}]}\'\n',
      useUniqueFileName: 'true',
      webhookUrl: 'webhookUrl',
    });
  });

  // skipped: tests are disabled for the time being
  test.skip('uploadV2: only required params', async () => {
    const responsePromise = client.files.uploadV2({
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

  // skipped: tests are disabled for the time being
  test.skip('uploadV2: required and optional params', async () => {
    const response = await client.files.uploadV2({
      file: await toFile(Buffer.from('# my file contents'), 'README.md'),
      fileName: 'fileName',
      token: 'token',
      checks: '"request.folder" : "marketing/"\n',
      customCoordinates: 'customCoordinates',
      customMetadata: '"\n  {\n    "brand": "Nike",\n    "color":"red"\n  }\n"\n',
      extensions:
        '"\n[\n  {"name":"remove-bg","options":{"add_shadow":true,"bg_colour":"green"}},\n  {"name":"google-auto-tagging","maxTags":5,"minConfidence":95}\n]\n"\n',
      folder: 'folder',
      isPrivateFile: 'true',
      isPublished: 'true',
      overwriteAITags: 'true',
      overwriteCustomMetadata: 'true',
      overwriteFile: 'overwriteFile',
      overwriteTags: 'true',
      responseFields: 'responseFields',
      tags: 't-shirt,round-neck,men',
      transformation:
        '\'{"pre":"width:300,height:300,quality:80","post":[{"type":"thumbnail","value":"width:100,height:100"}]}\'\n',
      useUniqueFileName: 'true',
      webhookUrl: 'webhookUrl',
    });
  });
});
