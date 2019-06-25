const optimizeInclude = (includeArray) => {
  return includeArray.filter((a, i) => {
    return !includeArray.some((b, j) => {
      return i !== j && b.startsWith(a);
    })
  });
};

export { optimizeInclude };
