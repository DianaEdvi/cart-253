/**
 * Circles
 * Author Name
 * 
 * I hate comments
 */

"use strict";

/**
 * I will do this properly for the assignments
*/
function setup() {
    createCanvas(640, 640);
}


/**
 * OOPS I DIDN'T DESCRIBE WHAT MY DRAW DOES!
*/
function draw() {
    background(150, 150, 150);

    push(); //keeps settings in check, ensures that the color settings etc reset to default
    ellipse(320, 320, 480);
    fill("orange");
    stroke("white");
    pop();

    push()
    fill("blue");
    noStroke();
    ellipse(320, 320, 140, 140);
    pop();


}