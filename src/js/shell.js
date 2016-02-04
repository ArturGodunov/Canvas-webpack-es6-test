'use strict';

/** Class representing shell.*/
export default class Shell {

    /**
     * Create shell.
     * @param {number} centerX - In pixels.
     * @param {number} centerY - In pixels.
     * @param {number} enemyCenterX - In pixels.
     * @param {number} enemyCenterY - In pixels.
     * @param {number} speed - In pixels per second
     * @param {number} size - In pixels.
     * @param {number} damage
     * */
    constructor(centerX, centerY, enemyCenterX, enemyCenterY, speed, size, damage) {
        this.centerX = centerX;
        this.centerY = centerY;
        this.enemyCenterX = enemyCenterX;
        this.enemyCenterY = enemyCenterY;
        this.angle = Math.atan2((this.centerY - this.enemyCenterY),(this.enemyCenterX - this.centerX));
        this.startCenterX = this.centerX;
        this.speed = speed;
        this.size = size;
        this.damage = damage;

        this._leftTopCoord();
    }

    _leftTopCoord() {
        this.x = this.centerX - this.size / 2;
        this.y = this.centerY - this.size / 2;
    }

    /**
     * Move shell.
     * @param {number} date - Increment date from method _frame.
     * */
    move(date) {
        let angle, k = 1, dx;
        if ((this.enemyCenterX - this.startCenterX) > 0) {
            angle = this.angle;
        } else {
            angle = Math.PI - this.angle;
            k = -1;
        }

        dx = Math.sqrt( Math.pow(this.speed * date, 2) / (1 + Math.pow(Math.tan(angle), 2)) );
        this.centerX += dx * k;
        this.centerY -= dx * Math.tan(angle);

        this._leftTopCoord();
    }

    draw() {
        app.context.drawImage(app.data.get('img/shells.png'), this.x, this.y);
    }

};