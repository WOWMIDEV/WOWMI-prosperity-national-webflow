import { formatDate, getContentElement, rateCls, formatContent } from './utils';
import experienceLogo from '../../../img/experience-logo.png';

const getDate = (date) => {
  const formattedDate = formatDate(date);
  return formattedDate ? `<div class="reviews__date">${formattedDate}</div>` : '';
};

export const htmlTemplateReview = (review) => {
  const {
    date,
    links,
    first_name: firstName,
    last_name: lastName,
    extra_data: extraData,
    city,
    content,
    state,
    service,
    rating,
  } = review;
  const link = getContentElement(links[service]) ?? '#';
  const name = `${firstName} ${lastName[0] ?? ''}.`;
  const abbr = `${firstName[0] ?? 'R'}${lastName[0] ?? 'W'}`;
  const location = [city, state].join(', ');

  const extraDataContent = JSON.parse(extraData);
  const { agent_name: agentEmail } = extraDataContent.serviceProviderInfo;

  return `<div class="reviews__slide swiper-slide">
              <div class="reviews__header">
                  <div class="reviews__user-info">
                      <div class="reviews__user-img">
                          <div class="reviews__-user-symbols">${abbr}</div>
                      </div>
                      <div>
                          <div class="reviews__name">${name}</div>
                          <div class="reviews__stars reviews__stars--${rateCls(rating)}"></div>
                      </div>
                  </div>
                  <div>
                      <div class="reviews__city">${location}</div>
                      <div class="reviews__date">${getDate(date)}</div>
                  </div>
              </div>

              <!-- content -->
              <div class="reviews__content">
                <p class="reviews__text">${formatContent(content)}</p>
              </div>

              <div class="reviews__footer">

                <!-- total reviews -->
<!--                <a href="#" class="reviews__link"></a>-->
                <small>${agentEmail}</small>

                <!-- link all reviews -->
                <a href="${link}" target="_blank">
                <img
                  src="${experienceLogo}"
                  loading="lazy"
                  alt="experience"
                  width="64px"/>
                </a>
              </div>
          </div>`;
};
