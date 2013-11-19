(function(){
var stage = new createjs.Stage("game");
//preload image
var face = new createjs.Bitmap("img/face.png");


//sky and sun
var bg = new createjs.Shape();
bg.graphics.beginFill("#99ffff").drawRect(0, 0, 500, 500);
var cx = 95;
var cy = 95;
var sunr = 50;
bg.graphics.beginFill("#ffff00").drawCircle(cx, cy, sunr);
var os = 20;
var eye = 20;
bg.graphics.beginStroke("black").moveTo(cx - os - eye, cy - os).lineTo(cx - os, cy - os).endStroke();
bg.graphics.beginStroke("black").moveTo(cx + os, cy - os).lineTo(cx + os + eye, cy - os).endStroke();
bg.graphics.beginStroke("black").moveTo(cx - os / 2, cy + os).lineTo(cx + os / 2, cy + os).endStroke();
stage.addChild(bg);


//instructions printed at bottom
var txt = new createjs.Text("Float the balloon!", "30px Courier New", "purple");
txt.x = 100;
txt.y = 450;
stage.addChild(txt);

// draw balloon
var bal = new createjs.Shape();
var sx = 345;
var sy = 325;
var rad = 50;
var cy = sy - 50;
bal.graphics.beginStroke("black").moveTo(sx - rad, sy).lineTo(sx, sy + rad * 2).endStroke();
bal.graphics.beginStroke("black").moveTo(sx + rad, sy).lineTo(sx, sy + rad * 2).endStroke();
bal.graphics.beginFill("red").drawCircle(sx, sy, rad);
bal.graphics.beginFill("white").drawRect(sx - rad / 2 + 5, sy + rad * 2, rad - 10, rad / 2 - 5);
bal.cache(sx - rad, sy - rad, rad * 2, rad * 7 / 2 - 5);

stage.addChild(bal);

stage.update();

stage.addEventListener("click", onClick);

function onClick() {
    bal.y -= 25;
    cy -= 25;
    stage.update();
    if (cy < -rad/2)
        win();
}

function win() {
    stage.removeAllEventListeners();
    face.x = 40;
    face.y = 45;
    var grats = new createjs.Text("JUSTIN ITH", "bold 49px Courier New", "#ff3366");
    var grats2 = new createjs.Text("STAMP OF APPROVAL", "bold 43px Lucida Sans", "#ff6600");
    grats.x = 100;
    grats.y = 300;
    grats2.x = 13;
    grats2.y = 385;   
    stage.addChild(grats);
    stage.addChild(grats2); 
    stage.removeChild(txt);
    stage.addChild(face);
    stage.update();
    score++;
}
})();