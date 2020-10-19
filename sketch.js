
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var bananaGroup, obstaclesGroup;
var score = 0;
var ground;
var PLAY;
var gameState = PLAY;
var hungerLevel = 100;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(650,250);
  
  monkey = createSprite(50,200,50,75);
  monkey.addAnimation("monkey_running","sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png" );
  monkey.scale = 0.1;
  
  ground = createSprite(325,225,750,25);
  ground.shapeColor = "grey";
  ground.velocityX = -7;
  
  bananaGroup = new Group();
  obstaclesGroup = new Group();
}


function draw() {
  background(225);
  
  ground.x = ground.width/2;
  
  text("Survival Time : " + score, 500, 25);
  score = score + Math.round(getFrameRate()/60);
  
  text("Hunger Level : " + hungerLevel, 250, 25);
    
  if(keyDown("space") && monkey.y>=181){
    monkey.velocityY = -12;
    }
  
   monkey.velocityY = monkey.velocityY + 0.8;
  
  monkey.collide(ground);
  
  if(bananaGroup.isTouching(monkey)){
    hungerLevel = hungerLevel - 1;
    bananaGroup.destroyEach();
  }
  
  if(hungerLevel === 0){
    bananaGroup.velocityXEach(0);
    obstaclesGroup.velocityXEach(0);
    monkey.velocityY = 0;
    textSize(50);
    text("You Win!!");
  }
  
  if(obstaclesGroup.isTouching(monkey)){
    bananaGroup.setVelocityXEach = 0;
    obstaclesGroup.setVelocityXEach    = 0;
    monkey.velocityX = 0;
    monkey.velocityY = 0;
    ground.velocityX = 0;
    textSize(50);
    text("Game Over!!"); 
    ground.velocityY = 0
  }
  
  drawSprites();
  food();
  spawnObstacles();
}

function food(){
  if(frameCount % 80 === 0){
    banana = createSprite(650,100,25,25);
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.y = Math.round(random(70,130));
    banana.velocityX = -4;
    banana.lifetime = 200;
    bananaGroup.add(banana);
  }
}

function spawnObstacles() {
  if(frameCount % 90 === 0) {
    obstacle = createSprite(650,180,10,40);
    obstacle.addImage(obstacleImage);
    
    obstacle.velocityX = (-4);
               
    obstacle.scale = 0.2;
    obstacle.lifetime = 300;
    
    obstaclesGroup.add(obstacle);
  }
}


