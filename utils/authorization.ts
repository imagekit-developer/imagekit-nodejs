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

const addAuthorization = function (obj: RequestOptions, privateKey: string) {
  obj.auth = {
    user: privateKey || "",
    pass: "",
  };
};

export { addAuthorization, RequestOptions };
