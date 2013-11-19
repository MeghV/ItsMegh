(function(){
var stage = new createjs.Stage("game");

// top & bottom bars with instructions and start sign
var bars = new createjs.Shape();
var height = 50;
bars.graphics.beginFill("gray").drawRect(0, 0, 500, height);
bars.graphics.beginFill("gray").drawRect(0, 500 - height, 500, height);
stage.addChild(bars);

var inst = new createjs.Text("Click your way through!", "20px Courier New", "purple");
inst.x = 220;
inst.y = 0;
stage.addChild(inst);

var sign = new createjs.Text("START", "18px Impact", "black");
sign.x = 10;
sign.y = 25;
stage.addChild(sign);

var blocks = [];
var bCount = 16;
// array of blank blocks
var path = [];
path[0] = true;
var end;

for (var i = 0; i < bCount; i++) {
    var mb = new createjs.Shape();
    // if block is on path, leave blank
    if (path[i]) {
        mb.graphics.beginFill("white").drawRect(125 * (i % 4), height + 100 * Math.floor(i / 4), 125, 100);
        var rand = Math.random();
        var next;
        if (rand < 0.5 || i % 4 == 3) next = i + 4;
        else next = i + 1;

        if (next < bCount) path[next] = true;
        else
        // winning block
        end = i;
    } else mb.graphics.beginFill("brown").drawRect(125 * (i % 4), height + 100 * Math.floor(i / 4), 125, 100);
    blocks[i] = mb;
}

var fin = new createjs.Text("FINISH", "18px Impact", "black");
fin.x = 45 + 125 * (end % 4);
fin.y = 500 - height;

stage.addChild(fin);

for (var i = 0; i < bCount; i++) {
    blocks[i].addEventListener("click", onClick(i));
    stage.addChild(blocks[i]);
}

stage.update();

// the correct next block
var step = 0;

function onClick(i) {
    return function () {
        if (!path[i] || i !== step) 
            endGame(i);
        else{
            var done = new createjs.Shape();
            done.graphics.beginFill("yellow").drawRect(125 * (i % 4), height + 100 * Math.floor(i / 4), 125, 100);
            stage.addChild(done);
            stage.update();
            if (i === end)
               endGame(i)
            for (var j = i + 1; j <= end; j++) {
                if (path[j]) {
                    step = j;
                    break;
                }
            }
        }
    }
}

function endGame(i){
    var str = "You made it!";
    var color = "pink";
    if (i !== end){
        str = "Really?";
        color = "white";
        var wrong = new createjs.Shape();
        wrong.graphics.beginFill("black").drawRect(125 * (i % 4), height + 100 * Math.floor(i / 4), 125, 100);
        stage.addChild(wrong);
    }
    var message = new createjs.Text(str, "40px Tahoma", color);
    message.x = 5;
    message.y = 500 - height;
    blocks[end].removeAllEventListeners();
    stage.addChild(message);
    stage.update();
    if (i === end)
        score++;
}
})();        