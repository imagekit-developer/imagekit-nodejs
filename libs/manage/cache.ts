/*
    Constants
*/
import errorMessages from "../constants/errorMessages";

/*
    Utils
*/
import respond from "../../utils/respond";
import request from "../../utils/request";

/*
    Interfaces
*/
import { IKCallback } from "../interfaces/IKCallback";
import { ImageKitOptions, PurgeCacheResponse, PurgeCacheStatusResponse } from "../interfaces/";

const purgeCache = function (url: string, defaultOptions: ImageKitOptions, callback?: IKCallback<PurgeCacheResponse>) {
  if (!url && !url.length) {
    respond(true, errorMessages.CACHE_PURGE_URL_MISSING, callback);
    return;
  }

  var requestOptions = {
    url: "https://api.imagekit.io/v1/files/purge",
    method: "POST",
    json: {
      url: url,
    },
  };

  request(requestOptions, defaultOptions, callback);
};

const getPurgeCacheStatus = function (
  requestId: string,
  defaultOptions: ImageKitOptions,
  callback?: IKCallback<PurgeCacheStatusResponse>,
) {
  if (!requestId && !requestId.length) {
    respond(true, errorMessages.CACHE_PURGE_STATUS_ID_MISSING, callback);
    return;
  }

  var requestOptions = {
    url: "https://api.imagekit.io/v1/files/purge/" + requestId,
    method: "GET",
    json: true,
  };

  request(requestOptions, defaultOptions, callback);
};

export default { purgeCache, getPurgeCacheStatus };
