const ImageKit = require("../index");
const fs = require('fs');

const imagekit = new ImageKit({
    publicKey : "your_public_api_key",
    privateKey : "your_private_api_key",
    urlEndpoint : "https://ik.imagekit.io/your_imagekit_id/"
})

//Uploading an image at path /Pictures/test_image_1.jpg
let filePath = "./test_image_1.jpg";
let fileName = "test_image_1a"
let uploadResponse;
let file = fs.createReadStream(filePath);

imagekit.upload({file, fileName})
    .then(response => uploadResponse)
    .catch(err => console.error("Error recieved:", err));


//URL generation
let {filePath} = uploadResponse;
let imageUrl = imagekit.url({
    path: filePath,
    transformation: [{
        height: 400,
        width: 300
    }]
});

//List Files
let imagesList;

imagekit.listFiles({limit: 10})
    .then(response => imagesList = response)
    .catch(err => console.error("Error recieved:", err));

//Get File Details
let {fileId} = imagesList[0];
let fileDetails;
imagekit.getFileDetails(fileId)
    .then(response => fileDetails = response)
    .catch(err => console.error("Error recieved:", err));

//Get File Metadata
let fileMetadata;
imagekit.getFileMetadata(fileId)
    .then(response => fileMetadata = response)
    .catch(err => console.error("Error recieved:", err));

//Update File Details
imagekit.updateFileDetails(fileId, {
        tags: ['tag1', 'tag2'],
        customCoordinates : "10,10,100,1ima00"
    }).then(response => fileDetails = response)
    .catch(err => console.error("Error recieved:", err));

//purge Cache and purge cache status
let urlToPurge = imagekit.url({
    path: filePath
});
let purgeResponse;
imagekit.purgeCache(urlToPurge)
    .then(response => purgeResponse = response)
    .catch(err => console.error("Error recieved:", err));
imagekit.getPurgeCacheStatus(purgeResponse.requestId).then(console.log).catch(console.log);

//Distance calculation between two pHash values
let fileId_1 = imagesList[0].fileId, fileId_2 = imagesList[1].fileId;
let pHash_1, pHash_2;

imagekit.getFileMetadata(fileId_1)
    .then(response => pHash_1 = response.pHash)
    .catch(err => console.error("Error recieved:", err));

imagekit.getFileMetadata(fileId_2)
    .then(response => pHash_2 = response.pHash)
    .catch(err => console.error("Error recieved:", err));

let pHashDistance = imagekit.pHashDistance(pHash_1, pHash_2);

// Delete Files 

let deleteResponse, bulkDeleteResponse;

imagekit.deleteFile(fileId_1)
    .then(response => deleteResponse = response)
    .catch(err => console.error("Error recieved:", err));


let fileIds = imagesList.map(image => image.fileId);
fileIds.shift();
imagekit.bulkDeleteFiles(fileIds)
    .then(response => bulkDeleteResponse = response)
    .catch(err => console.error("Error recieved:", err));



//Generating Authentication token
var authenticationParameters = imagekit.getAuthenticationParameters("your_token");