/*
    Helper Modules
*/
import _ from "lodash";
import errorMessages from "./libs/constants/errorMessages";
import {
  BulkDeleteFilesError,
  BulkDeleteFilesResponse,
  CopyFolderError,
  CopyFolderResponse,
  FileDetailsOptions,
  FileObject,
  FolderObject,
  FileMetadataResponse,
  ImageKitOptions,
  ListFileOptions,
  ListFileResponse,
  MoveFolderError,
  MoveFolderResponse,
  PurgeCacheResponse,
  PurgeCacheStatusResponse,
  UploadOptions,
  UploadResponse,
  UrlOptions,
  CopyFileOptions,
  MoveFileOptions,
  CreateFolderOptions,
  CopyFolderOptions,
  MoveFolderOptions,
  FileVersionDetailsOptions,
  DeleteFileVersionOptions,
  RestoreFileVersionOptions,
  CreateCustomMetadataFieldOptions,
  GetCustomMetadataFieldsOptions,
  CustomMetadataField,
  UpdateCustomMetadataFieldOptions,
  RenameFileOptions,
  RenameFileResponse,
} from "./libs/interfaces";
import { IKCallback } from "./libs/interfaces/IKCallback";
import manage from "./libs/manage";
import signature from "./libs/signature";
import upload from "./libs/upload";
import { verify as verifyWebhookEvent } from "./utils/webhook-signature";
import customMetadataField from "./libs/manage/custom-metadata-field";
/*
    Implementations
*/
import url from "./libs/url";
/*
    Utils
*/
import pHashUtils from "./utils/phash";
import transformationUtils from "./utils/transformation";
import IKResponse from "./libs/interfaces/IKResponse";

const promisify = function <T = void>(thisContext: ImageKit, fn: Function) {
  return function (...args: any[]): Promise<T> | void {
    if (args.length === fn.length && typeof args[args.length - 1] !== "undefined") {
      if (typeof args[args.length - 1] !== "function") {
        throw new Error("Callback must be a function.");
      }
      fn.call(thisContext, ...args);
    } else {
      return new Promise<T>((resolve, reject) => {
        const callback = function (err: Error, ...results: any[]) {
          if (err) {
            return reject(err);
          } else {
            resolve(results.length > 1 ? results : results[0]);
          }
        };
        args.pop()
        args.push(callback);
        fn.call(thisContext, ...args);
      });
    }
  };
};
class ImageKit {
  options: ImageKitOptions = {
    uploadEndpoint: "https://upload.imagekit.io/api/v1/files/upload",
    publicKey: "",
    privateKey: "",
    urlEndpoint: "",
    transformationPosition: transformationUtils.getDefault(),
  };

  constructor(opts: ImageKitOptions = {} as ImageKitOptions) {
    this.options = _.extend(this.options, opts);
    if (!this.options.publicKey) {
      throw new Error(errorMessages.MANDATORY_PUBLIC_KEY_MISSING.message);
    }
    if (!this.options.privateKey) {
      throw new Error(errorMessages.MANDATORY_PRIVATE_KEY_MISSING.message);
    }
    if (!this.options.urlEndpoint) {
      throw new Error(errorMessages.MANDATORY_URL_ENDPOINT_KEY_MISSING.message);
    }
  }

  /**
   * This method allows you to create an URL to access a file using the relative or absolute path and the ImageKit URL endpoint (urlEndpoint). The file can be an image, video or any other static file supported by ImageKit.
   *
   * @see {@link https://github.com/imagekit-developer/imagekit-nodejs#url-generation}
   * @see {@link https://docs.imagekit.io/integration/url-endpoints}
   *
   * @param urlOptions
   */

  url(urlOptions: UrlOptions): string {
    return url(urlOptions, this.options);
  }

  /**
   * You can upload file to ImageKit.io media library from your server-side using private API key authentication.
   *
   * @see {@link https://docs.imagekit.io/api-reference/upload-file-api/server-side-file-upload}
   *
   * @param uploadOptions
   */
  upload(uploadOptions: UploadOptions): Promise<IKResponse<UploadResponse>>;
  upload(uploadOptions: UploadOptions, callback: IKCallback<IKResponse<UploadResponse>>): void;
  upload(
    uploadOptions: UploadOptions,
    callback?: IKCallback<IKResponse<UploadResponse>>,
  ): void | Promise<IKResponse<UploadResponse>> {
    return promisify<IKResponse<UploadResponse>>(this, upload)(uploadOptions, this.options, callback);
  }

