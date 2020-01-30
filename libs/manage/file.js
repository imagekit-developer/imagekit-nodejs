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

    request(requestOptions, defaultOptions, function(err, response, body) {
        if(err) {
            respond(true, err, callback);
            return;
        }

        respond(false, body, callback);
    });
};

/*
    Get Metadata of a file
*/
module.exports.getMetadata = function(fileId, defaultOptions, callback) {
    if(!fileId) {
        respond(true, errorMessages.FILE_ID_MISSING, callback);
        return;
    }
    var requestOptions = {
        url : "https://api.imagekit.io/v1/files/" + fileId + "/metadata",
        method : "GET",
        json : true
    };

    request(requestOptions, defaultOptions, function(err, response, body) {
        if(err) {
            respond(true, err, callback);
            return;
        }

        respond(false, body, callback);
    });
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

    request(requestOptions, defaultOptions, function(err, response, body) {
        if(err) {
            respond(true, err, callback);
            return;
        }

        respond(false, body, callback);
    });
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
    var data = {};
    if(updateData.tags !== null 
        && !(updateData.tags && Array.isArray(updateData.tags))
        && (typeof updateData.tags !== "undefined")
    ) {
        respond(true, errorMessages.UPDATE_DATA_TAGS_INVALID, callback);
        return;
    } else {
        data.tags = updateData.tags;
    }

    if(updateData.customCoordinates !== null 
        && !(updateData.customCoordinates && typeof updateData.customCoordinates === "string")
        && (typeof updateData.customCoordinates !== "undefined")
    ) {
        respond(true, errorMessages.UPDATE_DATA_COORDS_INVALID, callback);
        return;
    } else {
        data.customCoordinates = updateData.customCoordinates;
    }

    var requestOptions = {
        url : "https://api.imagekit.io/v1/files/" + fileId + "/details",
        method : "PATCH",
        json : data
    };

    request(requestOptions, defaultOptions, function(err, response, body) {
        if(err) {
            respond(true, err, callback);
            return;
        }

        respond(false, body, callback);
    });
};

/*
    List files
*/
module.exports.listFiles = function(listOptions, defaultOptions, callback) {
    if(!_.isObject(listOptions)) {
        respond(true, errorMessages.UPDATE_DATA_MISSING, callback);
        return;
    }

    var requestOptions = {
        url : "https://api.imagekit.io/v1/files/",
        method : "GET",
        qs : listOptions,
        json : true
    };

    request(requestOptions, defaultOptions, function(err, response, body) {
        if(err) {
            respond(true, err, callback);
            return;
        }

        respond(false, body, callback);
    });
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

    request(requestOptions, defaultOptions, function(err, response, body) {
        if(err) {
            respond(true, err, callback);
            return;
        }

        respond(false, body, callback)
    });
};