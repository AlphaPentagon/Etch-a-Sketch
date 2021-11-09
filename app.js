const gridContainer = document.querySelector("#grid-container");
const startButton = document.querySelector('#start-button');
const clearButton = document.querySelector('#clear-button');
const normalMode = document.querySelector('#normal-mode');
const shadedMode = document.querySelector('#shaded-mode')
const rainbowMode = document.querySelector('#rainbow-mode');
const eraseMode = document.querySelector('#erase-mode');
const slider = document.querySelector('.slider');
const sliderOutput = document.querySelector('output');
const formSlider = document.querySelector('form');


const width = 600;
const height = 600;

let gridSquares;
let gameRunning = false; 
let gridNumber = 0;
let sliderValue= 38;
let gridMode = "rgba(0, 0, 0, 1)";

const gridX = document.createElement("div");
gridX.classList.add("grid-row");
const gridY = document.createElement("div");
gridY.classList.add("grid-square");


clearButton.addEventListener("click", function() { clearGrid() });
normalMode.addEventListener("click", function() { colourIn("rgba(0, 0, 0, 1)") });
shadedMode.addEventListener("click", function() { colourIn("shaded") });
rainbowMode.addEventListener("click", function() { colourIn("rainbow") });
eraseMode.addEventListener("click", function() { colourIn("rgba(255, 255, 255, 1)") });
slider.addEventListener("input", function() { resizeSquares() });
    




normalMode.checked = true;
normalMode.disabled = true;
rainbowMode.disabled = true;
eraseMode.disabled = true;

sliderOutput.textContent = `${ sliderValue } x ${ sliderValue}`;
game();

function game() {
    if (gameRunning) {
        clearGrid();
    } else {        
        gameRunning = true;        
        normalMode.disabled = false;
        rainbowMode.disabled = false;
        eraseMode.disabled = false;              
        createGrid();
        colourIn(gridMode);
    }
    
}

function resizeSquares() {
    sliderValue = slider.value;
    sliderOutput.textContent = `${ sliderValue } x ${ sliderValue}`;
    game();
}




function colourIn(squareColor) {    
    gridMode = squareColor;
    gridSquares = document.querySelectorAll('.grid-square');           
    for (let i = 0; i < gridSquares.length; i++) { 
        if(squareColor == "rainbow") {
            gridSquares[i].addEventListener("mouseover", function() { gridSquares[i].style.backgroundColor = rainbowColour() })            
        } else if (squareColor == "shaded") {
            let aValue = 0;                                                                 
                gridSquares[i].addEventListener("mouseover", function() { gridSquares[i].style.backgroundColor = `rgba(0, 0, 0, ${aValue += 0.1})`})
        } else {
            gridSquares[i].addEventListener("mouseover", function() { gridSquares[i].style.backgroundColor = squareColor })   
        }                      
    }     
}

function rainbowColour() {
    let rValue = Math.floor((Math.random() * 255) + 1);
    let gValue = Math.floor((Math.random() * 255) + 1);
    let bValue = Math.floor((Math.random() * 255) + 1);    
    return `rgba(${rValue}, ${gValue}, ${bValue}, 1)`;
}  

function createGrid() {       
    let gridNumber = sliderValue;
    const squareWidth = (1/gridNumber) * width;
    const squareHeight = (1/gridNumber) * height;
    if (gridNumber > 100) {
        gridNumber = alert("That's too many squares, please pick a number less than or equal to 100");
        createGrid();
    } else {        
        gridContainer.style.width = `${width}`;
        gridContainer.style.height = `${height}`;        
        for (let i = 0; i < gridNumber; i++) {
            const gridX = document.createElement("div");
            gridX.classList.add("grid-row");        
            gridContainer.appendChild(gridX);

            for (let j = 0; j < gridNumber; j++) {
                const gridY = document.createElement("div");
                gridY.classList.add("grid-square");                
                gridY.style.width = `${squareWidth}px`;
                gridY.style.height = `${squareHeight}px`;                           
                gridX.appendChild(gridY);
            }
        }
    }
    
         
}

function clearGrid() {    
    while (gridContainer.firstChild) {
        gridContainer.removeChild(gridContainer.firstChild);
      }            
      gameRunning = false;
      game();      
}

