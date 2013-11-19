/* Controller */

// encapsulated
var score = 0;
(function() {
	var gameLoop;
	var timeLoop;
	var scoreLoop;
	var oldScore=0;
	var time = 10;
	var lives = 8;//real value is later
	$(function(){
		console.log("onload has been called");
		//loop();
		start();
	});


	// run a timer;
	// run game
	function loop() {
		// searches textfile to make an array of games, run one of the games, returns whether person won or not
		console.log("loop has been called");

//START SEQUENCE HERE
		//var game = rungame();
		timer();
		gameLoop = setInterval(timer,12000);
		scoreLoop = setInterval(scoreChange,100);
		timeLoop = setInterval(callTime,1000);
	}	

	function rungame() {
		// lets time later: window.setInterval(timer, 10000);
		//read in the file
		console.log("rungame has been called");
		var chosenGame;
		var filePathString = "";
		$.getJSON('games.json', function(data) {
			var games = data.games;
			console.log(data);
			//alert(games.length);
			console.log("we got the json object");
			// alert(game.length);
			var rand = Math.floor(Math.random() * games.length);
			//alert(games[rand].name);
			chosenGame = games[rand];
			filePathString += chosenGame.filepath;
			//alert(filePathString);
		})
		// what happens after json call
		.done(function() {
			console.log("wer made it");
			var oHead = $('head');
			var gameScript= $(document.createElement("script"));
			gameScript.attr({
				type: "text/javascript",
				src: filePathString
			});
			gameScript.addClass("game");
			oHead.append(gameScript);
		});
		//mkae an array
		//randomly select from array
		//get file name
		
		// remove old scripts
		// return victory/not
	}

	function timer() {
		lives--;
		if(lives==-1){
			gameOver();
		} else{
			wipe();
			oldScore = score;
			setTimeout(rungame,1000);
		}
		
	}

	function wipe(){
		var old_element = document.getElementById("game");
		var new_element = old_element.cloneNode(true);
		old_element.parentNode.replaceChild(new_element, old_element);
		//var c=document.getElementById("game");
		//var ctx=c.getContext("2d");
		//ctx.clearRect ( 0 , 0 , 500 , 500 );
		$( ".game" ).remove();
	}

	function callTime(){
		var c=document.getElementById("controller");
			var ctx=c.getContext("2d");
		ctx.clearRect ( 0 , 0 , 500 , 200 );
		ctx.font="30px monospace";
		var color;
		if(time >=6) {
			color = "green";
		} else if(time >=4) {
			color = "yellow";
		} else {
			color = "red";
		}
		ctx.fillStyle=color;
		ctx.fillRect(0,0,(time)*(50),25)
		ctx.fillStyle="black";
		if(time == 11){
			ctx.fillText("Get ready",340,90);
		} else{
			ctx.fillText("Time: "+time,340,90);
		}
		if(time>=1){
			time--;
		} else{
			time = 11;
		}
		ctx.fillText("Score: "+score, 10,90);
		ctx.fillText("Lives: "+lives, 180,90);
	}


	function scoreChange(){
		if(score != oldScore){
			time=11;
			oldScore = score;
			clearInterval(gameLoop);
			setTimeout(waitOnWin,1000);
					
		}
	}
	function waitOnWin(){
		lives++;
		timer();
		clearInterval(gameLoop);
		gameLoop = setInterval(timer,11000);
	}
	function gameOver(){
		wipe();
		var c=document.getElementById("game");
		var ctx=c.getContext("2d");
		c.addEventListener("mousedown", getPosition, false);
		ctx.clearRect ( 0 , 0 , 500 , 500 );
		ctx.font="50px Georgia";
		ctx.fillText("GAME OVER",105,70);
		ctx.fillText("Click to try again",25,150);
		clearInterval(timeLoop);
		clearInterval(gameLoop);
		clearInterval(scoreLoop);
	}
	function start(){
		var c=document.getElementById("game");
		var ctx=c.getContext("2d");
		c.addEventListener("mousedown", getPosition, false);
		ctx.font="50px Georgia";
		ctx.fillText("Click to Start",105,70);
	}
	function getPosition(event)
	{
	lives = 6;
	score = 0;
  	loop();
	} 
})();
