# Reference

## Files

<details><summary><code>client.files.<a href="/src/api/resources/files/client/Client.ts">upload</a>({ ...params }) -> ImageKit.Upload</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

ImageKit.io allows you to upload files directly from both the server and client sides. For server-side uploads, private API key authentication is used. For client-side uploads, generate a one-time `token`, `signature`, and `expiration` from your secure backend using private API. [Learn more](/docs/api-reference/upload-file/upload-file#how-to-implement-client-side-file-upload) about how to implement client-side file upload.

The [V2 API](/docs/api-reference/upload-file/upload-file-v2) enhances security by verifying the entire payload using JWT.

**File size limit** \
On the free plan, the maximum upload file sizes are 20MB for images, audio, and raw files and 100MB for videos. On the paid plan, these limits increase to 40MB for images, audio, and raw files and 2GB for videos. These limits can be further increased with higher-tier plans.

**Version limit** \
A file can have a maximum of 100 versions.

**Demo applications**

- A full-fledged [upload widget using Uppy](https://github.com/imagekit-samples/uppy-uploader), supporting file selections from local storage, URL, Dropbox, Google Drive, Instagram, and more.
- [Quick start guides](/docs/quick-start-guides) for various frameworks and technologies.
  </dd>
  </dl>
  </dd>
  </dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.files.upload({
    file: fs.createReadStream("/path/to/your/file"),
    fileName: "fileName",
});
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `ImageKit.FileUploadV1`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Files.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.files.<a href="/src/api/resources/files/client/Client.ts">get</a>(fileId) -> ImageKit.FileDetails</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

This API returns an object with details or attributes about the current version of the file.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.files.get("fileId");
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**fileId:** `string` — The unique `fileId` of the uploaded file. `fileId` is returned in the list and search assets API and upload API.

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Files.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.files.<a href="/src/api/resources/files/client/Client.ts">update</a>(fileId, { ...params }) -> ImageKit.FilesUpdateResponse</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

This API updates the details or attributes of the current version of the file. You can update `tags`, `customCoordinates`, `customMetadata`, publication status, remove existing `AITags` and apply extensions using this API.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.files.update("fileId", {
    removeAITags: ["car", "vehicle", "motorsports"],
    webhookUrl: "https://webhook.site/0d6b6c7a-8e5a-4b3a-8b7c-0d6b6c7a8e5a",
    extensions: [
        {
            name: "remove-bg",
            options: {
                add_shadow: true,
            },
        },
        {
            name: "google-auto-tagging",
            minConfidence: 80,
            maxTags: 10,
        },
        {
            name: "aws-auto-tagging",
            minConfidence: 80,
            maxTags: 10,
        },
        {
            name: "ai-auto-description",
        },
    ],
    tags: ["tag1", "tag2"],
    customCoordinates: "10,10,100,100",
    customMetadata: {
        brand: "Nike",
        color: "red",
    },
});
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**fileId:** `string` — The unique `fileId` of the uploaded file. `fileId` is returned in list and search assets API and upload API.

</dd>
</dl>

<dl>
<dd>

**request:** `ImageKit.FilesUpdateRequest`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Files.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.files.<a href="/src/api/resources/files/client/Client.ts">delete</a>(fileId) -> void</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

This API deletes the file and all its file versions permanently.

Note: If a file or specific transformation has been requested in the past, then the response is cached. Deleting a file does not purge the cache. You can purge the cache using purge cache API.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.files.delete("fileId");
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**fileId:** `string` — The unique `fileId` of the uploaded file. `fileId` is returned in list and search assets API and upload API.

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Files.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.files.<a href="/src/api/resources/files/client/Client.ts">copy</a>({ ...params }) -> Record<string, unknown></code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

This will copy a file from one folder to another.

Note: If any file at the destination has the same name as the source file, then the source file and its versions (if `includeFileVersions` is set to true) will be appended to the destination file version history.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.files.copy({
    sourceFilePath: "/path/to/file.jpg",
    destinationPath: "/folder/to/copy/into/",
});
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `ImageKit.FilesCopyRequest`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Files.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.files.<a href="/src/api/resources/files/client/Client.ts">move</a>({ ...params }) -> Record<string, unknown></code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

This will move a file and all its versions from one folder to another.

Note: If any file at the destination has the same name as the source file, then the source file and its versions will be appended to the destination file.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.files.move({
    sourceFilePath: "/path/to/file.jpg",
    destinationPath: "/folder/to/move/into/",
});
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `ImageKit.FilesMoveRequest`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Files.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.files.<a href="/src/api/resources/files/client/Client.ts">rename</a>({ ...params }) -> ImageKit.FilesRenameResponse</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

You can rename an already existing file in the media library using rename file API. This operation would rename all file versions of the file.

Note: The old URLs will stop working. The file/file version URLs cached on CDN will continue to work unless a purge is requested.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.files.rename({
    filePath: "/path/to/file.jpg",
    newFileName: "newFileName.jpg",
});
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `ImageKit.FilesRenameRequest`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Files.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

## CustomMetadataFields

<details><summary><code>client.customMetadataFields.<a href="/src/api/resources/customMetadataFields/client/Client.ts">list</a>({ ...params }) -> ImageKit.CustomMetadataField[]</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

This API returns the array of created custom metadata field objects. By default the API returns only non deleted field objects, but you can include deleted fields in the API response.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.customMetadataFields.list();
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `ImageKit.CustomMetadataFieldsListRequest`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `CustomMetadataFields.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.customMetadataFields.<a href="/src/api/resources/customMetadataFields/client/Client.ts">create</a>({ ...params }) -> ImageKit.CustomMetadataField</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

This API creates a new custom metadata field. Once a custom metadata field is created either through this API or using the dashboard UI, its value can be set on the assets. The value of a field for an asset can be set using the media library UI or programmatically through upload or update assets API.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.customMetadataFields.create({
    name: "price",
    label: "price",
    schema: {
        type: "Number",
        minValue: 1000,
        maxValue: 3000,
    },
});
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `ImageKit.CustomMetadataFieldsCreateRequest`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `CustomMetadataFields.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.customMetadataFields.<a href="/src/api/resources/customMetadataFields/client/Client.ts">delete</a>(id) -> Record<string, unknown></code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

This API deletes a custom metadata field. Even after deleting a custom metadata field, you cannot create any new custom metadata field with the same name.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.customMetadataFields.delete("id");
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**id:** `string` — Should be a valid custom metadata field id.

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `CustomMetadataFields.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.customMetadataFields.<a href="/src/api/resources/customMetadataFields/client/Client.ts">update</a>(id, { ...params }) -> ImageKit.CustomMetadataField</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

This API updates the label or schema of an existing custom metadata field.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.customMetadataFields.update("id", {
    label: "price",
    schema: {
        minValue: 1000,
        maxValue: 3000,
    },
});
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**id:** `string` — Should be a valid custom metadata field id.

</dd>
</dl>

<dl>
<dd>

**request:** `ImageKit.CustomMetadataFieldsUpdateRequest`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `CustomMetadataFields.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

## Assets

<details><summary><code>client.assets.<a href="/src/api/resources/assets/client/Client.ts">list</a>({ ...params }) -> ImageKit.AssetsListResponseItem[]</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

This API can list all the uploaded files and folders in your ImageKit.io media library. In addition, you can fine-tune your query by specifying various filters by generating a query string in a Lucene-like syntax and provide this generated string as the value of the `searchQuery`.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.assets.list();
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `ImageKit.AssetsListRequest`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Assets.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

## Folders

<details><summary><code>client.folders.<a href="/src/api/resources/folders/client/Client.ts">create</a>({ ...params }) -> Record<string, unknown></code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

This will create a new folder. You can specify the folder name and location of the parent folder where this new folder should be created.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.folders.create({
    folderName: "summer",
    parentFolderPath: "/product/images/",
});
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `ImageKit.FoldersCreateRequest`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Folders.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.folders.<a href="/src/api/resources/folders/client/Client.ts">delete</a>({ ...params }) -> Record<string, unknown></code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

This will delete a folder and all its contents permanently. The API returns an empty response.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.folders.delete({
    folderPath: "/folder/to/delete/",
});
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `ImageKit.FoldersDeleteRequest`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Folders.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.folders.<a href="/src/api/resources/folders/client/Client.ts">copy</a>({ ...params }) -> ImageKit.FoldersCopyResponse</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

This will copy one folder into another. The selected folder, its nested folders, files, and their versions (in `includeVersions` is set to true) are copied in this operation. Note: If any file at the destination has the same name as the source file, then the source file and its versions will be appended to the destination file version history.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.folders.copy({
    sourceFolderPath: "/path/of/source/folder",
    destinationPath: "/path/of/destination/folder",
});
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `ImageKit.FoldersCopyRequest`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Folders.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.folders.<a href="/src/api/resources/folders/client/Client.ts">move</a>({ ...params }) -> ImageKit.FoldersMoveResponse</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

This will move one folder into another. The selected folder, its nested folders, files, and their versions are moved in this operation. Note: If any file at the destination has the same name as the source file, then the source file and its versions will be appended to the destination file version history.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.folders.move({
    sourceFolderPath: "/path/of/source/folder",
    destinationPath: "/path/of/destination/folder",
});
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `ImageKit.FoldersMoveRequest`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Folders.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.folders.<a href="/src/api/resources/folders/client/Client.ts">rename</a>({ ...params }) -> ImageKit.FoldersRenameResponse</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

This API allows you to rename an existing folder. The folder and all its nested assets and sub-folders will remain unchanged, but their paths will be updated to reflect the new folder name.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.folders.rename({
    folderPath: "/path/of/folder",
    newFolderName: "new-folder-name",
});
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `ImageKit.FoldersRenameRequest`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Folders.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

## Accounts Usage

<details><summary><code>client.accounts.usage.<a href="/src/api/resources/accounts/resources/usage/client/Client.ts">get</a>({ ...params }) -> ImageKit.UsageGetResponse</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Get the account usage information between two dates. Note that the API response includes data from the start date while excluding data from the end date. In other words, the data covers the period starting from the specified start date up to, but not including, the end date.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.accounts.usage.get({
    startDate: "startDate",
    endDate: "endDate",
});
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `ImageKit.accounts.UsageGetRequest`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Usage.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

## Accounts Origins

<details><summary><code>client.accounts.origins.<a href="/src/api/resources/accounts/resources/origins/client/Client.ts">list</a>() -> ImageKit.OriginResponseArray</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

**Note:** This API is currently in beta.  
Returns an array of all configured origins for the current account.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.accounts.origins.list();
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**requestOptions:** `Origins.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.accounts.origins.<a href="/src/api/resources/accounts/resources/origins/client/Client.ts">create</a>({ ...params }) -> ImageKit.OriginResponse</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

**Note:** This API is currently in beta.  
Creates a new origin and returns the origin object.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.accounts.origins.create({
    type: "S3",
    name: "US S3 Storage",
    bucket: "product-images",
    accessKey: "AKIAIOSFODNN7EXAMPLE",
    secretKey: "wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY",
});
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `ImageKit.OriginSchema`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Origins.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.accounts.origins.<a href="/src/api/resources/accounts/resources/origins/client/Client.ts">get</a>(id) -> ImageKit.OriginResponse</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

**Note:** This API is currently in beta.  
Retrieves the origin identified by `id`.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.accounts.origins.get("id");
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**id:** `string` — Unique identifier for the origin. This is generated by ImageKit when you create a new origin.

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Origins.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.accounts.origins.<a href="/src/api/resources/accounts/resources/origins/client/Client.ts">update</a>(id, { ...params }) -> ImageKit.OriginResponse</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

**Note:** This API is currently in beta.  
Updates the origin identified by `id` and returns the updated origin object.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.accounts.origins.update("id", {
    type: "S3",
    name: "US S3 Storage",
    bucket: "product-images",
    accessKey: "AKIAIOSFODNN7EXAMPLE",
    secretKey: "wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY",
});
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**id:** `string` — Unique identifier for the origin. This is generated by ImageKit when you create a new origin.

</dd>
</dl>

<dl>
<dd>

**request:** `ImageKit.OriginSchema`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Origins.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.accounts.origins.<a href="/src/api/resources/accounts/resources/origins/client/Client.ts">delete</a>(id) -> void</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

**Note:** This API is currently in beta.  
Permanently removes the origin identified by `id`. If the origin is in use by any URL‑endpoints, the API will return an error.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.accounts.origins.delete("id");
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**id:** `string` — Unique identifier for the origin. This is generated by ImageKit when you create a new origin.

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Origins.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

## Accounts UrlEndpoints

<details><summary><code>client.accounts.urlEndpoints.<a href="/src/api/resources/accounts/resources/urlEndpoints/client/Client.ts">list</a>() -> ImageKit.UrlEndpointResponseArray</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

**Note:** This API is currently in beta.  
Returns an array of all URL‑endpoints configured including the default URL-endpoint generated by ImageKit during account creation.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.accounts.urlEndpoints.list();
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**requestOptions:** `UrlEndpoints.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.accounts.urlEndpoints.<a href="/src/api/resources/accounts/resources/urlEndpoints/client/Client.ts">create</a>({ ...params }) -> ImageKit.UrlEndpointResponse</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

**Note:** This API is currently in beta.  
Creates a new URL‑endpoint and returns the resulting object.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.accounts.urlEndpoints.create({
    description: "My custom URL endpoint",
    urlPrefix: "product-images",
    origins: ["origin-id-1"],
});
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `ImageKit.UrlEndpointSchema`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `UrlEndpoints.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.accounts.urlEndpoints.<a href="/src/api/resources/accounts/resources/urlEndpoints/client/Client.ts">get</a>(id) -> ImageKit.UrlEndpointResponse</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

**Note:** This API is currently in beta.  
Retrieves the URL‑endpoint identified by `id`.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.accounts.urlEndpoints.get("id");
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**id:** `string` — Unique identifier for the URL-endpoint. This is generated by ImageKit when you create a new URL-endpoint. For the default URL-endpoint, this is always `default`.

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `UrlEndpoints.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.accounts.urlEndpoints.<a href="/src/api/resources/accounts/resources/urlEndpoints/client/Client.ts">update</a>(id, { ...params }) -> ImageKit.UrlEndpointResponse</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

**Note:** This API is currently in beta.  
Updates the URL‑endpoint identified by `id` and returns the updated object.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.accounts.urlEndpoints.update("id", {
    description: "My custom URL endpoint",
    urlPrefix: "product-images",
    origins: ["origin-id-1"],
});
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**id:** `string` — Unique identifier for the URL-endpoint. This is generated by ImageKit when you create a new URL-endpoint. For the default URL-endpoint, this is always `default`.

</dd>
</dl>

<dl>
<dd>

**request:** `ImageKit.UrlEndpointSchema`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `UrlEndpoints.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.accounts.urlEndpoints.<a href="/src/api/resources/accounts/resources/urlEndpoints/client/Client.ts">delete</a>(id) -> void</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

**Note:** This API is currently in beta.  
Deletes the URL‑endpoint identified by `id`. You cannot delete the default URL‑endpoint created by ImageKit during account creation.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.accounts.urlEndpoints.delete("id");
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**id:** `string` — Unique identifier for the URL-endpoint. This is generated by ImageKit when you create a new URL-endpoint. For the default URL-endpoint, this is always `default`.

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `UrlEndpoints.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

## Beta V2 Files

<details><summary><code>client.beta.v2.files.<a href="/src/api/resources/beta/resources/v2/resources/files/client/Client.ts">upload</a>({ ...params }) -> ImageKit.Upload</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

The V2 API enhances security by verifying the entire payload using JWT. This API is in beta.

ImageKit.io allows you to upload files directly from both the server and client sides. For server-side uploads, private API key authentication is used. For client-side uploads, generate a one-time `token` from your secure backend using private API. [Learn more](/docs/api-reference/upload-file/upload-file-v2#how-to-implement-secure-client-side-file-upload) about how to implement secure client-side file upload.

**File size limit** \
On the free plan, the maximum upload file sizes are 20MB for images, audio, and raw files, and 100MB for videos. On the paid plan, these limits increase to 40MB for images, audio, and raw files, and 2GB for videos. These limits can be further increased with higher-tier plans.

**Version limit** \
A file can have a maximum of 100 versions.

**Demo applications**

- A full-fledged [upload widget using Uppy](https://github.com/imagekit-samples/uppy-uploader), supporting file selections from local storage, URL, Dropbox, Google Drive, Instagram, and more.
- [Quick start guides](/docs/quick-start-guides) for various frameworks and technologies.
  </dd>
  </dl>
  </dd>
  </dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.beta.v2.files.upload({
    file: fs.createReadStream("/path/to/your/file"),
    fileName: "fileName",
});
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `ImageKit.beta.v2.FileUploadV2`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Files.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

## Cache Invalidation

<details><summary><code>client.cache.invalidation.<a href="/src/api/resources/cache/resources/invalidation/client/Client.ts">create</a>({ ...params }) -> ImageKit.InvalidationCreateResponse</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

This API will purge CDN cache and ImageKit.io's internal cache for a file. Note: Purge cache is an asynchronous process and it may take some time to reflect the changes.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.cache.invalidation.create({
    url: "https://ik.imagekit.io/your_imagekit_id/default-image.jpg",
});
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `ImageKit.cache.InvalidationCreateRequest`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Invalidation.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.cache.invalidation.<a href="/src/api/resources/cache/resources/invalidation/client/Client.ts">get</a>(requestId) -> ImageKit.InvalidationGetResponse</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

This API returns the status of a purge cache request.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.cache.invalidation.get("requestId");
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**requestId:** `string` — Should be a valid requestId.

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Invalidation.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

## Files Bulk

<details><summary><code>client.files.bulk.<a href="/src/api/resources/files/resources/bulk/client/Client.ts">delete</a>({ ...params }) -> ImageKit.BulkDeleteResponse</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

This API deletes multiple files and all their file versions permanently.

Note: If a file or specific transformation has been requested in the past, then the response is cached. Deleting a file does not purge the cache. You can purge the cache using purge cache API.

A maximum of 100 files can be deleted at a time.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.files.bulk.delete({
    fileIds: ["598821f949c0a938d57563bd", "598821f949c0a938d57563be"],
});
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `ImageKit.files.BulkDeleteRequest`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Bulk.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.files.bulk.<a href="/src/api/resources/files/resources/bulk/client/Client.ts">addTags</a>({ ...params }) -> ImageKit.BulkAddTagsResponse</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

This API adds tags to multiple files in bulk. A maximum of 50 files can be specified at a time.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.files.bulk.addTags({
    fileIds: ["598821f949c0a938d57563bd", "598821f949c0a938d57563be"],
    tags: ["t-shirt", "round-neck", "sale2019"],
});
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `ImageKit.files.BulkAddTagsRequest`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Bulk.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.files.bulk.<a href="/src/api/resources/files/resources/bulk/client/Client.ts">removeTags</a>({ ...params }) -> ImageKit.BulkRemoveTagsResponse</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

This API removes tags from multiple files in bulk. A maximum of 50 files can be specified at a time.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.files.bulk.removeTags({
    fileIds: ["598821f949c0a938d57563bd", "598821f949c0a938d57563be"],
    tags: ["t-shirt", "round-neck", "sale2019"],
});
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `ImageKit.files.BulkRemoveTagsRequest`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Bulk.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.files.bulk.<a href="/src/api/resources/files/resources/bulk/client/Client.ts">removeAiTags</a>({ ...params }) -> ImageKit.BulkRemoveAiTagsResponse</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

This API removes AITags from multiple files in bulk. A maximum of 50 files can be specified at a time.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.files.bulk.removeAiTags({
    fileIds: ["598821f949c0a938d57563bd", "598821f949c0a938d57563be"],
    AITags: ["t-shirt", "round-neck", "sale2019"],
});
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `ImageKit.files.BulkRemoveAiTagsRequest`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Bulk.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

## Files Versions

<details><summary><code>client.files.versions.<a href="/src/api/resources/files/resources/versions/client/Client.ts">list</a>(fileId) -> ImageKit.FileDetails[]</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

This API returns details of all versions of a file.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.files.versions.list("fileId");
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**fileId:** `string` — The unique `fileId` of the uploaded file. `fileId` is returned in list and search assets API and upload API.

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Versions.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.files.versions.<a href="/src/api/resources/files/resources/versions/client/Client.ts">get</a>(fileId, versionId) -> ImageKit.FileDetails</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

This API returns an object with details or attributes of a file version.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.files.versions.get("fileId", "versionId");
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**fileId:** `string` — The unique `fileId` of the uploaded file. `fileId` is returned in list and search assets API and upload API.

</dd>
</dl>

<dl>
<dd>

**versionId:** `string` — The unique `versionId` of the uploaded file. `versionId` is returned in list and search assets API and upload API.

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Versions.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.files.versions.<a href="/src/api/resources/files/resources/versions/client/Client.ts">delete</a>(fileId, versionId) -> Record<string, unknown></code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

This API deletes a non-current file version permanently. The API returns an empty response.

Note: If you want to delete all versions of a file, use the delete file API.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.files.versions.delete("fileId", "versionId");
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**fileId:** `string` — The unique `fileId` of the uploaded file. `fileId` is returned in list and search assets API and upload API.

</dd>
</dl>

<dl>
<dd>

**versionId:** `string` — The unique `versionId` of the uploaded file. `versionId` is returned in list and search assets API and upload API.

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Versions.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.files.versions.<a href="/src/api/resources/files/resources/versions/client/Client.ts">restore</a>(fileId, versionId) -> ImageKit.FileDetails</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

This API restores a file version as the current file version.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.files.versions.restore("fileId", "versionId");
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**fileId:** `string` — The unique `fileId` of the uploaded file. `fileId` is returned in list and search assets API and upload API.

</dd>
</dl>

<dl>
<dd>

**versionId:** `string` — The unique `versionId` of the uploaded file. `versionId` is returned in list and search assets API and upload API.

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Versions.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

## Files Metadata

<details><summary><code>client.files.metadata.<a href="/src/api/resources/files/resources/metadata/client/Client.ts">get</a>(fileId) -> ImageKit.Metadata</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

You can programmatically get image EXIF, pHash, and other metadata for uploaded files in the ImageKit.io media library using this API.

You can also get the metadata in upload API response by passing `metadata` in `responseFields` parameter.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.files.metadata.get("fileId");
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**fileId:** `string` — The unique `fileId` of the uploaded file. `fileId` is returned in the list and search assets API and upload API.

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Metadata.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.files.metadata.<a href="/src/api/resources/files/resources/metadata/client/Client.ts">getFromUrl</a>({ ...params }) -> ImageKit.Metadata</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Get image EXIF, pHash, and other metadata from ImageKit.io powered remote URL using this API.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.files.metadata.getFromUrl({
    url: "url",
});
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `ImageKit.files.MetadataGetFromUrlRequest`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Metadata.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

## Folders Job

<details><summary><code>client.folders.job.<a href="/src/api/resources/folders/resources/job/client/Client.ts">get</a>(jobId) -> ImageKit.JobGetResponse</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

This API returns the status of a bulk job like copy and move folder operations.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.folders.job.get("jobId");
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**jobId:** `string` — The `jobId` is returned in the response of bulk job API e.g. copy folder or move folder API.

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Job.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>
