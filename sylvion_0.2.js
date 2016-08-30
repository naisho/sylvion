// Sylvion Refactor
// Make it modular


// generic game engine
// load card game engine
// load sylvion cards
// load sylvion rules
// load sylvion card effects


var gameModule = (function(global){
	function initializeGame(){
		return success
	}

	return {
		new: initializeGame()
	}
})(global)


var cardGameModule = (function(global){
	function importDeck(json){
		return success
	}

	function loadGameState(json){
		return success
	}

	function initialize(){
		// define zones
		
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
		importDeck: importDeck(json),
		loadGameState: loadGameState(json)
	}
})(global)


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



