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
    if (
        ball.y + ball.w / 2 >= paddle.y &&
        ball.x > paddle.x &&
        ball.x < paddle.x + paddle.w
    ) {
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
    }

    // Check if the cow goes off-screen
    if (cow.x + cow.w / 2 < 0 || cow.y - cow.w / 2 > height) {
        handleHealth(false);
        resetCow(cow);
    }
}

function resetCow(cow) {
    // Reset cow position to start again from the right
    cow.x = width + cow.w / 2; // Start on the right edge
    cow.y = random(100, height - 100); // Random vertical position
}


/**
 * Displays a math problem onto the screen that the user must solve before ...?
 * @param mathStr the variable holding the display string
 */
function old(mathStr) {
    // Initialize
    let operators;
    let randomOperator;
    let randomNumber1;
    let randomNumber2;
    let solutionLocation;

    // Move the math question down a little each frame
    mathStr.y = constrain(mathStr.y, 0, 30);
    mathStr.y += 1; // This increases the y position over time (moving the text down)

    // Handle key press to generate new problem
    if (keyIsDown(32) && isClicking === false) {
        isClicking = true;

        // Generate equation
        operators = [" + ", " - "];
        randomOperator = random(operators);
        randomNumber1 = floor(random(50));
        randomNumber2 = floor(random(50));
        solutionLocation = floor(random(0, 2));
        mathStr.str = randomNumber1 + randomOperator + randomNumber2;

        // Calculate answer
        let answer = undefined;
        let wrongAnswer = 1;

        if (randomOperator === " + ") {
            answer = randomNumber1 + randomNumber2;
            // If the answer is negative, make the false option negative too
            if (answer < 0) {
                wrongAnswer = -1;
            }
            answerString = "" + answer;
            otherString = "" + (wrongAnswer * floor(random(0, 50)));
            if (otherString === answerString) {
                otherString = "" + (wrongAnswer * floor(random(0, 50)));
            }
        } else {
            answer = randomNumber1 - randomNumber2;
            // If the answer is negative, make the false option negative too
            if (answer < 0) {
                wrongAnswer = -1;
            }
            answerString = "" + answer;
            otherString = "" + (wrongAnswer * floor(random(0, 50)));
            if (otherString === answerString) {
                otherString = "" + (wrongAnswer * floor(random(0, 50)));
            }
        }

        // Display on buttons
        let leftButton;
        let rightButton;

        // Increase y for buttons too (same way as mathStr)
        buttonHeight += 1; // Increment the button y-position over time

        if (solutionLocation === 0) {
            // leftButton = new Button(answerString, 240, 100 + buttonHeight, 150, 80, () => {
            //     leftButton.buttonStyles("green");
            //     handleHealth(true);
            // });
            rightButton = new Button(otherString, 420, 100 + buttonHeight, 150, 80, () => handleHealth(false));
        } else {
            leftButton = new Button(otherString, 240, 100 + buttonHeight, 150, 80, () => handleHealth(false));
            // rightButton = new Button(answerString, 420, 100 + buttonHeight, 150, 80, () => leftButton.buttonStyles("green"));
        }

        leftButton.updatePosition(0, buttonHeight);
        rightButton.updatePosition(0, buttonHeight);

    } else if (!keyIsDown(32)) {
        isClicking = false;
    }

    // Draw textbox
    push();
    fill("#363fa8");
    noStroke();
    rectMode(CENTER);
    rect(mathStr.x, mathStr.y, mathStr.w, 40, 10);
    pop();

    // Draw text
    push();
    fill(mathStr.f);
    textSize(mathStr.size);
    textAlign(CENTER, CENTER);
    text(mathStr.str, mathStr.x, mathStr.y);
    pop();
}

let isClicking = false;
let mathStr = {str: undefined, x: 320, y: 0, w: 250, f: "black", size: 32};
let answerString = "";
let otherString = "";
let buttonHeight = 0;
let leftButton;
let rightButton;
let equationGenerated = false; // Track if the equation has already been generated
let solutionLocation = -1; // This will store the location of the correct answer (0 for left, 1 for right)
let correctButton = "";

function mathing() {
    if (!equationGenerated) {
        // Initialize
        let operators = [" + ", " - "];
        let randomOperator = random(operators);
        let randomNumber1 = floor(random(50));
        let randomNumber2 = floor(random(50));

        // Randomize between 0 (left) and 1 (right) for solution location
        solutionLocation = floor(random(0, 2));

        mathStr.str = randomNumber1 + randomOperator + randomNumber2;

        // Calculate answer
        let answer = undefined;
        let wrongAnswer = 1;

        if (randomOperator === " + ") {
            answer = randomNumber1 + randomNumber2;
            answerString = "" + answer;
            otherString = "" + (wrongAnswer * floor(random(0, 50)));
            if (otherString === answerString) {
                otherString = "" + (wrongAnswer * floor(random(0, 50)));
            }
        } else {
            answer = randomNumber1 - randomNumber2;
            answerString = "" + answer;
            otherString = "" + (wrongAnswer * floor(random(0, 50)));
            if (otherString === answerString) {
                otherString = "" + (wrongAnswer * floor(random(0, 50)));
            }
        }

        // Set the equation as generated
        equationGenerated = true;

        // Display on buttons if not already created
        if (!rightButton && !leftButton) {
            leftButton = new Button("", 240, 30, 150, 80, () => checkValidity(solutionLocation, leftButton));
            rightButton = new Button("", 420, 30, 150, 80, () => checkValidity(solutionLocation, rightButton));
        }

        // Randomly assign answer to left or right button
        if (solutionLocation === 0) {
            // Correct answer on left, wrong answer on right
            leftButton.buttonStyles(undefined, answerString);
            correctButton = "left";
            rightButton.buttonStyles(undefined, otherString);

        } else {
            // Correct answer on right, wrong answer on left
            leftButton.buttonStyles(undefined, otherString);
            rightButton.buttonStyles(undefined, answerString);
            correctButton = "right";
        }
    }

    // Update positions for mathStr and buttons
    mathStr.y = constrain(mathStr.y, 0, 30);
    mathStr.y += 1;
    buttonHeight += 1;

    buttonHeight = constrain(buttonHeight, 0, 30);
    leftButton.updatePosition(0, buttonHeight);
    rightButton.updatePosition(0, buttonHeight);

    // Draw textbox and text (the math equation)
    push();
    fill("#363fa8");
    noStroke();
    rectMode(CENTER);
    rect(mathStr.x, mathStr.y, mathStr.w, 40, 10);
    pop();

    push();
    fill(mathStr.f);
    textSize(mathStr.size);
    textAlign(CENTER, CENTER);
    text(mathStr.str, mathStr.x, mathStr.y);
    pop();
}

// To reset the equation when needed (for example, on a key press):
function keyPressed() {
    if (key === ' ') { // If space bar is pressed
        equationGenerated = false; // Reset so the math question is generated again

        // Explicitly reset button colors to red before generating a new equation
        if (leftButton && rightButton) {
            leftButton.buttonStyles("red", otherString); // Reset left button to red
            rightButton.buttonStyles("red", answerString); // Reset right button to red
        }
    }
}

function checkValidity(solutionLocation, clickedButton) {
    if (correctButton === "left") {
        leftButton.buttonStyles("green");
    } else if (correctButton === "right") {
        rightButton.buttonStyles("green")
    }
}
