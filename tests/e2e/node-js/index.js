const ImageKit = require("imagekit");

try {
    var imagekit = new ImageKit({
        publicKey: "public",
        privateKey: "private",
        urlEndpoint: "https://ik.imagekit.io/xyz"
    });

    var url = imagekit.url({
        path: "Screenshot_2022-07-05_at_1.06.47_PM_2558irHgF.png",
        transformation: [{
            width: 100,
            raw: "sdfdsf"
        }],
        transformationPosition: "path"
    })

    if (url === "https://ik.imagekit.io/xyz/tr:w-100,sdfdsf/Screenshot_2022-07-05_at_1.06.47_PM_2558irHgF.png") {
        process.exit(0);
    } else {
        console.log("Invalid URL", url);
        process.exit(1);
    }


} catch (ex) {
    console.log(ex)
    process.exit(1);
}

