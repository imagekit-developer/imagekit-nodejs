import supportedTransforms from "../constants/supportedTransforms";

export type TransformationPosition = "path" | "query";

export type Transformation = Partial<
  | {
      [key in keyof typeof supportedTransforms]: string | boolean | number;
    }
  | { [key: string]: string | string | boolean | number }
>;