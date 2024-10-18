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
        x: 720,
        y: 405,
        w: 200,
        h: 200,
        img: "",
        dragging: false,
        colorVariations: [],
        currentVariation: 0,
    },
    fishBowl: {
        x: 720,
        y: 405,
        w: 200,
        h: 200,
        img: "",
        dragging: false,
        colorVariations: [],
        currentVariation: 0,
    },
    fishTank: {
        x: 720,
        y: 405,
        w: 200,
        h: 200,
        img: "",
        dragging: false,
        colorVariations: [],
        currentVariation: 0,
    },
    tableShort: {
        x: 720,
        y: 405,
        w: 200,
        h: 200,
        img: "",
        dragging: false,
        colorVariations: [],
        currentVariation: 0,
    },
    tableLong: {
        x: 720,
        y: 405,
        w: 200,
        h: 200,
        img: "",
        dragging: false,
        colorVariations: [],
        currentVariation: 0,
    },
    rugCircle: {
        x: 720,
        y: 405,
        w: 200,
        h: 200,
        img: "",
        dragging: false,
        colorVariations: [],
        currentVariation: 0,
    },
    rugLong: {
        x: 720,
        y: 405,
        w: 200,
        h: 200,
        img: "",
        dragging: false,
        colorVariations: [],
        currentVariation: 0,
    },
    miscSnail: {
        x: 720,
        y: 405,
        w: 200,
        h: 200,
        img: "",
        dragging: false,
        colorVariations: [],
        currentVariation: 0,
    },
    miscStatue: {
        x: 720,
        y: 405,
        w: 200,
        h: 200,
        img: "",
        dragging: false,
        colorVariations: [],
        currentVariation: 0,
    },
}

let decoObjects = [];

function setupDecoratingGame() {
}

/**
 * Preloads all the images used by the decoration game
 */
function preloadDecoration() {
    //Preload UI images
    UI.decoUI.leftBar.panel.fly.img = loadImage("assets/images/decorations/fly.png");
    UI.decoUI.leftBar.panel.trashcan.img = loadImage("assets/images/decorations/garbage.png");

    //Preload decoration images
    decorations.vaseTall.colorVariations = [
        loadImage("assets/images/decorations/vase_tall_1.png"),
        loadImage("assets/images/decorations/vase_tall_2.png"),
        loadImage("assets/images/decorations/vase_tall_3.png"),
    ]
    decorations.vaseShort.colorVariations = [
        loadImage("assets/images/decorations/vase_short_1.png"),
        loadImage("assets/images/decorations/vase_short_2.png"),
        loadImage("assets/images/decorations/vase_short_3.png"),
    ]
    decorations.fishBowl.colorVariations = [
        loadImage("assets/images/decorations/fishbowl_1.png"),
        loadImage("assets/images/decorations/fishbowl_2.png"),
        loadImage("assets/images/decorations/fishbowl_3.png"),
    ]
    decorations.fishTank.colorVariations = [
        loadImage("assets/images/decorations/fishTank_1.png"),
        loadImage("assets/images/decorations/fishTank_2.png"),
        loadImage("assets/images/decorations/fishTank_3.png"),
    ]
    decorations.miscStatue.colorVariations = [
        loadImage("assets/images/decorations/grandma_statue_1.png"),
        loadImage("assets/images/decorations/grandma_statue_2.png"),
        loadImage("assets/images/decorations/grandma_statue_3.png"),
    ]
    decorations.miscSnail.colorVariations = [
        loadImage("assets/images/decorations/snail_clock_1.png"),
        loadImage("assets/images/decorations/snail_clock_2.png"),
        loadImage("assets/images/decorations/snail_clock_3.png"),
    ]
    decorations.rugCircle.colorVariations = [
        loadImage("assets/images/decorations/rug_circle_1.png"),
        loadImage("assets/images/decorations/rug_circle_2.png"),
        loadImage("assets/images/decorations/rug_circle_3.png"),
    ]
    decorations.rugLong.colorVariations = [
        loadImage("assets/images/decorations/rug_long_1.png"),
        loadImage("assets/images/decorations/rug_long_2.png"),
        loadImage("assets/images/decorations/rug_long_3.png"),
    ]
    decorations.tableLong.colorVariations = [
        loadImage("assets/images/decorations/table_long_1.png"),
        loadImage("assets/images/decorations/table_long_2.png"),
        loadImage("assets/images/decorations/table_long_3.png"),
    ]
    decorations.tableShort.colorVariations = [
        loadImage("assets/images/decorations/table_short_1.png"),
        loadImage("assets/images/decorations/table_short_2.png"),
        loadImage("assets/images/decorations/table_short_3.png"),
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
        createNewDecoration(decorations.fishBowl, decorations.fishBowl.colorVariations, 0);
    } else if (key === 'r') {
        createNewDecoration(decorations.rugLong, decorations.rugLong.colorVariations, 1);
    } else if (key === 'e') {
        createNewDecoration(decorations.tableLong, decorations.tableLong.colorVariations, 2);
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
function mousePressedDecorate() {
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
function mouseReleasedDecorate() {
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






