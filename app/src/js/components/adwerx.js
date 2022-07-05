const adwerx = () => {
  const adwerxEmailEl = document.querySelector('[data-adwerx="email"]');

  if (!adwerxEmailEl) {
    return false;
  }

  const adwerxEmail = adwerxEmailEl.textContent;
  const script = document.createElement('script');

  script.src = `https://pixel.adwerx.com/prosperity/${adwerxEmail}/awp.js`;

  document.body.append(script);

  return true;
};

adwerx();
