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
let mathStr = {str: undefined, x: 320, y: 30, w: 250, f: "black", size: 32};
let answerString = ""
let otherString = ""

function mathing(mathStr) {
    //Initialize
    let operators;
    let randomOperator;
    let randomNumber1;
    let randomNumber2;
    let solutionLocation;

    //Take out of if statement when you have a proper event set up
    //Check if space is pressed and if so, generate a new equation
    if (keyIsDown(32) && isClicking === false) {
        isClicking = true;

        //Generate equation
        operators = [" + ", " - "];
        randomOperator = random(operators);
        randomNumber1 = floor(random(50));
        randomNumber2 = floor(random(50));
        solutionLocation = floor(random(0, 2));
        mathStr.str = randomNumber1 + randomOperator + randomNumber2;

        // Calculate answer
        let answer = undefined;
        let wrongAnswer = 1

        if (randomOperator === " + ") {
            answer = randomNumber1 + randomNumber2;
            //If the answer is a negative, make false option negative as well
            if (answer < 0) {
                wrongAnswer = -1
            }
            answerString = "" + answer
            otherString = "" + (wrongAnswer * floor(random(0, 50)))
            if (otherString === answerString) {
                otherString = "" + (wrongAnswer * floor(random(0, 50)))
            }
        } else {
            answer = randomNumber1 - randomNumber2;
            //If the answer is a negative, make false option negative as well
            if (answer < 0) {
                wrongAnswer = -1
            }
            answerString = "" + answer
            otherString = "" + (wrongAnswer * floor(random(0, 50)))
            if (otherString === answerString) {
                otherString = "" + (wrongAnswer * floor(random(0, 50)))
            }
        }

        //Display on buttons
        let leftButton;
        let rightButton;

        if (solutionLocation === 0) {
            leftButton = new Button(answerString, 240, 100, 150, 80, () => leftButton.buttonStyles("green"));
            rightButton = new Button(otherString, 420, 100, 150, 80, () => "");
        } else {
            leftButton = new Button(otherString, 240, 100, 150, 80, () => "");
            rightButton = new Button(answerString, 420, 100, 150, 80, () => leftButton.buttonStyles("green"));
        }

    } else if (!keyIsDown(32)) {
        isClicking = false;
    }

    //Draw textbox
    push()
    fill("#363fa8")
    noStroke()
    rectMode(CENTER)
    rect(mathStr.x, mathStr.y, mathStr.w, 40, 10)
    pop()

    //Draw text
    push();
    fill(mathStr.f);
    textSize(mathStr.size);
    textAlign(CENTER, CENTER);
    text(mathStr.str, mathStr.x, mathStr.y);
    pop();

}




