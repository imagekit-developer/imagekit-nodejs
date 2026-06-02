// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { McpOptions } from './options';

export type SdkMethod = {
  clientCallName: string;
  fullyQualifiedName: string;
  httpMethod?: 'get' | 'post' | 'put' | 'patch' | 'delete' | 'query';
  httpPath?: string;
};

export const sdkMethods: SdkMethod[] = [
  {
    clientCallName: 'client.customMetadataFields.list',
    fullyQualifiedName: 'customMetadataFields.list',
    httpMethod: 'get',
    httpPath: '/v2/custom-metadata-fields',
  },
  {
    clientCallName: 'client.customMetadataFields.create',
    fullyQualifiedName: 'customMetadataFields.create',
    httpMethod: 'post',
    httpPath: '/v2/custom-metadata-fields',
  },
  {
    clientCallName: 'client.customMetadataFields.update',
    fullyQualifiedName: 'customMetadataFields.update',
    httpMethod: 'patch',
    httpPath: '/v2/custom-metadata-fields/{id}',
  },
  {
    clientCallName: 'client.customMetadataFields.delete',
    fullyQualifiedName: 'customMetadataFields.delete',
    httpMethod: 'delete',
    httpPath: '/v2/custom-metadata-fields/{id}',
  },
  {
    clientCallName: 'client.assets.upload',
    fullyQualifiedName: 'assets.upload',
    httpMethod: 'post',
    httpPath: '/v2/assets/upload',
  },
  {
    clientCallName: 'client.assets.list',
    fullyQualifiedName: 'assets.list',
    httpMethod: 'get',
    httpPath: '/v2/assets',
  },
  {
    clientCallName: 'client.assets.get',
    fullyQualifiedName: 'assets.get',
    httpMethod: 'get',
    httpPath: '/v2/assets/{asset_id}',
  },
  {
    clientCallName: 'client.assets.update',
    fullyQualifiedName: 'assets.update',
    httpMethod: 'patch',
    httpPath: '/v2/assets/{asset_id}',
  },
  {
    clientCallName: 'client.assets.delete',
    fullyQualifiedName: 'assets.delete',
    httpMethod: 'delete',
    httpPath: '/v2/assets/{asset_id}',
  },
  {
    clientCallName: 'client.assets.copy',
    fullyQualifiedName: 'assets.copy',
    httpMethod: 'post',
    httpPath: '/v2/assets/copy',
  },
  {
    clientCallName: 'client.assets.move',
    fullyQualifiedName: 'assets.move',
    httpMethod: 'post',
    httpPath: '/v2/assets/move',
  },
  {
    clientCallName: 'client.assets.rename',
    fullyQualifiedName: 'assets.rename',
    httpMethod: 'put',
    httpPath: '/v2/assets/rename',
  },
  {
    clientCallName: 'client.assets.bulk.delete',
    fullyQualifiedName: 'assets.bulk.delete',
    httpMethod: 'delete',
    httpPath: '/v2/assets',
  },
  {
    clientCallName: 'client.assets.bulk.addTags',
    fullyQualifiedName: 'assets.bulk.addTags',
    httpMethod: 'post',
    httpPath: '/v2/assets/tags',
  },
  {
    clientCallName: 'client.assets.bulk.removeTags',
    fullyQualifiedName: 'assets.bulk.removeTags',
    httpMethod: 'delete',
    httpPath: '/v2/assets/tags',
  },
  {
    clientCallName: 'client.assets.versions.list',
    fullyQualifiedName: 'assets.versions.list',
    httpMethod: 'get',
    httpPath: '/v2/assets/{asset_id}/versions',
  },
  {
    clientCallName: 'client.assets.versions.get',
    fullyQualifiedName: 'assets.versions.get',
    httpMethod: 'get',
    httpPath: '/v2/assets/{asset_id}/versions/{version_id}',
  },
  {
    clientCallName: 'client.assets.versions.delete',
    fullyQualifiedName: 'assets.versions.delete',
    httpMethod: 'delete',
    httpPath: '/v2/assets/{asset_id}/versions/{version_id}',
  },
  {
    clientCallName: 'client.assets.versions.restore',
    fullyQualifiedName: 'assets.versions.restore',
    httpMethod: 'post',
    httpPath: '/v2/assets/{asset_id}/versions/{version_id}/restore',
  },
  {
    clientCallName: 'client.assets.folders.create',
    fullyQualifiedName: 'assets.folders.create',
    httpMethod: 'post',
    httpPath: '/v2/assets/folders',
  },
  {
    clientCallName: 'client.assets.jobs.get',
    fullyQualifiedName: 'assets.jobs.get',
    httpMethod: 'get',
    httpPath: '/v2/assets/jobs/{job_id}',
  },
  {
    clientCallName: 'client.savedExtensions.list',
    fullyQualifiedName: 'savedExtensions.list',
    httpMethod: 'get',
    httpPath: '/v2/saved-extensions',
  },
  {
    clientCallName: 'client.savedExtensions.create',
    fullyQualifiedName: 'savedExtensions.create',
    httpMethod: 'post',
    httpPath: '/v2/saved-extensions',
  },
  {
    clientCallName: 'client.savedExtensions.get',
    fullyQualifiedName: 'savedExtensions.get',
    httpMethod: 'get',
    httpPath: '/v2/saved-extensions/{id}',
  },
  {
    clientCallName: 'client.savedExtensions.update',
    fullyQualifiedName: 'savedExtensions.update',
    httpMethod: 'patch',
    httpPath: '/v2/saved-extensions/{id}',
  },
  {
    clientCallName: 'client.savedExtensions.delete',
    fullyQualifiedName: 'savedExtensions.delete',
    httpMethod: 'delete',
    httpPath: '/v2/saved-extensions/{id}',
  },
  {
    clientCallName: 'client.cache.invalidation.create',
    fullyQualifiedName: 'cache.invalidation.create',
    httpMethod: 'post',
    httpPath: '/v2/cache/invalidations',
  },
  {
    clientCallName: 'client.cache.invalidation.get',
    fullyQualifiedName: 'cache.invalidation.get',
    httpMethod: 'get',
    httpPath: '/v2/cache/invalidations/{request_id}',
  },
  {
    clientCallName: 'client.accounts.usage.get',
    fullyQualifiedName: 'accounts.usage.get',
    httpMethod: 'get',
    httpPath: '/v2/accounts/usage',
  },
  {
    clientCallName: 'client.accounts.origins.list',
    fullyQualifiedName: 'accounts.origins.list',
    httpMethod: 'get',
    httpPath: '/v2/accounts/origins',
  },
  {
    clientCallName: 'client.accounts.origins.create',
    fullyQualifiedName: 'accounts.origins.create',
    httpMethod: 'post',
    httpPath: '/v2/accounts/origins',
  },
  {
    clientCallName: 'client.accounts.origins.get',
    fullyQualifiedName: 'accounts.origins.get',
    httpMethod: 'get',
    httpPath: '/v2/accounts/origins/{id}',
  },
  {
    clientCallName: 'client.accounts.origins.update',
    fullyQualifiedName: 'accounts.origins.update',
    httpMethod: 'patch',
    httpPath: '/v2/accounts/origins/{id}',
  },
  {
    clientCallName: 'client.accounts.origins.delete',
    fullyQualifiedName: 'accounts.origins.delete',
    httpMethod: 'delete',
    httpPath: '/v2/accounts/origins/{id}',
  },
  {
    clientCallName: 'client.accounts.urlEndpoints.list',
    fullyQualifiedName: 'accounts.urlEndpoints.list',
    httpMethod: 'get',
    httpPath: '/v2/accounts/url-endpoints',
  },
  {
    clientCallName: 'client.accounts.urlEndpoints.create',
    fullyQualifiedName: 'accounts.urlEndpoints.create',
    httpMethod: 'post',
    httpPath: '/v2/accounts/url-endpoints',
  },
  {
    clientCallName: 'client.accounts.urlEndpoints.get',
    fullyQualifiedName: 'accounts.urlEndpoints.get',
    httpMethod: 'get',
    httpPath: '/v2/accounts/url-endpoints/{id}',
  },
  {
    clientCallName: 'client.accounts.urlEndpoints.update',
    fullyQualifiedName: 'accounts.urlEndpoints.update',
    httpMethod: 'put',
    httpPath: '/v2/accounts/url-endpoints/{id}',
  },
  {
    clientCallName: 'client.accounts.urlEndpoints.delete',
    fullyQualifiedName: 'accounts.urlEndpoints.delete',
    httpMethod: 'delete',
    httpPath: '/v2/accounts/url-endpoints/{id}',
  },
  { clientCallName: 'client.webhooks.unwrap', fullyQualifiedName: 'webhooks.unwrap' },
  { clientCallName: 'client.webhooks.unsafeUnwrap', fullyQualifiedName: 'webhooks.unsafeUnwrap' },
];

