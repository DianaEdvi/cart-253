/**
 * Smiley
 * Diana Edvi
 * 
 * Draws smiley face
 */

"use strict";

/**
 * Creates canvas
*/
function setup() {
    createCanvas(640, 640);
}


/**
 * OOPS I DIDN'T DESCRIBE WHAT MY DRAW DOES!
*/
function draw() {
    background("yellow");
    drawSmiley()
}

function drawSmiley() {
    //circle
    push();
    noFill();
    strokeWeight(20);
    ellipse(320, 320, 500);
    pop();

    //eye 1
    push();
    fill("black");
    ellipse(215, 250, 75, 125);
    pop();

    //eye 2
    push();
    fill("black");
    ellipse(425, 250, 75, 125);
    pop();

    //mouth
    push();
    noFill();
    strokeWeight(20)
    arc(320, 300, 375, 375, 0, PI);
    pop();
}