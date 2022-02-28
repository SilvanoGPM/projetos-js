const $info = document.querySelector('[data-js="info"]');

const $boxesContainer = document.querySelector('[data-js="boxesContainer"]');

const $cubeColor = document.querySelector('[data-js="cubeColor"]');

const $cubeBottomColor = document.querySelector('[data-js="cubeBottomColor"]');

const $sizeSelect = document.querySelector('[data-js="sizeSelect"]');

const $durationSelect = document.querySelector('[data-js="durationSelect"]');

const $revertAnimation = document.querySelector('[data-js="revertAnimation"]');

$boxesContainer.addEventListener('click', (event) => {
  const box = document.createElement('div');
  const wrapper = document.createElement('div');

  const top = document.createElement('div');

  const side0 = document.createElement('span');
  const side1 = document.createElement('span');
  const side2 = document.createElement('span');
  const side3 = document.createElement('span');

  const container = event.target.getBoundingClientRect();

  box.classList.add('cube');
  box.style.setProperty('--x', event.clientX + 'px');
  box.style.setProperty('--y', (event.clientY - container.top) + 'px');
  box.style.setProperty('--size', $sizeSelect.value);
  box.style.setProperty('--color', $cubeColor.value);
  box.style.setProperty('--animation', `rotating ${$durationSelect.value} ${$revertAnimation.checked ? 'reverse' : ''} linear infinite`);

  top.classList.add('top');
  top.style.setProperty('--bottom-color', $cubeBottomColor.value);

  side0.style.setProperty('--i', 0);
  side1.style.setProperty('--i', 1);
  side2.style.setProperty('--i', 2);
  side3.style.setProperty('--i', 3);

  wrapper.appendChild(side0);
  wrapper.appendChild(side1);
  wrapper.appendChild(side2);
  wrapper.appendChild(side3);

  box.appendChild(top);
  box.appendChild(wrapper);
  $boxesContainer.appendChild(box);
});
