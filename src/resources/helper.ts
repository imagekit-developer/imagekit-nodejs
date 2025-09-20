// Helper resource for additional utility functions
// File manually created for helper functions - not generated

import { APIResource } from '../core/resource';
import type { ImageKit } from '../client';
import type {
  SrcOptions,
  Transformation,
  ImageOverlay,
  TextOverlay,
  VideoOverlay,
  SubtitleOverlay,
  SolidColorOverlay,
} from './shared';
import transformationUtils, { safeBtoa } from '../lib/transformation-utils';
import { createHmacSha1 } from '../lib/crypto-utils';
import { uuid4 } from '../internal/utils/uuid';

const TRANSFORMATION_PARAMETER = 'tr';
const SIGNATURE_PARAMETER = 'ik-s';
const TIMESTAMP_PARAMETER = 'ik-t';
const DEFAULT_TIMESTAMP = 9999999999;
const SIMPLE_OVERLAY_PATH_REGEX = new RegExp('^[a-zA-Z0-9-._/ ]*$');
const SIMPLE_OVERLAY_TEXT_REGEX = new RegExp('^[a-zA-Z0-9-._ ]*$');

export class Helper extends APIResource {
  constructor(client: ImageKit) {
    super(client);
  }

  /**
   * Builds a source URL with the given options.
   *
   * @param opts - The options for building the source URL.
   * @returns The constructed source URL.
   */
  buildSrc(opts: SrcOptions): string {
    opts.urlEndpoint = opts.urlEndpoint || '';
    opts.src = opts.src || '';
    opts.transformationPosition = opts.transformationPosition || 'query';

    if (!opts.src) {
      return '';
    }

    const isAbsoluteURL = opts.src.startsWith('http://') || opts.src.startsWith('https://');

    var urlObj, isSrcParameterUsedForURL, urlEndpointPattern;

    try {
      if (!isAbsoluteURL) {
        urlEndpointPattern = new URL(opts.urlEndpoint).pathname;
        urlObj = new URL(pathJoin([opts.urlEndpoint.replace(urlEndpointPattern, ''), opts.src]));
      } else {
        urlObj = new URL(opts.src!);
        isSrcParameterUsedForURL = true;
      }
    } catch (e) {
      return '';
    }

    for (var i in opts.queryParameters) {
      urlObj.searchParams.append(i, String(opts.queryParameters[i]));
    }

    var transformationString = this.buildTransformationString(opts.transformation);

    if (transformationString && transformationString.length) {
      if (!transformationUtils.addAsQueryParameter(opts) && !isSrcParameterUsedForURL) {
        urlObj.pathname = pathJoin([
          TRANSFORMATION_PARAMETER + transformationUtils.getChainTransformDelimiter() + transformationString,
          urlObj.pathname,
        ]);
      }
    }

    if (urlEndpointPattern) {
      urlObj.pathname = pathJoin([urlEndpointPattern, urlObj.pathname]);
    } else {
      urlObj.pathname = pathJoin([urlObj.pathname]);
    }

    // First, build the complete URL with transformations
    let finalUrl = urlObj.href;

    // Add transformation parameter manually to avoid URL encoding
    // URLSearchParams.set() would encode commas and colons in transformation string,
    // It would work correctly but not very readable e.g., "w-300,h-400" is better than "w-300%2Ch-400"
    if (transformationString && transformationString.length) {
      if (transformationUtils.addAsQueryParameter(opts) || isSrcParameterUsedForURL) {
        const separator = urlObj.searchParams.toString() ? '&' : '?';
        finalUrl = `${finalUrl}${separator}${TRANSFORMATION_PARAMETER}=${transformationString}`;
      }
    }

    // Then sign the URL if needed
    if (opts.signed === true || (opts.expiresIn && opts.expiresIn > 0)) {
      const expiryTimestamp = getSignatureTimestamp(opts.expiresIn);

      const urlSignature = getSignature({
        privateKey: this._client.privateKey,
        url: finalUrl,
        urlEndpoint: opts.urlEndpoint,
        expiryTimestamp,
      });

      // Add signature parameters to the final URL
      // Use URL object to properly determine if we need ? or & separator
      const finalUrlObj = new URL(finalUrl);
      const hasExistingParams = finalUrlObj.searchParams.toString().length > 0;
      const separator = hasExistingParams ? '&' : '?';
      let signedUrl = finalUrl;

      if (expiryTimestamp && expiryTimestamp !== DEFAULT_TIMESTAMP) {
        signedUrl += `${separator}${TIMESTAMP_PARAMETER}=${expiryTimestamp}`;
        signedUrl += `&${SIGNATURE_PARAMETER}=${urlSignature}`;
      } else {
        signedUrl += `${separator}${SIGNATURE_PARAMETER}=${urlSignature}`;
      }

      return signedUrl;
    }

    return finalUrl;
  }

  /**
   * Builds a transformation string from the given transformations.
   *
   * @param transformation - The transformations to apply.
   * @returns The constructed transformation string.
   */
  buildTransformationString(transformation: Transformation[] | undefined): string {
    return buildTransformationString(transformation);
  }

