import { IncomingMessage, Server, ServerResponse } from "http";
import TagModel from "../../../src/models/tag";
import request from "supertest";
import mongoose from "mongoose";
import generateUniqueTag from "../../../src/services/TagSystem";
import config from "config";

let server: Server<typeof IncomingMessage, typeof ServerResponse>;

describe("generateUniqueTag", () => {
  beforeEach(async () => {
    server = require("../../../src/index");
  });

  afterEach(async () => {
    server.close();
    await TagModel.deleteMany({});
  });

  it("should return a tag string, and persist a tag document", async () => {
    const tag = await generateUniqueTag();

    expect(tag).not.toBeFalsy();
    expect(typeof tag).toBe("string");
    expect(tag).toHaveLength(7);
  });
});
