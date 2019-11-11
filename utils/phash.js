// import packages
const compare = require('hamming-distance');
// import constants
const errors = require('./../constants/errorMessages');

// regexp validator
const hexRegExp = new RegExp(/^[0-9a-fA-F]+$/, 'i');

const errorHandler = (error) => new Error(`${error.message}: ${error.help}`);

const pHashDistance = (firstHash, secondHash) => {
  if (!firstHash || !secondHash) {
    return errorHandler(errors.MISSING_PHASH_VALUE);
  }
  if (!hexRegExp.test(firstHash) || !hexRegExp.test(secondHash)) {
    return errorHandler(errors.INVALID_PHASH_VALUE);
  }

  const firstHashString = firstHash.toString();
  const secondHashString = secondHash.toString();

  if (firstHashString.length !== secondHashString.length) {
    return errorHandler(errors.UNEQUAL_STRING_LENGTH);
  }

  const distance = compare(firstHashString, secondHashString);
  return distance;
};

module.exports = {
  pHashDistance,
};
