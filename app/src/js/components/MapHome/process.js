const formatToUrl = (str) => str.toLowerCase().replace(/[\s_\b]/g, '-');

const elMouseEvents = (el, name) => {
  const SPACE = 20;
  const state = {
    tooltip: null,
  };

  const getToolTipEl = () => {
    const tooltip = document.createElement('span');

    tooltip.classList.add('tooltip');
    tooltip.textContent = name;

    return tooltip;
  };

  el.addEventListener('mouseenter', () => {
    const tooltip = getToolTipEl();

    state.tooltip = tooltip;
    document.body.append(tooltip);
  });

  el.addEventListener('mousemove', (e) => {
    const { tooltip } = state;

    if (!tooltip) {
      return false;
    }

    const { pageX, pageY } = e;

    tooltip.style.opacity = 1;
    tooltip.style.top = `${pageY - SPACE}px`;

    const bodyWidth = document.body.clientWidth;
    const tooltipWidth = tooltip.clientWidth;
    const borderLimit = tooltipWidth + pageX + SPACE;

    if (borderLimit > bodyWidth) {
      tooltip.style.left = `${pageX - (tooltipWidth + SPACE)}px`;
    } else {
      tooltip.style.left = `${pageX + SPACE}px`;
    }

    return true;
  });

  el.addEventListener('mouseleave', () => {
    const { tooltip } = state;

    tooltip.remove();
    state.tooltip = null;
  });
};

