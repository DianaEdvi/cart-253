/**
 * GAYMOBILE
 * By Diana Edvi
 *
 * This project requires the player to repeatedly click on hearts using their "Gaymobile" (the cursor)
 * The hearts move or transform in different ways on the screen
 * Each click changes the heart's color in the order of the rainbow
 * The player wins if all the colors of the LGBTQ+ flag are visible (red, orange, yellow, green, blue, purple)
 */

"use strict";

//State of the game
let state = "title";

//Strings within the game
let titleString = "Welcome to GAYMOBILE.";
let playString = "Click on the car to PLAY!";
let infoString = "Click on hearts to make the LGBTQ+ colors!"
let infoString2 = "Some hearts require good timing!"
let winString = "You win!! You have successfully spread love for them gays <3"
let playAgainString = "Click on any key to play again"

//Car that will act as the cursor
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

//Mountains that will be in the background
let mountain = {
    //Coordinates for the bottom left corner of the mountains
    //Mountain One width:
    one: {
        x: 0,
        y: 480,
        f: "#964b32"
    },
    two: {
        x: 160,
        y: 480,
        f: "#be5a46"
    },
}

//Heart that will be the item(s) to click
let heart = {
    //Heart that bounces off the sides
    diagonal: {
        x: 320,
        y: 455,
        size: 30,
        movingLeft: false,
        movingUp: false,
        fill: "#ff96e6",
        colorCounter: 0
    },
    //Heart that moves in a circle
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
    //Heart that grows and shrinks
    big: {
        x: 320,
        y: 240,
        size: 30,
        speed: 0.1,
        fill: "#ff96e6",
        colorCounter: 0
    },
    //Heart that appears in random corners
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
    //Heart that strafes left to right randomly
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
    //Heart that appears as double
    double: {
        x: 150,
        y: 150,
        size: 30,
        speed: 0.1,
        angle: 0,
        amplitude: 100,
        middle: 0,
        fill: "#ff96e6",
        colorCounter: 0
    }
}

//Check if mouse clicked
let hasClicked = false;

/**
 * Create the canvas, set up text settings
 */
function setup() {
    createCanvas(640, 480);

    //Text settings
    textSize(32);
    textAlign(CENTER, CENTER);
    textFont("Courier New");

}

/**
 * Depending on the current state, run the function
 * to handle the state. */
function draw() {
    //Check the state and call the appropriate function
    if (state === "title") {
        title();
    } else if (state === "game") {
        game();
    } else if (state === "end") {
        end();
    }
}

/**
 * Create title screen
 * Set the car's size, position and draw it
 * Draw's text
 * Depending on if mouse is pressed and is on the car, continue to the game state
 */
function title() {
    //Create title screen
    push();
    background("pink");
    push();
    fill("black");
    text(titleString, width / 2, height / 2);
    text(playString, width / 2, 3 * height / 5);
    cursor("arrow");
    pop();

    //Sets the car's size and position
    car.baseWidth = 80;
    car.baseHeight = 20; //Height of bottom rectangle, not full height
    car.yPos = 370;
    car.xPos = 285;

    //Draw car
    drawCar();

    //Calculate distance from mouse position to car
    let distance = dist(mouseX, mouseY, car.xPos, car.yPos);

    //Store car's size
    let size = car.baseWidth;

    //Change state if mouse is pressed and if it is within the bound of the car
    if (mouseIsPressed && distance < size) {
        state = "game";
    }
}

/**
 * The game portion of the project
 * Draws the background and sets the car's dimensions
 * Calls all drawing functions
 * Calls heart functionality function
 * Checks win condition and transfers states accordingly
 */
function game() {
    //Draw background
    background(145, 220, 230);

    //Set car dimensions
    car.baseWidth = 45;
    car.baseHeight = 12;

    //Draw objects
    drawMountains();
    drawGround();
    drawCar();

    //Assign cursor to car
    followMouse();

    //Draw in hearts and make them move
    moveHearts();

    //Checks if win condition is met
    if (heartTracker()) {
        state = "end";
        console.log("win");
    }
}

