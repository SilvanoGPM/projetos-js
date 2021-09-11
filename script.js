const SELECTED_CLASS_NAME = 'project-selected';

const $iframeFullscreen = document.querySelector('[data-iframe-fullscreen]');
const $iframe = document.querySelector('#projects-iframe');
const $iframeButtons = document.querySelectorAll('[data-button]');

function setIframe(project) {
  $iframe.setAttribute('src', project);
}

function handleButtonClick(event) {
  event.preventDefault();

  $iframeButtons.forEach(($button) => $button.parentElement.classList.remove(SELECTED_CLASS_NAME))

  event.target.parentElement.classList.add(SELECTED_CLASS_NAME);
  setIframe(event.target.getAttribute('data-button'));
}

$iframeButtons.forEach(($button) => $button.addEventListener('click', handleButtonClick))

$iframeFullscreen.addEventListener('click', () => {
  if (!document.fullscreenElement) {
    $iframe.requestFullscreen();
  } else {
    $iframe.exitFullscreen();
  }
});
