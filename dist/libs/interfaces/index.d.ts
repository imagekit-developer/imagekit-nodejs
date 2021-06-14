import { IKCallback } from "./IKCallback";
import { ImageKitOptions } from "./ImageKitOptions";
import { TransformationPosition } from "./Transformation";
import { UploadOptions } from "./UploadOptions";
import { UploadResponse } from "./UploadResponse";
import { FileType } from "./FileType";
import { UrlOptions } from "./UrlOptions";
import { ListFileOptions, ListFileResponse } from "./ListFile";
import { FileDetailsOptions, FileDetailsResponse } from "./FileDetails";
import { FileMetadataResponse } from "./FileMetadata";
import { PurgeCacheResponse, PurgeCacheStatusResponse } from "./PurgeCache";
import { BulkDeleteFilesResponse, BulkDeleteFilesError } from "./BulkDeleteFiles";
export interface IImageKit {
    options: ImageKitOptions;
    /**
     * You can add multiple origins in the same ImageKit.io account.
     * URL endpoints allow you to configure which origins are accessible through your account and set their preference order as well.
     *
     * @see {@link https://github.com/imagekit-developer/imagekit-nodejs#url-generation}
     * @see {@link https://docs.imagekit.io/integration/url-endpoints}
     *
     * @param urlOptions
     */
    url: (urlOptions: UrlOptions) => string;
    /**
     * You can upload files to ImageKit.io media library from your server-side using private API key authentication.
     *
     * File size limit
     * The maximum upload file size is limited to 25MB.
     *
     * @see {@link https://docs.imagekit.io/api-reference/upload-file-api/server-side-file-upload}
     *
     * @param uploadOptions
     */
    upload: ((uploadOptions: UploadOptions, callback: IKCallback<UploadResponse>) => void) | ((uploadOptions: UploadOptions) => Promise<UploadResponse>);
    /**
     * This API can list all the uploaded files in your ImageKit.io media library.
     * For searching and filtering, you can use query parameters as described below.
     *
     * @see {@link https://docs.imagekit.io/api-reference/media-api/list-and-search-files}
     *
     * @param listFilesOptions
     */
    listFiles: ((listFilesOptions: ListFileOptions, callback: IKCallback<ListFileResponse>) => void) | ((listFilesOptions: ListFileOptions) => Promise<ListFileResponse>);
    /**
     * Get the file details such as tags, customCoordinates, and isPrivate properties using get file detail API.
     *
     * @see {@link https://docs.imagekit.io/api-reference/media-api/get-file-details}
     *
     * @param fileId
     */
    getFileDetails: ((fileId: string, callback: IKCallback<FileDetailsResponse>) => void) | ((fileId: string) => Promise<FileDetailsResponse>);
    /**
     * Get image exif, pHash and other metadata for uploaded files in ImageKit.io media library using this API.
     *
     * @see {@link https://docs.imagekit.io/api-reference/metadata-api/get-image-metadata-for-uploaded-media-files}
     *
     * @param fileId The unique fileId of the uploaded file. fileId is returned in list files API and upload API.
     */
    getFileMetadata: ((fileId: string, callback: IKCallback<FileMetadataResponse>) => void) | ((fileId: string) => Promise<FileMetadataResponse>);
    /**
     * Update file details such as tags and customCoordinates attribute using update file detail API.
     *
     * @see {@link https://docs.imagekit.io/api-reference/media-api/update-file-details}
     *
     * @param fileId The unique fileId of the uploaded file. fileId is returned in list files API and upload API.
     * @param optionsFileDetails
     */
    updateFileDetails: ((fileId: string, updateData: FileDetailsOptions, callback: IKCallback<FileDetailsResponse>) => void) | ((fileId: string, updateData: FileDetailsOptions) => Promise<FileDetailsResponse>);
    /**
     * Add tags to multiple files in a single request. The method accepts an array of fileIDs of the files and an array of tags that have to be added to those files.
     *
     * @see {@link https://docs.imagekit.io/api-reference/media-api/add-tags-bulk}
     *
     * @param fileIds
     * @param tags
    */
    bulkAddTags: ((fileIds: string[], tags: string[], callback: IKCallback<void>) => void) | ((fileIds: string[], tags: string[]) => Promise<void>);
    /**
     * Remove tags to multiple files in a single request. The method accepts an array of fileIDs of the files and an array of tags that have to be removed to those files.
     *
     * @see {@link https://docs.imagekit.io/api-reference/media-api/remove-tags-bulk}
     *
     * @param fileIds
     * @param tags
    */
    bulkRemoveTags: ((fileIds: string[], tags: string[], callback: IKCallback<void>) => void) | ((fileIds: string[], tags: string[]) => Promise<void>);
    /**
     * You can programmatically delete uploaded files in media library using delete file API.
     *
     * @see {@link https://docs.imagekit.io/api-reference/media-api/delete-file}
     *
     * @param fileId The unique fileId of the uploaded file. fileId is returned in list files API and upload API
     */
    deleteFile: ((fileId: string, callback: IKCallback<void>) => void) | ((fileId: string) => Promise<void>);
    /**
     * This will purge CDN and ImageKit.io internal cache.
     *
     * @see {@link https://docs.imagekit.io/api-reference/media-api/purge-cache}
     *
     * @param url The exact URL of the file to be purged. For example - https://ik.imageki.io/your_imagekit_id/rest-of-the-file-path.jpg
     */
    purgeCache: ((url: string, callback: IKCallback<PurgeCacheResponse>) => void) | ((url: string) => Promise<PurgeCacheResponse>);
    /**
     * Get the status of submitted purge request.
     *
     * @see {@link https://docs.imagekit.io/api-reference/media-api/purge-cache-status}
     *
     * @param requestId The requestId returned in response of purge cache API.
     */
    getPurgeCacheStatus: ((requestId: string, callback: IKCallback<PurgeCacheResponse>) => void) | ((requestId: string) => Promise<PurgeCacheResponse>);
    /**
     * Delete multiple files. The method accepts an array of file IDs of the files that have to be deleted.
     *
     * @see {@link https://docs.imagekit.io/api-reference/media-api/delete-files-bulk}
     *
     * @param fileIdArray The requestId returned in response of purge cache API.
     */
    bulkDeleteFiles: ((fileIdArray: string[], callback: IKCallback<BulkDeleteFilesResponse, BulkDeleteFilesError>) => void) | ((fileIdArray: string[]) => Promise<BulkDeleteFilesResponse>);
    /**
     * This will copy a file from one location to another. This method accepts the source file's path and destination folder path.
     *
     * @see {@link https://docs.imagekit.io/api-reference/media-api/copy-file}
     *
     * @param sourceFilePath
     * @param destinationPath
    */
    copyFile: ((sourceFilePath: string, destinationPath: string, callback: IKCallback<void>) => void) | ((sourceFilePath: string, destinationPath: string) => Promise<void>);
    /**
     * This will move a file from one location to another. This method accepts the source file's path and destination folder path.
     *
     * @see {@link https://docs.imagekit.io/api-reference/media-api/move-file}
     *
     * @param sourceFilePath
     * @param destinationPath
    */
    moveFile: ((sourceFilePath: string, destinationPath: string, callback: IKCallback<void>) => void) | ((sourceFilePath: string, destinationPath: string) => Promise<void>);
    /**
     * This will create a new folder. This method accepts folder name and parent folder path.
     *
     * @see {@link https://docs.imagekit.io/api-reference/media-api/create-folder}
     *
     * @param folderName
     * @param parentFolderPath
    */
    createFolder: ((folderName: string, parentFolderPath: string, callback: IKCallback<void>) => void) | ((folderName: string, parentFolderPath: string) => Promise<void>);
    /**
     * This will delete the specified folder and all nested files & folders. This method accepts the full path of the folder that is to be deleted.
     *
     * @see {@link https://docs.imagekit.io/api-reference/media-api/delete-folder}
     *
     * @param foldePath
    */
    deleteFolder: ((foldePath: string, callback: IKCallback<void>) => void) | ((foldePath: string) => Promise<void>);
    /**
     * This will copy a folder from one location to another. This method accepts the source folder's path and destination folder path.
     *
     * @see {@link https://docs.imagekit.io/api-reference/media-api/copy-folder}
     *
     * @param sourceFolderPath
     * @param destinationPath
    */
    copyFolder: ((sourceFilePath: string, destinationPath: string, callback: IKCallback<void>) => void) | ((sourceFilePath: string, destinationPath: string) => Promise<void>);
    /**
     * This will move a folder from one location to another. This method accepts the source folder's path and destination folder path.
     *
     * @see {@link https://docs.imagekit.io/api-reference/media-api/move-folder}
     *
     * @param sourceFolderPath
     * @param destinationPath
    */
    moveFolder: ((sourceFilePath: string, destinationPath: string, callback: IKCallback<void>) => void) | ((sourceFilePath: string, destinationPath: string) => Promise<void>);
    /**
     * In case you are looking to implement client-side file upload, you are going to need a token, expiry timestamp, and a valid signature for that upload. The SDK provides a simple method that you can use in your code to generate these authentication parameters for you.
     *
     * @see {@link https://github.com/imagekit-developer/imagekit-nodejs#authentication-parameter-generation}
     *
     * @param token
     * @param expire
     */
    getAuthenticationParameters: (token?: string, expire?: number) => {
        token: string;
        expire: number;
        signature: string;
    };
    /**
     * This allows us to get a bulk operation status e.g. copy or move folder. This method accepts jobId that is returned by copy and move folder operations.
     *
     * @see {@link https://docs.imagekit.io/api-reference/media-api/move-folder}
     *
     * @param jobId
    */
    getBulkJobStatus: ((jobId: string, callback: IKCallback<void>) => void) | ((jobId: string) => Promise<void>);
    /**
        Perceptual hashing allows you to construct a hash value that uniquely identifies an input image based on an image's contents. ImageKit.io metadata API returns the pHash value of an image in the response. You can use this value to find a duplicate (or similar) image by calculating the distance between the two images' pHash value.

        This SDK exposes pHashDistance function to calculate the distance between two pHash values. It accepts two pHash hexadecimal strings and returns a numeric value indicative of the level of difference between the two images.
     *
     * @see {@link https://docs.imagekit.io/api-reference/metadata-api#perceptual-hash-phash}
     *
     * @param firstPHash
     * @param secondPHash
    */
    pHashDistance: (firstPHash: string, secondPHash: string) => number;
}
export { ImageKitOptions, TransformationPosition, UploadOptions, UploadResponse, FileType, UrlOptions, ListFileOptions, ListFileResponse, FileDetailsOptions, FileDetailsResponse, FileMetadataResponse, PurgeCacheResponse, PurgeCacheStatusResponse, BulkDeleteFilesResponse, BulkDeleteFilesError, };
