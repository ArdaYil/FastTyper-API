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
    const values = new Map<unknown, number>();
    let duplicates = 0;

    for (let value of array) {
      values.set(value, Math.min((values.get(value) || 0) + 1, 2));
    }

    values.forEach((value) => {
      if (value === 2) duplicates += 1;
    });

    return duplicates;
  }
}

export default Arrays;
