// get grid container to manipulate
const gridContainer = document.getElementById("grid-container");
// make 16 divs to act as gridboxes
for (let i = 0; i < 16; i++) {
    // make individual div 
    const gridBox = document.createElement("div");
    // add class to identify grid box
    gridBox.classList.add("grid-box");
    // add to grid container
    gridContainer.appendChild(gridBox);
}

