(function(){
	var c = document.getElementById("game");
	var context = c.getContext("2d");
	var part = "eye";
	
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

		var centerX = 250;
		var centerY = 300;
		var radius = 200;

		context.beginPath();
		context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
		context.fillStyle = 'yellow';
		context.fill();
		promptDraw("left ", "eye");
	}

	function promptDraw(which, choose) {
		part = which+choose;
		context.fillStyle = "white";
		context.fillRect(0,0,500,50);

		context.strokeStyle = "black";
		context.fillStyle = "black";
		context.font = "30px Georgia";
		context.fillText("Draw " + which + choose +"!", 25, 25);
	}

	function win(x ,y) {
		if (part == "left eye" && x>=0 && x<= 250 && y>=100 && y<=300) {
			context.beginPath();
			context.arc(x, y, 11, 0, 2 * Math.PI, false);
			context.fillStyle = 'black';
			context.fill();
			context.fillStyle = "white";
			context.fillRect(0,0,500,50);
			promptDraw("right ", "eye");
		} else if (part == "right eye" && x>=250&&x<=450&&y<=300&&y>=100) {
			context.beginPath();
			context.arc(x, y, 11, 0, 2 * Math.PI, false);
			context.fillStyle = 'black';
			context.fill();
			context.fillStyle = "white";
			context.fillRect(0,0,500,50);
			promptDraw("","mouth");
		} else if (part == "mouth" && y >= 300) {
			context.beginPath();
			context.arc(x, y, 15, 0, Math.PI, false);
			context.fillStyle = 'black';
			context.fill();
			context.fillStyle = "white";
			context.fillRect(0,0,500,50);
			context.fillStyle= "black";
			context.fillText("You win!!!!", 25,25);

			context.beginPath();
			context.arc(85, 300, 35, 0, 2 * Math.PI, false);
			context.arc(415, 300, 35, 0, 2 * Math.PI, false);
			context.fillStyle = 'rgb(236,96,138)';
			context.fill();
			part = "won";
			score++;
		} else if (part != "won") {
			context.clearRect(0,0,500,500);
			context.fillStyle = "black";
			context.fillText("You lost :c",25,25);
			part = "lost";
		}
	}
	draw();
})();