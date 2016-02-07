'use strict';

/** Class representing map.*/
export default class Map {

    /**
     * Create level.
     * @param {number} levelNumber.
     * */
    constructor(levelNumber) {
        this.levelNumber = levelNumber;
        this.levels = [
            [
                'left', 200,
                'down', 200,
                'left', 200,
                'up',   100,
                'left', 200
            ]
        ];
    }

    draw() {
        app.context.drawImage(app.data.get(`img/bglevel-${this.levelNumber}.png`), 0, 0);
    }

};