/**
 * Creates end screen
 * Draws text
 * Checks if key is pressed and changes to end state accordingly
 * Resets all fill and counter properties, as well as the car's position
 */
function end() {
    //Draw background
    background("pink");

    //Write text
    push();
    fill("black");
    textWrap(WORD);
    textAlign(CENTER, CENTER);
    text(winString, width / 9, height / 3, 500);
    text(playAgainString, width / 2, 3 * height / 4);
    pop();

    //Check if any button on the keyboard is pressed and changes the state to title accordingly
    if (keyIsPressed) {
        state = "title";

        //Reset all heart fill states
        heart.diagonal.fill = "#ff96e6";
        heart.big.fill = "#ff96e6";
        heart.corner.fill = "#ff96e6";
        heart.strafe.fill = "#ff96e6";
        heart.circle.fill = "#ff96e6";
        heart.double.fill = "#ff96e6";

        //Reset all heart colorCounter states
        heart.diagonal.colorCounter = 0;
        heart.big.colorCounter = 0;
        heart.corner.colorCounter = 0;
        heart.strafe.colorCounter = 0;
        heart.circle.colorCounter = 0;
        heart.double.colorCounter = 0;

        //Reset's car's x position
        car.xPos = 10;
    }
}

/**
 * Draw's car, which is composed of two tires(circles),a base (rectangle) and the cabin (trapezoid)
 * Changes the car's color according to mouseY position
 */
