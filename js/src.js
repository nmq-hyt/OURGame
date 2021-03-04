let db = firebase.database();
// this is not the actual root of the database tree
// but for our purposes it is
let root_ref = db.ref('/games');

// a wait function to just stall time to allow async
// functions to work



// init_game accepts no parameters, writing default values for four players
// returns the games' randomly generated key, which is a game instance's root value
function init_game () {
    let new_game_entry = games_ref.push();
    let reg_backslash = RegExp("/");
    let game_ref = new_game_entry.toString().split(reg_backslash).pop();

    new_game_entry.set({
             gameState: {
                 state : "lobby"
             },

             players: {
                 player_1: {
	                   player_number : '1',
	                   player_health : '10',
	                   player_energy :'1',
	                   player_alive : 'alive',
                     player_skin : 0

             },
             player_2: {
	               player_number : '2',
	               player_health : '10',
	               player_energy :'1',
	               player_alive : 'alive',
                 player_skin : 0

             },
             player_3: {
	               player_number : '3',
	               player_health : '10',
	               player_energy :'1',
	               player_alive : 'alive',
                 player_skin : 0

             },
             player_4: {
	               player_number : '4',
	               player_health : '10',
	               player_energy :'1',
	               player_alive : 'alive',
                 player_skin : 0
             }
         }
         });
         return game_ref;
     }

// add_player is best used to configure what skin a player will choose
// at the selection screen
function add_player (game,p_number,skin) {
         let game_ref = db.ref('/games' + game + '/' + 'players/' + 'player_' + p_number);
         let player_data = {
             player_skin : skin
         };
         let check_update = game_ref.update(player_data);
     }
