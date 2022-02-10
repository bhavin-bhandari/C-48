var PLAY=1;
var END=0;
var gameState=PLAY; 
var player ,player1 , player2 , player3 , player_running;
var obstacle1 , obstacle2;
var obstacle01 , obstacle02 ; 
var background , backImg ;
var obstaclesGroup; 
var score=0;
var gameOverImg;

function preload (){
obstacle01 = loadImage("../images/cube.jpeg");
obstacle02 = loadImage("../images/dash.jpeg");
backImg= loadImage("../images/Background.jpeg");
player_running=loadAnimation("player1.jpg","player2.jpg","player3.jpg");
gameOverImg=loadImage("gameover.PNG")
}
function setup() {
  createCanvas(1535,730);
  

player= createSprite(200,200,10,10);
player.addAnimation('running' , player_running);
player.scale=0.25;

gameOver=createSprite(700,350);
gameOver.addImage(gameOverImg );

edges=createEdgeSprites();

obstaclesGroup=createGroup();


}

function draw() {
  background( backImg);  
  text("SCORE:" + score,100,100);
  if(gameState === PLAY){
  gameOver.visible=false;

  if(keyDown("space")&& player.y>=500){
    player.velocityY=-25;
  }
  player.velocityY=player.velocityY+0.8;


  spawnObstacles();
  score=score+Math.round(frameCount/150);


  if(obstaclesGroup.isTouching(player)){
    gameState=END;
  }
}else if(gameState===END){
    gameOver.visible=true;
    obstaclesGroup.setVelocityXEach(0);
    //obstaclesGroup.visible=false;
    player.velocityY=0;
    score=0;
  }


player.collide(edges[3]);
drawSprites();
}
function spawnObstacles(){
if (frameCount%150===0){
  var obstacle= createSprite(1100,670,10,10); 
obstacle.velocityX=-5;
 var rand = Math.round(random(1,2));
 switch(rand){
case 1: obstacle.addImage(obstacle01);
break;
case 2: obstacle.addImage(obstacle02);
break;
default:break;
 }
 obstacle.scale=0.5;
 obstaclesGroup.add(obstacle);
  }

}


