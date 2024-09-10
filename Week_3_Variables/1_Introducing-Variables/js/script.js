/**
 * Variables
 * Diana Edvi
 * 
 * comments suck
 */

"use strict";

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
    background(0);

    //draw circle
    push();
    fill(255, 255, 0);
    noStroke();
    ellipse(mouseX, mouseY, 100, 100);
    pop();

}