var canvas=null;
ctx = null;
stx=null;
var scoreSpan;
var score=0;
var lives=3;
var points=0;
perSecond = 1000/30;
var ball = {x:575,y:620,xSpeed:-10,ySpeed:-8,color:"#42b9f4"};
var paddle = {x:550,y:650,width:100,height:10,color:"#42b9f4"};
var redBlock = {x:375,y:200,width:150,height:30,color:"red",point:20};
var blueBlock = {x:550,y:200,width:150,height:30,color:"blue",point:40};
var greenBlock = {x:725,y:200,width:150,height:30,color:"green",point:80};
var purpleBlock = {x:450,y:250,width:150,height:30,color:"purple",point:60};
var yellowBlock = {x:650,y:250,width:150,height:30,color:"yellow",point:50};
var obstacle = {x:480,y:380,width:150,height:10,color:"black"};
var blocks = [redBlock,blueBlock,greenBlock,purpleBlock,yellowBlock];
count = 0;




window.onload = function () {
    canvas = document.getElementById("canvas");
    scoreSpan = document.getElementById("score");
    liveSpan = document.getElementById("lives");
    score = scoreSpan.innerHTML;
    lives=liveSpan.innerHTML;
    ctx = canvas.getContext("2d");
    stx= canvas.getContext("2d");
    setInterval(update,perSecond);
}

function update(){
    this.canvas.style.cursor = "none";
    window.addEventListener('mousemove',function(e){
        paddle.x = e.pageX;
    });
    moveAll();
    drawAll();

}

function moveAll(){
    ball.x += ball.xSpeed;
    ball.y += ball.ySpeed;

    if(ball.x>canvas.width){
        ball.xSpeed *= -1;
    }
    if(ball.x<0){
        ball.xSpeed *= -1;
    }
    if(ball.y>canvas.height){

        if (lives>0){ lives=lives-1; ballReset();
        } else if (lives<=0){ alert("game over!"); dead(); resetScore(); }
        liveSpan.innerHTML = "<span id='score'>"+lives+"</span>";}
    if(ball.y<0){
        ball.ySpeed *= -1;
    }
    if(ball.x-paddle.x<80 && ball.x-paddle.x>0){
        if(paddle.y-ball.y<2 && paddle.y-ball.y>-3){
            ball.ySpeed *= -1;
        }
    }
    checkBlock();
    if(blocks.length===0 && count===0){
        alert("Congratulations!");
        dead();
        resetScore();
        count++;
    }

}

function resetScore(){
    scoreSpan.innerHTML = "<span id='score'>"+0+"</span>";
    liveSpan.innerHTML = "<span id='score'>"+3+"</span>";
}

function checkBlock(){

    for(var block of blocks){
        if(ball.x-block.x<block.width && ball.x-block.x>0){
            if(block.y-ball.y<5 && block.y-ball.y>-25){
                ball.ySpeed *= -1;
                ball.color = block.color;
                points+=block.point;
                scoreSpan.innerHTML = "<span id='score'>"+points+"</span>";
                blocks.splice(blocks.indexOf(block),1);
            }
        }
    }

    if(ball.x-obstacle.x<obstacle.width && ball.x-obstacle.x>0){
        if(obstacle.y-ball.y<10 && obstacle.y-ball.y>-10)
            ball.ySpeed *= -1;
    }

}
function dead() {
    ball.x=575;
    ball.y=620;
    ball.ySpeed=0;
    ball.xSpeed=0;
}

function ballReset(){
    ball.x=575;
    ball.y=620;
    ball.xSpeed=-10;
    ball.ySpeed=-8;
}

function drawAll(){
    colorBox("white",0,0,canvas.width,canvas.height);
    circle(ball.color,ball.x,ball.y,10);
    colorBox(paddle.color,paddle.x,paddle.y,paddle.width,paddle.height);
    colorBox(obstacle.color,obstacle.x,obstacle.y,obstacle.width,obstacle.height);
    drawBlocks();

}

function drawBlocks(){
    for(var block of blocks){
        colorBox(block.color,block.x,block.y,block.width,block.height);
    }
}

function colorBox(color,x,y,width,height){
    ctx.fillStyle = color;
    ctx.fillRect(x,y,width,height);
    stx.fillStyle = color;
    stx.fillRect(x,y,width,height);
}

function circle (color,x,y,radius){
    stx.fillStyle = color;
    stx.beginPath();
    stx.arc(x,y,radius,0,Math.PI*2);
    stx.fill();
}