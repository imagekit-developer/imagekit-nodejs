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
