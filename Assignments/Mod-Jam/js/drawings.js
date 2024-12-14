/**
 * Handles drawing functions for the game "Amphibian Design"
 * Created by Diana Edvi
 *
 * This file contains most of the drawing functions for the game
 * Exceptions: drawShop and drawDecoration
 *
 * Contains:
 * - Data (properties for buttons and UI elements)
 * - draw functions for frog state
 * - draw functions for background options
 * - draw functions for decoration state
 * - draw functions for options state
 * - draw functions for menu and end states
 * - wrapper functions for drawing buttons
 * - draw function for final image to be downloaded
 *
 * Made with p5
 * https://p5js.org/
 */

"use strict";

//The buttons in the game
//These should have been placed in the UI property
let buttons = {
    play: {
        x: 720, //The x coordinate of the button
        y: 405, //The y coordinate of the button
        w: 400, //The width of the button
        h: 200, //The height of the button
        txt: "PLAY", //The text on the button
        txtSize: 100, //The size of the button
        state: "title", //The state the button is in
        key: 0 //Its "key" code
    },
    menuChoose: {
        x: 150,
        y: 700,
        w: 150,
        h: 80,
        txt: "Menu",
        txtSize: 32,
        state: "choose",
        key: 1
    },
    ready: {
        x: 1300,
        y: 700,
        w: 150,
        h: 80,
        txt: "Ready!",
        txtSize: 32,
        state: "choose",
        key: 2
    },
    finished: {
        x: 1325,
        y: 700,
        w: 150,
        h: 80,
        txt: "Finished!",
        txtSize: 32,
        state: "decorate",
        key: 4
    },
    playAgain: {
        x: 720,
        y: 700,
        w: 350,
        h: 120,
        txt: "PLAY AGAIN!",
        txtSize: 50,
        state: "finished",
        key: 5
    },
    goOutside: {
        x: 115,
        y: 100,
        w: 150,
        h: 150,
        txt: "Go \nOutside",
        txtSize: 32,
        state: "finished",
        key: 6
    },
    goInside: {
        x: 1300,
        y: 710,
        w: 150,
        h: 150,
        txt: "Go \ninside",
        txtSize: 32,
        state: "decorate",
        key: 7
    }
}

