'use strict';

export default class Data {

    constructor() {
        this.cache = {};
        this.readyCallBacks = [];
    }

    load(urlOrArr) {
        if (urlOrArr instanceof Array) {
            urlOrArr.forEach(function(url) {
                this._load(url);
            });
        } else {
            this._load(urlOrArr);
        }
    }

    _load(url) {
        if (this.cache[url]) {
            return cache[url];
        } else {
            let img = new Image();
            img.onload = () => {
                this.cache[url] = img;

                if (this._isReady()) {
                    this.readyCallBacks.forEach(function(func) {
                        func();
                    });
                }
            };
            this.cache[url] = false;
            img.src = url;
        }
    }

    get(url) {
        return this.cache[url];
    }

    _isReady() {
        let ready = true;
        for (let key in this.cache) {
            if (this.cache.hasOwnProperty(key) && !this.cache[key]) {
                ready = false;
            }
        }
        return ready;
    }

    onReady(func) {
        this.readyCallBacks.push(func);
    }

};