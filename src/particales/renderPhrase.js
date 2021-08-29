export const renderPhrase = (length) => {
  const n = length % 10;
  const exception = [11, 12, 13, 14];
  if (exception.includes(length % 100)) {
    return "человек тусанут";
  } else if (n === 1) {
    return "человек тусанёт";
  }
  return n === 2 || n === 3 || n === 4 ? "человека тусанёт" : "человек тусанут";
};
