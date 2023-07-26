import typegoose, { modelOptions, prop, Severity } from "@typegoose/typegoose";
import config from "config";
import z, { TypeOf } from "zod";
import ms from "ms";
import UserShrinked from "../entities/UserShrinked";

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
    minlength: usernameMaxLength,
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
  testTaken: number;

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
    default: "",
    minlength: 7,
    maxlength: 15,
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
}

const UserModel = typegoose.getModelForClass(User);

export const validateUser = (data: UserInputBody) => userSchema.safeParse(data);

export default UserModel;
