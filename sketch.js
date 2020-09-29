var block,block2;
var jungle1,jungle1img;
var wood1,wood1img,wood2,wood2img,stone,stoneIMG;
var mogli,mogliIMG,tiger,tigerIMG,wolf,wolfIMG,pantherIMG;
var apple,appleIMG,banana,bananaIMG,melon,melonIMG,orange,orangeIMG,pine,pineIMG;
var score = 0;

function preload(){
    jungle1img = loadImage("images/jungle.png");
    wood1img = loadImage("images/woodLog3.jpg");
    mogliIMG = loadImage("images/mowgli.png");
    tigerIMG = loadImage("images/tiger.gif");
    appleIMG = loadImage("images/apple2.png");
    bananaIMG = loadImage("images/banana2.png");
    melonIMG = loadImage("images/melon2.png");
    orangeIMG = loadImage("images/orange2.png");
    pineIMG = loadImage("images/pineapple2.png");
    wolfIMG = loadImage("images/wolf.gif");
    fireIMG = loadImage("images/flame.png");
    stoneIMG = loadImage("images/stone.png");
    pantherIMG = loadImage("images/panther.png");
    pantherGroup = new Group();
    stoneGroup = new Group();
    fruitGroup = new Group();
    wolfGroup = new Group();
    fireGroup = new Group();
    faceGroup = new Group();
}

function setup(){
    createCanvas(displayWidth-2,displayHeight-30);
 
    
 

    jungle1 = createSprite(displayWidth/2-800, displayHeight-400,displayWidth,displayHeight+300);
    jungle1.addImage("jungle1",jungle1img);
    jungle1.scale= 1.5;
    jungle1.velocityX = -3;
    jungle1.x = displayWidth/2-800 ;

    block = createSprite(displayWidth/2-300,displayHeight/2,10,displayHeight);
    block.visible=false;

    block2 = createSprite(displayWidth/2-1150,displayHeight/2,10,displayHeight);


    wood1 = createSprite(displayWidth/2-300,displayHeight/2 + 340,displayWidth*5,displayHeight-200);
    wood1.addImage("wood1",wood1img);
    wood1.scale= 1.3;

    wood2 = createSprite(displayWidth/2+300,displayHeight/2 + 340,displayWidth,displayHeight-200);
    wood2.addImage("wood2",wood1img);
    wood2.scale=1.3;

    mogli = createSprite(displayWidth/2-20,displayHeight/2+200,displayWidth,displayHeight-150);
    mogli.addImage(mogliIMG);
    mogli.scale=0.45;

    tiger = createSprite(displayWidth/2-500,displayHeight/2+185,displayWidth,displayHeight-150);
    tiger.addImage(tigerIMG);
    tiger.scale=0.35;

    

    
}


function draw(){
    
    jungle1.velocityX = -3;

    score=score+Math.round(getFrameRate()/60);

    if(keyDown("space") ){
        mogli.velocityY=-10;
    }
    mogli.velocityY=mogli.velocityY+0.7;

   if(jungle1.x <600){
        jungle1.x = displayWidth/2 ;
    }

    if(wolfGroup.isTouching(tiger)){
       tiger.velocityX=-6;
    }
    if(tiger.x<-200){
       tiger.velocityX=4;
    }
    if(wolfGroup.isTouching(fireGroup)){
       wolfGroup.destroyEach();
    }
    if(mogli.isTouching(fruitGroup)){
       fruitGroup.destroyEach();
    }
    if(fruitGroup.isTouching(mogli)){
       score=score+5;
    }
    if(fireGroup.isTouching(stoneGroup)){
      fireGroup.destroyEach();
    }
    if(stoneGroup.isTouching(tiger)){
       stoneGroup.destroyEach();
    }
    if(pantherGroup.isTouching(tiger)){
       tiger.velocityX=-6;
    }
    if(tiger.isTouching(block2)){
       tiger.velocityX=6;
    }
    if(pantherGroup.isTouching(stoneGroup || fireGroup)){
       pantherGroup.destroyEach();
    }
    
    console.log(mogli.y);
    mogli.collide(wood1); 
    tiger.collide(block);
   
    
    fruits();
    spawnWolf();
    spawnFire();
    spawnStone();
    spawnPanther();
    drawSprites();

    fill(176,12,81);
    stroke(4);
    textSize(30);
    text("score :"+score,displayWidth/2+450,displayHeight/2-250);
    
}

function fruits(){
    if (frameCount % 200 === 0) {
        var fruit = createSprite(displayWidth/2+1000,displayHeight/2+20,displayWidth,displayHeight-150);
        fruit.velocityX = -6;
        fruit.lifetime=300;
        var rand = Math.round(random(1,5));
        switch(rand){
           case 1: fruit.addImage("fruit1",appleIMG);
           break;
           case 2: fruit.addImage("fruit1",bananaIMG);
           break;
           case 3: fruit.addImage("fruit1",melonIMG);
           break;
           case 4: fruit.addImage("fruit1",orangeIMG);
           break;
           case 5: fruit.addImage("fruit1",pineIMG); 
        }
        fruitGroup.add(fruit);
}
}
function spawnWolf(){
    if(frameCount % 450 === 0){
        var wolf = createSprite(displayWidth/2+1000,displayHeight/2+190,displayWidth,displayHeight-150);
        wolf.velocityX=-8;
        wolf.lifetime=200;
        wolf.addImage(wolfIMG);
        wolfGroup.add(wolf);
    }
}
function spawnFire(){
    if(frameCount % 900 === 0){
       var fire = createSprite(displayWidth/2+900,displayHeight/2+250,displayWidth/2,displayHeight-150);
       fire.velocityX=-6;
       fire.scale=0.32;
       fire.lifetime=185;
       fire.addImage(fireIMG);
       fire.depth=wood2.depth;
       wood2.depth=wood2.depth+1;
       fire.depth=wood1.depth;
       wood1.depth=wood1.depth+1;
       fireGroup.add(fire);
       }
}
function spawnStone(){
   if(frameCount % 400 === 0){
       var stone = createSprite(displayWidth/2+900,displayWidth/2-50,displayWidth,displayHeight-150);
       stone.velocityX=-7;
       stone.scale=0.35;
       stone.lifetime=180;
       stone.addImage(stoneIMG);
       stone.depth=wood2.depth;
       wood2.depth=wood2.depth+1;
       stone.depth=wood1.depth;
       wood1.depth=wood1.depth+1;
       stoneGroup.add(stone);
   }
}
function spawnPanther(){
    if(frameCount % 800 === 0){
    var panther = createSprite(displayWidth/2+900,displayHeight/2+216,displayWidth,displayHeight-150);
    panther.velocityX=-8;
    panther.scale=0.04;
    panther.addImage(pantherIMG);
    pantherGroup.add(panther);
    }
}
