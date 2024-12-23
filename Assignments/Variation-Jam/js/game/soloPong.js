"use strict";

let paddle = {x: 320, y: 625, w: 100, h: 15, f: "#e8b974", speed: 10};
let ball = {x: 320, y: 320, w: 50, f: "#e8b974", speedY: 1, speedX: 3}; // Added speedX for horizontal movement
let countdown = 3; // Countdown starts at 3 seconds
let countdownActive = true; // Flag to control countdown state
let countdownStartTime; // Tracks when the countdown starts (used to calculate how much time has passed since the countdown began)

let lastX = ball.x;  // Stores the last X position of the ball
let lastTime = Date.now();  // Stores the last time the X position was checked
let stuckThreshold = 100;  // Time threshold in milliseconds (1 second)
let currentTime;


/**
 * Creates the solo pong mechanic. Draws the ball and the paddle and checks for user input to move the paddle
 * @param paddle
 * @param ball
 */
function soloPong(paddle, ball) {
    if (!tasks.pong.isActive) {
        tasks.currentTask = tasks.pong.name;
    }

    drawPaddle(paddle);
    movePaddle(paddle);

    if (countdownActive) {
        manageCountdown();
        return;
    }

    drawBall(ball);
    moveBall(ball);

    handleCollision(ball, paddle);

    // Check if ball goes off-screen
    if (ball.y - ball.w / 2 > height) {
        updateHealth(false);
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

/**
 * Draw the ball onto the screen
 */
function drawBall(ball) {
    // Draw ball
    push();
    fill(ball.f);
    ellipse(ball.x, ball.y, ball.w);
    pop();
}

/**
 * Draw the paddle onto the screen
 */
function drawPaddle(paddle) {
    // Draw paddle
    push();
    fill(paddle.f);
    rect(paddle.x, paddle.y, paddle.w, paddle.h);
    pop();

}

/**
 * Draw the countdown
 * @param remaining The remaining numbers to count
 */
function drawCountDown(remaining) {
    // Draw countdown text
    push();
    fill("white");
    textSize(32);
    textAlign(CENTER, CENTER);
    text(remaining, ball.x, ball.y);
    pop();
}

/**
 * Move the ball
 */
function moveBall() {
    // Move ball
    ball.x += ball.speedX;
    ball.y += ball.speedY;

    // Check if the ball's x position hasn't changed for 1 second
    if (Math.abs(ball.x - lastX) < 1) {  // Ball's X hasn't moved significantly
        currentTime = Date.now();  // Get the current time
        if (currentTime - lastTime > stuckThreshold) {
            // The ball has been in the same X position for over 1 second
            resetBall();
            updateHealth(false);
        }
    } else {
        // Reset the last time and position since the ball has moved
        lastX = ball.x;
        lastTime = Date.now();  // Update the last time
    }
}

/**
 * Move the paddle according to user input
 */
function movePaddle() {
    // Move paddle based on key presses
    if (keyIsDown(65)) {
        paddle.x -= paddle.speed;
    }
    if (keyIsDown(68)) {
        paddle.x += paddle.speed;
    }

    // Constrain paddle within canvas boundaries
    paddle.x = constrain(paddle.x, 0, width - paddle.w);
}

/**
 * Manage collisions with paddle and walls
 */
function handleCollision(ball, paddle) {
    // Check collisions with top wall
    if (ball.y - ball.w / 2 <= 0) {
        ball.speedY *= -1;
    }

    // Check collisions with side walls
    if (ball.x - ball.w / 2 <= 0) {
        ball.x = ball.w / 2; // Reset position to prevent overshooting
        ball.speedX *= -1;
    } else if (ball.x + ball.w / 2 >= width) {
        ball.x = width - ball.w / 2; // Reset position to prevent overshooting
        ball.speedX *= -1;
    }

    // Check collision with paddle
    if (ball.y + ball.w / 2 >= paddle.y && ball.x > paddle.x && ball.x < paddle.x + paddle.w) {
        playSound(audio.gameSounds.paddle);
        // Increment counter
        tasks.pong.counter++;
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
}

/**
 * Calculate the countdown
 */
function manageCountdown() {
    // Handle countdown display
    let elapsedTime = millis() - countdownStartTime;
    let remaining = 3 - Math.floor(elapsedTime / 1000); // The remaining numbers to count
    if (remaining >= 1) {
        drawCountDown(remaining);
    } else {
        // End countdown
        countdownActive = false;
    }
}
