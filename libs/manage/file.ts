import _ from "lodash";

/*
	Constants
*/
import errorMessages from "../constants/errorMessages";

/*
    Utils
*/
import respond from "../../utils/respond";
import request from "../../utils/request";

/*
	Interfaces
*/
import { IKCallback } from "../interfaces/IKCallback";
import {
  ImageKitOptions,
  ListFileOptions,
  ListFileResponse,
  FileDetailsOptions,
  FileDetailsResponse,
  FileMetadataResponse,
  BulkDeleteFilesResponse,
  BulkDeleteFilesError,
} from "../interfaces/";

/*
    Delete a file
*/
const deleteFile = function (fileId: string, defaultOptions: ImageKitOptions, callback?: IKCallback<void>) {
  if (!fileId) {
    respond(true, errorMessages.FILE_ID_MISSING, callback);
    return;
  }

  var requestOptions = {
    url: "https://api.imagekit.io/v1/files/" + fileId,
    method: "DELETE",
    json: true,
  };

  request(requestOptions, defaultOptions, callback);
};

/*
    Get Metadata of a file
*/
const getMetadata = function (
  fileIdOrURL: string,
  defaultOptions: ImageKitOptions,
  callback?: IKCallback<FileMetadataResponse>,
) {
  if (!fileIdOrURL || fileIdOrURL.trim() == "") {
    respond(true, errorMessages.FILE_ID_OR_URL_MISSING, callback);
    return;
  }

  var requestOptions = {
    url: "https://api.imagekit.io/v1/files/" + fileIdOrURL + "/metadata",
    method: "GET",
    json: true,
  };

  // In case of URL change the endopint
  if (fileIdOrURL.indexOf("http") === 0) {
    requestOptions = {
      url: `https://api.imagekit.io/v1/metadata?url=${fileIdOrURL}`,
      method: "GET",
      json: true,
    };
  }

  request(requestOptions, defaultOptions, callback);
};

/*
    Get Details of a file
*/
const getDetails = function (
  fileId: string,
  defaultOptions: ImageKitOptions,
  callback?: IKCallback<FileDetailsResponse>,
) {
  if (!fileId) {
    respond(true, errorMessages.FILE_ID_MISSING, callback);
    return;
  }

  var requestOptions = {
    url: "https://api.imagekit.io/v1/files/" + fileId + "/details",
    method: "GET",
    json: true,
  };

  request(requestOptions, defaultOptions, callback);
};

/*
    Update file details
*/
const updateDetails = function (
  fileId: string,
  updateData: FileDetailsOptions,
  defaultOptions: ImageKitOptions,
  callback?: IKCallback<FileDetailsResponse>,
) {
  if (!fileId) {
    respond(true, errorMessages.FILE_ID_MISSING, callback);
    return;
  }

  if (!_.isObject(updateData)) {
    respond(true, errorMessages.UPDATE_DATA_MISSING, callback);
    return;
  }
  var data = {
    tags: updateData.tags,
    customCoordinates: updateData.customCoordinates,
    extensions: updateData.extensions,
    webhookUrl: updateData.webhookUrl
  };

  var requestOptions = {
    url: "https://api.imagekit.io/v1/files/" + fileId + "/details",
    method: "PATCH",
    json: data,
  };

  request(requestOptions, defaultOptions, callback);
};

/*
    List files
*/
const listFiles = function (
  listOptions: ListFileOptions,
  defaultOptions: ImageKitOptions,
  callback?: IKCallback<ListFileResponse[]>,
) {
  if (listOptions && !_.isObject(listOptions)) {
    respond(true, errorMessages.UPDATE_DATA_MISSING, callback);
    return;
  }

  var requestOptions = {
    url: "https://api.imagekit.io/v1/files/",
    method: "GET",
    qs: listOptions || {},
    json: true,
  };

  request(requestOptions, defaultOptions, callback);
};

