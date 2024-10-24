"use strict";

let state = "";
let clicked = false;
let totalFlies = 0;

function preload() {
    preloadOptions();
    preloadDecoration();
    preloadFrog();
}

/**
 * Creates the canvas and initializes the fly
 */
function setup() {
    createCanvas(1440, 810);
    state = "title";
    // setupDecoratingGame();
    setupFrogFrogFrog();
    setupDecoratingGame();
}

function draw() {
    if (state === "title") {
        drawMenu();
    } else if (state === "frog") {
        drawFrogFrogFrog();
    } else if (state === "choose") {
        drawOptions(); //sets options and draws selection menu and outlines
    } else if (state === "decorate") {
        console.log(decoObjects);
        drawDecoration();
        // drawTempImg();
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
        console.log(decoObjects);
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
            console.log("ahh");
            state = "choose";
        } else if (button.key === 1) {
            console.log("bbb");
            state = "title";
            resetGame();
        } else if (button.key === 2) { //Does not get triggered for some reason
            console.log("clickeddd");
            state = "decorate";
        } else if (button.key === 3) {
            console.log("ddd");
            state = "title";
            resetGame();
        } else if (button.key === 4) { //Does not get triggered for some reason
            console.log("boooo");
            state = "finished";
        } else if (button.key === 5) {
            console.log("eee");
            state = "title";
            resetGame();
        } else if (button.key === 6) {
            console.log("fff");
            state = "frog";
        } else if (button.key === 7) {
            console.log("ggg");
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


//Bugs
//Color of text is being funky and outline of buttons goes wank
//my buttons in general are wank

//Optional todo
//Price index in frogfrogfrog
//Fly swarm in frogfrogfrog
//Make tongue catching more intuitive

