import { encode } from './encode.js';

const serialize = (input) => {
  if (!Array.isArray(input)) {
    throw new TypeError('Input must be array');
  }

  const arr = Array.from(new Set(input)).sort((a, b) => a - b);
  if (!arr.length) {
    return '';
  }

  let out = encode(arr[0]);

  for (let i = 1; i < arr.length; i++) {
    const delta = arr[i] - arr[i - 1];
    out += encode(delta);
  }

  return out;
};

export { serialize };
