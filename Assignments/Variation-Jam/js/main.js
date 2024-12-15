/**
 * Title of Project
 * Author Name
 *
 * HOW EMBARRASSING! I HAVE NO DESCRIPTION OF MY PROJECT!
 * PLEASE REMOVE A GRADE FROM MY WORK IF IT'S GRADED!
 */

"use strict";


/**
 * OH LOOK I DIDN'T DESCRIBE SETUP!!
 */


let buttons = {
    soloButton: undefined,
    mathButton: undefined,
    colorButton: undefined,
    questionButton: undefined
}
let states = {
    current: undefined,
    menu: "menu",
    soloPong: "solo",
    mathPong: "math",
    colorPong: "color",
}
let playingBanner = true;

let activeTasks = {
    task: "",
    soloPong: false,
    randomCow: false,
    mathing: false,
}

let timers = {
    bannerTimerStarted: false,
    cowTimerStarted: false,
    mathingStarted: false,
    answerTimeout: undefined,
    mathTimout: undefined,
}

let counters = {
    pongCounter: 0,
    cowCounter: 0
}

function setup() {
    canvas = createCanvas(640, 640);
    background("#6160b2");
    states.current = states.menu;
    resetGame();
    // menu();

}

/**
 * Draw the game
 */
function draw() {
    background("#6160b2");
    if (playingBanner) {
        bannerAnimation(banners.text.text);
    }
    soloPong(paddle, ball);

    // Handle cow tasks
    if (counters.pongCounter >= 1) {
        //Play the banner only once
        if (counters.pongCounter === 1 && !activeTasks.randomCow) {
            playingBanner = true;
        }
        randomCow(cow);
        // Repeat the cow task periodically
        if (!timers.cowTimerStarted) {
            timers.cowTimerStarted = true;
            setTimeout(() => {
                randomCow(cow)
                timers.cowTimerStarted = false;
            }, 2000);
        }
    }
    // Handle math tasks
    if (counters.cowCounter >= 1) {
        //Play the banner only once
        if (counters.cowCounter === 1 && !activeTasks.mathing) {
            playingBanner = true;
            mathBoxes.isActive = true;
        }
        mathing();
        // if (!timers.mathingStarted) {
        //     timers.mathingStarted = true;
        //     setTimeout(() => {
        //         mathBoxes.isActive = true;
        //         mathBoxes.hasAnswered = false;
        //         mathing();
        //         console.log("caleld math agaibn")
        //         timers.mathingStarted = false;
        //     }, 2000);
        // }

    }
    handleHealth();
    displayHealth();
}

let banners = {
    red: {
        x1: 690,
        y1: 540,
        x2: 740,
        y2: 340,
        x3: 1180,
        y3: 340,
        x4: 1130,
        y4: 540
    },
    white: {
        x1: undefined,
        y1: undefined,
        x2: undefined,
        y2: undefined,
        x3: undefined,
        y3: undefined,
        x4: undefined,
        y4: undefined
    },
    text: {
        x: undefined,
        y: undefined,
        w: 390,
        h: 100,
        size: 30,
        f: "black",
        text: undefined
    }
}

let bannerState = "forwards"

/**
 * Pushes a banner onto the screen and keeps it there for a few seconds. Then it gets pulled off the screen
 * @param displayStr
 */
