//used to get all the calculator buttons
const buttons = document.querySelectorAll('.button');

//adds a click event listener to each button
buttons.forEach(function (button) {
    button.addEventListener('click', handleClick);
  });

//used to play sound
function playSound(soundURL) {
  const audio = new Audio(soundURL);
  audio.play();
}

//plays a row-specific sound
function playRowSound(row){
    switch (row){
        case '1':
            playSound('./assets/sound-assets/row1.wav');
            break;
        case '2':
            playSound('./assets/sound-assets/row2.wav');
            break;
        case '3':
            playSound('./assets/sound-assets/row3.wav');
            break;
        case '4':
            playSound('./assets/sound-assets/row4.wav');
            break;
        case '5': 
            playSound('./assets/sound-assets/row5.wav');
            break;          
        
    }
}

//function to handle button clicks
function handleClick() {
    const buttonRow = this.getAttribute('data-row');
    if (this.id === 'equals-sign') {
        playSound('./assets/sound-assets/equals.wav');
    }
    else{
        playRowSound(buttonRow);  
    }

  
}

