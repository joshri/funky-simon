//start game
//randomly generated funky sequence into array, add one each round?
//pause for player input in player array
let round = document.querySelector('#round');
let roundNumber = 0;
round.innerText = `Round: ${roundNumber}`;

let funkyArray = [];
let playerArray = [];
let playerTurn = true;

//random between 1 and 5 and store up to roundNumber
function funkyChoice() {
    let choice = Math.floor((Math.random() * 5) + 1);
    while (funkyArray.length < roundNumber) {
			funkyArray.push(choice);
		}
}


//indicate funky choice for each choice in array (pulse for .5 second?), then set playerTurn to true
// funkyArray.forEach(num => {
//     document.querySelector([number=`${num}`]).//pulse
// })

//player inputs

//enable player input
//each input tests against funky
//if wrong, trigger defeat
//if player array length = funky length, trigger win, increase round
window.addEventListener('keydown', playerInput);
function playerInput(e) {
    if (playerTurn === true) {
        if (e.key === '1' || '2' || '3' || '4' || '5') {
            playerArray.push(e.key);
        }
    }
}

function defeatState() {

}

function winState() {

}