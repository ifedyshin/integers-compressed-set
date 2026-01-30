import { decode } from './encode.js';

const deserialize = (str) => {
  if (!str) {
    return [];
  }

  const result = [];
  let i = 0;

  const { value, next } = decode(str, i);
  let current = value;
  result.push(current);
  i = next;

  while (i < str.length) {
    const decoded = decode(str, i);
    current += decoded.value; // add delta
    result.push(current);
    i = decoded.next;
  }

  return result;
};

export { deserialize };
