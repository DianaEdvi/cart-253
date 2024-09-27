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
let state = "title";
let titleString = "Welcome to Gaymobile";
let playString = "Click on the car to PLAY!";
let infoString = "Click on hearts to make the LGBTQ+ colors!"
let winString = "You win!! You have successfully spread love for them gays <3"
let playAgainString = "Click anywhere to play again"
let car = {
    xPos: 10,
    yPos: 320,
    baseWidth: 40,
    baseHeight: 15,

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
    // fill: "#ff96e6",
    diagonal: {
        x: 320,
        y: 455,
        size: 30,
        movingLeft: false,
        movingDown: false,
        fill: "#ff96e6",
        colorCounter: 0
    },
    circle: {
        x: 320,
        y: 240,
        size: 30,
        radius: 200,
        angle: 0,
        speed: 0.02,
        circumferenceX: 0,
        circumferenceY: 0,
        fill: "#ff96e6",
        colorCounter: 0
    },
    big: {
        x: 320,
        y: 240,
        size: 30,
        speed: 0.1,
        fill: "#ff96e6",
        colorCounter: 0
    },
    corner: {
        x: 40,
        y: 40,
        size: 40,
        timer: 80,
        clockSpeed: 1,
        visible: true,
        xIndex: 0,
        yIndex: 0,
        fill: "#ff96e6",
        colorCounter: 0
    },
    strafe: {
        x: 550,
        y: 384,
        size: 30,
        speed: 0.1,
        minStrafe: 0.5,
        maxStrafe: 1.5,
        fill: "#ff96e6",
        colorCounter: 0
    },
    double: {
        x: 150,
        y: 150,
        size: 30,
        speed: 0.1,
        angle: 0,
        amplitude: 100,
        middle: 0,
        areOverlapped: false,
        fill: "#ff96e6",
        colorCounter: 0
    }
}

let hasClicked = false;

/**
 * OH LOOK I DIDN'T DESCRIBE SETUP!!
 */
function setup() {
    createCanvas(canvas.canvasWidth, canvas.canvasHeight);

    //Text settings
    textSize(32);
    textAlign(CENTER, CENTER);
    textFont("Courier New");

}


/**
 * OOPS I DIDN'T DESCRIBE WHAT MY DRAW DOES!
 */
function draw() {
    if (state === "title") {
        title();
    } else if (state === "game") {
        game();
    } else if (state === "end") {
        end();
    }
}

function title() {
    background("pink");
    push();
    fill("black");
    text(titleString, width / 2, height / 2);
    text(playString, width / 2, 3 * height / 5);
    pop();

    car.baseWidth = 80;
    car.baseHeight = 20;
    car.yPos = 50;

    drawCar();

    if (mouseIsPressed) {
        state = "game";
    }
}

function game() {
    background(145, 220, 230);
    car.baseWidth = 45;
    car.baseHeight = 12;

    drawMountains();
    drawGround();
    drawCar();
    followMouse();
    moveHearts();

    if (heartTracker()) {
        state = "end";
        console.log("win");
    }
}

function end() {
    background("pink");
    push();
    fill("black");
    textWrap(WORD);
    textAlign(CENTER, CENTER);
    text(winString, width / 9, height / 3, 500);
    text(playAgainString, width / 2, 3 * height / 4);
    pop();

    if (keyIsPressed) {
        state = "title";
        mouseIsPressed = false;

        //Recet all states
        heart.diagonal.fill = "#ff96e6";
        heart.big.fill = "#ff96e6";
        heart.corner.fill = "#ff96e6";
        heart.strafe.fill = "#ff96e6";
        heart.circle.fill = "#ff96e6";
        heart.double.fill = "#ff96e6";

        heart.diagonal.colorCounter = 0;
        heart.big.colorCounter = 0;
        heart.corner.colorCounter = 0;
        heart.strafe.colorCounter = 0;
        heart.circle.colorCounter = 0;
        heart.double.colorCounter = 0;

        car.xPos = 10;
    }
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

function drawGround() {
    push();
    fill("#515151");
    noStroke();
    rect(0, canvas.canvasHeight - 75, canvas.canvasWidth, 75);
    pop;
    writeGameRules();
}

function drawHeart(x, y, w, f) {
    push();
    noStroke();
    fill(f);
    rectMode(CENTER);
    translate(x, y);
    rotate(PI / 4);
    rect(0, 0, w);
    circle(0 - w / 2, 0, w);
    circle(0, 0 - w / 2, w);
    pop();
}

function writeGameRules() {
    push();
    textSize(20);
    fill("black");
    text(infoString, 320, 445);
    pop();
}

function followMouse() {

    //Center car on cursor and make cursor invisible
    let centeredCursor = mouseX - car.baseWidth / 2;
    noCursor();

    //Follow mouse y position and constrain it to the borders, taking into consideration the car's size
    car.yPos = constrain(mouseY, car.baseHeight, height - 1.5 * car.baseHeight);
    car.xPos = constrain(centeredCursor, 0, width - car.baseWidth);
}

function moveHearts() {
    moveDiagonalHeart();
    moveCircleHeart();
    transformBigHeart();
    transformCornerHeart();
    moveStrafeHeart();
    moveDoubleHeart();


}

function moveDiagonalHeart() {
    drawHeart(heart.diagonal.x, heart.diagonal.y, heart.diagonal.size, heart.diagonal.fill);
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
        heart.diagonal.movingLeft = true;
    } else if (heart.diagonal.x <= heart.w) {
        heart.diagonal.movingLeft = false;
    }
    if (heart.diagonal.y >= height - heart.w) {
        heart.diagonal.movingDown = true;
    } else if (heart.diagonal.y <= heart.w) {
        heart.diagonal.movingDown = false;
    }
}

