/**
 * Title of Project
 * Author Name
 *
 * HOW EMBARRASSING! I HAVE NO DESCRIPTION OF MY PROJECT!
 * PLEASE REMOVE A GRADE FROM MY WORK IF IT'S GRADED!
 */

"use strict";

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
    patternTimeout: undefined
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

const backgroundImages = {
    menu: "",
    game: ""
}

let gameState = "menu";

let gameStates = {
    current: undefined,
    menu: "menu",
    game: "game",
    end: "end",
}

let audio = {
    background: undefined,
    pong: undefined,
    cow: undefined,
    mathing: undefined,
    pattern: undefined,
}

function preload() {
    preloadPattern();
    menuProperties.backgroundImg = loadImage('assets/optical_illusion.png')
    backgroundImages.game = loadImage('assets/second_optical_illusion.jpg')
    endProperties.backgroundImg = loadImage('assets/third_optical_illusion.png')

    audio.pong = loadSound('assets/sounds/pong.wav');
}

function keyPressed() {
    if (key === ' ') {
        console.log("space")
        if (!audio.pong.isPlaying()) {
            audio.pong.play();
        }
    }
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

    if (gameState === "menu") {
        menu();
    } else if (gameState === "game") {
        game();
    } else if (gameState === "end") {
        end();
    }

    hasClicked = false;
}

function game() {
    image(backgroundImages.game, 0, 0, width, height);
    // menu();
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
    if (counters.math >= 1) {
        activateBannerOnce(counters.math, activeTasks.patterns, 1);
        patterns();
    }
    handleHealth();
    manageFailState();
    // end();
}

/**
 * Reset the game properties and tasks
 */
function resetGame() {
    resetBall();
    resetCow(cow);
    resetPatterns();
    gameState = "menu";

    counters.pong = 0;
    counters.cow = 0;
    counters.math = 0;

    healthBar.healthPoints.currentValue = 100;
    healthBar.healthPoints.animation.gainingHealth.isActive = false;
    healthBar.healthPoints.animation.losingHealth.isActive = false;
}


/**
 * Crease bool checker for if the mouse has clicked
 */
function mouseClicked() {
    hasClicked = true;
}


//Todo
// import assets (sound and drawings)
// check for microphone and mouse inputs
// talk into mic function
// Set the time on the clock
// Audio of me rambling
// Timer for how long the player lasted
// menu
// end game

//Bugs
// The paddle is weird if you hit it on the side. Will i fix?? prolly not
// Health bar

