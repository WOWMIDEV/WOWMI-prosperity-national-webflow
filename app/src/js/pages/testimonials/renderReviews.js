import { htmlTemplateReview } from './htmlTemplateReview';

const htmlReviews = (elements, reviews) => {
  const { links } = elements;

  return reviews.map((review) => htmlTemplateReview({ ...review, links })).join('');
};

export const renderReviews = (elements, reviews) => {
  const { wrapperReviews } = elements;

  wrapperReviews.innerHTML = '';
  wrapperReviews.insertAdjacentHTML('afterbegin', htmlReviews(elements, reviews));
};
