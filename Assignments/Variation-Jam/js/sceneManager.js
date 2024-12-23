"use strict";

const menuProperties = {
    backgroundImg: undefined,
    playButton: {
        text: "PLAY",
        x: 320,
        y: 320,
        w: 300,
        h: 300,
        f: "#b995ff"
    }
}

const endProperties = {
    backgroundImg: undefined,
    playButton: {
        text: "PLAY AGAIN",
        x: 320,
        y: 320,
        w: 300,
        h: 300,
        f: "#b995ff"
    },
    score: {
        text: {
            text: "You lasted this long: ",
            x: 320,
            y: 90,
            size: 25
        },
        timer: {
            text: undefined,
            x: 320,
            y: 120,
        },
        panel: {
            fill: "#cacaca",
            x: 320,
            y: 100,
            w: 300,
            h: 75
        }
    }
}


/**
 * Handles the menu logic for the game
 */
function menu() {
    image(menuProperties.backgroundImg, -20, -20, width + 50, height + 40);
    drawGameButton(menuProperties.playButton);
    buttonManager(menuProperties.playButton);
}

/**
 * Draw the button
 * @param buttonProperties The properties of the button
 */
function drawGameButton(buttonProperties) {
    push();
    rectMode(CENTER);
    fill(buttonProperties.f);
    rect(buttonProperties.x, buttonProperties.y, buttonProperties.w, buttonProperties.h, 10);
    pop();

    push();
    textAlign(CENTER, CENTER);
    textSize(40);
    text(buttonProperties.text, buttonProperties.x, buttonProperties.y);
    pop();
}

/**
 * Changes the game's state according to which button is pressed
 * @param button The button that is being pressed
 */
function buttonManager(button) {
    if (button.text === "PLAY" && hasClicked && isInArea(button.x, button.y, button.w, button.h)) {
        playSound(audio.gameSounds.paddle);
        // gameState = "game";
        gameStates.current = gameStates.game;
        manageGameTimer("start");
    } else if (button.text === "PLAY AGAIN" && hasClicked && isInArea(button.x, button.y, button.w, button.h)) {
        playSound(audio.gameSounds.paddle);
        resetGame();
        // gameState = "menu"
        gameStates.current = gameStates.menu;
    }
}

/**
 * Displaus the end screen with a time score
 */
function end() {
    image(endProperties.backgroundImg, -20, -20, width + 50, height + 40);

    drawGameButton(endProperties.playButton);
    buttonManager(endProperties.playButton);
    drawScore(endProperties.score, elapsedTime);

    // Play the game over audio
    if (!audio.comments.gameOver.hasPlayed) {
        playSound(audio.comments.gameOver.audio);
        audio.comments.gameOver.hasPlayed = true;
    }
}

/**
 * Displays the time score onto the screen
 * @param scoreProperties Properties of the score (coordinates, fill, etc)
 * @param time The time to be displayed
 */
function drawScore(scoreProperties, time) {
    // Draw rectangle
    push();
    rectMode(CENTER)
    fill(scoreProperties.panel.fill);
    rect(scoreProperties.panel.x, scoreProperties.panel.y, scoreProperties.panel.w, scoreProperties.panel.h, 10)
    pop();

    // Draw text
    push();
    textAlign(CENTER, CENTER);
    textSize(scoreProperties.text.size);
    text(scoreProperties.text.text, scoreProperties.text.x, scoreProperties.text.y);
    text(time, scoreProperties.timer.x, scoreProperties.timer.y);
    pop();
}

