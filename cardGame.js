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
	}(game))
	game.prototype = oldProto

	player = (function(old) {
		return function player(game) {
			old.apply(this, [game]);
			this.hand = []	// hand of cards
			this.deck = []	// deck of cards
			this.discard = []	// discard pile
		};
	}(player));

	// card game specific functions
	// minified fisher-yates shuffle
	// shuffle(deck) // return shuffledDeck
	game.prototype.shuffle = function shuffle(r){for(var f,n,o=r.length;o;)n=Math.floor(Math.random()*o--),f=r[o],r[o]=r[n],r[n]=f;return r}

	// draw(#,deck,player#) // return cardsDrawn
	game.prototype.draw = function(no, deck, playerIndex) {
		var player = this.players[playerIndex]
		var hand = player.hand
		var deck = player.deck
		for (var i = 0; i < no; i++) {
			hand.push(deck.shift());
		}
		return hand.slice(hand.length-no,hand.length)
	}

	// playCard()
	game.prototype.playCard = function() {
		
	}

	// selectTarget1()
	game.prototype.selectTarget1 = function() {
		
	}

	// selectTarget2()
	game.prototype.selectTarget2 = function() {
		
	}

	// discard()
	game.prototype.discard = function() {
		
	}

	// ...

/*
//new playcard
function playCard(card,origin,target) {
    horizontalLine();
    console.log("Resolving",card.name);
    resolve(card.effect,card.value);
    discard(card);
}


function selectTarget1(x,y) {
    if (selectedCard) {
        if ((typeof(x) == "string") && (y == null)) {
            selectedTarget1 = {type:"Player", target:x}
        } else {
            selectedTarget1 = gameBoard[x][y][0]
            selectedLocation1 = [x,y]
            if (selectedTarget1.shortName != "__") {
                console.log("Selected " + selectedTarget1.name + " (" + selectedTarget1.shortName + ")" + " as primary target");
            } else {
                selectedTarget1 = gameBoard[x][y]
                console.log("Selected board space " + x + "," + y + " as primary target");
            }
        }
    } else {
        return "Please declare a card from hand before selecting a target"
    }
}

function selectTarget2(x,y) {
    if (selectedCard && selectedTarget1) {
        selectedTarget2 = gameBoard[x][y][0]
        selectedLocation2 = [x,y]
        if (selectedTarget2.shortName != "__") {
            console.log("Selected " + selectedTarget2.name + " (" + selectedTarget2.shortName + ")" + " as secondary target");
        } else {
            selectedTarget2 = gameBoard[x][y]
            console.log("Selected board space " + x + "," + y + " as secondary target");
        }
    } else {
        return "Please select a primary target before selecting a secondary target"
    }
}

function selectPayment() {
    if (selectedCard) {
        return selectedPayment = [].slice.call(arguments).sort()
    } else {
        return "Please declare a card from hand before selecting payment"
    }
}

function playCardFromHand() {
    if (((selectedCard.target == selectedTarget1.type) || !(selectedCard.target)) && (selectedPayment.length == selectedCard.cost)) {
        console.log("I can play ",selectedCard.name)
        for (var i = selectedPayment.length - 1; i >= 0; i--) {
            discardFromHand(selectedPayment[i]);
        }
        playCard(selectedCard,selectedTarget1,selectedTarget2);
        var indexOfCard = firstPlayer.hand.map(function(i){return i.id}).indexOf(selectedCard.id)
        // showHand();
        // console.log("Discarding card ID ",selectedCard.id);
        firstPlayer.hand.splice(indexOfCard,1);
        discard(selectedCard);
        deselectCard();
        deselectTargets();
        selectedPayment = []
        showHand();
    } else {
        console.log("Can't play this card")
    }
}




*/


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