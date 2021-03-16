var _ = require('lodash');

/*
    Utils
*/
var errorMessages = require("../../constants/errorMessages");
var respond = require("../../utils/respond");
var request = require("../../utils/request");

/*
    Delete a file
*/
module.exports.deleteFile = function(fileId, defaultOptions, callback) {
    if(!fileId) {
        respond(true, errorMessages.FILE_ID_MISSING, callback);
        return;
    }

    var requestOptions = {
        url : "https://api.imagekit.io/v1/files/" + fileId,
        method : "DELETE",
        json : true
    };

    request(requestOptions, defaultOptions, callback);
};

/*
    Get Metadata of a file
*/
module.exports.getMetadata = function(fileIdOrURL, defaultOptions, callback) {
    if(!fileIdOrURL || fileIdOrURL.trim () == "") {
        respond(true, errorMessages.FILE_ID_OR_URL_MISSING, callback);
        return;
    }

    var requestOptions = {
        url : "https://api.imagekit.io/v1/files/" + fileIdOrURL + "/metadata",
        method : "GET",
        json : true
    };

    // In case of URL change the endopint
    if(fileIdOrURL.indexOf("http") === 0) {
        requestOptions = {
            url : `https://api.imagekit.io/v1/metadata?url=${fileIdOrURL}`,
            method : "GET",
            json : true
        };
    }

    request(requestOptions, defaultOptions, callback);
};

/*
    Get Details of a file
*/
module.exports.getDetails = function(fileId, defaultOptions, callback) {
    if(!fileId) {
        respond(true, errorMessages.FILE_ID_MISSING, callback);
        return;
    }

    var requestOptions = {
        url : "https://api.imagekit.io/v1/files/" + fileId + "/details",
        method : "GET",
        json : true
    };

    request(requestOptions, defaultOptions, callback);
};

/*
    Update file details
*/
module.exports.updateDetails = function(fileId, updateData, defaultOptions, callback) {
    if(!fileId) {
        respond(true, errorMessages.FILE_ID_MISSING, callback);
        return;
    }

    if(!_.isObject(updateData)) {
        respond(true, errorMessages.UPDATE_DATA_MISSING, callback);
        return;
    }
    var data = {
        tags: updateData.tags,
        customCoordinates: updateData.customCoordinates
    };
    
    var requestOptions = {
        url : "https://api.imagekit.io/v1/files/" + fileId + "/details",
        method : "PATCH",
        json : data
    };

    request(requestOptions, defaultOptions, callback);
};

/*
    List files
*/
module.exports.listFiles = function(listOptions, defaultOptions, callback) {
    if(listOptions && !_.isObject(listOptions)) {
        respond(true, errorMessages.UPDATE_DATA_MISSING, callback);
        return;
    }

    var requestOptions = {
        url : "https://api.imagekit.io/v1/files/",
        method : "GET",
        qs : listOptions || {},
        json : true
    };

    request(requestOptions, defaultOptions, callback);
};

/*
    Bulk Delete By FileIds
*/
module.exports.bulkDeleteFiles = function(fileIdArray, defaultOptions, callback) {
    
    if(!Array.isArray(fileIdArray) 
        || fileIdArray.length === 0 
        || fileIdArray.filter(fileId => typeof(fileId) !== 'string').length > 0) {
        respond(true, errorMessages.INVALID_FILEIDS_VALUE, callback);
        return;
    }

    const data = {
        fileIds: fileIdArray,
    }

    const requestOptions = {
        url: "https://api.imagekit.io/v1/files/batch/deleteByFileIds",
        method: "POST",
        json: data
    }

    request(requestOptions, defaultOptions, callback);
};

/*
    Add tags in bulk
*/
module.exports.bulkAddTags = function(fileIdArray, tags, defaultOptions, callback) {
    
    if(!Array.isArray(fileIdArray) 
        || fileIdArray.length === 0 
        || fileIdArray.filter(fileId => typeof(fileId) !== 'string').length > 0) {
        respond(true, errorMessages.INVALID_FILEIDS_VALUE, callback);
        return;
    }

    if(!Array.isArray(tags) 
        || tags.length === 0 
        || tags.filter(tag => typeof(tag) !== 'string').length > 0) {
        respond(true, errorMessages.BULK_ADD_TAGS_INVALID, callback);
        return;
    }

    const data = {
        fileIds: fileIdArray,
        tags: tags
    }

    const requestOptions = {
        url: "https://api.imagekit.io/v1/files/addTags",
        method: "POST",
        json: data
    }

    request(requestOptions, defaultOptions, callback);
};

/*
    Remove tags in bulk
*/
module.exports.bulkRemoveTags = function(fileIdArray, tags, defaultOptions, callback) {
    
    if(!Array.isArray(fileIdArray) 
        || fileIdArray.length === 0 
        || fileIdArray.filter(fileId => typeof(fileId) !== 'string').length > 0) {
        respond(true, errorMessages.INVALID_FILEIDS_VALUE, callback);
        return;
    }

    if(!Array.isArray(tags) 
        || tags.length === 0 
        || tags.filter(tag => typeof(tag) !== 'string').length > 0) {
        respond(true, errorMessages.BULK_ADD_TAGS_INVALID, callback);
        return;
    }

    const data = {
        fileIds: fileIdArray,
        tags: tags
    }

    const requestOptions = {
        url: "https://api.imagekit.io/v1/files/removeTags",
        method: "POST",
        json: data
    }

    request(requestOptions, defaultOptions, callback);
};

