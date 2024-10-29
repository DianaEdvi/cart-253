"use strict";
//Base information for each decoration object
let decorations = {
    frog: {
        x: 720, // the x coordinate of the decoration
        y: 405, // the y coordinate of the decoration
        w: 160, // the width of the decoration
        h: 160, // the height of the decoration
        img: "", // the variable holding the image
        dragging: false, // checks whether the object is being dragged
        path: "frog_",
        colorVariations: [], // holds the color variations of the object
        currentVariation: 0, // holds the index of the current color variation
        price: 0, //Holds the price of the decoration
        block: undefined, //holds the shop item UI
        shopSprites: { //Holds the sprites for the shop
            mainSprite: { //The sprite next to the price
                img: "",
                x: 1268,
                y: 253,
                w: 115,
                h: 115
            },
            var1: { //The first variation
                img: "",
                x: 1270,
                y: 340,
                w: 90,
                h: 90,
            },
            var2: { //The second variation
                img: "",
                x: 1270,
                y: 415,
                w: 90,
                h: 90,
            },
            var3: { //The third variation
                img: "",
                x: 1270,
                y: 480,
                w: 90,
                h: 90,
            }
        }
    },
    vaseTall: {
        x: 720,
        y: 405,
        w: 140,
        h: 140,
        img: "",
        dragging: false,
        path: "vase_tall_",
        colorVariations: [],
        currentVariation: 0,
        price: 2,
        block: undefined,
        shopSprites: {
            mainSprite: {
                img: "",
                x: 1268,
                y: 253,
                w: 115,
                h: 115
            },
            var1: {
                img: "",
                x: 1270,
                y: 340,
                w: 90,
                h: 90,
            },
            var2: {
                img: "",
                x: 1270,
                y: 415,
                w: 90,
                h: 90,
            },
            var3: {
                img: "",
                x: 1270,
                y: 480,
                w: 90,
                h: 90,
            }
        }
    },
    vaseShort: {
        x: 720,
        y: 405,
        w: 160,
        h: 160,
        img: "",
        dragging: false,
        path: "vase_short_",
        colorVariations: [],
        currentVariation: 0,
        price: 3,
        block: undefined,
        shopSprites: {
            mainSprite: {
                img: "",
                x: 1268,
                y: 253,
                w: 115,
                h: 115
            },
            var1: {
                img: "",
                x: 1270,
                y: 340,
                w: 90,
                h: 90,
            },
            var2: {
                img: "",
                x: 1270,
                y: 415,
                w: 90,
                h: 90,
            },
            var3: {
                img: "",
                x: 1270,
                y: 490,
                w: 90,
                h: 90,
            }
        }
    },
    fishBowl: {
        x: 720,
        y: 405,
        w: 150,
        h: 150,
        img: "",
        dragging: false,
        path: "fishbowl_",
        colorVariations: [],
        price: 4,
        currentVariation: 0,
        block: undefined,
        shopSprites: {
            mainSprite: {
                img: "",
                x: 1265,
                y: 250,
                w: 140,
                h: 140
            },
            var1: {
                img: "",
                x: 1268,
                y: 338,
                w: 125,
                h: 125,
            },
            var2: {
                img: "",
                x: 1268,
                y: 413,
                w: 125,
                h: 125,
            },
            var3: {
                img: "",
                x: 1268,
                y: 488,
                w: 125,
                h: 125,
            }
        }
    },
    fishTank: {
        x: 720,
        y: 405,
        w: 180,
        h: 180,
        img: "",
        dragging: false,
        path: "fishtank_",
        colorVariations: [],
        price: 5,
        currentVariation: 0,
        block: undefined,
        shopSprites: {
            mainSprite: {
                img: "",
                x: 1267,
                y: 250,
                w: 120,
                h: 120
            },
            var1: {
                img: "",
                x: 1268,
                y: 338,
                w: 125,
                h: 125,
            },
            var2: {
                img: "",
                x: 1268,
                y: 413,
                w: 125,
                h: 125,
            },
            var3: {
                img: "",
                x: 1268,
                y: 488,
                w: 125,
                h: 125,
            }
        }
    },
    tableShort: {
        x: 720,
        y: 405,
        w: 220,
        h: 220,
        img: "",
        dragging: false,
        path: "table_short_",
        colorVariations: [],
        price: 5,
        currentVariation: 0,
        block: undefined,
        shopSprites: {
            mainSprite: {
                img: "",
                x: 1270,
                y: 245,
                w: 130,
                h: 130
            },
            var1: {
                img: "",
                x: 1273,
                y: 338,
                w: 125,
                h: 125,
            },
            var2: {
                img: "",
                x: 1273,
                y: 413,
                w: 125,
                h: 125,
            },
            var3: {
                img: "",
                x: 1273,
                y: 488,
                w: 125,
                h: 125,
            }
        }
    },
    tableLong: {
        x: 720,
        y: 405,
        w: 280,
        h: 240,
        img: "",
        dragging: false,
        path: "table_long_",
        colorVariations: [],
        price: 6,
        currentVariation: 0,
        block: undefined,
        shopSprites: {
            mainSprite: {
                img: "",
                x: 1267,
                y: 250,
                w: 90,
                h: 90
            },
            var1: {
                img: "",
                x: 1273,
                y: 333,
                w: 100,
                h: 100,
            },
            var2: {
                img: "",
                x: 1273,
                y: 408,
                w: 100,
                h: 100,
            },
            var3: {
                img: "",
                x: 1273,
                y: 483,
                w: 100,
                h: 100,
            }
        }
    },
    rugCircle: {
        x: 720,
        y: 405,
        w: 220,
        h: 220,
        img: "",
        dragging: false,
        path: "rug_circle_",
        colorVariations: [],
        price: 5,
        block: undefined,
        currentVariation: 0,
        shopSprites: {
            mainSprite: {
                img: "",
                x: 1268,
                y: 245,
                w: 100,
                h: 100
            },
            var1: {
                img: "",
                x: 1275,
                y: 335,
                w: 110,
                h: 110,
            },
            var2: {
                img: "",
                x: 1275,
                y: 410,
                w: 110,
                h: 110,
            },
            var3: {
                img: "",
                x: 1275,
                y: 485,
                w: 110,
                h: 110,
            }
        }
    },
    rugLong: {
        x: 720,
        y: 405,
        w: 280,
        h: 220,
        img: "",
        dragging: false,
        path: "rug_long_",
        colorVariations: [],
        price: 6,
        block: undefined,
        currentVariation: 0,
        shopSprites: {
            mainSprite: {
                img: "",
                x: 1267,
                y: 245,
                w: 80,
                h: 80
            },
            var1: {
                img: "",
                x: 1272,
                y: 330,
                w: 90,
                h: 90,
            },
            var2: {
                img: "",
                x: 1272,
                y: 405,
                w: 90,
                h: 90,
            },
            var3: {
                img: "",
                x: 1272,
                y: 480,
                w: 90,
                h: 90,
            }
        }
    },
    miscSnail: {
        x: 720,
        y: 405,
        w: 200,
        h: 200,
        img: "",
        dragging: false,
        path: "snail_clock_",
        colorVariations: [],
        price: 7,
        block: undefined,
        currentVariation: 0,
        shopSprites: {
            mainSprite: {
                img: "",
                x: 1270,
                y: 250,
                w: 150,
                h: 150
            },
            var1: {
                img: "",
                x: 1273,
                y: 333,
                w: 135,
                h: 135,
            },
            var2: {
                img: "",
                x: 1273,
                y: 408,
                w: 135,
                h: 135,
            },
            var3: {
                img: "",
                x: 1273,
                y: 483,
                w: 135,
                h: 135,
            }
        }
    },
    miscStatue: {
        x: 720,
        y: 405,
        w: 200,
        h: 200,
        img: "",
        dragging: false,
        path: "grandma_statue_",
        colorVariations: [],
        price: 8,
        block: undefined,
        currentVariation: 0,
        shopSprites: {
            mainSprite: {
                img: "",
                x: 1265,
                y: 250,
                w: 140,
                h: 140
            },
            var1: {
                img: "",
                x: 1268,
                y: 338,
                w: 125,
                h: 125,
            },
            var2: {
                img: "",
                x: 1268,
                y: 413,
                w: 125,
                h: 125,
            },
            var3: {
                img: "",
                x: 1268,
                y: 488,
                w: 125,
                h: 125,
            }
        }
    },
}

