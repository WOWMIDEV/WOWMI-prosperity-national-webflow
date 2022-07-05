import { htmlTemplateReview } from './htmlTemplateReview';

const htmlReviews = (reviews) => reviews.map((review) => htmlTemplateReview(review)).join('');

export const renderReviews = (elements, reviews) => {
  const { sectionYelp, terms } = elements;

  Object.keys(terms).forEach((term) => {
    const termReviews = reviews.filter((review) => review.term === term);
    const wrapperTerm = terms[term];

    if (!wrapperTerm) {
      sectionYelp.remove();
      // eslint-disable-next-line no-console
      console.warn(`No wrapper for term ${term}`);
    }

    wrapperTerm.innerHTML = '';
    wrapperTerm.insertAdjacentHTML('afterbegin', htmlReviews(termReviews));
  });
};