/*
    Copy file
*/
module.exports.copyFile = function(sourceFilePath, destinationPath, defaultOptions, callback) {
    
    if(typeof(sourceFilePath) !== 'string' || sourceFilePath.length === 0) {
        respond(true, errorMessages.INVALID_SOURCE_FILE_PATH, callback);
        return;
    }

    if(typeof(destinationPath) !== 'string' || destinationPath.length === 0) {
        respond(true, errorMessages.INVALID_DESTINATION_FOLDER_PATH, callback);
        return;
    }

    const data = {
        sourceFilePath: sourceFilePath,
        destinationPath: destinationPath
    }

    const requestOptions = {
        url: "https://api.imagekit.io/v1/files/copy",
        method: "POST",
        json: data
    }

    request(requestOptions, defaultOptions, callback);
};

/*
    Move file
*/
module.exports.moveFile = function(sourceFilePath, destinationPath, defaultOptions, callback) {
    
    if(typeof(sourceFilePath) !== 'string' || sourceFilePath.length === 0) {
        respond(true, errorMessages.INVALID_SOURCE_FILE_PATH, callback);
        return;
    }

    if(typeof(destinationPath) !== 'string' || destinationPath.length === 0) {
        respond(true, errorMessages.INVALID_DESTINATION_FOLDER_PATH, callback);
        return;
    }

    const data = {
        sourceFilePath: sourceFilePath,
        destinationPath: destinationPath
    }

    const requestOptions = {
        url: "https://api.imagekit.io/v1/files/move",
        method: "POST",
        json: data
    }

    request(requestOptions, defaultOptions, callback);
};

/*
    Copy Folder
*/
module.exports.copyFolder = function(sourceFolderPath, destinationPath, defaultOptions, callback) {
    
    if(typeof(sourceFolderPath) !== 'string' || sourceFolderPath.length === 0) {
        respond(true, errorMessages.INVALID_SOURCE_FOLDER_PATH, callback);
        return;
    }

    if(typeof(destinationPath) !== 'string' || destinationPath.length === 0) {
        respond(true, errorMessages.INVALID_DESTINATION_FOLDER_PATH, callback);
        return;
    }

    const data = {
        sourceFolderPath: sourceFolderPath,
        destinationPath: destinationPath
    }

    const requestOptions = {
        url: "https://api.imagekit.io/v1/bulkJobs/copyFolder",
        method: "POST",
        json: data
    }

    request(requestOptions, defaultOptions, callback);
};

/*
    Move Folder
*/
module.exports.moveFolder = function(sourceFolderPath, destinationPath, defaultOptions, callback) {
    
    if(typeof(sourceFolderPath) !== 'string' || sourceFolderPath.length === 0) {
        respond(true, errorMessages.INVALID_SOURCE_FOLDER_PATH, callback);
        return;
    }

    if(typeof(destinationPath) !== 'string' || destinationPath.length === 0) {
        respond(true, errorMessages.INVALID_DESTINATION_FOLDER_PATH, callback);
        return;
    }

    const data = {
        sourceFolderPath: sourceFolderPath,
        destinationPath: destinationPath
    }

    const requestOptions = {
        url: "https://api.imagekit.io/v1/bulkJobs/moveFolder",
        method: "POST",
        json: data
    }

    request(requestOptions, defaultOptions, callback);
};

/*
    Create folder
*/
module.exports.createFolder = function(folderName, parentFolderPath, defaultOptions, callback) {
    
    if(typeof(folderName) !== 'string' || folderName.length === 0) {
        respond(true, errorMessages.INVALID_FOLDER_NAME, callback);
        return;
    }

    if(typeof(parentFolderPath) !== 'string' || parentFolderPath.length === 0) {
        respond(true, errorMessages.INVALID_PARENT_FOLDER_PATH, callback);
        return;
    }

    const data = {
        folderName: folderName,
        parentFolderPath: parentFolderPath
    }
    
    const requestOptions = {
        url: "https://api.imagekit.io/v1/folder",
        method: "POST",
        json: data
    }

    request(requestOptions, defaultOptions, callback);
};

/* 
    Delete folder
*/
module.exports.deleteFolder = function(folderPath, defaultOptions, callback) {

    if(typeof(folderPath) !== 'string' || folderPath.length === 0) {
        respond(true, errorMessages.INVALID_FOLDER_PATH, callback);
        return;
    }

    const data = {
        folderPath: folderPath
    }

    const requestOptions = {
        url: "https://api.imagekit.io/v1/folder",
        method: "DELETE",
        json: data
    }

    request(requestOptions, defaultOptions, callback);
};

/*
    Bulk job status
*/
module.exports.getBulkJobStatus = function(jobId, defaultOptions, callback) {

    if(!jobId) {
        respond(true, errorMessages.JOB_ID_MISSING, callback);
        return;
    }
    
    const requestOptions = {
        url : "https://api.imagekit.io/v1/bulkJobs/" + jobId,
        method : "GET",
        json : true
    };

    request(requestOptions, defaultOptions, callback);
};