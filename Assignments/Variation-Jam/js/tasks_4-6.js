"use strict";

let inputText = '';
let boxX = 100, boxY = 100, boxWidth = 300, boxHeight = 40;
let isTyping = false;
let placeholderText = "Enter here"; // Default placeholder text
let isPlaceholderActive = true; // Flag to track if the placeholder is active
let backspaceTime = 0; // To track how long backspace is held down
let backspaceDelay = 500; // 1 second delay before continuous deletion

function typeText() {

    // Draw the text box
    fill(200);
    rect(boxX, boxY, boxWidth, boxHeight, 10); // Rectangle with rounded corners
    fill(0);

    // Display placeholder text if active, else show input text
    if (isPlaceholderActive) {
        text(placeholderText, boxX + 10, boxY + 25); // Placeholder text
    } else {
        // Prevent text from overflowing the box
        let textWidthLimit = boxWidth - 20; // 10px padding on each side
        let textToDisplay = inputText;

        // Truncate text if it exceeds the box width
        while (textWidth(textToDisplay) > textWidthLimit) {
            textToDisplay = textToDisplay.substring(0, textToDisplay.length - 1);
        }

        text(textToDisplay, boxX + 10, boxY + 25); // Typed text
    }

    // If user is typing, show a cursor
    if (isTyping) {
        let cursorX = boxX + textWidth(inputText) + 10;
        line(cursorX, boxY + 10, cursorX, boxY + boxHeight - 10); // Blinking cursor
    }

    // If backspace is held, track how long the key is held
    if (keyIsPressed && keyCode === BACKSPACE && isTyping) {
        if (backspaceTime === 0) {
            // Start timing the backspace press
            backspaceTime = millis();
        } else if (millis() - backspaceTime > backspaceDelay && inputText.length > 0) {
            // Start erasing more text if the backspace has been held for more than 1 second
            inputText = inputText.substring(0, inputText.length - 1);
        }
    } else {
        // Reset backspace timer if backspace key is released
        backspaceTime = 0;
    }
}

function mousePressed() {
    // Check if the mouse click is inside the text box
    if (mouseX > boxX && mouseX < boxX + boxWidth && mouseY > boxY && mouseY < boxY + boxHeight) {
        if (isPlaceholderActive) {
            // Clear the placeholder text when the user clicks
            inputText = '';
            isPlaceholderActive = false;
        }
        isTyping = true;
    } else {
        isTyping = false;
    }
}

function keyTyped() {
    // Allow typing inside the text box only if the width hasn't been exceeded
    if (isTyping && key !== 'Backspace') {
        let textWidthLimit = boxWidth - 20; // 10px padding on each side
        if (textWidth(inputText + key) <= textWidthLimit) {
            inputText += key; // Add character only if it fits
        }
    }
}

function keyPressed() {
    // Handle backspace for deleting text
    if (keyCode === BACKSPACE && isTyping) {
        if (millis() - backspaceTime > backspaceDelay) {
            // Continuous deletion after holding backspace for 1 second
            if (inputText.length > 0) {
                inputText = inputText.substring(0, inputText.length - 1);
            }
        } else {
            // Remove only one character on the first press
            if (inputText.length > 0) {
                inputText = inputText.substring(0, inputText.length - 1);
            }
        }
    }
}
