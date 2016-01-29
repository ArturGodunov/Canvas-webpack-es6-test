var app =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _gameloop = __webpack_require__(1);

	var _gameloop2 = _interopRequireDefault(_gameloop);

	var _data = __webpack_require__(2);

	var _data2 = _interopRequireDefault(_data);

	var _init = __webpack_require__(3);

	var _init2 = _interopRequireDefault(_init);

	var _enemy = __webpack_require__(4);

	var _enemy2 = _interopRequireDefault(_enemy);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var context = document.getElementById('canvas').getContext('2d'),
	    data = new _data2.default();

	data.load(['img/enemies.png', 'img/towers.png', 'img/shells.png', 'img/bglevel-1.png']);

	data.onReady(_init2.default.startInit);

	exports.context = context;
	exports.data = data;
	exports.gameLoop = _gameloop2.default;
	exports.enemy = _enemy2.default;

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var GameLoop = function () {
	    function GameLoop(lastTime) {
	        _classCallCheck(this, GameLoop);

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

	    _createClass(GameLoop, [{
	        key: '_frame',
	        value: function _frame() {
	            var now = Date.now();
	            this.date = (now - this.lastTime) / 1000;

	            this._update();
	            this._render();

	            if (this.isGameOver) {
	                return;
	            }

	            this.lastTime = now;
	            requestAnimationFrame(this._frame.bind(this)); //bind от потери контекста (иначе будет в контексте window)
	        }
	    }, {
	        key: '_update',
	        value: function _update() {
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
	    }, {
	        key: '_updateEnemies',
	        value: function _updateEnemies() {
	            for (var i = 0; i < this.enemies.length; i++) {
	                this.enemies[i].x -= this.enemySpeed * this.date;
	                console.log(this.enemies[i].x);

	                if (this.enemies[i].x + this.enemySize < 0) {
	                    this.enemies.splice(i, 1);
	                    i--;
	                    this.amountEnemiesPass++;
	                }
	            }
	        }
	    }, {
	        key: '_checkCollisions',
	        value: function _checkCollisions() {
	            this._checkEnemiesMaxPass();

	            // Run collision detection for all enemies and shells
	        }
	    }, {
	        key: '_checkEnemiesMaxPass',
	        value: function _checkEnemiesMaxPass() {
	            if (this.amountEnemiesPass === this.maxAmountEnemiesPass) {
	                this._gameOver();
	            }
	        }
	    }, {
	        key: '_render',
	        value: function _render() {
	            // это очень плохо, переделать. особенно чтобы каждый раз не создавать нового enemy что передвинуть.
	            // насколько я понял, здесь происходит наложение и поэтому видно как враг движется.
	            // разобраться с трансформированием, сохранением,...
	            app.context.drawImage(app.data.get('img/bglevel-1.png'), 0, 0);
	            app.context.drawImage(app.data.get('img/towers.png'), 40, 160);
	            new app.enemy(this.enemies[0].x, 100);
	        }
	    }, {
	        key: '_gameOver',
	        value: function _gameOver() {
	            this.gameOverMaskClass = this.gameOverMaskClass + ' show';
	            this.isGameOver = true;
	        }
	    }]);

	    return GameLoop;
	}();

	exports.default = GameLoop;
	;

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Data = function () {
	    function Data() {
	        _classCallCheck(this, Data);

	        this.cache = {};
	        this.readyCallBacks = [];
	    }

	    _createClass(Data, [{
	        key: 'load',
	        value: function load(urlOrArr) {
	            var _this = this;

	            if (urlOrArr instanceof Array) {
	                urlOrArr.forEach(function (url) {
	                    _this._load(url);
	                });
	            } else {
	                this._load(urlOrArr);
	            }
	        }
	    }, {
	        key: '_load',
	        value: function _load(url) {
	            var _this2 = this;

	            if (this.cache[url]) {
	                return cache[url];
	            } else {
	                (function () {
	                    var img = new Image();
	                    img.onload = function () {
	                        _this2.cache[url] = img;

	                        if (_this2._isReady()) {
	                            _this2.readyCallBacks.forEach(function (func) {
	                                func();
	                            });
	                        }
	                    };
	                    _this2.cache[url] = false;
	                    img.src = url;
	                })();
	            }
	        }
	    }, {
	        key: 'get',
	        value: function get(url) {
	            return this.cache[url];
	        }
	    }, {
	        key: '_isReady',
	        value: function _isReady() {
	            var ready = true;
	            for (var key in this.cache) {
	                if (this.cache.hasOwnProperty(key) && !this.cache[key]) {
	                    ready = false;
	                }
	            }
	            return ready;
	        }
	    }, {
	        key: 'onReady',
	        value: function onReady(func) {
	            this.readyCallBacks.push(func);
	        }
	    }]);

	    return Data;
	}();

	exports.default = Data;
	;

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Init = function () {
	    function Init() {
	        _classCallCheck(this, Init);

	        this._playAgain();
	        this._reset();
	        this._gameLoop();
	    }

	    _createClass(Init, [{
	        key: '_playAgain',
	        value: function _playAgain() {
	            document.getElementById('play-again').addEventListener('click', function () {
	                this._reset();
	            });
	        }
	    }, {
	        key: '_reset',
	        value: function _reset() {}
	    }, {
	        key: '_gameLoop',
	        value: function _gameLoop() {
	            new app.gameLoop(Date.now());
	        }
	    }], [{
	        key: 'startInit',
	        value: function startInit() {
	            new Init();
	        }
	    }]);

	    return Init;
	}();

	exports.default = Init;
	;

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Enemy = function () {
	    function Enemy(x, y) {
	        _classCallCheck(this, Enemy);

	        this.x = x;
	        this.y = y;

	        this._appear();
	    }

	    _createClass(Enemy, [{
	        key: '_appear',
	        value: function _appear() {
	            app.context.drawImage(app.data.get('img/enemies.png'), this.x, this.y);
	        }
	    }, {
	        key: 'die',
	        value: function die() {}
	    }]);

	    return Enemy;
	}();

	exports.default = Enemy;
	;

/***/ }
/******/ ]);