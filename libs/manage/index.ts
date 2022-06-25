import cache from "./cache";
import file from "./file";
import customMetadataField from "./custom-metadata-field";

export default {
  listFiles: file.listFiles,
  getFileDetails: file.getDetails,
  getFileVersions: file.getFilesVersions,
  getFileVersionDetails: file.getFileVersionDetails,
  updateFileDetails: file.updateDetails,
  getFileMetadata: file.getMetadata,
  deleteFile: file.deleteFile,
  bulkDeleteFiles: file.bulkDeleteFiles,
  deleteFileVersion: file.deleteFileVersion,
  restoreFileVersion: file.restoreFileVersion,
  bulkAddTags: file.bulkAddTags,
  bulkRemoveTags: file.bulkRemoveTags,
  bulkRemoveAITags: file.bulkRemoveAITags,
  copyFile: file.copyFile,
  moveFile: file.moveFile,
  copyFolder: file.copyFolder,
  moveFolder: file.moveFolder,
  createFolder: file.createFolder,
  deleteFolder: file.deleteFolder,
  getBulkJobStatus: file.getBulkJobStatus,
  purgeCache: cache.purgeCache,
  getPurgeCacheStatus: cache.getPurgeCacheStatus,
  createCustomMetadataField: customMetadataField.create,
  getCustomMetadataFields: customMetadataField.list,
  updateCustomMetadataField: customMetadataField.update,
  deleteCustomMetadataField: customMetadataField.deleteField,
};
