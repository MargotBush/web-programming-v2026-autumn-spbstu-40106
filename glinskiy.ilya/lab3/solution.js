function findPairsWithSum(arr, sum) {
  const pairs = [];

  for (let i = 0; i <= arr.length; i++) {
    const a = arr[i];
    for (let j = i + 1; j < arr.length; j++) {
      const b = arr[j];
      if (a + b === sum) {
        pairs.push([a, b]);
      }
    }
  }

  return pairs;
}

export {findPairsWithSum};