//Move the heart that goes in a circle
function moveCircleHeart() {
    let xPos = heart.circle.x;
    let yPos = heart.circle.y;
    //Maps the heart's x position to a sin wave and the y to a cosine wave, effectively pathing a circle
    const x = map(sin(heart.circle.angle), -1, 1, xPos - heart.circle.radius, xPos + heart.circle.radius);
    const y = map(cos(heart.circle.angle), -1, 1, yPos - heart.circle.radius, yPos + heart.circle.radius);
    drawHeart(x, y, heart.circle.size, heart.circle.fill);


    //Make the heart move
    heart.circle.angle += heart.circle.speed;
    //Assign x and y position to separate variables because we are dealing with angles here
    heart.circle.circumferenceX = x;
    heart.circle.circumferenceY = y;

}

//Increase and decrease the size of big heart depending on mouseX position
function transformBigHeart() {
    heart.big.size = map(mouseX, 0, width, 0, 150);
    heart.big.size = constrain(heart.big.size, 10, 150);
    drawHeart(heart.big.x, heart.big.y, heart.big.size, heart.big.fill);
}

function transformCornerHeart() {

    //Hold the four corner positions
    let xPositions = [heart.corner.x, width - heart.corner.x];
    let yPositions = [heart.corner.y, height - heart.corner.y];

    //Decrease timer
    heart.corner.timer -= heart.corner.clockSpeed;

    //Calculates whether timer finished and changes visibility and position accordingly
    if (heart.corner.timer === 0) {
        //Check if heart is visible/not visible and set to opposite
        if (heart.corner.visible) {
            heart.corner.visible = false;
        } else if (!heart.corner.visible) {
            heart.corner.visible = true;
        }

        //reset timer to 80
        heart.corner.timer = 80;
        //find position
        heart.corner.xIndex = floor(random(0, 2));
        heart.corner.yIndex = floor(random(0, 2));
        heart.corner.x = xPositions[heart.corner.xIndex];
        heart.corner.y = yPositions[heart.corner.yIndex];
    }


    //Draw heart if it is meant to be visible
    if (heart.corner.visible === true) {
        drawHeart(heart.corner.x, heart.corner.y, heart.corner.size, heart.corner.fill);

    }
}

//Draw's a heart that moves randomly in a strafing manner
function moveStrafeHeart() {
    heart.strafe.x += random(-10, 10) * 0.5;
    heart.strafe.x = constrain(heart.strafe.x, heart.strafe.size, width - heart.strafe.size);
    drawHeart(heart.strafe.x, heart.strafe.y, heart.strafe.size, heart.strafe.fill);
}

//Draws a heart that moves in a sine wave and rotates on itself
function moveDoubleHeart() {
    //Sine wave
    const y = map(sin(heart.double.angle), -1, 1, heart.double.x - heart.double.amplitude, heart.double.x + heart.double.amplitude);
    drawHeart(heart.double.x, y, heart.double.size, heart.double.fill);
    //I added a 3 and it made chaos, idk what it is but its cool so I'm keeping it
    heart.double.angle += heart.double.speed + 3;

    // console.log(y);
    if (y > 135 && y < 165) {
        heart.double.middle = y;
    }

}


