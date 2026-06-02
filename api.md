# Shared

Types:

- <code><a href="./src/resources/shared.ts">AITaskAction</a></code>
- <code><a href="./src/resources/shared.ts">AITaskSelectMetadata</a></code>
- <code><a href="./src/resources/shared.ts">AITaskSelectTags</a></code>
- <code><a href="./src/resources/shared.ts">AITasksExtension</a></code>
- <code><a href="./src/resources/shared.ts">AITaskYesNo</a></code>
- <code><a href="./src/resources/shared.ts">AutoDescriptionExtension</a></code>
- <code><a href="./src/resources/shared.ts">AutoTaggingExtension</a></code>
- <code><a href="./src/resources/shared.ts">BaseOverlay</a></code>
- <code><a href="./src/resources/shared.ts">ExtensionConfig</a></code>
- <code><a href="./src/resources/shared.ts">Extensions</a></code>
- <code><a href="./src/resources/shared.ts">GetImageAttributesOptions</a></code>
- <code><a href="./src/resources/shared.ts">ImageOverlay</a></code>
- <code><a href="./src/resources/shared.ts">Overlay</a></code>
- <code><a href="./src/resources/shared.ts">OverlayPosition</a></code>
- <code><a href="./src/resources/shared.ts">OverlayTiming</a></code>
- <code><a href="./src/resources/shared.ts">RemovedotBgExtension</a></code>
- <code><a href="./src/resources/shared.ts">ResponsiveImageAttributes</a></code>
- <code><a href="./src/resources/shared.ts">SavedExtension</a></code>
- <code><a href="./src/resources/shared.ts">SolidColorOverlay</a></code>
- <code><a href="./src/resources/shared.ts">SolidColorOverlayTransformation</a></code>
- <code><a href="./src/resources/shared.ts">SrcOptions</a></code>
- <code><a href="./src/resources/shared.ts">StreamingResolution</a></code>
- <code><a href="./src/resources/shared.ts">SubtitleOverlay</a></code>
- <code><a href="./src/resources/shared.ts">SubtitleOverlayTransformation</a></code>
- <code><a href="./src/resources/shared.ts">TextOverlay</a></code>
- <code><a href="./src/resources/shared.ts">TextOverlayTransformation</a></code>
- <code><a href="./src/resources/shared.ts">Transformation</a></code>
- <code><a href="./src/resources/shared.ts">TransformationPosition</a></code>
- <code><a href="./src/resources/shared.ts">VideoOverlay</a></code>

# CustomMetadataFields

Types:

- <code><a href="./src/resources/custom-metadata-fields.ts">CustomMetadataField</a></code>
- <code><a href="./src/resources/custom-metadata-fields.ts">CustomMetadataFieldSchema</a></code>
- <code><a href="./src/resources/custom-metadata-fields.ts">CustomMetadataFieldListResponse</a></code>

Methods:

- <code title="get /v2/custom-metadata-fields">client.customMetadataFields.<a href="./src/resources/custom-metadata-fields.ts">list</a>({ ...params }) -> CustomMetadataFieldListResponse</code>
- <code title="post /v2/custom-metadata-fields">client.customMetadataFields.<a href="./src/resources/custom-metadata-fields.ts">create</a>({ ...params }) -> CustomMetadataField</code>
- <code title="patch /v2/custom-metadata-fields/{id}">client.customMetadataFields.<a href="./src/resources/custom-metadata-fields.ts">update</a>(id, { ...params }) -> CustomMetadataField</code>
- <code title="delete /v2/custom-metadata-fields/{id}">client.customMetadataFields.<a href="./src/resources/custom-metadata-fields.ts">delete</a>(id) -> void</code>

# Assets

Types:

