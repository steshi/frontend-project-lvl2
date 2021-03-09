import _ from 'lodash';

const nodeType = (obj1, obj2, key) => {
  if (!_.has(obj1, key)) {
    return 'new';
  }
  if (!_.has(obj2, key)) {
    return 'deleted';
  }
  if (obj1[key] === obj2[key]) {
    return 'same';
  }
  return 'changed';
};

const buildDiff = (obj1, obj2) => {
  const keysObj1 = Object.keys(obj1);
  const keysObj2 = Object.keys(obj2);
  const concatKeys = [...keysObj1, ...keysObj2];
  const uniqeKeys = Array.from(new Set(concatKeys));
  const sorted = _.orderBy(uniqeKeys);
  const result = sorted.map((key) => {
    if ((typeof obj1[key] === 'object') && (typeof obj2[key] === 'object')) {
      return { name: key, type: 'obj', value: buildDiff(obj1[key], obj2[key]) };
    }
    switch (nodeType(obj1, obj2, key)) {
      case 'new':
        return { name: key, type: 'new', value: obj2[key] };
      case 'deleted':
        return { name: key, type: 'deleted', value: obj1[key] };
      case 'same':
        return { name: key, type: 'same', value: obj1[key] };
      default:
        return { name: key, type: 'changed', value: [obj1[key], obj2[key]] };
    }
  });
  return result;
};

export default buildDiff;
