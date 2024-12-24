"use strict";

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

let healthBar = {
    x: 50,
    y: 50,
    size: 100,
    container: {
        f: "#cacaca"
    },
    healthPoints: {
        f: "#9066b2",
        currentValue: 100,
        minValue: 0,
        maxValue: 100,
        decayRate: -0.02,
        animation: {
            gainingHealth: {
                isActive: false,
                counter: 0,
                amount: 10,
                rateOfChange: 1
            },
            losingHealth: {
                isActive: false,
                counter: 0,
                amount: 10,
                rateOfChange: -1
            }
        }
    }
}

let startTime;
let elapsedTime;

let score = {
    text: {
        size: 24
    },
    timer: {
        text: undefined,
        x: 550,
        y: 50,
    },
    panel: {
        fill: "#cacaca",
        x: 550,
        y: 50,
        w: 100,
        h: 50
    }
}

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
            tasks.playingBanner = false;
            tasks.currentTask = undefined;
        }
    }

    //Draw white banner under red banner
    push();
    fill("#faf8d6");
    quad(banners.white.x1, banners.white.y1, banners.white.x2, banners.white.y2, banners.white.x3, banners.white.y3, banners.white.x4, banners.white.y4);
    pop();

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

/**
 * Display the banner text according to which task is active
 */
function setBannerText() {
    if (tasks.currentTask === tasks.pong.name) {
        banners.text.text = tasks.pong.bannerText;
        tasks.pong.isActive = true;
    } else if (tasks.currentTask === tasks.cow.name) {
        banners.text.text = tasks.cow.bannerText;
        tasks.cow.isActive = true;
    } else if (tasks.currentTask === tasks.math.name) {
        banners.text.text = tasks.math.bannerText;
        tasks.math.isActive = true;
    } else if (tasks.currentTask === tasks.pattern.name) {
        banners.text.text = tasks.pattern.bannerText;
        tasks.pattern.isActive = true;
    } else {
        banners.text.text = undefined;
    }
}

function activateBannerOnce(counter, newTask, countThreshold, sound) {
    //Play the banner only once
    if (counter === countThreshold && !newTask) {
        playSound(sound);
        // playingBanner = true;
        tasks.playingBanner = true;
    }
}

/**
 * Handles the health meter. Increases the health if a task was completed successfully and decreases if it fails
 * Animates the increase so as not to be janky
 * @param succeeded Bool for whether the task was successful or not
 */
function updateHealth(succeeded) {
    // Decay or animate health changes
    if (succeeded === undefined) {
        healthBar.healthPoints.currentValue += healthBar.healthPoints.decayRate;
    } else if (!succeeded) {
        healthBar.healthPoints.animation.losingHealth.isActive = true;
    } else {
        healthBar.healthPoints.animation.gainingHealth.isActive = true;
    }

    // Apply animations
    animateHealth(healthBar.healthPoints.animation.gainingHealth);
    animateHealth(healthBar.healthPoints.animation.losingHealth);

    // Constrain value after any modification
    healthBar.healthPoints.currentValue = constrain(
        healthBar.healthPoints.currentValue,
        healthBar.healthPoints.minValue,
        healthBar.healthPoints.maxValue
    );

    // Draw the health bar
    drawHealth();
}

/**
 * Display the health as a circle that is being filled clockwise
 */
function drawHealth() {
    // Calculate the fill level (proportion of the circle filled)
    let fillLevel = map(healthBar.healthPoints.currentValue, 0, healthBar.healthPoints.maxValue, 0, TWO_PI); // Map value to an angle (0 to 2π)

    // Draw the background circle
    push();
    fill(healthBar.container.f);
    ellipse(healthBar.x, healthBar.y, healthBar.size);
    pop();

    // Draw the filled portion
    push();
    noStroke()
    fill(healthBar.healthPoints.f);
    angleMode(RADIANS);
    arc(healthBar.x, healthBar.y, healthBar.size, healthBar.size, -HALF_PI, -HALF_PI + fillLevel, PIE);
    pop();
}

/**
 * Handles the animation of the health bar in response to a task's completion
 * @param animation
 */
function animateHealth(animation) {
    // Handle change in health animation
    if (animation.isActive && animation.counter < animation.amount) {
        animation.counter += abs(animation.rateOfChange);
        healthBar.healthPoints.currentValue += animation.rateOfChange;
    }

    // Reset values if animation is complete
    if (animation.counter === animation.amount) {
        animation.counter = 0;
        animation.isActive = false;
    }
}

/**
 * Handle the end conditions of the game
 */
function manageFailState() {
    // If the health reaches 0, stop the timer and go to the end state
    if (healthBar.healthPoints.currentValue === 0) {
        manageGameTimer("stop");
        // gameState = 'end';
        gameStates.current = gameStates.end;
    }
}


/**
 * Creates a timer for the duration of the game which the user can judge themselves against
 */
function manageGameTimer(state) {
    if (state === "start") {
        if (!startTime) {
            startTime = millis();
        }
    } else if (state === "stop") {
        // Calculate the elapsed time and format it into seconds with decimals to the hundredth place
        elapsedTime = formatTime((millis() - startTime));
        startTime = undefined;
    }
}

/**
 * Format a string in the form MM:SS
 * @param elapsed The time that has elapsed since the start of th game
 * @returns {string} The formatted string in the form MM:SS
 */
function formatTime(elapsed) {
    let minutes = Math.floor(elapsed / 60000);
    let seconds = Math.floor((elapsed % 60000) / 1000);

    // Pad values to two digits
    return nf(minutes, 2) + ':' + nf(seconds, 2);
}


/**
 * Displays the time score onto the screen
 * @param scoreProperties Properties of the score (coordinates, fill, etc)
 * @param time The time to be displayed
 */
function drawScore(scoreProperties, time) {
    // Draw rectangle
    push();
    rectMode(CENTER)
    fill(scoreProperties.panel.fill);
    rect(scoreProperties.panel.x, scoreProperties.panel.y, scoreProperties.panel.w, scoreProperties.panel.h, 10)
    pop();

    // Draw text
    push();
    textAlign(CENTER, CENTER);
    textSize(scoreProperties.text.size);
    text(scoreProperties.text.text, scoreProperties.text.x, scoreProperties.text.y);
    text(time, scoreProperties.timer.x, scoreProperties.timer.y);
    pop();
}

function resetHealth() {
    healthBar.healthPoints.currentValue = 100;
    healthBar.healthPoints.animation.gainingHealth.isActive = false;
    healthBar.healthPoints.animation.losingHealth.isActive = false;
}

let speedPattern = false;

let speedMath = false;

function speedUp() {

    if (cow.speedX < 2) {
        cow.speedX += 0.001;
        cow.speedY += 0.001;
    }

    speedMath = true;
    speedPattern = true;

}
