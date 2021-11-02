const gridContainer = document.querySelector("#grid-container");
const startButton = document.querySelector('#start-button');
const clearButton = document.querySelector('#clear-button');
const width = 900;
const height = 600;

let gridSquares;
let gameRunning = false; 
let gridNumber = 0;

const gridX = document.createElement("div");
gridX.classList.add("grid-row");
const gridY = document.createElement("div");
gridY.classList.add("grid-square");


startButton.addEventListener("click", function() { game() });
clearButton.addEventListener("click", function() { clearGrid() });

function game() {
    if (gameRunning) {
        clearGrid();
    }
    gameRunning = true;
    createGrid();
    colourIn();
}

function colourIn() {
    gridSquares = document.querySelectorAll('.grid-square');
    for (let i = 0; i < gridSquares.length; i++) {
        gridSquares[i].addEventListener("mouseover", function() { gridSquares[i].classList.add("square-colour") })
    }     
}

function createGrid() {
    
    gridNumber = prompt("Please choose how many squares wide and high your sketchpad will be (up to 100)");
    gridNumber = Number(gridNumber);
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