install:
	npm install
gendiff:
	node bin/genDiff.js
publish:
	npm publish --dry-run
make lint:
	npx eslint .