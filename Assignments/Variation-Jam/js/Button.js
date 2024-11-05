"use strict";

/**
 * Creates Button objects that have default styles
 * Keeps its position relative to the canvas upon resizing
 */
class Button {
    constructor(label, x, y, w, h, callBack) {
        //Save properties
        this.label = label;
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;

        //Create a Button Element
        this.button = createButton(label);
        this.button.size(w, h);

        //Set the default position
        this.updatePosition();

        //Assign default properties to button
        this.buttonStyles();

        //Call button logic when clicked
        this.button.mouseClicked(callBack);

        //Update position based on resizing
        window.addEventListener("resize", () => this.updatePosition());
    }

    /**
     * Allows you to change the style of the button
     * @param bg The background color
     * @param border The color of the border
     * @param borderRadius The radius of the border
     * @param fontSize The size of the font
     * @param color The color of the font
     */
    buttonStyles(bg = "red", fontSize = "32px", color = "black", border = "black", borderRadius = "5px",) {
        //Default button
        this.button.style('background-color', bg);
        this.button.style('font-size', fontSize);
        this.button.style('color', color);
        this.button.style("border", border);
        this.button.style('border-radius', borderRadius);
    }

    /**
     * Update the position of the button relative to the canvas
     * Buttons are positioned via the center of the button
     */
    updatePosition() {
        let canvasX = canvas.position().x;
        let canvasY = canvas.position().y;
        this.button.position(canvasX - this.w / 2 + this.x, canvasY + this.y);
    }


}