export const getUniqueCategories = (posts) => {
  const categorySet = new Set();
  posts.forEach(({ categories }) => categories.forEach((category) => categorySet.add(category)));
  return [...categorySet].sort((a, b) => {
    if (a === 'featured') return -1;
    if (b === 'featured') return 1;
    return 0;
  });
};

export const throttle = (callback, delay = 100) => {
  let timerId = null;
  return (event) => {
    if (timerId) return;
    timerId = setTimeout(() => {
      callback(event);
      clearTimeout(timerId);
      timerId = null;
    }, delay);
  };
};
