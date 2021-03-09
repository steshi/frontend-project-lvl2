import { test, expect, describe } from '@jest/globals';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import genDiff from '..';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

describe('gendiff', () => {
  test.each([
    ['file1.json', 'file2.json', 'stylish', 'resultStylish.txt'],
    ['file1.yml', 'file2.yml', 'stylish', 'resultStylish.txt'],
    ['file1.yml', 'file2.yml', 'plain', 'resultPlain.txt'],
    ['file1.yml', 'file2.yml', 'json', 'resultJson.txt'],
  ])('gendiff(%s, %s, %s)', (file1Name, file2Name, format, resultName) => {
    const file1Path = getFixturePath(file1Name);
    const file2Path = getFixturePath(file2Name);
    const actualResult = genDiff(file1Path, file2Path, format);
    const expectedResult = readFile(resultName);
    expect(actualResult).toBe(expectedResult);
  });
});
