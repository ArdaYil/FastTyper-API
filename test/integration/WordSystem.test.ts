import { getRandomWords } from "../../src/services/WordSystem";
import Arrays from "../../src/util/Arrays";

describe("getRandomWords() integration tests", () => {
  it("should return an array of random words", () => {
    const results = [];
    const amountOfArrays = 10;
    const amountOfWords = 15;

    for (let i = 0; i < amountOfArrays; i++) {
      results[i] = getRandomWords(amountOfWords);
    }

    expect(Arrays.arraysEquality(...results)).toBe(false);
  });
});
