import parser from './src/parsers.js';
import format from './src/formaters/index.js';
import buildDiff from './src/buildDiff.js';

const genDiff = (filepath1, filepath2, formatType) => {
  const content1 = parser(filepath1);
  const content2 = parser(filepath2);
  const ast = buildDiff(content1, content2);
  return format(ast, formatType);
};
export default genDiff;
