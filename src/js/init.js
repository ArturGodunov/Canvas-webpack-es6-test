'use strict';

export default class Init {

    constructor() {
        this._playAgain();
        this._reset();
        this._gameLoop();
    }

    static startInit() {
        new Init();
    }

    _playAgain() {
        document.getElementById('play-again').addEventListener('click', function() {
            this._reset();
        });
    }

    _reset() {

    }

    _gameLoop() {
        new app.gameLoop(Date.now());
    }
};