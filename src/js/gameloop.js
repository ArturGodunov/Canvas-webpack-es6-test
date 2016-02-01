'use strict';

export default class GameLoop {

    constructor(lastTime) {
        this.canvasWidth = document.getElementById('canvas').offsetWidth;
        this.canvasHeight = document.getElementById('canvas').offsetHeight;
        this.gameTime = 0;
        this.lastTime = lastTime;
        this.enemies = [];
        this.enemySpeed = 50; // Speed in pixels per second
        this.enemySize = 40;
        this.amountEnemies = 1;
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
        if (this.enemies.length < this.amountEnemies) {
            this.enemies.push(new app.enemy(document.getElementById('canvas').width, 100));
        }

        this._checkCollisions();
    }

    _updateEnemies() {
        for (let i=0; i<this.enemies.length; i++) {
            this.enemies[i].x -= this.enemySpeed * this.date;

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
        app.context.clearRect(0,0,this.canvasWidth,this.canvasHeight);

        app.context.drawImage(app.data.get('img/bglevel-1.png'), 0, 0); // пока хардкорно отрисовывается первый уровень
        new app.tower(40, 160);  //пока хардкорно отрисовывается одна башня

        for (let i=0; i<this.enemies.length; i++) {
            console.log(this.enemies[i].x, this.enemies[i].y);
            this.enemies[i].draw();
            app.context.save();
            app.context.translate(this.enemies[i].x - this.canvasWidth, 0);
            app.context.restore();
        }
    }

    _gameOver() {
        this.gameOverMaskClass = `${this.gameOverMaskClass} show`;
        this.isGameOver = true;
    }

};