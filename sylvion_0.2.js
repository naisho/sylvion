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



*/