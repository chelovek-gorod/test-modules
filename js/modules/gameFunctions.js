// Константы для работы с радианами
const _2PI = Math.PI * 2;
const _RAD = Math.PI / 180;

// Очистка массива от неиспользуемых игровых объектов
// (у объектов массива arr[i] должно быть поле: arr[i].isExist)
// (Удаляем arr[i], если: arr[i].isExist === false)
export function getExistsObjectsFromArr(arr) {
    const filteredArr = [];
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].isExist) filteredArr.push(arr[i]);
    }
    return filteredArr;
}

// функция поворота объекта object к объекту target, со скоростью turnSpeed
// (у объекта object должны быть поля: object.x; object.y; object.direction)
// (у объекта target должны быть поля: target.x; target.y; object.direction)
// (turnAngle - угол, на который необходимо повернуть object к target)
export function turnTo( object, target, turnAngle ) {
    let pointDirection = Math.atan2(target.y - object.y, target.x - object.x);
    let angle = (pointDirection - object.direction) % _2PI;
    if (Math.abs(angle) <= turnAngle) {
        object.direction = pointDirection;
        return;
    }

    if (angle < -Math.PI) angle += _2PI;
    if (angle >  Math.PI) angle -= _2PI;

    if (angle >= 0 &&  angle > turnSpeed) object.direction += turnSpeed;
    if (angle <  0 && -angle > turnSpeed) object.direction -= turnSpeed;
}

// функция определения расстояния в пикселях между объектами object и target
// (у объекта object должны быть поля: object.x; object.y)
// (у объекта target должны быть поля: target.x; target.y)
export function getDistance(object, target) {
    let dx = target.x - object.x;
    let dy = target.y - object.y;
    return Math.sqrt( dx**2 + dy**2 );
}

// функция перемещения объека object к объекту target со скоростью speed
// (у объекта object должны быть поля: object.x; object.y)
// (у объекта target должны быть поля: target.x; target.y)
// (speed - число пикселей, на которое нужно переместить object к target)
export function moveTo( object, target, speed ) {
    if (object.x !== target.x || object.y !== target.y) {
        let distance = getDistance(object, target)
        
        if (distance <= speed) {
            object.x = target.x;
            object.y = target.y;
        } else {
            let moveRate = speed / distance;
            object.x += moveRate * (target.x - object.x);
            object.y += moveRate * (target.y - object.y);
        }
    }
}

// ЭЛЕКТРИЧЕСКИЙ РАЗРЯД
// (context - контекст 2D для отрисовки электрического разряда)
// (у объекта object должны быть поля: object.x; object.y)
// (у объекта target должны быть поля: target.x; target.y)
// (color - цвет линии и света от электрического разряда)
export function drawLightning(context, object, target, color=null) {
    const colorsArr = ["#ffe0ff", "#e0ffff", "#ffffe0"];
    const lineColor = color ? color : colorsArr[Math.floor(Math.random() * colorsArr.length)];

    let distance = getDistance(object, target);
    let stepsCount = Math.ceil((distance / 4) + Math.random() * (distance / 8));
    let offsetRate = 6;

    const detDistance4Points = (x1, y1, x2, y2) => {
        let dy = x1 - x2, dx = y1 - y2;
        return Math.sqrt(dx * dx + dy * dy);
    }

    let xx = object.x
    let yy = object.y

    context.save();
    context.lineWidth = 1;
    context.strokeStyle = lineColor;
    context.shadowBlur  = 5;
    context.shadowColor = lineColor;
    context.globalCompositeOperation = 'lighter';
    context.beginPath();
    context.moveTo(xx, yy);
    for (let i = stepsCount; i > 1; i--) {
        let pathLength = detDistance4Points(xx, yy, target.x, target.y);
        let offset = Math.sin(pathLength / distance * Math.PI) * offsetRate;
        xx += (target.x - xx) / i + Math.random() * offset * 2 - offset;
        yy += (target.y - yy) / i + Math.random() * offset * 2 - offset;
        context.lineTo(xx, yy);
    }
    context.stroke();
    context.restore();
}