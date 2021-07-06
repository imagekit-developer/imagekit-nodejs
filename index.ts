/*
    Helper Modules
*/
import _ from "lodash";

/*
    Implementations
*/
import url from "./libs/url";
import upload from "./libs/upload";
import manage from "./libs/manage";
import signature from "./libs/signature";

/*
    Utils
*/
import pHashUtils from "./utils/phash";
import transformationUtils from "./utils/transformation";
import errorMessages from "./libs/constants/errorMessages";

import { IKCallback } from "./libs/interfaces/IKCallback";
import { 
	IImageKit, 
	ImageKitOptions, 
	UploadOptions, 
	UploadResponse, 
	UrlOptions,
	ListFileOptions, ListFileResponse,
	FileDetailsOptions, FileDetailsResponse,
	FileMetadataResponse,
	PurgeCacheResponse, PurgeCacheStatusResponse,
	BulkDeleteFilesResponse, BulkDeleteFilesError,
} from "./libs/interfaces";

var ImageKit = function(
	this: IImageKit,
	opts: ImageKitOptions,
  ) {
    opts = opts || {};
    this.options = {
        publicKey : "",
        privateKey : "",
        urlEndpoint : "",
        transformationPosition : transformationUtils.getDefault()
    };

    this.options = _.extend(this.options, opts);
    if(!this.options.publicKey) {
        throw new Error(errorMessages.MANDATORY_PUBLIC_KEY_MISSING.message);
    }
    if(!this.options.privateKey) {
        throw new Error(errorMessages.MANDATORY_PRIVATE_KEY_MISSING.message);
    }
    if(!this.options.urlEndpoint) {
        throw new Error(errorMessages.MANDATORY_URL_ENDPOINT_KEY_MISSING.message);
    }

    const promisify = function<T>(f : Function) {
        return function(this: IImageKit, ...args: any[]) : Promise<T> | undefined {
            const self = this;
            if (args.length === f.length) {
                if (typeof args[args.length-1] !== 'function') {
                    throw new Error('Callback must be a function.')
                }
                f.call(self, ...args)
            } else {
                return new Promise<T>((resolve, reject) => {
                    const callback = function(err : Error, ...results : any[]) {
                        if (err) {
                            return reject(err);
                        } else {
                            resolve(results.length > 1 ? results : results[0])
                        }
                    }
                    args.push(callback);
                    f.call(self, ...args);
                });
            }
        }
    }

    /*
        URL Builder
    */
    this.url = function(urlOptions : UrlOptions): string {
        return url(urlOptions, this.options);
    };

    /*
        Upload API
    */

    this.upload = promisify(function(			
		this: IImageKit,
		uploadOptions: UploadOptions, 
		callback?: IKCallback<UploadResponse>
	) : void | Promise<UploadResponse> {
		return upload(uploadOptions, this.options, callback);
	});

    /*
        Image Management APIs
    */

    // List and Search Files API
    this.listFiles = promisify(function(
		this: IImageKit,
		listOptions: ListFileOptions, 
		callback?: IKCallback<ListFileResponse>
	) : void | Promise<ListFileResponse> {
        return manage.listFiles(listOptions, this.options, callback);
    });

    // Get File Details API
    this.getFileDetails = promisify(function(
		this: IImageKit,
		fileId: string, 
		callback?: IKCallback<FileDetailsResponse>
	) : void | Promise<FileDetailsResponse> {
        return manage.getFileDetails(fileId, this.options, callback);
    });

    // Get File Metadata API
    this.getFileMetadata = promisify(function(
		this: IImageKit,
		fileId: string, 
		callback?: IKCallback<FileMetadataResponse>
	) : void | Promise<FileMetadataResponse> {
        return manage.getFileMetadata(fileId, this.options, callback);
    });

    // Update File Details API
    this.updateFileDetails = promisify(function(
		this: IImageKit,
		fileId: string, 
		updateData: FileDetailsOptions,
		callback?: IKCallback<FileDetailsResponse>
	) : void | Promise<FileDetailsResponse> {
        return manage.updateFileDetails(fileId, updateData, this.options, callback);
    });

    // Add bulk tags
    this.bulkAddTags = promisify(function(
		this: IImageKit,
		fileIds: string[],
		tags: string[],
		callback?: IKCallback<void>
	) : void | Promise<void> {
        return manage.bulkAddTags(fileIds, tags, this.options, callback);
    });

    // Remove bulk tags
    this.bulkRemoveTags = promisify(function(
		this: IImageKit,
		fileIds: string[],
		tags: string[],
		callback?: IKCallback<void>
	) : void | Promise<void> {
        return manage.bulkRemoveTags(fileIds, tags, this.options, callback);
    });

    // Delete File API
    this.deleteFile = promisify(function(
		this: IImageKit,
		fileId: string, 
		callback?: IKCallback<void>
	) : void | Promise<void> {
        return manage.deleteFile(fileId, this.options, callback);
    });

    // Purge Cache API
    this.purgeCache = promisify(function(
		this: IImageKit,
		url: string, 
		callback?: IKCallback<PurgeCacheResponse>
	) : void | Promise<PurgeCacheResponse> {
        return manage.purgeCache(url, this.options, callback);
    });

    // Purge Cache Status API
    this.getPurgeCacheStatus = promisify(function(
		this: IImageKit,
		requestId: string, 
		callback?: IKCallback<PurgeCacheStatusResponse>
	) : void | Promise<PurgeCacheStatusResponse> {
        return manage.getPurgeCacheStatus(requestId, this.options, callback);
    });

    this.bulkDeleteFiles = promisify(function(
		this: IImageKit,
		fileIdArray: string[], 
		callback?: IKCallback<BulkDeleteFilesResponse, BulkDeleteFilesError>
	) : void | Promise<BulkDeleteFilesResponse> {
        return manage.bulkDeleteFiles(fileIdArray, this.options, callback);
    });

    // Copy files API
    this.copyFile = promisify(function(
		this: IImageKit,
		sourceFilePath: string, 
		destinationPath: string, 
		callback?: IKCallback<void>
	) : void | Promise<void> {
        return manage.copyFile(sourceFilePath, destinationPath, this.options, callback);
    });

    // Move files API
    this.moveFile = promisify(function(
		this: IImageKit,
		sourceFilePath: string, 
		destinationPath: string, 
		callback?: IKCallback<void>
	) : void | Promise<void> {
        return manage.moveFile(sourceFilePath, destinationPath, this.options, callback);
    });

    // Create folder API
    this.createFolder = promisify(function(
		this: IImageKit,
		folderName: string, 
		parentFolderPath: string,
		callback?: IKCallback<void>
	) {
        return manage.createFolder(folderName, parentFolderPath, this.options, callback);
    });

    // Delete folder API
    this.deleteFolder = promisify(function(
		this: IImageKit,
		folderPath: string, 
		callback?: IKCallback<void>
	) {
        return manage.deleteFolder(folderPath, this.options, callback);
    });

    // Copy folder API
    this.copyFolder = promisify(function(
		this: IImageKit,
		sourceFolderPath: string,
		destinationPath: string,
		callback?: IKCallback<void>
	) : void | Promise<void> {
        return manage.copyFolder(sourceFolderPath, destinationPath, this.options, callback);
    });

    // Move folder API
    this.moveFolder = promisify(function(
		this: IImageKit,
		sourceFolderPath: string,
		destinationPath: string,
		callback?: IKCallback<void>
	) : void | Promise<void> {
        return manage.moveFolder(sourceFolderPath, destinationPath, this.options, callback);
    });

    // To generate Signature for upload request
    this.getAuthenticationParameters = function(
		this: IImageKit,
		token?: string, 
		expire?: number
	) : { token: string, expire: number, signature: string} {
        return signature.getAuthenticationParameters(token, expire, this.options);   
    };

    // Get bulk job status API
    this.getBulkJobStatus = promisify(function(
		this: IImageKit,
		jobId: string, 
		callback?: IKCallback<void>
	) : void | Promise<void> {
        return manage.getBulkJobStatus(jobId, this.options, callback);
    });

    // To calculate distance between two pHash strings
    this.pHashDistance = function(
		this: IImageKit,
		firstPHash: string,
		secondPHash: string
	) : number | Error {
        return pHashUtils.pHashDistance(firstPHash, secondPHash);
    }
};

export = ImageKit;