class Arrays {
  public static hasDuplicates(array: Array<unknown>) {
    const foundValues = new Map<unknown, boolean>();

    for (let value of array) {
      if (foundValues.get(value)) return true;

      foundValues.set(value, true);
    }

    return false;
  }
}

export default Arrays;
