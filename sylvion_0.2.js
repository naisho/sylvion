// Sylvion Refactor
// ! focus on modular !

// game engine
	// DONE - all games have a board
	// DONE - all games have players

// load card game engine
	// DONE - card games have the assigned zones
	// card games have hands of cards (showhand)
	// card games have card game functions (shuffle)
	// card game helper functions (emptycard, forbattlefield)
	// card game regular functions (draw, play card, select target, discard...)

// load sylvion cards
	// card effects too
	// sylvion functions linked to cards (usehedgehog)

// load sylvion rules
	// sylvion has Sylvan and Ravage players
	// sylvion has a battlefield (showboard)
	// sylvion uses life total
	// sylvion specific functions (move elementals, combat, newgame revealravage)
	// sylvion phases

// load sylvion card effects


// this file will interact with pixi.js to get user input
// the following functionality must be exposed:
// viewing all zones, including game board and discard
// targetting
// playing cards
// 
// should NOT be able to
// edit the board directly
// delete cards (only through card effects)
// change any variables


/*
// module sylvion-specific functions
var sylvionRules = (function(global){
	// set life total

	// modules sylvion phase functions
	// combat
	// battle
	// continuebattle
	// reveal ravage
	// resolve ravage
	// moveelementals
	// draw reinforcements

})

// module card effects
var sylvionEffects = (function(global){
	// draw
	// resolve
	// use hedgehog
	// move elemental
	// discard
	// discard from hand
	// delete card
	// remove from board


})(global)

var helperFunctions = (function(global)){

	function shuffle(arrayOfObjects){
		return arrayOfObjects
	}

	function showBoard(){
		return success
	}

	function showHand(){
		return success
	}

	function horizontalLine(){
		return nothing
	}

	function emptyCard(){
		return object
	}

	function forBattlefield(string){
		// eval(string)
		return success
	}

	function forExtendedBattlefield(string){
		//eval(string)
		return success
	}
}


NOTES:

ES6:
arrow functions, spread operator, destructuring, better object literals, real modules, etc
doesn't work in older browsers, just FF, chrome, newer safari, maybe edge


const gameModule = (()=>{
    function player(game){
        this.game = game
        this.id = _.uniqueId()
        this.name = "Player" + (game.players.length + 1)
    }

    function game(){
        this.board = []
        this.players = []
    }

    game.prototype.newPlayer = function() {
        this.players.push(new player(this))
        return this.players
    }

    return {game, player}
})()

anyway let me just recap to make sure i understand what you did
so we moved the player constructor outside of the game constructor to separate them because theres no reason that it should be inside
then exposed player in return player:player
so its accessable from the other modules

yes. also moved the newPlayer to be on the prototype, instead of creating a "functions" object for each instance of game
also added a cyclical reference from player -> game, but you might not need that
also with this, you'd need to create an instance later.

*/