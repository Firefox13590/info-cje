
/*

    Setup de page

*/
document.title="MILLER KILLER"
canvas = document.createElement("canvas")
document.body.appendChild(canvas)
document.body.style.margin ="0"
document.body.style.backgroundColor = "black"


/*

    CSS de canvas

*/
canvas.width = 800
canvas.height = 800
canvas.style.backgroundColor = "black"
canvas.style.display = "block"
canvas.style.margin = "auto"
canvas.style.marginTop = "30px"
ctx = canvas.getContext("2d")


/*

    Initialisation des assets

*/
background = new Image
background.src = "Assets/MapFinale.png"

player = new Image
player.src = "Assets/player.png"

bulletImage = new Image
bulletImage.src = 'Assets/bullet.png'

enemyImage = new Image
enemyImage.src = "Assets/Enemy2.png"


var dagueImage = new Image;
dagueImage.src = "Assets/dagr.png";

var fleauImage = new Image;
fleauImage.src = "Assets/fleauSpreadShit.png";



coinImage = new Image
coinImage.src = "Assets/coin.png"
chestImage = new Image
chestImage.src = "Assets/luckyBlock.png"

healImage = new Image
healImage.src = "Assets/healIcon.png"

healthBarImage = new Image
healthBarImage.src = "Assets/healthbar.png"

shotgunImage = new Image
shotgunImage.src = "Assets/shotgun.png"

pistolImage = new Image
pistolImage.src = "Assets/pistol.png"

ar15Image = new Image
ar15Image.src = "Assets/ar15.png"


rerunOst = new Audio
rerunOst.src = "Assets/Sounds/rerun.mp3"

pistolSound = new Audio
pistolSound.src = "Assets/Sounds/pistol.mp3"

ARSound = new Audio
ARSound.src = "Assets/Sounds/AR.wav"

shotgunSound = new Audio
shotgunSound.src = "Assets/Sounds/shotgun.wav"

hurtSound = new Audio
hurtSound.src = "Assets/Sounds/hurt.wav"

chestSound = new Audio
chestSound.src = "Assets/Sounds/openChest.wav"

healSound = new Audio
healSound.src = "Assets/Sounds/heal.wav"

/*

    Variables

*/


const hudWeapon1 = {
    x: canvas.width - 15,
    y: 50,
    color: "white",

    draw: function(){
        ctx.font = "25px pixelFont"
        ctx.fillStyle = this.color
        if(mainWeapon.id == firstWeapon.id){
            ctx.fillStyle = "yellow"
        }
    ctx.textAlign = "right"
    ctx.fillText("1: " + firstWeapon.id, this.x, this.y)
    }
}
const hudWeapon2 = {
    x: canvas.width - 15,
    y: 100,
    color: "white",

    draw: function(){
        ctx.font = "25px pixelFont"
        ctx.fillStyle = this.color
        if(mainWeapon.id == secondWeapon.id){
            ctx.fillStyle = "yellow"
        }
    ctx.textAlign = "right"
    ctx.fillText("2: " + secondWeapon.id, this.x, this.y)
    }
}
var money = 0
const hudMoney = {
    x: 8,
    y: 128,
    w: 64,
    h: 64,
    color: "white",

    draw: function(){
        ctx.drawImage(coinImage, 0, 0, 64, 64, this.x, this.y - this.h/2 - 12.5, this.w, this.h)
        ctx.font = "25px pixelFont"
        ctx.fillStyle = this.color
        ctx.textAlign = "left"
        ctx.fillText(" x" + money, this.x + this.w, this.y)
    }
}

HUD = [hudWeapon1, hudWeapon2, hudMoney]
    
var pageStatus = "menu"
const collisionCode = 1
const chestCode = 29
const enemyCode = 41
const healsCode = 27

offset = {
    x: -1600,
    y: -3488,
}


allBullets = []
enemies = []

pressedKeys = {
    up: false,
    down: false,
    right: false,
    left: false,

}
var hudTutorial ={
    x:1632 + offset.x + 20,
    y:3232 + offset.y + 50,
    draw: function(){
        ctx.globalAlpha = 1
        ctx.font = "25px pixelFont"
        ctx.fillStyle = "blue"
        ctx.textAlign = "left"
        ctx.fillText("W A S D TO MOVE", this.x, this.y + 400)
        ctx.fillText("PRESS SHIFT WHEN", this.x, this.y + 250)
        ctx.fillText(" MOVING TO DASH", this.x, this.y + 300)
        ctx.textAlign = "right"
        ctx.fillStyle = "yellow"
        ctx.fillText("DRAG MOUSE AND", this.x +700, this.y + 350)
        ctx.fillText(" CLICK TO SHOOT", this.x +700, this.y + 400)
    }
}
let now, elapsed, fpsInterval, then, startTime


var dashInput = 0;
var swordInput = false;
var sCd = 0;
var decreaseDash = 0;
var ballsInput = false;


/*

    Objets

*/
backgroundObject = {
    img: background,
    x: offset.x,
    y: offset.y,

    draw: function(){
        ctx.globalAlpha = 1;
        ctx.drawImage(this.img, this.x, this.y)

    }
}

