/**
 * Contains the logic for any non-game states
 */

"use strict";

const menuProperties = { // The stuff you see in the menu
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

const endProperties = { // The stuff you see in the end
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
 * Displays the main menu
 */
function menu() {
    image(menuProperties.backgroundImg, -20, -20, width + 50, height + 40);
    drawGameButton(menuProperties.playButton);
    buttonManager(menuProperties.playButton);
}

/**
 * Displays the end screen with a time score
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
 * Changes the game's state according to which button is pressed
 * @param button The button that is being pressed
 */
function buttonManager(button) {
    if (button.text === "PLAY" && hasClicked && isInArea(button.x, button.y, button.w, button.h)) { // If user selects Play button

        playSound(audio.gameSounds.paddle); // Play the button clicking sound
        gameStates.current = gameStates.game; // Change the state to game
        manageGameTimer("start"); // Start the in-game timer

    } else if (button.text === "PLAY AGAIN" && hasClicked && isInArea(button.x, button.y, button.w, button.h)) { // If user selects Play Again button

        playSound(audio.gameSounds.paddle); // Play the button clicking sound
        resetGame(); // Reset the game
        gameStates.current = gameStates.menu; // Change the state to menu
    }
}


/**
 * Draw the button
 * @param buttonProperties The properties of the button
 */
function drawGameButton(buttonProperties) {
    // Draw rectangle
    push();
    rectMode(CENTER);
    fill(buttonProperties.f);
    rect(buttonProperties.x, buttonProperties.y, buttonProperties.w, buttonProperties.h, 10);
    pop();

    // Draw the text
    push();
    textAlign(CENTER, CENTER);
    textSize(40);
    text(buttonProperties.text, buttonProperties.x, buttonProperties.y);
    pop();
}


