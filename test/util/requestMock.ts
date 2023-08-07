import { User } from "../../src/models/user";

class RequestMock {
  body: any;
  params: any;
  user?: User;
  private headers: {};

  constructor(obj?: object, config: object = {}) {
    this.body = obj;

    for (let property in config) {
      this[property] = config[property];
    }
  }

  header(key: string) {
    return this.headers[key];
  }

  setHeader(key: string, value: unknown) {
    this.headers[key] = value;
  }
}

const getRequest = (obj?: object, config?: object) =>
  new RequestMock(obj, config);

export default getRequest;
