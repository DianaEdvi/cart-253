"use strict";

let circleeee = {
    x: 100,
    y: 100,
    size: 50
}

let holding = false;
let clickXPosition = 0;
let clickYPosition = 0;

let decorations = {
    vaseTall: {
        x: 500,
        y: 300,
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

let deco;
let deco2;
let deco3;


let decoObjects = [];

function setupDecoratingGame() {
    deco = new Decoration(decorations.vaseTall, decorations.vaseTall.colorVariations);
    deco2 = new Decoration(decorations.vaseTall, decorations.vaseTall.colorVariations);
    deco3 = new Decoration(decorations.vaseTall, decorations.vaseTall.colorVariations);
    decoObjects.push(deco, deco2, deco3);
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
    deco.changeColor(2);
    deco.updatePosition();
    // deco.display();
    console.log(deco.isMouseOver());
}

function followMouse() {
    //Follow mouse y position and constrain it to the borders, taking into consideration the car's size
    circleeee.x = mouseX;
    circleeee.y = mouseY;

    if (holding === true) {
        drawCircle();
    } else {
        circleeee.x = clickXPosition;
        circleeee.y = clickYPosition;
        drawCircle();

    }
}

function moveObject() {
    if (holding === false) {
        holding = true;
    } else if (holding === true) {
        holding = false;
        clickXPosition = mouseX;
        clickYPosition = mouseY;
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

function mousePressed() {
    deco.startDrag();
}

function mouseReleased() {
    deco.stopDrag();
}

//To draw a deco onto the screen
//preload deco
//instantiate new deco
//call display








