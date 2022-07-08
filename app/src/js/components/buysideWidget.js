const buysideWidget = () => {
  const DEFAULT_CONFIG = {
    key: '1644440684524367',
    userName: 'askwhosales@phmloans.com',
  };

  const getValue = (key, el) => {
    if (!el) {
      return DEFAULT_CONFIG[key];
    }

    const { textContent } = el;

    return textContent === '' ? DEFAULT_CONFIG[key] : textContent.replace(' ', '');
  };

  const buysideWidgetWrapper = document.querySelector('[data-buyside="widget"]');
  const buysideWidgetLoadProcess = document.querySelector('[data-buyside="load"]');
  const buysideWidgetKeyEl = document.querySelector('[data-buyside="key"]');
  const buysideWidgetUserNameEl = document.querySelector('[data-buyside="username"]');

  if (!buysideWidgetWrapper) {
    return false;
  }

  const buysideWidgetEl = document.createElement('div');
  const scriptApi = document.createElement('script');
  const arrow = `<svg xmlns="http://www.w3.org/2000/svg" width="6" height="11" viewBox="0 0 6 11" fill="none">
                  <path d="M1 9.5L5 5.5L1 1.5"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round">
                  </path>
                </svg>`;

  const buysideConfig = {
    widgetContainerId: 'buyside-widget-container', // Required - ID of the <div> on your page to place the widget
    key: getValue('key', buysideWidgetKeyEl), // Required - the user key you obtained from Buyside
    userName: getValue('userName', buysideWidgetUserNameEl), // Optional or label identifying an individual user (agent)
    inputClass: 'input report__search-input w-input',
    inputPlaceHolder: 'Enter an address to get your market report',
    submitBtnClass: 'button__wrapper',
    submitBtnValue: `Get report <span class="report__arrow">${arrow}</span>`,
    openNewWindow: true,
  };

  const addBuysideWidgetInitConfig = () => {
    setTimeout(() => {
      if (!window.buyside_widget) {
        addBuysideWidgetInitConfig();
      } else {
        // eslint-disable-next-line no-undef
        buyside_widget(buysideConfig);
      }
    }, 400);
  };

  buysideWidgetEl.id = 'buyside-widget-container';
  scriptApi.src = '//api.buyermls.com/widget/buyside-widget-v31.js';

  new Promise((resolve) => {
    buysideWidgetWrapper.append(buysideWidgetEl);
    buysideWidgetWrapper.append(scriptApi);
    setTimeout(() => {
      resolve();
    }, 1000);
  }).then(() => {
    if (buysideWidgetLoadProcess) {
      buysideWidgetLoadProcess.remove();
    }

    addBuysideWidgetInitConfig();
  });

  return true;
};

buysideWidget();
