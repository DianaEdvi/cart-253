/**
 * Title of Project
 * Author Name
 *
 * HOW EMBARRASSING! I HAVE NO DESCRIPTION OF MY PROJECT!
 * PLEASE REMOVE A GRADE FROM MY WORK IF IT'S GRADED!
 */

"use strict";


/**
 * OH LOOK I DIDN'T DESCRIBE SETUP!!
 */


let buttons = {
    soloButton: undefined,
    mathButton: undefined,
    colorButton: undefined,
    questionButton: undefined
}
let states = {
    current: undefined,
    menu: "menu",
    soloPong: "solo",
    mathPong: "math",
    colorPong: "color",
}

function setup() {
    canvas = createCanvas(640, 640);
    background("#6160b2");
    states.current = states.menu;
    // menu();

}

/**
 * OOPS I DIDN'T DESCRIBE WHAT MY DRAW DOES!
 */
function draw() {
    background("#6160b2");
    soloPong(paddle, ball);
    randomCow(cow);
    mathing(mathStr);
}

let paddle = {x: 320, y: 609, w: 100, h: 30, f: "white", speed: 10};
let ball = {x: 320, y: 320, w: 50, f: "white", speedY: 1, speedX: 3}; // Added speedX for horizontal movement

function soloPong(paddle, ball) {
    // Draw paddle
    push();
    fill(paddle.f);
    rect(paddle.x, paddle.y, paddle.w, paddle.h);
    pop();

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
        ball.y + ball.w / 2 >= paddle.y && ball.x > paddle.x && ball.x < paddle.x + paddle.w) {
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

let cow = {x: 640, y: 100, w: 50, f: "black"}

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
    }
}

let isClicking = false;
let mathStr = {str: undefined, x: 320, y: 100, w: 250, f: "black", size: 32};

function mathing(mathStr) {
    //Initialize
    let operators;
    let randomOperator;
    let randomNumber1;
    let randomNumber2;

    //Check if space is pressed and if so, generate a new equation
    if (keyIsDown(32) && isClicking === false) {
        //Generate equation
        operators = [" + ", " - "];
        randomOperator = random(operators);
        randomNumber1 = floor(random(50));
        randomNumber2 = floor(random(50));

        mathStr.str = randomNumber1 + randomOperator + randomNumber2;
        console.log(mathStr.str);
        isClicking = true;
    } else if (!keyIsDown(32)) {
        isClicking = false;
    }

    //Draw text
    push();
    fill(mathStr.f);
    textSize(mathStr.size);
    textAlign(CENTER, CENTER);
    text(mathStr.str, mathStr.x, mathStr.y);
    pop();
}




