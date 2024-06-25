// QUERY SELECTORS
const body = document.querySelector("body");
const gridContainer = document.getElementById("grid-container");
const gridColumnsSelector = document.getElementById("grid-columns-selector");
const gridSizeTextOutput = document.getElementById("grid-size-text-output");
const colorPicker = document.getElementById("color-picker");
const drawBtn = document.getElementById("draw");
const eraserBtn = document.getElementById("eraser");
const clearBtn = document.getElementById("clear");

// EVENT LISTENERS
document.addEventListener("DOMContentLoaded", () => buildGrid(gridColumns));
body.addEventListener("mousedown", () => mouseDown = true);
body.addEventListener("mouseup", () => mouseDown = false);
gridColumnsSelector.addEventListener("input", () => buildGrid(gridColumnsSelector.value));
colorPicker.addEventListener("input", () => drawingColor = colorPicker.value);
colorPicker.addEventListener("click", () => drawingColor = colorPicker.value);
drawBtn.addEventListener("click", () => drawingColor = colorPicker.value);
eraserBtn.addEventListener("click", () => drawingColor = "white");
clearBtn.addEventListener("click", () => {
    // get all grid boxes to manipulate their background color
    const gridBoxes = document.getElementsByClassName("grid-box");
    // go through each grid box to change their background color to white
    for (const gridBox of gridBoxes) {
        gridBox.style.backgroundColor = "white";
    }
});

// INITIALIZED VARIABLES
let mouseDown = false;
let gridColumns = gridColumnsSelector.value;
let drawingColor = colorPicker.value;

// FUNCTIONS
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