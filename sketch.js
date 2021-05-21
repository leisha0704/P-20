var PLAY;
var END;
var gameState;
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var bananaGroup, obstacleGroup;
var backg,backImage;
var survivalTime =  0, score=0;

function preload(){
  
monkey_running = loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")       
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  
  backImage = loadImage("background01.png"); 
 
}



function setup() {
 createCanvas(600,400);
  
  background=createSprite(0,0,600,);
  background.addImage(backImage);
  background.scale=1;
  
  monkey=createSprite(80,315,20,200);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale=0.1 ;
   
  ground=createSprite(400,350,1200,10);
  ground.velocityX=-6;
  ground.x=ground.width/2;
  console.log(ground.x);
  
  bananaGroup=createGroup();
  obstacleGroup=createGroup();
  
  monkey.setCollider("circle",0,0,200);
  monkey.debug=true;
}


function draw() {
  
  background.velocityX = -6; 
  
    
    if (background.x < 0){
      background.x = background.width/2;
    }
  
  if(keyDown("space")&& monkey.y >= 320 ) {
    monkey.velocityY = -20;
  }
  
  monkey.velocityY = monkey.velocityY + 0.8;
  
  
  if (ground.x < 0){
    ground.x = ground.width/2;
  }
  
  ground.visible=false;
  
  bananas();
  obstacles();
  
  monkey.collide(ground);
  
  if(bananaGroup.isTouching(monkey)){
    score=score+2;
    bananaGroup.destroyEach(); 
  }
  
  switch(score){
    case 10 : monkey.scale=0.12;
      break;
    case 20: monkey.scale=0.14
      break;
    case 30: monkey.scale=0.16
      break;
    case 40: monkey.scale=0.16
      break;
    default: break;
      
  }

 
  if(obstacleGroup.isTouching(monkey)){
     monkey.scale=0.09;
     }
  
 /* if(obstacleGroup.isTouching(monkey)){
    text("Game Over",300,300);
  }*/
  
  stroke("black");
  textSize(20);
  fill("white");
  survivalTime  = survivalTime + Math.round(frameCount/100);
  
  console.log(monkey.scale);
  
  drawSprites();
  text("score: "+score,500,50);
  text("Survival Time: " + survivalTime,100,50);
   
}

function bananas(){
  
  if (frameCount % 150 === 0) {
    banana= createSprite(600,200,40,10);
    banana.addImage(bananaImage)
    banana.y = Math.round(random(200,300))
    banana.scale = 0.1;
    banana.velocityX = -3;
    banana.lifetime = 200;
    
    bananaGroup.add(banana); 
    }  
}

function obstacles(){
  if(frameCount % 300 === 0){
  obstacle = createSprite(600,330,10,10);
  obstacle.addImage(obstacleImage)
  obstacle.velocityX = -6;
  obstacle.scale = 0.2;

  obstacle.lifetime = 200;

  obstacleGroup.add(obstacle);
}

}



