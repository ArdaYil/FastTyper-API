import Mathematics from "../../src/util/Mathematics";
import Arrays from "../../src/util/Arrays";

type CompareType = "EXACT" | "RANGE";

const amountOfDecimals = (num: number) => {
  const str = num.toString();
  const dot = str.indexOf(".");

  if (dot === -1) return 0;

  return str.substring(dot + 1, str.length).length;
};

describe("Mathematics.random() tests", () => {
  test.each([
    [324, 340, 0],
    [500, 498, 0],
    [400, 400, 0],
    [-253, -123, 0],
    [-321, -355, 0],
    [-231, -231, 0],
    [-3634, -3630, 5],
    [432, 732, 3],
    [300, 300, 6, false],
  ])(
    "Mathematics.random(%i, %i) should be within range and have the right amount of decimals",
    (min, max, decimals, decimalTruthiness = true) => {
      const decimalInput = decimals || undefined;
      const actualMin = Math.min(min, max);
      const actualMax = Math.max(min, max);
      const randomNumber = Mathematics.random(min, max, decimalInput);

      expect(randomNumber).toBeGreaterThanOrEqual(actualMin);
      expect(randomNumber).toBeLessThanOrEqual(actualMax);

      if (decimalTruthiness === false)
        return expect(amountOfDecimals(randomNumber)).not.toBe(decimals);

      expect(amountOfDecimals(randomNumber)).toBe(decimals);
    }
  );
});

describe("Mathematics.randomNumbers() tests", () => {
  test.each([
    [100, 200, 80],
    [50, 100, 50],
  ])(
    "Mathematics.randomNumbers(%i, %i, %i) should return an array with random numbers within range, without duplicates",
    (min, max, amount) => {
      for (let i = 0; i < 20; i++) {
        const randomNumbers = Mathematics.randomNumbers(min, max, amount);

        expect(randomNumbers.length).toBe(amount);
        expect(Arrays.hasDuplicates(randomNumbers)).toBe(false);
      }
    }
  );

  it("should not throw an error", () => {
    expect(() => Mathematics.randomNumbers(10, 20, 10)).not.toThrow();
  });

  test.each([
    [30, 40, 11],
    [50, 80, 35],
    [80, 30, 51],
    [-30, -50, 21],
  ])(
    "Mathematics.randomNumbers(%i, %i, %i) should throw an error if amount is greater than max - min",
    (min, max, amount) => {
      expect(() => Mathematics.randomNumbers(min, max, amount)).toThrow();
    }
  );

  test.each([
    [10, 20, 0],
    [-10, -20, -5],
  ])(
    "Mathematics.randomNumbers(%i, %i, %i) should throw if i is less than or equal to 0",
    (min, max, amount) => {
      expect(() => Mathematics.randomNumbers(min, max, amount)).toThrow();
    }
  );
});
