const ImageKit = require("../index");
const fs = require("fs");
const path = require("path");

const CONFIG_OPTIONS = {
    publicKey : "your_public_api_key",
    privateKey : "your_private_api_key",
    urlEndpoint : "https://ik.imagekit.io/your_imagekit_id/"
}

const FILE_PATH = path.resolve(__dirname, "./test_image.jpg"), FILE_NAME = "test_image", IMG_URL = "https://images.pexels.com/photos/247676/pexels-photo-247676.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260";

const sampleApp = async () => {
    try {
        const imagekit = new ImageKit(CONFIG_OPTIONS);

        // Uploading images through binary
        let i =0;
        while (i < 8){
            const response = await uploadLocalFile(imagekit, FILE_PATH, `${FILE_NAME}_bin_${i+1}`);
            console.log(`Binary upload response # ${i+1}:`, JSON.stringify(response, undefined, 2), "\n");
            i++;
        }

        // Uploading images with base64
        const uploadResponse_base64 = await uploadFileBase64(imagekit, FILE_PATH, `${FILE_NAME}_base64`);
        console.log(`Base64 upload response:`, JSON.stringify(uploadResponse_base64, undefined, 2), "\n");

        // Uploading images with buffer
        const uploadResponse_buffer = await uploadFileBuffer(imagekit, FILE_PATH, `${FILE_NAME}_buffer`);
        console.log(`Buffer upload response:`, JSON.stringify(uploadResponse_buffer, undefined, 2), "\n");
        
        // Uploading images with URL
        const uploadResponse_url = await uploadFileURL(imagekit, IMG_URL, `${FILE_NAME}_url`);
        console.log(`URL upload response:`, JSON.stringify(uploadResponse_url, undefined, 2), "\n");

        // Listing Files
        const filesList = await listFiles(imagekit, 12, 0);
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

        var signedUrl = imagekit.url({
            path : filesList[0].filePath,
            signed : true,
            transformation : [{
                height: 300,
                width: 400
            }]
        });
        console.log("Signed Url for first image transformed with height: 300, width: 400: ", signedUrl, "\n");

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
        console.log(fileMetadata_1.pHash, fileMetadata_2.pHash)
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

const uploadLocalFile = async (imagekitInstance, filePath, fileName) => {
    const file = fs.createReadStream(filePath);
    const response = await imagekitInstance.upload({file, fileName});
    return response;
}

const uploadFileBuffer = async (imagekitInstance, filePath, fileName) => {
    const buffer = fs.readFileSync(filePath);
    const response = await imagekitInstance.upload({file: buffer, fileName});
    return response;
}

const uploadFileBase64 = async (imagekitInstance, filePath, fileName) => {
    const file_base64 = fs.readFileSync(filePath, 'base64');
    const response = await imagekitInstance.upload({file: file_base64, fileName});
    return response;
}

const uploadFileURL = async (imagekitInstance, url, fileName) => {
    const response = await imagekitInstance.upload({file: url, fileName});
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