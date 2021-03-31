
const firebaseConfig = {
    apiKey: "AIzaSyBynxk4Jce8wObcpwfL_ngvV2IVaBmQvFY",
    authDomain: "ourgame-fdad7.firebaseapp.com",
    databaseURL: "https://ourgame-fdad7.firebaseio.com",
    projectId: "ourgame-fdad7",
    storageBucket: "ourgame-fdad7.appspot.com",
    messagingSenderId: "837080877425",
    appId: "1:837080877425:web:512dadcc82cc6fceee8ed0"
};

firebase.initializeApp(firebaseConfig);


//below lists the functions used to generate game objects, like cards, the gamestate, decks and so on
var gamestate = /** @class */ (function () {
    function gamestate(game_string, num_players) {
        this.players = [];
        this.turn_num = 0;
        this.num_players = num_players;
        this.game = game_string;
    }

    gamestate.prototype.player_is_kill = function (player) {
        this.players["delete"](player);
    };
    gamestate.prototype.add_player_to_gamestate = function (add_player) {
        this.players.push(add_player);
    };

    gamestate.prototype.access_player = function (player) {
        let ret_obj = null;
        players.forEach( function(item,array) {
            if (item === player)
                ret_obj = item;
        });
        return ret_obj;
    };
    return gamestate;
}());
// cede control
// accepts a gamestate, and a player
// does a bunch of  front-end stuff
// returns a gamestate
// fundamentally, accepting a gamestate, and accessing previous variables through many get. esqu eefunctions, allows the frontend to fill up the ui design

var player = /** @class */ (function () {
    // NEIGHBOURS represent a graph view of the game
    // the standard format is that
    // the zeroth member of the array is the direct opposite of given player for two players
    // in three players, it is 0 to represent the left player relative to the player, and 1 for the right
    // in four players, 0 is the left , 1 is the middle, 2 is the right
    function player(num, health, neighbours) {
        //new arrays for hand and deck
        this.player_hand = [];
        this.neighbours =[];
        this.player_number = num;
        this.player_health = health;
        this.player_energy = 0;
        this.player_shield = 0;
    }
    player.prototype.set_player_skin = function (player, skin) {
        player.player_skin = skin;
        return null;
    };
    //still unsure how to fully implement this
    player.prototype.add_card_to_deck = function (c) {
        this.player_deck.push(c);
    };
    player.prototype.add_deck = function (deck_num) {
        var _this = this;
        handout = firebase.functions().httpsCallable('handout_deck');
        handout(deck_num)
            .then(function (result) {
                _this.player_deck = result;
        });
    };
    player.prototype.add_neighbour = function (player) {
        neighbours.push(player); 
    };
    player.prototype.damage = function (target_num, amount) {
        target.take_damage(amount);
    };
    player.prototype.energy = function (amount) {
        if (((this.player_energy + amount % 30)) == 0) {
            this.player_energy = 30;
        }
        else {
            this.player_energy += amount;
        }
    };
    //change draw slightly so I could rationalize it
    player.prototype.draw = function (amount) {
        while (amount != 0) {
            this.player_hand.push(this.player_deck[this.player_deck.length - 1]);
            this.player_deck.pop();
            amount--;
        }
    };
    player.prototype.heal = function (amount) {
        if (((this.player_health + amount % 10)) == 0) {
            this.player_health = 10;
        }
        else {
            this.player_health += amount;
        }
    };
    player.prototype.shield = function (amount) {
        this.player_shield += amount;
    };
    player.prototype.take_damage = function (damage) {
        var tempshield = this.player_shield;
        var temphealth = this.player_health;
        var temphold;
        temphold = 0;
        temphold = tempshield - damage;
        if (temphold === 0){
            this.player_shield = 0;
        } else if (temphold > 0){
            this.player_shield = temphold;
        } else if (temphold < 0){
            this.player_health = temphealth - temphold;
            this.player_shield = 0;
       }
    };
    return player;
}());


var card = /** @class */ (function () {
    function card(card_id, card_dmg_val, card_heal_val, card_energy_val, card_shield_val, card_draw_val) {
        this.card_id = card_id;
        this.card_dmg_val = card_dmg_val;
        this.card_heal_val = card_heal_val;
        this.card_energy_val = card_energy_val;
        this.card_shield_val = card_shield_val;
        this.card_draw_val = card_draw_val;
    }
    return card;
}());
function add_player_to_gamestate(add_player) {
    this.players.push(add_player);
}
function add_card_to_deck(add_card) {
    this.cards.push(add_card);
}
function assign_deck_to_player(add_deck) {
    this.player_deck = add_deck;
}
// code control
// accepts a gamestate, and a player
// does a bunch of front-end stuff
// returns a gamestate
// fundamentally, accepting a gamestate, and accessing previous variables through many get. esqu eefunctions, allows the frontend to fill up the ui design
