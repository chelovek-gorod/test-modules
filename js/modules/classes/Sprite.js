// класс создания объектов со статичными изображениями
// (x и y - координаты центра отображаемого изображения)
class Sprite {
    constructor(imageName, x, y) {
        this.img = IMG[imageName];
        this.x = x;
        this.y = y;
        this.w = this.img.width;
        this.h = this.img.height;
        this.hw = Math.floor(this.w / 2);
        this.hh = Math.floor(this.h / 2);

        this.direction = 0;
    }

    // отрисовка изображения
    draw(context) {
        if (this.direction === 0) context.drawImage( this.img, this.x - this.hw,  this.y - this.hh);
        else {
            context.setTransform(1, 0, 0, 1, this.x, this.y);
            context.rotate(this.direction);
            context.drawImage(this.img, -this.hw, -this.hh);
            context.setTransform(1, 0, 0, 1, 0, 0);
        }
    }
}

export default Sprite;