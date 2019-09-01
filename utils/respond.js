module.exports = function(isError, response, callback) {
    if(typeof callback == "function") { 
        if(isError) {
            callback(response, null);
        } else {
            callback(null, response);
        }
    }    
};