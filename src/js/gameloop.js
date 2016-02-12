'use strict';

/** Class representing game loop.*/
export default class GameLoop {

    /**
     * Create game loop.
     * @param {number} lastTime - Timestamp of starting game loop.
     * @param {number} levelNumber.
     * */
    constructor(lastTime, levelNumber) {
        this.canvasWidth = document.getElementById('canvas').offsetWidth;
        this.canvasHeight = document.getElementById('canvas').offsetHeight;
        this.levelNumber = levelNumber;
        this.gameTime = 0;
        this.lastTime = lastTime;
        this.enemyDirecrions = [];
        this.enemySteps = [];
        this.towers = [];
        this.shells = [];
        this.enemies = [];
        this.explosions = [];
        this.amountEnemies = 0; /** Amount enemies on map.*/
        this.maxAmountEnemies = 10; /** Max amount enemies on map.*/
        this.maxAmountEnemiesPass = 2; /** Max amount enemies passing map.*/
        this.amountEnemiesPass = 0; /** Amount enemies passing map.*/
        this.timeAddEnemy = 1; /** Time to adding first enemy.*/
        this.isGameOver = false;

        this.startLevel();
    }

    startLevel() {
        this.map = new app.map(this.levelNumber);

        for (let i=0; i<this.map.level.length; i++) {
            if (i % 2 === 0) {
                this.enemyDirecrions.push(this.map.level[i]);
            } else {
                this.enemySteps.push(this.map.level[i]);
            }
        }

        this._frame();
    }

    _frame() {
        let now = Date.now();
        this.incrementDate = (now - this.lastTime) / 1000;

        this._update();
        this._render();

        if (this.isGameOver) {
            return;
        }

        this.lastTime = now;
        requestAnimationFrame(this._frame.bind(this)); /** Bind the context of this class, else the context will be 'window'.*/
    }

    _update() {
        this.gameTime += this.incrementDate;

        this._updateEnemies();
        this._updateShells();
        this._updateExplosions();

        /**
         * Create new towers.
         *
         * @todo Create method of adding towers.
         * */
        if (this.towers < 2) {
            /**
             * @param {number} x - In pixels.
             * @param {number} y - In pixels.
             * @param {number} radius - In pixels.
             * @param {number} rate - Time to next shoot.
             * */
            this.towers.push(new app.tower(340, 160, 100, 1));
            this.towers.push(new app.tower(100, 100, 100, 1));
        }

        /**
         * Add new enemies.
         * */
        if (this.amountEnemies < this.maxAmountEnemies) {
            if (this.gameTime > this.timeAddEnemy) {
                /**
                 * @param {number} centerX - In pixels.
                 * @param {number} centerY - In pixels.
                 * @param {number} speed - In pixels per second.
                 * @param {number} health.
                 * @param {Array} steps - Transfer the array by value.
                 *
                 * @todo Create universal start point.
                 * */
                //this.enemies.push(new app.enemy(this.canvasWidth, 100, 50, 100, [].concat(this.enemySteps)));
                this.amountEnemies++;
                this.timeAddEnemy += 1;  /** Time to adding next enemy.*/
            }
        }

        this._checkCollisions();
    }

    _updateEnemies() {
        for (let i=0; i<this.enemies.length; i++) {
            this.enemies[i].move(
                this.incrementDate, this.enemyDirecrions[this.enemies[i].passedPoints]
            );
            /**
             * Passing points.
             * */
            if (this.enemies[i].steps[this.enemies[i].passedPoints] <= 0) {
                this.enemies[i].passedPoints++;
            }

            /**
             * @todo Create delete enemy when he pass the map.
             * */
            if (this.enemyDirecrions[this.enemyDirecrions.length - 1] === 'left' && (this.enemies[i].x + this.enemies[i].size) < 0) {
                this.enemies.splice(i, 1);
                i--;
                this.amountEnemiesPass++;
            }
        }
    }

    _updateShells() {
        for (let i=0; i<this.shells.length; i++) {
            this.shells[i].move(this.incrementDate);

            if (this.shells[i].centerX < 0 || this.shells[i].centerX > this.canvasWidth ||
                this.shells[i].centerY < 0 || this.shells[i].centerY > this.canvasHeight) {
                this.shells.splice(i, 1);
                i--;
            }
        }
    }

    _updateExplosions() {
        for (let i=0; i<this.explosions.length; i++) {
            this.explosions[i].amountFramesDrawing++;
            if (this.explosions[i].amountFramesDrawing === this.explosions[i].maxAmountFramesDrawing) {
                this.explosions.splice(i, 1);
                i--;
            }
        }
    }

    _checkCollisions() {
        this._checkEnemiesMaxPass();
        this._checkCrossingCircles();
        this._checkCollisionsEnemiesShells();
    }

    _checkEnemiesMaxPass() {
        if (this.amountEnemiesPass >= this.maxAmountEnemiesPass) {
            this._gameOver();
        }
    }

    _checkCrossingCircles() {
        for (let i=0; i<this.towers.length; i++) {
            for (let j=0; j<this.enemies.length; j++) {
                let enemyCenterX = this.enemies[j].centerX,
                    enemyCenterY = this.enemies[j].centerY,
                    towerCenterX = this.towers[i].centerX,
                    towerCenterY = this.towers[i].centerY,
                    a = Math.pow(enemyCenterX - towerCenterX, 2) + Math.pow(enemyCenterY - towerCenterY, 2),
                    b = Math.pow(this.towers[i].radius, 2);
                if (a <= b) {
                    if (this.towers[i].timeDetectionFirstEnemy === 0) {
                        this.towers[i].timeDetectionFirstEnemy = this.gameTime;
                    }
                    if (this.gameTime > this.towers[i].timeDetectionFirstEnemy + this.towers[i].timeNextShoot) {
                        /**
                         * @param {number} towerCenterX - In pixels.
                         * @param {number} towerCenterY - In pixels.
                         * @param {number} enemyCenterX - In pixels.
                         * @param {number} enemyCenterY - In pixels.
                         * @param {number} speed - In pixels per second.
                         * @param {number} size - In pixels.
                         * @param {number} damage.
                         * */
                        this.shells.push(
                            new app.shell(towerCenterX, towerCenterY, enemyCenterX, enemyCenterY, 200, 10, 50)
                        );
                        this.towers[i].timeNextShoot += this.towers[i].rate;
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
                    this.enemies[i].health -= this.shells[j].damage;
                    if (this.enemies[i].health <= 0) {
                        /**
                         * @param {number} enemyCenterX.
                         * @param {number} enemyCenterY.
                         * */
                        this.explosions.push(new app.explosion(enemyCenterX, enemyCenterY));
                        this.enemies.splice(i, 1);
                        i--;
                    }
                    this.shells.splice(j, 1);
                    j--;
                    break;
                }
            }
        }
    }

    _render() {
        /**
         * Clear canvas before all rendering.
         * */
        app.context.clearRect(0,0,this.canvasWidth,this.canvasHeight);

        this.map.draw();

        for (let i=0; i<this.towers.length; i++) {
            this.towers[i].draw();
        }

        for (let i=0; i<this.enemies.length; i++) {
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
        document.getElementById('game-over_mask').classList.add('show');
        this.isGameOver = true;
    }

};