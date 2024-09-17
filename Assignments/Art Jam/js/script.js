/**
 * Title of Project
 * Author Name
 *
 * HOW EMBARRASSING! I HAVE NO DESCRIPTION OF MY PROJECT!
 * PLEASE REMOVE A GRADE FROM MY WORK IF IT'S GRADED!
 */

"use strict";

let car = {
    xPos: 10,
    yPos: 320,
    baseWidth: 80,
    baseHeight: 20,
}

/**
 * OH LOOK I DIDN'T DESCRIBE SETUP!!
 */
function setup() {
    createCanvas(640, 640);
}


/**
 * OOPS I DIDN'T DESCRIBE WHAT MY DRAW DOES!
 */
function draw() {
    background(55, 220, 250);
    drawCar();
    followMouse();
}

function drawCar() {
    //Draw base
    push();
    fill("red");
    noStroke();
    rect(car.xPos, car.yPos, car.baseWidth, car.baseHeight);
    pop;

    //Draw left tire
    push();
    fill("black");
    noStroke();
    //Positions tire proportionally according to car's size
    ellipse(car.xPos + car.baseWidth / 4, car.yPos + car.baseHeight, car.baseHeight);
    pop;

    //Draw left tire
    push();
    fill("black");
    noStroke();
    //Positions tire proportionally according to car's size
    ellipse(car.xPos + car.baseWidth - car.baseWidth / 4, car.yPos + car.baseHeight, car.baseHeight);
    pop;

    //Draw cabin
    push();
    fill("red");
    noStroke();
    //Positions cabin proportionally according to the car's size
    quad(car.xPos, car.yPos,
        car.xPos + car.baseHeight, car.yPos - car.baseHeight,
        car.xPos + car.baseWidth - car.baseHeight, car.yPos - car.baseHeight,
        car.xPos + car.baseWidth, car.yPos);
    pop;
}

function followMouse() {
    //Follow mouse y position
    car.yPos = mouseY;
}

function drawMountains() {
    push();

    pop;
}