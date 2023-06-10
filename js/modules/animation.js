let update = null;

let isShowFPS = true;
let frameCounter = 0;

function setUpdateCallback( callback ) {
    update = callback;
}

// Активно ли игровое окно (вкладка браузера)
let isOnfocus = true; 

// Временная метка запуска игрового цикла
let previousTimeStamp = performance.now();

// Если окно не активно - остановить анимацию
window.onblur = function() {
    isOnfocus = false;
    console.log('screen onblur');
};
// Если окно активно - запустить анимацию
window.onfocus = function() {
    isOnfocus = true;
    previousTimeStamp = performance.now();
    requestAnimationFrame ( animation );
    console.log('screen onfocus');
}

// функция анимации
// (принимает количество миллисекунд с момента запуска программы)
function animation(timeStamp) {
    // расчет интервала между обновлениями экрана
    const dt = timeStamp - previousTimeStamp;
    previousTimeStamp = timeStamp;

    if (update) update(dt);

    // повторный запуск анимации, если акно активно
    if (isOnfocus) requestAnimationFrame( animation );
}

requestAnimationFrame( animation );

export default setUpdateCallback;