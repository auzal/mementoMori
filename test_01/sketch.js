let femur;
let skullTop;
let skullFront;

let femurGlow;
let skullTopGlow;
let skullFrontGlow;

function preload(){
  femur = loadImage('assets/femur.png');
  skullTop = loadImage('assets/top.png');
  skullFront = loadImage('assets/skull.png');

}

function setup() {
  createCanvas(windowWidth, windowHeight);
  pixelDensity(1);
  femur.resize(0,150);
  skullFront.resize(65,0);
  skullTop.resize(60,0);
  femurGlow = processImage(femur);
  skullTopGlow = processImage(skullTop);
  skullFrontGlow = processImage(skullFront);

  imageMode(CENTER);
  // put setup code here
}

function draw() {
  background(0);
  //image(femur, mouseX,mouseY);
  translate(width/2, height/2);
  rotate(-HALF_PI);

  push();
  rotate(HALF_PI);
  image(skullTop,0,0);
  pop();

  let currentHour = hour();
  currentHour = currentHour % 12;
  let hourAngle = 360/12 * currentHour;

  let steps = 10;
  for(let i = 0 ; i < steps ; i ++){
    push();
    let currentAngle = 360/steps * i;
    let stepWidth = 360/steps;
    rotate(TWO_PI/steps * i);
    translate(100,0);
    rotate(HALF_PI);
    push();
    if(currentAngle >= hourAngle - stepWidth/2 && currentAngle < hourAngle + stepWidth/2 ){
      image(skullFrontGlow,0,0);
      tint(255);
    }else{
      tint(255,128);
    }
    image(skullFront,0,0);
    pop();
    pop();
  }

  let currentMinute = minute();
  let minuteAngle = 360/60 * currentMinute;

  steps = 30;
  for(let i = 0 ; i < steps ; i ++){
    push();
    let currentAngle = 360/steps * i;
    let stepWidth = 360/steps;
    rotate(TWO_PI/steps * i);
    translate(220,0);
    rotate(HALF_PI);
    push();
    if(currentAngle >= minuteAngle - stepWidth/2 && currentAngle < minuteAngle + stepWidth/2 ){
      tint(255);
      image(femurGlow,0,0);
    }else{
      tint(255,128);
    }

    image(femur,0,0);
    pop();
    pop();
  }

  let currentSecond = second();
  let secondAngle = 360/60 * currentSecond;
  steps = 33;
  for(let i = 0 ; i < steps ; i ++){
    push();
    let currentAngle = 360/steps * i;
    let stepWidth = 360/steps;

    rotate(TWO_PI/steps * i);
    translate(340,0);
    rotate(-HALF_PI);
    push();
    if(currentAngle >= secondAngle - stepWidth/2 && currentAngle < secondAngle + stepWidth/2 ){
      tint(255);
      image(skullTopGlow,0,0);
    }else{
      tint(255,128);
    }
    image(skullTop,0,0);
    pop();
    pop();
  }

  // put drawing code here
}


function processImage(baseImage){

  let highlightScale = 1.5;
  let highlightMargin = 10;
  let highlight = createImage(int(baseImage.width * highlightScale), int(baseImage.height * highlightScale));

  let w = highlight.width;
  let h = highlight.height;
  let margin = (highlightScale - 1)/2;
  highlight.copy(baseImage, 0, 0, int(baseImage.width), int(baseImage.height), int(0 + margin * baseImage.width), int(0 + margin * baseImage.height), int(baseImage.width), int(baseImage.height));
  highlight.filter(THRESHOLD,255);
  highlight.filter(INVERT);
  highlight.filter(DILATE);
  highlight.filter(DILATE);
  highlight.filter(DILATE);
  highlight.filter(DILATE);
  highlight.filter(BLUR, 3);
  return highlight;
}
