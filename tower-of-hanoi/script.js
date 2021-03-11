const $towers = document.querySelectorAll('.tower');
const $controlsMoves = document.querySelector('.controls__moves');
const $controlsRestart = document.querySelector('.controls__restart');
const $controlsResolve = document.querySelector('.controls__resolve');
const $controlsMinimum = document.querySelector('.controls__minimum');
const $totalOfDisks = document.querySelector('#totalOfDisks');

const timeouts = [];

let moves = 0;
let times = 1;
let numberOfDisks = 3;
let minimumMoves = 2 ** numberOfDisks - 1;

const isWin = disks => {
    if (disks.length !== numberOfDisks) {
        return false;
    }

    for (let i = 1; i < disks.length; i++) {
        if (disks[i - 1].offsetWidth > disks[i].offsetWidth) {
            return false;
        }
    }

    return true;
}

const verifyMove = () => {
    const lastTower = $towers[2];
    const disks = lastTower.querySelectorAll('.disk');

    moves++;
    $controlsMoves.innerHTML = $controlsMoves.innerHTML.replace(/\d+/, moves);

    if (isWin(disks)) {
        const aditionalMsg = moves > minimumMoves
            ? 'Tente novamente'
            : 'Parabéns';

        alert(`Você consegiu fazendo ${moves} movimentos, ${aditionalMsg}!`);
    }

}

const render = () => {
    let disks = '';

    for (let i = 1; i <= numberOfDisks; i++) {
        disks += `<div class="disk disk__${i}"></div>`
    }

    $towers[0].innerHTML = disks;

    const $disks = document.querySelectorAll('.disk');
    $disks.forEach(disk => {
        disk.addEventListener('dragstart', drag);
        disk.setAttribute('draggable', 'true');
    });
}

const restart = () => {
    moves = 0;
    times = 1;
    $controlsMoves.innerHTML = 'Movimentos: <strong>0</strong>';
    $towers.forEach(tower => {
        tower.innerHTML = '';
        setDropArea(tower);
    });

    timeouts.forEach(timeout => clearTimeout(timeout));

    render();
}

const allowDrop = event => event.preventDefault();

const drag = event => {
    const disk = event.target;
    const tower = disk.parentNode;
    const firstDisk = tower.querySelector('.disk');
    if (disk === firstDisk) {
        event.dataTransfer.setData('text', disk.classList);
    }
}

const drop = event => {
    event.preventDefault();

    const data = event.dataTransfer.getData('text');

    if (data) {
        const tower = event.target.classList.contains('tower')
            ? event.target
            : event.target.parentNode.classList.contains('tower')
                ? event.target.parentNode
                : $towers[0];

        const [disk] = document.getElementsByClassName(data);
        const [bellowDisk] = [...tower.querySelectorAll('.disk')];

        const diskIsLargerThanBellowDisk = bellowDisk?.offsetWidth === undefined ||
            disk.offsetWidth < bellowDisk.offsetWidth;

        if (diskIsLargerThanBellowDisk) {
            tower.prepend(disk);
            verifyMove();
        }
    }
}

const makePlay = (origin, destiny) => {
    console.log(origin, "->", destiny);

    timeouts.push(setTimeout(() => {
        const originTower = $towers[origin];
        const destinTower = $towers[destiny];
        const disk = originTower.querySelector('.disk');

        destinTower.prepend(disk);
        verifyMove();
    }, 200 * times));

    times++;
}

const hanoi = (numberOfDisks, towerO, towerD, towerW) => {
    if (numberOfDisks > 0) {
        const disks = numberOfDisks - 1;
        hanoi(disks, towerO, towerW, towerD);
        makePlay(towerO, towerD);
        hanoi(disks, towerW, towerD, towerO);
    }
}

const setDropArea = tower => {
    tower.addEventListener('dragover', allowDrop);
    tower.addEventListener('drop', drop);
}

const resolve = () => {
    restart();

    $towers.forEach(tower => {
        tower.removeEventListener('dragover', allowDrop);
        tower.removeEventListener('drop', drop);
    })

    console.clear();
    console.log(`Solução para ${numberOfDisks} discos`);
    hanoi(numberOfDisks, 0, 2, 1);
}

$towers.forEach(setDropArea);

$controlsRestart.addEventListener('click', restart);

$controlsResolve.addEventListener('click', resolve);

$totalOfDisks.addEventListener('change', event => {
    const { value } = event.target;
    numberOfDisks = value < 3
        ? 3
        : value > 8
            ? 8
            : Number(value);

    minimumMoves = 2 ** numberOfDisks - 1;

    $controlsMinimum.innerHTML =
        $controlsMinimum.innerHTML.replace(/\d+/, minimumMoves);

    restart();
});

render();
