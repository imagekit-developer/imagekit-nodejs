// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as Shared from '../shared';
import * as BulkAPI from './bulk';
import {
  Bulk,
  BulkAddTagsParams,
  BulkAddTagsResponse,
  BulkDeleteParams,
  BulkDeleteResponse,
  BulkRemoveAITagsParams,
  BulkRemoveAITagsResponse,
  BulkRemoveTagsParams,
  BulkRemoveTagsResponse,
} from './bulk';
import * as MetadataAPI from './metadata';
import { MetadataGetFromURLParams } from './metadata';
import * as VersionsAPI from './versions';
import {
  VersionDeleteParams,
  VersionDeleteResponse,
  VersionGetParams,
  VersionListResponse,
  VersionRestoreParams,
  Versions,
} from './versions';
import { APIPromise } from '../../core/api-promise';
import { type Uploadable } from '../../core/uploads';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';
import { multipartFormRequestOptions } from '../../internal/uploads';
import { path } from '../../internal/utils/path';
import { serializeUploadOptions } from '../../lib/serialization-utils';

export class Files extends APIResource {
  bulk: BulkAPI.Bulk = new BulkAPI.Bulk(this._client);
  versions: VersionsAPI.Versions = new VersionsAPI.Versions(this._client);
  metadata: MetadataAPI.Metadata = new MetadataAPI.Metadata(this._client);

  /**
   * This API updates the details or attributes of the current version of the file.
   * You can update `tags`, `customCoordinates`, `customMetadata`, publication
   * status, remove existing `AITags` and apply extensions using this API.
   *
   * @example
   * ```ts
   * const file = await client.files.update('fileId');
   * ```
   */
  update(fileID: string, body: FileUpdateParams, options?: RequestOptions): APIPromise<FileUpdateResponse> {
    return this._client.patch(path`/v1/files/${fileID}/details`, { body, ...options });
  }

