import loader from './modules/loader.js';
import screen from './modules/screen.js';
import animation from './modules/animation.js';

import Text from './modules/classes/Text.js';

import {
    getExistsObjectsFromArr,
    turnTo,
    getDistance,
    moveTo,
    drawLightning
} from './modules/gameFunctions.js';

import CURSOR from './modules/cursor.js';
import KEY from './modules/keyboard.js';

// Константы для работы с радианами
const _2PI = Math.PI * 2;
const _RAD = Math.PI / 180;

class Circle {
    constructor() {
        this.size = 3;
        this.target = {};
        switch( Math.floor(Math.random() * 4) ) {
            case 0 : /* top */
                this.x = Math.floor(Math.random() * screen.width);
                this.y = -this.size;
                this.target.x = Math.floor(Math.random() * screen.width);
                this.target.y = screen.height + this.size;
            break;

            case 1 : /* right */
                this.x = screen.width + this.size;
                this.y = Math.floor(Math.random() * screen.height);
                this.target.x = -this.size;
                this.target.y = Math.floor(Math.random() * screen.height);
            break;

            case 2 : /* bottom */
                this.x = Math.floor(Math.random() * screen.width);
                this.y = screen.height + this.size;
                this.target.x = Math.floor(Math.random() * screen.width);
                this.target.y = -this.size;
            break;

            default : /* left */
                this.x = -this.size;
                this.y = Math.floor(Math.random() * screen.height);
                this.target.x = screen.width + this.size;
                this.target.y = Math.floor(Math.random() * screen.height);
        }
        switch( Math.floor(Math.random() * 3) ) {
            case 0 : this.color = '#aaffaa'; break;
            case 1 : this.color = '#aaffff'; break;
            default: this.color = '#ffaaff';
        }
        this.speed = 0.2 + Math.random();
        this.minE = 500 + Math.ceil(Math.random() * 500);
        this.E = Math.ceil(Math.random() * this.minE);

        this.isExist = true;
    }

    update(dt) {
        this.E -= dt;
        if (this.E < 0) this.E = this.minE + Math.floor(Math.random() * this.minE);

        // electro
        if (this.E > this.minE) {
            let nearestCircle = null;
            let distanceToNearest = Infinity;
            for(let i = 0; i < circlesArr.length; i++) {
                if (circlesArr[i] !== this) {
                    let distance = getDistance(this, circlesArr[i]);
                    if(!nearestCircle || distance < distanceToNearest) {
                        nearestCircle = circlesArr[i];
                        distanceToNearest = distance;
                    }
                } 
            }
            if (nearestCircle) drawLightning(screen.context, this, nearestCircle, this.color);
        }

        moveTo( this, this.target, this.speed );

        screen.context.beginPath();
        screen.context.arc(this.x, this.y, this.size, 0, _2PI);
        screen.context.fillStyle = this.color;
        screen.context.fill();

        if (getDistance(this, this.target) < 1) this.isExist = false;
    }
}

/*
**  ПРЕДЗАГРУЗКА ИГРОВЫХ РЕСУРСОВ
*/

let imagesSrcMap; // { fileName: Image }
let soundsSrcMap; // { fileName: Audio }

// переменная пути к изображениям
const IMAGES_PATH = './src/images/';
// список загружаемых изображений
const IMAGES_UPLOAD_ARR = [
    'scrolling_bg_2000x3400px.png',
    'black_hole_left_320x320px.png',
    'black_hole_right_320x320px.png',
    'galaxy_1200x800px.png',
    'galaxy_480x420px.png',
    'planets_920x760px.png',

    'player_74x100px_16frames.png',
    'player_bullet_10x40px.png',
    'player_rocket_30x12px.png',
    'player_cursor_48x48px_16frames.png',

    'explosion_200x200px_16frames.png',
    'smoke_32x32px_25frames.png',

    'asteroid_white_90x108px_29frames.png',
    'rock_white_50x50px_8frames.png',

    'enemy_100x130px.png',
    'enemy_bullet_10x40px.png',

    'bonus_empty_48x48px.png',
    'bonus_bullets_48x48px.png',
    'bonus_repair_48x48px.png',
    'bonus_rockets_48x48px.png',
    'bonus_scores_48x48px.png',
    'bonus_speed_48x48px.png',
];

