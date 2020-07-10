//VARS

//display round number
let round = document.querySelector('#round');
let roundNumber = 0;
round.innerText = `Round: ${roundNumber}`;

//display high score
let highScore = document.querySelector('#highScore');
let highScoreNumber = 0
highScore.innerText = `High Score: ${highScoreNumber}`
//store pattern and player input
let funkyArray = [];
let playerArray = [];
let playerTurn = false;

//pop-up defeat and win notifications
let reset = document.querySelector('.reset');
let nextRound = document.querySelector('.nextRound');

reset.addEventListener('click', function defeatState() {
    roundNumber = 0;
    //remove indicator
    funkyArray.forEach((num) => {
			document.getElementById(`${num}`).style.textDecoration = 'none';
		});
	funkyArray = [];
    playerArray = [];
    reset.style.display = 'none'
    play();
});

nextRound.addEventListener('click', function winState() {
    playerArray = [];
    nextRound.style.display = 'none';
    //remove indicator
    funkyArray.forEach((num) => {
			document.getElementById(`${num}`).style.textDecoration = 'none';
        });
    //update High Score
    if (roundNumber > highScoreNumber) {
        highScore.innerText = `High Score ${roundNumber}`;
    }
    play();
});

//start button
let start = document.querySelector('.start');
start.addEventListener('click', () => {
    start.style.display = 'none';
    play()
});


//FUNCTIONS


//random between 1 and 5 and store up to roundNumber
function funkyChoice() {
    let choice = Math.floor((Math.random() * 5) + 1);
    let choiceString = choice.toString();
    while (funkyArray.length < roundNumber) {
			funkyArray.push(choiceString);
		}
}

//indicate funky choice for each choice in array (pulse for .5 second?), then set playerTurn to true
function displayFunk() {
funkyArray.forEach(num => {
    document.getElementById(`${num}`).style.textDecoration = 'underline'
    });
playerTurn = true;
};

//play
function play() {
    roundNumber++;
    round.innerText = `Round: ${roundNumber}`;
    funkyChoice();
    displayFunk();
}

//enable player input if player turn is true
window.addEventListener('keydown', playerInput);
KeyboardEvent.repeat = false;

function playerInput(e) {
    let n = 0;
    if (playerTurn === true) {
        if (e.key === '1' || '2' || '3' || '4' || '5') {
            playerArray.push(e.key);
            //check for loss every input
            
            if (playerArray[n] !== funkyArray[n]) {
               //defeat state button 
               reset.style.display = 'block';
               return;
            } else {
            //win round if you get through entire funky array
            n++;
            if (n > funkyArray.length - 1) {
                nextRound.style.display = 'block';
                playerTurn = false;
                return;
                }    
            }
        }
    }
}

function checkInput() {

}