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
        this.explosions = [];
        this.amountEnemies = 1; //общее кол-во врагов на карте
        this.maxAmountEnemiesPass = 30; // допустимое max кол-во пропущенных врагов
        this.amountEnemiesPass = 0; // начальное кол-во пропущенных врагов
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
        this._updateExplosions();

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

    _updateExplosions() {
        // с каждым кадром this.amountFramesLive++
        // если макс, то сплайс
    }

    _checkCollisions() {
        this._checkEnemiesMaxPass();
        this._checkIntersectionCircles();
        this._checkCollisionsEnemiesShells();
    }

    _checkEnemiesMaxPass() {
        if (this.amountEnemiesPass === this.maxAmountEnemiesPass) {
            this._gameOver();
        }
    }

    _checkIntersectionCircles() {
        for (let i=0; i<this.towers.length; i++) {
            for (let j=0; j<this.enemies.length; j++) {
                let enemyCenterX = this.enemies[j].centerX,
                    enemyCenterY = this.enemies[j].centerY,
                    towerCenterX = this.towers[i].centerX,
                    towerCenterY = this.towers[i].centerY,
                    a = Math.pow(enemyCenterX - towerCenterX, 2) + Math.pow(enemyCenterY - towerCenterY, 2),
                    b = Math.pow(this.towers[i].radius, 2);
                if (a <= b) {
                    //console.log(`Enemy ${j} inside radius of tower ${i}`);
                    //debugger;
                    if (this.shells.length < 1) {
                        this.shells.push(
                            new app.shell(towerCenterX, towerCenterY, enemyCenterX, enemyCenterY, 200, 20, 50)
                        );
                    }
                }
            }
        }
    }

    _checkCollisionsEnemiesShells() {
        for (let i=0; i<this.enemies.length; i++) {
            for (let j=0; j<this.shells.length; j++) {
                let shellCenterX = this.shells[j].centerX,
                    shellCenterY = this.shells[j].centerY,
                    enemyCenterX = this.enemies[i].centerX,
                    enemyCenterY = this.enemies[i].centerY,
                    a = Math.pow(enemyCenterX - shellCenterX, 2) + Math.pow(enemyCenterY - shellCenterY, 2),
                    b = Math.pow(this.enemies[i].size + this.shells[j].size, 2) / 4;
                if (a <= b) {
                    this.explosions.push(new app.explosion(enemyCenterX, enemyCenterY));
                    this.enemies.splice(i, 1);
                    i--;
                    this.shells.splice(j, 1);
                    j--;
                    break;
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

        for (let i=0; i<this.explosions.length; i++) {
            this.explosions[i].draw();
        }
    }

    _gameOver() {
        this.gameOverMaskClass = `${this.gameOverMaskClass} show`;
        this.isGameOver = true;
    }

};