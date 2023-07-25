import typegoose, { modelOptions, prop, Severity } from "@typegoose/typegoose";

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

export default UserModel;
