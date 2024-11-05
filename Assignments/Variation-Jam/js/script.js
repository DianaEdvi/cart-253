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

let b1;

function setup() {
    canvas = createCanvas(640, 640);
    background(0);

    b1 = new Button("button", 100, 100, 150, 80, boo);
    b1.buttonStyles("blue");

    let b2 = new Button("ahh", 400, 400, 300, 200, () => {
        console.log("ahhhhh");
    });
    b2.buttonStyles("red", "90px");
}

function boo() {
    console.log("Hello world");
}

/**
 * OOPS I DIDN'T DESCRIBE WHAT MY DRAW DOES!
 */
function draw() {
}