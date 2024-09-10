/**
 * Title of Project
 * Author Name
 * 
 * HOW EMBARRASSING! I HAVE NO DESCRIPTION OF MY PROJECT!
 * PLEASE REMOVE A GRADE FROM MY WORK IF IT'S GRADED!
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
    background("red");

    //hood
    push();
    fill("blue");
    arc(320, 300, 420, 420, PI, 0);
    pop();

    //red circle 1
    push();
    fill("red");
    noStroke();
    ellipse(180, 300, 140);
    pop();

    //red circle 2
    push();
    fill("red");
    noStroke();
    ellipse(320, 300, 140);
    pop();


    //red circle 3
    push();
    fill("red");
    noStroke();
    ellipse(460, 300, 140);
    pop();

    //bar
    push();
    strokeWeight(20);
    line(320, 220, 320, 450);
    pop();

    //handle
    push();
    noFill();
    strokeWeight(20);
    stroke("yellow");
    arc(370, 450, 100, 110, 0, PI);
    pop();
}