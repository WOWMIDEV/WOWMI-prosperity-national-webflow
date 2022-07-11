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

const renderTotal = ({ membersHiddenList, membersTotal, membersCount }) => {
  const totalMembers = membersHiddenList.childElementCount;

  if (totalMembers <= 0) {
    membersTotal.remove();
    return true;
  }

  const membersCountEl = membersCount;

  membersCountEl.textContent = `+${totalMembers}`;
  return true;
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
  const elements = {
    membersWrapper: document.querySelector('[data-members-cards="list"]'),
    memberCardsEls: document.querySelectorAll('[data-members-cards="item"]'),
    membersHiddenList: document.querySelector('[data-members="hidden-list"]'),
    membersTotal: document.querySelector('[data-members="total"]'),
    membersCount: document.querySelector('[data-members="count"]'),
  };

  const { membersWrapper, memberCardsEls } = elements;

  if (!membersWrapper || !memberCardsEls) {
    return false;
  }

  const lastCard = memberCardsEls[memberCardsEls.length - 1];

  process(membersWrapper, memberCardsEls, lastCard);
  renderTotal(elements);

  return true;
};

init();
