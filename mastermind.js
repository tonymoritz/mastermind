const colors = ['black', 'green', 'blue', 'purple', 'red', 'orange', 'yellow', 'white'];
const numberOfSlots = 5;

function generateCode() {
  function colorMaker() {
    let random;
    let returnCode = [];

    for (let i = 0; i < numberOfSlots; i++) {
      random = colors[Math.floor(Math.random() * colors.length)];
      returnCode.push(random);
    }
    return returnCode;
  }

  const colorCode = colorMaker();
  console.log(colorCode);
  const colorDisplay = document.getElementById('display-colors');
  colorDisplay.innerHTML = '';

  for (let i = 0; i < numberOfSlots; i++) {
    colorDisplay.innerHTML += `<div
    style="background-color: ${colorCode[i]}"
    class="mastermind-circles"
    ></div>`;
  }
}

function sayColor(colorToSay) {
  console.log(colorToSay);
}

const colorPicker = document.getElementById('color-picker');

generateCode();

for (let i = 0; i < colors.length; i++) {
  colorPicker.innerHTML += `<div
  style="background-color: ${colors[i]}"
  class="mastermind-circles" onclick="sayColor('${colors[i]}')"
  ></div>`;
}
