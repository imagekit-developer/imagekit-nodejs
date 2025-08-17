# CustomMetadataFields

Types:

- <code><a href="./src/resources/custom-metadata-fields.ts">CustomMetadataFieldCreateResponse</a></code>
- <code><a href="./src/resources/custom-metadata-fields.ts">CustomMetadataFieldUpdateResponse</a></code>
- <code><a href="./src/resources/custom-metadata-fields.ts">CustomMetadataFieldListResponse</a></code>
- <code><a href="./src/resources/custom-metadata-fields.ts">CustomMetadataFieldDeleteResponse</a></code>

Methods:

- <code title="post /v1/customMetadataFields">client.customMetadataFields.<a href="./src/resources/custom-metadata-fields.ts">create</a>({ ...params }) -> CustomMetadataFieldCreateResponse</code>
- <code title="patch /v1/customMetadataFields/{id}">client.customMetadataFields.<a href="./src/resources/custom-metadata-fields.ts">update</a>(id, { ...params }) -> CustomMetadataFieldUpdateResponse</code>
- <code title="get /v1/customMetadataFields">client.customMetadataFields.<a href="./src/resources/custom-metadata-fields.ts">list</a>({ ...params }) -> CustomMetadataFieldListResponse</code>
- <code title="delete /v1/customMetadataFields/{id}">client.customMetadataFields.<a href="./src/resources/custom-metadata-fields.ts">delete</a>(id) -> unknown</code>

# Files

Types:

- <code><a href="./src/resources/files/files.ts">FileUpdateResponse</a></code>
- <code><a href="./src/resources/files/files.ts">FileCopyResponse</a></code>
- <code><a href="./src/resources/files/files.ts">FileGetResponse</a></code>
- <code><a href="./src/resources/files/files.ts">FileMoveResponse</a></code>
- <code><a href="./src/resources/files/files.ts">FileRenameResponse</a></code>
- <code><a href="./src/resources/files/files.ts">FileUploadResponse</a></code>

Methods:

- <code title="patch /v1/files/{fileId}/details">client.files.<a href="./src/resources/files/files.ts">update</a>(fileID, { ...params }) -> FileUpdateResponse</code>
- <code title="delete /v1/files/{fileId}">client.files.<a href="./src/resources/files/files.ts">delete</a>(fileID) -> void</code>
- <code title="post /v1/files/copy">client.files.<a href="./src/resources/files/files.ts">copy</a>({ ...params }) -> unknown</code>
- <code title="get /v1/files/{fileId}/details">client.files.<a href="./src/resources/files/files.ts">get</a>(fileID) -> FileGetResponse</code>
- <code title="post /v1/files/move">client.files.<a href="./src/resources/files/files.ts">move</a>({ ...params }) -> unknown</code>
- <code title="put /v1/files/rename">client.files.<a href="./src/resources/files/files.ts">rename</a>({ ...params }) -> FileRenameResponse</code>
- <code title="post /api/v1/files/upload">client.files.<a href="./src/resources/files/files.ts">upload</a>({ ...params }) -> FileUploadResponse</code>

## Bulk

Types:

- <code><a href="./src/resources/files/bulk.ts">BulkDeleteResponse</a></code>
- <code><a href="./src/resources/files/bulk.ts">BulkAddTagsResponse</a></code>
- <code><a href="./src/resources/files/bulk.ts">BulkRemoveAITagsResponse</a></code>
- <code><a href="./src/resources/files/bulk.ts">BulkRemoveTagsResponse</a></code>

Methods:

- <code title="post /v1/files/batch/deleteByFileIds">client.files.bulk.<a href="./src/resources/files/bulk.ts">delete</a>({ ...params }) -> BulkDeleteResponse</code>
- <code title="post /v1/files/addTags">client.files.bulk.<a href="./src/resources/files/bulk.ts">addTags</a>({ ...params }) -> BulkAddTagsResponse</code>
- <code title="post /v1/files/removeAITags">client.files.bulk.<a href="./src/resources/files/bulk.ts">removeAITags</a>({ ...params }) -> BulkRemoveAITagsResponse</code>
- <code title="post /v1/files/removeTags">client.files.bulk.<a href="./src/resources/files/bulk.ts">removeTags</a>({ ...params }) -> BulkRemoveTagsResponse</code>

