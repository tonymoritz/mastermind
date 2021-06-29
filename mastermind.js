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
  console.log(mm.colorCode);
  const colorDisplay = document.getElementById('display-colors');
  colorDisplay.innerHTML = '';

  for (let i = 0; i < mm.numberOfSlots; i++) {
    colorDisplay.innerHTML += `<div
      style="background-color: ${mm.colorCode[i]}"
      class="mastermind-circles"
    ></div>`;
  }
}

function addToGuess(color) {
  mm.guessColors.push(color);
  console.log(mm.guessColors);

  for (let i = 0; i < mm.guessColors.length; i++) {
    let selectedPeg = document.querySelector(`#guess-${i + 1}`);
    selectedPeg.innerHTML = `<div style="background-color: ${mm.guessColors[i]}" class="mastermind-circles"></div>`;
  }
}

generateCode();

function generatePicker() {
  for (let i = 0; i < mm.colors.length; i++) {
    mm.colorPicker.innerHTML += `<div
      style="background-color: ${mm.colors[i]}"
      class="mastermind-circles" onclick="addToGuess('${mm.colors[i]}')"
    ></div>`;
  }
}

generatePicker();
