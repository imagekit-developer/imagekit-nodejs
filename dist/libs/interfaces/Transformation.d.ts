import supportedTransforms from "../constants/supportedTransforms";
export declare type TransformationPosition = "path" | "query";
export declare type Transformation = Partial<typeof supportedTransforms>;
