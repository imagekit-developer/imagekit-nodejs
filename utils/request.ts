import respond from "./respond";
import { RequestOptions } from "./authorization";
import { ImageKitOptions } from "../libs/interfaces";
import { IKCallback } from "../libs/interfaces/IKCallback";
import axios, { AxiosError, AxiosHeaders, AxiosRequestConfig, AxiosResponse } from "axios";

// constant
const UnknownError: string =  "Unknown error occured";

export default function request<T, E extends Error>(
  requestOptions: RequestOptions,
  defaultOptions: ImageKitOptions,
  callback?: IKCallback<T, E>,
) {

  var options: AxiosRequestConfig = {
    method: requestOptions.method,
    url: requestOptions.url,
    auth: {
      username: defaultOptions.privateKey || "",
      password: "",
    },
    maxBodyLength: Infinity,
  };

  if (typeof requestOptions.json === "object") options.data = requestOptions.json;
  else if (typeof requestOptions.formData === "object") options.data = requestOptions.formData;

  if (typeof requestOptions.qs === "object") options.params = requestOptions.qs;
  if (typeof requestOptions.headers === "object") options.headers = requestOptions.headers;

  axios(options).then((response: AxiosResponse<T>) => {
    if (typeof callback !== "function") return;
    const { data, status, headers } = response;
    const responseMetadata = {
      statusCode: status,
      headers: (headers as AxiosHeaders).toJSON()
    }
    let result = data ? data : {} as T;
    // define status code and headers as non-enumerable properties on data
    Object.defineProperty(result, "$ResponseMetadata", {
      value: responseMetadata,
      enumerable: false,
      writable: false
    });
    respond(false, result, callback);
  }, (error: AxiosError) => {
    if (typeof callback !== "function") return;
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      const responseMetadata = {
        statusCode: error.response.status,
        headers: (error.response.headers as AxiosHeaders).toJSON()
      }

      let result = {} as Object;
      if (error.response.data && typeof error.response.data === "object") {
        result = error.response.data
      } else if (error.response.data && typeof error.response.data === "string") {
        result = {
          help: error.response.data
        }
      }

      if (error.response.status === 429) {
        result = {
          ...result,
          "X-RateLimit-Limit": parseInt(error.response.headers["x-ratelimit-limit"], 10),
          "X-RateLimit-Reset": parseInt(error.response.headers["x-ratelimit-reset"], 10),
          "X-RateLimit-Interval": parseInt(error.response.headers["x-ratelimit-interval"], 10),
        }
      }
      // define status code and headers as non-enumerable properties on data
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
      respond(true, new Error(UnknownError), callback);
    }
  })
}
