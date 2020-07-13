//VARS

//display round number
let round = document.querySelector('#round');
let roundNumber = 0;
round.innerText = `Round: ${roundNumber}`;

//display high score
let highScore = document.querySelector('#highScore');
let highScoreNumber = 0;
highScore.innerText = `High Score: ${highScoreNumber}`;

//store pattern and player input
let funkyArray = [];
let playerArray = [];
let playerTurn = false;

//incrementer that compares funkyArray and playerArray for every input
let n = 0;

//pop-up defeat and win notifications
let reset = document.querySelector('.reset');
let nextRound = document.querySelector('.nextRound');

//player cue ('GO')
let playerCue = document.querySelector('.playerCue');

//start button
let start = document.querySelector('.start');

//EVENT LISTENERS

//enable player input if player turn is true
window.addEventListener('keydown', playerInput);

//reset game after loss
reset.addEventListener('click', defeatState);

//add round after win
nextRound.addEventListener('click', winState);

//remove start button
start.addEventListener('click', () => {
	start.classList.add('hide');
	play();
});

//FUNCTIONS

//random between 1 and 5 and store up to roundNumber
function funkyChoice() {
	let choice = Math.floor(Math.random() * 5 + 1);
	let choiceString = choice.toString();
	funkyArray.push(choiceString);
}

function displayFunk(funkyArray, i = 0) {
	//exit display iteration
	if (i === funkyArray.length) {
		playerCue.classList.remove('hide');
		setTimeout(() => playerCue.classList.add('hide'), 800);
		//put player input on Timeout to avoid input during GO cue
		setTimeout(() => (playerTurn = true), 600);
		return;
	}
	//cycle through display styling
	let num = funkyArray[i];
	document.getElementById(`${num}`).classList.add('pulse');
	setTimeout(() => {
		document.getElementById(`${num}`).classList.remove('pulse');
		setTimeout(() => displayFunk(funkyArray, i + 1), 600);
	}, 800);
}

//play
function play() {
	roundNumber++;
	round.innerText = `Round: ${roundNumber}`;
	funkyChoice();
	displayFunk(funkyArray);
}

// player input styling (line 120)
function playerStyle(key) {
	let id = `player${key}`;
	document.getElementById(id).classList.add('pulse');
	setTimeout(() => document.getElementById(id).classList.remove('pulse'), 500);
}

function playerInput(event) {
	if (playerTurn) {
		const keys = ['1', '2', '3', '4', '5'];
		//variable for event key
		if (keys.indexOf(event.key) !== -1) {
			playerArray.push(event.key);
			playerStyle(event.key);
			//check for loss every input
			if (playerArray[n] !== funkyArray[n]) {
				//button text with high score
				reset.innerText = `THAT WASN\T FUNKY...\nTRY AGAIN?\n HIGH SCORE: ${highScoreNumber}`;
				//defeat state button
				reset.classList.remove('hide');
				return;
			} else {
				//win round if you get through entire funky array
				n++;
				if (n > funkyArray.length - 1) {
					nextRound.classList.remove('hide');
					playerTurn = false;
					return;
				}
			}
		}
	}
}

function defeatState() {
	//reset variables
	roundNumber = 0;
	funkyArray = [];
	playerArray = [];
	//reset checker variable
	n = 0;
	//remove button
	reset.classList.add('hide');
	//reset button text
	reset.innerText = '';
	//show start button
	start.classList.remove('hide');
}

function winState() {
	playerArray = [];
	nextRound.classList.add('hide');
	//update High Score
	if (roundNumber > highScoreNumber) {
		highScoreNumber = roundNumber;
		highScore.innerText = `High Score ${highScoreNumber}`;
	}
	//reset checker variable
	n = 0;
	play();
}
