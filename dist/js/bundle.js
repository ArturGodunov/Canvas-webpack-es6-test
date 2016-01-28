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

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var context = document.getElementById('canvas').getContext('2d'),
	    data = new _data2.default();

	data.load(['img/enemies.png', 'img/towers.png', 'img/bglevel-1.png']);

	data.onReady(_init2.default.startInit);

	exports.context = context;
	exports.data = data;
	exports.gameLoop = _gameloop2.default;

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

	        this.lastTime = lastTime;

	        this._frame();
	    }

	    _createClass(GameLoop, [{
	        key: '_frame',
	        value: function _frame() {
	            //this.now = Date.now();
	            //this.date = (this.now - this.lastTime) / 1000;

	            //this._update();
	            this._render();

	            //this.lastTime = this.now;
	            //requestAnimationFrame(this._frame());
	        }
	    }, {
	        key: '_update',
	        value: function _update() {}
	    }, {
	        key: '_render',
	        value: function _render() {
	            app.context.drawImage(app.data.get('img/bglevel-1.png'), 0, 0);
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

/***/ }
/******/ ]);