function bannerAnimation(displayStr) {
    setBannerText();
    //Make banner contents depend on red banner
    banners.white.x1 = banners.red.x1 - 30
    banners.white.y1 = banners.red.y1 + 30
    banners.white.x2 = banners.red.x2 - 30
    banners.white.y2 = banners.red.y2 + 30
    banners.white.x3 = banners.red.x3 - 30
    banners.white.y3 = banners.red.y3 + 30
    banners.white.x4 = banners.red.x4 - 30
    banners.white.y4 = banners.red.y4 + 30

    banners.text.x = banners.red.x2 + (banners.red.x4 - banners.red.x2) / 2
    banners.text.y = banners.red.y2 + (banners.red.y1 - banners.red.y2) / 2


    // Handle banner movement based on state
    if (bannerState === "forwards") {
        if (banners.red.x1 > 100) {
            // Move banners
            banners.red.x1 -= 20;
            banners.red.x2 -= 20;
            banners.red.x3 -= 20;
            banners.red.x4 -= 20;
        } else if (!timers.bannerTimerStarted) {
            // Keep the banner there for 3 seconds
            timers.bannerTimerStarted = true;
            setTimeout(() => {
                bannerState = "backwards";
                timers.bannerTimerStarted = false;
            }, 3000);
        }
    } else if (bannerState === "backwards") {
        if (banners.red.x1 < 690) {
            // Move banners back
            banners.red.x1 += 20;
            banners.red.x2 += 20;
            banners.red.x3 += 20;
            banners.red.x4 += 20;
        } else {
            // Reset variables
            bannerState = "forwards";
            playingBanner = false;
            activeTasks.task = undefined;
        }
    }

    //Draw white banner under red banner
    push();
    fill("#faf8d6");
    quad(banners.white.x1, banners.white.y1, banners.white.x2, banners.white.y2, banners.white.x3, banners.white.y3, banners.white.x4, banners.white.y4);
    pop();
    // console.log(banners.text.x, banners.text.y, banners.text.w, banners.text.h)

    //Draw red banner
    push();
    fill("#ff6a6a");
    quad(banners.red.x1, banners.red.y1, banners.red.x2, banners.red.y2, banners.red.x3, banners.red.y3, banners.red.x4, banners.red.y4);
    pop();
    //Rect
    push();
    fill("red")
    rectMode(CENTER)
    rect(banners.text.x, banners.text.y, banners.text.w, banners.text.h)
    // console.log(banners.text.x, banners.text.y, banners.text.w, banners.text.h)
    pop();

    //Draw the text on top
    push();
    fill(banners.text.f);
    textAlign(CENTER, CENTER);
    rectMode(CENTER);
    textWrap(WORD);
    textSize(banners.text.size);
    noStroke();
    text(displayStr, banners.text.x, banners.text.y, banners.text.w);
    pop();
}

function setBannerText() {
    if (activeTasks.task === "solo") {
        banners.text.text = "Don't drop the ball"
        activeTasks.soloPong = true;
    } else if (activeTasks.task === "cow") {
        banners.text.text = "You should pet the cows methinks"
        activeTasks.randomCow = true;
    } else if (activeTasks.task === "math") {
        banners.text.text = "If I had to do math for this, so do you :)"
        activeTasks.mathing = true;
    } else {
        banners.text.text = undefined;
    }
}

function resetGame() {
    resetBall();
    resetCow(cow);
}

let health = {
    value: 0,
    fill: "red"
}
let maxHealth = {
    value: 100,
    fill: "#cacaca"
}
let circle = {
    x: 50,
    y: 50,
    size: 100,
}

function displayHealth() {
    // Calculate the fill level (proportion of the circle filled)
    let fillLevel = map(health.value, 0, maxHealth.value, 0, TWO_PI); // Map value to an angle (0 to 2π)

    // Draw the background circle
    // noStroke();
    push();
    fill(maxHealth.fill);
    ellipse(circle.x, circle.y, circle.size);
    pop();

    // Draw the filled portion
    push();
    noStroke()
    fill(health.fill);
    arc(circle.x, circle.y, circle.size, circle.size, -HALF_PI, -HALF_PI + fillLevel, PIE);
    pop();
}

function handleHealth(succeeded) {
    health.value = constrain(health.value, 0, maxHealth.value);
    if (succeeded === undefined) {
        health.value += 0.01;
    } else if (!succeeded) {
        health.value -= 10;
    } else {
        health.value += 1;
    }
}

let startMath = false;

function mouseClicked() {
    startMath = true;
}


//Todo
// import assets (sound and drawings)
// import a font im sick of this one
// create timing for math stuff
// create fading for math stuff?
// create timing for cow stuff
// check for microphone and mouse inputs
// water plant function
// scream into mic function
// banner function
// Type what you see (select text box and type)
// edit the health bar if missed task
// Audio of me rambling
// Timer for how long the player lasted
// menu
// end game

//Bugs
// The questions have a weird bug where sometimes one of them turns green
// Button outlines
//


