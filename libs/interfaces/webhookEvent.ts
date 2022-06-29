type Asset = {
  url: string;
};

type TransformationOptions = {
  video_codec: string;
  audio_codec: string;
  auto_rotate: boolean;
  quality: number;
  format: string;
};

interface WebhookEventBase {
  type: string;
  id: string;
  created_at: string; // Date
}

/** WebhookEvent for "video.transformation.*" type */
interface WebhookEventVideoBase extends WebhookEventBase {
  request: {
    x_request_id: string;
    url: string;
    user_agent: string;
  };
}

export interface WebhookEventVideoAccepted extends WebhookEventVideoBase {
  type: "video.transformation.accepted";
  data: {
    asset: Asset;
    transformation: {
      type: string;
      options: TransformationOptions;
    };
  };
}

export interface WebhookEventVideoCompleted extends WebhookEventVideoBase {
  type: "video.transformation.completed";
  timings: {
    donwload_duration: number;
    encoding_duration: number;
  };
  data: {
    asset: Asset;
    transformation: {
      type: string;
      options: TransformationOptions;
      output: {
        url: string;
        video_metadata: {
          duration: number;
          width: number;
          height: number;
          bitrate: number;
        };
      };
    };
  };
}

export interface WebhookEventVideoFailed extends WebhookEventVideoBase {
  type: "video.transformation.failed";
  data: {
    asset: Asset;
    transformation: {
      type: string;
      options: TransformationOptions;
      error: {
        reason: string;
      };
    };
  };
}

export type WebhookEvent =
  | WebhookEventVideoAccepted
  | WebhookEventVideoCompleted
  | WebhookEventVideoFailed;
