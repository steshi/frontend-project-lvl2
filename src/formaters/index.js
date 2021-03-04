import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

const format = (ast, formatType) => {
  if (formatType === 'stylish') {
    const formatedTree = stylish(ast);
    return formatedTree;
  }
  if (formatType === 'plain') {
    const formatedTree = plain(ast);
    return formatedTree;
  }
  if (formatType === 'json') {
    const formatedTree = json(ast);
    return formatedTree;
  }

  const message = `Err. ${formatType} - no such format.`;
  return message;
};

export default format;
