import _ from "lodash";
import errorMessages from "../../libs/constants/errorMessages";
import respond from "../../utils/respond";
import request from "../../utils/request";
import { IKCallback } from "../interfaces/IKCallback";
import { ImageKitOptions, UploadOptions, UploadResponse } from "../interfaces";

type Modify<T, R> = Omit<T, keyof R> & R;
type FormDataOptions = Modify<
  UploadOptions,
  {
    file: string | Buffer | object;
    useUniqueFileName: string;
    isPrivateFile: string;
    extensions?: string;
    webhookUrl?: string;
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

  let key: keyof typeof uploadOptions;
  for (key in uploadOptions) {
    if (key) {
      if (key == "file" && typeof uploadOptions.file != "string") {
        formData.file = {
          value: uploadOptions.file,
          options: {
            filename: uploadOptions.fileName,
            contentType: null,
          },
        };
      } else if (key == "tags" && Array.isArray(uploadOptions.tags)) {
        formData.tags = uploadOptions.tags.join(",");
      }
        else if(key == "extensions" && Array.isArray(uploadOptions.extensions)){
          formData.extensions = JSON.stringify(uploadOptions.extensions);
      }
       else {
        formData[key] = String(uploadOptions[key]);
      }
    }
  }

  var requestOptions = {
    url: defaultOptions.uploadEndpoint || "https://upload.imagekit.io/api/v1/files/upload",
    method: "POST",
    formData: formData,
    json: true,
  };

  request(requestOptions, defaultOptions, callback);
}
