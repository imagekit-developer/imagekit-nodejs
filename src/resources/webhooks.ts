// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { toBase64 } from '../internal/utils';
import * as FilesAPI from './files/files';
import { Webhook } from 'standardwebhooks';

export class Webhooks extends APIResource {
  unsafeUnwrap(body: string): UnsafeUnwrapWebhookEvent {
    return JSON.parse(body) as UnsafeUnwrapWebhookEvent;
  }

  unwrap(
    body: string,
    { headers, key }: { headers: Record<string, string>; key?: string },
  ): UnwrapWebhookEvent {
    if (headers !== undefined) {
      const keyStr: string | null = key === undefined ? this._client.webhookSecret : key;
      if (keyStr === null) throw new Error('Webhook key must not be null in order to unwrap');
      const wh = new Webhook(toBase64(keyStr));
      wh.verify(body, headers);
    }
    return JSON.parse(body) as UnwrapWebhookEvent;
  }
}

export interface BaseWebhookEvent {
  /**
   * Unique identifier for the event.
   */
  id: string;

  /**
   * The type of webhook event.
   */
  type: string;
}

/**
 * Triggered when a post-transformation fails. The original file remains available,
 * but the requested transformation could not be generated.
 */
export interface UploadPostTransformErrorEvent extends BaseWebhookEvent {
  /**
   * Timestamp of when the event occurred in ISO8601 format.
   */
  created_at: string;

  data: UploadPostTransformErrorEvent.Data;

  request: UploadPostTransformErrorEvent.Request;

  type: 'upload.post-transform.error';
}

export namespace UploadPostTransformErrorEvent {
  export interface Data {
    /**
     * Unique identifier of the originally uploaded file.
     */
    fileId: string;

    /**
     * Name of the file.
     */
    name: string;

    /**
     * Path of the file.
     */
    path: string;

    transformation: Data.Transformation;

    /**
     * URL of the attempted post-transformation.
     */
    url: string;
  }

  export namespace Data {
    export interface Transformation {
      error: Transformation.Error;
    }

    export namespace Transformation {
      export interface Error {
        /**
         * Reason for the post-transformation failure.
         */
        reason: string;
      }
    }
  }

  export interface Request {
    transformation: Request.Transformation;

    /**
     * Unique identifier for the originating request.
     */
    x_request_id: string;
  }

  export namespace Request {
    export interface Transformation {
      /**
       * Type of the requested post-transformation.
       */
      type: 'transformation' | 'abs' | 'gif-to-video' | 'thumbnail';

      /**
       * Only applicable if transformation type is 'abs'. Streaming protocol used.
       */
      protocol?: 'hls' | 'dash';

      /**
       * Value for the requested transformation type.
       */
      value?: string;
    }
  }
}

/**
 * Triggered when a post-transformation completes successfully. The transformed
 * version of the file is now ready and can be accessed via the provided URL. Note
 * that each post-transformation generates a separate webhook event.
 */
export interface UploadPostTransformSuccessEvent extends BaseWebhookEvent {
  /**
   * Timestamp of when the event occurred in ISO8601 format.
   */
  created_at: string;

  data: UploadPostTransformSuccessEvent.Data;

  request: UploadPostTransformSuccessEvent.Request;

  type: 'upload.post-transform.success';
}

export namespace UploadPostTransformSuccessEvent {
  export interface Data {
    /**
     * Unique identifier of the originally uploaded file.
     */
    fileId: string;

    /**
     * Name of the file.
     */
    name: string;

    /**
     * URL of the generated post-transformation.
     */
    url: string;
  }

  export interface Request {
    transformation: Request.Transformation;

    /**
     * Unique identifier for the originating request.
     */
    x_request_id: string;
  }

  export namespace Request {
    export interface Transformation {
      /**
       * Type of the requested post-transformation.
       */
      type: 'transformation' | 'abs' | 'gif-to-video' | 'thumbnail';

      /**
       * Only applicable if transformation type is 'abs'. Streaming protocol used.
       */
      protocol?: 'hls' | 'dash';

      /**
       * Value for the requested transformation type.
       */
      value?: string;
    }
  }
}

/**
 * Triggered when a pre-transformation fails. The file upload may have been
 * accepted, but the requested transformation could not be applied.
 */
export interface UploadPreTransformErrorEvent extends BaseWebhookEvent {
  /**
   * Timestamp of when the event occurred in ISO8601 format.
   */
  created_at: string;

  data: UploadPreTransformErrorEvent.Data;

  request: UploadPreTransformErrorEvent.Request;

  type: 'upload.pre-transform.error';
}

export namespace UploadPreTransformErrorEvent {
  export interface Data {
    /**
     * Name of the file.
     */
    name: string;

