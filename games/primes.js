(function(){

stage = new createjs.Stage("game");

var not = new Array();
for (var i = 2; i <= 200; i++) {
    if (!not[i]) {
        for (j = i * 2; j <= 200; j += i) {
            not[j] = true;
        }
    }
}

var txt = new createjs.Text("Click a prime!", "37px Courier New", "purple");
txt.x = 100;
txt.y = 225;
stage.addChild(txt);

var circles = new Array();
var nums = new Array();

for (var i = 0; i < 25; i++) {
    if (i < 11 || i > 13) {
        var circle = new createjs.Shape();
        circle.graphics.beginFill("pink").drawCircle(0, 0, 40);
        circle.x = 50 + (100 * (i % 5));
        circle.y = 50 + (100 * Math.floor(i / 5));
        circles[i] = circle;        
        stage.addChild(circle);
        var int = Math.floor(Math.random() * 199 + 2);
        var num = new createjs.Text(int, "20px Courier New", "black");
        num.x = circle.x - 10;
        num.y = circle.y - 10;
        stage.addChild(num);
        nums[i] = int;
    }
}

for (var i = 0; i < 25; i++) {
    if (i < 11 || i > 13) {
        circles[i].addEventListener("click", respond(i));
    }
}

function respond(i) {
    return function () {
        var int = nums[i];
        if(!not[int]){
            score++;
            int = -1;
        }
        end(int);
    }
}

stage.update();

function end(int){
    stage.removeAllChildren();
    var str = "OMG YOU WIN. nerd";
    var color = "green";
    if(int > 0){
        str = int + " is not a prime ._.";
        color = "gray";
    }
    var screen = new createjs.Text(str, "46px Verdana", color);
    screen.x = 0;
    screen.y = 225;
    stage.addChild(screen);   
    stage.update();
}
})();
