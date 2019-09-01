var ImageKit = require("../index");

var imagekit = new ImageKit({
    publicKey : "your_public_api_key",
    privateKey : "your_private_api_key",
    urlEndpoint : "https://ik.imagekit.io/your_imagekit_id/"
})

var imageURL = imagekit.url({
    path : "/default-image.jpg",
    queryParameters : {
        v : "1",
        q : "something"
    },
    transformation : [{
        "HEIGHT" : "300",
        "WIDTH" : "400",
        "EFFECT_GRAY" : "-",
        "PROGRESSIVE" : "true",
        "EFFECT_SHARPEN" : "2",
        "EFFECT_CONTRAST" : "-"
    }, {
        HEIGHT : "500",
        "EFFECT_SHARPEN" : "1",
        "EFFECT_USM" : "2_2_0.1_0.008"
    }],
    signed : true,
    expireSeconds : 10
});

var authenticationParameters = imagekit.getAuthenticationParameters("your_token");

imagekit.purgeCache("full_url", function(err, result) { /*console.log(arguments);*/ });
imagekit.getPurgeCacheStatus("cache_request_id", function(err, result) { /*console.log(arguments);*/ });
imagekit.deleteFile("file_id", function(err, result) { /*console.log(arguments);*/ });
imagekit.listFiles({}, function(err, result) { /* console.log(arguments) */ });
imagekit.getFileDetails("file_id", function(err, result) {  /*console.log(arguments);*/ });
imagekit.getFileMetadata("file_id", function(err, result) {  /*console.log(arguments);*/ });
imagekit.updateFileDetails("file_id", { tags : ['image_tag'] }, function(err, result) { /*console.log(arguments);*/ });
imagekit.upload({file : "your_file", fileName : "your_file_name.jpg"}, function(err, result) { /*console.log(arguments);*/ });
