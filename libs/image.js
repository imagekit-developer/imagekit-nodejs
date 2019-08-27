var crypto = require('crypto');
var path = require('path');
var url = require('url');

var _ = require('lodash');

var Transform = require("../libs/transform");
var utils = require("../utils");

module.exports = function(key, options, globals) {
    var self = this;
    
    self.key = key || "";

    //image specific options override the global settings
    self.options = _.extend(getDefaults(), globals, options);
    self.transforms = [];
    
    self.transform = function(transformOptions) {
        var transform = new Transform(transformOptions);
        self.transforms.push(transform);
        
        return self;
    };

    /*
        Get HTML tag for the image
        Allowed options
            - className = space separated string of class names to be assigned to the image tag
            - id = id to be assigned to the image tag
     */
    self.html = function(options) {
        return '<img src="' + self.url() + '" class="' + (options.className || "") + '" id="' + (options.id + "") + '" />'
    };

    /*
        Same has .html() except that a signed URL is generated for the image
     */
    self.signedHtml = function(options) {
        return '<img src="' + self.signedUrl(options.expirySeconds || 0) + '" class="' + (options.className || "") + '" id="' + (options.id + "") + '" />'
    };

    /*
        Get a URL for the image with different transformations and patterns
     */
    self.url = function() {
        var transformationString = self.getTransformString();
        
        if(!self.options.useSubdomain) {
            return url.format({
                host : utils.getHost(self.options.imagekitId, self.options.useSubdomain),
                protocol : utils.getProtocol(self.options.useSecure),
                pathname : path.join(self.options.imagekitId, self.options.pattern, transformationString, self.key)
            });
        } else {
            return url.format({
                host : utils.getHost(self.options.imagekitId, self.options.useSubdomain),
                protocol : utils.getProtocol(self.options.useSecure),
                pathname : path.join(self.options.pattern, transformationString, self.key)
            });
        }
    };

    /*
        Get signed URL for the image with different transformations and patterns
     */
    self.signedUrl = function(expirySeconds) {
        var transformationString = self.getTransformString();
        var expiryTimestamp = (expirySeconds ? parseInt(Date.now() / 1000, 10) + expirySeconds : utils.getInifiniteExpiry());

        var q = {
            'ik-s' : getDigest(self.options, transformationString.replace(/^tr:/, ""), expiryTimestamp, self.key)
        };

        if(expirySeconds) {
            q['ik-t'] = expiryTimestamp
        }

        if(!self.options.useSubdomain) {
            return url.format({
                host : utils.getHost(self.options.imagekitId, self.options.useSubdomain),
                protocol : utils.getProtocol(self.options.useSecure),
                pathname : path.join(self.options.imagekitId, self.options.pattern, transformationString, self.key),
                query : q
            });
        } else {
            return url.format({
                host : utils.getHost(self.options.imagekitId, self.options.useSubdomain),
                protocol : utils.getProtocol(self.options.useSecure),
                pathname : path.join(self.options.pattern, transformationString, self.key),
                query : q
            });
        }
    };

    self.getTransformString = function() {
        var transform, parsedTransforms = [];
        for(var i in self.transforms) {
            transform = self.transforms[i]
            if(transform.parsed && transform.parsed.length) {
                parsedTransforms.push(transform.parsed);
            }
        }

        return (parsedTransforms.length ? "tr:" + parsedTransforms.join(":") : "");
    };

    return self;
}

function getDefaults() {
    return {
        "pattern" : "/"
    };
}


function getDigest(options, transformationString, expiryTimestamp, key) {
    return crypto.createHmac('sha1', options.apiSecret)
                .update(options.imagekitId
                        + transformationString 
                        + expiryTimestamp
                        + key)
                .digest("hex");
}