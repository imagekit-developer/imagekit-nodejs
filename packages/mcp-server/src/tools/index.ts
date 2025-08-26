// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, Endpoint, HandlerFunction } from './types';

export { Metadata, Endpoint, HandlerFunction };

import create_custom_metadata_fields from './custom-metadata-fields/create-custom-metadata-fields';
import update_custom_metadata_fields from './custom-metadata-fields/update-custom-metadata-fields';
import list_custom_metadata_fields from './custom-metadata-fields/list-custom-metadata-fields';
import delete_custom_metadata_fields from './custom-metadata-fields/delete-custom-metadata-fields';
import update_files from './files/update-files';
import delete_files from './files/delete-files';
import copy_files from './files/copy-files';
import get_files from './files/get-files';
import move_files from './files/move-files';
import rename_files from './files/rename-files';
import upload_files from './files/upload-files';
import delete_files_bulk from './files/bulk/delete-files-bulk';
import add_tags_files_bulk from './files/bulk/add-tags-files-bulk';
import remove_ai_tags_files_bulk from './files/bulk/remove-ai-tags-files-bulk';
import remove_tags_files_bulk from './files/bulk/remove-tags-files-bulk';
import list_files_versions from './files/versions/list-files-versions';
import delete_files_versions from './files/versions/delete-files-versions';
import get_files_versions from './files/versions/get-files-versions';
import restore_files_versions from './files/versions/restore-files-versions';
import get_files_metadata from './files/metadata/get-files-metadata';
import get_from_url_files_metadata from './files/metadata/get-from-url-files-metadata';
import list_assets from './assets/list-assets';
import create_cache_invalidation from './cache/invalidation/create-cache-invalidation';
import get_cache_invalidation from './cache/invalidation/get-cache-invalidation';
import create_folders from './folders/create-folders';
import delete_folders from './folders/delete-folders';
import copy_folders from './folders/copy-folders';
import move_folders from './folders/move-folders';
import rename_folders from './folders/rename-folders';
import get_folders_job from './folders/job/get-folders-job';
import get_accounts_usage from './accounts/usage/get-accounts-usage';
import create_accounts_origins from './accounts/origins/create-accounts-origins';
import update_accounts_origins from './accounts/origins/update-accounts-origins';
import list_accounts_origins from './accounts/origins/list-accounts-origins';
import delete_accounts_origins from './accounts/origins/delete-accounts-origins';
import get_accounts_origins from './accounts/origins/get-accounts-origins';
import create_accounts_url_endpoints from './accounts/url-endpoints/create-accounts-url-endpoints';
import update_accounts_url_endpoints from './accounts/url-endpoints/update-accounts-url-endpoints';
import list_accounts_url_endpoints from './accounts/url-endpoints/list-accounts-url-endpoints';
import delete_accounts_url_endpoints from './accounts/url-endpoints/delete-accounts-url-endpoints';
import get_accounts_url_endpoints from './accounts/url-endpoints/get-accounts-url-endpoints';
import upload_v2_beta_files from './beta/v2/files/upload-v2-beta-files';
import unsafe_unwrap_webhooks from './webhooks/unsafe-unwrap-webhooks';
import unwrap_webhooks from './webhooks/unwrap-webhooks';

export const endpoints: Endpoint[] = [];

function addEndpoint(endpoint: Endpoint) {
  endpoints.push(endpoint);
}

addEndpoint(create_custom_metadata_fields);
addEndpoint(update_custom_metadata_fields);
addEndpoint(list_custom_metadata_fields);
addEndpoint(delete_custom_metadata_fields);
addEndpoint(update_files);
addEndpoint(delete_files);
addEndpoint(copy_files);
addEndpoint(get_files);
addEndpoint(move_files);
addEndpoint(rename_files);
addEndpoint(upload_files);
addEndpoint(delete_files_bulk);
addEndpoint(add_tags_files_bulk);
addEndpoint(remove_ai_tags_files_bulk);
addEndpoint(remove_tags_files_bulk);
addEndpoint(list_files_versions);
addEndpoint(delete_files_versions);
addEndpoint(get_files_versions);
addEndpoint(restore_files_versions);
addEndpoint(get_files_metadata);
addEndpoint(get_from_url_files_metadata);
addEndpoint(list_assets);
addEndpoint(create_cache_invalidation);
addEndpoint(get_cache_invalidation);
addEndpoint(create_folders);
addEndpoint(delete_folders);
addEndpoint(copy_folders);
addEndpoint(move_folders);
addEndpoint(rename_folders);
addEndpoint(get_folders_job);
addEndpoint(get_accounts_usage);
addEndpoint(create_accounts_origins);
addEndpoint(update_accounts_origins);
addEndpoint(list_accounts_origins);
addEndpoint(delete_accounts_origins);
addEndpoint(get_accounts_origins);
addEndpoint(create_accounts_url_endpoints);
addEndpoint(update_accounts_url_endpoints);
addEndpoint(list_accounts_url_endpoints);
addEndpoint(delete_accounts_url_endpoints);
addEndpoint(get_accounts_url_endpoints);
addEndpoint(upload_v2_beta_files);
addEndpoint(unsafe_unwrap_webhooks);
addEndpoint(unwrap_webhooks);

export type Filter = {
  type: 'resource' | 'operation' | 'tag' | 'tool';
  op: 'include' | 'exclude';
  value: string;
};

export function query(filters: Filter[], endpoints: Endpoint[]): Endpoint[] {
  const allExcludes = filters.length > 0 && filters.every((filter) => filter.op === 'exclude');
  const unmatchedFilters = new Set(filters);

  const filtered = endpoints.filter((endpoint: Endpoint) => {
    let included = false || allExcludes;

    for (const filter of filters) {
      if (match(filter, endpoint)) {
        unmatchedFilters.delete(filter);
        included = filter.op === 'include';
      }
    }

    return included;
  });

  // Check if any filters didn't match
  const unmatched = Array.from(unmatchedFilters).filter((f) => f.type === 'tool' || f.type === 'resource');
  if (unmatched.length > 0) {
    throw new Error(
      `The following filters did not match any endpoints: ${unmatched
        .map((f) => `${f.type}=${f.value}`)
        .join(', ')}`,
    );
  }

  return filtered;
}

function match({ type, value }: Filter, endpoint: Endpoint): boolean {
  switch (type) {
    case 'resource': {
      const regexStr = '^' + normalizeResource(value).replace(/\*/g, '.*') + '$';
      const regex = new RegExp(regexStr);
      return regex.test(normalizeResource(endpoint.metadata.resource));
    }
    case 'operation':
      return endpoint.metadata.operation === value;
    case 'tag':
      return endpoint.metadata.tags.includes(value);
    case 'tool':
      return endpoint.tool.name === value;
  }
}

function normalizeResource(resource: string): string {
  return resource.toLowerCase().replace(/[^a-z.*\-_]*/g, '');
}