playerObject = {
    img: player,
    x:384,
    y:384,
    w: 32,
    h: 32,
    playerSpeed: 4,
    mvtBoost: false,
    
    dashing : 512,
    

    draw: function(){
        ctx.globalAlpha = 1;
        ctx.drawImage(this.img, this.x, this.y)

        
        if(mainWeapon == dagger && playerObject.mvtBoost == false){
            playerObject.playerSpeed += 4;
            playerObject.mvtBoost = true;
            console.log(playerObject.playerSpeed);
        }else if(mainWeapon != dagger && playerObject.mvtBoost == true){
            playerObject.playerSpeed -= 4;
            playerObject.mvtBoost = false;
            console.log(playerObject.playerSpeed);
        }
        
    }
    
}

var winZone = {
    x: 1952 + offset.x,
    y: 64 + offset.y,
    w: 96,
    h: 96,
}


healthBar = {
    x: 0,
    y: 0,
    pv: 20,
    maxPV: 20,
    w: this.pv/this.maxPV * 256,
    h: 64,
    color: "lawngreen",
    
    draw: function(){
        this.w = this.pv/this.maxPV * 256
        ctx.globalAlpha = 1;
        ctx.fillStyle = "red"
        ctx.fillRect(this.x + 64, this.y + 2, 256 - 2, this.h - 4)
        ctx.fillStyle = this.color
        ctx.fillRect(this.x + 64, this.y + 2, this.w - 2, this.h - 4)
        ctx.drawImage(healthBarImage, this.x, this.y)
    }
}
var cursor = {
	x: canvas.width,
	y: canvas.height/2
}





var touche = {
    x : canvas.width/2 - 32,
    y : canvas.height/2 - 32,
    w : 64,
    h : 32,
    color: "white",

    draw: function(){
        if(dagger.rotation <= 0){
            touche.x = canvas.width/2 - 32;
            touche.y = canvas.height/2;
            touche.w = 64;
            touche.h = 32;
        }else{
            touche.x = canvas.width/2 - 32;
            touche.y = canvas.height/2 - 32;
            touche.w = 64;
            touche.h = 32;
        }

        if(mainWeapon.id == dagger.id){
            ctx.globalAlpha = 1;
        }else{
            ctx.globalAlpha = 0;
        }
        ctx.strokeStyle = touche.color;
        ctx.strokeRect(touche.x, touche.y, touche.w, touche.h);
    }
}

var cbt = {
    x : canvas.width/2 - 48,
    y : canvas.height/2 - 48,
    w : 96,
    h : 96,
    color: "white",

    draw: function(){

        if(mainWeapon.id == scourge.id){
            ctx.globalAlpha = 1;
        }else{
            ctx.globalAlpha = 0;
        }
        ctx.strokeStyle = cbt.color;
        ctx.strokeRect(cbt.x, cbt.y, cbt.w, cbt.h);
    }
}


var shotgun = {
	x: canvas.width/2,
	y: canvas.height/2,
	w: 50,
	h: 15,
	color: "orange",
	rotation: 0,
    bulletNumber:5,
	frameS: 9,
	frameR: 4,
	animate: false,
	image:  "Shotgun1 spreadsheet.png",
    id: "SHOTGUN",
    accuracy:1,
    damage:1,
    bulletSpeed:4,
    cooldown:60,
    cooldownStatus:60,
    draw: function(){
        var dx = (playerObject.x + playerObject.w/2 - cursor.x);
        var dy = (playerObject.y + playerObject.h/2 - cursor.y);
        var angle = Math.atan2(dy, dx)
        this.rotation = angle

        if(cursor.x > playerObject.x + playerObject.w/2){
            ctx.save()
            ctx.translate(playerObject.x + playerObject.w/2, playerObject.y+ playerObject.h/2);
            ctx.rotate(this.rotation + Math.PI);
            
            
            
            ctx.globalAlpha = 1;
            ctx.fillStyle = this.color;
            ctx.drawImage(shotgunImage, 0, 0, 31, 32, -16, -32, 64, 64)
            
            
            ctx.restore()
            ;
            }
            else if(cursor.x <= playerObject.x + playerObject.w/2){
                ctx.save()
            ctx.translate(playerObject.x + playerObject.w/2, playerObject.y+ playerObject.h/2);
            ctx.rotate(this.rotation);
            ctx.scale(-1, 1)
            
            
            ctx.globalAlpha = 1;
            ctx.fillStyle = this.color;
            ctx.drawImage(shotgunImage, 0, 0, 31, 32, -16, -32, 64, 64)
           
            
            ctx.restore()
           
            
            }
    }
}
var pistol = {
	x: canvas.width/2,
	y: canvas.height/2,
	w: 32,
	h: 32,
	color: "orange",
	rotation: 0,
    bulletNumber:1,
    id: "PISTOL",
    accuracy:0,
    damage:2,
    bulletSpeed:6,
    cooldown:1,
    cooldownStatus:1,
    draw: function(){
        var dx = (playerObject.x + playerObject.w/2 - cursor.x);
        var dy = (playerObject.y + playerObject.h/2 - cursor.y);
        var angle = Math.atan2(dy, dx)
        this.rotation = angle

        if(cursor.x > playerObject.x + playerObject.w/2){
            ctx.save()
            ctx.translate(playerObject.x + playerObject.w/2, playerObject.y+ playerObject.h/2);
            ctx.rotate(this.rotation + Math.PI);
            
            
            
            ctx.globalAlpha = 1;
            ctx.fillStyle = this.color;
            ctx.drawImage(pistolImage, 0, 0, 31, 32, 0, -16, 32, 32)
           
            
            ctx.restore()
            ;
            }
            else if(cursor.x <= playerObject.x + playerObject.w/2){
                ctx.save()
            ctx.translate(playerObject.x + playerObject.w/2, playerObject.y+ playerObject.h/2);
            ctx.rotate(this.rotation);
            ctx.scale(-1, 1)
            
            
            ctx.globalAlpha = 1;
            ctx.fillStyle = this.color;
            ctx.drawImage(pistolImage, 0, 0, 31, 32, 0, -16, 32, 32)
           
            
            ctx.restore()
            
            
            }
    }
}
var ar15 = {
	x: canvas.width/2,
	y: canvas.height/2,
	w: 64,
	h: 64,
	color: "orange",
	rotation: 0,
    bulletNumber:3,
    id: "AR15",
    accuracy:0.15,
    damage:2,
    bulletSpeed: 8,
    cooldown:30,
    cooldownStatus:30,
    draw: function(){
        var dx = (playerObject.x + playerObject.w/2 - cursor.x);
        var dy = (playerObject.y + playerObject.h/2 - cursor.y);
        var angle = Math.atan2(dy, dx)
        this.rotation = angle;

        if(cursor.x > playerObject.x + playerObject.w/2){
            ctx.save()
            ctx.translate(playerObject.x + playerObject.w/2, playerObject.y+ playerObject.h/2);
            ctx.rotate(this.rotation + Math.PI);
            
            
            
            ctx.globalAlpha = 1;
            ctx.fillStyle = this.color;
            ctx.drawImage(ar15Image, 0, 0, 31, 32, -16, -32, 64, 64)
        
            
            ctx.restore()
            ;
            }
            else if(cursor.x <= playerObject.x + playerObject.w/2){
                ctx.save()
            ctx.translate(playerObject.x + playerObject.w/2, playerObject.y+ playerObject.h/2);
            ctx.rotate(this.rotation);
            ctx.scale(-1, 1)
            
            
            ctx.globalAlpha = 1;
            ctx.fillStyle = this.color;
            ctx.drawImage(ar15Image, 0, 0, 31, 32, -16, -32, 64, 64)
            
            
            ctx.restore()
            
            
            }
    }
}
var fists = {
    x: canvas.width/2,
    y: canvas.height/2,
    w:0,
    h:0,
    rotation:0,
    bulletNumber:0,
    accuracy:0.15,
    bulletSpeed: 8,
    cooldown:30,
    cooldownStatus:30,
    id: "FISTS",
    draw: function(){
        this.w = 0
    }

}

