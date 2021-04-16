(function () {
    "use strict"
    const result = document.querySelector('.calculator__result');
    const buttons = document.querySelectorAll(".calculator__button");

    const execKeys = { Enter: '=', c: 'C' };

    function exec(value) {
        const values = result.value;

        if (value === '=') value = String(eval(values.replace(',', '.'))).replace('.', ',');
        else if (value.toUpperCase() === 'C') value = '';
        else value = values + value;

        result.value = value || '';
    }

    function handleButton({ target }) {
        exec(target.innerText);
    }

    function handleKeys(event) {
        if (/(\b[0-9]\b)|[\*\+\-\/\=\,]/.test(event.key)) {
            exec(event.key);
        } else if (execKeys[event.key]) {
            exec(execKeys[event.key]);
        } else if (event.key === 'Backspace' || event.key.startsWith('Arrow')) {
            return;
        }

        event.preventDefault();
    }

    buttons.forEach(button => button.addEventListener('click', handleButton));
    result.addEventListener('keydown', handleKeys);
})();