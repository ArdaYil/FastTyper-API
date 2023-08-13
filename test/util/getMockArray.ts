const getMockArray = <T>(amount: number, object?: T) => {
  const array: Array<T> = [];

  for (let i = 0; i < amount; i++) {
    if (object && typeof object === "object")
      array[i] = object ? object : ("." as T);
    else if (object && typeof object === "number") array[i] = 1 as T;
  }

  return array;
};

export default getMockArray;
