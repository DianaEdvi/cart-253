/**
 * Title of Project
 * Author Name
 * 
 * HOW EMBARRASSING! I HAVE NO DESCRIPTION OF MY PROJECT!
 * PLEASE REMOVE A GRADE FROM MY WORK IF IT'S GRADED!
 */

"use strict";

let holeSize = 180;
let cheeseRed = 255;
let cheeseGreen = 255;
let cheeseBlue = 0;

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
    //the cheese
    background(cheeseRed, cheeseGreen, cheeseBlue);

    //the hole
    push();
    noStroke();
    fill(0);
    ellipse(140, 175, holeSize);
    pop();


}