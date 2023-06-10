const MOUSE = {
    x: 0, 
    y: 0,
    isClick: false,
    isContext: false,
    isWheel: false,
    isWheelUp: false,
    isWheelDown: false,
};

document.onmousemove = (event) => {
    MOUSE.x = event.pageX;
    MOUSE.y = event.pageY;
};

document.oncontextmenu = (event) => event.preventDefault();

document.onmousedown = (event) => {
    switch(event.button) {
        case 0 : MOUSE.isClick  = true; break;
        case 1 : MOUSE.isWheel = true; break;
        case 2 : MOUSE.isContext = true; break;
    }
}

document.onmouseup = (event) => {
    switch(event.button) {
        case 0 : MOUSE.isClick  = false; break;
        case 1 : MOUSE.isWheel = false; break;
        case 2 : MOUSE.isContext = false; break;
    }
}

document.onwheel = (event) => {
    event.preventDefault();
    if (event.deltaY > 0) MOUSE.isWheelDown = true;
    if (event.deltaY < 0) MOUSE.isWheelUp = true;
};

export default MOUSE;