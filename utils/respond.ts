import { IKCallback } from "../libs/interfaces/IKCallback";

export default function (isError: boolean, response: any, callback?: IKCallback<any, any>) {
  if (typeof callback == "function") {
    if (isError) {
      callback(response, null);
    } else {
      callback(null, response);
    }
  }
}
