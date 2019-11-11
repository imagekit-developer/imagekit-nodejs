// packages
const sinon = require('sinon');
// internal modules
const pHashUtils = require('./../../utils/phash');

// spies
const pHashDistanceSpy = sinon.spy(pHashUtils, 'pHashDistance');

module.exports = {
  pHashDistanceSpy,
};
