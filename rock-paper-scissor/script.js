let selectedOption;
let playing = false;

function changeStyle(opt, element) {
    if (!playing) {
        if (opt === 0) {
            element.style.transform = 'scale(1.3)';
            element.style.opacity = '1';
        } else if (!(selectedOption >= 0) || (document.getElementById("player" + selectedOption).id !== element.id)) {
            element.style.transform = 'scale(1.0)';
            element.style.opacity = '0.8';
        }
    }
}

function selectOption(opt) {
    document.querySelector("#resultado").innerHTML = "";
    if (selectedOption >= 0) {
        document.querySelector("#player" + selectedOption).style.transform = 'scale(1.0)';
        document.querySelector("#player" + selectedOption).style.opacity = '0.8';
    }

    selectedOption = opt;
    document.querySelector("#player" + selectedOption).style.transform = 'scale(1.3)';
    document.querySelector("#player" + selectedOption).style.opacity = '1';
}

function start() {
    if (selectedOption >= 0 && selectedOption != null) {
        playing = true;
        window.location.href = "#view";
        document.querySelector("#resultado").innerHTML = '';
        const botOpt = getBotValue();

        document.querySelector("#bot" + botOpt).style.transform = 'scale(1.3)';
        document.querySelector("#bot" + botOpt).style.opacity = '1';
        document.querySelector("#resultado").innerHTML = "Verificando...";

        setTimeout(function () {
            const result = verifyResult(selectedOption, botOpt);

            document.querySelector("#resultado").innerHTML = result;

            document.querySelector("#player" + selectedOption).style.transform = 'scale(1.0)';
            document.querySelector("#player" + selectedOption).style.opacity = '0.8';
            selectedOption = -1;
            document.querySelector("#bot" + botOpt).style.transform = 'scale(1.0)';
            document.querySelector("#bot" + botOpt).style.opacity = '0.8';
            playing = false;
        }, 2000);

    } else {
        document.querySelector("#resultado").innerHTML = "Selecione uma opção!";
    }
}

function getBotValue() {
    return Math.round(Math.random() * 2);
}

function verifyResult(player, bot) {
    if (player === bot) return "Empate";

    return results[(player + "" + bot)];

}

const results = {
    '01': 'Bot Win',
    '02': 'Player Win',
    '10': 'Player Win',
    '12': 'Bot Win',
    '20': 'Bot Win',
    '21': 'Player Win'
}

