// класс создания текстовых объектов
// (x и y - координаты верхнего левого угла отображаемого текста)
class Text {
    constructor(text = '', x = 0, y = 0, options ) {
        this.x = x;
        this.y = y;
        this.size = options.size || 24;
        this.font = options.font || 'Arial';
        this.color = options.color || '#00ff00';
        this.align = options.align || 'left';
        
        this.fillTextX = 0;
        this.drawTextX = x;

        this.img = document.createElement('canvas');
        this.ctx = this.img.getContext('2d');
        this.img.width = this.getTextWidth(text);
        this.img.height = this.size;

        this.render(text);
    }

    // определение ширины текста
    getTextWidth(text) {
        this.ctx.font = `${this.size}px ${this.font}, Arial, sans-serif`;
        return this.ctx.measureText(text).width;
    }

    // преобразования текста в изображение, для оптимизации производительности
    render(text) {
        this.ctx.clearRect(0, 0, this.img.width, this.img.height);

        this.img.width =  this.getTextWidth(text);

        // test rect
        /*
        this.ctx.strokeStyle = '#ffff00';
        this.ctx.lineWidth = 2;
        this.ctx.rect(1, 1, this.img.width - 1, this.img.height - 1);
        this.ctx.stroke();
        */

        if (this.align !== 'left') {
            switch(this.align) {
                case 'right':
                    this.fillTextX = this.img.width;
                    this.drawTextX = this.x - this.img.width;
                    break;
                case 'center':
                    this.fillTextX = Math.floor(this.img.width / 2);
                    this.drawTextX = this.x - Math.floor(this.img.width / 2);
                    break;
                default /* left */ :
                    this.align = 'left';
            }
        }
        this.ctx.font = `${this.size}px ${this.font}, Arial, sans-serif`;
        this.ctx.textBaseline = 'top';
        this.ctx.textAlign = this.align;
        this.ctx.fillStyle = this.color;
        this.ctx.fillText(text, this.fillTextX, 0);
    }

    // отрисовка изображения с текстом
    draw(context) {
        context.drawImage( this.img, this.drawTextX, this.y);
    }
}

export default Text;