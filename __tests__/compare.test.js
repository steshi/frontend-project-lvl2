import { test, expect } from '@jest/globals';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import genDiff from '..';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

test('buildDiff json tree files in stylish format', () => {
  const expectedResult = readFile('result.txt');
  const file1Path = path.join(__dirname, '..', '__fixtures__', 'file1.json');
  const file2Path = path.join(__dirname, '..', '__fixtures__', 'file2.json');
  expect(genDiff(file1Path, file2Path, 'stylish')).toBe(expectedResult);
});
test('buildDiff yaml tree files in stylish format', () => {
  const expectedResult = readFile('result.txt');
  const file1Path = path.join(__dirname, '..', '__fixtures__', 'file1.yml');
  const file2Path = path.join(__dirname, '..', '__fixtures__', 'file2.yml');
  expect(genDiff(file1Path, file2Path, 'stylish')).toBe(expectedResult);
});
