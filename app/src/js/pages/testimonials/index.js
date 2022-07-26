import { getContentElement, buildReviewsUrl } from '../../utils';
import { fetchAll } from '../../api';

import { renderReviews } from './renderReviews';

const initReviews = () => {
  const elements = {
    wrapperReviews: document.querySelector('[data-testimonials="wrapper"]'),
    links: {
      experience: document.querySelector('[data-reviews="experience-link"]'),
    },
    company: document.querySelector('[data-reviews="company"]'),
    email: document.querySelector('[data-reviews="email"]'),
  };

  const configRequest = {
    base: 'https://services.wowmi.us/api/web/api/v1/reviews',
    args: {
      rate_min: 4,
      random: true,
    },
  };

  const { wrapperReviews } = elements;

  if (!wrapperReviews) {
    return false;
  }

  // EXPERIENCE CONFIG
  const experienceUrlConf = {
    serviceName: 'experience',
    serviceArgs: {
      email: getContentElement(elements.email),
    },
    commonArgs: {
      company: getContentElement(elements.company),
      ...configRequest.args,
    },
    base: configRequest.base,
  };

  // URLS
  const experienceUrl = buildReviewsUrl(experienceUrlConf);
  const urls = [experienceUrl].filter((url) => url);

  // PROCESS GETTING REVIEWS
  fetchAll(urls)
    .then((responseData) => {
      const mergedData = responseData
        .map(({ data, error, url }) => {
          if (error) {
            // eslint-disable-next-line no-console
            console.warn(`Error: ${error} from ${url}`);
            return false;
          }

          return data;
        })
        .flat();

      if (mergedData.includes(false)) {
        // eslint-disable-next-line no-console
        console.log('Merged data error');
        return null;
      }

      return mergedData;
    })
    .then((reviews) => {
      if (reviews.length === 0) {
        // eslint-disable-next-line no-console
        console.warn('No reviews');

        return false;
      }

      const reviewsSortedByDate = reviews.sort((a, b) => {
        if (a.date < b.date) {
          return -1;
        }
        if (a.date > b.date) {
          return 1;
        }
        return 0;
      });

      renderReviews(elements, reviewsSortedByDate);

      return true;
    });

  return true;
};

initReviews();
