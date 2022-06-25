import { ImageKitOptions } from "./ImageKitOptions";
import { Transformation, TransformationPosition } from "./Transformation";
import { UploadOptions } from "./UploadOptions";
import { UploadResponse } from "./UploadResponse";
import { FileType } from "./FileType";
import { UrlOptions } from "./UrlOptions";
import { ListFileOptions, ListFileResponse } from "./ListFile";
import { CopyFileOptions } from "./CopyFile";
import { MoveFileOptions } from "./MoveFile";
import { CreateFolderOptions } from "./CreateFolder";
import { FileDetailsOptions, FileVersionDetailsOptions, FileDetailsResponse } from "./FileDetails";
import { FileMetadataResponse } from "./FileMetadata";
import { PurgeCacheResponse, PurgeCacheStatusResponse } from "./PurgeCache";
import { BulkDeleteFilesResponse, BulkDeleteFilesError } from "./BulkDeleteFiles";
import { CopyFolderOptions, CopyFolderResponse, CopyFolderError } from "./CopyFolder";
import { MoveFolderOptions, MoveFolderResponse, MoveFolderError } from "./MoveFolder";
import { DeleteFileVersionOptions, RestoreFileVersionOptions } from "./FileVersion"
import { CreateCustomMetadataFieldOptions, CustomMetadataField, UpdateCustomMetadataFieldOptions } from "./CustomMetatadaField"

type FinalUrlOptions = ImageKitOptions & UrlOptions; // actual options used to construct url

export {
  ImageKitOptions,
  Transformation,
  TransformationPosition,
  UploadOptions,
  UploadResponse,
  FileType,
  UrlOptions,
  FinalUrlOptions,
  ListFileOptions,
  ListFileResponse,
  FileDetailsOptions,
  FileVersionDetailsOptions,
  FileDetailsResponse,
  FileMetadataResponse,
  PurgeCacheResponse,
  PurgeCacheStatusResponse,
  BulkDeleteFilesResponse,
  BulkDeleteFilesError,
  CopyFolderResponse,
  CopyFolderError,
  MoveFolderResponse,
  MoveFolderError,
  CopyFileOptions,
  MoveFileOptions,
  CreateFolderOptions,
  CopyFolderOptions,
  MoveFolderOptions,
  DeleteFileVersionOptions,
  RestoreFileVersionOptions,
  CreateCustomMetadataFieldOptions,
  CustomMetadataField,
  UpdateCustomMetadataFieldOptions,
};
export { IKCallback } from "./IKCallback";
