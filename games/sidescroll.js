/* sidescroll game */

(function(){
	var canvas = document.getElementById('game');
	if (!canvas || !canvas.getContext) {
	    return;
	}
	var ctx = canvas.getContext('2d');
	if (!ctx || !ctx.drawImage) {
	    return;
	} 

	function Drawable() {
		this.init = function(x,y) {
			this.x = x;
			this.y = y;
		}

		this.speed = 0;
		this.canvasWidth = 0;
		this.canvasHeight = 0;

		this.draw = function() {

		}
	}

	function Background() {
		this.speed = 1;

		this.draw = function() {
			this.y += this.speed;
			this.ctx.drawImage(bgImage, this.x, this.y);
			this.ctx.drawImage(bgImage, this.x, this.y - this.canvasHeight);
			if(this.y >= this.canvasHeight) {
				this.y = 0;
			}
		};
	}

	function Game() {
		this.init = function() {
			Background.prototype.context = this.ctx;
			Background.prototype.canvasWidth = this.canvas.width;
     		Background.prototype.canvasHeight = this.canvas.height;

     		this.background = new Background();
     		this.background.init(0,0);
		}
		this.start = function() {
    		animate();
  		};
	}

	Background.prototype = new Drawable();

	function animate() {
  requestAnimFrame( animate );
  game.background.draw();
}
 
/**
 * requestAnim shim layer by Paul Irish
 * Finds the first API that works to optimize the animation loop,
 * otherwise defaults to setTimeout().
 */
window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame   ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame    ||
      window.oRequestAnimationFrame      ||
      window.msRequestAnimationFrame     ||
      function(/* function */ callback, /* DOMElement */ element){
        window.setTimeout(callback, 1000 / 60);
      };
})();
	
	var game = new Game();
 
function init() {
  if(game.init())
    game.start();
}
})();
