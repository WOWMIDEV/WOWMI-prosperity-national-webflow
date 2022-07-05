const scrollUp = () => {
  const buttonForScroll = document.querySelector('.btn-up');

  if (!buttonForScroll) {
    return false;
  }

  buttonForScroll.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  return true;
};

scrollUp();
