"use strict";

let state = "decorate";

/**
 * Creates the canvas and initializes the fly
 */
function setup() {
    createCanvas(640, 480);

    setupFrogFrogFrog();
}

function draw() {
    if (state === "title") {
        background("red");
    } else if (state === "frog") {
        drawFrogFrogFrog();
    } else if (state === "decorate") {
        drawDecoratingGame();
    } else if (state === "end") {
        background("black");
    }
}


function drawMenu() {

}

function drawEnd() {

}