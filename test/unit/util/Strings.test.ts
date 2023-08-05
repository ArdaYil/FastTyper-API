import Arrays from "../../../src/util/Arrays";
import Strings, { CharCase } from "../../../src/util/Strings";

describe("getRandomCharacter", () => {
  test.each([
    [undefined, "Random uppercase character"],
    ["UPPER", "Random uppercase character"],
    ["LOWER", "Random lowercase character"],
    ["RANDOM", "Random randomcase character"],
  ])("Mathematics.getRandomCharacter(%i) should return %i", (charCase, _) => {
    const characters: Array<string> = [];
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

      expect(lowercase).not.toBeGreaterThan(charactersToRetrieve * 0.8);
    }
  });
});

describe("Strings.getRandomString()", () => {
  test.each([[undefined, "UPPER", "LOWER", "RANDOM"]])(
    "Strings.getRandomString(%i) should return a random string with correct case",
    (charCase) => {
      const results: Array<string> = [];
      const amountOfStrings = 10;
      const length = 5;

      for (let i = 0; i < amountOfStrings; i++) {
        results[i] = Strings.getRandomString(length, charCase);
      }

      expect(Arrays.hasDuplicates(results)).toBe(false);
    }
  );
});
