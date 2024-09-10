/**
 * Italian flag
 * Diana Edvi
 * 
 * Creates a drawing of a pyramid.
 */

"use strict";

/**
 * Creates the canvas for our masterpiece
*/
function setup() {
    createCanvas(640, 640);
}


/**
 * Draw's yellow pyramid on a blue background.
*/
function draw() {
    //Draw background
    push();
    background(62, 144, 237);
    pop();

    //Draw sand 1
    push();
    noStroke();
    fill("yellow");
    ellipse(50, 600, 600);
    pop();

    //Draw sand 2
    push();
    noStroke();
    fill("yellow");
    ellipse(400, 650, 600, 500);
    pop();

    //Draw pyramid 1
    push();
    noStroke();
    fill(224, 217, 13);
    triangle(120, 500, 275, 250, 350, 550);
    pop();

    //Draw pyramid 2
    push();
    noStroke();
    fill(163, 160, 64);
    triangle(450, 450, 275, 250, 350, 550);
    pop();

}