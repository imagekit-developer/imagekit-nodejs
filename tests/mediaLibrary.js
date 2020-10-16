const chai = require("chai");
const sinon = require("sinon");
const expect = chai.expect;
const initializationParams = require("./data").initializationParams
const ImageKit = require("..");
const nock = require("nock");
var imagekit = new ImageKit(initializationParams);

const dummyAPISuccessResponse = {
    dummyKey: "dummyValue"
};

const dummyAPIErrorResponse = {
    help: "help",
    message: "message"
}

describe("Media library APIs", function () {
    describe("Request body check", function () {
        it('Delete single file', function (done) {
            var fileId = "23902390239203923";

            const scope = nock('https://api.imagekit.io')
                .delete(`/v1/files/${fileId}`)
                .basicAuth({ user: initializationParams.privateKey, pass: '' })
                .reply(function (uri, requestBody) {
                    expect(this.req.path).equal(`/v1/files/${fileId}`)
                    done();
                    return [200]
                })

            imagekit.deleteFile(fileId);
        });

        it('Delete single file missing fileId', function (done) {
            imagekit.deleteFile(null, function (err, response) {
                expect(err).to.deep.equal({
                    help: "",
                    message: "Missing File ID parameter for this request"
                })
                done();
            });
        });

        it('Get file metadata using file id', function (done) {
            var fileId = "23902390239203923";

            const scope = nock('https://api.imagekit.io')
                .get(`/v1/files/${fileId}/metadata`)
                .basicAuth({ user: initializationParams.privateKey, pass: '' })
                .reply(200, function (uri, requestBody) {
                    expect(this.req.path).equal(`/v1/files/${fileId}/metadata`)
                    done()
                    return [200]
                })

            imagekit.getFileMetadata(fileId);
        });

        it('Get file metadata using file id missing fileId', function (done) {
            imagekit.getFileMetadata(null, function (err, response) {
                expect(err).to.deep.equal({
                    help: "",
                    message: "Missing File ID parameter for this request"
                })
                done();
            });
        });

        it('Get file details', function (done) {
            var fileId = "23902390239203923";

            const scope = nock('https://api.imagekit.io')
                .get(`/v1/files/${fileId}/details`)
                .basicAuth({ user: initializationParams.privateKey, pass: '' })
                .reply(200, function (uri, requestBody) {
                    expect(this.req.path).equal(`/v1/files/${fileId}/details`)
                    done()
                    return [200]
                })

            imagekit.getFileDetails(fileId);
        });

        it('Get file details missing fileId', function (done) {
            imagekit.getFileDetails(null, function (err, response) {
                expect(err).to.deep.equal({
                    help: "",
                    message: "Missing File ID parameter for this request"
                })
                done();
            });
        });

        it('Update file details', function (done) {
            var fileId = "23902390239203923";

            var updateData = {
                tags: ["tag1", "tag2"],
                customCoordinates: "10,10,100,100"
            }

            const scope = nock('https://api.imagekit.io')
                .patch(`/v1/files/${fileId}/details`)
                .basicAuth({ user: initializationParams.privateKey, pass: '' })
                .reply(200, function (uri, requestBody) {
                    expect(this.req.path).equal(`/v1/files/${fileId}/details`);
                    expect(requestBody).to.deep.equal(updateData);
                    done()
                })

            imagekit.updateFileDetails(fileId, updateData);
        });

        it('Update file details invalid updateData', function (done) {
            var fileId = "23902390239203923";

            imagekit.updateFileDetails(fileId, null, function (err, response) {
                expect(err).to.deep.equal({
                    help: "",
                    message: "Missing file update data for this request"
                })
                done();
            });
        });

        it('Update file details missing fileId', function (done) {
            var updateData = {
                tags: "sdf",
                customCoordinates: "10,10,100,100"
            }

            imagekit.updateFileDetails(null, updateData, function (err, response) {
                expect(err).to.deep.equal({
                    help: "",
                    message: "Missing File ID parameter for this request"
                })
                done();
            });
        });

        it('List files', function (done) {
            var listOptions = {
                skip: 0,
                limit: 100
            }

            const scope = nock('https://api.imagekit.io')
                .get(`/v1/files/`)
                .basicAuth({ user: initializationParams.privateKey, pass: '' })
                .query(listOptions)
                .reply(function (uri, requestBody) {
                    expect(requestBody).equal("")
                    done()
                    return [200]
                })

            imagekit.listFiles(listOptions);
        });

        it('List files empty list options', function (done) {
            const scope = nock('https://api.imagekit.io')
                .get(`/v1/files/`)
                .basicAuth({ user: initializationParams.privateKey, pass: '' })
                .query(actualQueryParams => {
                    if (Object.keys(actualQueryParams).length) {
                        done("query params should have been empty")
                    } else {
                        done();
                    }
                    return true;
                })
                .reply(function () {
                    return [200, dummyAPISuccessResponse]
                })

            imagekit.listFiles();
        });

        it('List files empty invalid options', function (done) {
            imagekit.listFiles("invalid", function (err, response) {
                expect(err).to.deep.equal({
                    message: "Missing file update data for this request",
                    help: ""
                })
                done();
            });
        });

        it('Bulk file delete by fileids', function (done) {
            var fileIds = ["fileId1", "fileId2"];

            const scope = nock('https://api.imagekit.io')
                .post(`/v1/files/batch/deleteByFileIds`)
                .basicAuth({ user: initializationParams.privateKey, pass: '' })
                .reply(200, function (uri, requestBody) {
                    expect(requestBody).to.deep.equal({
                        fileIds: fileIds
                    })
                    done()
                })

            imagekit.bulkDeleteFiles(fileIds);
        });

        it('Bulk file delete by fileids missing fileIds', function (done) {
            imagekit.bulkDeleteFiles(null, function (err, response) {
                expect(err).to.deep.equal({
                    message: "Invalid value for fileIds",
                    help: "fileIds should be an string array of fileId of the files to delete. The array should have atleast one fileId."
                })
                done();
            });
        });
    });

    describe("Success callbacks", function () {
        it('Delete single file', function (done) {
            var fileId = "23902390239203923";

            const scope = nock('https://api.imagekit.io')
                .delete(`/v1/files/${fileId}`)
                .basicAuth({ user: initializationParams.privateKey, pass: '' })
                .reply(204, null)

            var callback = sinon.spy();

            imagekit.deleteFile(fileId, callback);

            setTimeout(function () {
                expect(callback.calledOnce).to.be.true;
                sinon.assert.calledWith(callback, null, null);
                done();
            }, 50);
        });

        it('Get file metadata using file id', function (done) {
            var fileId = "23902390239203923";

            const scope = nock('https://api.imagekit.io')
                .get(`/v1/files/${fileId}/metadata`)
                .basicAuth({ user: initializationParams.privateKey, pass: '' })
                .reply(200, dummyAPISuccessResponse)

            var callback = sinon.spy();

            imagekit.getFileMetadata(fileId, callback);

            setTimeout(function () {
                expect(callback.calledOnce).to.be.true;
                sinon.assert.calledWith(callback, null, dummyAPISuccessResponse);
                done();
            }, 50);
        });

        it('Get file details', function (done) {
            var fileId = "23902390239203923";

            var callback = sinon.spy();

            const scope = nock('https://api.imagekit.io')
                .get(`/v1/files/${fileId}/details`)
                .basicAuth({ user: initializationParams.privateKey, pass: '' })
                .reply(200, dummyAPISuccessResponse)

            imagekit.getFileDetails(fileId, callback);

            setTimeout(function () {
                expect(callback.calledOnce).to.be.true;
                sinon.assert.calledWith(callback, null, dummyAPISuccessResponse);
                done();
            }, 50);
        });

        it('Update file details', function (done) {
            var fileId = "23902390239203923";

            var updateData = {
                tags: ["tag1", "tag2"],
                customCoordinates: "10,10,100,100"
            }

            var callback = sinon.spy();

            const scope = nock('https://api.imagekit.io')
                .patch(`/v1/files/${fileId}/details`)
                .basicAuth({ user: initializationParams.privateKey, pass: '' })
                .reply(200, dummyAPISuccessResponse)

            imagekit.updateFileDetails(fileId, updateData, callback);

            setTimeout(function () {
                expect(callback.calledOnce).to.be.true;
                sinon.assert.calledWith(callback, null, dummyAPISuccessResponse);
                done();
            }, 50);
        });

        it('List files', function (done) {
            var listOptions = {
                skip: 0,
                limit: 100
            }

            const scope = nock('https://api.imagekit.io')
                .get(`/v1/files/`)
                .basicAuth({ user: initializationParams.privateKey, pass: '' })
                .query(listOptions)
                .reply(200, dummyAPISuccessResponse)

            var callback = sinon.spy();

            imagekit.listFiles(listOptions, callback);

            setTimeout(function () {
                expect(callback.calledOnce).to.be.true;
                sinon.assert.calledWith(callback, null, dummyAPISuccessResponse);
                done();
            }, 50);
        });

        it('Bulk file delete by fileids', function (done) {
            var fileIds = ["fileId1", "fileId2"];

            const scope = nock('https://api.imagekit.io')
                .post(`/v1/files/batch/deleteByFileIds`)
                .basicAuth({ user: initializationParams.privateKey, pass: '' })
                .reply(200, dummyAPISuccessResponse)


            var callback = sinon.spy();

            imagekit.bulkDeleteFiles(fileIds, callback);

            setTimeout(function () {
                expect(callback.calledOnce).to.be.true;
                sinon.assert.calledWith(callback, null, dummyAPISuccessResponse);
                done();
            }, 50);
        });
    });

    describe("Error callbacks", function () {
        it('Delete single file', function (done) {
            var fileId = "23902390239203923";

            const scope = nock('https://api.imagekit.io')
                .delete(`/v1/files/${fileId}`)
                .basicAuth({ user: initializationParams.privateKey, pass: '' })
                .reply(404, dummyAPIErrorResponse)

            var callback = sinon.spy();
            imagekit.deleteFile(fileId, callback)

            setTimeout(function () {
                expect(callback.calledOnce).to.be.true;
                sinon.assert.calledWith(callback, dummyAPIErrorResponse, null);
                done();
            }, 50);
        });

        it('Get file metadata using file id', function (done) {
            var fileId = "23902390239203923";

            const scope = nock('https://api.imagekit.io')
                .get(`/v1/files/${fileId}/metadata`)
                .basicAuth({ user: initializationParams.privateKey, pass: '' })
                .reply(500, dummyAPIErrorResponse)

            var callback = sinon.spy();

            imagekit.getFileMetadata(fileId, callback);

            setTimeout(function () {
                expect(callback.calledOnce).to.be.true;
                sinon.assert.calledWith(callback, dummyAPIErrorResponse, null);
                done();
            }, 50);
        });

        it('Get file details', function (done) {
            var fileId = "23902390239203923";

            var callback = sinon.spy();

            const scope = nock('https://api.imagekit.io')
                .get(`/v1/files/${fileId}/details`)
                .basicAuth({ user: initializationParams.privateKey, pass: '' })
                .reply(500, dummyAPIErrorResponse)

            imagekit.getFileDetails(fileId, callback);

            setTimeout(function () {
                expect(callback.calledOnce).to.be.true;
                sinon.assert.calledWith(callback, dummyAPIErrorResponse, null);
                done();
            }, 50);
        });

        it('Update file details', function (done) {
            var fileId = "23902390239203923";

            var updateData = {
                tags: ["tag1", "tag2"],
                customCoordinates: "10,10,100,100"
            }

            var callback = sinon.spy();

            const scope = nock('https://api.imagekit.io')
                .patch(`/v1/files/${fileId}/details`)
                .basicAuth({ user: initializationParams.privateKey, pass: '' })
                .reply(500, dummyAPIErrorResponse)

            imagekit.updateFileDetails(fileId, updateData, callback);

            setTimeout(function () {
                expect(callback.calledOnce).to.be.true;
                sinon.assert.calledWith(callback, dummyAPIErrorResponse, null);
                done();
            }, 50);
        });

        it('List files', function (done) {
            var listOptions = {
                skip: 0,
                limit: 100
            }

            const scope = nock('https://api.imagekit.io')
                .get(`/v1/files/`)
                .basicAuth({ user: initializationParams.privateKey, pass: '' })
                .query(listOptions)
                .reply(500, dummyAPIErrorResponse)

            var callback = sinon.spy();

            imagekit.listFiles(listOptions, callback);

            setTimeout(function () {
                expect(callback.calledOnce).to.be.true;
                sinon.assert.calledWith(callback, dummyAPIErrorResponse, null);
                done();
            }, 50);
        });

        it('Bulk file delete by fileids', function (done) {
            var fileIds = ["fileId1", "fileId2"];

            const scope = nock('https://api.imagekit.io')
                .post(`/v1/files/batch/deleteByFileIds`)
                .basicAuth({ user: initializationParams.privateKey, pass: '' })
                .reply(500, dummyAPIErrorResponse)


            var callback = sinon.spy();

            imagekit.bulkDeleteFiles(fileIds, callback);

            setTimeout(function () {
                expect(callback.calledOnce).to.be.true;
                sinon.assert.calledWith(callback, dummyAPIErrorResponse, null);
                done();
            }, 50);
        });

        it('Rate limit error', function (done) {
            var fileIds = ["fileId1", "fileId2"];

            var responseBody = {
                message: "rate limit exceeded"
            };

            var rateLimitHeaders = {
                "X-RateLimit-Limit": 10,
                "X-RateLimit-Reset": 1000,
                "X-RateLimit-Interval": 1000
            }

            const scope = nock('https://api.imagekit.io')
                .post(`/v1/files/batch/deleteByFileIds`)
                .basicAuth({ user: initializationParams.privateKey, pass: '' })
                .reply(() => {
                    return [
                        429,
                        responseBody,
                        rateLimitHeaders
                    ]
                })

            imagekit.bulkDeleteFiles(fileIds, function (err, response) {
                expect(err).deep.equal({
                    ...responseBody,
                    ...rateLimitHeaders
                })
                done();
            });
        });
    });
});

