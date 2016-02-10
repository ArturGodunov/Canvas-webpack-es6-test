'use strict';

/** Class representing initialization.*/
export default class Init {

    /**
     * Create initialization.
     * */
    constructor() {
        this._playAgain();
        this._reset();
        this._gameLoop();
    }

    /**
     * This method is using as callback.
     * @callback requestCallback.
     * */
    static startInit() {
        new Init();
    }

    _playAgain() {
        document.getElementById('play-again').addEventListener('click', function() {
            this._reset();
        });
    }

    /**
     * @todo Create method _reset.
     * */
    _reset() {

    }

    /**
     * @todo After created save method or class, set the level number dynamically.
     * */
    _gameLoop() {
        new app.gameLoop(Date.now(), 0);
    }
};