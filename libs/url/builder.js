/*
    Helper Modules
*/
var { URLSearchParams } = require('url');
var url = require('url');
var path = require('path');
var crypto = require('crypto');

/*
    Utils
*/
var transformationUtils = require('../../utils/transformation');

/*
    Variables
*/
const TRANSFORMATION_PARAMETER = "tr";
const SIGNATURE_PARAMETER = "ik-s";
const TIMESTAMP_PARAMETER = "ik-t";
const DEFAULT_TIMESTAMP = "9999999999";
const PROTOCOL_QUERY = /http[s]?\:\/\//;

module.exports.buildURL = function(opts) {
    if(!opts.path && !opts.src) {
        return "";
    }

    //Create correct query parameters
    var parsedURL, isSrcParameterUsedForURL;
    if(opts.path) {
        parsedURL = url.parse(opts.path);
    } else {
        parsedURL = url.parse(opts.src);
        isSrcParameterUsedForURL = true;
    }

    var queryParameters = new URLSearchParams(parsedURL.query || "");
    for(var i in opts.queryParameters) {
        queryParameters.set(i, opts.queryParameters[i]);
    }
    
    //Initial URL Construction Object
    var urlObject = {host : "", pathname : "", search : ""};
    if(opts.path) {
        urlObject.host = opts.urlEndpoint;
    } else if(opts.src) {
        urlObject.host = [parsedURL.protocol, "//", parsedURL.auth, parsedURL.auth ? "@" : "" ,parsedURL.host].join("");
    }
    urlObject.pathname = parsedURL.pathname;

    //Create Transformation String
    var transformationString = constructTransformationString(opts.transformation);
    if(transformationString) {
        //force that if src parameter is being used for URL construction then the transformation
        //string should be added only as a query parameter
        if(transformationUtils.addAsQueryParameter(opts) || isSrcParameterUsedForURL) {
            queryParameters.set(TRANSFORMATION_PARAMETER, transformationString);   
        } else {
            urlObject.pathname = path.join(
                                    [TRANSFORMATION_PARAMETER, transformationString].join(transformationUtils.getChainTransformDelimiter()),
                                    urlObject.pathname
                                )
        }
    }

    
    
    urlObject.host = removeTrailingSlash(urlObject.host);
    urlObject.pathname = addLeadingSlash(urlObject.pathname);
    urlObject.search = queryParameters.toString();

    // Signature String and Timestamp
    if(opts.signed === true) {
        if(opts.expireSeconds) {
            queryParameters.set(TIMESTAMP_PARAMETER, getSignatureTimestamp(opts.expireSeconds));
            urlObject.search = queryParameters.toString();
        }
    }

    var intermediateURL = url.format(urlObject);

    var urlSignature = getSignature({
        privateKey : opts.privateKey,
        url : intermediateURL
    });

    if(opts.signed === true) {
        queryParameters.set(SIGNATURE_PARAMETER, urlSignature);
        urlObject.search = queryParameters.toString();
    }

    return url.format(urlObject);
};

function constructTransformationString(transformation) {
    if(!Array.isArray(transformation)) { return ""; }

    var parsedTransforms = [];
    for(var i = 0, l = transformation.length; i < l; i++) {
        var parsedTransformStep = [];
        for(var key in transformation[i]) {
            let transformKey = transformationUtils.getTransformKey(key);
            if(!transformKey) {
                transformKey = key;
            }

            if(transformation[i][key] === "-") {
                parsedTransformStep.push(transformKey);
            } else {
                parsedTransformStep.push([transformKey, transformation[i][key]].join(transformationUtils.getTransformKeyValueDelimiter()));
            }
            
        }
        parsedTransforms.push(parsedTransformStep.join(transformationUtils.getTransformDelimiter()));
    }

    return parsedTransforms.join(transformationUtils.getChainTransformDelimiter());
}

function addLeadingSlash(str) {
    if(typeof str == "string" && str[0] != "/") {
        str = "/" + str;
    }

    return str;
}

function removeTrailingSlash(str) {
    if(typeof str == "string" && str[str.length - 1] == "/") {
        str = str.substring(0, str.length - 1);
    }

    return str;
}

function getSignatureTimestamp(seconds) {
    if(!seconds) return DEFAULT_TIMESTAMP;

    var sec = parseInt(seconds, 10);
    if(!sec) return DEFAULT_TIMESTAMP;

    var currentTimestamp = parseInt(new Date().getTime() / 1000, 10);
    return currentTimestamp + sec;
}

function getSignature(opts) {
    if(!opts.privateKey || !opts.url) return "";

    return crypto.createHmac('sha1', opts.privateKey).update(opts.url.replace(PROTOCOL_QUERY, "")).digest('hex');
}