  /**
   * Generates authentication parameters for client-side file uploads using ImageKit's Upload API V1.
   *
   * This method creates the required authentication signature that allows secure file uploads
   * directly from the browser or mobile applications without exposing your private API key.
   * The generated parameters include a unique token, expiration timestamp, and HMAC signature.
   *
   * @param token - Custom token for the upload session. If not provided, a UUID v4 will be generated automatically.
   * @param expire - Expiration time in seconds from now. If not provided, defaults to 1800 seconds (30 minutes).
   * @returns Authentication parameters object containing:
   *   - `token`: Unique identifier for this upload session
   *   - `expire`: Unix timestamp when these parameters expire
   *   - `signature`: HMAC-SHA1 signature for authenticating the upload
   *
   * @throws {Error} If the private API key is not configured (should not happen in normal usage)
   */
  getAuthenticationParameters(token?: string, expire?: number) {
    if (!this._client.privateKey) {
      throw new Error('Private API key is required for authentication parameters generation');
    }

    const DEFAULT_TIME_DIFF = 60 * 30;
    const defaultExpire = Math.floor(Date.now() / 1000) + DEFAULT_TIME_DIFF;

    const finalToken = token || uuid4();
    const finalExpire = expire || defaultExpire;

    return getAuthenticationParameters(finalToken, finalExpire, this._client.privateKey);
  }
}

const getAuthenticationParameters = function (token: string, expire: number, privateKey: string) {
  var authParameters = {
    token: token,
    expire: expire,
    signature: '',
  };

  var signature = createHmacSha1(privateKey, token + expire);

  authParameters.signature = signature;

  return authParameters;
};

function removeTrailingSlash(str: string): string {
  if (typeof str == 'string' && str[str.length - 1] == '/') {
    str = str.substring(0, str.length - 1);
  }
  return str;
}

function removeLeadingSlash(str: string): string {
  if (typeof str == 'string' && str[0] == '/') {
    str = str.slice(1);
  }
  return str;
}

function pathJoin(parts: string[], sep?: string): string {
  var separator = sep || '/';
  var replace = new RegExp(separator + '{1,}', 'g');
  return parts.join(separator).replace(replace, separator);
}

function processInputPath(str: string, encoding: string): string {
  // Remove leading and trailing slashes
  str = removeTrailingSlash(removeLeadingSlash(str));
  if (encoding === 'plain') {
    return `i-${str.replace(/\//g, '@@')}`;
  }
  if (encoding === 'base64') {
    return `ie-${encodeURIComponent(safeBtoa(str))}`;
  }
  if (SIMPLE_OVERLAY_PATH_REGEX.test(str)) {
    return `i-${str.replace(/\//g, '@@')}`;
  } else {
    return `ie-${encodeURIComponent(safeBtoa(str))}`;
  }
}

function processText(str: string, encoding: TextOverlay['encoding']): string {
  if (encoding === 'plain') {
    return `i-${encodeURIComponent(str)}`;
  }
  if (encoding === 'base64') {
    return `ie-${encodeURIComponent(safeBtoa(str))}`;
  }
  if (SIMPLE_OVERLAY_TEXT_REGEX.test(str)) {
    return `i-${encodeURIComponent(str)}`;
  }
  return `ie-${encodeURIComponent(safeBtoa(str))}`;
}

function processOverlay(overlay: Transformation['overlay']): string | undefined {
  const entries = [];

  const { type, position = {}, timing = {}, transformation = [] } = overlay || {};

  if (!type) {
    return;
  }

  switch (type) {
    case 'text':
      {
        const textOverlay = overlay as TextOverlay;
        if (!textOverlay.text) {
          return;
        }
        const encoding = textOverlay.encoding || 'auto';

        entries.push('l-text');
        entries.push(processText(textOverlay.text, encoding));
      }
      break;
    case 'image':
      entries.push('l-image');
      {
        const imageOverlay = overlay as ImageOverlay;
        const encoding = imageOverlay.encoding || 'auto';
        if (imageOverlay.input) {
          entries.push(processInputPath(imageOverlay.input, encoding));
        } else {
          return;
        }
      }
      break;
    case 'video':
      entries.push('l-video');
      {
        const videoOverlay = overlay as VideoOverlay;
        const encoding = videoOverlay.encoding || 'auto';
        if (videoOverlay.input) {
          entries.push(processInputPath(videoOverlay.input, encoding));
        } else {
          return;
        }
      }
      break;
    case 'subtitle':
      entries.push('l-subtitle');
      {
        const subtitleOverlay = overlay as SubtitleOverlay;
        const encoding = subtitleOverlay.encoding || 'auto';
        if (subtitleOverlay.input) {
          entries.push(processInputPath(subtitleOverlay.input, encoding));
        } else {
          return;
        }
      }
      break;
    case 'solidColor':
      entries.push('l-image');
      entries.push(`i-ik_canvas`);
      {
        const solidColorOverlay = overlay as SolidColorOverlay;
        if (solidColorOverlay.color) {
          entries.push(`bg-${solidColorOverlay.color}`);
        } else {
          return;
        }
      }
      break;
  }

  const { x, y, focus } = position;
  if (x) {
    entries.push(`lx-${x}`);
  }
  if (y) {
    entries.push(`ly-${y}`);
  }
  if (focus) {
    entries.push(`lfo-${focus}`);
  }

  const { start, end, duration } = timing;
  if (start) {
    entries.push(`lso-${start}`);
  }
  if (end) {
    entries.push(`leo-${end}`);
  }
  if (duration) {
    entries.push(`ldu-${duration}`);
  }

  const transformationString = buildTransformationString(transformation);

  if (transformationString && transformationString.trim() !== '') {
    entries.push(transformationString);
  }

  entries.push('l-end');

  return entries.join(transformationUtils.getTransformDelimiter());
}

