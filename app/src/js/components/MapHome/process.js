const formatToUrl = (str) => str.toLowerCase().replace(/[\s_\b]/g, '-');

const elMouseEvents = (el, name, config) => {
  const state = { tooltip: null };
  const { space, color1, color2, color3, shape } = config;

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

    if (shape === 'square') {
      const statePath = el.querySelector('path[stroke-width]');
      const stateName = el.querySelector('path[fill-opacity]');

      if (statePath.getAttribute('fill')) {
        statePath.style.cssText = `fill: ${color3}`;
      }

      if (stateName.getAttribute('fill')) {
        stateName.style.cssText = `fill: ${color1}`;
      }
    }

    if (shape === 'circle') {
      const circle = el.querySelector('circle');
      const path = el.querySelector('path');
      circle.style.cssText = `fill: ${color3}`;
      path.style.cssText = `fill: ${color1}`;
    }
  });

  el.addEventListener('mousemove', (e) => {
    const { tooltip } = state;

    if (!tooltip) {
      return false;
    }

    const { pageX, pageY } = e;

    tooltip.style.opacity = 1;
    tooltip.style.top = `${pageY - space}px`;

    const bodyWidth = document.body.clientWidth;
    const tooltipWidth = tooltip.clientWidth;
    const borderLimit = tooltipWidth + pageX + space;

    if (borderLimit > bodyWidth) {
      tooltip.style.left = `${pageX - (tooltipWidth + space)}px`;
    } else {
      tooltip.style.left = `${pageX + space}px`;
    }
    return true;
  });

  el.addEventListener('mouseleave', () => {
    const { tooltip } = state;

    tooltip.remove();
    state.tooltip = null;

    if (shape === 'square') {
      el.removeAttribute('state');

      const statePath = el.querySelector('path[stroke-width]');
      const stateName = el.querySelector('path[fill-opacity]');

      if (statePath.getAttribute('fill')) {
        statePath.style.cssText = `fill: ${color1}`;
      }

      if (stateName.getAttribute('fill')) {
        stateName.style.cssText = `fill: ${color2}`;
      }
    }

    if (shape === 'circle') {
      const circle = el.querySelector('circle');
      const path = el.querySelector('path');
      circle.style.cssText = `fill: ${color1}`;
      path.style.cssText = `fill: ${color2}`;
    }
  });
};

export const process = () => {
  const config = {
    color1: '#F8F8F8',
    color2: '#232323',
    color3: '#07becb',
    baseUrl: 'https://prosperity-national.webflow.io/state/',
    location: window.location,
    space: 20,
    shape: null,
  };

  const map = document.querySelector('.map');
  const mapStates = map.querySelectorAll('.link[data-state]');
  const linkCircles = document.querySelectorAll('.link--circle');
  const { location, baseUrl } = config;

  mapStates.forEach((state) => {
    config.shape = 'square';
    elMouseEvents(state, state.dataset.state, config);

    state.addEventListener('click', (e) => {
      e.preventDefault();
      location.href = `${baseUrl}${formatToUrl(state.getAttribute('data-state'))}`;
    });
  });

  linkCircles.forEach((link) => {
    config.shape = 'circle';
    elMouseEvents(link, link.dataset.state, config);

    link.addEventListener('click', (e) => {
      e.preventDefault();
      location.href = `${baseUrl}${formatToUrl(link.getAttribute('data-state'))}`;
    });
  });
};