function allowedMethodsForCodeTool(options: McpOptions | undefined): SdkMethod[] | undefined {
  if (!options) {
    return undefined;
  }

  let allowedMethods: SdkMethod[];

  if (options.codeAllowHttpGets || options.codeAllowedMethods) {
    // Start with nothing allowed and then add into it from options
    let allowedMethodsSet = new Set<SdkMethod>();

    if (options.codeAllowHttpGets) {
      // Add all methods that map to an HTTP GET
      sdkMethods
        .filter((method) => method.httpMethod === 'get')
        .forEach((method) => allowedMethodsSet.add(method));
    }

    if (options.codeAllowedMethods) {
      // Add all methods that match any of the allowed regexps
      const allowedRegexps = options.codeAllowedMethods.map((pattern) => {
        try {
          return new RegExp(pattern);
        } catch (e) {
          throw new Error(
            `Invalid regex pattern for allowed method: "${pattern}": ${e instanceof Error ? e.message : e}`,
          );
        }
      });

      sdkMethods
        .filter((method) => allowedRegexps.some((regexp) => regexp.test(method.fullyQualifiedName)))
        .forEach((method) => allowedMethodsSet.add(method));
    }

    allowedMethods = Array.from(allowedMethodsSet);
  } else {
    // Start with everything allowed
    allowedMethods = [...sdkMethods];
  }

  if (options.codeBlockedMethods) {
    // Filter down based on blocked regexps
    const blockedRegexps = options.codeBlockedMethods.map((pattern) => {
      try {
        return new RegExp(pattern);
      } catch (e) {
        throw new Error(
          `Invalid regex pattern for blocked method: "${pattern}": ${e instanceof Error ? e.message : e}`,
        );
      }
    });

    allowedMethods = allowedMethods.filter(
      (method) => !blockedRegexps.some((regexp) => regexp.test(method.fullyQualifiedName)),
    );
  }

  return allowedMethods;
}

export function blockedMethodsForCodeTool(options: McpOptions | undefined): SdkMethod[] | undefined {
  const allowedMethods = allowedMethodsForCodeTool(options);
  if (!allowedMethods) {
    return undefined;
  }

  const allowedSet = new Set(allowedMethods.map((method) => method.fullyQualifiedName));

  // Return any methods that are not explicitly allowed
  return sdkMethods.filter((method) => !allowedSet.has(method.fullyQualifiedName));
}
