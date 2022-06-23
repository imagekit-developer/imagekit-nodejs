// import request from "request";
import respond from "../utils/respond";
import { addAuthorization, RequestOptions } from "../utils/authorization";
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
  else if(typeof requestOptions.formData === "object") options.data = requestOptions.formData;

  if (typeof requestOptions.qs === "object") options.params = requestOptions.qs;
  if (typeof requestOptions.headers === "object") options.headers = requestOptions.headers;

  axios(options).then((response: any) => {
    if (typeof callback != "function") return;
    const { data, status, headers } = response;
    if (status >= 200 && status <= 299) {
      respond(false, data, callback);
    } else {
      respond(true, data, callback);
    }
  }, (error: any) => {
    if (typeof callback != "function") return;
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      if(error.response?.status === 429) {
        respond(true, {
          ...error.response.data,
          "X-RateLimit-Limit": parseInt(error.response.headers["x-ratelimit-limit"], 10),
          "X-RateLimit-Reset": parseInt(error.response.headers["x-ratelimit-reset"], 10),
          "X-RateLimit-Interval": parseInt(error.response.headers["x-ratelimit-interval"], 10),
        }, callback);
      } else {
        respond(true, error.response.data, callback);
      }
      
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      respond(true, error.request, callback);
    } else {
      // Something happened in setting up the request that triggered an Error
      respond(true, error.message, callback);
    }
  })

  // var req = https.request({
  //   ...urlToHttpOptions(new URL(requestOptions.url)),
  //   method: requestOptions.method,
  //   headers: {
  //     Authorization: 'Basic ' + Buffer.from(defaultOptions.privateKey + ':').toString('base64')
  //   }
  // }, (response: IncomingMessage) => {
  //   const { statusCode = 0, headers: resHeaders } = response;
  //   response.setEncoding('utf8');
  //   var rawBody = '';
  //   var JSONBody;
  //   response.on("data", (chunk) => {
  //     rawBody += chunk;
  //   });
  //   response.on("end", () => {
  //     try {
  //       var result = {
  //         responseMetadata: {
  //           statusCode,
  //           rawBody,
  //           headers: resHeaders
  //         }
  //       };
  //       JSONBody = JSON.parse(rawBody);
  //       if (statusCode >= 200 && statusCode <= 299) {
  //         respond(false, JSONBody, callback);
  //         return;
  //       } else {
  //         respond(true, JSONBody, callback);
  //       }
  //     } catch (e) {
  //       respond(true, {
  //         reason: "JSON_PARSE_ERROR"
  //       }, callback);
  //       return;
  //     }
  //   })
  // });

  // var requestPayload = null;
  // if (requestOptions.formData) requestPayload = requestOptions.formData;
  // else if (requestOptions.json) requestPayload = requestOptions.json;

  // if (requestPayload) req.write(requestPayload);
  // req.end();

  // return;
  // addAuthorization(requestOptions, defaultOptions.privateKey);
  // request(requestOptions, function (err, response, body) {
  //   if (typeof callback != "function") return;

  //   if (err) {
  //     respond(true, err, callback);
  //     return;
  //   }

  //   if (response && response.statusCode === 429) {
  //     respond(
  //       true,
  //       {
  //         ...body,
  //         "X-RateLimit-Limit": parseInt(response.caseless.get("X-RateLimit-Limit"), 10),
  //         "X-RateLimit-Reset": parseInt(response.caseless.get("X-RateLimit-Reset"), 10),
  //         "X-RateLimit-Interval": parseInt(response.caseless.get("X-RateLimit-Interval")),
  //       },
  //       callback,
  //     );
  //     return;
  //   }

  //   if (response && response.statusCode >= 400) {
  //     respond(true, body, callback);
  //     return;
  //   }

  //   respond(false, body, callback);
  // });
}
