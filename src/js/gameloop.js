'use strict';

export default class GameLoop {

    constructor(lastTime) {
        this.gameTime = 0;
        this.lastTime = lastTime;
        this.enemies = [];
        this.enemySpeed = 50; // Speed in pixels per second
        this.enemySize = 40;
        this.maxAmountEnemiesPass = 30;
        this.amountEnemiesPass = 0;
        this.isGameOver = false;
        this.gameOverMaskClass = document.getElementById('game-over_mask').className;

        this._frame();
    }

    _frame() {
        let now = Date.now();
        this.date = (now - this.lastTime) / 1000;

        this._update();
        this._render();

        if (this.isGameOver) {
            return;
        }

        this.lastTime = now;
        requestAnimationFrame(this._frame.bind(this)); //bind от потери контекста (иначе будет в контексте window)
    }

    _update() {
        this.gameTime += this.date;

        this._updateEnemies();

        //if (Math.random() < 1 - Math.pow(.993, this.gameTime)) {
        //    this.enemies.push(new app.enemy(document.getElementById('canvas').width, 100));
        //}
        if (this.enemies.length < 1) {
            this.enemies.push(new app.enemy(document.getElementById('canvas').width, 100));
        }

        this._checkCollisions();
    }

    _updateEnemies() {
        for(let i=0; i<this.enemies.length; i++) {
            this.enemies[i].x -= this.enemySpeed * this.date;
            console.log(this.enemies[i].x);

            if ((this.enemies[i].x + this.enemySize) < 0) {
                this.enemies.splice(i, 1);
                i--;
                this.amountEnemiesPass++;
            }
        }
    }

    _checkCollisions() {
        this._checkEnemiesMaxPass();

        // Run collision detection for all enemies and shells

    }

    _checkEnemiesMaxPass() {
        if (this.amountEnemiesPass === this.maxAmountEnemiesPass) {
            this._gameOver();
        }
    }

    _render() {
        // это очень плохо, переделать. особенно чтобы каждый раз не создавать нового enemy что передвинуть.
        // насколько я понял, здесь происходит наложение и поэтому видно как враг движется.
        // разобраться с трансформированием, сохранением,...
        app.context.drawImage(app.data.get('img/bglevel-1.png'), 0, 0);
        app.context.drawImage(app.data.get('img/towers.png'), 40, 160);
        new app.enemy(this.enemies[0].x, 100);
    }

    _gameOver() {
        this.gameOverMaskClass = `${this.gameOverMaskClass} show`;
        this.isGameOver = true;
    }

};