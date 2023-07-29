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
