import cache from "./cache";
import file from "./file";

export default {
  listFiles: file.listFiles,
  getFileDetails: file.getDetails,
  updateFileDetails: file.updateDetails,
  getFileMetadata: file.getMetadata,
  deleteFile: file.deleteFile,
  bulkDeleteFiles: file.bulkDeleteFiles,
  bulkAddTags: file.bulkAddTags,
  bulkRemoveTags: file.bulkRemoveTags,
  copyFile: file.copyFile,
  moveFile: file.moveFile,
  copyFolder: file.copyFolder,
  moveFolder: file.moveFolder,
  createFolder: file.createFolder,
  deleteFolder: file.deleteFolder,
  getBulkJobStatus: file.getBulkJobStatus,
  purgeCache: cache.purgeCache,
  getPurgeCacheStatus: cache.getPurgeCacheStatus,
};