    /**
     * Path of the file.
     */
    path: string;

    transformation: Data.Transformation;
  }

  export namespace Data {
    export interface Transformation {
      error: Transformation.Error;
    }

    export namespace Transformation {
      export interface Error {
        /**
         * Reason for the pre-transformation failure.
         */
        reason: string;
      }
    }
  }

  export interface Request {
    /**
     * The requested pre-transformation string.
     */
    transformation: string;

    /**
     * Unique identifier for the originating request.
     */
    x_request_id: string;
  }
}

/**
 * Triggered when a pre-transformation completes successfully. The file has been
 * processed with the requested transformation and is now available in the Media
 * Library.
 */
export interface UploadPreTransformSuccessEvent extends BaseWebhookEvent {
  /**
   * Timestamp of when the event occurred in ISO8601 format.
   */
  created_at: string;

  /**
   * Object containing details of a successful upload.
   */
  data: UploadPreTransformSuccessEvent.Data;

  request: UploadPreTransformSuccessEvent.Request;

  type: 'upload.pre-transform.success';
}

export namespace UploadPreTransformSuccessEvent {
  /**
   * Object containing details of a successful upload.
   */
  export interface Data {
    /**
     * An array of tags assigned to the uploaded file by auto tagging.
     */
    AITags?: Array<Data.AITag> | null;

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
    extensionStatus?: Data.ExtensionStatus;

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
     * This field is included in the response only if the Path policy feature is
     * available in the plan. It contains schema definitions for the custom metadata
     * fields selected for the specified file path. Field selection can only be done
     * when the Path policy feature is enabled.
     *
     * Keys are the names of the custom metadata fields; the value object has details
     * about the custom metadata schema.
     */
    selectedFieldsSchema?: { [key: string]: Data.SelectedFieldsSchema };

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
    versionInfo?: Data.VersionInfo;

    /**
     * The video codec used in the video (only for video).
     */
    videoCodec?: string;

    /**
     * Width of the image in pixels (Only for Images)
     */
    width?: number;
  }

  export namespace Data {
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

  export interface Request {
    /**
     * The requested pre-transformation string.
     */
    transformation: string;

    /**
     * Unique identifier for the originating request.
     */
    x_request_id: string;
  }
}

/**
 * Triggered when a new video transformation request is accepted for processing.
 * This event confirms that ImageKit has received and queued your transformation
 * request. Use this for debugging and tracking transformation lifecycle.
 */
export interface VideoTransformationAcceptedEvent extends BaseWebhookEvent {
  /**
   * Timestamp when the event was created in ISO8601 format.
   */
  created_at: string;

  data: VideoTransformationAcceptedEvent.Data;

  /**
   * Information about the original request that triggered the video transformation.
   */
  request: VideoTransformationAcceptedEvent.Request;

  type: 'video.transformation.accepted';
}

export namespace VideoTransformationAcceptedEvent {
  export interface Data {
    /**
     * Information about the source video asset being transformed.
     */
    asset: Data.Asset;

    /**
     * Base information about a video transformation request.
     */
    transformation: Data.Transformation;
  }

  export namespace Data {
    /**
     * Information about the source video asset being transformed.
     */
    export interface Asset {
      /**
       * URL to download or access the source video file.
       */
      url: string;
    }

    /**
     * Base information about a video transformation request.
     */
    export interface Transformation {
      /**
       * Type of video transformation:
       *
       * - `video-transformation`: Standard video processing (resize, format conversion,
       *   etc.)
       * - `gif-to-video`: Convert animated GIF to video format
       * - `video-thumbnail`: Generate thumbnail image from video
       */
      type: 'video-transformation' | 'gif-to-video' | 'video-thumbnail';

      /**
       * Configuration options for video transformations.
       */
      options?: Transformation.Options;
    }

    export namespace Transformation {
      /**
       * Configuration options for video transformations.
       */
      export interface Options {
        /**
         * Audio codec used for encoding (aac or opus).
         */
        audio_codec?: 'aac' | 'opus';

        /**
         * Whether to automatically rotate the video based on metadata.
         */
        auto_rotate?: boolean;

        /**
         * Output format for the transformed video or thumbnail.
         */
        format?: 'mp4' | 'webm' | 'jpg' | 'png' | 'webp';

        /**
         * Quality setting for the output video.
         */
        quality?: number;

        /**
         * Streaming protocol for adaptive bitrate streaming.
         */
        stream_protocol?: 'HLS' | 'DASH';

        /**
         * Array of quality representations for adaptive bitrate streaming.
         */
        variants?: Array<string>;

        /**
         * Video codec used for encoding (h264, vp9, or av1).
         */
        video_codec?: 'h264' | 'vp9' | 'av1';
      }
    }
  }

