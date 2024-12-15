"use strict";

let paddle = {x: 320, y: 609, w: 100, h: 30, f: "white", speed: 10};
let ball = {x: 320, y: 320, w: 50, f: "white", speedY: 1, speedX: 3}; // Added speedX for horizontal movement
let countdown = 3; // Countdown starts at 3 seconds
let countdownActive = true; // Flag to control countdown state
let countdownStartTime; // Tracks when the countdown starts (used to calculate how much time has passed since the countdown began)

/**
 * Creates the solo pong mechanic. Draws the ball and the paddle and checks for user input to move the paddle
 * @param paddle
 * @param ball
 */
function soloPong(paddle, ball) {
    if (!activeTasks.soloPong) {
        activeTasks.task = "solo";
    }
    handleHealth()
    // Draw paddle
    push();
    fill(paddle.f);
    rect(paddle.x, paddle.y, paddle.w, paddle.h);
    pop();

    if (countdownActive) {
        // Handle countdown display
        let elapsedTime = millis() - countdownStartTime;
        let remaining = 3 - Math.floor(elapsedTime / 1000); // The remaining numbers to count
        if (remaining >= 1) {
            // Draw countdown text
            push();
            fill("white");
            textSize(32);
            textAlign(CENTER, CENTER);
            text(remaining, ball.x, ball.y);
            pop();
        } else {
            // End countdown
            countdownActive = false;
        }
        return; // Freeze the paddle when countdown is happening
    }

    // Draw ball
    push();
    fill(ball.f);
    ellipse(ball.x, ball.y, ball.w);
    pop();

    // Move ball
    ball.x += ball.speedX;
    ball.y += ball.speedY;

    // Move paddle based on key presses
    if (keyIsDown(LEFT_ARROW)) {
        paddle.x -= paddle.speed;
    }
    if (keyIsDown(RIGHT_ARROW)) {
        paddle.x += paddle.speed;
    }

    // Constrain paddle within canvas boundaries
    paddle.x = constrain(paddle.x, 0, width - paddle.w);

    // Check collisions with top wall
    if (ball.y - ball.w / 2 <= 0) {
        ball.speedY *= -1;
    }

    // Check collisions with side walls
    if (ball.x - ball.w / 2 <= 0 || ball.x + ball.w / 2 >= width) {
        ball.speedX *= -1;
    }

    // Check collision with paddle
    if (ball.y + ball.w / 2 >= paddle.y && ball.x > paddle.x && ball.x < paddle.x + paddle.w) {
        // Increment counter
        counters.pongCounter++;
        // Reverse vertical direction
        ball.speedY *= -1;

        // Change horizontal direction based on where it hits the paddle
        let hitPoint = (ball.x - paddle.x) / paddle.w; // Range: 0 (left) to 1 (right)
        if (hitPoint < 0.5) {
            ball.speedX = -abs(ball.speedX); // Go left
        } else {
            ball.speedX = abs(ball.speedX); // Go right
        }
    }

    // Check if ball goes off-screen
    if (ball.y - ball.w / 2 > height) {
        handleHealth(false);
        resetBall(); // Respawn ball in the center with a countdown
    }
}

/**
 * Resets the ball to the center of the screen and starts a countdown
 */
function resetBall() {
    ball.x = width / 2;
    ball.y = height / 2;
    countdown = 3;
    countdownActive = true;
    countdownStartTime = millis(); // Record the current time
}

let cow = {x: 640, y: 100, w: 50, f: "black"}

/**
 * Makes a random cow fly across the screen. The user must tap it before it moves off-screen
 * @param cow
 */
function randomCow(cow) {
    if (!activeTasks.randomCow) {
        activeTasks.task = "cow";
    }
    //Draw cow
    push();
    fill(cow.f);
    ellipse(cow.x, cow.y, cow.w);
    pop();

    //Move cow
    cow.x -= 1;
    cow.y += 0.25;

    //Check if mouse clicked cow
    if (mouseIsPressed && mouseX >= cow.x - cow.w / 2 && mouseX <= cow.x + cow.x / 2 && mouseY >= cow.y - cow.w / 2 && mouseY <= cow.y + cow.w / 2) {
        console.log("moo sound");
        cow.f = "#69b260";
        handleHealth(true);
        //Increment counter
        counters.cowCounter++
    }

    // Check if the cow goes off-screen
    if (cow.x + cow.w / 2 < 0 || cow.y - cow.w / 2 > height) {
        handleHealth(false);
        resetCow(cow);
    }

}

