// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Details extends APIResource {
  /**
   * This API returns an object with details or attributes about the current version
   * of the file.
   *
   * @example
   * ```ts
   * const detail = await client.files.details.retrieve(
   *   'fileId',
   * );
   * ```
   */
  retrieve(fileID: string, options?: RequestOptions): APIPromise<DetailRetrieveResponse> {
    return this._client.get(path`/v1/files/${fileID}/details`, options);
  }

  /**
   * This API updates the details or attributes of the current version of the file.
   * You can update `tags`, `customCoordinates`, `customMetadata`, publication
   * status, remove existing `AITags` and apply extensions using this API.
   *
   * @example
   * ```ts
   * const detail = await client.files.details.update('fileId', {
   *   customCoordinates: '10,10,100,100',
   *   customMetadata: { brand: 'Nike', color: 'red' },
   *   extensions: [
   *     { name: 'remove-bg', options: { add_shadow: true } },
   *     {
   *       name: 'google-auto-tagging',
   *       minConfidence: 80,
   *       maxTags: 10,
   *     },
   *     {
   *       name: 'aws-auto-tagging',
   *       minConfidence: 80,
   *       maxTags: 10,
   *     },
   *   ],
   *   removeAITags: ['car', 'vehicle', 'motorsports'],
   *   tags: ['tag1', 'tag2'],
   *   webhookUrl:
   *     'https://webhook.site/0d6b6c7a-8e5a-4b3a-8b7c-0d6b6c7a8e5a',
   * });
   * ```
   */
  update(
    fileID: string,
    body: DetailUpdateParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<DetailUpdateResponse> {
    return this._client.patch(path`/v1/files/${fileID}/details`, { body, ...options });
  }
}

export interface DetailRetrieveResponse {
  /**
   * An array of tags assigned to the file by auto tagging.
   */
  AITags?: Array<DetailRetrieveResponse.AITag> | null;

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
  versionInfo?: DetailRetrieveResponse.VersionInfo;

  /**
   * Width of the file.
   */
  width?: number;
}

export namespace DetailRetrieveResponse {
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

export interface DetailUpdateResponse {
  /**
   * An array of tags assigned to the file by auto tagging.
   */
  AITags?: Array<DetailUpdateResponse.AITag> | null;

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

  extensionStatus?: DetailUpdateResponse.ExtensionStatus;

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
  versionInfo?: DetailUpdateResponse.VersionInfo;

  /**
   * Width of the file.
   */
  width?: number;
}

export namespace DetailUpdateResponse {
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

  export interface ExtensionStatus {
    'aws-auto-tagging'?: 'success' | 'pending' | 'failed';

    'google-auto-tagging'?: 'success' | 'pending' | 'failed';

    'remove-bg'?: 'success' | 'pending' | 'failed';
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

export type DetailUpdateParams =
  | DetailUpdateParams.UpdateFileDetails
  | DetailUpdateParams.ChangePublicationStatus;

export declare namespace DetailUpdateParams {
  export interface UpdateFileDetails {
    /**
     * Define an important area in the image in the format `x,y,width,height` e.g.
     * `10,10,100,100`. Send `null` to unset this value.
     */
    customCoordinates?: string | null;

    /**
     * A key-value data to be associated with the asset. To unset a key, send `null`
     * value for that key. Before setting any custom metadata on an asset you have to
     * create the field using custom metadata fields API.
     */
    customMetadata?: unknown;

    /**
     * Array of extensions to be applied to the asset. Each extension can be configured
     * with specific parameters based on the extension type.
     */
    extensions?: Array<UpdateFileDetails.RemoveBackground | UpdateFileDetails.AutoTagging>;

    /**
     * An array of AITags associated with the file that you want to remove, e.g.
     * `["car", "vehicle", "motorsports"]`.
     *
     * If you want to remove all AITags associated with the file, send a string -
     * "all".
     *
     * Note: The remove operation for `AITags` executes before any of the `extensions`
     * are processed.
     */
    removeAITags?: Array<string> | 'all';

    /**
     * An array of tags associated with the file, such as `["tag1", "tag2"]`. Send
     * `null` to unset all tags associated with the file.
     */
    tags?: Array<string> | null;

    /**
     * The final status of extensions after they have completed execution will be
     * delivered to this endpoint as a POST request.
     * [Learn more](/docs/api-reference/digital-asset-management-dam/managing-assets/update-file-details#webhook-payload-structure)
     * about the webhook payload structure.
     */
    webhookUrl?: string;
  }

  export namespace UpdateFileDetails {
    export interface RemoveBackground {
      /**
       * Specifies the background removal extension.
       */
      name: 'remove-bg';

      options?: RemoveBackground.Options;
    }

    export namespace RemoveBackground {
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

    export interface AutoTagging {
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
  }

  export interface ChangePublicationStatus {
    /**
     * Configure the publication status of a file and its versions.
     */
    publish?: ChangePublicationStatus.Publish;
  }

  export namespace ChangePublicationStatus {
    /**
     * Configure the publication status of a file and its versions.
     */
    export interface Publish {
      /**
       * Set to `true` to publish the file. Set to `false` to unpublish the file.
       */
      isPublished: boolean;

      /**
       * Set to `true` to publish/unpublish all versions of the file. Set to `false` to
       * publish/unpublish only the current version of the file.
       */
      includeFileVersions?: boolean;
    }
  }
}

export declare namespace Details {
  export {
    type DetailRetrieveResponse as DetailRetrieveResponse,
    type DetailUpdateResponse as DetailUpdateResponse,
    type DetailUpdateParams as DetailUpdateParams,
  };
}