  /**
   * Information about the original request that triggered the video transformation.
   */
  export interface Request {
    /**
     * Full URL of the transformation request that was submitted.
     */
    url: string;

    /**
     * Unique identifier for the originating transformation request.
     */
    x_request_id: string;

    /**
     * User-Agent header from the original request that triggered the transformation.
     */
    user_agent?: string;
  }
}

/**
 * Triggered when an error occurs during video encoding. Listen to this webhook to
 * log error reasons and debug issues. Check your origin and URL endpoint settings
 * if the reason is related to download failure. For other errors, contact ImageKit
 * support.
 */
export interface VideoTransformationErrorEvent extends BaseWebhookEvent {
  /**
   * Timestamp when the event was created in ISO8601 format.
   */
  created_at: string;

  data: VideoTransformationErrorEvent.Data;

  /**
   * Information about the original request that triggered the video transformation.
   */
  request: VideoTransformationErrorEvent.Request;

  type: 'video.transformation.error';
}

export namespace VideoTransformationErrorEvent {
  export interface Data {
    /**
     * Information about the source video asset being transformed.
     */
    asset: Data.Asset;

    transformation: Data.Transformation;
  }

  export namespace Data {
    /**
     * Information about the source video asset being transformed.
     */
    export interface Asset {
      /**
       * URL to download or access the source video file.
       */
      url: string;
    }

    export interface Transformation {
      /**
       * Type of video transformation:
       *
       * - `video-transformation`: Standard video processing (resize, format conversion,
       *   etc.)
       * - `gif-to-video`: Convert animated GIF to video format
       * - `video-thumbnail`: Generate thumbnail image from video
       */
      type: 'video-transformation' | 'gif-to-video' | 'video-thumbnail';

      /**
       * Details about the transformation error.
       */
      error?: Transformation.Error;

      /**
       * Configuration options for video transformations.
       */
      options?: Transformation.Options;
    }

    export namespace Transformation {
      /**
       * Details about the transformation error.
       */
      export interface Error {
        /**
         * Specific reason for the transformation failure:
         *
         * - `encoding_failed`: Error during video encoding process
         * - `download_failed`: Could not download source video
         * - `internal_server_error`: Unexpected server error
         */
        reason: 'encoding_failed' | 'download_failed' | 'internal_server_error';
      }

      /**
       * Configuration options for video transformations.
       */
      export interface Options {
        /**
         * Audio codec used for encoding (aac or opus).
         */
        audio_codec?: 'aac' | 'opus';

        /**
         * Whether to automatically rotate the video based on metadata.
         */
        auto_rotate?: boolean;

        /**
         * Output format for the transformed video or thumbnail.
         */
        format?: 'mp4' | 'webm' | 'jpg' | 'png' | 'webp';

        /**
         * Quality setting for the output video.
         */
        quality?: number;

        /**
         * Streaming protocol for adaptive bitrate streaming.
         */
        stream_protocol?: 'HLS' | 'DASH';

        /**
         * Array of quality representations for adaptive bitrate streaming.
         */
        variants?: Array<string>;

        /**
         * Video codec used for encoding (h264, vp9, or av1).
         */
        video_codec?: 'h264' | 'vp9' | 'av1';
      }
    }
  }

  /**
   * Information about the original request that triggered the video transformation.
   */
  export interface Request {
    /**
     * Full URL of the transformation request that was submitted.
     */
    url: string;

    /**
     * Unique identifier for the originating transformation request.
     */
    x_request_id: string;

    /**
     * User-Agent header from the original request that triggered the transformation.
     */
    user_agent?: string;
  }
}

/**
 * Triggered when video encoding is finished and the transformed resource is ready
 * to be served. This is the key event to listen for - update your database or CMS
 * flags when you receive this so your application can start showing the
 * transformed video to users.
 */
export interface VideoTransformationReadyEvent extends BaseWebhookEvent {
  /**
   * Timestamp when the event was created in ISO8601 format.
   */
  created_at: string;

  data: VideoTransformationReadyEvent.Data;

  /**
   * Information about the original request that triggered the video transformation.
   */
  request: VideoTransformationReadyEvent.Request;

  type: 'video.transformation.ready';

  /**
   * Performance metrics for the transformation process.
   */
  timings?: VideoTransformationReadyEvent.Timings;
}

export namespace VideoTransformationReadyEvent {
  export interface Data {
    /**
     * Information about the source video asset being transformed.
     */
    asset: Data.Asset;

    transformation: Data.Transformation;
  }

  export namespace Data {
    /**
     * Information about the source video asset being transformed.
     */
    export interface Asset {
      /**
       * URL to download or access the source video file.
       */
      url: string;
    }

