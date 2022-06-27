interface ResponseMetadata {
  statusCode: number;
  headers: Record<string, string | number | boolean>;
}

type IKResponse<T> = T extends Error
  ? T & { $ResponseMetadata?: ResponseMetadata }
  : T & { $ResponseMetadata: ResponseMetadata };

export default IKResponse;
