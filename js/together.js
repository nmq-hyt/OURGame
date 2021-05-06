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

// format dn, with n for representing th enumber deck you want

//below lists the functions used to generate game objects, like cards, the gamestate, decks and so on
var gamestate = /** @class */ (function () {
    function gamestate(game_string, num_players) {
        this.players = [];
        this.turn_num = 0;
        this.num_players = num_players;
        this.game = game_string;
        this.current_player = null;
    }

    gamestate.prototype.player_is_kill = function (player) {
       this.players["delete"](player);
    };

    gamestate.prototype.add_player_to_gamestate = function (add_player) {
        this.players.push(add_player);
    };

    gamestate.prototype.get_current_player = function () {
        return this.current_player;
    };

    gamestate.prototype.set_current_player = function (player) {
        this.current_player = player;
    };

    gamestate.prototype.flip_coin = function () {
        let temp = Math.floor(Math.random() * 2);
        return temp;
    };
    gamestate.prototype.det_current_player = function() {
        let temp = this.turn_num % this.num_players;
        return temp;
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
        this.neighbours = [];
        this.player_number = num;
        this.player_health = health;
        this.player_energy = 0;
        this.player_shield = 0;
        this.player_deck = [];
    }
    player.prototype.set_player_skin = function (player, skin) {
        player.player_skin = skin;
        return null;
    };
    //still unsure how to fully implement this
    player.prototype.add_deck = function (deck_num) {
        var _this = this;
        handout = firebase.functions().httpsCallable('handout_deck');
        handout(deck_num)
            .then(function (result) {
                temp = Object.values(result)[0];
                tempArray = new Array(20);
                tempArray[0] = new card(temp.c1,"url('wooloo.png')");
                tempArray[1] = new card(temp.c2, "url('bonk.png')");
                tempArray[2] = new card(temp.c3,"url('candy.png')");
                tempArray[3] = new card(temp.c4,"url('Castel.png')");
                tempArray[4] = new card(temp.c5,"url('free.png')");
                tempArray[5] = new card(temp.c6,"url('Mate.png')");
                tempArray[6] = new card(temp.c7,"url('monstar.png')");
                tempArray[7] = new card(temp.c8,"url('pain.png')");
                tempArray[8] = new card(temp.c9,"url('potion.png')");
                tempArray[9] = new card(temp.c10,"url('rest.png')");
                tempArray[10] = new card(temp.c11,"url('wooloo.png')");
                tempArray[11] = new card(temp.c12,"url('bonk.png')");
                tempArray[12] = new card(temp.c13,"url('candy.png')");
                tempArray[13] = new card(temp.c14,"url('Castel.png')");
                tempArray[14] = new card(temp.c15,"url('free.png')");
                tempArray[15] = new card(temp.c16,"url('Mate.png')");
                tempArray[16] = new card(temp.c17,"url('monstar.png')");
                tempArray[17] = new card(temp.c18,"url('pain.png')");
                tempArray[18] = new card(temp.c19,"url('potion.png')");
                tempArray[19] = new card(temp.c20,"url('rest.png')");
                j = 0;
                // the fisher-yates shuffle
                for (i = 0; i < 20; i++) {
                    j = Math.floor(Math.random() * 20);
                    temp2 = tempArray[i];
                    tempArray[i] = tempArray[j];
                    tempArray[j] = temp2;
                }

                _this.player_deck = tempArray; 
            });
    };
    player.prototype.add_neighbour = function (player) {
        this.neighbours.push(player); 
    };
    player.prototype.damage = function (target_num, amount) {
        this.neighbours[0].take_damage(amount);
    };
    player.prototype.energy = function (amount) {
        this.player_energy += amount;
    };
    
    player.prototype.draw = function (amount) {
        let i = 0;
        let temp = null;
        for (i = 0; i < amount; i++) {
            temp = this.player_deck.pop();
            console.log(temp);
            this.player_hand.push(temp);
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

    player.prototype.play_card = function (action_num,card) {
        if(this.player_energy > 0){
            this.player_energy--;
            switch (action_num) {
            case 0:
                player.damage(card.card_dmg_val);
            case 1:
                player.heal(card.card_heal_val);
            case 2:
                player.energy(card.card_energy_val);
            case 3:
                player.shield(card.card_shield_val);
            case 4:
                player.draw(card.card_draw_val);
            }
        }
       else{
           return null;
       }
    }
    return player;
}());

var card = /** @class */ (function () {
    function card(card_object,card_art_str) {
        keys = Object.keys(card_object);
        values = Object.values(card_object);
        length = keys.length;
        for (i = 0; i < length; i++){
            if (keys[i] === "attack" ) {
                this.card_dmg_val = values[i];
             } else if (keys [i] === "shield") {
                this.card_shield_val = values[i];
             } else if (keys [i] === "energy") {
                this.card_energy_val = values[i];
             } else if (keys [i] === "draw") {
                this.card_draw_val = values[i];
             } else if (keys [i] === "heal") {
                 this.card_heal_val = values[i];
             }
            this.card_art = card_art_str;
        }
    }
    return card;
}());

// code control
// accepts a gamestate, and a player
// does a bunch of front-end stuff
// returns a gamestate
// fundamentally, accepting a gamestate, and accessing previous variables through many get. esqu eefunctions, allows the frontend to fill up the ui design
