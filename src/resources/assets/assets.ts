// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as CustomMetadataFieldsAPI from '../custom-metadata-fields';
import * as Shared from '../shared';
import * as BulkAPI from './bulk';
import { Bulk, BulkAddTagsParams, BulkDeleteParams, BulkDeleteResponse, BulkRemoveTagsParams } from './bulk';
import * as FoldersAPI from './folders';
import { FolderCreateParams, FolderCreateResponse, Folders } from './folders';
import * as JobsAPI from './jobs';
import { JobGetResponse, Jobs } from './jobs';
import * as VersionsAPI from './versions';
import {
  VersionDeleteParams,
  VersionGetParams,
  VersionListParams,
  VersionRestoreParams,
  Versions,
} from './versions';
import { APIPromise } from '../../core/api-promise';
import { Cursor, type CursorParams, PagePromise } from '../../core/pagination';
import { type Uploadable } from '../../core/uploads';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';
import { multipartFormRequestOptions } from '../../internal/uploads';
import { path } from '../../internal/utils/path';

export class Assets extends APIResource {
  bulk: BulkAPI.Bulk = new BulkAPI.Bulk(this._client);
  versions: VersionsAPI.Versions = new VersionsAPI.Versions(this._client);
  folders: FoldersAPI.Folders = new FoldersAPI.Folders(this._client);
  jobs: JobsAPI.Jobs = new JobsAPI.Jobs(this._client);

  /**
   * ImageKit.io allows you to upload files directly from both the server and client
   * sides. For server-side uploads, private API key authentication is used. For
   * client-side uploads, generate a one-time `token` from your secure backend using
   * private API.
   * [Learn more](/docs/api-reference/upload-file/upload-file-v2#how-to-implement-secure-client-side-file-upload)
   * about how to implement secure client-side file upload.
   *
   * **File size limit** \
   * On the free plan, the maximum upload file sizes are 25MB for images, audio, and raw
   * files, and 100MB for videos. On the Lite paid plan, these limits increase to 40MB
   * for images, audio, and raw files and 300MB for videos, whereas on the Pro paid plan,
   * these limits increase to 50MB for images, audio, and raw files and 2GB for videos.
   * These limits can be further increased with enterprise plans.
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
   * const uploadResponse = await client.assets.upload({
   *   file: fs.createReadStream('path/to/file'),
   *   file_name: 'file_name',
   * });
   * ```
   */
  upload(body: AssetUploadParams, options?: RequestOptions): APIPromise<UploadResponse> {
    return this._client.post(
      '/v2/assets/upload',
      multipartFormRequestOptions(
        { body, defaultBaseURL: 'https://upload.imagekit.io', ...options },
        this._client,
      ),
    );
  }

