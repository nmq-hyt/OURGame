class gamestate {
    game : string;
    turn_num : number;
    game_state : string;
    players : Array<typeof player> = [];
    constructor (game_string : string, num_players : number) {
        this.turn_num = 0;
        this.game = game_string
    }

}

class player {
    player_number : number;
    player_skin : string;
    player_health : number;
    player_shield : number;
    player_deck : deck;
    player_energy : number;
    constructor (player_number : number, player_skin : string) {
        this.player_number = player_number;
        this.player_skin = player_skin;
        this.player_health = 10;
        this.player_shield = 0;
        this.player_energy = 0;
    }
}

class deck {
    cards : Array<typeof card> = [];
    deck_number : number;
    constructor (deck_number : number) {
        this.deck_number = deck_number;
    }
}

class card {
    card_id : number;
    card_dmg_val : number;
    card_heal_val : number;
    card_energy_val : number;
    card_shield_val : number;
    card_draw_val : number;
    constructor (card_id : number, card_dmg_val : number, card_heal_val : number, card_energy_val : number, card_shield_val : number, card_draw_val : number) {
        this.card_id = card_id;
        this.card_dmg_val = card_dmg_val;
        this.card_heal_val = card_heal_val;
        this.card_energy_val = card_energy_val;
        this.card_shield_val = card_shield_val;
        this.card_draw_val = card_draw_val;
    }
}

function add_player_to_gamestate(add_player: typeof player)  {
    this.players.push(add_player);
}

function add_card_to_deck(add_card: typeof card)  {
    this.cards.push(add_card);
}

function assign_deck_to_player(add_deck : deck){
    this.player_deck = add_deck;
}
    // code control
    // accepts a gamestate, and a player
    // does a bunch of front-end stuff
    // returns a gamestate

    // fundamentally, accepting a gamestate, and accessing previous variables through many get. esqu eefunctions, allows the frontend to fill up the ui design

