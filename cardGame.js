/* CARD GAME level module
	This module contains everything specific to card games,
	but not general games.  Other modules of the same level
	can add board game functionality (dice, tokens, etc) or
	might not even use a board.  Card games have exclusive
	zones and use cards.
*/

// augment gameModule with properties specific to card games
// will consider mtg, sylvion, and machikoro
var gameModule = (function(game,player){

	function target() {
		// sylvion targets: board location, player, or card
		this.type = null // board, player, card
		this.location = new location()
	}

	function location() {
		this.row = _.noop()
		this.column = _.noop()
		this.value = null
	}
	
	// games like mtg and sylvion have a stack, rfg and targets
	var oldProto = game.prototype	// preserve prototype (newPlayer)
	game = (function(old) {
		return function game() {
			old.apply(this);
			this.zone = {
				stack: [],	// effects are resolved in stack order
				rfg: [],	// removed from game
				resource: {},	// game resources (mana, water, ...)
				selection: {
					card: {},	// currently selected card
					target1: new target(),	// card primary target
					target2: new target()	// card secondary target
				}
			};
		};
	}(game));
	// game.prototype = oldProto	// copying this prototype also copies its previous scope
	console.log(oldProto)

	game.prototype.newPlayer = function() {
		this.players.push(new player(this));
		return this.players
	};
	// console.log(game.prototype)

	player = (function(old) {
		return function player() {
			old.apply(this);
			this.hand = {}	// hand of cards
			this.deck = {}	// deck of cards
			this.discard = {}	// discard pile
		};
	}(player));
	// player has no previous prototype




	// card game specific functions
	// shuffle() - minified fisher-yates shuffle
	game.prototype.shuffle = function shuffle(r){for(var f,n,o=r.length;o;)n=Math.floor(Math.random()*o--),f=r[o],r[o]=r[n],r[n]=f;return r}

	// draw()
	// playCard()
	// selectTarget1()
	// selectTarget2()
	// discard()
	// ...

	// card game specific helper functions
	// showHand()
	// emptyCard()


/*
	function importDeck(json){
		return success
	}
*/

/*
	function loadGameState(json){
		return success
	}

*/

	// play card

	// delcare card from hand
	// select primary target
	// select secondary target
	// select payment

	// deselect card
	// deselect targets


	return {
		game: game,
		player: player
	}
})(gameModule.game,gameModule.player)