import { serializeUploadOptions } from '../src/lib/serialization-utils';

describe('serializeUploadOptions', () => {
  it('should serialize all special fields correctly while preserving other fields', () => {
    const extensions = [
      { name: 'google-auto-tagging', maxTags: 10, minConfidence: 80 },
      { name: 'remove-bg', options: { bg_color: 'white' } },
    ];

    const customMetadata = {
      photographer: 'John Doe',
      category: 'nature',
      rating: 5,
    };

    const transformation = {
      pre: 'w-500,h-300',
      post: [
        { type: 'transformation', value: 'w-200,h-150' },
        { type: 'gif-to-video', value: 'q-80' },
      ],
    };

    const input = {
      // Special fields that should be serialized
      tags: ['nature', 'landscape', 'photography'],
      responseFields: ['tags', 'customMetadata', 'isPrivateFile'],
      extensions,
      customMetadata,
      transformation,

      // Regular fields that should remain unchanged
      fileName: 'test-image.jpg',
      folder: '/photos/2024',
      isPrivateFile: false,
      useUniqueFileName: true,
      description: 'A beautiful landscape photo',
      webhookUrl: 'https://example.com/webhook',
    };

    const result = serializeUploadOptions(input);

    // Assert special fields are properly serialized
    expect(result['tags']).toBe('nature,landscape,photography');
    expect(result['responseFields']).toBe('tags,customMetadata,isPrivateFile');
    expect(result['extensions']).toBe(JSON.stringify(extensions));
    expect(result['customMetadata']).toBe(JSON.stringify(customMetadata));
    expect(result['transformation']).toBe(JSON.stringify(transformation));

    // Assert regular fields remain unchanged
    expect(result['fileName']).toBe('test-image.jpg');
    expect(result['folder']).toBe('/photos/2024');
    expect(result['isPrivateFile']).toBe(false);
    expect(result['useUniqueFileName']).toBe(true);
    expect(result['description']).toBe('A beautiful landscape photo');
    expect(result['webhookUrl']).toBe('https://example.com/webhook');

    // Ensure original object is not modified
    expect(input.tags).toEqual(['nature', 'landscape', 'photography']);
    expect(input.extensions).toBe(extensions);
    expect(input.customMetadata).toBe(customMetadata);
    expect(input.transformation).toBe(transformation);
  });

  it('should handle edge cases with null, undefined, and empty values', () => {
    const input = {
      fileName: 'test.jpg',

      // undefined values
      tags: undefined,
      transformation: undefined,

      // null values
      responseFields: null,
      customMetadata: null,

      // empty arrays and objects
      extensions: [],
      emptyObject: {},
      emptyArray: [],

      // non-special arrays and objects should remain unchanged
      regularArray: ['item1', 'item2'],
      regularObject: { key: 'value' },
    };

    const result = serializeUploadOptions(input);

    // undefined values should remain undefined
    expect(result['tags']).toBeUndefined();
    expect(result['transformation']).toBeUndefined();

    // null values should remain null
    expect(result['responseFields']).toBeNull();
    expect(result['customMetadata']).toBeNull();

    // empty arrays for special fields should be serialized
    expect(result['extensions']).toBe('[]');

    // empty arrays/objects for non-special fields should remain unchanged
    expect(result['emptyObject']).toEqual({});
    expect(result['emptyArray']).toEqual([]);
    expect(result['regularArray']).toEqual(['item1', 'item2']);
    expect(result['regularObject']).toEqual({ key: 'value' });

    // regular field should remain unchanged
    expect(result['fileName']).toBe('test.jpg');
  });
});
