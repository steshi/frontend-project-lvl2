import parser from './src/parsers.js';
import * as formaters from './src/formaters.js';
import buildDiff from './src/compare.js';

const genDiff = (filepath1, filepath2, formatType) => {
  const content1 = parser(filepath1);
  const content2 = parser(filepath2);
  const ast = buildDiff(content1, content2);
  if (formatType === 'stylish') {
    const formatedTree = formaters.stylish(ast);
    console.log(formatedTree);
    return formatedTree;
  }
  const message = `Err. ${formatType} - no such format.`;
  console.log(message);
  return message;
};
export default genDiff;
