"use strict";

let block = {
    x: 1315,
    y: 250,
    w: 160,
    h: 100,
    fill: "#96beb1",
    images: undefined,
    img: {
        img: "",
        x: 1195,
        y: 180,
        w: 140,
        h: 140
    },
    price: {
        txt: {
            x: 1323,
            y: 250,
            txt: "=> 3",
            fill: "black",
            size: 22,
            weight: 1,
        },
        flyImg: {
            img: "",
            x: 1300,
            y: 180,
            w: 140,
            h: 140
        }
    },
    subBlock: {
        x: 1315,
        y: 375,
        w: 160,
        h: 300,
        fill: "#5a7e6f",
        var1: {
            button: {
                x: 1345,
                y: 335,
                w: 60,
                h: 30,
                fill: "#18284a"
            }
        },
        var2: {
            button: {
                x: 1345,
                y: 410,
                w: 60,
                h: 30,
                fill: "#18284a"
            }
        },
        var3: {
            button: {
                x: 1345,
                y: 485,
                w: 60,
                h: 30,
                fill: "#18284a"
            }
        }
    }
}

class ShopItem {
    //item bar
    constructor(block, sprites) {
        this.block = block;
        this.sprites = sprites;
    }

    draw() {
        drawShop(this.block, this.sprites);
    }
}

function drawShop(block, sprites) {
    //Sub block
    push();
    drawPanel(block.subBlock);
    //Variation sprites
    image(sprites.var1.img, sprites.var1.x, sprites.var1.y, sprites.var1.w, sprites.var1.h);
    image(sprites.var2.img, sprites.var2.x, sprites.var2.y, sprites.var2.w, sprites.var2.h);
    image(sprites.var3.img, sprites.var3.x, sprites.var3.y, sprites.var3.w, sprites.var3.h);

    //Buy buttons
    drawBuyButton(block.subBlock.var1.button);
    drawBuyButton(block.subBlock.var2.button);
    drawBuyButton(block.subBlock.var3.button);
    pop();

    //Block
    push();
    drawPanel(block);
    pop();

    //Main sprite and fly
    image(sprites.mainSprite.img, sprites.mainSprite.x, sprites.mainSprite.y, sprites.mainSprite.w, sprites.mainSprite.h);
    image(block.price.flyImg.img, block.price.flyImg.x, block.price.flyImg.y, block.price.flyImg.w, block.price.flyImg.h);

    //text
    push();
    fill(block.price.txt.fill);
    stroke("black");
    textAlign(CENTER, CENTER);
    textSize(block.price.txt.size);
    strokeWeight(block.price.txt.weight);
    text(block.price.txt.txt, block.price.txt.x, block.price.txt.y);
    pop();
}
