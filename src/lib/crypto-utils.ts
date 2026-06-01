/**
 * Simple synchronous crypto utilities for ImageKit SDK
 *
 * This module provides HMAC-SHA1 functionality using Node.js crypto module.
 * URL signing is only supported in Node.js runtime.
 */

import { ImageKitError } from '../core/error';

// Import crypto at the top level - works in both ESM and CJS
import * as cryptoImport from 'crypto';

// Handle the different ways crypto might be exported
const crypto = (cryptoImport as any).default || cryptoImport;

/**
 * Creates an HMAC-SHA1 hash using Node.js crypto module
 *
 * @param key - The secret key for HMAC generation
 * @param data - The data to be signed
 * @returns Hex-encoded HMAC-SHA1 hash
 * @throws ImageKitError if crypto module is not available or operation fails
 */
export function createHmacSha1(key: string, data: string): string {
  if (!crypto || typeof crypto.createHmac !== 'function') {
    throw new ImageKitError(
      'URL signing requires Node.js crypto module which is not available in this runtime. ' +
        'Please use Node.js environment for URL signing functionality.',
    );
  }

  try {
    return crypto.createHmac('sha1', key).update(data, 'utf8').digest('hex');
  } catch (error) {
    throw new ImageKitError(
      `Failed to generate HMAC-SHA1 signature: ${error instanceof Error ? error.message : 'Unknown error'}`,
    );
  }
}
