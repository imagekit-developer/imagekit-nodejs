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
    
    if(!validOptions(opts)) {
        return "";
    }

    return builder.buildURL(opts);
};

function validOptions(opts) {
    if(!opts.urlEndpoint) return false;

    if(!transformationUtils.validParameters(opts)) return false;

    return true;
}
