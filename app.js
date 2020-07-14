//VARS

//audio
let woah = document.querySelector('#woah');
let yeah = document.querySelector('#yeah');
let hot = document.querySelector('#hot');
let funkyClip = document.querySelector('#funky');
let disco = document.querySelector('#disco');
let recordScratch = document.querySelector('#recordScratch');
let doit = document.querySelector('#doit');
let comp1 = document.querySelector('#one');
let comp2 = document.querySelector('#two');
let comp3 = document.querySelector('#three');
let comp4 = document.querySelector('#four');
let comp5 = document.querySelector('#five');

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

//speed up pulse selector
let remove = 500;
let show = 500;

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
	// ow.play();
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
		doit.play();
		playerCue.classList.remove('hide');
		setTimeout(() => playerCue.classList.add('hide'), 500);
		//put player input on Timeout to avoid input during DOIT cue
		setTimeout(() => (playerTurn = true), 500);
		return;
	}
	//cycle through display styling
	let num = funkyArray[i];
	document.getElementById(`${num}`).classList.add('pulse');
	//audio
	if (num === '1') {
		comp1.play();
	} else if (num === '2') {
		comp2.play();
	} else if (num === '3') {
		comp3.play();
	} else if (num === '4') {
		comp4.play();
	} else if (num === '5') {
		comp5.play();
	}
	//recursive!
	setTimeout(() => {
		document.getElementById(`${num}`).classList.remove('pulse');
		setTimeout(() => displayFunk(funkyArray, i + 1), remove);
	}, show);
}

//play
function play() {
	roundNumber++;
	round.innerText = `Round: ${roundNumber}`;
	speedUpTest();
	funkyChoice();
	displayFunk(funkyArray);
}

// player input styling (part of playerInput below)
function playerStyle(key) {
	let id = `player${key}`;
	document.getElementById(id).classList.add('pulse');
	setTimeout(() => document.getElementById(id).classList.remove('pulse'), 500);
	if (key === '1') {
		//audio
		woah.play();
		//animation
		document.querySelector('.woah').classList.remove('hide');
		document
			.querySelector('.woah')
			.classList.add('animate__animated', 'animate__rollOut');
		setTimeout(() => {
			document.querySelector('.woah').classList.add('hide');
			document
				.querySelector('.woah')
				.classList.remove('animate__animated', 'animate__rollOut');
		}, 500);
	} else if (key === '2') {
		yeah.play();
		document.querySelector('.yeah').classList.remove('hide');
		document
			.querySelector('.yeah')
			.classList.add('animate__animated', 'animate__flipOutX');
		setTimeout(() => {
			document.querySelector('.yeah').classList.add('hide');
			document
				.querySelector('.yeah')
				.classList.remove('animate__animated', 'animate__flipOutX');
		}, 500);
	} else if (key === '3') {
		hot.play();
		document.querySelector('.hot').classList.remove('hide');
		document
			.querySelector('.hot')
			.classList.add('animate__animated', 'animate__fadeOutBottomLeft');
		setTimeout(() => {
			document.querySelector('.hot').classList.add('hide');
			document
				.querySelector('.hot')
				.classList.remove('animate__animated', 'animate__fadeOutBottomLeft');
		}, 500);
	} else if (key === '4') {
		funkyClip.play();
		document.querySelector('.funky1').classList.remove('hide');
		document
			.querySelector('.funky1')
			.classList.add('animate__animated', 'animate__zoomOut');
		setTimeout(() => {
			document.querySelector('.funky1').classList.add('hide');
			document
				.querySelector('.funky1')
				.classList.remove('animate__animated', 'animate__zoomOut');
		}, 500);
	} else if (key === '5') {
		disco.play();
		document.querySelector('.disco').classList.remove('hide');
		document
			.querySelector('.disco')
			.classList.add('animate__animated', 'animate__rotateOutDownRight');
		setTimeout(() => {
			document.querySelector('.disco').classList.add('hide');
			document
				.querySelector('.disco')
				.classList.remove('animate__animated', 'animate__rotateOutDownRight');
		}, 500);
	}
}

//decides win or loss and shows .text style
function playerInput(event) {
	if (playerTurn) {
		const keys = ['1', '2', '3', '4', '5'];
		//variable for event key
		if (keys.indexOf(event.key) !== -1) {
			playerArray.push(event.key);
			playerStyle(event.key);
			//check for loss every input
			if (playerArray[n] !== funkyArray[n]) {
				//audio
				recordScratch.play();
				//remove background
				playerTurn = false;
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
					setTimeout(() => nextRound.classList.remove('hide'), 500);
					playerTurn = false;
					return;
				}
			}
		}
	}
}

//for reset button click
function defeatState() {
	ow.play();
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
	setTimeout(() => nextRound.classList.add('hide'), 500);
	//update High Score
	if (roundNumber > highScoreNumber) {
		highScoreNumber = roundNumber;
		highScore.innerText = `High Score ${highScoreNumber}`;
	}
	//reset checker variable
	n = 0;
	play();
}

//add difficulty
function speedUpTest() {
	 if (roundNumber >= 10) {
		remove = 250;
		show = 250;
	}
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