let decoProperties = []; //Array for holding all the decoratoin data
let decoObjects = []; //Array for holding all the spawned decoration objects
let shopItems = []; //Array for holding all the shop items
let blocks = []; //Array for holding all the UI for the shop items. Don't ask me why this is in a separate array lol.
let blockOffset = 0; //The amount that the blocks will move when scrolling

let selectedDeco = null; //The current Decoration object that is being held

/**
 * Class for a Decoration object
 * Creates a new Decoration object and displays it onto the screen
 * Checks if the mouse is over and pressing the decoration object and drags and drops accordingly
 */
class Decoration {

    //Construct a new decoration object
    constructor(decoration, colorVariations) {
        this.x = decoration.x;
        this.y = decoration.y;
        this.w = decoration.w;
        this.h = decoration.h;
        this.colorVariations = colorVariations;
        this.currentVariation = decoration.currentVariation;
        this.price = decoration.price;
    }

    //Display the Decoration object onto the screen
    display() {
        imageMode(CENTER);
        image(this.colorVariations[this.currentVariation], this.x, this.y, this.w, this.h);
    }

    // Check if the mouse is over the decoration (bad version, but acceptable)
    isMouseOver() {
        return mouseX > this.x - this.w / 4 && mouseX < this.x + this.w / 4 &&
            mouseY > this.y - this.h / 4 && mouseY < this.y + this.h / 4;
    }

