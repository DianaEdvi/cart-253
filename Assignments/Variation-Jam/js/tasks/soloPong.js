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
        counters.pong++;
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