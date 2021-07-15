// import packages
import compare from "hamming-distance";
// import constants
import errors from "../libs/constants/errorMessages";

// regexp validator
const hexRegExp = new RegExp(/^[0-9a-fA-F]+$/, "i");

const errorHandler = (error: { message: string; help: string }): Error => new Error(`${error.message}: ${error.help}`);

const pHashDistance = (firstHash: string, secondHash: string): number | Error => {
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

export default { pHashDistance };
