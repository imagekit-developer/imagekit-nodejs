import { FileType } from "./FileType";
import { Item } from "./Item";
/**
 * List and search files options
 *
 * @see {@link https://docs.imagekit.io/api-reference/media-api/list-and-search-files}
 */
export interface ListFileOptions {
    /**
     * Folder path if you want to limit the search within a specific folder. For example, /sales-banner/ will only search in folder sales-banner.
     */
    path?: string;
    /**
     * Type of files to include in result set. Accepts three values:
     * all - include all types of files in result set
     * image - only search in image type files
     * non-image - only search in files which are not image, e.g., JS or CSS or video files.
     */
    fileType?: FileType;
    /**
     * Comma-separated list of tags. Files matching any of the tags are included in result response. If no tag is matched, the file is not included in result set.
     */
    tags?: string;
    /**
     * Whether to include folders in search results or not. By default only files are searched.
     * Accepts true and false. If this is set to true then tags and fileType parameters are ignored.
     */
    includeFolder?: boolean;
    /**
     * The name of the file or folder.
     */
    name?: string;
    /**
     * The maximum number of results to return in response:
     * Minimum value - 1
     * Maximum value - 1000
     * Default value - 1000
     */
    limit?: number;
    /**
     * The number of results to skip before returning results.
     * Minimum value - 0
     * Default value - 0
     */
    skip?: number;
}
/**
 *
 * List and search response
 *
 * @see {@link https://docs.imagekit.io/api-reference/media-api/list-and-search-files#response-structure-and-status-code-application-json}
 */
export interface ListFileResponse {
    /**
     * The unique fileId of the uploaded file.
     */
    fileId: string;
    /**
     * Type of item. It can be either file or folder.
     */
    type: Item;
    /**
     * Name of the file or folder.
     */
    name: string;
    /**
     * The date and time when the file was first uploaded. The format is `YYYY-MM-DDTHH:mm:ss.sssZ`.
     */
    createdAt: string;
    /**
     * The relative path of the file. In the case of an image, you can use this
     * path to construct different transformations.
     */
    filePath: string;
    /**
     * Array of tags associated with the image. If no tags are set, it will be null.
     */
    tags: string[] | null;
    /**
     * Is the file marked as private. It can be either true or false.
     */
    isPrivateFile: boolean;
    /**
     * Value of custom coordinates associated with the image in format x,y,width,height. If customCoordinates are not defined then it is null.
     */
    customCoordinates: string | null;
    /**
     * A publicly accessible URL of the file.
     */
    url: string;
    /**
     * In case of an image, a small thumbnail URL.
     */
    thumbnail: string;
    /**
     * The type of file, it could be either image or non-image.
     */
    fileType: FileType;
}
