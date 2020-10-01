const chai = require("chai");
const expect = chai.expect;
const initializationParams = require("./data").initializationParams
const ImageKit = require(".."); // This will automatically pick main module (cjs bundle) as per package.json


describe("Authentication params check", function () {
    var imagekit = new ImageKit({
        publicKey: "public_key_test",
        privateKey: "private_key_test",
        urlEndpoint: "https://test-domain.com/test-endpoint"
    });

    it('Singature should be correct', function () {
        var authenticationParameters = imagekit.getAuthenticationParameters("your_token", 1582269249);
        expect(authenticationParameters).to.deep.equal({
            token: 'your_token',
            expire: 1582269249,
            signature: 'e71bcd6031016b060d349d212e23e85c791decdd'
        })
    });
});