import { TransformationPosition } from ".";
import { Transformation } from "./Transformation";

export interface UrlOptionsBase {
  /**
   * An array of objects specifying the transformations to be applied in the URL.
   * The transformation name and the value should be specified as a key-value pair in each object.
   * @see {@link https://docs.imagekit.io/features/image-transformations/chained-transformations}
   */
  transformation?: Array<Transformation>;
  /**
   * Default value is path that places the transformation string as a path parameter in the URL.
   * Can also be specified as query which adds the transformation string as the query parameter tr in the URL.
   * If you use src parameter to create the URL, then the transformation string is always added as a query parameter.
   */
  transformationPosition?: TransformationPosition;
  /**
   * These are the other query parameters that you want to add to the final URL.
   * These can be any query parameters and not necessarily related to ImageKit.
   * Especially useful, if you want to add some versioning parameter to your URLs.
   */
  queryParameters?: { [key: string]: string };
  /**
   * The base URL to be appended before the path of the image.
   * If not specified, the URL Endpoint specified at the time of SDK initialization is used.
   */
  urlEndpoint?: string;
  /**
   * Default is false. If set to true, the SDK generates a signed image URL adding the image signature to the image URL.
   * If you are creating URL using src parameter instead of path then do correct urlEndpoint for this to work.
   * Otherwise returned URL will have wrong signature.
   */
  signed?: boolean;
  /**
   * Meant to be used along with the signed parameter to specify the time in seconds from now when the URL should expire.
   * If specified, the URL contains the expiry timestamp in the URL and the image signature is modified accordingly.
   */
  expireSeconds?: number;
}

export interface UrlOptionsSrc extends UrlOptionsBase {
  /**
   * Conditional. This is the complete URL of an image already mapped to ImageKit.
   * For example, https://ik.imagekit.io/your_imagekit_id/endpoint/path/to/image.jpg.
   * Either the path or src parameter need to be specified for URL generation.
   */
  src: string;
  path?: never;
}

export interface UrlOptionsPath extends UrlOptionsBase {
  /**
   * Conditional. This is the path at which the image exists.
   * For example, /path/to/image.jpg. Either the path or src parameter need to be specified for URL generation.
   */
  path: string;
  src?: never;
}

/**
 * Options for generating an URL
 *
 * @see {@link https://github.com/imagekit-developer/imagekit-nodejs#url-generation}
 */
export type UrlOptions = UrlOptionsSrc | UrlOptionsPath;
