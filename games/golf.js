(function(){
var stage = new createjs.Stage("game");

function randX() {
    return Math.floor(Math.random() * (500 - 2 * r) + 1);
}

function randY() {
    return Math.floor(Math.random() * (475 - 2 * r) + 1);
}

//green background & instructions at bottom
var bg = new createjs.Shape();
bg.graphics.beginFill("#00ff33").drawRect(0, 0, 500, 475);
bg.graphics.beginFill("gray").drawRect(0, 475, 500, 25);
var inst = new createjs.Text("Click opposite of black hole to put ball in!", "19px Courier New", "white");
inst.x = 0;
inst.y = 475;
stage.addChild(bg);
stage.addChild(inst);


//ball on random spot
var r = 25;
var bx = Math.floor(Math.random() * (300 - 2 * r) + 100);
var by = Math.floor(Math.random() * (375 - 2 * r) + 100);

var ball = new createjs.Shape();
ball.graphics.beginFill("white").drawCircle(0, 0, r);
ball.x = bx;
ball.y = by;
stage.addChild(ball);


// hole in other random spot
var hx = randX();
var hy = randY();
while (Math.abs(hx - bx) < 100) {
    hx = randX();
}
while (Math.abs(hy - by) < 100) {
    hy = randY();
}
var hole = new createjs.Shape();
hole.graphics.beginFill("black").drawCircle(0, 0, r);
hole.x = hx;
hole.y = hy;
stage.addChild(hole);

stage.update();

bg.addEventListener("click", function (event) {
    var cx = event.rawX;
    var cy = event.rawY;
    // check for valid click
    if (stage.getObjectsUnderPoint(cx, cy).length === 1 && cy < 475) {
        var slope = ((hy - cy) / (hx - cx));
        var yval = slope * (bx - cx) + cy;
        if (Math.abs(by - yval) <= 25) end(true, cx, cy, hx, hy);
        else end(false, cx, cy, hx, hy);
    }
});



function end(win, x1, y1, x2, y2) {
    var str = "CLOSE ENOUGH";
    if (!win) str = "  ARE YOU OK??";

    var txt = new createjs.Text(str, "50px Arial", "black");
    txt.x = 50;
    txt.y = 225;
    var ln = new createjs.Shape();
    ln.graphics.beginStroke("red").moveTo(x1, y1).lineTo(x2, y2);
    stage.addChild(ln);
    stage.addChild(txt);
    stage.update();
    bg.removeAllEventListeners();
	if(win)
		score++;

}
})();  