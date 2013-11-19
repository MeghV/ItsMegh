(function(){

    // sets up structure and graphic objects
    stage = new createjs.Stage("game");
    g = new createjs.Shape();
    gTwo = new createjs.Shape();
    rect = new createjs.Shape();
    back = new createjs.Shape();

    // counts number of dots connected
    var number = 0;
    back.graphics.beginFill("black").drawRect(0,0,500,500);
    stage.addChild(back);

    // Draws the white dots
    g.graphics.beginFill("white").drawCircle(250,70,7);
    for(var i = 0; i < 50; i++){
        var num = (Math.random()*100) + 1;
        var num2 = (Math.random()*100) + 1;
        g.graphics.beginFill("white").drawCircle(num * 5, num2 * 5, 7);
    }
    stage.addChild(g);

    // Writes the instructions and draws the gray background
    rect.graphics.beginFill("gray").drawRect(0,15,500,32);
    stage.addChild(rect);
    var inst = new createjs.Text("Click 8 dots to create a constellation","20px Helvetica", "white");
    inst.x = 100;
    inst.y = 20;
    stage.addChild(inst);

    // Decalres the starting coordinates
    var startX = 250;
    var startY = 70;
    stage.update();

    // Declares the end of the game
    function win(){
        var win = new createjs.Text("Beautiful!","70px Impact", "yellow");
        win.x = 50;
        win.y = 400;
        stage.addChild(win);
        stage.update();
        score++;
    }

    // Listens to clicks and draws lines connecting dots
    g.addEventListener("click", function (event){
        var sx = startX;
        var sy = startY;
        var x = event.rawX;
        var y = event.rawY;
        gTwo.graphics.beginStroke("white").moveTo(sx,sy).lineTo(x,y).endStroke();
        startX = event.rawX;
        startY = event.rawY;
        number++;
        // If the number of connected dots reaches 8
        if (number === 8)
            win();
        // Writes the number of dots connected
        var count = new createjs.Text(number,"20px Arial", "yellow");
        count.x = 20;
        count.y = number * 25;
        stage.addChild(count);
        stage.addChild(gTwo); 
        stage.update();
    })
})();


