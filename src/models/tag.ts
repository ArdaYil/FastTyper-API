import typegoose, {
  prop,
  modelOptions,
  Severity,
  getModelForClass,
} from "@typegoose/typegoose";

@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
  options: {
    allowMixed: Severity.ALLOW,
  },
})
export class Tag {
  @prop({ required: true, minlength: 7, maxlength: 15, type: String })
  value: string;
}

const TagModel = getModelForClass(Tag);

export default TagModel;
