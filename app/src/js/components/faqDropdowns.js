import Dropdowns from '../plugins/Dropdowns';

const faqDropdowns = new Dropdowns({
  dropdownSelector: '.faq__item',
  contentSelector: '.faq__content',
});

faqDropdowns.init();
