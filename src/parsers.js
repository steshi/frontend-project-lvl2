import yaml from 'js-yaml';

export default (file, extension) => {
  const content = (extension === '.json') ? JSON.parse(file) : yaml.load(file);
  return content;
};
