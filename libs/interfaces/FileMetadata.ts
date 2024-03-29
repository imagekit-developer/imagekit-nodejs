import { FileFormat } from "./FileFormat";

/**
 * Response when getting image exif, pHash and other metadata for uploaded files in ImageKit.io media library using this API.
 *
 * @see {@link https://docs.imagekit.io/api-reference/metadata-api/get-image-metadata-for-uploaded-media-files}
 */
export interface FileMetadataResponse {
  height: number;
  width: number;
  size: number;
  format: FileFormat;
  hasColorProfile: boolean;
  quality: number;
  density: number;
  hasTransparency: boolean;
  /**
   * @see {@link https://docs.imagekit.io/api-reference/metadata-api#perceptual-hash-phash}
   */
  pHash: string;
  /**
   * @see {@link https://docs.imagekit.io/api-reference/metadata-api#exif}
   */
  exif: {
    image: {
      Make: string;
      Model: string;
      Orientation: number;
      XResolution: number;
      YResolution: number;
      ResolutionUnit: number;
      Software: string;
      ModifyDate: string;
      YCbCrPositioning: number;
      ExifOffset: number;
      GPSInfo: number;
    };
    thumbnail: {
      Compression: number;
      XResolution: number;
      YResolution: number;
      ResolutionUnit: number;
      ThumbnailOffset: number;
      ThumbnailLength: number;
    };
    exif: {
      ExposureTime: number;
      FNumber: number;
      ExposureProgram: number;
      ISO: number;
      ExifVersion: string;
      DateTimeOriginal: string;
      CreateDate: string;
      ShutterSpeedValue: number;
      ApertureValue: number;
      ExposureCompensation: number;
      MeteringMode: number;
      Flash: number;
      FocalLength: number;
      SubSecTime: string;
      SubSecTimeOriginal: string;
      SubSecTimeDigitized: string;
      FlashpixVersion: string;
      ColorSpace: number;
      ExifImageWidth: number;
      ExifImageHeight: number;
      InteropOffset: number;
      FocalPlaneXResolution: number;
      FocalPlaneYResolution: number;
      FocalPlaneResolutionUnit: number;
      CustomRendered: number;
      ExposureMode: number;
      WhiteBalance: number;
      SceneCaptureType: number;
    };
    gps: {
      GPSVersionID: number[];
    };
    interoperability: {
      InteropIndex: string;
      InteropVersion: string;
    };
    makernote: { [key: string]: string };
  };
}
