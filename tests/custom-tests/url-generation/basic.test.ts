import ImageKit from '@imagekit/nodejs';
import type { SrcOptions } from '../../../src/resources/shared';

const client = new ImageKit({
  privateKey: 'My Private API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('URL generation', function () {
  it('should return an empty string when src is not provided', function () {
    const url = client.helper.buildSrc({
      urlEndpoint: 'https://ik.imagekit.io/test_url_endpoint',
      transformationPosition: 'query',
    } as SrcOptions);

    expect(url).toBe('');
  });

  it('should return an empty string when src is /', function () {
    const url = client.helper.buildSrc({
      urlEndpoint: 'https://ik.imagekit.io/test_url_endpoint',
      transformationPosition: 'query',
      src: '/',
    });

    expect(url).toBe('https://ik.imagekit.io/test_url_endpoint/');
  });

  it('should return an empty string when src is invalid', function () {
    const url = client.helper.buildSrc({
      urlEndpoint: 'https://ik.imagekit.io/test_url_endpoint',
      transformationPosition: 'query',
      src: 'https://',
    });

    expect(url).toBe('');
  });

  it('should generate a valid URL when src is provided without transformation', function () {
    const url = client.helper.buildSrc({
      urlEndpoint: 'https://ik.imagekit.io/test_url_endpoint',
      transformationPosition: 'query',
      src: '/test_path.jpg',
    });

    expect(url).toBe(`https://ik.imagekit.io/test_url_endpoint/test_path.jpg`);
  });

  it('should generate a valid URL when a src is provided without transformation', function () {
    const url = client.helper.buildSrc({
      urlEndpoint: 'https://ik.imagekit.io/test_url_endpoint',
      transformationPosition: 'query',
      src: 'https://ik.imagekit.io/test_url_endpoint/test_path_alt.jpg',
    });

    expect(url).toBe(`https://ik.imagekit.io/test_url_endpoint/test_path_alt.jpg`);
  });

  it('should generate a valid URL when undefined transformation parameters are provided with path', function () {
    const url = client.helper.buildSrc({
      urlEndpoint: 'https://ik.imagekit.io/test_url_endpoint',
      src: '/test_path_alt.jpg',
      transformationPosition: 'query',
    });

    expect(url).toBe(`https://ik.imagekit.io/test_url_endpoint/test_path_alt.jpg`);
  });

  it('By default transformationPosition should be query', function () {
    const url = client.helper.buildSrc({
      urlEndpoint: 'https://ik.imagekit.io/test_url_endpoint',
      src: '/test_path.jpg',
      transformation: [
        {
          height: '300',
          width: '400',
        },
        {
          rotation: 90,
        },
      ],
    });
    expect(url).toBe('https://ik.imagekit.io/test_url_endpoint/test_path.jpg?tr=h-300,w-400:rt-90');
  });

  it('should generate the URL without sdk version', function () {
    const url = client.helper.buildSrc({
      urlEndpoint: 'https://ik.imagekit.io/test_url_endpoint',
      src: '/test_path.jpg',
      transformation: [
        {
          height: '300',
          width: '400',
        },
      ],
      transformationPosition: 'path',
    });

    expect(url).toBe(`https://ik.imagekit.io/test_url_endpoint/tr:h-300,w-400/test_path.jpg`);
  });

  it('should generate the correct URL with a valid src and transformation', function () {
    const url = client.helper.buildSrc({
      urlEndpoint: 'https://ik.imagekit.io/test_url_endpoint',
      transformationPosition: 'query',
      src: '/test_path.jpg',
      transformation: [
        {
          height: '300',
          width: '400',
        },
      ],
    });

    // Now transformed URL goes into query since transformationPosition is "query".
    expect(url).toBe(`https://ik.imagekit.io/test_url_endpoint/test_path.jpg?tr=h-300,w-400`);
  });

  it('should add transformation as query when src has absolute url even if transformationPosition is path', function () {
    const url = client.helper.buildSrc({
      urlEndpoint: 'https://ik.imagekit.io/test_url_endpoint',
      transformationPosition: 'path',
      src: 'https://my.custom.domain.com/test_path.jpg',
      transformation: [
        {
          height: '300',
          width: '400',
        },
      ],
    });

    // Now transformed URL goes into query since transformationPosition is "query".
    expect(url).toBe(`https://my.custom.domain.com/test_path.jpg?tr=h-300,w-400`);
  });

  it('Handle non-default url-endpoint case', function () {
    const url = client.helper.buildSrc({
      urlEndpoint: 'https://ik.imagekit.io/imagekit_id/new-endpoint/',
      src: '/test_path.jpg',
      transformation: [
        {
          height: '300',
          width: '400',
        },
      ],
    });

    // Now transformed URL goes into query since transformationPosition is "query".
    expect(url).toBe(`https://ik.imagekit.io/imagekit_id/new-endpoint/test_path.jpg?tr=h-300,w-400`);
  });

  it('should generate the correct URL when the provided path contains multiple leading slashes', function () {
    const url = client.helper.buildSrc({
      urlEndpoint: 'https://ik.imagekit.io/test_url_endpoint',
      transformationPosition: 'query',
      src: '///test_path.jpg',
      transformation: [
        {
          height: '300',
          width: '400',
        },
      ],
    });

    expect(url).toBe(`https://ik.imagekit.io/test_url_endpoint/test_path.jpg?tr=h-300,w-400`);
  });

  it('should generate the correct URL when the urlEndpoint is overridden', function () {
    const url = client.helper.buildSrc({
      // We do not override urlEndpoint here
      urlEndpoint: 'https://ik.imagekit.io/test_url_endpoint_alt',
      transformationPosition: 'query',
      src: '/test_path.jpg',
      transformation: [
        {
          height: '300',
          width: '400',
        },
      ],
    });

    expect(url).toBe(`https://ik.imagekit.io/test_url_endpoint_alt/test_path.jpg?tr=h-300,w-400`);
  });

  it('should generate the correct URL with transformationPosition as query parameter when src is provided', function () {
    const url = client.helper.buildSrc({
      urlEndpoint: 'https://ik.imagekit.io/test_url_endpoint',
      src: '/test_path.jpg',
      transformationPosition: 'query',
      transformation: [
        {
          height: '300',
          width: '400',
        },
      ],
    });

    expect(url).toBe(`https://ik.imagekit.io/test_url_endpoint/test_path.jpg?tr=h-300,w-400`);
  });

  it('should generate the correct URL with a valid src parameter and transformation', function () {
    const url = client.helper.buildSrc({
      urlEndpoint: 'https://ik.imagekit.io/test_url_endpoint',
      transformationPosition: 'query',
      src: 'https://ik.imagekit.io/test_url_endpoint/test_path_alt.jpg',
      transformation: [
        {
          height: '300',
          width: '400',
        },
      ],
    });

    expect(url).toBe(`https://ik.imagekit.io/test_url_endpoint/test_path_alt.jpg?tr=h-300,w-400`);
  });

  it('should generate the correct URL with transformationPosition as query parameter when src is provided', function () {
    const url = client.helper.buildSrc({
      urlEndpoint: 'https://ik.imagekit.io/test_url_endpoint',
      src: 'https://ik.imagekit.io/test_url_endpoint/test_path_alt.jpg',
      transformationPosition: 'query',
      transformation: [
        {
          height: '300',
          width: '400',
        },
      ],
    });

    expect(url).toBe(`https://ik.imagekit.io/test_url_endpoint/test_path_alt.jpg?tr=h-300,w-400`);
  });

  it('should merge query parameters correctly in the generated URL', function () {
    const url = client.helper.buildSrc({
      urlEndpoint: 'https://ik.imagekit.io/test_url_endpoint',
      transformationPosition: 'query',
      src: 'https://ik.imagekit.io/test_url_endpoint/test_path_alt.jpg?t1=v1',
      queryParameters: { t2: 'v2', t3: 'v3' },
      transformation: [
        {
          height: '300',
          width: '400',
        },
      ],
    });

    expect(url).toBe(
      `https://ik.imagekit.io/test_url_endpoint/test_path_alt.jpg?t1=v1&t2=v2&t3=v3&tr=h-300,w-400`,
    );
  });

  it('should generate the correct URL with chained transformations', function () {
    const url = client.helper.buildSrc({
      urlEndpoint: 'https://ik.imagekit.io/test_url_endpoint',
      transformationPosition: 'query',
      src: '/test_path.jpg',
      transformation: [
        {
          height: '300',
          width: '400',
        },
        {
          rotation: '90',
        },
      ],
    });

    expect(url).toBe(`https://ik.imagekit.io/test_url_endpoint/test_path.jpg?tr=h-300,w-400:rt-90`);
  });

  it('should generate the correct URL with chained transformations including a new undocumented transformation parameter', function () {
    const url = client.helper.buildSrc({
      urlEndpoint: 'https://ik.imagekit.io/test_url_endpoint',
      transformationPosition: 'query',
      src: '/test_path.jpg',
      transformation: [
        {
          height: '300',
          width: '400',
        },
        {
          raw: 'rndm_trnsf-abcd',
        },
      ],
    });

    expect(url).toBe(`https://ik.imagekit.io/test_url_endpoint/test_path.jpg?tr=h-300,w-400:rndm_trnsf-abcd`);
  });

  it('should generate the correct URL when overlay image transformation is provided', function () {
    const url = client.helper.buildSrc({
      urlEndpoint: 'https://ik.imagekit.io/test_url_endpoint',
      transformationPosition: 'query',
      src: '/test_path.jpg',
      transformation: [
        {
          height: '300',
          width: '400',
          raw: 'l-image,i-overlay.jpg,w-100,b-10_CDDC39,l-end',
        },
      ],
    });

    expect(url).toBe(
      `https://ik.imagekit.io/test_url_endpoint/test_path.jpg?tr=h-300,w-400,l-image,i-overlay.jpg,w-100,b-10_CDDC39,l-end`,
    );
  });

  it('should generate the correct URL when overlay image transformation contains a slash in the overlay path', function () {
    const url = client.helper.buildSrc({
      urlEndpoint: 'https://ik.imagekit.io/test_url_endpoint',
      transformationPosition: 'query',
      src: '/test_path.jpg',
      transformation: [
        {
          height: '300',
          width: '400',
          raw: 'l-image,i-/path/to/overlay.jpg,w-100,b-10_CDDC39,l-end',
        },
      ],
    });

    expect(url).toBe(
      `https://ik.imagekit.io/test_url_endpoint/test_path.jpg?tr=h-300,w-400,l-image,i-/path/to/overlay.jpg,w-100,b-10_CDDC39,l-end`,
    );
  });

  it('should generate the correct URL when border transformation is applied', function () {
    const url = client.helper.buildSrc({
      urlEndpoint: 'https://ik.imagekit.io/test_url_endpoint',
      transformationPosition: 'query',
      src: '/test_path.jpg',
      transformation: [
        {
          height: '300',
          width: '400',
          border: '20_FF0000',
        },
      ],
    });

    expect(url).toBe(`https://ik.imagekit.io/test_url_endpoint/test_path.jpg?tr=h-300,w-400,b-20_FF0000`);
  });

  it('should generate the correct URL when transformation has empty key and value', function () {
    const url = client.helper.buildSrc({
      urlEndpoint: 'https://ik.imagekit.io/test_url_endpoint',
      transformationPosition: 'query',
      src: '/test_path.jpg',
      transformation: [
        {
          raw: '',
        },
      ],
    });

    expect(url).toBe(`https://ik.imagekit.io/test_url_endpoint/test_path.jpg`);
  });

  it('should generate the correct URL when an undefined transform is provided', function () {
    const url = client.helper.buildSrc({
      urlEndpoint: 'https://ik.imagekit.io/test_url_endpoint',
      transformationPosition: 'query',
      src: '/test_path.jpg',
      transformation: [
        {
          raw: 'undefined-transform-true',
        },
      ],
    });

    expect(url).toBe(`https://ik.imagekit.io/test_url_endpoint/test_path.jpg?tr=undefined-transform-true`);
  });

  it('should generate the correct URL when transformation key has an empty value', function () {
    const url = client.helper.buildSrc({
      urlEndpoint: 'https://ik.imagekit.io/test_url_endpoint',
      transformationPosition: 'query',
      src: '/test_path.jpg',
      transformation: [
        {
          defaultImage: '',
        },
      ],
    });

    expect(url).toBe(`https://ik.imagekit.io/test_url_endpoint/test_path.jpg?tr=di-`);
  });

  it("should generate the correct URL when transformation key has '-' as its value", function () {
    const url = client.helper.buildSrc({
      urlEndpoint: 'https://ik.imagekit.io/test_url_endpoint',
      transformationPosition: 'query',
      src: '/test_path.jpg',
      transformation: [
        {
          contrastStretch: '-' as any,
        },
      ],
    });

    expect(url).toBe(`https://ik.imagekit.io/test_url_endpoint/test_path.jpg?tr=e-contrast`);
  });

  it('should skip transformation parameters that are undefined or null', function () {
    const url = client.helper.buildSrc({
      urlEndpoint: 'https://ik.imagekit.io/test_url_endpoint',
      transformationPosition: 'query',
      src: '/test_path1.jpg',
      transformation: [
        {
          defaultImage: '/test_path.jpg',
          // quality: undefined, // Can't test this due to exactOptionalPropertyTypes
          // contrastStretch: null, // Can't test this due to exactOptionalPropertyTypes
        },
      ],
    });

    expect(url).toBe(`https://ik.imagekit.io/test_url_endpoint/test_path1.jpg?tr=di-test_path.jpg`);
  });

  it('should skip transformation parameters that are false', function () {
    const url = client.helper.buildSrc({
      urlEndpoint: 'https://ik.imagekit.io/test_url_endpoint',
      transformationPosition: 'query',
      src: '/test_path1.jpg',
      transformation: [
        {
          defaultImage: '/test_path.jpg',
          contrastStretch: false as any,
        },
      ],
    });

    expect(url).toBe(`https://ik.imagekit.io/test_url_endpoint/test_path1.jpg?tr=di-test_path.jpg`);
  });

  it('should include only the key when transformation value is an empty string', function () {
    const url = client.helper.buildSrc({
      urlEndpoint: 'https://ik.imagekit.io/test_url_endpoint',
      transformationPosition: 'query',
      src: '/test_path1.jpg',
      transformation: [
        {
          defaultImage: '/test_path.jpg',
          shadow: '',
        },
      ],
    });

    expect(url).toBe(`https://ik.imagekit.io/test_url_endpoint/test_path1.jpg?tr=di-test_path.jpg,e-shadow`);
  });

  it('should include both key and value when transformation parameter value is provided', function () {
    const url = client.helper.buildSrc({
      urlEndpoint: 'https://ik.imagekit.io/test_url_endpoint',
      transformationPosition: 'query',
      src: '/test_path1.jpg',
      transformation: [
        {
          defaultImage: '/test_path.jpg',
          shadow: 'bl-15_st-40_x-10_y-N5',
        },
      ],
    });

    expect(url).toBe(
      `https://ik.imagekit.io/test_url_endpoint/test_path1.jpg?tr=di-test_path.jpg,e-shadow-bl-15_st-40_x-10_y-N5`,
    );
  });

  it('should generate the correct URL when trim transformation is set to true as a boolean', function () {
    const url = client.helper.buildSrc({
      urlEndpoint: 'https://ik.imagekit.io/test_url_endpoint',
      transformationPosition: 'query',
      src: '/test_path1.jpg',
      transformation: [
        {
          defaultImage: '/test_path.jpg',
          trim: true,
        },
      ],
    });

    expect(url).toBe(`https://ik.imagekit.io/test_url_endpoint/test_path1.jpg?tr=di-test_path.jpg,t-true`);
  });

  it('should generate the correct URL when trim transformation is set to true as a string', function () {
    const url = client.helper.buildSrc({
      urlEndpoint: 'https://ik.imagekit.io/test_url_endpoint',
      transformationPosition: 'query',
      src: '/test_path1.jpg',
      transformation: [
        {
          defaultImage: '/test_path.jpg',
          trim: 'true' as any,
        },
      ],
    });

    expect(url).toBe(`https://ik.imagekit.io/test_url_endpoint/test_path1.jpg?tr=di-test_path.jpg,t-true`);
  });

  it('should generate the correct URL for AI background removal when set to true', function () {
    const url = client.helper.buildSrc({
      urlEndpoint: 'https://ik.imagekit.io/test_url_endpoint',
      transformationPosition: 'query',
      src: '/test_path1.jpg',
      transformation: [
        {
          aiRemoveBackground: true,
        },
      ],
    });

    expect(url).toBe(`https://ik.imagekit.io/test_url_endpoint/test_path1.jpg?tr=e-bgremove`);
  });

  it("should generate the correct URL for AI background removal when 'true' is provided as a string", function () {
    const url = client.helper.buildSrc({
      urlEndpoint: 'https://ik.imagekit.io/test_url_endpoint',
      transformationPosition: 'query',
      src: '/test_path1.jpg',
      transformation: [
        {
          aiRemoveBackground: 'true' as any,
        },
      ],
    });

    expect(url).toBe(`https://ik.imagekit.io/test_url_endpoint/test_path1.jpg?tr=e-bgremove`);
  });

  it('should not apply AI background removal when value is not true', function () {
    const url = client.helper.buildSrc({
      urlEndpoint: 'https://ik.imagekit.io/test_url_endpoint',
      transformationPosition: 'query',
      src: '/test_path1.jpg',
      transformation: [
        {
          aiRemoveBackground: 'false' as any,
        },
      ],
    });

    expect(url).toBe(`https://ik.imagekit.io/test_url_endpoint/test_path1.jpg`);
  });

  it('should generate the correct URL for external AI background removal when set to true', function () {
    const url = client.helper.buildSrc({
      urlEndpoint: 'https://ik.imagekit.io/test_url_endpoint',
      transformationPosition: 'query',
      src: '/test_path1.jpg',
      transformation: [
        {
          aiRemoveBackgroundExternal: true,
        },
      ],
    });

    expect(url).toBe(`https://ik.imagekit.io/test_url_endpoint/test_path1.jpg?tr=e-removedotbg`);
  });

  it("should generate the correct URL for external AI background removal when 'true' is provided as a string", function () {
    const url = client.helper.buildSrc({
      urlEndpoint: 'https://ik.imagekit.io/test_url_endpoint',
      transformationPosition: 'query',
      src: '/test_path1.jpg',
      transformation: [
        {
          aiRemoveBackgroundExternal: 'true' as any,
        },
      ],
    });

    expect(url).toBe(`https://ik.imagekit.io/test_url_endpoint/test_path1.jpg?tr=e-removedotbg`);
  });

  it('should not apply external AI background removal when value is not true', function () {
    const url = client.helper.buildSrc({
      urlEndpoint: 'https://ik.imagekit.io/test_url_endpoint',
      transformationPosition: 'query',
      src: '/test_path1.jpg',
      transformation: [
        {
          aiRemoveBackgroundExternal: 'false' as any,
        },
      ],
    });

    expect(url).toBe(`https://ik.imagekit.io/test_url_endpoint/test_path1.jpg`);
  });

  it('should generate the correct URL when gradient transformation is provided as a string', function () {
    const url = client.helper.buildSrc({
      urlEndpoint: 'https://ik.imagekit.io/test_url_endpoint',
      transformationPosition: 'query',
      src: '/test_path1.jpg',
      transformation: [
        {
          gradient: 'ld-top_from-green_to-00FF0010_sp-1',
        },
      ],
    });

    expect(url).toBe(
      `https://ik.imagekit.io/test_url_endpoint/test_path1.jpg?tr=e-gradient-ld-top_from-green_to-00FF0010_sp-1`,
    );
  });

  it('should generate the correct URL when gradient transformation is provided as an empty string', function () {
    const url = client.helper.buildSrc({
      urlEndpoint: 'https://ik.imagekit.io/test_url_endpoint',
      transformationPosition: 'query',
      src: '/test_path1.jpg',
      transformation: [
        {
          gradient: '',
        },
      ],
    });

    expect(url).toBe(`https://ik.imagekit.io/test_url_endpoint/test_path1.jpg?tr=e-gradient`);
  });

  it('should generate the correct URL when gradient transformation is set to true', function () {
    const url = client.helper.buildSrc({
      urlEndpoint: 'https://ik.imagekit.io/test_url_endpoint',
      transformationPosition: 'query',
      src: '/test_path1.jpg',
      transformation: [
        {
          gradient: true,
        },
      ],
    });

    expect(url).toBe(`https://ik.imagekit.io/test_url_endpoint/test_path1.jpg?tr=e-gradient`);
  });

  it('should generate the correct URL when AI drop shadow transformation is set to true', function () {
    const url = client.helper.buildSrc({
      urlEndpoint: 'https://ik.imagekit.io/test_url_endpoint',
      transformationPosition: 'query',
      src: '/test_path1.jpg',
      transformation: [
        {
          aiDropShadow: true,
        },
      ],
    });

    expect(url).toBe(`https://ik.imagekit.io/test_url_endpoint/test_path1.jpg?tr=e-dropshadow`);
  });

  it('should generate the correct URL when AI drop shadow transformation is provided as an empty string', function () {
    const url = client.helper.buildSrc({
      urlEndpoint: 'https://ik.imagekit.io/test_url_endpoint',
      transformationPosition: 'query',
      src: '/test_path1.jpg',
      transformation: [
        {
          aiDropShadow: '',
        },
      ],
    });

    expect(url).toBe(`https://ik.imagekit.io/test_url_endpoint/test_path1.jpg?tr=e-dropshadow`);
  });

  it('should generate the correct URL when AI drop shadow transformation is provided with a specific string value', function () {
    const url = client.helper.buildSrc({
      urlEndpoint: 'https://ik.imagekit.io/test_url_endpoint',
      transformationPosition: 'query',
      src: '/test_path1.jpg',
      transformation: [
        {
          aiDropShadow: 'az-45',
        },
      ],
    });

    expect(url).toBe(`https://ik.imagekit.io/test_url_endpoint/test_path1.jpg?tr=e-dropshadow-az-45`);
  });

  it('should generate the correct URL when shadow transformation is set to true', function () {
    const url = client.helper.buildSrc({
      urlEndpoint: 'https://ik.imagekit.io/test_url_endpoint',
      transformationPosition: 'query',
      src: '/test_path1.jpg',
      transformation: [
        {
          shadow: true,
        },
      ],
    });

    expect(url).toBe(`https://ik.imagekit.io/test_url_endpoint/test_path1.jpg?tr=e-shadow`);
  });

  it('should generate the correct URL when shadow transformation is provided as an empty string', function () {
    const url = client.helper.buildSrc({
      urlEndpoint: 'https://ik.imagekit.io/test_url_endpoint',
      transformationPosition: 'query',
      src: '/test_path1.jpg',
      transformation: [
        {
          shadow: '',
        },
      ],
    });

    expect(url).toBe(`https://ik.imagekit.io/test_url_endpoint/test_path1.jpg?tr=e-shadow`);
  });

  it('should generate the correct URL when shadow transformation is provided with a specific string value', function () {
    const url = client.helper.buildSrc({
      urlEndpoint: 'https://ik.imagekit.io/test_url_endpoint',
      transformationPosition: 'query',
      src: '/test_path1.jpg',
      transformation: [
        {
          shadow: 'bl-15_st-40_x-10_y-N5',
        },
      ],
    });

    expect(url).toBe(
      `https://ik.imagekit.io/test_url_endpoint/test_path1.jpg?tr=e-shadow-bl-15_st-40_x-10_y-N5`,
    );
  });

  it('should generate the correct URL when sharpen transformation is set to true', function () {
    const url = client.helper.buildSrc({
      urlEndpoint: 'https://ik.imagekit.io/test_url_endpoint',
      transformationPosition: 'query',
      src: '/test_path1.jpg',
      transformation: [
        {
          sharpen: true,
        },
      ],
    });

    expect(url).toBe(`https://ik.imagekit.io/test_url_endpoint/test_path1.jpg?tr=e-sharpen`);
  });

  it('should generate the correct URL when sharpen transformation is provided as an empty string', function () {
    const url = client.helper.buildSrc({
      urlEndpoint: 'https://ik.imagekit.io/test_url_endpoint',
      transformationPosition: 'query',
      src: '/test_path1.jpg',
      transformation: [
        {
          sharpen: '' as any,
        },
      ],
    });

    expect(url).toBe(`https://ik.imagekit.io/test_url_endpoint/test_path1.jpg?tr=e-sharpen`);
  });

  it('should generate the correct URL when sharpen transformation is provided with a number value', function () {
    const url = client.helper.buildSrc({
      urlEndpoint: 'https://ik.imagekit.io/test_url_endpoint',
      transformationPosition: 'query',
      src: '/test_path1.jpg',
      transformation: [
        {
          sharpen: 10,
        },
      ],
    });

    expect(url).toBe(`https://ik.imagekit.io/test_url_endpoint/test_path1.jpg?tr=e-sharpen-10`);
  });

  it('should generate the correct URL when unsharpMask transformation is set to true', function () {
    const url = client.helper.buildSrc({
      urlEndpoint: 'https://ik.imagekit.io/test_url_endpoint',
      transformationPosition: 'query',
      src: '/test_path1.jpg',
      transformation: [
        {
          unsharpMask: true,
        },
      ],
    });

    expect(url).toBe(`https://ik.imagekit.io/test_url_endpoint/test_path1.jpg?tr=e-usm`);
  });

  it('should generate the correct URL when unsharpMask transformation is provided as an empty string', function () {
    const url = client.helper.buildSrc({
      urlEndpoint: 'https://ik.imagekit.io/test_url_endpoint',
      transformationPosition: 'query',
      src: '/test_path1.jpg',
      transformation: [
        {
          unsharpMask: '',
        },
      ],
    });

    expect(url).toBe(`https://ik.imagekit.io/test_url_endpoint/test_path1.jpg?tr=e-usm`);
  });

  it('should generate the correct URL when unsharpMask transformation is provided with a string value', function () {
    const url = client.helper.buildSrc({
      urlEndpoint: 'https://ik.imagekit.io/test_url_endpoint',
      transformationPosition: 'query',
      src: '/test_path1.jpg',
      transformation: [
        {
          unsharpMask: '2-2-0.8-0.024',
        },
      ],
    });

    expect(url).toBe(`https://ik.imagekit.io/test_url_endpoint/test_path1.jpg?tr=e-usm-2-2-0.8-0.024`);
  });

  it('should generate the correct URL for trim transformation when set to true (boolean)', function () {
    const url = client.helper.buildSrc({
      urlEndpoint: 'https://ik.imagekit.io/test_url_endpoint',
      transformationPosition: 'query',
      src: '/test_path1.jpg',
      transformation: [
        {
          trim: true,
        },
      ],
    });

    expect(url).toBe(`https://ik.imagekit.io/test_url_endpoint/test_path1.jpg?tr=t-true`);
  });

  it('should generate the correct URL for trim transformation when provided as an empty string', function () {
    const url = client.helper.buildSrc({
      urlEndpoint: 'https://ik.imagekit.io/test_url_endpoint',
      transformationPosition: 'query',
      src: '/test_path1.jpg',
      transformation: [
        {
          trim: '' as any,
        },
      ],
    });

    expect(url).toBe(`https://ik.imagekit.io/test_url_endpoint/test_path1.jpg?tr=t-true`);
  });

  it('should generate the correct URL for trim transformation when provided with a number value', function () {
    const url = client.helper.buildSrc({
      urlEndpoint: 'https://ik.imagekit.io/test_url_endpoint',
      transformationPosition: 'query',
      src: '/test_path1.jpg',
      transformation: [
        {
          trim: 5,
        },
      ],
    });

    expect(url).toBe(`https://ik.imagekit.io/test_url_endpoint/test_path1.jpg?tr=t-5`);
  });

  // Width parameter tests
  it('should generate the correct URL for width transformation when provided with a number value', function () {
    const url = client.helper.buildSrc({
      urlEndpoint: 'https://ik.imagekit.io/test_url_endpoint',
      transformationPosition: 'query',
      src: '/test_path1.jpg',
      transformation: [
        {
          width: 400,
        },
      ],
    });

    expect(url).toBe(`https://ik.imagekit.io/test_url_endpoint/test_path1.jpg?tr=w-400`);
  });

  it('should generate the correct URL for width transformation when provided with a string value', function () {
    const url = client.helper.buildSrc({
      urlEndpoint: 'https://ik.imagekit.io/test_url_endpoint',
      transformationPosition: 'query',
      src: '/test_path1.jpg',
      transformation: [
        {
          width: '400',
        },
      ],
    });

    expect(url).toBe(`https://ik.imagekit.io/test_url_endpoint/test_path1.jpg?tr=w-400`);
  });

  it('should generate the correct URL for width transformation when provided with an arithmetic expression', function () {
    const url = client.helper.buildSrc({
      urlEndpoint: 'https://ik.imagekit.io/test_url_endpoint',
      transformationPosition: 'query',
      src: '/test_path1.jpg',
      transformation: [
        {
          width: 'iw_div_2',
        },
      ],
    });

    expect(url).toBe(`https://ik.imagekit.io/test_url_endpoint/test_path1.jpg?tr=w-iw_div_2`);
  });

  // Height parameter tests
  it('should generate the correct URL for height transformation when provided with a number value', function () {
    const url = client.helper.buildSrc({
      urlEndpoint: 'https://ik.imagekit.io/test_url_endpoint',
      transformationPosition: 'query',
      src: '/test_path1.jpg',
      transformation: [
        {
          height: 300,
        },
      ],
    });

    expect(url).toBe(`https://ik.imagekit.io/test_url_endpoint/test_path1.jpg?tr=h-300`);
  });

  it('should generate the correct URL for height transformation when provided with a string value', function () {
    const url = client.helper.buildSrc({
      urlEndpoint: 'https://ik.imagekit.io/test_url_endpoint',
      transformationPosition: 'query',
      src: '/test_path1.jpg',
      transformation: [
        {
          height: '300',
        },
      ],
    });

    expect(url).toBe(`https://ik.imagekit.io/test_url_endpoint/test_path1.jpg?tr=h-300`);
  });

  it('should generate the correct URL for height transformation when provided with an arithmetic expression', function () {
    const url = client.helper.buildSrc({
      urlEndpoint: 'https://ik.imagekit.io/test_url_endpoint',
      transformationPosition: 'query',
      src: '/test_path1.jpg',
      transformation: [
        {
          height: 'ih_mul_0.5',
        },
      ],
    });

    expect(url).toBe(`https://ik.imagekit.io/test_url_endpoint/test_path1.jpg?tr=h-ih_mul_0.5`);
  });

  // AspectRatio parameter tests
  it('should generate the correct URL for aspectRatio transformation when provided with a string value in colon format', function () {
    const url = client.helper.buildSrc({
      urlEndpoint: 'https://ik.imagekit.io/test_url_endpoint',
      transformationPosition: 'query',
      src: '/test_path1.jpg',
      transformation: [
        {
          aspectRatio: '4:3',
        },
      ],
    });

    expect(url).toBe(`https://ik.imagekit.io/test_url_endpoint/test_path1.jpg?tr=ar-4:3`);
  });

  it('should generate the correct URL for aspectRatio transformation when provided with an alternate underscore format', function () {
    const url = client.helper.buildSrc({
      urlEndpoint: 'https://ik.imagekit.io/test_url_endpoint',
      transformationPosition: 'query',
      src: '/test_path1.jpg',
      transformation: [
        {
          aspectRatio: '4_3',
        },
      ],
    });

    expect(url).toBe(`https://ik.imagekit.io/test_url_endpoint/test_path1.jpg?tr=ar-4_3`);
  });

  it('should generate the correct URL for aspectRatio transformation when provided with an arithmetic expression', function () {
    const url = client.helper.buildSrc({
      urlEndpoint: 'https://ik.imagekit.io/test_url_endpoint',
      transformationPosition: 'query',
      src: '/test_path1.jpg',
      transformation: [
        {
          aspectRatio: 'iar_div_2',
        },
      ],
    });

    expect(url).toBe(`https://ik.imagekit.io/test_url_endpoint/test_path1.jpg?tr=ar-iar_div_2`);
  });

  // Background parameter tests
  it('should generate the correct URL for background transformation when provided with a solid color', function () {
    const url = client.helper.buildSrc({
      urlEndpoint: 'https://ik.imagekit.io/test_url_endpoint',
      transformationPosition: 'query',
      src: '/test_path1.jpg',
      transformation: [
        {
          background: 'FF0000',
        },
      ],
    });

    expect(url).toBe(`https://ik.imagekit.io/test_url_endpoint/test_path1.jpg?tr=bg-FF0000`);
  });

  it('should generate the correct URL for background transformation when provided with the blurred option', function () {
    const url = client.helper.buildSrc({
      urlEndpoint: 'https://ik.imagekit.io/test_url_endpoint',
      transformationPosition: 'query',
      src: '/test_path1.jpg',
      transformation: [
        {
          background: 'blurred',
        },
      ],
    });

    expect(url).toBe(`https://ik.imagekit.io/test_url_endpoint/test_path1.jpg?tr=bg-blurred`);
  });

  it('should generate the correct URL for background transformation when provided with the genfill option', function () {
    const url = client.helper.buildSrc({
      urlEndpoint: 'https://ik.imagekit.io/test_url_endpoint',
      transformationPosition: 'query',
      src: '/test_path1.jpg',
      transformation: [
        {
          background: 'genfill',
        },
      ],
    });

    expect(url).toBe(`https://ik.imagekit.io/test_url_endpoint/test_path1.jpg?tr=bg-genfill`);
  });

  // Crop parameter tests
  it('should generate the correct URL for crop transformation when provided with force value', function () {
    const url = client.helper.buildSrc({
      urlEndpoint: 'https://ik.imagekit.io/test_url_endpoint',
      transformationPosition: 'query',
      src: '/test_path1.jpg',
      transformation: [
        {
          crop: 'force',
        },
      ],
    });

    expect(url).toBe(`https://ik.imagekit.io/test_url_endpoint/test_path1.jpg?tr=c-force`);
  });

  it('should generate the correct URL for crop transformation when provided with at_max value', function () {
    const url = client.helper.buildSrc({
      urlEndpoint: 'https://ik.imagekit.io/test_url_endpoint',
      transformationPosition: 'query',
      src: '/test_path1.jpg',
      transformation: [
        {
          crop: 'at_max',
        },
      ],
    });

    expect(url).toBe(`https://ik.imagekit.io/test_url_endpoint/test_path1.jpg?tr=c-at_max`);
  });

  // CropMode parameter tests
  it('should generate the correct URL for cropMode transformation when provided with pad_resize', function () {
    const url = client.helper.buildSrc({
      urlEndpoint: 'https://ik.imagekit.io/test_url_endpoint',
      transformationPosition: 'query',
      src: '/test_path1.jpg',
      transformation: [
        {
          cropMode: 'pad_resize',
        },
      ],
    });

    expect(url).toBe(`https://ik.imagekit.io/test_url_endpoint/test_path1.jpg?tr=cm-pad_resize`);
  });

  it('should generate the correct URL for cropMode transformation when provided with extract value', function () {
    const url = client.helper.buildSrc({
      urlEndpoint: 'https://ik.imagekit.io/test_url_endpoint',
      transformationPosition: 'query',
      src: '/test_path1.jpg',
      transformation: [
        {
          cropMode: 'extract',
        },
      ],
    });

    expect(url).toBe(`https://ik.imagekit.io/test_url_endpoint/test_path1.jpg?tr=cm-extract`);
  });

  // Focus parameter tests
  it('should generate the correct URL for focus transformation when provided with a string value', function () {
    const url = client.helper.buildSrc({
      urlEndpoint: 'https://ik.imagekit.io/test_url_endpoint',
      transformationPosition: 'query',
      src: '/test_path1.jpg',
      transformation: [
        {
          focus: 'center',
        },
      ],
    });

    expect(url).toBe(`https://ik.imagekit.io/test_url_endpoint/test_path1.jpg?tr=fo-center`);
  });

  it('should generate the correct URL for focus transformation when face detection is specified', function () {
    const url = client.helper.buildSrc({
      urlEndpoint: 'https://ik.imagekit.io/test_url_endpoint',
      transformationPosition: 'query',
      src: '/test_path1.jpg',
      transformation: [
        {
          focus: 'face',
        },
      ],
    });

    expect(url).toBe(`https://ik.imagekit.io/test_url_endpoint/test_path1.jpg?tr=fo-face`);
  });

  // Quality parameter test
  it('should generate the correct URL for quality transformation when provided with a number value', function () {
    const url = client.helper.buildSrc({
      urlEndpoint: 'https://ik.imagekit.io/test_url_endpoint',
      transformationPosition: 'query',
      src: '/test_path1.jpg',
      transformation: [
        {
          quality: 80,
        },
      ],
    });

    expect(url).toBe(`https://ik.imagekit.io/test_url_endpoint/test_path1.jpg?tr=q-80`);
  });

  // Coordinate parameters tests
  it('should generate the correct URL for x coordinate transformation when provided with a number value', function () {
    const url = client.helper.buildSrc({
      urlEndpoint: 'https://ik.imagekit.io/test_url_endpoint',
      transformationPosition: 'query',
      src: '/test_path1.jpg',
      transformation: [
        {
          x: 10,
        },
      ],
    });

    expect(url).toBe(`https://ik.imagekit.io/test_url_endpoint/test_path1.jpg?tr=x-10`);
  });

  it('should generate the correct URL for y coordinate transformation when provided with a number value', function () {
    const url = client.helper.buildSrc({
      urlEndpoint: 'https://ik.imagekit.io/test_url_endpoint',
      transformationPosition: 'query',
      src: '/test_path1.jpg',
      transformation: [
        {
          y: 20,
        },
      ],
    });

    expect(url).toBe(`https://ik.imagekit.io/test_url_endpoint/test_path1.jpg?tr=y-20`);
  });

  it('should generate the correct URL for xCenter transformation when provided with a number value', function () {
    const url = client.helper.buildSrc({
      urlEndpoint: 'https://ik.imagekit.io/test_url_endpoint',
      transformationPosition: 'query',
      src: '/test_path1.jpg',
      transformation: [
        {
          xCenter: 30,
        },
      ],
    });

    expect(url).toBe(`https://ik.imagekit.io/test_url_endpoint/test_path1.jpg?tr=xc-30`);
  });

  it('should generate the correct URL for yCenter transformation when provided with a number value', function () {
    const url = client.helper.buildSrc({
      urlEndpoint: 'https://ik.imagekit.io/test_url_endpoint',
      transformationPosition: 'query',
      src: '/test_path1.jpg',
      transformation: [
        {
          yCenter: 40,
        },
      ],
    });

    expect(url).toBe(`https://ik.imagekit.io/test_url_endpoint/test_path1.jpg?tr=yc-40`);
  });

  it('Including deprecated properties', function () {
    // This is just testing how the SDK constructs the URL, not actual valid transformations.
    const url = client.helper.buildSrc({
      urlEndpoint: 'https://ik.imagekit.io/test_url_endpoint',
      transformationPosition: 'query',
      src: '/test_path.jpg',
      transformation: [
        {
          height: 300,
          width: 400,
          aspectRatio: '4-3',
          quality: 40,
          crop: 'force',
          cropMode: 'extract',
          focus: 'left',
          format: 'jpeg',
          radius: 50,
          background: 'A94D34',
          border: '5-A94D34',
          rotation: 90,
          blur: 10,
          named: 'some_name',
          progressive: true,
          lossless: true,
          trim: 5,
          metadata: true,
          colorProfile: true,
          defaultImage: '/folder/file.jpg/',
          dpr: 3,
          sharpen: 10,
          unsharpMask: '2-2-0.8-0.024',
          contrastStretch: true,
          grayscale: true,
          shadow: 'bl-15_st-40_x-10_y-N5',
          gradient: 'from-red_to-white',
          original: true,
          raw: 'h-200,w-300,l-image,i-logo.png,l-end',
        },
      ],
    });

    expect(url).toBe(
      `https://ik.imagekit.io/test_url_endpoint/test_path.jpg?tr=h-300,w-400,ar-4-3,q-40,c-force,cm-extract,fo-left,f-jpeg,r-50,bg-A94D34,b-5-A94D34,rt-90,bl-10,n-some_name,pr-true,lo-true,t-5,md-true,cp-true,di-folder@@file.jpg,dpr-3,e-sharpen-10,e-usm-2-2-0.8-0.024,e-contrast,e-grayscale,e-shadow-bl-15_st-40_x-10_y-N5,e-gradient-from-red_to-white,orig-true,h-200,w-300,l-image,i-logo.png,l-end`,
    );
  });

  it('should generate the correct URL with many transformations, including video and AI transforms', function () {
    // Example test with comprehensive transformations
    const url = client.helper.buildSrc({
      urlEndpoint: 'https://ik.imagekit.io/test_url_endpoint',
      transformationPosition: 'query',
      src: '/test_path.jpg',
      transformation: [
        {
          height: 300,
          width: 400,
          aspectRatio: '4-3',
          quality: 40,
          crop: 'force',
          cropMode: 'extract',
          focus: 'left',
          format: 'jpeg',
          radius: 50,
          background: 'A94D34',
          border: '5-A94D34',
          rotation: 90,
          blur: 10,
          named: 'some_name',
          progressive: true,
          lossless: true,
          trim: 5,
          metadata: true,
          colorProfile: true,
          defaultImage: '/folder/file.jpg/',
          dpr: 3,
          x: 10,
          y: 20,
          xCenter: 30,
          yCenter: 40,
          flip: 'h',
          opacity: 0.8,
          zoom: 2,
          // Video transformations
          videoCodec: 'h264',
          audioCodec: 'aac',
          startOffset: 5,
          endOffset: 15,
          duration: 10,
          streamingResolutions: ['1440', '1080'],
          // AI transformations
          grayscale: true,
          aiUpscale: true,
          aiRetouch: true,
          aiVariation: true,
          aiDropShadow: true,
          aiChangeBackground: 'prompt-car',
          aiEdit: 'prompt-make it vintage',
          aiRemoveBackground: true,
          contrastStretch: true,
          shadow: 'bl-15_st-40_x-10_y-N5',
          sharpen: 10,
          unsharpMask: '2-2-0.8-0.024',
          gradient: 'from-red_to-white',
          original: true,
          page: '2_4',
          raw: 'h-200,w-300,l-image,i-logo.png,l-end',
        },
      ],
    });

    expect(url).toBe(
      `https://ik.imagekit.io/test_url_endpoint/test_path.jpg?tr=h-300,w-400,ar-4-3,q-40,c-force,cm-extract,fo-left,f-jpeg,r-50,bg-A94D34,b-5-A94D34,rt-90,bl-10,n-some_name,pr-true,lo-true,t-5,md-true,cp-true,di-folder@@file.jpg,dpr-3,x-10,y-20,xc-30,yc-40,fl-h,o-0.8,z-2,vc-h264,ac-aac,so-5,eo-15,du-10,sr-1440_1080,e-grayscale,e-upscale,e-retouch,e-genvar,e-dropshadow,e-changebg-prompt-car,e-edit-prompt-make it vintage,e-bgremove,e-contrast,e-shadow-bl-15_st-40_x-10_y-N5,e-sharpen-10,e-usm-2-2-0.8-0.024,e-gradient-from-red_to-white,orig-true,pg-2_4,h-200,w-300,l-image,i-logo.png,l-end`,
    );
  });
});
