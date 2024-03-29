import { UploadResponse } from "./UploadResponse";

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
interface WebhookEventVideoTransformationBase extends WebhookEventBase {
  request: {
    x_request_id: string;
    url: string;
    user_agent: string;
  };
}

export interface WebhookEventVideoTransformationAccepted extends WebhookEventVideoTransformationBase {
  type: "video.transformation.accepted";
  data: {
    asset: Asset;
    transformation: {
      type: string;
      options: TransformationOptions;
    };
  };
}

export interface WebhookEventVideoTransformationReady extends WebhookEventVideoTransformationBase {
  type: "video.transformation.ready";
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

export interface WebhookEventVideoTransformationError extends WebhookEventVideoTransformationBase {
  type: "video.transformation.error";
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

type TransformationType = "transformation" | "abs" | "gif-to-video" | "thumbnail";

interface PreTransformationBase {
  id: string;
  created_at: string;
  request: {
    x_request_id: string;
    transformation: string;
  };
}

interface PostTransformationBase {
  id: string;
  created_at: string;
  request: {
    x_request_id: string;
    transformation: {
      type: TransformationType;
      value?: string;
      protocol?: 'hls' | 'dash';
    };
  };
}

export interface WebhookEventUploadPreTransformationSuccess extends PreTransformationBase {
  type: "upload.pre-transform.success";
  data: UploadResponse;
}

export interface WebhookEventUploadPreTransformationError extends PostTransformationBase {
  type: "upload.pre-transform.error";
  data: {
    name: string;
    path: string;
    transformation: {
      error: {
        reason: string;
      };
    };
  };
}

export interface WebhookEventUploadPostTransformationSuccess extends PostTransformationBase {
  type: "upload.post-transform.success";
  data: {
    fileId: string;
    url: string;
    name: string;
  };
}

export interface WebhookEventUploadPostTransformationError extends PostTransformationBase {
  type: "upload.post-transform.error";
  data: {
    fileId: string;
    url: string;
    name: string;
    path: string;
    transformation: {
      error: {
        reason: string;
      };
    };
  };
}

export type WebhookEvent =
  | WebhookEventVideoTransformationAccepted
  | WebhookEventVideoTransformationReady
  | WebhookEventVideoTransformationError
  | WebhookEventUploadPreTransformationSuccess
  | WebhookEventUploadPreTransformationError
  | WebhookEventUploadPostTransformationSuccess
  | WebhookEventUploadPostTransformationError
  | Object;