// переменная пути к звукам
const SOUNDS_PATH = './src/sounds/';
// список загружаемых звуков
const SOUNDS_UPLOAD_ARR = [
    'se_explosion.mp3',
    'se_laser_shut.mp3',
    'se_rocket_launch.mp3',
    'se_bonus.mp3',
];

loader(IMAGES_UPLOAD_ARR, IMAGES_PATH, SOUNDS_UPLOAD_ARR, SOUNDS_PATH, init);

const textFPSOptions = {size: 10, font: 'PTSans', align: 'right'};
const textFPS = new Text('FPS', screen.width - 2, screen.height - 12, textFPSOptions);
const updateTimeoutFPS = 500;
let currentTimeFPS = 0;
let frameCounter = 0;
function updateFPS(dt) {
    frameCounter++;
    currentTimeFPS += dt;
    if (currentTimeFPS >= updateTimeoutFPS) {
        const FPS = `FPS: ${((frameCounter / currentTimeFPS) * 1000).toFixed(2)}`;
        textFPS.render(FPS);
        frameCounter = 0;
        currentTimeFPS = 0;
    }
    textFPS.draw(screen.context);
}

function init( loadingData ) {
    // Скрываем курсор мыши
    document.body.style.cursor = 'none';

    imagesSrcMap = loadingData.images;
    soundsSrcMap = loadingData.images;

    document.body.prepend(screen.canvas);

    animation(update);
}

let circlesArr = [];
let circlesOn1Mpx2 = 12;
let maxCircles = 1 + Math.ceil( ((screen.width * screen.height) / 1e6) * circlesOn1Mpx2 );
const textCirclesOnScreenOptions = {size: 10, font: 'PTSans'};
const textCirclesOnScreen = new Text('circles on screen:', 0, screen.height - 12, textCirclesOnScreenOptions);

const textCursorOptions = {size: 10, font: 'PTSans', align: 'center'};
const textCursor = new Text('CURSOR | | (x: 0; y: 0)', Math.floor(screen.width / 2), Math.floor(screen.height / 2), textCursorOptions);
const cursorState = {
    x: CURSOR.x,
    y: CURSOR.y,
    isClick: CURSOR.isClick
};

function testCursorUpdate() {
    let isChanged = false;
    if (CURSOR.x !== cursorState.x) {cursorState.x = CURSOR.x; isChanged = true;}
    if (CURSOR.y !== cursorState.y) {cursorState.y = CURSOR.y; isChanged = true;}
    if (CURSOR.isClick !== cursorState.isClick) {cursorState.isClick = CURSOR.isClick; isChanged = true;}

    if (isChanged) textCursor.render(`CURSOR |${CURSOR.isClick ? '*' : ' '}| (x: ${CURSOR.x}; y: ${CURSOR.y})`);
    textCursor.draw(screen.context);
}

const textKeyOptions = {size: 10, font: 'PTSans', align: 'center'};
const textKey = new Text(' ', Math.floor(screen.width / 2), Math.floor(screen.height / 2) - 12, textKeyOptions);
let keyPressedList = '';

function testKeyUpdate() {
    let currentKeysList = '';
    if (KEY.left) currentKeysList += '<- ';
    if (KEY.right) currentKeysList += '-> ';
    if (KEY.up) currentKeysList += '^ ';
    if (KEY.down) currentKeysList += '~ ';
    if (KEY.space) currentKeysList += '[ = ]';

    if (currentKeysList !== keyPressedList) {
        keyPressedList = currentKeysList;
        textKey.render(currentKeysList);
    } 
    textKey.draw(screen.context);
}

function update(dt) {
    // clear screen
    screen.context.clearRect(0, 0, screen.width, screen.height);

    for(let i = 0; i < circlesArr.length; i++) circlesArr[i].update(dt);
    circlesArr = getExistsObjectsFromArr(circlesArr);
    if (circlesArr.length < maxCircles) {
        circlesArr.push( new Circle() );
        textCirclesOnScreen.render('circles on screen: ' + circlesArr.length);
    }
    textCirclesOnScreen.draw(screen.context);

    testCursorUpdate();
    testKeyUpdate();

    CURSOR.isClick = false;

    // update FPS info
    updateFPS(dt);
}