//Holds (most of) the UI properties for the game
//The others are... a little scattered, sorry
const UI = {
    menuUI: { //Holds the properties for the menu
        titleTxt: { //The title
            x: 720,
            y: 100,
            size: 60,
            weight: 2,
            txt: "Amphibian Design",
        },
        subTxt: { //The subtitle
            x: 720,
            y: 200,
            size: 30,
            weight: 2,
            txt: "Collect, buy, decorate :3"
        },
        fill: "#18284a",
    },
    frogUI: { //Holds the properties for the frogfrogfrog game
        bar: { //The grass
            x: 720,
            y: 710,
            w: 1440,
            h: 200
        },
        txt: { //The text
            x: 720,
            y: 710,
            size: 50,
            txt: " = "
        },
        fly: { //The fly image
            x: 650,
            y: 710,
            w: 200,
            h: 200,
            img: ""
        }
    },
    decoUI: { //Holds the properties for the decoration state
        leftBar: { //The left side of the UI
            x: 0,
            y: 0,
            w: 230,
            h: 810,
            fill: "#40985e",
            panel: { //The white panel holding the totla flies and trashcan
                x: 115,
                y: 417,
                w: 200,
                h: 450,
                fill: "#ebf9ff",
                trashcan: {
                    x: 115,
                    y: 500,
                    w: 400,
                    h: 400,
                    img: "",
                    txt: {
                        x: 115,
                        y: 455,
                        size: 22,
                        weight: 2,
                        fill: "black",
                        txt: "Refunds"
                    }
                }, fly: {
                    x: 60,
                    y: 300,
                    w: 200,
                    h: 200,
                    img: ""
                },
                txt: {
                    x: 130,
                    y: 300,
                    txt: " =   0"
                }
            },
            howToPlay: { //The text explaining how to play
                x: 10,
                y: 660,
                size: 18,
                weight: 1.2,
                leading: 25,
                txt: "1. Catch flies outside\n2. Buy decorations inside\n3. Decorate your house\n4. Click \"Finished\" for PNG of your creation\n5. Share with friends :)",
                fill: "#18284a",
            }

        },
        rightBar: { //The right side of the UI
            x: 1210,
            y: 0,
            w: 230,
            h: 810,
            fill: "#40985e",
            panel: { //The white panel holding the scroll bar (the shop items and it sUI are stored in the shopItems/blocks arrays)
                x: 1325,
                y: 417,
                w: 200,
                h: 450,
                fill: "#ebf9ff",
            },
            scrollWheel: {
                x: 1410,
                y: 417,
                w: 20,
                h: 430,
                fill: "#082b15",
                bar: {
                    x: 1410,
                    y: 221,
                    w: 20,
                    h: 40,
                    fill: "#96beb1"
                }
            },
            label: { //the SHOP label
                panel: {
                    x: 1325,
                    y: 100,
                    w: 150,
                    h: 100,
                    fill: "#082b15"
                },
                txt: {
                    x: 1325,
                    y: 100,
                    fill: "#ebf9ff",
                    size: 32,
                    txt: "SHOP"
                }
            },
            sneakyPanels: { //Sneaky green panels that hide the shop items from view when they get scrolled
                sneakyTop: {
                    x: 1210,
                    y: 0,
                    w: 230,
                    h: 194,
                    fill: "#40985e"
                },
                sneakyBottom: {
                    x: 1210,
                    y: 635,
                    w: 230,
                    h: 192,
                    fill: "#40985e"
                }
            }
        },
        hiddenText: { //The watermark
            isActive: false,
            txt: {
                txt: "Created in \"Amphibean Design\" by Diana Edvi",
                x: 1000,
                y: 797,
                size: 20,
                strokeWeight: 1,
                fill: "black"
            }

        }
    },
    endUI: { //Holds the properties for the end state
        txt: {
            txt: "What a beautiful design!\n Click 's' or 'S' to save a PNG of your creation\nThanks for playing :)",
            x: 720,
            y: 95,
            size: 40,
            strokeWeight: 2,
            fill: "white"
        },
        png: {
            x: 720,
            y: 400,
            w: 490,
            h: 405,
            img: "",
        }
    }
}

/**
 * Displays the tongue (tip and line connection) and the frog (body)
 */
function drawFrog() {
    // Draw the tongue tip
    push();
    fill("#ff0000");
    noStroke();
    ellipse(frog.tongue.x, frog.tongue.y, frog.tongue.size);
    pop();

    // Draw the rest of the tongue
    push();
    stroke("#ff0000");
    strokeWeight(frog.tongue.size);
    line(frog.tongue.x, frog.tongue.y, frog.body.x, frog.body.y);
    pop();

    // Draw the frog's body
    push();
    fill("#00ff00");
    noStroke();
    ellipse(frog.body.x, frog.body.y, frog.body.size);
    pop();
}

/**
 * Draws the fly as a black circle
 */
function drawFly() {
    push();
    noStroke();
    fill("#000000");
    ellipse(fly.x, fly.y, fly.size);
    pop();
}

/**
 Draw function that will be called from the main draw event
 */
function drawFrogUI() {
    //Draw bottom bar
    push();
    fill("#40985e");
    rectMode(CENTER);
    rect(UI.frogUI.bar.x, UI.frogUI.bar.y, UI.frogUI.bar.w, UI.frogUI.bar.h);
    pop();

    //Draw button
    drawButton(buttons.goInside);

    //Display flies caught text and image
    push();
    fill("#18284a")
    stroke(2);
    textAlign(CENTER, CENTER);
    textSize(UI.frogUI.txt.size);
    text(UI.frogUI.txt.txt + fliesCaught, UI.frogUI.txt.x, UI.frogUI.txt.y);
    imageMode(CENTER);
    image(UI.frogUI.fly.img, UI.frogUI.fly.x, UI.frogUI.fly.y, UI.frogUI.fly.w, UI.frogUI.fly.h);
    pop();
}

