// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as BatchAPI from './batch';
import { Batch, BatchDeleteParams, BatchDeleteResponse } from './batch';
import * as DetailsAPI from './details';
import { DetailRetrieveResponse, DetailUpdateParams, DetailUpdateResponse, Details } from './details';
import * as MetadataAPI from './metadata';
import {
  Metadata as MetadataAPIMetadata,
  MetadataFromURLParams,
  MetadataFromURLResponse,
  MetadataRetrieveResponse,
} from './metadata';
import * as PurgeAPI from './purge';
import { Purge, PurgeExecuteParams, PurgeExecuteResponse, PurgeStatusResponse } from './purge';
import * as VersionsAPI from './versions';
import {
  VersionDeleteParams,
  VersionDeleteResponse,
  VersionListResponse,
  VersionRestoreParams,
  VersionRestoreResponse,
  VersionRetrieveParams,
  VersionRetrieveResponse,
  Versions,
} from './versions';
import { APIPromise } from '../../core/api-promise';
import { type Uploadable } from '../../core/uploads';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';
import { multipartFormRequestOptions } from '../../internal/uploads';
import { path } from '../../internal/utils/path';

export class Files extends APIResource {
  details: DetailsAPI.Details = new DetailsAPI.Details(this._client);
  batch: BatchAPI.Batch = new BatchAPI.Batch(this._client);
  versions: VersionsAPI.Versions = new VersionsAPI.Versions(this._client);
  purge: PurgeAPI.Purge = new PurgeAPI.Purge(this._client);
  metadata: MetadataAPI.Metadata = new MetadataAPI.Metadata(this._client);

