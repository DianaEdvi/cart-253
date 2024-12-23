"use strict";


let tasks = {
    currentTask: undefined,
    playingBanner: true,
    pong: {
        name: "pong",
        isActive: false,
        isSuccessful: false, //
        counter: undefined,
        prevTaskCounter: undefined
    },
    cow: {
        name: "cow",
        isActive: false,
        isSuccessful: false,
        counter: undefined,
        prevTaskCounter: undefined
    },
    math: {
        name: "math",
        isActive: false,
        isSuccessful: false,
        counter: undefined,
        prevTaskCounter: undefined
    },
    pattern: {
        name: "pattern",
        isActive: false,
        isSuccessful: false, //
        counter: undefined, //
        prevTaskCounter: undefined
    }
}

function game() {
    image(backgroundImages.game, 0, 0, width, height);
    if (tasks.playingBanner) {
        if (tasks.pong.counter < 1) {
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
    if (tasks.pong.counter >= 2) {
        activateBannerOnce(tasks.pong.counter, tasks.cow.isActive, 2, audio.tutorials.cow);
        randomCow(cow);
    }
    // Handle math tasks
    if (tasks.cow.counter >= 3) {
        if (!audio.gameSounds.moo_1.isPlaying() && !audio.gameSounds.moo_2.isPlaying()) {
            activateBannerOnce(tasks.cow.counter, tasks.math.isActive, 3, audio.tutorials.mathing);
        }
        mathing();

        setTimeout(() => {
            if (!audio.comments.music.hasPlayed && gameStates.current === gameStates.game) {
                playSound(audio.comments.music.audio);
                audio.comments.music.hasPlayed = true;
            }
        }, 10000)
    }
    if (tasks.math.counter >= 5) {
        setTimeout(() => {
            if (!audio.comments.bookClub.hasPlayed) {
                playSound(audio.comments.bookClub.audio);
                audio.comments.bookClub.hasPlayed = true;
            }
        }, 10000)

        audio.comments.music.audio.setVolume(0.1);
        activateBannerOnce(tasks.math.counter, tasks.pattern.isActive, 5, audio.tutorials.pattern);
        patterns();
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
