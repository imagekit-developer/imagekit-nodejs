export type TransformationPosition = "path" | "query";

export interface Transformation {
    [key: string]: string | number | boolean
}