import ImageKit from '@imagekit/nodejs';
import { safeBtoa } from '../../../src/lib/transformation-utils';

const client = new ImageKit({
  privateKey: 'My Private API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('Overlay Transformation Test Cases', function () {
  it('should ignore text overlay when text property is missing', function () {
    const url = client.helper.buildSrc({
      transformationPosition: 'path',
      urlEndpoint: 'https://ik.imagekit.io/test_url_endpoint',
      src: '/base-image.jpg',
      transformation: [
        {
          overlay: {
            type: 'text',
          } as any,
        },
      ],
    });
    expect(url).toBe(`https://ik.imagekit.io/test_url_endpoint/base-image.jpg`);
  });

  it('should ignore overlay when type property is missing', function () {
    const url = client.helper.buildSrc({
      transformationPosition: 'path',
      urlEndpoint: 'https://ik.imagekit.io/test_url_endpoint',
      src: '/base-image.jpg',
      transformation: [
        {
          overlay: {} as any,
        },
      ],
    });
    expect(url).toBe(`https://ik.imagekit.io/test_url_endpoint/base-image.jpg`);
  });

  it('should ignore image overlay when input property is missing', function () {
    const url = client.helper.buildSrc({
      transformationPosition: 'path',
      urlEndpoint: 'https://ik.imagekit.io/test_url_endpoint',
      src: '/base-image.jpg',
      transformation: [
        {
          overlay: {
            type: 'image',
          } as any,
        },
      ],
    });
    expect(url).toBe(`https://ik.imagekit.io/test_url_endpoint/base-image.jpg`);
  });

  it('should ignore video overlay when input property is missing', function () {
    const url = client.helper.buildSrc({
      transformationPosition: 'path',
      urlEndpoint: 'https://ik.imagekit.io/test_url_endpoint',
      src: '/base-image.jpg',
      transformation: [
        {
          overlay: {
            type: 'video',
          } as any,
        },
      ],
    });
    expect(url).toBe(`https://ik.imagekit.io/test_url_endpoint/base-image.jpg`);
  });

  it('should ignore subtitle overlay when input property is missing', function () {
    const url = client.helper.buildSrc({
      transformationPosition: 'path',
      urlEndpoint: 'https://ik.imagekit.io/test_url_endpoint',
      src: '/base-image.jpg',
      transformation: [
        {
          overlay: {
            type: 'subtitle',
          } as any,
        },
      ],
    });
    expect(url).toBe(`https://ik.imagekit.io/test_url_endpoint/base-image.jpg`);
  });

  it('should ignore solid color overlay when color property is missing', function () {
    const url = client.helper.buildSrc({
      transformationPosition: 'path',
      urlEndpoint: 'https://ik.imagekit.io/test_url_endpoint',
      src: '/base-image.jpg',
      transformation: [
        {
          overlay: {
            type: 'solidColor',
          } as any,
        },
      ],
    });
    expect(url).toBe(`https://ik.imagekit.io/test_url_endpoint/base-image.jpg`);
  });

  it('should generate URL with text overlay using URL encoding', function () {
    const url = client.helper.buildSrc({
      transformationPosition: 'path',
      urlEndpoint: 'https://ik.imagekit.io/test_url_endpoint',
      src: '/base-image.jpg',
      transformation: [
        {
          overlay: {
            type: 'text',
            text: 'Minimal Text',
          },
        },
      ],
    });
    expect(url).toBe(
      `https://ik.imagekit.io/test_url_endpoint/tr:l-text,i-${encodeURIComponent(
        'Minimal Text',
      )},l-end/base-image.jpg`,
    );
  });

  it('should generate URL with image overlay from input file', function () {
    const url = client.helper.buildSrc({
      transformationPosition: 'path',
      urlEndpoint: 'https://ik.imagekit.io/test_url_endpoint',
      src: '/base-image.jpg',
      transformation: [
        {
          overlay: {
            type: 'image',
            input: 'logo.png',
          },
        },
      ],
    });
    expect(url).toBe(`https://ik.imagekit.io/test_url_endpoint/tr:l-image,i-logo.png,l-end/base-image.jpg`);
  });

  it('should generate URL with video overlay from input file', function () {
    const url = client.helper.buildSrc({
      transformationPosition: 'path',
      urlEndpoint: 'https://ik.imagekit.io/test_url_endpoint',
      src: '/base-video.mp4',
      transformation: [
        {
          overlay: {
            type: 'video',
            input: 'play-pause-loop.mp4',
          },
        },
      ],
    });
    expect(url).toBe(
      `https://ik.imagekit.io/test_url_endpoint/tr:l-video,i-play-pause-loop.mp4,l-end/base-video.mp4`,
    );
  });

  it('should generate URL with subtitle overlay from input file', function () {
    const url = client.helper.buildSrc({
      transformationPosition: 'path',
      urlEndpoint: 'https://ik.imagekit.io/test_url_endpoint',
      src: '/base-video.mp4',
      transformation: [
        {
          overlay: {
            type: 'subtitle',
            input: 'subtitle.srt',
          },
        },
      ],
    });
    expect(url).toBe(
      `https://ik.imagekit.io/test_url_endpoint/tr:l-subtitle,i-subtitle.srt,l-end/base-video.mp4`,
    );
  });

  it('should generate URL with solid color overlay using background color', function () {
    const url = client.helper.buildSrc({
      transformationPosition: 'path',
      urlEndpoint: 'https://ik.imagekit.io/test_url_endpoint',
      src: '/base-image.jpg',
      transformation: [
        {
          overlay: {
            type: 'solidColor',
            color: 'FF0000',
          },
        },
      ],
    });
    expect(url).toBe(
      `https://ik.imagekit.io/test_url_endpoint/tr:l-image,i-ik_canvas,bg-FF0000,l-end/base-image.jpg`,
    );
  });

  it('should generate URL with multiple complex overlays including nested transformations', function () {
    const url = client.helper.buildSrc({
      transformationPosition: 'path',
      urlEndpoint: 'https://ik.imagekit.io/test_url_endpoint',
      src: '/base-image.jpg',
      transformation: [
        {
          // Text overlay
          overlay: {
            type: 'text',
            text: 'Every thing',
            position: {
              x: '10',
              y: '20',
              focus: 'center',
            },
            timing: {
              start: 5,
              duration: '10',
              end: 15,
            },
            transformation: [
              {
                width: 'bw_mul_0.5',
                fontSize: 20,
                fontFamily: 'Arial',
                fontColor: '0000ff',
                innerAlignment: 'left',
                padding: 5,
                alpha: 7,
                typography: 'b',
                background: 'red',
                radius: 10,
                rotation: 'N45',
                flip: 'h',
                lineHeight: 20,
              },
            ],
          },
        },
        {
          // Image overlay
          overlay: {
            type: 'image',
            input: 'logo.png',
            position: {
              x: '10',
              y: '20',
              focus: 'center',
            },
            timing: {
              start: 5,
              duration: '10',
              end: 15,
            },
            transformation: [
              {
                width: 'bw_mul_0.5',
                height: 'bh_mul_0.5',
                rotation: 'N45',
                flip: 'h',
                overlay: {
                  type: 'text',
                  text: 'Nested text overlay',
                },
              },
            ],
          },
        },
        {
          // Video overlay. Just for URL generation testing, you can't actually overlay a video on an image.
          overlay: {
            type: 'video',
            input: 'play-pause-loop.mp4',
            position: {
              x: '10',
              y: '20',
              focus: 'center',
            },
            timing: {
              start: 5,
              duration: '10',
              end: 15,
            },
            transformation: [
              {
                width: 'bw_mul_0.5',
                height: 'bh_mul_0.5',
                rotation: 'N45',
                flip: 'h',
              },
            ],
          },
        },
        {
          // Subtitle overlay. Just for URL generation testing, you can't actually overlay a subtitle on an image.
          overlay: {
            type: 'subtitle',
            input: 'subtitle.srt',
            position: {
              x: '10',
              y: '20',
              focus: 'center',
            },
            timing: {
              start: 5,
              duration: '10',
              end: 15,
            },
            transformation: [
              {
                background: 'red',
                color: '0000ff',
                fontFamily: 'Arial',
                fontOutline: '2_A1CCDD50',
                fontShadow: 'A1CCDD_3',
              },
            ],
          },
        },
        {
          // Solid color overlay
          overlay: {
            type: 'solidColor',
            color: 'FF0000',
            position: {
              x: '10',
              y: '20',
              focus: 'center',
            },
            timing: {
              start: 5,
              duration: '10',
              end: 15,
            },
            transformation: [
              {
                width: 'bw_mul_0.5',
                height: 'bh_mul_0.5',
                alpha: 0.5,
                background: 'red',
                gradient: true,
                radius: 'max',
              },
            ],
          },
        },
      ],
    });

    expect(url).toBe(
      `https://ik.imagekit.io/test_url_endpoint/tr:l-text,i-Every%20thing,lx-10,ly-20,lfo-center,lso-5,leo-15,ldu-10,w-bw_mul_0.5,fs-20,ff-Arial,co-0000ff,ia-left,pa-5,al-7,tg-b,bg-red,r-10,rt-N45,fl-h,lh-20,l-end:l-image,i-logo.png,lx-10,ly-20,lfo-center,lso-5,leo-15,ldu-10,w-bw_mul_0.5,h-bh_mul_0.5,rt-N45,fl-h,l-text,i-Nested%20text%20overlay,l-end,l-end:l-video,i-play-pause-loop.mp4,lx-10,ly-20,lfo-center,lso-5,leo-15,ldu-10,w-bw_mul_0.5,h-bh_mul_0.5,rt-N45,fl-h,l-end:l-subtitle,i-subtitle.srt,lx-10,ly-20,lfo-center,lso-5,leo-15,ldu-10,bg-red,co-0000ff,ff-Arial,fol-2_A1CCDD50,fsh-A1CCDD_3,l-end:l-image,i-ik_canvas,bg-FF0000,lx-10,ly-20,lfo-center,lso-5,leo-15,ldu-10,w-bw_mul_0.5,h-bh_mul_0.5,al-0.5,bg-red,e-gradient,r-max,l-end/base-image.jpg`,
    );
  });

  it('should generate URL with image overlay using layer mode multiply', function () {
    const url = client.helper.buildSrc({
      transformationPosition: 'path',
      urlEndpoint: 'https://ik.imagekit.io/test_url_endpoint',
      src: '/base-image.jpg',
      transformation: [
        {
          overlay: {
            type: 'image',
            input: 'overlay.png',
            layerMode: 'multiply',
          },
        },
      ],
    });
    expect(url).toBe(
      `https://ik.imagekit.io/test_url_endpoint/tr:l-image,i-overlay.png,lm-multiply,l-end/base-image.jpg`,
    );
  });

  it('should generate URL with image overlay using layer mode cutter', function () {
    const url = client.helper.buildSrc({
      transformationPosition: 'path',
      urlEndpoint: 'https://ik.imagekit.io/test_url_endpoint',
      src: '/base-image.jpg',
      transformation: [
        {
          overlay: {
            type: 'image',
            input: 'mask.png',
            layerMode: 'cutter',
          },
        },
      ],
    });
    expect(url).toBe(
      `https://ik.imagekit.io/test_url_endpoint/tr:l-image,i-mask.png,lm-cutter,l-end/base-image.jpg`,
    );
  });

  it('should generate URL with image overlay using layer mode cutout', function () {
    const url = client.helper.buildSrc({
      transformationPosition: 'path',
      urlEndpoint: 'https://ik.imagekit.io/test_url_endpoint',
      src: '/base-image.jpg',
      transformation: [
        {
          overlay: {
            type: 'image',
            input: 'mask.png',
            layerMode: 'cutout',
          },
        },
      ],
    });
    expect(url).toBe(
      `https://ik.imagekit.io/test_url_endpoint/tr:l-image,i-mask.png,lm-cutout,l-end/base-image.jpg`,
    );
  });

  it('should generate URL with image overlay using layer mode displace', function () {
    const url = client.helper.buildSrc({
      transformationPosition: 'path',
      urlEndpoint: 'https://ik.imagekit.io/test_url_endpoint',
      src: '/base-image.jpg',
      transformation: [
        {
          overlay: {
            type: 'image',
            input: 'displacement-map.png',
            layerMode: 'displace',
            position: {
              x: '50',
              y: '50',
            },
          },
        },
      ],
    });
    expect(url).toBe(
      `https://ik.imagekit.io/test_url_endpoint/tr:l-image,i-displacement-map.png,lm-displace,lx-50,ly-50,l-end/base-image.jpg`,
    );
  });
});