## Versions

Types:

- <code><a href="./src/resources/files/versions.ts">VersionListResponse</a></code>
- <code><a href="./src/resources/files/versions.ts">VersionDeleteResponse</a></code>
- <code><a href="./src/resources/files/versions.ts">VersionGetResponse</a></code>
- <code><a href="./src/resources/files/versions.ts">VersionRestoreResponse</a></code>

Methods:

- <code title="get /v1/files/{fileId}/versions">client.files.versions.<a href="./src/resources/files/versions.ts">list</a>(fileID) -> VersionListResponse</code>
- <code title="delete /v1/files/{fileId}/versions/{versionId}">client.files.versions.<a href="./src/resources/files/versions.ts">delete</a>(versionID, { ...params }) -> unknown</code>
- <code title="get /v1/files/{fileId}/versions/{versionId}">client.files.versions.<a href="./src/resources/files/versions.ts">get</a>(versionID, { ...params }) -> VersionGetResponse</code>
- <code title="put /v1/files/{fileId}/versions/{versionId}/restore">client.files.versions.<a href="./src/resources/files/versions.ts">restore</a>(versionID, { ...params }) -> VersionRestoreResponse</code>

## Metadata

Types:

- <code><a href="./src/resources/files/metadata.ts">MetadataGetResponse</a></code>
- <code><a href="./src/resources/files/metadata.ts">MetadataGetFromURLResponse</a></code>

Methods:

- <code title="get /v1/files/{fileId}/metadata">client.files.metadata.<a href="./src/resources/files/metadata.ts">get</a>(fileID) -> MetadataGetResponse</code>
- <code title="get /v1/files/metadata">client.files.metadata.<a href="./src/resources/files/metadata.ts">getFromURL</a>({ ...params }) -> MetadataGetFromURLResponse</code>

# Assets

Types:

- <code><a href="./src/resources/assets.ts">AssetListResponse</a></code>

Methods:

- <code title="get /v1/files">client.assets.<a href="./src/resources/assets.ts">list</a>({ ...params }) -> AssetListResponse</code>

# Cache

## Invalidation

Types:

- <code><a href="./src/resources/cache/invalidation.ts">InvalidationCreateResponse</a></code>
- <code><a href="./src/resources/cache/invalidation.ts">InvalidationGetResponse</a></code>

Methods:

- <code title="post /v1/files/purge">client.cache.invalidation.<a href="./src/resources/cache/invalidation.ts">create</a>({ ...params }) -> InvalidationCreateResponse</code>
- <code title="get /v1/files/purge/{requestId}">client.cache.invalidation.<a href="./src/resources/cache/invalidation.ts">get</a>(requestID) -> InvalidationGetResponse</code>

# Folders

Types:

- <code><a href="./src/resources/folders/folders.ts">FolderCreateResponse</a></code>
- <code><a href="./src/resources/folders/folders.ts">FolderDeleteResponse</a></code>
- <code><a href="./src/resources/folders/folders.ts">FolderCopyResponse</a></code>
- <code><a href="./src/resources/folders/folders.ts">FolderMoveResponse</a></code>
- <code><a href="./src/resources/folders/folders.ts">FolderRenameResponse</a></code>

Methods:

- <code title="post /v1/folder">client.folders.<a href="./src/resources/folders/folders.ts">create</a>({ ...params }) -> unknown</code>
- <code title="delete /v1/folder">client.folders.<a href="./src/resources/folders/folders.ts">delete</a>({ ...params }) -> unknown</code>
- <code title="post /v1/bulkJobs/copyFolder">client.folders.<a href="./src/resources/folders/folders.ts">copy</a>({ ...params }) -> FolderCopyResponse</code>
- <code title="post /v1/bulkJobs/moveFolder">client.folders.<a href="./src/resources/folders/folders.ts">move</a>({ ...params }) -> FolderMoveResponse</code>
- <code title="post /v1/bulkJobs/renameFolder">client.folders.<a href="./src/resources/folders/folders.ts">rename</a>({ ...params }) -> FolderRenameResponse</code>

