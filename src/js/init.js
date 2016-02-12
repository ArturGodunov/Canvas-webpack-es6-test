'use strict';

/** Class representing initialization.*/
export default class Init {

    /**
     * Create initialization.
     * */
    constructor() {
        this._playAgain();
        this._gameLoop();
        //this._documentReady();
    }

    /**
     * This method is using as callback.
     * @callback requestCallback.
     * */
    static startInit() {
        new Init();
    }

    //_documentReady() {
    //    document.addEventListener('DOMContentLoaded', this._addTowers);
    //}

    //_addTowers() {
    //    console.log('qwe3');
    //    document.getElementsByClassName('tower').addEventListener('click', function() {
    //        console.log('qwe2');
    //    });
    //}

    _playAgain() {
        document.getElementById('play-again').addEventListener('click', () => {
            this._reset();
        });
    }

    _reset() {
        document.getElementById('game-over_mask').classList.remove('show');

        this._gameLoop();
    }

    /**
     * @todo After created save method or class, set the level number dynamically.
     * */
    _gameLoop() {
        new app.gameLoop(Date.now(), 0);
    }

};