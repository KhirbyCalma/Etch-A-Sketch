// get grid container to manipulate
const gridContainer = document.getElementById("grid-container");
function buildGrid(gridSize) {
    // update grid size text output
    gridSizeTextOutput.textContent = `${gridSize} x ${gridSize}`;
    // update grid css to dynamically adapt to grid sizes
    gridContainer.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
    // make 16 divs to act as gridboxes
    for (let i = 0; i < (gridSize * gridSize); i++) {
        // make individual div to act as a grid box 
        const gridBox = document.createElement("div");
        // add class to identify grid box
        gridBox.classList.add("grid-box");
        /* 
            change background color when mouse is down AND mouse is over the element
            cannot listen to multiple events so that is why multiple event listeners
            mousedown instead of click because click requires mouse down and mouse up 
        */
        gridBox.addEventListener("mousedown", () => {
            gridBox.style.backgroundColor = drawingColor;
        });
        // listening to both mouseover AND mousedown
        gridBox.addEventListener("mouseover", () => {
            if (mouseDown) {
                gridBox.style.backgroundColor = drawingColor;
            }
        });
        // add to grid container
        gridContainer.appendChild(gridBox);
    }
}

// get grid size slider to get grid size information from
const gridSizeSelector = document.getElementById("grid-size-selector");
// initialize global grid size
let gridSize = gridSizeSelector.value;
// listen for any grid size changes to update global grid size
gridSizeSelector.addEventListener("input", () => {
    gridSize = gridSizeSelector.value;
    // reset grid
    while (gridContainer.hasChildNodes()) {
        gridContainer.removeChild(gridContainer.lastChild)
    }
    buildGrid(gridSize);
});

// get grid size text output
const gridSizeTextOutput = document.getElementById("grid-size-text-output");

// get color picker to get color information from
const colorPicker = document.getElementById("color-picker");
// initialize global drawing color
let drawingColor = colorPicker.value;
// listen for any color changes to update global drawing color
colorPicker.addEventListener("input", () => {
    drawingColor = colorPicker.value;
});
// clicking it (not changing the color) will go back to drawing 
colorPicker.addEventListener("input", () => {
    drawingColor = colorPicker.value;
});

// get eraser to see if user wants to reset grid box color to white
const eraser = document.getElementById("eraser");
// listen for user clicking button to initiate eraser mode
eraser.addEventListener("click", () => {
    drawingColor = "white";
});

// listen for mouse down events for grid box condition
const body = document.querySelector("body");
let mouseDown = false;
body.addEventListener("mousedown", () => mouseDown = true);
body.addEventListener("mouseup", () => mouseDown = false);

document.addEventListener("DOMContentLoaded", () => buildGrid(gridSize));