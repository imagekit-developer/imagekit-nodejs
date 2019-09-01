var request = require('request');
var authorizationUtils = require("./authorization");

module.exports = function(requestOptions, defaultOptions, callback) {
    authorizationUtils.addAuthorization(requestOptions, defaultOptions.privateKey);
    request(requestOptions, function(err, response, body) {
        if(typeof callback != "function") return;

        if(response.statusCode >= 400) {
            callback(err || body);
        } else {
            callback(err, response, body);
        }
    });
}

