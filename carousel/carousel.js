/**
 * @typedef CarouselType
 * @property {HTMLElement[]|NodeList|Array} children Elementos HTML para manipular.
 * @property {HTMLElement} btnNext Elemento HTML que ao clicar altera para o próximo.
 * @property {HTMLElement} btnPrevious Elemento HTML que ao clicar altera para o anterior.
 * @property {number} switchTime Tempo que demora para passar cada elemento(em millisegundos).
 * @property {string} visibleCSSClass Classe CSS que é adicionado para o elemento visiível.
 * @property {boolean} reverseMode Carrosel vai funcionar de trás pra frente caso seja passado **true**.
 * @property {boolean} automatic = true Define se o carrosel será automático ou não.
 * @property {boolean} usePlaceholders Mostra alguns elementos adicionais, para saber em qual elemento atualmente o carrosel se encontra. Caso definido para **true** será necessário configurar alguns outros parâmetros como **placeholderVisibleCSSClass** e **placeholdersContainer**
 * @property {string} placeholderCSSClass Classe CSS que será adicionada para os elementos de placeholder.
 * @property {string} placeholderVisibleCSSClass Classe CSS que será adicionada para o placeholder do elemento visível.
 * @property {HTMLElement} placeholdersContainer Element HTML para servir de container para outros elementos de placeholder.
 */

/**
 * @param {CarouselType} {
 * @param {HtmlElement[]|NodeList|Array} children=[] Elementos HTML para manipular.
 * @param {HTMLElement} btnNext Elemento HTML que ao clicar altera para o próximo.
 * @param {HTMLElement} btnPrevious Elemento HTML que ao clicar altera para o anterior.
 * @param {number} switchTime = 5000 Tempo que demora para passar cada elemento(em millisegundos).
 * @param {string} visibleCSSClass Classe CSS que é adicionado para o elemento visiível.
 * @param {boolean} reverseMode = false Carrosel vai funcionar de trás pra frente caso seja passado **true**.
 * @param {boolean} usePlaceholders = true Mostra alguns elementos adicionais, para saber em qual elemento atualmente o carrosel se encontra. Caso definido para **true** será necessário configurar alguns outros parâmetros como **placeholderVisibleCSSClass** e **placeholdersContainer**
 * @param {boolean} automatic = true Define se o carrosel será automático ou não.
 * @param {string} placeholderCSSClass Classe CSS que será adicionada para os elementos de placeholder.
 * @param {string} placeholderVisibleCSSClass Classe CSS que será adicionada para o placeholder do elemento visível.
 * @param {HTMLElement} placeholdersContainer Element HTML para servir de container para outros elementos de placeholder.
 * @param {} }
 */
function carousel({
  children = [],
  btnNext,
  btnPrevious,
  switchTime = 5000,
  visibleCSSClass,
  placeholdersContainer,
  placeholderCSSClass,
  placeholderVisibleCSSClass,
  automatic = true,
  usePlaceholders = true,
  reverseMode = false,
}) {

  /**
   * Caso o carrosel seja definido como reverso, o índice atual será definido para
   * o último índice de **children**, caso contrário, será definido para 0.
   */
  let currentIndex = reverseMode ? children.length - 1 : 0;

  let timerID;

  /**
   * Cria um elemento de placeholder para cada elemento dentro de **children**.
   */
  function setupPlaceholders() {
    children.forEach(() => {
      const placeholder = document.createElement('div');
      placeholder.classList.add(placeholderCSSClass);

      placeholdersContainer.appendChild(placeholder);
    });
  }

  /**
   * Seta a imagem no índice atual.
   */
  function setImage() {
    children[currentIndex].classList.add(visibleCSSClass);
  }

  /**
   * Seta o placeholder no índice atual.
   */
  function setPlaceholder() {
    placeholdersContainer.children[currentIndex].classList.add(placeholderVisibleCSSClass);
  }

  /**
   * Reseta o intervalo de tempo para a alteração automática de imagem.
   */
  function resetTimer() {
    if (automatic) {
      clearInterval(timerID);

      const func = reverseMode ? previousIndex : nextIndex;

      timerID = setInterval(func, switchTime);
    }
  }

  /**
   * Limpa todas uma classe de um determinado conjunto de elementos.
   * @param {NodeList|Array} arr Conjunto de elementos.
   * @param {string} cssClass Classe para limpar dos elementos.
   */
  function clearCSSClass(arr, cssClass) {
    arr.forEach((element) => element.classList.remove(cssClass));
  }

  /**
   * Manipula as classes CSS para visualização.
   */
  function handleCSSClases() {
    clearCSSClass(children, visibleCSSClass)
    setImage();

    if (usePlaceholders) {
      clearCSSClass([...placeholdersContainer.children], placeholderVisibleCSSClass);
      setPlaceholder();
    }
  }

  /**
   * Define o próximo índice.
   */
  function nextIndex() {
    resetTimer();

    if (currentIndex === children.length - 1) {
      currentIndex = 0;
    } else {
      currentIndex++;
    }

    handleCSSClases();
  }

  /**
  * Define o índice anterior.
  */
  function previousIndex() {
    resetTimer();

    if (currentIndex <= 0) {
      currentIndex = children.length - 1;
    } else {
      currentIndex--;
    }

    handleCSSClases();
  }

  btnNext.addEventListener('click', nextIndex);
  btnPrevious.addEventListener('click', previousIndex);

  if (usePlaceholders) {
    setupPlaceholders();
    setPlaceholder();
  }

  setImage();
  resetTimer();
}

window.addEventListener('load', () => {
  const images = document.querySelectorAll('.carousel__item');
  const btnNext = document.querySelector('.carousel__control--next');
  const btnPrevious = document.querySelector('.carousel__control--previous');
  const placeholdersContainer = document.querySelector('.balls');

  carousel({
    children: images,
    btnNext,
    btnPrevious,
    switchTime: 2000,
    visibleCSSClass: 'carousel__item--visible',
    placeholderCSSClass: 'ball',
    placeholdersContainer,
    placeholderVisibleCSSClass: 'ball--selected',
  });
});
