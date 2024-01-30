import { FileType } from "./FileType";
import { Item } from "./Item";

export interface EmbeddedMetadataValues {
  [key: string]:
    | string
    | number
    | boolean
    | Date
    | Array<string | number | boolean | Date>
}

export interface AITagItem {
  name: string
  confidence: number
  source: 'google-auto-tagging' | 'aws-auto-tagging'
}

export interface CMValues {
  [key: string]: | string
  | number
  | boolean
  | Array<string | number | boolean>
}

interface BgRemoval {
  name: string
  options: {
    bg_color?: string
    bg_image_url?: string
    add_shadow: boolean
    semitransparency: boolean
  }
}

interface AutoTag {
  name: string
  maxTags: number
  minConfidence: number
}

export type Extension = (BgRemoval | AutoTag)[];

/**
 * Options when updating file details such as tags and customCoordinates attribute using update file detail API.
 *
 * @see {@link https://docs.imagekit.io/api-reference/media-api/update-file-details}
 */
export interface FileDetailsOptions {
  /**
   * Array of tags associated with the file.
   */
  tags?: string[];
  /**
   * Define an important area in the image.
   * Example - 50,50,500,500
   */
  customCoordinates?: string;
  /* 
  * Object with array of extensions to be processed on the image.
  */
  extensions?: Extension;
  /*
    * Final status of pending extensions will be sent to this URL. 
    */
  webhookUrl?: string
  /*
   * Array of AI tags to remove from the asset.
   */
  removeAITags?: string[];
  /*
   * A key-value data to be associated with the asset. To unset a key, send null value for that key. Before setting any custom metadata on an asset you have to create the field using custom metadata fields API.
   */
  customMetadata?: CMValues;
}

/**
 *
 * File object.
 *
 * @see {@link https://docs.imagekit.io/api-reference/media-api#file-object-structure}
 */
export interface FileObject {
  /**
   * The unique fileId of the uploaded file.
   */
  fileId: string;
  /**
   * Type of item. It can be either file or folder.
   */
  type: Item;
  /**
   * Name of the file or folder.
   */
  name: string;
  /**
   * The relative path of the file. In case of image, you can use this
   * path to construct different transformations.
   */
  filePath: string;
  /**
   * Array of tags associated with the image. If no tags are set, it will be null.
   */
  tags?: string[] | null;
  /**
   * Is the file marked as private. It can be either true or false.
   */
  isPrivateFile: boolean;
  /**
   * Value of custom coordinates associated with the image in format x,y,width,height.
   * If customCoordinates are not defined then it is null.
   */
  customCoordinates: string | null;
  /**
   * A publicly accessible URL of the file.
   */
  url: string;
  /**
   * In case of an image, a small thumbnail URL.
   */
  thumbnail: string;
  /**
   * The type of file, it could be either image or non-image.
   */
  fileType: FileType;
  /*
   * AITags field is populated only because the google-auto-tagging extension was executed synchronously and it received a successresponse.
   */
  AITags?: AITagItem[];
  /*
   * Field object which will contain the status of each extension at the time of completion of the update/upload request.
   */
  extensionStatus?: { [key: string]: string }
  /*
   * Consolidated embedded metadata associated with the file. It includes exif, iptc, and xmp data.
   */
  embeddedMetadata?: EmbeddedMetadataValues | null;
  /*
   * A key-value data associated with the asset. Before setting any custom metadata on an asset, you have to create the field using custom metadata fields API.
   */
  customMetadata?: CMValues;
  /*
   * Size of the file in bytes
   */
  size: number;
  /*
   * The date and time when the file was first uploaded. The format is YYYY-MM-DDTHH:mm:ss.sssZ
   */
  createdAt: string;
  /*
   * The date and time when the file was last updated. The format is YYYY-MM-DDTHH:mm:ss.sssZ
   */
  updatedAt: string;
  /*
   * Height of the image in pixels (Only for images)
   */
  height: number;
  /*
   * Width of the image in pixels (Only for Images)
   */
  width: number;
  /*
   * A boolean indicating if the image has an alpha layer or not.
   */
  hasAlpha: boolean;
  /*
   * MIME Type of the file. For example - image/jpeg
   */
  mime?: string;
  /**
   * An object containing the file or file version's id (versionId) and name.
   */
  versionInfo?: { name: string; id: string };
}


export interface FileVersionDetailsOptions {
  /**
   * The unique fileId of the uploaded file. fileId is returned in list files API and upload API.
   */
  fileId: string;
  /**
   * The unique versionId of the uploaded file's version. This is returned in list files API and upload API as id within the versionInfo parameter.
   */
  versionId: string;
}