function drawCar() {

    //No lines anywhere
    noStroke();

    push();
    //Changes the color of the car according to the mouseY
    //Separated into 5 in order to include the full rainbow
    //Red 255, Green increases, blue 0
    if (mouseY <= height / 5) {
        car.r = 255;
        car.g = map(mouseY, 0, height / 5, 0, 255);
        car.b = 0;
    }
    //Red decreases, Green 255, blue 0
    else if (mouseY > height / 5 && mouseY < 2 * height / 5) {
        car.r = map(mouseY, height / 5, 2 * height / 5, 255, 0);
        car.g = 255;
        car.b = 0;
    }
    //Red 0, Green 255, blue increases
    else if (mouseY > 2 * height / 5 && mouseY < 3 * height / 5) {
        car.r = 0;
        car.g = 255;
        car.b = map(mouseY, 2 * height / 5, 3 * height / 5, 0, 255);
    }
    //Red 0, Green decreases, blue 255
    else if (mouseY > 3 * height / 5 && mouseY < 4 * height / 5) {
        car.r = 0;
        car.g = map(mouseY, 3 * height / 5, 4 * height / 5, 255, 0);
        car.b = 255;
    }
    //Red increases, Green 0, blue 255
    else {
        car.r = map(mouseY, 4 * height / 5, 480, 0, 255);
        car.g = 0;
        car.b = 255;
    }

    //Set car color
    fill(car.r, car.g, car.b);

    //Draw base (rectangle)
    rect(car.xPos, car.yPos, car.baseWidth, car.baseHeight);

    //Draw cabin
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

/**
 * Draw's mountains in the background
 * Composed of two triangles
 */
function drawMountains() {
    //Draw first mountain
    push();
    //Set mountain color
    fill(mountain.one.f);
    //No lines
    noStroke();
    //Positions triangle
    triangle(mountain.one.x, height,
        mountain.one.x + width / 4, 0,
        mountain.one.x + width / 2, height);
    pop;

    //Draw second mountain
    push();
    //Set mountains color
    fill(mountain.two.f);
    //No lines
    noStroke();
    //Positions triangle
    triangle(mountain.two.x, mountain.two.y,
        mountain.two.x + width / 2, 0.25 * height,
        mountain.two.x + width, height);
    pop;
}

/**
 * Draw's ground
 * Composed of a rectangle
 */
function drawGround() {
    //Draw ground
    push();
    //Set ground color
    fill("#515151");
    //No lines
    noStroke();
    //Position rectangle
    rect(0, height - 75, width, 75);
    pop;
    //Print game rules text onto the screen
    writeGameRules();
}

/**
 * Write's game rules on to the screen
 */
function writeGameRules() {
    //Display text
    push();
    //Size of text
    textSize(20);
    //Color of text
    fill("black");
    //Displays string at position x, y
    text(infoString, 320, 435);
    text(infoString2, 320, 465);

    pop();

    push();
    pop();
}

/**
 * Draws a heart, composed of a square rotated 45 degrees and two circles
 * @param x The x-coordinate of the heart's center
 * @param y The y-coordinate of the heart's center
 * @param w The size of the heart
 * @param f The color of the heart
 */
function drawHeart(x, y, w, f) {
    //Draw heart
    push();
    //No lines
    noStroke();
    //Sets color of heart
    fill(f);
    //Sets the rectangle mode to draw from the center
    rectMode(CENTER);
    //Move the origin to the heart's x and y position
    translate(x, y);
    //Rotate the square by 45 degrees
    rotate(PI / 4);
    //Create rectangle
    rect(0, 0, w);
    //Create circles
    circle(0 - w / 2, 0, w);
    circle(0, 0 - w / 2, w);
    pop();
}

/**
 * Binds the car to the cursor and constrains it to the canvas
 */
function followMouse() {

    //Center car on cursor and make cursor invisible
    let centeredCursor = mouseX - car.baseWidth / 2;
    noCursor();

    //Follow mouse y position and constrain it to the borders, taking into consideration the car's size
    car.yPos = constrain(mouseY, car.baseHeight, height - 1.5 * car.baseHeight);
    car.xPos = constrain(centeredCursor, 0, width - car.baseWidth);
}

/**
 * Holds the functions that handle all the heart movements and transformations
 */
function moveHearts() {
    //Move heart that bounces around the walls
    moveDiagonalHeart();
    //Move heart that paths in a circle
    moveCircleHeart();
    //Make heart grow and shrink
    transformBigHeart();
    //Make heart appear in random corners
    transformCornerHeart();
    //Make heart strafe randomly
    moveStrafeHeart();
    //Split heart into double and oscillate
    moveDoubleHeart();
}

/**
 * Draw's a heart that moves diagonally around the screen
 * Constrains heart to the bounds of the screen
 * Checks if the heart is moving left or down, and changes its direction accordingly
 */
function moveDiagonalHeart() {
    //Draw heart
    drawHeart(heart.diagonal.x, heart.diagonal.y, heart.diagonal.size, heart.diagonal.fill);
    //Constrain to screen bounds
    heart.diagonal.x = constrain(heart.diagonal.x, 0, width - heart.diagonal.size);
    heart.diagonal.y = constrain(heart.diagonal.y, heart.diagonal.size, height - heart.diagonal.size);

    //If heart is not moving left, move it right, otherwise, move it left
    if (!heart.diagonal.movingLeft) {
        heart.diagonal.x++;
    } else {
        heart.diagonal.x--;
    }

    //If heart is not moving down, move it down, otherwise, move it up
    if (!heart.diagonal.movingUp) {
        heart.diagonal.y++;
    } else {
        heart.diagonal.y--;
    }

    //If heart hits right wall, switch directions
    if (heart.diagonal.x >= width - heart.diagonal.size) {
        heart.diagonal.movingLeft = true;
    }
    //If heart hits left wall, switch directions
    else if (heart.diagonal.x <= heart.diagonal.size) {
        heart.diagonal.movingLeft = false;
    }
    //If heart hits bottom of canvas, switch directions
    if (heart.diagonal.y >= height - heart.diagonal.size) {
        heart.diagonal.movingUp = true;
    }
    //If heart hits top of canvas, switch directions
    else if (heart.diagonal.y <= heart.diagonal.size) {
        heart.diagonal.movingUp = false;
    }
}

/**
 * Draw's a heart that moves in a circular path
 * Assigns the heart's x and y positions to separate variables (used for mouse click recognition later)
 */
function moveCircleHeart() {
    //Set x and y positions to local variables
    let xPos = heart.circle.x;
    let yPos = heart.circle.y;
    //Maps the heart's x position to a sin wave and the y to a cosine wave, effectively pathing a circle
    const x = map(sin(heart.circle.angle), -1, 1, xPos - heart.circle.radius, xPos + heart.circle.radius);
    const y = map(cos(heart.circle.angle), -1, 1, yPos - heart.circle.radius, yPos + heart.circle.radius);
    //Draw heart
    drawHeart(x, y, heart.circle.size, heart.circle.fill);

    //Make the heart move
    heart.circle.angle += heart.circle.speed;
    //Assign x and y position to separate variables so we can reference the position later
    heart.circle.circumferenceX = x;
    heart.circle.circumferenceY = y;
}

/**
 * Draw's a heart who's size increases or decreases depending on mouseX position
 */
function transformBigHeart() {
    //Map the heart's size to the mouseX position and constrain it's size
    heart.big.size = map(mouseX, 0, width, 0, 150);
    heart.big.size = constrain(heart.big.size, 10, 150);
    //Draw heart
    drawHeart(heart.big.x, heart.big.y, heart.big.size, heart.big.fill);
}

/**
 * Draw's a heart that randomly changes positions in the four corners of the screen every 80 frames
 * Store the four corner positions in two arrays
 * Decrement timer and changes heart's visibility accordingly
 */
function transformCornerHeart() {

    //Hold the four corner positions
    let xPositions = [heart.corner.x, width - heart.corner.x];
    let yPositions = [heart.corner.y, height - heart.corner.y];

    //Decrement timer
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
        //Set heart's new position
        heart.corner.x = xPositions[heart.corner.xIndex];
        heart.corner.y = yPositions[heart.corner.yIndex];
    }

    //Draw heart if it is meant to be visible
    if (heart.corner.visible === true) {
        drawHeart(heart.corner.x, heart.corner.y, heart.corner.size, heart.corner.fill);

    }
}

