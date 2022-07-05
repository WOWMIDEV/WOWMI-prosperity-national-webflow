export const getReviews = async (url) => {
  try {
    const response = await fetch(url);
    const reviews = await response.json();

    if (response.ok && reviews.length > 0) {
      return reviews;
    }

    // eslint-disable-next-line no-console
    console.error(`Error: getting reviews from url: ${url}`);
    return false;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(`Error: getting reviews: ${error.message} from ${url}`);
    return false;
  }
};
