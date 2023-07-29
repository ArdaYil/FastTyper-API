import { lowerCase, upperCase } from "lodash";
import Mathematics from "./Mathematics";

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

type CharCase = "UPPER" | "LOWER" | "RANDOM";

class Strings {
  private static getRandomCaseFunc() {
    const randomNumber = Mathematics.random(1, 2);

    return randomNumber === 1 ? lowerCase : upperCase;
  }

  public static getRandomCharacter(charCase: CharCase = "UPPER") {
    const randomNumber = Mathematics.random(1, characters.length - 1);
    const randomCharacter = characters[randomNumber];

    if (charCase === "UPPER") return randomCharacter;
    if (charCase === "LOWER") return randomCharacter.toLowerCase();

    return this.getRandomCaseFunc()(randomCharacter);
  }

  public static getRandomString(length: number, charCase: CharCase = "UPPER") {
    let str = "";

    for (let i = 0; i < length; i++) {
      str += this.getRandomCharacter(charCase);
    }

    return str;
  }
}

export default Strings;