    export interface Transformation {
      /**
       * Type of video transformation:
       *
       * - `video-transformation`: Standard video processing (resize, format conversion,
       *   etc.)
       * - `gif-to-video`: Convert animated GIF to video format
       * - `video-thumbnail`: Generate thumbnail image from video
       */
      type: 'video-transformation' | 'gif-to-video' | 'video-thumbnail';

      /**
       * Configuration options for video transformations.
       */
      options?: Transformation.Options;

      /**
       * Information about the transformed output video.
       */
      output?: Transformation.Output;
    }

    export namespace Transformation {
      /**
       * Configuration options for video transformations.
       */
      export interface Options {
        /**
         * Audio codec used for encoding (aac or opus).
         */
        audio_codec?: 'aac' | 'opus';

        /**
         * Whether to automatically rotate the video based on metadata.
         */
        auto_rotate?: boolean;

        /**
         * Output format for the transformed video or thumbnail.
         */
        format?: 'mp4' | 'webm' | 'jpg' | 'png' | 'webp';

        /**
         * Quality setting for the output video.
         */
        quality?: number;

        /**
         * Streaming protocol for adaptive bitrate streaming.
         */
        stream_protocol?: 'HLS' | 'DASH';

        /**
         * Array of quality representations for adaptive bitrate streaming.
         */
        variants?: Array<string>;

        /**
         * Video codec used for encoding (h264, vp9, or av1).
         */
        video_codec?: 'h264' | 'vp9' | 'av1';
      }

      /**
       * Information about the transformed output video.
       */
      export interface Output {
        /**
         * URL to access the transformed video.
         */
        url: string;

        /**
         * Metadata of the output video file.
         */
        video_metadata?: Output.VideoMetadata;
      }

      export namespace Output {
        /**
         * Metadata of the output video file.
         */
        export interface VideoMetadata {
          /**
           * Bitrate of the output video in bits per second.
           */
          bitrate: number;

          /**
           * Duration of the output video in seconds.
           */
          duration: number;

          /**
           * Height of the output video in pixels.
           */
          height: number;

          /**
           * Width of the output video in pixels.
           */
          width: number;
        }
      }
    }
  }

  /**
   * Information about the original request that triggered the video transformation.
   */
  export interface Request {
    /**
     * Full URL of the transformation request that was submitted.
     */
    url: string;

    /**
     * Unique identifier for the originating transformation request.
     */
    x_request_id: string;

    /**
     * User-Agent header from the original request that triggered the transformation.
     */
    user_agent?: string;
  }

  /**
   * Performance metrics for the transformation process.
   */
  export interface Timings {
    /**
     * Time spent downloading the source video from your origin or media library, in
     * milliseconds.
     */
    download_duration?: number;

    /**
     * Time spent encoding the video, in milliseconds.
     */
    encoding_duration?: number;
  }
}

/**
 * Triggered when a new video transformation request is accepted for processing.
 * This event confirms that ImageKit has received and queued your transformation
 * request. Use this for debugging and tracking transformation lifecycle.
 */
export type UnsafeUnwrapWebhookEvent =
  | VideoTransformationAcceptedEvent
  | VideoTransformationReadyEvent
  | VideoTransformationErrorEvent
  | UploadPreTransformSuccessEvent
  | UploadPreTransformErrorEvent
  | UploadPostTransformSuccessEvent
  | UploadPostTransformErrorEvent;

/**
 * Triggered when a new video transformation request is accepted for processing.
 * This event confirms that ImageKit has received and queued your transformation
 * request. Use this for debugging and tracking transformation lifecycle.
 */
export type UnwrapWebhookEvent =
  | VideoTransformationAcceptedEvent
  | VideoTransformationReadyEvent
  | VideoTransformationErrorEvent
  | UploadPreTransformSuccessEvent
  | UploadPreTransformErrorEvent
  | UploadPostTransformSuccessEvent
  | UploadPostTransformErrorEvent;

export declare namespace Webhooks {
  export {
    type BaseWebhookEvent as BaseWebhookEvent,
    type UploadPostTransformErrorEvent as UploadPostTransformErrorEvent,
    type UploadPostTransformSuccessEvent as UploadPostTransformSuccessEvent,
    type UploadPreTransformErrorEvent as UploadPreTransformErrorEvent,
    type UploadPreTransformSuccessEvent as UploadPreTransformSuccessEvent,
    type VideoTransformationAcceptedEvent as VideoTransformationAcceptedEvent,
    type VideoTransformationErrorEvent as VideoTransformationErrorEvent,
    type VideoTransformationReadyEvent as VideoTransformationReadyEvent,
    type UnsafeUnwrapWebhookEvent as UnsafeUnwrapWebhookEvent,
    type UnwrapWebhookEvent as UnwrapWebhookEvent,
  };
}
