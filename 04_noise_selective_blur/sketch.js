let face;
let skull;

let noiseStep = 5;
let noiseScale = 0.005;
let noiseThreshold = 0.5;

let imageWidth;
let imageHeight;
let canvasWidth;
let canvasHeight;


let noiseFieldShader;

//PShader blur;

let theShader;

let blur_amt = 0.5;

let blurSigma = 2;
let blurSize = 3;

let blurH, blurV;
// we need two createGraphics layers for our blur algorithm
let pass1, pass2;

let noiseResult;

let noiseField;

function preload(){
  skull = loadImage("assets/skull3.png");
  face = loadImage("assets/face2.jpg");
  theShader = loadShader('assets/noise.vert', 'assets/noise.frag');
  blurH = loadShader('assets/blur.vert', 'assets/blur.frag');
  blurV = loadShader('assets/blur.vert', 'assets/blur.frag');
  noiseFieldShader = loadShader('assets/noiseField.vert', 'assets/noiseField.frag');
}

function setup() {

  imageWidth = face.width;
  imageHeight = face.height;

  calculateDimensions();
  createCanvas(canvasWidth, canvasHeight, WEBGL);

  pass1 = createGraphics(canvasWidth, canvasHeight, WEBGL);
  pass2 = createGraphics(canvasWidth, canvasHeight, WEBGL);

  noiseResult = createGraphics(canvasWidth, canvasHeight, WEBGL);
  noiseField = createGraphics(canvasWidth, canvasHeight, WEBGL);

  // turn off the cg layers stroke
  pass1.noStroke();
  pass2.noStroke();
  noiseResult.noStroke();
  noiseField.noStroke();
}

function draw() {

  createNoiseMap();



  let maxDistance = width/2;
  let thresh = map(dist(mouseX,mouseY,width/2, height/2),0,maxDistance,0.3,0.8);

  thresh = constrain(thresh,0.3,0.8);

  theShader.setUniform("iResolution", [width, height]);
  theShader.setUniform("iFrame", frameCount);
  //  theShader.setUniform("iMouse", [mouseX, map(mouseY, 0, height, height, 0)]);
  theShader.setUniform('tex0', skull);
  theShader.setUniform('tex1', face);
  theShader.setUniform('texNoise', noiseField);
  theShader.setUniform('iTime', millis()/1000 * 3);
  theShader.setUniform('threshold',thresh );
  //  console.log(thresh);
  noiseResult.shader(theShader);
  noiseResult.rect(0,0,width,height);
//  imageMode(CENTER);
//  image(noiseResult,0,0);



  blur_amt = 1;
  pass1.shader(blurH);

  blurH.setUniform('texNoise', noiseField);
  blurH.setUniform("iResolution", [width, height]);
  blurH.setUniform('threshold',thresh );
  blurH.setUniform('tex0', noiseResult);
  blurH.setUniform('texelSize', [1.0/width*blur_amt, 1.0/height*blur_amt]);
  blurH.setUniform('direction', [1.0, 0.0]);
  pass1.rect(0,0,width, height);


  pass2.shader(blurV);
  blurV.setUniform('texNoise', noiseField);
  blurV.setUniform("iResolution", [width, height]);
  blurV.setUniform('threshold',thresh );
  blurV.setUniform('tex0', pass1);
  blurV.setUniform('texelSize', [1.0/width*blur_amt, 1.0/height*blur_amt]);
  blurV.setUniform('direction', [0.0, 1.0]);
  pass2.rect(0,0,width, height);

  imageMode(CENTER);
  image(pass2, 0,0, width, height);
}

function calculateDimensions(){

  canvasWidth = imageWidth;
  canvasHeight = imageHeight;
  if(windowHeight < imageHeight){
    canvasHeight = windowHeight;
    canvasWidth  = int(imageWidth * canvasHeight / imageHeight);
  }
}

// function windowResized() {
//   calculateDimensions();
//   resizeCanvas(canvasWidth, canvasHeight);
//
//   pass1 = createGraphics(canvasWidth, canvasHeight, WEBGL);
//   pass2 = createGraphics(canvasWidth, canvasHeight, WEBGL);
//   noiseResult = createGraphics(canvasWidth, canvasHeight, WEBGL);
//   noiseField = createGraphics(canvasWidth, canvasHeight, WEBGL);
//
//   pass1.noStroke();
//   pass2.noStroke();
//   noiseResult.noStroke();
//   noiseField.noStroke();
//
// }

function createNoiseMap(){

  noiseFieldShader.setUniform("iResolution", [width, height]);
  noiseFieldShader.setUniform("iFrame", frameCount);
  noiseFieldShader.setUniform('iTime', millis()/1000 * 3);

  noiseField.shader(noiseFieldShader);

  noiseField.rect(0,0,width,height);

//  imageMode(CENTER);
//  image(noiseField,0,0);

}
