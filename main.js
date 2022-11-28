// Variables
let box1 = document.querySelector('.box1');
let box2 = document.querySelector('.box2');
let randomButton = document.querySelector('.random-button');
let saveButton = document.querySelector('.save-button');
let body = document.querySelector('body');
let sidebarButton = document.querySelector('.sidebar-button')
let sideContainer = document.querySelector('.sidecontainer')
let orderedList = document.querySelector('.orderedList')

// Utility Functions
function random(number){
    return Math.floor(Math.random()*(number+1))
}

//Generate random color
randomButton.addEventListener('click', randomColor)

function randomColor () {
    box1.style.backgroundColor = `rgba(${random(255)},${random(255)},${random(255)}, ${Math.random().toFixed(2)})`;
    box2.style.backgroundColor = `rgba(${random(255)},${random(255)},${random(255)}, ${Math.random().toFixed(2)})`;
    body.style.background = `linear-gradient(to right, ${box2.style.backgroundColor}, ${box1.style.backgroundColor}`;

}

//Open sidebar

sidebarButton.addEventListener('click', openSidebar)

function openSidebar (){
    if(sideContainer.style.right != '0%'){
        sideContainer.style.right = '0%'
        sidebarButton.innerHTML = `<i class="fa-solid fa-angles-right"></i>`
    } else {
        sideContainer.style.right = '-15%'
        sidebarButton.innerHTML = `<i class="fa-solid fa-angles-left"></i>`
    }
    
}

//Copying color on click

box1.addEventListener('click', copyColor)
box2.addEventListener('click', copyColor)

function copyColor(){
    let clickedBox = event.target.id
    navigator.clipboard.writeText(document.querySelector(`.${clickedBox}`).style.backgroundColor)
    document.querySelector(`.${clickedBox}`).style.scale = '90%'
    setTimeout(function () {
        document.querySelector(`.${clickedBox}`).style.scale = '100%'
    }, 100);
}

//Saving colors

saveButton.addEventListener('click',save)

function save(){
    orderedList.innerHTML += `<li>${box1.style.backgroundColor} ${box2.style.backgroundColor}</li>`
}


//To do

//page load random color

//transparent box when click to copy or copied text centered and fade after 1 sec

//generate background of color on clicked copied

//saved color list to have 2 boxes

//saved colors box will generate background on click

//delete button for saved colors list

//local storage to persist saved colors