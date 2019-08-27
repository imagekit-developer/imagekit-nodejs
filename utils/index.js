var path = require("path");
var crypto = require('crypto');

var CONSTANTS = require("./constants");

module.exports.getHost = function(imagekitId, useSubdomain) {
    if(!useSubdomain) {
        return CONSTANTS.COMMON_GET_SUBDOMAIN + CONSTANTS.BASE_GET;
    } else {
        return imagekitId + CONSTANTS.BASE_GET;
    }
};

module.exports.getProtocol = function(useSecure) {
    return (useSecure ? CONSTANTS.HTTPS_PROTOCOL : CONSTANTS.HTTP_PROTOCOL);
};

module.exports.getImageUploadAPI = function(imagekitId) {
    return path.join(CONSTANTS.BASE_UPLOAD, CONSTANTS.UPLOAD_API, imagekitId);
};

module.exports.getImageUploadURLAPI = function(imagekitId) {
    return path.join(CONSTANTS.BASE_UPLOAD, CONSTANTS.UPLOAD_URL_API, imagekitId);
};

module.exports.getImageDeleteAPI = function() {
    return path.join(CONSTANTS.BASE_DASHBOARD, CONSTANTS.DELETE_API);
};

module.exports.getImagePurgeAPI = function() {
    return path.join(CONSTANTS.BASE_DASHBOARD, CONSTANTS.PURGE_API);
};

module.exports.getListMediaAPI = function() {
    return path.join(CONSTANTS.BASE_DASHBOARD, CONSTANTS.LIST_MEDIA_API);
};

module.exports.calculatePurgeSignature = function(options) {
    var message = [], strSplit = [];
    message.push({
        "key" : "url",
        "value" : options.url
    }, {
        "key" : "imagekitId",
        "value" : options.imagekitId
    });

    message.sort(function(a, b){
        return (a.key > b.key) ? 1 : -1;
    });

    for(var i in message) {
        strSplit.push(message[i]["key"]+"="+message[i]["value"]);
    }

    return crypto.createHmac('sha1', options.apiSecret).update(strSplit.join("&")).digest('hex');
};

module.exports.calculateDeleteSignature = function(options) {
    var message = [], strSplit = [];
    message.push({
        "key" : "path",
        "value" : options.path
    }, {
        "key" : "imagekitId",
        "value" : options.imagekitId
    });

    message.sort(function(a, b){
        return (a.key > b.key) ? 1 : -1;
    });

    for(var i in message) {
        strSplit.push(message[i]["key"]+"="+message[i]["value"]);
    }

    return crypto.createHmac('sha1', options.apiSecret).update(strSplit.join("&")).digest('hex');
};

module.exports.calculateListMediaSignature = function(options) {
    var message = [], strSplit = [];
    message.push({
        "key" : "skip",
        "value" : options.skip
    }, {
        "key" : "limit",
        "value" : options.limit
    }, {
        "key" : "imagekitId",
        "value" : options.imagekitId
    });

    message.sort(function(a, b){
        return (a.key > b.key) ? 1 : -1;
    });

    for(var i in message) {
        strSplit.push(message[i]["key"]+"="+message[i]["value"]);
    }

    return crypto.createHmac('sha1', options.apiSecret).update(strSplit.join("&")).digest('hex');
};

module.exports.calculateSignature = function(options) {
    var message = [], strSplit = [];
    message.push({
        "key" : "filename",
        "value" : options.filename
    }, {
        "key" : "timestamp",
        "value" : options.timestamp
    }, {
        "key" : "apiKey",
        "value" : options.apiKey
    });

    message.sort(function(a, b){
        return (a.key > b.key) ? 1 : -1;
    });
    
    for(var i in message) {
        strSplit.push(message[i]["key"]+"="+message[i]["value"]);
    }

    return crypto.createHmac('sha1', options.apiSecret).update(strSplit.join("&")).digest('hex');
};

module.exports.getInifiniteExpiry = function() {
    return CONSTANTS.INFINITE_EXPIRY_TIME;
}