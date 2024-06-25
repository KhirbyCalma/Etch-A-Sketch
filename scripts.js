// listen for mouse down events for grid box condition
const body = document.querySelector("body");
let mouseDown = false;
body.addEventListener("mousedown", () => mouseDown = true);
body.addEventListener("mouseup", () => mouseDown = false);

// get grid elements to manipulate
const gridContainer = document.getElementById("grid-container");
const gridColumnsSelector = document.getElementById("grid-columns-selector");
const gridSizeTextOutput = document.getElementById("grid-size-text-output");

let gridColumns = gridColumnsSelector.value;

document.addEventListener("DOMContentLoaded", () => buildGrid(gridColumns));
gridColumnsSelector.addEventListener("input", () => buildGrid(gridColumnsSelector.value));

function buildGrid(newGridColumns) {
    // update grid size text output
    gridSizeTextOutput.textContent = `${newGridColumns} x ${newGridColumns}`;
    // update grid css to dynamically adapt to grid size
    gridContainer.style.gridTemplateColumns = `repeat(${newGridColumns}, 1fr)`;
    // make gridboxes
    let newGridBoxAmount = newGridColumns * newGridColumns;
    let oldGridBoxAmount = gridContainer.childElementCount;
    // if new grid box amount more than old, need to add the difference
    if (newGridBoxAmount >= oldGridBoxAmount) {
        for (let i = 0; i < (newGridBoxAmount - oldGridBoxAmount); i++) {
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
    // if new grid amount less than old, need to remove the difference
    else {
        for (let i = 0; i < (oldGridBoxAmount - newGridBoxAmount); i++) {
            gridContainer.removeChild(gridContainer.lastChild);
        }
    }
}

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

// get draw button to listen to
const draw = document.getElementById("draw");
// list for user clicking button to initiate drawing mode
draw.addEventListener("click", () => drawingColor = colorPicker.value);

// get eraser to see if user wants to reset grid box color to white
const eraser = document.getElementById("eraser");
// listen for user clicking button to initiate eraser mode
eraser.addEventListener("click", () => {
    drawingColor = "white";
});

// get clear button to listen to
const clear = document.getElementById("clear");
// listen for user clicking button to initiate eraser mode
clear.addEventListener("click", () => {
    // get all grid boxes to manipulate their background color
    const gridBoxes = document.getElementsByClassName("grid-box");
    // go through each grid box to change their background color to white
    for (const gridBox of gridBoxes) {
        gridBox.style.backgroundColor = "white";
    }
});
