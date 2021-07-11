/*
    Helper Modules
*/
import { v4 as uuid } from "uuid";
import crypto from "crypto";
import { ImageKitOptions } from "../interfaces";
var DEFAULT_TIME_DIFF = 60 * 30;

const getAuthenticationParameters = function (token?: string, expire?: number, defaultOptions?: ImageKitOptions) {
  var defaultExpire = parseInt(String(new Date().getTime() / 1000), 10) + DEFAULT_TIME_DIFF;
  var authParameters = {
    token: token || "",
    expire: expire || 0,
    signature: "",
  };

  if (!defaultOptions || !defaultOptions.privateKey) return authParameters;

  token = token || uuid();
  expire = expire || defaultExpire;
  var signature = crypto
    .createHmac("sha1", defaultOptions.privateKey)
    .update(token + expire)
    .digest("hex");

  authParameters.token = token;
  authParameters.expire = expire;
  authParameters.signature = signature;

  return authParameters;
};

export default { getAuthenticationParameters };
