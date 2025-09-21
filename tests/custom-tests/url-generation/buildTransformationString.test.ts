import ImageKit from '@imagekit/nodejs';
import type { Transformation } from '../../../src/resources/shared';

const client = new ImageKit({
  privateKey: 'My Private API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('buildTransformationString', function () {
  it('should return an empty string when no transformations are provided', function () {
    const result = client.helper.buildTransformationString([{}] as Transformation[]);
    expect(result).toBe('');
  });

  it('should generate a transformation string for width only', function () {
    const result = client.helper.buildTransformationString([{ width: 300 }]);
    expect(result).toBe('w-300');
  });

  it('should generate a transformation string for multiple transformations', function () {
    const result = client.helper.buildTransformationString([
      {
        overlay: {
          type: 'text',
          text: 'Hello',
        },
      },
    ]);
    expect(result).toBe('l-text,i-Hello,l-end');
  });
});
