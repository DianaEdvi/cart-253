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
    if (button.text === "PLAY" && mouseIsPressed && isInArea(button.x, button.y, button.w, button.h)) {
        gameState = "game";
    } else if (button.text === "Play Again!" && mouseIsPressed && isInArea(button.x, button.y, button.w, button.h)) {
        gameState = "menu"
    }
}


function end() {
}