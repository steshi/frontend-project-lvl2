import _ from 'lodash';

const makeNode = (obj1, obj2, key) => {
  const node = {};
  node.name = key;
  if (obj1[key] === undefined) {
    node.type = 'new';
    node.value = obj2[key];
  }
  if (obj2[key] === undefined) {
    node.type = 'deleted';
    node.value = obj1[key];
  }
  if (obj1[key] === obj2[key]) {
    node.type = 'same';
    node.value = obj1[key];
  }
  if (node.type === undefined) {
    node.type = 'changed';
    node.value = [obj1[key], obj2[key]];
  }
  return node;
};

const buildDiff = (obj1, obj2) => {
  const keysObj1 = Object.keys(obj1);
  const keysObj2 = Object.keys(obj2);
  const concatKeys = [...keysObj1, ...keysObj2];
  const uniqeKeys = Array.from(new Set(concatKeys));
  const sorted = _.orderBy(uniqeKeys);
  const result = sorted.reduce((acc, key) => {
    const node = {};
    node.name = key;
    if ((typeof obj1[key] === 'object') && (typeof obj2[key] === 'object')) {
      node.type = 'obj';
      node.value = buildDiff(obj1[key], obj2[key]);
      return [...acc, node];
    }
    return [...acc, makeNode(obj1, obj2, key)];
  }, []);
  return result;
};

export default buildDiff;
