import { TransformationPosition } from ".";

export interface ImageKitOptions {
  uploadEndpoint?: string,
  publicKey: string;
  privateKey: string;
  urlEndpoint: string;
  transformationPosition?: TransformationPosition;
}
