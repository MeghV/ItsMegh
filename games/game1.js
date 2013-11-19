console.log("swagGuyEscapes");
(function(){
var c=document.getElementById("game");
var ctx=c.getContext("2d");
c.addEventListener("mousedown", getPosition, false);

var winNum = 0;
var cx = 0;
var cy = 0;
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
//game from here on

function draw(){
	ctx.font="30px Arial";
	ctx.fillText("Press right!", 230, 40);
	ctx.drawImage(image, 100*winNum+100,40);

	var xPos = [];
	var yPos = [];
	for(var i=0;i<10;i++){
		xPos[i] = Math.floor(Math.random()*450);
		yPos[i] = Math.floor(Math.random()*350)+120;
	}
	cx = xPos[9];
	cy = yPos[9];
	

	for(var j = 0;j<9;j++){
		ctx.fillStyle = "blue";
		ctx.fillRect(xPos[j],yPos[j],50,50);
		ctx.fillStyle = "black";
		ctx.fillText("<", xPos[j]+15, yPos[j]+35);
	}
	ctx.fillStyle = "blue";
	ctx.fillRect(xPos[9],yPos[9],50,50);
	ctx.fillStyle = "black";
	ctx.fillText(">", xPos[9]+15, yPos[9]+35);


	ctx.stroke();
}
function win(x, y){
	if((x>=cx &&x<=cx+50) &&(y >=cy&&y<=cy+50)){
		winNum++;
		if(winNum>=4){
			score++;
			ctx.clearRect ( 0 , 0 , 500 , 500 );
			cx=-80;
			cy = -80;
			ctx.fillText("A winner is you!",120,40);
		} else{
			ctx.clearRect ( 0 , 0 , 500 , 500 );
			draw();	
		}
	} else if(cx!=-80){
		ctx.clearRect ( 0 , 0 , 500 , 500 );
		draw();
	}
	
}

function loadImage(name)

{

    // create new image object

    var image = new Image();

    // load image

    image.src = name;

    // return image object

    return image;

}
var image = new Image();
image.src = "img/swagGuy.png";
image.onload = function(){
	draw();
};
 
})();
