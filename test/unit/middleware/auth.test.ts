// invalid access token
// expired access token
// access token used before
// successful

import { getMockUserSync } from "../../util/getMockUser";
import getRequest from "../../util/requestMock";
import getResponse from "../../util/responseMock";
import auth from "../../../src/middleware/auth";
import _ from "lodash";
import dotenv from "dotenv";
import { User } from "../../../src/models/user";
import ms from "ms";

const jwt = require("jsonwebtoken");

dotenv.config();

// note status should never be 500

describe("Authentication unit tests", () => {
  const getMocks = () => {
    const user = getMockUserSync();
    const request = getRequest({}, { user });
    const response = getResponse();
    const next = jest.fn();

    return { user, request, response, next };
  };

  const getJwt = (user: User, config: object) =>
    jwt.sign(
      _.pick(user, ["username", "email"]),
      process.env.JWT_ACCESS_KEY as string,
      config
    );

  it("should return status 401 if no access token is provided", () => {
    const { request, response, next } = getMocks();

    auth(request as any, response as any, next);

    expect(response.currentStatus).toBe(401);
    expect(response.currentMessage).toBe("Access denied | Unauthenticated");
    expect(next).not.toHaveBeenCalled();
  });

  it("should return 401 if access token is invalid", () => {
    const { request, response, next } = getMocks();

    request.setHeader("x-auth-token", "accessToken");

    auth(request as any, response as any, next);

    expect(response.currentStatus).toBe(401);
    expect(response.currentMessage).toBe("Invalid access token");
    expect(next).not.toHaveBeenCalled();
  });

  it("should return 401 if access token has expired", () => {
    const { user, request, response, next } = getMocks();

    request.setHeader("x-auth-token", getJwt(user, { expiresIn: 0 }));

    auth(request as any, response as any, next);

    expect(response.currentStatus).toBe(401);
    expect(response.currentMessage).toBe("Access token has expired");
    expect(next).not.toHaveBeenCalled();
  });

  it("should return 401 if token is used before notBefore time", () => {
    const { user, request, response, next } = getMocks();

    request.setHeader("x-auth-token", getJwt(user, { notBefore: "2 days" }));

    auth(request as any, response as any, next);

    expect(response.currentStatus).toBe(401);
    expect(response.currentMessage).toBe("Access token is not valid for use");
    expect(next).not.toHaveBeenCalled();
  });

  it("should not return status if jwt is valid", () => {
    const { user, request, response, next } = getMocks();

    request.setHeader(
      "x-auth-token",
      getJwt(user, { notBefore: 0, expiresIn: "10 days" })
    );

    auth(request as any, response as any, next);

    expect(response.currentStatus).toBeFalsy();
    expect(response.currentMessage).toBeFalsy();
    expect(next).toHaveBeenCalled();
  });
});
