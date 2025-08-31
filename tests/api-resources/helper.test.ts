// Test for the Helper resource following TDD approach

import ImageKit from '@imagekit/nodejs';

const client = new ImageKit({
  privateAPIKey: 'My Private API Key',
  password: 'My Password',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource helper', () => {
  describe('buildSrc', () => {
    test('should exist as a method', () => {
      expect(typeof client.helper.buildSrc).toBe('function');
    });

    test('should return the input string as-is', () => {
      const input = '/test-image.jpg';
      const result = client.helper.buildSrc(input);
      
      expect(result).toBe(input);
    });
  });

  describe('buildTransformationString', () => {
    test('should exist as a method', () => {
      expect(typeof client.helper.buildTransformationString).toBe('function');
    });

    test('should return the input string as-is', () => {
      const input = 'w-300,h-200';
      const result = client.helper.buildTransformationString(input);
      
      expect(result).toBe(input);
    });

    test('should handle different string inputs', () => {
      const inputs = [
        'w-300,h-200,c-at_max',
        'f-webp,q-80',
        'r-10,b-5_black',
        '',
        'single-param'
      ];

      inputs.forEach(input => {
        const result = client.helper.buildTransformationString(input);
        expect(result).toBe(input);
      });
    });

    test('should handle empty string', () => {
      const result = client.helper.buildTransformationString('');
      expect(result).toBe('');
    });
  });
});
