//Create variables here

var dog , dogImg , happyDogImg , database , foodS,foodStock;
var fedTime , lastFed , feed , addFood;
var foodObj,foodImg;


function preload()
{
	//load images here
  dogImg = loadImage("dogImg.png");
  happyDogImg = loadImage("dogImg1.png");
}

function setup() {
	createCanvas(1000, 400);

  database = firebase.database();

  foodObj = new Food();

  foodStock = database.ref("Food");
  foodStock.on("value" , readStock);
  
  dog = createSprite(800,200,150,150);
  dog.addImage(dogImg);
  dog.scale = 0.15;
  
  feed = createButton("Feed the Dog");
  feed.position(750,95);
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(650,95);
  addFood.mousePressed(addFoods);
}


function draw() 
{
  
  background(46,139,87);

  foodObj.display();

  fedTime = database.ref('FeedTime');
  fedTime.on("value", function(data)
  {
    lastFed = data.val();
  })

  fill(255,255,255);
  textSize(15);
  if (lastFed >= 12)
  {
    text("Last Fed: " + lastFed % 12 + "PM",350,30);
  }

  else if (lastFed == 0)
  {
    text("Last Feed: 12AM ",350,30);
  }

  else 
  {
    text("Last Feed: " + lastFed + "AM",350,30);
  }

  drawSprites();
}
  //add styles here

  function readStock(data)
  {
    foodS = data.val();
    foodObj.updateFoodStock(foodS);
  }

  function feedDog()
  {
    dog.addImage(happyDogImg);

    foodObj.updateFoodStock(foodObj.getFoodStock()-1);
    database.ref('/').update({Food : foodObj.getFoodStock() , FeedTime : hour()})
  }

  function addFoods()
  {
    foodS++;
    database.ref('/').update({Food: foodS})
  }

  

  