import { FileObject, FolderObject } from "./FileDetails";
import { FileType } from "./FileType";

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
  tags?: string | string[];
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
  /**
   * You can sort based on the following fields: 
   *  - name - ASC_NAME or DESC_NAME
   *  - createdAt - ASC_CREATED or DESC_CREATED
   *  - updatedAt - ASC_UPDATED or DESC_UPDATED
   *  - height - ASC_HEIGHT or DESC_HEIGHT
   *  - width - ASC_WIDTH or DESC_WIDTH
   *  - size - ASC_SIZE or DESC_SIZE
   */
  sort?: string;
  /**
   * Limit search to either file or folder.  Pass all to include both files and folders in search results.
   * Default value - `file`
   */
  type?: string;
  /**
   * Query string in a Lucene-like query language. Learn more about the query expression later in this section.
   * Note: When the searchQuery parameter is present, the following query parameters will have no effect on the result:
   * 1. tags
   * 2. type
   * 3. name
   */
  searchQuery?: string;
}

/**
 *
 * List and search response
 *
 * @see {@link https://docs.imagekit.io/api-reference/media-api/list-and-search-files#response-structure-and-status-code-application-json}
 */
export type ListFileResponse = Array<FileObject | FolderObject>;