var dagger = {
	x: canvas.width/2,
	y: canvas.height/2,
	w: 50,
	h: 15,
	rotation: 0,
    bulletNumber: 0,
	image: dagueImage,
    id: "DAGGER",
    swing: Math.PI*3/2,
    damage: 5,
    hitCD: 0,
    accuracy:0.15,
    
    bulletSpeed: 8,
    cooldown:30,
    cooldownStatus:30,
    draw: function(){
        var dx = (playerObject.x + playerObject.w/2 - cursor.x);
        var dy = (playerObject.y + playerObject.h/2 - cursor.y);
        var angle = Math.atan2(dy, dx);
        this.rotation = angle;
        angle2 = angle + this.swing;

        if(swordInput == false){
            ctx.save();
            ctx.translate(playerObject.x + playerObject.w/2, playerObject.y + playerObject.h/2);
            ctx.rotate(this.rotation + Math.PI);

  
            ctx.drawImage(dagueImage, 0, 0);

            ctx.restore();
        }else{
            if(sCd <= 10){
                slash();
                sCd += 1;
                dagger.swing -= Math.PI/10;
        
                for (i=0; i<enemies.length; i++){
                    if(collision(touche, enemies[i])){
                        if(dagger.hitCD == 0){
                            enemies[i].pv -= dagger.damage;
                            dagger.hitCD = 10;
                        }else if(dagger.hitCD > 0){
                            dagger.hitCD --;
                        }

                        if(enemies[i].pv <= 0){
                            enemies.splice(i, 1);
                            money += Math.round(Math.random()*5)+3
                            break;
                        }
                    }
                }

            }else{
                swordInput = false;
                sCd = 0;
                dagger.swing = Math.PI*3/2;
            }
        }
    }
}

var scourge = {
    x: canvas.width/2 - 48,
	y: canvas.height/2 - 48,
	w: 96,
	h: 96,
    bulletNumber: 0,
	image: fleauImage,
    id: "SCOURGE",
    damage: 1,
    hitCD: 0,
    frameS: 0,
    framePlayed: 0,
    accuracy:0.15,
    bulletSpeed: 8,
    cooldown:30,
    cooldownStatus:30,
    draw: function(){

        ctx.drawImage(fleauImage, scourge.frameS, 0, 96, 96, canvas.width/2 - 48, canvas.height/2 - 48, 96, 96);
        scourge.framePlayed++;

        if (scourge.frameS == 672 - 96 && scourge.framePlayed == 10){
            scourge.frameS = 0;
            scourge.framePlayed = 0;
        }
        else if(scourge.frameS != 672 - 96 && scourge.framePlayed == 10){
            scourge.frameS += 96;
            scourge.framePlayed = 0;
        }

        for (i=0; i<enemies.length; i++){
            if(collision(cbt, enemies[i])){
                if(scourge.hitCD == 0){
                    enemies[i].pv -= scourge.damage;
                    scourge.hitCD = 1;
                }else if(scourge.hitCD > 0){
                    scourge.hitCD --;
                }

                if(enemies[i].pv <= 0){
                    enemies.splice(i, 1);
                    money += Math.round(Math.random()*5)+3
                    break;
                }
            }
        }
    }
}

