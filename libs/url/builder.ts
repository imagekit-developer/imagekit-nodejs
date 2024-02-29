/*
    Helper Modules
*/
import url, { UrlWithStringQuery, URLSearchParams } from "url";
import path from "path";
import crypto from "crypto";

/*
    Utils
*/
import transformationUtils from "../../utils/transformation";
import urlFormatter from "../../utils/urlFormatter";

/*
  Interfaces
*/
import { FinalUrlOptions, Transformation } from "../interfaces";

/*
    Variables
*/
const TRANSFORMATION_PARAMETER: string = "tr";
const SIGNATURE_PARAMETER: string = "ik-s";
const TIMESTAMP_PARAMETER: string = "ik-t";
const DEFAULT_TIMESTAMP: string = "9999999999";

//used to check if special char is present in string (you'll need to encode it to utf-8 if it does)
const hasMoreThanAscii = (str: string) => {
	return str.split('').some((char) => char.charCodeAt(0) > 127);
}

const customEncodeURIComponent = (str: string) => {
  const parts = str.includes("?") ? str.split("?")[0] : str;
  const segments = parts.split("/");
  const encodedSegments = segments.map((segment) => {
    if (segment === "/") return "/";
    if(segment.includes('https:') || segment.includes('http:') || segment.includes('tr:'))
    return segment;
    return encodeURIComponent(segment);
  });
  return str.includes("?") ? `${encodedSegments.join("/")}?${str.split("?")[1]}` : encodedSegments.join("/");
  // return str.includes("?") ? `${encodeURI(parts)}?${str.split("?")[1]}` : encodeURI(parts);
};

const encodeStringIfRequired = (str: string) => {
  console.log({str})
	return hasMoreThanAscii(str) ? customEncodeURIComponent(str) : str;
}

const buildURL = function (opts: FinalUrlOptions): string {
  //Create correct query parameters
  var parsedURL: UrlWithStringQuery;
  var parsedHost: UrlWithStringQuery;
  var isSrcParameterUsedForURL: boolean = false;

  var urlObject: { [key: string]: string | null } = { host: "", pathname: "", search: "" };

  if (opts.path) {
    parsedURL = url.parse(opts.path);
    parsedHost = url.parse(opts.urlEndpoint);

    urlObject.protocol = parsedHost.protocol;
    urlObject.host = opts.urlEndpoint.replace(urlObject.protocol + "//", "");
  } else if (opts.src) {
    parsedURL = url.parse(opts.src);
    isSrcParameterUsedForURL = true;

    urlObject.host = [parsedURL.auth, parsedURL.auth ? "@" : "", parsedURL.host].join("");
    urlObject.protocol = parsedURL.protocol;
  } else {
    return "";
  }

  urlObject.pathname = parsedURL.pathname ? parsedURL.pathname : "";

  var queryParameters = new URLSearchParams(parsedURL.query || "");
  for (var i in opts.queryParameters) {
    queryParameters.set(i, opts.queryParameters[i]);
  }

  //Create Transformation String
  var transformationString = constructTransformationString(opts.transformation);
  if (transformationString) {
    //force that if src parameter is being used for URL construction then the transformation
    //string should be added only as a query parameter
    if (transformationUtils.addAsQueryParameter(opts) || isSrcParameterUsedForURL) {
      queryParameters.set(TRANSFORMATION_PARAMETER, transformationString);
    } else {
      urlObject.pathname = path.posix.join(
        [TRANSFORMATION_PARAMETER, transformationString].join(transformationUtils.getChainTransformDelimiter()),
        urlObject.pathname,
      );
    }
  }

  urlObject.host = urlFormatter.removeTrailingSlash(urlObject.host);
  urlObject.pathname = urlFormatter.addLeadingSlash(urlObject.pathname);
  urlObject.search = queryParameters.toString();

  /* 
        Signature String and Timestamp
        If the url is constructed using src parameter instead of path then we still replace the urlEndpoint we have
        But the user is responsible for passing correct urlEndpoint value

        Signature generation logic, let's assume:
        urlEndpoint value = https://ik.imagekit.io/your_imagekit_id
        expiryTimestamp 9999999999 
        1. Let the final URL construct e.g. https://ik.imagekit.io/your_imagekit_id/tr:w-400:rotate-91/sample/testing-file.jpg?param1=123
        2. Now remove urlEndpoint from it i.e tr:w-400:rotate-91/sample/testing-file.jpg?param1=123
        3. Append expiryTimestamp to above string and calcualte signature of this string i.e "tr:w-400:rotate-91/sample/testing-file.jpg?param1=1239999999999"
    */
  var expiryTimestamp;
  if (opts.signed === true) {
    if (opts.expireSeconds) {
      expiryTimestamp = getSignatureTimestamp(opts.expireSeconds);
    } else {
      expiryTimestamp = DEFAULT_TIMESTAMP;
    }

    var intermediateURL = url.format(urlObject);

    var urlSignature = getSignature({
      privateKey: opts.privateKey,
      url: encodeStringIfRequired(intermediateURL),
      urlEndpoint: opts.urlEndpoint,
      expiryTimestamp: expiryTimestamp,
    });

    if (expiryTimestamp && expiryTimestamp != DEFAULT_TIMESTAMP) {
      queryParameters.set(TIMESTAMP_PARAMETER, expiryTimestamp);
    }
    queryParameters.set(SIGNATURE_PARAMETER, urlSignature);
    urlObject.search = queryParameters.toString();
  }

  return url.format(urlObject);
};

function constructTransformationString(inputTransformation: Array<Transformation> | undefined) {

  const transformation = inputTransformation as Array<{ [key: string]: string | boolean | number }> | undefined;
  if (!Array.isArray(transformation)) {
    return "";
  }

  var parsedTransforms = [];
  for (var i = 0, l = transformation.length; i < l; i++) {
    var parsedTransformStep = [];
    for (var key in transformation[i]) {
      if(transformation[i][key] === undefined || transformation[i][key] === null )
      continue;
      let transformKey = transformationUtils.getTransformKey(key);
      if (!transformKey) {
        transformKey = key;
      }

      if (transformation[i][key] === "-") {
        parsedTransformStep.push(transformKey);
      } else if (key === "raw") {
        parsedTransformStep.push(transformation[i][key]);
      } else {
        var value = String(transformation[i][key]);
        if (transformKey === "di") {
          value = urlFormatter.removeTrailingSlash(urlFormatter.removeLeadingSlash(value));
          if (value) value = value.replace(/\//g, "@@");
        }
        parsedTransformStep.push([transformKey, value].join(transformationUtils.getTransformKeyValueDelimiter()));
      }
    }
    parsedTransforms.push(parsedTransformStep.join(transformationUtils.getTransformDelimiter()));
  }

  return parsedTransforms.join(transformationUtils.getChainTransformDelimiter());
}

function getSignatureTimestamp(seconds: number): string {
  if (!seconds) return DEFAULT_TIMESTAMP;

  var sec = parseInt(String(seconds), 10);
  if (!sec) return DEFAULT_TIMESTAMP;

  var currentTimestamp = parseInt(String(new Date().getTime() / 1000), 10);
  return String(currentTimestamp + sec);
}

function getSignature(opts: any) {
  console.log({opts})
  if (!opts.privateKey || !opts.url || !opts.urlEndpoint) return "";
  var stringToSign = opts.url.replace(urlFormatter.addTrailingSlash(opts.urlEndpoint), "") + opts.expiryTimestamp;
  return crypto.createHmac("sha1", opts.privateKey).update(stringToSign).digest("hex");
}

export default {
  buildURL,
  getSignature,
};
