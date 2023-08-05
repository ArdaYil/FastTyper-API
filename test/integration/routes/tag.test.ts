import request from "supertest";
import TagModel from "../../../src/models/tag";
import { IncomingMessage, Server, ServerResponse } from "http";
import UserModel, { User } from "../../../src/models/user";
import getMockUser from "../util/getMockUser";
import { ObjectId } from "mongodb";

let server: Server<typeof IncomingMessage, typeof ServerResponse>;

describe("tag GET:/id", () => {
  let token: string | undefined;
  let id: ObjectId | string;
  let user: User;
  const tagValue = "abcdefg";

  const execute = async () => {
    if (token !== undefined)
      return request(server).get(`/api/tags/${id}`).set("x-auth-token", token);

    return request(server).get(`/api/tags/${id}`);
  };

  beforeEach(async () => {
    server = require("../../../src/index");

    const tag = new TagModel({ value: tagValue });
    await tag.save();

    user = await getMockUser({ permissionLevel: 10 });

    token = user.generateAccessToken();
    id = tag._id;
  });

  afterEach(async () => {
    server.close();

    await UserModel.deleteMany({});
    await TagModel.deleteMany({});
  });

  it("should return status 404 if the tag does not exist", async () => {
    id = "noId";

    const response = await execute();

    expect(response.status).toBe(404);
  });

  it("should return status 401 if user is not authenticated", async () => {
    token = undefined;

    const response = await execute();

    expect(response.status).toBe(401);
  });

  it("should return status 403 if user is not authorized", async () => {
    user.permissionLevel = 9;
    token = user.generateAccessToken();

    const response = await execute();

    expect(response.status).toBe(403);
  });

  it("should return status 200 and a tag object if user is authenticated and authorized", async () => {
    const { status, body } = await execute();

    expect(status).toBe(200);
    expect(body).toHaveProperty("_id");
    expect(body).toHaveProperty("value", tagValue);
  });
});
