/**
 * Serialize upload options to handle proper formatting for ImageKit backend API.
 * Special cases handled:
 * - tags: converted to comma-separated string
 * - responseFields: converted to comma-separated string
 * - extensions: JSON stringified
 * - customMetadata: JSON stringified
 * - transformation: JSON stringified
 */
export function serializeUploadOptions(uploadOptions: Record<string, any>): Record<string, any> {
  const serialized: Record<string, any> = { ...uploadOptions };

  for (const key in serialized) {
    if (key && serialized[key] !== undefined) {
      const value = serialized[key];

      if (key === 'tags' && Array.isArray(value)) {
        // Tags should be comma-separated string
        serialized[key] = value.join(',');
      } else if (key === 'responseFields' && Array.isArray(value)) {
        // Response fields should be comma-separated string
        serialized[key] = value.join(',');
      } else if (key === 'extensions' && Array.isArray(value)) {
        // Extensions should be JSON stringified
        serialized[key] = JSON.stringify(value);
      } else if (
        key === 'customMetadata' &&
        typeof value === 'object' &&
        !Array.isArray(value) &&
        value !== null
      ) {
        // Custom metadata should be JSON stringified
        serialized[key] = JSON.stringify(value);
      } else if (key === 'transformation' && typeof value === 'object' && value !== null) {
        // Transformation should be JSON stringified
        serialized[key] = JSON.stringify(value);
      }
    }
  }

  return serialized;
}
