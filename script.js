const gridContainer = document.getElementById('grid-container');

function createGrid(width){
    gridContainer.style.gridTemplateColumns = `repeat(${width}, 1fr)`;
    for (let i = 0; i < width * width; i++){
        const gridBox = document.createElement('div');
        gridBox.classList.add('grid-box');
        gridContainer.appendChild(gridBox);
    }
}

createGrid(16);