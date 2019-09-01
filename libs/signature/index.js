/*
    Helper Modules
*/
var uuidv4 = require('uuid/v4');
var crypto = require('crypto');

var DEFAULT_TIME_DIFF = 60 * 30;

module.exports.getAuthenticationParameters = function(token, timestamp, defaultOptions) {
    var defaultTimestamp = parseInt((new Date().getTime()) / 1000, 10) + DEFAULT_TIME_DIFF;
    var authParameters = {
        "token" : token || "",
        "timestamp" : timestamp || 0,
        "signature" : ""
    };

    if(!defaultOptions || !defaultOptions.privateKey) return authParameters;

    token = token || uuidv4();
    timestamp = timestamp || defaultTimestamp;
    var signature = crypto.createHmac('sha1', defaultOptions.privateKey).update(token+defaultTimestamp).digest("hex");

    authParameters.token = token;
    authParameters.timestamp = timestamp;
    authParameters.signature = signature;

    return authParameters;
};