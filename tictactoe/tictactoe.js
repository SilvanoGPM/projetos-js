const table = document.querySelector('table');
const msg = document.querySelector('.msg');
const plays = document.querySelectorAll('.play');

const grid = Array(9).fill('');
const WIDTH = 3;

let actualPlayer;

let robotId;
let botsPlaying = false;
let playing = true;

const getRandomPlayer = () => Math.random() >= 0.5 ? 'X' : 'O';
actualPlayer = getRandomPlayer();

const switchPlayer = () => actualPlayer === 'X' ? 'O' : 'X';

const handlePlay = ({ target: play }) => {
    if (play.textContent === '' && playing) {
        const index = play.cellIndex +
            (play.parentElement.rowIndex * WIDTH);

        makePlay(play, index);
    }
}

const makePlay = (play, index) => {
    grid[index] = actualPlayer;
    play.textContent = actualPlayer;

    const playStyle = actualPlayer === 'X' ? 'cross' : 'ball';
    play.classList.add(playStyle);

    verifyWinner();
    actualPlayer = switchPlayer();
}

const verifyWinner = () => {
    const winnerDetails = {
        'X': { message: 'Cross Win', messageStyle: 'cross-win' },
        'O': { message: 'Ball Win', messageStyle: 'ball-win' }
    }

    const tied = grid.every(cell => cell !== '');
    const hasWin = verticalWin() || horizontalWin() || diagonalWin();

    if (hasWin) {
        const { message, messageStyle } = winnerDetails[actualPlayer];
        showMessage(message, messageStyle);
    } else if (tied) {
        showMessage('Tied');
    }
    else {
        return;
    }

    restartGame();
}

const hasWinner = func => {
    for (let i = 0; i < WIDTH; i++) {
        let plays = '';

        for (let j = 0; j < WIDTH; j++) {
            plays += func(i, j);
        }

        let hasWin = plays === actualPlayer.repeat(3);
        if (hasWin) return true;
    }

    return false;
}

const verticalWin = () => hasWinner((x, y) => grid[x + (y * WIDTH)]);

const horizontalWin = () => hasWinner((x, y) => grid[y + (x * WIDTH)])

const diagonalWin = () => {
    const toWin = actualPlayer.repeat(3);

    const leftDiagonal = grid[0] + grid[4] + grid[8];
    const rightDiagonal = grid[2] + grid[4] + grid[6];

    const hasWinner = leftDiagonal === toWin || rightDiagonal === toWin;

    return hasWinner;
}

const showMessage = (text, classColor = '') => {
    msg.textContent = text;
    msg.classList = `msg visible ${classColor}`;
}

const hideMessage = () => {
    msg.textContent = '';
    msg.classList = 'msg';
}

const startBot = () => {
    botsPlaying = true;
    robotId = setInterval(() => {
        handlePlay({ target: randomPlay() });
    }, 500);
}

const stopBot = () => {
    botsPlaying = false;
    clearInterval(robotId);
}

const clearGrid = (_, index, grid) => grid[index] = '';

const clearPlay = play => {
    play.textContent = '';
    play.classList = 'play';
}

const restartGame = () => {
    playing = false;

    clearInterval(robotId);
    setTimeout(() => {
        grid.forEach(clearGrid);
        plays.forEach(clearPlay);

        showMessage('Restarting...');
        table.style.visibility = 'hidden';

        setTimeout(() => {

            hideMessage();
            table.style.visibility = 'visible';

            if (botsPlaying) {
                startBot();
            }

            actualPlayer = getRandomPlayer();
            playing = true;

        }, 2000);

    }, 2000);
}

const randomPlay = () => {
    return plays[Math.floor(Math.random() * plays.length)];
}

plays.forEach(play => play.addEventListener('click', handlePlay));