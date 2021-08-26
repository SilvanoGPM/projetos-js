const $iframe = document.querySelector('#projects-iframe');
const $iframeButtons = document.querySelectorAll('[data-button]');

function setIframe(project) {
  $iframe.setAttribute('src', project);
}

function handleButtonClick(event) {
  event.preventDefault();
  setIframe(event.target.getAttribute('data-button'));
}

$iframeButtons.forEach(($button) => $button.addEventListener('click', handleButtonClick))
