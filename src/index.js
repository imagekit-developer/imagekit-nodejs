var _ = require('lodash');
var q = require('q');
var request = require("request");

/*
    Individual Image object - core of the Fetch Image Logic
 */
var Image = require("../libs/image");

/*
    For the upload image logic
 */
var Upload = require("../libs/upload");

/*
 For the Admin APIs
 */
var Admin = require("../libs/admin");

/*
    Main Constructor
 */
function ImageKit(options) {
    var self = this;

    //all globals initalized based on defaults or the user options
    self.globals = _.extend(getDefaults(), options);
    if(!verify(self.globals)) {
        throw(new Error("ImageKit Id, API Key and API secret are necessary for initialization."));
        return;
    }

    /*
        For generating image URLs for fetching the image
     */
    self.image = function(key, options) {
        var img = Image(key, options, self.globals);
        return img;
    };

    /*
        For uploading the images to your imagekit account
     */
    self.upload = function(image, options) {
        return new Upload.uploadImage(image, options, self.globals);
    };

    /*
     For uploading the images to your imagekit account
     */
    self.uploadViaURL = function(url, options) {
        return new Upload.uploadImageViaURL(url, options, self.globals);
    };

    /*
     For deleting the images from your imagekit's media library
     */
    self.deleteFile = function(path) {
        return new Admin.deleteFile(path, self.globals);
    };

    /*
     For purging a particular image
     */
    self.purgeFile = function(url) {
        return new Admin.purgeFile(url, self.globals);
    };

    /*
     For listing upload media files
     */
    self.listUploadedMediaFiles = function(skip, limit) {
        return new Admin.listFiles(skip, limit, self.globals);
    }
};

function verify(globals) {
    if(!globals['imagekitId']
    || !globals['apiKey']
    || !globals['apiSecret']) {
        return false;
    }

    return true;
}

function getDefaults() {
    return {
        "imagekitId" : "",
        "apiKey" : "",
        "apiSecret" : "",
        "useSubdomain" : false,
        "useSecure" : false
    };
}

module.exports = ImageKit;