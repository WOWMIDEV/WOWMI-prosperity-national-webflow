export const getContentElement = (element) => {
  const hasContent = element && element.textContent !== '';

  if (hasContent) {
    return element.textContent;
  }

  // eslint-disable-next-line no-console
  console.warn(`Not element: ${element}`);
  return null;
};

export const rateCls = (rating) => {
  const formattedRating = `${Math.round(+rating * 2) / 2}`;

  return formattedRating.replace('.', '-');
};

export const formatPhoneNumber = (phoneNumberString) => {
  const cleaned = phoneNumberString.replace(/\D+/g, '');
  const match = cleaned.match(/^1(\d{3})(\d{3})(\d{4})$/);

  if (match) {
    return `(${match[1]}) ${match[2]}-${match[3]}`;
  }

  return null;
};
