var _ = require('lodash');
var q = require('q');
var request = require('request');
var url = require('url');

var utils = require("../utils");

module.exports.deleteFile = function(path, globals) {
  var self = this;


  self.deferred = q.defer();
  self.options = _.extend({path : path}, globals);


  if(!self.options.path) {
    self.deferred.reject({
      "exception" : true,
      "statusNumber" : 1400,
      "statusCode" : "BAD_REQUEST",
      "message" : "Invalid or missing parameters"
    });

    return self.deferred.promise;
  }

  var signature = utils.calculateDeleteSignature(self.options);

  var deleteReq = request.post({url : url.format({
    protocol : utils.getProtocol(true),
    host : utils.getImageDeleteAPI()
  }), form : {
    path : self.options.path,
    imagekitId : self.options.imagekitId,
    signature : signature
  }}, function(err, resp, body){
    if(err) {
      self.deferred.reject({
        "exception" : true,
        "statusNumber" : 1500,
        "statusCode" : "SERVER_ERROR",
        "message" : "Error while deleting file"
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
        "statusNumber" : 1500,
        "statusCode" : "SERVER_ERROR",
        "message" : "Error in parsing response"
      });
    }

    self.deferred.resolve(parsed);
  });


  return self.deferred.promise;
};

module.exports.purgeFile = function(imageUrl, globals) {
  var self = this;


  self.deferred = q.defer();
  self.options = _.extend({url : imageUrl}, globals);


  if(!self.options.url) {
    self.deferred.reject({
      "exception" : true,
      "statusNumber" : 1400,
      "statusCode" : "BAD_REQUEST",
      "message" : "Invalid or missing parameters"
    });

    return self.deferred.promise;
  }

  var signature = utils.calculatePurgeSignature(self.options);

  var purgeReq = request.post({url : url.format({
    protocol : utils.getProtocol(true),
    host : utils.getImagePurgeAPI()
  }), form : {
    url : self.options.url,
    imagekitId : self.options.imagekitId,
    signature : signature
  }}, function(err, resp, body){
    if(err) {
      self.deferred.reject({
        "exception" : true,
        "statusNumber" : 1500,
        "statusCode" : "SERVER_ERROR",
        "message" : "Error while purging file"
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
      console.log(ex);
      self.deferred.reject({
        "exception" : true,
        "statusNumber" : 1500,
        "statusCode" : "SERVER_ERROR",
        "message" : "Error in parsing response"
      });
    }

    self.deferred.resolve(parsed);
  });


  return self.deferred.promise;
};

module.exports.listFiles = function(skip, limit, globals) {
  var self = this;


  self.deferred = q.defer();
  self.options = _.extend({skip : skip, limit : limit}, globals);

  self.options.skip = self.options.skip || 0;
  self.options.limit = self.options.limit || 1000;

  var signature = utils.calculateListMediaSignature(self.options);

  var urlEndPoint = url.format({
    protocol : utils.getProtocol(true),
    host : utils.getListMediaAPI()
  });

  urlEndPoint += "?skip=" + self.options.skip + "&limit=" + self.options.limit + "&imagekitId=" + self.options.imagekitId + "&signature=" + signature;

  var listReq = request.get({url : urlEndPoint}, function(err, resp, body){
    if(err) {
      self.deferred.reject({
        "exception" : true,
        "statusNumber" : 1500,
        "statusCode" : "SERVER_ERROR",
        "message" : "Error while listing media uploaded file"
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
      console.log(ex);
      self.deferred.reject({
        "exception" : true,
        "statusNumber" : 1500,
        "statusCode" : "SERVER_ERROR",
        "message" : "Error in parsing response"
      });
    }

    self.deferred.resolve(parsed);
  });


  return self.deferred.promise;
}