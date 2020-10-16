module.exports.addLeadingSlash = function(str) {
    if(typeof str == "string" && str[0] != "/") {
        str = "/" + str;
    }

    return str;
}

module.exports.removeLeadingSlash = function(str) {
    if(typeof str == "string" && str[0] == "/") {
        str = str.substring(1);
    }

    return str;
};

module.exports.removeTrailingSlash = function(str) {
    if(typeof str == "string" && str[str.length - 1] == "/") {
        str = str.substring(0, str.length - 1);
    }

    return str;
}

module.exports.addTrailingSlash = function(str) {
    if(typeof str == "string" && str[str.length - 1] != "/") {
        str = str + "/";
    }

    return str;
}