export const process = () => {
  const COLOR_1 = '#F8F8F8';
  const COLOR_2 = '#001064';
  const COLOR_3 = '#07becb';
  const BASE_URL = 'https://prosperity-national.webflow.io/state/';
  const LOCATION = window.location;
  const map = document.querySelector('.map');
  const mapStates = map.querySelectorAll('.link[data-state]');
  const linkCircles = document.querySelectorAll('.link--circle');
  const boxName = document.querySelector('.box-name');
  const boxNameCircle = document.querySelector('.box-name--circle');
  const boxNameText = document.querySelector('.box-name__text');
  const boxNameTextCircle = document.querySelector('.box-name__text--circle');
  let statesArray = [];

  mapStates.forEach((state) => {
    elMouseEvents(state, state.dataset.state);

    state.addEventListener('click', (e) => {
      e.preventDefault();
      LOCATION.href = `${BASE_URL}${formatToUrl(state.getAttribute('data-state'))}`;
    });
    state.addEventListener('mouseenter', () => {
      const statePath = state.querySelector('path[stroke-width]');
      const stateName = state.querySelector('path[fill-opacity]');

      boxNameText.innerHTML = state.getAttribute('data-state');

      if (statePath.getAttribute('fill')) {
        statePath.style.cssText = `fill: ${COLOR_3}`;
      }

      if (stateName.getAttribute('fill')) {
        stateName.style.cssText = `fill: ${COLOR_1}`;
      }

      boxName.addEventListener(
        'mouseenter',
        () => {
          state.setAttribute('state', 'current-state');
          statesArray.push(state);

          const stateLast = statesArray[statesArray.length - 1];

          statesArray.forEach((states, ind) => {
            if (ind !== statesArray.length - 1) {
              const statePaths = states.querySelector('path[stroke-width]');
              const stateNames = states.querySelector('path[fill-opacity]');

              boxName.classList.remove('active');

              if (statePaths.getAttribute('fill')) {
                statePaths.style.cssText = `fill: ${'white'}`;
              }

              if (stateNames.getAttribute('fill')) {
                stateNames.style.cssText = `fill: ${COLOR_2}`;
              }
            }
          });

          boxName.setAttribute('href', `${state.getAttribute('data-state')}`);
          boxName.classList.add('active');
          boxName.addEventListener('click', (boxNameE) => {
            boxNameE.preventDefault();
            LOCATION.href = `${BASE_URL}${formatToUrl(boxName.innerText)}`;
          });

          const statePathlast = stateLast.querySelector('path[stroke-width]');
          const stateNameLast = stateLast.querySelector('path[fill-opacity]');

          if (statePathlast.getAttribute('fill')) {
            statePathlast.style.cssText = `fill: ${COLOR_3}`;
          }

          if (stateNameLast.getAttribute('fill')) {
            stateNameLast.style.cssText = `fill: ${COLOR_1}`;
          }
        },
        true,
      );
      boxName.addEventListener('mouseleave', () => {
        statesArray = [];
        state.removeAttribute('state');
        boxName.classList.remove('active');

        if (statePath.getAttribute('fill')) {
          statePath.style.cssText = `fill: ${COLOR_1}`;
        }

        if (stateName.getAttribute('fill')) {
          stateName.style.cssText = `fill: ${COLOR_2}`;
        }
      });
    });
  });
  linkCircles.forEach((link) => {
    elMouseEvents(link, link.dataset.state);

    link.addEventListener('click', (e) => {
      e.preventDefault();
      LOCATION.href = `${BASE_URL}${formatToUrl(link.getAttribute('data-state'))}`;
    });

    link.addEventListener('mouseenter', (e) => {
      statesArray = [];
      const circle = e.currentTarget.querySelector('circle');
      const name = e.currentTarget.querySelector('path');

      boxNameTextCircle.innerHTML = link.getAttribute('data-state');
      boxNameCircle.classList.add('active');
      circle.style.cssText = `fill: ${COLOR_3}`;
      name.style.cssText = `fill: ${COLOR_1}`;

      boxNameCircle.addEventListener('mouseenter', () => {
        link.setAttribute('state', 'current-state');
        statesArray.push(link);

        const stateCircleLast = statesArray[statesArray.length - 1];

        statesArray.forEach((states, ind) => {
          if (ind !== statesArray.length - 1) {
            const statePaths = states.querySelector('circle');
            const stateNames = states.querySelector('path[fill-opacity]');

            boxNameCircle.classList.remove('active');

            if (statePaths.getAttribute('fill')) {
              statePaths.style.cssText = `fill: ${COLOR_1}`;
            }
            if (stateNames.getAttribute('fill')) {
              stateNames.style.cssText = `fill: ${COLOR_2}`;
            }
          }
        });

        boxNameCircle.setAttribute('href', `${link.getAttribute('data-state')}`);
        boxNameCircle.classList.add('active');
        boxNameCircle.addEventListener('click', (boxNameE) => {
          boxNameE.preventDefault();
          LOCATION.href = `${BASE_URL}${formatToUrl(boxNameCircle.innerText)}`;
        });

        const stateCirclelast = stateCircleLast.querySelector('circle');
        const stateCircleNameLast = stateCircleLast.querySelector('path[fill-opacity]');

        stateCirclelast.style.cssText = `fill: ${COLOR_3}`;
        stateCircleNameLast.style.cssText = `fill: ${COLOR_1}`;
      });
      boxNameCircle.addEventListener('mouseleave', () => {
        statesArray = [];
        link.removeAttribute('state');
        boxNameCircle.classList.remove('active');

        if (circle.getAttribute('fill')) {
          circle.style.cssText = `fill: ${COLOR_1}`;
        }

        if (name.getAttribute('fill')) {
          name.style.cssText = `fill: ${COLOR_2}`;
        }
      });
    });
  });
  linkCircles.forEach((link) => {
    link.addEventListener('mouseleave', (e) => {
      statesArray = [];

      const circle = e.currentTarget.querySelector('circle');
      const name = e.currentTarget.querySelector('path');

      boxNameCircle.classList.remove('active');
      circle.style.cssText = `fill: ${COLOR_1}`;
      name.style.cssText = `fill: ${COLOR_2}`;
    });
  });
  mapStates.forEach((state) => {
    state.addEventListener('mouseleave', () => {
      statesArray = [];
      state.removeAttribute('state');

      const statePath = state.querySelector('path[stroke-width]');
      const stateName = state.querySelector('path[fill-opacity]');

      boxName.classList.remove('active');

      if (statePath.getAttribute('fill')) {
        statePath.style.cssText = `fill: ${COLOR_1}`;
      }

      if (stateName.getAttribute('fill')) {
        stateName.style.cssText = `fill: ${COLOR_2}`;
      }
    });
  });
};
