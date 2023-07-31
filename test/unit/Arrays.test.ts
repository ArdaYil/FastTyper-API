import Arrays from "../../src/util/Arrays";

const user1 = { name: "john", age: 30 };
const user2 = { name: "andy", age: 40 };
const user3 = { name: "emily", age: 50 };

class Item {
  private name: string;
  private price: number;

  constructor(name: string, price: number) {
    this.name = name;
    this.price = price;
  }

  public equals(other: Item) {
    return this.name == other.name && this.price === other.price;
  }
}

const item1 = new Item("item 1", 50);
const item2 = new Item("item 2", 100);
const item2Copy = new Item("item 2", 100);
const item3 = new Item("item 3", 150);

describe("Arrays.hasDuplicates() unit tests", () => {
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

describe("Arrays.amountOfDuplicates() unit tests", () => {
  test.each([
    [[1, 2, 5, 5, 6, 7, 8, 8, 55], 4],
    [[1, 4, 1, 6, 1, 9, -4], 3],
    [[], 0],
    [[5, 3, 6, 2, 6, 2, 6, 2, 7, 3], 8],
    [["a", "g", "h", "j", "a", "j", "g"], 6],
    [[user1, user1, user2, user2, user3], 4],
    [[user1, user2, user3], 0],
  ])("Arrays.amountOfDuplicates(%i) should return %i", (array, duplicates) => {
    expect(Arrays.amountOfDuplicates(array)).toBe(duplicates);
  });

  test.each([
    [["f", "F", "a", "f", "A", "j", "j", "g"], true, 4],
    [["f", "F", "a", "f", "A", "j", "j", "g"], false, 7],
    [["h", "u", "H", "k", "U", "j", "G", "g", "h"], undefined, 2],
  ])(
    "Arrays.amountOfDuplicates(%i, %i) should return %i",
    (array, caseSensitive, duplicates) => {
      expect(Arrays.amountOfDuplicates(array, caseSensitive)).toBe(duplicates);
    }
  );
});

describe("Arrays.mostRepeatedCharacter() unit tests", () => {
  test.each([
    [["J", "f", "b", "f", "f", "b"], 3],
    [["K", "K", "k", "k", "K", "j", "j", "K"], 4],
    [["z", "b", "e", "F", "H", "Z", "Z"], 2],
    [["g", "V", "v", "V", "V"], 3],
  ])(
    "Arrays.amountOfLowercaseCharacters(%i) should return %i",
    (array, result) => {
      expect(Arrays.mostRepeatedCharacter(array)).toBe(result);
    }
  );

  test.each([
    [["J", "f", "b", "f", "f", "b"], true, 3],
    [["K", "K", "k", "k", "K", "j", "j", "K"], false, 6],
    [["z", "b", "e", "F", "H", "Z", "Z"], false, 3],
    [["g", "V", "v", "V", "V"], false, 4],
  ])(
    "Arrays.amountOfLowercaseCharacters(%i, %i) should return %i",
    (array, caseSensitive, result) => {
      expect(Arrays.mostRepeatedCharacter(array, caseSensitive)).toBe(result);
    }
  );
});

describe("Arrays.amountOfLowercaseCharacters() unit tests", () => {
  test.each([
    [["f", "H", "g", "k", "j", "K", "G", "V"], 4],
    [["j", "i", "K", "F", "V", "j"], 3],
    [["j", "i", "u", "v", "V", "j", "K", "I"], 5],
    [["K", "H", "J", "V", "I"], 0],
  ])(
    "Arrays.amountOfLowercaseCharacters(%i) should return %i",
    (array, result) => {
      expect(Arrays.amountOfLowercaseCharacters(array)).toBe(result);
    }
  );
});

describe("Arrays.amountOfUppercaseCharacters() unit tests", () => {
  test.each([
    [["F", "H", "g", "k", "j", "K", "G", "V"], 5],
    [["j", "i", "K", "F", "V", "j"], 3],
    [["j", "i", "u", "v", "V", "j", "K", "I"], 3],
    [["K", "H", "J", "V", "I"], 5],
  ])(
    "Arrays.amountOfLowercaseCharacters(%i) should return %i",
    (array, result) => {
      expect(Arrays.amountOfUppercaseCharacters(array)).toBe(result);
    }
  );
});

describe("Arrays.arrayEquality() unit tests", () => {
  test.each([
    [[1, 2, 5], [1, 2, 5], true],
    [[1, 2, 5], [1, 2], false],
    [[1, 2, 5], [1, 3, 5], false],
    [["h", "j", "h"], ["u", "v", "c"], false],
    [["h", "j", "h"], ["h", "j", "h"], true],
    [["h", "j", "h"], ["h", "j", "H"], false],
    [[false, false, true, false], [false, false, true, false], true],
    [[false, false, true, false], [false, false, true, true], false],
    [[user1, user1, user2, user3], [user1, user1, user2, user3], true],
    [[user1, user1, user2, user3], [user1, user1, user3, user3], false],
    [[item1, item2, item3], [item1, item2, item3], true],
    [[item1, item2, item3], [item1, item3, item3], false],
    [[item1, item2, item3], [item1, item2Copy, item3], true],
  ])(
    "Arrays.arrayEquality(%i, %i) should return %i",
    (first, second, result) => {
      expect(Arrays.arrayEquality(first, second)).toBe(result);
    }
  );
});
