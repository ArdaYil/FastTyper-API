import { User } from "../../src/models/user";

class RequestMock {
  body: any;
  params: any;
  user?: User;

  constructor(obj?: object, config: object = {}) {
    this.body = obj;

    for (let property in config) {
      this[property] = config[property];
    }
  }
}

const getRequest = (obj?: object, config?: object) =>
  new RequestMock(obj, config);

export default getRequest;
