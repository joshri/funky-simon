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

//enable player input if player turn is true
window.addEventListener('keydown', playerInput);
//checker
let n = 0;

//pop-up defeat and win notifications
let reset = document.querySelector('.reset');
let nextRound = document.querySelector('.nextRound');

reset.addEventListener('click', function defeatState() {
	roundNumber = 0;
	//remove indicator
	funkyArray.forEach((num) => {
		document.getElementById(`${num}`).classList.remove('pulse');
	});
	funkyArray = [];
	playerArray = [];
	reset.style.display = 'none';
	play();
});

nextRound.addEventListener('click', function winState() {
	playerArray = [];
	nextRound.style.display = 'none';
	//remove indicator
	funkyArray.forEach((num) => {
		document.getElementById(`${num}`).classList.remove('pulse');
	});
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
	start.style.display = 'none';
	play();
});

//FUNCTIONS

//random between 1 and 5 and store up to roundNumber
function funkyChoice() {
	let choice = Math.floor(Math.random() * 5 + 1);
	let choiceString = choice.toString();
	while (funkyArray.length < roundNumber) {
		funkyArray.push(choiceString);
	}
}

//indicate funky choice for each choice in array (pulse for .5 second?), then set playerTurn to true
function displayFunk() {
	funkyArray.forEach((num, index) => {
        document.getElementById(`${num}`).classList.add('pulse');
		setTimeout( () => document.getElementById(`${num}`).classList.remove('pulse'), 1000);
		playerTurn = true;
	});
}

//play
function play() {
	roundNumber++;
	round.innerText = `Round: ${roundNumber}`;
	funkyChoice();
	displayFunk();
}


function playerInput(event) {
	if (playerTurn) {
        const keys = ['1', '2', '3', '4', '5']
        //variable for event key
		if (keys.indexOf(event.key) > -1) {
			playerArray.push(event.key);
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
