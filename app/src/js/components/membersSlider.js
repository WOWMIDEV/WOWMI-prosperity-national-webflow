import { Swiper } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const elements = {
  memberSliderInner: document.querySelector('.members-slider__inner'),
  slides: document.querySelectorAll('.member-slider__slide-wrapper'),
};

const customSizeForMemberSlider = () => {
  const onMembersSlideMouseenter = (event) => {
    const slideWidthRatio = 4;
    const { target } = event;
    const { memberSliderInner } = elements;

    let amountOfSlidesToLastVisibleSlide = -1;
    let slideToCheck = target;

    while (slideToCheck?.classList.contains('swiper-slide-visible')) {
      slideToCheck = slideToCheck.nextElementSibling;
      amountOfSlidesToLastVisibleSlide += 1;
    }

    if (amountOfSlidesToLastVisibleSlide >= 0 && amountOfSlidesToLastVisibleSlide < slideWidthRatio) {
      const slideWidth = target.offsetWidth;
      const slideInlineMargin = parseInt(getComputedStyle(target).marginRight, 10);
      const slideItemFullWidth = slideWidth + slideInlineMargin;

      const moveToLength = slideItemFullWidth * (slideWidthRatio - 1 - amountOfSlidesToLastVisibleSlide);
      memberSliderInner.style.transform = `translateX(-${moveToLength}px)`;
    }
  };

  const onMembersSlideMouseleave = () => {
    const { memberSliderInner } = elements;
    memberSliderInner.style.transform = 'translateX(0)';
  };

  const initMembersSlided = () => {
    const { slides, memberSliderInner } = elements;

    if (!memberSliderInner) {
      return false;
    }

    [...slides].forEach((slide) => {
      slide.addEventListener('mouseenter', onMembersSlideMouseenter);
      slide.addEventListener('mouseleave', onMembersSlideMouseleave);
    });

    return true;
  };

  initMembersSlided();
};

const membersSlider = new Swiper('.members-slider__inner', {
  spaceBetween: 20,
  slidesPerGroup: 8,
  slidesPerView: 'auto',
  watchSlidesProgress: true,
  slideClass: 'member-slider__slide-wrapper',

  navigation: {
    nextEl: '.member-slider__arrow--next',
    prevEl: '.member-slider__arrow--prev',
  },
  breakpoints: {
    320: {
      spaceBetween: 20,
      slidesPerGroup: 2,
      slidesPerView: 'auto',
      watchSlidesProgress: true,
      slideClass: 'member-slider__slide-wrapper',
    },
    375: {
      spaceBetween: 20,
      slidesPerGroup: 2,
      slidesPerView: 'auto',
      watchSlidesProgress: true,
      slideClass: 'member-slider__slide-wrapper',
    },
    490: {
      spaceBetween: 20,
      slidesPerGroup: 4,
      slidesPerView: 'auto',
      watchSlidesProgress: true,
      slideClass: 'member-slider__slide-wrapper',
    },
    575: {
      spaceBetween: 20,
      slidesPerGroup: 4,
      slidesPerView: 'auto',
      watchSlidesProgress: true,
      slideClass: 'member-slider__slide-wrapper',
    },
    768: {
      spaceBetween: 20,
      slidesPerGroup: 8,
      slidesPerView: 'auto',
      watchSlidesProgress: true,
      slideClass: 'member-slider__slide-wrapper',
    },
    990: {
      spaceBetween: 20,
      slidesPerGroup: 8,
      slidesPerView: 'auto',
      watchSlidesProgress: true,
      slideClass: 'member-slider__slide-wrapper',
    },
    991: {
      spaceBetween: 20,
      slidesPerGroup: 8,
      slidesPerView: 'auto',
      watchSlidesProgress: true,
      slideClass: 'member-slider__slide-wrapper',
    },
  },
});

const { slides } = elements;

const addRemoveCloseSlideButton = (slide, action = 'remove') => {
  if (window.innerWidth > 1024) {
    return false;
  }

  const closeButton = slide.querySelector('.member__close');

  if (closeButton || action === 'remove') {
    closeButton.remove();
  }

  if (action === 'add') {
    const newCloseButton = document.createElement('div');
    newCloseButton.classList.add('member__close');
    newCloseButton.innerHTML = '&times;';
    slide.append(newCloseButton);
  }

  return true;
};

slides.forEach((slide) => {
  slide.addEventListener('mouseover', () => {
    addRemoveCloseSlideButton(slide, 'add');
    slide.classList.add('js--open');
  });
  slide.addEventListener('mouseout', () => {
    addRemoveCloseSlideButton(slide, 'remove');
    slide.classList.remove('js--open');
  });
});

membersSlider.on('init', () => {
  slides[0].classList.add('js--open');
});

customSizeForMemberSlider();
