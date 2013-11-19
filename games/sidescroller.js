/* sidescroller */
var canvas = document.getElementById('game');
var ctx = canvas.getContext('2d');

function loadImage(){
    imgWidth = scrollImg.width,
    imgHeight = scrollImg.height;
    canvasTemp.width = imgWidth;
    canvasTemp.height =  imgHeight;    
    render();                
}

function render(){
    ctx.clearRect(0,0,canvasWidth,canvasHeight);

    if(scrollVal >= canvasWidth){
        scrollVal = 0;
    }

    scrollVal+=speed;                   
    ctx.drawImage(scrollImg,canvasWidth-scrollVal,0,scrollVal,imgHeight, 0, 0, scrollVal,imgHeight);
    ctx.drawImage(scrollImg,scrollVal,0,imgWidth, imgHeight);

     // To go the other way instead
     ctx.drawImage(scrollImg,-scrollVal,0,imgWidth, imgHeight);
     ctx.drawImage(scrollImg,canvasWidth-scrollVal,0,imgWidth, imgHeight);

    setTimeout(function(){render();},10);
}