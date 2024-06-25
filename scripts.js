// listen for mouse down events for grid box condition
const body = document.querySelector("body");
let mouseDown = false;
body.addEventListener("mousedown", () => mouseDown = true);
body.addEventListener("mouseup", () => mouseDown = false);

// get grid container to manipulate
const gridContainer = document.getElementById("grid-container");
// make 16 divs to act as gridboxes
for (let i = 0; i < 16; i++) {
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
        gridBox.style.backgroundColor = "grey";
    });
    // listening to both mouseover AND mousedown
    gridBox.addEventListener("mouseover", () => {
        if (mouseDown) {
            gridBox.style.backgroundColor = "grey";
        }
    });
    // add to grid container
    gridContainer.appendChild(gridBox);
}