## Job

Types:

- <code><a href="./src/resources/folders/job.ts">JobGetResponse</a></code>

Methods:

- <code title="get /v1/bulkJobs/{jobId}">client.folders.job.<a href="./src/resources/folders/job.ts">get</a>(jobID) -> JobGetResponse</code>

# Accounts

## Usage

Types:

- <code><a href="./src/resources/accounts/usage.ts">UsageGetResponse</a></code>

Methods:

- <code title="get /v1/accounts/usage">client.accounts.usage.<a href="./src/resources/accounts/usage.ts">get</a>({ ...params }) -> UsageGetResponse</code>

## Origins

Types:

- <code><a href="./src/resources/accounts/origins.ts">OriginCreateResponse</a></code>
- <code><a href="./src/resources/accounts/origins.ts">OriginUpdateResponse</a></code>
- <code><a href="./src/resources/accounts/origins.ts">OriginListResponse</a></code>
- <code><a href="./src/resources/accounts/origins.ts">OriginGetResponse</a></code>

Methods:

- <code title="post /v1/accounts/origins">client.accounts.origins.<a href="./src/resources/accounts/origins.ts">create</a>({ ...params }) -> OriginCreateResponse</code>
- <code title="put /v1/accounts/origins/{id}">client.accounts.origins.<a href="./src/resources/accounts/origins.ts">update</a>(id, { ...params }) -> OriginUpdateResponse</code>
- <code title="get /v1/accounts/origins">client.accounts.origins.<a href="./src/resources/accounts/origins.ts">list</a>() -> OriginListResponse</code>
- <code title="delete /v1/accounts/origins/{id}">client.accounts.origins.<a href="./src/resources/accounts/origins.ts">delete</a>(id) -> void</code>
- <code title="get /v1/accounts/origins/{id}">client.accounts.origins.<a href="./src/resources/accounts/origins.ts">get</a>(id) -> OriginGetResponse</code>

## URLEndpoints

Types:

- <code><a href="./src/resources/accounts/url-endpoints.ts">URLEndpointCreateResponse</a></code>
- <code><a href="./src/resources/accounts/url-endpoints.ts">URLEndpointUpdateResponse</a></code>
- <code><a href="./src/resources/accounts/url-endpoints.ts">URLEndpointListResponse</a></code>
- <code><a href="./src/resources/accounts/url-endpoints.ts">URLEndpointGetResponse</a></code>

Methods:

- <code title="post /v1/accounts/url-endpoints">client.accounts.urlEndpoints.<a href="./src/resources/accounts/url-endpoints.ts">create</a>({ ...params }) -> URLEndpointCreateResponse</code>
- <code title="put /v1/accounts/url-endpoints/{id}">client.accounts.urlEndpoints.<a href="./src/resources/accounts/url-endpoints.ts">update</a>(id, { ...params }) -> URLEndpointUpdateResponse</code>
- <code title="get /v1/accounts/url-endpoints">client.accounts.urlEndpoints.<a href="./src/resources/accounts/url-endpoints.ts">list</a>() -> URLEndpointListResponse</code>
- <code title="delete /v1/accounts/url-endpoints/{id}">client.accounts.urlEndpoints.<a href="./src/resources/accounts/url-endpoints.ts">delete</a>(id) -> void</code>
- <code title="get /v1/accounts/url-endpoints/{id}">client.accounts.urlEndpoints.<a href="./src/resources/accounts/url-endpoints.ts">get</a>(id) -> URLEndpointGetResponse</code>

# Beta

## V2

### Files

Types:

- <code><a href="./src/resources/beta/v2/files.ts">FileUploadResponse</a></code>

Methods:

- <code title="post /api/v2/files/upload">client.beta.v2.files.<a href="./src/resources/beta/v2/files.ts">upload</a>({ ...params }) -> FileUploadResponse</code>
