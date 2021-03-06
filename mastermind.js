function init() {
  window.mm = {
    colorCode: [],
    colorPicker: document.getElementById('color-picker'),
    colors: [
      'black',
      'blue',
      'green',
      'orange',
      'purple',
      'red',
      'white',
      'yellow'
    ],
    guessColors: [],
    numberOfSlots: 5
  };

  function isEqual(a, b) {
    return JSON.stringify(a) === JSON.stringify(b);
  }

  const submitButton = document.querySelector('#submit-button');
  const rightOrWrong = document.querySelector('#right-or-wrong');
  submitButton.addEventListener('click', () => {
    console.log('guess', mm.guessColors);
    if (isEqual(mm.guessColors, mm.colorCode)) {
      console.log("You're right!");
      rightOrWrong.innerHTML = 'You Win!';
    } else {
      console.log("You're wrong!");
      rightOrWrong.innerHTML = "You're WRONG!";
    }
    const redCount = calcRedPegs();
    const whiteCount = calcWhitePegs();
    console.log('Red peg calc: ', redCount);
    console.log('White peg calc: ', whiteCount);
    const miniPegHoles = document.querySelectorAll('.key-peg');
    for (let i = 0; i < redCount; i++) {
      miniPegHoles[i].classList.add('kp-red');
    }
    for (let i = redCount; i < whiteCount + redCount; i++) {
      miniPegHoles[i].classList.add('kp-white');
    }
  });

  createPegs();

  generateCode();

  generatePicker();
}

function createPegs() {
  for (let i = 0; i < mm.numberOfSlots; i++) {
    document.querySelector('#code-guess').innerHTML += `<div id="guess-${
      i + 1
    }" class="guess-peg-slot"></div>`;
  }
}

function calcRedPegs() {
  let redPegCount = 0;

  for (let i = 0; i < mm.numberOfSlots; i++) {
    if (mm.guessColors[i] === mm.colorCode[i]) {
      redPegCount++;
    }
  }

  return redPegCount;
}

function calcWhitePegs() {
  let uncheckedColorCode = [...mm.colorCode];

  mm.guessColors.forEach(guessColor => {
    const foundColorIdx = uncheckedColorCode.findIndex(
      color => color === guessColor
    );

    if (foundColorIdx > -1) {
      uncheckedColorCode = uncheckedColorCode.filter(
        (_singleColor, idx) => idx !== foundColorIdx
      );
    }
  });

  return mm.numberOfSlots - uncheckedColorCode.length - calcRedPegs();
}

function clearGuess() {
  for (let i = 0; i < mm.guessColors.length; i++) {
    let selectedPeg = document.querySelector(`#guess-${i + 1}`);
    selectedPeg.innerHTML = '';
  }
}

function deletePeg() {
  mm.guessColors.pop();
  let selectedPeg = document.querySelector(
    `#guess-${mm.guessColors.length + 1}`
  );
  selectedPeg.innerHTML = '';
}

function clearPegs() {
  const hintPegJoin = document.querySelectorAll(
    '.key-peg.kp-red, .key-peg.kp-white'
  );
  console.log('hintpegjoin:', hintPegJoin);

  for (let i = 0; i < mm.guessColors.length; i++) {
    const selectedPeg = document.querySelector(`#guess-${i + 1}`);
    selectedPeg.innerHTML = '';
  }

  for (let i = 0; i < hintPegJoin.length; i++) {
    hintPegJoin[i].classList.remove('kp-red', 'kp-white');
  }

  mm.guessColors = [];
}

function generateCode() {
  function colorMaker() {
    let random;
    let returnCode = [];

    for (let i = 0; i < mm.numberOfSlots; i++) {
      random = mm.colors[Math.floor(Math.random() * mm.colors.length)];
      returnCode.push(random);
    }
    return returnCode;
  }

  mm.colorCode = colorMaker();
  console.log('mm.colorCode', mm.colorCode);
  const colorDisplay = document.getElementById('display-colors');
  colorDisplay.innerHTML = '';

  clearPegs();

  for (let i = 0; i < mm.numberOfSlots; i++) {
    colorDisplay.innerHTML += `<div
      style="background-color: ${mm.colorCode[i]}"
      class="mastermind-circles"
    ></div>`;
  }
}

function addToGuess(color) {
  if (mm.guessColors.length >= mm.numberOfSlots) {
    return;
  }

  mm.guessColors.push(color);
  console.log('mm.guessColors', mm.guessColors);

  for (let i = 0; i < mm.guessColors.length; i++) {
    const selectedPeg = document.querySelector(`#guess-${i + 1}`);
    selectedPeg.innerHTML = `<div
      style="background-color: ${mm.guessColors[i]}"
      class="mastermind-circles"></div>`;
  }
}

function generatePicker() {
  for (let i = 0; i < mm.colors.length; i++) {
    mm.colorPicker.innerHTML += `<div
      style="background-color: ${mm.colors[i]}"
      class="mastermind-circles" onclick="addToGuess('${mm.colors[i]}')"
    ></div>`;
  }
}

init();
