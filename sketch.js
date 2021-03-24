var database;
var gameState = 0,playerCount;
var redJetImg, redJet;
var blueJetImg, blueJet;
var back_img;
var allPlayers, player;
var players =[];
var form, game;
var redBulletImg, blueBulletImg;
var x = 200 ;
var y = 100;
var redbulletGroup, bluebulletGroup;

function preload(){
redJetImg = loadImage("images/redJet.png");
blueJetImg = loadImage("images/blueJet.png");
back_img = loadImage("images/background.jpg");
redBulletImg = loadImage("images/redBullet0.png");
blueBulletImg = loadImage("images/blue_bullet0.png");
  
}
function setup() {
  createCanvas(1000, 600);
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();
  
}

function draw() {


 if (gameState === 1) {
  clear();
  Player.getPlayerInfo();
 
  
 for(var plr in allPlayers){
  x = x + 200
      index = index+1;
      players[index -1].x = x;
      players[index - 1].y = y;
      player.updatePos(players[index-1].x,players[index-1].y);
  }
  gameState = 2;
}
 if(gameState === 2){
  game.play();
 }
 if (gameState === 3) {
  game.end();
 }
 if (playerCount === 2) {
  game.update(1);
}
}