/**
 * Draw's a heart that moves randomly in a strafing manner
 */
function moveStrafeHeart() {
    //Set new random x position
    heart.strafe.x += random(-10, 10) * 0.5;
    //Constrain the heart to the bounds of the screen
    heart.strafe.x = constrain(heart.strafe.x, heart.strafe.size, width - heart.strafe.size);
    //Draw heart
    drawHeart(heart.strafe.x, heart.strafe.y, heart.strafe.size, heart.strafe.fill);
}

/**
 * Draws a heart that looks like it is in two places at once
 */
function moveDoubleHeart() {
    //Maps y positino to a sine wave
    const y = map(sin(heart.double.angle), -1, 1, heart.double.x - heart.double.amplitude, heart.double.x + heart.double.amplitude);
    //Draw heart
    drawHeart(heart.double.x, y, heart.double.size, heart.double.fill);
    //I added a 3 and it made chaos. idk what it is but its cool, so I'm keeping it
    heart.double.angle += heart.double.speed + 3;

    //Checks if hearts are overlapping and if so, sets middle to the y position (for click functionality later)
    if (y > 135 && y < 165) {
        heart.double.middle = y;
    }
}

/**
 * Chceks what the current color counter is at and returns the appropriate color
 * @param colorCounter The color counter of the heart
 * @returns {string} The color each color counter value is assigned to
 */
