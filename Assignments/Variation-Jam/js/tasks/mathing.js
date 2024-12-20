"use strict";


/**
 * Displays a math problem onto the screen that the user must solve before ...?
 * @param mathStr the variable holding the display string
 */

let mathBoxes = {
    hasAnswered: false,
    isActive: true,
    textSize: 32,
    fillOptions: {
        wrong: "#930000",
        unanswered: "#e63535",
        correct: "#e28b8b"
    },
    question: {
        x: 320,
        y: -110,
        w: 250,
        h: 40,
        fill: "#5b62bb",
        text: ""
    },
    answerLeft: {
        fill: "#e63535",
        x: 240,
        y: -40,
        w: 150,
        h: 80,
        text: "",
        isCorrect: false
    },
    answerRight: {
        fill: "#e63535",
        x: 400,
        y: -40,
        w: 150,
        h: 80,
        text: "",
        isCorrect: false
    }
}

let hasAnswered = false; // Track whether the player has answered the equation
let answerString = undefined; // The corrct answer
let otherString = undefined; // The incorrect answer
let equationGenerated = false; // Track if the equation has already been generated
let solutionLocation = -1; // This will store the location of the correct answer (0 for left, 1 for right)
let resetInProgress = undefined; // Check for timer before the function starts again

/**
 * Generates a math equation and displays it onto the screen.
 * Specifically:
 * Generates an equation and randomizes the solution's location
 * Displays the equation and animates the UI onto the screen
 * Checks if the user answered correctly or at all and handles the health accordingly
 *
 */
function mathing() {
    if (!activeTasks.mathing) {
        activeTasks.task = "math";
    }

    //Generate the equation and answers
    if (!equationGenerated && !resetInProgress) {

        calculateEquation();
        randomizeAnswerPlacement();

        equationGenerated = true;
        mathBoxes.isActive = true;
        hasAnswered = false;

        // Start timeout for answering
        clearTimeout(timers.answerTimeout); // Clear any existing timeout
        timers.answerTimeout = setTimeout(() => {
            hasAnswered = true;
        }, 5000);
    }

    // Constrain box y coordinates
    mathBoxes.question.y = constrain(mathBoxes.question.y, -110, 30);
    mathBoxes.answerLeft.y = constrain(mathBoxes.answerLeft.y, -40, 100);
    mathBoxes.answerRight.y = constrain(mathBoxes.answerRight.y, -40, 100);

    // Move the boxes
    if (mathBoxes.isActive) {
        if (!hasAnswered) {
            // Move boxes down
            mathBoxes.question.y += 2;
            mathBoxes.answerLeft.y += 2;
            mathBoxes.answerRight.y += 2;
        } else {
            // Move boxes up
            mathBoxes.question.y -= 2;
            mathBoxes.answerLeft.y -= 2;
            mathBoxes.answerRight.y -= 2;

            // If the boxes have returned to off-screen, reset the values (takes two seconds)
            if (mathBoxes.question.y <= -110) {
                if (!successes.mathSuccess && mathBoxes.answerRight.fill === mathBoxes.fillOptions.unanswered && mathBoxes.answerLeft.fill === mathBoxes.fillOptions.unanswered) {
                    handleHealth(successes.mathSuccess);
                    successes.mathSuccess = undefined;
                }
                // Reset state
                if (!resetInProgress) {
                    resetInProgress = true; // Prevent multiple resets
                    setTimeout(() => {
                        resetMathing(); // Reset the function
                    }, 2000); // Pause for 2 seconds (2000 milliseconds)
                }
            }
        }
    }

    // Play the audio
    if (mathBoxes.question.y === 32) {
        playSound(audio.gameSounds.tickingClock);
    } else {
        audio.gameSounds.tickingClock.stop();
    }

    // Handle user clicks and determine success/failure
    if (hasClicked && mathBoxes.answerLeft.fill === mathBoxes.fillOptions.unanswered && mathBoxes.answerRight.fill === mathBoxes.fillOptions.unanswered) {
        console.log("is it this?")
        if (isInArea(mathBoxes.answerLeft.x, mathBoxes.answerLeft.y, mathBoxes.answerLeft.w, mathBoxes.answerLeft.h)) {
            if (mathBoxes.answerLeft.isCorrect) {
                mathBoxes.answerLeft.fill = mathBoxes.fillOptions.correct;
                successes.mathSuccess = mathBoxes.answerLeft.isCorrect;
                counters.math++;
            } else {
                mathBoxes.answerLeft.fill = mathBoxes.fillOptions.wrong;
            }

            hasAnswered = true;
            handleHealth(successes.mathSuccess);
            clearTimeout(timers.answerTimeout); // Stop the timer if answered
        } else if (isInArea(mathBoxes.answerRight.x, mathBoxes.answerRight.y, mathBoxes.answerRight.w, mathBoxes.answerRight.h)) {
            if (mathBoxes.answerRight.isCorrect) {
                mathBoxes.answerRight.fill = mathBoxes.fillOptions.correct;
                successes.mathSuccess = mathBoxes.answerRight.isCorrect;
                counters.math++;
            } else {
                mathBoxes.answerRight.fill = mathBoxes.fillOptions.wrong;

            }
            hasAnswered = true;
            handleHealth(successes.mathSuccess);
            clearTimeout(timers.answerTimeout); // Stop the timer if answered
        }
    }

    // Draw the text boxes
    drawMathBoxes();
}

