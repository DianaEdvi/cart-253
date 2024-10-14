"use strict";

let state = "decorate";

function preload() {
    preLoadDecoratingGame();
}

/**
 * Creates the canvas and initializes the fly
 */
function setup() {
    createCanvas(1440, 810);
    state = "choose";
    // setupDecoratingGame();
    setupFrogFrogFrog();
}

function draw() {
    if (state === "title") {
        background("red");
    } else if (state === "frog") {
        drawFrogFrogFrog();
    } else if (state === "choose") {
        selectionState();
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