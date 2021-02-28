
let shadowShader;
let alphaShader;
let clockImage;
let shadowImage;
let rockTexture;
let alphaImage;
let font;
let currentSecond;
let lastSecondChange = 0;

let models = [];
let modelScales = [];
let modelIndex = 0;

let seed;


function loadModels(){

  let prefix = 'assets/models/lowPoly/';
  let normalize = true;
  models[0] = loadModel(prefix + 'skull1.obj', normalize);
  models[1] = loadModel(prefix + 'skull2.obj', normalize);
  models[2] = loadModel(prefix + 'skullnoteeth.obj', normalize);
  models[3] = loadModel(prefix + 'perrito.obj', normalize);
  models[4] = loadModel(prefix + 'femur.obj', normalize);
  models[5] = loadModel(prefix + 'radius.obj', normalize);
  models[6] = loadModel(prefix + 'jaw.obj', normalize);
  modelScales[0] = 0.4;
  modelScales[1] = 0.4;
  modelScales[2] = 0.35;
  modelScales[3] = 0.4;
  modelScales[4] = 0.6;
  modelScales[5] = 0.5;
  modelScales[6] = 0.2;
}


function renderFps(){

    translate(-width/2, - height/2);
    fill(0);
    rect(0,0,50,40);
    fill(255);
    text(nfc(frameRate(),2),10,20);
  
}
