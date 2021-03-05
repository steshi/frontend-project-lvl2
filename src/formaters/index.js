import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

const format = (ast, formatType = 'stylish') => {
  const foramters = {
    stylish: stylish(ast),
    plain: plain(ast),
    json: json(ast),
  };
  return foramters[formatType];
};

export default format;
