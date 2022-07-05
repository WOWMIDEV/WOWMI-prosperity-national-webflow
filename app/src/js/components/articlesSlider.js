import { Pagination, Navigation, Swiper, Autoplay } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const articlesSlider = (className) => {
  Swiper.use([Navigation, Pagination, Autoplay]);

  new Swiper(className, {
    speed: 600,
    navigation: {
      nextEl: '.articles-swiper__arrow-next',
      prevEl: '.articles-swiper__arrow-prev',
    },
    breakpoints: {
      375: {
        slidesPerView: 1,
        spaceBetween: 20,
        pagination: {
          el: '.article__swiper-pagination',
          clickable: true,
          dynamicBullets: true,
          dynamicMainBullets: 3,
        },
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 20,
        pagination: {
          el: '.article__swiper-pagination',
          clickable: true,
          dynamicBullets: true,
          dynamicMainBullets: 3,
        },
      },
      991: {
        slidesPerView: 2,
        spaceBetween: 20,
        pagination: {
          el: '.article__swiper-pagination',
          clickable: true,
          dynamicBullets: true,
          dynamicMainBullets: 3,
        },
      },
    },
  });
};

const initArticlesSlider = () => {
  const ARTICLES_SLIDER_CLASS = '.articles__swiper';
  const elements = {
    articlesSwiperEl: document.querySelector(ARTICLES_SLIDER_CLASS),
  };

  const { articlesSwiperEl } = elements;

  if (!articlesSwiperEl) {
    return false;
  }

  articlesSlider(ARTICLES_SLIDER_CLASS);

  return true;
};

initArticlesSlider();
