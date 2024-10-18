"use strict";
let decorations = {
    vaseTall: {
        x: 720,
        y: 405,
        w: 200,
        h: 200,
        img: "",
        dragging: false,
        colorVariations: [],
        currentVariation: 0,
    },
    vaseShort: {
        x: 0,
        y: 0,
        w: 0,
        h: 0,
        img: "",
        dragging: false
    },
    fishBowl: {
        x: 0,
        y: 0,
        w: 0,
        h: 0,
        img: "",
        dragging: false
    },
    fishTank: {
        x: 0,
        y: 0,
        w: 0,
        h: 0,
        img: "",
        dragging: false
    },
    tableShort: {
        x: 0,
        y: 0,
        w: 0,
        h: 0,
        img: "",
        dragging: false
    },
    tableLong: {
        x: 0,
        y: 0,
        w: 0,
        h: 0,
        img: "",
        dragging: false
    },
    rugCircle: {
        x: 0,
        y: 0,
        w: 0,
        h: 0,
        img: "",
        dragging: false
    },
    rugLong: {
        x: 0,
        y: 0,
        w: 0,
        h: 0,
        img: "",
        dragging: false
    },
    miscSnail: {
        x: 0,
        y: 0,
        w: 0,
        h: 0,
        img: "",
        dragging: false
    },
    miscStatue: {
        x: 0,
        y: 0,
        w: 0,
        h: 0,
        img: "",
        dragging: false
    },
}

let decoObjects = [];

function setupDecoratingGame() {
}

function preloadDecoration() {
    UI.decoUI.leftBar.panel.fly.img = loadImage("assets/images/decorations/fly.png");
    UI.decoUI.leftBar.panel.trashcan.img = loadImage("assets/images/decorations/garbage.png");

    //Preload all these goddamn images. There must be a better way
    decorations.vaseTall.colorVariations = [
        loadImage("assets/images/decorations/vase_tall_1.png"),
        loadImage("assets/images/decorations/vase_tall_2.png"),
        loadImage("assets/images/decorations/vase_tall_3.png"),
    ]
}

function drawDecoration() {
    setBackground();
    drawUI();
    for (let deco of decoObjects) {
        deco.updatePosition();
    }

}

function createNewDecoration(decoration, colorVariations, index) {
    //Create a new decoration at the center of the screen
    let newDeco = new Decoration(decoration, colorVariations);
    newDeco.changeColor(index);
    decoObjects.push(newDeco);
}

function keyPressed() {
    if (key === ' ') {
        createNewDecoration(decorations.vaseTall, decorations.vaseTall.colorVariations, 0);
    } else if (key === 'r') {
        createNewDecoration(decorations.vaseTall, decorations.vaseTall.colorVariations, 1);
    } else if (key === 'e') {
        createNewDecoration(decorations.vaseTall, decorations.vaseTall.colorVariations, 2);
    }
}


class Decoration {

    constructor(decoration, colorVariations) {
        this.x = decoration.x;
        this.y = decoration.y;
        this.w = decoration.w;
        this.h = decoration.h;
        this.colorVariations = colorVariations;
        this.currentVariation = decoration.currentVariation;
    }

    display() {
        imageMode(CENTER);
        image(this.colorVariations[this.currentVariation], this.x, this.y, this.w, this.h);
    }

    // Check if the mouse is over the decoration (bad)
    isMouseOver() {
        return mouseX > this.x - this.w / 4 && mouseX < this.x + this.w / 4 &&
            mouseY > this.y - this.h / 4 && mouseY < this.y + this.h / 4;
    }

    // Start dragging
    startDrag() {
        if (this.isMouseOver()) {
            this.dragging = true;
        }
    }

    // Stop dragging
    stopDrag() {
        this.dragging = false;
    }

    // Update the position if being dragged
    updatePosition() {
        if (this.dragging) {
            this.x = mouseX;
            this.y = mouseY;
        }
        this.display();
    }

    changeColor(index) {
        if (index >= 0 && index < 3) {
            this.currentVariation = index;
        }
    }

}

let selectedDeco = null;


/**
 * Iterates through the decoration objects in LIFO order because this is the order that they appear on the screen
 * Checks if mouse is over an object and if so gives it higher draw priority (draws on top of other items)
 * Then it implements the drag function
 */
function mousePressed() {
    // Iterate through decoObjects in reverse order so that the last drawn object is what is selected
    for (let i = decoObjects.length - 1; i >= 0; i--) {
        let deco = decoObjects[i];
        if (deco.isMouseOver()) {
            selectedDeco = deco; // Store the topmost decoration

            // Remove selectedDeco from its current position
            decoObjects.splice(i, 1);
            // Add it to the end of the array (this gives it higher draw priority)
            decoObjects.push(selectedDeco);
            deco.startDrag();
            break; // Exit loop after selecting one
        }
    }
}

/**
 * Checks if the selected object is not null and freezes its position once the mouse is released
 * Also checks if the released location is over the trashcan and deletes it if it is
 */
function mouseReleased() {
    //If selected decoration is not null, stop dragging it
    if (selectedDeco) {
        selectedDeco.stopDrag();
        selectedDeco = null; // Reset selected decoration to null
    }

    //If mouse is over trashcan, delete object
    destroyDecoration(decoObjects.indexOf(selectedDeco));
}

/**
 * Destroys a Decoration object upon placing it within the bounds of the trashcan
 * @param index the index of the object to be deleted
 */
function destroyDecoration(index) {
    //Calculate the area of the trashcan
    if (mouseX > UI.decoUI.leftBar.panel.trashcan.x - UI.decoUI.leftBar.panel.trashcan.w / 2
        && mouseX < UI.decoUI.leftBar.panel.trashcan.x + UI.decoUI.leftBar.panel.trashcan.w / 2
        && mouseY > UI.decoUI.leftBar.panel.trashcan.y - UI.decoUI.leftBar.panel.trashcan.h / 2
        && mouseY < UI.decoUI.leftBar.panel.trashcan.y + UI.decoUI.leftBar.panel.trashcan.h / 2) {
        //Delete the object
        decoObjects.splice(index, 1);
    }
}






