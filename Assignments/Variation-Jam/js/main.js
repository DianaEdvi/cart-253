/**
 * Title of Project
 * Author Name
 *
 * HOW EMBARRASSING! I HAVE NO DESCRIPTION OF MY PROJECT!
 * PLEASE REMOVE A GRADE FROM MY WORK IF IT'S GRADED!
 */

"use strict";

let timers = {
    bannerTimerStarted: false, // The timer for keeping the banner on the screen for 3 seconds
    answerTimeout: undefined,
    patternTimeout: undefined,
    cowTimeout: undefined
}

let hasClicked = false;

const backgroundImages = {
    menu: "",
    game: ""
}

let gameStates = {
    current: undefined,
    menu: "menu",
    game: "game",
    end: "end",
}


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


//Todo
// Pause at beginning?
// speed up the game
// refractor the code
// comments

//Bugs
// Reset the game isnt working as intended.


