var _ = require('lodash');

/*
    Utils
*/
var errorMessages = require("../../constants/errorMessages");
var respond = require("../../utils/respond");
var request = require("../../utils/request");

module.exports = function(uploadOptions, defaultOptions, callback) {
    if(!_.isObject(uploadOptions)) {
        respond(true, errorMessages.INVALID_UPLOAD_OPTIONS, callback);
        return;
    }

    if(!uploadOptions.file) {
        respond(true, errorMessages.MISSING_UPLOAD_FILE_PARAMETER, callback);
        return;
    }

    if(!uploadOptions.fileName) {
        respond(true, errorMessages.MISSING_UPLOAD_FILENAME_PARAMETER, callback);
        return;
    }

    if(typeof uploadOptions.file != "string") {
        uploadOptions.file = {
            value : uploadOptions.file,
            options: {
                'filename': uploadOptions.fileName,
                'contentType': null
            }
        };
    }

    var requestOptions = {
        url : "https://api.imagekit.io/v1/files/upload",
        method : "POST",
        formData : uploadOptions,
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