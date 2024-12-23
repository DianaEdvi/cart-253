"use strict";


let tasks = {
    currentTask: undefined,
    playingBanner: true,
    pong: {
        name: "pong",
        isActive: false,
        isSuccessful: false, //
        counter: 0,
        prevTaskCounter: undefined, //
        bannerText: "Don't drop the ball"
    },
    cow: {
        name: "cow",
        isActive: false,
        isSuccessful: false,
        counter: undefined,
        prevTaskCounter: 2,
        bannerText: "You should pet the cows me-thinks",
        start: false
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


    // Set cow task according to a timer because sometimes the pong counter goes wild
    timers.cowTimeout = setTimeout(() => {
        tasks.cow.start = true
        tasks.pong.counter = tasks.cow.prevTaskCounter;
    }, 20000);

    // Handle cow tasks
    if (tasks.cow.start) {
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
    resetTask(tasks.pong);
    resetTask(tasks.cow);
    tasks.cow.start = false;
    resetTask(tasks.math);
    resetTask(tasks.pattern);

    gameStates.current = gameStates.menu;
    tasks.currentTask = undefined;
    banners.text.text = undefined;

    resetHealth();
    resetAudio();

    resetSoloPong();
    resetCow();
    resetMathing();
    resetPatterns();

    clearTimeout(timers.cowTimeout);
    timers.bannerTimerStarted = false;
    timers.answerTimeout = undefined;
    timers.patternTimeout = undefined;
    timers.cowTimeout = undefined;

    endProperties.score.timer.text = undefined;
    score.timer.text = undefined;

}

function resetTask(taskObj) {
    taskObj.isActive = false;
    taskObj.isSuccessful = false;
    taskObj.counter = 0;
}

