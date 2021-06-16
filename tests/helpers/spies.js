// packages
import sinon from 'sinon';
// internal modules
import pHashUtils from "../../utils/phash";

// spies
const pHashDistanceSpy = sinon.spy(pHashUtils, 'pHashDistance');

module.exports = {
  pHashDistanceSpy,
};
