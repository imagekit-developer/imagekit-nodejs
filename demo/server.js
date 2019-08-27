var express = require('express');
var multer = require('multer');
var q = require('q');

var ImageKit = require("../src/index.js");

var app = new express();
app.set("views", "./views");
app.set("view engine", "pug");

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

var imagekit = new ImageKit({
    "imagekitId" : "myImageKitID", /* required */
    "apiKey" : "myapikey", /* required */
    "apiSecret" : "myapisecret", /* required and to be kept secret */
    "useSubdomain" : false,
    "useSecure" : false
});


//using the pug templating engine to render a img tag with the required source url
app.get("/demo-page.html", function(req, res) {
    var url = imagekit.image("default-image.jpg")
              .transform({HEIGHT : 100, WIDTH : 200, CROP_MODE : "resize"})
              .transform({BORDER : "5_FF0000"})
              .signedUrl(0);

    var html = imagekit.image("default-image.jpg")
              .transform({HEIGHT : 300})
              .html({
                className : "image-item",
                id : "ik-image"
              });

    res.render("demo", {
        "url" : url,
        "html" : html
    });
});

/*
    Sample API endpoint that can accept 1 file in the same request
    The files should be available as variable 'image' in the request
    This sample uses multer module for handling multipart form data
    and 'q' for handling promises
 */
var upload = multer().single('image');
app.post("/rest/api/upload", function(req, res) {
    //use some authentication on the incoming request like login if needed at this step
    
    //invoke the multer middleware manually for error handling
    //can be done automatically, read multer docs for the same
    upload(req, res, function(err) {
        if(err) {
            res.status(500);
            res.send({
                "exception" : true,
                "statusNumber" : 500,
                "statusCode" : "INTERNAL_SERVER_ERROR",
                "message" : "Image file parsing failed"
            });
            return;
        }

        var uploadPromise;
        uploadPromise = imagekit.upload(req.file.buffer.toString('base64'), {
            "filename" : req.file.originalname,
            "folder" : "/images"
        });
       
        //handle upload success and failure
        uploadPromise.then(function(result) {
            res.send(result);
        }, function(err) {
            res.status(500);
            res.send({
                "exception" : true,
                "statusNumber" : err.statusNumber,
                "statusCode" : err.statusCode,
                "message" : err.message
            });
        });

    });
});

app.post("/rest/api/uploadViaUrl", function(req, res) {
    if(!req.body || !req.body.url || !req.body.filename) {
        res.status(400);
        res.send({
            "exception" : true,
            "statusNumber" : 400,
            "statusCode" : "BAD_REQUEST",
            "message" : "Missing parameter"
        });
        return;
    }

    var uploadPromise;
    uploadPromise = imagekit.uploadViaURL(req.body.url, {
        "filename" : req.body.filename,
        "folder" : "/images"
    });

    //handle upload success and failure
    uploadPromise.then(function(result) {
        res.send(result);
    }, function(err) {
        res.status(500);
        res.send({
            "exception" : true,
            "statusNumber" : err.statusNumber,
            "statusCode" : err.statusCode,
            "message" : err.message
        });
    });
});

app.post("/rest/api/deleteFile", function(req, res) {
    if(!req.body || !req.body.path) {
        res.status(400);
        res.send({
            "exception" : true,
            "statusNumber" : 400,
            "statusCode" : "BAD_REQUEST",
            "message" : "Missing parameter"
        });
        return;
    }

    var deletePromise;
    deletePromise = imagekit.deleteFile(req.body.path);

    //handle delete success and failure
    deletePromise.then(function(result) {
        res.send(result);
    }, function(err) {
        res.status(500);
        res.send({
            "exception" : true,
            "statusNumber" : err.statusNumber,
            "statusCode" : err.statusCode,
            "message" : err.message
        });
    });
});

app.post("/rest/api/purgeFile", function(req, res) {
    if(!req.body || !req.body.url) {
        res.status(400);
        res.send({
            "exception" : true,
            "statusNumber" : 400,
            "statusCode" : "BAD_REQUEST",
            "message" : "Missing parameter"
        });
        return;
    }

    var purgePromise;
    purgePromise = imagekit.purgeFile(req.body.url);

    //handle delete success and failure
    purgePromise.then(function(result) {
        res.send(result);
    }, function(err) {
        res.status(500);
        res.send({
            "exception" : true,
            "statusNumber" : err.statusNumber,
            "statusCode" : err.statusCode,
            "message" : err.message
        });
    });
});

app.listen(3456);
console.log("App listening on port 3456.\nOpen http://localhost:3456/demo-page.html in your browser");
