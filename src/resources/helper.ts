// Helper resource for additional utility functions
// File manually created for helper functions - not generated

import { APIResource } from '../core/resource';
import type { ImageKit } from '../client';

export class Helper extends APIResource {
  constructor(client: ImageKit) {
    super(client);
  }

  /**
   * Build ImageKit URL - currently returns input as-is
   */
  buildSrc(input: string): string {
    return input;
  }

  /**
   * Build transformation string - currently returns input as-is
   */
  buildTransformationString(input: string): string {
    return input;
  }
}