function buildTransformationString(transformation: Transformation[] | undefined): string {
  if (!Array.isArray(transformation)) {
    return '';
  }

  var parsedTransforms: string[] = [];
  for (var i = 0, l = transformation.length; i < l; i++) {
    var parsedTransformStep: string[] = [];
    const currentTransform = transformation[i];
    if (!currentTransform) continue;

    for (var key in currentTransform) {
      let value = currentTransform[key as keyof Transformation];
      if (value === undefined || value === null) {
        continue;
      }

      if (key === 'overlay' && typeof value === 'object') {
        var rawString = processOverlay(value as Transformation['overlay']);
        if (rawString && rawString.trim() !== '') {
          parsedTransformStep.push(rawString);
        }
        continue; // Always continue as overlay is processed.
      }

      var transformKey = transformationUtils.getTransformKey(key);
      if (!transformKey) {
        transformKey = key;
      }

      if (transformKey === '') {
        continue;
      }

      if (
        [
          'e-grayscale',
          'e-contrast',
          'e-removedotbg',
          'e-bgremove',
          'e-upscale',
          'e-retouch',
          'e-genvar',
        ].includes(transformKey)
      ) {
        if (value === true || value === '-' || value === 'true') {
          parsedTransformStep.push(transformKey);
        } else {
          // Any other value means that the effect should not be applied
          continue;
        }
      } else if (
        ['e-sharpen', 'e-shadow', 'e-gradient', 'e-usm', 'e-dropshadow'].includes(transformKey) &&
        (value.toString().trim() === '' || value === true || value === 'true')
      ) {
        parsedTransformStep.push(transformKey);
      } else if (key === 'raw') {
        parsedTransformStep.push(currentTransform[key] as string);
      } else {
        if (transformKey === 'di' || transformKey === 'ff') {
          value = removeTrailingSlash(removeLeadingSlash((value as string) || ''));
          value = value.replace(/\//g, '@@');
        }
        if (transformKey === 'sr' && Array.isArray(value)) {
          value = value.join('_');
        }
        // Special case for trim with empty string - should be treated as true
        if (transformKey === 't' && value.toString().trim() === '') {
          value = 'true';
        }

        parsedTransformStep.push(
          [transformKey, value].join(transformationUtils.getTransformKeyValueDelimiter()),
        );
      }
    }
    if (parsedTransformStep.length) {
      parsedTransforms.push(parsedTransformStep.join(transformationUtils.getTransformDelimiter()));
    }
  }

  return parsedTransforms.join(transformationUtils.getChainTransformDelimiter());
}

/**
 * Calculates the expiry timestamp for URL signing
 *
 * @param seconds - Number of seconds from now when the URL should expire
 * @returns Unix timestamp for expiry, or DEFAULT_TIMESTAMP if invalid/not provided
 */
function getSignatureTimestamp(seconds: number | undefined): number {
  if (!seconds || seconds <= 0) return DEFAULT_TIMESTAMP;

  const sec = parseInt(String(seconds), 10);
  if (!sec || isNaN(sec)) return DEFAULT_TIMESTAMP;

  const currentTimestamp = Math.floor(new Date().getTime() / 1000);
  return currentTimestamp + sec;
}

/**
 * Generates an HMAC-SHA1 signature for URL signing
 *
 * @param opts - Options containing private key, URL, endpoint, and expiry timestamp
 * @returns Hex-encoded signature, or empty string if required params missing
 */
function getSignature(opts: {
  privateKey: string;
  url: string;
  urlEndpoint: string;
  expiryTimestamp: number;
}): string {
  if (!opts.privateKey || !opts.url || !opts.urlEndpoint) return '';

  // Create the string to sign: relative path + expiry timestamp
  const stringToSign =
    opts.url.replace(addTrailingSlash(opts.urlEndpoint), '') + String(opts.expiryTimestamp);

  return createHmacSha1(opts.privateKey, stringToSign);
}

function addTrailingSlash(str: string): string {
  if (typeof str === 'string' && str[str.length - 1] !== '/') {
    str = str + '/';
  }
  return str;
}
