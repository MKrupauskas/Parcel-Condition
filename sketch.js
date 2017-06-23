let spacey,
  w,
  h,
  distance,
  sizeX,
  sizeY,
  humidity,
  temperature,
  signalStrength,
  usedFont,
  countdown,
  countdownLeft,
  updates,
  humImg,
  tempImg;
let signalImg, damaged, warningImg;
function setup() {
  spacey = select("#canvasDiv");

  w = spacey.width;
  h = spacey.height;
  distance = 20;

  countdown = 100;
  countdownLeft = countdown;
  updates = 0;
  damaged = true;

  sizeX = (w - 3 * distance) / 2;
  sizeY = (h - 3 * distance) / 2;

  let canvas = createCanvas(w, h);
  canvas.parent("canvasDiv");
  humImg = loadImage("images/Rain-Drop-icon.png");
  tempImg = loadImage("images/temp.png");
  signalImg = loadImage("images/signal.png");
  warningImg = loadImage("images/warning.png");

  readTheData();

  usedFont = loadFont("font.ttf");
}

function readTheData() {
  $.ajax({
    url: "data.json",
    async: true,
    success: function(tempData) {
      humidity = tempData.live["220"];
      temperature = tempData.live["200"];
      signalStrength = tempData.live["130"];
      updates++;
    },
    dataType: "json",
  });
}

function draw() {
  if (countdownLeft <= 0) {
    countdownLeft = countdown;
  } else {
    countdownLeft--;
  }

  background("#ed7044");
  strokeWeight(5);
  stroke(220, 100, 60);
  fill("#FB926D");

  rect(distance, distance, sizeX, sizeY, 20);
  rect(distance * 2 + sizeX, distance, sizeX, sizeY, 20);
  rect(distance, distance * 2 + sizeY, sizeX, sizeY, 20);
  rect(distance * 2 + sizeX, distance * 2 + sizeY, sizeX, sizeY, 20);

  noStroke();
  textSize(50);
  textAlign(CENTER);
  fill(255);
  temp = temperature + "°C";
  text(temp, distance + sizeX / 2, distance + sizeY / 5 * 3);
  textSize(25);
  text("Temperature", distance + sizeX / 2, distance + sizeY / 5 * 4);
  image(
    tempImg,
    distance + sizeX * 0.5 - sizeY * 1.2,
    distance + sizeY / 5 + sizeY / 23,
    sizeY / 5 * 3,
    sizeY / 5 * 3
  );

  textSize(50);
  hum = Math.round(humidity) + "%";
  text(hum, distance * 2 + sizeX * 1.5, distance + sizeY / 5 * 3);
  textSize(25);
  text("Humidity", distance * 2 + sizeX * 1.5, distance + sizeY / 5 * 4);
  image(
    humImg,
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
    "Signal Strenght",
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

  if (damaged) {
    noStroke();
    textSize(50);
    text(
      "No Warning",
      distance * 2 + sizeX * 1.5,
      distance * 2 + sizeY + sizeY / 5 * 2.5
    );
    textSize(25);
    text(
      "Your package is in good condition",
      distance * 2 + sizeX * 1.5,
      distance * 2 + sizeY + sizeY / 5 * 4
    );
  }
}
