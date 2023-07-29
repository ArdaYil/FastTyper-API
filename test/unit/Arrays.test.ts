import Arrays from "../../src/util/Arrays";

describe("Arrays.hasDuplicates() tests", () => {
  const user1 = { name: "john", age: 30 };
  const user2 = { name: "andy", age: 40 };
  const user3 = { name: "emily", age: 50 };

  test.each([
    [[3, 4, 10, 8], false],
    [[-8, 3, 832, 9, 8, -8], true],
    [["f", "b", "h", "oj", "h"], true],
    [["a", "b", "c", "f"], false],
    [[true, false], false],
    [[true, true], true],
    [[true, true], true],
    [[user1, user2, user3], false],
    [[user1, user2, user3, user1], true],
  ])("Arrays.hasDuplicates(%i) should return %i", (array, result) => {
    expect(Arrays.hasDuplicates(array)).toBe(result);
  });
});

describe("Arrays.amountOfDuplicates() tests", () => {
  test.each([
    [[1, 2, 5, 5, 6, 7, 8, 8, 55], 2],
    [[1, 4, 1, 6, 1, 9, -4], 1],
    [[], 0],
    [[5, 3, 6, 2, 6, 2, 6, 2, 7, 3], 3],
    [["a", "g", "h", "j", "a", "j", "g"], 3],
  ])("Arrays.amountOfDuplicates(%i) should return %i", (array, duplicates) => {
    expect(Arrays.amountOfDuplicates(array)).toBe(duplicates);
  });
});
