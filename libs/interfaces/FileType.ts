/**
 * Type of files to include in result set. Accepts three values:
 * all - include all types of files in result set
 * image - only search in image type files
 * non-image - only search in files which are not image, e.g., JS or CSS or video files.
 *
 * @see {@link https://docs.imagekit.io/api-reference/media-api/list-and-search-files}
 */
export type FileType = "all" | "image" | "non-image";
