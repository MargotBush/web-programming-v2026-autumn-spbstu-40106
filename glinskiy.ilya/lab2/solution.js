const open = '({[';
const closed = ')}]';

function isBalanced(str) {
  const stack = [];

  for (let i = 0; i < str.length; i++) {
    const curBracket = str[i];

    if (open.includes(curBracket)) {
      stack.push(curBracket);
    } else if (closed.includes(curBracket)) {
      const lastBracket = stack.pop();
      if (open.indexOf(lastBracket) !== closed.indexOf(curBracket)) {
        return false;
      }
    }
  }

  return stack.length === 0;
}

export {isBalanced};
