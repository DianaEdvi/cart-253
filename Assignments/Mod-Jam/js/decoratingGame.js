"use strict";

let circleeee = {
    x: 100,
    y: 100,
    size: 50
}

let holding = false;
let clickXPosition = 0;
let clickYPosition = 0;

let backgroundImage = "";
let palette = "";

let images = {
    img1: {
        x: 450,
        y: 325,
        w: 400,
        h: 350,
        img: ""
    },
    img2: {
        x: 1000,
        y: 325,
        w: 400,
        h: 350,
        img: ""
    },
    img3: {
        x: 400,
        y: 700,
        w: 200,
        h: 200,
        img: ""
    },
    img4: {
        x: 720,
        y: 700,
        w: 200,
        h: 200,
        img: ""
    },
    img5: {
        x: 1040,
        y: 700,
        w: 200,
        h: 200,
        img: ""
    }
}

function preLoadDecoratingGame() {
    images.img1.img = loadImage("assets/images/houseBackground.png");
    images.img2.img = loadImage("assets/images/treeBackground.png");
    images.img3.img = loadImage("assets/images/purple.png");
    images.img4.img = loadImage("assets/images/green.png");
    images.img5.img = loadImage("assets/images/blue.png");
}

function setupDecoratingGame() {
}

function drawDecoratingGame() {
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

function drawTreeTemp() {
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
}

function mouseClicked(event) {
    if (state === "choose") {
        chooseOptions();
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

function selectBackground(image) {
    let button = createButton("Select");

    button.mousePressed(changeBackground);

}

function changeBackground() {
    console.log("button pressed");
}

function selectionState() {
    drawSelections();
    drawOutlines(backgroundImage, palette);
}

function moveObject() {
    if (holding === false) {
        holding = true;
    } else if (holding === true) {
        holding = false;
        clickXPosition = mouseX;
        clickYPosition = mouseY;
    }
}

function chooseOptions() {
    //Outline if clicked on
    if (mouseX > images.img1.x - images.img1.w / 2 && mouseX < images.img1.x + images.img1.w / 2 && mouseY > images.img1.y - images.img1.h / 2 && mouseY < images.img1.y + images.img1.h / 2) {
        console.log("click left image");
        backgroundImage = "left";
    } else if (mouseX > images.img2.x - images.img2.w / 2 && mouseX < images.img2.x + images.img2.w / 2 && mouseY > images.img2.y - images.img2.h / 2 && mouseY < images.img2.y + images.img2.h / 2) {
        console.log("click right image");
        backgroundImage = "right";
    } else if (mouseX > images.img3.x - images.img3.w / 2 && mouseX < images.img3.x + images.img3.w / 2 && mouseY > images.img3.y - images.img3.h / 2 && mouseY < images.img3.y + images.img3.h / 2) {
        console.log("click purple");
        palette = "purple";
    } else if (mouseX > images.img4.x - images.img4.w / 2 && mouseX < images.img4.x + images.img4.w / 2 && mouseY > images.img4.y - images.img4.h / 2 && mouseY < images.img4.y + images.img4.h / 2) {
        console.log("click green");
        palette = "green";
    } else if (mouseX > images.img5.x - images.img5.w / 2 && mouseX < images.img5.x + images.img5.w / 2 && mouseY > images.img5.y - images.img5.h / 2 && mouseY < images.img5.y + images.img5.h / 2) {
        console.log("click blue");
        palette = "blue";
    }


    //State management
    if (mouseX > 1235 && mouseX < 1365 && mouseY > 650 && mouseY < 730) {
        console.log("done clicked");
    } else if (mouseX > 75 && mouseX < 205 && mouseY > 650 && mouseY < 730) {
        console.log("menu");
    }

}







