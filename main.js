// Variables
let box1 = document.querySelector('.box1');
let box2 = document.querySelector('.box2');
let randomButton = document.querySelector('.random-button');
let saveButton = document.querySelector('.save-button');
let body = document.querySelector('body');
let sidebarButton = document.querySelector('.sidebar-button')
let sideContainer = document.querySelector('.sidecontainer')
let savedBoxContainer = document.querySelector('.savedbox-container')
let deleteButton = document.querySelector('.delete-all')
let deleteOne = document.querySelector('.deletebox')

// Utility Functions
function random(number){ //generate random number +1 at end to include max param
    return Math.floor(Math.random()*(number+1))
}

//Generate random color
randomButton.addEventListener('click', randomColor)

function randomColor () {
    //generate 2 random rgba for 2 boxes
    box1.style.backgroundColor = `rgba(${random(255)},${random(255)},${random(255)}, ${Math.random().toFixed(2)})`;

    box2.style.backgroundColor = `rgba(${random(255)},${random(255)},${random(255)}, ${Math.random().toFixed(2)})`;
    //split the middle with gradient
    body.style.background = `linear-gradient(to right, ${box2.style.backgroundColor}, ${box1.style.backgroundColor}`;

}

// Generate random color on page load

function loadRandomColor(){
    box1.style.backgroundColor = `rgba(${random(255)},${random(255)},${random(255)}, ${Math.random().toFixed(2)})`;

    box2.style.backgroundColor = `rgba(${random(255)},${random(255)},${random(255)}, ${Math.random().toFixed(2)})`;

    body.style.background = `linear-gradient(to right, ${box2.style.backgroundColor}, ${box1.style.backgroundColor}`;
}

window.addEventListener('load', (loadRandomColor))

//Open sidebar

sidebarButton.addEventListener('click', openSidebar)

function openSidebar (){ //show/hide and changes different icon for sidebar
    if(sideContainer.style.right != '0%'){
        sideContainer.style.right = '0%'
        sidebarButton.innerHTML = `<i class="fa-solid fa-angles-right"></i>`
    } else {
        sideContainer.style.right = '-15%'
        sidebarButton.innerHTML = `<i class="fa-solid fa-angles-left"></i>`
    }

}

//Copying color on click and generate full page background color change

box1.addEventListener('click', copyColor)
box2.addEventListener('click', copyColor)

function copyColor(){
    let clickedBox = event.target.id  //grab from click event box1 or box2 id

    navigator.clipboard.writeText(document.querySelector(`.${clickedBox}`).style.backgroundColor) //code to copy the rgba color

    body.style.background = document.querySelector(`.${clickedBox}`).style.backgroundColor;

    document.querySelector(`.${clickedBox}`).style.scale = '90%'
    document.querySelector(`.${clickedBox}`).firstElementChild.classList.add('show')

    //delayed functions to add animations to copied after click

    setTimeout(function () {
        document.querySelector(`.${clickedBox}`).style.scale = '100%'
    }, 150);

    setTimeout(function () {
        document.querySelector(`.${clickedBox}`).firstElementChild.classList.remove('show')
    }, 200);
}

//Saving colors

saveButton.addEventListener('click', save)

function save(){
    if(document.querySelectorAll('.savedbox-container').length===5){
       alert(`TOO many colors saved! Delete a set to save again.`)
    }
    //insertAdjacentHTML will make event listener persist. Do not use innerHTML to append otherwise eventlistener will not run. THIS or try appendChild
    if(document.querySelectorAll('.savedbox-container').length<5){
        sideContainer.insertAdjacentHTML("beforeend", `<div class="savedbox-container">
        <div class="deletebox"><i class="fa-solid fa-trash-can"></i></div>
        <div class="savedbox" style="background-color: ${box1.style.backgroundColor}"></div>
        <div class="savedbox" style="background-color: ${box2.style.backgroundColor}"></div>
    </div>`);

    }
// `<li>${box1.style.backgroundColor} ${box2.style.backgroundColor}</li>`
}


//Delete All Button

deleteButton.addEventListener('click', deleteAll)

function deleteAll () {
    document.querySelectorAll('.savedbox-container').forEach(e=>{
        e.style.opacity = '0'
        e.style.scale = '0%'
        setTimeout(function () {
            e.remove()
        }, 175);
    })
}


//Delete one button
//Event delegation needed. Use document.addEventListener instead of document.queryselector

document.addEventListener('click', deleteOnce)

function deleteOnce () {
    document.querySelectorAll('.deletebox').forEach(el=>{
        el.addEventListener('click',async function() {
            this.parentNode.style.opacity = '0'
            this.parentNode.style.scale = '0%'
            setTimeout(function () {
                el.parentNode.remove()
            }, 175);
        })
    })
}
    // if(e.target.className === 'deletebox' || e.target.className === 'fa-solid fa-trash-can') {
        // document.querySelectorAll('.savedbox-container')
        // document.querySelector('.savedbox-container').style.opacity = '0'
        // Array.from(document.querySelectorAll('.savedbox-container')).forEach(elem=>{
        //     console.log(elem)
        // })
        // document.querySelectorAll('.deletebox').forEach(el=>{
        //     el.addEventListener(
        //       'click',
        //       function() {
        //           this.parentNode.remove()
        //     })
        // })
    // }



   
//Event listeners for saved boxes
document.addEventListener('click', savedBoxClicked)

function savedBoxClicked (e) {
    if(e.target.className === 'savedbox') {
        console.log(document.querySelector('.savedbox'))
    }
}


//To do

//saved colors box to have colors

//saved colors box will generate background on click

//local storage to persist saved colors

//responsive design for sidebar width

//No save limits turn on overflow y


// DO AT THE END

//Design fading effect on delete boxes

// Prompt when you can't save anymore

//Do not save if same color set