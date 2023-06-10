function loader( imagesArr, imagesPath, soundsArr, soundsPath, callback) {
    // объект для хранения загруженных изображенийи
    const IMG = {/* game images */};
    // объект для хранения загруженных звуков
    const SE = {/* sound effects */};

    // счетчик количества загруженных игровых ресурсов
    let uploadSize = imagesArr.length + soundsArr.length;
    let uploadStep = 0;

    // отображения состояния загрузки игровых ресурсов
    const LOADING_STATUS_DIV = document.createElement('div');
    LOADING_STATUS_DIV.id = 'loadingStatusDiv';
    LOADING_STATUS_DIV.innerHTML = 'Loaded files: ' + uploadStep + '/' + uploadSize;
    document.body.append(LOADING_STATUS_DIV);

    // загрузка игровых ресурсов
    imagesArr.forEach( data => uploadImage(data) );
    soundsArr.forEach( data => uploadSound(data) );

    // функция загрузки изображений
    function uploadImage(image_name) {
        IMG[image_name] = new Image();
        IMG[image_name].src = imagesPath + image_name;
        IMG[image_name].onload = () => updateLoadingProgress();
    }

    // функция загрузки звуков
    function uploadSound(sound_name) {
        SE[sound_name] = new Audio();
        SE[sound_name].src = soundsPath + sound_name;
        SE[sound_name].oncanplaythrough = (event) => {
            event.target.oncanplaythrough = null; /* don't play */
            updateLoadingProgress();
        };
    }

    // функция обновления отображаемого состояния загрузки игровых ресурсов
    function updateLoadingProgress() {
        uploadStep++;
        LOADING_STATUS_DIV.innerHTML = 'Загружено: ' + uploadStep + '/' + uploadSize;
        if (uploadStep === uploadSize) loadingDone();
    }

    // функция окончания загрузки всех игровых ресурсов
    function loadingDone() {
        LOADING_STATUS_DIV.remove();
        const START_BUTTON = document.createElement('button');
        START_BUTTON.id = 'startButton';
        START_BUTTON.innerHTML = 'START';
        START_BUTTON.onclick = function() {
            START_BUTTON.remove();
            callback({images: IMG, sounds: SE});
        };
        document.body.append(START_BUTTON);
    }
}

export default loader;