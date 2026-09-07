// Экспортируйте отсюда функцию с именем из контракта вашего варианта.

const alphabet = 'abcdefghijklmnopqrstuvwxyz';

export function isPangram(str: string): boolean {
  const letters = new Set(str.toLowerCase());

  return [...alphabet].every((letter) => letters.has(letter));
}
