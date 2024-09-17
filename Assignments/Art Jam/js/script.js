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
    drawMountains();
    moveMountains();
    drawGround();
    drawCar();
    // followMouse();


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

function drawMountainsTwo() {
    console.log("i have been called")
    //Draw first mountain
    push();
    fill(160, 75, 50);
    noStroke();
    //Positions triangle
    triangle(canvas.canvasWidth + mountain.mountainOneX, canvas.canvasHeight,
        canvas.canvasWidth + mountain.mountainOneX + canvas.canvasWidth / 4, 0,
        canvas.canvasWidth + mountain.mountainOneX + canvas.canvasWidth / 2, canvas.canvasHeight);
    pop;

    //Draw second mountain
    push();
    fill(190, 90, 70);
    noStroke();
    //Positions triangle
    triangle(canvas.canvasWidth + mountain.mountainTwoX, mountain.mountainTwoY,
        canvas.canvasWidth + mountain.mountainTwoX + canvas.canvasWidth / 2, 0.25 * canvas.canvasHeight,
        canvas.canvasWidth + mountain.mountainTwoX + canvas.canvasWidth, canvas.canvasHeight);
    pop;
}

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