/*
    Bulk Delete By FileIds
*/
const bulkDeleteFiles = function (
  fileIdArray: string[],
  defaultOptions: ImageKitOptions,
  callback?: IKCallback<BulkDeleteFilesResponse, BulkDeleteFilesError>,
) {
  if (
    !Array.isArray(fileIdArray) ||
    fileIdArray.length === 0 ||
    fileIdArray.filter((fileId) => typeof fileId !== "string").length > 0
  ) {
    respond(true, errorMessages.INVALID_FILEIDS_VALUE, callback);
    return;
  }

  const data = {
    fileIds: fileIdArray,
  };

  const requestOptions = {
    url: "https://api.imagekit.io/v1/files/batch/deleteByFileIds",
    method: "POST",
    json: data,
  };

  request(requestOptions, defaultOptions, callback);
};

/*
    Add tags in bulk
*/
const bulkAddTags = function (
  fileIdArray: string[],
  tags: string[],
  defaultOptions: ImageKitOptions,
  callback?: IKCallback<void>,
) {
  if (
    !Array.isArray(fileIdArray) ||
    fileIdArray.length === 0 ||
    fileIdArray.filter((fileId) => typeof fileId !== "string").length > 0
  ) {
    respond(true, errorMessages.INVALID_FILEIDS_VALUE, callback);
    return;
  }

  if (!Array.isArray(tags) || tags.length === 0 || tags.filter((tag) => typeof tag !== "string").length > 0) {
    respond(true, errorMessages.BULK_ADD_TAGS_INVALID, callback);
    return;
  }

  const data = {
    fileIds: fileIdArray,
    tags: tags,
  };

  const requestOptions = {
    url: "https://api.imagekit.io/v1/files/addTags",
    method: "POST",
    json: data,
  };

  request(requestOptions, defaultOptions, callback);
};

/*
    Remove tags in bulk
*/
const bulkRemoveTags = function (
  fileIdArray: string[],
  tags: string[],
  defaultOptions: ImageKitOptions,
  callback?: IKCallback<void>,
) {
  if (
    !Array.isArray(fileIdArray) ||
    fileIdArray.length === 0 ||
    fileIdArray.filter((fileId) => typeof fileId !== "string").length > 0
  ) {
    respond(true, errorMessages.INVALID_FILEIDS_VALUE, callback);
    return;
  }

  if (!Array.isArray(tags) || tags.length === 0 || tags.filter((tag) => typeof tag !== "string").length > 0) {
    respond(true, errorMessages.BULK_ADD_TAGS_INVALID, callback);
    return;
  }

  const data = {
    fileIds: fileIdArray,
    tags: tags,
  };

  const requestOptions = {
    url: "https://api.imagekit.io/v1/files/removeTags",
    method: "POST",
    json: data,
  };

  request(requestOptions, defaultOptions, callback);
};

/*
    Copy file
*/
const copyFile = function (
  sourceFilePath: string,
  destinationPath: string,
  defaultOptions: ImageKitOptions,
  callback?: IKCallback<void>,
) {
  if (typeof sourceFilePath !== "string" || sourceFilePath.length === 0) {
    respond(true, errorMessages.INVALID_SOURCE_FILE_PATH, callback);
    return;
  }

  if (typeof destinationPath !== "string" || destinationPath.length === 0) {
    respond(true, errorMessages.INVALID_DESTINATION_FOLDER_PATH, callback);
    return;
  }

  const data = {
    sourceFilePath: sourceFilePath,
    destinationPath: destinationPath,
  };

  const requestOptions = {
    url: "https://api.imagekit.io/v1/files/copy",
    method: "POST",
    json: data,
  };

  request(requestOptions, defaultOptions, callback);
};

/*
    Move file
*/
const moveFile = function (
  sourceFilePath: string,
  destinationPath: string,
  defaultOptions: ImageKitOptions,
  callback?: IKCallback<void>,
) {
  if (typeof sourceFilePath !== "string" || sourceFilePath.length === 0) {
    respond(true, errorMessages.INVALID_SOURCE_FILE_PATH, callback);
    return;
  }

  if (typeof destinationPath !== "string" || destinationPath.length === 0) {
    respond(true, errorMessages.INVALID_DESTINATION_FOLDER_PATH, callback);
    return;
  }

  const data = {
    sourceFilePath: sourceFilePath,
    destinationPath: destinationPath,
  };

  const requestOptions = {
    url: "https://api.imagekit.io/v1/files/move",
    method: "POST",
    json: data,
  };

  request(requestOptions, defaultOptions, callback);
};

