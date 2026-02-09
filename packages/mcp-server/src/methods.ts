import { McpOptions } from './options';

export type SdkMethod = {
  clientCallName: string;
  fullyQualifiedName: string;
  httpMethod?: 'get' | 'post' | 'put' | 'patch' | 'delete' | 'query';
  httpPath?: string;
};

export const sdkMethods: SdkMethod[] = [
  {
    clientCallName: 'client.customMetadataFields.create',
    fullyQualifiedName: 'customMetadataFields.create',
    httpMethod: 'post',
    httpPath: '/v1/customMetadataFields',
  },
  {
    clientCallName: 'client.customMetadataFields.update',
    fullyQualifiedName: 'customMetadataFields.update',
    httpMethod: 'patch',
    httpPath: '/v1/customMetadataFields/{id}',
  },
  {
    clientCallName: 'client.customMetadataFields.list',
    fullyQualifiedName: 'customMetadataFields.list',
    httpMethod: 'get',
    httpPath: '/v1/customMetadataFields',
  },
  {
    clientCallName: 'client.customMetadataFields.delete',
    fullyQualifiedName: 'customMetadataFields.delete',
    httpMethod: 'delete',
    httpPath: '/v1/customMetadataFields/{id}',
  },
  {
    clientCallName: 'client.files.update',
    fullyQualifiedName: 'files.update',
    httpMethod: 'patch',
    httpPath: '/v1/files/{fileId}/details',
  },
  {
    clientCallName: 'client.files.delete',
    fullyQualifiedName: 'files.delete',
    httpMethod: 'delete',
    httpPath: '/v1/files/{fileId}',
  },
  {
    clientCallName: 'client.files.copy',
    fullyQualifiedName: 'files.copy',
    httpMethod: 'post',
    httpPath: '/v1/files/copy',
  },
  {
    clientCallName: 'client.files.get',
    fullyQualifiedName: 'files.get',
    httpMethod: 'get',
    httpPath: '/v1/files/{fileId}/details',
  },
  {
    clientCallName: 'client.files.move',
    fullyQualifiedName: 'files.move',
    httpMethod: 'post',
    httpPath: '/v1/files/move',
  },
  {
    clientCallName: 'client.files.rename',
    fullyQualifiedName: 'files.rename',
    httpMethod: 'put',
    httpPath: '/v1/files/rename',
  },
  {
    clientCallName: 'client.files.upload',
    fullyQualifiedName: 'files.upload',
    httpMethod: 'post',
    httpPath: '/api/v1/files/upload',
  },
  {
    clientCallName: 'client.files.bulk.delete',
    fullyQualifiedName: 'files.bulk.delete',
    httpMethod: 'post',
    httpPath: '/v1/files/batch/deleteByFileIds',
  },
  {
    clientCallName: 'client.files.bulk.addTags',
    fullyQualifiedName: 'files.bulk.addTags',
    httpMethod: 'post',
    httpPath: '/v1/files/addTags',
  },
  {
    clientCallName: 'client.files.bulk.removeAITags',
    fullyQualifiedName: 'files.bulk.removeAITags',
    httpMethod: 'post',
    httpPath: '/v1/files/removeAITags',
  },
  {
    clientCallName: 'client.files.bulk.removeTags',
    fullyQualifiedName: 'files.bulk.removeTags',
    httpMethod: 'post',
    httpPath: '/v1/files/removeTags',
  },
  {
    clientCallName: 'client.files.versions.list',
    fullyQualifiedName: 'files.versions.list',
    httpMethod: 'get',
    httpPath: '/v1/files/{fileId}/versions',
  },
  {
    clientCallName: 'client.files.versions.delete',
    fullyQualifiedName: 'files.versions.delete',
    httpMethod: 'delete',
    httpPath: '/v1/files/{fileId}/versions/{versionId}',
  },
  {
    clientCallName: 'client.files.versions.get',
    fullyQualifiedName: 'files.versions.get',
    httpMethod: 'get',
    httpPath: '/v1/files/{fileId}/versions/{versionId}',
  },
  {
    clientCallName: 'client.files.versions.restore',
    fullyQualifiedName: 'files.versions.restore',
    httpMethod: 'put',
    httpPath: '/v1/files/{fileId}/versions/{versionId}/restore',
  },
  {
    clientCallName: 'client.files.metadata.get',
    fullyQualifiedName: 'files.metadata.get',
    httpMethod: 'get',
    httpPath: '/v1/files/{fileId}/metadata',
  },
  {
    clientCallName: 'client.files.metadata.getFromURL',
    fullyQualifiedName: 'files.metadata.getFromURL',
    httpMethod: 'get',
    httpPath: '/v1/metadata',
  },
  {
    clientCallName: 'client.savedExtensions.create',
    fullyQualifiedName: 'savedExtensions.create',
    httpMethod: 'post',
    httpPath: '/v1/saved-extensions',
  },
  {
    clientCallName: 'client.savedExtensions.update',
    fullyQualifiedName: 'savedExtensions.update',
    httpMethod: 'patch',
    httpPath: '/v1/saved-extensions/{id}',
  },
  {
    clientCallName: 'client.savedExtensions.list',
    fullyQualifiedName: 'savedExtensions.list',
    httpMethod: 'get',
    httpPath: '/v1/saved-extensions',
  },
  {
    clientCallName: 'client.savedExtensions.delete',
    fullyQualifiedName: 'savedExtensions.delete',
    httpMethod: 'delete',
    httpPath: '/v1/saved-extensions/{id}',
  },
  {
    clientCallName: 'client.savedExtensions.get',
    fullyQualifiedName: 'savedExtensions.get',
    httpMethod: 'get',
    httpPath: '/v1/saved-extensions/{id}',
  },
  {
    clientCallName: 'client.assets.list',
    fullyQualifiedName: 'assets.list',
    httpMethod: 'get',
    httpPath: '/v1/files',
  },
  {
    clientCallName: 'client.cache.invalidation.create',
    fullyQualifiedName: 'cache.invalidation.create',
    httpMethod: 'post',
    httpPath: '/v1/files/purge',
  },
  {
    clientCallName: 'client.cache.invalidation.get',
    fullyQualifiedName: 'cache.invalidation.get',
    httpMethod: 'get',
    httpPath: '/v1/files/purge/{requestId}',
  },
  {
    clientCallName: 'client.folders.create',
    fullyQualifiedName: 'folders.create',
    httpMethod: 'post',
    httpPath: '/v1/folder',
  },
  {
    clientCallName: 'client.folders.delete',
    fullyQualifiedName: 'folders.delete',
    httpMethod: 'delete',
    httpPath: '/v1/folder',
  },
  {
    clientCallName: 'client.folders.copy',
    fullyQualifiedName: 'folders.copy',
    httpMethod: 'post',
    httpPath: '/v1/bulkJobs/copyFolder',
  },
  {
    clientCallName: 'client.folders.move',
    fullyQualifiedName: 'folders.move',
    httpMethod: 'post',
    httpPath: '/v1/bulkJobs/moveFolder',
  },
  {
    clientCallName: 'client.folders.rename',
    fullyQualifiedName: 'folders.rename',
    httpMethod: 'post',
    httpPath: '/v1/bulkJobs/renameFolder',
  },
  {
    clientCallName: 'client.folders.job.get',
    fullyQualifiedName: 'folders.job.get',
    httpMethod: 'get',
    httpPath: '/v1/bulkJobs/{jobId}',
  },
  {
    clientCallName: 'client.accounts.usage.get',
    fullyQualifiedName: 'accounts.usage.get',
    httpMethod: 'get',
    httpPath: '/v1/accounts/usage',
  },
  {
    clientCallName: 'client.accounts.origins.create',
    fullyQualifiedName: 'accounts.origins.create',
    httpMethod: 'post',
    httpPath: '/v1/accounts/origins',
  },
  {
    clientCallName: 'client.accounts.origins.update',
    fullyQualifiedName: 'accounts.origins.update',
    httpMethod: 'put',
    httpPath: '/v1/accounts/origins/{id}',
  },
  {
    clientCallName: 'client.accounts.origins.list',
    fullyQualifiedName: 'accounts.origins.list',
    httpMethod: 'get',
    httpPath: '/v1/accounts/origins',
  },
  {
    clientCallName: 'client.accounts.origins.delete',
    fullyQualifiedName: 'accounts.origins.delete',
    httpMethod: 'delete',
    httpPath: '/v1/accounts/origins/{id}',
  },
  {
    clientCallName: 'client.accounts.origins.get',
    fullyQualifiedName: 'accounts.origins.get',
    httpMethod: 'get',
    httpPath: '/v1/accounts/origins/{id}',
  },
  {
    clientCallName: 'client.accounts.urlEndpoints.create',
    fullyQualifiedName: 'accounts.urlEndpoints.create',
    httpMethod: 'post',
    httpPath: '/v1/accounts/url-endpoints',
  },
  {
    clientCallName: 'client.accounts.urlEndpoints.update',
    fullyQualifiedName: 'accounts.urlEndpoints.update',
    httpMethod: 'put',
    httpPath: '/v1/accounts/url-endpoints/{id}',
  },
  {
    clientCallName: 'client.accounts.urlEndpoints.list',
    fullyQualifiedName: 'accounts.urlEndpoints.list',
    httpMethod: 'get',
    httpPath: '/v1/accounts/url-endpoints',
  },
  {
    clientCallName: 'client.accounts.urlEndpoints.delete',
    fullyQualifiedName: 'accounts.urlEndpoints.delete',
    httpMethod: 'delete',
    httpPath: '/v1/accounts/url-endpoints/{id}',
  },
  {
    clientCallName: 'client.accounts.urlEndpoints.get',
    fullyQualifiedName: 'accounts.urlEndpoints.get',
    httpMethod: 'get',
    httpPath: '/v1/accounts/url-endpoints/{id}',
  },
  {
    clientCallName: 'client.beta.v2.files.upload',
    fullyQualifiedName: 'beta.v2.files.upload',
    httpMethod: 'post',
    httpPath: '/api/v2/files/upload',
  },
  { clientCallName: 'client.webhooks.unsafeUnwrap', fullyQualifiedName: 'webhooks.unsafeUnwrap' },
  { clientCallName: 'client.webhooks.unwrap', fullyQualifiedName: 'webhooks.unwrap' },
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
