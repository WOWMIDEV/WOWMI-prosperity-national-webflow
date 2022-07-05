export const getContentElement = (element) => {
  const hasContent = element && element.textContent !== '';

  return hasContent ? element.textContent : null;
};

export const formatDate = (date) => {
  if (!date) {
    return false;
  }

  const newDate = new Date(date);

  return newDate.toLocaleString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
};

export const rateCls = (rating) => {
  const formattedRating = `${Math.round(+rating * 2) / 2}`;

  return formattedRating.replace('.', '-');
};

export const formatContent = (content) => {
  const MAX_SYMBOLS = 240;

  if (content.length > MAX_SYMBOLS) {
    return `${content.substring(0, 240).trim()} ...`;
  }

  return `${content}`;
};
