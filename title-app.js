
document.querySelector('#rules').addEventListener('click', () => document.querySelector('.modal').style.zIndex = '1');

document
	.querySelector('#close').addEventListener('click', () => (document.querySelector('.modal').style.zIndex = '-2'));