    // Start dragging
    startDrag() {
        if (this.isMouseOver()) {
            this.dragging = true;
        }
    }

    // Stop dragging
    stopDrag() {
        this.dragging = false;
    }

    // Update the position if being dragged
    updatePosition() {
        if (this.dragging) {
            this.x = mouseX;
            this.y = mouseY;
        }
        this.display();
    }

    changeColor(index) {
        if (index >= 0 && index < 3) {
            this.currentVariation = index;
        }
    }

}

/**
 * Preload function that will be called from the main preload event
 * Preloads all the images used by the decoration game
 */
function preloadDecoration() {

    //Populate properties array
    decoProperties.push(decorations.frog);
    decoProperties.push(decorations.vaseTall);
    decoProperties.push(decorations.vaseShort);
    decoProperties.push(decorations.fishBowl);
    decoProperties.push(decorations.fishTank);
    decoProperties.push(decorations.rugCircle);
    decoProperties.push(decorations.rugLong);
    decoProperties.push(decorations.tableShort);
    decoProperties.push(decorations.tableLong);
    decoProperties.push(decorations.miscSnail);
    decoProperties.push(decorations.miscStatue);

    //Preload UI images
    UI.decoUI.leftBar.panel.fly.img = loadImage("assets/images/decorations/fly.png");
    UI.decoUI.leftBar.panel.trashcan.img = loadImage("assets/images/decorations/garbage.png");

    //Preload color variations for images
    for (let deco of decoProperties) {
        deco.colorVariations = [
            loadImage("assets/images/decorations/" + deco.path + "1.png"),
            loadImage("assets/images/decorations/" + deco.path + "2.png"),
            loadImage("assets/images/decorations/" + deco.path + "3.png"),
        ]
    }
}

/**
 * Set up function that will be called from the main setup event
 * Populates all the necessary arrays with the appropriate data (decoProperties, blocks, shopItems)
 */
