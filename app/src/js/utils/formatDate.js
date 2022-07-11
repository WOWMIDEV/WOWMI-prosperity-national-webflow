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
