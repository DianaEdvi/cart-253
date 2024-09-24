/**
 * Title of Project
 * Author Name
 *
 * HOW EMBARRASSING! I HAVE NO DESCRIPTION OF MY PROJECT!
 * PLEASE REMOVE A GRADE FROM MY WORK IF IT'S GRADED!
 */

"use strict";

let canvas = {
    canvasWidth: 640,
    canvasHeight: 480
}

let car = {
    xPos: 10,
    yPos: 320,
    baseWidth: 80,
    baseHeight: 20,

    fill: {
        r: 0,
        g: 0,
        b: 0
    }
}

//Establishes mountain properties
let mountain = {
    fill: "brown",
    //Coordinates for the bottom left corner of the mountains
    //Mountain One width:
    mountainOneX: 0,
    mountainOneY: 480,
    mountainTwoX: 160,
    mountainTwoY: 480,
    mountainOneWidth: 320,
    mountainTwoWidth: 640,
    // mountainThreeWidth:
}

let heart = {
    w: 30,
    diagonal: {
        x: 320,
        y: 455,
        movingLeft: false,
        movingDown: false
    },
    circle: {
        x: 320,
        y: 240,
    }
}

let timer = 60;


/**
 * OH LOOK I DIDN'T DESCRIBE SETUP!!
 */
function setup() {
    createCanvas(canvas.canvasWidth, canvas.canvasHeight);
}


/**
 * OOPS I DIDN'T DESCRIBE WHAT MY DRAW DOES!
 */
function draw() {
    background(145, 220, 230);
    // drawMountains();
    // moveMountains();
    drawGround();
    drawCar();
    followMouse();
    moveDiagonalHeart();
    moveCircleHeart();
}

function drawCar() {
    //Car's colors
    let red;
    let green;
    let blue;
    noStroke();

    //Draw cabin
    push();
    //Changes the color of the car according to the mouseY
    //Separated into 5 in order to include the full rainbow
    if (mouseY <= height / 5) {
        red = 255;
        green = map(mouseY, 0, height / 5, 0, 255);
        blue = 0;
    } else if (mouseY > height / 5 && mouseY < 2 * height / 5) {
        red = map(mouseY, height / 5, 2 * height / 5, 0, 255);
        green = 255;
        blue = 0;
    } else if (mouseY > 2 * height / 5 && mouseY < 3 * height / 5) {
        red = 0;
        green = 255;
        blue = map(mouseY, 2 * height / 5, 3 * height / 5, 0, 255);
    } else if (mouseY > 3 * height / 5 && mouseY < 4 * height / 5) {
        red = 0;
        green = map(mouseY, 3 * height / 5, 4 * height / 5, 255, 0);
        blue = 255;
    } else {
        red = map(mouseY, 4 * height / 5, 480, 0, 255);
        console.log(4 * height / 5)
        green = 0;
        blue = 255;
    }

    fill(red, green, blue);



    //Draw base (rectangle)
    rect(car.xPos, car.yPos, car.baseWidth, car.baseHeight);

    //Draw cabin (trapezoid)
    //Positions cabin proportionally according to the car's size
    quad(car.xPos, car.yPos,
        car.xPos + car.baseHeight, car.yPos - car.baseHeight,
        car.xPos + car.baseWidth - car.baseHeight, car.yPos - car.baseHeight,
        car.xPos + car.baseWidth, car.yPos);
    pop;

    //Draw left tire
    push();
    fill("black");
    //Positions tire proportionally according to car's size
    ellipse(car.xPos + car.baseWidth / 4, car.yPos + car.baseHeight, car.baseHeight);
    pop;

    //Draw left tire
    push();
    fill("black");
    //Positions tire proportionally according to car's size
    ellipse(car.xPos + car.baseWidth - car.baseWidth / 4, car.yPos + car.baseHeight, car.baseHeight);
    pop;
}

function followMouse() {

    //Center car on cursor and make cursor invisible
    let centeredCursor = mouseX - car.baseWidth/2;
    noCursor();

    //Follow mouse y position and constrain it to the borders, taking into consideration the car's size
    car.yPos = constrain(mouseY, car.baseHeight, height - 1.5 * car.baseHeight);
    car.xPos = constrain(centeredCursor, 0, width - car.baseWidth);
}

