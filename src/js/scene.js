'use strict';

export default class Scene {

    constructor() {
        this.canvas = document.getElementById('canvas');
        this.context = this.canvas.getContext('2d');
    }

    onload(sceneNumber){
        this.bgImg = new Image();
        this.bgImg.src = `img/scene-${sceneNumber}.jpg`;
        this.bgImg.onload = () => this.context.drawImage(this.bgImg, 0, 0);
    }
};