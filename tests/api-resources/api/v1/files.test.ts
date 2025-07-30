// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Imagekit from 'imagekit';

const client = new Imagekit({
  username: 'My Username',
  password: 'My Password',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource files', () => {
  // skipped: tests are disabled for the time being
  test.skip('upload: only required params', async () => {
    const responsePromise = client.api.v1.files.upload({
      file: 'https://www.example.com/rest-of-the-image-path.jpg',
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
  test.skip('upload: required and optional params', async () => {
    const response = await client.api.v1.files.upload({
      file: 'https://www.example.com/rest-of-the-image-path.jpg',
      fileName: 'fileName',
      token: 'token',
      checks: '"request.folder" : "marketing/"\n',
      customCoordinates: 'customCoordinates',
      customMetadata: 'customMetadata',
      expire: 'expire',
      extensions: 'extensions',
      folder: 'folder',
      isPrivateFile: undefined,
      isPublished: undefined,
      overwriteAITags: undefined,
      overwriteCustomMetadata: undefined,
      overwriteFile: 'overwriteFile',
      overwriteTags: undefined,
      publicKey: 'publicKey',
      responseFields: 'responseFields',
      signature: 'signature',
      tags: 't-shirt,round-neck,men',
      transformation:
        '{"pre": "width:300,height:300,quality:80", "post": [{"type": "thumbnail", "value": "width:100,height:100"}]}',
      useUniqueFileName: undefined,
      webhookUrl: 'webhookUrl',
    });
  });
});
