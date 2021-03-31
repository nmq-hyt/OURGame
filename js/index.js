const functions = require('firebase-functions');
const admin = require('firebase-admin');

exports.check_players_alive = functions.database.ref('/games/{gameID}/players/{playerID}/player_health').onUpdate((change, context) => {

    // reads the value the player_health was changed to after the write
    let after = change.after.val();
    let before = change.before.val();
    let alive_ref = change.after.ref.parent.child('player_alive');

    if (after == before) {
        return null;
    }

    if (after <= 0) {
        return alive_ref.set('dead');
    } else {
        return alive_ref.set('alive');
    }
})

exports.check_game_over = functions.database.ref('/games/{gameID}/players/{playerID}').onUpdate((change, context) => {
    let player_count = change.after.numChildren();
    let root_ref = change.after.ref;

    switch (player_count) {
        case 2:
            if ((root_ref.parent.child("player_1").child("player_alive").val() === "dead") || (root_ref.parent.child("player_2").child("player_alive").val() == "dead")) {
                root_ref.parent.parent.child("gameState").set("finished");
            }
            break;

        case 3:
            if (((root_ref.parent.child("player_1").child("player_alive").val() === "dead") && (root_ref.parent.child("player_2").child("player_alive").val() == "dead")) || ((root_ref.parent.child("player_1").child("player_alive").val() == "dead") && (root_ref.parent.child("player_3").child("player_alive").val() == "dead")) || ((root_ref.parent.child("player_3").child("player_alive").val() == "dead") && (root_ref.parent.child("player_2").child("player_alive").val() == "dead"))) {
                root_ref.parent.parent.child("gameState").set("finished");
            }
            break;
        case 4:
            if (((root_ref.parent.child("player_1").child("player_alive").val() === "dead") && (root_ref.parent.child("player_3").child("player_alive").val() == "dead") && (root_ref.parent.child("player_2").child("player_alive").val() == "dead")) || ((root_ref.parent.child("player_1").child("player_alive").val() == "dead") && (root_ref.parent.child("player_3").child("player_alive").val() == "dead") && (root_ref.parent.child("player_2").child("player_alive").val() == "dead")) || ((root_ref.parent.child("player_2").child("player_alive").val() == "dead") && (root_ref.parent.child("player_3").child("player_alive").val() == "dead") && (root_ref.parent.child("player_4").child("player_alive").val() == "dead")) || ((root_ref.parent.child("player_1").child("player_alive").val() == "dead") && (root_ref.parent.child("player_2").child("player_alive").val() == "dead") && (root_ref.parent.child("player_4").child("player_alive").val() == "dead"))) {
                root_ref.parent.parent.child("gameState").set("finished");
            }
    }
})


exports.handout_deck = functions.https.onCall((data,context) =>{
    let return_object = null;

    let d2 =  {c1 : {attack:1, shield:1},c2:{attack:2},c3 : {draw:2,energy:1},c4:{shield:3},c5:{draw:2},c6:{shield:2},c7:{energy:2},c8:{attack:3},c9:{heal:2},c10:{draw:1,energy:1,heal:1},c11:{attack:1,shield:1},c12:{attack:2},c13:{draw:2,energy:1},c14:{shield:3},c15:{draw:2},c16:{shield:2},c17:{energy:2},c18:{attack:3},c19:{heal:2},c20:{draw:1,energy:1,heal:1}};

// add more cards as necessary 
    switch (data.text){
    case "d1":
        return_object = d2;
        break; 
    case "d2":
        return_object = '{}';
        break;
    case "d3":
        return_object = '{}';
        break;

    case "d4":
        return_object = '{}';
        break;
    }
    return d2;
});
