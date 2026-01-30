const ALPHABET =
  '0123456789' +
  'ABCDEFGHIJKLMNOPQRSTUVWXYZ' +
  'abcdefghijklmnopqrstuvwxyz' +
  '!#$%&()*+,-./:;<=>?@[]^_{}~';

const BASE = ALPHABET.length; // 80
const PREFIX = '~';

const encode = (n) => {
  if (n < 0 || n > 300) {
    throw new RangeError('Number out of range 0–300');
  }

  const count = Math.floor(n / BASE); // 0-3
  const rem = n % BASE; // 0-79

  return PREFIX.repeat(count) + ALPHABET[rem];
};

const decode = (str, i) => {
  let count = 0;
  while (str[i + count] === PREFIX) {
    count++;
  }

  const idx = ALPHABET.indexOf(str[i + count]);
  if (idx === -1) {
    throw new Error('Invalid character in encoded string');
  }

  return { value: count * BASE + idx, next: i + count + 1 };
};

export { encode, decode };
