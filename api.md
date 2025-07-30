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

- <code><a href="./src/resources/files/files.ts">FileListResponse</a></code>
- <code><a href="./src/resources/files/files.ts">FileAddTagsResponse</a></code>
- <code><a href="./src/resources/files/files.ts">FileCopyResponse</a></code>
- <code><a href="./src/resources/files/files.ts">FileMoveResponse</a></code>
- <code><a href="./src/resources/files/files.ts">FileRemoveAITagsResponse</a></code>
- <code><a href="./src/resources/files/files.ts">FileRemoveTagsResponse</a></code>
- <code><a href="./src/resources/files/files.ts">FileRenameResponse</a></code>
- <code><a href="./src/resources/files/files.ts">FileUploadV1Response</a></code>
- <code><a href="./src/resources/files/files.ts">FileUploadV2Response</a></code>

Methods:

- <code title="get /v1/files">client.files.<a href="./src/resources/files/files.ts">list</a>({ ...params }) -> FileListResponse</code>
- <code title="delete /v1/files/{fileId}">client.files.<a href="./src/resources/files/files.ts">delete</a>(fileID) -> void</code>
- <code title="post /v1/files/addTags">client.files.<a href="./src/resources/files/files.ts">addTags</a>({ ...params }) -> FileAddTagsResponse</code>
- <code title="post /v1/files/copy">client.files.<a href="./src/resources/files/files.ts">copy</a>({ ...params }) -> unknown</code>
- <code title="post /v1/files/move">client.files.<a href="./src/resources/files/files.ts">move</a>({ ...params }) -> unknown</code>
- <code title="post /v1/files/removeAITags">client.files.<a href="./src/resources/files/files.ts">removeAITags</a>({ ...params }) -> FileRemoveAITagsResponse</code>
- <code title="post /v1/files/removeTags">client.files.<a href="./src/resources/files/files.ts">removeTags</a>({ ...params }) -> FileRemoveTagsResponse</code>
- <code title="put /v1/files/rename">client.files.<a href="./src/resources/files/files.ts">rename</a>({ ...params }) -> FileRenameResponse</code>
- <code title="post /api/v1/files/upload">client.files.<a href="./src/resources/files/files.ts">uploadV1</a>({ ...params }) -> FileUploadV1Response</code>
- <code title="post /api/v2/files/upload">client.files.<a href="./src/resources/files/files.ts">uploadV2</a>({ ...params }) -> FileUploadV2Response</code>

## Details

Types:

- <code><a href="./src/resources/files/details.ts">DetailRetrieveResponse</a></code>
- <code><a href="./src/resources/files/details.ts">DetailUpdateResponse</a></code>

Methods:

- <code title="get /v1/files/{fileId}/details">client.files.details.<a href="./src/resources/files/details.ts">retrieve</a>(fileID) -> DetailRetrieveResponse</code>
- <code title="patch /v1/files/{fileId}/details">client.files.details.<a href="./src/resources/files/details.ts">update</a>(fileID, { ...params }) -> DetailUpdateResponse</code>

## Batch

Types:

- <code><a href="./src/resources/files/batch.ts">BatchDeleteResponse</a></code>

Methods:

- <code title="post /v1/files/batch/deleteByFileIds">client.files.batch.<a href="./src/resources/files/batch.ts">delete</a>({ ...params }) -> BatchDeleteResponse</code>

## Versions

Types:

- <code><a href="./src/resources/files/versions.ts">VersionRetrieveResponse</a></code>
- <code><a href="./src/resources/files/versions.ts">VersionListResponse</a></code>
- <code><a href="./src/resources/files/versions.ts">VersionDeleteResponse</a></code>
- <code><a href="./src/resources/files/versions.ts">VersionRestoreResponse</a></code>

Methods:

- <code title="get /v1/files/{fileId}/versions/{versionId}">client.files.versions.<a href="./src/resources/files/versions.ts">retrieve</a>(versionID, { ...params }) -> VersionRetrieveResponse</code>
- <code title="get /v1/files/{fileId}/versions">client.files.versions.<a href="./src/resources/files/versions.ts">list</a>(fileID) -> VersionListResponse</code>
- <code title="delete /v1/files/{fileId}/versions/{versionId}">client.files.versions.<a href="./src/resources/files/versions.ts">delete</a>(versionID, { ...params }) -> unknown</code>
- <code title="put /v1/files/{fileId}/versions/{versionId}/restore">client.files.versions.<a href="./src/resources/files/versions.ts">restore</a>(versionID, { ...params }) -> VersionRestoreResponse</code>

## Purge

Types:

- <code><a href="./src/resources/files/purge.ts">PurgeExecuteResponse</a></code>
- <code><a href="./src/resources/files/purge.ts">PurgeStatusResponse</a></code>

Methods:

- <code title="post /v1/files/purge">client.files.purge.<a href="./src/resources/files/purge.ts">execute</a>({ ...params }) -> PurgeExecuteResponse</code>
- <code title="get /v1/files/purge/{requestId}">client.files.purge.<a href="./src/resources/files/purge.ts">status</a>(requestID) -> PurgeStatusResponse</code>

## Metadata

Types:

- <code><a href="./src/resources/files/metadata.ts">MetadataRetrieveResponse</a></code>
- <code><a href="./src/resources/files/metadata.ts">MetadataFromURLResponse</a></code>

Methods:

- <code title="get /v1/files/{fileId}/metadata">client.files.metadata.<a href="./src/resources/files/metadata.ts">retrieve</a>(fileID) -> MetadataRetrieveResponse</code>
- <code title="get /v1/files/metadata">client.files.metadata.<a href="./src/resources/files/metadata.ts">fromURL</a>({ ...params }) -> MetadataFromURLResponse</code>

# Folder

Types:

- <code><a href="./src/resources/folder.ts">FolderCreateResponse</a></code>
- <code><a href="./src/resources/folder.ts">FolderDeleteResponse</a></code>

Methods:

- <code title="post /v1/folder">client.folder.<a href="./src/resources/folder.ts">create</a>({ ...params }) -> unknown</code>
- <code title="delete /v1/folder">client.folder.<a href="./src/resources/folder.ts">delete</a>({ ...params }) -> unknown</code>

# BulkJobs

Types:

- <code><a href="./src/resources/bulk-jobs.ts">BulkJobCopyFolderResponse</a></code>
- <code><a href="./src/resources/bulk-jobs.ts">BulkJobMoveFolderResponse</a></code>
- <code><a href="./src/resources/bulk-jobs.ts">BulkJobRetrieveStatusResponse</a></code>

Methods:

- <code title="post /v1/bulkJobs/copyFolder">client.bulkJobs.<a href="./src/resources/bulk-jobs.ts">copyFolder</a>({ ...params }) -> BulkJobCopyFolderResponse</code>
- <code title="post /v1/bulkJobs/moveFolder">client.bulkJobs.<a href="./src/resources/bulk-jobs.ts">moveFolder</a>({ ...params }) -> BulkJobMoveFolderResponse</code>
- <code title="get /v1/bulkJobs/{jobId}">client.bulkJobs.<a href="./src/resources/bulk-jobs.ts">retrieveStatus</a>(jobID) -> BulkJobRetrieveStatusResponse</code>

# Accounts

Types:

- <code><a href="./src/resources/accounts.ts">AccountGetUsageResponse</a></code>

Methods:

- <code title="get /v1/accounts/usage">client.accounts.<a href="./src/resources/accounts.ts">getUsage</a>({ ...params }) -> AccountGetUsageResponse</code>
