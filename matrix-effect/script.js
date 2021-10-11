const ctx = document.querySelector("canvas").getContext("2d");

const w = document.body.offsetWidth;
const h = document.body.offsetHeight;

ctx.fillStyle = "black";
ctx.fillRect(0, 0, w, h);

const cols = Math.floor(w / 20) + 1;
const ypos = Array(cols).fill(0);

let matrixId;
let speed = 50;
let lineHeight = 3;

function matrix() {
  ctx.fillStyle = "#0001";
  ctx.fillRect(0, 0, w, h);

  ctx.fillStyle = "#0f0";
  ctx.font = "15px consolas";

  ypos.forEach((y, i) => {
    const text = String.fromCharCode(Math.random() * 1000);
    const x = i * 20;

    ctx.fillText(text, x, y);

    if (y > 100 + Math.random() * 10000) ypos[i] = 0;
    else ypos[i] = y + lineHeight + (Math.random() * 8);
  });
}

addEventListener('load', start);

function control() {
  if (matrixId) {
    stop();
  } else {
    start();
  }
}

function stop() {
  clearInterval(matrixId);
  matrixId = 0;
}

function start() {
  matrixId = setInterval(matrix, speed);
}

function update() {
  stop();
  start();
}

function handleRange(input, callback, x) {
  return (event) => {
    const value = Number(event.target.value);

    input.innerText = value;

    callback(value);
    update();
  };
}

const speedRange = document.querySelector("#speedRange");
const lineRange = document.querySelector("#lineRange");

const speedElement = document
  .querySelector("#speed")
  .querySelector("span");

const lineHeightElement = document
  .querySelector("#lineHeight")
  .querySelector("span");

speedRange.addEventListener('change',
  handleRange(speedElement, (value) => speed = value));

lineRange.addEventListener('change',
  handleRange(lineHeightElement, (value) => lineHeight = value));