  /**
   * This API can list all the uploaded files in your ImageKit.io media library.
   * For searching and filtering, you can use query parameters as described in docs.
   *
   * @see {@link https://docs.imagekit.io/api-reference/media-api/list-and-search-files}
   *
   * @param listFilesOptions
   */
  listFiles(listOptions: ListFileOptions): Promise<IKResponse<ListFileResponse>>;
  listFiles(listOptions: ListFileOptions, callback: IKCallback<IKResponse<ListFileResponse>>): void;
  listFiles(
    listOptions: ListFileOptions,
    callback?: IKCallback<IKResponse<ListFileResponse>>,
  ): void | Promise<IKResponse<ListFileResponse>> {
    return promisify<IKResponse<ListFileResponse>>(this, manage.listFiles)(listOptions, this.options, callback);
  }

  /**
   * Get the file details such as tags, customCoordinates, and isPrivate properties using get file detail API.
   *
   * @see {@link https://docs.imagekit.io/api-reference/media-api/get-file-details}
   *
   * @param fileId
   */
  getFileDetails(fileId: string): Promise<IKResponse<FileObject>>;
  getFileDetails(fileId: string, callback: IKCallback<IKResponse<FileObject>>): void;
  getFileDetails(
    fileId: string,
    callback?: IKCallback<IKResponse<FileObject>>,
  ): void | Promise<IKResponse<FileObject>> {
    return promisify<IKResponse<FileObject>>(this, manage.getFileDetails)(fileId, this.options, callback);
  }

  /**
   * Get all versions of an assset.
   *
   * @see {@link https://docs.imagekit.io/api-reference/media-api/get-file-versions}
   *
   * @param fileId
   */
  getFileVersions(fileId: string): Promise<IKResponse<FileObject>>;
  getFileVersions(fileId: string, callback: IKCallback<IKResponse<FileObject>>): void;
  getFileVersions(
    fileId: string,
    callback?: IKCallback<IKResponse<FileObject>>,
  ): void | Promise<IKResponse<FileObject>> {
    return promisify<IKResponse<FileObject>>(this, manage.getFileVersions)(fileId, this.options, callback);
  }

  /**
   * Get file details of a specific version.
   *
   * @see {@link https://docs.imagekit.io/api-reference/media-api/get-file-version-details}
   *
   * @param fileVersionDetailsOptions
   */
  getFileVersionDetails(fileVersionDetailsOptions: FileVersionDetailsOptions): Promise<IKResponse<FileObject>>;
  getFileVersionDetails(
    fileVersionDetailsOptions: FileVersionDetailsOptions,
    callback: IKCallback<IKResponse<FileObject>>,
  ): void;
  getFileVersionDetails(
    fileVersionDetailsOptions: FileVersionDetailsOptions,
    callback?: IKCallback<IKResponse<FileObject>>,
  ): void | Promise<IKResponse<FileObject>> {
    return promisify<IKResponse<FileObject>>(this, manage.getFileVersionDetails)(
      fileVersionDetailsOptions,
      this.options,
      callback,
    );
  }

  /**
   * Get image exif, pHash and other metadata for uploaded files in ImageKit.io media library using this API.
   *
   * @see {@link https://docs.imagekit.io/api-reference/metadata-api/get-image-metadata-for-uploaded-media-files}
   *
   * @param fileIdOrURL The unique fileId of the uploaded file or absolute URL.
   */
  getFileMetadata(fileIdOrURL: string): Promise<IKResponse<FileMetadataResponse>>;
  getFileMetadata(fileIdOrURL: string, callback: IKCallback<IKResponse<FileMetadataResponse>>): void;
  getFileMetadata(
    fileIdOrURL: string,
    callback?: IKCallback<IKResponse<FileMetadataResponse>>,
  ): void | Promise<IKResponse<FileMetadataResponse>> {
    return promisify<IKResponse<FileMetadataResponse>>(this, manage.getFileMetadata)(
      fileIdOrURL,
      this.options,
      callback,
    );
  }

