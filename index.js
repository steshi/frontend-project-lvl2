import parser from './src/parsers.js';
import * as formaters from './src/formaters/index.js';
import buildDiff from './src/buildDiff.js';

const genDiff = (filepath1, filepath2, formatType) => {
  const content1 = parser(filepath1);
  const content2 = parser(filepath2);
  const ast = buildDiff(content1, content2);
  if (formatType === 'stylish') {
    const formatedTree = formaters.stylish(ast);
    return formatedTree;
  }
  if (formatType === 'plain') {
    const formatedTree = formaters.plain(ast);
    return formatedTree;
  }
  if (formatType === 'json') {
    const formatedTree = formaters.json(ast);
    return formatedTree;
  }

  const message = `Err. ${formatType} - no such format.`;
  return message;
};
export default genDiff;