function clickOnHeart(x, y, size, name, colorCounter) {
    let distance = dist(mouseX, mouseY, x, y);

    size = 2 * size / 3;
    if (distance < size && mouseIsPressed && !hasClicked) {

        // console.log(mouseReleased() + "boo");
        // console.log("mouse in center: " + mouseX, mouseY);
        hasClicked = true;

        //Check for special cases:
        if (name === "diagonal") {
            // console.log(heart.diagonal.colorCounter)
            heart.diagonal.colorCounter++;
            heart.diagonal.fill = colorChecker(heart.diagonal.colorCounter);
            //Checks if counter has reached the end and if so, resets it to 0
            if (heart.diagonal.colorCounter === 6) {
                heart.diagonal.colorCounter = 0;
            }
        } else if (name === "big") {
            heart.big.colorCounter++;
            heart.big.fill = colorChecker(heart.big.colorCounter);
            //Checks if counter has reached the end and if so, resets it to 0
            if (heart.big.colorCounter === 6) {
                heart.big.colorCounter = 0;
            }

        } else if (name === "circle") {
            heart.circle.colorCounter++;
            heart.circle.fill = colorChecker(heart.circle.colorCounter);
            //Checks if counter has reached the end and if so, resets it to 0
            if (heart.circle.colorCounter === 6) {
                heart.circle.colorCounter = 0;
            }
        } else if (name === "strafe") {
            heart.strafe.colorCounter++;
            heart.strafe.fill = colorChecker(heart.strafe.colorCounter);
            //Checks if counter has reached the end and if so, resets it to 0
            if (heart.strafe.colorCounter === 6) {
                heart.strafe.colorCounter = 0;
            }
        } else if (name === "corner") {
            heart.corner.colorCounter++;
            heart.corner.fill = colorChecker(heart.corner.colorCounter);
            //Checks if counter has reached the end and if so, resets it to 0
            if (heart.corner.colorCounter === 6) {
                heart.corner.colorCounter = 0;
            }
        } else if (name === "double") {
            heart.double.colorCounter++;
            heart.double.fill = colorChecker(heart.double.colorCounter);
            //Checks if counter has reached the end and if so, resets it to 0
            if (heart.double.colorCounter === 6) {
                heart.double.colorCounter = 0;
            }
        }
    }
}

function heartTracker() {
    clickOnHeart(heart.big.x, heart.big.y, heart.big.size, "big", heart.big.fill, heart.big.colorCounter);
    clickOnHeart(heart.diagonal.x, heart.diagonal.y, heart.diagonal.size, "diagonal", heart.diagonal.fill, heart.diagonal.colorCounter);
    clickOnHeart(heart.circle.circumferenceX, heart.circle.circumferenceY, heart.circle.size, "circle", heart.circle.fill, heart.circle.colorCounter); //copied variable to avoid bugs
    clickOnHeart(heart.strafe.x, heart.strafe.y, heart.strafe.size, "strafe", heart.strafe.fill, heart.strafe.colorCounter);
    clickOnHeart(heart.corner.x, heart.corner.y, heart.corner.size, "corner", heart.corner.fill, heart.corner.colorCounter);
    clickOnHeart(heart.double.x, heart.double.middle, heart.double.size, "double", heart.double.fill, heart.double.colorCounter); //copied variable to avoid bugs


    // console.log(colors);
    let colors = [heart.big.fill, heart.diagonal.fill, heart.circle.fill, heart.strafe.fill, heart.corner.fill, heart.double.fill];

    //Checks if there are any duplicates in the array
    for (let i = 0; i < colors.length; i++) {
        if (colors[i] === "#ff96e6") {
            console.log("no win");
            return false;
        }
        for (let j = i + 1; j < colors.length; j++) {
            if (colors[i] === colors[j]) {
                console.log("no win")
                return false;
            }
        }
    }
    return true;
}

//Reset clicked flag to ensure the logic is only handled once per click
function mouseReleased() {
    hasClicked = false;
    return true;
}

function colorChecker(colorCounter) {

    if (colorCounter === 1) {
        return "red";
    } else if (colorCounter === 2) {
        return "orange";
    } else if (colorCounter === 3) {
        return "yellow";
    } else if (colorCounter === 4) {
        return "green";
    } else if (colorCounter === 5) {
        return "blue";
    } else if (colorCounter === 6) {
        return "purple";
    }


}

//TODO
//bugs
//car color
//parallax mountains?



