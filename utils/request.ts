import respond from "../utils/respond";
import { RequestOptions } from "../utils/authorization";
import { ImageKitOptions } from "../libs/interfaces/";
import { IKCallback } from "../libs/interfaces/IKCallback";
const axios = require('axios');

export default function (
  requestOptions: RequestOptions,
  defaultOptions: ImageKitOptions,
  callback?: IKCallback<any, any>,
) {

  var options: any = {
    method: requestOptions.method,
    url: requestOptions.url,
    auth: {
      username: defaultOptions.privateKey || "",
      password: ""
    }
  }

  if (typeof requestOptions.json === "object") options.data = requestOptions.json;
  else if (typeof requestOptions.formData === "object") options.data = requestOptions.formData;

  if (typeof requestOptions.qs === "object") options.params = requestOptions.qs;
  if (typeof requestOptions.headers === "object") options.headers = requestOptions.headers;

  axios(options).then((response: any) => {
    if (typeof callback != "function") return;
    const { data, status, headers } = response;
    const responseMetadata = {
      statusCode: status,
      headers
    }
    if (status >= 200 && status <= 299) {
      // define status code and headers as non-enumerable properties on data
      var result = data ? data : {};
      Object.defineProperty(result, "$ResponseMetadata", {
        value: responseMetadata,
        enumerable: false,
        writable: false
      });
      respond(false, result, callback);
    } else {
      respond(true, data, callback);
    }
  }, (error: any) => {
    if (typeof callback != "function") return;
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      const responseMetadata = {
        statusCode: error.response.status,
        headers: error.response.headers
      }
      // define status code and headers as non-enumerable properties on data
      var result = error.response.data ? error.response.data : {};
      if (error.response.status === 429) {
        result = {
          ...result,
          "X-RateLimit-Limit": parseInt(error.response.headers["x-ratelimit-limit"], 10),
          "X-RateLimit-Reset": parseInt(error.response.headers["x-ratelimit-reset"], 10),
          "X-RateLimit-Interval": parseInt(error.response.headers["x-ratelimit-interval"], 10),
        }
      }
      Object.defineProperty(result, "$ResponseMetadata", {
        value: responseMetadata,
        enumerable: false,
        writable: false
      });
      respond(true, result, callback);

    } else if (error) {
      respond(true, error, callback);
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
    } else {
      respond(true, {
        message: "Unknown error occured"
      }, callback);
    }
  })
}