/**
 * Draws the background image, consisting of the frog's house
 * @param light the lightest shade in the pallett
 * @param midLight the second-lightest shade in the pallette
 * @param mid the mid-tone in the pallette
 * @param midDark the second-darkest shade in the pallette
 * @param dark the darkest shade in the pallette
 */
function drawHouseBackground(light, midLight, mid, midDark, dark) {
    //Draw background and make noStroke the default for backgrounds
    push();
    background(light);
    noStroke();

    //Draw house
    push;
    fill(midDark);
    ellipse(width / 2, height / 2 + 100, width - 200, height + 200);
    pop;

    //Draw wall
    push;
    fill(dark);
    ellipse(width / 2, height / 2 + 350, width - 300, height + 550);
    pop;

    //Draw chimney
    push;
    fill(dark);
    rectMode(CORNER);
    rect(1050, 75, 50, 75);
    pop;

    //Draw smoke
    push();
    fill(midLight);
    ellipse(1075, 55, 40);
    ellipse(1090, 20, 60);
    ellipse(1130, 0, 50);
    pop();

    //Draw water
    push();
    fill(light);
    quad(width / 4, 600, 3 * width / 4, 600, 1225, 900, 200, 900,);
    pop();

    //Draw floor
    push();
    fill(mid);
    ellipse(width / 2, height / 2 + 150, width, 200);
    pop();

    //Draw window pane
    push();
    fill(light);
    stroke(midLight);
    strokeWeight(7);
    ellipse(width / 2, height / 2 - 200, 100);
    pop();

    //Draw window frame
    push();
    fill(midLight);
    rectMode(CORNER);
    rect(width / 2 - 3.5, height / 2 - 250, 7, 100);
    rect(width / 2 - 50, height / 2 - 205, 100, 7);
    pop();

    //Draw lily pads
    push();
    fill(midLight);
    ellipse(900, 725, 100, 75);
    ellipse(450, 750, 100, 75);
    pop();

    //Draw triangles in lily pads
    push();
    fill(light);
    triangle(925, 725, 1000, 650, 1000, 750);
    triangle(425, 750, 375, 700, 375, 775);
    pop();
    pop();
}

/**
 * Draw's the background image, consisting of the frog's tree home
 * @param light the lightest shade in the pallett
 * @param midLight the second-lightest shade in the pallette
 * @param mid the mid-tone in the pallette
 * @param midDark the second-darkest shade in the pallette
 * @param dark the darkest shade in the pallette
 */
