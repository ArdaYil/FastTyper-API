class Mathematics {
  public static random(min: number, max: number, decimals: number = 0) {
    const number = Math.random() * (max - min) + min;

    return this.removeDecimals(number, decimals);
  }

  public static randomNumbers(
    min: number,
    max: number,
    amount: number,
    decimals: number = 0
  ) {
    if (amount <= 0)
      throw new Error("Amount must be a positive intiger and cannot be 0");

    if (amount > Math.max(max, min) - Math.min(max, min))
      throw new Error(
        "Amount cannot be greater than max - min. Otherwise each value in the returned array cannot be unique"
      );

    const numbers: number[] = [];

    while (numbers.length < amount) {
      const number = this.random(min, max, decimals);

      if (numbers.find((n) => n === number)) continue;

      numbers.push(number);
    }

    return numbers;
  }

  public static removeDecimals(num: number, decimals: number) {
    if (decimals < 0)
      throw new Error(
        "Third positional argument (decimals) cannot be less than 0"
      );

    const factor = 10 ** decimals;

    return Math.trunc(num * factor) / factor;
  }

  public static amountOfDecimals(num: number) {
    const str = num.toString();
    const dot = str.indexOf(".");

    if (dot === -1) return 0;

    return str.length - dot - 1;
  }
}

export default Mathematics;
