// function switchBg() {
// 	let bg = document.querySelectorAll('div');
// 	for (i = 0; i < bg.length; i++) {
// 		if (bg[i].classList.contains('one')) {
// 			bg[i].classList.remove('one');
// 			bg[i].classList.add('two');
// 		} else if (bg[i].classList.contains('two')) {
// 			bg[i].classList.remove('two');
// 			bg[i].classList.add('three');
// 		} else if (bg[i].classList.contains('three')) {
// 			bg[i].classList.remove('three');
// 			bg[i].classList.add('four');
// 		} else if (bg[i].classList.contains('four')) {
// 			bg[i].classList.remove('four');
// 			bg[i].classList.add('one');
// 		}
// 	}
// };

// function recurse(i = 0) {
//     let play = document.querySelector('a');
//     if (i > 25) {
//         play.style.fontSize = '128px';
//         return;
//     }
//     switchBg();
//     setTimeout(() => recurse(i + 1), 1000)
// }

// recurse();
