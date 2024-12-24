"use strict";

let audio = { // Will hold all the audio information
    tutorials: { // The voiceover that goes with the banners where the voice explains what to do
        pong: undefined,
        cow: undefined,
        mathing: undefined,
        pattern: undefined,
    },
    gameSounds: { // The game sounds
        paddle: undefined,
        moos: [],
        moo_1: undefined,
        moo_2: undefined,
        tickingClock: undefined,
        enterWoosh: undefined,
        exitWoosh: undefined,
        ding: undefined,
        dong: undefined,
    },
    comments: { // The voiceovers that don't have anything to do with learning the game
        goingGreat: {
            hasPlayed: false, // To prevent infinitely looping
            audio: undefined,
        },
        music: {
            hasPlayed: false,
            audio: undefined
        },
        howRude: {
            hasPlayed: false,
            audio: undefined
        },
        bookClub: {
            hasPlayed: false,
            audio: undefined
        },
        gameOver: {
            hasPlayed: false,
            audio: undefined
        }
    }

}


/**
 * Load all the audio files
 */
function preloadAudio() {

    audio.tutorials.pong = loadSound('assets/sounds/tutorial/pong.wav');
    audio.tutorials.cow = loadSound('assets/sounds/tutorial/cow.wav');
    audio.tutorials.mathing = loadSound('assets/sounds/tutorial/math.wav');
    audio.tutorials.pattern = loadSound('assets/sounds/tutorial/pattern.wav');

    audio.gameSounds.paddle = loadSound('assets/sounds/gameSounds/paddle.wav')
    audio.gameSounds.moo_1 = loadSound('assets/sounds/gameSounds/moo_1.wav')
    audio.gameSounds.moo_2 = loadSound('assets/sounds/gameSounds/moo_2.wav')
    audio.gameSounds.tickingClock = loadSound('assets/sounds/gameSounds/ticking_clock.wav')
    audio.gameSounds.enterWoosh = loadSound('assets/sounds/gameSounds/enter_woosh.wav')
    audio.gameSounds.exitWoosh = loadSound('assets/sounds/gameSounds/exit_woosh.wav')
    audio.gameSounds.ding = loadSound('assets/sounds/gameSounds/ding.wav')
    audio.gameSounds.dong = loadSound('assets/sounds/gameSounds/bad-ding.wav')

    audio.comments.goingGreat.audio = loadSound('assets/sounds/comments/going_great.wav')
    audio.comments.music.audio = loadSound('assets/sounds/comments/music.wav')
    audio.comments.howRude.audio = loadSound('assets/sounds/comments/how_rude.wav')
    audio.comments.bookClub.audio = loadSound('assets/sounds/comments/book-club.wav')

    audio.comments.gameOver.audio = loadSound('assets/sounds/comments/game-over.wav')
}

/**
 * Check if the sound is already playing, and if not, play it
 * @param sound The sound to be played
 */
function playSound(sound) {
    if (!sound.isPlaying()) {
        sound.play();
    }
}

/**
 * Stop the audio from continuing into the end
 */
function stopGameAudio() {
    audio.tutorials.pong.stop();
    audio.tutorials.cow.stop();
    audio.tutorials.mathing.stop();
    audio.tutorials.pattern.stop();
    audio.gameSounds.paddle.stop();
    audio.gameSounds.moo_1.stop();
    audio.gameSounds.moo_2.stop();
    audio.gameSounds.tickingClock.stop();
    audio.gameSounds.enterWoosh.stop();
    audio.gameSounds.exitWoosh.stop();
    audio.gameSounds.ding.stop();
    audio.gameSounds.dong.stop();
    audio.comments.goingGreat.audio.stop();
    audio.comments.music.audio.stop();
    audio.comments.howRude.audio.stop();
    audio.comments.bookClub.audio.stop();
}

/**
 * Some audio clips are meant to be played after a certain time and under certain conditions. This handles that
 * @param audioObj The parent of the audio that will be played
 * @param delay The amount of time that the audio will wait before playing
 * @param condition Any additional conditions before the audio can play
 */
function activateAudioWithDelay(audioObj, delay, condition = () => true) {
    setTimeout(() => {
        if (condition() && !audioObj.hasPlayed) {
            playSound(audioObj.audio);
            audioObj.hasPlayed = true;
        }
    }, delay);
}

/**
 * Reset an audio object
 * @param audioObj The object to be reset
 */
function resetAudioObj(audioObj) {
    audioObj.hasPlayed = false;
}

/**
 * Reset all necessary audio variables
 */
function resetAudio() {
    resetAudioObj(audio.comments.howRude);
    resetAudioObj(audio.comments.goingGreat);
    resetAudioObj(audio.comments.music);
    resetAudioObj(audio.comments.bookClub);

    audio.comments.gameOver.audio.stop();
}