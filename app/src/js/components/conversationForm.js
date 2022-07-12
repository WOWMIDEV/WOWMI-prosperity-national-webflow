const renderState = (state, placeHolder) => {
  const COLOR_TEXT = '#232323';
  const { value: stateName } = state;
  const output = placeHolder;

  output.style.color = COLOR_TEXT;
  output.textContent = stateName;
};

const process = (elements) => {
  const { states, placeHolder } = elements;

  states.forEach((state) => state.addEventListener('click', () => renderState(state, placeHolder)));
};

export const init = () => {
  const elements = {
    wrapper: document.querySelector('[data-conversation="form"]'),
    states: document.querySelectorAll('input[name="State"]'),
    placeHolder: document.querySelector('.state-placeholder'),
  };

  if (!elements.wrapper) {
    return false;
  }

  process(elements);

  return true;
};

init();
