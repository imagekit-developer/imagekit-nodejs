var errorMessages = require("../../constants/errorMessages");
var respond = require("../../utils/respond");
var request = require("../../utils/request");

module.exports.purgeCache = function(url, defaultOptions, callback) {
    if(!url) {
        respond(true, errorMessages.CACHE_PURGE_URL_MISSING, callback);
        return;
    }

    var requestOptions = {
        url : "https://api.imagekit.io/v1/files/purge",
        method : "POST",
        json : {
            "url" : url
        }
    };

    request(requestOptions, defaultOptions, callback);
};

module.exports.getPurgeCacheStatus = function(requestId, defaultOptions, callback) {
    if(!requestId) {
        respond(true, errorMessages.CACHE_PURGE_STATUS_ID_MISSING, callback);
        return;
    }

    var requestOptions = {
        url : "https://api.imagekit.io/v1/files/purge/" + requestId,
        method : "GET",
        json : true
    };

    request(requestOptions, defaultOptions, callback);
};