/*
    Copy Folder
*/
const copyFolder = function (
  sourceFolderPath: string,
  destinationPath: string,
  defaultOptions: ImageKitOptions,
  callback?: IKCallback<void>,
) {
  if (typeof sourceFolderPath !== "string" || sourceFolderPath.length === 0) {
    respond(true, errorMessages.INVALID_SOURCE_FOLDER_PATH, callback);
    return;
  }

  if (typeof destinationPath !== "string" || destinationPath.length === 0) {
    respond(true, errorMessages.INVALID_DESTINATION_FOLDER_PATH, callback);
    return;
  }

  const data = {
    sourceFolderPath: sourceFolderPath,
    destinationPath: destinationPath,
  };

  const requestOptions = {
    url: "https://api.imagekit.io/v1/bulkJobs/copyFolder",
    method: "POST",
    json: data,
  };

  request(requestOptions, defaultOptions, callback);
};

/*
    Move Folder
*/
const moveFolder = function (
  sourceFolderPath: string,
  destinationPath: string,
  defaultOptions: ImageKitOptions,
  callback?: IKCallback<void>,
) {
  if (typeof sourceFolderPath !== "string" || sourceFolderPath.length === 0) {
    respond(true, errorMessages.INVALID_SOURCE_FOLDER_PATH, callback);
    return;
  }

  if (typeof destinationPath !== "string" || destinationPath.length === 0) {
    respond(true, errorMessages.INVALID_DESTINATION_FOLDER_PATH, callback);
    return;
  }

  const data = {
    sourceFolderPath: sourceFolderPath,
    destinationPath: destinationPath,
  };

  const requestOptions = {
    url: "https://api.imagekit.io/v1/bulkJobs/moveFolder",
    method: "POST",
    json: data,
  };

  request(requestOptions, defaultOptions, callback);
};

/*
    Create folder
*/
const createFolder = function (
  folderName: string,
  parentFolderPath: string,
  defaultOptions: ImageKitOptions,
  callback?: IKCallback<void>,
) {
  if (typeof folderName !== "string" || folderName.length === 0) {
    respond(true, errorMessages.INVALID_FOLDER_NAME, callback);
    return;
  }

  if (typeof parentFolderPath !== "string" || parentFolderPath.length === 0) {
    respond(true, errorMessages.INVALID_PARENT_FOLDER_PATH, callback);
    return;
  }

  const data = {
    folderName: folderName,
    parentFolderPath: parentFolderPath,
  };

  const requestOptions = {
    url: "https://api.imagekit.io/v1/folder",
    method: "POST",
    json: data,
  };

  request(requestOptions, defaultOptions, callback);
};

/* 
    Delete folder
*/
const deleteFolder = function (folderPath: string, defaultOptions: ImageKitOptions, callback?: IKCallback<void>) {
  if (typeof folderPath !== "string" || folderPath.length === 0) {
    respond(true, errorMessages.INVALID_FOLDER_PATH, callback);
    return;
  }

  const data = {
    folderPath: folderPath,
  };

  const requestOptions = {
    url: "https://api.imagekit.io/v1/folder",
    method: "DELETE",
    json: data,
  };

  request(requestOptions, defaultOptions, callback);
};

/*
    Bulk job status
*/
const getBulkJobStatus = function (jobId: string, defaultOptions: ImageKitOptions, callback?: IKCallback<void>) {
  if (!jobId) {
    respond(true, errorMessages.JOB_ID_MISSING, callback);
    return;
  }

  const requestOptions = {
    url: "https://api.imagekit.io/v1/bulkJobs/" + jobId,
    method: "GET",
    json: true,
  };

  request(requestOptions, defaultOptions, callback);
};

export default {
  deleteFile,
  getMetadata,
  getDetails,
  updateDetails,
  listFiles,
  bulkDeleteFiles,
  bulkAddTags,
  bulkRemoveTags,
  copyFile,
  moveFile,
  copyFolder,
  moveFolder,
  createFolder,
  deleteFolder,
  getBulkJobStatus,
};
