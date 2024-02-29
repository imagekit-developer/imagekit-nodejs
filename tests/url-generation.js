import chai from "chai";
const pkg = require("../package.json");
const expect = chai.expect;
const initializationParams = require("./data").initializationParams
import ImageKit from "../index";
import { encodeStringIfRequired, getSignature } from "../libs/url/builder";
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

    it("Signed URL with é in filename", function () {
      const encodedUrl = encodeStringIfRequired("https://ik.imagekit.io/test_url_endpoint/test_é_path_alt.jpg");
      expect(encodedUrl).equal("https://ik.imagekit.io/test_url_endpoint/test_%C3%A9_path_alt.jpg");
      const signature = getSignature({
        privateKey: "test_private_key",
        url: encodedUrl,
        urlEndpoint: "https://ik.imagekit.io/test_url_endpoint",
        expiryTimestamp: "9999999999",
      });
      const url = imagekit.url({
        path: "/test_é_path_alt.jpg",
        signed: true,
      });
      expect(url).equal(`https://ik.imagekit.io/test_url_endpoint/test_é_path_alt.jpg?ik-s=09a329f06a5106a8b9c43de8fb6a64948fff7c59`);
      expect(url).includes(`ik-s=${signature}`);
    });

    it("Signed URL with é in filename and path", function () {
      const encodedUrl = encodeStringIfRequired("https://ik.imagekit.io/test_url_endpoint/aéb/test_é_path_alt.jpg");
      expect(encodedUrl).equal("https://ik.imagekit.io/test_url_endpoint/a%C3%A9b/test_%C3%A9_path_alt.jpg");
      const signature = getSignature({
        privateKey: "test_private_key",
        url: encodedUrl,
        urlEndpoint: "https://ik.imagekit.io/test_url_endpoint",
        expiryTimestamp: "9999999999",
      });
      const url = imagekit.url({
        path: "/aéb/test_é_path_alt.jpg",
        signed: true,
      });
      expect(url).equal(`https://ik.imagekit.io/test_url_endpoint/aéb/test_é_path_alt.jpg?ik-s=fca91582138ac65694425d52f0710b7ae2c3d7cf`);
      expect(url).includes(`ik-s=${signature}`);
    });

    it("Signed URL with é in filename, path and transformation as path", function () {
      const encodedUrl = encodeStringIfRequired("https://ik.imagekit.io/test_url_endpoint/tr:l-text,i-Imagekité,fs-50,l-end/aéb/test_é_path_alt.jpg");
      expect(encodedUrl).equal("https://ik.imagekit.io/test_url_endpoint/tr:l-text,i-Imagekit%C3%A9,fs-50,l-end/a%C3%A9b/test_%C3%A9_path_alt.jpg");
      const signature = getSignature({
        privateKey: "test_private_key",
        url: encodedUrl,
        urlEndpoint: "https://ik.imagekit.io/test_url_endpoint",
        expiryTimestamp: "9999999999",
      });

      const url = imagekit.url({
        path: "/aéb/test_é_path_alt.jpg",
        signed: true,
        transformation: [{ raw: "l-text,i-Imagekité,fs-50,l-end" }],
        transformationPosition: "path",
      });
      console.log({ url, signature });
      expect(url).equal(
        `https://ik.imagekit.io/test_url_endpoint/tr:l-text,i-Imagekité,fs-50,l-end/aéb/test_é_path_alt.jpg?ik-s=d7f5aec0b7a766556dfc280bdf2e3466877d025f`
      );
      expect(url).includes(`ik-s=${signature}`);
    });

    it("Signed URL with é in filename, path and transformation as query", function () {
      const encodedUrl = encodeStringIfRequired("https://ik.imagekit.io/test_url_endpoint/aéb/test_é_path_alt.jpg?tr=l-text%2Ci-Imagekité%2Cfs-50%2Cl-end");
      expect(encodedUrl).equal("https://ik.imagekit.io/test_url_endpoint/a%C3%A9b/test_%C3%A9_path_alt.jpg?tr=l-text%2Ci-Imagekit%C3%A9%2Cfs-50%2Cl-end");
      const signature = getSignature({
        privateKey: "test_private_key",
        url: encodedUrl,
        urlEndpoint: "https://ik.imagekit.io/test_url_endpoint",
        expiryTimestamp: "9999999999",
      });
      const url = imagekit.url({
        path: "/aéb/test_é_path_alt.jpg",
        signed: true,
        transformation: [{ raw: "l-text,i-Imagekité,fs-50,l-end" }],
        transformationPosition: "query",
      });
      expect(url).equal(
        `https://ik.imagekit.io/test_url_endpoint/aéb/test_é_path_alt.jpg?tr=l-text%2Ci-Imagekit%C3%A9%2Cfs-50%2Cl-end&ik-s=0b0107144b34e3b33264c0cec1d29ec98d46cbbb`
      );
      expect(url).includes(`ik-s=${signature}`);
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

    it('Overlay image', function () {
        const url = imagekit.url({
            path: "/test_path.jpg",
            transformation: [{
                "height": "300",
                "width": "400",
                "raw": "l-image,i-overlay.jpg,w-100,b-10_CDDC39,l-end"
            }]
        })

        expect(url).equal(`https://ik.imagekit.io/test_url_endpoint/tr:h-300,w-400,l-image,i-overlay.jpg,w-100,b-10_CDDC39,l-end/test_path.jpg`);
    });

    it('Overlay image with slash in path', function () {
        const url = imagekit.url({
            path: "/test_path.jpg",
            transformation: [{
                "height": "300",
                "width": "400",
                "raw": "l-image,i-/path/to/overlay.jpg,w-100,b-10_CDDC39,l-end"
            }]
        })

        expect(url).equal(`https://ik.imagekit.io/test_url_endpoint/tr:h-300,w-400,l-image,i-/path/to/overlay.jpg,w-100,b-10_CDDC39,l-end/test_path.jpg`);
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


    it('transformation with defaultImage', function () {
        const url = imagekit.url({
            path: "/test_path1.jpg",
            transformation: [{
                defaultImage: "test_path.jpg",
            }]
        })

        expect(url).equal(`https://ik.imagekit.io/test_url_endpoint/tr:di-test_path.jpg/test_path1.jpg`);
    });

    it('skip transformation if it is undefined or null', function () {
        const url = imagekit.url({
            path: "/test_path1.jpg",
            transformation: [{
                defaultImage: "/test_path.jpg",
                quality: undefined,
                effectContrast: null
            }]
        })

        expect(url).equal(`https://ik.imagekit.io/test_url_endpoint/tr:di-test_path.jpg/test_path1.jpg`);
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
                progressive: true,
                lossless: true,
                trim: 5,
                metadata: true,
                colorProfile: true,
                defaultImage: "/folder/file.jpg/", //trailing and leading slash case
                dpr: 3,
                effectSharpen: 10,
                effectUSM: "2-2-0.8-0.024",
                effectContrast: true,
                effectGray: true,
                original: true,
                effectShadow: 'bl-15_st-40_x-10_y-N5',
                effectGradient: 'from-red_to-white',
                raw: "h-200,w-300,l-image,i-logo.png,l-end",
            }]
        })

        expect(url).equal(`https://ik.imagekit.io/test_url_endpoint/tr:h-300,w-400,ar-4-3,q-40,c-force,cm-extract,fo-left,f-jpeg,r-50,bg-A94D34,b-5-A94D34,rt-90,bl-10,n-some_name,pr-true,lo-true,t-5,md-true,cp-true,di-folder@@file.jpg,dpr-3,e-sharpen-10,e-usm-2-2-0.8-0.024,e-contrast-true,e-grayscale-true,orig-true,e-shadow-bl-15_st-40_x-10_y-N5,e-gradient-from-red_to-white,h-200,w-300,l-image,i-logo.png,l-end/test_path.jpg`);
    });
});


