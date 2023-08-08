// GRID ELEMENTS
const gridSizeSlider = document.getElementById('grid-size-slider');
const gridSizeOutput = document.getElementById('grid-size-output');
const gridContainer = document.getElementById('grid-container');
// GRID VARIABLES
let defaultGridSize = gridSizeSlider.value;
// GRID FUNCTIONS
updateGridSizeOutput(defaultGridSize);
createGrid(defaultGridSize);
// GRID EVENT LISTENERS
gridSizeSlider.addEventListener('input', (event) => resetGrid(event.target.value));


const colorSelector = document.getElementById('color-selector');
const colorMode = document.getElementById('color-mode');
const eraserMode = document.getElementById('eraser-mode');


const clearMode = document.getElementById('clear-mode');
let mouseDown = false;
let userColor = colorSelector.value;


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

function updateUserColor(color){userColor = color;}



function draw(e){
    if (mouseDown || (e.type === 'mouseover' && mouseDown)){
        e.target.style.backgroundColor = userColor;
    }
}

function changeColorMode(){
    updateUserColor(colorSelector.value);
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
    colorSelector.addEventListener('input', changeColorMode);
    colorSelector.addEventListener('change', changeColorMode);
    //
    colorMode.addEventListener('click', changeColorMode);
    eraserMode.addEventListener('click', changeEraseMode);
    //

    //
    clearMode.addEventListener('click', clearGrid);
}

