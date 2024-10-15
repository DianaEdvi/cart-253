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
let colorSelect = "";

let palette = {
    light: "",
    midLight: "",
    mid: "",
    midDark: "",
    dark: ""
}

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
    setOptions();
    drawUI();
    followMouse();
}

function setOptions() {
    if (backgroundImage === "left") {
        drawHouseBackground(palette.light, palette.midLight, palette.mid, palette.midDark, palette.dark);
    } else if (backgroundImage === "right") {
        drawTreeBackground(palette.light, palette.midLight, palette.mid, palette.midDark, palette.dark);
    }
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

/**
 * Checks if the mouse is within the bounds of the image and updates the background logic (image and color) accordingly
 * Also handles logic to return to menu and continue to the game
 */
function chooseOptions() {
    //Outline an image if it is clicked on
    //Left image
    if (mouseX > images.img1.x - images.img1.w / 2 && mouseX < images.img1.x + images.img1.w / 2 && mouseY > images.img1.y - images.img1.h / 2 && mouseY < images.img1.y + images.img1.h / 2) {
        backgroundImage = "left";
    }
    //Right image
    else if (mouseX > images.img2.x - images.img2.w / 2 && mouseX < images.img2.x + images.img2.w / 2 && mouseY > images.img2.y - images.img2.h / 2 && mouseY < images.img2.y + images.img2.h / 2) {
        backgroundImage = "right";
    }
    //Purple palette
    else if (mouseX > images.img3.x - images.img3.w / 2 && mouseX < images.img3.x + images.img3.w / 2 && mouseY > images.img3.y - images.img3.h / 2 && mouseY < images.img3.y + images.img3.h / 2) {
        colorSelect = "purple";

        palette.light = "#f4c4d4";
        palette.midLight = "#ea92ab";
        palette.mid = "#af7fc2";
        palette.midDark = "#8c76be";
        palette.dark = "#61567d";
    }
    //Green palette
    else if (mouseX > images.img4.x - images.img4.w / 2 && mouseX < images.img4.x + images.img4.w / 2 && mouseY > images.img4.y - images.img4.h / 2 && mouseY < images.img4.y + images.img4.h / 2) {
        colorSelect = "green";

        palette.light = "#d1cb95";
        palette.midLight = "#40985e";
        palette.mid = "#1a644e";
        palette.midDark = "#04373b";
        palette.dark = "#0a1a2f";

    }
    //Blue palette
    else if (mouseX > images.img5.x - images.img5.w / 2 && mouseX < images.img5.x + images.img5.w / 2 && mouseY > images.img5.y - images.img5.h / 2 && mouseY < images.img5.y + images.img5.h / 2) {
        colorSelect = "blue";

        palette.light = "#cae4f6";
        palette.midLight = "#87a9c5";
        palette.mid = "#52a5de";
        palette.midDark = "#18284a";
        palette.dark = "#070810";
    }

    //State management
    if (mouseX > 1235 && mouseX < 1365 && mouseY > 650 && mouseY < 730) {
        console.log("done clicked");
        if (backgroundImage !== "" && colorSelect !== "") {
            state = "decorate";
        }

    } else if (mouseX > 75 && mouseX < 205 && mouseY > 650 && mouseY < 730) {
        console.log("menu");
    }

}







