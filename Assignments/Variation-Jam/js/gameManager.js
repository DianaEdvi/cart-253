"use strict";


let tasks = {
    currentTask: undefined,
    playingBanner: true,
    pong: {
        name: "pong",
        isActive: false,
        isSuccessful: false, //
        counter: undefined,
        prevTaskCounter: undefined, //
        bannerText: "Don't drop the ball"
    },
    cow: {
        name: "cow",
        isActive: false,
        isSuccessful: false,
        counter: undefined,
        prevTaskCounter: 2,
        bannerText: "You should pet the cows me-thinks"
    },
    math: {
        name: "math",
        isActive: false,
        isSuccessful: false,
        counter: undefined,
        prevTaskCounter: 3,
        bannerText: "Whoever said math is fun was telling the truth"
    },
    pattern: {
        name: "pattern",
        isActive: false,
        isSuccessful: false, //
        counter: undefined, //
        prevTaskCounter: 5,
        bannerText: "Are you smarter than a 5th grader?"
    }
}

/**
 * The core function for playing the game
 */
function game() {
    image(backgroundImages.game, 0, 0, width, height);

    // Handle pong tasks
    soloPong(paddle, ball);
    if (tasks.playingBanner) {
        if (tasks.pong.counter < 1) {

            // Tutorial audio
            playSound(audio.tutorials.pong);

            // Wait 15 seconds, then play the "going great" audio
            activateAudioWithDelay(audio.comments.goingGreat, 15000);
        }
        bannerAnimation(banners.text.text);
    }

    // Handle cow tasks
    if (tasks.pong.counter >= tasks.cow.prevTaskCounter) {
        activateBannerOnce(tasks.pong.counter, tasks.cow.isActive, tasks.cow.prevTaskCounter, audio.tutorials.cow);
        randomCow(cow);
    }

    // Handle math tasks
    if (tasks.cow.counter >= tasks.math.prevTaskCounter) {
        if (!audio.gameSounds.moo_1.isPlaying() && !audio.gameSounds.moo_2.isPlaying()) {
            activateBannerOnce(tasks.cow.counter, tasks.math.isActive, tasks.math.prevTaskCounter, audio.tutorials.mathing);
        }
        mathing();
        // Wait ten seconds, then play the music audio
        activateAudioWithDelay(audio.comments.music, 10000, () => gameStates.current === gameStates.game);
    }

    // Handle pattern tasks
    if (tasks.math.counter >= tasks.pattern.prevTaskCounter) {
        activateBannerOnce(tasks.math.counter, tasks.pattern.isActive, tasks.pattern.prevTaskCounter, audio.tutorials.pattern);
        audio.comments.music.audio.setVolume(0.1);
        patterns();

        // Wait ten seconds, then play the book club audio
        activateAudioWithDelay(audio.comments.bookClub, 10000);
    }
    updateHealth();
    manageFailState();
    drawScore(score, formatTime(millis() - startTime));
}

/**
 * Reset the game properties and tasks
 */
function resetGame() {
    resetBall();
    resetCow(cow);
    resetPatterns();
    gameStates.current = gameStates.menu;

    tasks.pong.counter = 0;
    tasks.cow.counter = 0;
    tasks.math.counter = 0;

    healthBar.healthPoints.currentValue = 100;
    healthBar.healthPoints.animation.gainingHealth.isActive = false;
    healthBar.healthPoints.animation.losingHealth.isActive = false;

    audio.comments.gameOver.audio.stop();
}
