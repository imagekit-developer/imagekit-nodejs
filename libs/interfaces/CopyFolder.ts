/**
 * Response when copying folder in media library.
 *
 * @see {@link https://docs.imagekit.io/api-reference/media-api/copy-folder}
 *
 * On success, you will receive a jobId which can be used to get the copy operation's status.
 */
export interface CopyFolderResponse {
  jobId: string;
}

/**
 * Error when copying folder in media library.
 *
 * @see {@link https://docs.imagekit.io/api-reference/media-api/copy-folder}
 *
 * If no files or folders are found at the specified sourceFolderPath then a error is returned.
 */
export interface CopyFolderError extends Error {
  help: string;
  message: string;
  reason: string;
}

/**
 * Copy folder API options
 *
 * @see {@link https://docs.imagekit.io/api-reference/media-api/copy-folder}
 */
export interface CopyFolderOptions {
  /**
   * The full path to the source folder you want to copy. For example - /path/of/source/folder.
   */
  sourceFolderPath: string;
  /**
   * Full path to the destination folder where you want to copy the source folder into. For example - /path/of/destination/folder.
   */
  destinationPath: string;
  /**
   * Option to copy all versions of files that are nested inside the selected folder. By default, only the current version of each file will be copied. When set to true, all versions of each file will be copied.
   * Default value - false
  */
  includeFileVersions?: boolean;
}