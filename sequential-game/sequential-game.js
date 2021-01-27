const $winMessage = document.querySelector(".win-message");

const elements = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

let selectedElements = [];
let playing = true;

const shuffle = array => {
    const newArray = [...array];

    let currentIndex = newArray.length;
    let temporaryValue;
    let randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        temporaryValue = newArray[currentIndex];
        newArray[currentIndex] = newArray[randomIndex];
        newArray[randomIndex] = temporaryValue;
    }

    return newArray;
}

const errorAnimate = () => {
    const buttons = document.querySelectorAll('.button');
    buttons.forEach(button => {
        button.classList.add("error-animate");
        setTimeout(() => button.classList.remove("error-animate"), 1500);
    });
}

const elementClicked = (element, button) => {
    console.log(element);
    if (selectedElements.indexOf(element) === -1 && playing) {
        selectedElements.push(element);

        const selectedIndex = selectedElements.indexOf(element);
        const index = elements.indexOf(element);

        if (index === selectedIndex) {
            button.classList.add("correct");
        } else {
            errorAnimate();
            playing = false;
            setTimeout(restart, 1500);
        }

        if (selectedElements.length === elements.length) {
            $winMessage.classList.add("animated");
            playing = false;
            setTimeout(() => $winMessage.classList.remove("animated"), 3000);
            setTimeout(restart, 3000);
        }

    }
}

const renderElements = elements => {
    const container = document.querySelector('[data-js="app"]');
    container.innerHTML = elements.map(element => (
        `
            <div 
                class="button"
                onclick="elementClicked('${element}', this)" >
                ${element}
            </div>
        `
    )).join("");

}

const start = () => {
    const shuffledElements = shuffle(elements);
    renderElements(shuffledElements);
}

const restart = () => {
    playing = true;
    selectedElements = [];
    start();
}

start();