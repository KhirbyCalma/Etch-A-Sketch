const gridContainer = document.getElementById('grid-container');
let mouseDown = false;

function createGrid(width){
    gridContainer.style.gridTemplateColumns = `repeat(${width}, 1fr)`;
    for (let i = 0; i < width * width; i++){
        const gridBox = document.createElement('div');
        gridBox.classList.add('grid-box');
        gridBox.addEventListener('mouseover', changeColor);
        gridBox.addEventListener('mousedown', (e) => {
            updateMouseDown(e);
            changeColor(e);
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

function changeColor(e){
    if (mouseDown || (e.type === 'mouseover' && mouseDown)){
        e.target.style.backgroundColor = 'red';
    }
}

createGrid(16);