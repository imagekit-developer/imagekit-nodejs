/**
 * Response when rename file
 *
 * @see {@link https://docs.imagekit.io/api-reference/media-api/rename-file}
 */
export interface RenameFileResponse {
    /**
     * When purgeCache is set to true
     */
    purgeRequestId?: string;
}

/**
 * Response when rename file
 *
 * @see {@link https://docs.imagekit.io/api-reference/media-api/rename-file}
 */
export interface RenameFileOptions {
    /**
     * The full path of the file you want to rename. For example - /path/to/file.jpg
     */
    filePath: string;
    /**
     * The new name of the file. A filename can contain:
        - Alphanumeric Characters: a-z, A-Z, 0-9 (including Unicode letters, marks, and numerals in other languages).
        - Special Characters: ., _, and -. Any other character, including space, will be replaced by _.
        */
    newFileName: string
    /**
    * Option to purge cache for the old file URL. When set to true, it will internally issue a purge cache request on CDN to remove cached content on the old URL.
    */
    purgeCache: boolean
}
