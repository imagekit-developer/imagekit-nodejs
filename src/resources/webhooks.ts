// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { Webhook } from 'standardwebhooks';

export class Webhooks extends APIResource {
  unwrap(
    body: string,
    { headers, key }: { headers: Record<string, string>; key?: string },
  ): UnwrapWebhookEvent {
    if (headers !== undefined) {
      const keyStr: string | null = key === undefined ? this._client.privateAPIKey : key;
      if (keyStr === null) throw new Error('Webhook key must not be null in order to unwrap');
      const wh = new Webhook(keyStr);
      wh.verify(body, headers);
    }
    return JSON.parse(body) as UnwrapWebhookEvent;
  }
}

export interface VideoTransformationAcceptedWebhookEvent {
  /**
   * Unique identifier for the event.
   */
  id: string;

  created_at: string;

  data: VideoTransformationAcceptedWebhookEvent.Data;

  request: VideoTransformationAcceptedWebhookEvent.Request;

  type: 'video.transformation.accepted';
}

export namespace VideoTransformationAcceptedWebhookEvent {
  export interface Data {
    asset: Data.Asset;

    transformation: Data.Transformation;
  }

  export namespace Data {
    export interface Asset {
      /**
       * Source asset URL.
       */
      url: string;
    }

    export interface Transformation {
      type: 'video-transformation' | 'gif-to-video' | 'video-thumbnail';

      options?: Transformation.Options;
    }

    export namespace Transformation {
      export interface Options {
        audio_codec?: 'aac' | 'opus';

        auto_rotate?: boolean;

        format?: 'mp4' | 'webm' | 'jpg' | 'png' | 'webp';

        quality?: number;

        stream_protocol?: 'HLS' | 'DASH';

        variants?: Array<string>;

        video_codec?: 'h264' | 'vp9';
      }
    }
  }

  export interface Request {
    /**
     * URL of the submitted request.
     */
    url: string;

    /**
     * Unique ID for the originating request.
     */
    x_request_id: string;

    /**
     * User-Agent header of the originating request.
     */
    user_agent?: string;
  }
}

export interface VideoTransformationReadyWebhookEvent {
  /**
   * Unique identifier for the event.
   */
  id: string;

  created_at: string;

  data: VideoTransformationReadyWebhookEvent.Data;

  request: VideoTransformationReadyWebhookEvent.Request;

  type: 'video.transformation.ready';

  timings?: VideoTransformationReadyWebhookEvent.Timings;
}

export namespace VideoTransformationReadyWebhookEvent {
  export interface Data {
    asset: Data.Asset;

    transformation: Data.Transformation;
  }

  export namespace Data {
    export interface Asset {
      /**
       * Source asset URL.
       */
      url: string;
    }

    export interface Transformation {
      type: 'video-transformation' | 'gif-to-video' | 'video-thumbnail';

      options?: Transformation.Options;

      output?: Transformation.Output;
    }

    export namespace Transformation {
      export interface Options {
        audio_codec?: 'aac' | 'opus';

        auto_rotate?: boolean;

        format?: 'mp4' | 'webm' | 'jpg' | 'png' | 'webp';

        quality?: number;

        stream_protocol?: 'HLS' | 'DASH';

        variants?: Array<string>;

        video_codec?: 'h264' | 'vp9';
      }

      export interface Output {
        url: string;

        video_metadata?: Output.VideoMetadata;
      }

      export namespace Output {
        export interface VideoMetadata {
          bitrate: number;

          duration: number;

          height: number;

          width: number;
        }
      }
    }
  }

  export interface Request {
    /**
     * URL of the submitted request.
     */
    url: string;

    /**
     * Unique ID for the originating request.
     */
    x_request_id: string;

    /**
     * User-Agent header of the originating request.
     */
    user_agent?: string;
  }

  export interface Timings {
    /**
     * Milliseconds spent downloading the source.
     */
    download_duration?: number;

    /**
     * Milliseconds spent encoding.
     */
    encoding_duration?: number;
  }
}

export interface VideoTransformationErrorWebhookEvent {
  /**
   * Unique identifier for the event.
   */
  id: string;

  created_at: string;

  data: VideoTransformationErrorWebhookEvent.Data;

  request: VideoTransformationErrorWebhookEvent.Request;

  type: 'video.transformation.error';
}

export namespace VideoTransformationErrorWebhookEvent {
  export interface Data {
    asset: Data.Asset;

    transformation: Data.Transformation;
  }

  export namespace Data {
    export interface Asset {
      /**
       * Source asset URL.
       */
      url: string;
    }

    export interface Transformation {
      type: 'video-transformation' | 'gif-to-video' | 'video-thumbnail';

      error?: Transformation.Error;

      options?: Transformation.Options;
    }

    export namespace Transformation {
      export interface Error {
        reason: 'encoding_failed' | 'download_failed' | 'internal_server_error';
      }

      export interface Options {
        audio_codec?: 'aac' | 'opus';

        auto_rotate?: boolean;

        format?: 'mp4' | 'webm' | 'jpg' | 'png' | 'webp';

        quality?: number;

        stream_protocol?: 'HLS' | 'DASH';

        variants?: Array<string>;

        video_codec?: 'h264' | 'vp9';
      }
    }
  }

  export interface Request {
    /**
     * URL of the submitted request.
     */
    url: string;

    /**
     * Unique ID for the originating request.
     */
    x_request_id: string;

    /**
     * User-Agent header of the originating request.
     */
    user_agent?: string;
  }
}

export type UnwrapWebhookEvent =
  | VideoTransformationAcceptedWebhookEvent
  | VideoTransformationReadyWebhookEvent
  | VideoTransformationErrorWebhookEvent;

export declare namespace Webhooks {
  export {
    type VideoTransformationAcceptedWebhookEvent as VideoTransformationAcceptedWebhookEvent,
    type VideoTransformationReadyWebhookEvent as VideoTransformationReadyWebhookEvent,
    type VideoTransformationErrorWebhookEvent as VideoTransformationErrorWebhookEvent,
    type UnwrapWebhookEvent as UnwrapWebhookEvent,
  };
}
