/*
    VARIABLES
*/
import supportedTransforms from "../libs/constants/supportedTransforms";
import { UrlOptions, TransformationPosition } from "../libs/interfaces";

const DEFAULT_TRANSFORMATION_POSITION: TransformationPosition = "path";
const QUERY_TRANSFORMATION_POSITION: TransformationPosition = "query";

const CHAIN_TRANSFORM_DELIMITER: string = ":";
const TRANSFORM_DELIMITER: string = ",";
const TRANSFORM_KEY_VALUE_DELIMITER: string = "-";

const getDefault = function (): TransformationPosition {
  return DEFAULT_TRANSFORMATION_POSITION;
};

const addAsQueryParameter = function (options: UrlOptions): boolean {
  return options.transformationPosition === QUERY_TRANSFORMATION_POSITION;
};

const getTransformKey = function (transform: string): string {
  if (!transform) {
    return "";
  }

  return supportedTransforms[transform] || supportedTransforms[transform.toLowerCase()] || "";
};

const getChainTransformDelimiter = function (): string {
  return CHAIN_TRANSFORM_DELIMITER;
};

const getTransformDelimiter = function (): string {
  return TRANSFORM_DELIMITER;
};

const getTransformKeyValueDelimiter = function (): string {
  return TRANSFORM_KEY_VALUE_DELIMITER;
};

export default {
  getDefault,
  addAsQueryParameter,
  getTransformKey,
  getChainTransformDelimiter,
  getTransformDelimiter,
  getTransformKeyValueDelimiter,
};
