import { IKCallback } from "../libs/interfaces/IKCallback";

export default function respond<D, E extends Error>(isError: boolean, response: any, callback?: IKCallback<D, E>) {
  if (typeof callback === "function") {
    if (isError) {
      callback(response, null);
    } else {
      callback(null, response);
    }
  }
}
