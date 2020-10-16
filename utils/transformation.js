/*
    VARIABLES
*/
const DEFAULT_TRANSFORMATION_POSITION = "path";
const QUERY_TRANSFORMATION_POSITION = "query";
const VALID_TRANSFORMATION_POSITIONS = [DEFAULT_TRANSFORMATION_POSITION, QUERY_TRANSFORMATION_POSITION];

const supportedTransforms = require("../constants/supportedTransforms");
const CHAIN_TRANSFORM_DELIMITER = ":";
const TRANSFORM_DELIMITER = ",";
const TRANSFORM_KEY_VALUE_DELIMITER = "-";

module.exports.getDefault = function() {
    return DEFAULT_TRANSFORMATION_POSITION;
}

module.exports.addAsQueryParameter = function(options) {
    return options.transformationPosition === QUERY_TRANSFORMATION_POSITION;
}

module.exports.getTransformKey = function(transform) {
    if(!transform) { return ""; }

    return supportedTransforms[transform] || supportedTransforms[transform.toLowerCase()] || "";
}

module.exports.getChainTransformDelimiter = function() {
    return CHAIN_TRANSFORM_DELIMITER;
}

module.exports.getTransformDelimiter = function() {
    return TRANSFORM_DELIMITER;
}

module.exports.getTransformKeyValueDelimiter = function() {
    return TRANSFORM_KEY_VALUE_DELIMITER;
}