"use strict";

let circleeee = {
    x: 100,
    y: 100,
    size: 50
}

let holding = false;
let clickXPosition = 0;
let clickYPosition = 0;


function drawDecoratingGame() {
    drawTreeBackground(
        "#f4c4d4",
        "#ea92ab",
        "#af7fc2",
        "#8c76be",
        "#61567d")
    drawTreeBackground(
        "#d1cb95",
        "#40985e",
        "#1a644e",
        "#04373b",
        "#0a1a2f")
    drawTreeBackground(
        "#ebf9ff",
        "#87a9c5",
        "#52a5de",
        "#18284a",
        "#070810")
    drawTreeBackground(
        "#d5d5d5",
        "#b0b0b0",
        "#878787",
        "#5b5b5b",
        "#3a3a3a")
    drawUI();
    followMouse();
}

function tempDrawBack() {
    drawHouseBackground(
        "#f4c4d4",
        "#ea92ab",
        "#af7fc2",
        "#8c76be",
        "#61567d");
    drawHouseBackground(
        "#d1cb95",
        "#40985e",
        "#1a644e",
        "#04373b",
        "#0a1a2f")
    drawHouseBackground(
        "#cae4f6",
        "#87a9c5",
        "#52a5de",
        "#18284a",
        "#070810")
    drawHouseBackground(
        "#d5d5d5",
        "#9c9c9c",
        "#878787",
        "#5b5b5b",
        "#3a3a3a")

}

function mouseClicked(event) {
    if (holding === false) {
        holding = true;
    } else if (holding === true) {
        holding = false;
        clickXPosition = mouseX;
        clickYPosition = mouseY;
    }
}

function followMouse() {
    //Follow mouse y position and constrain it to the borders, taking into consideration the car's size
    circleeee.x = mouseX;
    circleeee.y = mouseY;

    if (holding === true) {
        drawCircle();
    } else {
        circleeee.x = clickXPosition;
        circleeee.y = clickYPosition;
        drawCircle();

    }

}