var mainWeapon = {}
var firstWeapon = {}
var secondWeapon = {}

firstWeapon = pistol
mainWeapon = firstWeapon




secondWeapon = scourge;










function collision (a, b){
    if( a.x < b.x + b.w && 
        a.x + a.h > b.x &&
        a.y < b.y + b.h &&
        a.y + a.h > b.y){
           return true
        }
}

function shoot(targetX, targetY, shooterX, shooterY, bulletNumber, accuracy, damage, shooter){
	var dx = targetX - shooterX;
	var dy = targetY - shooterY;
	var angle = Math.atan2(dy, dx);
	var speedX = 5 * Math.cos(angle);
	var speedY = 5 * Math.sin(angle);
    for (i=0;i<bulletNumber;i++){
		var angleRandomizer = Math.PI  * Math.random()/8 - 1/4 
		var speedX = mainWeapon.bulletSpeed * Math.cos(angle + (angleRandomizer * accuracy));
	    var speedY = mainWeapon.bulletSpeed * Math.sin(angle + (angleRandomizer * accuracy));
        if (shooter == "enemy"){
	    allBullets.push(new Bullet(shooterX, shooterY, 15, 15, "yellow", speedX, speedY, damage, shooter));
        }
        else if (shooter == "player"){
            allBullets.push(new Bullet(shooterX + mainWeapon.w * Math.cos(angle +(angleRandomizer * accuracy)), shooterY + mainWeapon.h * Math.sin(angle + (angleRandomizer * accuracy))- 6, 15, 15, "yellow", speedX, speedY, damage, shooter))
        }
    }
}



function keepDashing(){
    if(dashInput == 1 && playerObject.dashing > 0 && pressedKeys.dash == true){
        playerObject.dashing -= decreaseDash;
        

        movingObjects.forEach(object => object.x += playerObject.playerSpeed);
            
        if(playerObject.dashing == 0){
            pressedKeys.dash = false;
            dashInput = 0;
            setTimeout(recovery, 1000);
        }
    }
    if(dashInput == 2 && playerObject.dashing > 0 && pressedKeys.dash == true){
        playerObject.dashing -= decreaseDash;
        

        movingObjects.forEach(object => object.x -= playerObject.playerSpeed)

        if(playerObject.dashing == 0){
            pressedKeys.dash = false;
            dashInput = 0;
            setTimeout(recovery, 1000);
        }
    }
    if(dashInput == 3 && playerObject.dashing > 0 && pressedKeys.dash == true){
        playerObject.dashing -= decreaseDash;
        

        movingObjects.forEach(object => object.y += playerObject.playerSpeed);
                        
        if(playerObject.dashing == 0){
            pressedKeys.dash = false;
            dashInput = 0;
            setTimeout(recovery, 1000);
        }
    }
    if(dashInput == 4 && playerObject.dashing > 0 && pressedKeys.dash == true){
        playerObject.dashing -= decreaseDash;
        

        movingObjects.forEach(object => object.y -= playerObject.playerSpeed);
            
        if(playerObject.dashing == 0){
            pressedKeys.dash = false;
            dashInput = 0;
            setTimeout(recovery, 1000);
        }
    }
}
function recovery(){
    
    if(playerObject.dashing == 0){
        console.log("recovered");
        dashInput = 0;
        playerObject.dashing = playerObject.playerSpeed*128;
    }
}

function slash(){
    ctx.save();
    ctx.translate(playerObject.x + playerObject.w/2, playerObject.y + playerObject.h/2);
    ctx.rotate(angle2);

    ctx.drawImage(dagueImage, 8, -8);

    ctx.restore();
}


function capFps(fps){
    fpsInterval = 1000/fps
    then = Date.now()
    startTime = then
    game()

}

messageBonus = {
    text:"",
    color:"",
    y: 400,
    Behaviour: function(){
        ctx.fillStyle = "rgba("+this.color.r+","+ this.color.g +","+ this.color.b +","+this.color.a+")"
        ctx.font = "15px pixelFont"
        ctx.textAlign = "center"
        ctx.globalAlpha = 1
        ctx.fillText(this.text,canvas.width/2, this.y)
        this.y-= 4
        this.color.a -= 0.01
        if(this.color.a <=0){
            objects.splice(objects.indexOf(messageBonus),1)
            
        }
        


    }
}


function slowdownBonus(){
    if(playerObject.playerSpeed>1){
        playerObject.playerSpeed-=1
    }

    
    playerObject.dashing = playerObject.playerSpeed*128;
    decreaseDash = playerObject.dashing/32;
    

    messageBonus.text =  "SLOW"
    messageBonus.y = 400
    messageBonus.color = {r:255, g:0, b:0, a:1}
    objects.push(messageBonus)
}

function fasterBonus(){
    if(playerObject.playerSpeed<25){
        playerObject.playerSpeed+=1
    }

    
    playerObject.dashing = playerObject.playerSpeed*128;
    decreaseDash = playerObject.dashing/32;
    

    messageBonus.text =  "FAST"
    messageBonus.y = 400
    messageBonus.color = {r:1, g:181, b:3, a:1}
    objects.push(messageBonus)
}


