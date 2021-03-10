import _ from 'lodash';

const stringify = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  if (_.isString(value)) {
    return `'${value}'`;
  }
  return `${value}`;
};

const format = (data) => {
  const iter = (data1, parent) => {
    const maped = data1.map((container) => {
      const currentParrent = (parent === '') ? '' : `${parent}.`;
      const currentProperty = `${currentParrent}${container.name}`;
      const any = {
        changed: `Property '${currentProperty}' was updated. From ${stringify(container.value[0])} to ${stringify(container.value[1])}`,
        deleted: `Property '${currentProperty}' was removed`,
        new: `Property '${currentProperty}' was added with value: ${stringify(container.value)}`,
      };
      if (container.type === 'obj') {
        return [`${iter(container.value, `${currentProperty}`)}`];
      }
      return (container.type === 'same') ? '' : [any[container.type]];
    });
    const result = maped
      .filter((str) => str !== '')
      .join('\n');
    return result;
  };

  return iter(data, '');
};

export default format;
