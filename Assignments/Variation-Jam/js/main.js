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


let sounds = [];

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

    if (gameState === "menu") {
        menu();
    } else if (gameState === "game") {
        game();
    } else if (gameState === "end") {
        stopGameAudio();
        end();
    }

    hasClicked = false;
}

function game() {
    image(backgroundImages.game, 0, 0, width, height);
    if (playingBanner) {
        if (counters.pong < 1) {
            playSound(audio.tutorials.pong);

            setTimeout(() => {
                if (!audio.comments.goingGreat.hasPlayed) {
                    playSound(audio.comments.goingGreat.audio);
                    audio.comments.goingGreat.hasPlayed = true;
                }
            }, 15000)
        }
        bannerAnimation(banners.text.text);
    }
    soloPong(paddle, ball);


    // Handle cow tasks
    if (counters.pong >= 2) {
        activateBannerOnce(counters.pong, activeTasks.randomCow, 2, audio.tutorials.cow);
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
    if (counters.cow >= 3) {
        if (!audio.gameSounds.moo_1.isPlaying() && !audio.gameSounds.moo_2.isPlaying()) {
            activateBannerOnce(counters.cow, activeTasks.mathing, 3, audio.tutorials.mathing);
        }
        mathing();

        setTimeout(() => {
            if (!audio.comments.music.hasPlayed && gameState === "game") {
                playSound(audio.comments.music.audio);
                audio.comments.music.hasPlayed = true;
            }
        }, 10000)

        // Repeat the cow task periodically
        if (!timers.cowTimerStarted) {
            timers.cowTimerStarted = true;
            setTimeout(() => {
                randomCow(cow)
                timers.cowTimerStarted = false;
            }, 2000);
        }
    }
    if (counters.math >= 5) {
        setTimeout(() => {
            if (!audio.comments.bookClub.hasPlayed) {
                playSound(audio.comments.bookClub.audio);
                audio.comments.bookClub.hasPlayed = true;
            }
        }, 10000)

        audio.comments.music.audio.setVolume(0.1);
        activateBannerOnce(counters.math, activeTasks.patterns, 5, audio.tutorials.pattern);
        patterns();
    }
    handleHealth();
    manageFailState();
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

    audio.comments.gameOver.audio.stop();
}


/**
 * Crease bool checker for if the mouse has clicked
 */
function mouseClicked() {
    hasClicked = true;
}


//Todo
// speed up the game
// Add timer in corner
// show timer in end screen
// refractor the code
// comments

//Bugs
// The paddle is weird if you hit it on the side. Will i fix?? prolly not
// Math stuff
// Patterns ****


