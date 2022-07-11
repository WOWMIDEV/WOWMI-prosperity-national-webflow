export const getRateClass = (rating) => {
  const formattedRating = `${Math.round(+rating * 2) / 2}`;

  return formattedRating.replace('.', '-');
};
