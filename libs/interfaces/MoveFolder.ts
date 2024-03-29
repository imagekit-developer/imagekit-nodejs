/**
 * Response when moving folder in media library.
 *
 * @see {@link https://docs.imagekit.io/api-reference/media-api/move-folder}
 *
 * On success, you will receive a jobId which can be used to get the move operation's status.
 */
export interface MoveFolderResponse {
  jobId: string;
}

/**
 * Error when moving folder in media library.
 *
 * @see {@link https://docs.imagekit.io/api-reference/media-api/move-folder}
 *
 * If no files or folders are found at specified sourceFolderPath then a error is returned.
 */
export interface MoveFolderError extends Error {
  help: string;
  message: string;
  reason: string;
}


/**
 * Move folder API options
 *
 * @see {@link https://docs.imagekit.io/api-reference/media-api/move-folder}
 */
export interface MoveFolderOptions {
  /**
   * The full path to the source folder you want to move. For example - /path/of/source/folder.
   */
  sourceFolderPath: string;
  /**
   * Full path to the destination folder where you want to move the source folder into. For example - /path/of/destination/folder.
   */
  destinationPath: string;
}