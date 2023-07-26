import typegoose, { modelOptions, prop, Severity } from "@typegoose/typegoose";
import z, { TypeOf } from "zod";

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
    minlength: 1,
    maxlength: 50,
    trim: true,
    type: String,
  })
  username: string;

  @prop({
    required: true,
    minlength: 5,
    maxlength: 100,
    trim: true,
    type: String,
  })
  email: string;

  @prop({
    required: true,
    minlength: 8,
    maxlength: 1000,
    trim: true,
    type: String,
  })
  password: string;
}

const UserModel = typegoose.getModelForClass(User);

export const validateUser = (data: UserInputBody) => userSchema.safeParse(data);

export default UserModel;