function healthBonus(){
    healthBar.maxPV += 1;

    messageBonus.text =  "MORE HEALTH";
    messageBonus.y = 400
    messageBonus.color = {r:1, g:181, b:3, a:1}
    objects.push(messageBonus)
}

function damageBonus(){
    if(mainWeapon = firstWeapon){
        secondWeapon.damage += 1
    }
    if(mainWeapon = secondWeapon){
        firstWeapon.damage += 1
    }
    mainWeapon.damage += 1

    messageBonus.text =  "MORE DAMAGE";
    messageBonus.y = 400
    messageBonus.color = {r:1, g:181, b:3, a:1}
    objects.push(messageBonus)
}

function weaponBonus(){
    if(firstWeapon != scourge && secondWeapon != scourge){
        if(mainWeapon == firstWeapon){
            firstWeapon = scourge;
            mainWeapon = scourge;
        }else if(mainWeapon == secondWeapon){
            secondWeapon = scourge;
            mainWeapon = scourge;
        }

        messageBonus.text =  "NEW WEAPON";
        messageBonus.y = 400;
        messageBonus.color = {r:1, g:181, b:3, a:1};
        objects.push(messageBonus);

    }else if(firstWeapon != shotgun && secondWeapon != shotgun){
        if(mainWeapon == firstWeapon){
            firstWeapon = shotgun;
            mainWeapon = shotgun;
        }else if(mainWeapon == secondWeapon){
            secondWeapon = shotgun;
            mainWeapon = shotgun;
        }
        
        messageBonus.text =  "NEW WEAPON";
        messageBonus.y = 400;
        messageBonus.color = {r:1, g:181, b:3, a:1};
        objects.push(messageBonus);

    }else if(firstWeapon != dagger && secondWeapon != dagger){
        if(mainWeapon == firstWeapon){
            firstWeapon = dagger;
            mainWeapon = dagger;
        }else if(mainWeapon == secondWeapon){
            secondWeapon = dagger;
            mainWeapon = dagger;
        }
        
        messageBonus.text =  "NEW WEAPON";
        messageBonus.y = 400;
        messageBonus.color = {r:1, g:181, b:3, a:1};
        objects.push(messageBonus);

    }
    else if(firstWeapon != pistol && secondWeapon != pistol){
        if(mainWeapon == firstWeapon){
            firstWeapon = pistol;
            mainWeapon = pistol;
        }else if(mainWeapon == secondWeapon){
            secondWeapon = pistol;
            mainWeapon = pistol;
        }
        
        messageBonus.text =  "NEW WEAPON";
        messageBonus.y = 400;
        messageBonus.color = {r:1, g:181, b:3, a:1};
        objects.push(messageBonus);
    }
    else if(firstWeapon != ar15 && secondWeapon != ar15){
        if(mainWeapon == firstWeapon){
            firstWeapon = ar15;
            mainWeapon = ar15;
        }else if(mainWeapon == secondWeapon){
            secondWeapon = ar15;
            mainWeapon = ar15;
        }
        
        messageBonus.text =  "NEW WEAPON";
        messageBonus.y = 400;
        messageBonus.color = {r:1, g:181, b:3, a:1};
        objects.push(messageBonus);
    }
    else{
        giveBonus(Math.round(Math.random() * 99)+1);
    }
}

function giveBonus(result){
    console.log(result);

    if(result<=10){
        slowdownBonus()
    }
    else if(result > 10 && result <= 20){
        fasterBonus()
    }
    
    else if(result > 20 && result <= 30){
        healthBonus();
    }
    else if(result > 30 && result <= 40){
        damageBonus();
    }
    else if(result > 40){
        weaponBonus();
    }
    
}

let totalScore
let enemiesScore
let chestScore
let moneyScore
function calculateScore(){
    moneyScore = money*50
    enemiesScore = (totalEnemies - enemies.length) *200
    chestScore = (totalChests - allChests.length)*100
    totalScore = (enemiesScore + chestScore + moneyScore)
    console.log("score" +totalScore)
    console.log("score enemies" +enemiesScore)
    console.log("score money" +moneyScore)
    console.log(" chest score" +chestScore)

}



class Limites {
    constructor(x, y){
        this.x = x
        this.y = y
        this.w = 32
        this.h = 32
        this.color = "red"
    }

    draw(){
    ctx.globalAlpha = 1;
    ctx.fillStyle = this.color
    ctx.fillRect(this.x, this.y, this.w, this.h) }
}


class Enemy1 {
    constructor(x, y){

        this.x = x
        this.y = y
        this.w = 48
        this.h = 48
        this.timer = 0
        this.color = "purple"
        this.pv = 15
        this.frame = 0
        this.framePlayed = 0
    }
    draw(){
        ctx.globalAlpha = 1;
        ctx.fillStyle = this.color
        ctx.drawImage(enemyImage, this.frame, 0, 32, 32, this.x, this.y, this.w, this.h)
        
        this.framePlayed++
        if (this.frame == 32 && this.framePlayed == 30){
            this.frame = 0
            this.framePlayed = 0
        }
        else if(this.frame != 96 && this.framePlayed == 30){
            this.frame += 32
            this.framePlayed = 0
        }
    }

