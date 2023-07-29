import Mathematics from "../util/Mathematics";
import TagModel from "../models/tag";
import Strings from "../util/Strings";

const charactersPerTag = 7;

const generateUniqueTag = async () => {
  const attempts = 20;

  for (let i = 0; i < attempts; i++) {
    const tag = Strings.getRandomString(charactersPerTag);

    if (await isTagUnique(tag)) {
      const tagDocument = new TagModel({ value: tag });

      await tagDocument.save();

      return tag;
    }
  }

  return "";
};

const isTagUnique = async (tag: string) => {
  return TagModel.findOne({ value: tag });
};

export default generateUniqueTag;
