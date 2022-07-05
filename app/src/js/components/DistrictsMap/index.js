const map = document.querySelector('.map');
const mapStates = map.querySelectorAll('.link[data-state]');
const mapStateNames = map.querySelectorAll('path[fill-opacity="0.8"]');
const linkCircles = document.querySelectorAll('.link--circle');
const boxName = document.querySelector('.box-name');
const boxNameCircle = document.querySelector('.box-name--circle');
const boxNameText = document.querySelector('.box-name__text');
const boxNameTextCircle = document.querySelector('.box-name__text--circle');
const container = document.querySelector('.container');
let containerPosition = container.getBoundingClientRect();
let topContainer = Math.round(containerPosition.top);
let leftContainer = Math.round(containerPosition.left);
let statesArray = [];
mapStates.forEach((state) => {
  state.addEventListener('click', (e) => {
    e.preventDefault();
    function hyphenate(str) {
      var replace = '-';
      str = str.toLowerCase().replace(/[\s_\b]/g, replace);
      console.log(str);
      return str;
    }
    window.open('https://www.h2ecowater.com/states/' + hyphenate(state.getAttribute('data-state')));
  });
  state.addEventListener('mouseenter', (e) => {
    const statePath = state.querySelector('path[stroke-width]');
    const stateName = state.querySelector('path[fill-opacity]');
    boxNameText.innerHTML = state.getAttribute('data-state');
    const objStateName = stateName.getBoundingClientRect();
    let top = objStateName.top;
    let left = objStateName.left;
    const yFinish = String(Math.round(top - 45 - topContainer + window.scrollY));
    const xFinish = String(Math.round(left - 10 - leftContainer));
    boxName.style.top = yFinish + 'px';
    boxName.style.left = xFinish + 'px';
    boxName.classList.add('active');
    if (statePath.getAttribute('fill')) {
      statePath.style.cssText = `fill: ${'#54C4EA'}`;
    }
    if (stateName.getAttribute('fill')) {
      stateName.style.cssText = `fill: ${'white'}`;
    }
    boxName.addEventListener(
      'mouseenter',
      () => {
        state.setAttribute('state', 'current-state');
        statesArray.push(state);
        let stateLast = statesArray[statesArray.length - 1];
        statesArray.forEach((states, ind) => {
          if (ind != statesArray.length - 1) {
            const statePaths = states.querySelector('path[stroke-width]');
            const stateNames = states.querySelector('path[fill-opacity]');
            boxName.classList.remove('active');
            if (statePaths.getAttribute('fill')) {
              statePaths.style.cssText = `fill: ${'white'}`;
            }

            if (stateNames.getAttribute('fill')) {
              stateNames.style.cssText = `fill: ${'#001064'}`;
            }
          }
        });
        boxName.setAttribute('href', `${state.getAttribute('data-state')}`);
        boxName.classList.add('active');
        boxName.addEventListener('click', (e) => {
          e.preventDefault();
          function hyphenate(str) {
            var replace = '-';
            str = str.toLowerCase().replace(/[\s_\b]/g, replace);
            console.log(str);
            return str;
          }
          window.open('https://www.h2ecowater.com/states/' + hyphenate(boxName.innerText));
        });
        let statePathlast = stateLast.querySelector('path[stroke-width]');
        let stateNameLast = stateLast.querySelector('path[fill-opacity]');
        if (statePathlast.getAttribute('fill')) {
          statePathlast.style.cssText = `fill: ${'#54C4EA'}`;
        }
        if (stateNameLast.getAttribute('fill')) {
          stateNameLast.style.cssText = `fill: ${'white'}`;
        }
      },
      true,
    );
    boxName.addEventListener('mouseleave', () => {
      statesArray = [];
      state.removeAttribute('state');
      boxName.classList.remove('active');
      if (statePath.getAttribute('fill')) {
        statePath.style.cssText = `fill: ${'white'}`;
      }
      if (stateName.getAttribute('fill')) {
        stateName.style.cssText = `fill: ${'#001064'}`;
      }
    });
  });
});
linkCircles.forEach((link) => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    function hyphenate(str) {
      var replace = '-';
      str = str.toLowerCase().replace(/[\s_\b]/g, replace);
      console.log(str);
      return str;
    }
    window.open('https://www.h2ecowater.com/states/' + hyphenate(link.getAttribute('data-state')));
  });
  link.addEventListener('mouseenter', (e) => {
    statesArray = [];
    const circle = e.currentTarget.querySelector('circle');
    const name = e.currentTarget.querySelector('path');
    boxNameTextCircle.innerHTML = link.getAttribute('data-state');
    const objStateName = name.getBoundingClientRect();
    let top = objStateName.top;
    let left = objStateName.left;
    const yFinish = String(Math.round(top - 45 - topContainer + window.scrollY));
    const xFinish = String(Math.round(left - 10 - leftContainer));
    boxNameCircle.style.top = yFinish + 'px';
    boxNameCircle.style.left = xFinish + 'px';

    boxNameCircle.classList.add('active');

    circle.style.cssText = `fill: ${'#54C4EA'}`;
    name.style.cssText = `fill: ${'white'}`;

    boxNameCircle.addEventListener('mouseenter', () => {
      link.setAttribute('state', 'current-state');
      statesArray.push(link);
      let stateCircleLast = statesArray[statesArray.length - 1];
      statesArray.forEach((states, ind) => {
        if (ind != statesArray.length - 1) {
          const statePaths = states.querySelector('circle');
          const stateNames = states.querySelector('path[fill-opacity]');
          boxNameCircle.classList.remove('active');
          if (statePaths.getAttribute('fill')) {
            statePaths.style.cssText = `fill: ${'white'}`;
          }
          if (stateNames.getAttribute('fill')) {
            stateNames.style.cssText = `fill: ${'#001064'}`;
          }
        }
      });
      boxNameCircle.setAttribute('href', `${link.getAttribute('data-state')}`);
      boxNameCircle.classList.add('active');
      boxNameCircle.addEventListener('click', (e) => {
        e.preventDefault();
        function hyphenate(str) {
          var replace = '-';
          str = str.toLowerCase().replace(/[\s_\b]/g, replace);
          console.log(str);
          return str;
        }
        window.open('https://www.h2ecowater.com/states/' + hyphenate(boxNameCircle.innerText));
      });
      let stateCirclelast = stateCircleLast.querySelector('circle');
      let stateCircleNameLast = stateCircleLast.querySelector('path[fill-opacity]');
      stateCirclelast.style.cssText = `fill: ${'#54C4EA'}`;
      stateCircleNameLast.style.cssText = `fill: ${'white'}`;
    });
    boxNameCircle.addEventListener('mouseleave', () => {
      statesArray = [];
      link.removeAttribute('state');
      boxNameCircle.classList.remove('active');
      if (circle.getAttribute('fill')) {
        circle.style.cssText = `fill: ${'white'}`;
      }
      if (name.getAttribute('fill')) {
        name.style.cssText = `fill: ${'#001064'}`;
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
    circle.style.cssText = `fill: ${'white'}`;
    name.style.cssText = `fill: ${'#001064'}`;
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
      statePath.style.cssText = `fill: ${'white'}`;
    }

    if (stateName.getAttribute('fill')) {
      stateName.style.cssText = `fill: ${'#001064'}`;
    }
  });
});
