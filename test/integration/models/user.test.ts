import { ObjectId } from "mongodb";
import Test from "../../../src/entities/Test";
import UserShrinked from "../../../src/entities/UserShrinked";
import TournamentPerformance from "../../../src/entities/TournamentPerformance";
import Role from "../../../src/types/Role";
import UserModel from "../../../src/models/user";
import config from "config";
import getMockArray from "../../util/getMockArray";
import ms from "ms";
import _ from "lodash";
import { IncomingMessage, Server, ServerResponse } from "http";
import argon2 from "argon2";

interface Properties {
  username: string;
  email: string;
  password: string;
  testsTaken: number;
  highestWPM: number;
  averageWPM: number;
  previousTests: Array<Test> | undefined;
  achievements: Array<number>;
  timePracticed: number;
  userTag: string;
  friends: Array<UserShrinked>;
  tournaments: Array<TournamentPerformance>;
  role: Role;
  permissionLevel: number;
}

let server: Server<typeof IncomingMessage, typeof ServerResponse>;

describe("integration tests for user model", () => {
  const properties: Properties = {} as Properties;

  const createUser = async () => {
    const user = new UserModel(properties);

    await user.save();

    return user;
  };

  const u: UserShrinked = _.pick(new UserModel({ username: "Amy" }) as any, [
    "profilePicture",
    "_id",
    "username",
  ]);

  beforeEach(() => {
    server = require("../../../src/index");

    properties.username = "John";
    properties.email = "john@gmail.com";
    properties.password = "12345678";
    properties.testsTaken = 10;
    properties.highestWPM = 100;
    properties.averageWPM = 100;
    properties.previousTests = [{ wpm: 10, date: new Date() }];
    properties.achievements = [10, 40];
    properties.timePracticed = 10;
    properties.userTag = "FFFFFFF";
    properties.friends = [u];
    properties.tournaments = [
      {
        performance: 80,
        endDate: parseInt(new Date().toUTCString()),
        _id: new ObjectId() as any,
      },
    ];
    properties.role = "MEMBER";
    properties.permissionLevel = 3;
  });

  afterEach(async () => {
    await server.close();
    await UserModel.deleteMany({});
  });

  test.each([
    ["username", ""],
    ["username", new Array(52).join("a")],
    ["email", "aaa"],
    ["email", new Array(100).join("a") + "@gmail.com"],
    ["email", "aaaaaaaa"],
    ["password", "aaaaaaa"],
    ["testsTaken", -1],
    ["testsTaken", config.get<number>("maxTests") + 1],
    ["highestWPM", -1],
    ["highestWPM", config.get<number>("maxWPM") + 1],
    ["averageWPM", -1],
    ["averageWPM", config.get<number>("maxAverageWPM")],
    ["previousTests", undefined],
    [
      "previousTests",
      getMockArray<Test>(config.get<number>("maxPreviousTests") + 1, {
        date: new Date(),
        wpm: 1,
      }),
    ],
    ["achievements", undefined],
    ["achievements", getMockArray<number>(config.get("maxAchievements"), 1)],
    ["timePracticed", -1],
    ["timePracticed", ms("1y") + 1],
    ["userTag", "few"],
    ["userTag", "fioewjofjewo"],
    ["friends", undefined],
    ["tournaments", undefined],
    ["role", "few"],
    ["role", "MEMBER"],
    ["permissionLevel", 0],
    ["permissionLevel", 11],
  ])(`Test should throw if %d = %i`, async (prop: string, input) => {
    properties[prop] = input;

    try {
      await createUser();
    } catch (exception) {
      console.log(exception.name, exception.message);
      expect(exception.name).toBe("ValidationError");
    }
  });

  it("should properly create a user object if all properties are valid", async () => {
    const user = await createUser();
    expect(user).toBeDefined();
    expect(user).toBeInstanceOf(UserModel);
    expect(user).toHaveProperty("username", "John");
    expect(user).toHaveProperty("email", "john@gmail.com");
    expect(user).toHaveProperty("password");
    expect(user).toHaveProperty("userTag");
    expect(user.achievements).toEqual([10, 40]);

    const verification = await argon2.verify(user.password, "12345678");

    expect(verification).toBe(true);
  });
});
