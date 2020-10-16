const chai = require("chai");
const sinon = require("sinon");
const expect = chai.expect;
const initializationParams = require("./data").initializationParams
const ImageKit = require(".."); // This will automatically pick main module (cjs bundle) as per package.json
const nock = require("nock");
const fs = require("fs");
const path = require("path");

function checkFormData({requestBody, boundary, fieldName, fieldValue}) {
    return expect(requestBody).include(`${boundary}\r\nContent-Disposition: form-data; name="${fieldName}"\r\n\r\n${fieldValue}`)
}

const uploadSuccessResponseObj = {
    "fileId": "598821f949c0a938d57563bd",
    "name": "file1.jpg",
    "url": "https://ik.imagekit.io/your_imagekit_id/images/products/file1.jpg",
    "thumbnailUrl": "https://ik.imagekit.io/your_imagekit_id/tr:n-media_library_thumbnail/images/products/file1.jpg",
    "height": 300,
    "width": 200,
    "size": 83622,
    "filePath": "/images/products/file1.jpg",
    "tags": ["t-shirt", "round-neck", "sale2019"],
    "isPrivateFile": false,
    "customCoordinates": null,
    "fileType": "image"
};

describe("File upload", function () {
    var imagekit = new ImageKit(initializationParams);

    it('Invalid upload params', function () {
        var callback = sinon.spy();

        imagekit.upload(null, callback);
        expect(callback.calledOnce).to.be.true;
        sinon.assert.calledWith(callback, { help: "", message: "Missing data for upload" }, null);
    });

    it('Missing fileName', function () {
        const fileOptions = {
            file: "https://ik.imagekit.io/remote-url.jpg"
        };

        var callback = sinon.spy();

        imagekit.upload(fileOptions, callback);
        expect(callback.calledOnce).to.be.true;
        sinon.assert.calledWith(callback, { help: "", message: "Missing fileName parameter for upload" }, null);
    });

    it('Missing file', function () {
        const fileOptions = {
            fileName: "test_file_name",
        };

        var callback = sinon.spy();

        imagekit.upload(fileOptions, callback);
        expect(callback.calledOnce).to.be.true;
        sinon.assert.calledWith(callback, { help: "", message: "Missing file parameter for upload" }, null);
    });

    it('Full request', function (done) {
        const fileOptions = {
            fileName: "test_file_name",
            file: "test_file_content",
            tags: ["tag1","tag2"], // array handling
            isPrivateFile: true, // Boolean handling
            useUniqueFileName: "false", // As string
            responseFields : ["tags,metadata"]
        };

        var callback = sinon.spy();

        const scope = nock('https://api.imagekit.io')
            .post('/v1/files/upload')
            .basicAuth({ user: initializationParams.privateKey, pass: '' })
            .reply(200, function (uri, requestBody) {
                expect(this.req.headers["content-type"]).include("multipart/form-data; boundary=---------------------");
                var boundary = this.req.headers["content-type"].replace("multipart/form-data; boundary=","");
                checkFormData({requestBody,boundary,fieldName:"fileName",fieldValue:fileOptions.fileName});
                checkFormData({requestBody,boundary,fieldName:"file",fieldValue:fileOptions.file});
                checkFormData({requestBody,boundary,fieldName:"tags",fieldValue:"tag1,tag2"});
                checkFormData({requestBody,boundary,fieldName:"isPrivateFile",fieldValue:"true"});
                checkFormData({requestBody,boundary,fieldName:"useUniqueFileName",fieldValue:"false"});
                checkFormData({requestBody,boundary,fieldName:"responseFields",fieldValue:"tags,metadata"});
                done()
              })

        imagekit.upload(fileOptions, callback);
    });

    it('Buffer file', function (done) {
        const fileOptions = {
            fileName: "test_file_name",
            file: fs.readFileSync(path.join(__dirname,"./data/test_image.jpg"))
        };

        const scope = nock('https://api.imagekit.io')
        .post('/v1/files/upload')
        .basicAuth({ user: initializationParams.privateKey, pass: '' })
        .reply(200, function (uri, requestBody) {
            expect(this.req.headers["content-type"]).include("multipart/form-data; boundary=---------------------");
            var boundary = this.req.headers["content-type"].replace("multipart/form-data; boundary=","");
            expect(requestBody.length).equal(399064);
            done()
          })

        imagekit.upload(fileOptions);
    });

    it('Missing useUniqueFileName', function (done) {
        const fileOptions = {
            fileName: "test_file_name",
            file: "test_file_content",
            isPrivateFile: true
        };

        var callback = sinon.spy();

        const scope = nock('https://api.imagekit.io')
            .post('/v1/files/upload')
            .basicAuth({ user: initializationParams.privateKey, pass: '' })
            .reply(200, function (uri, requestBody) {
                expect(this.req.headers["content-type"]).include("multipart/form-data; boundary=---------------------");
                var boundary = this.req.headers["content-type"].replace("multipart/form-data; boundary=","");
                checkFormData({requestBody,boundary,fieldName:"fileName",fieldValue:fileOptions.fileName});
                checkFormData({requestBody,boundary,fieldName:"file",fieldValue:fileOptions.file});
                checkFormData({requestBody,boundary,fieldName:"isPrivateFile",fieldValue:"true"});
                expect(requestBody).to.not.include("useUniqueFileName");
                done()
              })

        imagekit.upload(fileOptions, callback);
    });

    it('Missing isPrivateFile and useUniqueFileName', function (done) {
        const fileOptions = {
            fileName: "test_file_name",
            file: "test_file_content",
            tags: "tag1,tag2" // as string
        };

        var callback = sinon.spy();

        const scope = nock('https://api.imagekit.io')
            .post('/v1/files/upload')
            .basicAuth({ user: initializationParams.privateKey, pass: '' })
            .reply(200, function (uri, requestBody) {
                expect(this.req.headers["content-type"]).include("multipart/form-data; boundary=---------------------");
                var boundary = this.req.headers["content-type"].replace("multipart/form-data; boundary=","");
                checkFormData({requestBody,boundary,fieldName:"fileName",fieldValue:fileOptions.fileName});
                checkFormData({requestBody,boundary,fieldName:"file",fieldValue:fileOptions.file});
                checkFormData({requestBody,boundary,fieldName:"tags",fieldValue:"tag1,tag2"});
                expect(requestBody).to.not.include("useUniqueFileName");
                expect(requestBody).to.not.include("isPrivateFile");
                done()
              })

        imagekit.upload(fileOptions, callback);
    });

    it('Bare minimum request', function (done) {
        const fileOptions = {
            fileName: "test_file_name",
            file: "test_file_content"
        };

        var callback = sinon.spy();

        const scope = nock('https://api.imagekit.io')
            .post('/v1/files/upload')
            .basicAuth({ user: initializationParams.privateKey, pass: '' })
            .reply(200, function (uri, requestBody) {
                expect(this.req.headers["content-type"]).include("multipart/form-data; boundary=---------------------");
                var boundary = this.req.headers["content-type"].replace("multipart/form-data; boundary=","");
                checkFormData({requestBody,boundary,fieldName:"fileName",fieldValue:fileOptions.fileName});
                checkFormData({requestBody,boundary,fieldName:"file",fieldValue:fileOptions.file});
                expect(requestBody).to.not.include("tags");
                expect(requestBody).to.not.include("useUniqueFileName");
                expect(requestBody).to.not.include("isPrivateFile");
                expect(requestBody).to.not.include("customCoordinates");
                expect(requestBody).to.not.include("responseFields");
                done()
              })

        imagekit.upload(fileOptions, callback);
    });

    it('Success callback', function (done) {
        const fileOptions = {
            fileName: "test_file_name",
            file: "test_file_content"
        };

        var callback = sinon.spy();

        const scope = nock('https://api.imagekit.io')
            .post('/v1/files/upload')
            .basicAuth({ user: initializationParams.privateKey, pass: '' })
            .reply(200, uploadSuccessResponseObj)

        imagekit.upload(fileOptions, callback);

        setTimeout( () => {
            expect(callback.calledOnce).to.be.true;
            sinon.assert.calledWith(callback, null, uploadSuccessResponseObj);
            done();
        },10); 
    });

    it('Success using promise', function (done) {
        const fileOptions = {
            fileName: "test_file_name",
            file: "test_file_content"
        };

        const scope = nock('https://api.imagekit.io')
            .post('/v1/files/upload')
            .basicAuth({ user: initializationParams.privateKey, pass: '' })
            .reply(200, uploadSuccessResponseObj)

        imagekit.upload(fileOptions)
        .then((response, error) => {
            expect(response).to.been.deep.equal(uploadSuccessResponseObj)
            done();
        });
    });

    it('Network error', function (done) {
        const fileOptions = {
            fileName: "test_file_name",
            file: "test_file_content"
        };

        const scope = nock('https://api.imagekit.io')
            .post('/v1/files/upload')
            .basicAuth({ user: initializationParams.privateKey, pass: '' })
            .replyWithError("Network error occured")

        imagekit.upload(fileOptions, function(err, response) {
            expect(err.message).equal("Network error occured");
            done();
        });
    });

    it('Server side error', function (done) {
        const fileOptions = {
            fileName: "test_file_name",
            file: "test_file_content"
        };

        var callback = sinon.spy();

        var error = {
            help: "For support kindly contact us at support@imagekit.io .",
            message: "Your account cannot be authenticated."
        };

        const scope = nock('https://api.imagekit.io')
            .post('/v1/files/upload')
            .basicAuth({ user: initializationParams.privateKey, pass: '' })
            .reply(403, error)

        imagekit.upload(fileOptions, callback);

        setTimeout( () => {
            expect(callback.calledOnce).to.be.true;
            sinon.assert.calledWith(callback, error, null);
            done();
        },10);
    });

    it('Server side error promise', function (done) {
        const fileOptions = {
            fileName: "test_file_name",
            file: "test_file_content"
        };

        var error = {
            help: "For support kindly contact us at support@imagekit.io .",
            message: "Your account cannot be authenticated."
        };

        const scope = nock('https://api.imagekit.io')
            .post('/v1/files/upload')
            .basicAuth({ user: initializationParams.privateKey, pass: '' })
            .reply(403, error)

        imagekit.upload(fileOptions)
            .then((response, error) => {
            })
            .catch(error => {
                expect(error).to.been.deep.equal(error)
                done();
            })
    });
});