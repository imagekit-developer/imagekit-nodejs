import { SupportedTransformsType } from "../constants/supportedTransforms";

export type TransformationPosition = "path" | "query";

export type Transformation = Partial<
  | {
      [key in SupportedTransformsType]: string | boolean | number;
    }
  | { [key: string]: string | boolean | number }
>;