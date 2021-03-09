import fs from 'fs';
import path from 'path';
import parse from './src/parsers.js';
import format from './src/formaters/index.js';
import buildDiff from './src/buildDiff.js';

const getContent = (filePath) => {
  const file = fs.readFileSync(filePath);
  const extension = path.extname(filePath);
  const content = parse(file, extension);
  return content;
};

const genDiff = (filepath1, filepath2, formatType) => {
  const content1 = getContent(filepath1);
  const content2 = getContent(filepath2);
  const ast = buildDiff(content1, content2);
  return format(ast, formatType);
};
export default genDiff;
