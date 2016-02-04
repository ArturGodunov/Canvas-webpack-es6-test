'use strict';

/** Class representing tower.*/
export default class Tower {

    /**
     * Create tower.
     * @param {number} x - In pixels.
     * @param {number} y - In pixels.
     * @param {number} radius - In pixels.
     * @param {number} rate - Time in seconds to next shoot.
     * */
    constructor(x, y, radius, rate) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.size = 40; /** In pixels.*/
        this.centerX = this.x + this.size / 2;
        this.centerY = this.y + this.size / 2;
        this.rate = rate;
        this.timeNextShoot = 0;
        this.timeDetectionFirstEnemy = 0;
    }

    draw() {
        app.context.drawImage(app.data.get('img/towers.png'), this.x, this.y);

        /**
         * Draw radius of the tower.
         * */
        app.context.beginPath();
        /**
         * Default draw arc clockwise.
         * @param x - Center coordinate along the x axis (in pixels).
         * @param y - Center coordinate along the y axis (in pixels).
         * @param radius - In pixels.
         * @param startAngle - In radians.
         * @param endAngle - In radians.
         * */
        app.context.arc(this.centerX, this.centerY, this.radius, 0, Math.PI * 2);
        app.context.strokeStyle = 'red';
        app.context.stroke();
    }

};