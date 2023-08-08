import typegoose, {
  getModelForClass,
  modelOptions,
  pre,
  prop,
  Severity,
} from "@typegoose/typegoose";
import config from "config";
import z, { TypeOf } from "zod";
import ms from "ms";
import argon2 from "argon2";
import jwt from "jsonwebtoken";
import UserShrinked from "../entities/UserShrinked";
import generateUniqueTag from "../services/TagSystem";
import _ from "lodash";
import dotenv from "dotenv";

dotenv.config();

const usernameMinLength = 1;
const usernameMaxLength = 50;
const emailMinLength = 5;
const emailMaxLength = 100;
const passwordMinLength = 8;
const passwordMaxLength = 50;
const passwordHashMaxLength = 1000;

const minLengthMessage = (property: string, min: number) =>
  `${property} has to have ${min} or more characters`;
const maxLengthMessage = (property: string, max: number) =>
  `${property} has to have ${max} or less characters`;

const userSchema = z
  .object({
    username: z
      .string()
      .min(passwordMinLength, minLengthMessage("Username", usernameMinLength))
      .max(passwordMaxLength, maxLengthMessage("Username", usernameMaxLength)),

    email: z
      .string()
      .email("Input has to be an email")
      .min(emailMinLength, minLengthMessage("Email", emailMinLength))
      .max(emailMaxLength, maxLengthMessage("Email", emailMaxLength)),

    password: z
      .string()
      .min(passwordMinLength, minLengthMessage("Password", passwordMinLength))
      .max(passwordMaxLength, maxLengthMessage("Password", passwordMaxLength)),

    confirmPassword: z
      .string()
      .min(
        passwordMinLength,
        minLengthMessage("Confirm password", passwordMinLength)
      )
      .max(
        passwordMaxLength,
        maxLengthMessage("Confirm Password", passwordMaxLength)
      ),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: "Confirm password must match password",
  });

export type UserInputBody = TypeOf<typeof userSchema>;

const getUserDataForClient = (user: User) =>
  _.pick(user, [
    "username",
    "email",
    "testsTaken",
    "highestWPM",
    "averageWPM",
    "previousTests",
    "achievements",
    "timePracticed",
    "userTag",
    "friends",
    "tournaments",
    "permissionLevel",
    "role",
  ]);

@pre<User>("save", async function () {
  const hashPassword = async () => {
    if (!this.isModified("password")) return;

    const hash = await argon2.hash(this.password);

    this.password = hash;
  };

  const setTag = async () => {
    const tag = await generateUniqueTag();

    this.userTag = tag;
  };

  await hashPassword();
  await setTag();

  return;
})
@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
  options: {
    allowMixed: Severity.ALLOW,
  },
})
export class User {
  @prop({
    required: true,
    minlength: usernameMinLength,
    maxlength: usernameMaxLength,
    trim: true,
    type: String,
  })
  username: string;

  @prop({
    required: true,
    minlength: emailMinLength,
    maxlength: emailMaxLength,
    trim: true,
    unique: true,
    type: String,
  })
  email: string;

  @prop({
    required: true,
    minlength: passwordMinLength,
    maxlength: passwordHashMaxLength,
    trim: true,
    type: String,
  })
  password: string;

  @prop({
    required: false,
    default: 0,
    min: 0,
    max: config.get("maxTests"),
    type: Number,
  })
  testsTaken: number;

  @prop({
    required: false,
    default: 0,
    min: 0,
    max: config.get("maxWPM"),
    type: Number,
  })
  highestWPM: number;

  @prop({
    required: false,
    default: 0,
    min: 0,
    max: config.get("maxAverageWPM"),
    type: Number,
  })
  averageWPM: number;

  @prop({
    required: false,
    default: [],
    type: Array<typeof Number>,
    validate: {
      validator: (value: Array<number>) =>
        value.length <= config.get<number>("maxPreviousTests"),
      message: `Amount of previous tests cannot exceed ${config.get(
        "maxPreviousTests"
      )}`,
    },
  })
  previousTests: Array<number>;

  @prop({
    required: false,
    defualt: [],
    type: Array<typeof Number>,
    validate: {
      validator: (value: Array<number>) =>
        value.length <= config.get<number>("maxAchievements"),
      message: `Achievements cannot exceed ${config.get("maxAchievements")}`,
    },
  })
  achievements: Array<number>;

  @prop({ required: false, default: 0, min: 0, max: ms("1y"), type: Number })
  timePracticed: number;

  @prop({
    requried: false,
    minlength: 7,
    maxlength: 15,
    unique: true,
    type: String,
  })
  userTag: string;

  @prop({
    required: false,
    default: [],
    type: Array<UserShrinked>,
    validate: {
      validator: (value: Array<UserShrinked>) =>
        value.length < config.get<number>("maxFriends"),
      message: `A user cannot have more than ${config.get(
        "maxFriends"
      )} friends`,
    },
  })
  friends: Array<UserShrinked>;

  @prop({
    required: false,
    default: [],
    type: Array<typeof String>,
    validate: {
      validator: (value: Array<typeof String>) =>
        value.length < config.get<number>("maxTournaments"),
    },
  })
  tournaments: Array<string>;

  @prop({
    required: false,
    default: "user",
    type: String,
    minlength: 4,
    maxlength: 50,
  })
  role: string;

  @prop({
    required: false,
    default: 1,
    type: Number,
    min: 1,
    max: 10,
  })
  permissionLevel: number;

  public generateAccessToken() {
    return jwt.sign(
      getUserDataForClient(this),
      process.env.JWT_ACCESS_KEY as string,
      { expiresIn: ms("15m") }
    );
  }

  public generateRefreshToken() {
    return jwt.sign(
      getUserDataForClient(this),
      process.env.JWT_REFRESH_KEY as string
    );
  }
}

const UserModel = getModelForClass(User);

export const validateUser = (data: UserInputBody) => userSchema.safeParse(data);

export default UserModel;
