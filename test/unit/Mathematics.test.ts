import Mathematics from "../../src/util/Mathematics";
import Arrays from "../../src/util/Arrays";

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
        return expect(Mathematics.amountOfDecimals(randomNumber)).not.toBe(
          decimals
        );

      expect(Mathematics.amountOfDecimals(randomNumber)).toBeLessThanOrEqual(
        decimals
      );
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

describe("Mathematics.removeDecimals() tests", () => {
  test.each([
    [3.53323, 3, 3.533],
    [0.55687, 2, 0.55],
    [-5.807236, 3, -5.807],
    [-8.0032, 2, -8],
    [10.967492977574, 10, 10.9674929775],
    [6, 9, 6],
    [10.86746, 10, 10.86746],
    [6.7462, 4, 6.7462],
    [3.8674, 0, 3],
  ])(
    "Mathematics.removeDecimals(%i, %i) should return %i",
    (number, decimals, result) => {
      const actualResult = Mathematics.removeDecimals(number, decimals);

      expect(actualResult).toBe(result);
    }
  );

  it("should throw an exception if decimals (third parameter) is less than 0", () => {
    expect(() => Mathematics.removeDecimals(5.243, -1)).toThrow();
  });
});

describe("Mathematics.amountOfDecimals() tests", () => {
  test.each([
    [3.094726, 6],
    [-4.8573659863, 10],
    [0.00984, 5],
    [-0.031, 3],
    [0.0, 0],
    [0.2, 1],
    [-0.024, 3],
  ])(
    "Mathematics.amountOfDecimals(%i) should return %i",
    (number, decimals) => {
      const amount = Mathematics.amountOfDecimals(number);

      expect(amount).toBe(decimals);
    }
  );
});