describe('Overlay encoding test cases', function () {
  it('should use plain encoding for simple image paths with slashes converted to @@', function () {
    const url = client.helper.buildSrc({
      // Using a different endpoint here, as we are checking for /demo
      transformationPosition: 'path',
      urlEndpoint: 'https://ik.imagekit.io/demo',
      src: '/medium_cafe_B1iTdD0C.jpg',
      transformation: [
        {
          overlay: {
            type: 'image',
            input: '/customer_logo/nykaa.png',
          },
        },
      ],
    });
    expect(url).toBe(
      `https://ik.imagekit.io/demo/tr:l-image,i-customer_logo@@nykaa.png,l-end/medium_cafe_B1iTdD0C.jpg`,
    );
  });

  it('should use base64 encoding for image paths containing special characters', function () {
    const url = client.helper.buildSrc({
      transformationPosition: 'path',
      urlEndpoint: 'https://ik.imagekit.io/demo',
      src: '/medium_cafe_B1iTdD0C.jpg',
      transformation: [
        {
          overlay: {
            type: 'image',
            input: '/customer_logo/Ñykaa.png',
          },
        },
      ],
    });

    // Buffer.from(decodeURIComponent("Y3VzdG9tZXJfbG9nby%2FDkXlrYWEucG5n"),"base64").toString() = customer_logo/Ñykaa.png
    // Exactly what we want

    expect(url).toBe(
      `https://ik.imagekit.io/demo/tr:l-image,ie-Y3VzdG9tZXJfbG9nby%2FDkXlrYWEucG5n,l-end/medium_cafe_B1iTdD0C.jpg`,
    );
  });

  it('should use plain encoding for simple text overlays', function () {
    const url = client.helper.buildSrc({
      transformationPosition: 'path',
      urlEndpoint: 'https://ik.imagekit.io/demo',
      src: '/medium_cafe_B1iTdD0C.jpg',
      transformation: [
        {
          overlay: {
            type: 'text',
            text: 'Manu',
          },
        },
      ],
    });
    expect(url).toBe(`https://ik.imagekit.io/demo/tr:l-text,i-Manu,l-end/medium_cafe_B1iTdD0C.jpg`);
  });

  it('should convert slashes to @@ in fontFamily paths for custom fonts', function () {
    const url = client.helper.buildSrc({
      transformationPosition: 'path',
      urlEndpoint: 'https://ik.imagekit.io/demo',
      src: '/medium_cafe_B1iTdD0C.jpg',
      transformation: [
        {
          overlay: {
            type: 'text',
            text: 'Manu',
            transformation: [
              {
                fontFamily: 'nested-path/Poppins-Regular_Q15GrYWmL.ttf',
              },
            ],
          },
        },
      ],
    });
    expect(url).toBe(
      `https://ik.imagekit.io/demo/tr:l-text,i-Manu,ff-nested-path@@Poppins-Regular_Q15GrYWmL.ttf,l-end/medium_cafe_B1iTdD0C.jpg`,
    );
  });

  it('should use URL encoding for text overlays with spaces and safe characters', function () {
    const url = client.helper.buildSrc({
      transformationPosition: 'path',
      urlEndpoint: 'https://ik.imagekit.io/demo',
      src: '/medium_cafe_B1iTdD0C.jpg',
      transformation: [
        {
          overlay: {
            type: 'text',
            text: 'alnum123-._ ',
          },
        },
      ],
    });
    expect(url).toBe(
      `https://ik.imagekit.io/demo/tr:l-text,i-${encodeURIComponent(
        'alnum123-._ ',
      )},l-end/medium_cafe_B1iTdD0C.jpg`,
    );
  });

  it('should use base64 encoding for text overlays with special unicode characters', function () {
    const url = client.helper.buildSrc({
      transformationPosition: 'path',
      urlEndpoint: 'https://ik.imagekit.io/demo',
      src: '/medium_cafe_B1iTdD0C.jpg',
      transformation: [
        {
          overlay: {
            type: 'text',
            text: "Let's use ©, ®, ™, etc",
          },
        },
      ],
    });
    expect(url).toBe(
      `https://ik.imagekit.io/demo/tr:l-text,ie-TGV0J3MgdXNlIMKpLCDCriwg4oSiLCBldGM%3D,l-end/medium_cafe_B1iTdD0C.jpg`,
    );
  });

  it('should use plain encoding when explicitly specified for text overlay', function () {
    const url = client.helper.buildSrc({
      transformationPosition: 'path',
      urlEndpoint: 'https://ik.imagekit.io/demo',
      src: '/sample.jpg',
      transformation: [
        {
          overlay: {
            type: 'text',
            text: 'HelloWorld',
            encoding: 'plain',
          },
        },
      ],
    });
    expect(url).toBe(`https://ik.imagekit.io/demo/tr:l-text,i-HelloWorld,l-end/sample.jpg`);
  });

  it('should use base64 encoding when explicitly specified for text overlay', function () {
    const url = client.helper.buildSrc({
      transformationPosition: 'path',
      urlEndpoint: 'https://ik.imagekit.io/demo',
      src: '/sample.jpg',
      transformation: [
        {
          overlay: {
            type: 'text',
            text: 'HelloWorld',
            encoding: 'base64',
          },
        },
      ],
    });
    expect(url).toBe(
      `https://ik.imagekit.io/demo/tr:l-text,ie-${encodeURIComponent(
        safeBtoa('HelloWorld'),
      )},l-end/sample.jpg`,
    );
  });

  it('should use plain encoding when explicitly specified for image overlay', function () {
    const url = client.helper.buildSrc({
      transformationPosition: 'path',
      urlEndpoint: 'https://ik.imagekit.io/demo',
      src: '/sample.jpg',
      transformation: [
        {
          overlay: {
            type: 'image',
            input: '/customer/logo.png',
            encoding: 'plain',
          },
        },
      ],
    });
    expect(url).toBe(`https://ik.imagekit.io/demo/tr:l-image,i-customer@@logo.png,l-end/sample.jpg`);
  });

  it('should use base64 encoding when explicitly specified for image overlay', function () {
    const url = client.helper.buildSrc({
      transformationPosition: 'path',
      urlEndpoint: 'https://ik.imagekit.io/demo',
      src: '/sample.jpg',
      transformation: [
        {
          overlay: {
            type: 'image',
            input: '/customer/logo.png',
            encoding: 'base64',
          },
        },
      ],
    });
    expect(url).toBe(
      `https://ik.imagekit.io/demo/tr:l-image,ie-${encodeURIComponent(
        safeBtoa('customer/logo.png'),
      )},l-end/sample.jpg`,
    );
  });

  it('should use base64 encoding when explicitly specified for video overlay', function () {
    const url = client.helper.buildSrc({
      transformationPosition: 'path',
      urlEndpoint: 'https://ik.imagekit.io/demo',
      src: '/sample.mp4',
      transformation: [
        {
          overlay: {
            type: 'video',
            input: '/path/to/video.mp4',
            encoding: 'base64',
          },
        },
      ],
    });
    expect(url).toBe(
      `https://ik.imagekit.io/demo/tr:l-video,ie-${encodeURIComponent(
        safeBtoa('path/to/video.mp4'),
      )},l-end/sample.mp4`,
    );
  });

  it('should use plain encoding when explicitly specified for subtitle overlay', function () {
    const url = client.helper.buildSrc({
      transformationPosition: 'path',
      urlEndpoint: 'https://ik.imagekit.io/demo',
      src: '/sample.mp4',
      transformation: [
        {
          overlay: {
            type: 'subtitle',
            input: '/sub.srt',
            encoding: 'plain',
          },
        },
      ],
    });
    expect(url).toBe(`https://ik.imagekit.io/demo/tr:l-subtitle,i-sub.srt,l-end/sample.mp4`);
  });

  it('should use base64 encoding when explicitly specified for subtitle overlay', function () {
    const url = client.helper.buildSrc({
      transformationPosition: 'path',
      urlEndpoint: 'https://ik.imagekit.io/demo',
      src: '/sample.mp4',
      transformation: [
        {
          overlay: {
            type: 'subtitle',
            input: 'sub.srt',
            encoding: 'base64',
          },
        },
      ],
    });
    expect(url).toBe(
      `https://ik.imagekit.io/demo/tr:l-subtitle,ie-${encodeURIComponent(
        safeBtoa('sub.srt'),
      )},l-end/sample.mp4`,
    );
  });

  it('should properly encode overlay text when transformations are in query parameters', function () {
    const url = client.helper.buildSrc({
      urlEndpoint: 'https://ik.imagekit.io/demo',
      src: '/sample.jpg',
      transformation: [
        {
          overlay: {
            type: 'text',
            text: 'Minimal Text',
          },
        },
      ],
      transformationPosition: 'query',
    });
    expect(url).toBe(`https://ik.imagekit.io/demo/sample.jpg?tr=l-text,i-Minimal%20Text,l-end`);
  });
});
