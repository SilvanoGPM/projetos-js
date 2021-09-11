/**
 * @typedef CarouselType
 * @property {HTMLElement[]} images Elementos HTML para manipular.
 * @property {HTMLElement} btnNext Elemento HTML que ao clicar altera para o próximo.
 * @property {HTMLElement} btnPrevious Elemento HTML que ao clicar altera para o anterior.
 * @property {number} switchTime Tempo que demora para passar cada elemento(em millisegundos).
 * @property {string} visibleCSSClass Classe CSS que é adicionado para o elemento visiível.
 * @property {boolean} reverseMode Carrosel vai funcionar de trás pra frente caso seja passado **true**.
 */

/**
 * @param {CarouselType} {
 * @param {HTMLElement[]} images=[] Elementos HTML para manipular.
 * @param {HTMLElement} btnNext Elemento HTML que ao clicar altera para o próximo.
 * @param {HTMLElement} btnPrevious Elemento HTML que ao clicar altera para o anterior.
 * @param {number} switchTime = 5000 Tempo que demora para passar cada elemento(em millisegundos).
 * @param {string} visibleCSSClass Classe CSS que é adicionado para o elemento visiível.
 * @param {boolean} reverseMode = false Carrosel vai funcionar de trás pra frente caso seja passado **true**.
 * @param {} }
 */
function carousel({
  children = [],
  btnNext,
  btnPrevious,
  switchTime = 5000,
  visibleCSSClass,
  reverseMode = false,
}) {
  let currentIndex = -1;
  let timerID;

  function resetTimer() {
    clearInterval(timerID);

    const func = reverseMode ? previousImage : nextImage;

    timerID = setInterval(func, switchTime);
  }

  function handleCSSClases() {
    children.forEach(image => image.classList.remove(visibleCSSClass));
    children[currentIndex].classList.add(visibleCSSClass);
  }

  function nextImage() {
    resetTimer();

    if (currentIndex === children.length - 1) {
      currentIndex = -1;
    }

    currentIndex++;

    handleCSSClases();
  }

  function previousImage() {
    resetTimer();

    if (currentIndex <= 0) {
      currentIndex = children.length;
    }

    currentIndex--;

    handleCSSClases();
  }

  btnNext.addEventListener('click', nextImage);
  btnPrevious.addEventListener('click', previousImage);

  resetTimer();
}

const images = document.querySelectorAll('.carousel__item');
const btnNext = document.querySelector('.carousel__control--next');
const btnPrevious = document.querySelector('.carousel__control--previous');

carousel({
  children: images,
  btnNext,
  btnPrevious,
  switchTime: 1000,
  visibleCSSClass: 'carousel__item--visible',
  reverseMode: true,
});
