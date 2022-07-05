import { Swiper, Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

Swiper.use([Navigation]);

new Swiper('.awards-slider', {
  slidesPerView: 2,
  spaceBetween: 10,
  slideClass: 'awards-slider__slide',

  navigation: {
    nextEl: '.awards-slider__arrow--next',
    prevEl: '.awards-slider__arrow--prev',
  },
});
