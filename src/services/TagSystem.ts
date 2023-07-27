import Mathematics from "./Mathematics";
import TagModel from "../models/tag";

const charactersPerTag = 7;

const characters = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];

const randomCharacter = () => {
  const randomNumber = Mathematics.random(1, characters.length - 1);

  return characters[randomNumber];
};

const generateTag = () => {
  let tag = "";

  for (let i = 0; i < charactersPerTag; i++) {
    tag += randomCharacter();
  }

  return tag;
};

const generateUniqueTag = async () => {
  const attempts = 20;

  for (let i = 0; i < attempts; i++) {
    const tag = generateTag();

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
