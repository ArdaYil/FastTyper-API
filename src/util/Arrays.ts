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
}

export default Arrays;
