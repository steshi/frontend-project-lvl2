install:
	npm install
link:
	npm link
gendiff:
	node bin/genDiff.js
publish:
	npm publish --dry-run
lint:
	npx eslint .
test:
	npm test
test-coverage:
	npm test -- --coverage --coverageProvider=v8
