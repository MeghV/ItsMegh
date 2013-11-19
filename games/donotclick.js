(function(){
	var c = document.getElementById("game");
	var context = c.getContext("2d");
	var size = 50;

	c.addEventListener("mousedown", getPosition, false);
	function getPosition(event) {
	  	var x = new Number();
		var y = new Number();
		var canvas = document.getElementById("game");
		if (event.x != undefined && event.y != undefined)
		{
		  x = event.x;
		  y = event.y;
		}
		else // Firefox method to get the position
		{
		  x = event.clientX + document.body.scrollLeft +
		      document.documentElement.scrollLeft;
		  y = event.clientY + document.body.scrollTop +
		      document.documentElement.scrollTop;
		}
		x -= canvas.offsetLeft;
	        y -= canvas.offsetTop;
	  	win(x,y);
	}


	function draw() {
		context.fillStyle = "red";
		context.font = size + "px Courier New";
		context.fillText("DANGER!", 150, 200);
		context.font = "20px Courier New";
		context.fillText("Do not click.", 170, 225);


	}

	function enlarge() {
		size += 20;
		context.fillStyle = "red";
		context.font = size + "px Courier New";
		var xPos = Math.ceil(Math.random() * 250);
		var yPos = Math.ceil(Math.random() * 500);
		context.fillText("DANGER!", xPos, yPos);
		if (size > 340) {
			clearInterval(myVar);
			context.clearRect(0,0,500,500);
			context.fillStyle = "black";
			context.font = "50px Courier New";
			context.fillText("you did it!", 125, 200);
			score++;
		}
	}

	function win(x,y) {
		clearInterval(myVar);
		context.clearRect(0,0,500,500);
		context.fillStyle = "black";
		context.font = "50px Courier New";
		context.fillText("you lose.", 125, 200);
	}

	var myVar = setInterval(function() {enlarge()},500);

	draw();

})();