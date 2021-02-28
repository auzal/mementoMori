
let masterScale = 1.0;

function preload(){
  shadowShader = loadShader('assets/shadow.vert', 'assets/shadow2.frag');
  alphaShader = loadShader('assets/shadow.vert', 'assets/alphaMap.frag');
  rockTexture = loadImage('assets/rock.jpg');
  font = loadFont('assets/bahnschrift.ttf');
  loadModels();

}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  randomSeed(0);
  pixelDensity(1);

  masterScale = height/969.0;

  clockImage = createGraphics(width, height, WEBGL);
  shadowImage = createGraphics(width, height, WEBGL);
  alphaImage = createGraphics(width, height, WEBGL);
  clockImage.pixelDensity(1);
  shadowImage.pixelDensity(1);
  alphaImage.pixelDensity(1);

  seed = Math.random() * 10000;
  textFont(font);
  textSize(12);
  imageMode(CENTER);
}

function draw() {
  randomSeed(seed);
  background(0);
  //create base image
  createClockImage();

  // pass data to alpha shader
  alphaShader.setUniform('iResolution', [width, height]);
  alphaShader.setUniform('iMouse', [mouseX, mouseY]);
  alphaShader.setUniform('iChannel0', clockImage);
  alphaShader.setUniform('iTime', millis()/1000);

  // create alpha map for shadow calculation
  alphaImage.shader(alphaShader);
  alphaImage.rect(0, 0, width, height);

  // pass data to shador shader
  shadowShader.setUniform('iResolution', [width, height]);
  shadowShader.setUniform('iMouse', [mouseX, mouseY]);
  shadowShader.setUniform('iChannel0', alphaImage);
  shadowShader.setUniform('iTime', millis()/1000);

  // create final texture with shadows
  shadowImage.shader(shadowShader);
  shadowImage.rect(0,0,width,height);

  // show final image on screen
  image(shadowImage,0,0);

  //  renderFps();

}

function createClockImage(){

  // set lights and materials

  clockImage.clear();
  clockImage.resetMatrix();
  clockImage._renderer._update();
  clockImage.noStroke();
  clockImage.ambientMaterial(255);
  //  clockImage.shininess(1);
  let locX = mouseX - width / 2;
  let locY = mouseY - height / 2;
  clockImage.ambientLight(60);
  clockImage.pointLight(200,120,180, locX, locY, 50);

  clockImage.scale(masterScale);

  // general shit. rotate to match clock rotation

  clockImage.push();
  clockImage.imageMode(CENTER);
  clockImage.rotate(-HALF_PI);

  // render rings of models

  renderCenter();
  renderFirstRing(80,8); // human skulls
  renderSecondRing(180, 50); // femurs
  renderThirdRing(284, 25); // human skulls, seconds
  renderFourthRing(330,26); // radius
  renderFifthRing(385, 50); // dog skulls


}
