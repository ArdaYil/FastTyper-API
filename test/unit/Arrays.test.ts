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
    [[], false],
  ])("Arrays.hasDuplicates(%i) should return %i", (array, result) => {
    console.log(array, result);
    expect(Arrays.hasDuplicates(array)).toBe(result);
  });
});
