'use strict';

/** Class representing map.*/
export default class Map {

    /**
     * Create level.
     * @param {number} levelNumber.
     * */
    constructor(levelNumber) {
        this.levelNumber = levelNumber;
        this.level = app.data.levels[this.levelNumber];
    }

    draw() {
        app.context.drawImage(app.data.get(`img/bglevel-${this.levelNumber+1}.png`), 0, 0);
    }

};