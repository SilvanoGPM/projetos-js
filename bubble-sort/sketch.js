const NUMS_MAX = 30;

let nums = [];
let itemWidth;

let playing = true;

let n = 0;
let j = 0;
let current = 0;
let done = false;

let div;
let button;
let slider;
let sliderShow;

function setup() {
  createCanvas(800, 400);

  for (let i = 0; i < NUMS_MAX; i++) {
    nums.push(floor(random(10, 100)));
  }

  itemWidth = width / NUMS_MAX;

  div = createDiv();
  div.class('controls');

  button = createButton('Pause');
  button.mousePressed(togglePlay);

  slider = createSlider(1, 60, 5, 1);
  slider.style('width', '80px');

  sliderShow = createP('FrameRate: 5');
  sliderShow.style('color', 'white');
  sliderShow.style('margin', '0');
  sliderShow.style('margin-top', '5px');

  div.child(button);
  div.child(slider);
  div.child(sliderShow);
}

function draw() {
  background(35);
  const frameRateSelected = slider.value();
  frameRate(frameRateSelected);
  textSize(100);
  sliderShow.html(`FrameRate: ${frameRateSelected}`);

  if (playing) {
    animatedBubbleSort();
  }

  drawArray();
}

function animatedBubbleSort() {
  if (n < nums.length) {
    if (j < nums.length - n - 1) {
      if (nums[j] > nums[j + 1]) {
          swap(j, j + 1);
      }

      j++;
      current = j;
    } else {
      j = 0;
      n++;
    }
  } else {
    done = true;
  }
}

function bubbleSort() {
  for (let n = nums.length; n >= 1; n--) {
      for (let i = 0; i < n - 1; i++) {
        if (nums[i] > nums[i + 1]) {
          swap(i, i + 1);
        }
      }
  }
}

function swap(x, y) {
  const temp = nums[x];
  nums[x] = nums[y];
  nums[y] = temp;
}

function drawArray() {
  push();

  textSize(10);

  for (let i = 0; i < nums.length; i++) {
    const itemHeight = map(nums[i], 10, 100, 10, height - 20);

    const xPos = i * itemWidth;

    if (i === current || done) {
      fill('green');
    } else {
      fill('blue');
    }

    rect(xPos, height, itemWidth, -itemHeight);
    fill('red');
    text(`${nums[i]}`, xPos + 5, (height - itemHeight - 10));
  }

  pop();
}

function togglePlay() {
  playing = !playing;
  button.html(playing ? 'Pause' : 'Play');
}
