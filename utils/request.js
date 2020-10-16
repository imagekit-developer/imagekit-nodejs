var request = require('request');
var respond = require("../utils/respond");
var authorizationUtils = require("./authorization");

module.exports = function(requestOptions, defaultOptions, callback) {
    authorizationUtils.addAuthorization(requestOptions, defaultOptions.privateKey);
    request(requestOptions, function(err, response, body) {
        if(typeof callback != "function") return;

        if(err) {
            respond(true, err, callback);
            return;
        }

        if(response && response.statusCode >= 400) {
            respond(true, err || body, callback);
            return;
        }

        respond(false, body, callback);
    });
}

