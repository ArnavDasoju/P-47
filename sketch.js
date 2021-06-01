const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var spacebj,spacebjimg
var rocket,rocketimg 
var meteorsGroup,meteorimg
var coinGroup,coinimg
var ufoimg
var fireballimg

var edge1,edge2,edge3,edge4

var score;
var coincount = 0

var engine, world;



function preload() {
 
spacebjimg = loadImage("images/spacebg.jpg")
rocketimg = loadImage("images/ROCKETIMAGE.png")
meteorimg = loadImage("images/meteorimg.png")
coinimg = loadImage("images/coinimg.png") 
ufoimg = loadImage("images/UFO.png")
fireballimg = loadImage("images/FIREBALL.png")

}

function setup() {
  createCanvas(1000,500);
engine = Engine.create();
world = engine.world;

background = createSprite(0,0,1000,500);
background.addImage(spacebjimg);
background.x=background.width/2
background.velocityX=-4

rocket = createSprite(500,250)
rocket.addImage(rocketimg)
rocket.scale = 0.35

rocket.setCollider("rectangle",0,0,100,400);
rocket.debug = true


meteorsGroup = createGroup();
coinGroup = createGroup();
enemyGroup = createGroup();

score = 0;


}

function draw() {
  textSize(25)
  
  fill("gold")
  text("Score: "+ score, 500,50);
  score = score + Math.round(getFrameRate()/60);

  fill("purple")
  text("Coincount: " + coincount, 100,50);




  if(background.x<100){
    background.x=background.width/2;
  }


  if(score > 0 && score === 50){
    Ufo();


  }

  if(score > 0 && score === 50){
    Enemy();


  }


 

if(keyWentDown(UP_ARROW)){
  rocket.velocityY = -7;
  }
  
  if(keyWentDown(DOWN_ARROW)){
  rocket.velocityY = 7;
  }
  
  if(keyWentDown(RIGHT_ARROW)){
  rocket.velocityX = 7;
  }
  
  if(keyWentDown(LEFT_ARROW)){
  rocket.velocityX = -7;
  }
  
  if(meteorsGroup.isTouching(rocket)){
  
  
    text("GAME OVER"+ score, 1000,500);
    rocket.velocityX = null
    rocket.velocityY = null

    score = null

    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
     
     obstaclesGroup.setVelocityXEach(0);
     cloudsGroup.setVelocityXEach(0);
  
  }

 
 

  
  if(rocket.x > 1000 || rocket.x < 0 || rocket.y > 500 || rocket.y < 0){
    
    rocket.velocityX = null
    rocket.velocityY = null

    score = null

  obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
     
     obstaclesGroup.setVelocityXEach(0);
     cloudsGroup.setVelocityXEach(0);
}



  spawnMeteors();
  spawnCoins()
  CoinCount();


  drawSprites()

}

function spawnMeteors() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var meteor = createSprite(600,1000,40,10);
    meteor.x = Math.round(random(80,1000));
    meteor.addImage(meteorimg);
    meteor.scale = 0.15;
    meteor.velocityY = -30;
    
     //assign lifetime to the variable
     meteor.lifetime = 200;
    
    //adjust the depth
    meteor.depth = rocket.depth;
    rocket.depth = rocket.depth + 1;
    
    //add each cloud to the group
    meteorsGroup.add(meteor);
  }


}

function spawnCoins(){
  if (frameCount % 70 === 0) {
    var coin = createSprite(600,1000,40,10);
    coin.x = Math.round(random(80,1000));
    coin.addImage(coinimg);
    coin.scale = 0.07;
    coin.velocityY = -30;
    
     //assign lifetime to the variable
     coin.lifetime = 100;
    
    //adjust the depth
    coin.depth = rocket.depth;
    rocket.depth = rocket.depth + 1;
    
    //add each cloud to the group
    coinGroup.add(coin);
  }





}

function CoinCount(){

  if(coinGroup.isTouching(rocket)){

    coinGroup.destroyEach()
    coincount = coincount + 1

    
    
  }


}

function Ufo(){
  var ufo = createSprite(50,25,100,100);
  ufo.addImage(ufoimg)

  


}

function Enemy(){
  if(score > 0 && score === 50){

    if(frameCount % 30 === 0 ){

    var enemy = createSprite(100,25,100,100);
    enemy.addImage(fireballimg);
    enemy.scale = 0.01
    enemy.velocityX = 8
    
    enemy.debug = true

    enemyGroup.add(enemy);

    rocket.x = enemy.x

    
    }
    
  
  }

  



}