- <code><a href="./src/resources/assets/assets.ts">BulkAssetsNotFoundError</a></code>
- <code><a href="./src/resources/assets/assets.ts">BulkTagUpdatePartialResult</a></code>
- <code><a href="./src/resources/assets/assets.ts">BulkTagUpdateResult</a></code>
- <code><a href="./src/resources/assets/assets.ts">FileAsset</a></code>
- <code><a href="./src/resources/assets/assets.ts">FileDetails</a></code>
- <code><a href="./src/resources/assets/assets.ts">FileVersionDetails</a></code>
- <code><a href="./src/resources/assets/assets.ts">FolderDetails</a></code>
- <code><a href="./src/resources/assets/assets.ts">Metadata</a></code>
- <code><a href="./src/resources/assets/assets.ts">UpdateAssetRequest</a></code>
- <code><a href="./src/resources/assets/assets.ts">UploadRequest</a></code>
- <code><a href="./src/resources/assets/assets.ts">UploadResponse</a></code>
- <code><a href="./src/resources/assets/assets.ts">VideoAsset</a></code>
- <code><a href="./src/resources/assets/assets.ts">AssetUpdateResponse</a></code>
- <code><a href="./src/resources/assets/assets.ts">AssetListResponse</a></code>
- <code><a href="./src/resources/assets/assets.ts">AssetCopyResponse</a></code>
- <code><a href="./src/resources/assets/assets.ts">AssetGetResponse</a></code>
- <code><a href="./src/resources/assets/assets.ts">AssetMoveResponse</a></code>
- <code><a href="./src/resources/assets/assets.ts">AssetRenameResponse</a></code>

Methods:

- <code title="post /v2/assets/upload">client.assets.<a href="./src/resources/assets/assets.ts">upload</a>({ ...params }) -> UploadResponse</code>
- <code title="get /v2/assets">client.assets.<a href="./src/resources/assets/assets.ts">list</a>({ ...params }) -> AssetListResponsesCursor</code>
- <code title="get /v2/assets/{asset_id}">client.assets.<a href="./src/resources/assets/assets.ts">get</a>(assetID) -> AssetGetResponse</code>
- <code title="patch /v2/assets/{asset_id}">client.assets.<a href="./src/resources/assets/assets.ts">update</a>(assetID, { ...params }) -> AssetUpdateResponse</code>
- <code title="delete /v2/assets/{asset_id}">client.assets.<a href="./src/resources/assets/assets.ts">delete</a>(assetID) -> void</code>
- <code title="post /v2/assets/copy">client.assets.<a href="./src/resources/assets/assets.ts">copy</a>({ ...params }) -> AssetCopyResponse</code>
- <code title="post /v2/assets/move">client.assets.<a href="./src/resources/assets/assets.ts">move</a>({ ...params }) -> AssetMoveResponse</code>
- <code title="put /v2/assets/rename">client.assets.<a href="./src/resources/assets/assets.ts">rename</a>({ ...params }) -> AssetRenameResponse</code>

## Bulk

Types:

- <code><a href="./src/resources/assets/bulk.ts">BulkDeleteResponse</a></code>

Methods:

- <code title="delete /v2/assets">client.assets.bulk.<a href="./src/resources/assets/bulk.ts">delete</a>({ ...params }) -> BulkDeleteResponse</code>
- <code title="post /v2/assets/tags">client.assets.bulk.<a href="./src/resources/assets/bulk.ts">addTags</a>({ ...params }) -> BulkTagUpdateResult</code>
- <code title="delete /v2/assets/tags">client.assets.bulk.<a href="./src/resources/assets/bulk.ts">removeTags</a>({ ...params }) -> BulkTagUpdateResult</code>

## Versions

Methods:

