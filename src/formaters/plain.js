const normalize = (value) => {
  if ((typeof value === 'object') && (value !== null)) {
    return '[complex value]';
  }
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  return `${value}`;
};
const format = (data) => {
  const iter = (data1, parent) => {
    const reduced = data1.reduce((acc, container) => {
      const currentParrent = (parent === '') ? '' : `${parent}.`;
      const currentProperty = `${currentParrent}${container.name}`;
      const any = {
        changed: `Property '${currentProperty}' was updated. From ${normalize(container.value[0])} to ${normalize(container.value[1])}`,
        deleted: `Property '${currentProperty}' was removed`,
        new: `Property '${currentProperty}' was added with value: ${normalize(container.value)}`,
      };
      if (container.type === 'obj') {
        return [...acc, `${iter(container.value, `${currentProperty}`)}`];
      }
      const newAcc = (container.type === 'same') ? acc : [...acc, any[container.type]];
      return newAcc;
    }, []);
    return reduced.join('\n');
  };

  return iter(data, '');
};

export default format;
