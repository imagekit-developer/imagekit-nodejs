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
  FileDetailsResponse,
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
} from "./libs/interfaces";
import { IKCallback } from "./libs/interfaces/IKCallback";
import manage from "./libs/manage";
import signature from "./libs/signature";
import upload from "./libs/upload";
/*
    Implementations
*/
import url from "./libs/url";
/*
    Utils
*/
import pHashUtils from "./utils/phash";
import transformationUtils from "./utils/transformation";

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
   * You can add multiple origins in the same ImageKit.io account.
   * URL endpoints allow you to configure which origins are accessible through your account and set their preference order as well.
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
   * You can upload files to ImageKit.io media library from your server-side using private API key authentication.
   *
   * File size limit
   * The maximum upload file size is limited to 25MB.
   *
   * @see {@link https://docs.imagekit.io/api-reference/upload-file-api/server-side-file-upload}
   *
   * @param uploadOptions
   */
  upload(uploadOptions: UploadOptions): Promise<UploadResponse>;
  upload(uploadOptions: UploadOptions, callback: IKCallback<UploadResponse>): void;
  upload(uploadOptions: UploadOptions, callback?: IKCallback<UploadResponse>): void | Promise<UploadResponse> {
    return promisify<UploadResponse>(this, upload)(uploadOptions, this.options, callback);
  }

  /**
   * This API can list all the uploaded files in your ImageKit.io media library.
   * For searching and filtering, you can use query parameters as described below.
   *
   * @see {@link https://docs.imagekit.io/api-reference/media-api/list-and-search-files}
   *
   * @param listFilesOptions
   */
  listFiles(listOptions: ListFileOptions): Promise<ListFileResponse[]>;
  listFiles(listOptions: ListFileOptions, callback: IKCallback<ListFileResponse[]>): void;
  listFiles(
    listOptions: ListFileOptions,
    callback?: IKCallback<ListFileResponse[]>,
  ): void | Promise<ListFileResponse[]> {
    return promisify<ListFileResponse[]>(this, manage.listFiles)(listOptions, this.options, callback);
  }

  /**
   * Get the file details such as tags, customCoordinates, and isPrivate properties using get file detail API.
   *
   * @see {@link https://docs.imagekit.io/api-reference/media-api/get-file-details}
   *
   * @param fileId
   */
  getFileDetails(fileId: string): Promise<FileDetailsResponse>;
  getFileDetails(fileId: string, callback: IKCallback<FileDetailsResponse>): void;
  getFileDetails(fileId: string, callback?: IKCallback<FileDetailsResponse>): void | Promise<FileDetailsResponse> {
    return promisify<FileDetailsResponse>(this, manage.getFileDetails)(fileId, this.options, callback);
  }

  /**
   * Get image exif, pHash and other metadata for uploaded files in ImageKit.io media library using this API.
   *
   * @see {@link https://docs.imagekit.io/api-reference/metadata-api/get-image-metadata-for-uploaded-media-files}
   *
   * @param fileId The unique fileId of the uploaded file. fileId is returned in list files API and upload API.
   */
  getFileMetadata(fileId: string): Promise<FileMetadataResponse>;
  getFileMetadata(fileId: string, callback: IKCallback<FileMetadataResponse>): void;
  getFileMetadata(fileId: string, callback?: IKCallback<FileMetadataResponse>): void | Promise<FileMetadataResponse> {
    return promisify<FileMetadataResponse>(this, manage.getFileMetadata)(fileId, this.options, callback);
  }

  /**
   * Update file details such as tags and customCoordinates attribute using update file detail API.
   *
   * @see {@link https://docs.imagekit.io/api-reference/media-api/update-file-details}
   *
   * @param fileId The unique fileId of the uploaded file. fileId is returned in list files API and upload API.
   * @param optionsFileDetails
   */
  updateFileDetails(fileId: string, updateData: FileDetailsOptions): Promise<FileDetailsResponse>;
  updateFileDetails(fileId: string, updateData: FileDetailsOptions, callback: IKCallback<FileDetailsResponse>): void;
  updateFileDetails(
    fileId: string,
    updateData: FileDetailsOptions,
    callback?: IKCallback<FileDetailsResponse>,
  ): void | Promise<FileDetailsResponse> {
    return promisify<FileDetailsResponse>(this, manage.updateFileDetails)(fileId, updateData, this.options, callback);
  }

  /**
   * Add tags to multiple files in a single request. The method accepts an array of fileIDs of the files and an array of tags that have to be added to those files.
   *
   * @see {@link https://docs.imagekit.io/api-reference/media-api/add-tags-bulk}
   *
   * @param fileIds
   * @param tags
   */
  bulkAddTags(fileIds: string[], tags: string[]): Promise<void>;
  bulkAddTags(fileIds: string[], tags: string[], callback: IKCallback<void>): void;
  bulkAddTags(fileIds: string[], tags: string[], callback?: IKCallback<void>): void | Promise<void> {
    return promisify(this, manage.bulkAddTags)(fileIds, tags, this.options, callback);
  }

  /**
   * Remove tags to multiple files in a single request. The method accepts an array of fileIDs of the files and an array of tags that have to be removed to those files.
   *
   * @see {@link https://docs.imagekit.io/api-reference/media-api/remove-tags-bulk}
   *
   * @param fileIds
   * @param tags
   */
  bulkRemoveTags(fileIds: string[], tags: string[]): void;
  bulkRemoveTags(fileIds: string[], tags: string[], callback: IKCallback<void>): void;
  bulkRemoveTags(fileIds: string[], tags: string[], callback?: IKCallback<void>): void | Promise<void> {
    return promisify(this, manage.bulkRemoveTags)(fileIds, tags, this.options, callback);
  }

  /**
   * You can programmatically delete uploaded files in media library using delete file API.
   *
   * @see {@link https://docs.imagekit.io/api-reference/media-api/delete-file}
   *
   * @param fileId The unique fileId of the uploaded file. fileId is returned in list files API and upload API
   */
  deleteFile(fileId: string): Promise<void>;
  deleteFile(fileId: string, callback: IKCallback<void>): void;
  deleteFile(fileId: string, callback?: IKCallback<void>): void | Promise<void> {
    return promisify(this, manage.deleteFile)(fileId, this.options, callback);
  }

  /**
   * This will purge CDN and ImageKit.io internal cache.
   *
   * @see {@link https://docs.imagekit.io/api-reference/media-api/purge-cache}
   *
   * @param url The exact URL of the file to be purged. For example - https://ik.imageki.io/your_imagekit_id/rest-of-the-file-path.jpg
   */
  purgeCache(url: string): Promise<PurgeCacheResponse>;
  purgeCache(url: string, callback: IKCallback<PurgeCacheResponse>): void;
  purgeCache(url: string, callback?: IKCallback<PurgeCacheResponse>): void | Promise<PurgeCacheResponse> {
    return promisify<PurgeCacheResponse>(this, manage.purgeCache)(url, this.options, callback);
  }

  /**
   * Get the status of submitted purge request.
   *
   * @see {@link https://docs.imagekit.io/api-reference/media-api/purge-cache-status}
   *
   * @param requestId The requestId returned in response of purge cache API.
   */
  getPurgeCacheStatus(requestId: string, callback: IKCallback<PurgeCacheStatusResponse>): void;
  getPurgeCacheStatus(requestId: string): Promise<PurgeCacheStatusResponse>;
  getPurgeCacheStatus(
    requestId: string,
    callback?: IKCallback<PurgeCacheStatusResponse>,
  ): void | Promise<PurgeCacheStatusResponse> {
    return promisify<PurgeCacheStatusResponse>(this, manage.getPurgeCacheStatus)(requestId, this.options, callback);
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
    callback?: IKCallback<BulkDeleteFilesResponse, BulkDeleteFilesError>,
  ): void | Promise<BulkDeleteFilesResponse>;
  bulkDeleteFiles(
    fileIdArray: string[],
    callback?: IKCallback<BulkDeleteFilesResponse, BulkDeleteFilesError>,
  ): void | Promise<BulkDeleteFilesResponse> {
    return promisify<BulkDeleteFilesResponse>(this, manage.bulkDeleteFiles)(fileIdArray, this.options, callback);
  }

  /**
   * This will copy a file from one location to another. This method accepts the source file's path and destination folder path.
   *
   * @see {@link https://docs.imagekit.io/api-reference/media-api/copy-file}
   *
   * @param sourceFilePath
   * @param destinationPath
   */
  copyFile(sourceFilePath: string, destinationPath: string): Promise<void>;
  copyFile(sourceFilePath: string, destinationPath: string, callback: IKCallback<void>): void;
  copyFile(sourceFilePath: string, destinationPath: string, callback?: IKCallback<void>): void | Promise<void> {
    return promisify(this, manage.copyFile)(sourceFilePath, destinationPath, this.options, callback);
  }

  /**
   * This will move a file from one location to another. This method accepts the source file's path and destination folder path.
   *
   * @see {@link https://docs.imagekit.io/api-reference/media-api/move-file}
   *
   * @param sourceFilePath
   * @param destinationPath
   */
  moveFile(sourceFilePath: string, destinationPath: string): Promise<void>;
  moveFile(sourceFilePath: string, destinationPath: string, callback: IKCallback<void>): void;
  moveFile(sourceFilePath: string, destinationPath: string, callback?: IKCallback<void>): void | Promise<void> {
    return promisify(this, manage.moveFile)(sourceFilePath, destinationPath, this.options, callback);
  }

  /**
   * This will create a new folder. This method accepts folder name and parent folder path.
   *
   * @see {@link https://docs.imagekit.io/api-reference/media-api/create-folder}
   *
   * @param folderName
   * @param parentFolderPath
   */
  createFolder(folderName: string, parentFolderPath: string): Promise<void>;
  createFolder(folderName: string, parentFolderPath: string, callback: IKCallback<void>): void;
  createFolder(folderName: string, parentFolderPath: string, callback?: IKCallback<void>): void | Promise<void> {
    return promisify(this, manage.createFolder)(folderName, parentFolderPath, this.options, callback);
  }

  /**
   * This will delete the specified folder and all nested files & folders. This method accepts the full path of the folder that is to be deleted.
   *
   * @see {@link https://docs.imagekit.io/api-reference/media-api/delete-folder}
   *
   * @param foldePath
   */
  deleteFolder(folderPath: string): Promise<void>;
  deleteFolder(folderPath: string, callback: IKCallback<void>): void;
  deleteFolder(folderPath: string, callback?: IKCallback<void>): void | Promise<void> {
    return promisify(this, manage.deleteFolder)(folderPath, this.options, callback);
  }

  /**
   * This will copy a folder from one location to another. This method accepts the source folder's path and destination folder path.
   *
   * @see {@link https://docs.imagekit.io/api-reference/media-api/copy-folder}
   *
   * @param sourceFolderPath
   * @param destinationPath
   */
  copyFolder(sourceFolderPath: string, destinationPath: string): Promise<CopyFolderResponse>;
  copyFolder(
    sourceFolderPath: string,
    destinationPath: string,
    callback: IKCallback<CopyFolderResponse, CopyFolderError>,
  ): void;
  copyFolder(
    sourceFolderPath: string,
    destinationPath: string,
    callback?: IKCallback<CopyFolderResponse, CopyFolderError>,
  ): void | Promise<CopyFolderResponse> {
    return promisify<CopyFolderResponse>(this, manage.copyFolder)(
      sourceFolderPath,
      destinationPath,
      this.options,
      callback,
    );
  }

  /**
   * This will move a folder from one location to another. This method accepts the source folder's path and destination folder path.
   *
   * @see {@link https://docs.imagekit.io/api-reference/media-api/move-folder}
   *
   * @param sourceFolderPath
   * @param destinationPath
   */
  moveFolder(sourceFolderPath: string, destinationPath: string): Promise<MoveFolderResponse>;
  moveFolder(
    sourceFolderPath: string,
    destinationPath: string,
    callback: IKCallback<MoveFolderResponse, MoveFolderError>,
  ): void;
  moveFolder(
    sourceFolderPath: string,
    destinationPath: string,
    callback?: IKCallback<MoveFolderResponse, MoveFolderError>,
  ): void | Promise<MoveFolderResponse> {
    return promisify<MoveFolderResponse>(this, manage.moveFolder)(
      sourceFolderPath,
      destinationPath,
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
  getBulkJobStatus(jobId: string): Promise<void>;
  getBulkJobStatus(jobId: string, callback: IKCallback<void>): Promise<void>;
  getBulkJobStatus(jobId: string, callback?: IKCallback<void>): void | Promise<void> {
    return promisify(this, manage.getBulkJobStatus)(jobId, this.options, callback);
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
}

export = ImageKit;
