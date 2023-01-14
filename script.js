const gridContainer = document.getElementById('grid-container');
const colorSelector = document.getElementById('color-selector');
const colorMode = document.getElementById('color-mode');
const eraserMode = document.getElementById('eraser-mode');
let mouseDown = false;
let userColor = colorSelector.value;

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
    // default grid size
    createGrid(16);
    // color mode set to default
    colorMode.classList.add('mode-select');
    //
    colorSelector.addEventListener('input', changeColorMode);
    colorSelector.addEventListener('change', changeColorMode);
    //
    colorMode.addEventListener('click', changeColorMode);
    eraserMode.addEventListener('click', changeEraseMode);
}