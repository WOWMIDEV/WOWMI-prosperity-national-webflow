const switchOverflowForBody = (state) => {
  document.body.style.overflow = state;
};

const navBarBtnHandler = (isNavBarBtnAccess, navBarBtn) => {
  if (!isNavBarBtnAccess()) {
    return false;
  }
  const isNavOpen = navBarBtn.classList.contains('w--open');
  const stateOverflow = !isNavOpen ? 'hidden' : 'auto';

  switchOverflowForBody(stateOverflow);

  return true;
};

const overflowBodyForOpenMenu = () => {
  const navBarBtn = document.querySelector('.navbar__btn');
  const pageOverlay = document.querySelector('.page-overlay');

  if (!navBarBtn || !pageOverlay) {
    return false;
  }

  const isNavBarBtnAccess = () => getComputedStyle(navBarBtn).display === 'block';

  navBarBtn.addEventListener('click', () => navBarBtnHandler(isNavBarBtnAccess, navBarBtn));
  pageOverlay.addEventListener('click', () => navBarBtnHandler(isNavBarBtnAccess, navBarBtn));

  window.addEventListener('resize', () => {
    if (window.innerWidth > 991) {
      switchOverflowForBody('auto');
    }
  });

  return true;
};
overflowBodyForOpenMenu();
