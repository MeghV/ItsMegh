(function(){
	var c = document.getElementById("game");
	var context = c.getContext("2d");
	var choose = -1;

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
		var gradient2=context.createRadialGradient(100,100,500,100, 100 ,100,100);
		gradient2.addColorStop("0","orange");
		gradient2.addColorStop("0.2","magenta");
		gradient2.addColorStop("0.4","cyan");
		gradient2.addColorStop("0.6","pink");
		gradient2.addColorStop("0.8","orange");
		gradient2.addColorStop("1.0","cyan");

		context.fillStyle = gradient2;
		context.fillRect(0,0,500,500);



		var gradient=context.createLinearGradient(0,0,500,0);
		gradient.addColorStop("0","magenta");
		gradient.addColorStop("0.3","blue");
		gradient.addColorStop("0.5","red");


		context.fillStyle = gradient;
		context.font="110px Georgia";
		//context.moveTo(50, 50);
		var number = Math.ceil(Math.random() * 21)+10;
		var number2 = Math.ceil(Math.random() * 21)+10;
		context.fillText(number + " * " + number2, 100, 250); 


		choose = Math.floor(Math.random() * 6);
		var answers = [];

		for (var i = 0; i < 6; i++) {
			var getNumber = Math.ceil(Math.random() * 961);
			while (getNumber == number * number2) { 
				getNumber = Math.ceil(Math.random() * 961);
			}
			answers[i] = getNumber;
		}

		answers[choose] = number * number2;

		var chooseColor = [];

		for (var i = 0; i < 6; i++) {
			var num1 = Math.ceil(Math.random() * 255);
			var num2 = Math.ceil(Math.random() * 255);
			var num3 = Math.ceil(Math.random() * 255);
			chooseColor[i] = "rgb("+num1+", "+num2+", "+num3+")";
		}


		context.font="55px Arial";

		context.fillStyle = "rgba(0,0,0,0.05)";
		context.fillRect(40,75,95,65);
		context.fillStyle = chooseColor[0];
		context.fillText(answers[0], 40, 130);

		context.fillStyle = "rgba(0,0,0,0.1)";
		context.fillRect(210,75,95,65);
		context.fillStyle = chooseColor[1];
		context.fillText(answers[1], 210, 130);

		context.fillStyle = "rgba(0,0,0,0.1)";
		context.fillRect(360,75,95,65);
		context.fillStyle = chooseColor[2];
		context.fillText(answers[2], 360, 130);

		context.fillStyle = "rgba(0,0,0,0.1)";
		context.fillRect(40,340,95,65);
		context.fillStyle = chooseColor[3];
		context.fillText(answers[3], 40, 395);

		context.fillStyle = "rgba(0,0,0,0.1)";
		context.fillRect(210,340,95,65);
		context.fillStyle = chooseColor[4];
		context.fillText(answers[4], 210, 395);

		context.fillStyle = "rgba(0,0,0,0.1)";
		context.fillRect(360,340,95,65);
		context.fillStyle = chooseColor[5];
		context.fillText(answers[5], 360, 395);
	}

	function win(x, y) {
		if (x >=40&&x<=135&&y>=75&&y<=140) {
			context.clearRect(0,0,500,500);
			if (choose != 0) {
				choose = -1;
				context.fillText("You lose.", 145, 225);
			} else {
				context.fillText("You win!", 145, 225);	
				score++;		
			}
		} else if (x>=210&&x<=305&&y>=75&&y<=140) {
			context.clearRect(0,0,500,500);
			if (choose != 1) {
				choose = -1;
				context.fillText("You lose.", 145, 225);
			} else {
				context.fillText("You win!", 145, 225);
				score++;	
			}
		} else if (x>=360&&x<=455&&y>=75&&y<=140) {
			context.clearRect(0,0,500,500);
			if (choose != 2) {
				choose = -1;
				context.fillText("You lose.", 145, 225);
			} else {
				context.fillText("You win!", 145, 225);
				score++;	
			}
		} else if (x>=40&&x<=135&&y>=340&&y<=405) {
			context.clearRect(0,0,500,500);
			if (choose != 3) {
				choose = -1;
				context.fillText("You lose.", 145, 225);
			} else {
				context.clearRect(0,0,500,500);
				context.fillText("You win!", 145, 225);
				score++;	
			}
		} else if (x>=210&&x<=305&&y>=340&&y<=405) {
			context.clearRect(0,0,500,500);
			if (choose != 4) {
				choose = -1;
				context.fillText("You lose.", 145, 225);
			} else {
				context.clearRect(0,0,500,500);
				context.fillText("You win!", 145, 225);
				score++;	
			}
		} else if (x>=360&&x<=455&&y>=340&&y<=405) {
			context.clearRect(0,0,500,500);
			if (choose != 5) {
				choose = -1;
				context.fillText("You lose.", 145, 225);
			} else {
				context.fillText("You win!", 145, 225);
				score++;	
			}
		} 

	}

	draw();

})();
