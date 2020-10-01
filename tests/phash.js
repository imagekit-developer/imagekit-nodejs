const chai = require('chai');
const initializationParams = require("./data").initializationParams
const ImageKit = require(".."); // This will automatically pick main module (cjs bundle) as per package.json
var imagekit = new ImageKit(initializationParams);

// helpers
const errors = require('./helpers/errors');
const spies = require('./helpers/spies');

const { expect } = chai;
const { pHashDistanceSpy } = spies;

const failureHelper = (expectedError, ...params) => {
  const { message, help } = expectedError;
  const { message: error } = imagekit.pHashDistance(...params);

  expect(error).to.be.equal(`${message}: ${help}`);
};

const successHelper = (distance, ...params) => {
  const result = imagekit.pHashDistance(...params);

  expect(result).to.be.a('number');
  expect(result).to.equal(distance);
  expect(pHashDistanceSpy.calledOnceWithExactly(...params)).to.equal(true);
};

const pHash = {
  invalidAlphabeticalString: 'INVALIDHEXSTRING',
  invalidCharacterString: 'a4a655~!!@94518b',
  invalidHexStringLength: '42',
  numeric: 2222222222222222,
  valid: 'f06830ca9f1e3e90',
  // sets
  dissimilar: [
    'a4a65595ac94518b',
    '7838873e791f8400',
  ],
  similar: [
    '2d5ad3936d2e015b',
    '2d6ed293db36a4fb',
  ],
};

describe('Utils > pHash > Distance calculator', () => {
  beforeEach(() => {
    pHashDistanceSpy.resetHistory();
  });

  after(() => {
    pHashDistanceSpy.resetHistory();
  });

  context('Failure cases:', () => {
    it('Should return error for missing first pHash', () => {
      failureHelper(errors.MISSING_PHASH_VALUE, null, pHash.valid);
    });

    it('Should return error for missing second pHash', () => {
      failureHelper(errors.MISSING_PHASH_VALUE, pHash.valid);
    });

    it('Should return error for invalid first pHash', () => {
      failureHelper(errors.INVALID_PHASH_VALUE, pHash.invalidAlphabeticalString, pHash.valid);
    });

    it('Should return error for invalid second pHash', () => {
      failureHelper(errors.INVALID_PHASH_VALUE, pHash.valid, pHash.invalidCharacterString);
    });

    it('Should return error for unequal pHash lengths', () => {
      failureHelper(errors.UNEQUAL_STRING_LENGTH, pHash.valid, pHash.invalidHexStringLength);
    });
  });

  context('Success cases:', () => {
    it('Should return zero distance between pHash for same image', () => {
      successHelper(0, pHash.valid, pHash.valid);
    });

    it('Should return smaller distance between pHash for similar images', () => {
      successHelper(17, pHash.similar[0], pHash.similar[1]);
    });

    it('Should return larger distance between pHash for dissimilar images', () => {
      successHelper(37, pHash.dissimilar[0], pHash.dissimilar[1]);
    });

    it('Should return distance for non-string but valid hexanumeric pHash', () => {
      successHelper(30, pHash.valid, pHash.numeric);
    });
  });
});