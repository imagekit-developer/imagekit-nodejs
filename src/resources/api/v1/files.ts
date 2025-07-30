// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import * as Shared from '../../shared';
import { APIPromise } from '../../../core/api-promise';
import { RequestOptions } from '../../../internal/request-options';
import { multipartFormRequestOptions } from '../../../internal/uploads';

export class Files extends APIResource {
  /**
   * ImageKit.io allows you to upload files directly from both the server and client
   * sides. For server-side uploads, private API key authentication is used. For
   * client-side uploads, generate a one-time `token`, `signature`, and `expiration`
   * from your secure backend using private API.
   * [Learn more](/docs/api-reference/upload-file/upload-file#how-to-implement-client-side-file-upload)
   * about how to implement client-side file upload.
   *
   * The [V2 API](/docs/api-reference/upload-file/upload-file-v2) enhances security
   * by verifying the entire payload using JWT.
   *
   * **File size limit** \
   * On the free plan, the maximum upload file sizes are 20MB for images, audio, and raw
   * files and 100MB for videos. On the paid plan, these limits increase to 40MB for images,
   * audio, and raw files and 2GB for videos. These limits can be further increased with
   * higher-tier plans.
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
   * const response = await client.api.v1.files.upload({
   *   file: 'https://www.example.com/rest-of-the-image-path.jpg',
   *   fileName: 'fileName',
   * });
   * ```
   */
  upload(body: FileUploadParams, options?: RequestOptions): APIPromise<FileUploadResponse> {
    return this._client.post(
      '/api/v1/files/upload',
      multipartFormRequestOptions(
        { body, defaultBaseURL: 'https://upload.imagekit.io', ...options },
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
  customMetadata?: unknown;

  /**
   * The duration of the video in seconds (only for video).
   */
  duration?: number;

  /**
   * Consolidated embedded metadata associated with the file. It includes exif, iptc,
   * and xmp data. Send `embeddedMetadata` in `responseFields` in API request to get
   * embeddedMetadata in the upload API response.
   */
  embeddedMetadata?: FileUploadResponse.EmbeddedMetadata;

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
  metadata?: FileUploadResponse.Metadata;

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
   * Consolidated embedded metadata associated with the file. It includes exif, iptc,
   * and xmp data. Send `embeddedMetadata` in `responseFields` in API request to get
   * embeddedMetadata in the upload API response.
   */
  export interface EmbeddedMetadata {
    AboutCvTermCvId?: string;

    AboutCvTermId?: string;

    AboutCvTermName?: string;

    AboutCvTermRefinedAbout?: string;

    AdditionalModelInformation?: string;

    ApplicationRecordVersion?: number;

    Artist?: string;

    ArtworkCircaDateCreated?: string;

    ArtworkContentDescription?: string;

    ArtworkContributionDescription?: string;

    ArtworkCopyrightNotice?: string;

    ArtworkCopyrightOwnerID?: string;

    ArtworkCopyrightOwnerName?: string;

    ArtworkCreator?: Array<string>;

    ArtworkCreatorID?: Array<string>;

    ArtworkDateCreated?: string;

    ArtworkLicensorID?: string;

    ArtworkLicensorName?: string;

    ArtworkPhysicalDescription?: string;

    ArtworkSource?: string;

    ArtworkSourceInventoryNo?: string;

    ArtworkSourceInvURL?: string;

    ArtworkStylePeriod?: Array<string>;

    ArtworkTitle?: string;

    AuthorsPosition?: string;

    Byline?: string;

    BylineTitle?: string;

    Caption?: string;

    CaptionAbstract?: string;

    CaptionWriter?: string;

    City?: string;

    ColorSpace?: string;

    ComponentsConfiguration?: string;

    Copyright?: string;

    CopyrightNotice?: string;

    CopyrightOwnerID?: Array<string>;

    CopyrightOwnerName?: Array<string>;

    Country?: string;

    CountryCode?: string;

    CountryPrimaryLocationCode?: string;

    CountryPrimaryLocationName?: string;

    Creator?: string;

    CreatorAddress?: string;

    CreatorCity?: string;

    CreatorCountry?: string;

    CreatorPostalCode?: string;

    CreatorRegion?: string;

    CreatorWorkEmail?: string;

    CreatorWorkTelephone?: string;

    CreatorWorkURL?: string;

    Credit?: string;

    DateCreated?: string;

    DateTimeCreated?: string;

    DateTimeOriginal?: string;

    Description?: string;

    DigitalImageGUID?: string;

    DigitalSourceType?: string;

    EmbeddedEncodedRightsExpr?: string;

    EmbeddedEncodedRightsExprLangID?: string;

    EmbeddedEncodedRightsExprType?: string;

    Event?: string;

    ExifVersion?: string;

    FlashpixVersion?: string;

    GenreCvId?: string;

    GenreCvTermId?: string;

    GenreCvTermName?: string;

    GenreCvTermRefinedAbout?: string;

    Headline?: string;

    ImageCreatorID?: string;

    ImageCreatorImageID?: string;

    ImageCreatorName?: string;

    ImageDescription?: string;

    ImageRegionBoundaryH?: Array<number>;

    ImageRegionBoundaryRx?: Array<number>;

    ImageRegionBoundaryShape?: Array<string>;

    ImageRegionBoundaryUnit?: Array<string>;

    ImageRegionBoundaryVerticesX?: Array<number>;

    ImageRegionBoundaryVerticesY?: Array<number>;

    ImageRegionBoundaryW?: Array<number>;

    ImageRegionBoundaryX?: Array<number>;

    ImageRegionBoundaryY?: Array<number>;

    ImageRegionCtypeIdentifier?: Array<string>;

    ImageRegionCtypeName?: Array<string>;

    ImageRegionID?: Array<string>;

    ImageRegionName?: Array<string>;

    ImageRegionOrganisationInImageName?: Array<string>;

    ImageRegionPersonInImage?: Array<string>;

    ImageRegionRoleIdentifier?: Array<string>;

    ImageRegionRoleName?: Array<string>;

    ImageSupplierID?: string;

    ImageSupplierImageID?: string;

    ImageSupplierName?: string;

    Instructions?: string;

    IntellectualGenre?: string;

    Keywords?: Array<string>;

    LicensorCity?: Array<string>;

    LicensorCountry?: Array<string>;

    LicensorEmail?: Array<string>;

    LicensorExtendedAddress?: Array<string>;

    LicensorID?: Array<string>;

    LicensorName?: Array<string>;

    LicensorPostalCode?: Array<string>;

    LicensorRegion?: Array<string>;

    LicensorStreetAddress?: Array<string>;

    LicensorTelephone1?: Array<string>;

    LicensorTelephone2?: Array<string>;

    LicensorURL?: Array<string>;

    LinkedEncodedRightsExpr?: string;

    LinkedEncodedRightsExprLangID?: string;

    LinkedEncodedRightsExprType?: string;

    Location?: string;

    LocationCreatedCity?: string;

    LocationCreatedCountryCode?: string;

    LocationCreatedCountryName?: string;

    LocationCreatedGPSAltitude?: string;

    LocationCreatedGPSLatitude?: string;

    LocationCreatedGPSLongitude?: string;

    LocationCreatedLocationId?: string;

    LocationCreatedLocationName?: string;

    LocationCreatedProvinceState?: string;

    LocationCreatedSublocation?: string;

    LocationCreatedWorldRegion?: string;

    LocationShownCity?: Array<string>;

    LocationShownCountryCode?: Array<string>;

    LocationShownCountryName?: Array<string>;

    LocationShownGPSAltitude?: Array<string>;

    LocationShownGPSLatitude?: Array<string>;

    LocationShownGPSLongitude?: Array<string>;

    LocationShownLocationId?: Array<string>;

    LocationShownLocationName?: Array<string>;

    LocationShownProvinceState?: Array<string>;

    LocationShownSublocation?: Array<string>;

    LocationShownWorldRegion?: Array<string>;

    MaxAvailHeight?: number;

    MaxAvailWidth?: number;

    ModelAge?: Array<number>;

    ModelReleaseID?: Array<string>;

    ObjectAttributeReference?: string;

    ObjectName?: string;

    OffsetTimeOriginal?: string;

    OrganisationInImageCode?: Array<string>;

    OrganisationInImageName?: Array<string>;

    Orientation?: string;

    OriginalTransmissionReference?: string;

    PersonInImage?: Array<string>;

    PersonInImageCvTermCvId?: Array<string>;

    PersonInImageCvTermId?: Array<string>;

    PersonInImageCvTermName?: Array<string>;

    PersonInImageCvTermRefinedAbout?: Array<string>;

    PersonInImageDescription?: Array<string>;

    PersonInImageId?: Array<string>;

    PersonInImageName?: Array<string>;

    ProductInImageDescription?: Array<string>;

    ProductInImageGTIN?: Array<number>;

    ProductInImageName?: Array<string>;

    PropertyReleaseID?: Array<string>;

    ProvinceState?: string;

    Rating?: number;

    RegistryEntryRole?: Array<string>;

    RegistryItemID?: Array<string>;

    RegistryOrganisationID?: Array<string>;

    ResolutionUnit?: string;

    Rights?: string;

    Scene?: Array<string>;

    Source?: string;

    SpecialInstructions?: string;

    State?: string;

    Subject?: Array<string>;

    SubjectCode?: Array<string>;

    SubjectReference?: Array<string>;

    Sublocation?: string;

    TimeCreated?: string;

    Title?: string;

    TransmissionReference?: string;

    UsageTerms?: string;

    WebStatement?: string;

    Writer?: string;

    WriterEditor?: string;

    XResolution?: number;

    YResolution?: number;
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
    'aws-auto-tagging'?: 'success' | 'pending' | 'failed';

    'google-auto-tagging'?: 'success' | 'pending' | 'failed';

    'remove-bg'?: 'success' | 'pending' | 'failed';
  }

  /**
   * Legacy metadata. Send `metadata` in `responseFields` in API request to get
   * metadata in the upload API response.
   */
  export interface Metadata {
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

    exif?: Metadata.Exif;

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

  export namespace Metadata {
    export interface Exif {
      /**
       * Object containing Exif details.
       */
      exif?: Shared.ExifDetails;

      /**
       * Object containing GPS information.
       */
      gps?: Shared.Gps;

      /**
       * Object containing EXIF image information.
       */
      image?: Shared.ExifImage;

      /**
       * JSON object.
       */
      interoperability?: Shared.Interoperability;

      makernote?: { [key: string]: unknown };

      /**
       * Object containing Thumbnail information.
       */
      thumbnail?: Shared.Thumbnail;
    }
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
   * This field accepts three kinds of values:
   *
   * - `binary` - You can send the content of the file as binary. This is used when a
   *   file is being uploaded from the browser.
   * - `base64` - Base64 encoded string of file content.
   * - `url` - URL of the file from where to download the content before uploading.
   *
   * Note: When passing a URL in the file parameter, please ensure that our servers
   * can access the URL. In case ImageKit is unable to download the file from the
   * specified URL, a `400` error response is returned. This will also result in a
   * `400` error if the file download request is aborted if response headers are not
   * received in 8 seconds.
   */
  file: string;

  /**
   * The name with which the file has to be uploaded. The file name can contain:
   *
   * - Alphanumeric Characters: `a-z`, `A-Z`, `0-9`.
   * - Special Characters: `.`, `-`
   *
   * Any other character including space will be replaced by `_`
   */
  fileName: string;

  /**
   * A unique value that the ImageKit.io server will use to recognize and prevent
   * subsequent retries for the same request. We suggest using V4 UUIDs, or another
   * random string with enough entropy to avoid collisions. This field is only
   * required for authentication when uploading a file from the client side.
   *
   * **Note**: Sending a value that has been used in the past will result in a
   * validation error. Even if your previous request resulted in an error, you should
   * always send a new value for this field.
   */
  token?: string;

  /**
   * Server-side checks to run on the asset. Read more about
   * [Upload API checks](/docs/api-reference/upload-file/upload-file#upload-api-checks).
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
   * Stringified JSON key-value data to be associated with the asset.
   */
  customMetadata?: string;

  /**
   * The time until your signature is valid. It must be a
   * [Unix time](https://en.wikipedia.org/wiki/Unix_time) in less than 1 hour into
   * the future. It should be in seconds. This field is only required for
   * authentication when uploading a file from the client side.
   */
  expire?: string;

  /**
   * Stringified JSON object with an array of extensions to be applied to the image.
   * Refer to extensions schema in
   * [update file API request body](/docs/api-reference/digital-asset-management-dam/managing-assets/update-file-details#request-body).
   */
  extensions?: string;

  /**
   * The folder path in which the image has to be uploaded. If the folder(s) didn't
   * exist before, a new folder(s) is created.
   *
   * The folder name can contain:
   *
   * - Alphanumeric Characters: `a-z` , `A-Z` , `0-9`
   * - Special Characters: `/` , `_` , `-`
   *
   * Using multiple `/` creates a nested folder.
   */
  folder?: string;

  /**
   * Whether to mark the file as private or not.
   *
   * If `true`, the file is marked as private and is accessible only using named
   * transformation or signed URL.
   */
  isPrivateFile?: 'true' | 'false';

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
  isPublished?: 'true' | 'false';

  /**
   * If set to `true` and a file already exists at the exact location, its AITags
   * will be removed. Set `overwriteAITags` to `false` to preserve AITags.
   */
  overwriteAITags?: 'true' | 'false';

  /**
   * If the request does not have `customMetadata`, and a file already exists at the
   * exact location, existing customMetadata will be removed.
   */
  overwriteCustomMetadata?: 'true' | 'false';

  /**
   * If `false` and `useUniqueFileName` is also `false`, and a file already exists at
   * the exact location, upload API will return an error immediately.
   */
  overwriteFile?: string;

  /**
   * If the request does not have `tags`, and a file already exists at the exact
   * location, existing tags will be removed.
   */
  overwriteTags?: 'true' | 'false';

  /**
   * Your ImageKit.io public key. This field is only required for authentication when
   * uploading a file from the client side.
   */
  publicKey?: string;

  /**
   * Comma-separated values of the fields that you want the API to return in the
   * response.
   *
   * For example, set the value of this field to
   * `tags,customCoordinates,isPrivateFile` to get the value of `tags`,
   * `customCoordinates`, and `isPrivateFile` in the response.
   *
   * Accepts combination of `tags`, `customCoordinates`, `isPrivateFile`,
   * `embeddedMetadata`, `isPublished`, `customMetadata`, and `metadata`.
   */
  responseFields?: string;

  /**
   * HMAC-SHA1 digest of the token+expire using your ImageKit.io private API key as a
   * key. Learn how to create a signature on the page below. This should be in
   * lowercase.
   *
   * Signature must be calculated on the server-side. This field is only required for
   * authentication when uploading a file from the client side.
   */
  signature?: string;

  /**
   * Set the tags while uploading the file.
   *
   * Comma-separated value of tags in the format `tag1,tag2,tag3`. The maximum length
   * of all characters should not exceed 500. `%` is not allowed.
   *
   * If this field is not specified and the file is overwritten then the tags will be
   * removed.
   */
  tags?: string;

  /**
   * Stringified JSON object with properties for pre and post transformations:
   *
   * `pre` - Accepts a "string" containing a valid transformation used for requesting
   * a pre-transformation for an image or a video file.
   *
   * `post` - Accepts an array of objects with properties:
   *
   * - `type`: One of `transformation`, `gif-to-video`, `thumbnail`, or `abs`
   *   (Adaptive bitrate streaming).
   * - `value`: A "string" corresponding to the required transformation. Required if
   *   `type` is `transformation` or `abs`. Optional if `type` is `gif-to-video` or
   *   `thumbnail`.
   * - `protocol`: Either `hls` or `dash`, applicable only if `type` is `abs`.
   *
   * Read more about
   * [Adaptive bitrate streaming (ABS)](/docs/adaptive-bitrate-streaming).
   */
  transformation?: string;

  /**
   * Whether to use a unique filename for this file or not.
   *
   * If `true`, ImageKit.io will add a unique suffix to the filename parameter to get
   * a unique filename.
   *
   * If `false`, then the image is uploaded with the provided filename parameter, and
   * any existing file with the same name is replaced.
   */
  useUniqueFileName?: 'true' | 'false';

  /**
   * The final status of extensions after they have completed execution will be
   * delivered to this endpoint as a POST request.
   * [Learn more](/docs/api-reference/digital-asset-management-dam/managing-assets/update-file-details#webhook-payload-structure)
   * about the webhook payload structure.
   */
  webhookUrl?: string;
}

export declare namespace Files {
  export { type FileUploadResponse as FileUploadResponse, type FileUploadParams as FileUploadParams };
}
