(function(){
	var c = document.getElementById("game");
	var context = c.getContext("2d");
	var color1 = getRandomColor();
	var color2 = getRandomColor();
	var same = false;

	while (color1 == color2) {
		color2 = getRandomColor();
	}

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

	function getRandomColor() {
		var num1 = Math.ceil(Math.random() * 255);
		var num2 = Math.ceil(Math.random() * 255);
		var num3 = Math.ceil(Math.random() * 255);
		return "rgb("+num1+", "+num2+", "+num3+")";

	}

	var colorArray = [];

	function draw() {
		var chooseColor;
		var counter = -1;

		for (var i = 0; i < 3; i++) {
			for (var j = 0; j < 3; j++) {
				counter++;
				context.fillStyle = getRandomColor();
				var currX = j * 150 + 25;
				var currY = i * 150 ;
				context.fillRect(currX, currY, 150, 150);

				var randNum = Math.ceil(Math.random() * 2);
				if (randNum == 1) { 
					chooseColor = color1;
					colorArray[counter] = 1;
				} else {
					chooseColor = color2;
					colorArray[counter] = 2;
				}



				colorArray[counter] = randNum;

		      	context.beginPath();
				context.arc(currX + 75, currY + 75, 70, 0, 2 * Math.PI, false);
				context.fillStyle = chooseColor;
				context.fill();
				context.lineWidth = 5;
				context.strokeStyle = 'gray';
				context.stroke();
			}
		}
		
		colorArray[0] = 1;
      	context.beginPath();
		context.arc(100, 75, 70, 0, 2 * Math.PI, false);
		context.fillStyle = color1;
		context.fill();
		context.lineWidth = 5;
		context.strokeStyle = 'gray';
		context.stroke();

		colorArray[1] = 2;
      	context.beginPath();
		context.arc(250, 75, 70, 0, 2 * Math.PI, false);
		context.fillStyle = color2;
		context.fill();
		context.lineWidth = 5;
		context.strokeStyle = 'gray';
		context.stroke();

		context.fillStyle = "white";
		context.fillRect(0, 450, 500, 50);

		context.fillStyle = "black";
		context.font = "25px Georgia";
		context.fillText("Click to make circles same!",100,485);
	}

	function win(x,y) {
		for (var i = 0; i < colorArray.length - 1; i++) {
			if (colorArray[i] != colorArray[i + 1]) {
				same = false;
			}
		}

		if (!same) {
			var firstcol = x>24&&x<175;
			var firstrow = y>0&&y<151;
			var secondcol = x>174&&x<325;
			var secondrow = y>150&&y<301;
			var thirdcol = x>324&&x<475
			var thirdrow = y>300&&y<451;
			var current = 0;
			var reDraw = true;

			if (firstrow && firstcol) {
				current = 0;
				x = 100;
				y = 75;
			} else if (firstrow && secondcol) {
				current = 1;
				x = 250;
				y = 75;
			} else if (firstrow && thirdcol) {
				current = 2;
				x=400;
				y = 75;
			} else if (secondrow && firstcol) {
				current = 3;
				x = 100;
				y = 225;
			} else if (secondrow && secondcol) {
				current = 4;
				x = 250;
				y = 225;
			} else if (secondrow && thirdcol) {
				current = 5; 
				x = 400;
				y = 225;
			} else if (thirdrow && firstcol) {
				current = 6;
				x = 100;
				y = 375;
			} else if (thirdrow && secondcol) {
				current = 7;
				x = 250;
				y = 375;
			} else if (thirdrow && thirdcol) {
				current = 8;
				x = 400;
				y = 375;
			} else {
				reDraw = false;
			}

			var changeColor = "white";
			if (colorArray[current] == 1) {
				changeColor = color2;
				colorArray[current] = 2;
			} else {
				changeColor = color1;
				colorArray[current] = 1;
			}

			if (reDraw) {
		      	context.beginPath();
				context.arc(x,y, 70, 0, 2 * Math.PI, false);
				context.fillStyle = changeColor;
				context.fill();
				context.lineWidth = 5;
				context.strokeStyle = 'gray';
				context.stroke();
			}
		}

		same = true; 

		for (var i = 0; i < colorArray.length - 1; i++) {
			if (colorArray[i] != colorArray[i + 1]) {
				same = false;
			}
		}

		if (same == true) {
			context.fillStyle = "white";
			context.fillRect(0, 450, 500, 50);

			context.fillStyle = "black";
			context.font = "25px Georgia";
			context.fillText("You win!",190,485);
			score++;
		} 	
	}
	draw();

})();