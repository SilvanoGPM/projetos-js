(function () {
    "use script"
    const calculator = document.querySelector('.calculator');
    const result = document.querySelector('.calculator__result');
    const buttons = document.querySelectorAll(".calculator__button");

    function exec(value) {
        const values = result.innerText;

        if (value === '=') value = String(eval(values.replace(',', '.'))).replace('.', ',');
        else if (value.toUpperCase() === 'C') value = '';
        else value = values + value;

        result.innerText = value || '';
    }

    function handleButton({ target }) {
        exec(target.innerText);
    }

    function handleKeys(event) {

        if (/(\b[0-9]\b)|[\*\+\-\/\=\,]/.test(event.key)) {
            exec(event.key);
            event.preventDefault();
        } else if (event.key === 'Enter') {
            exec('=');
        }

    }

    buttons.forEach(button => button.addEventListener('click', handleButton));
    addEventListener('keydown', handleKeys);
})();