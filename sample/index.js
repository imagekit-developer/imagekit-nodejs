const ImageKit = require("../index");
const fs = require("fs");
const path = require("path");

const CONFIG_OPTIONS = {
    publicKey : "your_public_api_key",
    privateKey : "your_private_api_key",
    urlEndpoint : "https://ik.imagekit.io/your_imagekit_id/"
}

const FILE_PATH = path.resolve(__dirname, "./test_image.jpg"), FILE_NAME = "test_image";

const sampleApp = async () => {
    try {
        const imagekit = new ImageKit(CONFIG_OPTIONS);

        // Uploading images
        let i =0;
        while (i < 10){
            const response = await uploadFile(imagekit, FILE_PATH, `${FILE_NAME}_${i+1}`);
            console.log(`Upload response # ${i+1}:`, JSON.stringify(response, undefined, 2), "\n");
            i++;
        }

        // Listing Files
        const filesList = await listFiles(imagekit, 10, 0);
        console.log("List of first 10 files: ", JSON.stringify(filesList, undefined, 2), "\n");

        // Generating URLs
        const imageURL = imagekit.url({
                path: filesList[0].filePath,
                transformation: [{
                    height: 300,
                    width: 400
                }]
            });
        console.log("Url for first image transformed with height: 300, width: 400: ", imageURL, "\n");

        // Get File Details
        const fileDetails_1 = await getFileDetails(imagekit, filesList[0].fileId);
        console.log("File Details fetched: ", JSON.stringify(fileDetails_1, undefined, 2), "\n");

        // Get File Metadata
        const fileMetadata_1 = await getFileMetadata(imagekit, filesList[0].fileId);
        const fileMetadata_2 = await getFileMetadata(imagekit, filesList[1].fileId);
        console.log("File metadata fetched: ", JSON.stringify(fileMetadata_1, undefined, 2), "\n");

        // Update File  Details
        const fileUpdateResponse = await updateFileDetails(imagekit, filesList[0].fileId, ["buildings", "day"], "10,10,100,100");
        console.log("File Update Response: ", JSON.stringify(fileUpdateResponse, undefined, 2), "\n");

        // pHash Distance
        const pHashDistance = imagekit.pHashDistance(fileMetadata_1.pHash, fileMetadata_2.pHash);
        console.log(`pHash distance: ${pHashDistance}`, "\n");

        // purge Cache and purgeCache status
        const purgeCacheResponse = await purgeCache(imagekit, filesList[0].url);
        console.log("Purge Cache Response: ", JSON.stringify(purgeCacheResponse, undefined, 2), "\n");

        const purgeStatus = await getPurgeCacheStatus(imagekit, purgeCacheResponse.requestId);
        console.log("Purge Response: ", JSON.stringify(purgeStatus, undefined, 2), "\n");


        // Deleting Files
        const deleteResponse = await deleteFile(imagekit, fileDetails_1.fileId);
        console.log("Deletion response: ", deleteResponse, "\n");
        
        // Bulk Delete Files
        let fileIds = filesList.map(file => file.fileId);
        fileIds.shift();
        const bulkDeleteResponse = await bulkDeleteFiles(imagekit, fileIds);
        console.log("Bulk deletion response: ", bulkDeleteResponse, "\n");

        //Authentication token
        const authenticationParameters = imagekit.getAuthenticationParameters("your_token");
        console.log("Authentication Parameters: ", JSON.stringify(authenticationParameters, undefined, 2), "\n");

        process.exit(0);
    } catch(err) {
        console.log("Encounterted Error: ", JSON.stringify(err, undefined, 2));
        process.exit(1);
    }

}

const uploadFile = async (imagekitInstance, filePath, fileName) => {
    const file = fs.createReadStream(filePath);
    const response = await imagekitInstance.upload({file, fileName});
    return response;
}

const listFiles = async (imagekitInstance, limit=10, skip=0) => {
    const response = await imagekitInstance.listFiles({
        limit,
        skip
    });
    return response
}

const getFileDetails = async (imagekitInstance, fileId) => {
    const response = await imagekitInstance.getFileDetails(fileId);
    return response
}

const getFileMetadata = async (imagekitInstance, fileId) => {
    const response = await imagekitInstance.getFileMetadata(fileId);
    return response;
}

const updateFileDetails = async (imagekitInstance, fileId, tags = [], customCoordinates = "") => {
    let options = {};
    if (Array.isArray(tags) && tags.length > 0) Object.assign(options, {tags});
    if (typeof customCoordinates === "string" && customCoordinates.length > 0) Object.assign(options, {customCoordinates});

    const response = await imagekitInstance.updateFileDetails(fileId, options);
    return response;
}

const purgeCache = async (imagekitInstance, url) => {
    const response = await imagekitInstance.purgeCache(url);
    return response;
}

const getPurgeCacheStatus = async (imagekitInstance , requestId) => {
    const response = await imagekitInstance.getPurgeCacheStatus(requestId);
    return response;
}

const deleteFile = async (imagekitInstance, fileId) => {
    const response = await imagekitInstance.deleteFile(fileId);
    return "success";
}

const bulkDeleteFiles = async (imagekitInstance, fileIds) => {
    const response = await imagekitInstance.bulkDeleteFiles(fileIds);
    return "success";
}


sampleApp();





// //Generating Authentication token
// 