// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Metadata extends APIResource {
  /**
   * You can programmatically get image EXIF, pHash, and other metadata for uploaded
   * files in the ImageKit.io media library using this API.
   *
   * You can also get the metadata in upload API response by passing `metadata` in
   * `responseFields` parameter.
   *
   * @example
   * ```ts
   * const metadata = await client.files.metadata.retrieve(
   *   'fileId',
   * );
   * ```
   */
  retrieve(fileID: string, options?: RequestOptions): APIPromise<MetadataRetrieveResponse> {
    return this._client.get(path`/v1/files/${fileID}/metadata`, options);
  }

  /**
   * Get image EXIF, pHash, and other metadata from ImageKit.io powered remote URL
   * using this API.
   *
   * @example
   * ```ts
   * const response = await client.files.metadata.fromURL({
   *   url: 'url',
   * });
   * ```
   */
  fromURL(query: MetadataFromURLParams, options?: RequestOptions): APIPromise<MetadataFromURLResponse> {
    return this._client.get('/v1/files/metadata', { query, ...options });
  }
}

export interface MetadataRetrieveResponse {
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

  exif?: MetadataRetrieveResponse.Exif;

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

export namespace MetadataRetrieveResponse {
  export interface Exif {
    exif?: Exif.Exif;

    gps?: Exif.Gps;

    image?: Exif.Image;

    interoperability?: Exif.Interoperability;

    makernote?: { [key: string]: unknown };

    thumbnail?: Exif.Thumbnail;
  }

  export namespace Exif {
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

    export interface Gps {
      GPSVersionID?: Array<number>;
    }

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

    export interface Interoperability {
      InteropIndex?: string;

      InteropVersion?: string;
    }

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

export interface MetadataFromURLResponse {
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

  exif?: MetadataFromURLResponse.Exif;

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

export namespace MetadataFromURLResponse {
  export interface Exif {
    exif?: Exif.Exif;

    gps?: Exif.Gps;

    image?: Exif.Image;

    interoperability?: Exif.Interoperability;

    makernote?: { [key: string]: unknown };

    thumbnail?: Exif.Thumbnail;
  }

  export namespace Exif {
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

    export interface Gps {
      GPSVersionID?: Array<number>;
    }

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

    export interface Interoperability {
      InteropIndex?: string;

      InteropVersion?: string;
    }

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

export interface MetadataFromURLParams {
  /**
   * Should be a valid file URL. It should be accessible using your ImageKit.io
   * account.
   */
  url: string;
}

export declare namespace Metadata {
  export {
    type MetadataRetrieveResponse as MetadataRetrieveResponse,
    type MetadataFromURLResponse as MetadataFromURLResponse,
    type MetadataFromURLParams as MetadataFromURLParams,
  };
}
