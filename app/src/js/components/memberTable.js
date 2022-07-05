const tableButtonsPhoneShow = document.querySelectorAll('[data-table="phone"]');
const tableButtonsSocialShow = document.querySelectorAll('[data-table="social"]');

const memberPhones = document.querySelectorAll('.member-table__phone');
const memberSocials = document.querySelectorAll('.member-table__socials');

memberSocials.forEach((social) => {
  social.classList.add('js--hidden');
});

const showMembersPhone = () => {
  tableButtonsSocialShow.forEach((button) => {
    button.classList.remove('js--active');
  });

  tableButtonsPhoneShow.forEach((button) => {
    button.classList.add('js--active');
  });

  memberPhones.forEach((phone) => {
    phone.classList.remove('js--hidden');
    phone.classList.add('js--show');
  });

  memberSocials.forEach((social) => {
    social.classList.add('js--hidden');
    social.classList.remove('js--show');
  });
};

const showMembersSocials = () => {
  tableButtonsSocialShow.forEach((button) => {
    button.classList.add('js--active');
  });

  tableButtonsPhoneShow.forEach((button) => {
    button.classList.remove('js--active');
  });

  memberPhones.forEach((phone) => {
    phone.classList.remove('js--show');
    phone.classList.add('js--hidden');
  });

  memberSocials.forEach((social) => {
    social.classList.remove('js--hidden');
    social.classList.add('js--show');
  });
};

tableButtonsPhoneShow.forEach((button) => {
  button.addEventListener('click', showMembersPhone);
});

tableButtonsSocialShow.forEach((button) => {
  button.addEventListener('click', showMembersSocials);
});
