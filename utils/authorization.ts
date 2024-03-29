import FormData from "form-data";

interface RequestOptions {
  url: string;
  headers?: Record<string, string | number | boolean>;
  method: string;
  formData?: FormData;
  qs?: Object;
  json?: any;
  auth?: {
    user: string;
    pass: string;
  };
}

export type { RequestOptions };
