import { TransformationPosition } from ".";
export interface ImageKitOptions {
    publicKey: string;
    privateKey: string;
    urlEndpoint: string;
    transformationPosition?: TransformationPosition;
}
