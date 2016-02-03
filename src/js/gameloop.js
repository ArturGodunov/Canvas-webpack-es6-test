'use strict';

export default class GameLoop {

    constructor(lastTime) {
        this.canvasWidth = document.getElementById('canvas').offsetWidth;
        this.canvasHeight = document.getElementById('canvas').offsetHeight;
        this.gameOverMaskClass = document.getElementById('game-over_mask').className;
        this.gameTime = 0;
        this.lastTime = lastTime;
        this.towers = [];
        this.shells = [];
        this.enemies = [];
        this.amountEnemies = 1;
        this.maxAmountEnemiesPass = 30;
        this.amountEnemiesPass = 0;
        this.isGameOver = false;

        this._frame();
    }

    _frame() {
        let now = Date.now();
        this.date = (now - this.lastTime) / 1000;

        // пока хардкордно добавляю 1 башню.
        // потом сдлелать метод добавления башень.
        if (this.towers < 1) {
            this.towers.push(new app.tower(340, 160, 100));
        }

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
        this._updateShells();

        //if (Math.random() < 1 - Math.pow(.993, this.gameTime)) {
        //    this.enemies.push(new app.enemy(document.getElementById('canvas').width, 100));
        //}
        if (this.enemies.length < this.amountEnemies) {
            this.enemies.push(new app.enemy(document.getElementById('canvas').width, 100, 50, 100));
        }

        this._checkCollisions();
    }

    _updateEnemies() {
        for (let i=0; i<this.enemies.length; i++) {
            this.enemies[i].move(this.date);

            if ((this.enemies[i].x + this.enemies[i].size) < 0) {
                this.enemies.splice(i, 1);
                i--;
                this.amountEnemiesPass++;
            }
        }
    }

    _updateShells() {
        for (let i=0; i<this.shells.length; i++) {
            this.shells[i].move(this.date);

            if (this.shells[i].centerX < 0 || this.shells[i].centerX > this.canvasWidth ||
                this.shells[i].centerY < 0 || this.shells[i].centerY > this.canvasHeight) {
                this.shells.splice(i, 1);
                i--;
            }
        }
    }

    _checkCollisions() {
        this._checkEnemiesMaxPass();
        this._checkIntersectionCircles();

        // Run collision detection for all enemies and shells!!!!!!!!!!!!!!!!!!!!!!!!!!!

    }

    _checkEnemiesMaxPass() {
        if (this.amountEnemiesPass === this.maxAmountEnemiesPass) {
            this._gameOver();
        }
    }

    _checkIntersectionCircles() {
        for (let i=0; i<this.towers.length; i++) {
            for (let j=0; j<this.enemies.length; j++) {
                let a = Math.pow(this.enemies[j].centerX  - this.towers[i].centerX, 2) +
                        Math.pow(this.enemies[j].centerY  - this.towers[i].centerY, 2),
                    b = Math.pow(this.towers[i].radius, 2);
                if (a <= b) {
                    console.log(`Enemy ${j} inside radius of tower ${i}`);
                    //debugger;
                    if (this.shells.length < 1) {
                        this.shells.push(new app.shell(
                            this.towers[i].centerX, this.towers[i].centerY,
                            this.enemies[j].centerX, this.enemies[j].centerY,
                            200, 20, 50
                            ));
                    }
                }
            }
        }
    }

    _render() {
        app.context.clearRect(0,0,this.canvasWidth,this.canvasHeight);

        app.context.drawImage(app.data.get('img/bglevel-1.png'), 0, 0); // пока хардкорно отрисовывается первый уровень

        for (let i=0; i<this.towers.length; i++) {
            this.towers[i].draw();
        }

        for (let i=0; i<this.enemies.length; i++) {
            //console.log(this.enemies[i].centerX, this.enemies[i].centerY);
            this.enemies[i].draw();
        }

        for (let i=0; i<this.shells.length; i++) {
            this.shells[i].draw();
        }
    }

    _gameOver() {
        this.gameOverMaskClass = `${this.gameOverMaskClass} show`;
        this.isGameOver = true;
    }

};