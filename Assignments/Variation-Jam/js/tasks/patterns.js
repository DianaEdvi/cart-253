"use strict";

let textBox = {
    x: 170,
    y: 200,
    w: 300,
    h: 40,
    f: 200
}

let prompt = {
    x: undefined,
    y: undefined,
    w: 0,
    h: 0,
    f: "#005293",
    text: ""
}

let inputText = '';
let isTyping = false;
let placeholderText = "Enter here"; // Default placeholder text
let isPlaceholderActive = true; // Flag to track if the placeholder is active
let backspaceTime = 0; // To track how long backspace is held down
let backspaceDelay = 500; // 1 second delay before continuous deletion

function patternTask() {
    displayPrompt();
    typeText();
}

/**
 * Handles the typing input from the user and displays it onto the screen
 */
function typeText() {
    // Draw the text box
    push();
    fill(200);
    rect(textBox.x, textBox.y, textBox.w, textBox.h, 10); // Rectangle with rounded corners
    pop();

    displayText();
    displayCaret();
    handleBackspace();

    // Also utilizes mousePressed and keyTyped events
}

/**
 * Displays a placeholder text and once the user starts typing, truncates the text to the box width.
 */
function displayText() {
    // Display placeholder text if active, else show input text
    if (isPlaceholderActive) {
        text(placeholderText, textBox.x + 10, textBox.y + 25); // Placeholder text
    } else {
        // Prevent text from overflowing the box
        let textWidthLimit = textBox.w - 20; // 10px padding on each side
        let textToDisplay = inputText;

        // Truncate text if it exceeds the box width
        while (textWidth(textToDisplay) > textWidthLimit) {
            textToDisplay = textToDisplay.substring(0, textToDisplay.length - 1);
        }
        text(textToDisplay, textBox.x + 10, textBox.y + 25); // Typed text
    }
}

/**
 * Displays the caret inside the text box
 */
function displayCaret() {
    // If user is typing, show a caret
    if (isTyping) {
        let caretX = textBox.x + textWidth(inputText) + 10;
        line(caretX, textBox.y + 10, caretX, textBox.y + textBox.h - 10);
    }
}

/**
 * Ensures that the user can delete their input with backspace
 */
function handleBackspace() {
    // If backspace is held and typing is active
    if (keyIsPressed && keyCode === BACKSPACE && isTyping) {
        if (backspaceTime === 0) {
            // Start timing backspace press
            backspaceTime = millis();
            if (inputText.length > 0) {
                // Remove a single character on first press
                inputText = inputText.substring(0, inputText.length - 1);
            }
        } else if (millis() - backspaceTime > backspaceDelay) {
            // Continuous deletion if held beyond the delay
            if (inputText.length > 0) {
                inputText = inputText.substring(0, inputText.length - 1);
            }
        }
    } else {
        // Reset timer when backspace is released or not pressed
        backspaceTime = 0;
    }
}

/**
 * Initiates text typing logic
 */
function mousePressed() {
    // Check if the mouse click is inside the text box
    if (mouseX > textBox.x && mouseX < textBox.x + textBox.w && mouseY > textBox.y && mouseY < textBox.y + textBox.h) {
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

/**
 * Takes the text input from the user
 */
function keyTyped() {
    // Allow typing inside the text box only if the width hasn't been exceeded
    if (isTyping && key !== 'Backspace') {
        let textWidthLimit = textBox.w - 20; // 10px padding on each side
        if (textWidth(inputText + key) <= textWidthLimit) {
            inputText += key; // Add character only if it fits
        }
    }
}

let angle = 0; // Rotation angle in radians

function displayPrompt() {
    // Depend prompt coordinates onto textBox
    prompt.x = textBox.x;
    prompt.y = textBox.y - 50;

    const targetWidth = textBox.w;
    const targetHeight = textBox.h + 40;

    if (prompt.w < targetWidth) {
        prompt.w += 2;
    }
    if (prompt.h < targetHeight) {
        prompt.h += 1;
    }

    // Draw rotating rectangle
    push();
    translate(prompt.x + prompt.w / 2, prompt.y + prompt.h / 2); // Move origin to the center of the rectangle
    angleMode(DEGREES);
    rotate(angle); // Rotate the rectangle
    fill(prompt.f);
    rect(-prompt.w / 2, -prompt.h / 2, prompt.w, prompt.h, 10); // Draw rectangle centered at the origin
    pop();

    if (prompt.w >= targetWidth && prompt.h >= targetHeight && angle % 360 === 0) {
        angle = 0;
    } else {
        // Increment the angle for continuous rotation
        angle += 20; // Adjust this value to control rotation speed
    }
}

