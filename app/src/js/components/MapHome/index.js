import { template } from './template';
import { process } from './process';

const initMapHome = () => {
  const elements = {
    mapWrapperEl: document.querySelector('[data-map-home="wrapper"]'),
  };

  const { mapWrapperEl } = elements;

  if (!mapWrapperEl) {
    return false;
  }

  mapWrapperEl.insertAdjacentHTML('afterbegin', template());
  process();

  return true;
};

initMapHome();
