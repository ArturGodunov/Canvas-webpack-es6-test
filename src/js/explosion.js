'use strict';

export default class Explosion {

    constructor(centerEnemyX, centerEnemyY) {
        this.centerEnemyX = centerEnemyX;
        this.centerEnemyY = centerEnemyY;
        this.size = 40;
        this.x = this.centerEnemyX - this.size / 2;
        this.y = this.centerEnemyY - this.size / 2;

        this._draw();
    }

    _draw() {
        app.context.drawImage(app.data.get('img/explosions.png'), this.x, this.y);
    }

};