- <code title="get /v2/assets/{asset_id}/versions">client.assets.versions.<a href="./src/resources/assets/versions.ts">list</a>(assetID, { ...params }) -> FileVersionDetailsCursor</code>
- <code title="get /v2/assets/{asset_id}/versions/{version_id}">client.assets.versions.<a href="./src/resources/assets/versions.ts">get</a>(versionID, { ...params }) -> FileVersionDetails</code>
- <code title="delete /v2/assets/{asset_id}/versions/{version_id}">client.assets.versions.<a href="./src/resources/assets/versions.ts">delete</a>(versionID, { ...params }) -> void</code>
- <code title="post /v2/assets/{asset_id}/versions/{version_id}/restore">client.assets.versions.<a href="./src/resources/assets/versions.ts">restore</a>(versionID, { ...params }) -> FileDetails</code>

## Folders

Types:

- <code><a href="./src/resources/assets/folders.ts">FolderCreateResponse</a></code>

Methods:

- <code title="post /v2/assets/folders">client.assets.folders.<a href="./src/resources/assets/folders.ts">create</a>({ ...params }) -> FolderCreateResponse</code>

## Jobs

Types:

- <code><a href="./src/resources/assets/jobs.ts">JobGetResponse</a></code>

Methods:

- <code title="get /v2/assets/jobs/{job_id}">client.assets.jobs.<a href="./src/resources/assets/jobs.ts">get</a>(jobID) -> JobGetResponse</code>

# SavedExtensions

Types:

- <code><a href="./src/resources/saved-extensions.ts">CreateSavedExtension</a></code>
- <code><a href="./src/resources/saved-extensions.ts">SavedExtensionBase</a></code>
- <code><a href="./src/resources/saved-extensions.ts">SavedExtensionReference</a></code>
- <code><a href="./src/resources/saved-extensions.ts">UpdateSavedExtension</a></code>
- <code><a href="./src/resources/saved-extensions.ts">SavedExtensionListResponse</a></code>

Methods:

- <code title="get /v2/saved-extensions">client.savedExtensions.<a href="./src/resources/saved-extensions.ts">list</a>() -> SavedExtensionListResponse</code>
- <code title="post /v2/saved-extensions">client.savedExtensions.<a href="./src/resources/saved-extensions.ts">create</a>({ ...params }) -> SavedExtension</code>
- <code title="get /v2/saved-extensions/{id}">client.savedExtensions.<a href="./src/resources/saved-extensions.ts">get</a>(id) -> SavedExtension</code>
- <code title="patch /v2/saved-extensions/{id}">client.savedExtensions.<a href="./src/resources/saved-extensions.ts">update</a>(id, { ...params }) -> SavedExtension</code>
- <code title="delete /v2/saved-extensions/{id}">client.savedExtensions.<a href="./src/resources/saved-extensions.ts">delete</a>(id) -> void</code>

# Cache

## Invalidation

Types:

- <code><a href="./src/resources/cache/invalidation.ts">InvalidationCreateResponse</a></code>
- <code><a href="./src/resources/cache/invalidation.ts">InvalidationGetResponse</a></code>

Methods:

- <code title="post /v2/cache/invalidations">client.cache.invalidation.<a href="./src/resources/cache/invalidation.ts">create</a>({ ...params }) -> InvalidationCreateResponse</code>
- <code title="get /v2/cache/invalidations/{request_id}">client.cache.invalidation.<a href="./src/resources/cache/invalidation.ts">get</a>(requestID) -> InvalidationGetResponse</code>

# Accounts

## Usage

Types:

- <code><a href="./src/resources/accounts/usage.ts">UsageGetResponse</a></code>

Methods:

- <code title="get /v2/accounts/usage">client.accounts.usage.<a href="./src/resources/accounts/usage.ts">get</a>({ ...params }) -> UsageGetResponse</code>

## Origins

Types:

- <code><a href="./src/resources/accounts/origins.ts">OriginRequest</a></code>
- <code><a href="./src/resources/accounts/origins.ts">OriginResponse</a></code>
- <code><a href="./src/resources/accounts/origins.ts">OriginListResponse</a></code>

Methods:

