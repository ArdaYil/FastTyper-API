class Mathematics {
  public static random(min: number, max: number, decimals: number = 0) {
    const number = Math.random() * (max - min) + min;

    return (decimals = 0);
  }

  public static randomNumbers(
    min: number,
    max: number,
    amount: number,
    decimals: number = 0
  ) {
    const numbers: number[] = [];

    while (numbers.length < amount) {
      const number = this.random(min, max, decimals);

      if (number in numbers) continue;

      numbers.push(number);
    }

    return numbers;
  }

  public static removeDecimals(num: number, decimals: number) {
    if (decimals == 0) return Math.floor(num);

    const str = num.toString();
    const dot = str.indexOf(".");

    return parseFloat(str.substring(0, dot + decimals + 1));
  }
}
