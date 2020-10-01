module.exports = {
    "MANDATORY_INITIALIZATION_MISSING" : { message : "Missing publicKey or privateKey or urlEndpoint during ImageKit initialization", help : "" },
    "MANDATORY_PUBLIC_KEY_MISSING" : { message : "Missing publicKey during ImageKit initialization", help : "" },
    "MANDATORY_PRIVATE_KEY_MISSING" : { message : "Missing privateKey during ImageKit initialization", help : "" },
    "MANDATORY_URL_ENDPOINT_KEY_MISSING" : { message : "Missing urlEndpoint during ImageKit initialization", help : "" },
    "INVALID_TRANSFORMATION_POSITION" : { message : "Invalid transformationPosition parameter", help : "" },
    "CACHE_PURGE_URL_MISSING" : { message : "Missing URL parameter for this request", help : "" },
    "CACHE_PURGE_STATUS_ID_MISSING" : { message : "Missing Request ID parameter for this request", help : "" },
    "FILE_ID_MISSING" : { message : "Missing File ID parameter for this request", help : "" },
    "UPDATE_DATA_MISSING" : { message : "Missing file update data for this request", help : "" },
    "UPDATE_DATA_TAGS_INVALID" : { message : "Invalid tags parameter for this request", help : "tags should be passed as null or an array like ['tag1', 'tag2']" },
    "UPDATE_DATA_COORDS_INVALID" : { message : "Invalid customCoordinates parameter for this request", help : "customCoordinates should be passed as null or a string like 'x,y,width,height'" },
    "LIST_FILES_INPUT_MISSING" : { message : "Missing options for list files", help : "If you do not want to pass any parameter for listing, pass an empty object" },
    "MISSING_UPLOAD_DATA" : { message : "Missing data for upload", help : "" },
    "MISSING_UPLOAD_FILE_PARAMETER" : { message : "Missing file parameter for upload", help : "" },
    "MISSING_UPLOAD_FILENAME_PARAMETER" : { message : "Missing fileName parameter for upload", help : "" },
    // pHash errors
    "INVALID_PHASH_VALUE": { message: "Invalid pHash value", help: "Both pHash strings must be valid hexadecimal numbers" },
    "MISSING_PHASH_VALUE": { message: "Missing pHash value", help: "Please pass two pHash values" },
    "UNEQUAL_STRING_LENGTH": { message: "Unequal pHash string length", help: "For distance calucation, the two pHash strings must have equal length" },
    //bulk delete errors
    "INVALID_FILEIDS_VALUE": {message: "Invalid value for fileIds", help: "fileIds should be an string array of fileId of the files to delete. The array should have atleast one fileId."}
};
