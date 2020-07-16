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
let funkySong = document.querySelector('#funkySong');

const soundboard = {
    '1': comp1,
    '2': comp2,
    '3': comp3,
    '4': comp4,
    'q': comp5,
    'w': woah,
    'e': yeah,
    'r': hot,
    'a': dance,
    's': disco,
    'd': doit,
    'f': ow,
    'z': funkyClip,
    'x': recordScratch,
};

window.addEventListener('keydown', soundboardInput);

function soundboardInput(event) {
if (soundboard[event.key]) {
    soundboard[event.key].play();
}
}


document
	.querySelectorAll('.one')
	.forEach((x) => (x.style.animationName = 'background1'));

document
	.querySelectorAll('.two')
	.forEach((x) => (x.style.animationName = 'background2'));

document
	.querySelectorAll('.three')
	.forEach((x) => (x.style.animationName = 'background3'));

document
	.querySelectorAll('.four')
	.forEach((x) => (x.style.animationName = 'background4'));
