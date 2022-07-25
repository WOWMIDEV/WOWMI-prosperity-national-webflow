import { fetchAll } from '../../api';
import { getContentElement, buildReviewsUrl } from '../../utils';

import { renderReviews } from './render';
import { htmlTemplateNav } from './htmlTemplateNav';
import { reviewsSliderInit } from './reviewsSlider';

const initReviews = () => {
  const elements = {
    sectionReviews: document.querySelector('[data-reviews="section"]'),
    wrapperReviews: document.querySelector('[data-reviews="wrapper"]'),
    wrapperNav: document.querySelector('[data-reviews="nav"]'),
    reviewsRandom: document.querySelector('[data-reviews-random="true"]'),
    links: {
      experience: document.querySelector('[data-reviews="experience-link"]'),
    },
    company: document.querySelector('[data-reviews="company"]'),
    agent_email: document.querySelector('[data-reviews="agent_email"]'),
    email: document.querySelector('[data-reviews="email"]'),
  };
  const isRandomReviews = elements.sectionReviews?.dataset.reviewsRandom ?? false;
  const configRequest = {
    base: 'https://services.wowmi.us/api/web/api/v1/reviews',
    args: {
      rate_min: 4,
      agent_email: getContentElement(elements.agent_email),
      random: isRandomReviews,
    },
  };

  const { sectionReviews, wrapperNav } = elements;
  if (!sectionReviews) {
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

  const experienceUrl = buildReviewsUrl(experienceUrlConf);

  console.log('URL', experienceUrl);

  // URLS
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
        sectionReviews.remove();
        return null;
      }

      return mergedData;
    })
    .then((reviews) => {
      if (reviews.length === 0) {
        // eslint-disable-next-line no-console
        console.warn('No reviews');

        sectionReviews.remove();

        return false;
      }

      wrapperNav.insertAdjacentHTML('afterbegin', htmlTemplateNav());
      renderReviews(elements, reviews);

      return true;
    })
    .then((success) => {
      if (success) reviewsSliderInit();
    });

  return true;
};

initReviews();
