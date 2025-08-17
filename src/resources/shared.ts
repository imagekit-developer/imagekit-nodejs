// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

export interface AutoDescriptionExtension {
  /**
   * Specifies the auto description extension.
   */
  name: 'ai-auto-description';
}

export interface AutoTaggingExtension {
  /**
   * Maximum number of tags to attach to the asset.
   */
  maxTags: number;

  /**
   * Minimum confidence level for tags to be considered valid.
   */
  minConfidence: number;

  /**
   * Specifies the auto-tagging extension used.
   */
  name: 'google-auto-tagging' | 'aws-auto-tagging';
}

/**
 * Object containing Exif details.
 */
export interface ExifDetails {
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
 * Object containing EXIF image information.
 */
export interface ExifImage {
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
 * Object containing GPS information.
 */
export interface Gps {
  GPSVersionID?: Array<number>;
}

/**
 * JSON object.
 */
export interface Interoperability {
  InteropIndex?: string;

  InteropVersion?: string;
}

export interface RemovedotBgExtension {
  /**
   * Specifies the background removal extension.
   */
  name: 'remove-bg';

  options?: RemovedotBgExtension.Options;
}

export namespace RemovedotBgExtension {
  export interface Options {
    /**
     * Whether to add an artificial shadow to the result. Default is false. Note:
     * Adding shadows is currently only supported for car photos.
     */
    add_shadow?: boolean;

    /**
     * Specifies a solid color background using hex code (e.g., "81d4fa", "fff") or
     * color name (e.g., "green"). If this parameter is set, `bg_image_url` must be
     * empty.
     */
    bg_color?: string;

    /**
     * Sets a background image from a URL. If this parameter is set, `bg_color` must be
     * empty.
     */
    bg_image_url?: string;

    /**
     * Allows semi-transparent regions in the result. Default is true. Note:
     * Semitransparency is currently only supported for car windows.
     */
    semitransparency?: boolean;
  }
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
