import { SupportedTransformsParam } from "../constants/supportedTransforms";

export type TransformationPosition = "path" | "query";

export type Transformation = Partial<
  | {
      [key in SupportedTransformsParam]: string | boolean | number;
    }
  | { [key: string]: string | boolean | number }
>;