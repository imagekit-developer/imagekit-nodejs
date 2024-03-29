export interface CopyFileOptions {
    /**
     * The full path of the file you want to copy. For example - /path/to/file.jpg
     */
    sourceFilePath: string;
    /**
     * Full path to the folder you want to copy the above file into. For example - /folder/to/copy/into/
     */
    destinationPath: string;
    /**
     * Option to copy all versions of a file. By default, only the current version of the file is copied. When set to true, all versions of the file will be copied.
     * Default value is false
     */
    includeFileVersions?: boolean;
}