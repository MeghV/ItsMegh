/* crush da cars*/
(function(){
var c=document.getElementById("game");
var ctx=c.getContext("2d");
c.addEventListener("mousedown", getPosition, false);

var minitime = 1;
var move;
function getPosition(event)
{
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
function draw(){
	move = setInterval(function(){
		ctx.clearRect(0,0,500,500)
		minitime++;
		ctx.font = "30px Arial";
		ctx.fillText("Catch Snowmen",200,150);
		ctx.fillText("☃",25*minitime,250);

		if(minitime >= 20){
			minitime = 1;
		}

		ctx.rect(200,200,200,100);
		ctx.stroke();
		ctx.moveTo(300,240);
		ctx.lineTo(300,260);
		ctx.stroke();
		ctx.moveTo(290,250);
		ctx.lineTo(310,250);
		ctx.stroke();
		ctx.font = "30px monospace";
		ctx.fillText("TARGET",245,350);
	},40);
}
function win(x,y){
console.log("hi");
	if((minitime>=8)&&(minitime<=16)){
		clearInterval(move);
		ctx.drawImage(image,minitime*25-105 ,15);
		ctx.drawImage(image,minitime*25-105 ,15);
		ctx.drawImage(image,minitime*25-105 ,15);
		ctx.drawImage(image,minitime*25-105 ,15);
		ctx.drawImage(image,minitime*25-105 ,15);
		ctx.drawImage(image,minitime*25-105 ,15);
		score++;
	} else{
		clearInterval(move);
		ctx.clearRect(0,0,500,500)
		ctx.fillText("Snowman lost", 200,70);
	}	
}
var image = new Image();
image.src = "img/fireball.png";
image.onload = function(){
	draw();
};
})();
