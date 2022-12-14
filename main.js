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
// document.querySelector('.scrollcontainer').insertAdjacentHTML("beforeend", `${localStorage.getItem('mySavedColors')}`);


document.querySelector('.scrollcontainer').innerHTML =  localStorage.getItem('mySavedColors')



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
    //Check if sidebar is open
    if(sideContainer.style.right != '0%'){
        sideContainer.style.right = '0%'
        sidebarButton.innerHTML = `<i class="fa-solid fa-angles-right"></i>`
    }
    // if(document.querySelectorAll('.savedbox-container').length===5){
    //    alert(`TOO many colors saved! Delete a set to save again.`)
    // }
    //insertAdjacentHTML will make event listener persist. Do not use innerHTML to append otherwise eventlistener will not run. THIS or try appendChild
    if(document.querySelectorAll('.savedbox-container')){ //.length<5 Restrict save amount
        document.querySelector('.scrollcontainer').insertAdjacentHTML("beforeend", `<div class="savedbox-container">
        <div class="deletebox"><i class="fa-solid fa-trash-can"></i></div>
            <div class="smallboxcontainer">
                <div class="savedbox" style="background-color: ${box1.style.backgroundColor}"></div>
                <div class="savedbox" style="background-color: ${box2.style.backgroundColor}"></div>
            </div>
        </div>`);

        // document.querySelectorAll('.savedbox-container')[document.querySelectorAll('.savedbox-container').length-1].style.opacity = '0'

        // setTimeout(function () {
        //     document.querySelectorAll('.savedbox-container')[document.querySelectorAll('.savedbox-container').length-1].style.opacity = '1'
        // }, 100);
    }
 
    document.querySelectorAll('.savedbox-container')[document.querySelectorAll('.savedbox-container').length-1].style.opacity = '0'

        setTimeout(function () {
            document.querySelectorAll('.savedbox-container')[document.querySelectorAll('.savedbox-container').length-1].style.opacity = '1'
        }, 100); //Needs to be placed outside to get local storage to render visible

    
    // console.log(document.querySelector('.savedbox-container'))
    // console.log( localStorage.getItem('mySavedColors'))
    // console.log( `${localStorage.getItem('mySavedColors')}`)


    

       // Local storage save
        
    if(!localStorage.getItem('mySavedColors')){
        localStorage.setItem('mySavedColors', document.querySelector('.savedbox-container').outerHTML)
    } else {
        let mySavedColors = localStorage.getItem('mySavedColors')

        localStorage.setItem('mySavedColors', mySavedColors + document.querySelectorAll('.savedbox-container')[document.querySelectorAll('.savedbox-container').length-1].outerHTML)
        // localStorage.setItem('mySavedColors',document.querySelector('.savedbox-container'))
    }

    console.log(localStorage.getItem('mySavedColors'))
    console.log(document.querySelectorAll('.savedbox-container')[document.querySelectorAll('.savedbox-container').length-1])
    // else {
        // let mySavedColors = localStorage.getItem('mySavedColors')
        // localStorage.setItem('mySavedColors',document.querySelector('.savedbox-container'))
    // }

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
        }, 130);

        localStorage.clear()
    })
}


//Delete one button
//Event delegation needed. Use document.addEventListener instead of document.queryselector

document.addEventListener('click', deleteOnce)

function deleteOnce () {
    document.querySelectorAll('.deletebox').forEach(el=>{
        el.addEventListener('click', function() {
            
            // this.parentNode.style.scale = '0%'
            // this.parentNode.style.transition = 'all 0.5s'
            // this.parentNode.style.opacity = '0'
            // this.parentNode.style.height = '0'
            
            this.parentNode.classList.add('deleting')

            // setTimeout(function () {
            //     // el.parentNode.style.opacity = '0'
                
            //     el.parentNode.style.height = '0'
            //     // el.parentNode.style.display = 'none'
            //     console.log('hi')
            // }, 0);

            setTimeout(function () {
                el.parentNode.remove()
                console.log('hello')
            }, 350);
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

function savedBoxClicked() {
    document.querySelectorAll('.smallboxcontainer').forEach(e=>{
        e.addEventListener('click', function(){
            box1.style.backgroundColor = `${this.firstElementChild.style.backgroundColor}`;

            box2.style.backgroundColor = `${this.lastElementChild.style.backgroundColor}`;

            body.style.background = `linear-gradient(to right, ${this.lastElementChild.style.backgroundColor}, ${this.firstElementChild.style.backgroundColor}`;

            e.style.scale = '80%'

    //delayed functions to add animations to copied after click

            setTimeout(function () {
                e.style.removeProperty('scale')
            }, 100);
        })
        
    })
    

}

// function savedBoxClicked (e) {
//     if(e.target.className === 'savedbox') {
//         console.log(document.querySelector('.savedbox'))
//     }
// }


//To do


//local storage to persist saved colors

//responsive design for sidebar width

// MAYBE WILL ADD OR WONT FEATURES. DO AT THE END

// Prompt when you can't save anymore?

//Do not save if same color set?

// Maybe disable open sidebar after first save? More controls