/**
 * Shop handler for the game "Amphibian Design"
 * Created by Diana Edvi
 *
 * This file contains all the functionality for the shop in the game
 *
 * Contains:
 * - ShopItem Class
 * - local draw function
 * - creation of shop UI
 *
 * Made with p5
 * https://p5js.org/
 */

"use strict";

/**
 * Class for a ShopItem object
 * Creates a new ShopItem and displays it onto the screen
 * Also handles mouse over logic and the spawning of Decoration objects
 */
class ShopItem {
    constructor(block, decoration) {
        this.block = block;
        this.decoration = decoration;
    }

    /**
     * Draw the shop sprites
     */
    draw() {
        drawShop(this.block, this.decoration);
        this.checkPrice(this.block.subBlock); //Changes the fill of the buttons according to flies owned
        this.displayShopSprites(); //Display the sprites
    }

    /**
     * Draw the shop sprites and their variations onto the screen
     */
    displayShopSprites() {
        push();
        imageMode(CENTER);
        //Variation sprites
        image(this.decoration.shopSprites.var1.img, this.decoration.shopSprites.var1.x, this.decoration.shopSprites.var1.y, this.decoration.shopSprites.var1.w, this.decoration.shopSprites.var1.h);
        image(this.decoration.shopSprites.var2.img, this.decoration.shopSprites.var2.x, this.decoration.shopSprites.var2.y, this.decoration.shopSprites.var2.w, this.decoration.shopSprites.var2.h);
        image(this.decoration.shopSprites.var3.img, this.decoration.shopSprites.var3.x, this.decoration.shopSprites.var3.y, this.decoration.shopSprites.var3.w, this.decoration.shopSprites.var3.h);

        //Main sprite and fly
        image(this.decoration.shopSprites.mainSprite.img, this.decoration.shopSprites.mainSprite.x, this.decoration.shopSprites.mainSprite.y, this.decoration.shopSprites.mainSprite.w, this.decoration.shopSprites.mainSprite.h);
        // console.log(this.sprites.mainSprite.x);
        image(this.block.price.flyImg.img, this.block.price.flyImg.x, this.block.price.flyImg.y, this.block.price.flyImg.w, this.block.price.flyImg.h);
        pop();

    }

    /**
     * Updates the position of the sprites
     * @param mainY The main sprite next to the price
     * @param var1Y The first variation
     * @param var2Y The second variation
     * @param var3Y The third variation
     */
    updatePos(mainY, var1Y, var2Y, var3Y) {
        this.decoration.shopSprites.var1.y = var1Y;
        this.decoration.shopSprites.var2.y = var2Y;
        this.decoration.shopSprites.var3.y = var3Y;
        this.decoration.shopSprites.mainSprite.y = mainY;
    }

    /**
     * Checks if the mouse is over the buy button
     * @param varButton The variation button
     * @returns {boolean}
     */
    isMouseOverButton(varButton) {
        let minX = varButton.button.x - varButton.button.w / 2;
        let maxX = varButton.button.x + varButton.button.w / 2;
        let minY = varButton.button.y - varButton.button.h / 2;
        let maxY = varButton.button.y + varButton.button.h / 2;
        return mouseX > minX && mouseX < maxX && mouseY > minY && mouseY < maxY;
    }

    /**
     * Checks which variation the mouse is clicking
     * Checks whether the player has enough flies
     * If both true, spawns in that variation of the Decoration object
     */
    spawnDecoration() {
        if (this.isMouseOverButton(this.block.subBlock.var1) && this.checkPrice(this.block.subBlock)) {
            createNewDecoration(this.decoration, this.decoration.colorVariations, 0);
            this.subtractCost();
        } else if (this.isMouseOverButton(this.block.subBlock.var2) && this.checkPrice(this.block.subBlock)) {
            createNewDecoration(this.decoration, this.decoration.colorVariations, 1);
            this.subtractCost();
        } else if (this.isMouseOverButton(this.block.subBlock.var3) && this.checkPrice(this.block.subBlock)) {
            createNewDecoration(this.decoration, this.decoration.colorVariations, 2);
            this.subtractCost();
        }
    }

    /**
     * Checks if the player has enough flies to buy the decoration
     * @returns {boolean} Whether the user has enough flies caught
     * @param subBlock The sub block of the shop item holding all the buttons
     */
    checkPrice(subBlock) {
        if (totalFlies >= this.decoration.price) {
            subBlock.var1.button.fill = "#587dca";
            subBlock.var2.button.fill = "#587dca";
            subBlock.var3.button.fill = "#587dca";
            return true;
        } else {
            subBlock.var1.button.fill = "#18284a";
            subBlock.var2.button.fill = "#18284a";
            subBlock.var3.button.fill = "#18284a";
            return false;
        }
    }

    /**
     * Subtracts the cost of the Decoration from the total flies and updates the UI
     */
    subtractCost() {
        //Deduct cost
        totalFlies -= this.decoration.price;
        //Update UI
        UI.decoUI.leftBar.panel.txt.txt = " =   " + totalFlies;
        //Reset button colors if not enough flies
        this.checkPrice(this.block.subBlock);
    }
}

/**
 * Draw the shop
 * @param block The shop block properties
 * @param decoProps The decoration properties (used to get the price)
 */
function drawShop(block, decoProps) {
    //Sub block
    push();
    drawPanel(block.subBlock);
    //Buy buttons
    drawBuyButton(block.subBlock.var1.button);
    drawBuyButton(block.subBlock.var2.button);
    drawBuyButton(block.subBlock.var3.button);
    pop();

    //Block
    push();
    drawPanel(block);
    pop();

    //Text
    push();
    fill(block.price.txt.fill);
    stroke("black");
    textAlign(CENTER, CENTER);
    textSize(block.price.txt.size);
    strokeWeight(block.price.txt.weight);
    text(block.price.txt.txt + decoProps.price, block.price.txt.x, block.price.txt.y);
    pop();
}

/**
 * Makes a copy of the block property and pushes it to the blocks array
 */
function createBlock() {

    let newBlock = {
        x: 1315, //The x coordinate of the block
        y: 250, //The y coordinate of the block
        w: 160, // The width of the block
        h: 100, //The height of the block
        fill: "#96beb1", //The color of the block
        totalHeight: 0, //The total height of the block
        price: { // The price UI
            txt: {
                x: 1323,
                y: 250,
                txt: "=> ",
                fill: "black",
                size: 22,
                weight: 1,
            },
            flyImg: {
                img: "",
                x: 1370,
                y: 250,
                w: 140,
                h: 140
            }
        },
        subBlock: { //The subblock containing all the variations
            x: 1315, // The x coordinate of the subblock
            y: 375, // The y coordinate of the subblock
            w: 160, // The width of the subblock
            h: 300, // The height of the subblock
            fill: "#5a7e6f", // The color of the subblock
            var1: { // The first variation
                button: {
                    x: 1345,
                    y: 335,
                    w: 60,
                    h: 30,
                    fill: "#18284a",
                    canClick: false,
                    isAvailable: false
                }
            },
            var2: { // The second variation
                button: {
                    x: 1345,
                    y: 410,
                    w: 60,
                    h: 30,
                    fill: "#18284a",
                    canClick: false,
                    isAvailable: false
                }
            },
            var3: { // The third variation
                button: {
                    x: 1345,
                    y: 485,
                    w: 60,
                    h: 30,
                    fill: "#18284a",
                    canClick: false,
                    isAvailable: false
                }
            }
        }
    }

    //Set the fly image
    newBlock.price.flyImg.img = UI.decoUI.leftBar.panel.fly.img;

    return newBlock;
}