/**
 * Resets the cow properties
 * @param cow The cow properties
 */
function resetCow(cow) {
    // Reset cow position to start again from the right
    cow.x = width + cow.w / 2; // Start on the right edge
    cow.y = random(100, height - 100); // Random vertical position
    cow.f = "black";
}


/**
 * Displays a math problem onto the screen that the user must solve before ...?
 * @param mathStr the variable holding the display string
 */

let mathBoxes = {
    hasAnswered: false,
    isActive: false,
    textSize: 32,
    question: {
        x: 320,
        y: -110,
        w: 250,
        h: 40,
        fill: "#363fa8",
        text: ""
    },
    answerLeft: {
        fill: "red",
        x: 240,
        y: -40,
        w: 150,
        h: 80,
        text: "",
        isCorrect: false
    },
    answerRight: {
        fill: "red",
        x: 400,
        y: -40,
        w: 150,
        h: 80,
        text: "",
        isCorrect: false
    }
}

let hasAnswered = false;
let answerString = "";
let otherString = "";
let equationGenerated = false; // Track if the equation has already been generated
let solutionLocation = -1; // This will store the location of the correct answer (0 for left, 1 for right)

let answerTimeout = 5000; // 5 seconds timeout
let answerTimer = 0; // Track time since question was displayed
function mathing() {
    if (!activeTasks.mathing) {
        activeTasks.task = "math";
    }

    if (!equationGenerated) {
        // Initialize question and answers
        let operators = [" + ", " - "];
        let randomOperator = random(operators);
        let randomNumber1 = floor(random(50));
        let randomNumber2 = floor(random(50));
        solutionLocation = floor(random(0, 2));
        mathBoxes.question.text = randomNumber1 + randomOperator + randomNumber2;

        if (randomOperator === " + ") {
            answerString = randomNumber1 + randomNumber2;
        } else {
            answerString = randomNumber1 - randomNumber2;
        }

        otherString = "" + floor(random(50));
        while (otherString === answerString) {
            otherString = "" + floor(random(50));
        }

        if (solutionLocation === 0) {
            mathBoxes.answerLeft.text = answerString;
            mathBoxes.answerLeft.isCorrect = true;
            mathBoxes.answerRight.text = otherString;
        } else {
            mathBoxes.answerRight.text = answerString;
            mathBoxes.answerRight.isCorrect = true;
            mathBoxes.answerLeft.text = otherString;
        }

        equationGenerated = true;
        mathBoxes.isActive = true;
        hasAnswered = false;

        // Start timeout for answering
        clearTimeout(timers.answerTimeout); // Clear any existing timeout
        timers.answerTimeout = setTimeout(() => {
            console.log("Time's up! Moving boxes back.");
            hasAnswered = true;
        }, 5000);
    }

    // Constrain dem values
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

            if (mathBoxes.question.y <= -110) {
                // Reset state
                mathBoxes.isActive = false;
                equationGenerated = false;
                mathBoxes.answerLeft.isCorrect = false;
                mathBoxes.answerRight.isCorrect = false;
                mathBoxes.answerLeft.fill = "red";
                mathBoxes.answerRight.fill = "red";
            }
        }
    }

    // Handle user clicks
    if (mouseIsPressed) {
        if (isInArea(mathBoxes.answerLeft.x, mathBoxes.answerLeft.y, mathBoxes.answerLeft.w, mathBoxes.answerLeft.h)) {
            mathBoxes.answerLeft.fill = mathBoxes.answerLeft.isCorrect ? "green" : "#930000";
            hasAnswered = true;
            clearTimeout(timers.answerTimeout); // Stop the timer if answered
        }
        if (isInArea(mathBoxes.answerRight.x, mathBoxes.answerRight.y, mathBoxes.answerRight.w, mathBoxes.answerRight.h)) {
            mathBoxes.answerRight.fill = mathBoxes.answerRight.isCorrect ? "green" : "#930000";
            hasAnswered = true;
            clearTimeout(timers.answerTimeout); // Stop the timer if answered
        }
    }

    // Draw the text boxes
    drawMathBoxes();
}

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


function resetMathing() {

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
