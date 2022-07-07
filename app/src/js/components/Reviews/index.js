import { reviewsSliderInit } from './reviewsSlider';
import { getContentElement } from './utils';
import { renderReviews } from './render';
import { fetchAll } from './api';
import { buildUrl } from './buildUrl';
import { htmlTemplateNav } from './htmlTemplateNav';

const initReviews = () => {
  const elements = {
    sectionReviews: document.querySelector('[data-reviews="section"]'),
    wrapperReviews: document.querySelector('[data-reviews="wrapper"]'),
    wrapperNav: document.querySelector('[data-reviews="nav"]'),
    links: {
      experience: document.querySelector('[data-reviews="experience-link"]'),
    },
    experienceLink: document.querySelector('[data-reviews="experience-link"]'),
    company: document.querySelector('[data-reviews="company"]'),
    agent_email: document.querySelector('[data-reviews="agent_email"]'),
    email: document.querySelector('[data-reviews="email"]'),
  };
  const configRequest = {
    base: 'https://review.wowmi.us/api/web/api/v1/reviews',
    args: {
      rate_min: 4,
      agent_email: getContentElement(elements.agent_email),
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

  const experienceUrl = buildUrl(experienceUrlConf);

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