  /**
   * Update file details such as tags and customCoordinates attribute using update file detail API.
   *
   * @see {@link https://docs.imagekit.io/api-reference/media-api/update-file-details}
   *
   * @param fileId The unique fileId of the uploaded file. fileId is returned in list files API and upload API.
   * @param updateData
   */
  updateFileDetails(fileId: string, updateData: FileDetailsOptions): Promise<IKResponse<FileObject>>;
  updateFileDetails(fileId: string, updateData: FileDetailsOptions, callback: IKCallback<IKResponse<FileObject>>): void;
  updateFileDetails(
    fileId: string,
    updateData: FileDetailsOptions,
    callback?: IKCallback<IKResponse<FileObject>>,
  ): void | Promise<IKResponse<FileObject>> {
    return promisify<IKResponse<FileObject>>(this, manage.updateFileDetails)(
      fileId,
      updateData,
      this.options,
      callback,
    );
  }

  /**
   * Add tags to multiple files in a single request. The method accepts an array of fileIDs of the files and an array of tags that have to be added to those files.
   *
   * @see {@link https://docs.imagekit.io/api-reference/media-api/add-tags-bulk}
   *
   * @param fileIds
   * @param tags
   */
  bulkAddTags(fileIds: string[], tags: string[]): Promise<IKResponse<void>>;
  bulkAddTags(fileIds: string[], tags: string[], callback: IKCallback<IKResponse<void>>): void;
  bulkAddTags(
    fileIds: string[],
    tags: string[],
    callback?: IKCallback<IKResponse<void>>,
  ): void | Promise<IKResponse<void>> {
    return promisify<IKResponse<void>>(this, manage.bulkAddTags)(fileIds, tags, this.options, callback);
  }

  /**
   * Remove tags to multiple files in a single request. The method accepts an array of fileIDs of the files and an array of tags that have to be removed to those files.
   *
   * @see {@link https://docs.imagekit.io/api-reference/media-api/remove-tags-bulk}
   *
   * @param fileIds
   * @param tags
   */
  bulkRemoveTags(fileIds: string[], tags: string[]): Promise<IKResponse<void>>;
  bulkRemoveTags(fileIds: string[], tags: string[], callback: IKCallback<IKResponse<void>>): void;
  bulkRemoveTags(
    fileIds: string[],
    tags: string[],
    callback?: IKCallback<IKResponse<void>>,
  ): void | Promise<IKResponse<void>> {
    return promisify<IKResponse<void>>(this, manage.bulkRemoveTags)(fileIds, tags, this.options, callback);
  }

  /**
   * Remove AITags from multiple files in a single request.
   *
   * @see {@link https://docs.imagekit.io/api-reference/media-api/remove-aitags-bulk}
   *
   * @param fileIds
   * @param tags
   */
  bulkRemoveAITags(fileIds: string[], tags: string[]): Promise<IKResponse<void>>;
  bulkRemoveAITags(fileIds: string[], tags: string[], callback: IKCallback<IKResponse<void>>): void;
  bulkRemoveAITags(
    fileIds: string[],
    tags: string[],
    callback?: IKCallback<IKResponse<void>>,
  ): void | Promise<IKResponse<void>> {
    return promisify<IKResponse<void>>(this, manage.bulkRemoveAITags)(fileIds, tags, this.options, callback);
  }

  /**
   * You can programmatically delete uploaded files in media library using delete file API.
   *
   * @see {@link https://docs.imagekit.io/api-reference/media-api/delete-file}
   *
   * @param fileId The unique fileId of the uploaded file. fileId is returned in list files API and upload API
   */
  deleteFile(fileId: string): Promise<IKResponse<void>>;
  deleteFile(fileId: string, callback: IKCallback<IKResponse<void>>): void;
  deleteFile(fileId: string, callback?: IKCallback<IKResponse<void>>): void | Promise<IKResponse<void>> {
    return promisify<IKResponse<void>>(this, manage.deleteFile)(fileId, this.options, callback);
  }

