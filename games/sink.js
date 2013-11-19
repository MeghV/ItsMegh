(function(){ 
	var c = document.getElementById("game");
	var context = c.getContext("2d");
	var depth = 0;

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

	var yPos = 0;
	function draw() {
		context.fillStyle = "black";
		context.font = "25px Georgia";
		context.fillText("Douse fiery fireball!", 125, 25);	
		var xPos = Math.ceil(Math.random() * 460);
		yPos = Math.ceil(Math.random() * 250) - 50;
		context.beginPath();
		context.arc(xPos, yPos,15, 0, 2 * Math.PI, false);
		context.fillStyle = "red";
		context.fill();

	}

	function sink() {
		var addition = Math.ceil(Math.random() * 15);
		
		depth += addition;
		if (depth < 475) {
			context.fillStyle = "rgba(30,30,240, 0.1)";
			context.fillRect(0, 500 - depth, 500, depth);
		}


	}

	function makeBubbles() {
		var xPos = Math.ceil(Math.random() * 460);
		var yPos = Math.ceil(Math.random() * 460) + 60;
      	context.beginPath();
		context.arc(xPos, yPos, 30, 0, 2 * Math.PI, false);
		context.lineWidth = 1;
		context.strokeStyle = "white";
		context.stroke();
	}


	function win(x,y) {
		if (depth > 500 - yPos) {
			context.fillStyle = "white";
			context.fillRect(0, 0, 500, 30);
			context.fillStyle = "black";
			context.font = "25px Georgia";
			context.fillText("You did it!",100,25);
			score++;
		} else {
			sink();
		}
	}

	draw();

	var myVar2 = setInterval(function() {makeBubbles()},1000);

})();