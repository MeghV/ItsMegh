/* test game.js */

(function() {
	(function () {
	  var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
	  window.requestAnimationFrame = requestAnimationFrame;
	})();

	var canvas = document.getElementById('game');
	var ctx = canvas.getContext('2d');

	//background drawImage
	var bgReady = false;
	var bgImage = new Image();
	bgImage.src = "img/goblin/background.png";
	bgImage.onload = function() {
		bgReady = true;
	}
	//hero drawImage
	var heroReady = false;
	var heroImage = new Image();
	heroImage.src = "img/goblin/hero.png";
	heroImage.onload = function() {
		heroReady = true;
	}
	//monster drawImage
	var monsterReady = false;
	var monsterImage = new Image();
	monsterImage.src = "img/goblin/monster.png";
	monsterImage.onload = function() {
		monsterReady = true;
	}


	//game objects
	var hero = {
		speed: 10, // movemeint in px/sec
		x: 0,
		y: 0
	};

	var monster = {
		x: 0,
		y: 0
	};

	var monstersCaught = 0;
	
	// Handle mouse click
	var coordX;
	var coordY;
	canvas.onmousedown = function(evt) {
		//if(debug) {
		//	console.log("Clicked: " + evt.clientX + ", " + evt.clientY);
		//}
		coordX = evt.offsetX;
		coordY = evt.offsetY;
	};

	// Handle keyboard controls
	// var keysDown = {};

	// addEventListener("keydown", function(e) {
	// 	keysDown[e.keyCode] = true;
	// }, false);

	// addEventListener("keyup", function(e) {
	// 	delete keysDown[e.keyCode];
	// }, false);

	// Reset the game when the player catches a mosnter
	var reset = function() {
		if(monstersCaught === 0) {
			hero.x = canvas.width / 2;
			hero.y = canvas.width / 2;
		}

		// throw the monster somewhere on the screen randomly
		if(monstersCaught < 3) {
			monster.x = Math.floor(Math.random() * (canvas.width - 32));
			monster.y = Math.floor(Math.random() * (canvas.height - 32));
		}
		
	}

	// Update game objects
	var update = function() {
		// move based on mouse click 
		var tx = coordX - hero.x,
	    ty = coordY - hero.y,
	    dist = Math.sqrt(tx * tx + ty * ty);

	    if (dist >= hero.speed) {
	   		velX = (tx / dist) * hero.speed;
	    	velY = (ty / dist) * hero.speed;
	    	hero.x += velX;
	    	hero.y += velY;
	  	}

		// Keyboard Code
		// if(38 in keysDown) { // keyCode 38 is arrow up: player holding up
		// 	hero.y -= hero.speed * modifier;
		// }
		// if(40 in keysDown) { // keyCode 40 is arrow down: player holding down
		// 	hero.y += hero.speed * modifier;
		// }
		// if(37 in keysDown) { // keyCode 37 is arrow left: player holding left
		// 	hero.x -= hero.speed * modifier;
		// }
		// if(39 in keysDown) { // keyCode 39 is arrow right: player holding right
		// 	hero.x += hero.speed * modifier;
		// }

		// are they touching?
		if (hero.x <= (monster.x + 32) &&
			monster.x <= (hero.x + 32) &&
			hero.y <= (monster.y + 32) &&
			monster.y <= (hero.y + 32)) {
			++monstersCaught;
			if(monstersCaught >= 3) {
				heroImage.src = "img/goblin/hero-winner.png";
				monster.x = -100;
				monster.y = -100;
				score++;
				window.clearInterval(interval);
			} else{
				reset();

			}
			
		}
	};

	var debug = false;

	addEventListener("keydown", function(e) {
		if(e.keyCode === 17) {
			debug = !debug;
		}
	}, false);


	var render = function() {
		if(bgReady) {

			ctx.drawImage(bgImage, 0, 0);
		}

		if(heroReady) {
			ctx.drawImage(heroImage, hero.x, hero.y);
		}

		if(monsterReady) {
			ctx.drawImage(monsterImage, monster.x, monster.y);
		}

		if(debug) {
			// location info: Hero
			ctx.font = "12px Arial";
			ctx.textAlign = "right";
			ctx.textBaseline = "top";
			ctx.fillText("X:" + Math.floor(hero.x) + " Y:" + Math.floor(hero.y), hero.x, hero.y);

			// location info: Monster
			ctx.font = "12px Arial";
			ctx.textAlign = "right";
			ctx.textBaseline = "top";
			ctx.fillText("X:" + Math.floor(monster.x) + " Y:" + Math.floor(monster.y), monster.x, monster.y);

			ctx.fillStyle = "rgb(250, 250, 250)";
			ctx.font = "24px Arial";
			ctx.textAlign = "right";
			ctx.textBaseline = "top";
			ctx.fillText("Debug mode ON", 470, 420);
		}
		// Score
		ctx.fillStyle = "rgb(250, 250, 250)";
		ctx.font = "24px Arial";
		ctx.textAlign = "left";
		ctx.textBaseline = "top";
		ctx.fillText("Goblins caught: " + monstersCaught, 32, 32);


		requestAnimationFrame(render);

	}

	var main = function() {
		// var now = Date.now();
		// var delta = now - then;
		update();
		render();
		// then = now;


	}

	reset();
	// var then = Date.now();

	var interval = setInterval(main, 30);
})();