  /**
   * Delete any non-current version of a file.
   *
   * @see {@link https://docs.imagekit.io/api-reference/media-api/delete-file-version}
   *
   * @param deleteFileVersionOptions
   */
  deleteFileVersion(deleteFileVersionOptions: DeleteFileVersionOptions): Promise<IKResponse<void>>;
  deleteFileVersion(deleteFileVersionOptions: DeleteFileVersionOptions, callback: IKCallback<IKResponse<void>>): void;
  deleteFileVersion(
    deleteFileVersionOptions: DeleteFileVersionOptions,
    callback?: IKCallback<IKResponse<void>>,
  ): void | Promise<IKResponse<void>> {
    return promisify<IKResponse<void>>(this, manage.deleteFileVersion)(
      deleteFileVersionOptions,
      this.options,
      callback,
    );
  }

  /**
   * Restore file version to a different version of a file.
   *
   * @see {@link https://docs.imagekit.io/api-reference/media-api/restore-file-version}
   *
   * @param restoreFileVersionOptions
   */
  restoreFileVersion(restoreFileVersionOptions: RestoreFileVersionOptions): Promise<IKResponse<FileObject>>;
  restoreFileVersion(
    restoreFileVersionOptions: RestoreFileVersionOptions,
    callback: IKCallback<IKResponse<FileObject>>,
  ): void;
  restoreFileVersion(
    restoreFileVersionOptions: RestoreFileVersionOptions,
    callback?: IKCallback<IKResponse<FileObject>>,
  ): void | Promise<IKResponse<FileObject>> {
    return promisify<IKResponse<FileObject>>(this, manage.restoreFileVersion)(
      restoreFileVersionOptions,
      this.options,
      callback,
    );
  }

  /**
   * This will purge CDN and ImageKit.io internal cache.
   *
   * @see {@link https://docs.imagekit.io/api-reference/media-api/purge-cache}
   *
   * @param url The exact URL of the file to be purged. For example - https://ik.imageki.io/your_imagekit_id/rest-of-the-file-path.jpg
   */
  purgeCache(url: string): Promise<IKResponse<PurgeCacheResponse>>;
  purgeCache(url: string, callback: IKCallback<IKResponse<PurgeCacheResponse>>): void;
  purgeCache(
    url: string,
    callback?: IKCallback<IKResponse<PurgeCacheResponse>>,
  ): void | Promise<IKResponse<PurgeCacheResponse>> {
    return promisify<IKResponse<PurgeCacheResponse>>(this, manage.purgeCache)(url, this.options, callback);
  }

  /**
   * Get the status of submitted purge request.
   *
   * @see {@link https://docs.imagekit.io/api-reference/media-api/purge-cache-status}
   *
   * @param requestId The requestId returned in response of purge cache API.
   */
  getPurgeCacheStatus(requestId: string, callback: IKCallback<IKResponse<PurgeCacheStatusResponse>>): void;
  getPurgeCacheStatus(requestId: string): Promise<IKResponse<PurgeCacheStatusResponse>>;
  getPurgeCacheStatus(
    requestId: string,
    callback?: IKCallback<IKResponse<PurgeCacheStatusResponse>>,
  ): void | Promise<IKResponse<PurgeCacheStatusResponse>> {
    return promisify<IKResponse<PurgeCacheStatusResponse>>(this, manage.getPurgeCacheStatus)(
      requestId,
      this.options,
      callback,
    );
  }

  /**
   * Delete multiple files. The method accepts an array of file IDs of the files that have to be deleted.
   *
   * @see {@link https://docs.imagekit.io/api-reference/media-api/delete-files-bulk}
   *
   * @param fileIdArray The requestId returned in response of purge cache API.
   */
  bulkDeleteFiles(
    fileIdArray: string[],
    callback?: IKCallback<IKResponse<BulkDeleteFilesResponse>, IKResponse<BulkDeleteFilesError>>,
  ): void | Promise<IKResponse<BulkDeleteFilesResponse>>;
  bulkDeleteFiles(
    fileIdArray: string[],
    callback?: IKCallback<IKResponse<BulkDeleteFilesResponse>, IKResponse<BulkDeleteFilesError>>,
  ): void | Promise<IKResponse<BulkDeleteFilesResponse>> {
    return promisify<IKResponse<BulkDeleteFilesResponse>>(this, manage.bulkDeleteFiles)(
      fileIdArray,
      this.options,
      callback,
    );
  }

