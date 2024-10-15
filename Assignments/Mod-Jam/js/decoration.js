"use strict";

let circleeee = {
    x: 100,
    y: 100,
    size: 50
}

let holding = false;
let clickXPosition = 0;
let clickYPosition = 0;


function setupDecoratingGame() {
}


function drawDecoration() {
    drawBackground();
    drawUI();
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

function buttonHandlerDecorate() {

    if (mouseX > 45 && mouseX < 185 && mouseY > 650 && mouseY < 730 && state === "decorate") {
        state = "title";
    } else if (mouseX > 1260 && mouseX < 1400 && mouseY > 650 && mouseY < 730 && state === "decorate") {
        state = "finished";
    }


}

rect(1260, 650, 140, 80, 20);
rect(45, 650, 140, 80, 20);








