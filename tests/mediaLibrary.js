import chai from "chai";
import sinon from "sinon";
const expect = chai.expect;
const initializationParams = require("./data").initializationParams
import ImageKit from "../index";
import nock from "nock";
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
                    message: "Missing fileId parameter for this request"
                })
                done();
            });
        });

        it('Delete file versions', function (done) {
            var fileId = "23902390239203923";
            var versionId = "versionId"

            const scope = nock('https://api.imagekit.io')
                .delete(`/v1/files/${fileId}/versions/${versionId}`)
                .basicAuth({ user: initializationParams.privateKey, pass: '' })
                .reply(function (uri, requestBody) {
                    expect(this.req.path).equal(`/v1/files/${fileId}/versions/${versionId}`)
                    done();
                    return [200]
                })

            imagekit.deleteFileVersion({
                fileId,
                versionId
            });
        });

        it('Delete file versions missing fileId', function (done) {
            imagekit.deleteFileVersion(null, function (err, response) {
                expect(err).to.deep.equal({
                    help: "",
                    message: "Missing fileId parameter for this request"
                })
                done();
            });
        });

        it('Delete file versions missing versionId', function (done) {
            imagekit.deleteFileVersion({
                fileId: "fileId"
            }, function (err, response) {
                expect(err).to.deep.equal({
                    help: "",
                    message: "Missing versionId parameter for this request"
                })
                done();
            });
        });

        it('Bulk add tags missing tags', function (done) {
            var fileIds = ["23902390239203923"]
            imagekit.bulkAddTags(fileIds, null, function (err, response) {
                expect(err).to.deep.equal({
                    message: "Invalid value for tags",
                    help: "tags should be a non empty array of string like ['tag1', 'tag2']."
                })
                done();
            });
        });

        it('Bulk add tags missing fileId', function (done) {
            var tags = ['tag1'];
            imagekit.bulkAddTags(null, tags, function (err, response) {
                expect(err).to.deep.equal({
                    message: "Invalid value for fileIds",
                    help: "fileIds should be an array of fileId of the files. The array should have atleast one fileId."
                })
                done();
            });
        });

        it('Bulk remove tags', function (done) {
            var fileId = "23902390239203923";

            const scope = nock('https://api.imagekit.io')
                .post(`/v1/files/removeTags`)
                .basicAuth({ user: initializationParams.privateKey, pass: '' })
                .reply(function (uri, requestBody) {
                    expect(this.req.path).equal(`/v1/files/removeTags`)
                    expect(requestBody).to.be.deep.equal({
                        fileIds: [fileId, fileId],
                        tags: ["tag1", "tag2"]
                    })
                    done();
                    return [200]
                })

            imagekit.bulkRemoveTags([fileId, fileId], ["tag1", "tag2"]);
        });

        it('Bulk remove tags missing fileId', function (done) {
            var tags = ['tag1'];
            imagekit.bulkRemoveTags(null, tags, function (err, response) {
                expect(err).to.deep.equal({
                    message: "Invalid value for fileIds",
                    help: "fileIds should be an array of fileId of the files. The array should have atleast one fileId."
                })
                done();
            });
        });

        it('Bulk remove tags missing tags', function (done) {
            var fileIds = ["23902390239203923"]
            imagekit.bulkRemoveTags(fileIds, null, function (err, response) {
                expect(err).to.deep.equal({
                    message: "Invalid value for tags",
                    help: "tags should be a non empty array of string like ['tag1', 'tag2']."
                })
                done();
            });
        });

        it('Bulk remove AITags', function (done) {
            var fileId = "23902390239203923";

            const scope = nock('https://api.imagekit.io')
                .post(`/v1/files/removeAITags`)
                .basicAuth({ user: initializationParams.privateKey, pass: '' })
                .reply(function (uri, requestBody) {
                    expect(this.req.path).equal(`/v1/files/removeAITags`)
                    expect(requestBody).to.be.deep.equal({
                        fileIds: [fileId, fileId],
                        AITags: ["tag1", "tag2"]
                    })
                    done();
                    return [200]
                })

            imagekit.bulkRemoveAITags([fileId, fileId], ["tag1", "tag2"]);
        });

        it('Bulk remove AITags missing fileId', function (done) {
            var tags = ['tag1'];
            imagekit.bulkRemoveAITags(null, tags, function (err, response) {
                expect(err).to.deep.equal({
                    message: "Invalid value for fileIds",
                    help: "fileIds should be an array of fileId of the files. The array should have atleast one fileId."
                })
                done();
            });
        });

        it('Bulk remove AITags missing tags', function (done) {
            var fileIds = ["23902390239203923"]
            imagekit.bulkRemoveAITags(fileIds, null, function (err, response) {
                expect(err).to.deep.equal({
                    message: "Invalid value for tags",
                    help: "tags should be a non empty array of string like ['tag1', 'tag2']."
                })
                done();
            });
        });

        it('Copy file - default options', function (done) {
            var fileId = "23902390239203923";

            const scope = nock('https://api.imagekit.io')
                .post(`/v1/files/copy`)
                .basicAuth({ user: initializationParams.privateKey, pass: '' })
                .reply(function (uri, requestBody) {
                    expect(this.req.path).equal(`/v1/files/copy`)
                    expect(requestBody).to.be.deep.equal({
                        sourceFilePath: "/xyz",
                        destinationPath: "/abc",
                        includeFileVersions: false
                    })
                    done();
                    return [200]
                })

            imagekit.copyFile({
                sourceFilePath: "/xyz",
                destinationPath: "/abc"
            });
        });

        it('Copy file', function (done) {
            var fileId = "23902390239203923";

            const scope = nock('https://api.imagekit.io')
                .post(`/v1/files/copy`)
                .basicAuth({ user: initializationParams.privateKey, pass: '' })
                .reply(function (uri, requestBody) {
                    expect(this.req.path).equal(`/v1/files/copy`)
                    expect(requestBody).to.be.deep.equal({
                        sourceFilePath: "/xyz.jpg",
                        destinationPath: "/abc",
                        includeFileVersions: true
                    })
                    done();
                    return [200]
                })

            imagekit.copyFile({
                sourceFilePath: "/xyz.jpg",
                destinationPath: "/abc",
                includeFileVersions: true
            });
        });

        it('Copy file invalid folder path', function (done) {
            var sourceFilePath = "/file.jpg";
            imagekit.copyFile({ sourceFilePath, destinationPath: null }, function (err, response) {
                expect(err).to.deep.equal({
                    message: "Invalid destinationPath value",
                    help: "It should be a string like '/path/to/folder'"
                })
                done();
            });
        });

        it('Copy file invalid file path', function (done) {
            var destinationPath = "/";
            imagekit.copyFile({ sourceFilePath: null, destinationPath }, function (err, response) {
                expect(err).to.deep.equal({
                    message: "Invalid sourceFilePath value",
                    help: "It should be a string like /path/to/file.jpg'"
                })
                done();
            });
        });

        it('Copy file invalid includeFileVersions value', function (done) {
            var sourceFilePath = "/sdf.jpg";
            var destinationPath = "/";
            imagekit.copyFile({ sourceFilePath, destinationPath, includeFileVersions: "sdf" }, function (err, response) {
                expect(err).to.deep.equal({
                    message: "Invalid includeFileVersions value",
                    help: "It should be a boolean"
                })
                done();
            });
        });

        it('Move file', function (done) {
            const scope = nock('https://api.imagekit.io')
                .post(`/v1/files/move`)
                .basicAuth({ user: initializationParams.privateKey, pass: '' })
                .reply(function (uri, requestBody) {
                    expect(this.req.path).equal(`/v1/files/move`)
                    expect(requestBody).to.be.deep.equal({
                        sourceFilePath: "/abc.jpg",
                        destinationPath: "/xyz"
                    })
                    done();
                    return [200]
                });

            imagekit.moveFile({ sourceFilePath: "/abc.jpg", destinationPath: "/xyz" });
        });

        it('Move file invalid folder path', function (done) {
            var sourceFilePath = "/file.jpg";
            imagekit.moveFile({ sourceFilePath, destinationPath: null }, function (err, response) {
                expect(err).to.deep.equal({
                    message: "Invalid destinationPath value",
                    help: "It should be a string like '/path/to/folder'"
                })
                done();
            });
        });

        it('Move file invalid file path', function (done) {
            var destinationPath = "/";
            imagekit.moveFile({ sourceFilePath: null, destinationPath }, function (err, response) {
                expect(err).to.deep.equal({
                    message: "Invalid sourceFilePath value",
                    help: "It should be a string like /path/to/file.jpg'"
                })
                done();
            });
        });

        it('Rename file - default purgeCache value', function (done) {
            const scope = nock('https://api.imagekit.io')
                .post(`/v1/files/rename`)
                .basicAuth({ user: initializationParams.privateKey, pass: '' })
                .reply(function (uri, requestBody) {
                    expect(this.req.path).equal(`/v1/files/rename`)
                    expect(requestBody).to.be.deep.equal({
                        filePath: "/abc.jpg",
                        newFileName: "test.jpg",
                        purgeCache: false
                    })
                    done();
                    return [200]
                });

            imagekit.renameFile({
                filePath: "/abc.jpg",
                newFileName: "test.jpg"
            })
        });

        it('Rename file', function (done) {
            const scope = nock('https://api.imagekit.io')
                .post(`/v1/files/rename`)
                .basicAuth({ user: initializationParams.privateKey, pass: '' })
                .reply(function (uri, requestBody) {
                    expect(this.req.path).equal(`/v1/files/rename`)
                    expect(requestBody).to.be.deep.equal({
                        filePath: "/abc.jpg",
                        newFileName: "test.jpg",
                        purgeCache: true
                    })
                    done();
                    return [200]
                });

            imagekit.renameFile({
                filePath: "/abc.jpg",
                newFileName: "test.jpg",
                purgeCache: true
            })
        });

        it('Rename file - invalid filePath', function (done) {
            imagekit.renameFile({
                filePath: null,
                newFileName: "test.jpg"
            }, function (err, response) {
                expect(err).to.deep.equal({
                    message: "Invalid value for filePath",
                    help: "Pass the full path of the file. For example - /path/to/file.jpg"
                })
                done();
            });
        });

        it('Rename file - invalid newFileName', function (done) {
            imagekit.renameFile({
                filePath: "/xyz.jpg",
                newFileName: null,
            }, function (err, response) {
                expect(err).to.deep.equal({
                    message: "Invalid value for newFileName. It should be a string.",
                    help: ""
                })
                done();
            });
        });

        it('Rename file - invalid purgeCache', function (done) {
            imagekit.renameFile({
                filePath: "/xyz.jpg",
                newFileName: "test.pdf",
                purgeCache: "sdf"
            }, function (err, response) {
                expect(err).to.deep.equal({
                    message: "Invalid value for purgeCache. It should be boolean.",
                    help: ""
                })
                done();
            });
        });

        it('Restore file version', function (done) {
            var fileId = "fileId";
            var versionId = "versionId";
            const scope = nock('https://api.imagekit.io')
                .put(`/v1/files/${fileId}/versions/${versionId}/restore`)
                .basicAuth({ user: initializationParams.privateKey, pass: '' })
                .reply(function (uri, requestBody) {
                    expect(this.req.path).equal(`/v1/files/${fileId}/versions/${versionId}/restore`)
                    expect(requestBody).to.be.empty;
                    done();
                    return [200]
                });

            imagekit.restoreFileVersion({
                fileId,
                versionId,
            })
        });

        it('Restore file version - missing fileId', function (done) {
            imagekit.restoreFileVersion({
                fileId: null,
                versionId: "versionId",
            }, function (err, response) {
                expect(err).to.deep.equal({
                    message: "Missing fileId parameter for this request",
                    help: ""
                })
                done();
            });
        });

        it('Restore file version - missing versionId', function (done) {
            imagekit.restoreFileVersion({
                fileId: "fileId",
                versionId: null
            }, function (err, response) {
                expect(err).to.deep.equal({
                    message: "Missing versionId parameter for this request",
                    help: ""
                })
                done();
            });
        });

        it('Copy folder - default options', function (done) {
            const scope = nock('https://api.imagekit.io')
                .post(`/v1/bulkJobs/copyFolder`)
                .basicAuth({ user: initializationParams.privateKey, pass: '' })
                .reply(function (uri, requestBody) {
                    expect(this.req.path).equal(`/v1/bulkJobs/copyFolder`)
                    expect(requestBody).to.be.deep.equal({
                        sourceFolderPath: "/source-folder",
                        destinationPath: "/destination",
                        includeFileVersions: false
                    })
                    done();
                    return [200]
                });

            imagekit.copyFolder({
                sourceFolderPath: "/source-folder",
                destinationPath: "/destination"
            })
        });

        it('Copy folder', function (done) {
            const scope = nock('https://api.imagekit.io')
                .post(`/v1/bulkJobs/copyFolder`)
                .basicAuth({ user: initializationParams.privateKey, pass: '' })
                .reply(function (uri, requestBody) {
                    expect(this.req.path).equal(`/v1/bulkJobs/copyFolder`)
                    expect(requestBody).to.be.deep.equal({
                        sourceFolderPath: "/source-folder",
                        destinationPath: "/destination",
                        includeFileVersions: true
                    })
                    done();
                    return [200]
                });

            imagekit.copyFolder({
                sourceFolderPath: "/source-folder",
                destinationPath: "/destination",
                includeFileVersions: true
            })
        });

        it('Copy folder invalid sourceFolderPath', function (done) {
            var destinationPath = "/";
            imagekit.copyFolder({ sourceFolderPath: null, destinationPath }, function (err, response) {
                expect(err).to.deep.equal({
                    message: "Invalid sourceFolderPath value",
                    help: "It should be a string like '/path/to/folder'"
                })
                done();
            });
        });

        it('Copy folder invalid destinationPath', function (done) {
            var sourceFolderPath = "/";
            imagekit.copyFolder({ sourceFolderPath, destinationPath: null }, function (err, response) {
                expect(err).to.deep.equal({
                    message: "Invalid destinationPath value",
                    help: "It should be a string like '/path/to/folder'"
                })
                done();
            });
        });

        it('Copy folder invalid includeFileVersions', function (done) {
            var sourceFolderPath = "/";
            imagekit.copyFolder({ sourceFolderPath, destinationPath: "/sdf", includeFileVersions: "sdf" }, function (err, response) {
                expect(err).to.deep.equal({
                    message: "Invalid includeFileVersions value",
                    help: "It should be a boolean"
                })
                done();
            });
        });

        it('Move folder', function (done) {
            const scope = nock('https://api.imagekit.io')
                .post(`/v1/bulkJobs/moveFolder`)
                .basicAuth({ user: initializationParams.privateKey, pass: '' })
                .reply(function (uri, requestBody) {
                    expect(this.req.path).equal(`/v1/bulkJobs/moveFolder`)
                    expect(requestBody).to.be.deep.equal({
                        sourceFolderPath: "/source-folder",
                        destinationPath: "/destination"
                    })
                    done();
                    return [200]
                });

            imagekit.moveFolder({
                sourceFolderPath: "/source-folder",
                destinationPath: "/destination"
            })
        });

        it('Move folder invalid destinationPath', function (done) {
            var sourceFolderPath = "/";
            imagekit.moveFolder({ sourceFolderPath, destinationPath: null }, function (err, response) {
                expect(err).to.deep.equal({
                    message: "Invalid destinationPath value",
                    help: "It should be a string like '/path/to/folder'"
                })
                done();
            });
        });

        it('Move folder invalid sourceFolderPath', function (done) {
            var destinationPath = "/";
            imagekit.moveFolder({ sourceFolderPath: null, destinationPath }, function (err, response) {
                expect(err).to.deep.equal({
                    message: "Invalid sourceFolderPath value",
                    help: "It should be a string like '/path/to/folder'"
                })
                done();
            });
        });

        it('Create folder', function (done) {
            const scope = nock('https://api.imagekit.io')
                .post(`/v1/folder`)
                .basicAuth({ user: initializationParams.privateKey, pass: '' })
                .reply(function (uri, requestBody) {
                    expect(this.req.path).equal(`/v1/folder`)
                    expect(requestBody).to.be.deep.equal({
                        folderName: "abc",
                        parentFolderPath: "/path/to/folder"
                    })
                    done();
                    return [200]
                });

            imagekit.createFolder({
                folderName: "abc",
                parentFolderPath: "/path/to/folder"
            })
        });

        it('Create folder invalid name', function (done) {
            var folderName = "";
            var parentFolderPath = "";
            imagekit.createFolder({ folderName, parentFolderPath }, function (err, response) {
                expect(err).to.deep.equal({
                    message: "Invalid folderName value",
                    help: ""
                })
                done();
            });
        });

        it('Create folder invalid path', function (done) {
            var folderName = "folder1";
            var parentFolderPath = "";
            imagekit.createFolder({ folderName, parentFolderPath }, function (err, response) {
                expect(err).to.deep.equal({
                    message: "Invalid parentFolderPath value",
                    help: "It should be a string like '/path/to/folder'"
                })
                done();
            });
        });

        it('Delete folder', function (done) {
            const scope = nock('https://api.imagekit.io')
                .delete(`/v1/folder`)
                .basicAuth({ user: initializationParams.privateKey, pass: '' })
                .reply(function (uri, requestBody) {
                    expect(this.req.path).equal(`/v1/folder`)
                    expect(requestBody).to.be.deep.equal({
                        folderPath: "/path/to/folder",
                    })
                    done();
                    return [200]
                });

            imagekit.deleteFolder("/path/to/folder")
        });

        it('Delete folder invalid path', function (done) {
            imagekit.deleteFolder(null, function (err, response) {
                expect(err).to.deep.equal({
                    message: "Invalid folderPath value",
                    help: "It should be a string like '/path/to/folder'"
                })
                done();
            });
        });

        it('Get file metadata using fileId', function (done) {
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

        it('Get file metadata using fileId missing fileId', function (done) {
            imagekit.getFileMetadata(null, function (err, response) {
                expect(err).to.deep.equal({
                    help: "",
                    message: "Pass either fileId or remote URL of the image as first parameter"
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
                    message: "Missing fileId parameter for this request"
                })
                done();
            });
        });

        it('Get all file versions', function (done) {
            var fileId = "23902390239203923";

            const scope = nock('https://api.imagekit.io')
                .get(`/v1/files/${fileId}/versions`)
                .basicAuth({ user: initializationParams.privateKey, pass: '' })
                .reply(200, function (uri, requestBody) {
                    expect(this.req.path).equal(`/v1/files/${fileId}/versions`)
                    done()
                    return [200]
                })

            imagekit.getFileVersions(fileId);
        });

        it('Get all file versions - missing fileId', function (done) {
            imagekit.getFileVersions(null, function (err, response) {
                expect(err).to.deep.equal({
                    help: "",
                    message: "Missing fileId parameter for this request"
                })
                done();
            });
        });

        it('Get file versions details', function (done) {
            var fileId = "fileId";
            var versionId = "versionId";

            const scope = nock('https://api.imagekit.io')
                .get(`/v1/files/${fileId}/versions/${versionId}`)
                .basicAuth({ user: initializationParams.privateKey, pass: '' })
                .reply(200, function (uri, requestBody) {
                    expect(this.req.path).equal(`/v1/files/${fileId}/versions/${versionId}`)
                    done()
                    return [200]
                })

            imagekit.getFileVersionDetails({
                fileId,
                versionId
            });
        });

        it('Get file versions details - missing fileId', function (done) {
            var fileId = "fileId";
            var versionId = "versionId";

            imagekit.getFileVersionDetails({
                fileId: null,
                versionId
            }, function (err, response) {
                expect(err).to.deep.equal({
                    help: "",
                    message: "Missing fileId parameter for this request"
                })
                done();
            });
        });

        it('Get file versions details - missing versionId', function (done) {
            var fileId = "fileId";
            var versionId = "versionId";

            imagekit.getFileVersionDetails({
                fileId,
                versionId: null
            }, function (err, response) {
                expect(err).to.deep.equal({
                    help: "",
                    message: "Missing versionId parameter for this request"
                })
                done();
            });
        });

        it('Update file details', function (done) {
            var fileId = "23902390239203923";

            var updateData = {
                tags: ["tag1", "tag2"],
                customCoordinates: "10,10,100,100",
                extensions: [
                    {
                        name: "google-auto-tagging",
                        maxTags: 5,
                        minConfidence: 95
                    }
                ],
                customMetadata: {
                    SKU: 10
                },
                webhookUrl: "https://some-domain/some-api-id"
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
                    message: "Missing fileId parameter for this request"
                })
                done();
            });
        });

        it('List files', function (done) {
            var listOptions = {
                skip: 0,
                limit: 100,
                tags: ["t-shirt", "summer"]
            }

            const scope = nock('https://api.imagekit.io')
                .get(`/v1/files/`)
                .basicAuth({ user: initializationParams.privateKey, pass: '' })
                .query({
                    skip: listOptions.skip,
                    limit: listOptions.limit,
                    tags: listOptions.tags.join(",")
                })
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
                    message: "Pass a valid JSON list options e.g. {skip: 10, limit: 100}.",
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
                    help: "fileIds should be an array of fileId of the files. The array should have atleast one fileId."
                })
                done();
            });
        });

        it('Get bulk job status', function (done) {
            var jobId = "23902390239203923";

            const scope = nock('https://api.imagekit.io')
                .get(`/v1/bulkJobs/${jobId}`)
                .basicAuth({ user: initializationParams.privateKey, pass: '' })
                .reply(function (uri, requestBody) {
                    expect(this.req.path).equal(`/v1/bulkJobs/${jobId}`)
                    done();
                    return [200]
                })

            imagekit.getBulkJobStatus(jobId);
        });

        it('Get bulk job status missing jobId', function (done) {
            imagekit.getBulkJobStatus(null, function (err, response) {
                expect(err).to.deep.equal({
                    help: "",
                    message: "Missing jobId parameter"
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
                sinon.assert.calledWith(callback, null, {});
                done();
            }, 50);
        });

        it('Get file metadata using fileId', function (done) {
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

        it('Get file metadata using remote URL', function (done) {
            var url = "https://ik.imagekit.io/demo/image.jpg";

            const scope = nock('https://api.imagekit.io')
                .get(`/v1/metadata`)
                .basicAuth({ user: initializationParams.privateKey, pass: '' })
                .query({
                    url: url
                })
                .reply(200, dummyAPISuccessResponse)

            var callback = sinon.spy();

            imagekit.getFileMetadata(url, callback);

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

        it('Bulk add tags', function (done) {
            var fileIds = ["fileId1", "fileId2"];
            var tags = ["tag1", "tag2"];

            const scope = nock('https://api.imagekit.io')
                .post(`/v1/files/addTags`)
                .basicAuth({ user: initializationParams.privateKey, pass: '' })
                .reply(200, dummyAPISuccessResponse)

            var callback = sinon.spy();

            imagekit.bulkAddTags(fileIds, tags, callback);

            setTimeout(function () {
                expect(callback.calledOnce).to.be.true;
                sinon.assert.calledWith(callback, null, dummyAPISuccessResponse);
                done();
            }, 50);
        });

        it('Bulk remove tags', function (done) {
            var fileIds = ["fileId1", "fileId2"];
            var tags = ["tag1", "tag2"];

            const scope = nock('https://api.imagekit.io')
                .post(`/v1/files/removeTags`)
                .basicAuth({ user: initializationParams.privateKey, pass: '' })
                .reply(200, dummyAPISuccessResponse)

            var callback = sinon.spy();

            imagekit.bulkRemoveTags(fileIds, tags, callback);

            setTimeout(function () {
                expect(callback.calledOnce).to.be.true;
                sinon.assert.calledWith(callback, null, dummyAPISuccessResponse);
                done();
            }, 50);
        });

        it('Copy file', function (done) {
            var sourceFilePath = "/file_path.jpg";
            var destinationPath = "/folder1/";

            const scope = nock('https://api.imagekit.io')
                .post(`/v1/files/copy`)
                .basicAuth({ user: initializationParams.privateKey, pass: '' })
                .reply(204, dummyAPISuccessResponse)

            var callback = sinon.spy();

            imagekit.copyFile({ sourceFilePath, destinationPath }, callback);

            setTimeout(function () {
                expect(callback.calledOnce).to.be.true;
                sinon.assert.calledWith(callback, null, dummyAPISuccessResponse);
                done();
            }, 50);
        });

        it('Move file', function (done) {
            var sourceFilePath = "/file_path.jpg";
            var destinationPath = "/folder1/";

            const scope = nock('https://api.imagekit.io')
                .post(`/v1/files/move`)
                .basicAuth({ user: initializationParams.privateKey, pass: '' })
                .reply(204, dummyAPISuccessResponse)

            var callback = sinon.spy();

            imagekit.moveFile({ sourceFilePath, destinationPath }, callback);

            setTimeout(function () {
                expect(callback.calledOnce).to.be.true;
                sinon.assert.calledWith(callback, null, dummyAPISuccessResponse);
                done();
            }, 50);
        });

        it('Rename file', function (done) {
            const scope = nock('https://api.imagekit.io')
                .post(`/v1/files/rename`)
                .basicAuth({ user: initializationParams.privateKey, pass: '' })
                .reply(204, dummyAPISuccessResponse)

            var callback = sinon.spy();

            imagekit.renameFile({
                filePath: "/xyz.jpg",
                newFileName: "test.jpg"
            }, callback);

            setTimeout(function () {
                expect(callback.calledOnce).to.be.true;
                sinon.assert.calledWith(callback, null, dummyAPISuccessResponse);
                done();
            }, 50);
        });

        it('Restore file version', function (done) {
            var fileId = "fileId";
            var versionId = "versionId";
            const scope = nock('https://api.imagekit.io')
                .put(`/v1/files/${fileId}/versions/${versionId}/restore`)
                .basicAuth({ user: initializationParams.privateKey, pass: '' })
                .reply(204, dummyAPISuccessResponse)

            var callback = sinon.spy();

            imagekit.restoreFileVersion({
                fileId,
                versionId
            }, callback);

            setTimeout(function () {
                expect(callback.calledOnce).to.be.true;
                sinon.assert.calledWith(callback, null, dummyAPISuccessResponse);
                done();
            }, 50);
        });

        it('Copy folder', function (done) {
            var sourceFolderPath = "/folder2";
            var destinationPath = "/folder1/";

            const scope = nock('https://api.imagekit.io')
                .post(`/v1/bulkJobs/copyFolder`)
                .basicAuth({ user: initializationParams.privateKey, pass: '' })
                .reply(200, dummyAPISuccessResponse)

            var callback = sinon.spy();

            imagekit.copyFolder({ sourceFolderPath, destinationPath }, callback);

            setTimeout(function () {
                expect(callback.calledOnce).to.be.true;
                sinon.assert.calledWith(callback, null, dummyAPISuccessResponse);
                done();
            }, 50);
        });

        it('Move folder', function (done) {
            var sourceFolderPath = "/folder1";
            var destinationPath = "/folder2/";

            const scope = nock('https://api.imagekit.io')
                .post(`/v1/bulkJobs/moveFolder`)
                .basicAuth({ user: initializationParams.privateKey, pass: '' })
                .reply(200, dummyAPISuccessResponse)

            var callback = sinon.spy();

            imagekit.moveFolder({ sourceFolderPath, destinationPath }, callback);

            setTimeout(function () {
                expect(callback.calledOnce).to.be.true;
                sinon.assert.calledWith(callback, null, dummyAPISuccessResponse);
                done();
            }, 50);
        });

        it('Get bulk job status', function (done) {
            var jobId = "23902390239203923";

            const scope = nock('https://api.imagekit.io')
                .get(`/v1/bulkJobs/${jobId}`)
                .basicAuth({ user: initializationParams.privateKey, pass: '' })
                .reply(200, dummyAPISuccessResponse)

            var callback = sinon.spy();

            imagekit.getBulkJobStatus(jobId, callback);

            setTimeout(function () {
                expect(callback.calledOnce).to.be.true;
                sinon.assert.calledWith(callback, null, dummyAPISuccessResponse);
                done();
            }, 50);
        });

        it('Create folder', function (done) {
            var folderName = "folder1";
            var parentFolderPath = "/";

            const scope = nock('https://api.imagekit.io')
                .post('/v1/folder')
                .basicAuth({ user: initializationParams.privateKey, pass: '' })
                .reply(201, dummyAPISuccessResponse)

            var callback = sinon.spy();

            imagekit.createFolder({ folderName, parentFolderPath }, callback);

            setTimeout(function () {
                expect(callback.calledOnce).to.be.true;
                sinon.assert.calledWith(callback, null, dummyAPISuccessResponse);
                done();
            }, 50);
        });

        it('Delete folder', function (done) {
            var folderPath = "/folder1/";

            const scope = nock('https://api.imagekit.io')
                .delete(`/v1/folder`)
                .basicAuth({ user: initializationParams.privateKey, pass: '' })
                .reply(204, dummyAPISuccessResponse)

            var callback = sinon.spy();

            imagekit.deleteFolder(folderPath, callback);

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

        it('Get file metadata using fileId', function (done) {
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

        it('Get file metadata using remote URL', function (done) {
            var url = "https://ik.imagekit.io/demo/image.jpg";

            const scope = nock('https://api.imagekit.io')
                .get(`/v1/metadata`)
                .query({
                    url
                })
                .basicAuth({ user: initializationParams.privateKey, pass: '' })
                .reply(500, dummyAPIErrorResponse)

            var callback = sinon.spy();

            imagekit.getFileMetadata(url, callback);

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

        it('Bulk add tags', function (done) {
            var fileIds = ["fileId1", "fileId2"];
            var tags = ["tag1", "tag2"];

            const scope = nock('https://api.imagekit.io')
                .post(`/v1/files/addTags`)
                .basicAuth({ user: initializationParams.privateKey, pass: '' })
                .reply(404, dummyAPIErrorResponse)

            var callback = sinon.spy();

            imagekit.bulkAddTags(fileIds, tags, callback);

            setTimeout(function () {
                expect(callback.calledOnce).to.be.true;
                sinon.assert.calledWith(callback, dummyAPIErrorResponse, null);
                done();
            }, 50);
        });

        it('Bulk remove tags', function (done) {
            var fileIds = ["fileId1", "fileId2"];
            var tags = ["tag1", "tag2"];

            const scope = nock('https://api.imagekit.io')
                .post(`/v1/files/removeTags`)
                .basicAuth({ user: initializationParams.privateKey, pass: '' })
                .reply(404, dummyAPIErrorResponse)

            var callback = sinon.spy();

            imagekit.bulkRemoveTags(fileIds, tags, callback);

            setTimeout(function () {
                expect(callback.calledOnce).to.be.true;
                sinon.assert.calledWith(callback, dummyAPIErrorResponse, null);
                done();
            }, 50);
        });

        it('Copy file', function (done) {
            var sourceFilePath = "/file_path.jpg";
            var destinationPath = "/folder1/";

            const scope = nock('https://api.imagekit.io')
                .post(`/v1/files/copy`)
                .basicAuth({ user: initializationParams.privateKey, pass: '' })
                .reply(404, dummyAPIErrorResponse)

            var callback = sinon.spy();

            imagekit.copyFile({ sourceFilePath, destinationPath }, callback);

            setTimeout(function () {
                expect(callback.calledOnce).to.be.true;
                sinon.assert.calledWith(callback, dummyAPIErrorResponse, null);
                done();
            }, 50);
        });

        it('Move file', function (done) {
            var sourceFilePath = "/file_path.jpg";
            var destinationPath = "/folder1/";

            const scope = nock('https://api.imagekit.io')
                .post(`/v1/files/move`)
                .basicAuth({ user: initializationParams.privateKey, pass: '' })
                .reply(404, dummyAPIErrorResponse)

            var callback = sinon.spy();

            imagekit.moveFile({ sourceFilePath, destinationPath }, callback);

            setTimeout(function () {
                expect(callback.calledOnce).to.be.true;
                sinon.assert.calledWith(callback, dummyAPIErrorResponse, null);
                done();
            }, 50);
        });

        it('Rename file', function (done) {
            const scope = nock('https://api.imagekit.io')
                .post(`/v1/files/rename`)
                .basicAuth({ user: initializationParams.privateKey, pass: '' })
                .reply(500, dummyAPIErrorResponse)

            var callback = sinon.spy();

            imagekit.renameFile({
                filePath: "/xyz.jpg",
                newFileName: "test.jpg"
            }, callback);

            setTimeout(function () {
                expect(callback.calledOnce).to.be.true;
                sinon.assert.calledWith(callback, dummyAPIErrorResponse, null);
                done();
            }, 50);
        });

        it('Restore file version', function (done) {
            var fileId = "fileId";
            var versionId = "versionId";
            const scope = nock('https://api.imagekit.io')
                .put(`/v1/files/${fileId}/versions/${versionId}/restore`)
                .basicAuth({ user: initializationParams.privateKey, pass: '' })
                .reply(500, dummyAPIErrorResponse)

            var callback = sinon.spy();

            imagekit.restoreFileVersion({
                fileId,
                versionId
            }, callback);

            setTimeout(function () {
                expect(callback.calledOnce).to.be.true;
                sinon.assert.calledWith(callback, dummyAPIErrorResponse, null);
                done();
            }, 50);
        });

        it('Copy folder', function (done) {
            var sourceFolderPath = "/folder2";
            var destinationPath = "/folder1/";

            const scope = nock('https://api.imagekit.io')
                .post(`/v1/bulkJobs/copyFolder`)
                .basicAuth({ user: initializationParams.privateKey, pass: '' })
                .reply(404, dummyAPIErrorResponse)

            var callback = sinon.spy();

            imagekit.copyFolder({ sourceFolderPath, destinationPath }, callback);

            setTimeout(function () {
                expect(callback.calledOnce).to.be.true;
                sinon.assert.calledWith(callback, dummyAPIErrorResponse, null);
                done();
            }, 50);
        });

        it('Move folder', function (done) {
            var sourceFolderPath = "/folder1";
            var destinationPath = "/folder2/";

            const scope = nock('https://api.imagekit.io')
                .post(`/v1/bulkJobs/moveFolder`)
                .basicAuth({ user: initializationParams.privateKey, pass: '' })
                .reply(404, dummyAPIErrorResponse)

            var callback = sinon.spy();

            imagekit.moveFolder({ sourceFolderPath, destinationPath }, callback);

            setTimeout(function () {
                expect(callback.calledOnce).to.be.true;
                sinon.assert.calledWith(callback, dummyAPIErrorResponse, null);
                done();
            }, 50);
        });

        it('Get bulk job status', function (done) {
            var jobId = "23902390239203923";

            const scope = nock('https://api.imagekit.io')
                .get(`/v1/bulkJobs/${jobId}`)
                .basicAuth({ user: initializationParams.privateKey, pass: '' })
                .reply(500, dummyAPIErrorResponse)

            var callback = sinon.spy();

            imagekit.getBulkJobStatus(jobId, callback);

            setTimeout(function () {
                expect(callback.calledOnce).to.be.true;
                sinon.assert.calledWith(callback, dummyAPIErrorResponse, null);
                done();
            }, 50);
        });

        it('Create folder', function (done) {
            var folderName = "folder1";
            var parentFolderPath = "/";

            const scope = nock('https://api.imagekit.io')
                .post('/v1/folder')
                .basicAuth({ user: initializationParams.privateKey, pass: '' })
                .reply(500, dummyAPIErrorResponse)

            var callback = sinon.spy();

            imagekit.createFolder({ folderName, parentFolderPath }, callback);

            setTimeout(function () {
                expect(callback.calledOnce).to.be.true;
                sinon.assert.calledWith(callback, dummyAPIErrorResponse, null);
                done();
            }, 50);
        });

        it('Delete folder', function (done) {
            var folderPath = "/folder1/";

            const scope = nock('https://api.imagekit.io')
                .delete(`/v1/folder`)
                .basicAuth({ user: initializationParams.privateKey, pass: '' })
                .reply(404, dummyAPIErrorResponse)

            var callback = sinon.spy();

            imagekit.deleteFolder(folderPath, callback);

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

