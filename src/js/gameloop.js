'use strict';

export default class GameLoop {

    constructor(lastTime) {
        this.gameTime = 0;
        this.lastTime = lastTime;
        this.enemies = [];
        this.enemySpeed = 50; // Speed in pixels per second
        this.enemySize = 40;

        this._frame();
    }

    _frame() {
        this.now = Date.now();
        this.date = (this.now - this.lastTime) / 1000;

        this._update();
        this._render();

        this.lastTime = this.now;
        requestAnimationFrame(this._frame());
    }

    _update() {
        this.gameTime += this.date;

        this._updateEnemies();

        if (Math.random() < 1 - Math.pow(.993, this.gameTime)) {
            this.enemies.push(new app.enemy(app.context.width, 100));
        }
    }

    _updateEnemies() {
        for(let i=0; i<this.enemies.length; i++) {
            this.enemies[i].x -= this.enemySpeed * this.date;

            if ((this.enemies[i].x + this.enemySize) < 0) {
                this.enemies.splice(i, 1);
                i--;
            }
        }
    }

    _render() {
        app.context.drawImage(app.data.get('img/bglevel-1.png'), 0, 0);
        app.context.drawImage(app.data.get('img/towers.png'), 40, 160);
    }

};