import ImageKit from '@imagekit/nodejs';

/**
 * READ ME
 * Always test with real account and real private key, by uploading a private file, so that we know the URL is working as expected.
 * DO NOT COMMIT ACTUAL PRIVATE KEYS OR SENSITIVE INFORMATION
 * Once everything is working, just replace key with `dummy-key` and update assertions to pass test suite.
 * Ideally this code would not require any upkeeping.
 */
const client = new ImageKit({
  privateKey: 'dummy-key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('URL Signing', function () {
  it('should generate a signed URL when signed is true without expiresIn', function () {
    const url = client.helper.buildSrc({
      urlEndpoint: 'https://ik.imagekit.io/demo/',
      src: 'sdk-testing-files/future-search.png',
      signed: true,
    });

    expect(url).toBe(
      'https://ik.imagekit.io/demo/sdk-testing-files/future-search.png?ik-s=32dbbbfc5f945c0403c71b54c38e76896ef2d6b0',
    );
  });

  it('should generate a signed URL when signed is true with expiresIn', function () {
    const url = client.helper.buildSrc({
      urlEndpoint: 'https://ik.imagekit.io/demo/',
      src: 'sdk-testing-files/future-search.png',
      signed: true,
      expiresIn: 3600,
    });

    // Expect ik-t exist in the URL. We don't assert signature because it will keep changing.
    expect(url).toContain('ik-t');
  });

  it('should generate a signed URL when expiresIn is above 0 and even if signed is false', function () {
    const url = client.helper.buildSrc({
      urlEndpoint: 'https://ik.imagekit.io/demo/',
      src: 'sdk-testing-files/future-search.png',
      signed: false,
      expiresIn: 3600,
    });

    // Expect ik-t exist in the URL. We don't assert signature because it will keep changing.
    expect(url).toContain('ik-t');
  });

  it('Special characters', function () {
    const url = client.helper.buildSrc({
      urlEndpoint: 'https://ik.imagekit.io/demo/',
      src: 'sdk-testing-files/हिन्दी.png',
      signed: true,
    });

    expect(url).toBe(
      'https://ik.imagekit.io/demo/sdk-testing-files/%E0%A4%B9%E0%A4%BF%E0%A4%A8%E0%A5%8D%E0%A4%A6%E0%A5%80.png?ik-s=3fff2f31da1f45e007adcdbe95f88c8c330e743c',
    );
  });

  it('Text overlay with special characters', function () {
    const url = client.helper.buildSrc({
      urlEndpoint: 'https://ik.imagekit.io/demo/',
      src: 'sdk-testing-files/हिन्दी.png',
      transformation: [
        {
          overlay: {
            type: 'text',
            text: 'हिन्दी',
            transformation: [
              {
                fontColor: 'red',
                fontSize: '32',
                fontFamily: 'sdk-testing-files/Poppins-Regular_Q15GrYWmL.ttf',
              },
            ],
          },
        },
      ],
      signed: true,
    });

    expect(url).toBe(
      'https://ik.imagekit.io/demo/sdk-testing-files/%E0%A4%B9%E0%A4%BF%E0%A4%A8%E0%A5%8D%E0%A4%A6%E0%A5%80.png?tr=l-text,ie-4KS54KS%2F4KSo4KWN4KSm4KWA,co-red,fs-32,ff-sdk-testing-files@@Poppins-Regular_Q15GrYWmL.ttf,l-end&ik-s=ac9f24a03080102555e492185533c1ae6bd93fa7',
    );
  });

  it('should generate signed URL with query parameters', function () {
    const url = client.helper.buildSrc({
      urlEndpoint: 'https://ik.imagekit.io/demo/',
      src: 'sdk-testing-files/future-search.png',
      queryParameters: {
        version: '1.0',
        cache: 'false',
      },
      signed: true,
    });

    expect(url).toBe(
      'https://ik.imagekit.io/demo/sdk-testing-files/future-search.png?version=1.0&cache=false&ik-s=f2e5a1b8b6a0b03fd63789dfc6413a94acef9fd8',
    );
  });

  it('should generate signed URL with transformations and query parameters', function () {
    const url = client.helper.buildSrc({
      urlEndpoint: 'https://ik.imagekit.io/demo/',
      src: 'sdk-testing-files/future-search.png',
      transformation: [{ width: 300, height: 200 }],
      queryParameters: {
        version: '2.0',
      },
      signed: true,
    });

    expect(url).toBe(
      'https://ik.imagekit.io/demo/sdk-testing-files/future-search.png?version=2.0&tr=w-300,h-200&ik-s=601d97a7834b7554f4dabf0d3fc3a219ceeb6b31',
    );
  });

  it('should not sign URL when signed is false', function () {
    const url = client.helper.buildSrc({
      urlEndpoint: 'https://ik.imagekit.io/demo/',
      src: 'sdk-testing-files/future-search.png',
      signed: false,
    });

    expect(url).toBe('https://ik.imagekit.io/demo/sdk-testing-files/future-search.png');
    expect(url).not.toContain('ik-s=');
    expect(url).not.toContain('ik-t=');
  });

  it('transformationPosition as path', function () {
    const url = client.helper.buildSrc({
      urlEndpoint: 'https://ik.imagekit.io/demo/',
      src: 'sdk-testing-files/future-search.png',
      transformation: [{ width: 300, height: 200 }],
      transformationPosition: 'path',
      queryParameters: {
        version: '2.0',
      },
      signed: true,
    });

    expect(url).toBe(
      'https://ik.imagekit.io/demo/tr:w-300,h-200/sdk-testing-files/future-search.png?version=2.0&ik-s=dd1ee8f83d019bc59fd57a5fc4674a11eb8a3496',
    );
  });
});
