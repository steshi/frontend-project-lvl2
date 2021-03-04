import { test, expect } from '@jest/globals';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import genDiff from '..';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

test('buildDiff json files in stylish format', () => {
  const file1Path = path.join(__dirname, '..', '__fixtures__', 'file1.json');
  const file2Path = path.join(__dirname, '..', '__fixtures__', 'file2.json');
  const expectedResult = readFile('resultStylish.txt');
  const actualResult = genDiff(file1Path, file2Path, 'stylish');
  expect(actualResult).toBe(expectedResult);
});
test('buildDiff yaml files in stylish format', () => {
  const file1Path = path.join(__dirname, '..', '__fixtures__', 'file1.yml');
  const file2Path = path.join(__dirname, '..', '__fixtures__', 'file2.yml');
  const expectedResult = readFile('resultStylish.txt');
  const actualResult = genDiff(file1Path, file2Path, 'stylish');
  expect(actualResult).toBe(expectedResult);
});
test('buildDiff files in plain format', () => {
  const file1Path = path.join(__dirname, '..', '__fixtures__', 'file1.yml');
  const file2Path = path.join(__dirname, '..', '__fixtures__', 'file2.yml');
  const expectedResult = readFile('resultPlain.txt');
  const actualResult = genDiff(file1Path, file2Path, 'plain');
  expect(actualResult).toBe(expectedResult);
});
test('buildDiff files in JSON format', () => {
  const file1Path = path.join(__dirname, '..', '__fixtures__', 'file1.yml');
  const file2Path = path.join(__dirname, '..', '__fixtures__', 'file2.yml');
  const expectedResult = readFile('resultJson.txt');
  const actualResult = genDiff(file1Path, file2Path, 'json');
  expect(actualResult).toBe(expectedResult);
});
test('buildDiff files in not supported format', () => {
  const file1Path = path.join(__dirname, '..', '__fixtures__', 'file1.json');
  const file2Path = path.join(__dirname, '..', '__fixtures__', 'file2.json');
  const expectedResult = '[any] format not supported';
  const actualResult = genDiff(file1Path, file2Path, 'any');
  expect(actualResult).toBe(expectedResult);
});
