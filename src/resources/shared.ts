// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

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
