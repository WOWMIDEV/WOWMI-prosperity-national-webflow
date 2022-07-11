export const subString = (content, max = 240) => {
  if (content.length > max) {
    return `${content.substring(0, max).trim()} ...`;
  }

  return `${content}`;
};