function drawTreeBackground(light, midLight, mid, midDark, dark) {
    //Draw background and make noStroke the default for backgrounds
    push();
    noStroke();
    background(light);

    //Draw bushes
    //This was fun.
    fill(dark);
    ellipse(300, 450, 100);
    ellipse(350, 450, 100);
    ellipse(500, 400, 170);
    ellipse(700, 450, 170);
    ellipse(770, 450, 170);
    ellipse(850, 400, 190);
    ellipse(1150, 490, 200);
    ellipse(1100, 490, 200);
    ellipse(1000, 490, 200);
    ellipse(1200, 475, 200);

    push();
    fill(dark);
    //Little circles
    ellipse(250, 450, 50);
    ellipse(225, 450, 50);
    ellipse(270, 420, 50);
    ellipse(350, 400, 50);
    ellipse(450, 350, 50);
    ellipse(425, 350, 50);
    ellipse(460, 325, 50);
    ellipse(555, 325, 50);
    ellipse(575, 350, 50);
    ellipse(650, 375, 50);
    ellipse(750, 350, 50);
    ellipse(850, 300, 50);
    ellipse(935, 360, 50);
    ellipse(950, 400, 50);
    ellipse(1050, 400, 50);
    ellipse(1150, 400, 50);
    ellipse(1175, 400, 50);

    //Big circles
    ellipse(300, 400, 75);
    ellipse(400, 400, 75);
    ellipse(500, 300, 75);
    ellipse(600, 400, 75);
    ellipse(700, 375, 75);
    ellipse(800, 320, 75);
    ellipse(900, 320, 75);
    ellipse(1000, 400, 75);
    ellipse(1100, 375, 75);
    ellipse(1200, 350, 75);
    pop();

    //Draw ground
    push();
    fill(mid);
    ellipse(width / 2, height / 2 + 250, width, 500);
    pop();

    //Draw pond
    push();
    fill(light);
    ellipse(550, 600, 275, 100);
    pop();

    //Draw lilypad
    push();
    fill(midLight);
    ellipse(580, 600, 75, 40);
    pop();

    //Draw triangle in lilypad
    push();
    fill(light);
    triangle(570, 600, 500, 575, 450, 625);
    pop();

    //Draw tree trunk
    push();
    fill(midDark);
    rectMode(CORNER);
    rect(250, 50, 100, height - 100, 20);
    rect(1150, 75, 100, height - 100, 20);
    pop();

    //Draw leaves
    push();
    fill(dark);
    ellipse(300, 100, 400);
    ellipse(1200, 200, 300);
    pop();

    //Draw sun
    push();
    fill(midLight);
    ellipse(900, 100, 100);
    pop();
    pop();
}

/**
 * Draw the UI elements for the decoration state
 * Includes panels and their contents as well as how-to-play text
 */
function drawDecoUI() {

    //Draw left side of game UI:

    //Draw sidebar
    drawSideBar(UI.decoUI.leftBar);
    //Draw white panel
    drawPanel(UI.decoUI.leftBar.panel);

    //Draw panel's contents
    push();
    fill("black")
    textSize(32);
    strokeWeight(2);
    imageMode(CENTER);
    image(UI.decoUI.leftBar.panel.trashcan.img, UI.decoUI.leftBar.panel.trashcan.x, UI.decoUI.leftBar.panel.trashcan.y, UI.decoUI.leftBar.panel.trashcan.w, UI.decoUI.leftBar.panel.trashcan.h);
    image(UI.decoUI.leftBar.panel.fly.img, UI.decoUI.leftBar.panel.fly.x, UI.decoUI.leftBar.panel.fly.y, UI.decoUI.leftBar.panel.fly.w, UI.decoUI.leftBar.panel.fly.h);
    textAlign(CENTER, CENTER);
    text(UI.decoUI.leftBar.panel.txt.txt, UI.decoUI.leftBar.panel.txt.x, UI.decoUI.leftBar.panel.txt.y);

    push();
    textSize(UI.decoUI.leftBar.panel.trashcan.txt.size);
    text(UI.decoUI.leftBar.panel.trashcan.txt.txt, UI.decoUI.leftBar.panel.trashcan.txt.x, UI.decoUI.leftBar.panel.trashcan.txt.y);
    pop();
    pop();


    //Draw right side of game UI:

    //Draw sidebar
    drawSideBar(UI.decoUI.rightBar);
    //Draw white panel
    drawPanel(UI.decoUI.rightBar.panel);

    for (let i = 0; i < shopItems.length; i++) {
        shopItems[i].draw();
    }

    //Draw scroll wheel
    push();
    drawPanel(UI.decoUI.rightBar.scrollWheel);
    drawPanel(UI.decoUI.rightBar.scrollWheel.bar);
    pop();

    sneakyPanel();

    //Draw shop label panel
    drawPanel(UI.decoUI.rightBar.label.panel);

    //Draw shop text
    push();
    textAlign(CENTER, CENTER);
    textSize(UI.decoUI.rightBar.label.txt.size);
    fill(UI.decoUI.rightBar.label.txt.fill);
    text(UI.decoUI.rightBar.label.txt.txt, UI.decoUI.rightBar.label.txt.x, UI.decoUI.rightBar.label.txt.y);
    pop();


    drawButton(buttons.goOutside);
    // drawButton(buttons.menuDecorate); //When these are swapped, menu also doesnt work
    drawButton(buttons.finished);

    //Draw how to play text
    push();
    textAlign(LEFT, CENTER);
    textSize(UI.decoUI.leftBar.howToPlay.size);
    stroke("#18284a");
    strokeWeight(UI.decoUI.leftBar.howToPlay.weight);
    textLeading(UI.decoUI.leftBar.howToPlay.leading);
    fill(UI.decoUI.leftBar.howToPlay.fill);
    text(UI.decoUI.leftBar.howToPlay.txt, UI.decoUI.leftBar.howToPlay.x, UI.decoUI.leftBar.howToPlay.y, UI.decoUI.leftBar.w - 10);
    pop();
}

