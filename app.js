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
const reset = document.querySelector('.reset');
const nextRound = document.querySelector('.nextRound');

//player cue ('GO')
const playerCue = document.querySelector('.playerCue');

//start button
const start = document.querySelector('.start');

//for background style
let bgOne = document.querySelectorAll('.one');
let bgTwo = document.querySelectorAll('.two');
let bgThree = document.querySelectorAll('.three');
let bgFour = document.querySelectorAll('.four');

//enable player input if player turn is true
window.addEventListener('keydown', playerInput);

//reset game after loss
reset.addEventListener('click', defeatState);

//add round after win
nextRound.addEventListener('click', winState);

//remove start button
start.addEventListener('click', () => {
	start.classList.add('hide');
	showBg(true);
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
	if (key === '1') {
		document.querySelector('.woah').classList.remove('hide');
		document
			.querySelector('.woah')
			.classList.add('animate__animated', 'animate__rollOut');
		setTimeout(() => {
			document.querySelector('.woah').classList.add('hide');
			document
				.querySelector('.woah')
				.classList.remove('animate__animated', 'animate__rollOut');
		}, 400);
	} else if (key === '2') {
		document.querySelector('.yeah').classList.remove('hide');
		document
			.querySelector('.yeah')
			.classList.add('animate__animated', 'animate__flipOutX');
		setTimeout(() => {
			document.querySelector('.yeah').classList.add('hide');
			document
				.querySelector('.yeah')
				.classList.remove('animate__animated', 'animate__flipOutX');
		}, 400);
	} else if (key === '3') {
		document.querySelector('.hot').classList.remove('hide');
		document
			.querySelector('.hot')
			.classList.add('animate__animated', 'animate__fadeOutBottomLeft');
		setTimeout(() => {
			document.querySelector('.hot').classList.add('hide');
			document
				.querySelector('.hot')
				.classList.remove('animate__animated', 'animate__fadeOutBottomLeft');
		}, 400);
	} else if (key === '4') {
		document.querySelector('.funky1').classList.remove('hide');
		document
			.querySelector('.funky1')
			.classList.add('animate__animated', 'animate__zoomOut');
		setTimeout(() => {
			document.querySelector('.funky1').classList.add('hide');
			document
				.querySelector('.funky1')
				.classList.remove('animate__animated', 'animate__zoomOut');
		}, 400);
	} else if (key === '5') {
		document.querySelector('.disco').classList.remove('hide');
		document
			.querySelector('.disco')
			.classList.add('animate__animated', 'animate__rotateOutDownRight');
		setTimeout(() => {
			document.querySelector('.disco').classList.add('hide');
			document
				.querySelector('.disco')
				.classList.remove('animate__animated', 'animate__rotateOutDownRight');
		}, 400);
	}
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
				//remove background
				showBg(false);
				//button text with high score
				reset.innerText = `THAT WASN\'T FUNKY...\nTRY AGAIN?\n HIGH SCORE: ${highScoreNumber}`;
				//defeat state button
				setTimeout(() => reset.classList.remove('hide'), 1000);
				return;
			} else {
				//win round if you get through entire funky array
				n++;
				if (n > funkyArray.length - 1) {
					setTimeout(() => nextRound.classList.remove('hide'), 1000);
					playerTurn = false;
					return;
				}
			}
		}
	}
}

//for reset button click
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

//for nextRound button click
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

//for background style
function showBg(x) {
	if (!x) {
		bgOne.forEach((x) => {
			x.style.animationName = '';
		});
		bgTwo.forEach((x) => {
			x.style.animationName = '';
		});
		bgThree.forEach((x) => {
			x.style.animationName = '';
		});
		bgFour.forEach((x) => {
			x.style.animationName = '';
		});
	} else {
		bgOne.forEach((x) => {
			x.style.animationName = 'background1';
		});
		bgTwo.forEach((x) => {
			x.style.animationName = 'background2';
		});
		bgThree.forEach((x) => {
			x.style.animationName = 'background3';
		});
		bgFour.forEach((x) => {
			x.style.animationName = 'background4';
		});
	}
}
