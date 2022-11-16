
let box1 = document.querySelector('.box1');
let box2 = document.querySelector('.box2');
let randomButton = document.querySelector('.random-button');
let saveButton = document.querySelector('.save-button');
let body = document.querySelector('body');

randomButton.addEventListener('click', randomColor)

function randomColor () {
    box1.style.backgroundColor = "blue";
    box2.style.backgroundColor = "red";
    body.style.backgroundColor = "black";

}
