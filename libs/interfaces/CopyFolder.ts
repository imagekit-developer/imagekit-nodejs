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
