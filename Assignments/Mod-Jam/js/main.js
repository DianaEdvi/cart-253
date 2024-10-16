"use strict";

let state = "";
let clicked = false;

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
        drawOptions(); //sets options and draws selection menu and outlines
    } else if (state === "decorate") {
        drawDecoration();
    } else if (state === "finished") {
        drawEnd();
    }
}

function menuController() {
    //RESET EVERYTHING
    resetGame();
}

function mouseClicked() {
    clicked = true;
    if (state === "title") {
        menuController();
        // buttonHandlerMenu();
    } else if (state === "choose") {
        outlineSelections(); //sets palette and background
        buttonHandlerOptions(buttons.ready);
        // check = buttonCheck();
    } else if (state === "decorate") {
        buttonHandlerOptions(buttons.finished);
        // buttonHandlerDecorate();
    } else if (state === "finished") {
        finishedController();
    }
}

function resetGame() {
    backgroundImage = "";
    colorSelect = "";
}

function finishedController() {
}

//Bugs
//Color of text is being funky and outline of buttons goes wank