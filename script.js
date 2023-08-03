// Get all buttons with the class "button" and store them in the 'buttons' variable
const buttons = document.querySelectorAll(".button");
// Attach a click event listener to each button and call the 'handleClick' function when clicked
buttons.forEach(function (button) {
  button.addEventListener("click", handleClick);
});
// Function to play a sound given its URL
function playSound(soundURL) {
  const audio = new Audio(soundURL);
  audio.play();
}
// Function to play a row-specific sound based on the given row value
function playRowSound(row) {
  switch (row) {
    // Map each row number to a specific sound and play the corresponding sound
    // for rows 1 to 5
    case "1":
      playSound("./assets/sound-assets/row1.wav");
      break;
    case "2":
      playSound("./assets/sound-assets/row2.wav");
      break;
    case "3":
      playSound("./assets/sound-assets/row3.wav");
      break;
    case "4":
      playSound("./assets/sound-assets/row4.wav");
      break;
    case "5":
      playSound("./assets/sound-assets/row5.wav");
      break;
  }
}
// Variable to keep track of the last button pressed
let lastButton = null;
// Function to round a number to five decimal places
function roundToFiveDecimals(number) {
  return Math.round(number * 1e7) / 1e7;
}
// Function to handle the input (number, operator, or "=") from the calculator buttons
function handleInput(value) {
  // If the value is "=", calculate the result of the expression in 'preOpText'
  if (value === "=") {
    try {
      const result = eval(preOpText);
      const maxDigits = 6;

      let formattedResult = result.toString();
      // Check if the result exceeds the maximum digits to show, and format it accordingly
      if (Math.abs(result) >= 1e14) {
        formattedResult = Number(result.toPrecision(maxDigits));
      } else if (formattedResult.includes('.')) {
        // Round decimal numbers to five decimal places
        formattedResult = roundToFiveDecimals(result);
      }
      // Update 'postOpText' to display the expression and its result
      postOpText = `${preOpText}=${formattedResult}`;
      preOpText = formattedResult;
    } catch (error) {
       // If there is an error in the calculation, display "Error" in 'postOpText'
      postOpText = "Error";
    }
    lastButton = null;
  } else {
    // Handle other button inputs (numbers or operators)
      if (value === "x") {
        value = "*";
      }
      if (value === "^") {
        value = "**";
      }
  
      if (
        lastButton &&
        (lastButton === "ac" ||
          lastButton === "**" ||
          lastButton === "/" ||
          lastButton === "*" ||
          lastButton === "-" ||
          lastButton === "+" ||
          lastButton === "=")
      ) {
        if (
          value === "^" ||
          value === "/" ||
          value === "*" ||
          value === "-" ||
          value === "**" ||
          value === "+" ||
          value === "-"
        ) {
          return;
        }
      }
  
      if (value === "ac") {
        preOpText = "";
        postOpText = "";
        lastButton = null;
      } else if (value === "%") {
        if (/^\d+(\.\d+)?([+\-*\/]\d+(\.\d+)?)?$/.test(preOpText)) {
          const expression = eval(preOpText); 
          const percentOfExpression = expression / 100; 
          preOpText = percentOfExpression.toString(); 
        } else {
          postOpText = "Expression has to be x*y%";
          preOpText = "";
        }
      } else {
        if (preOpText.length > 11) {
          postOpText = "Max characters reached";
          preOpText = "";
          lastButton = null;
        }
        preOpText += value;
      }
  
      lastButton = value;
    }
   // Update the calculator screen after handling the input
    updateScreen();
  }
// Function to handle button clicks
function handleClick() {
  const buttonAction = this.getAttribute("data-action");
  const buttonRow = this.getAttribute("data-row");
   // Play a sound based on the row number or the "equals-sign" button
  if (this.id === "equals-sign") {
    playSound("./assets/sound-assets/equals.wav");
  } else {
    playRowSound(buttonRow);
  }
    // Call 'handleInput' function to handle the input (number, operator, or "=")
  // based on the buttonAction value
  if (buttonAction === "=") {
    handleInput(buttonAction);
  } else {
    const buttonValue = this.getAttribute("data-action");
    handleInput(buttonValue);
  }
}
// Get the calculator screen element with the IDs "pre-op" and "post-op"
const screen = document.getElementById("screen");
// Initialize variables to store the input and result of the calculator
let preOpText = ""; 
let postOpText = ""; 
// Function to update the calculator screen with the current 'preOpText' and 'postOpText'
function updateScreen() {
  screen.querySelector("#pre-op").textContent = preOpText;
  screen.querySelector("#post-op").textContent = postOpText;
}