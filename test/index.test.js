import test from 'node:test';
import assert from 'node:assert';
import { serialize, deserialize } from '../src/index.js';

const compressionRatio = (arr) => {
  if (!arr.length) {
    return 1;
  }
  const simple = arr.join(',');
  const compact = serialize(arr);
  const ratio = simple.length / compact.length;
  console.log('Simple string: ', simple);
  console.log('Compact string: ', compact);
  console.log('CompressionRatio: ', Math.floor(ratio));
  console.log('');
  console.log('');
  return ratio;
};

test('just works', () => {
  const data = [1, 3, 7, 10, 42, 300];
  assert.deepStrictEqual(deserialize(serialize(data)), data);
});

test('just works with duplicates', () => {
  const data = [1, 3, 3, 7, 10, 10, 42, 300];
  const expected = Array.from(new Set(data)).sort((a, b) => a - b);
  assert.deepStrictEqual(deserialize(serialize(data)), expected);
});

test('compression >= 2x for reasonable sets', () => {
  const data = Array.from({ length: 10 }, () => Math.floor(Math.random() * 300) + 1);
  assert.ok(compressionRatio(data) >= 2, 'TEST');
});

test('compression >= 2x for random 50', () => {
  const data = Array.from({ length: 50 }, () => Math.floor(Math.random() * 300) + 1);
  assert.ok(compressionRatio(data) >= 2);
});

test('compression >= 2x for random 100', () => {
  const data = Array.from({ length: 100 }, () => Math.floor(Math.random() * 300) + 1);
  assert.ok(compressionRatio(data) >= 2);
});

test('compression >= 2x for random 500', () => {
  const data = Array.from({ length: 500 }, () => Math.floor(Math.random() * 300) + 1);
  assert.ok(compressionRatio(data) >= 2);
});

test('compression >= 2x for random 1000', () => {
  const data = Array.from({ length: 1000 }, () => Math.floor(Math.random() * 300) + 1);
  assert.ok(compressionRatio(data) >= 2);
});

test('all numbers 1..300', () => {
  const data = Array.from({ length: 300 }, (_, i) => i + 1);
  assert.ok(compressionRatio(data) >= 2);
});

test('each number repeated 3 times (900 numbers)', () => {
  const data = Array.from({ length: 900 }, (_, i) => (i % 300) + 1);
  assert.ok(compressionRatio(data) >= 2);
});

test('empty array', () => {
  const data = [];
  assert.deepStrictEqual(deserialize(serialize(data)), []);
});

test('single element', () => {
  const data = [42];
  assert.deepStrictEqual(deserialize(serialize(data)), [42]);
});
