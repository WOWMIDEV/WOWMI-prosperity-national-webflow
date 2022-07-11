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
