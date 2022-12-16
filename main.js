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

//Local storage on load
document.querySelector('.scrollcontainer').innerHTML = localStorage.getItem('mySavedColors')

//Utility Functions
function random(number){ //generate random number; +1 at end to include param
    return Math.floor(Math.random()*(number+1))
}

//Click to generate random color
randomButton.addEventListener('click', randomColor)

function randomColor () {
    //generate 2 random rgba for 2 boxes, rounded alpha for copy pasting
    box1.style.backgroundColor = `rgba(${random(255)},${random(255)},${random(255)}, ${Math.random().toFixed(2)})`;

    box2.style.backgroundColor = `rgba(${random(255)},${random(255)},${random(255)}, ${Math.random().toFixed(2)})`;

    //split the middle with gradient on opposite sides
    body.style.background = `linear-gradient(to right, ${box2.style.backgroundColor}, ${box1.style.backgroundColor}`;

}

//Generate random color on initial page load
window.addEventListener('load', (loadRandomColor))

function loadRandomColor(){
    randomColor()
}

//Open sidebar
sidebarButton.addEventListener('click', openSidebar)

function openSidebar (){
    //Toggle show & hide icon for sidebar opening/closing
    if(sideContainer.style.right != '0%'){
        sideContainer.style.right = '0%'
        sidebarButton.innerHTML = `<i class="fa-solid fa-angles-right"></i>`
    } else {
        sideContainer.style.right = '-15%'
        sidebarButton.innerHTML = `<i class="fa-solid fa-angles-left"></i>`
    }
}

//Copy color on click and change color to full page background view
box1.addEventListener('click', copyColor)
box2.addEventListener('click', copyColor)

function copyColor(){
    //Event is marked as deprecated. Change to include event as our parameter? "Reason- It's missing the event parameter in the event handler function. It ends up using the global window.event which is fragile and is deprecated."
    let clickedBox = event.target.id  //Assign the event from either box1 or box2 after click

    navigator.clipboard.writeText(document.querySelector(`.${clickedBox}`).style.backgroundColor) //This code will copy the rgba color to clipboard

    body.style.background = document.querySelector(`.${clickedBox}`).style.backgroundColor; //Feature to change background color after copy

    //Animation
    document.querySelector(`.${clickedBox}`).style.scale = '90%'

    //First element child will be the p tag
    document.querySelector(`.${clickedBox}`).firstElementChild.classList.add('show')

    //Delayed functions to add animations to box after clicking copy
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
    //Check if sidebar is open
    //Feature for opening sidebar after clicking save
    if(sideContainer.style.right != '0%'){
        sideContainer.style.right = '0%'
        sidebarButton.innerHTML = `<i class="fa-solid fa-angles-right"></i>`
    }

    // THIS CODEBLOCK IS TO LIMIT THE NUMBER OF SAVES. CURRENTLY SET TO 5.
    //.length restrict save amount
    // if(document.querySelectorAll('.savedbox-container').length===5){
    //    alert(`TOO many colors saved! Delete a set to save again.`)
    // }

    //insertAdjacentHTML will make event listener persist. Do not use innerHTML to append otherwise eventlistener will not run. THIS or try appendChild
    if(document.querySelectorAll('.savedbox-container')){ 
        document.querySelector('.scrollcontainer').insertAdjacentHTML("beforeend", `<div class="savedbox-container">
            <div class="deletebox"><i class="fa-solid fa-trash-can"></i></div>
            <div class="smallboxcontainer" style="">
                <div class="savedbox" style="background-color: ${box1.style.backgroundColor}"></div>
                <div class="savedbox" style="background-color: ${box2.style.backgroundColor}"></div>
            </div>
        </div>`);
        // Code block to add small saved boxes to sidebar
    }
 
    document.querySelectorAll('.savedbox-container')[document.querySelectorAll('.savedbox-container').length-1].style.opacity = '0'

    //Needs to be placed outside of localstorage function to get page to render visible when loaded.
    setTimeout(function () {
        document.querySelectorAll('.savedbox-container')[document.querySelectorAll('.savedbox-container').length-1].style.opacity = '1'
    }, 100); 

    //Local storage save
    setTimeout(function(){
        if(!localStorage.getItem('mySavedColors')){
            localStorage.setItem('mySavedColors', document.querySelector('.savedbox-container').outerHTML)
        } else {
            let mySavedColors = localStorage.getItem('mySavedColors')
    
            localStorage.setItem('mySavedColors', mySavedColors + document.querySelectorAll('.savedbox-container')[document.querySelectorAll('.savedbox-container').length-1].outerHTML)
        }
    },101) //time just needs to be longer than opacity function

    //console.log(document.querySelectorAll('.savedbox-container')[document.querySelectorAll('.savedbox-container').length-1])
}


//Delete All Button
deleteButton.addEventListener('click', deleteAll)

function deleteAll () {
    document.querySelectorAll('.savedbox-container').forEach(e=>{
        e.style.opacity = '0'
        e.style.scale = '0%'
        setTimeout(function () {
            e.remove()
        }, 130);

        localStorage.clear()
    })
}


//Delete once button
//Event delegation needed. Use document.addEventListener instead of document.queryselector
//Bypass looping and adding event listener to each trash can button
//Bug that happened was having to click on trashcan twice. Once to add an eventlistener and once more to actually run the code.
document.addEventListener('click', deleteOnce)

function deleteOnce () {
    document.querySelectorAll('.deletebox').forEach(el=>{
        el.addEventListener('click', function() {
            // this.parentNode.style.scale = '0%'
            // this.parentNode.style.transition = 'all 0.5s'
            // this.parentNode.style.opacity = '0'
            // this.parentNode.style.height = '0'

            // Update local storage before adding class
            // console.log(this.parentNode.outerHTML)

            localStorage.setItem('mySavedColors', `${localStorage.getItem('mySavedColors').replace(this.parentNode.outerHTML,'')}`)
            
            // console.log(this.parentNode.outerHTML)
            // console.log(localStorage.getItem('mySavedColors'))

            // Add deleting class to trigger animation
            this.parentNode.classList.add('deleting')

            // setTimeout(function () {
                // el.parentNode.style.opacity = '0'
                // el.parentNode.style.height = '0'
                // el.parentNode.style.display = 'none'
                // console.log('hi')
            // }, 0);

            // Remove div
            setTimeout(function () {
                el.parentNode.remove()
                // console.log('hello')
            }, 350);
        })
    })
}
   
//Event listener for clicking on saved boxes.
document.addEventListener('click', savedBoxClicked)

function savedBoxClicked() {
    document.querySelectorAll('.smallboxcontainer').forEach(e=>{
        e.addEventListener('click', function(){
            box1.style.backgroundColor = `${this.firstElementChild.style.backgroundColor}`;

            box2.style.backgroundColor = `${this.lastElementChild.style.backgroundColor}`;

            body.style.background = `linear-gradient(to right, ${this.lastElementChild.style.backgroundColor}, ${this.firstElementChild.style.backgroundColor}`;

            e.style.scale = '80%' //Scale set smaller than to hover

            //delayed function to add animation to saved box set after click
            setTimeout(function () {
                e.style.removeProperty('scale')
            }, 100);
        })
    })
}

//To do
//responsive design for sidebar width
//UI changes

// OPTIONAL FEATURES. DO AT THE END
// Prompt when you can't save anymore?
// Do not save if same color set?
// Maybe disable open sidebar after first save? More controls