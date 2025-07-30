// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import * as FilesAPI from './files';
import { FileUploadParams, FileUploadResponse, Files } from './files';

export class V1 extends APIResource {
  files: FilesAPI.Files = new FilesAPI.Files(this._client);
}

V1.Files = Files;

export declare namespace V1 {
  export {
    Files as Files,
    type FileUploadResponse as FileUploadResponse,
    type FileUploadParams as FileUploadParams,
  };
}
