class Arrays {
  public static hasDuplicates(array: Array<unknown>) {
    const foundValues = new Map<unknown, boolean>();

    for (let value of array) {
      if (foundValues.get(value)) return true;

      foundValues.set(value, true);
    }

    return false;
  }

  public static amountOfDuplicates(array: Array<unknown>) {
    const values = new Map<unknown, boolean>();
    let duplicates = 0;

    for (let value of array) {
      if (values.get(value)) duplicates++;

      values.set(value, true);
    }

    return duplicates;
  }
}

export default Arrays;
