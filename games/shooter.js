/* shooter */

(function(){
	var right = true;
	var right2 = true;
	var shootRight = true;
	var string = "Click faster!";
	var canvas = document.getElementById('game');
	var ctx = canvas.getContext('2d');
	var interv;

	var bgReady = false;
	var bgImage = new Image();
	bgImage.src = "games/cloud-bg.png";
	bgImage.onload = function() {
		bgReady = true;
	}

	var block = false;
	var blockImage = new Image();
	blockImage.src = "games/block-sprite.png";
	block.onload = function() {
		block = true;
	}

	var vicCoin = false;
	var coinImage = new Image();
	coinImage.src = "games/victory-coin.png";
	vicCoin.onload = function() {
		vicCoin = true;
	}

	var shootBlock = false;
	var shootImg = new Image();
	shootImg.src = "games/shooterGuy.png";
	shootBlock.onload = function() {
		shooter = true;
	}

	var coin = {
		x: canvas.width / 2,
		y: 30,
		speed: 5,
		alive: true
	};

	var coin2 = {
		x: canvas.width - 10,
		y: 65,
		speed: 8,
		alive: true
	};

	var shooter = {
		x: canvas.width/2,
		y: canvas.height - 75,
		speed: 4
	}

	var shot = {
		x: shooter.x,
		y: shooter.y - 25,
		speed: 1
	}


	function moveCoins() {
		if((coin.x + 25) >= canvas.width) {
			right = false;
		}
		if((coin.x) <= 0) {
			right = true;
		}
		if(right) {
				coin.x += coin.speed;
		} else {
				coin.x -= coin.speed;
		}

		if((coin2.x + 25) >= canvas.width) {
			right2 = false;
		}
		if((coin2.x) <= 0) {
			right2 = true;
		}
		if(right2) {
				coin2.x += coin2.speed;
		} else {
				coin2.x -= coin2.speed;
		}
	}

	function moveShooter() {
		coinCheck();

		if(!coin.alive && !coin2.alive) {
			console.log("no more coins!");
			clearInterval(interv);
			var img = $(document.createElement("img"));
			img.css({
				position: "absolute",
				left: "0",
				right: "0",
				top: "50",
				width: "500"});
			img.attr({
				src: "games/snoop.gif"
			});
			$("body").prepend(img);
			string = "SNOOOOOOOOOOOOOOOOOOOOOOOOOOOP!";
			setTimeout(function() {
				$("img").hide();
			}, 850);
			score++;
		} else {
			if((shooter.y + 50) < 0) {
				shooter.y = canvas.height;
			} 
			if((shooter.x + 50) >= canvas.width) {
				shootRight = false;
			}
			if((shooter.x) <= 0) {
				shootRight = true;
			}
			if(shootRight) {
					shooter.x += shooter.speed;
			} else {
					shooter.x -= shooter.speed;
			}
		}
		
	}

	function coinCheck() {
		if (shooter.x <= (coin.x + 30) &&
			coin.x <= (shooter.x + 30) &&
			shooter.y <= (coin.y + 30) &&
			coin.y <= (shooter.y + 30)) {
			coin.alive = false;
			coin.x = -100000;
			coin.y = -100000;
		}

		if(shooter.x <= (coin2.x + 30) &&
			coin2.x <= (shooter.x + 30) &&
			shooter.y <= (coin2.y + 30) &&
			coin2.y <= (shooter.y + 30)) {
			coin2.alive = false;
			coin2.x = -100000;
			coin2.y = -100000;
		}
	}
	canvas.addEventListener("mousedown", function() {
		setInterval(function(){
			shooter.y -= shooter.speed;
		}, 30)
		
	});
	var move = function() {
		moveCoins();
		moveShooter();		
	};

	var render = function() {
		move();
		
		ctx.drawImage(bgImage, 0, 0);
		for(i = 0; i < (canvas.width / 10); i++) {
			ctx.drawImage(blockImage, (i * 50), 165);
			ctx.drawImage(blockImage, (i * 50), 125);
		}
		ctx.drawImage(coinImage, coin.x, coin.y);
		ctx.drawImage(coinImage, coin2.x, coin2.y);
		ctx.drawImage(shootImg, shooter.x, shooter.y);
		ctx.font = "20px Arial";
		ctx.fillStyle = "white";
		ctx.fillText(string, 1, 490);
	}

	var draw = function() {
		render();

	}

	interv = setInterval(draw, 30);
})();