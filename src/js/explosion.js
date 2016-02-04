'use strict';

/** Class representing explosion.*/
export default class Explosion {

    /**
     * Create explosion.
     * @param {number} centerEnemyX - In pixels.
     * @param {number} centerEnemyY - In pixels.
     * */
    constructor(centerEnemyX, centerEnemyY) {
        this.centerEnemyX = centerEnemyX;
        this.centerEnemyY = centerEnemyY;
        this.size = 40;
        this.x = this.centerEnemyX - this.size / 2;
        this.y = this.centerEnemyY - this.size / 2;
        this.amountFramesDrawing = 0;
        /**
         * Duration of explosion (in frames).
         *
         * @todo Change in sprite.
         * */
        this.maxAmountFramesDrawing = 10;
    }

    draw() {
        app.context.drawImage(app.data.get('img/explosions.png'), this.x, this.y);
    }

};