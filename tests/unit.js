const chai = require("chai");
const expect = chai.expect;
const ImageKit = require(".."); // This will automatically pick main module (cjs bundle) as per package.json

const urlBuilder = require("../libs/url/builder");


describe("Unit test cases", function () {
    var imagekit = new ImageKit({
        publicKey: "public_key_test",
        privateKey: "private_key_test",
        urlEndpoint: "https://test-domain.com/test-endpoint"
    });

    it('Authentication params check', function () {
        var authenticationParameters = imagekit.getAuthenticationParameters("your_token", 1582269249);
        expect(authenticationParameters).to.deep.equal({
            token: 'your_token',
            expire: 1582269249,
            signature: 'e71bcd6031016b060d349d212e23e85c791decdd'
        })
    });

    it('Authentication params check no params', function () {
        var authenticationParameters = imagekit.getAuthenticationParameters();
        expect(authenticationParameters).to.have.property("token");
        expect(authenticationParameters).to.have.property("expire");
        expect(authenticationParameters).to.have.property("signature");
    });

    it('Signed URL signature without slash default expiry', function () {
        var url = "https://test-domain.com/test-endpoint/tr:w-100/test-signed-url.png";
        var signature = urlBuilder.getSignature({
            privateKey: "private_key_test",
            url: url,
            urlEndpoint:"https://test-domain.com/test-endpoint",
            expiryTimestamp: "9999999999"
        })
        expect(signature).to.be.equal("41b3075c40bc84147eb71b8b49ae7fbf349d0f00")
    });

    it('Signed URL signature with slash default expiry', function () {
        var url = "https://test-domain.com/test-endpoint/tr:w-100/test-signed-url.png";
        var signature = urlBuilder.getSignature({
            privateKey: "private_key_test",
            url: url,
            urlEndpoint:"https://test-domain.com/test-endpoint/",
            expiryTimestamp: "9999999999"
        })
        expect(signature).to.be.equal("41b3075c40bc84147eb71b8b49ae7fbf349d0f00")
    });

    it('Signed URL signature empty', function () {
        var url = "https://test-domain.com/test-endpoint/tr:w-100/test-signed-url.png";
        var signature = urlBuilder.getSignature({
        })
        expect(signature).to.be.equal("")
    });

    it('pHash distance different', function () {
        var pHashDistance = imagekit.pHashDistance("33699c96619cc69e","968e978414fe04ea");
        expect(pHashDistance).to.be.equal(30)
    });

    it('pHash distance similar', function () {
        var pHashDistance = imagekit.pHashDistance("63433b3ccf8e1ebe","f5d2226cd9d32b16");
        expect(pHashDistance).to.be.equal(27)
    });

    it('pHash distance similar reverse', function () {
        var pHashDistance = imagekit.pHashDistance("f5d2226cd9d32b16","63433b3ccf8e1ebe");
        expect(pHashDistance).to.be.equal(27)
    });

    it('pHash distance same', function () {
        var pHashDistance = imagekit.pHashDistance("33699c96619cc69e","33699c96619cc69e");
        expect(pHashDistance).to.be.equal(0)
    });
});