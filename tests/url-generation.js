const chai = require("chai");
const pkg = require("../package.json");
const expect = chai.expect;
const initializationParams = require("./data").initializationParams
const ImageKit = require(".."); // This will automatically pick main module (cjs bundle) as per package.json
var imagekit = new ImageKit(initializationParams);

describe("URL generation", function () {
    it('no transformation path', function () {
        const url = imagekit.url({
            path: "/test_path.jpg"
        });

        expect(url).equal(`https://ik.imagekit.io/test_url_endpoint/test_path.jpg`);
    });

    it('no transformation src', function () {
        const url = imagekit.url({
            src: "https://ik.imagekit.io/test_url_endpoint/test_path_alt.jpg"
        });

        expect(url).equal(`https://ik.imagekit.io/test_url_endpoint/test_path_alt.jpg`);
    });

    it('Undefined parameters with path', function () {
        const url = imagekit.url({
            path: "/test_path_alt.jpg",
            transformation: undefined,
            transformationPosition: undefined,
            src: undefined,
        });

        expect(url).equal(`https://ik.imagekit.io/test_url_endpoint/test_path_alt.jpg`);
    });

    it('should generate the correct url with path param', function () {
        const url = imagekit.url({
            path: "/test_path.jpg",
            transformation: [{
                "height": "300",
                "width": "400"
            }]
        });

        expect(url).equal(`https://ik.imagekit.io/test_url_endpoint/tr:h-300,w-400/test_path.jpg`);
    });

    it('should generate the correct url with path param with multiple leading slash', function () {
        const url = imagekit.url({
            path: "///test_path.jpg",
            transformation: [{
                "height": "300",
                "width": "400"
            }]
        })

        expect(url).equal(`https://ik.imagekit.io/test_url_endpoint/tr:h-300,w-400/test_path.jpg`);

    });

    it('should generate the correct url with path param with overidden urlEndpoint', function () {
        const url = imagekit.url({
            urlEndpoint: "https://ik.imagekit.io/test_url_endpoint_alt",
            path: "/test_path.jpg",
            transformation: [{
                "height": "300",
                "width": "400"
            }]
        })

        expect(url).equal(`https://ik.imagekit.io/test_url_endpoint_alt/tr:h-300,w-400/test_path.jpg`);

    });

    it('should generate the correct url with path param with transformationPostion as query', function () {
        const url = imagekit.url({
            path: "/test_path.jpg",
            transformationPosition: "query",
            transformation: [{
                "height": "300",
                "width": "400"
            }]
        });

        expect(url).equal(`https://ik.imagekit.io/test_url_endpoint/test_path.jpg?tr=h-300%2Cw-400`);
    });

    it('should generate the correct url with src param', function () {
        const url = imagekit.url({
            src: "https://ik.imagekit.io/test_url_endpoint/test_path_alt.jpg",
            transformation: [{
                "height": "300",
                "width": "400"
            }]
        });

        expect(url).equal(`https://ik.imagekit.io/test_url_endpoint/test_path_alt.jpg?tr=h-300%2Cw-400`);
    });

    it('should generate the correct url with transformationPostion as query', function () {
        const url = imagekit.url({
            src: "https://ik.imagekit.io/test_url_endpoint/test_path_alt.jpg",
            transformationPosition: "query",
            transformation: [{
                "height": "300",
                "width": "400"
            }]
        });

        expect(url).equal(`https://ik.imagekit.io/test_url_endpoint/test_path_alt.jpg?tr=h-300%2Cw-400`);
    });

    it('should generate the correct url with query params properly merged', function () {
        const url = imagekit.url({
            src: "https://ik.imagekit.io/test_url_endpoint/test_path_alt.jpg?t1=v1",
            queryParameters: { t2: "v2", t3: "v3" },
            transformation: [{
                "height": "300",
                "width": "400"
            }]
        });

        expect(url).equal(`https://ik.imagekit.io/test_url_endpoint/test_path_alt.jpg?t1=v1&t2=v2&t3=v3&tr=h-300%2Cw-400`);
    })


    it('should generate the correct chained transformation', function () {
        const url = imagekit.url({
            path: "/test_path.jpg",
            transformation: [{
                "height": "300",
                "width": "400"
            }, {
                "rt": "90"
            }]
        })

        expect(url).equal(`https://ik.imagekit.io/test_url_endpoint/tr:h-300,w-400:rt-90/test_path.jpg`);
    });


    it('should generate the correct chained transformation url with new undocumented tranforamtion parameter', function () {
        const url = imagekit.url({
            path: "/test_path.jpg",
            transformation: [{
                "height": "300",
                "width": "400"
            }, {
                "rndm_trnsf": "abcd"
            }]
        })

        expect(url).equal(`https://ik.imagekit.io/test_url_endpoint/tr:h-300,w-400:rndm_trnsf-abcd/test_path.jpg`);
    });

    it('overlayImage', function () {
        const url = imagekit.url({
            path: "/test_path.jpg",
            transformation: [{
                "height": "300",
                "width": "400",
                overlayImage: "overlay.jpg"
            }]
        })

        expect(url).equal(`https://ik.imagekit.io/test_url_endpoint/tr:h-300,w-400,oi-overlay.jpg/test_path.jpg`);
    });

    it('overlayImage with slash in path', function () {
        const url = imagekit.url({
            path: "/test_path.jpg",
            transformation: [{
                "height": "300",
                "width": "400",
                overlayImage: "/path/to/overlay.jpg"
            }]
        })

        expect(url).equal(`https://ik.imagekit.io/test_url_endpoint/tr:h-300,w-400,oi-path@@to@@overlay.jpg/test_path.jpg`);
    });

    it('overlayX', function () {
        const url = imagekit.url({
            path: "/test_path.jpg",
            transformation: [{
                "height": "300",
                "width": "400",
                overlayX: 10
            }]
        })

        expect(url).equal(`https://ik.imagekit.io/test_url_endpoint/tr:h-300,w-400,ox-10/test_path.jpg`);
    });

    it('Border', function () {
        const url = imagekit.url({
            path: "/test_path.jpg",
            transformation: [{
                "height": "300",
                "width": "400",
                border: "20_FF0000"
            }]
        })

        expect(url).equal(`https://ik.imagekit.io/test_url_endpoint/tr:h-300,w-400,b-20_FF0000/test_path.jpg`);
    });
});


