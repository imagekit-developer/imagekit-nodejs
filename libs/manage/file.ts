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
  FileVersionDetailsOptions,
  FileObject,
  FileMetadataResponse,
  BulkDeleteFilesResponse,
  BulkDeleteFilesError,
  CopyFileOptions,
  CopyFolderResponse,
  MoveFileOptions,
  CreateFolderOptions,
  CopyFolderOptions,
  MoveFolderOptions,
  DeleteFileVersionOptions,
  RestoreFileVersionOptions,
  RenameFileOptions,
  RenameFileResponse,
} from "../interfaces/";
import ImageKit from "../..";

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
    method: "DELETE"
  };

  request(requestOptions, defaultOptions, callback);
};


/*
    Delete a file version
*/
const deleteFileVersion = function (deleteFileVersionOptions: DeleteFileVersionOptions, defaultOptions: ImageKitOptions, callback?: IKCallback<void>) {
  const { fileId, versionId } = deleteFileVersionOptions || {};
  if (!fileId) {
    respond(true, errorMessages.FILE_ID_MISSING, callback);
    return;
  }

  if (!versionId) {
    respond(true, errorMessages.FILE_VERSION_ID_MISSING, callback);
    return;
  }

  var requestOptions = {
    url: `https://api.imagekit.io/v1/files/${fileId}/versions/${versionId}`,
    method: "DELETE"
  };

  request(requestOptions, defaultOptions, callback);
};


