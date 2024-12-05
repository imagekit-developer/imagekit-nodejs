/**
 * Adds a leading slash to the given string if it does not already start with one.
 *
 * @param {string} str - The input string to be processed.
 * @returns {string} - The modified string with a leading slash if it was missing.
 */
const addLeadingSlash = function (str: string) {
  // Check if the input is a string and does not start with a slash
  if (typeof str === "string" && str[0] !== "/") {
    // Prepend a slash to the string
    str = "/" + str;
  }

  // Return the processed string
  return str;
};


/**
 * Removes the leading slash from the given string if it starts with one.
 *
 * @param {string} str - The input string to be processed.
 * @returns {string} - The modified string with the leading slash removed if it was present.
 */
const removeLeadingSlash = function (str: string) {
  // Check if the input is a string and starts with a slash
  if (typeof str === "string" && str[0] === "/") {
    // Remove the leading slash from the string
    str = str.substring(1);
  }

  // Return the processed string
  return str;
};


/**
 * Removes the trailing slash from the given string if it ends with one.
 *
 * @param {string} str - The input string to be processed.
 * @returns {string} - The modified string with the trailing slash removed if it was present.
 */
const removeTrailingSlash = function (str: string) {
  // Check if the input is a string and ends with a slash
  if (typeof str === "string" && str[str.length - 1] === "/") {
    // Remove the trailing slash from the string
    str = str.substring(0, str.length - 1);
  }

  // Return the processed string
  return str;
};


/**
 * Adds a trailing slash to the given string if it does not already end with one.
 *
 * @param {string} str - The input string to be processed.
 * @returns {string} - The modified string with a trailing slash if it was missing.
 */
const addTrailingSlash = function (str: string) {
  // Check if the input is a string and does not end with a slash
  if (typeof str === "string" && str[str.length - 1] !== "/") {
    // Append a trailing slash to the string
    str = str + "/";
  }

  // Return the processed string
  return str;
};


export default { addLeadingSlash, removeLeadingSlash, removeTrailingSlash, addTrailingSlash };
