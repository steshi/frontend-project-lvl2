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
      current.name = key;
      current.type = 'obj';
      current.value = buildDiff(obj1[key], obj2[key]);
      acc.push(current);
      return acc;
    }
    if (obj1[key] === undefined) {
      current.name = key;
      current.type = 'new';
      current.value = obj2[key];
      acc.push(current);
      return acc;
    }
    if (obj2[key] === undefined) {
      current.name = key;
      current.type = 'deleted';
      current.value = obj1[key];
      acc.push(current);
      return acc;
    }
    if (obj1[key] === obj2[key]) {
      current.name = key;
      current.type = 'same';
      current.value = obj1[key];
      acc.push(current);
      return acc;
    }
    current.name = key;
    current.type = 'changed';
    current.value = [obj1[key], obj2[key]];
    acc.push(current);
    return acc;
  }, []);
  return result;
};

export default buildDiff;
