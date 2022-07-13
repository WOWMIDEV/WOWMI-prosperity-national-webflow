const renderOption = (option, placeHolder) => {
  const COLOR_TEXT = '#232323';
  const { value } = option;
  const output = placeHolder;

  output.style.color = COLOR_TEXT;
  output.textContent = value;
};

const process = (wrapper) => {
  const elementsSelect = {
    options: wrapper.querySelectorAll('[data-select="option"]'),
    placeHolder: wrapper.querySelector('[data-select="placeholder"]'),
  };

  const { options, placeHolder } = elementsSelect;

  options.forEach((option) => option.addEventListener('click', () => renderOption(option, placeHolder)));
};

export const init = () => {
  const elements = {
    wrapper: document.querySelectorAll('[data-select="wrapper"]'),
  };

  const { wrapper } = elements;

  if (!elements.wrapper) {
    return false;
  }

  wrapper.forEach((selectWrapper) => process(selectWrapper));

  return true;
};

init();
