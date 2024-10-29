"use strict";

let state = "";
let clicked = false;
let totalFlies = 0;
let canvas = undefined;
// let png = undefined;
let spacePressed = false;


function preload() {
    preloadOptions();
    preloadDecoration();
    preloadFrog();
}

/**
 * Creates the canvas and initializes the fly
 */
function setup() {
    canvas = createCanvas(1440, 810);
    state = "title";
    // setupDecoratingGame();
    setupFrogFrogFrog();
    setupDecoratingGame();
    UI.endUI.png.img = createImage(490, 405);

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
        // drawTempImg();
    } else if (state === "finished") {
        drawEnd();
        // drawPNG();
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
        decoMouseClicked();
        buttonHandlerOptions(buttons.finished);
        // buttonHandlerDecorate();
    } else if (state === "finished") {
        finishedController();
    }
}

function resetGame() {
    backgroundImage = "";
    colorSelect = "";
    totalFlies = 0;
    UI.decoUI.leftBar.panel.txt.txt = " =   " + totalFlies;

    //Destroy objects
    if (decoObjects !== null) {
        for (let i = 0; i < decoObjects.length; i++) {
            destroyDecoration(i);
        }
    }
}

function finishedController() {
}

//IDK wtf is going on over here
function buttonHandler(button) {
    const minX = button.x - button.w / 2;
    const maxX = button.x + button.w / 2;
    const minY = button.y - button.h / 2;
    const maxY = button.y + button.h / 2;

    //Button handling (play)
    if (mouseX > minX && mouseX < maxX && mouseY > minY && mouseY < maxY && clicked === true) {
        if (button.key === 0) {
            state = "choose";
        } else if (button.key === 1) {
            state = "title";
            resetGame();
        } else if (button.key === 2) { //Does not get triggered for some reason
            state = "decorate";
        } else if (button.key === 3) {
            state = "title";
            resetGame();
        } else if (button.key === 4) { //Does not get triggered for some reason
            state = "finished";
        } else if (button.key === 5) {
            state = "title";
            resetGame();
        } else if (button.key === 6) {
            state = "frog";
        } else if (button.key === 7) {
            state = "decorate";
            resetCounter();
            console.log(totalFlies);
        }
    }
    clicked = false;
}

function mousePressed() {
    if (state === "frog") {
        mousePressedFrog();
    } else if (state === "decorate") {
        mousePressedDecorate();
    }
}

function mouseReleased() {
    mouseReleasedDecorate();
}


/**
 * If the user clicks 's' and is in the end state, they will download a PNG of their creation
 * @param event
 */
function keyTyped(event) {
    if (state === "finished") {
        if (event.key === "s" || event.key === "S") {
            UI.endUI.png.img.save("png", "png");
        }
    }

}

//Bugs
//my buttons in general are wank

//Optional todo
//Price index in frogfrogfrog
//Fly swarm in frogfrogfrog
//Make tongue catching more intuitive

