import Arrays from "../../src/util/Arrays";
import Strings, { CharCase } from "../../src/util/Strings";

describe("getRandomCharacter", () => {
  test.each([
    [undefined, "Random uppercase character"],
    ["UPPER", "Random uppercase character"],
    ["LOWER", "Random lowercase character"],
    ["RANDOM", "Random randomcase character"],
  ])("Mathematics.getRandomCharacter(%i) should return %i", (charCase, _) => {
    const characters = [];
    const charactersToRetrieve = 50;
    const ratio = 0.2;

    for (let j = 0; j < charactersToRetrieve; j++) {
      characters[j] = Strings.getRandomCharacter(charCase as CharCase);
    }

    const notCaseSensitive = charCase === "RANDOM";

    const mostRepetitions = Arrays.mostRepeatedCharacter(
      characters,
      notCaseSensitive
    );

    expect(mostRepetitions).toBeLessThan(charactersToRetrieve * ratio);

    if (notCaseSensitive) {
      const lowercase = Arrays.amountOfLowercaseCharacters(characters);
      console.log(characters);
      expect(lowercase).not.toBeGreaterThan(charactersToRetrieve * 0.8);
    }
  });
});
