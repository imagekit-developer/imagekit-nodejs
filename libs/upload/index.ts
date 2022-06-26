import _ from "lodash";
import errorMessages from "../../libs/constants/errorMessages";
import respond from "../../utils/respond";
import request from "../../utils/request";
import { IKCallback } from "../interfaces/IKCallback";
import { ImageKitOptions, UploadOptions, UploadResponse } from "../interfaces";
const FormData = require('form-data');

type Modify<T, R> = Omit<T, keyof R> & R;
type FormDataOptions = Modify<
  UploadOptions,
  {
    file: string | Buffer | object;
    useUniqueFileName: string;
    isPrivateFile: string;
    extensions?: string;
    webhookUrl?: string;
    overwriteFile?: string;
    overwriteAITags?: string;
    overwriteTags?: string;
    overwriteCustomMetadata?: string;
    customMetadata?: string;
  }
>;

export default function (
  uploadOptions: UploadOptions,
  defaultOptions: ImageKitOptions,
  callback?: IKCallback<UploadResponse>,
): void | Promise<UploadResponse> {
  if (!_.isObject(uploadOptions)) {
    respond(true, errorMessages.MISSING_UPLOAD_DATA, callback);
    return;
  }

  if (!uploadOptions.file) {
    respond(true, errorMessages.MISSING_UPLOAD_FILE_PARAMETER, callback);
    return;
  }

  if (!uploadOptions.fileName) {
    respond(true, errorMessages.MISSING_UPLOAD_FILENAME_PARAMETER, callback);
    return;
  }

  var formData = {} as FormDataOptions;

  const form = new FormData();

  let key: keyof typeof uploadOptions;
  for (key in uploadOptions) {
    if (key) {
      if (key == "file" && typeof uploadOptions.file != "string") {
        // form.append('file', uploadOptions.file);
        form.append('file', uploadOptions.file, String(uploadOptions.fileName));
      } else if (key == "tags" && Array.isArray(uploadOptions.tags)) {
        form.append('tags', uploadOptions.tags.join(","));
      } else if (key == "responseFields" && Array.isArray(uploadOptions.responseFields)) {
        form.append('responseFields', uploadOptions.responseFields.join(","));
      } else if (key == "extensions" && Array.isArray(uploadOptions.extensions)) {
        form.append('extensions', JSON.stringify(uploadOptions.extensions));
      } else if (key === "customMetadata" && typeof uploadOptions.customMetadata === "object" &&
        !Array.isArray(uploadOptions.customMetadata) && uploadOptions.customMetadata !== null) {
        form.append('customMetadata', JSON.stringify(uploadOptions.customMetadata));
      }
      else {
        form.append(key, String(uploadOptions[key]));
      }
    }
  }

  var requestOptions = {
    url: defaultOptions.uploadEndpoint || "https://upload.imagekit.io/api/v1/files/upload",
    method: "POST",
    formData: form
  };

  request(requestOptions, defaultOptions, callback);
}