function calculateEquation() {
    // Initialize question and answers
    let operators = [" + ", " - "]; // Array holding potential operators
    let randomOperator = random(operators);
    let randomNumber1 = floor(random(50));
    let randomNumber2 = floor(random(50));
    mathBoxes.question.text = randomNumber1 + randomOperator + randomNumber2;

    // Calculate the answer
    if (randomOperator === " + ") {
        answerString = randomNumber1 + randomNumber2;
    } else {
        answerString = randomNumber1 - randomNumber2;
    }

    //Check for duplicates
    otherString = floor(random(70));
    while (otherString === answerString) {
        otherString = floor(random(70));
    }

    // Match the polarity of the answers
    if (answerString < 0) {
        otherString *= -1;
    }
}

function randomizeAnswerPlacement() {
    // Determine where the solution will be left (0) or right (1)
    solutionLocation = floor(random(0, 2));
    // Set text according to solution location
    if (solutionLocation === 0) {
        mathBoxes.answerLeft.text = answerString;
        mathBoxes.answerLeft.isCorrect = true;
        mathBoxes.answerRight.text = otherString;
    } else {
        mathBoxes.answerRight.text = answerString;
        mathBoxes.answerRight.isCorrect = true;
        mathBoxes.answerLeft.text = otherString;
    }
}


/**
 * Draws the math task boxes and texts
 */
function drawMathBoxes() {
    push();
    noStroke();
    rectMode(CENTER);

    // Draw question box
    fill(mathBoxes.question.fill);
    rect(mathBoxes.question.x, mathBoxes.question.y, mathBoxes.question.w, mathBoxes.question.h, 10);

    // Draw answer boxes
    fill(mathBoxes.answerLeft.fill);
    rect(mathBoxes.answerLeft.x, mathBoxes.answerLeft.y, mathBoxes.answerLeft.w, mathBoxes.answerLeft.h, 10);

    fill(mathBoxes.answerRight.fill);
    rect(mathBoxes.answerRight.x, mathBoxes.answerRight.y, mathBoxes.answerRight.w, mathBoxes.answerRight.h, 10);

    pop();

    push();
    textSize(mathBoxes.textSize);
    textAlign(CENTER, CENTER);
    fill("black");

    text(mathBoxes.question.text, mathBoxes.question.x, mathBoxes.question.y);
    text(mathBoxes.answerLeft.text, mathBoxes.answerLeft.x, mathBoxes.answerLeft.y);
    text(mathBoxes.answerRight.text, mathBoxes.answerRight.x, mathBoxes.answerRight.y);
    pop();
}

/**
 * Calculates the area of a rectangle (assuming rect mode CENTER) and returns true if the mouse is within that area
 * @param x The x coordinate of the rectangle
 * @param y The y coordinate of the rectangle
 * @param w The width of the rectangle
 * @param h The height of the rectangle
 * @returns {boolean}
 */
function isInArea(x, y, w, h) {
    return mouseX >= x - w / 2 &&
        mouseX <= x + w / 2 &&
        mouseY >= y - h / 2 &&
        mouseY <= y + h / 2;
}


/**
 * Reset the math function
 */
function resetMathing() {
    equationGenerated = false;
    mathBoxes.isActive = false;
    mathBoxes.answerLeft.isCorrect = false;
    mathBoxes.answerRight.isCorrect = false;
    mathBoxes.answerRight.fill = mathBoxes.fillOptions.unanswered;
    mathBoxes.answerLeft.fill = mathBoxes.fillOptions.unanswered;
    resetInProgress = false; // Allow next reset
    successes.mathSuccess = false;
}
