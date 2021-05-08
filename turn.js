var turncount = 1;
var activeplayer = 1;

var playerhp = 7;
var playerhandsize = 4;
var playerenergy = 1;
let playershields = [];

var enemyhp = 10;
var enemyhandsize = 3;
var enemyenergy = 1;
let enemyshields = [];

function playcard(val){
    if(playerenergy > 0){
    var value = parseInt(prompt("Number between 1 and 3"));
        if(value <= 3){
            playerenergy--;
            playerhandsize--;
            switch (val){
                case 1:
                    attack(value, activeplayer);
                    break;
                case 2:
                    health(value, activeplayer);
                    break;
                case 3:
                    draw(value, activeplayer);
                    break;
                case 4:
                    energy(value, activeplayer);
                    break;
                case 5:
                    shield(value, activeplayer);
                    break;
                default:
                    alert("Error 2: Card has action not in registry");
            }
            if(playerhandsize == 0){
                playerhandsize += 2;
            }
            updatevalues();
        }

        else{
            alert("Error 1: Bad input");
        }
    }
    else{
        alert("No energy");
    }
}

function attack(value, player){
    if(!enemyshields.length){
        enemyhp -= parseInt(value);
        if(enemyhp < 0){
            enemyhp = 0;
        }
    }

}

function health(value, player){
    playerhp += parseInt(value);
    if(playerhp > 10){
        playerhp = 10;
    }
}

function draw(value, player){
    playerhandsize += parseInt(value);
}

function energy(value, player){
    playerenergy += parseInt(value);
}

function shield(value, player){
    var shld = new Object();
    shld.name = "Default";
    shld.total = parseInt(value);
    shld.current = shld.total;
    playershields.push(shld);
}

function printShields(array){
    var str = "";
    if(array.length){
        for(var i = 0; i < array.length; i++){
            str += array[i].name + ": " + array[i].current + "/" + array[i].total + "\n";
        }
    }
    else{
        str = "None";
    }
    return str;
}

function updatevalues(){
    document.getElementById("turnnum").innerHTML = "Turn " + turncount;
    document.getElementById("turnstatus").innerHTML = findturn();
    document.getElementById("enemyhp").innerHTML = "Enemy Health: " + enemyhp;
    document.getElementById("enemyshields").innerHTML = "Enemy Shields: " + printShields(enemyshields);
    document.getElementById("playerhp").innerHTML = "Player Health: " + playerhp; 
    document.getElementById("playershields").innerHTML = "Player Shields: " + printShields(playershields);
    document.getElementById("playerhandsize").innerHTML = "Player Hand Size: " + playerhandsize;
    document.getElementById("playerenergy").innerHTML = "Player Energy: " + playerenergy;
}

function end(){
    if(playerenergy <= 0){
        turncount++;
        playerhandsize++;
        playerenergy = 1;
        enemyTurn();
        updatevalues()
    }
    else{
        alert("Energy left to use.");
    }
}

function findturn(){
    var str = ""
    if(activeplayer == 1){
        str += "Your Turn"
    }
    if(activeplayer == 2){
        str += "Enemy Turn"
    }
    return str;
}

function enemyTurn(){
    var value = Math.floor(Math.random() * 4) + 1;
    var val = Math.floor(Math.random() * 2) + 1;
    switch (val){
        case 1:
            attack(value);
            break;
        case 2:
            health(value);
            break;
        case 3:
            draw(value);
            break;
        case 4:
            energy(value);
            break;
        case 5:
            shield(value);
            break;
        default:
            alert("Error 2: Card has action not in registry");
    }
}

function wip(){
    alert("Not implemented yet")
}