  /**
   * This API deletes the file and all its file versions permanently.
   *
   * Note: If a file or specific transformation has been requested in the past, then
   * the response is cached. Deleting a file does not purge the cache. You can purge
   * the cache using purge cache API.
   *
   * @example
   * ```ts
   * await client.files.delete('fileId');
   * ```
   */
  delete(fileID: string, options?: RequestOptions): APIPromise<void> {
    return this._client.delete(path`/v1/files/${fileID}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }

  /**
   * This will copy a file from one folder to another.
   *
   * Note: If any file at the destination has the same name as the source file, then
   * the source file and its versions (if `includeFileVersions` is set to true) will
   * be appended to the destination file version history.
   *
   * @example
   * ```ts
   * const response = await client.files.copy({
   *   destinationPath: '/folder/to/copy/into/',
   *   sourceFilePath: '/path/to/file.jpg',
   * });
   * ```
   */
  copy(body: FileCopyParams, options?: RequestOptions): APIPromise<FileCopyResponse> {
    return this._client.post('/v1/files/copy', { body, ...options });
  }

  /**
   * This API returns an object with details or attributes about the current version
   * of the file.
   *
   * @example
   * ```ts
   * const file = await client.files.get('fileId');
   * ```
   */
  get(fileID: string, options?: RequestOptions): APIPromise<File> {
    return this._client.get(path`/v1/files/${fileID}/details`, options);
  }

  /**
   * This will move a file and all its versions from one folder to another.
   *
   * Note: If any file at the destination has the same name as the source file, then
   * the source file and its versions will be appended to the destination file.
   *
   * @example
   * ```ts
   * const response = await client.files.move({
   *   destinationPath: '/folder/to/move/into/',
   *   sourceFilePath: '/path/to/file.jpg',
   * });
   * ```
   */
  move(body: FileMoveParams, options?: RequestOptions): APIPromise<FileMoveResponse> {
    return this._client.post('/v1/files/move', { body, ...options });
  }

  /**
   * You can rename an already existing file in the media library using rename file
   * API. This operation would rename all file versions of the file.
   *
   * Note: The old URLs will stop working. The file/file version URLs cached on CDN
   * will continue to work unless a purge is requested.
   *
   * @example
   * ```ts
   * const response = await client.files.rename({
   *   filePath: '/path/to/file.jpg',
   *   newFileName: 'newFileName.jpg',
   * });
   * ```
   */
  rename(body: FileRenameParams, options?: RequestOptions): APIPromise<FileRenameResponse> {
    return this._client.put('/v1/files/rename', { body, ...options });
  }

  /**
   * ImageKit.io allows you to upload files directly from both the server and client
   * sides. For server-side uploads, private API key authentication is used. For
   * client-side uploads, generate a one-time `token`, `signature`, and `expire` from
   * your secure backend using private API.
   * [Learn more](/docs/api-reference/upload-file/upload-file#how-to-implement-client-side-file-upload)
   * about how to implement client-side file upload.
   *
   * The [V2 API](/docs/api-reference/upload-file/upload-file-v2) enhances security
   * by verifying the entire payload using JWT.
   *
   * **File size limit** \
   * On the free plan, the maximum upload file sizes are 20MB for images, audio, and raw
   * files and 100MB for videos. On the paid plan, these limits increase to 40MB for images,
   * audio, and raw files and 2GB for videos. These limits can be further increased with
   * higher-tier plans.
   *
   * **Version limit** \
   * A file can have a maximum of 100 versions.
   *
   * **Demo applications**
   *
   * - A full-fledged
   *   [upload widget using Uppy](https://github.com/imagekit-samples/uppy-uploader),
   *   supporting file selections from local storage, URL, Dropbox, Google Drive,
   *   Instagram, and more.
   * - [Quick start guides](/docs/quick-start-guides) for various frameworks and
   *   technologies.
   *
   * @example
   * ```ts
   * const response = await client.files.upload({
   *   file: fs.createReadStream('path/to/file'),
   *   fileName: 'fileName',
   * });
   * ```
   */
  upload(body: FileUploadParams, options?: RequestOptions): APIPromise<FileUploadResponse> {
    const serializedBody = serializeUploadOptions(body);

    return this._client.post(
      '/api/v1/files/upload',
      multipartFormRequestOptions(
        { body: serializedBody, defaultBaseURL: 'https://upload.imagekit.io', ...options },
        this._client,
      ),
    );
  }
}

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
   * This field is included in the response only if the Path policy feature is
   * available in the plan. It contains schema definitions for the custom metadata
   * fields selected for the specified file path. Field selection can only be done
   * when the Path policy feature is enabled.
   *
   * Keys are the names of the custom metadata fields; the value object has details
   * about the custom metadata schema.
   */
  selectedFieldsSchema?: { [key: string]: File.SelectedFieldsSchema };

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

  export interface SelectedFieldsSchema {
    /**
     * Type of the custom metadata field.
     */
    type: 'Text' | 'Textarea' | 'Number' | 'Date' | 'Boolean' | 'SingleSelect' | 'MultiSelect';

    /**
     * The default value for this custom metadata field. The value should match the
     * `type` of custom metadata field.
     */
    defaultValue?: string | number | boolean | Array<string | number | boolean>;

    /**
     * Specifies if the custom metadata field is required or not.
     */
    isValueRequired?: boolean;

    /**
     * Maximum length of string. Only set if `type` is set to `Text` or `Textarea`.
     */
    maxLength?: number;

    /**
     * Maximum value of the field. Only set if field type is `Date` or `Number`. For
     * `Date` type field, the value will be in ISO8601 string format. For `Number` type
     * field, it will be a numeric value.
     */
    maxValue?: string | number;

    /**
     * Minimum length of string. Only set if `type` is set to `Text` or `Textarea`.
     */
    minLength?: number;

    /**
     * Minimum value of the field. Only set if field type is `Date` or `Number`. For
     * `Date` type field, the value will be in ISO8601 string format. For `Number` type
     * field, it will be a numeric value.
     */
    minValue?: string | number;

    /**
     * Indicates whether the custom metadata field is read only. A read only field
     * cannot be modified after being set. This field is configurable only via the
     * **Path policy** feature.
     */
    readOnly?: boolean;

    /**
     * An array of allowed values when field type is `SingleSelect` or `MultiSelect`.
     */
    selectOptions?: Array<string | number | boolean>;

    /**
     * Specifies if the selectOptions array is truncated. It is truncated when number
     * of options are > 100.
     */
    selectOptionsTruncated?: boolean;
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

/**
 * JSON object containing metadata.
 */
export interface Metadata {
  /**
   * The audio codec used in the video (only for video).
   */
  audioCodec?: string;

  /**
   * The bit rate of the video in kbps (only for video).
   */
  bitRate?: number;

  /**
   * The density of the image in DPI.
   */
  density?: number;

  /**
   * The duration of the video in seconds (only for video).
   */
  duration?: number;

  exif?: Metadata.Exif;

  /**
   * The format of the file (e.g., 'jpg', 'mp4').
   */
  format?: string;

  /**
   * Indicates if the image has a color profile.
   */
  hasColorProfile?: boolean;

  /**
   * Indicates if the image contains transparent areas.
   */
  hasTransparency?: boolean;

  /**
   * The height of the image or video in pixels.
   */
  height?: number;

  /**
   * Perceptual hash of the image.
   */
  pHash?: string;

  /**
   * The quality indicator of the image.
   */
  quality?: number;

  /**
   * The file size in bytes.
   */
  size?: number;

  /**
   * The video codec used in the video (only for video).
   */
  videoCodec?: string;

  /**
   * The width of the image or video in pixels.
   */
  width?: number;
}

export namespace Metadata {
  export interface Exif {
    /**
     * Object containing Exif details.
     */
    exif?: Exif.Exif;

    /**
     * Object containing GPS information.
     */
    gps?: Exif.Gps;

    /**
     * Object containing EXIF image information.
     */
    image?: Exif.Image;

    /**
     * JSON object.
     */
    interoperability?: Exif.Interoperability;

    makernote?: { [key: string]: unknown };

    /**
     * Object containing Thumbnail information.
     */
    thumbnail?: Exif.Thumbnail;
  }

  export namespace Exif {
    /**
     * Object containing Exif details.
     */
    export interface Exif {
      ApertureValue?: number;

      ColorSpace?: number;

      CreateDate?: string;

      CustomRendered?: number;

      DateTimeOriginal?: string;

      ExifImageHeight?: number;

      ExifImageWidth?: number;

      ExifVersion?: string;

      ExposureCompensation?: number;

      ExposureMode?: number;

      ExposureProgram?: number;

      ExposureTime?: number;

      Flash?: number;

      FlashpixVersion?: string;

      FNumber?: number;

      FocalLength?: number;

      FocalPlaneResolutionUnit?: number;

      FocalPlaneXResolution?: number;

      FocalPlaneYResolution?: number;

      InteropOffset?: number;

      ISO?: number;

      MeteringMode?: number;

      SceneCaptureType?: number;

      ShutterSpeedValue?: number;

      SubSecTime?: string;

      WhiteBalance?: number;
    }

    /**
     * Object containing GPS information.
     */
    export interface Gps {
      GPSVersionID?: Array<number>;
    }

    /**
     * Object containing EXIF image information.
     */
    export interface Image {
      ExifOffset?: number;

      GPSInfo?: number;

      Make?: string;

      Model?: string;

      ModifyDate?: string;

      Orientation?: number;

      ResolutionUnit?: number;

      Software?: string;

      XResolution?: number;

      YCbCrPositioning?: number;

      YResolution?: number;
    }

    /**
     * JSON object.
     */
    export interface Interoperability {
      InteropIndex?: string;

      InteropVersion?: string;
    }

    /**
     * Object containing Thumbnail information.
     */
    export interface Thumbnail {
      Compression?: number;

      ResolutionUnit?: number;

      ThumbnailLength?: number;

      ThumbnailOffset?: number;

      XResolution?: number;

      YResolution?: number;
    }
  }
}

/**
 * Schema for update file update request.
 */
export type UpdateFileRequest =
  | UpdateFileRequest.UpdateFileDetails
  | UpdateFileRequest.ChangePublicationStatus;

export namespace UpdateFileRequest {
  export interface UpdateFileDetails {
    /**
     * Define an important area in the image in the format `x,y,width,height` e.g.
     * `10,10,100,100`. Send `null` to unset this value.
     */
    customCoordinates?: string | null;

    /**
     * A key-value data to be associated with the asset. To unset a key, send `null`
     * value for that key. Before setting any custom metadata on an asset you have to
     * create the field using custom metadata fields API.
     */
    customMetadata?: { [key: string]: unknown };

    /**
     * Optional text to describe the contents of the file.
     */
    description?: string;

    /**
     * Array of extensions to be applied to the asset. Each extension can be configured
     * with specific parameters based on the extension type.
     */
    extensions?: Shared.Extensions;

    /**
     * An array of AITags associated with the file that you want to remove, e.g.
     * `["car", "vehicle", "motorsports"]`.
     *
     * If you want to remove all AITags associated with the file, send a string -
     * "all".
     *
     * Note: The remove operation for `AITags` executes before any of the `extensions`
     * are processed.
     */
    removeAITags?: Array<string> | 'all';

    /**
     * An array of tags associated with the file, such as `["tag1", "tag2"]`. Send
     * `null` to unset all tags associated with the file.
     */
    tags?: Array<string> | null;

    /**
     * The final status of extensions after they have completed execution will be
     * delivered to this endpoint as a POST request.
     * [Learn more](/docs/api-reference/digital-asset-management-dam/managing-assets/update-file-details#webhook-payload-structure)
     * about the webhook payload structure.
     */
    webhookUrl?: string;
  }

  export interface ChangePublicationStatus {
    /**
     * Configure the publication status of a file and its versions.
     */
    publish?: ChangePublicationStatus.Publish;
  }

  export namespace ChangePublicationStatus {
    /**
     * Configure the publication status of a file and its versions.
     */
    export interface Publish {
      /**
       * Set to `true` to publish the file. Set to `false` to unpublish the file.
       */
      isPublished: boolean;

      /**
       * Set to `true` to publish/unpublish all versions of the file. Set to `false` to
       * publish/unpublish only the current version of the file.
       */
      includeFileVersions?: boolean;
    }
  }
}

/**
 * Object containing details of a file or file version.
 */
export interface FileUpdateResponse extends File {
  extensionStatus?: FileUpdateResponse.ExtensionStatus;
}

export namespace FileUpdateResponse {
  export interface ExtensionStatus {
    'ai-auto-description'?: 'success' | 'pending' | 'failed';

    'ai-tasks'?: 'success' | 'pending' | 'failed';

    'aws-auto-tagging'?: 'success' | 'pending' | 'failed';

    'google-auto-tagging'?: 'success' | 'pending' | 'failed';

    'remove-bg'?: 'success' | 'pending' | 'failed';
  }
}

export interface FileCopyResponse {}

export interface FileMoveResponse {}

export interface FileRenameResponse {
  /**
   * Unique identifier of the purge request. This can be used to check the status of
   * the purge request.
   */
  purgeRequestId?: string;
}

/**
 * Object containing details of a successful upload.
 */
export interface FileUploadResponse {
  /**
   * An array of tags assigned to the uploaded file by auto tagging.
   */
  AITags?: Array<FileUploadResponse.AITag> | null;

  /**
   * The audio codec used in the video (only for video).
   */
  audioCodec?: string;

  /**
   * The bit rate of the video in kbps (only for video).
   */
  bitRate?: number;

  /**
   * Value of custom coordinates associated with the image in the format
   * `x,y,width,height`. If `customCoordinates` are not defined, then it is `null`.
   * Send `customCoordinates` in `responseFields` in API request to get the value of
   * this field.
   */
  customCoordinates?: string | null;

  /**
   * A key-value data associated with the asset. Use `responseField` in API request
   * to get `customMetadata` in the upload API response. Before setting any custom
   * metadata on an asset, you have to create the field using custom metadata fields
   * API. Send `customMetadata` in `responseFields` in API request to get the value
   * of this field.
   */
  customMetadata?: { [key: string]: unknown };

  /**
   * Optional text to describe the contents of the file. Can be set by the user or
   * the ai-auto-description extension.
   */
  description?: string;

  /**
   * The duration of the video in seconds (only for video).
   */
  duration?: number;

  /**
   * Consolidated embedded metadata associated with the file. It includes exif, iptc,
   * and xmp data. Send `embeddedMetadata` in `responseFields` in API request to get
   * embeddedMetadata in the upload API response.
   */
  embeddedMetadata?: { [key: string]: unknown };

  /**
   * Extension names with their processing status at the time of completion of the
   * request. It could have one of the following status values:
   *
   * `success`: The extension has been successfully applied. `failed`: The extension
   * has failed and will not be retried. `pending`: The extension will finish
   * processing in some time. On completion, the final status (success / failed) will
   * be sent to the `webhookUrl` provided.
   *
   * If no extension was requested, then this parameter is not returned.
   */
  extensionStatus?: FileUploadResponse.ExtensionStatus;

  /**
   * Unique fileId. Store this fileld in your database, as this will be used to
   * perform update action on this file.
   */
  fileId?: string;

  /**
   * The relative path of the file in the media library e.g.
   * `/marketing-assets/new-banner.jpg`.
   */
  filePath?: string;

  /**
   * Type of the uploaded file. Possible values are `image`, `non-image`.
   */
  fileType?: string;

  /**
   * Height of the image in pixels (Only for images)
   */
  height?: number;

  /**
   * Is the file marked as private. It can be either `true` or `false`. Send
   * `isPrivateFile` in `responseFields` in API request to get the value of this
   * field.
   */
  isPrivateFile?: boolean;

  /**
   * Is the file published or in draft state. It can be either `true` or `false`.
   * Send `isPublished` in `responseFields` in API request to get the value of this
   * field.
   */
  isPublished?: boolean;

  /**
   * Legacy metadata. Send `metadata` in `responseFields` in API request to get
   * metadata in the upload API response.
   */
  metadata?: Metadata;

  /**
   * Name of the asset.
   */
  name?: string;

  /**
   * This field is included in the response only if the Path policy feature is
   * available in the plan. It contains schema definitions for the custom metadata
   * fields selected for the specified file path. Field selection can only be done
   * when the Path policy feature is enabled.
   *
   * Keys are the names of the custom metadata fields; the value object has details
   * about the custom metadata schema.
   */
  selectedFieldsSchema?: { [key: string]: FileUploadResponse.SelectedFieldsSchema };

  /**
   * Size of the image file in Bytes.
   */
  size?: number;

  /**
   * The array of tags associated with the asset. If no tags are set, it will be
   * `null`. Send `tags` in `responseFields` in API request to get the value of this
   * field.
   */
  tags?: Array<string> | null;

  /**
   * In the case of an image, a small thumbnail URL.
   */
  thumbnailUrl?: string;

  /**
   * A publicly accessible URL of the file.
   */
  url?: string;

  /**
   * An object containing the file or file version's `id` (versionId) and `name`.
   */
  versionInfo?: FileUploadResponse.VersionInfo;

  /**
   * The video codec used in the video (only for video).
   */
  videoCodec?: string;

  /**
   * Width of the image in pixels (Only for Images)
   */
  width?: number;
}

export namespace FileUploadResponse {
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
     * Array of `AITags` associated with the image. If no `AITags` are set, it will be
     * null. These tags can be added using the `google-auto-tagging` or
     * `aws-auto-tagging` extensions.
     */
    source?: string;
  }

  /**
   * Extension names with their processing status at the time of completion of the
   * request. It could have one of the following status values:
   *
   * `success`: The extension has been successfully applied. `failed`: The extension
   * has failed and will not be retried. `pending`: The extension will finish
   * processing in some time. On completion, the final status (success / failed) will
   * be sent to the `webhookUrl` provided.
   *
   * If no extension was requested, then this parameter is not returned.
   */
  export interface ExtensionStatus {
    'ai-auto-description'?: 'success' | 'pending' | 'failed';

    'ai-tasks'?: 'success' | 'pending' | 'failed';

    'aws-auto-tagging'?: 'success' | 'pending' | 'failed';

    'google-auto-tagging'?: 'success' | 'pending' | 'failed';

    'remove-bg'?: 'success' | 'pending' | 'failed';
  }

  export interface SelectedFieldsSchema {
    /**
     * Type of the custom metadata field.
     */
    type: 'Text' | 'Textarea' | 'Number' | 'Date' | 'Boolean' | 'SingleSelect' | 'MultiSelect';

    /**
     * The default value for this custom metadata field. The value should match the
     * `type` of custom metadata field.
     */
    defaultValue?: string | number | boolean | Array<string | number | boolean>;

    /**
     * Specifies if the custom metadata field is required or not.
     */
    isValueRequired?: boolean;

    /**
     * Maximum length of string. Only set if `type` is set to `Text` or `Textarea`.
     */
    maxLength?: number;

    /**
     * Maximum value of the field. Only set if field type is `Date` or `Number`. For
     * `Date` type field, the value will be in ISO8601 string format. For `Number` type
     * field, it will be a numeric value.
     */
    maxValue?: string | number;

    /**
     * Minimum length of string. Only set if `type` is set to `Text` or `Textarea`.
     */
    minLength?: number;

    /**
     * Minimum value of the field. Only set if field type is `Date` or `Number`. For
     * `Date` type field, the value will be in ISO8601 string format. For `Number` type
     * field, it will be a numeric value.
     */
    minValue?: string | number;

    /**
     * Indicates whether the custom metadata field is read only. A read only field
     * cannot be modified after being set. This field is configurable only via the
     * **Path policy** feature.
     */
    readOnly?: boolean;

    /**
     * An array of allowed values when field type is `SingleSelect` or `MultiSelect`.
     */
    selectOptions?: Array<string | number | boolean>;

    /**
     * Specifies if the selectOptions array is truncated. It is truncated when number
     * of options are > 100.
     */
    selectOptionsTruncated?: boolean;
  }

  /**
   * An object containing the file or file version's `id` (versionId) and `name`.
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

export type FileUpdateParams = FileUpdateParams.UpdateFileDetails | FileUpdateParams.ChangePublicationStatus;

export declare namespace FileUpdateParams {
  export interface UpdateFileDetails {
    /**
     * Define an important area in the image in the format `x,y,width,height` e.g.
     * `10,10,100,100`. Send `null` to unset this value.
     */
    customCoordinates?: string | null;

    /**
     * A key-value data to be associated with the asset. To unset a key, send `null`
     * value for that key. Before setting any custom metadata on an asset you have to
     * create the field using custom metadata fields API.
     */
    customMetadata?: { [key: string]: unknown };

    /**
     * Optional text to describe the contents of the file.
     */
    description?: string;

    /**
     * Array of extensions to be applied to the asset. Each extension can be configured
     * with specific parameters based on the extension type.
     */
    extensions?: Shared.Extensions;

    /**
     * An array of AITags associated with the file that you want to remove, e.g.
     * `["car", "vehicle", "motorsports"]`.
     *
     * If you want to remove all AITags associated with the file, send a string -
     * "all".
     *
     * Note: The remove operation for `AITags` executes before any of the `extensions`
     * are processed.
     */
    removeAITags?: Array<string> | 'all';

    /**
     * An array of tags associated with the file, such as `["tag1", "tag2"]`. Send
     * `null` to unset all tags associated with the file.
     */
    tags?: Array<string> | null;

    /**
     * The final status of extensions after they have completed execution will be
     * delivered to this endpoint as a POST request.
     * [Learn more](/docs/api-reference/digital-asset-management-dam/managing-assets/update-file-details#webhook-payload-structure)
     * about the webhook payload structure.
     */
    webhookUrl?: string;
  }

  export interface ChangePublicationStatus {
    /**
     * Configure the publication status of a file and its versions.
     */
    publish?: ChangePublicationStatus.Publish;
  }

  export namespace ChangePublicationStatus {
    /**
     * Configure the publication status of a file and its versions.
     */
    export interface Publish {
      /**
       * Set to `true` to publish the file. Set to `false` to unpublish the file.
       */
      isPublished: boolean;

      /**
       * Set to `true` to publish/unpublish all versions of the file. Set to `false` to
       * publish/unpublish only the current version of the file.
       */
      includeFileVersions?: boolean;
    }
  }
}

export interface FileCopyParams {
  /**
   * Full path to the folder you want to copy the above file into.
   */
  destinationPath: string;

  /**
   * The full path of the file you want to copy.
   */
  sourceFilePath: string;

  /**
   * Option to copy all versions of a file. By default, only the current version of
   * the file is copied. When set to true, all versions of the file will be copied.
   * Default value - `false`.
   */
  includeFileVersions?: boolean;
}

export interface FileMoveParams {
  /**
   * Full path to the folder you want to move the above file into.
   */
  destinationPath: string;

  /**
   * The full path of the file you want to move.
   */
  sourceFilePath: string;
}

export interface FileRenameParams {
  /**
   * The full path of the file you want to rename.
   */
  filePath: string;

  /**
   * The new name of the file. A filename can contain:
   *
   * Alphanumeric Characters: `a-z`, `A-Z`, `0-9` (including Unicode letters, marks,
   * and numerals in other languages). Special Characters: `.`, `_`, and `-`.
   *
   * Any other character, including space, will be replaced by `_`.
   */
  newFileName: string;

  /**
   * Option to purge cache for the old file and its versions' URLs.
   *
   * When set to true, it will internally issue a purge cache request on CDN to
   * remove cached content of old file and its versions. This purge request is
   * counted against your monthly purge quota.
   *
   * Note: If the old file were accessible at
   * `https://ik.imagekit.io/demo/old-filename.jpg`, a purge cache request would be
   * issued against `https://ik.imagekit.io/demo/old-filename.jpg*` (with a wildcard
   * at the end). It will remove the file and its versions' URLs and any
   * transformations made using query parameters on this file or its versions.
   * However, the cache for file transformations made using path parameters will
   * persist. You can purge them using the purge API. For more details, refer to the
   * purge API documentation.
   *
   * Default value - `false`
   */
  purgeCache?: boolean;
}

export interface FileUploadParams {
  /**
   * The API accepts any of the following:
   *
   * - **Binary data** – send the raw bytes as `multipart/form-data`.
   * - **HTTP / HTTPS URL** – a publicly reachable URL that ImageKit’s servers can
   *   fetch.
   * - **Base64 string** – the file encoded as a Base64 data URI or plain Base64.
   *
   * When supplying a URL, the server must receive the response headers within 8
   * seconds; otherwise the request fails with 400 Bad Request.
   */
  file: Uploadable | string;

  /**
   * The name with which the file has to be uploaded. The file name can contain:
   *
   * - Alphanumeric Characters: `a-z`, `A-Z`, `0-9`.
   * - Special Characters: `.`, `-`
   *
   * Any other character including space will be replaced by `_`
   */
  fileName: string;

  /**
   * A unique value that the ImageKit.io server will use to recognize and prevent
   * subsequent retries for the same request. We suggest using V4 UUIDs, or another
   * random string with enough entropy to avoid collisions. This field is only
   * required for authentication when uploading a file from the client side.
   *
   * **Note**: Sending a value that has been used in the past will result in a
   * validation error. Even if your previous request resulted in an error, you should
   * always send a new value for this field.
   */
  token?: string;

  /**
   * Server-side checks to run on the asset. Read more about
   * [Upload API checks](/docs/api-reference/upload-file/upload-file#upload-api-checks).
   */
  checks?: string;

  /**
   * Define an important area in the image. This is only relevant for image type
   * files.
   *
   * - To be passed as a string with the x and y coordinates of the top-left corner,
   *   and width and height of the area of interest in the format `x,y,width,height`.
   *   For example - `10,10,100,100`
   * - Can be used with fo-customtransformation.
   * - If this field is not specified and the file is overwritten, then
   *   customCoordinates will be removed.
   */
  customCoordinates?: string;

  /**
   * JSON key-value pairs to associate with the asset. Create the custom metadata
   * fields before setting these values.
   */
  customMetadata?: { [key: string]: unknown };

  /**
   * Optional text to describe the contents of the file.
   */
  description?: string;

  /**
   * The time until your signature is valid. It must be a
   * [Unix time](https://en.wikipedia.org/wiki/Unix_time) in less than 1 hour into
   * the future. It should be in seconds. This field is only required for
   * authentication when uploading a file from the client side.
   */
  expire?: number;

  /**
   * Array of extensions to be applied to the asset. Each extension can be configured
   * with specific parameters based on the extension type.
   */
  extensions?: Shared.Extensions;

  /**
   * The folder path in which the image has to be uploaded. If the folder(s) didn't
   * exist before, a new folder(s) is created.
   *
   * The folder name can contain:
   *
   * - Alphanumeric Characters: `a-z` , `A-Z` , `0-9`
   * - Special Characters: `/` , `_` , `-`
   *
   * Using multiple `/` creates a nested folder.
   */
  folder?: string;

  /**
   * Whether to mark the file as private or not.
   *
   * If `true`, the file is marked as private and is accessible only using named
   * transformation or signed URL.
   */
  isPrivateFile?: boolean;

  /**
   * Whether to upload file as published or not.
   *
   * If `false`, the file is marked as unpublished, which restricts access to the
   * file only via the media library. Files in draft or unpublished state can only be
   * publicly accessed after being published.
   *
   * The option to upload in draft state is only available in custom enterprise
   * pricing plans.
   */
  isPublished?: boolean;

  /**
   * If set to `true` and a file already exists at the exact location, its AITags
   * will be removed. Set `overwriteAITags` to `false` to preserve AITags.
   */
  overwriteAITags?: boolean;

  /**
   * If the request does not have `customMetadata`, and a file already exists at the
   * exact location, existing customMetadata will be removed.
   */
  overwriteCustomMetadata?: boolean;

  /**
   * If `false` and `useUniqueFileName` is also `false`, and a file already exists at
   * the exact location, upload API will return an error immediately.
   */
  overwriteFile?: boolean;

  /**
   * If the request does not have `tags`, and a file already exists at the exact
   * location, existing tags will be removed.
   */
  overwriteTags?: boolean;

  /**
   * Your ImageKit.io public key. This field is only required for authentication when
   * uploading a file from the client side.
   */
  publicKey?: string;

  /**
   * Array of response field keys to include in the API response body.
   */
  responseFields?: Array<
    | 'tags'
    | 'customCoordinates'
    | 'isPrivateFile'
    | 'embeddedMetadata'
    | 'isPublished'
    | 'customMetadata'
    | 'metadata'
    | 'selectedFieldsSchema'
  >;

  /**
   * HMAC-SHA1 digest of the token+expire using your ImageKit.io private API key as a
   * key. Learn how to create a signature on the page below. This should be in
   * lowercase.
   *
   * Signature must be calculated on the server-side. This field is only required for
   * authentication when uploading a file from the client side.
   */
  signature?: string;

  /**
   * Set the tags while uploading the file. Provide an array of tag strings (e.g.
   * `["tag1", "tag2", "tag3"]`). The combined length of all tag characters must not
   * exceed 500, and the `%` character is not allowed. If this field is not specified
   * and the file is overwritten, the existing tags will be removed.
   */
  tags?: Array<string>;

  /**
   * Configure pre-processing (`pre`) and post-processing (`post`) transformations.
   *
   * - `pre` — applied before the file is uploaded to the Media Library.
   *   Useful for reducing file size or applying basic optimizations upfront (e.g.,
   *   resize, compress).
   *
   * - `post` — applied immediately after upload.
   *   Ideal for generating transformed versions (like video encodes or thumbnails)
   *   in advance, so they're ready for delivery without delay.
   *
   * You can mix and match any combination of post-processing types.
   */
  transformation?: FileUploadParams.Transformation;

  /**
   * Whether to use a unique filename for this file or not.
   *
   * If `true`, ImageKit.io will add a unique suffix to the filename parameter to get
   * a unique filename.
   *
   * If `false`, then the image is uploaded with the provided filename parameter, and
   * any existing file with the same name is replaced.
   */
  useUniqueFileName?: boolean;

  /**
   * The final status of extensions after they have completed execution will be
   * delivered to this endpoint as a POST request.
   * [Learn more](/docs/api-reference/digital-asset-management-dam/managing-assets/update-file-details#webhook-payload-structure)
   * about the webhook payload structure.
   */
  webhookUrl?: string;
}

export namespace FileUploadParams {
  /**
   * Configure pre-processing (`pre`) and post-processing (`post`) transformations.
   *
   * - `pre` — applied before the file is uploaded to the Media Library.
   *   Useful for reducing file size or applying basic optimizations upfront (e.g.,
   *   resize, compress).
   *
   * - `post` — applied immediately after upload.
   *   Ideal for generating transformed versions (like video encodes or thumbnails)
   *   in advance, so they're ready for delivery without delay.
   *
   * You can mix and match any combination of post-processing types.
   */
  export interface Transformation {
    /**
     * List of transformations to apply _after_ the file is uploaded.
     * Each item must match one of the following types: `transformation`,
     * `gif-to-video`, `thumbnail`, `abs`.
     */
    post?: Array<
      | Transformation.Transformation
      | Transformation.GifToVideo
      | Transformation.Thumbnail
      | Transformation.Abs
    >;

    /**
     * Transformation string to apply before uploading the file to the Media Library.
     * Useful for optimizing files at ingestion.
     */
    pre?: string;
  }

  export namespace Transformation {
    export interface Transformation {
      /**
       * Transformation type.
       */
      type: 'transformation';

      /**
       * Transformation string (e.g. `w-200,h-200`).
       * Same syntax as ImageKit URL-based transformations.
       */
      value: string;
    }

    export interface GifToVideo {
      /**
       * Converts an animated GIF into an MP4.
       */
      type: 'gif-to-video';

      /**
       * Optional transformation string to apply to the output video.
       * **Example**: `q-80`
       */
      value?: string;
    }

    export interface Thumbnail {
      /**
       * Generates a thumbnail image.
       */
      type: 'thumbnail';

      /**
       * Optional transformation string.
       * **Example**: `w-150,h-150`
       */
      value?: string;
    }

    export interface Abs {
      /**
       * Streaming protocol to use (`hls` or `dash`).
       */
      protocol: 'hls' | 'dash';

      /**
       * Adaptive Bitrate Streaming (ABS) setup.
       */
      type: 'abs';

      /**
       * List of different representations you want to create separated by an underscore.
       */
      value: string;
    }
  }
}

Files.Bulk = Bulk;
Files.Versions = Versions;

export declare namespace Files {
  export {
    type File as File,
    type Folder as Folder,
    type Metadata as Metadata,
    type UpdateFileRequest as UpdateFileRequest,
    type FileUpdateResponse as FileUpdateResponse,
    type FileCopyResponse as FileCopyResponse,
    type FileMoveResponse as FileMoveResponse,
    type FileRenameResponse as FileRenameResponse,
    type FileUploadResponse as FileUploadResponse,
    type FileUpdateParams as FileUpdateParams,
    type FileCopyParams as FileCopyParams,
    type FileMoveParams as FileMoveParams,
    type FileRenameParams as FileRenameParams,
    type FileUploadParams as FileUploadParams,
  };

  export {
    Bulk as Bulk,
    type BulkDeleteResponse as BulkDeleteResponse,
    type BulkAddTagsResponse as BulkAddTagsResponse,
    type BulkRemoveAITagsResponse as BulkRemoveAITagsResponse,
    type BulkRemoveTagsResponse as BulkRemoveTagsResponse,
    type BulkDeleteParams as BulkDeleteParams,
    type BulkAddTagsParams as BulkAddTagsParams,
    type BulkRemoveAITagsParams as BulkRemoveAITagsParams,
    type BulkRemoveTagsParams as BulkRemoveTagsParams,
  };

  export {
    Versions as Versions,
    type VersionListResponse as VersionListResponse,
    type VersionDeleteResponse as VersionDeleteResponse,
    type VersionDeleteParams as VersionDeleteParams,
    type VersionGetParams as VersionGetParams,
    type VersionRestoreParams as VersionRestoreParams,
  };

  export { type MetadataGetFromURLParams as MetadataGetFromURLParams };
}
