var database;
var dog,happyDog,foodS,foodStock;
var dogimg1,dogimg2;
function preload()
{
	dogimg1=loadImage("images/dogimg.png");
  dogimg2=loadImage("images/dogimg1.png");
}

function setup() {
	createCanvas(500, 500);
  database=firebase.database();

  dog=createSprite(250,300,150,150);
  dog.addImage("dogimage",dogimg1);
  dog.scale=0.3;

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);

}


function draw() {  
background(46,139,87);

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage("dogimage",dogimg2);
  }
  drawSprites();
  fill(255,255,254);
  stroke("black");
  text("Food Remaining : " + foodS,170,100);
  textSize(13)
  text("Note: PRESS UP ARROW KEY TO FEED DRAGO MILK",110,30)
}

function readStock(data){
foodS=data.val();
}

function writeStock(x){
if(x<=0){
  x=0;
}
else{
  x=x-1;
}
database.ref('/').update({
Food:x  
})
}