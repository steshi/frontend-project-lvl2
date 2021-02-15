import program from 'commander';
import fs from 'fs';
import _ from 'lodash';

const main = () => {
  program
    .version('1.0.11')
    .description('Compares two configuration files and shows a difference.')
    .option('-f, --format [type]', 'output format')
    .arguments('<filepath1> <filepath2>')
    .action((filepath1, filepath2) => {
      const file1 = fs.readFileSync(filepath1);
      const file2 = fs.readFileSync(filepath2);
      const content1 = JSON.parse(file1);
      const content2 = JSON.parse(file2);
      const keys1 = Object.keys(content1);
      const keys2 = Object.keys(content2);
      //  console.log('zzzzzzz', keys1, 'xxxxxx', keys2);
      const concatKeys = [...keys1, ...keys2];
      const uniqe = new Set(concatKeys);
      const uniqeKeys = Array.from(uniqe);
      const sorted = _.sortedUniq(uniqeKeys);
      const result = sorted
        .reduce((acc, key) => {
          if (content1[key] === content2[key]) {
            return [...acc, `  ${key} : ${content1[key]}`];
          }
          if (content1[key] === undefined) {
            return [...acc, `+ ${key} : ${content2[key]}`];
          }
          if (content2[key] === undefined) {
            return [...acc, `- ${key} : ${content1[key]}`];
          }
          return [...acc, `- ${key} : ${content1[key]}`, `+ ${key} : ${content2[key]}`];
        }, []);
      console.log(result.join('\n'));
    })
    .parse();
//  const options = program.opts();
};

export default main;

// console.log('sooooo:');
// if (options.format) console.log(`- ${options.format}`);
