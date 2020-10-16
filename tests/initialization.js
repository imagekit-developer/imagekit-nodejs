const chai = require("chai");
const expect = chai.expect;
const initializationParams = require("./data").initializationParams
const ImageKit = require(".."); // This will automatically pick main module (cjs bundle) as per package.json


describe("Initialization checks", function () {
    var imagekit = new ImageKit(initializationParams);

    it('should throw error', function () {
        try {
            new ImageKit({});
        } catch(err) {
            expect(err.message).to.be.equal('Missing publicKey during ImageKit initialization');
        }
    });

    it('should throw error', function () {
        try {
            new ImageKit({
                publicKey: "test_public_key"
            });
        } catch(err) {
            expect(err.message).to.be.equal('Missing privateKey during ImageKit initialization');
        }
    });

    it('should throw error', function () {
        try {
            new ImageKit({
                publicKey: "test_public_key",
                privateKey: "test_private_key"
            });
        } catch(err) {
            expect(err.message).to.be.equal('Missing urlEndpoint during ImageKit initialization');
        }
    });

    it('callback', function () {
        var imagekit = new ImageKit({
            urlEndpoint: "https://ik.imagekit.io/demo",
            publicKey: "test_public_key",
            privateKey: "test_private_key"
        });
        try {
            imagekit.getFileDetails("fileId","wrongCallback");
        } catch(err) {
            expect(err.message).to.be.equal("Callback must be a function.")
        }
    });

    it('should have options object', function () {
        expect(imagekit.options).to.be.an('object');
    });

    it('should have correctly initialized options object.', function () {
        expect(imagekit.options).to.have.property('publicKey').to.be.equal(initializationParams.publicKey);
        expect(imagekit.options).to.have.property('urlEndpoint').to.be.equal(initializationParams.urlEndpoint);
        expect(imagekit.options).to.have.property('authenticationEndpoint').to.be.equal(initializationParams.authenticationEndpoint);
    });

    it("should have callable functions 'url' and 'upload'", function () {
        expect(imagekit.url).to.exist.and.to.be.a('function');
        expect(imagekit.upload).to.exist.and.to.be.a('function');
    });
});