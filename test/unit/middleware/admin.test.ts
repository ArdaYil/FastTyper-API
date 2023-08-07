import admin from "../../../src/middleware/admin";
import getResponse from "../../util/responseMock";
import getRequest from "../../util/requestMock";
import getMockUser, { getMockUserSync } from "../../util/getMockUser";

describe("Authorization", () => {
  const getMocks = (permissionLevel: number) => {
    const user = getMockUserSync({ permissionLevel });
    const request = getRequest({}, { user });
    const response = getResponse();
    const next = jest.fn();

    return { user, request, response, next };
  };

  test.each([[1], [0], [-1], [-100], [11], [100]])(
    "It should throw an error if permissionLevel is %i",
    (permissionLevel) => {
      expect(() =>
        admin(permissionLevel)(
          getRequest() as any,
          getResponse() as any,
          jest.fn()
        )
      ).toThrow();
    }
  );

  it("should throw an error if authorization happens before authentication", () => {
    const permissionLevel = 10;

    const next = jest.fn();

    expect(() =>
      admin(permissionLevel)(getRequest() as any, getResponse() as any, next)
    ).toThrow("Authentication must happen before authorization!");
  });

  it("should return status 403 if authorization fails", () => {
    const permissionLevel = 7;
    const { request, response, next } = getMocks(6);

    admin(permissionLevel)(request as any, response as any, next);
    expect(response.currentStatus).toBe(403);
    expect(response.currentMessage).toBe("Access denied | Unauthorized");
    expect(next).not.toHaveBeenCalled();
  });

  test.each([[2], [3], [4], [5], [6], [7], [8], [9], [10]])(
    "should call next function and not return status",
    (permissionLevel) => {
      const { request, response, next } = getMocks(permissionLevel);

      admin(permissionLevel)(request as any, response as any, next);

      expect(response.currentStatus).toBeFalsy();
      expect(response.currentMessage).toBeFalsy();
      expect(next).toHaveBeenCalled();
    }
  );
});
