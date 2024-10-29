"use strict";

let backgroundImage = ""; //The image of the greyscale background option
let colorSelect = ""; //The image of the palette options

let palette = { //The palette colors
    light: "",
    midLight: "",
    mid: "",
    midDark: "",
    dark: ""
}

let images = { //The images in the options menu (background and palettes)
    img1: { //Left background
        x: 450,
        y: 325,
        w: 400,
        h: 350,
        img: ""
    },
    img2: { //Right background
        x: 1000,
        y: 325,
        w: 400,
        h: 350,
        img: ""
    },
    img3: { //Purple palette
        x: 400,
        y: 700,
        w: 200,
        h: 200,
        img: ""
    },
    img4: { //Green palette
        x: 720,
        y: 700,
        w: 200,
        h: 200,
        img: ""
    },
    img5: { //Blue palette
        x: 1040,
        y: 700,
        w: 200,
        h: 200,
        img: ""
    }
}

/**
 * Preload function that will be called from the main preload event
 * Preloads all the images for the options menu
 */
function preloadOptions() {
    images.img1.img = loadImage("assets/images/houseBackground.png");
    images.img2.img = loadImage("assets/images/treeBackground.png");
    images.img3.img = loadImage("assets/images/purple.png");
    images.img4.img = loadImage("assets/images/green.png");
    images.img5.img = loadImage("assets/images/blue.png");
}

/**
 * Draw function that will be called from the main draw event
 */
function drawOptions() {
    drawSelections(); //Draw the state UI
    drawOutlines(backgroundImage, palette); //Draw the outlines
}

/**
 * Checks if the mouse is within the bounds of the image and updates the background logic (image and color) accordingly
 */
function selectOptions() {
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
}

/**
 * Set's the background according to whichever option the user chose
 */
function setBackground() {
    if (backgroundImage === "left") {
        drawHouseBackground(palette.light, palette.midLight, palette.mid, palette.midDark, palette.dark);
    } else if (backgroundImage === "right") {
        drawTreeBackground(palette.light, palette.midLight, palette.mid, palette.midDark, palette.dark);
    }
}

/**
 * Handles the exception button handling that for some reason did not work
 * @param button The button properties
 */
function buttonHandlerOptions(button) {
    //Set bounds
    const minX = button.x - button.w / 2;
    const maxX = button.x + button.w / 2;
    const minY = button.y - button.h / 2;
    const maxY = button.y + button.h / 2;

    //Button handling (ready and finished)
    if (mouseX > minX && mouseX < maxX && mouseY > minY && mouseY < maxY && state === "choose") {
        if (backgroundImage !== "" && colorSelect !== "") {
            state = "decorate";
        }
    } else if (mouseX > 1260 && mouseX < 1400 && mouseY > 650 && mouseY < 730 && state === "decorate") {
        //Draw the hidden text for only one frame
        drawHiddenText();
        //Take image of the canvas for the saving mechanic
        UI.endUI.png.img.copy(canvas, 230, 0, 980, 810, 0, 0, UI.endUI.png.w, UI.endUI.png.h);
        
        state = "finished";
    }
}
