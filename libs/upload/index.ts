import _ from "lodash";
import errorMessages from "../../libs/constants/errorMessages";
import respond from "../../utils/respond";
import request from "../../utils/request";
import { IKCallback } from "../interfaces/IKCallback";
import { ImageKitOptions, UploadOptions, UploadResponse } from "../interfaces";
import FormData from "form-data";

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

  if (uploadOptions.transformation) {
    if (!(Object.keys(uploadOptions.transformation).includes("pre") || Object.keys(uploadOptions.transformation).includes("post"))) {
      respond(true, errorMessages.INVALID_TRANSFORMATION, callback);
      return;
    }
    if (Object.keys(uploadOptions.transformation).includes("pre") && !uploadOptions.transformation.pre) {
      respond(true, errorMessages.INVALID_PRE_TRANSFORMATION, callback);
      return;
    }
    if (Object.keys(uploadOptions.transformation).includes("post")) {
      if (Array.isArray(uploadOptions.transformation.post)) {
        for (let transformation of uploadOptions.transformation.post) {
          if (transformation.type === "abs" && !(transformation.protocol || transformation.value)) {
            respond(true, errorMessages.INVALID_POST_TRANSFORMATION, callback);
            return;
          } else if (transformation.type === "transformation" && !transformation.value) {
            respond(true, errorMessages.INVALID_POST_TRANSFORMATION, callback);
            return;
          }
        }
      } else {
        respond(true, errorMessages.INVALID_POST_TRANSFORMATION, callback);
        return;
      }
    }
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
      } else if (key === "transformation" && typeof uploadOptions.transformation === "object" &&
        uploadOptions.transformation !== null) {
        form.append(key, JSON.stringify(uploadOptions.transformation));
      } else {
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
