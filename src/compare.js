import _ from 'lodash';

const buildDiff = (obj1, obj2) => {
  const keysObj1 = Object.keys(obj1);
  const keysObj2 = Object.keys(obj2);
  const concatKeys = [...keysObj1, ...keysObj2];
  const uniqeKeys = Array.from(new Set(concatKeys));
  const sorted = _.orderBy(uniqeKeys);
  const result = sorted.reduce((acc, key) => {
    const current = {};
    if ((typeof obj1[key] === 'object') && (typeof obj2[key] === 'object')) {
      current.type = 'obj';
      current.key = key;
      current.value = buildDiff(obj1[key], obj2[key]);
      acc.push(current);
      return acc;
    }
    if (obj1[key] === undefined) {
      current.type = 'new';
      current.key = key;
      current.value = obj2[key];
      acc.push(current);
      return acc;
    }
    if (obj2[key] === undefined) {
      current.type = 'deleted';
      current.key = key;
      current.value = obj1[key];
      acc.push(current);
      return acc;
    }
    if (obj1[key] === obj2[key]) {
      current.type = 'same';
      current.key = key;
      current.value = obj1[key];
      acc.push(current);
      return acc;
    }
    current.type = 'changed';
    current.key = key;
    current.value = [obj1[key], obj2[key]];
    acc.push(current);
    return acc;
  }, []);
  return result;
};

export default buildDiff;
