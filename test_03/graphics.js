function renderCenter(){
  clockImage.push();
  clockImage.rotate(HALF_PI);
  clockImage.push();
  let skullIndex = int(random(3));
  clockImage.scale(modelScales[skullIndex]);
  clockImage.rotateZ(millis()/1000.0 * 0.1);
  clockImage.model(models[skullIndex]);
  clockImage.pop();
  clockImage.pop();
}

// ****************************************************************

function renderFirstRing(xTranslate, steps){
  for(let i = 0 ; i < steps ; i ++){
    clockImage.push();
    let currentAngle = 360/steps * i;
    let stepWidth = 360/steps;
    clockImage.rotate(TWO_PI/steps * i);
    clockImage.translate(xTranslate,0);
    clockImage.push();
    let skullIndex = 2;
    clockImage.scale(modelScales[skullIndex]);
    clockImage.rotateY((millis()/1000.0 * 0.5) + radians(currentAngle));
    //clockImage.rotateZ(millis()/1000.0);
    clockImage.model(models[skullIndex]);
    clockImage.pop();
    clockImage.pop();

  }
}

// ****************************************************************

function renderSecondRing(xTranslate, steps){
  for(let i = 0 ; i < steps ; i ++){
    clockImage.push();
    let currentAngle = 360/steps * i;
    let stepWidth = 360/steps;
    clockImage.rotate(TWO_PI/steps * i);
    clockImage.translate(xTranslate,0);
    clockImage.rotate(HALF_PI);
    clockImage.push();
    clockImage.rotate(HALF_PI);
    clockImage.push();
    clockImage.rotateX(random(TWO_PI) + millis()/1000.0);
    clockImage.rotateZ(radians(random(-5,5)));
    clockImage.scale(modelScales[4]);
    clockImage.model(models[4]);
    clockImage.pop();
    clockImage.pop();
    clockImage.pop();
  }
}

// ****************************************************************

function renderThirdRing(xTranslate, steps){
  clockImage.push();
  let prevSecond = currentSecond;
  currentSecond = second();
  if(prevSecond != currentSecond){
    lastSecondChange = millis();
  }

  let secondInterval = 360/60;
  let secondAngle = secondInterval * currentSecond;

  let currentMillis = constrain(millis() - lastSecondChange,0,1000);

  let intermediateAngle = currentMillis/1000;
  intermediateAngle = quinticBoth(intermediateAngle);
  clockImage.rotate(radians(secondAngle + (intermediateAngle * secondInterval)));

  for(let i = 0 ; i < steps ; i ++){
    clockImage.push();
    let currentAngle = 360/steps * i;
    let stepWidth = 360/steps;

    clockImage.rotate(TWO_PI/steps * i);
    clockImage.translate(xTranslate,0);
    clockImage.rotate(-HALF_PI);
    clockImage.push();
    let skullIndex = int(random(0,3));

    clockImage.push();
    clockImage.scale(modelScales[skullIndex]);
    let timeScale = 0.4;
    clockImage.rotateZ(random(TWO_PI) +  (millis()/1000.0 * timeScale));
    clockImage.rotateX( random(TWO_PI) + (millis()/1000.0 * timeScale));
    clockImage.model(models[skullIndex]);
    clockImage.pop();
    clockImage.pop();
    clockImage.pop();
  }

  clockImage.pop();
  clockImage.pop();
}

// ****************************************************************

function renderFourthRing(xTranslate, steps){


    for(let i = 0 ; i < steps ; i ++){
      clockImage.push();
      let currentAngle = 360/steps * i;
      let stepWidth = 360/steps;
      clockImage.rotate(TWO_PI/steps * i);
      clockImage.translate(xTranslate,0);
      clockImage.push();
      clockImage.rotate(HALF_PI);
      clockImage.push();
      clockImage.rotateX(random(TWO_PI) + millis()/1000.0);
      clockImage.scale(modelScales[5]);
      clockImage.model(models[5]);
      clockImage.pop();
      clockImage.pop();
      clockImage.pop();
    }

}

// ****************************************************************

function renderFifthRing(xTranslate, steps){
  for(let i = 0 ; i < steps ; i ++){
    clockImage.push();
    let currentAngle = 360/steps * i;
    let stepWidth = 360/steps;
    clockImage.rotate(TWO_PI/steps * i);
    clockImage.translate(xTranslate,0);
    clockImage.push();
    clockImage.push();
    clockImage.rotateY(random(TWO_PI) + millis()/1000.0 * 0.6);
    clockImage.rotateX(random(TWO_PI) + millis()/1000.0 * 0.6);
    clockImage.scale(modelScales[3]);
    clockImage.model(models[3]);
    clockImage.pop();
    clockImage.pop();
    clockImage.pop();
  }

}
