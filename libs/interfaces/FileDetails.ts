import { FileType } from "./FileType";
import { Item } from "./Item";

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
  extensions?: object[];
  /*
    * Final status of pending extensions will be sent to this URL. 
    */
  webhookUrl?: string
}

/**
 *
 * File details such as tags, customCoordinates, and isPrivate properties using get file detail API.
 *
 * @see {@link https://docs.imagekit.io/api-reference/media-api/get-file-details}
 * @see {@link https://docs.imagekit.io/api-reference/media-api/update-file-details#understanding-response}
 */
export interface FileDetailsResponse {
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
  tags: string[] | null;
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
  AITags?: object[];
  /*
   * Field object which will contain the status of each extension at the time of completion of the update/upload request.
   */ 
  extensionStatus?: { [key: string]: string }
}
