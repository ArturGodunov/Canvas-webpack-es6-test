'use strict';

/** Class representing resources.*/
export default class Data {

    /**
     * Create data.
     * */
    constructor() {
        this.cache = {};
        this.readyCallBacks = [];
        /**
         * @todo When create start point, think about first/last step.
         * */
        this.levels = [
            [
                'left', 200,
                'down', 200,
                'left', 200,
                'up',   100,
                'left', 220
            ]
        ];
    }

    /**
     * Call the method _load, witch load images.
     * @param {string|Array} urlOrArr - Take one url or array of urls.
     * */
    load(urlOrArr) {
        if (urlOrArr instanceof Array) {
            urlOrArr.forEach(
                (url) => { this._load(url);}
            );
        } else {
            this._load(urlOrArr);
        }
    }

    /**
     * Load images into cache and add callbacks into array.
     * @param {string} url - Contain one url.
     * */
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

    /**
     * Get image.
     * @param {string} url - Contain one url.
     * @return {Image} Image object.
     * */
    get(url) {
        return this.cache[url];
    }

    /**
     * Check that all images are loaded.
     * @return {boolean} Ready status.
     * */
    _isReady() {
        let ready = true;
        for (let key in this.cache) {
            if (this.cache.hasOwnProperty(key) && !this.cache[key]) {
                ready = false;
            }
        }
        return ready;
    }

    /**
     * Put callbacks into array.
     * @param {requestCallback} func - Callback run after loading all images.
     * */
    onReady(func) {
        this.readyCallBacks.push(func);
    }

};