function setupDecoratingGame() {
    //Populate the decoProperties array with sprites and UI for the shop
    for (let deco of decoProperties) {
        //Assign all sprites for the shop
        setSprites(deco);
        //Create a new item block for each decoration
        deco.block = createBlock();
        //Attempted to push blocks to the blocks array  (proof that i tried to refractor, it did not work perfectly)
        // blocks.push(deco.block);
    }

    //Push blocks (shop UI) to blocks array
    //I tried putting this in the loop, and it broke so... yea it's staying here
    blocks.push(decorations.frog.block);
    blocks.push(decorations.vaseTall.block);
    blocks.push(decorations.vaseShort.block);
    blocks.push(decorations.fishBowl.block);
    blocks.push(decorations.fishTank.block);
    blocks.push(decorations.rugCircle.block);
    blocks.push(decorations.rugLong.block);
    blocks.push(decorations.tableShort.block);
    blocks.push(decorations.tableLong.block);
    blocks.push(decorations.miscSnail.block);
    blocks.push(decorations.miscStatue.block);


    let initialHeight = 250; //Starting position of the blocks
    let initialSublockHeight = 375; //Starting position for the subblocks
    let rectHeight = 325; //Height of the total shopItem block and subblock
    let rectSpacing = 5; //Spacing between each shopItem block

    //Set original heights for blocks
    //Yes, I should have made all the UI elements depend on one another... lesson learned for next time
    for (let i = 0; i < blocks.length; i++) {
        blocks[i].y = initialHeight + i * (rectHeight + rectSpacing);
        blocks[i].subBlock.y = initialSublockHeight + i * (rectHeight + rectSpacing);
        blocks[i].price.flyImg.y += i * (rectHeight + rectSpacing);
        blocks[i].subBlock.var1.button.y += i * (rectHeight + rectSpacing);
        blocks[i].subBlock.var2.button.y += i * (rectHeight + rectSpacing);
        blocks[i].subBlock.var3.button.y += i * (rectHeight + rectSpacing);
        blocks[i].price.txt.y += i * (rectHeight + rectSpacing);
    }

    //Create new shop items and push them to the shopItems array
    shopItems.push(new ShopItem(decorations.frog.block, decorations.frog));
    shopItems.push(new ShopItem(decorations.vaseTall.block, decorations.vaseTall));
    shopItems.push(new ShopItem(decorations.vaseShort.block, decorations.vaseShort));
    shopItems.push(new ShopItem(decorations.fishBowl.block, decorations.fishBowl));
    shopItems.push(new ShopItem(decorations.fishTank.block, decorations.fishTank));
    shopItems.push(new ShopItem(decorations.rugCircle.block, decorations.rugCircle));
    shopItems.push(new ShopItem(decorations.rugLong.block, decorations.rugLong));
    shopItems.push(new ShopItem(decorations.tableShort.block, decorations.tableShort));
    shopItems.push(new ShopItem(decorations.tableLong.block, decorations.tableLong));
    shopItems.push(new ShopItem(decorations.miscSnail.block, decorations.miscSnail));
    shopItems.push(new ShopItem(decorations.miscStatue.block, decorations.miscStatue));

    //Same problem as. I might come back to this if i have time
    //Has to do with index's 4 and 5
    // for (let deco of decoProperties) {
    //     shopItems.push((new ShopItem(deco.block, deco)));
    // }

    //Set original heights for images
    for (let i = 0; i < shopItems.length; i++) {
        let mainY = shopItems[i].decoration.shopSprites.mainSprite.y;
        let var1 = shopItems[i].decoration.shopSprites.var1.y;
        let var2 = shopItems[i].decoration.shopSprites.var2.y;
        let var3 = shopItems[i].decoration.shopSprites.var3.y;

        //Update the position of each image in the shopItems array
        shopItems[i].updatePos(mainY + i * (rectHeight + rectSpacing),
            var1 + i * (rectHeight + rectSpacing),
            var2 + i * (rectHeight + rectSpacing),
            var3 + i * (rectHeight + rectSpacing));
    }
}

/**
 * Sets the sprites for a given decoration property
 * @param decoration The decoration property to be modified
 */
function setSprites(decoration) {
    //Set each image according to its variation
    decoration.shopSprites.mainSprite.img = decoration.colorVariations[0];
    decoration.shopSprites.var1.img = decoration.colorVariations[0];
    decoration.shopSprites.var2.img = decoration.colorVariations[1];
    decoration.shopSprites.var3.img = decoration.colorVariations[2];
}

/**
 * Draw's the decoration objects and UI onto the screen
 */
function drawDecoration() {
    //Set the background according to which options the user selected
    setBackground();
    //Draw the UI for the decoration segment of the game
    drawDecoUI();

    //Continuously update the position of the spawned decoration objects
    for (let deco of decoObjects) {
        deco.updatePosition();
    }
}

/**
 * Creates a new decoration object
 * @param decoration the type of decoration object
 * @param colorVariations the object's color variations
 * @param index the index of the color selected
 */
function createNewDecoration(decoration, colorVariations, index) {
    //Create a new decoration at the center of the screen
    let newDeco = new Decoration(decoration, colorVariations);
    newDeco.changeColor(index); //Modify the color according to the one the user selected
    decoObjects.push(newDeco); //Push each new decoration object to the decoObjects array
}


/**
 * Iterates through the decoration objects in LIFO order because this is the order that they appear on the screen
 * Checks if mouse is over an object and if so gives it higher draw priority (draws on top of other items)
 * Then it implements the drag function
 * DISCLAIMER: I had to use ChatGPT to help me with this
 */
function mousePressedDecorate() {
    // Iterate through decoObjects in reverse order so that the last drawn object is what is selected
    for (let i = decoObjects.length - 1; i >= 0; i--) {
        let deco = decoObjects[i];
        if (deco.isMouseOver()) {
            selectedDeco = deco; // Store the topmost decoration

            // Remove selectedDeco from its current position
            decoObjects.splice(i, 1);
            // Add it to the end of the array (this gives it higher draw priority)
            decoObjects.push(selectedDeco);
            deco.startDrag();
            break; // Exit loop after selecting one
        }
    }
}

/**
 * Checks if the selected object is not null and freezes its position once the mouse is released
 * Also checks if the released location is over the trashcan and deletes it if it is
 */
function mouseReleasedDecorate() {
    //If selected decoration is not null, stop dragging it
    if (selectedDeco) {
        selectedDeco.stopDrag();

        //If mouse is over trashcan, delete object
        destroyDecoration(decoObjects.indexOf(selectedDeco));
        selectedDeco = null; // Reset selected decoration to null
    }
}

