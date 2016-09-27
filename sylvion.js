/* SYLVION level module
	This module contains everything specific to Sylvion.
	The board will be defined in detail, as well as how
	cards are played and resolved.  
*/

// augment gameModule with Sylvion-specific properties
var gameModule = (function(game,player){

	// sylvion specific functions
	// playCard()
	game.prototype.playCard = function() {
		
	}

	// selectTarget1()
	game.prototype.selectTarget1 = function() {
		
	}

	// selectTarget2()
	game.prototype.selectTarget2 = function() {
		
	}

	// declare

	// select payment

	// deselect


/*
// loop through battlefield
function ForBattlefield(func) {
    for (var x = 2; x <= 5; x++) {
        for (var y = 2; y <= 5; y++) {
            eval(func);
        }
    }
}

// loop through battlefield plus ravage stacks
function ForExtendedBattlefield(func) {
    for (var x = 2; x <= 5; x++) {
        for (var y = 2; y <= 6; y++) {
            // console.log(func);
            eval(func);
        }
}

function setLifeTotal(life) {
    // define location and order of edge cards
    if (life <= 0) {
        console.log("you lose");
        return "rip"
    } else {
        var b = game.board;
        var edge = [
                b[1][5], b[1][4], b[1][3], b[1][2], // top edge
                b[2][1], b[3][1], b[4][1], b[5][1], // left edge
                b[6][2], b[6][3], b[6][4], b[6][5]  // bot edge
                   ]

        for (var i = 0; i < life ; i++) {
            edge[i][0].shortName = "B "; // bloom
            edge[i][0].type = "edge";
        }

        for (var j = life; j < 12 ; j++) {
            edge[j][0].shortName = "D " // desolated
            edge[j][0].type = "edge";
        }
        console.log("life total set to " + life);
        return life
    }
} // setLifeTotal()


function resolve(effect, value) {
    switch(effect) {
        case "pump":
            // for each grid cell, check if card type elemental then switch/case 1=>2, 2=>3, 3=>4, 0=>4
            for (var x = 2; x <= 5; x++) {
                for (var y = 2; y <= 6; y++) {
                    var currentCard = gameBoard[x][y][0]
                    if (currentCard.type == "elemental") {
                        // increase elemental strength
                        var newStr = [4,2,3,4,4][currentCard.strength]
                        if (currentCard.strength != newStr) {
                            var newShortName = "B" + newStr
                            var newCard = {"name":"Blazing Elemental", "faction":"Ravage", "type":"elemental", "strength":newStr, "shortName":newShortName};
                            console.log("Increasing",currentCard.shortName,"to",newStr);
                            discard(currentCard);
                            console.log("Discarding ", currentCard.name)
                            // gameBoard[x][y] = [emptyCard()]
                            Object.assign(currentCard,newCard);
                            // discard(x,y);
                        }
                    }
                }
            }
            break;

        case "move":
            // for each grid cell, check if card type elemental then move left %value spaces
            if (selectedTarget1.type == "elemental") {
                moveElemental(selectedLocation1,selectedLocation2);
            } else {
                console.log("no target..moving all elementals")
                ForExtendedBattlefield('moveElemental([x,y],[x,y-' + value + '])');
            }


            // console.log("move");
            showBoard();
            break;

        case "draw":
        // target player draws *value* cards
            draw(value,selectedTarget1.target);
            showHand();
            break;


        case "destroy":
        // discard target
            discard(selectedTarget1);
        // replace target with blank card
            deleteCard(selectedTarget1);
            showBoard();
            break;

        case "whale":
        // move elemental from origin to destination
            console.log("its a whaleeee");
            for (var x = 2; x <= 5; x++) {
                for (var y = 2; y <= 6; y++) {
                    var currentCard = gameBoard[x][y][0]
                    // console.log(gameBoard[x][y][0]);
                    if (currentCard.type == "elemental") {
                        console.log("move " + value + " spaces");
                        moveElemental([x,y],[x,y-value]);    
                    }
                }
            }
            break;

        case "counter": 
            console.log("Countering", selectedCard.name);
            resolve("destroy")
            break;
        
        default:
            console.log(selectedCard.name + " has no effect");
            if (selectedCard.type == "fountain" || "tree") {
                // console.log(selectedCard);
                // console.log(selectedTarget1);
                selectedTarget1.pop();
                selectedTarget1.push(selectedCard);
            }
    }
}

function useHedgehog(x,y) {
    // use Hedgehog card on the board location at x, y
    selectTarget1(x,y);
    console.log("choosing this card to remove", selectedTarget1);
    removeFromBoard(x,y);
    showBoard();
}

// move elemental card
// used in: simoon, move phase, whale
function moveElemental(from, to) {
    // if destination has a fountain/tree, call combat function
    // console.log(from);
    // console.log(to);
    var origin = gameBoard[from[0]][from[1]]
    var destination = gameBoard[to[0]][to[1]]
    // need to account for if destination index is < 1.. ?
    var currentCard = origin[0]
    // console.log(origin);
    if (currentCard.type == "elemental") {
        console.log("Moving",currentCard.shortName);
        destination.push(origin.shift()); // moved elemental is on bottom
        origin.push(emptyCard());
        if (destination[0].faction == "Sylvan") {
            combat(destination);
        } else if (destination[0].type == "edge") {
            setLifeTotal(game.player.Sylvan.lifeTotal -= origin[0].strength);
            origin.shift();
            origin.push(emptyCard());
        } else {
            destination.shift();
        }
    }
}

function combat(a) {
    sylvanCard = a[0]
    ravageCard = a[1]
    // check to make sure combat is valid
    if (sylvanCard.faction == "Sylvan" && ravageCard.faction == "Ravage") {
        // Sylvan card is on top of Ravage card
        if (sylvanCard.strength >= ravageCard.strength) {
            console.log(sylvanCard.name,">=","Ravage",ravageCard.name);
            a.pop(); // Ravage loses
        }
        if (sylvanCard.strength <= ravageCard.strength) {
            console.log(sylvanCard.name,"<=",ravageCard.name);
            a.shift(); // sylvan loses
            draw(1,"Player1");
        }
    } else {
        horizontalLine2();
        console.log("Combat is invalid!! Help!")
        horizontalLine2();
    }
    if (a.length == 0) {
        a.push(emptyCard());
        console.log(sylvanCard.name,"==",ravageCard.name);
}

function newGame() {
    // Populate game.board with "__" to provide spacing
    game.board.push([]);
    for (var i = 1; i <= 6; i++) { // for col 1-6
        gameBoard.push([]); // create array for rows
        gameBoard[i].push([]); // create stack in each cell
        for (var j = 1; j <= 6; j++) {
            gameBoard[i].push([emptyCard()]); // fill each cell with emptyCard()
        }
    }
    // Below code was not used because all objects created shared the same instance in each row
    // game.board[i] = new Array(6).fill(new Object({}));
    // game.board[i] = [{"shortName":"01"},{"shortName":"02"},{"shortName":"03"},{"shortName":"_4"},{"shortName":"_5"},{"shortName":"_6"}]

    // load decks
    load(intro);
    game.player.Sylvan.lifeTotal = setLifeTotal(6); // life total should be added into expansion to allow for difficulty settings
    showBoard();

    // shuffle decks
    shuffle(sylvanDeck);
    shuffle(ravageDeck);

    // divide Ravage deck into 4 stacks
    // stacks are game.player.Ravage.stack1, stack2, etc.
    // console.log("ravageDeck:", ravageDeck.length);
    for (var stackNumber = 0; stackNumber <= 3; stackNumber++) {
        for (var cardsPerStack = ravageDeck.length/4-1; cardsPerStack >= 0; cardsPerStack--) {
            game.player.Ravage.stacks[stackNumber].push(ravageDeck[cardsPerStack+stackNumber*ravageDeck.length/4]);
            // console.log("Stack#",stackNumber,"Card#",cardsPerStack+stackNumber*ravageDeck.length/4,game.player.Ravage.stacks[stackNumber]);
        }
    }


    draw(8,"Player1");
//     console.log("Player1's Hand",cardNames(game.player.Player1.hand));
//     console.log("Sylvan Deck",cardNames(game.player.Sylvan.deck));
    
    horizontalLine2();
    console.log("Begin First Battle Phase");
} // newGame()





// BATTLE PHASE
function battle() {
    //1. reveal Ravage cards
    revealRavage();
    //1a. player has option to use cards which counter ravage : To be built


    if (firstPlayer.hand.map(function(a) {return a.effect}).includes("counter")) {
        console.log("You may counter any ravage cards.  Proceed with continueBattle() afterwards.")
    } else {
        //2. Resolve Ravage cards (i.e resolving their effects)
        resolveRavage();

        //3. Move elementals by one -- right now, already in the resolveRavage() function. might need to extract out
        //moveElemental(spaces) -- new move function which takes in number of spaces?
        moveElementals();

        //4. Draw Reinforcements (3 cards)
        drawReinforcements();
    }
}

function continueBattle() {
    //2. Resolve Ravage cards (i.e resolving their effects)
    resolveRavage();

    //3. Move elementals by one -- right now, already in the resolveRavage() function. might need to extract out
    //moveElemental(spaces) -- new move function which takes in number of spaces?
    moveElementals();

    //4. Draw Reinforcements (3 cards)
    drawReinforcements();
}

function revealRavage() {
    // 1. Reveal Ravage Cards
        // add "visible": "Player1" when implementing multiplayer
        // reveal top card of each Ravage stack (move from deck to [i][6])
        for (var i = 2; i <= 5; i++) {
            // console.log(game.player.Ravage.stacks[i-1]);
            gameBoard[i][6].pop(); // remove emptyCard
            gameBoard[i][6].push(ravageStacks[i-2].shift());
        }

        showBoard();

        // Add all effects to stack
        for (var i = 2; i <= 5; i++) {
            effectsZone.push(gameBoard[i][6][0]);
        }

}


function resolveRavage() {
    // Resolve effects based on priority
        // only priorities A, B, C, D
        // elementals have no effect
    for (var i = 0; i < 4; i++) {
        horizontalLine2();
        console.log("Resolving priority " + String.fromCharCode(65+i) + " cards");
        for (var j = 0; j < effectsZone.length; j++) {
            var currentCard = effectsZone[j]
            if (currentCard.priority == String.fromCharCode(65+i)) {
                playCard(currentCard);
                // console.log("j:", j);
                removeFromBoard(j+2,6);
            }
        }
    }
    effectsZone = []
}

function moveElementals() {
    // 2. Move Elementals
    // move elementals by 1 space
    horizontalLine();
    console.log("Move Elementals");
    ForExtendedBattlefield(resolve("move",1));
    //show board after moving
    showBoard();
}


function drawReinforcements() {
        horizontalLine();
        console.log("Get Reinforcements");
        draw(3,"Player1");
        showHand();

        // 4. Defense
        // require console input
        // console.log("Player1's Hand",cardNames(firstPlayer.hand));
        // playCardFromHand(card#)


        // moveElemental(copy?) card to stack
        // select cards to pay (mana pool - cost)
        // if cant pay, return card to same spot in hand
        // select targets if any
        // resolve effects

    // 5. Show Board
// showBoard();


*/



	return {
		game: game,
		player: player
	}
})(gameModule.game,gameModule.player)