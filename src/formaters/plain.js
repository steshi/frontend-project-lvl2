const normalize = (value) => {
  if (value === null) {
    return `${value}`;
  }
  switch (typeof value) {
    case 'string':
      return `'${value}'`;
    case 'object':
      return '[complex value]';
    default:
      return `${value}`;
  }
};
const format = (data) => {
  const iter = (data1, parent) => {
    const reduced = data1.reduce((acc, container) => {
      const currentParrent = (parent === '') ? '' : `${parent}.`;
      const currentProperty = `${currentParrent}${container.key}`;

      if (container.type === 'changed') {
        return [...acc, `Property '${currentProperty}' was updated. From ${normalize(container.value[0])} to ${normalize(container.value[1])}`];
      }
      if (container.type === 'deleted') {
        return [...acc, `Property '${currentProperty}' was removed`];
      }
      if (container.type === 'new') {
        return [...acc, `Property '${currentProperty}' was added with value: ${normalize(container.value)}`];
      }
      if (container.type === 'obj') {
        return [...acc, `${iter(container.value, `${currentProperty}`)}`];
      }
      return acc;
    }, []);
    return reduced.join('\n');
  };

  return iter(data, '');
};

export default format;
