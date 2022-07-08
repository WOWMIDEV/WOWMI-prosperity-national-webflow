const WIDTH_MAX = 320;

const getIndents = (width) => {
  switch (true) {
    case width <= 375:
      return 0.025;

    case width >= 479:
      return 0.045;

    default:
      return false;
  }
};

const process = (membersWrapper, memberCardsEls, lastCard) => {
  const wrapper = membersWrapper;

  [...memberCardsEls].forEach((card, index) => {
    card.addEventListener('click', () => {
      setTimeout(() => {
        const { width: wrapperWidth } = membersWrapper.getBoundingClientRect();
        const { offsetLeft } = card;

        if (memberCardsEls[index] === lastCard) {
          wrapper.scrollLeft = membersWrapper.scrollLeft - wrapperWidth + WIDTH_MAX * 2;
        } else {
          wrapper.scrollLeft = offsetLeft - membersWrapper.scrollWidth * getIndents(window.innerWidth);
        }
      }, 300);
    });
  });
};

const init = () => {
  const membersWrapper = document.querySelector('[data-members-cards="list"]');
  const memberCardsEls = document.querySelectorAll('[data-members-cards="item"]');

  if (!membersWrapper || !memberCardsEls) {
    return false;
  }

  const lastCard = memberCardsEls[memberCardsEls.length - 1];

  process(membersWrapper, memberCardsEls, lastCard);

  return true;
};

init();