  /**
   * This API can list all the uploaded files and folders in your ImageKit.io media
   * library. In addition, you can fine-tune your query by specifying various filters
   * by generating a query string in a Lucene-like syntax and provide this generated
   * string as the value of the `searchQuery`.
   *
   * @example
   * ```ts
   * const files = await client.files.list();
   * ```
   */
  list(
    query: FileListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<FileListResponse> {
    return this._client.get('/v1/files', { query, ...options });
  }

  /**
   * This API deletes the file and all its file versions permanently.
   *
   * Note: If a file or specific transformation has been requested in the past, then
   * the response is cached. Deleting a file does not purge the cache. You can purge
   * the cache using purge cache API.
   *
   * @example
   * ```ts
   * await client.files.delete('fileId');
   * ```
   */
  delete(fileID: string, options?: RequestOptions): APIPromise<void> {
    return this._client.delete(path`/v1/files/${fileID}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }

  /**
   * This API adds tags to multiple files in bulk. A maximum of 50 files can be
   * specified at a time.
   *
   * @example
   * ```ts
   * const response = await client.files.addTags({
   *   fileIds: [
   *     '598821f949c0a938d57563bd',
   *     '598821f949c0a938d57563be',
   *   ],
   *   tags: ['t-shirt', 'round-neck', 'sale2019'],
   * });
   * ```
   */
  addTags(body: FileAddTagsParams, options?: RequestOptions): APIPromise<FileAddTagsResponse> {
    return this._client.post('/v1/files/addTags', { body, ...options });
  }

  /**
   * This will copy a file from one folder to another.
   *
   * Note: If any file at the destination has the same name as the source file, then
   * the source file and its versions (if `includeFileVersions` is set to true) will
   * be appended to the destination file version history.
   *
   * @example
   * ```ts
   * const response = await client.files.copy({
   *   destinationPath: '/folder/to/copy/into/',
   *   sourceFilePath: '/path/to/file.jpg',
   * });
   * ```
   */
  copy(body: FileCopyParams, options?: RequestOptions): APIPromise<unknown> {
    return this._client.post('/v1/files/copy', { body, ...options });
  }

  /**
   * This will move a file and all its versions from one folder to another.
   *
   * Note: If any file at the destination has the same name as the source file, then
   * the source file and its versions will be appended to the destination file.
   *
   * @example
   * ```ts
   * const response = await client.files.move({
   *   destinationPath: '/folder/to/move/into/',
   *   sourceFilePath: '/path/to/file.jpg',
   * });
   * ```
   */
  move(body: FileMoveParams, options?: RequestOptions): APIPromise<unknown> {
    return this._client.post('/v1/files/move', { body, ...options });
  }

  /**
   * This API removes AITags from multiple files in bulk. A maximum of 50 files can
   * be specified at a time.
   *
   * @example
   * ```ts
   * const response = await client.files.removeAITags({
   *   AITags: ['t-shirt', 'round-neck', 'sale2019'],
   *   fileIds: [
   *     '598821f949c0a938d57563bd',
   *     '598821f949c0a938d57563be',
   *   ],
   * });
   * ```
   */
  removeAITags(body: FileRemoveAITagsParams, options?: RequestOptions): APIPromise<FileRemoveAITagsResponse> {
    return this._client.post('/v1/files/removeAITags', { body, ...options });
  }

  /**
   * This API removes tags from multiple files in bulk. A maximum of 50 files can be
   * specified at a time.
   *
   * @example
   * ```ts
   * const response = await client.files.removeTags({
   *   fileIds: [
   *     '598821f949c0a938d57563bd',
   *     '598821f949c0a938d57563be',
   *   ],
   *   tags: ['t-shirt', 'round-neck', 'sale2019'],
   * });
   * ```
   */
  removeTags(body: FileRemoveTagsParams, options?: RequestOptions): APIPromise<FileRemoveTagsResponse> {
    return this._client.post('/v1/files/removeTags', { body, ...options });
  }

  /**
   * You can rename an already existing file in the media library using rename file
   * API. This operation would rename all file versions of the file.
   *
   * Note: The old URLs will stop working. The file/file version URLs cached on CDN
   * will continue to work unless a purge is requested.
   *
   * @example
   * ```ts
   * const response = await client.files.rename({
   *   filePath: '/path/to/file.jpg',
   *   newFileName: 'newFileName.jpg',
   * });
   * ```
   */
  rename(body: FileRenameParams, options?: RequestOptions): APIPromise<FileRenameResponse> {
    return this._client.put('/v1/files/rename', { body, ...options });
  }

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
   * const response = await client.files.uploadV1({
   *   file: fs.createReadStream('path/to/file'),
   *   fileName: 'fileName',
   * });
   * ```
   */
  uploadV1(body: FileUploadV1Params, options?: RequestOptions): APIPromise<FileUploadV1Response> {
    return this._client.post(
      '/api/v1/files/upload',
      multipartFormRequestOptions(
        { body, defaultBaseURL: 'https://upload.imagekit.io', ...options },
        this._client,
      ),
    );
  }

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
   * const response = await client.files.uploadV2({
   *   file: fs.createReadStream('path/to/file'),
   *   fileName: 'fileName',
   * });
   * ```
   */
  uploadV2(body: FileUploadV2Params, options?: RequestOptions): APIPromise<FileUploadV2Response> {
    return this._client.post(
      '/api/v2/files/upload',
      multipartFormRequestOptions(
        { body, defaultBaseURL: 'https://upload.imagekit.io', ...options },
        this._client,
      ),
    );
  }
}

export type FileListResponse = Array<FileListResponse.FileListResponseItem>;

export namespace FileListResponse {
  /**
   * Object containing details of a file or file version.
   */
  export interface FileListResponseItem {
    /**
     * An array of tags assigned to the file by auto tagging.
     */
    AITags?: Array<FileListResponseItem.AITag> | null;

    /**
     * Date and time when the file was uploaded. The date and time is in ISO8601
     * format.
     */
    createdAt?: string;

    /**
     * An string with custom coordinates of the file.
     */
    customCoordinates?: string | null;

    /**
     * An object with custom metadata for the file.
     */
    customMetadata?: unknown;

    /**
     * Unique identifier of the asset.
     */
    fileId?: string;

    /**
     * Path of the file. This is the path you would use in the URL to access the file.
     * For example, if the file is at the root of the media library, the path will be
     * `/file.jpg`. If the file is inside a folder named `images`, the path will be
     * `/images/file.jpg`.
     */
    filePath?: string;

    /**
     * Type of the file. Possible values are `image`, `non-image`.
     */
    fileType?: string;

    /**
     * Specifies if the image has an alpha channel.
     */
    hasAlpha?: boolean;

    /**
     * Height of the file.
     */
    height?: number;

    /**
     * Specifies if the file is private or not.
     */
    isPrivateFile?: boolean;

    /**
     * Specifies if the file is published or not.
     */
    isPublished?: boolean;

    /**
     * MIME type of the file.
     */
    mime?: string;

    /**
     * Name of the asset.
     */
    name?: string;

    /**
     * Size of the file in bytes.
     */
    size?: number;

    /**
     * An array of tags assigned to the file. Tags are used to search files in the
     * media library.
     */
    tags?: Array<string> | null;

    /**
     * URL of the thumbnail image. This URL is used to access the thumbnail image of
     * the file in the media library.
     */
    thumbnail?: string;

    /**
     * Type of the asset.
     */
    type?: string;

    /**
     * Date and time when the file was last updated. The date and time is in ISO8601
     * format.
     */
    updatedAt?: string;

    /**
     * URL of the file.
     */
    url?: string;

    /**
     * An object with details of the file version.
     */
    versionInfo?: FileListResponseItem.VersionInfo;

    /**
     * Width of the file.
     */
    width?: number;
  }

  export namespace FileListResponseItem {
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
       * Source of the tag. Possible values are `google-auto-tagging` and
       * `aws-auto-tagging`.
       */
      source?: string;
    }

    /**
     * An object with details of the file version.
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
}

export interface FileAddTagsResponse {
  /**
   * An array of fileIds that in which tags were successfully added.
   */
  successfullyUpdatedFileIds?: Array<string>;
}

export type FileCopyResponse = unknown;

export type FileMoveResponse = unknown;

export interface FileRemoveAITagsResponse {
  /**
   * An array of fileIds that in which AITags were successfully removed.
   */
  successfullyUpdatedFileIds?: Array<string>;
}

export interface FileRemoveTagsResponse {
  /**
   * An array of fileIds that in which tags were successfully removed.
   */
  successfullyUpdatedFileIds?: Array<string>;
}

export interface FileRenameResponse {
  /**
   * Unique identifier of the purge request. This can be used to check the status of
   * the purge request.
   */
  purgeRequestId?: string;
}

/**
 * Object containing details of a successful upload.
 */
export interface FileUploadV1Response {
  /**
   * An array of tags assigned to the uploaded file by auto tagging.
   */
  AITags?: Array<FileUploadV1Response.AITag> | null;

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
  embeddedMetadata?: FileUploadV1Response.EmbeddedMetadata;

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
  extensionStatus?: FileUploadV1Response.ExtensionStatus;

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
  metadata?: FileUploadV1Response.Metadata;

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
  versionInfo?: FileUploadV1Response.VersionInfo;

  /**
   * The video codec used in the video (only for video).
   */
  videoCodec?: string;

  /**
   * Width of the image in pixels (Only for Images)
   */
  width?: number;
}

export namespace FileUploadV1Response {
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
      exif?: Exif.Exif;

      /**
       * Object containing GPS information.
       */
      gps?: Exif.Gps;

      /**
       * Object containing EXIF image information.
       */
      image?: Exif.Image;

      /**
       * JSON object.
       */
      interoperability?: Exif.Interoperability;

      makernote?: { [key: string]: unknown };

      /**
       * Object containing Thumbnail information.
       */
      thumbnail?: Exif.Thumbnail;
    }

    export namespace Exif {
      /**
       * Object containing Exif details.
       */
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

      /**
       * Object containing GPS information.
       */
      export interface Gps {
        GPSVersionID?: Array<number>;
      }

      /**
       * Object containing EXIF image information.
       */
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

/**
 * Object containing details of a successful upload.
 */
export interface FileUploadV2Response {
  /**
   * An array of tags assigned to the uploaded file by auto tagging.
   */
  AITags?: Array<FileUploadV2Response.AITag> | null;

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
  embeddedMetadata?: FileUploadV2Response.EmbeddedMetadata;

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
  extensionStatus?: FileUploadV2Response.ExtensionStatus;

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
  metadata?: FileUploadV2Response.Metadata;

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
  versionInfo?: FileUploadV2Response.VersionInfo;

  /**
   * The video codec used in the video (only for video).
   */
  videoCodec?: string;

  /**
   * Width of the image in pixels (Only for Images)
   */
  width?: number;
}

export namespace FileUploadV2Response {
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
      exif?: Exif.Exif;

      /**
       * Object containing GPS information.
       */
      gps?: Exif.Gps;

      /**
       * Object containing EXIF image information.
       */
      image?: Exif.Image;

      /**
       * JSON object.
       */
      interoperability?: Exif.Interoperability;

      makernote?: { [key: string]: unknown };

      /**
       * Object containing Thumbnail information.
       */
      thumbnail?: Exif.Thumbnail;
    }

    export namespace Exif {
      /**
       * Object containing Exif details.
       */
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

      /**
       * Object containing GPS information.
       */
      export interface Gps {
        GPSVersionID?: Array<number>;
      }

      /**
       * Object containing EXIF image information.
       */
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

export interface FileListParams {
  /**
   * Type of files to include in the result set. Accepts three values:
   *
   * `all` - include all types of files in the result set. `image` - only search in
   * image type files. `non-image` - only search in files that are not images, e.g.,
   * JS or CSS or video files.
   *
   * Default value - `all`
   */
  fileType?: string;

  /**
   * The maximum number of results to return in response:
   *
   * Minimum value - 1
   *
   * Maximum value - 1000
   *
   * Default value - 1000
   */
  limit?: string;

  /**
   * Folder path if you want to limit the search within a specific folder. For
   * example, `/sales-banner/` will only search in folder sales-banner.
   */
  path?: string;

  /**
   * Query string in a Lucene-like query language e.g. `createdAt > "7d"`.
   *
   * Note : When the searchQuery parameter is present, the following query parameters
   * will have no effect on the result:
   *
   * 1. `tags`
   * 2. `type`
   * 3. `name`
   *
   * [Learn more](/docs/api-reference/digital-asset-management-dam/list-and-search-assets#advanced-search-queries)
   * from examples.
   */
  searchQuery?: string;

  /**
   * The number of results to skip before returning results:
   *
   * Minimum value - 0
   *
   * Default value - 0
   */
  skip?: string;

  /**
   * You can sort based on the following fields:
   *
   * 1. name - `ASC_NAME` or `DESC_NAME`
   * 2. createdAt - `ASC_CREATED` or `DESC_CREATED`
   * 3. updatedAt - `ASC_UPDATED` or `DESC_UPDATED`
   * 4. height - `ASC_HEIGHT` or `DESC_HEIGHT`
   * 5. width - `ASC_WIDTH` or `DESC_WIDTH`
   * 6. size - `ASC_SIZE` or `DESC_SIZE`
   *
   * Default value - `ASC_CREATED`
   */
  sort?: string;

  /**
   * Limit search to one of `file`, `file-version`, or `folder`. Pass `all` to
   * include `files` and `folders` in search results (`file-version` will not be
   * included in this case).
   *
   * Default value - `file`
   */
  type?: 'file' | 'file-version' | 'folder' | 'all';
}

export interface FileAddTagsParams {
  /**
   * An array of fileIds to which you want to add tags.
   */
  fileIds: Array<string>;

  /**
   * An array of tags that you want to add to the files.
   */
  tags: Array<string>;
}

export interface FileCopyParams {
  /**
   * Full path to the folder you want to copy the above file into.
   */
  destinationPath: string;

  /**
   * The full path of the file you want to copy.
   */
  sourceFilePath: string;

  /**
   * Option to copy all versions of a file. By default, only the current version of
   * the file is copied. When set to true, all versions of the file will be copied.
   * Default value - `false`.
   */
  includeFileVersions?: boolean;
}

export interface FileMoveParams {
  /**
   * Full path to the folder you want to move the above file into.
   */
  destinationPath: string;

  /**
   * The full path of the file you want to move.
   */
  sourceFilePath: string;
}

export interface FileRemoveAITagsParams {
  /**
   * An array of AITags that you want to remove from the files.
   */
  AITags: Array<string>;

  /**
   * An array of fileIds from which you want to remove AITags.
   */
  fileIds: Array<string>;
}

export interface FileRemoveTagsParams {
  /**
   * An array of fileIds from which you want to remove tags.
   */
  fileIds: Array<string>;

  /**
   * An array of tags that you want to remove from the files.
   */
  tags: Array<string>;
}

export interface FileRenameParams {
  /**
   * The full path of the file you want to rename.
   */
  filePath: string;

  /**
   * The new name of the file. A filename can contain:
   *
   * Alphanumeric Characters: `a-z`, `A-Z`, `0-9` (including Unicode letters, marks,
   * and numerals in other languages). Special Characters: `.`, `_`, and `-`.
   *
   * Any other character, including space, will be replaced by `_`.
   */
  newFileName: string;

  /**
   * Option to purge cache for the old file and its versions' URLs.
   *
   * When set to true, it will internally issue a purge cache request on CDN to
   * remove cached content of old file and its versions. This purge request is
   * counted against your monthly purge quota.
   *
   * Note: If the old file were accessible at
   * `https://ik.imagekit.io/demo/old-filename.jpg`, a purge cache request would be
   * issued against `https://ik.imagekit.io/demo/old-filename.jpg*` (with a wildcard
   * at the end). It will remove the file and its versions' URLs and any
   * transformations made using query parameters on this file or its versions.
   * However, the cache for file transformations made using path parameters will
   * persist. You can purge them using the purge API. For more details, refer to the
   * purge API documentation.
   *
   * Default value - `false`
   */
  purgeCache?: boolean;
}

export interface FileUploadV1Params {
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
  file: Uploadable;

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

export interface FileUploadV2Params {
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
  file: Uploadable;

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
   * Stringified JSON key-value data to be associated with the asset.
   */
  customMetadata?: string;

  /**
   * Stringified JSON object with an array of extensions to be applied to the image.
   * Refer to extensions schema in
   * [update file API request body](/docs/api-reference/digital-asset-management-dam/managing-assets/update-file-details#request-body).
   */
  extensions?: string;

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

Files.Details = Details;
Files.Batch = Batch;
Files.Versions = Versions;
Files.Purge = Purge;
Files.Metadata = MetadataAPIMetadata;

export declare namespace Files {
  export {
    type FileListResponse as FileListResponse,
    type FileAddTagsResponse as FileAddTagsResponse,
    type FileCopyResponse as FileCopyResponse,
    type FileMoveResponse as FileMoveResponse,
    type FileRemoveAITagsResponse as FileRemoveAITagsResponse,
    type FileRemoveTagsResponse as FileRemoveTagsResponse,
    type FileRenameResponse as FileRenameResponse,
    type FileUploadV1Response as FileUploadV1Response,
    type FileUploadV2Response as FileUploadV2Response,
    type FileListParams as FileListParams,
    type FileAddTagsParams as FileAddTagsParams,
    type FileCopyParams as FileCopyParams,
    type FileMoveParams as FileMoveParams,
    type FileRemoveAITagsParams as FileRemoveAITagsParams,
    type FileRemoveTagsParams as FileRemoveTagsParams,
    type FileRenameParams as FileRenameParams,
    type FileUploadV1Params as FileUploadV1Params,
    type FileUploadV2Params as FileUploadV2Params,
  };

  export {
    Details as Details,
    type DetailRetrieveResponse as DetailRetrieveResponse,
    type DetailUpdateResponse as DetailUpdateResponse,
    type DetailUpdateParams as DetailUpdateParams,
  };

  export {
    Batch as Batch,
    type BatchDeleteResponse as BatchDeleteResponse,
    type BatchDeleteParams as BatchDeleteParams,
  };

  export {
    Versions as Versions,
    type VersionRetrieveResponse as VersionRetrieveResponse,
    type VersionListResponse as VersionListResponse,
    type VersionDeleteResponse as VersionDeleteResponse,
    type VersionRestoreResponse as VersionRestoreResponse,
    type VersionRetrieveParams as VersionRetrieveParams,
    type VersionDeleteParams as VersionDeleteParams,
    type VersionRestoreParams as VersionRestoreParams,
  };

  export {
    Purge as Purge,
    type PurgeExecuteResponse as PurgeExecuteResponse,
    type PurgeStatusResponse as PurgeStatusResponse,
    type PurgeExecuteParams as PurgeExecuteParams,
  };

  export {
    MetadataAPIMetadata as Metadata,
    type MetadataRetrieveResponse as MetadataRetrieveResponse,
    type MetadataFromURLResponse as MetadataFromURLResponse,
    type MetadataFromURLParams as MetadataFromURLParams,
  };
}
