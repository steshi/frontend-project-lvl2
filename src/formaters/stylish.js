const format = (data, replacer = ' ', spaceCount = 4) => {
  const iterTree = (obj, currSpaceCount) => {
    if ((typeof obj !== 'object') || (obj === null)) {
      return `${obj}`;
    }

    const deeplvl = currSpaceCount / spaceCount;
    const indent = `${replacer.repeat(currSpaceCount - 2)}`;
    const bracketIndent = replacer.repeat((deeplvl - 1) * spaceCount);

    if (Array.isArray(obj)) {
      const maped = obj.map((current) => {
        const changedContainerToStr = (container) => {
          const preState = `${indent}- ${container.key}: ${iterTree(container.value[0], currSpaceCount + spaceCount)}`;
          const postState = `${indent}+ ${container.key}: ${iterTree(container.value[1], currSpaceCount + spaceCount)}`;
          return `${preState}\n${postState}`;
        };
        const containerToStr = (container) => {
          const keyValue = `${container.key}: ${iterTree(container.value, currSpaceCount + spaceCount)}`;
          const resultStr = {
            deleted: `${indent}- ${keyValue}`,
            new: `${indent}+ ${keyValue}`,
            obj: `${indent}  ${keyValue}`,
            same: `${indent}  ${keyValue}`,
          };
          return resultStr[container.type];
        };
        return (current.type === 'changed') ? changedContainerToStr(current) : containerToStr(current);
      });
      const resultStr = `{\n${maped.join('\n')}\n${bracketIndent}}`;
      return resultStr;
    }

    const keys = Object.keys(obj);
    const constructor = keys.map((key) => {
      if (typeof obj[key] === 'object') {
        return `${indent}  ${key}: ${iterTree(obj[key], currSpaceCount + spaceCount)}`;
      }
      return `${indent}  ${key}: ${obj[key]}`;
    });
    const str = constructor.join('\n');
    const resultStr = `{\n${str}\n${bracketIndent}}`;
    return resultStr;
  };
  return iterTree(data, spaceCount);
};

export default format;
