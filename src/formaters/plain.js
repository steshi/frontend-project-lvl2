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
      const currentProperty = `${currentParrent}${container.name}`;
      const temp = acc;
      if (container.type === 'changed') {
        acc.push(`Property '${currentProperty}' was updated. From ${normalize(container.value[0])} to ${normalize(container.value[1])}`);
      }
      if (container.type === 'deleted') {
        acc.push(`Property '${currentProperty}' was removed`);
      }
      if (container.type === 'new') {
        acc.push(`Property '${currentProperty}' was added with value: ${normalize(container.value)}`);
      }
      if (container.type === 'obj') {
        acc.push(`${iter(container.value, `${currentProperty}`)}`);
      }
      return (temp === acc) ? temp : acc;
    }, []);
    return reduced.join('\n');
  };

  return iter(data, '');
};

export default format;
