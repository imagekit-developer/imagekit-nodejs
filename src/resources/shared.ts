// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

/**
 * Object containing details of a file or file version.
 */
export interface File {
  /**
   * An array of tags assigned to the file by auto tagging.
   */
  AITags?: Array<File.AITag> | null;

  /**
   * Date and time when the file was uploaded. The date and time is in ISO8601
   * format.
   */
  createdAt?: string;

  /**
   * An string with custom coordinates of the file.
   */
  customCoordinates?: string | null;

  /**
   * An object with custom metadata for the file.
   */
  customMetadata?: { [key: string]: unknown };

  /**
   * Optional text to describe the contents of the file. Can be set by the user or
   * the ai-auto-description extension.
   */
  description?: string;

  /**
   * Unique identifier of the asset.
   */
  fileId?: string;

  /**
   * Path of the file. This is the path you would use in the URL to access the file.
   * For example, if the file is at the root of the media library, the path will be
   * `/file.jpg`. If the file is inside a folder named `images`, the path will be
   * `/images/file.jpg`.
   */
  filePath?: string;

  /**
   * Type of the file. Possible values are `image`, `non-image`.
   */
  fileType?: string;

  /**
   * Specifies if the image has an alpha channel.
   */
  hasAlpha?: boolean;

  /**
   * Height of the file.
   */
  height?: number;

  /**
   * Specifies if the file is private or not.
   */
  isPrivateFile?: boolean;

  /**
   * Specifies if the file is published or not.
   */
  isPublished?: boolean;

  /**
   * MIME type of the file.
   */
  mime?: string;

  /**
   * Name of the asset.
   */
  name?: string;

  /**
   * Size of the file in bytes.
   */
  size?: number;

  /**
   * An array of tags assigned to the file. Tags are used to search files in the
   * media library.
   */
  tags?: Array<string> | null;

  /**
   * URL of the thumbnail image. This URL is used to access the thumbnail image of
   * the file in the media library.
   */
  thumbnail?: string;

  /**
   * Type of the asset.
   */
  type?: 'file' | 'file-version';

  /**
   * Date and time when the file was last updated. The date and time is in ISO8601
   * format.
   */
  updatedAt?: string;

  /**
   * URL of the file.
   */
  url?: string;

  /**
   * An object with details of the file version.
   */
  versionInfo?: File.VersionInfo;

  /**
   * Width of the file.
   */
  width?: number;
}

export namespace File {
  export interface AITag {
    /**
     * Confidence score of the tag.
     */
    confidence?: number;

    /**
     * Name of the tag.
     */
    name?: string;

    /**
     * Source of the tag. Possible values are `google-auto-tagging` and
     * `aws-auto-tagging`.
     */
    source?: string;
  }

  /**
   * An object with details of the file version.
   */
  export interface VersionInfo {
    /**
     * Unique identifier of the file version.
     */
    id?: string;

    /**
     * Name of the file version.
     */
    name?: string;
  }
}

export interface Folder {
  /**
   * Date and time when the folder was created. The date and time is in ISO8601
   * format.
   */
  createdAt?: string;

  /**
   * Unique identifier of the asset.
   */
  folderId?: string;

  /**
   * Path of the folder. This is the path you would use in the URL to access the
   * folder. For example, if the folder is at the root of the media library, the path
   * will be /folder. If the folder is inside another folder named images, the path
   * will be /images/folder.
   */
  folderPath?: string;

  /**
   * Name of the asset.
   */
  name?: string;

  /**
   * Type of the asset.
   */
  type?: 'folder';

  /**
   * Date and time when the folder was last updated. The date and time is in ISO8601
   * format.
   */
  updatedAt?: string;
}
