/**
 * Only checking for one API success and error. Assuing that all API uses same underlying request util
 */

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

const dummyAPIErrorResponseString = "Internal server error"

const responseHeaders = {
    'x-request-id': "request-id"
}

describe("Promise", function () {
    it('Success', async function () {
        var requestId = "sdfdsfksjfldsjfjsdf";

        const scope = nock('https://api.imagekit.io')
            .get(`/v1/files/purge/${requestId}`)
            .basicAuth({ user: initializationParams.privateKey, pass: '' })
            .reply(200, dummyAPISuccessResponse, responseHeaders)

        var response = await imagekit.getPurgeCacheStatus(requestId);
        expect(response).to.be.deep.equal(dummyAPISuccessResponse);
        expect(response.$ResponseMetadata.statusCode).to.be.equal(200);
        expect(response.$ResponseMetadata.headers).to.be.deep.equal({
            ...responseHeaders,
            'content-type': 'application/json'
        });
        return Promise.resolve();
    });

    it('Server handled error', async function () {
        var requestId = "sdfdsfksjfldsjfjsdf";

        const scope = nock('https://api.imagekit.io')
            .get(`/v1/files/purge/${requestId}`)
            .basicAuth({ user: initializationParams.privateKey, pass: '' })
            .reply(500, dummyAPIErrorResponse, responseHeaders)

        try {
            await imagekit.getPurgeCacheStatus(requestId);
        } catch (ex) {
            expect(ex).to.be.deep.equal(dummyAPIErrorResponse);
            expect(ex.$ResponseMetadata.statusCode).to.be.equal(500);
            expect(ex.$ResponseMetadata.headers).to.be.deep.equal({
                ...responseHeaders,
                'content-type': 'application/json'
            });
            return Promise.resolve();
        }

        return Promise.reject();
    });

    it('Server unhandled error', async function () {
        var requestId = "sdfdsfksjfldsjfjsdf";

        const scope = nock('https://api.imagekit.io')
            .get(`/v1/files/purge/${requestId}`)
            .basicAuth({ user: initializationParams.privateKey, pass: '' })
            .reply(500, dummyAPIErrorResponseString, responseHeaders)

        try {
            await imagekit.getPurgeCacheStatus(requestId);
        } catch (ex) {
            expect(ex).to.be.deep.equal({
                help: dummyAPIErrorResponseString
            });
            expect(ex.$ResponseMetadata.statusCode).to.be.equal(500);
            expect(Object.fromEntries(ex.$ResponseMetadata.headers)).to.be.deep.equal({
                ...responseHeaders
            });
            return Promise.resolve();
        }

        return Promise.reject();
    });
});