import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

const format = (ast, formatType) => {
  const foramters = {
    stylish: stylish(ast),
    plain: plain(ast),
    json: json(ast),
  };
  return foramters[formatType] ?? `[${formatType}] format not supported`;
};

export default format;
