// Used to get all the calculator buttons
const buttons = document.querySelectorAll(".button");

// Adds a click event listener to each button
buttons.forEach(function (button) {
  button.addEventListener("click", handleClick);
});

// Used to play sound
function playSound(soundURL) {
  const audio = new Audio(soundURL);
  audio.play();
}

// Plays a row-specific sound
function playRowSound(row) {
  switch (row) {
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

// Function to handle number and operator buttons
// Initialize a variable to keep track of the last button pressed
let lastButton = null;

function roundToFiveDecimals(number) {
  return Math.round(number * 1e7) / 1e7;
}

function handleInput(value) {
  if (value === "=") {
    try {
      const result = eval(preOpText);
      const maxDigits = 6;

      // Convert the result to a string
      let formattedResult = result.toString();
      if (Math.abs(result) >= 1e14) {
        formattedResult = Number(result.toPrecision(maxDigits));
      } else if (formattedResult.includes('.')) {
        // Round decimal numbers to the 5th position
        formattedResult = roundToFiveDecimals(result);
      }

      postOpText = `${preOpText}=${formattedResult}`;
      preOpText = formattedResult;
    } catch (error) {
      postOpText = "Error";
    }
    // Reset the lastButton variable after pressing equals
    lastButton = null;
  } else {
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
        // Check if the current preOpText contains a valid expression (e.g., 10 + 20, 5 * 30, etc.)
        if (/^\d+(\.\d+)?([+\-*\/]\d+(\.\d+)?)?$/.test(preOpText)) {
          const expression = eval(preOpText); // Evaluate the current expression
          const percentOfExpression = expression / 100; // Calculate the percentage of the expression
          preOpText = percentOfExpression.toString(); // Set the new value as the preOpText
        } else {
          postOpText = "Expression has to be x*y%";
          preOpText = "";
        }
      } else {
        // Code to handle the character limit for other buttons and operations
        if (preOpText.length > 11) {
          postOpText = "Max characters reached";
          preOpText = "";
          lastButton = null;
        }
        preOpText += value;
      }
  
      lastButton = value;
    }
  
    updateScreen();
  }

// Function to handle button clicks
function handleClick() {
  const buttonAction = this.getAttribute("data-action");
  const buttonRow = this.getAttribute("data-row");
  if (this.id === "equals-sign") {
    playSound("./assets/sound-assets/equals.wav");
  } else {
    playRowSound(buttonRow);
  }
  if (buttonAction === "=") {
    handleInput(buttonAction);
  } else {
    const buttonValue = this.getAttribute("data-action");
    handleInput(buttonValue);
  }
}

// Function to update the calculator screen
// Used to get the calculator screen and buttons
const screen = document.getElementById("screen");

// Initialize variables to store the input and result
let preOpText = ""; // Stores the current operation
let postOpText = ""; // Stores the previous operation and result

function updateScreen() {
  screen.querySelector("#pre-op").textContent = preOpText;
  screen.querySelector("#post-op").textContent = postOpText;
}