class Game{
    constructor(){
        
    }
    getState() {
        var gameStateRef = database.ref('gameState');
        gameStateRef.on("value", function (data) {
            gameState = data.val();
        })

    }

    update(state) {
        database.ref('/').update({
            gameState: state
        });
    }
    async start() {
            if (gameState === 0) {
                player = new Player();
                var playerCountRef = await database.ref('playerCount').once("value");
                if (playerCountRef.exists()) {
                    playerCount = playerCountRef.val();
                    player.getCount();
                   
                }
                form = new Form()
                form.display();
            }
    redJet = createSprite(200,500);
    redJet.addImage("player1",redJetImg);
    
    blueJet = createSprite(800,500);
    blueJet.addImage("player2",blueJetImg );
    players=[redJet,blueJet];

    redbulletGroup = new Group();
    bluebulletGroup = new Group();

        }
    
    play(){
        
        form.hide();
        player.getPos();
        Player.getPlayerInfo();
        image(back_img, 0, 0, 1000, 800);
 
        var index =0;
        drawSprites();
        
        if(keyDown(UP_ARROW)&& player.index != null) {//Move Up
            if(player.index === 1){
                players[0].setSpeedAndDirection(2, player.angle-90);
                player.updatePos(players[0].x,players[0].y,player.angle);
                player.getPos();
            }
            if(player.index === 2){
                players[1].setSpeedAndDirection(2, player.angle-90);
                player.updatePos(players[1].x,players[1].y,player.angle);
                player.getPos();
            }

        }

        if(keyWentUp(UP_ARROW)&& player.index != null){
            if(player.index === 1){
                players[0].velocityX = 0;
                players[0].velocityY = 0;
            }
            if(player.index === 2){
                players[1].velocityX = 0;
                players[1].velocityY = 0;
            }
        }
           
           if(keyDown(LEFT_ARROW)&& player.index != null) {//Move Left
            if(player.index === 1){
            player.angle -= 1;
            players[0].rotation = player.angle;
            player.updatePos(players[0].x,players[0].y,player.angle);
            player.getPos();
            }
            if(player.index === 2){
                player.angle -= 1;
            players[1].rotation = player.angle;
            player.updatePos(players[1].x,players[1].y,player.angle);
                player.getPos();
           
        }
    }
            if(keyDown(RIGHT_ARROW)&& player.index != null) {//Move Right
                if(player.index === 1){
                    player.angle += 1;
                    players[0].rotation = player.angle;
                    player.updatePos(players[0].x,players[0].y,player.angle);
                player.getPos();
                    }
                    if(player.index === 2){
                        player.angle += 1;
                    players[1].rotation = player.angle;
                    player.updatePos(players[1].x,players[1].y,player.angle);
                player.getPos();
                }
            }

            if(keyWentDown("space")){
                if(player.index){
                    this.spawnRedBullet();
                } else if (player.index){
                    this.spawnBlueBullet();
                }
                
                player.getBullet();
                var bullet = createSprite(player.Bx, player.By)
            }
            if(allPlayers !== undefined){
                var index = 0
                
          
            for(var plr in allPlayers){
                index = index + 1
               players[index - 1].x = allPlayers[plr].x
                players[index - 1].y = allPlayers[plr].y;
                players[index-1].rotation = allPlayers[plr].angle;
                if (plr === "player" + player.index){
                  fill("red")
                  
                 
                }else{fill("black")}
                textSize(15);
                text(allPlayers[plr].name , players[index - 1].x-20,players[index - 1].y+70)
              }
            }
             //Try to detect colloison between plane and  bullet
            // if(bulletGroup.isTouching(the oppsoite jet)){
            // score for current player will increase
            // look at fruit catcher game to help
    }

    
    end(){
       console.log("Game Ended");
    }
    spawnRedBullet(){
        var bullet = createSprite(player.x,player.y);
        bullet.addImage(redBulletImg);
        bullet.x = player.x;
        bullet.y = player.y;
        bullet.scale= 0.5;
        bullet.rotation = player.angle;
        bullet.setSpeedAndDirection(2, player.angle-90);
        redbulletGroup.add(bullet);
        player.updateBullet(bullet.x,bullet.y,bullet.rotation);

    }

    spawnBlueBullet(){
        var bullet = createSprite(player.x,player.y);
        bullet.addImage(blueBulletImg);
        bullet.x = player.x;
        bullet.y = player.y;
        bullet.scale= 0.5;
        bullet.rotation = player.angle;
        bullet.setSpeedAndDirection(2, player.angle-90);
        bluebulletGroup.add(bullet);
        player.updateBullet(bullet.x,bullet.y,bullet.rotation);
        //player.getBullet();
    }
}