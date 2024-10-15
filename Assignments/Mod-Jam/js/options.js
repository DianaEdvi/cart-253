"use strict";

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

function preloadOptions() {
    images.img1.img = loadImage("assets/images/houseBackground.png");
    images.img2.img = loadImage("assets/images/treeBackground.png");
    images.img3.img = loadImage("assets/images/purple.png");
    images.img4.img = loadImage("assets/images/green.png");
    images.img5.img = loadImage("assets/images/blue.png");
}


function selectionState() {
    drawBackground();
    drawOptions();
    drawOutlines(backgroundImage, palette);
}

/**
 * Checks if the mouse is within the bounds of the image and updates the background logic (image and color) accordingly
 * Also handles logic to return to menu and continue to the game
 */
function outlineSelections() {
    //Outline an image if it is clicked on
    //Left image
    if (mouseX > images.img1.x - images.img1.w / 2 && mouseX < images.img1.x + images.img1.w / 2 && mouseY > images.img1.y - images.img1.h / 2 && mouseY < images.img1.y + images.img1.h / 2) {
        backgroundImage = "left";
        console.log("lefty");
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

}

function drawBackground() {
    if (backgroundImage === "left") {
        drawHouseBackground(palette.light, palette.midLight, palette.mid, palette.midDark, palette.dark);
    } else if (backgroundImage === "right") {
        drawTreeBackground(palette.light, palette.midLight, palette.mid, palette.midDark, palette.dark);
    }
}

function buttonHandler() {

    //Button handling (menu and ready)
    if (mouseX > 1235 && mouseX < 1365 && mouseY > 650 && mouseY < 730 && state === "choose") {
        if (backgroundImage !== "" && colorSelect !== "") {
            state = "decorate";
        }

    } else if (mouseX > 75 && mouseX < 205 && mouseY > 650 && mouseY < 730 && state === "choose") {
        state = "title";
        resetGame();
    }
}
