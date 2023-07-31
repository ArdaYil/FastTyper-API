class Arrays {
  public static hasDuplicates(array: Array<unknown>) {
    const foundValues = new Map<unknown, boolean>();

    for (let value of array) {
      if (foundValues.get(value)) return true;

      foundValues.set(value, true);
    }

    return false;
  }

  public static amountOfDuplicates(
    array: Array<unknown>,
    caseSensitive = true
  ) {
    const values = new Map<unknown, number>();
    let duplicates = 0;

    const getValue = (value: unknown) =>
      !caseSensitive && typeof value === "string" ? value.toLowerCase() : value;

    for (let value of array) {
      values.set(getValue(value), (values.get(getValue(value)) || 0) + 1);
    }

    values.forEach((value) => {
      if (value >= 2) duplicates += value;
    });

    return duplicates;
  }

  public static mostRepeatedCharacter(
    array: Array<string>,
    caseSensitive = true
  ) {
    const characters: { [key: string]: number } = {};

    const getKey = (key: string) => (caseSensitive ? key : key.toLowerCase());

    array.forEach(
      (char) => (characters[getKey(char)] = (characters[getKey(char)] || 0) + 1)
    );

    return Object.values(characters).reduce((a, b) => (b > a ? b : a), 0);
  }

  public static amountOfLowercaseCharacters(array: Array<string>) {
    return array.reduce(
      (amount, char) => (char === char.toLowerCase() ? amount + 1 : amount),
      0
    );
  }

  public static amountOfUppercaseCharacters(array: Array<string>) {
    return array.length - this.amountOfLowercaseCharacters(array);
  }

  public static arrayEquality = (
    first: Array<unknown>,
    second: Array<unknown>
  ) => {
    if (first.length !== second.length) return false;

    for (let i = 0; i < first.length; i++) {
      const firstValue = first[i];
      const secondValue = second[i];
      const areObjects =
        typeof firstValue === "object" && typeof secondValue === "object";

      const hasEqualsMethod = (firstValue as any)?.equals;

      if (
        areObjects &&
        hasEqualsMethod &&
        !(firstValue as any).equals(secondValue)
      )
        return false;

      if (!hasEqualsMethod && firstValue !== secondValue) return false;
    }

    return true;
  };

  public static arraysEquality(...arrays: Array<Array<unknown>>) {
    for (let i = 0; i < arrays.length; i++) {
      const array = arrays[i];
      const nextArray = arrays[i + 1];

      if (!nextArray) return true;
      if (!this.arrayEquality(array, nextArray)) return false;
    }

    return true;
  }
}

export default Arrays;
