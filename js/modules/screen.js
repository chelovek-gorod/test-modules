class Screen {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.context = this.canvas.getContext('2d');
        this.width = innerWidth;
        this.height = innerHeight;
        this.centerX = Math.floor(this.width / 2);
        this.centerY = Math.floor(this.height / 2);
        this.updateCanvasSizes();
    }
    
    updateCanvasSizes() {
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.centerX = Math.floor(this.width / 2);
        this.centerY = Math.floor(this.height / 2);
    }    
}

const screen = new Screen();

export default screen;