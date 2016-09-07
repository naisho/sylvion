/* CARD GAME level module
	this module contains everything specific to card games, but not general games
	all card games have zones and cards
*/
	// augment gameModule with properties specific to card games
	// will consider mtg, sylvion, and machikoro
var gameModule = (function(_game){

	function target(){
		// sylvion targets: board location, player, or discarded card
		this.type = null // board, player, discard
		this.location = new location()
	} 

	function location(){
		this.row = _.noop()
		this.column = _.noop()
		this.value = null
	}

	// games like mtg and sylvion use the following zones
	_game.zone = {
		stack: new Array(),	// stack is used to resolve effects
		rfg: new Array(),		// rfg is used to hold cards removed from the game
		selection: {		// selection for choosing card targets
			card: {},	// currently selected card
			target1: new target(),	// card primary target
			target2: new target()	// card secondary target
		}
	}

	// players have a hand, deck, and discard pile in card games
	// _game.functions.newPlayer.prototype.hand = Array.new
	// _game.functions.newPlayer.prototype.deck = Array.new
	// _game.functions.newPlayer.prototype.discard = Array.new

	// _game.functions




	function importDeck(json){
		return success
	}

	function loadGameState(json){
		return success
	}

	// play card

	// delcare card from hand
	// select primary target
	// select secondary target
	// select payment

	// deselect card
	// deselect targets


	return {
		debug: _game
		// importDeck: importDeck(json),
		// loadGameState: loadGameState(json)
	}
})(gameModule)