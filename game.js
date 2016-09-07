// GAME level module
// this module contains everything that apply to all types of games
// all games have a board and have players
var gameModule = (function(){
	// global game object
	var _game = new game();

	// game constructor
	function game(){
		this.board = new Array()
		this.players = new Array()

		function player(){
			this.id = _.uniqueId()
			this.name = "Player" + (_game.players.length + 1)
		}

		this.functions = {
			newPlayer: (function(){
				_game.players.push(new player());
				return _game.players
			})
		}
	}

	return _game
})()