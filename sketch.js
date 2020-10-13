var floor
var b
var floor2
var flo
var cloud
var score=0;
var obstacle1
var gamestate=1
var cactusgroup;
var cloudgroup;
var highscore=0;
var touches=[];
function preload(){
 trex1=loadAnimation ("trex1.png","trex3.png","trex4.png");
  floor1=loadAnimation("ground2.png");
  cloud1=loadAnimation("cloud.png");
  ob1=loadAnimation("obstacle1.png");
  ob2=loadAnimation("obstacle2.png");
  ob3=loadAnimation("obstacle3.png");
  ob4=loadAnimation("obstacle4.png");
  ob5=loadAnimation("obstacle5.png");
  ob6=loadAnimation("obstacle6.png");
  trexcollided=loadAnimation("trex_collided.png");
  restart=loadImage("restart.png");
  checkpointsound=loadSound("checkPoint.mp3");
  diesound=loadSound("die.mp3");
  jumpsound=loadSound("jump.mp3");
}
function setup() {
  
  createCanvas(windowWidth, windowHeight);
  b=createSprite(width/2,height/2);
  b.addAnimation("trex",trex1);
  b.addAnimation("trexd",trexcollided);
  b.scale=0.5;
 // b.debug=true;
//b.setCollider("circle",0,0,25);
  b.setCollider("rectangle",0,0,20,100,20);
  //floor2=createSprite(400,300,400,10);
  flo=createSprite(width/2,height-90,width,10);
  //flo.shapeColor=220;
  flo.visible=false;
  floor=createSprite(width/2,height-100,800,10);
  floor.addAnimation("fl",floor1);
   floor.velocityX=-3;
  cactusgroup=new Group();
  cloudgroup=new Group();
  restartgame=createSprite(width/2+40,height/4+60,10,10);
  restartgame.addImage(restart);
  restartgame.scale=0.5;
  
}


function draw() {
  background("white");
  
  if (gamestate==1){
    restartgame.visible=false;
    b.changeAnimation("trex", trex1);
    if ((touches.length>0 || keyDown(UP_ARROW))&& b.y>200){
    b.velocityY=-10;
    jumpsound.play();
      touches=[];
  }//end of if statement(trexmove)
     if (frameCount%50==0){
  cloud=createSprite(width,height);
  cloud.addAnimation("cloud",cloud1);
  cloud.scale=0.5;
  cloud.velocityX=-3;
    cloud.y=random(height/2-50, height/2);
  cloud.x=random(width,width+100);
    cloud.depth=0.21;
     cloud.lifetime=400;//makes the clouds dissapear at a certain point
     // console.log("cloud",cloud.depth);
     cloudgroup.add(cloud);
      
       
   }//end of if statement(cloud)
    
    if (score%200==0){
      checkpointsound.play();
      floor.velocityX=floor.velocityX-1;
      cactusgroup.setVelocityXEach(floor.velocityX);
      cloudgroup.setVelocityXEach(floor.velocityX);
    }
    
  if (frameCount%70==0){
  
    obstacle1=createSprite(width,height-110,10,10);
    obstacle1.scale=0.6;
    // obstacle1.addAnimation("obstacle",ob1);
    obstacle1.velocityX=-3;
    obstacle1.lifetime=600;
   // obstacle1.debug=true;
    r=Math.round(random(1,6));
    console.log(floor.velocityX);
    switch(r){
      case 1:obstacle1.addAnimation("ob1",ob1);break;
      case 2:obstacle1.addAnimation("ob2",ob2);break;
  case 3:obstacle1.addAnimation("ob3",ob3);break;
   case 4:obstacle1.addAnimation("ob4",ob4);break;
    case 5:obstacle1.addAnimation("ob5",ob5);break;
     case 6:obstacle1.addAnimation("ob6",ob6);break;
    }//end of switchcase statement(cactus)
    cactusgroup.add(obstacle1);   
  }//end of if
  score=score+1;
    b.velocityY=b.velocityY+0.5;
    if(b.isTouching(cactusgroup)){
      gamestate=2;
      diesound.play();
    }
if (score>highscore){
  highscore=score;
}
   
  }
  text("HighScore:",width/2+100,40);
  text(scorezeros()+highscore,width/2+165,40);
  text("Score:",width/2+100,20);
  text(scorezeros()+score,width/2+150,20  );
  // abcd=scorezeros();
 //%modulus 15%4=3 30%3=0 ,produces the remainder
  
  // console.log(random(1,5));
  // console.log(Math.round(random(1,10)));
  // console.log("trex",b.depth);
  b.collide(flo);
 
  if (floor.x<0){
    floor.x=200;
  }
 
  if(gamestate==2){
    floor.velocityX=0;
    cactusgroup.setVelocityXEach(0);
    cactusgroup.setLifetimeEach(-1);
    cloudgroup.setVelocityXEach(0);
    cloudgroup.setLifetimeEach(-1);
    b.changeAnimation("trexd",trexcollided);
    b.velocityY=0;
    text("GAMEOVER",width/2,100);
    if (touches.length>0 ||mousePressedOver(restartgame)){
      gamestate=1;
      cactusgroup.destroyEach();
      cloudgroup.destroyEach();
      score=0;
      touches=[];
    }
    restartgame.visible=true;
  }
  drawSprites();
}
function scorezeros(){
  if (score>0 && score<10){
      return "0000";
    }
  else if (score>=10 && score<100){
    return "000";
  }
  else if (score>=100 && score<1000){
    return "00";
  }
  else if (score>=1000 && score<10000){
    return "0";
  }
  else{
    return "";
  }
}