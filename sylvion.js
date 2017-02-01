// initialize objects that will be used in the game
    function game() {
        this.board = [];  // 2D grid
        this.players = new players;
        this.lifeTotal = 0;
        this.zone = {
            stack: [],  // effects are resolved in stack order
            rfg: [],    // removed from game
            resource: {},   // game resources (mana, water, ...)
            selection: {
                card: {},   // currently selected card
                target1: new target(),  // card primary target
                target2: new target()   // card secondary target
            }
        };
    };

    // ============
    // Constructors
    // ============

    function target(type,card,loc) {
        this.type = type || null // board, player, card
        this.card = card || null
        this.location = loc || null
    };

    function location(row,col,val) {
        this.row = row || null
        this.column = col || null
        this.value = val || null
    };

    // for styling only
    function players() {
    };

    // for styling only
    function card() {
    };

    function player(name) {
        // this.id = _.uniqueId();
        // this.name = "Player" + (game.players.length + 1);
        this.name = name;
        // this.game = game;   // reference current game
        this.hand = []  // hand of cards
        this.deck = []  // deck of cards
        this.discard = []   // discard pile
    };

    game.prototype.newPlayer = function(name) {
        this.players[name] = new player(name);
        return this.players[name]
    };
    

    // ================
    // Helper Functions
    // ================

    // hr()
    function hr() {return "=========="}

    // emptyCard()
    function emptyCard() {
        var newCard = {"shortName":"__"}
        return JSON.parse(JSON.stringify(newCard)) // clone newCard object
    }

    // showBoard()
    game.prototype.showBoard = function() {
        console.log(hr());
        console.log("          1  2  3  4  5  6 ")
        for (var x = 1; x <= 6; x++) {
            rowText = "Row #" + x + ":  ";
            for (var y = 1; y <= 6; y++) {
                if (this.board[x][y].length == 0) {
                    rowText += "__ "
                } else {
                    rowText += this.board[x][y][0].shortName + " "
                }
            }
            console.log(rowText);
        }
        return hr();
    } // showBoard()

    game.prototype.showHand = function() {
        Player1 = this.players.Player1
        console.log(hr());
        // console.log(Player1.hand);
        for (var i = 0; i < Player1.hand.length; i++) {
            console.log(i,Player1.hand[i].shortName,Player1.hand[i].name);
        }
        return hr();
    }
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
*/


    // ==============
    // Game Functions
    // ==============

    // fisher-yates shuffle
    // takes array, returns shuffled array
    game.prototype.shuffle = function shuffle(r){for(var f,n,o=r.length;o;)n=Math.floor(Math.random()*o--),f=r[o],r[o]=r[n],r[n]=f;return r}

    // draw(#,deck,name) // return cardsDrawn
    game.prototype.draw = function(no, deck, player) {
        var hand = player.hand
        for (var i = 0; i < no; i++) {
            hand.push(deck.shift());
        };
        return hand.slice(hand.length-no,hand.length)
    };

    // Create 6x6 board
    game.prototype.createBoard = function(row,col) {
        for (var x = 1; x <= row; x++) {
            this.board.push([]);
            for (var y = 1; y <= col ; y++) {
                this.board[x][y] = [];
            }
        }
    }; // createBoard()

    // Set up Bloom/Desolate cards
    game.prototype.setLifeTotal = function(life) {
        // define location and order of edge cards
        if (life <= 0) {
            console.log("Life total set to " + life + ".");
            throw "You lost.";
            return "rip"
        } else {
            var b = this.board;
            var edge = [
                    b[1][5], b[1][4], b[1][3], b[1][2], // top edge
                    b[2][1], b[3][1], b[4][1], b[5][1], // left edge
                    b[6][2], b[6][3], b[6][4], b[6][5]  // bot edge
                       ]

            for (var i = 0; i < life ; i++) {
                edge[i][0] = new card();
                edge[i][0].shortName = "B "; // bloom
                edge[i][0].type = "Edge";
            };

            for (var j = life; j < 12 ; j++) {
                edge[j][0] = new card();
                edge[j][0].shortName = "D " // desolated
                edge[j][0].type = "Edge";
            };

            this.lifeTotal = life;
            console.log("Life total set to " + life + ".");
            return life;
        }
    } // setLifeTotal()    

    // Import Sylvion starter deck
    var intro = '{"_title":"Planting a Seed","_description":"This first step will allow you to start playing the game quickly, without having to read the rule book in its entirety. Playing this mode will introduce you to Sylvion’s core concepts.","game":{"player":{"Sylvan":{"deck":[{"name":"Fountain","faction":"Sylvan","type":"fountain","cost":0,"strength":1,"shortName":"F1"},{"name":"Fountain","faction":"Sylvan","type":"fountain","cost":0,"strength":1,"shortName":"F1"},{"name":"Fountain","faction":"Sylvan","type":"fountain","cost":1,"strength":2,"shortName":"F2"},{"name":"Fountain","faction":"Sylvan","type":"fountain","cost":1,"strength":2,"shortName":"F2"},{"name":"Fountain","faction":"Sylvan","type":"fountain","cost":2,"strength":3,"shortName":"F3"},{"name":"Fountain","faction":"Sylvan","type":"fountain","cost":2,"strength":3,"shortName":"F3"},{"name":"Fountain","faction":"Sylvan","type":"fountain","cost":3,"strength":4,"shortName":"F4"},{"name":"Fountain","faction":"Sylvan","type":"fountain","cost":3,"strength":4,"shortName":"F4"},{"name":"Tree","faction":"Sylvan","type":"tree","cost":0,"strength":0,"vitality":1,"shortName":"T1"},{"name":"Tree","faction":"Sylvan","type":"tree","cost":0,"strength":0,"vitality":1,"shortName":"T1"},{"name":"Tree","faction":"Sylvan","type":"tree","cost":1,"strength":0,"vitality":2,"shortName":"T2"},{"name":"Tree","faction":"Sylvan","type":"tree","cost":1,"strength":0,"vitality":2,"shortName":"T2"},{"name":"Tree","faction":"Sylvan","type":"tree","cost":2,"strength":0,"vitality":3,"shortName":"T3"},{"name":"Tree","faction":"Sylvan","type":"tree","cost":2,"strength":0,"vitality":3,"shortName":"T3"},{"name":"Tree","faction":"Sylvan","type":"tree","cost":3,"strength":0,"vitality":4,"shortName":"T4"},{"name":"Tree","faction":"Sylvan","type":"tree","cost":3,"strength":0,"vitality":4,"shortName":"T4"},{"name":"Whale","faction":"Sylvan","type":"animal","cost":0,"effect":"move","target":"elemental","shortName":"W "},{"name":"Whale","faction":"Sylvan","type":"animal","cost":0,"effect":"move","target":"elemental","shortName":"W "},{"name":"Elephant","faction":"Sylvan","type":"animal","cost":1,"effect":"destroy","target":"elemental","shortName":"E "},{"name":"Elephant","faction":"Sylvan","type":"animal","cost":1,"effect":"destroy","target":"elemental","shortName":"E "},{"name":"Hedgehogs","faction":"Sylvan","type":"animal","cost":0,"effect":"counter","shortName":"HH"},{"name":"Hedgehogs","faction":"Sylvan","type":"animal","cost":0,"effect":"counter","shortName":"HH"},{"name":"Owl","faction":"Sylvan","type":"animal","cost":1,"effect":"draw","value":3,"target":"player","shortName":"Ow"},{"name":"Owl","faction":"Sylvan","type":"animal","cost":1,"effect":"draw","value":3,"target":"player","shortName":"Ow"}]},"Ravage":{"deck":[{"name":"Elemental","faction":"Ravage","type":"elemental","strength":0,"shortName":"E0"},{"name":"Elemental","faction":"Ravage","type":"elemental","strength":0,"shortName":"E0"},{"name":"Elemental","faction":"Ravage","type":"elemental","strength":0,"shortName":"E0"},{"name":"Elemental","faction":"Ravage","type":"elemental","strength":0,"shortName":"E0"},{"name":"Elemental","faction":"Ravage","type":"elemental","strength":0,"shortName":"E0"},{"name":"Elemental","faction":"Ravage","type":"elemental","strength":0,"shortName":"E0"},{"name":"Elemental","faction":"Ravage","type":"elemental","strength":0,"shortName":"E0"},{"name":"Elemental","faction":"Ravage","type":"elemental","strength":0,"shortName":"E0"},{"name":"Elemental","faction":"Ravage","type":"elemental","strength":1,"shortName":"E1"},{"name":"Elemental","faction":"Ravage","type":"elemental","strength":1,"shortName":"E1"},{"name":"Elemental","faction":"Ravage","type":"elemental","strength":1,"shortName":"E1"},{"name":"Elemental","faction":"Ravage","type":"elemental","strength":1,"shortName":"E1"},{"name":"Elemental","faction":"Ravage","type":"elemental","strength":1,"shortName":"E1"},{"name":"Elemental","faction":"Ravage","type":"elemental","strength":1,"shortName":"E1"},{"name":"Elemental","faction":"Ravage","type":"elemental","strength":1,"shortName":"E1"},{"name":"Elemental","faction":"Ravage","type":"elemental","strength":1,"shortName":"E1"},{"name":"Elemental","faction":"Ravage","type":"elemental","strength":2,"shortName":"E2"},{"name":"Elemental","faction":"Ravage","type":"elemental","strength":2,"shortName":"E2"},{"name":"Elemental","faction":"Ravage","type":"elemental","strength":2,"shortName":"E2"},{"name":"Elemental","faction":"Ravage","type":"elemental","strength":2,"shortName":"E2"},{"name":"Elemental","faction":"Ravage","type":"elemental","strength":2,"shortName":"E2"},{"name":"Elemental","faction":"Ravage","type":"elemental","strength":2,"shortName":"E2"},{"name":"Elemental","faction":"Ravage","type":"elemental","strength":2,"shortName":"E2"},{"name":"Elemental","faction":"Ravage","type":"elemental","strength":2,"shortName":"E2"},{"name":"Elemental","faction":"Ravage","type":"elemental","strength":3,"shortName":"E3"},{"name":"Elemental","faction":"Ravage","type":"elemental","strength":3,"shortName":"E3"},{"name":"Elemental","faction":"Ravage","type":"elemental","strength":3,"shortName":"E3"},{"name":"Elemental","faction":"Ravage","type":"elemental","strength":3,"shortName":"E3"},{"name":"Elemental","faction":"Ravage","type":"elemental","strength":3,"shortName":"E3"},{"name":"Elemental","faction":"Ravage","type":"elemental","strength":3,"shortName":"E3"},{"name":"Elemental","faction":"Ravage","type":"elemental","strength":3,"shortName":"E3"},{"name":"Elemental","faction":"Ravage","type":"elemental","strength":3,"shortName":"E3"},{"name":"Blaze","faction":"Ravage","type":"support","effect":"blaze","priority":"C","shortName":"Bz"},{"name":"Blaze","faction":"Ravage","type":"support","effect":"blaze","priority":"C","shortName":"Bz"},{"name":"Blaze","faction":"Ravage","type":"support","effect":"blaze","priority":"C","shortName":"Bz"},{"name":"Blaze","faction":"Ravage","type":"support","effect":"blaze","priority":"C","shortName":"Bz"},{"name":"Blaze","faction":"Ravage","type":"support","effect":"blaze","priority":"C","shortName":"Bz"},{"name":"Blaze","faction":"Ravage","type":"support","effect":"blaze","priority":"C","shortName":"Bz"},{"name":"Blaze","faction":"Ravage","type":"support","effect":"blaze","priority":"C","shortName":"Bz"},{"name":"Blaze","faction":"Ravage","type":"support","effect":"blaze","priority":"C","shortName":"Bz"},{"name":"Simoon","faction":"Ravage","type":"support","effect":"simoon","value":1,"priority":"D","shortName":"Sm"},{"name":"Simoon","faction":"Ravage","type":"support","effect":"simoon","value":1,"priority":"D","shortName":"Sm"},{"name":"Simoon","faction":"Ravage","type":"support","effect":"simoon","value":1,"priority":"D","shortName":"Sm"},{"name":"Simoon","faction":"Ravage","type":"support","effect":"simoon","value":1,"priority":"D","shortName":"Sm"},{"name":"Simoon","faction":"Ravage","type":"support","effect":"simoon","value":1,"priority":"D","shortName":"Sm"},{"name":"Simoon","faction":"Ravage","type":"support","effect":"simoon","value":1,"priority":"D","shortName":"Sm"},{"name":"Simoon","faction":"Ravage","type":"support","effect":"simoon","value":1,"priority":"D","shortName":"Sm"},{"name":"Simoon","faction":"Ravage","type":"support","effect":"simoon","value":1,"priority":"D","shortName":"Sm"}]}}}}';

    game.prototype.importSet = function(file) {
        var expansion = JSON.parse(file);
        var sylvanDeck = this.players.Sylvan.deck
        var ravageDeck = this.players.Ravage.deck

        var sylvanExpansion = expansion.game.player.Sylvan.deck
        var ravageExpansion = expansion.game.player.Ravage.deck

        var id = 0 // unique id for each card
        
        // Import Sylvan cards from file
        for (var i = sylvanExpansion.length - 1; i >= 0; i--) {
            sylvanExpansion[i].id = id++;
            sylvanDeck.push(sylvanExpansion[i]);
        }
        console.log("Loaded Sylvan deck.");
        
        // Import Ravage cards from file
        for (var i = ravageExpansion.length - 1; i >= 0; i--) {
            ravageExpansion[i].id = id++;
            ravageDeck.push(ravageExpansion[i]);
        }
        console.log("Loaded Ravage deck.");
        console.log("Finished loading " + expansion._title + ".");
    } // importSet(file)

    game.prototype.ravageReveal = function() {
        console.log("=== Step 1 : Reveal Ravage Cards ===");
        for (var i = 2; i <= 5; i++) {
            this.board[i][6].shift(); // remove existing card
            this.board[i][6].push(this.players.Ravage.deck.shift());
        }

        this.showBoard();
        
        if (this.hasHedgehogs(this.players.Player1.hand)) {
            this.showHand();
            console.log("Would you like to play Hedgehogs?");
            console.log("Use (game).ravageTurn() to continue.");
            //JENNFER COMMENT: after this, the showHand function will be called and you can see the board;
            //if user wants to play hedgehogs, they use playCardfromHand()
        } else {
            console.log("No Hedgehogs...continuing Ravage turn.");
            this.ravageTurn();
        }
    }

    game.prototype.hasHedgehogs = function(hand) {
        for (var i = 0; i < hand.length; i++) {
            if (hand[i].name == "Hedgehogs") {
                return true
            }
        }
        return false
    };

    game.prototype.ravageTurn = function() {
        for (var i = 2; i <= 5; i++) {
            if (this.board[i][6][0].type == "support") {
                this.zone.stack.unshift(this.board[i][6].shift());
            }
        }

        try {
            this.ravageStack();

            this.ravageAdvance();
        }
        catch(err) {
            console.log("Error:",err);
        }

        console.log("End of Ravage Turn");

        this.sylvanTurn();

        console.log(hr());
        
    }

    game.prototype.ravageAdvance = function () {
        //JENNFER COMMENT: assumption is that an advance is basically a "simoon" move so make a new card called Advance that has a simoon effect
        c = {name:"Advance", faction:"Ravage", type:"game effect", effect:"simoon", value:"1"}
        console.log("=== Step 2 : Move Elementals ===")
        this.resolveCard(c); // JENNFER NOTE NOT DONE
        this.showBoard();
        console.log(hr());
    }

    game.prototype.ravageStack = function() {
        //JENNFER COMMENT: play each ravage card revealed
        for (var i = 0; i < this.zone.stack.length; i++) {
            currentCard = this.zone.stack.shift();
            console.log(" -> Playing",currentCard.name);
            this.resolveCard(currentCard); //JENNFER NOTE NOT DONE
        }
    }

    game.prototype.sylvanTurn = function() {
        console.log("=== Step 3 : Reinforcements ===");
        c = {name:"Reinforcements", faction:"Sylvan", type:"game effect", effect:"draw", target1:"player", value:"3"}
        this.resolveCard(c,this.selectTarget("Player1"));
        
        console.log(hr());

        console.log("=== Step 4 : Defense ===");
        //JENNFER COMMENT: player can choose to play the cards he just drew by using playCard(); valid payment will be checked
        // this.showHand();
        console.log("Use playCardFromHand() now.")
        console.log("End turn with endTurn()");
    }

    game.prototype.endTurn = function() {
        console.log("=== End of Turn ===");
        this.ravageReveal();
    }

    game.prototype.isValidTarget = function(card,target1,target2) {
        if (card.target1 == undefined) {
            return true
        }

        // compile array of valid targets
        validTargets = card.target1
        if (target2) {validTargets += " " + card.target2};
        validTargets = validTargets.split(" ");
        
        // compile array of target's types
        switch (target1.type) {
            case "card":
                targetTypes = target1.type + " " + target1.card.faction + " " + target1.card.type;
                targetName = target1.card.name;
                break;
            case "board":
                targetTypes = "board";
                targetName = "Board space (" + target1.location.row + "," + target1.location.column + ")";
                break;
            case "player":
                targetTypes = "player";
                targetName = target1.location.value.name;
                break;
        }
        targetTypes = targetTypes.split(" ");

        for (var i = 0; i < validTargets.length; i++) {
            for (var j = 0; j < targetTypes.length; j++) {
                console.log("comparing",validTargets[i],"with",targetTypes[j]);
                if (validTargets[i] == targetTypes[j]) {
                    console.log(targetName + " is a valid target for " + card.name + ".");
                    return true;
                }
            }
        }
        return false
    }

    // playCard()
    game.prototype.playCard = function(card,target1,target2,payment) {
        console.log("playing card ",card);
        console.log("target1: ",target1);
        console.log("target2: ",target2);
        console.log("payment: ",payment);
        // validation of target and payment should be done outside of the function
        this.zone.stack.unshift(card); // copy current card to stack
        this.resolveCard(card,target1,target2);
        this.zone.stack.shift(); // remove card after it has resolved
        this.showBoard();
        this.showHand();
    }

    game.prototype.isValidPayment = function(card,payment) {
        // remove duplicate values
        var unique = payment.filter(function(elem, index, self) {
            return index == self.indexOf(elem);
        })

        // check if the cost is correct
        if (unique.length == card.cost) {
            return true
        } else {
            return false
        }1
    }

    // playCardFromHand() 
    game.prototype.playCardFromHand = function(i,t1,t2,p) {
        currentCard = this.players.Player1.hand[i]

        // check if targets are valid
        if (this.isValidTarget(currentCard,t1,t2)) {

            // check if payment is valid
            if (this.isValidPayment(currentCard,p)) {
                
                p1Hand = this.players.Player1.hand // copy payment from hand to discard

                for (var j = 0; j < p.length; j++) {
                    this.players.Sylvan.discard.unshift(p1Hand[p[j]]);
                }

                p.push(i); // add index to payment array to be removed
                p.sort(function(a, b){return a-b}); // ensure payment array is sorted

                // remove cards from hand, descending order
                for (var j = p.length - 1; j >= 0; j--) {
                    console.log("removing ",p1Hand[p[j]].shortName);
                    p1Hand.splice(p[j],1);
                }

                // play card
                this.playCard(currentCard,this.selectTarget(t1),this.selectTarget(t2),p);
            }
        }
    }

    // selectTarget()
    game.prototype.selectTarget = function(arg1,arg2) {
        // determine argument type
        // check what card is at the location
        // return new target object

        if (arg1 instanceof location) {
            // arg1 is a location object
            card = this.board[arg1.row][arg1.column][0]
            if (card == null) {selected = new target("board",null,arg1)}
                else {selected = new target("card",card,arg1)}
        } else if ((Number.isInteger(arg1)) && (Number.isInteger(arg2))) {
            // arg1 and arg2 are integers
            card = this.board[arg1][arg2][0];
            loc = new location(arg1,arg2); // convert to location
            if (card == null) {selected = new target("board",null,loc)}
                else {selected = new target("card",card,loc)}
        } else if (arg1 instanceof Array) {
            // arg1 is an array of 2 integers
            if (arg1.length == 2) {
                card = this.board[arg1[0]][arg1[1]][0];
                loc = new location(arg1[0],arg1[1]); // convert to location
                if (card == null) {selected = new target("board",null,loc)}
                    else {selected = new target("card",card,loc)}
            }
        } else if (arg1 instanceof player) {
            // arg1 is a player object
            selected = new target("player",null,new location(null,null,arg1));
        } else if (typeof arg1 == "string" || arg1 instanceof String) {
            // arg1 is a string
            selected = new target("player",null,new location(null,null,this.players[arg1]));
        }
        
        return selected
    }

    // discard()
    game.prototype.discardCardFromHand = function(p,index) {
        if (typeof p == "string" || p instanceof String) {
            currentPlayer = this.players[p];
        } else if (p instanceof player) {
            currentPlayer = p;
        }
        this.zone.discard.unshift(currentPlayer.hand.slice(index,1));
    }

    game.prototype.resolveCard = function(card,arg1,arg2) {
        switch (card.effect) {
            case "move":
                target1 = this.board[arg1.location.row][arg1.location.column]
                target2 = this.board[arg2.location.row][arg2.location.column]
                if (target2.length > 0) {
                    this.combat(target1,target2);
                } else {
                    target2.push(target1.unshift());
                }
                break;
            case "destroy":
                target1 = this.board[arg1.location.row][arg1.location.column]
                console.log(" -> Destroying ",target1.name);
                target1.pop();
                break;
            case "counter":
                target1 = this.board[arg1.location.row][arg1.location.column]
                target1.pop();
                break;
            case "draw":
                for (var i = 0; i < card.value; i++) {
                    currentCard = this.players.Sylvan.deck.shift();
                    console.log(" -> Drew",currentCard.name);
                    arg1.location.value.hand.push(currentCard);
                };
                this.showHand();
                break;
            case "blaze":
                for (var row = 2; row <= 5; row++) {
                    for (var col = 2; col <= 6; col++) {
                        currentCard = this.board[row][col][0];
                        if (currentCard != undefined) {
                            if (currentCard.type == "elemental") {
                                var newStr = [4,2,3,4,4][currentCard.strength];
                                if (currentCard.strength != newStr) {
                                    var newShortName = "B" + newStr
                                    var newCard = {"name":"Blazing Elemental", "faction":"Ravage", "type":"blazing elemental", "strength":newStr, "shortName":newShortName};
                                    console.log("Increasing",currentCard.shortName,"to B",newStr,".");
                                    this.players.Sylvan.discard.unshift(this.board[row][col].pop());
                                    this.board[row][col].unshift(newCard);
                                }
                            }
                        }
                    }
                }
                break;
            case "simoon":
                for (var row = 2; row <= 5; row++) {
                    for (var col = 2; col <= 6; col++) {
                        currentCard = this.board[row][col][0];
                        if (currentCard != undefined) {
                            if (currentCard.type.includes("elemental")) {
                                curr = this.board[row][col];
                                next = this.board[row][col-1];
                                if (next.length > 0) {
                                    this.combat(curr,next);
                                } else {
                                    this.board[row][col-1].unshift(this.board[row][col].pop());
                                }
                            }
                        }
                    }
                }
                this.checkForest();
                break;
            case undefined:
                // tree or fountain
                target1 = this.board[arg1.location.row][arg1.location.column];
                target1.pop;
                target1.push(card);
                break;
        }
    }

    game.prototype.combat = function(t1,t2) {
        // t1 should always be an elemental, and t2 sylvan
        c = {name:"Consolation Prize", faction:"Sylvan", type:"game effect", effect:"draw", target1:"player", value:"1"}

        elemental = t1[0];
        sylvan = t2[0];
        console.log("Battle between ",elemental.shortName," and ",sylvan.shortName);
        if (elemental.strength > sylvan.strength) {
            t2.pop();
            t2.push(t1.pop());
            this.resolveCard(c,this.selectTarget("Player1"));
        } else if (elemental.strength < sylvan.strength) {
            t1.pop();
        } else if (elemental.strength == sylvan.strength) {
            t1.pop();
            t2.pop();
            this.resolveCard(c,this.selectTarget("Player1"));
        }
    }

    game.prototype.checkForest = function() {
        for (var row = 2; row <= 5; row++) {
            currentCard = this.board[row][2][0];
            if (currentCard != undefined) {
                if (currentCard.type.includes("elemental")) {
                    this.setLifeTotal(this.lifeTotal - currentCard.strength);
                    this.players.Ravage.discard.unshift(this.board[row][2].pop());
                }
            }
        }
    }






    // ==========
    // Start Game
    // ==========

    testGame = new game();

    // Initialize game
    game.prototype.start = function(expansion) {
        this.board.push([]);    // offset index by 1 for easier reference

        // Create players
        Player1 = this.newPlayer("Player1");
        Sylvan = this.newPlayer("Sylvan");
        Ravage = this.newPlayer("Ravage");

        // Set up board
        this.createBoard(6,6);
        this.setLifeTotal(6);

        // Load cards in expansion
        this.importSet(expansion);
        this.shuffle(testGame.players.Sylvan.deck);
        this.shuffle(testGame.players.Ravage.deck);

        // Planting a Seed: Start with 8 cards
        //JENNFER COMMENT: add to intro json file as attribute (initDraw or something) :-*
        this.draw(8,Sylvan.deck,Player1);

        // Ravage First Turn
        this.ravageReveal();
    }

    testGame.start(intro);


// things left to do
// combat ** should be done
// hedgehogs
// win condition
// recycling the deck
// payment abuse check
// target check for empty space