import supportedTransforms from "../constants/supportedTransforms";

export type TransformationPosition = "path" | "query";

export type Transformation = Partial<typeof supportedTransforms>;