    enemyBehaviour(){
        if (this.timer == 30){
            shoot(playerObject.x + playerObject.w/2, playerObject.y+playerObject.h/2, this.x + this.w/2, this.y + this.h/2, 1, 0.1, 1, "enemy");
            this.timer = 0
            
        }
        else{this.timer++}
    }

}

class Chest{
    constructor(x,y){
        this.x = x
        this.y = y
        this.w = 32
        this.h = 32

    }
    draw(){
        ctx.drawImage(chestImage, this.x, this.y,)
    }
    Behaviour(){

    }
}


class Heal{
    constructor(x,y){
        this.x = x
        this.y = y
        this.w = 64
        this.h = 64
    }

    draw(){
        ctx.drawImage(healImage, this.x, this.y, this.w, this.h)
    }
}



class Bullet {
    constructor(x, y, w, h, color, speedX, speedY, damage, shooter){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h
        this.color = color;
        this.speedX = speedX
        this.speedY = speedY
        this.damage = damage
        this.shooter = shooter
        this.frame = 0
        this.framePlayed = 0
    }
    draw() {
        ctx.globalAlpha = 1;
        
        ctx.drawImage(bulletImage, this.frame, 0, 32, 32, this.x - this.w/2, this.y - this.h/2, this.w, this.h)
        this.x += this.speedX;
        this.y += this.speedY;
        this.framePlayed++
        if (this.frame == 96 && this.framePlayed == 12){
            this.frame = 0
            this.framePlayed = 0
        }
        else if(this.frame != 96 && this.framePlayed == 12){
            this.frame += 32
            this.framePlayed = 0
        }
        
    };

}

boundaries = []
allChests = []
allHeals = []
enemies = []
let totalEnemies
let totalChests
function initialiseMap(){
    money = 0
    playerObject.playerSpeed = 4

    
    playerObject.dashing = playerObject.playerSpeed*128;
    decreaseDash = playerObject.dashing/32;
    

    boundaries = []
    winZone.x = 1952 + offset.x
    winZone.y = 64 + offset.y
    backgroundObject.x = offset.x
    backgroundObject.y = offset.y
    allBullets = []
gameMap.forEach(function rowFunc(row, i){
    row.forEach(function colFunc(ident, j){
        if(ident == collisionCode){
            boundaries.push(new Limites(32* j + offset.x, 32*i + offset.y))
        }
    })
})


    allChests = []
    allHeals = []

gameMap.forEach(function rowFunc(row, i){
    row.forEach(function colFunc(ident, j){
        if(ident == healsCode){
            allHeals.push(new Heal(32* j + offset.x, 32*i + offset.y))
        }
    })
})

gameMap.forEach(function rowFunc(row, i){
    row.forEach(function colFunc(ident, j){
        if(ident == chestCode){
            if(Math.round(Math.random())+1 == 2){
            allChests.push(new Chest(32* j + offset.x, 32*i + offset.y))
            }
        }
    })
})

enemies = []
gameMap.forEach(function rowFunc(row, i){
    row.forEach(function colFunc(ident, j){
        if(ident == enemyCode){
            if(Math.round(Math.random())+1 == 2){
            enemies.push(new Enemy1(32* j + offset.x, 32*i + offset.y))
            }
        }
    })
})
totalEnemies = enemies.length
totalChests = allChests.length
}



/*

    Event listeners

*/
addEventListener("keydown", (e)=> {
    
    switch(e.key){
        case "w":
            pressedKeys.up = true
            break
        case "s":
            pressedKeys.down = true
            break
        case "d":
            pressedKeys.right = true
            break
        case "a":
            pressedKeys.left = true
            break

        case "W":
            pressedKeys.up = true
            break
        case "S":
            pressedKeys.down = true
            break
        case "D":
            pressedKeys.right = true
            break
        case "A":
            pressedKeys.left = true
            break
        
        case "1":
            mainWeapon = firstWeapon
            break
        case "2":
            mainWeapon = secondWeapon
            break
    }

    
    if(e.shiftKey){
        pressedKeys.dash = true;
        keepDashing();
    }else{
        pressedKeys.dash = false;
    }
    
    

})

addEventListener("keyup", (e)=> {

    switch(e.key){
        case "w":
            pressedKeys.up = false
            break
        case "s":
            pressedKeys.down = false
            break
        case "d":
            pressedKeys.right = false
            break
        case "a":
            pressedKeys.left = false
            break

        case "W":
            pressedKeys.up = false
            break
        case "S":
            pressedKeys.down = false
            break
        case "D":
            pressedKeys.right = false
            break
        case "A":
            pressedKeys.left = false
            break
    }
    

})

