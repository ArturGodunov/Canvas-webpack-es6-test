'use strict';

export default class Init {

    constructor() {
        this.bgLevel = new Image();
        this.bgLevel.src = data.get('img/bglevel-1.png');
        context.drawImage(this.bgLevel, 0, 0);

        this._playAgain();
        this._reset();
    }

    _playAgain() {
        document.getElementById('play-again').addEventListener('click', function() {
            reset();
        });
    }

    _reset() {

    }



};

//export default class Scene {
//
//    constructor(level) {
//        this.level = level;
//
//        this._onload();
//    }
//
//    _onload(){
//        this.bgImg = new Image();
//        this.bgImg.src = `img/scene-${this.level}.jpg`;
//        this.bgImg.onload = () => context.drawImage(this.bgImg, 0, 0);
//    }
//};