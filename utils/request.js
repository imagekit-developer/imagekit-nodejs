var request = require('request');
var authorizationUtils = require("./authorization");

module.exports = function(requestOptions, defaultOptions, callback) {
    authorizationUtils.addAuthorization(requestOptions, defaultOptions.privateKey);
    request(requestOptions, callback);
}

