const chai = require("chai");
const pkg = require("../package.json");
const expect = chai.expect;
const initializationParams = require("./data").initializationParams
const ImageKit = require(".."); // This will automatically pick main module (cjs bundle) as per package.json
var imagekit = new ImageKit(initializationParams);

describe("URL generation", function () {
    it('no path no src', function () {
        const url = imagekit.url({});

        expect(url).equal("");
    });

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

    it('Signed URL', function () {
        const url = imagekit.url({
            path: "/test_path_alt.jpg",
            signed: true
        });

        expect(url).equal(`https://ik.imagekit.io/test_url_endpoint/test_path_alt.jpg?ik-s=e26ca157df99b30b2443d7cb6886fc396fb4c87b`);
    });

    it('Signed URL with expireSeconds', function () {
        const url = imagekit.url({
            path: "/test_path_alt.jpg",
            signed: true,
            expireSeconds: 100
        });

        expect(url).includes(`https://ik.imagekit.io/test_url_endpoint/test_path_alt.jpg`);
        expect(url).includes(`ik-s=`);
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

    it('should generate the correct url with path param with transformationPosition as query', function () {
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

    it('should generate the correct url with transformationPosition as query', function () {
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

    it('e-sharpen - ', function () {
        const url = imagekit.url({
            path: "/test_path.jpg",
            transformation: [{
                "e-sharpen": "-",
            }]
        })

        expect(url).equal(`https://ik.imagekit.io/test_url_endpoint/tr:e-sharpen/test_path.jpg`);
    });

    it('All combined', function () {
        const url = imagekit.url({
            path: "/test_path.jpg",
            transformation: [{
                height: 300,
                width: 400,
                aspectRatio: '4-3',
                quality: 40,
                crop: 'force',
                cropMode: 'extract',
                focus: 'left',
                format: 'jpeg',
                radius: 50,
                bg: "A94D34",
                border: "5-A94D34",
                rotation: 90,
                blur: 10,
                named: "some_name",
                overlayX: 35,
                overlayY: 35,
                overlayFocus: "bottom",
                overlayHeight: 20,
                overlayWidth: 20,
                overlayImage: "/folder/file.jpg", // leading slash case
                overlayImageTrim: false,
                overlayImageAspectRatio: "4:3",
                overlayImageBackground: "0F0F0F",
                overlayImageBorder: "10_0F0F0F",
                overlayImageDPR: 2,
                overlayImageQuality: 50,
                overlayImageCropping: "force",
                overlayText: "two words",
                overlayTextFontSize: 20,
                overlayTextFontFamily: "Open Sans",
                overlayTextColor: "00FFFF",
                overlayTextTransparency: 5,
                overlayTextTypography: "b",
                overlayBackground: "00AAFF55",
                overlayTextEncoded: "b3ZlcmxheSBtYWRlIGVhc3k%3D",
                overlayTextWidth: 50,
                overlayTextBackground: "00AAFF55",
                overlayTextPadding: 40,
                overlayTextInnerAlignment: "left",
                overlayRadius: 10,
                progressive: true,
                lossless: true,
                trim: 5,
                metadata: true,
                colorProfile: true,
                defaultImage: "folder/file.jpg/", //trailing slash case
                dpr: 3,
                effectSharpen: 10,
                effectUSM: "2-2-0.8-0.024",
                effectContrast: true,
                effectGray: true,
                original: true,
            }]
        })

        expect(url).equal(`https://ik.imagekit.io/test_url_endpoint/tr:h-300,w-400,ar-4-3,q-40,c-force,cm-extract,fo-left,f-jpeg,r-50,bg-A94D34,b-5-A94D34,rt-90,bl-10,n-some_name,ox-35,oy-35,ofo-bottom,oh-20,ow-20,oi-folder@@file.jpg,oit-false,oiar-4:3,oibg-0F0F0F,oib-10_0F0F0F,oidpr-2,oiq-50,oic-force,ot-two words,ots-20,otf-Open Sans,otc-00FFFF,oa-5,ott-b,obg-00AAFF55,ote-b3ZlcmxheSBtYWRlIGVhc3k%3D,otw-50,otbg-00AAFF55,otp-40,otia-left,or-10,pr-true,lo-true,t-5,md-true,cp-true,di-folder@@file.jpg,dpr-3,e-sharpen-10,e-usm-2-2-0.8-0.024,e-contrast-true,e-grayscale-true,orig-true/test_path.jpg`);
    });
});


