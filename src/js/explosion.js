'use strict';

export default class Explosion {

    constructor(centerEnemyX, centerEnemyY) {
        this.centerEnemyX = centerEnemyX;
        this.centerEnemyY = centerEnemyY;
        this.size = 40;
        this.x = this.centerEnemyX - this.size / 2;
        this.y = this.centerEnemyY - this.size / 2;
        this.maxAmountFramesDrawing = 10; // кол-во кадров в течении которых взрыв будет отрисовываться. потом надо будет переделать на спрайты.
        this.amountFramesDrawing = 0;
    }

    draw() {
        app.context.drawImage(app.data.get('img/explosions.png'), this.x, this.y);
    }

};