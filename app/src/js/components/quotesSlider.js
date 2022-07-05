import { Swiper, Autoplay } from 'swiper';
import 'swiper/css';

/* QUOTES SLIDER */

Swiper.use([Autoplay]);

new Swiper('.quotes-slider', {
  slidesPerView: 1,
  spaceBetween: 0,
  speed: 1000,
  effect: 'slide',
  autoplay: {
    delay: 5000,
  },
});
