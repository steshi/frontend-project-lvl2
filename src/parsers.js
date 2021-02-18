import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

export default (filepath) => {
  const file = fs.readFileSync(filepath);
  const content = (path.extname(filepath) === '.json') ? JSON.parse(file) : yaml.load(file);
  return content;
};
