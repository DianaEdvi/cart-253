"use strict";

let state = "";

function preload() {
    preloadOptions();
}

/**
 * Creates the canvas and initializes the fly
 */
function setup() {
    createCanvas(1440, 810);
    state = "title";
    // setupDecoratingGame();
    setupFrogFrogFrog();
}

function draw() {
    if (state === "title") {
        drawMenu();
    } else if (state === "frog") {
        drawFrogFrogFrog();
    } else if (state === "choose") {
        selectionState();
        // drawOptions();
    } else if (state === "decorate") {
        decorationController();
    } else if (state === "finished") {
        background("black");
    }
}

function menuController() {
    //RESET EVERYTHING
    resetGame();

    //Button handling (play)
    if (mouseX > 520 && mouseX < 920 && mouseY > 305 && mouseY < 505 && state === "title") {
        state = "choose";
    }
}

function mouseClicked() {
    if (state === "title") {
        menuController();
    } else if (state === "choose") {
        outlineSelections();
        buttonHandler();
    } else if (state === "decorate") {
        decorationController();
    } else if (state === "finished") {
        finishedController();
    }

}

function resetGame() {
    state = "title";
    backgroundImage = "";
    colorSelect = "";
}


function finishedController() {

}