  /**
   * This API can list all the uploaded files and folders in your ImageKit.io media
   * library. In addition, you can fine-tune your query by specifying various filters
   * by generating a query string in a Lucene-like syntax and provide this generated
   * string as the value of the `searchQuery`.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const assetListResponse of client.assets.list()) {
   *   // ...
   * }
   * ```
   */
  list(
    query: AssetListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<AssetListResponsesCursor, AssetListResponse> {
    return this._client.getAPIList('/v2/assets', Cursor<AssetListResponse>, { query, ...options });
  }

  /**
   * Returns the details of a single asset — either a file or a folder — by its
   * unique `asset_id`. Use this endpoint to fetch metadata for any file or folder
   * returned by the list and search assets API.
   *
   * @example
   * ```ts
   * const asset = await client.assets.get('asset_id');
   * ```
   */
  get(assetID: string, options?: RequestOptions): APIPromise<AssetGetResponse> {
    return this._client.get(path`/v2/assets/${assetID}`, options);
  }

  /**
   * Updates the details or attributes of the current version of a file. You can
   * update `tags`, `custom_coordinates`, `custom_metadata`, publication status,
   * remove existing `ai_tags`, and apply extensions using this API.
   *
   * @example
   * ```ts
   * const asset = await client.assets.update('asset_id');
   * ```
   */
  update(
    assetID: string,
    body: AssetUpdateParams,
    options?: RequestOptions,
  ): APIPromise<AssetUpdateResponse> {
    return this._client.patch(path`/v2/assets/${assetID}`, { body, ...options });
  }

  /**
   * Deletes a file and all of its file versions permanently.
   *
   * Note: If a file or specific transformation has been requested in the past, then
   * the response is cached. Deleting a file does not purge the cache. You can purge
   * the cache using the purge cache API.
   *
   * @example
   * ```ts
   * await client.assets.delete('asset_id');
   * ```
   */
  delete(assetID: string, options?: RequestOptions): APIPromise<void> {
    return this._client.delete(path`/v2/assets/${assetID}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }

  /**
   * Copies a file or a folder from one location to another. Pass a file path or a
   * folder path in `source_path`.
   *
   * - **File copy** is synchronous and returns `204 No Content`.
   * - **Folder copy** is asynchronous — the selected folder along with its nested
   *   folders, files, and (optionally) file versions are copied in the background.
   *   The API returns `202 Accepted` with a `job_id`. Use the
   *   [get job status](#operation/get-job-status) API to track progress.
   *
   * Note: If a file at the destination has the same name as a source file, the
   * source file (and its versions, when `include_versions` is `true`) will be
   * appended to the destination file's version history.
   *
   * @example
   * ```ts
   * const response = await client.assets.copy({
   *   destination_path: '/folder/to/copy/into/',
   *   source_path: '/path/to/file.jpg',
   * });
   * ```
   */
  copy(body: AssetCopyParams, options?: RequestOptions): APIPromise<AssetCopyResponse> {
    return this._client.post('/v2/assets/copy', { body, ...options });
  }

  /**
   * Moves a file (and all its versions) or a folder (with all nested folders, files,
   * and their versions) from one location to another. Pass a file path or a folder
   * path in `source_path`.
   *
   * - **File move** is synchronous and returns `204 No Content`.
   * - **Folder move** is asynchronous — the API returns `202 Accepted` with a
   *   `job_id`. Use the [get job status](#operation/get-job-status) API to track
   *   progress.
   *
   * Note: If a file at the destination has the same name as a source file, the
   * source file and its versions will be appended to the destination file.
   *
   * @example
   * ```ts
   * const response = await client.assets.move({
   *   destination_path: '/folder/to/move/into/',
   *   source_path: '/path/to/file.jpg',
   * });
   * ```
   */
  move(body: AssetMoveParams, options?: RequestOptions): APIPromise<AssetMoveResponse> {
    return this._client.post('/v2/assets/move', { body, ...options });
  }

  /**
   * Renames an existing file or folder in the media library. Pass a file path or a
   * folder path in `path`.
   *
   * - **File rename** is synchronous. The operation renames all file versions of the
   *   file and returns `200 OK`. If `purge_cache` was `true`, the response includes
   *   `purge_request_id`; if the purge quota is exhausted, `207 Multi-Status` is
   *   returned (the rename succeeded, the purge did not).
   * - **Folder rename** is asynchronous. The folder and all its nested assets and
   *   sub-folders remain unchanged, but their paths are updated to reflect the new
   *   folder name. The API returns `202 Accepted` with a `job_id`. Use the
   *   [get job status](#operation/get-job-status) API to track progress.
   *
   * Note: The old URLs will stop working. The file or file version URLs cached on
   * the CDN will continue to work until a purge is requested — either implicitly via
   * `purge_cache` or explicitly via the purge cache API.
   *
   * @example
   * ```ts
   * const response = await client.assets.rename({
   *   new_name: 'new_file_name.jpg',
   *   path: '/path/to/file.jpg',
   * });
   * ```
   */
  rename(body: AssetRenameParams, options?: RequestOptions): APIPromise<AssetRenameResponse> {
    return this._client.put('/v2/assets/rename', { body, ...options });
  }
}

export type AssetListResponsesCursor = Cursor<AssetListResponse>;

export type FileVersionDetailsCursor = Cursor<FileVersionDetails>;

export interface BulkAssetsNotFoundError {
  message: string;

  /**
   * Array of `asset_id`s that were not found.
   */
  missing_asset_ids: Array<string>;

  help?: string;

  reason?: string;
}

export interface BulkTagUpdatePartialResult {
  /**
   * Per-asset failures for the partially successful request.
   */
  errors: Array<BulkTagUpdatePartialResult.Error>;

  /**
   * Array of `asset_id`s whose tags were updated successfully.
   */
  successful_asset_ids: Array<string>;
}

export namespace BulkTagUpdatePartialResult {
  export interface Error {
    /**
     * `asset_id` of the file that was not updated.
     */
    asset_id: string;

    /**
     * Reason the file could not be updated.
     */
    error: string;
  }
}

export interface BulkTagUpdateResult {
  /**
   * Array of `asset_id`s whose tags were updated successfully.
   */
  successful_asset_ids: Array<string>;
}

/**
 * Common properties shared by `FileDetails` and `FileVersionDetails`.
 */
export interface FileAsset {
  /**
   * Unique identifier of the asset.
   */
  id?: string;

  ai_tags?: Array<FileAsset.AITag>;

  /**
   * Type of the uploaded asset. Possible values are `image`, `video`, `audio` or
   * `static`.
   */
  asset_type?: string;

  /**
   * A publicly accessible URL of the asset.
   */
  asset_url?: string;

  /**
   * Date and time when the file was uploaded. The date and time is in ISO8601
   * format.
   */
  created_at?: string;

  /**
   * A string with custom coordinates of the file in the format `x,y,width,height`.
   * If `custom_coordinates` are not defined, then it is `null`.
   */
  custom_coordinates?: string | null;

  /**
   * A key-value data associated with the asset.
   */
  custom_metadata?: { [key: string]: unknown };

  /**
   * Optional text to describe the contents of the file. Can be set by the user or
   * the ai-auto-description extension.
   */
  description?: string;

  /**
   * Consolidated embedded metadata associated with the file. It includes exif, iptc,
   * and xmp data.
   */
  embedded_metadata?: { [key: string]: unknown };

  /**
   * Specifies if the file is private or not.
   */
  is_private_file?: boolean;

  /**
   * Specifies if the file is published or not.
   */
  is_published?: boolean;

  /**
   * Basic metadata associated with the asset.
   */
  metadata?: Metadata;

  /**
   * Name of the asset.
   */
  name?: string;

  /**
   * Path of the file. This is the path you would use in the URL to access the file.
   * For example, if the file is at the root of the media library, the path will be
   * `/file.jpg`. If the file is inside a folder named `images`, the path will be
   * `/images/file.jpg`.
   */
  path?: string;

  /**
   * Size of the file in bytes.
   */
  size?: number;

  /**
   * The array of tags associated with the asset. If no tags are set, it will be
   * `null`. Send `tags` in `responseFields` in API request to get the value of this
   * field.
   */
  tags?: Array<string>;

  /**
   * In the case of an image, a small thumbnail URL.
   */
  thumbnail_url?: string;

  /**
   * Date and time when the file was last updated. The date and time is in ISO8601
   * format.
   */
  updated_at?: string;

  /**
   * An object with details of the file version.
   */
  version_info?: FileAsset.VersionInfo;
}

export namespace FileAsset {
  /**
   * AI-generated tag associated with an image. These tags can be added using the
   * `google-auto-tagging` or `aws-auto-tagging` extensions.
   */
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

/**
 * Object containing details of a file.
 */
export interface FileDetails extends FileAsset {
  /**
   * Type of the asset.
   */
  type?: 'file';
}

/**
 * Object containing details of a file version.
 */
export interface FileVersionDetails extends FileAsset {
  /**
   * Type of the asset.
   */
  type?: 'file-version';
}

export interface FolderDetails {
  /**
   * Unique identifier of the asset.
   */
  id?: string;

  /**
   * Date and time when the folder was created. The date and time is in ISO8601
   * format.
   */
  created_at?: string;

  /**
   * An object with custom metadata for the folder. Returns empty object if no custom
   * metadata is set.
   */
  custom_metadata?: { [key: string]: unknown };

  /**
   * Name of the asset.
   */
  name?: string;

  /**
   * Path of the folder. This is the path you would use in the URL to access the
   * folder. For example, if the folder is at the root of the media library, the path
   * will be `/folder`. If the folder is inside another folder named `images`, the
   * path will be `/images/folder`.
   */
  path?: string;

  /**
   * Type of the asset.
   */
  type?: 'folder';

  /**
   * Date and time when the folder was last updated. The date and time is in ISO8601
   * format.
   */
  updated_at?: string;
}

/**
 * JSON object containing metadata.
 */
export interface Metadata {
  /**
   * The audio codec used in the video (only for video).
   */
  audio_codec?: string;

  /**
   * The bit rate of the video in kbps (only for video).
   */
  bit_rate?: number;

  /**
   * The density of the image in DPI.
   */
  density?: number;

  /**
   * The duration of the video in seconds (only for video).
   */
  duration?: number;

  /**
   * The format of the file (e.g., 'jpg', 'mp4').
   */
  format?: string;

  /**
   * Specifies if the image has an alpha channel.
   */
  has_alpha?: boolean;

  /**
   * Indicates if the image has a color profile.
   */
  has_color_profile?: boolean;

  /**
   * Indicates if the image contains transparent areas.
   */
  has_transparency?: boolean;

  /**
   * The height of the image or video in pixels.
   */
  height?: number;

  /**
   * MIME type of the file.
   */
  mime?: string;

  /**
   * Perceptual hash of the image.
   */
  p_hash?: string;

  /**
   * The quality indicator of the image.
   */
  quality?: number;

  /**
   * The video codec used in the video (only for video).
   */
  video_codec?: string;

  /**
   * The width of the image or video in pixels.
   */
  width?: number;
}

/**
 * Schema for the update asset request body.
 */
export interface UpdateAssetRequest {
  /**
   * Define an important area in the image in the format `x,y,width,height` e.g.
   * `10,10,100,100`. Send `null` to unset this value.
   */
  custom_coordinates?: string | null;

  /**
   * A key-value data to be associated with the asset. To unset a key, send `null`
   * value for that key. Before setting any custom metadata on an asset you have to
   * create the field using custom metadata fields API.
   */
  custom_metadata?: { [key: string]: unknown };

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
   * Configure the publication status of a file and its versions.
   */
  publish?: UpdateAssetRequest.Publish;

  /**
   * An array of AI tags associated with the file that you want to remove, e.g.
   * `["car", "vehicle", "motorsports"]`.
   *
   * If you want to remove all AI tags associated with the file, send the string
   * `"all"`.
   *
   * Note: The remove operation for `ai_tags` executes before any of the `extensions`
   * are processed.
   */
  remove_ai_tags?: Array<string> | 'all';

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
  webhook_url?: string;
}

export namespace UpdateAssetRequest {
  /**
   * Configure the publication status of a file and its versions.
   */
  export interface Publish {
    /**
     * Set to `true` to publish the file. Set to `false` to unpublish the file.
     */
    is_published: boolean;

    /**
     * Set to `true` to publish/unpublish all versions of the file. Set to `false` to
     * publish/unpublish only the current version of the file.
     */
    include_file_versions?: boolean;
  }
}

export interface UploadRequest {
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
  file: Uploadable;

  /**
   * The name to use for the uploaded file.
   */
  file_name: string;

  /**
   * This is the client-generated JSON Web Token (JWT). The ImageKit.io server uses
   * it to authenticate and check that the upload request parameters have not been
   * tampered with after the token has been generated. Learn how to create the token
   * on the page below. This field is only required for authentication when uploading
   * a file from the client side.
   *
   * **Note**: Sending a JWT that has been used in the past will result in a
   * validation error. Even if your previous request resulted in an error, you should
   * always send a new token.
   *
   * **⚠️Warning**: JWT must be generated on the server-side because it is generated
   * using your account's private API key. This field is required for authentication
   * when uploading a file from the client-side.
   */
  token?: string;

  /**
   * Server-side checks to run on the asset. Read more about
   * [Upload API checks](/docs/api-reference/upload-file/upload-file-v2#upload-api-checks).
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
   *   custom_coordinates will be removed.
   */
  custom_coordinates?: string;

  /**
   * JSON key-value pairs to associate with the asset. Create the custom metadata
   * fields before setting these values.
   */
  custom_metadata?: { [key: string]: unknown };

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
   * The folder path in which the image has to be uploaded. If the folder(s) didn't
   * exist before, a new folder(s) is created. Using multiple `/` creates a nested
   * folder.
   */
  folder?: string;

  /**
   * Whether to mark the file as private or not.
   *
   * If `true`, the file is marked as private and is accessible only using named
   * transformation or signed URL.
   */
  is_private_file?: boolean;

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
  is_published?: boolean;

  /**
   * Controls what gets replaced when a file already exists at the same path. All
   * fields default to `true`. Only relevant when `use_unique_file_name` is `false`.
   */
  overwrite?: UploadRequest.Overwrite;

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
  transformation?: UploadRequest.Transformation;

  /**
   * Whether to use a unique filename for this file or not.
   *
   * If `true`, ImageKit.io will add a unique suffix to the filename parameter to get
   * a unique filename.
   *
   * If `false`, then the image is uploaded with the provided filename parameter, and
   * any existing file with the same name is replaced.
   */
  use_unique_file_name?: boolean;
}

export namespace UploadRequest {
  /**
   * Controls what gets replaced when a file already exists at the same path. All
   * fields default to `true`. Only relevant when `use_unique_file_name` is `false`.
   */
  export interface Overwrite {
    /**
     * If `true`, existing `ai_tags` on the file are removed on overwrite. Set to
     * `false` to preserve them.
     */
    ai_tags?: boolean;

    /**
     * If `true` and `custom_metadata` is not provided in the request, existing custom
     * metadata is removed on overwrite. Set to `false` to preserve it.
     */
    custom_metadata?: boolean;

    /**
     * If `false`, the upload returns an error when a file already exists at the target
     * path instead of replacing it.
     */
    file?: boolean;

    /**
     * If `true` and `tags` is not provided in the request, existing tags are removed
     * on overwrite. Set to `false` to preserve them.
     */
    tags?: boolean;
  }

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

/**
 * Object containing details of a successful upload.
 */
export interface UploadResponse extends FileDetails {
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
  extension_status?: UploadResponse.ExtensionStatus;

  /**
   * This field is included in the response only if the Path policy feature is
   * available in the plan. It contains schema definitions for the custom metadata
   * fields selected for the specified file path. Field selection can only be done
   * when the Path policy feature is enabled.
   *
   * Keys are the names of the custom metadata fields; the value object has details
   * about the custom metadata schema.
   */
  selected_fields_schema?: { [key: string]: UploadResponse.SelectedFieldsSchema };
}

export namespace UploadResponse {
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

  /**
   * Schema rules for a custom metadata field value.
   */
  export interface SelectedFieldsSchema
    extends Omit<CustomMetadataFieldsAPI.CustomMetadataFieldSchema, 'select_options'> {
    /**
     * Indicates whether the custom metadata field is read only. A read only field
     * cannot be modified after being set. This field is configurable only via the
     * **Path policy** feature.
     */
    readOnly?: boolean;

    /**
     * An array of allowed values when field type is `SingleSelect` or `MultiSelect`.
     * Truncated to the first 100 options.
     */
    select_options?: unknown;
  }
}

/**
 * Information about the source video asset being transformed.
 */
export interface VideoAsset {
  /**
   * URL to download or access the source video file.
   */
  url: string;
}

/**
 * Object containing details of a file.
 */
export interface AssetUpdateResponse extends FileDetails {
  /**
   * Status of each extension that was applied. Only present when extensions were
   * requested.
   */
  extension_status?: AssetUpdateResponse.ExtensionStatus;
}

export namespace AssetUpdateResponse {
  /**
   * Status of each extension that was applied. Only present when extensions were
   * requested.
   */
  export interface ExtensionStatus {
    'ai-auto-description'?: 'success' | 'pending' | 'failed';

    'ai-tasks'?: 'success' | 'pending' | 'failed';

    'aws-auto-tagging'?: 'success' | 'pending' | 'failed';

    'google-auto-tagging'?: 'success' | 'pending' | 'failed';

    'remove-bg'?: 'success' | 'pending' | 'failed';
  }
}

/**
 * Object containing details of a file.
 */
export type AssetListResponse = FileDetails | FileVersionDetails | FolderDetails;

export interface AssetCopyResponse {
  /**
   * Unique identifier of the bulk copy folder job.
   */
  job_id: string;
}

/**
 * Object containing details of a file.
 */
export type AssetGetResponse = FileDetails | FolderDetails;

export interface AssetMoveResponse {
  /**
   * Unique identifier of the bulk move folder job.
   */
  job_id: string;
}

export interface AssetRenameResponse {
  /**
   * Unique identifier of the purge request. Use it with the purge status API to
   * check the purge progress.
   */
  purge_request_id?: string;
}

export interface AssetUploadParams {
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
  file: Uploadable;

  /**
   * The name to use for the uploaded file.
   */
  file_name: string;

  /**
   * This is the client-generated JSON Web Token (JWT). The ImageKit.io server uses
   * it to authenticate and check that the upload request parameters have not been
   * tampered with after the token has been generated. Learn how to create the token
   * on the page below. This field is only required for authentication when uploading
   * a file from the client side.
   *
   * **Note**: Sending a JWT that has been used in the past will result in a
   * validation error. Even if your previous request resulted in an error, you should
   * always send a new token.
   *
   * **⚠️Warning**: JWT must be generated on the server-side because it is generated
   * using your account's private API key. This field is required for authentication
   * when uploading a file from the client-side.
   */
  token?: string;

  /**
   * Server-side checks to run on the asset. Read more about
   * [Upload API checks](/docs/api-reference/upload-file/upload-file-v2#upload-api-checks).
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
   *   custom_coordinates will be removed.
   */
  custom_coordinates?: string;

  /**
   * JSON key-value pairs to associate with the asset. Create the custom metadata
   * fields before setting these values.
   */
  custom_metadata?: { [key: string]: unknown };

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
   * The folder path in which the image has to be uploaded. If the folder(s) didn't
   * exist before, a new folder(s) is created. Using multiple `/` creates a nested
   * folder.
   */
  folder?: string;

  /**
   * Whether to mark the file as private or not.
   *
   * If `true`, the file is marked as private and is accessible only using named
   * transformation or signed URL.
   */
  is_private_file?: boolean;

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
  is_published?: boolean;

  /**
   * Controls what gets replaced when a file already exists at the same path. All
   * fields default to `true`. Only relevant when `use_unique_file_name` is `false`.
   */
  overwrite?: AssetUploadParams.Overwrite;

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
  transformation?: AssetUploadParams.Transformation;

  /**
   * Whether to use a unique filename for this file or not.
   *
   * If `true`, ImageKit.io will add a unique suffix to the filename parameter to get
   * a unique filename.
   *
   * If `false`, then the image is uploaded with the provided filename parameter, and
   * any existing file with the same name is replaced.
   */
  use_unique_file_name?: boolean;
}

export namespace AssetUploadParams {
  /**
   * Controls what gets replaced when a file already exists at the same path. All
   * fields default to `true`. Only relevant when `use_unique_file_name` is `false`.
   */
  export interface Overwrite {
    /**
     * If `true`, existing `ai_tags` on the file are removed on overwrite. Set to
     * `false` to preserve them.
     */
    ai_tags?: boolean;

    /**
     * If `true` and `custom_metadata` is not provided in the request, existing custom
     * metadata is removed on overwrite. Set to `false` to preserve it.
     */
    custom_metadata?: boolean;

    /**
     * If `false`, the upload returns an error when a file already exists at the target
     * path instead of replacing it.
     */
    file?: boolean;

    /**
     * If `true` and `tags` is not provided in the request, existing tags are removed
     * on overwrite. Set to `false` to preserve them.
     */
    tags?: boolean;
  }

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

export interface AssetListParams extends CursorParams {
  /**
   * Query string in a Lucene-like query language e.g. `createdAt > "7d"`.
   *
   * [Learn more](/docs/api-reference/digital-asset-management-dam/list-and-search-assets#advanced-search-queries)
   * from examples.
   */
  searchQuery?: string;

  /**
   * Sort the results by one of the supported fields in ascending or descending
   * order.
   */
  sort?:
    | 'ASC_NAME'
    | 'DESC_NAME'
    | 'ASC_CREATED'
    | 'DESC_CREATED'
    | 'ASC_UPDATED'
    | 'DESC_UPDATED'
    | 'ASC_HEIGHT'
    | 'DESC_HEIGHT'
    | 'ASC_WIDTH'
    | 'DESC_WIDTH'
    | 'ASC_SIZE'
    | 'DESC_SIZE'
    | 'ASC_RELEVANCE'
    | 'DESC_RELEVANCE';
}

export interface AssetUpdateParams {
  /**
   * Define an important area in the image in the format `x,y,width,height` e.g.
   * `10,10,100,100`. Send `null` to unset this value.
   */
  custom_coordinates?: string | null;

  /**
   * A key-value data to be associated with the asset. To unset a key, send `null`
   * value for that key. Before setting any custom metadata on an asset you have to
   * create the field using custom metadata fields API.
   */
  custom_metadata?: { [key: string]: unknown };

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
   * Configure the publication status of a file and its versions.
   */
  publish?: AssetUpdateParams.Publish;

  /**
   * An array of AI tags associated with the file that you want to remove, e.g.
   * `["car", "vehicle", "motorsports"]`.
   *
   * If you want to remove all AI tags associated with the file, send the string
   * `"all"`.
   *
   * Note: The remove operation for `ai_tags` executes before any of the `extensions`
   * are processed.
   */
  remove_ai_tags?: Array<string> | 'all';

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
  webhook_url?: string;
}

export namespace AssetUpdateParams {
  /**
   * Configure the publication status of a file and its versions.
   */
  export interface Publish {
    /**
     * Set to `true` to publish the file. Set to `false` to unpublish the file.
     */
    is_published: boolean;

    /**
     * Set to `true` to publish/unpublish all versions of the file. Set to `false` to
     * publish/unpublish only the current version of the file.
     */
    include_file_versions?: boolean;
  }
}

export interface AssetCopyParams {
  /**
   * Full path of the destination folder.
   */
  destination_path: string;

  /**
   * Full path of the file or folder you want to copy.
   */
  source_path: string;

  /**
   * When `true`, all versions of the source file(s) are copied. When `false`
   * (default), only the current version is copied. Applies to both file and folder
   * copy operations.
   */
  include_versions?: boolean;
}

export interface AssetMoveParams {
  /**
   * Full path of the destination folder.
   */
  destination_path: string;

  /**
   * Full path of the file or folder you want to move.
   */
  source_path: string;
}

export interface AssetRenameParams {
  /**
   * The new name of the file or folder. The name can contain:
   *
   * - Alphanumeric characters: `a-z`, `A-Z`, `0-9` (including Unicode letters,
   *   marks, and numerals in other languages).
   * - Special characters: `.`, `_`, and `-`.
   *
   * Any other character, including space, will be replaced by `_`.
   */
  new_name: string;

  /**
   * Full path of the file or folder you want to rename.
   */
  path: string;

  /**
   * When `true`, ImageKit internally issues a purge cache request on the CDN to
   * remove cached content of the old file (or, for folders, the nested files) and
   * its versions. This purge request is counted against your monthly purge quota.
   *
   * Note: A purge cache request would be issued against
   * `https://ik.imagekit.io/<imagekit_id>/<old-path>*` (with a trailing wildcard).
   * It removes the file and its versions' URLs and any transformations made using
   * query parameters. Transformations made using path parameters are not purged —
   * use the purge API for those.
   */
  purge_cache?: boolean;
}

Assets.Bulk = Bulk;
Assets.Versions = Versions;
Assets.Folders = Folders;
Assets.Jobs = Jobs;

export declare namespace Assets {
  export {
    type BulkAssetsNotFoundError as BulkAssetsNotFoundError,
    type BulkTagUpdatePartialResult as BulkTagUpdatePartialResult,
    type BulkTagUpdateResult as BulkTagUpdateResult,
    type FileAsset as FileAsset,
    type FileDetails as FileDetails,
    type FileVersionDetails as FileVersionDetails,
    type FolderDetails as FolderDetails,
    type Metadata as Metadata,
    type UpdateAssetRequest as UpdateAssetRequest,
    type UploadRequest as UploadRequest,
    type UploadResponse as UploadResponse,
    type VideoAsset as VideoAsset,
    type AssetUpdateResponse as AssetUpdateResponse,
    type AssetListResponse as AssetListResponse,
    type AssetCopyResponse as AssetCopyResponse,
    type AssetGetResponse as AssetGetResponse,
    type AssetMoveResponse as AssetMoveResponse,
    type AssetRenameResponse as AssetRenameResponse,
    type AssetListResponsesCursor as AssetListResponsesCursor,
    type AssetUploadParams as AssetUploadParams,
    type AssetListParams as AssetListParams,
    type AssetUpdateParams as AssetUpdateParams,
    type AssetCopyParams as AssetCopyParams,
    type AssetMoveParams as AssetMoveParams,
    type AssetRenameParams as AssetRenameParams,
  };

  export {
    Bulk as Bulk,
    type BulkDeleteResponse as BulkDeleteResponse,
    type BulkDeleteParams as BulkDeleteParams,
    type BulkAddTagsParams as BulkAddTagsParams,
    type BulkRemoveTagsParams as BulkRemoveTagsParams,
  };

  export {
    Versions as Versions,
    type VersionListParams as VersionListParams,
    type VersionGetParams as VersionGetParams,
    type VersionDeleteParams as VersionDeleteParams,
    type VersionRestoreParams as VersionRestoreParams,
  };

  export {
    Folders as Folders,
    type FolderCreateResponse as FolderCreateResponse,
    type FolderCreateParams as FolderCreateParams,
  };

  export { Jobs as Jobs, type JobGetResponse as JobGetResponse };
}
