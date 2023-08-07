class ResponseMock {
  public currentStatus?: number;
  public currentMessage: string;
  public data: Array<any> | object;

  private isSent() {
    return this.currentMessage != null || this.data != null;
  }

  status(status: number) {
    if (this.currentStatus != null)
      throw new Error("Request already have status");

    this.currentStatus = status;

    return this;
  }

  send(message: string) {
    if (this.isSent()) throw new Error("Request already sent");

    this.currentMessage = message;

    return this;
  }

  json(data: Array<any> | object) {
    if (this.isSent()) throw new Error("Request already sent data");

    this.data = data;

    return this;
  }
}

const getResponse = (obj?: object) => new ResponseMock();

export default getResponse;
