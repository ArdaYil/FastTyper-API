class RequestMock {
  body: any;
  params: any;
}

const getRequest = (obj?: object) => new RequestMock();

export default getRequest;