  /**
   * This will copy a file from one location to another. This method accepts the source file's path and destination folder path.
   *
   * @see {@link https://docs.imagekit.io/api-reference/media-api/copy-file}
   *
   * @param copyFileOptions
   */
  copyFile(copyFileOptions: CopyFileOptions): Promise<IKResponse<void>>;
  copyFile(copyFileOptions: CopyFileOptions, callback: IKCallback<IKResponse<void>>): void;
  copyFile(
    copyFileOptions: CopyFileOptions,
    callback?: IKCallback<IKResponse<void>>,
  ): void | Promise<IKResponse<void>> {
    return promisify<IKResponse<void>>(this, manage.copyFile)(copyFileOptions, this.options, callback);
  }

  /**
   * This will move a file from one location to another. This method accepts the source file's path and destination folder path.
   *
   * @see {@link https://docs.imagekit.io/api-reference/media-api/move-file}
   *
   * @param moveFileOptions
   */
  moveFile(moveFileOptions: MoveFileOptions): Promise<IKResponse<void>>;
  moveFile(moveFileOptions: MoveFileOptions, callback: IKCallback<IKResponse<void>>): void;
  moveFile(
    moveFileOptions: MoveFileOptions,
    callback?: IKCallback<IKResponse<void>>,
  ): void | Promise<IKResponse<void>> {
    return promisify<IKResponse<void>>(this, manage.moveFile)(moveFileOptions, this.options, callback);
  }

  /**
   * You can programmatically rename an already existing file in the media library using rename file API. This operation would rename all file versions of the file. Note: The old URLs will stop working. The file/file version URLs cached on CDN will continue to work unless a purge is requested.
   *
   * @see {@link https://docs.imagekit.io/api-reference/media-api/rename-file}
   *
   * @param renameFileOptions
   */
  renameFile(renameFileOptions: RenameFileOptions): Promise<IKResponse<RenameFileResponse>>;
  renameFile(renameFileOptions: RenameFileOptions, callback: IKCallback<IKResponse<RenameFileResponse>>): void;
  renameFile(
    renameFileOptions: RenameFileOptions,
    callback?: IKCallback<IKResponse<RenameFileResponse>>,
  ): void | Promise<IKResponse<RenameFileResponse>> {
    return promisify<IKResponse<RenameFileResponse>>(this, manage.renameFile)(
      renameFileOptions,
      this.options,
      callback,
    );
  }

  /**
   * This will create a new folder. This method accepts folder name and parent folder path.
   *
   * @see {@link https://docs.imagekit.io/api-reference/media-api/create-folder}
   *
   * @param createFolderOptions
   */
  createFolder(createFolderOptions: CreateFolderOptions): Promise<IKResponse<void>>;
  createFolder(createFolderOptions: CreateFolderOptions, callback: IKCallback<IKResponse<void>>): void;
  createFolder(
    createFolderOptions: CreateFolderOptions,
    callback?: IKCallback<IKResponse<void>>,
  ): void | Promise<IKResponse<void>> {
    return promisify<IKResponse<void>>(this, manage.createFolder)(createFolderOptions, this.options, callback);
  }

  /**
   * This will delete the specified folder and all nested files & folders. This method accepts the full path of the folder that is to be deleted.
   *
   * @see {@link https://docs.imagekit.io/api-reference/media-api/delete-folder}
   *
   * @param foldePath
   */
  deleteFolder(folderPath: string): Promise<IKResponse<void>>;
  deleteFolder(folderPath: string, callback: IKCallback<IKResponse<void>>): void;
  deleteFolder(folderPath: string, callback?: IKCallback<IKResponse<void>>): void | Promise<IKResponse<void>> {
    return promisify<IKResponse<void>>(this, manage.deleteFolder)(folderPath, this.options, callback);
  }

