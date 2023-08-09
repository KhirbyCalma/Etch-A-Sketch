// GRID ELEMENTS
const gridSizeSlider = document.getElementById('grid-size-slider');
const gridSizeOutput = document.getElementById('grid-size-output');
const gridContainer = document.getElementById('grid-container');
// GRID VARIABLES
const defaultGridSize = gridSizeSlider.value;
let mouseDown = false;
// GRID STARTING FUNCTIONS
updateGridSizeOutput(defaultGridSize);
createGrid(defaultGridSize);
// GRID EVENT LISTENERS
gridSizeSlider.addEventListener('input', (event) => resetGrid(event.target.value));


// COLOR PICKER ELEMENTS
const colorPicker = document.getElementById('color-picker');
// COLOR PICKER VARIABLES
let userColor = colorPicker.value;
// COLOR PICKER LISTENERS
colorPicker.addEventListener('input', (event) => {
    changeColor(event.target.value);
    changeToDrawMode();
});
colorPicker.addEventListener('change', (event) => {
    changeColor(event.target.value);
    changeToDrawMode();
});


// DRAW, ERASE, AND CLEAR ELEMENTS
const drawMode = document.getElementById('draw-mode');
const rainbowMode = document.getElementById('rainbow-mode');
const eraserMode = document.getElementById('eraser-mode');
const clearMode = document.getElementById('clear-mode');
// DRAW, ERASE, AND CLEAR VARIABLES
const COLOR_WHITE = "#FFFFFF";
let currentMode = "DRAW";
// DRAW, ERASE, AND CLEAR LISTENERS
drawMode.addEventListener('click', changeToDrawMode);
rainbowMode.addEventListener('click', changeToRainbowMode);
eraserMode.addEventListener('click', changeToEraseMode);
clearMode.addEventListener('click', clearGrid);
// DRAW, ERASE, AND CLEAR STYLING
drawMode.classList.add('selected-mode');


// GRID FUNCTIONS
function createGrid(width){
    gridContainer.style.gridTemplateColumns = `repeat(${width}, 1fr)`;
    for (let i = 0; i < width * width; i++){
        const gridBox = document.createElement('div');
        gridBox.classList.add('grid-box');
        gridBox.addEventListener('mouseover', draw);
        gridBox.addEventListener('mousedown', (e) => {
            updateMouseDown(e);
            draw(e);
        });
        gridBox.addEventListener('mouseup', updateMouseDown);
        gridContainer.appendChild(gridBox);
    }
}

function removeGrid(){
    while (gridContainer.firstChild){
        gridContainer.removeChild(gridContainer.lastChild);
    }
}

function updateGridSizeOutput(size){ gridSizeOutput.textContent = `${size} x ${size}`; }

function resetGrid(newGridSize){
    removeGrid();
    createGrid(newGridSize);
    updateGridSizeOutput(newGridSize);
}

function updateMouseDown(e){
    if (e.type === 'mousedown'){
        mouseDown = true;
    }
    else{
        mouseDown = false;
    }
}

function draw(e){
    if (mouseDown || (e.type === 'mouseover' && mouseDown)){
        switch (currentMode) {
            case "DRAW":
                e.target.style.backgroundColor = userColor;
                break;
            case "RAINBOW":
                e.target.style.backgroundColor = getRandomColor();
                break;
            case "ERASE":
                e.target.style.backgroundColor = userColor;
                break;
        }
        
    }
}


// COLOR PICKER FUNCTIONS
function getCurrentColor(){ return colorPicker.value; }
function changeColor(color){ userColor = color; }
// random RGB color generator: https://www.slingacademy.com/article/how-to-generate-random-color-in-javascript/#:~:text=To%20generate%20a%20random%20RGB,string%20with%20commas%20and%20parentheses.
function getRandomColor() {
    let r = Math.floor(Math.random() * 256); // Random between 0-255
    let g = Math.floor(Math.random() * 256); // Random between 0-255
    let b = Math.floor(Math.random() * 256); // Random between 0-255
    return 'rgb(' + r + ',' + g + ',' + b + ')';
}


// DRAW, ERASE, AND CLEAR MODES
function changeToDrawMode() {
    userColor = getCurrentColor();
    currentMode = "DRAW";
    drawMode.classList.add('selected-mode');
    rainbowMode.classList.remove('selected-mode');
    eraserMode.classList.remove('selected-mode');
}

function changeToRainbowMode() {
    currentMode = "RAINBOW";
    drawMode.classList.remove('selected-mode');
    rainbowMode.classList.add('selected-mode');
    eraserMode.classList.remove('selected-mode');
}

function changeToEraseMode(){
    userColor = COLOR_WHITE;
    currentMode = "ERASE";
    drawMode.classList.remove('selected-mode');
    rainbowMode.classList.remove('selected-mode');
    eraserMode.classList.add('selected-mode');
}

function clearGrid(){
    const gridBoxes = document.getElementsByClassName('grid-box');
    for (let i = 0; i < gridBoxes.length; i++) {
        gridBoxes[i].style.backgroundColor = COLOR_WHITE;
    }
}