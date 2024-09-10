/**
 * Italian flag
 * Diana Edvi
 * 
 * Draws a beautiful italian flag.
 */

"use strict";

/**
 * Creates the canvas for our masterpiece*/
function setup() {
    createCanvas(700,700);
}


/**
 * Draw's the flag on a blue background*/
function draw() {
    //Draw background
    push();
    background(62, 144, 237);
    pop();

    //draw white
    push()
    noStroke();
    rect(100, 200, 500, 300);
    pop();

    //draw green
    push();
    fill("green");
    noStroke()
    rect(100, 200, 165, 300)
    pop();

    //draw red
    push();
    noStroke()
    fill("red");
    rect(435, 200, 165, 300)
    pop();
}