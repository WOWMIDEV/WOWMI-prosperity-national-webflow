import { Swiper, Navigation, Pagination, Autoplay } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

Swiper.use([Navigation, Pagination, Autoplay]);

export const reviewsSliderInit = () => {
  new Swiper('.reviews__slider', {
    slidesPerView: 2,
    spaceBetween: 20,
    loop: true,
    speed: 1000,
    autoplay: {
      delay: 5000,
    },
    navigation: {
      nextEl: '.slider__arrow--next',
      prevEl: '.slider__arrow--prev',
    },
    pagination: {
      el: '.reviews__pagination',
      clickable: true,
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 20,
        pagination: {
          el: '.reviews__pagination',
          clickable: true,
          dynamicBullets: true,
          dynamicMainBullets: 3,
        },
      },
      375: {
        slidesPerView: 1,
        spaceBetween: 20,
        pagination: {
          el: '.reviews__pagination',
          clickable: true,
          dynamicBullets: true,
          dynamicMainBullets: 3,
        },
      },
      490: {
        slidesPerView: 1,
        spaceBetween: 20,
        pagination: {
          el: '.reviews__pagination',
          clickable: true,
          dynamicBullets: true,
          dynamicMainBullets: 3,
        },
      },
      575: {
        slidesPerView: 1,
        spaceBetween: 20,
        pagination: {
          el: '.reviews__pagination',
          clickable: true,
          dynamicBullets: true,
          dynamicMainBullets: 3,
        },
      },
      768: {
        slidesPerView: 1,
        spaceBetween: 20,
        pagination: {
          el: '.reviews__pagination',
          clickable: true,
          dynamicBullets: true,
          dynamicMainBullets: 3,
        },
      },
      990: {
        slidesPerView: 1,
        spaceBetween: 20,
        pagination: {
          el: '.reviews__pagination',
          clickable: true,
          dynamicBullets: true,
          dynamicMainBullets: 4,
        },
      },
      991: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
    },
  });
};