function drawMountains() {
    //Draw first mountain
    push();
    fill(160, 75, 50);
    noStroke();
    //Positions triangle
    triangle(mountain.mountainOneX, canvas.canvasHeight,
        mountain.mountainOneX + canvas.canvasWidth / 4, 0,
        mountain.mountainOneX + canvas.canvasWidth / 2, canvas.canvasHeight);
    pop;

    //Draw second mountain
    push();
    fill(190, 90, 70);
    noStroke();
    //Positions triangle
    triangle(mountain.mountainTwoX, mountain.mountainTwoY,
        mountain.mountainTwoX + canvas.canvasWidth / 2, 0.25 * canvas.canvasHeight,
        mountain.mountainTwoX + canvas.canvasWidth, canvas.canvasHeight);
    pop;
}

// function drawMountainsTwo() {
//     console.log("i have been called")
//     //Draw first mountain
//     push();
//     fill(160, 75, 50);
//     noStroke();
//     //Positions triangle
//     triangle(canvas.canvasWidth + mountain.mountainOneX, canvas.canvasHeight,
//         canvas.canvasWidth + mountain.mountainOneX + canvas.canvasWidth / 4, 0,
//         canvas.canvasWidth + mountain.mountainOneX + canvas.canvasWidth / 2, canvas.canvasHeight);
//     pop;
//
//     //Draw second mountain
//     push();
//     fill(190, 90, 70);
//     noStroke();
//     //Positions triangle
//     triangle(canvas.canvasWidth + mountain.mountainTwoX, mountain.mountainTwoY,
//         canvas.canvasWidth + mountain.mountainTwoX + canvas.canvasWidth / 2, 0.25 * canvas.canvasHeight,
//         canvas.canvasWidth + mountain.mountainTwoX + canvas.canvasWidth, canvas.canvasHeight);
//     pop;
// }

//Draw ground
function drawGround() {
    push();
    fill("green");
    noStroke();
    rect(0, canvas.canvasHeight - 75, canvas.canvasWidth, 75);
    pop;
}

function moveMountains() {
    mountain.mountainOneX -= 3;
    mountain.mountainTwoX -= 3;
    let counter = 0;
    counter -= 3;


    if (mountain.mountainOneX <= -10) {
        drawMountainsTwo();
        mountain.mountainOneX = canvas.canvasWidth;
        mountain.mountainTwoX = canvas.canvasWidth + mountain.mountainOneWidth;
    }

    if (counter <= -640) {
        console.log("i am here")
        console.log(counter)
        mountain.mountainOneX = canvas.canvasWidth;
        mountain.mountainTwoX = canvas.canvasWidth + mountain.mountainOneWidth;
    }

}

function drawHeart(x, y) {
    push();
    fill(255, 150, 230)
    noStroke();
    rectMode(CENTER);
    translate(x, y);
    rotate(PI / 4);
    rect(0, 0, heart.w);
    circle(0 - heart.w / 2, 0, heart.w);
    circle(0, 0 - heart.w / 2, heart.w);
    pop();
}


function moveDiagonalHeart() {
    drawHeart(heart.diagonal.x, heart.diagonal.y);
    heart.diagonal.x = constrain(heart.diagonal.x, 0, width - heart.w);
    heart.diagonal.y = constrain(heart.diagonal.y, heart.w, height - heart.w);

    if (!heart.diagonal.movingLeft) {
        heart.diagonal.x++;
    } else {
        heart.diagonal.x--;
    }

    if (!heart.diagonal.movingDown) {
        heart.diagonal.y++;
    } else {
        heart.diagonal.y--;
    }

    if (heart.diagonal.x >= width - heart.w) {
        console.log("hit right");
        heart.diagonal.movingLeft = true;
    } else if (heart.diagonal.x <= heart.w) {
        console.log("hit left");
        heart.diagonal.movingLeft = false;
    }
    if (heart.diagonal.y >= height - heart.w) {
        console.log("hit top");
        heart.diagonal.movingDown = true;
    } else if (heart.diagonal.y <= heart.w) {
        console.log("hit bottom");
        heart.diagonal.movingDown = false;
    }
}

function moveCircleHeart() {
    drawHeart(200, 240);
    // heart.size.size =

}


//TODO

//Spawn hearts
//If collide with heart, destroy heart and move car forward
//If car reaches end of the screen, win
//Spawnmountains
//Title and end screen?