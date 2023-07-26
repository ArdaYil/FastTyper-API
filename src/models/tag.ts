import typegoose, { prop } from "@typegoose/typegoose";

class Tag {
  @prop({ required: true, minlength: 7, maxlength: 15, Type: String })
  value: string;
}

const TagModel = typegoose.getModelForClass(Tag);

export default TagModel;