  /**
   * This will copy a folder from one location to another. This method accepts the source folder's path and destination folder path.
   *
   * @see {@link https://docs.imagekit.io/api-reference/media-api/copy-folder}
   *
   * @param copyFolderOptions
   */
  copyFolder(copyFolderOptions: CopyFolderOptions): Promise<IKResponse<CopyFolderResponse>>;
  copyFolder(
    copyFolderOptions: CopyFolderOptions,
    callback: IKCallback<IKResponse<CopyFolderResponse>, IKResponse<CopyFolderError>>,
  ): void;
  copyFolder(
    copyFolderOptions: CopyFolderOptions,
    callback?: IKCallback<IKResponse<CopyFolderResponse>, IKResponse<CopyFolderError>>,
  ): void | Promise<IKResponse<CopyFolderResponse>> {
    return promisify<IKResponse<CopyFolderResponse>>(this, manage.copyFolder)(
      copyFolderOptions,
      this.options,
      callback,
    );
  }

  /**
   * This will move a folder from one location to another. This method accepts the source folder's path and destination folder path.
   *
   * @see {@link https://docs.imagekit.io/api-reference/media-api/move-folder}
   *
   * @param moveFolderOptions
   */
  moveFolder(moveFolderOptions: MoveFolderOptions): Promise<IKResponse<MoveFolderResponse>>;
  moveFolder(
    moveFolderOptions: MoveFolderOptions,
    callback: IKCallback<IKResponse<MoveFolderResponse>, IKResponse<MoveFolderError>>,
  ): void;
  moveFolder(
    moveFolderOptions: MoveFolderOptions,
    callback?: IKCallback<IKResponse<MoveFolderResponse>, MoveFolderError>,
  ): void | Promise<IKResponse<MoveFolderResponse>> {
    return promisify<IKResponse<MoveFolderResponse>>(this, manage.moveFolder)(
      moveFolderOptions,
      this.options,
      callback,
    );
  }

  /**
   * In case you are looking to implement client-side file upload, you are going to need a token, expiry timestamp, and a valid signature for that upload. The SDK provides a simple method that you can use in your code to generate these authentication parameters for you.
   *
   * @see {@link https://github.com/imagekit-developer/imagekit-nodejs#authentication-parameter-generation}
   *
   * @param token
   * @param expire
   */
  getAuthenticationParameters(token?: string, expire?: number): { token: string; expire: number; signature: string } {
    return signature.getAuthenticationParameters(token, expire, this.options);
  }

  /**
   * This allows us to get a bulk operation status e.g. copy or move folder. This method accepts jobId that is returned by copy and move folder operations.
   *
   * @see {@link https://docs.imagekit.io/api-reference/media-api/move-folder}
   *
   * @param jobId
   */
  getBulkJobStatus(jobId: string): Promise<IKResponse<void>>;
  getBulkJobStatus(jobId: string, callback: IKCallback<IKResponse<void>>): Promise<IKResponse<void>>;
  getBulkJobStatus(jobId: string, callback?: IKCallback<IKResponse<void>>): void | Promise<IKResponse<void>> {
    return promisify<IKResponse<void>>(this, manage.getBulkJobStatus)(jobId, this.options, callback);
  }

  /**
   * Create custom metadata field
   *
   * @see {@link https://docs.imagekit.io/api-reference/custom-metadata-fields-api/create-custom-metadata-field}
   *
   * @param createCustomMetadataFieldOptions
   */
  createCustomMetadataField(
    createCustomMetadataFieldOptions: CreateCustomMetadataFieldOptions,
  ): Promise<IKResponse<CustomMetadataField>>;
  createCustomMetadataField(
    createCustomMetadataFieldOptions: CreateCustomMetadataFieldOptions,
    callback: IKCallback<IKResponse<CustomMetadataField>>,
  ): Promise<IKResponse<CustomMetadataField>>;
  createCustomMetadataField(
    createCustomMetadataFieldOptions: CreateCustomMetadataFieldOptions,
    callback?: IKCallback<IKResponse<CustomMetadataField>>,
  ): void | Promise<IKResponse<CustomMetadataField>> {
    return promisify<IKResponse<CustomMetadataField>>(this, customMetadataField.create)(
      createCustomMetadataFieldOptions,
      this.options,
      callback,
    );
  }

