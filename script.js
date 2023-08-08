// GRID ELEMENTS
const gridSizeSlider = document.getElementById('grid-size-slider');
const gridSizeOutput = document.getElementById('grid-size-output');
const gridContainer = document.getElementById('grid-container');
// GRID VARIABLES
const defaultGridSize = gridSizeSlider.value;
let mouseDown = false;
// GRID FUNCTIONS
updateGridSizeOutput(defaultGridSize);
createGrid(defaultGridSize);
// GRID EVENT LISTENERS
gridSizeSlider.addEventListener('input', (event) => resetGrid(event.target.value));


// COLOR PICKER ELEMENTS
const colorPicker = document.getElementById('color-picker');
// COLOR PICKER VARIABLES
const userColor = colorPicker.value;
// COLOR PICKER FUNCTIONS
colorPicker.addEventListener('input', (event) => changeColor(event.target.value));
colorPicker.addEventListener('change', (event) => changeColor(event.target.value));

const colorMode = document.getElementById('color-mode');
const eraserMode = document.getElementById('eraser-mode');


const clearMode = document.getElementById('clear-mode');


// OTHER VARIABLES
const COLOR_WHITE = "#FFFFFF";


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

function clearGrid(){
    const gridBoxes = document.getElementsByClassName('grid-box');
    for (let i = 0; i < gridBoxes.length; i++) {
        gridBoxes[i].style.backgroundColor = COLOR_WHITE;
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
        e.target.style.backgroundColor = userColor;
    }
}

// COLOR PICKER FUNCTIONS
function changeColor(color){userColor = color;}





function changeColorMode(color){
    updateUserColor(colorPicker.value);
    colorMode.classList.add('mode-select');
    eraserMode.classList.remove('mode-select');
}

function changeEraseMode(){
    updateUserColor('#ffffff');
    colorMode.classList.remove('mode-select');
    eraserMode.classList.add('mode-select');
}




window.onload = () => {
    // color mode set to default
    colorMode.classList.add('mode-select');
    //

    //
    colorMode.addEventListener('click', changeColorMode);
    eraserMode.addEventListener('click', changeEraseMode);
    //

    //
    clearMode.addEventListener('click', clearGrid);
}

