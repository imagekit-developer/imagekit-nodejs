// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asTextContentResult } from '@imagekit/api-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import ImageKit from '@imagekit/nodejs';

export const metadata: Metadata = {
  resource: 'accounts.origins',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/v1/accounts/origins',
  operationId: 'create-origin',
};

export const tool: Tool = {
  name: 'create_accounts_origins',
  description:
    '**Note:** This API is currently in beta.  \nCreates a new origin and returns the origin object.\n',
  inputSchema: {
    type: 'object',
    anyOf: [
      {
        type: 'object',
        properties: {
          accessKey: {
            type: 'string',
            description: 'Access key for the bucket.',
          },
          bucket: {
            type: 'string',
            description: 'S3 bucket name.',
          },
          name: {
            type: 'string',
            description: 'Display name of the origin.',
          },
          secretKey: {
            type: 'string',
            description: 'Secret key for the bucket.',
          },
          type: {
            type: 'string',
            enum: ['S3'],
          },
          baseUrlForCanonicalHeader: {
            type: 'string',
            description: 'URL used in the Canonical header (if enabled).',
          },
          includeCanonicalHeader: {
            type: 'boolean',
            description: 'Whether to send a Canonical header.',
          },
          prefix: {
            type: 'string',
            description: 'Path prefix inside the bucket.',
          },
        },
        required: ['accessKey', 'bucket', 'name', 'secretKey', 'type'],
      },
      {
        type: 'object',
        properties: {
          accessKey: {
            type: 'string',
            description: 'Access key for the bucket.',
          },
          bucket: {
            type: 'string',
            description: 'S3 bucket name.',
          },
          endpoint: {
            type: 'string',
            description: 'Custom S3-compatible endpoint.',
          },
          name: {
            type: 'string',
            description: 'Display name of the origin.',
          },
          secretKey: {
            type: 'string',
            description: 'Secret key for the bucket.',
          },
          type: {
            type: 'string',
            enum: ['S3_COMPATIBLE'],
          },
          baseUrlForCanonicalHeader: {
            type: 'string',
            description: 'URL used in the Canonical header (if enabled).',
          },
          includeCanonicalHeader: {
            type: 'boolean',
            description: 'Whether to send a Canonical header.',
          },
          prefix: {
            type: 'string',
            description: 'Path prefix inside the bucket.',
          },
          s3ForcePathStyle: {
            type: 'boolean',
            description: 'Use path-style S3 URLs?',
          },
        },
        required: ['accessKey', 'bucket', 'endpoint', 'name', 'secretKey', 'type'],
      },
      {
        type: 'object',
        properties: {
          accessKey: {
            type: 'string',
            description: 'Access key for the bucket.',
          },
          bucket: {
            type: 'string',
            description: 'S3 bucket name.',
          },
          name: {
            type: 'string',
            description: 'Display name of the origin.',
          },
          secretKey: {
            type: 'string',
            description: 'Secret key for the bucket.',
          },
          type: {
            type: 'string',
            enum: ['CLOUDINARY_BACKUP'],
          },
          baseUrlForCanonicalHeader: {
            type: 'string',
            description: 'URL used in the Canonical header (if enabled).',
          },
          includeCanonicalHeader: {
            type: 'boolean',
            description: 'Whether to send a Canonical header.',
          },
          prefix: {
            type: 'string',
            description: 'Path prefix inside the bucket.',
          },
        },
        required: ['accessKey', 'bucket', 'name', 'secretKey', 'type'],
      },
      {
        type: 'object',
        properties: {
          baseUrl: {
            type: 'string',
            description: 'Root URL for the web folder origin.',
          },
          name: {
            type: 'string',
            description: 'Display name of the origin.',
          },
          type: {
            type: 'string',
            enum: ['WEB_FOLDER'],
          },
          baseUrlForCanonicalHeader: {
            type: 'string',
            description: 'URL used in the Canonical header (if enabled).',
          },
          forwardHostHeaderToOrigin: {
            type: 'boolean',
            description: 'Forward the Host header to origin?',
          },
          includeCanonicalHeader: {
            type: 'boolean',
            description: 'Whether to send a Canonical header.',
          },
        },
        required: ['baseUrl', 'name', 'type'],
      },
      {
        type: 'object',
        properties: {
          name: {
            type: 'string',
            description: 'Display name of the origin.',
          },
          type: {
            type: 'string',
            enum: ['WEB_PROXY'],
          },
          baseUrlForCanonicalHeader: {
            type: 'string',
            description: 'URL used in the Canonical header (if enabled).',
          },
          includeCanonicalHeader: {
            type: 'boolean',
            description: 'Whether to send a Canonical header.',
          },
        },
        required: ['name', 'type'],
      },
      {
        type: 'object',
        properties: {
          bucket: {
            type: 'string',
          },
          clientEmail: {
            type: 'string',
          },
          name: {
            type: 'string',
            description: 'Display name of the origin.',
          },
          privateKey: {
            type: 'string',
          },
          type: {
            type: 'string',
            enum: ['GCS'],
          },
          baseUrlForCanonicalHeader: {
            type: 'string',
            description: 'URL used in the Canonical header (if enabled).',
          },
          includeCanonicalHeader: {
            type: 'boolean',
            description: 'Whether to send a Canonical header.',
          },
          prefix: {
            type: 'string',
          },
        },
        required: ['bucket', 'clientEmail', 'name', 'privateKey', 'type'],
      },
      {
        type: 'object',
        properties: {
          accountName: {
            type: 'string',
          },
          container: {
            type: 'string',
          },
          name: {
            type: 'string',
            description: 'Display name of the origin.',
          },
          sasToken: {
            type: 'string',
          },
          type: {
            type: 'string',
            enum: ['AZURE_BLOB'],
          },
          baseUrlForCanonicalHeader: {
            type: 'string',
            description: 'URL used in the Canonical header (if enabled).',
          },
          includeCanonicalHeader: {
            type: 'boolean',
            description: 'Whether to send a Canonical header.',
          },
          prefix: {
            type: 'string',
          },
        },
        required: ['accountName', 'container', 'name', 'sasToken', 'type'],
      },
      {
        type: 'object',
        properties: {
          baseUrl: {
            type: 'string',
            description: 'Akeneo instance base URL.',
          },
          clientId: {
            type: 'string',
            description: 'Akeneo API client ID.',
          },
          clientSecret: {
            type: 'string',
            description: 'Akeneo API client secret.',
          },
          name: {
            type: 'string',
            description: 'Display name of the origin.',
          },
          password: {
            type: 'string',
            description: 'Akeneo API password.',
          },
          type: {
            type: 'string',
            enum: ['AKENEO_PIM'],
          },
          username: {
            type: 'string',
            description: 'Akeneo API username.',
          },
          baseUrlForCanonicalHeader: {
            type: 'string',
            description: 'URL used in the Canonical header (if enabled).',
          },
          includeCanonicalHeader: {
            type: 'boolean',
            description: 'Whether to send a Canonical header.',
          },
        },
        required: ['baseUrl', 'clientId', 'clientSecret', 'name', 'password', 'type', 'username'],
      },
    ],
  },
  annotations: {},
};

export const handler = async (client: ImageKit, args: Record<string, unknown> | undefined) => {
  const body = args as any;
  return asTextContentResult(await client.accounts.origins.create(body));
};

export default { metadata, tool, handler };