/*
    Restore a file version as the current version
*/
const restoreFileVersion = function (
  restoreFileVersionOptions: RestoreFileVersionOptions,
  defaultOptions: ImageKitOptions,
  callback?: IKCallback<FileObject>) {
  const { fileId, versionId } = restoreFileVersionOptions || {};
  if (!fileId) {
    respond(true, errorMessages.FILE_ID_MISSING, callback);
    return;
  }

  if (!versionId) {
    respond(true, errorMessages.FILE_VERSION_ID_MISSING, callback);
    return;
  }

  var requestOptions = {
    url: `https://api.imagekit.io/v1/files/${fileId}/versions/${versionId}/restore`,
    method: "PUT"
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
    method: "GET"
  };

  // In case of URL change the endopint
  if (fileIdOrURL.indexOf("http") === 0) {
    requestOptions = {
      url: `https://api.imagekit.io/v1/metadata?url=${fileIdOrURL}`,
      method: "GET"
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
  callback?: IKCallback<FileObject>,
) {
  if (!fileId) {
    respond(true, errorMessages.FILE_ID_MISSING, callback);
    return;
  }

  var requestOptions = {
    url: "https://api.imagekit.io/v1/files/" + fileId + "/details",
    method: "GET"
  };

  request(requestOptions, defaultOptions, callback);
};


/*
    Get Details of a file version
*/
const getFileVersionDetails = function (
  fileDetailsOptions: FileVersionDetailsOptions,
  defaultOptions: ImageKitOptions,
  callback?: IKCallback<FileObject>,
) {
  const { fileId, versionId } = fileDetailsOptions || {};
  if (!fileId) {
    respond(true, errorMessages.FILE_ID_MISSING, callback);
    return;
  }

  if (!versionId) {
    respond(true, errorMessages.FILE_VERSION_ID_MISSING, callback);
    return;
  }

  var requestOptions = {
    url: `https://api.imagekit.io/v1/files/${fileId}/versions/${versionId}`,
    method: "GET"
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
  callback?: IKCallback<FileObject>,
) {
  if (!fileId) {
    respond(true, errorMessages.FILE_ID_MISSING, callback);
    return;
  }

  if (!_.isObject(updateData)) {
    respond(true, errorMessages.UPDATE_DATA_MISSING, callback);
    return;
  }

  var data = {};
  data = {
    tags: updateData.tags,
    customCoordinates: updateData.customCoordinates,
    extensions: updateData.extensions,
    webhookUrl: updateData.webhookUrl,
    customMetadata: updateData.customMetadata,
  };

  if (updateData.publish)
    data = {
      ...data,
      publish: updateData.publish,
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
  callback?: IKCallback<FileObject[]>,
) {
  if (listOptions && !_.isObject(listOptions)) {
    respond(true, errorMessages.INVALID_LIST_OPTIONS, callback);
    return;
  }

  if (listOptions && listOptions.tags && _.isArray(listOptions.tags) && listOptions.tags.length) {
    listOptions.tags = listOptions.tags.join(",");
  }

  var requestOptions = {
    url: `https://api.imagekit.io/v1/files/`,
    method: "GET",
    qs: listOptions || {}
  };

  request(requestOptions, defaultOptions, callback);
};


/*
    Get all versions of an asset
*/
const getFilesVersions = function (
  fileId: string,
  defaultOptions: ImageKitOptions,
  callback?: IKCallback<FileObject[]>,
) {
  if (!fileId) {
    respond(true, errorMessages.FILE_ID_MISSING, callback);
    return;
  }

  var requestOptions = {
    url: `https://api.imagekit.io/v1/files/${fileId}/versions`,
    method: "GET"
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
    Remove AI tags in bulk
*/
const bulkRemoveAITags = function (
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
    AITags: tags,
  };

  const requestOptions = {
    url: "https://api.imagekit.io/v1/files/removeAITags",
    method: "POST",
    json: data,
  };

  request(requestOptions, defaultOptions, callback);
};

/*
    Copy file
*/
const copyFile = function (
  copyFileOptions: CopyFileOptions,
  defaultOptions: ImageKitOptions,
  callback?: IKCallback<void>,
) {
  const { sourceFilePath, destinationPath, includeFileVersions = false } = copyFileOptions;

  if (typeof sourceFilePath !== "string" || sourceFilePath.length === 0) {
    respond(true, errorMessages.INVALID_SOURCE_FILE_PATH, callback);
    return;
  }

  if (typeof destinationPath !== "string" || destinationPath.length === 0) {
    respond(true, errorMessages.INVALID_DESTINATION_FOLDER_PATH, callback);
    return;
  }

  if (typeof includeFileVersions !== "boolean") {
    respond(true, errorMessages.INVALID_INCLUDE_VERSION, callback);
    return;
  }

  const data = {
    sourceFilePath,
    destinationPath,
    includeFileVersions
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
  moveFileOptions: MoveFileOptions,
  defaultOptions: ImageKitOptions,
  callback?: IKCallback<void>,
) {
  const { sourceFilePath, destinationPath } = moveFileOptions;
  if (typeof sourceFilePath !== "string" || sourceFilePath.length === 0) {
    respond(true, errorMessages.INVALID_SOURCE_FILE_PATH, callback);
    return;
  }

  if (typeof destinationPath !== "string" || destinationPath.length === 0) {
    respond(true, errorMessages.INVALID_DESTINATION_FOLDER_PATH, callback);
    return;
  }

  const data = {
    sourceFilePath,
    destinationPath
  };

  const requestOptions = {
    url: "https://api.imagekit.io/v1/files/move",
    method: "POST",
    json: data,
  };

  request(requestOptions, defaultOptions, callback);
};

/*
    Rename file
*/
const renameFile = function (
  renameFileOptions: RenameFileOptions,
  defaultOptions: ImageKitOptions,
  callback?: IKCallback<RenameFileResponse>,
) {
  const { filePath, newFileName, purgeCache = false } = renameFileOptions;
  if (typeof filePath !== "string" || filePath.length === 0) {
    respond(true, errorMessages.INVALID_FILE_PATH, callback);
    return;
  }

  if (typeof newFileName !== "string" || newFileName.length === 0) {
    respond(true, errorMessages.INVALID_NEW_FILE_NAME, callback);
    return;
  }

  if (typeof purgeCache !== "boolean") {
    respond(true, errorMessages.INVALID_PURGE_CACHE, callback);
    return;
  }

  const data = {
    filePath,
    newFileName,
    purgeCache
  };

  const requestOptions = {
    url: "https://api.imagekit.io/v1/files/rename",
    method: "PUT",
    json: data,
  };

  request(requestOptions, defaultOptions, callback);
};

/*
    Copy Folder
*/
const copyFolder = function (
  copyFolderOptions: CopyFolderOptions,
  defaultOptions: ImageKitOptions,
  callback?: IKCallback<CopyFolderResponse>,
) {
  const { sourceFolderPath, destinationPath, includeFileVersions = false } = copyFolderOptions;
  if (typeof sourceFolderPath !== "string" || sourceFolderPath.length === 0) {
    respond(true, errorMessages.INVALID_SOURCE_FOLDER_PATH, callback);
    return;
  }

  if (typeof destinationPath !== "string" || destinationPath.length === 0) {
    respond(true, errorMessages.INVALID_DESTINATION_FOLDER_PATH, callback);
    return;
  }

  if (typeof includeFileVersions !== "boolean") {
    respond(true, errorMessages.INVALID_INCLUDE_VERSION, callback);
    return;
  }

  const data = {
    sourceFolderPath,
    destinationPath,
    includeFileVersions
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
  moveFolderOptions: MoveFolderOptions,
  defaultOptions: ImageKitOptions,
  callback?: IKCallback<void>,
) {
  const { sourceFolderPath, destinationPath } = moveFolderOptions;

  if (typeof sourceFolderPath !== "string" || sourceFolderPath.length === 0) {
    respond(true, errorMessages.INVALID_SOURCE_FOLDER_PATH, callback);
    return;
  }

  if (typeof destinationPath !== "string" || destinationPath.length === 0) {
    respond(true, errorMessages.INVALID_DESTINATION_FOLDER_PATH, callback);
    return;
  }

  const data = {
    sourceFolderPath,
    destinationPath,
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
  createFolderOptions: CreateFolderOptions,
  defaultOptions: ImageKitOptions,
  callback?: IKCallback<void>,
) {
  const { folderName, parentFolderPath } = createFolderOptions;
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
    method: "GET"
  };

  request(requestOptions, defaultOptions, callback);
};

export default {
  deleteFile,
  getMetadata,
  getDetails,
  getFileVersionDetails,
  updateDetails,
  listFiles,
  getFilesVersions,
  bulkDeleteFiles,
  deleteFileVersion,
  restoreFileVersion,
  bulkAddTags,
  bulkRemoveTags,
  bulkRemoveAITags,
  copyFile,
  moveFile,
  renameFile,
  copyFolder,
  moveFolder,
  createFolder,
  deleteFolder,
  getBulkJobStatus,
};