/**
 * Draws the watermark
 */
function drawHiddenText() {
    //Draw hidden text
    push();
    fill(UI.decoUI.hiddenText.txt.fill);
    textAlign(CENTER, CENTER);
    stroke("black");
    strokeWeight(UI.decoUI.hiddenText.txt.strokeWeight);
    textSize(UI.decoUI.hiddenText.txt.size);
    text(UI.decoUI.hiddenText.txt.txt, UI.decoUI.hiddenText.txt.x, UI.decoUI.hiddenText.txt.y)
    pop();
}

/**
 * Creates default rectangle (with hard edges)
 * @param sidebar The rectangle to be drawn
 */
function drawSideBar(sidebar) {
    //Draw the rectangle
    push();
    noStroke();
    fill(sidebar.fill);
    rectMode(CORNER);
    rect(sidebar.x, sidebar.y, sidebar.w, sidebar.h);
    pop();
}

/**
 * Creates a default rectangle (with curved edges)
 * I am aware that I could have merged this with the previous one
 * @param panel The rectangle to be drawn
 */
function drawPanel(panel) {
    //Draw the panel
    push();
    noStroke();
    rectMode(CENTER);
    fill(panel.fill);
    rect(panel.x, panel.y, panel.w, panel.h, 20);
    pop();
}

/**
 * Draws the options state
 * Includes two options for background images, three for color palettes, and some buttons
 */
function drawSelections() {
    //Define text
    let backgroundStr = "Select a background to decorate";
    let colorStr = "And a color palette";
    background("#96beb1");

    //Draw buttons
    drawButton(buttons.menuChoose);
    drawButton(buttons.ready);

    //Draw text
    push();
    textAlign(CENTER);
    textSize(32);
    stroke("black");
    strokeWeight(2);
    fill("white");
    text(backgroundStr, width / 2, 100);
    text(colorStr, width / 2, 575);
    pop();

    //Draw images
    push();
    imageMode(CENTER);
    image(images.img1.img, images.img1.x, images.img1.y, images.img1.w, images.img1.h);
    image(images.img2.img, images.img2.x, images.img2.y, images.img2.w, images.img2.h);
    image(images.img3.img, images.img3.x, images.img3.y, images.img3.w, images.img3.h);
    image(images.img4.img, images.img4.x, images.img4.y, images.img4.w, images.img4.h);
    image(images.img5.img, images.img5.x, images.img5.y, images.img5.w, images.img5.h);
    pop();
}

/**
 * Draws an outline around a selected object
 * @param background A string dictating which background was selected (left or right)
 */
function drawOutlines(background) {
    //Draw the outlines
    push();
    stroke("black");
    strokeWeight(5);
    noFill();
    rectMode(CENTER);
    //Draw outline of selected background
    if (background === "left") {
        rect(images.img1.x, images.img1.y, images.img1.w, images.img1.h);
    } else if (background === "right") {
        rect(images.img2.x, images.img2.y, images.img2.w, images.img2.h);
    }

    //Draw outline of selected palette
    if (colorSelect === "purple") {
        rect(images.img3.x, images.img3.y, images.img3.w, images.img3.h);
    } else if (colorSelect === "green") {
        rect(images.img4.x, images.img4.y, images.img4.w, images.img4.h);
    } else if (colorSelect === "blue") {
        rect(images.img5.x, images.img5.y, images.img5.w, images.img5.h);
    }
    pop();
}

