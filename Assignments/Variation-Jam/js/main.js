/**
 * Title of Project
 * Author Name
 *
 * HOW EMBARRASSING! I HAVE NO DESCRIPTION OF MY PROJECT!
 * PLEASE REMOVE A GRADE FROM MY WORK IF IT'S GRADED!
 */

"use strict";

let buttons = {
    soloButton: undefined,
    mathButton: undefined,
    colorButton: undefined,
    questionButton: undefined
}
let states = {
    current: undefined,
    menu: "menu",
    soloPong: "solo",
    mathPong: "math",
    colorPong: "color",
}
let playingBanner = true;

let activeTasks = {
    task: "",
    soloPong: false,
    randomCow: false,
    mathing: false,
    patterns: false
}

let timers = {
    bannerTimerStarted: false, // The timer for keeping the banner on the screen for 3 seconds
    cowTimerStarted: false,
    mathingStarted: false,
    patternStarted: false,
    answerTimeout: undefined,
    mathTimout: undefined,
}

let counters = {
    pong: 0,
    cow: 0,
    math: 0,
}

let successes = {
    cowSuccess: false,
    mathSuccess: false,
}

let hasClicked = false;


function preload() {
    preloadPattern();
}

/**
 * Set up any necessary variables before the game begins
 */
function setup() {
    canvas = createCanvas(640, 640);
    background("#6160b2");
    states.current = states.menu;
    resetGame();
    textSize(20);
}

/**
 * Draw the game
 */
function draw() {
    background("#6160b2");
    if (playingBanner) {
        bannerAnimation(banners.text.text);
    }
    soloPong(paddle, ball);

    // Handle cow tasks
    if (counters.pong >= 1) {
        activateBannerOnce(counters.pong, activeTasks.randomCow, 1);
        randomCow(cow);

        // Repeat the cow task periodically
        if (!timers.cowTimerStarted) {
            timers.cowTimerStarted = true;
            setTimeout(() => {
                randomCow(cow)
                timers.cowTimerStarted = false;
            }, 2000);
        }
    }
    // Handle math tasks
    if (counters.cow >= 1) {
        activateBannerOnce(counters.cow, activeTasks.mathing, 1);
        mathing();

        // Repeat the cow task periodically
        if (!timers.cowTimerStarted) {
            timers.cowTimerStarted = true;
            setTimeout(() => {
                randomCow(cow)
                timers.cowTimerStarted = false;
            }, 2000);
        }
    }
    if (counters.math >= 3) {
        activateBannerOnce(counters.math, activeTasks.patterns, 3);
        patterns();

        // Repeat the cow task periodically
        if (!timers.patternStarted) {
            timers.patternStarted = true;
            setTimeout(() => {
                patterns();
                timers.patternStarted = false;
                console.log("counting")
            }, 2000);
        }
    }
    handleHealth();
    displayHealth();
    hasClicked = false;
}

/**
 * Reset the game properties and tasks
 */
function resetGame() {
    resetBall();
    resetCow(cow);
    resetPatterns();
}


/**
 * Crease bool checker for if the mouse has clicked
 */
function mouseClicked() {
    hasClicked = true;
}


//Todo
// import assets (sound and drawings)
// import a font im sick of this one
// check for microphone and mouse inputs
// water plant function
// scream into mic function
// Type what you see (select text box and type)
// Set the time on the clock
// Flappy bird?
// Audio of me rambling
// Timer for how long the player lasted
// menu
// end game

//Bugs
// The paddle is weird if you hit it on the side. Will i fix?? prolly not
// Health bar