- <code title="get /v2/accounts/origins">client.accounts.origins.<a href="./src/resources/accounts/origins.ts">list</a>() -> OriginListResponse</code>
- <code title="post /v2/accounts/origins">client.accounts.origins.<a href="./src/resources/accounts/origins.ts">create</a>({ ...params }) -> OriginResponse</code>
- <code title="get /v2/accounts/origins/{id}">client.accounts.origins.<a href="./src/resources/accounts/origins.ts">get</a>(id) -> OriginResponse</code>
- <code title="patch /v2/accounts/origins/{id}">client.accounts.origins.<a href="./src/resources/accounts/origins.ts">update</a>(id, { ...params }) -> OriginResponse</code>
- <code title="delete /v2/accounts/origins/{id}">client.accounts.origins.<a href="./src/resources/accounts/origins.ts">delete</a>(id) -> void</code>

## URLEndpoints

Types:

- <code><a href="./src/resources/accounts/url-endpoints.ts">URLEndpointRequest</a></code>
- <code><a href="./src/resources/accounts/url-endpoints.ts">URLEndpointResponse</a></code>
- <code><a href="./src/resources/accounts/url-endpoints.ts">URLEndpointListResponse</a></code>

Methods:

- <code title="get /v2/accounts/url-endpoints">client.accounts.urlEndpoints.<a href="./src/resources/accounts/url-endpoints.ts">list</a>() -> URLEndpointListResponse</code>
- <code title="post /v2/accounts/url-endpoints">client.accounts.urlEndpoints.<a href="./src/resources/accounts/url-endpoints.ts">create</a>({ ...params }) -> URLEndpointResponse</code>
- <code title="get /v2/accounts/url-endpoints/{id}">client.accounts.urlEndpoints.<a href="./src/resources/accounts/url-endpoints.ts">get</a>(id) -> URLEndpointResponse</code>
- <code title="put /v2/accounts/url-endpoints/{id}">client.accounts.urlEndpoints.<a href="./src/resources/accounts/url-endpoints.ts">update</a>(id, { ...params }) -> URLEndpointResponse</code>
- <code title="delete /v2/accounts/url-endpoints/{id}">client.accounts.urlEndpoints.<a href="./src/resources/accounts/url-endpoints.ts">delete</a>(id) -> void</code>

# Webhooks

Types:

- <code><a href="./src/resources/webhooks.ts">BaseWebhookEvent</a></code>
- <code><a href="./src/resources/webhooks.ts">FileCreateEvent</a></code>
- <code><a href="./src/resources/webhooks.ts">FileDeleteEvent</a></code>
- <code><a href="./src/resources/webhooks.ts">FileUpdateEvent</a></code>
- <code><a href="./src/resources/webhooks.ts">FileVersionCreateEvent</a></code>
- <code><a href="./src/resources/webhooks.ts">FileVersionDeleteEvent</a></code>
- <code><a href="./src/resources/webhooks.ts">UploadPostTransformErrorEvent</a></code>
- <code><a href="./src/resources/webhooks.ts">UploadPostTransformSuccessEvent</a></code>
- <code><a href="./src/resources/webhooks.ts">UploadPreTransformErrorEvent</a></code>
- <code><a href="./src/resources/webhooks.ts">UploadPreTransformSuccessEvent</a></code>
- <code><a href="./src/resources/webhooks.ts">VideoTransformationAcceptedEvent</a></code>
- <code><a href="./src/resources/webhooks.ts">VideoTransformationErrorEvent</a></code>
- <code><a href="./src/resources/webhooks.ts">VideoTransformationReadyEvent</a></code>
- <code><a href="./src/resources/webhooks.ts">UnsafeUnwrapWebhookEvent</a></code>
- <code><a href="./src/resources/webhooks.ts">UnwrapWebhookEvent</a></code>

Methods:

- <code>client.webhooks.<a href="./src/resources/webhooks.ts">unwrap</a>(body) -> void</code>
- <code>client.webhooks.<a href="./src/resources/webhooks.ts">unsafeUnwrap</a>(body) -> void</code>
