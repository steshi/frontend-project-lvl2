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
      const currentProp = `${currentParrent}${container.key}`;
      let current;

      if (container.type === 'changed') {
        current = `Property '${currentProp}' was updated. From ${normalize(container.value[0])} to ${normalize(container.value[1])}`;
        return [...acc, current];
      }
      if (container.type === 'deleted') {
        current = `Property '${currentProp}' was removed`;
        return [...acc, current];
      }
      if (container.type === 'new') {
        current = `Property '${currentProp}' was added with value: ${normalize(container.value)}`;
        return [...acc, current];
      }
      if (container.type === 'obj') {
        current = `${iter(container.value, `${currentProp}`)}`;
        return [...acc, current];
      }
      return acc;
    }, []);
    return reduced.join('\n');
  };

  return iter(data, '');
};

export default format;
