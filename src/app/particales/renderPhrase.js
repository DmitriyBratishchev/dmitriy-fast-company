export const renderPhrase = (length) => {
  const n = length % 10;
  const exception = [11, 12, 13, 14];
  if (exception.includes(length % 100)) {
    return "человек тусанут";
  } else if (n === 1) {
    return "человек тусанёт";
  }
  return n === 2 || n === 3 || n === 4 ? "человека тусанут" : "человек тусанут";
};

export const renderEnding = (number) => {
  const n = number % 10;
  const exception = [11, 12, 13, 14];
  if (exception.includes(number % 100)) {
    return "";
  } else if (n === 2 || n === 3 || n === 4) {
    return "а";
  } else {
    return "";
  }
};
