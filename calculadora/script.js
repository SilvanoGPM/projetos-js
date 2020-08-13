const display = document.getElementById("resultado");
let displayValue = "";

function init() {
    addAllListeners();
    display.innerHTML = displayValue;
}

function addAllListeners() {
    const elements = Array.from(document.getElementsByTagName('span'));

    for (let element of elements) {
        element.addEventListener('click', getValue);
    }

    document.getElementById("equals").addEventListener('click', getValue);
}

function getValue(evt) {
    let value = evt.target.innerHTML;
    const op = operations[value];

    if (op) {
        op();
    } else {
        displayValue += value;
    }

    display.innerHTML = displayValue;
}

const operations = {
    'C': () => {
        if (displayValue === 'Infinity') {
            displayValue = '';
        } else {
            displayValue = displayValue.replace(displayValue[displayValue.length - 1], '');
        }
    },
    '=': () => {
        displayValue = eval(displayValue.replace('÷', '/')) + "";
    }
}