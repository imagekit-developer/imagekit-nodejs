/*
    Helper Modules
*/
var _ = require('lodash');

/*
    URL builder
*/
var builder = require('./builder');

/*
    Utils
*/
var transformationUtils = require('../../utils/transformation');

module.exports = function(urlOpts, defaultOptions) {
    var opts = _.extend({}, defaultOptions, urlOpts);

    return builder.buildURL(opts);
};
