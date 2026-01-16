// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { IncomingMessage } from 'node:http';
import { ClientOptions } from '@imagekit/nodejs';

export const parseAuthHeaders = (req: IncomingMessage): Partial<ClientOptions> => {
  if (req.headers.authorization) {
    const scheme = req.headers.authorization.split(' ')[0]!;
    const value = req.headers.authorization.slice(scheme.length + 1);
    switch (scheme) {
      case 'Basic':
        const rawValue = Buffer.from(value, 'base64').toString();
        return {
          privateKey: rawValue.slice(0, rawValue.search(':')),
          password: rawValue.slice(rawValue.search(':') + 1),
        };
      default:
        throw new Error(
          'Unsupported authorization scheme. Expected the "Authorization" header to be a supported scheme (Basic).',
        );
    }
  }

  const privateKey =
    Array.isArray(req.headers['x-imagekit-private-key']) ?
      req.headers['x-imagekit-private-key'][0]
    : req.headers['x-imagekit-private-key'];
  const password =
    Array.isArray(req.headers['x-optional-imagekit-ignores-this']) ?
      req.headers['x-optional-imagekit-ignores-this'][0]
    : req.headers['x-optional-imagekit-ignores-this'];
  return { privateKey, password };
};
