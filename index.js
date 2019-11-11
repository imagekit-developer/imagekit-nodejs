/*
    Helper Modules
*/
var _ = require('lodash');

/*
    Implementations
*/
var url = require('./libs/url');
var upload = require('./libs/upload');
var manage = require('./libs/manage');
var signature = require('./libs/signature');

/*
    Utils
*/
var pHashUtils = require('./utils/phash');
var transformationUtils = require('./utils/transformation');
var errorMessages = require("./constants/errorMessages");

var ImageKit = function(opts) {
    opts = opts || {};
    this.options = {
        publicKey : "",
        privateKey : "",
        urlEndpoint : "",
        transformationPosition : transformationUtils.getDefault()
    };

    this.options = _.extend(this.options, opts);
    if(!mandatoryParametersAvailable(this.options)) {
        throw new Error(errorMessages.MANDATORY_INITIALIZATION_MISSING.message);
    }

    if(!transformationUtils.validParameters(this.options)) {
        throw new Error(errorMessages.INVALID_TRANSFORMATION_POSITION.message);
    }

    /*
        URL Builder
    */
    this.url = function(urlOptions) {
        return url(urlOptions, this.options);
    };

    /*
        Upload API
    */
    this.upload = function(uploadOptions, callback) {
        return upload(uploadOptions, this.options, callback);
    };

    /*
        Image Management APIs
    */

    // List and Search Files API
    this.listFiles = function(listOptions, callback) {
        return manage.listFiles(listOptions, this.options, callback);
    };

    // Get File Details API
    this.getFileDetails = function(fileId, callback) {
        return manage.getFileDetails(fileId, this.options, callback);
    };

    // Get File Metadata API
    this.getFileMetadata = function(fileId, callback) {
        return manage.getFileMetadata(fileId, this.options, callback);
    };

    // Update File Details API
    this.updateFileDetails = function(fileId, updateData, callback) {
        return manage.updateFileDetails(fileId, updateData, this.options, callback);
    };

    // Delete File API
    this.deleteFile = function(fileId, callback) {
        return manage.deleteFile(fileId, this.options, callback);
    };

    // Purge Cache API
    this.purgeCache = function(url, callback) {
        return manage.purgeCache(url, this.options, callback);
    };

    // Purge Cache Status API
    this.getPurgeCacheStatus = function(requestId, callback) {
        return manage.getPurgeCacheStatus(requestId, this.options, callback);
    };
    
    // To generate Signature for upload request
    this.getAuthenticationParameters = function(token, timestamp) {
        return signature.getAuthenticationParameters(token, timestamp, this.options);   
    }

    // To calculate distance between two pHash strings
    this.pHashDistance = function(firstPHash, secondPHash) {
        return pHashUtils.pHashDistance(firstPHash, secondPHash);
    }
};

function mandatoryParametersAvailable(options) {
    return options.publicKey && options.privateKey && options.urlEndpoint;
}

module.exports = ImageKit;