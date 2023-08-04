import Mathematics from "../util/Mathematics";
import TagModel from "../models/tag";
import Strings from "../util/Strings";

const charactersPerTag = 7;

const generateUniqueTag = async () => {
  const attempts = 20;

  for (let i = 0; i < attempts; i++) {
    const tag = Strings.getRandomString(charactersPerTag);

    if (!(await isTagUnique(tag))) continue;

    const tagDocument = await TagModel.create({ value: tag });
    await tagDocument.save();
    return tag;
  }

  return "";
};

const isTagUnique = async (tag: string) => {
  try {
    const tagDocument = await TagModel.findOne({ value: tag }).exec();

    return !tagDocument;
  } catch (exception) {
    return true;
  }
};

export default generateUniqueTag;