  /**
   *Get a list of all the custom metadata fields.
   *
   * @see {@link https://docs.imagekit.io/api-reference/custom-metadata-fields-api/get-custom-metadata-field}
   *
   */
  getCustomMetadataFields(
    getCustomMetadataFieldsOptions: GetCustomMetadataFieldsOptions,
  ): Promise<IKResponse<CustomMetadataField[]>>;
  getCustomMetadataFields(
    getCustomMetadataFieldsOptions: GetCustomMetadataFieldsOptions,
    callback: IKCallback<IKResponse<CustomMetadataField[]>>,
  ): Promise<IKResponse<CustomMetadataField[]>>;
  getCustomMetadataFields(
    getCustomMetadataFieldsOptions: GetCustomMetadataFieldsOptions,
    callback?: IKCallback<IKResponse<CustomMetadataField[]>>,
  ): void | Promise<IKResponse<CustomMetadataField[]>> {
    return promisify<IKResponse<CustomMetadataField[]>>(this, customMetadataField.list)(
      getCustomMetadataFieldsOptions,
      this.options,
      callback,
    );
  }

  /**
   * Update custom metadata field
   *
   * @see {@link https://docs.imagekit.io/api-reference/custom-metadata-fields-api/update-custom-metadata-field}
   *
   * @param fieldId
   * @param updateCustomMetadataFieldOptions
   */
  updateCustomMetadataField(
    fieldId: string,
    updateCustomMetadataFieldOptions: UpdateCustomMetadataFieldOptions,
  ): Promise<IKResponse<CustomMetadataField>>;
  updateCustomMetadataField(
    fieldId: string,
    updateCustomMetadataFieldOptions: UpdateCustomMetadataFieldOptions,
    callback: IKCallback<IKResponse<CustomMetadataField>>,
  ): Promise<IKResponse<CustomMetadataField>>;
  updateCustomMetadataField(
    fieldId: string,
    updateCustomMetadataFieldOptions: UpdateCustomMetadataFieldOptions,
    callback?: IKCallback<IKResponse<CustomMetadataField>>,
  ): void | Promise<IKResponse<CustomMetadataField>> {
    return promisify<IKResponse<CustomMetadataField>>(this, customMetadataField.update)(
      fieldId,
      updateCustomMetadataFieldOptions,
      this.options,
      callback,
    );
  }

  /**
   * Delete a custom metadata field
   *
   * @see {@link https://docs.imagekit.io/api-reference/custom-metadata-fields-api/delete-custom-metadata-field}
   *
   * @param fieldId
   */
  deleteCustomMetadataField(fieldId: string): Promise<IKResponse<void>>;
  deleteCustomMetadataField(fieldId: string, callback: IKCallback<IKResponse<void>>): void;
  deleteCustomMetadataField(fieldId: string, callback?: IKCallback<IKResponse<void>>): void | Promise<IKResponse<void>> {
    return promisify<IKResponse<void>>(this, customMetadataField.deleteField)(fieldId, this.options, callback);
  }

  /**
   * Perceptual hashing allows you to construct a hash value that uniquely identifies an input image based on an image's contents. ImageKit.io metadata API returns the pHash value of an image in the response. You can use this value to find a duplicate (or similar) image by calculating the distance between the two images' pHash value.
   *
   * This SDK exposes pHashDistance function to calculate the distance between two pHash values. It accepts two pHash hexadecimal strings and returns a numeric value indicative of the level of difference between the two images.
   *
   * @see {@link https://docs.imagekit.io/api-reference/metadata-api#perceptual-hash-phash}
   *
   * @param firstPHash
   * @param secondPHash
   */
  pHashDistance(firstPHash: string, secondPHash: string): number | Error {
    return pHashUtils.pHashDistance(firstPHash, secondPHash);
  }

  /**
   * @param payload - Raw webhook request body (Encoded as UTF8 string or Buffer)
   * @param signature - Webhook signature as UTF8 encoded strings (Stored in `x-ik-signature` header of the request)
   * @param secret - Webhook secret as UTF8 encoded string [Copy from ImageKit dashboard](https://imagekit.io/dashboard/developer/webhooks)
   * @returns \{ `timestamp`: Verified UNIX epoch timestamp if signature, `event`: Parsed webhook event payload \}
   */
  verifyWebhookEvent = verifyWebhookEvent;
}

export = ImageKit;
