var _ = require('lodash');
var q = require('q');
var request = require('request');
var url = require('url');

var utils = require("../utils");

module.exports.uploadImage = function(image, options, globals) {
    var self = this;


    self.deferred = q.defer();
    self.options = _.extend(getDefaults(), globals, options);

    self.options.timestamp = parseInt(Date.now() / 1000, 10);

    if(!verify(self.options) || !image) {
        self.deferred.reject({
            "exception" : true,
            "statusNumber" : 2400,
            "statusCode" : "BAD_REQUEST",
            "message" : "Invalid or missing upload parameters"
        });

        return self.deferred.promise;
    }

    var signature = utils.calculateSignature(self.options);
    var uploadReq = request.post(url.format({
        protocol : utils.getProtocol(false),
        host : utils.getImageUploadAPI(self.options.imagekitId)
    }), function(err, resp, body){
        if(err) {
            self.deferred.reject({
                "exception" : true,
                "statusNumber" : 2500,
                "statusCode" : "SERVER_ERROR",
                "message" : "Error while sending upload request"
            });
            return;
        }

        try {
            var parsed = JSON.parse(body);    
            if(parsed.exception) {
                self.deferred.reject({
                    "exception" : true,
                    "statusNumber" : parsed.statusNumber,
                    "statusCode" : parsed.statusCode,
                    "message" : parsed.message
                });
                return;   
            }
        } catch(ex) {
            self.deferred.reject({
                "exception" : true,
                "statusNumber" : 2500,
                "statusCode" : "SERVER_ERROR",
                "message" : "Error in parsing response from upload server"
            });
        }

        self.deferred.resolve(parsed);
    });
    var form = uploadReq.form();
    form.append('image', image);
    form.append('filename', self.options.filename);
    form.append('useUniqueFilename', (self.options.useUniqueFilename ? "true" : "false"));
    form.append('folder', self.options.folder);
    form.append('timestamp', self.options.timestamp);
    form.append('apiKey', self.options.apiKey);
    form.append('signature', signature);


    return self.deferred.promise;
};

module.exports.uploadImageViaURL = function(imageUrl, options, globals) {
    var self = this;


    self.deferred = q.defer();
    self.options = _.extend(getDefaults(), globals, options);

    self.options.timestamp = parseInt(Date.now() / 1000, 10);

    if(!verify(self.options) || !imageUrl) {
        self.deferred.reject({
            "exception" : true,
            "statusNumber" : 2400,
            "statusCode" : "BAD_REQUEST",
            "message" : "Invalid or missing upload parameters"
        });

        return self.deferred.promise;
    }

    var signature = utils.calculateSignature(self.options);

    var uploadReq = request.post({url : url.format({
        protocol : utils.getProtocol(false),
        host : utils.getImageUploadURLAPI(self.options.imagekitId)
    }), form : {
        url : imageUrl,
        filename : self.options.filename,
        useUniqueFilename : (self.options.useUniqueFilename ? "true" : "false"),
        folder : self.options.folder,
        timestamp : self.options.timestamp,
        apiKey : self.options.apiKey,
        signature : signature
    }}, function(err, resp, body){
        if(err) {
            self.deferred.reject({
                "exception" : true,
                "statusNumber" : 2500,
                "statusCode" : "SERVER_ERROR",
                "message" : "Error while sending upload request"
            });
            return;
        }

        try {
            var parsed = JSON.parse(body);
            if(parsed.exception) {
                self.deferred.reject({
                    "exception" : true,
                    "statusNumber" : parsed.statusNumber,
                    "statusCode" : parsed.statusCode,
                    "message" : parsed.message
                });
                return;
            }
        } catch(ex) {
            self.deferred.reject({
                "exception" : true,
                "statusNumber" : 2500,
                "statusCode" : "SERVER_ERROR",
                "message" : "Error in parsing response from upload server"
            });
        }

        self.deferred.resolve(parsed);
    });

    return self.deferred.promise;
};

function getDefaults() {
    return {
        "useUniqueFilename" : true,
        "folder" : "/"
    };
}

function verify(options) {
    if(!options.filename
        || !options.imagekitId
        || !options.timestamp
        || !options.apiKey
        || !options.apiSecret) {
        return false;
    }

    return true;
}