addEventListener("keydown", function(e) {
    if(["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(e.code) > -1) {
        e.preventDefault();
    }
})


document.addEventListener("mousemove", function(e){
	cursor.x = e.clientX - (screen.width-canvas.width)/2
	cursor.y = e.clientY - 30
	
})

var shootOn = true
document.addEventListener("click", function(e){
	if(pageStatus == "game"){
        if(shootOn == true){
        shoot(cursor.x, cursor.y, canvas.width/2, canvas.height/2, mainWeapon.bulletNumber, mainWeapon.accuracy, mainWeapon.damage, "player")
        shootOn = false
        mainWeapon.cooldownStatus = 0
        if(mainWeapon.id == "PISTOL"){
            pistolSound.currentTime = 0
            pistolSound.play()
        }
        if(mainWeapon.id == "AR15"){
            ARSound.currentTime = 0
            ARSound.play()
        }
        if(mainWeapon.id == "SHOTGUN "){
            shotgunSound.currentTime = 0
            shotgunSound.play()
        }
        }
        
    }

    if(cursor.x< canvas.width/2 + 100 - 5 &&
       cursor.x> canvas.width/2 - 100 - 10 &&
       cursor.y< 575 + 5 &&
       cursor.y> 500 - 5 &&
       pageStatus == "menu"){
        rerunOst.currentTime = 0
        rerunOst.play()
        rerunOst.loop = true
        pageStatus = "game"
        initialiseMap()
        healthBar.pv = 20
        
    }
    if(cursor.x< canvas.width/2 + 100 - 5 &&
        cursor.x> canvas.width/2 - 100 - 10 &&
        cursor.y< 575 + 5 &&
        cursor.y> 500 - 5 &&
        pageStatus == "death"){
         rerunOst.play()
         rerunOst.loop = true
         pageStatus = "game"
         initialiseMap()
         healthBar.pv = 20
         
     }

     if(cursor.x< canvas.width/2 + 100 - 5 &&
        cursor.x> canvas.width/2 - 100 - 10 &&
        cursor.y< 575 + 5 &&
        cursor.y> 500 - 5 &&
        pageStatus == "victory"){
         rerunOst.play()
         rerunOst.loop = true
         pageStatus = "game"
         initialiseMap()
         healthBar.pv = 20
         
     }
})


document.addEventListener("click", function(e){
    if(mainWeapon.id == dagger.id){
        swordInput = true;
    }
    if(mainWeapon.id == scourge.id){
        ballsInput = true;
    }
})




/*

    Main loop

*/

objects = [...allChests]


function looped(){
    

    //Confirmation des array actifs
    movingObjects = [backgroundObject, ...boundaries, ...enemies, ...allBullets, hudTutorial, ...allChests, winZone, ...allHeals]
    drawnObjects = [backgroundObject,  ...allChests, ...allHeals, hudTutorial, playerObject, ...enemies, ...allBullets,  healthBar, mainWeapon, ...HUD, touche, cbt]
    
    
    
    //Effectue les modifications dans les array actifs
    
    drawnObjects.forEach(element => element.draw()) 
    enemies.forEach(enemy => enemy.enemyBehaviour())
    objects.forEach(object => object.Behaviour())
    

    //Colisions d'objets
    for (i=0;i<allBullets.length;i++){
        for(j=0;j<boundaries.length;j++){
            if(collision(allBullets[i], boundaries[j])){
                allBullets.splice(i,1)
                break
            }
        }

    }

    for(i=0; i<allChests.length;i++){
        if(collision(allChests[i], playerObject)){
        chestSound.currentTime = 0
           chestSound.play()
           giveBonus(Math.round(Math.random() * 99)+1)
           allChests.splice(i,1) 
           break
        }
    }

    if(collision(winZone, playerObject)){
        calculateScore()
        pageStatus = "victory"
    }

    for(i=0;i<allHeals.length;i++){
        if(collision(allHeals[i],playerObject)){
            healSound.currentTime = 0
            healSound.play()
            healthBar.pv += 5
            if(healthBar.pv > healthBar.maxPV){
                healthBar.pv = healthBar.maxPV
            }
           allHeals.splice(i,1)
           break
        }
    }

    //Gestion Vie
    for (i=0;i<allBullets.length;i++){
        if(collision(allBullets[i], playerObject) && allBullets[i].shooter == "enemy"){
            
            healthBar.pv-= 1
            allBullets.splice(i,1)
            hurtSound.currentTime = 0
            hurtSound.play()
            break
        }
    }
    
    //Enemy
    for (i=0;i<allBullets.length;i++){
        for (j=0;j<enemies.length;j++){
            if(collision(allBullets[i], enemies[j]) && allBullets[i].shooter == "player"){
                enemies[j].pv-=1
                allBullets.splice(i, 1)
                
                
                break
            }
            if(enemies[j].pv <= 0){
                enemies.splice(j, 1)
                money += Math.round(Math.random()*5)+3
                break
                
            }
            
        }
    }
    

    //Gestion des collisions de mouvement et du clavier
    let touching
    
    if (pressedKeys.up == true) {

        
        dashInput = 3;
        
        
        for(i=0; i<boundaries.length;i++){
            if (collision(boundaries[i], upGhost={...playerObject, y: playerObject.y - playerObject.playerSpeed })){
                distance = playerObject.y - (boundaries[i].y + boundaries[i].h)
                touching = true
                break


            }
        }

        if(touching == true){
            movingObjects.forEach(object => object.y+= distance)
        }
        else{
            movingObjects.forEach(object => object.y+= playerObject.playerSpeed)
            
            keepDashing();
            
        }

    }

    
    if (pressedKeys.down == true){

        
        dashInput = 4;
        
        
        for(i=0; i<boundaries.length;i++){
            if (collision(boundaries[i], downGhost={...playerObject, y: playerObject.y + playerObject.playerSpeed })){
                distance = boundaries[i].y - (playerObject.y + playerObject.h)
                touching = true 
                break
            }
        }
        if(touching == true){
            movingObjects.forEach(object => object.y-= distance)
        }
        else{
            movingObjects.forEach(object => object.y-= playerObject.playerSpeed)
            
            keepDashing();
            
        }
    }


    if (pressedKeys.right == true){

        
        dashInput = 2;
        
 
        for(i=0; i<boundaries.length;i++){
            if (collision(boundaries[i], rightGhost={...playerObject, x: playerObject.x + playerObject.playerSpeed })){
                distance = boundaries[i].x - (playerObject.x + playerObject.w)
                touching = true 
                break
            }else{touching = false}
        }
        if(touching == true){
            movingObjects.forEach(object => object.x-= distance)
        }
        else{
            movingObjects.forEach(object => object.x-= playerObject.playerSpeed)
            
            keepDashing();
            
        }
    }

    if (pressedKeys.left == true){

        
        dashInput = 1;
        
        
        for(i=0; i<boundaries.length;i++){
            if (collision(boundaries[i], leftGhost={...playerObject, x: playerObject.x - playerObject.playerSpeed })){
                distance = playerObject.x - (boundaries[i].x + boundaries[i].w)
                touching = true
                break
            }else{touching = false}
        }
        if(touching == true){
            movingObjects.forEach(object => object.x+= distance)
            
        }
        else{
            movingObjects.forEach(object => object.x+= playerObject.playerSpeed)
            
            keepDashing();
            
        }
    }
    
}

/*

    Main function

*/
function game(){
    //Cap les FPS
    
    if(mainWeapon.cooldownStatus == mainWeapon.cooldown){
        shootOn = true
        
        }
        else if (mainWeapon.cooldownStatus != mainWeapon.cooldown){
            shootOn = false
            mainWeapon.cooldownStatus++
        }
    if(healthBar.pv<= 0){
        pageStatus = "death"
        
        
    }
    now = Date.now()
    elapsed = now - then
    
    if(elapsed > fpsInterval){
        then = now - (elapsed % fpsInterval)
        
        if(pageStatus == "game"){
        ctx.clearRect(0,0,canvas.width,canvas.height)
        looped()

        
        }

        if(pageStatus == "menu"){
            ctx.globalAlpha = 1
            ctx.clearRect(0,0,canvas.width,canvas.height)
        
            ctx.font = "30px pixelFont"
            ctx.fillStyle = "white"
            ctx.textAlign = "center"
            ctx.fillText("MILLER               ", canvas.width/2, 100)
            ctx.fillStyle = "red"
            ctx.fillText("                KILLER", canvas.width/2, 100)
        
            ctx.fillStyle = "white"
            ctx.textAlign = "center"
            ctx.fillText("KILL ALL THE ENNEMIES", canvas.width/2, 250, canvas.width)
            ctx.fillStyle = "red"
            ctx.fillText("(THEY ARE ALL CLONES OF THE CRIMINAL RUDOLPH MILLER)", canvas.width/2, 300, canvas.width)
            
            ctx.fillStyle = "white"
            ctx.strokeStyle = "white"
            ctx.lineWidth = 5

            if(cursor.x< canvas.width/2 + 100 - 5 &&
                cursor.x> canvas.width/2 - 100 - 10 &&
                cursor.y< 575 + 5 &&
                cursor.y> 500 - 5){
                    ctx.fillStyle = "#0DD700"
                    ctx.strokeStyle = "#0DD700"
            }
            
               
            ctx.strokeRect(canvas.width/2 - 100, 500,200,75)
            ctx.fillText("PLAY", canvas.width/2 + 5, 557.5)
            
        }
        if(pageStatus == "victory"){
            ctx.globalAlpha = 1
            ctx.clearRect(0,0,canvas.width,canvas.height)
        
            ctx.font = "30px pixelFont"
            ctx.fillStyle = "green"
            ctx.textAlign = "center"
            ctx.fillText("VICTORY", canvas.width/2, 100)
            ctx.fillStyle = "white"
            ctx.font = "20px pixelFont"
            if(enemies.length == totalEnemies){
                ctx.fillText("you killed all the Millers!", canvas.width/2, 140)
            }else{
                ctx.fillText("you didn't kill all the Millers :(", canvas.width/2, 140)
            }
            ctx.fillText("MONEY: " + moneyScore, canvas.width/2, 170)
            ctx.fillText("ENNEMIES: " + enemiesScore, canvas.width/2, 200)
            ctx.fillText("CHESTS: " + chestScore, canvas.width/2, 230)
            ctx.fillText("TOTAL SCORE: " + totalScore, canvas.width/2, 260)
            
            
            ctx.font = "30px pixelFont"
            ctx.fillStyle = "white"
            ctx.textAlign = "center"
            ctx.fillText("play again?", canvas.width/2, 300, canvas.width)
            
            ctx.fillStyle = "white"
            ctx.strokeStyle = "white"
            ctx.lineWidth = 5
                if(cursor.x< canvas.width/2 + 100 - 5 &&
                cursor.x> canvas.width/2 - 100 - 10 &&
                cursor.y< 575 + 5 &&
                cursor.y> 500 - 5){
                    ctx.fillStyle = "#0DD700"
                    ctx.strokeStyle = "#0DD700"
                }
               
            ctx.strokeRect(canvas.width/2 - 100, 500,200,75)
            ctx.fillText("PLAY", canvas.width/2 + 5, 557.5)
        }
    
    }
    
    requestAnimationFrame(game)
}
capFps(60)






