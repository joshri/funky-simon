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

//pulse timers
let show = 800;
let remove = 600;

//enable player input if player turn is true
window.addEventListener('keydown', playerInput);

//incrementer that compares funkyArray and playerArray for every input
let n = 0;

//pop-up defeat and win notifications
let reset = document.querySelector('.reset');
let nextRound = document.querySelector('.nextRound');

//player cue
let playerCue = document.querySelector('.playerCue');

reset.addEventListener('click', function defeatState() {
	roundNumber = 0;
	//remove indicator
	// funkyArray.forEach((num) => {
	// 	document.getElementById(`${num}`).classList.remove('pulse');
	// });
	funkyArray = [];
	playerArray = [];
	reset.classList.add('hide')
	//reset checker variable
	n = 0;
	start.classList.remove('hide');
});

nextRound.addEventListener('click', function winState() {
	playerArray = [];
	nextRound.classList.add('hide');
	//remove indicator
	// funkyArray.forEach((num) => {
	// 	document.getElementById(`${num}`).classList.remove('pulse');
	// });
	//update High Score
	if (roundNumber > highScoreNumber) {
		highScore.innerText = `High Score ${roundNumber}`;
	}
	//reset checker variable
	n = 0;
	play();
});

//start button
let start = document.querySelector('.start');
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
	if (i === funkyArray.length) {
        playerCue.classList.remove('hide');
        setTimeout(() => playerCue.classList.add('hide'), remove);
		playerTurn = true;
		return;
	}
	let num = funkyArray[i];
	document.getElementById(`${num}`).classList.add('pulse');
	setTimeout(() => {
		document.getElementById(`${num}`).classList.remove('pulse');
		setTimeout(() => displayFunk(funkyArray, i + 1), remove);
	}, show);
}

//play
function play() {
	roundNumber++;
	round.innerText = `Round: ${roundNumber}`;
	funkyChoice();
	displayFunk(funkyArray);
}

function playerInput(event) {
	if (playerTurn) {
		const keys = ['1', '2', '3', '4', '5'];
		//variable for event key
		if (keys.indexOf(event.key) !== -1) {
			playerArray.push(event.key);
			//check for loss every input
			if (playerArray[n] !== funkyArray[n]) {
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
