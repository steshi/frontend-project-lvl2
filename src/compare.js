import program from 'commander';
import _ from 'lodash';
import parse from './parsers.js';

export const buildDiff = (filepath1, filepath2) => {
  const content1 = parse(filepath1);
  const content2 = parse(filepath2);
  const keys1 = Object.keys(content1);
  const keys2 = Object.keys(content2);
  const concatKeys = [...keys1, ...keys2];
  const uniqeKeys = Array.from(new Set(concatKeys));
  const sorted = _.orderBy(uniqeKeys);
  const result = sorted.reduce((acc, key) => {
    if (content1[key] === content2[key]) {
      return [...acc, `    ${key} : ${content1[key]}`];
    }
    if (content1[key] === undefined) {
      return [...acc, `  + ${key} : ${content2[key]}`];
    }
    if (content2[key] === undefined) {
      return [...acc, `  - ${key} : ${content1[key]}`];
    }
    return [...acc, `  - ${key} : ${content1[key]}`, `  + ${key} : ${content2[key]}`];
  }, []);
  return `{\n${result.join('\n')}\n  }`;
};

export const genDiff = () => {
  program
    .version('1.0.11')
    .description('Compares two configuration files and shows a difference.')
    .option('-f, --format [type]', 'output format')
    .arguments('<filepath1> <filepath2>')
    .action((filepath1, filepath2) => {
      console.log(buildDiff(filepath1, filepath2));
      return buildDiff(filepath1, filepath2);
    })
    .parse();
//  const options = program.opts();
};

// console.log('sooooo:');
// if (options.format) console.log(`- ${options.format}`);
