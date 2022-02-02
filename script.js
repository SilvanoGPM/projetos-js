const SELECTED_CLASS_NAME = "project-selected";

const $iframeFullscreen = document.querySelector("[data-iframe-fullscreen]");
const $iframe = document.querySelector("#projects-iframe");
const $iframeButtons = document.querySelectorAll("[data-button]");

function setIframe(project) {
  $iframe.setAttribute("src", project);

  $iframe.addEventListener("load", () => {
    const $tab = document.querySelector(".project-selected");

    const colors = getComputedStyle($iframe.contentWindow.document.body);
    const color = colors.getPropertyValue('--nav-color');
    const backgroundColor = colors.getPropertyValue('--nav-background-color');

    console.log(color, backgroundColor);

    $tab.style.setProperty("--color", color);
    $tab.style.setProperty("--background-color", backgroundColor);

    $iframe.removeEventListener("load", () => {});
  });
}

function handleButtonClick(event) {
  event.preventDefault();

  $iframeButtons.forEach(($button) =>
    $button.parentElement.classList.remove(SELECTED_CLASS_NAME)
  );

  event.target.parentElement.classList.add(SELECTED_CLASS_NAME);
  setIframe(event.target.getAttribute("data-button"));
}

$iframeButtons.forEach(($button) =>
  $button.addEventListener("click", handleButtonClick)
);

$iframeFullscreen.addEventListener("click", () => {
  if (!document.fullscreenElement) {
    $iframe.requestFullscreen();
  } else {
    $iframe.exitFullscreen();
  }
});
