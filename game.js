// GAME level module
// this module contains everything that apply to all types of games
// all games have a board and have players
var gameModule = (function(){

	// player constructor
	function player(game) {
		this.id = _.uniqueId();
		// this.name = "Player" + (game.players.length + 1);
		this.game = game;	// reference current game
	};

	// game constructor
	function game() {
		this.board = [];
		this.players = [];
	};


	game.prototype.newPlayer = function() {
		this.players.push(new player(this));
		return this.players
		// the scope of this function is only inside this module
	};

	return {
		game: game,
		player: player
	}
})()