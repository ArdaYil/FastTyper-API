import fs from "fs";
import Mathematics from "./Mathematics";

const wordArray = fs.readFileSync("data/words.txt", "utf-8").split("\n");

export const getRandomWords = (amount: number) => {
  const randomNumbers = Mathematics.randomNumbers(0, wordArray.length, amount);
  const words: string[] = [];

  for (let i = 0; i < amount; i++) {
    words[i] = wordArray[randomNumbers[i]];
  }

  return words;
};
