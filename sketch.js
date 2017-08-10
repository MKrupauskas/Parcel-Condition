let block,
    width,
    height,
    distance,
    sizeX,
    sizeY,
    humidity,
    temperature,
    signalStrength,
    countdown,
    countdownRemaining,
    humidityIcon,
    temperatureIcon,
    signalImg,
    isDamaged;

function setup() {
    block = select('#canvasDiv');

    width = block.width;
    height = block.height;
    distance = 20;

    countdown = 100;
    countdownRemaining = countdown;
    isDamaged = true;

    sizeX = (width - 3 * distance) / 2;
    sizeY = (height - 3 * distance) / 2;

    let canvas = createCanvas(width, height);
    canvas.parent('canvasDiv');
    humidityIcon = loadImage('images/Rain-Drop-icon.png');
    temperatureIcon = loadImage('images/temp.png');
    signalImg = loadImage('images/signal.png');

    readTheData();
}

function readTheData() {
    $.ajax({
        url: 'data.json',
        async: true,
        success: function(tempData) {
            humidity = tempData.live['220'];
            temperature = tempData.live['200'];
            signalStrength = tempData.live['130'];
        },
        dataType: 'json'
    });
}

function draw() {
    readTheData();
    if (countdownRemaining <= 0) {
        countdownRemaining = countdown;
    } else {
        countdownRemaining--;
    }

    background('#ed7044');
    strokeWeight(5);
    stroke(220, 100, 60);
    fill('#FB926D');

    rect(distance, distance, sizeX, sizeY, 20);
    rect(distance * 2 + sizeX, distance, sizeX, sizeY, 20);
    rect(distance, distance * 2 + sizeY, sizeX, sizeY, 20);
    rect(distance * 2 + sizeX, distance * 2 + sizeY, sizeX, sizeY, 20);

    noStroke();
    textSize(50);
    textAlign(CENTER);
    fill(255);
    temp = temperature + '°C';
    text(temp, distance + sizeX / 2, distance + sizeY / 5 * 3);
    textSize(25);
    text('Temperature', distance + sizeX / 2, distance + sizeY / 5 * 4);
    image(
        temperatureIcon,
        distance + sizeX * 0.5 - sizeY * 1.2,
        distance + sizeY / 5 + sizeY / 23,
        sizeY / 5 * 3,
        sizeY / 5 * 3
    );

    textSize(50);
    hum = Math.round(humidity) + '%';
    text(hum, distance * 2 + sizeX * 1.5, distance + sizeY / 5 * 3);
    textSize(25);
    text('Humidity', distance * 2 + sizeX * 1.5, distance + sizeY / 5 * 4);
    image(
        humidityIcon,
        distance * 2 + sizeX * 1.5 - sizeY,
        distance + sizeY / 5 + sizeY / 23,
        sizeY / 5 * 3,
        sizeY / 5 * 3
    );

    image(
        signalImg,
        distance + sizeX * 0.5 - sizeY / 2.2,
        distance * 2 + sizeY / 1.01,
        sizeY / 5 * 3,
        sizeY / 5 * 3
    );
    textSize(25);
    text(
        'Signal Strenght',
        distance + sizeX / 2,
        sizeY + distance * 2 + sizeY / 5 * 4
    );
    strokeWeight(4);
    stroke(255);

    if (signalStrength > 20) {
        line(
            distance + sizeX / 2,
            distance * 2 + sizeY + sizeY / 2,
            distance + sizeX / 2,
            distance * 2 + sizeY + sizeY / 8 * 3
        );
    }
    if (signalStrength > 45) {
        line(
            distance + sizeX / 1.95,
            distance * 2 + sizeY + sizeY / 2,
            distance + sizeX / 1.95,
            distance * 2 + sizeY + sizeY / 8 * 2
        );
    }
    if (signalStrength > 70) {
        line(
            distance + sizeX / 1.9,
            distance * 2 + sizeY + sizeY / 2,
            distance + sizeX / 1.9,
            distance * 2 + sizeY + sizeY / 8
        );
    }

    if (isDamaged) {
        noStroke();
        textSize(50);
        text(
            'No Warning',
            distance * 2 + sizeX * 1.5,
            distance * 2 + sizeY + sizeY / 5 * 2.5
        );
        textSize(25);
        text(
            'Your package is in good condition',
            distance * 2 + sizeX * 1.5,
            distance * 2 + sizeY + sizeY / 5 * 4
        );
    }
}