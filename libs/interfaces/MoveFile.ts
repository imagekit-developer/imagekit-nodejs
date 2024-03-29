/**
 * Move file API options
 *
 * @see {@link https://docs.imagekit.io/api-reference/media-api/move-file}
 */
export interface MoveFileOptions {
    /**
     * The full path of the file you want to move. For example - /path/to/file.jpg
     */
    sourceFilePath: string;
    /**
     * Full path to the folder you want to move the above file into. For example - /folder/to/move/into/
     */
    destinationPath: string;
}