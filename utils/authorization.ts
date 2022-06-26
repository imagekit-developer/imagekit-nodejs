interface RequestOptions {
  url: string;
  headers?: Object;
  method: string;
  formData?: Object;
  qs?: Object;
  json?: any;
  auth?: {
    user: string;
    pass: string;
  };
}

export { RequestOptions };
