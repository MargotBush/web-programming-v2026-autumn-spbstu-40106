// Экспортируйте отсюда функцию с именем из контракта вашего варианта.
export function findLongestIncreasingSubsequence(numbers: number[]): number {
  if (numbers.length === 0) {
    return 0;
  }

  const dp = new Array(numbers.length).fill(1);
  for (let i = 0; i < numbers.length; i++) {
    for (let j = 0; j < i; j++) {
      if (numbers[j] < numbers[i]) {
        dp[i] = Math.max(dp[i], dp[j] + 1);
      }
    }
  }

  return Math.max(...dp);
}
