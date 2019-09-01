module.exports.addAuthorization = function(obj, privateKey) {
    obj.auth = {
        user : privateKey || "",
        pass : ""
    };
};