// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import * as Shared from '../../shared';
import * as FilesAPI from '../../files/files';
import { APIPromise } from '../../../core/api-promise';
import { type Uploadable } from '../../../core/uploads';
import { RequestOptions } from '../../../internal/request-options';
import { multipartFormRequestOptions } from '../../../internal/uploads';
import { serializeUploadOptions } from '../../../lib/serialization-utils';

export class Files extends APIResource {
  /**
   * The V2 API enhances security by verifying the entire payload using JWT. This API
   * is in beta.
   *
   * ImageKit.io allows you to upload files directly from both the server and client
   * sides. For server-side uploads, private API key authentication is used. For
   * client-side uploads, generate a one-time `token` from your secure backend using
   * private API.
   * [Learn more](/docs/api-reference/upload-file/upload-file-v2#how-to-implement-secure-client-side-file-upload)
   * about how to implement secure client-side file upload.
   *
   * **File size limit** \
   * On the free plan, the maximum upload file sizes are 20MB for images, audio, and raw
   * files, and 100MB for videos. On the paid plan, these limits increase to 40MB for
   * images, audio, and raw files, and 2GB for videos. These limits can be further increased
   * with higher-tier plans.
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
   * const response = await client.beta.v2.files.upload({
   *   file: fs.createReadStream('path/to/file'),
   *   fileName: 'fileName',
   * });
   * ```
   */
  upload(body: FileUploadParams, options?: RequestOptions): APIPromise<FileUploadResponse> {
    const serializedBody = serializeUploadOptions(body);

    return this._client.post(
      '/api/v2/files/upload',
      multipartFormRequestOptions(
        { body: serializedBody, defaultBaseURL: 'https://upload.imagekit.io', ...options },
        this._client,
      ),
    );
  }
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
  metadata?: FilesAPI.Metadata;

  /**
   * Name of the asset.
   */
  name?: string;

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

    'aws-auto-tagging'?: 'success' | 'pending' | 'failed';

    'google-auto-tagging'?: 'success' | 'pending' | 'failed';

    'remove-bg'?: 'success' | 'pending' | 'failed';
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
   * The name with which the file has to be uploaded.
   */
  fileName: string;

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
  >;

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

export declare namespace Files {
  export { type FileUploadResponse as FileUploadResponse, type FileUploadParams as FileUploadParams };
}
