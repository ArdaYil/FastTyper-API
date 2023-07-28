import Mathematics from "../../src/services/Mathematics";

type CompareType = "EXACT" | "RANGE";

const getDecimals = (num: number) => {
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
        return expect(getDecimals(randomNumber)).not.toBe(decimals);

      expect(getDecimals(randomNumber)).toBe(decimals);
    }
  );
});
