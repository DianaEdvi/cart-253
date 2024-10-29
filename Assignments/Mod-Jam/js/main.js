"use strict";

let state = ""; //The state the game is in
let clicked = false; //Whether the mouse has been clicked or not
let totalFlies = 0; //The total flies the player has
let canvas = undefined; //The canvas

/**
 * The main preload function that preloads all the other preload functions
 */
function preload() {
    preloadOptions();
    preloadDecoration();
    preloadFrog();
}

/**
 * Creates the canvas and initializes the fly
 * Also calls other setup functions
 */
function setup() {
    canvas = createCanvas(1440, 810);
    state = "title";
    setupFrogFrogFrog();
    setupDecoratingGame();
    //Create the base png for the end
    UI.endUI.png.img = createImage(490, 405);
}

/**
 * The main draw function. Calls all the other draw functions depending on which state the game is in
 */
function draw() {
    if (state === "title") {
        drawMenu();
    } else if (state === "frog") {
        drawFrogFrogFrog();
    } else if (state === "choose") {
        drawOptions(); //Sets options and draws selection menu and outlines
    } else if (state === "decorate") {
        drawDecoration();
    } else if (state === "finished") {
        drawEnd();
    }
}

/**
 * The main mouseClicked function
 * Handles mouse clicked logic depending on the state the game is in
 */
function mouseClicked() {
    clicked = true;
    if (state === "title") {
        //Reset the game
        resetGame();
    } else if (state === "choose") {
        outlineSelections(); //sets palette and background
        buttonHandlerOptions(buttons.ready); //Handles button logic for "ready" button (exception)
        // check = buttonCheck();
    } else if (state === "decorate") {
        decoMouseClicked(); //Handle mouse clicking for shop buttons
        buttonHandlerOptions(buttons.finished); //Handles button logic for "finished" button (exception)
    } else if (state === "finished") {
        //Hi, the mouse click events for the finished state is in the buttonHandler function, don't ask me why
    }
}

/**
 * Resets all the game properties
 */
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

//IDK wtf is going on over here
/**
 * Handles the button logic for the game
 * @param button The properties of the current button
 */
function buttonHandler(button) {
    //Calculate the min and max bounds
    const minX = button.x - button.w / 2;
    const maxX = button.x + button.w / 2;
    const minY = button.y - button.h / 2;
    const maxY = button.y + button.h / 2;

    //Change states accorsding to which button was pressed
    //Yes, I got rid of 3. It's not a mistake
    if (mouseX > minX && mouseX < maxX && mouseY > minY && mouseY < maxY && clicked === true) {
        if (button.key === 0) {
            state = "choose";
        } else if (button.key === 1) {
            state = "title";
            resetGame();
        } else if (button.key === 2) { //Does not get triggered for some reason
            state = "decorate";
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
        }
    }
    clicked = false;
}

/**
 * Main mousePressed function that calls the other mousePressed functions depending on the state
 *
 */
function mousePressed() {
    if (state === "frog") {
        mousePressedFrog();
    } else if (state === "decorate") {
        mousePressedDecorate();
    }
}

/**
 * Main mouseReleased function that calls other mouseReleased functions
 */
function mouseReleased() {
    //What a lonely function, all by their lonesome, being lonely
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