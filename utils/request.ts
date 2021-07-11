import request from "request";
import respond from "../utils/respond";
import { addAuthorization, RequestOptions } from "../utils/authorization";
import { ImageKitOptions } from "../libs/interfaces/";
import { IKCallback } from "../libs/interfaces/IKCallback";

export default function (
  requestOptions: RequestOptions,
  defaultOptions: ImageKitOptions,
  callback?: IKCallback<any, any>,
) {
  addAuthorization(requestOptions, defaultOptions.privateKey);
  request(requestOptions, function (err, response, body) {
    if (typeof callback != "function") return;

    if (err) {
      respond(true, err, callback);
      return;
    }

    if (response && response.statusCode === 429) {
      respond(
        true,
        {
          ...body,
          "X-RateLimit-Limit": parseInt(response.caseless.get("X-RateLimit-Limit"), 10),
          "X-RateLimit-Reset": parseInt(response.caseless.get("X-RateLimit-Reset"), 10),
          "X-RateLimit-Interval": parseInt(response.caseless.get("X-RateLimit-Interval")),
        },
        callback,
      );
      return;
    }

    if (response && response.statusCode >= 400) {
      respond(true, body, callback);
      return;
    }

    respond(false, body, callback);
  });
}