/**
 * Destroys a Decoration object upon placing it within the bounds of the trashcan
 * @param index the index of the object to be deleted
 */
function destroyDecoration(index) {
    //Calculate the area of the trashcan
    if (mouseX > UI.decoUI.leftBar.panel.trashcan.x - UI.decoUI.leftBar.panel.trashcan.w / 3
        && mouseX < UI.decoUI.leftBar.panel.trashcan.x + UI.decoUI.leftBar.panel.trashcan.w / 3
        && mouseY > UI.decoUI.leftBar.panel.trashcan.y - UI.decoUI.leftBar.panel.trashcan.h / 3
        && mouseY < UI.decoUI.leftBar.panel.trashcan.y + UI.decoUI.leftBar.panel.trashcan.h / 3) {

        //Refund the player
        totalFlies += decoObjects[index].price;
        //Update UI
        UI.decoUI.leftBar.panel.txt.txt = " =   " + totalFlies;

        //Delete the object
        decoObjects.splice(index, 1);


    } //This part is for when the game is resetting
    else if (state === "title") {
        decoObjects.splice(index, 1);
    }
}


/**
 * Handles the scrolling mechanic for the shop
 * Includes many calculations that made my head hurt
 * @param event
 */
function mouseWheel(event) {
    //Set the offset according to the mouse wheel being scrolled
    blockOffset = 0.2 * event.delta;
    let totalHeight = 0; //Will hold the total height of all the blocks and subblocks
    let topOfItems = blocks[0].y - blocks[0].w / 2; //Coordinate for the top of the shop
    let bottomOfItems = blocks[blocks.length - 1].y + blocks[blocks.length - 1].w / 2; //Coordinate for the bottom of the shop

    // let visibleArea = UI.decoUI.rightBar.panel.h

    // Check bounds before applying offset
    if ((event.delta > 0 && bottomOfItems <= 450) || (event.delta < 0 && topOfItems >= 170)) {
        return;  // Prevent further changes if bounds are exceeded
    }

    //Change height of blocks based off of scroll wheel
    //I regret not making the sub items depend on one another
    for (let i = 0; i < blocks.length; i++) {
        blocks[i].y -= blockOffset;
        blocks[i].subBlock.y -= blockOffset;
        blocks[i].price.flyImg.y -= blockOffset;
        blocks[i].subBlock.var1.button.y -= blockOffset;
        blocks[i].subBlock.var2.button.y -= blockOffset;
        blocks[i].subBlock.var3.button.y -= blockOffset;
        blocks[i].price.txt.y -= blockOffset;
        totalHeight += blocks[i].h + blocks[i].subBlock.h; //Update the total height depending on how many blocks there are
    }
    //Just like the blocks, modify each image
    //Again, hindsight is 2020 this could have been done nicer. Next time.
    for (let i = 0; i < shopItems.length; i++) {
        //Assign all the y coordinates to local variables
        let mainY = shopItems[i].decoration.shopSprites.mainSprite.y;
        let var1 = shopItems[i].decoration.shopSprites.var1.y;
        let var2 = shopItems[i].decoration.shopSprites.var2.y;
        let var3 = shopItems[i].decoration.shopSprites.var3.y;
        //Update the position of the sprites
        shopItems[i].updatePos(mainY - blockOffset, var1 - blockOffset, var2 - blockOffset, var3 - blockOffset);
    }

    // Calculate the percentage of scroll movement
    let scrollPercentage = Math.abs(blockOffset / totalHeight) * 13.7; //This value was created from trial and error :)

    // Adjust scrollbar position based on the scroll percentage
    let scrollBarMaxMovement = UI.decoUI.rightBar.scrollWheel.bar.h;  // Total possible movement for scrollbar
    let scrollBarMovement = scrollPercentage * scrollBarMaxMovement;

    //Update the scroll bar
    if (event.delta > 0) {
        UI.decoUI.rightBar.scrollWheel.bar.y += scrollBarMovement;
    } else if (event.delta < 0) {
        UI.decoUI.rightBar.scrollWheel.bar.y -= scrollBarMovement;
    }
}

/**
 * mouseClicked function that will be called from the main mouseClicked Event
 * Handles the mouse clicking for the shop
 */
function decoMouseClicked() {
    for (let i = 0; i < shopItems.length; i++) {
        if (shopItems[i].checkPrice(blocks[i].subBlock)) {
            shopItems[i].spawnDecoration();
        }
    }
}



