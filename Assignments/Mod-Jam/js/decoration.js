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
        w: 400,
        h: 400,
        img: "",
        dragging: false
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


function setupDecoratingGame() {
    deco = new Decoration(decorations.vaseTall);
}

function preloadDecoration() {
    UI.decoUI.leftBar.panel.fly.img = loadImage("assets/images/decorations/fly.png");
    UI.decoUI.leftBar.panel.trashcan.img = loadImage("assets/images/decorations/garbage.png");

    //Preload all these goddamn images. There must be a better way
    decorations.vaseTall.img = loadImage("assets/images/decorations/vase_tall_1.png");
}


function drawDecoration() {
    setBackground();
    drawUI();
    deco.updatePosition();
    deco.display();
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

    constructor(decoration) {
        this.x = decoration.x;
        this.y = decoration.y;
        this.w = decoration.w;
        this.h = decoration.h;
        this.img = decoration.img;

    }

    display() {
        imageMode(CENTER);
        image(this.img, this.x, this.y, this.w, this.h);
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








