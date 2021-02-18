import { test, expect } from '@jest/globals';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { buildDiff } from '../src/compare.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

test('buildDiff plain json files', () => {
  const expectedResult = readFile('resultjson.txt');
  const file1Path = path.join(__dirname, '..', '__fixtures__', 'file1.json');
  const file2Path = path.join(__dirname, '..', '__fixtures__', 'file2.json');
  expect(buildDiff(file1Path, file2Path)).toBe(expectedResult);
});
test('buildDiff plain yaml files', () => {
  const expectedResult = readFile('resultyaml.txt');
  const file1Path = path.join(__dirname, '..', '__fixtures__', 'file1.yml');
  const file2Path = path.join(__dirname, '..', '__fixtures__', 'file2.yml');
  expect(buildDiff(file1Path, file2Path)).toBe(expectedResult);
});
