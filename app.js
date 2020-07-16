//VARS

//audio
let woah = document.querySelector('#woah');
let yeah = document.querySelector('#yeah');
let hot = document.querySelector('#hot');
let funkyClip = document.querySelector('#funky');
let disco = document.querySelector('#disco');
let ow = document.querySelector('#ow');
let recordScratch = document.querySelector('#recordScratch');
let doit = document.querySelector('#doit');
let dance = document.querySelector('#dance');
let comp1 = document.querySelector('#one');
let comp2 = document.querySelector('#two');
let comp3 = document.querySelector('#three');
let comp4 = document.querySelector('#four');
let comp5 = document.querySelector('#five');
let speedUp = document.querySelector('#speedUp');
let funkySong = document.querySelector('#funkySong');
funkySong.loop = true;

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

//compares funkyArray and playerArray for every input
let n = 0;

//Tests player rhythm with Date.now()
let go = 0;
let input = 0;

//timeout variable to implement double-time
let fiveHundo = 500;
let fourHundo = 400;
let sixHundo = 600;

//pop-up defeat and win notifications
const reset = document.querySelector('.reset');
const nextRound = document.querySelector('.nextRound');

//player cue ('NOW!')
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
        //audio
        doit.play();
        //rhythm pulse
		pressIndicator();
		//put player input on Timeout to avoid input during DOIT cue
		setTimeout(() => {
            playerTurn = true;
            //initial rhythm start
			go = Date.now();
		}, fiveHundo);
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
		setTimeout(() => displayFunk(funkyArray, i + 1), fiveHundo);
	}, fiveHundo);
}

//play
function play() {
    //reset song
	// funkySong.load();
	// if (roundNumber === 5) {
	// 	doubleTime();
	// }
	roundNumber++;
    round.innerText = `Round: ${roundNumber}`;
    //countdown audio
	comp4.play();
	setTimeout(() => comp3.play(), 600);
	setTimeout(() => comp2.play(), 1000);
	setTimeout(() => doit.play(), 1500);
	setTimeout(() => {
        funkySong.play();
        //computer goes and triggers player input
		funkyChoice();
		displayFunk(funkyArray);
	}, 2000);
}

// MASSIVE player input styling (part of playerInput below)
function playerStyle(key) {
	let id = `player${key}`;
	document.getElementById(id).classList.add('pulse');
	setTimeout(() => document.getElementById(id).classList.remove('pulse'), fiveHundo);
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
		}, fiveHundo);
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
		}, fiveHundo);
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
		}, fiveHundo);
	} else if (key === '4') {
		dance.play();
		document.querySelector('.funky1').classList.remove('hide');
		document
			.querySelector('.funky1')
			.classList.add('animate__animated', 'animate__zoomOut');
		setTimeout(() => {
			document.querySelector('.funky1').classList.add('hide');
			document
				.querySelector('.funky1')
				.classList.remove('animate__animated', 'animate__zoomOut');
		}, fiveHundo);
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
		}, fiveHundo);
	}
}

//decides win or loss and shows .text style
function playerInput(event) {
	if (playerTurn) {
        //rhythm
		input = Date.now();
		if (input - go < fourHundo) {
			document.querySelector('.early').classList.remove('hide');
			setTimeout(
				() => document.querySelector('.early').classList.add('hide'),
				fiveHundo
			);
			lose();
			return;
		} else if (input - go > sixHundo) {
			document.querySelector('.late').classList.remove('hide');
			setTimeout(
				() => document.querySelector('.late').classList.add('hide'),
				fiveHundo
			);
			lose();
			return;
        }
        go = input + fiveHundo;
        //memory
		const keys = ['1', '2', '3', '4', '5'];
		//variable for event key
		if (keys.indexOf(event.key) !== -1) {
			playerArray.push(event.key);
			playerStyle(event.key);
			//check for loss every input
			if (playerArray[n] !== funkyArray[n]) {
				lose();
			} else {
				//win round if you get through entire funky array
				n++;
				if (n > funkyArray.length - 1) {
                    playerTurn = false;
                    	playerCue.classList.add('hide');
											playerCue.innerText = 'READY...';
					setTimeout(() => {
						ow.play();
						nextRound.classList.remove('hide');
						setTimeout(() => funkyClip.play(), fiveHundo);
						setTimeout(() => funkySong.pause(), 1500);
					}, fiveHundo);
					return;
				}
			}
		}
	}
}

function lose() {
	funkySong.pause();
	recordScratch.play();
	playerCue.classList.add('hide');
	playerCue.innerText = 'READY...';
	playerTurn = false;
	showBg(false);
	//button text with high score
	reset.innerText = `THAT WASN\'T FUNKY...\nTRY AGAIN?\n HIGH SCORE: ${highScoreNumber}`;
	//defeat state button
	setTimeout(() => reset.classList.remove('hide'), 1000);
	return;
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

//for between rounds
function winState() {
	playerArray = [];
	//update High Score
	if (roundNumber > highScoreNumber) {
		highScoreNumber = roundNumber;
		highScore.innerText = `High Score ${highScoreNumber}`;
	}
	//reset checker variable
	n = 0;
	play();
	setTimeout(() => {
		nextRound.classList.add('hide');
	}, 1500);
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

//for rhythm guide
function pressIndicator() {
	playerCue.classList.remove('hide');
	setTimeout(() => (playerCue.innerText = 'NOW!'), fiveHundo);
}

//for double time
function doubleTime() {
		fiveHundo = 250;
		fourHundo = 150;
		sixHundo = 350;
		speedUp.play();
}
