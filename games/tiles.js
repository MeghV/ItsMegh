(function(){
	var c = document.getElementById("game");
	var context = c.getContext("2d");
	var increaseRadius = 10;
	var click = 1;
	var won = false;
	
	context.font = "30px Georgia";
	context.fillStyle = "black";
	context.fillText("Fill the screen!",100,150);
	context.beginPath();
	context.arc(250, 250, 6, 0, 2 * Math.PI, false);
	context.fillStyle = "black";
	context.fill();


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

	function draw(radius) {

		var num1 = Math.ceil(Math.random() * 255);
		var num2 = Math.ceil(Math.random() * 255);
		var num3 = Math.ceil(Math.random() * 255);
		var color = "rgba("+num1+", "+num2+", "+num3+",0.5)";

		context.beginPath();
		context.arc(250, 250, radius, 0, 2 * Math.PI, false);
		context.fillStyle = color;
		context.fill();

	}

	function win(x,y) {
		if (won == false) {
			if (click == 1) {
				context.clearRect(0,0,500,500);
			}
			click++;
			draw(increaseRadius);
			if (increaseRadius < 354) {
				increaseRadius += Math.random() * 35;
			} else {
				context.fillStyle = "black";
				context.fillText("You win!!! >3<", 100,200);
				won = true;
				score++;
			}
		}
	}
})();