function colorChecker(colorCounter) {

    //For each counter value, return the appropriate color
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

/**
 * Checks if the user has clicked on each heart and modifies the heart's color accordingly
 * For each heart type, track the color it is at and modify its color counter every time it changes
 * @param x The x position of the heart
 * @param y The y position of the heart
 * @param size The size of the heart
 * @param name The name of the heart
 */
function clickOnHeart(x, y, size, name) {
    //Calculate distance from mouse to heart
    let distance = dist(mouseX, mouseY, x, y);

    //Make the area of acceptance slightly smaller than the heart
    size = 2 * size / 3;
    //Checks if mouse is within the heart's bounds and if the mouse is pressed and released
    if (distance < size && mouseIsPressed && !hasClicked) {
        //Ensure counter only increments once per click
        hasClicked = true;

        //For each heart, increment color counter if it is clicked
        //Change the color based on counter
        //Resets counter if purple has been reached
        if (name === "diagonal") {
            heart.diagonal.colorCounter++;
            heart.diagonal.fill = colorChecker(heart.diagonal.colorCounter);
            if (heart.diagonal.colorCounter === 6) {
                heart.diagonal.colorCounter = 0;
            }
        } else if (name === "big") {
            heart.big.colorCounter++;
            heart.big.fill = colorChecker(heart.big.colorCounter);
            if (heart.big.colorCounter === 6) {
                heart.big.colorCounter = 0;
            }

        } else if (name === "circle") {
            heart.circle.colorCounter++;
            heart.circle.fill = colorChecker(heart.circle.colorCounter);
            if (heart.circle.colorCounter === 6) {
                heart.circle.colorCounter = 0;
            }
        } else if (name === "strafe") {
            heart.strafe.colorCounter++;
            heart.strafe.fill = colorChecker(heart.strafe.colorCounter);
            if (heart.strafe.colorCounter === 6) {
                heart.strafe.colorCounter = 0;
            }
        } else if (name === "corner") {
            heart.corner.colorCounter++;
            heart.corner.fill = colorChecker(heart.corner.colorCounter);
            if (heart.corner.colorCounter === 6) {
                heart.corner.colorCounter = 0;
            }
        } else if (name === "double") {
            heart.double.colorCounter++;
            heart.double.fill = colorChecker(heart.double.colorCounter);
            if (heart.double.colorCounter === 6) {
                heart.double.colorCounter = 0;
            }
        }
    }
}

/**
 * Calls the clickOnHeart function for each heart
 * Checks if all the hearts are of different colors
 * @returns {boolean} Whether all colors are different
 */
function heartTracker() {
    //Perform click logic on hearts
    clickOnHeart(heart.big.x, heart.big.y, heart.big.size, "big", heart.big.fill, heart.big.colorCounter);
    clickOnHeart(heart.diagonal.x, heart.diagonal.y, heart.diagonal.size, "diagonal", heart.diagonal.fill, heart.diagonal.colorCounter);
    clickOnHeart(heart.circle.circumferenceX, heart.circle.circumferenceY, heart.circle.size, "circle", heart.circle.fill, heart.circle.colorCounter); //copied variable to avoid bugs
    clickOnHeart(heart.strafe.x, heart.strafe.y, heart.strafe.size, "strafe", heart.strafe.fill, heart.strafe.colorCounter);
    clickOnHeart(heart.corner.x, heart.corner.y, heart.corner.size, "corner", heart.corner.fill, heart.corner.colorCounter);
    clickOnHeart(heart.double.x, heart.double.middle, heart.double.size, "double", heart.double.fill, heart.double.colorCounter); //copied variable to avoid bugs

    //Store all 6 colors in an array
    let colors = [heart.big.fill, heart.diagonal.fill, heart.circle.fill, heart.strafe.fill, heart.corner.fill, heart.double.fill];

    //Checks if there are any duplicates in the array
    for (let i = 0; i < colors.length; i++) {
        //If there are any pinks, return false
        if (colors[i] === "#ff96e6") {
            return false;
        }
        //Compare all colors with each other, except itself
        //Return false if there are duplicates
        for (let j = i + 1; j < colors.length; j++) {
            if (colors[i] === colors[j]) {
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


//TODO
//Front page car