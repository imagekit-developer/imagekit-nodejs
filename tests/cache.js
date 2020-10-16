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

describe("Cache purge API", function () {
    describe("Request body check", function () {
        it('Purge cache', function (done) {
            var url = "http://ik.imagekit.io/demo/default-image.jpg";

            const scope = nock('https://api.imagekit.io')
                .post("/v1/files/purge")
                .basicAuth({ user: initializationParams.privateKey, pass: '' })
                .reply(function (uri, requestBody) {
                    expect(requestBody).to.deep.equal({
                        url: url
                    });
                    done();
                    return [200];
                })

            imagekit.purgeCache(url);
        });

        it('Purge cache no url', function (done) {
            imagekit.purgeCache("", function (err, response) {
                expect(err).to.deep.equal({
                    help: "",
                    message: "Missing URL parameter for this request"
                });
                done();
            });
        });

        it('Purge cache', function (done) {
            var requestId = "sdfdsfksjfldsjfjsdf";

            const scope = nock('https://api.imagekit.io')
                .get(`/v1/files/purge/${requestId}`)
                .basicAuth({ user: initializationParams.privateKey, pass: '' })
                .reply(function (uri, requestBody) {
                    done();
                    return [200];
                })

            imagekit.getPurgeCacheStatus(requestId);
        });

        it('Purge cache missing requestId', function (done) {
            imagekit.getPurgeCacheStatus("", function (err, response) {
                expect(err).to.deep.equal({
                    help: "",
                    message: "Missing Request ID parameter for this request"
                });
                done();
            });
        });
    });

    describe("Success callbacks", function () {
        it('Purge cache', function (done) {
            var url = "http://ik.imagekit.io/demo/default-image.jpg";

            const scope = nock('https://api.imagekit.io')
                .post("/v1/files/purge")
                .basicAuth({ user: initializationParams.privateKey, pass: '' })
                .reply(200, dummyAPISuccessResponse)

            var callback = sinon.spy();
            imagekit.purgeCache(url, callback);

            setTimeout(function () {
                expect(callback.calledOnce).to.be.true;
                sinon.assert.calledWith(callback, null, dummyAPISuccessResponse);
                done();
            }, 50);
        });

        it('Purge cache', function (done) {
            var requestId = "sdfdsfksjfldsjfjsdf";

            const scope = nock('https://api.imagekit.io')
                .get(`/v1/files/purge/${requestId}`)
                .basicAuth({ user: initializationParams.privateKey, pass: '' })
                .reply(200, dummyAPISuccessResponse)

            var callback = sinon.spy();

            imagekit.getPurgeCacheStatus(requestId, callback);

            setTimeout(function () {
                expect(callback.calledOnce).to.be.true;
                sinon.assert.calledWith(callback, null, dummyAPISuccessResponse);
                done();
            }, 50);
        });
    });

    describe("Error callbacks", function () {
        it('Purge cache', function (done) {
            var url = "http://ik.imagekit.io/demo/default-image.jpg";

            const scope = nock('https://api.imagekit.io')
                .post("/v1/files/purge")
                .basicAuth({ user: initializationParams.privateKey, pass: '' })
                .reply(500, dummyAPIErrorResponse)

            var callback = sinon.spy();
            imagekit.purgeCache(url, callback);

            setTimeout(function () {
                expect(callback.calledOnce).to.be.true;
                sinon.assert.calledWith(callback, dummyAPIErrorResponse, null);
                done();
            }, 50);
        });

        it('Purge cache', function (done) {
            var requestId = "sdfdsfksjfldsjfjsdf";

            const scope = nock('https://api.imagekit.io')
                .get(`/v1/files/purge/${requestId}`)
                .basicAuth({ user: initializationParams.privateKey, pass: '' })
                .reply(500, dummyAPIErrorResponse)

            var callback = sinon.spy();

            imagekit.getPurgeCacheStatus(requestId, callback);

            setTimeout(function () {
                expect(callback.calledOnce).to.be.true;
                sinon.assert.calledWith(callback, dummyAPIErrorResponse, null);
                done();
            }, 50);
        });
    });
});

