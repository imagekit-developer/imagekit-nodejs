import chai from "chai";
import sinon from "sinon";
const expect = chai.expect;
const initializationParams = require("./data").initializationParams

import ImageKit from "../index";
import nock from "nock";
var imagekit = new ImageKit(initializationParams);

const dummyAPISuccessResponse = {
    id: "id",
    name: "name",
    label: "label",
    schema: {
        type: "number",
        minValue: 10
    }
};

const dummyAPIErrorResponse = {
    help: "help",
    message: "message"
}

describe("Custom metadata field API", function () {
    describe("Request body check", function () {
        it('Create field', function (done) {
            const scope = nock('https://api.imagekit.io')
                .post("/v1/customMetadataFields")
                .basicAuth({ user: initializationParams.privateKey, pass: '' })
                .reply(function (uri, requestBody) {
                    expect(requestBody).to.deep.equal({
                        name: "name",
                        label: "label",
                        schema: {
                            type: "number",
                            minValue: 10
                        }
                    });
                    done();
                    return [200];
                })

            imagekit.createCustomMetadataField({
                name: "name",
                label: "label",
                schema: {
                    type: "number",
                    minValue: 10
                }
            });
        });

        it('Create field missing name', function (done) {
            imagekit.createCustomMetadataField({
                label: "label",
                schema: {
                    type: "number",
                    minValue: 10
                }
            }, (err, response) => {
                expect(err).to.deep.equal({
                    help: "",
                    message: "Missing name parameter for this request"
                });
                done();
            });
        });

        it('Create field missing label', function (done) {
            imagekit.createCustomMetadataField({
                name: "name",
                schema: {
                    type: "number",
                    minValue: 10
                }
            }, (err, response) => {
                expect(err).to.deep.equal({
                    help: "",
                    message: "Missing label parameter for this request"
                });
                done();
            });
        });

        it('Create field missing schema', function (done) {
            imagekit.createCustomMetadataField({
                name: "name",
                label: "label"
            }, (err, response) => {
                expect(err).to.deep.equal({
                    help: "",
                    message: "Missing schema parameter for this request"
                });
                done();
            });
        });

        it('Create field missing schema.type', function (done) {
            imagekit.createCustomMetadataField({
                name: "name",
                label: "label",
                schema: {
                    minValue: 10
                }
            }, (err, response) => {
                expect(err).to.deep.equal({
                    help: "schema should have a mandatory type field.",
                    message: "Invalid value for schema"
                });
                done();
            });
        });

        it('Get field', function (done) {
            const scope = nock('https://api.imagekit.io')
                .get("/v1/customMetadataFields")
                .query({
                    includeDeleted: false
                })
                .basicAuth({ user: initializationParams.privateKey, pass: '' })
                .reply(function (uri, requestBody) {
                    expect(requestBody).to.be.empty;
                    done();
                    return [200];
                })

            imagekit.getCustomMetadataFields();
        });

        it('Get field - includeDeleted true', function (done) {
            const scope = nock('https://api.imagekit.io')
                .get("/v1/customMetadataFields")
                .query({
                    includeDeleted: true
                })
                .basicAuth({ user: initializationParams.privateKey, pass: '' })
                .reply(function (uri, requestBody) {
                    expect(requestBody).to.be.empty;
                    done();
                    return [200];
                })

            imagekit.getCustomMetadataFields({
                includeDeleted: true
            });
        });

        it('Update field', function (done) {
            const scope = nock('https://api.imagekit.io')
                .patch("/v1/customMetadataFields/fieldId")
                .basicAuth({ user: initializationParams.privateKey, pass: '' })
                .reply(function (uri, requestBody) {
                    expect(requestBody).to.deep.equal({
                        schema: {
                            minValue: 10
                        }
                    });
                    done();
                    return [200];
                })

            imagekit.updateCustomMetadataField("fieldId", {
                schema: {
                    minValue: 10
                }
            });
        });

        it('Update field only label', function (done) {
            const scope = nock('https://api.imagekit.io')
                .patch("/v1/customMetadataFields/fieldId")
                .basicAuth({ user: initializationParams.privateKey, pass: '' })
                .reply(function (uri, requestBody) {
                    expect(requestBody).to.deep.equal({
                        label: "new-label"
                    });
                    done();
                    return [200];
                })

            imagekit.updateCustomMetadataField("fieldId", {
                label: "new-label"
            });
        });

        it('Update field missing fieldId', function (done) {
            imagekit.updateCustomMetadataField(null, {}, (err, response) => {
                expect(err).to.deep.equal({
                    help: "",
                    message: "Missing fieldId parameter for this request"
                });
                done();
            });
        });

        it('Update field missing label and schema', function (done) {
            imagekit.updateCustomMetadataField("fieldId", {}, (err, response) => {
                expect(err).to.deep.equal({
                    help: "",
                    message: "Both label and schema is missing"
                });
                done();
            });
        });

        it('Delete field', function (done) {
            const scope = nock('https://api.imagekit.io')
                .delete("/v1/customMetadataFields/fieldId")
                .basicAuth({ user: initializationParams.privateKey, pass: '' })
                .reply(function (uri, requestBody) {
                    expect(requestBody).to.be.empty;
                    done();
                    return [204];
                })

            imagekit.deleteCustomMetadataField("fieldId");
        });

        it('Delete field missing fieldId', function (done) {
            imagekit.deleteCustomMetadataField(null, (err, response) => {
                expect(err).to.deep.equal({
                    help: "",
                    message: "Missing fieldId parameter for this request"
                });
                done();
            });
        });

    });

    describe("Success callbacks", function () {
        it('Create field', function (done) {
            const scope = nock('https://api.imagekit.io')
                .post("/v1/customMetadataFields")
                .basicAuth({ user: initializationParams.privateKey, pass: '' })
                .reply(200, dummyAPISuccessResponse)

            var callback = sinon.spy();
            imagekit.createCustomMetadataField({
                name: "name",
                label: "label",
                schema: {
                    type: "number",
                    minValue: 10
                }
            }, callback);

            setTimeout(function () {
                expect(callback.calledOnce).to.be.true;
                sinon.assert.calledWith(callback, null, dummyAPISuccessResponse);
                done();
            }, 50);
        });

        it('Get fields', function (done) {
            const scope = nock('https://api.imagekit.io')
                .get("/v1/customMetadataFields")
                .query({
                    includeDeleted: false
                })
                .basicAuth({ user: initializationParams.privateKey, pass: '' })
                .reply(200, [dummyAPISuccessResponse, dummyAPISuccessResponse])

            var callback = sinon.spy();
            imagekit.getCustomMetadataFields({}, callback);

            setTimeout(function () {
                expect(callback.calledOnce).to.be.true;
                sinon.assert.calledWith(callback, null, [dummyAPISuccessResponse, dummyAPISuccessResponse]);
                done();
            }, 50);
        });

        it('Update field', function (done) {
            const scope = nock('https://api.imagekit.io')
                .patch("/v1/customMetadataFields/fieldId")
                .basicAuth({ user: initializationParams.privateKey, pass: '' })
                .reply(200, dummyAPISuccessResponse)

            var callback = sinon.spy();
            imagekit.updateCustomMetadataField("fieldId", {
                schema: {
                    minValue: 20
                }
            }, callback);

            setTimeout(function () {
                expect(callback.calledOnce).to.be.true;
                sinon.assert.calledWith(callback, null, dummyAPISuccessResponse);
                done();
            }, 50);
        });

        it('Delete field', function (done) {
            const scope = nock('https://api.imagekit.io')
                .delete("/v1/customMetadataFields/fieldId")
                .basicAuth({ user: initializationParams.privateKey, pass: '' })
                .reply(200, null)

            var callback = sinon.spy();
            imagekit.deleteCustomMetadataField("fieldId", callback);

            setTimeout(function () {
                expect(callback.calledOnce).to.be.true;
                sinon.assert.calledWith(callback, null, null);
                done();
            }, 50);
        });
    });

    describe("Error callbacks", function () {
        it('Create field', function (done) {
            const scope = nock('https://api.imagekit.io')
                .post("/v1/customMetadataFields")
                .basicAuth({ user: initializationParams.privateKey, pass: '' })
                .reply(500, dummyAPIErrorResponse)

            var callback = sinon.spy();
            imagekit.createCustomMetadataField({
                name: "name",
                label: "label",
                schema: {
                    type: "number",
                    minValue: 10
                }
            }, callback);

            setTimeout(function () {
                expect(callback.calledOnce).to.be.true;
                sinon.assert.calledWith(callback, dummyAPIErrorResponse, null);
                done();
            }, 50);
        });

        it('Get fields', function (done) {
            const scope = nock('https://api.imagekit.io')
                .get("/v1/customMetadataFields")
                .query({
                    includeDeleted: false
                })
                .basicAuth({ user: initializationParams.privateKey, pass: '' })
                .reply(500, dummyAPIErrorResponse)

            var callback = sinon.spy();
            imagekit.getCustomMetadataFields({}, callback);

            setTimeout(function () {
                expect(callback.calledOnce).to.be.true;
                sinon.assert.calledWith(callback, dummyAPIErrorResponse, null);
                done();
            }, 50);
        });

        it('Update field', function (done) {
            const scope = nock('https://api.imagekit.io')
                .patch("/v1/customMetadataFields/fieldId")
                .basicAuth({ user: initializationParams.privateKey, pass: '' })
                .reply(500, dummyAPIErrorResponse)

            var callback = sinon.spy();
            imagekit.updateCustomMetadataField("fieldId", {
                schema: {
                    minValue: 20
                }
            }, callback);

            setTimeout(function () {
                expect(callback.calledOnce).to.be.true;
                sinon.assert.calledWith(callback, dummyAPIErrorResponse, null);
                done();
            }, 50);
        });

        it('Delete field', function (done) {
            const scope = nock('https://api.imagekit.io')
                .delete("/v1/customMetadataFields/fieldId")
                .basicAuth({ user: initializationParams.privateKey, pass: '' })
                .reply(500, dummyAPIErrorResponse)

            var callback = sinon.spy();
            imagekit.deleteCustomMetadataField("fieldId", callback);

            setTimeout(function () {
                expect(callback.calledOnce).to.be.true;
                sinon.assert.calledWith(callback, dummyAPIErrorResponse, null);
                done();
            }, 50);
        });
    });
});

