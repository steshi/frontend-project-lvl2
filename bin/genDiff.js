#!/usr/bin/env node
import { program } from 'commander';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import genDiff from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const jsonPath = path.join(__dirname, '..', 'package.json');
const packageJson = fs.readFileSync(jsonPath, 'utf-8');
const { version } = JSON.parse(packageJson);

program
  .version(version)
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'Optional choose type of outpoot format [stylish]', 'stylish')
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2) => genDiff(filepath1, filepath2, program.opts().format))
  .parse();
