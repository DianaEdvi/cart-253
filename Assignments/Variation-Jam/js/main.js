/**
 * Ttile: Overloaded
 * By Diana Edvi
 * This is a game where you start off with a menial task that seems ridiculously boring, then get introduced to more and more tasks to do until there are too many to keep up with. Theoretically. In reality, it's pretty easy to keep up by the end.
 */

"use strict";

let hasClicked = false; // Track whether the user has clicked

const backgroundImages = { // The background images
    menu: "",
    game: ""
}

let gameStates = { // The states of the game
    current: undefined,
    menu: "menu",
    game: "game",
    end: "end",
}

/**
 * Load any necessary data
 */
function preload() {
    preloadPattern();
    menuProperties.backgroundImg = loadImage('assets/optical_illusion.png')
    backgroundImages.game = loadImage('assets/second_optical_illusion.jpg')
    endProperties.backgroundImg = loadImage('assets/third_optical_illusion.png')

    preloadAudio();
}

/**
 * Set up any necessary variables before the game begins
 */
function setup() {
    canvas = createCanvas(640, 640);
    background("#6160b2");
    resetGame();
    textSize(20);
}

/**
 * Draw the game
 */
function draw() {

    // Perform functionality depending on game state
    if (gameStates.current === gameStates.menu) {
        menu();
    } else if (gameStates.current === gameStates.game) {
        game();
    } else if (gameStates.current === gameStates.end) {
        stopGameAudio();
        end();
    }

    hasClicked = false;
}

/**
 * Crease bool checker for if the mouse has clicked
 */
function mouseClicked() {
    hasClicked = true;
}

//Bugs
// Reset the game isnt working as intended.
// Speeding isnt rly great either


