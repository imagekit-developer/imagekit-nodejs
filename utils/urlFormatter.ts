const addLeadingSlash = function (str: string) {
  if (typeof str == "string" && str[0] != "/") {
    str = "/" + str;
  }

  return str;
};

const removeLeadingSlash = function (str: string) {
  if (typeof str == "string" && str[0] == "/") {
    str = str.substring(1);
  }

  return str;
};

const removeTrailingSlash = function (str: string) {
  if (typeof str == "string" && str[str.length - 1] == "/") {
    str = str.substring(0, str.length - 1);
  }

  return str;
};

const addTrailingSlash = function (str: string) {
  if (typeof str == "string" && str[str.length - 1] != "/") {
    str = str + "/";
  }

  return str;
};

export default { addLeadingSlash, removeLeadingSlash, removeTrailingSlash, addTrailingSlash };
