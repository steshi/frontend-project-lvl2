const format = (data, replacer = ' ', spaceCount = 4) => {
  const iterTree = (obj, currSpaceCount) => {
    if ((typeof obj !== 'object') || (obj === null)) {
      return `${obj}`;
    }

    const deeplvl = currSpaceCount / spaceCount;
    const positiveIndent = `${replacer.repeat(currSpaceCount - 2)}+ `;
    const negativeIndent = `${replacer.repeat(currSpaceCount - 2)}- `;
    const neutralIndent = `${replacer.repeat(currSpaceCount - 2)}  `;
    const bracketIndent = replacer.repeat((deeplvl - 1) * spaceCount);

    if (Array.isArray(obj)) {
      const maped = obj.map((container) => {
        if (container.type === 'changed') {
          const preState = `${negativeIndent}${container.key}: ${iterTree(container.value[0], currSpaceCount + spaceCount)}`;
          const postState = `${positiveIndent}${container.key}: ${iterTree(container.value[1], currSpaceCount + spaceCount)}`;
          return `${preState}\n${postState}`;
        }
        if (container.type === 'deleted') {
          return `${negativeIndent}${container.key}: ${iterTree(container.value, currSpaceCount + spaceCount)}`;
        }
        if (container.type === 'new') {
          return `${positiveIndent}${container.key}: ${iterTree(container.value, currSpaceCount + spaceCount)}`;
        }
        if (container.type !== 'obj') {
          return `${neutralIndent}${container.key}: ${iterTree(container.value, currSpaceCount + spaceCount)}`;
        }
        return `${neutralIndent}${container.key}: ${iterTree(container.value, currSpaceCount + spaceCount)}`;
      });
      const resultStr = `{\n${maped.join('\n')}\n${bracketIndent}}`;
      return resultStr;
    }

    const keys = Object.keys(obj);
    const constructor = keys.map((key) => {
      if (typeof obj[key] === 'object') {
        return `${neutralIndent}${key}: ${iterTree(obj[key], currSpaceCount + spaceCount)}`;
      }
      return `${neutralIndent}${key}: ${obj[key]}`;
    });
    const str = constructor.join('\n');

    const resultStr = `{\n${str}\n${bracketIndent}}`;
    return resultStr;
  };
  return iterTree(data, spaceCount);
};

export default format;
