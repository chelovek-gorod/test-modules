const TOUCH = {
    x: 0, 
    y: 0,
    isClick: false,
};

document.addEventListener('touchstart', function(event) {
    const touch = event.touches[0];
    TOUCH.x = touch.pageX;
    TOUCH.y = touch.pageY;
    TOUCH.isClick = true;
});
document.addEventListener('touchmove', function(event) {
    const touch = event.touches[0];
    TOUCH.x = touch.pageX;
    TOUCH.y = touch.pageY;
});
document.addEventListener('touchend', function(event) {
    TOUCH.isClick = false;
});

export default TOUCH;