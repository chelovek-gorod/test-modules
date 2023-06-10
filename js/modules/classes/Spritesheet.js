// класс создания объектов с изображениями покадровой анимации
// (x и y - координаты центра отображаемого изображения)
// (fw и fh - ширина и высота одного кадра)
// (frames - число кадров анимации, содержащихся в изображении)
// (fps - скорость обновления кадров за одну секунду)
export class Spritesheet {
    constructor(imageName, x, y, fw, fh, frames, fps = 60) {
        this.img = IMG[imageName];
        this.x = x;
        this.y = y;
        this.w = fw;
        this.h = fh;
        this.hw = Math.floor(this.w / 2);
        this.hh = Math.floor(this.h / 2);
        
        this.framesArr = this.getFramesArr(fw, fh, frames);
        this.frame = 0
        this.frames = frames;
        this.nextFrame = Math.floor(1000 / fps);
        this.nextFrameTimeout = this.nextFrame;

        this.direction = 0;
    }

    // получение массива координат кадров изображения
    getFramesArr(fw, fh, frames) {
        const framesArr = [];
        for( let yy = 0; yy < this.img.height; yy += fh) {
            for( let xx = 0; xx < this.img.width; xx += fw) {
                framesArr.push( {x: xx, y: yy} );
            }
        }
        framesArr.length = frames;
        return framesArr;
    }

    // отрисовка кадра с учетом скорости анимации
    drawWithAnimation(context, dt) {
        this.nextFrameTimeout -= dt
        if (this.nextFrameTimeout < 0) {
            this.nextFrameTimeout += this.nextFrame;
            this.frame++;
            if (this.frame === this.frames) this.frame = 0;
        }

        if (this.direction === 0) this.draw(context);
        else {
            context.setTransform(1, 0, 0, 1, this.x, this.y);
            context.rotate(this.direction);
            this.draw(context, -this.hw, -this.hh);
            context.setTransform(1, 0, 0, 1, 0, 0);
        }
    }

    // отрисовка текущего кадра
    draw(context, pointX = this.x - this.hw, pointY = this.y - this.hh) {
        context.drawImage(
            this.img,
            this.framesArr[this.frame].x, this.framesArr[this.frame].y, 
            this.w, this.h,
            pointX, pointY,
            this.w, this.h
        );
    }
}

export default Spritesheet;