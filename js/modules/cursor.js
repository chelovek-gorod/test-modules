const CURSOR = {
    x: 0, 
    y: 0,
    isClick: false,
    /*
    isRightClick: false,
    isWheelClick: false,
    isWheelUp: false,
    isWheelDown: false,
    */
};

document.onclick = () => CURSOR.isClick = true;

document.onmousemove = (event) => {
    CURSOR.x = event.pageX;
    CURSOR.y = event.pageY;
};

/*
document.oncontextmenu = (event) => event.preventDefault();

document.onmousedown = (event) => {
    switch(event.button) {
        case 1 : CURSOR.isWheelClick = true; break;
        case 2 : CURSOR.isRightClick = true; break;
    }
}

document.onmouseup = (event) => {
    switch(event.button) {
        case 1 : CURSOR.isWheelClick = false; break;
        case 2 : CURSOR.isRightClick = false; break;
    }
}

document.onwheel = (event) => {
    event.preventDefault();
    if (event.deltaY > 0) CURSOR.isWheelDown = true;
    if (event.deltaY < 0) CURSOR.isWheelUp = true;
};
*/

export default CURSOR;