/**
 * Draw function that will be called from the main draw event
 * Draw's the menu. Includes text and a button
 */
function drawMenu() {
    //Draw the text
    push();
    background("#96beb1");
    fill(UI.menuUI.fill)
    stroke("#18284a");
    strokeWeight(UI.menuUI.titleTxt.weight);
    textAlign(CENTER, CENTER);

    //Draw the title
    push();
    textSize(UI.menuUI.titleTxt.size);
    text(UI.menuUI.titleTxt.txt, UI.menuUI.titleTxt.x, UI.menuUI.titleTxt.y)
    pop();

    //Draw the subtitle
    push();
    textSize(UI.menuUI.subTxt.size);
    text(UI.menuUI.subTxt.txt, UI.menuUI.subTxt.x, UI.menuUI.subTxt.y)
    pop();

    pop();
    //Draw the Play button
    drawButton(buttons.play);
}

/**
 * Draw function that will be called from the main draw event
 * Draws the end screen
 */
function drawEnd() {
    background("#586c78");

    //Draw text
    push();
    fill(UI.endUI.txt.fill);
    textAlign(CENTER, CENTER);
    stroke("black");
    strokeWeight(UI.endUI.txt.strokeWeight);
    textSize(UI.endUI.txt.size);
    text(UI.endUI.txt.txt, UI.endUI.txt.x, UI.endUI.txt.y)
    pop();

    //Draw the captured image
    drawPNG();
    //Draw the Play Again button
    drawButton(buttons.playAgain);
}

/**
 * Wrapper function that handles drawing buttons
 * In hindsight, I should not have put my button handler in here.
 * @param button The button properties to be drawn
 */
function drawButton(button) {
    //Draw rect
    push();
    rectMode(CENTER);
    fill("#fda9a9");
    rect(button.x, button.y, button.w, button.h, 20);
    pop();

    //Draw text
    push();
    textAlign(CENTER, CENTER);
    textSize(button.txtSize);
    stroke("black");
    strokeWeight(2);
    fill("#96beb1");
    text(button.txt, button.x, button.y);
    pop();

    //Handle button logic
    buttonHandler(button);
}

/**
 * Draws the sneaky panels that hide the shop items as they are scrolled
 */
function sneakyPanel() {
    //Draw rects
    drawSideBar(UI.decoUI.rightBar.sneakyPanels.sneakyTop);
    drawSideBar(UI.decoUI.rightBar.sneakyPanels.sneakyBottom);
}

/**
 * Separate button function for the buy buttons
 * I separated this from the other one because my other button function is incredibly finicky and I wanted to start over lol
 * @param button The button properties to be drawn
 */
function drawBuyButton(button) {
    //Draw rect
    push()
    fill(button.fill);
    stroke(0);
    rectMode(CENTER);
    rect(button.x, button.y, button.w, button.h, 10);
    pop();

    //Draw text
    push();
    fill("black");
    strokeWeight(2);
    textSize(20);
    textAlign(CENTER, CENTER);
    text("BUY", button.x, button.y + 2);
    pop();
}

/**
 * Displays the image that will be saved by the user
 */
function drawPNG() {
    //Display image of decoration
    push();
    stroke("white");
    strokeWeight(20);
    imageMode(CENTER);
    rectMode(CENTER);
    rect(UI.endUI.png.x, UI.endUI.png.y, UI.endUI.png.w, UI.endUI.png.h);
    image(UI.endUI.png.img, UI.endUI.png.x, UI.endUI.png.y);
    pop();
}

// Comment to show my friend github