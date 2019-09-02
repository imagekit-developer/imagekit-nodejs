/*
    Helper Modules
*/
var uuidv4 = require('uuid/v4');
var crypto = require('crypto');

var DEFAULT_TIME_DIFF = 60 * 30;

module.exports.getAuthenticationParameters = function(token, expire, defaultOptions) {
    var defaultExpire = parseInt((new Date().getTime()) / 1000, 10) + DEFAULT_TIME_DIFF;
    var authParameters = {
        "token" : token || "",
        "expire" : expire || 0,
        "signature" : ""
    };

    if(!defaultOptions || !defaultOptions.privateKey) return authParameters;

    token = token || uuidv4();
    expire = expire || defaultExpire;
    var signature = crypto.createHmac('sha1', defaultOptions.privateKey).update(token+expire).digest("hex");

    authParameters.token = token;
    authParameters.expire = expire;
    authParameters.signature = signature;

    return authParameters;
};