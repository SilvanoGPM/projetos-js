const divTempo = document.querySelector('[data-js="tempo"]');
const iniciarBtn = document.querySelector('.iniciar');
const pararBtn = document.querySelector('.parar');
const zerarBtn = document.querySelector('.zerar');

const formatarUnidades = (unidades) => {
    return unidades
        .map(unidade => unidade < 10 ? `0${unidade}` : unidade);
}

const pegarTempo = tempo => {
    const segundos = tempo % 60;
    const minutos = Math.floor(tempo / 60) % 60;
    const horas = Math.floor(tempo / 60 / 60);
    return [segundos, minutos, horas];
}

class Relogio {
    constructor({ padrao }) {
        this.padrao = padrao;
        this.tempo = 0;
        this.cronometroID;
    }

    iniciar() {
        this.atualizar();
    }
    zerar() {
        this.tempo = -1;
    }
    parar() {
        clearInterval(this.cronometroID);
    }
    atualizar() {
        this.parar();
        this.cronometroID = setInterval(() => {
            this.tempo++;

            const [segundos, minutos, horas] = pegarTempo(this.tempo);
            const [segundosFormatado, minutosFormatado, horasFormatado] =
                formatarUnidades([segundos, minutos, horas]);

            divTempo.textContent = this.padrao
                .replace('s', segundosFormatado)
                .replace('m', minutosFormatado)
                .replace('h', horasFormatado);
        }, 1000);
    }
}

const relogio = new Relogio({ padrao: 'h:m:s' });

iniciarBtn.addEventListener('click', () => relogio.iniciar());
pararBtn.addEventListener('click', () => relogio.parar());
zerarBtn.addEventListener('click', () => relogio.zerar());


