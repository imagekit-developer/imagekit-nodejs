var cache = require("./cache");
var file = require("./file");

module.exports.listFiles = file.listFiles;
module.exports.getFileDetails = file.getDetails;
module.exports.updateFileDetails = file.updateDetails;
module.exports.getFileMetadata = file.getMetadata;
module.exports.deleteFile = file.deleteFile;
module.exports.bulkDeleteFiles = file.bulkDeleteFiles;
module.exports.purgeCache = cache.purgeCache;
module.exports.getPurgeCacheStatus = cache.getPurgeCacheStatus;