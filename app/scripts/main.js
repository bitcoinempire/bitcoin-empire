var game = {
  moonTokens: 7,
  cards: [],
  games: [],
  players: []
};

game.do = {
  createCards: function() {
    game.cards.push({
      type: "Satoshi Nakamoto",
      skill: ["law", "coding", "marketing"],
      law: 1,
      coding: 1,
      marketing: 1
    },
    {
      type: "Internet Meltdown",
      skill: ["law", "coding"],
      law: 1,
      coding: 1
    },
    {
      type: "Internet Meltdown",
      skill: ["law", "marketing"],
      law: 1,
      marketing: 1
    },
    {
      type: "Internet Meltdown",
      skill: ["coding", "marketing"],
      coding: 1,
      marketing: 1
    });

    _.each(_.range(7), function(){
      game.cards.push({
        type: "Exchange",
        storageCapacity: 3
      },
      {
        type: "Lawsuit",
        attack: "Lawsuit",
        skill: "law",
        law: 1
      },
      {
        type: "Hack",
        attack: "Hack",
        skill: "coding",
        coding: 1
      },
      {
        type: "Smear Campaign",
        attack: "Smear Campaign",
        skill: "marketing",
        marketing: 1
      },
      {
        type: "Skullduggery"
      },
      {
        type: "Head Hunter"
      });
    });

    _.map(game.cards, function(card){
      card.deck = true;
      return card;
    });

    game.cards.push({
      type: "Dealer"
    },
    {
      type: "Bonus Rule",
      name: "Knives Out"
    },
    {
      type: "Bonus Rule",
      name: "Nakamoto Obliterate"
    },
    {
      type: "Bonus Rule",
      name: "Anarchy"
    },
    {
      type: "Character",
      name: "Carl",
      characterNumber: 1,
      law: 1,
      coding: 1,
      marketing: 1,
      storageCapacity: 3
    },
    {
      type: "Character",
      name: "Vernon",
      characterNumber: 2,
      law: 1,
      coding: 0,
      marketing: 2,
      storageCapacity: 3
    },
    {
      type: "Character",
      name: "Robert",
      characterNumber: 3,
      law: 0,
      coding: 1,
      marketing: 1,
      storageCapacity: 4
    },
    {
      type: "Character",
      name: "Bruce",
      characterNumber: 4,
      law: 2,
      coding: 1,
      marketing: 0,
      storageCapacity: 3
    },
    {
      type: "Character",
      name: "Dave",
      characterNumber: 5,
      law: 1,
      coding: 2,
      marketing: 1,
      storageCapacity: 2
    },
    {
      type: "Character",
      name: "Doge",
      characterNumber: 6,
      law: 1,
      coding: 2,
      marketing: 2,
      storageCapacity: 1
    },
    {
      type: "Character",
      name: "Kenny",
      characterNumber: 7,
      law: 2,
      coding: 0,
      marketing: 0,
      storageCapacity: 4
    },
    {
      type: "Character",
      name: "Audrey",
      characterNumber: 8,
      law: 2,
      coding: 0,
      marketing: 2,
      storageCapacity: 2
    },
    {
      type: "Character",
      name: "Pepe",
      characterNumber: 9,
      law: 0,
      coding: 4,
      marketing: 1,
      storageCapacity: 1
    },
    {
      type: "Character",
      name: "Jennifer",
      characterNumber: 10,
      law: 0,
      coding: 0,
      marketing: 1,
      storageCapacity: 5
    },
    {
      type: "Character",
      name: "Justin",
      characterNumber: 11,
      law: 0,
      coding: 2,
      marketing: 1,
      storageCapacity: 3
    },
    {
      type: "Character",
      name: "Darren",
      characterNumber: 12,
      law: 1,
      coding: 0,
      marketing: 2,
      storageCapacity: 3
    },
    {
      type: "Character",
      name: "Rick",
      characterNumber: 13,
      law: 1,
      coding: 0,
      marketing: 1,
      storageCapacity: 4
    },
    {
      type: "Character",
      name: "Moon Bear",
      characterNumber: 14,
      law: 1,
      coding: 1,
      marketing: 2,
      storageCapacity: 2
    },
    {
      type: "Character",
      name: "Space Squid",
      characterNumber: 15,
      law: 1,
      coding: 1,
      marketing: 0,
      storageCapacity: 4
    },
    {
      type: "Character",
      name: "Naked Girl",
      characterNumber: 16,
      law: 2,
      coding: 0,
      marketing: 1,
      storageCapacity: 3
    },
    {
      type: "Character",
      name: "Martian Walrus",
      characterNumber: 17,
      law: 0,
      coding: 1,
      marketing: 2,
      storageCapacity: 3
    },
    {
      type: "Character",
      name: "Techno Pirate",
      characterNumber: 18,
      law: 0,
      coding: 2,
      marketing: 0,
      storageCapacity: 4
    },
    {
      type: "Character",
      name: "Psychedelic Scientist",
      characterNumber: 19,
      law: 1,
      coding: 2,
      marketing: 0,
      storageCapacity: 3
    },
    {
      type: "Character",
      name: "Giant Doge",
      characterNumber: 20,
      law: 2,
      coding: 1,
      marketing: 2,
      storageCapacity: 1
    },
    {
      type: "Character",
      name: "Captain Crypto",
      characterNumber: 21,
      law: 2,
      coding: 1,
      marketing: 1,
      storageCapacity: 2
    });
  },
  newGame: function(characters) {
    game.games.push({
      round: 0,
      turn: 0,
      phase: 0,
      deck: [],
      characters: [],
      bonusRules: [],
      discards: [],
      players: [],
      choices: []
    });
    game.activeGame = game.games.length - 1;
    game.do.newDeck();
    game.do.newBonusRules();
    game.do.newCharacters();
    _.each(characters, function(character) {
      game.do.newPlayer(character);
    })
    game.do.newDealer();
    game.do.shuffleDeck();
    game.do.deal(2);
  },
  newDeck: function() {
    game.games[game.activeGame].deck = _.where(game.cards, { deck: true });
  },
  newBonusRules: function() {
    game.games[game.activeGame].bonusRules = _.where(game.cards, { type: "Bonus Rule" });
  },
  newCharacters: function() {
    game.games[game.activeGame].characters = _.where(game.cards, { type: "Character" });
  },
  newPlayer: function(name) {
    var character = _.extend( _.first(_.where(game.games[game.activeGame].characters, { name: name })), { skills: [], storage: [] } );
    game.games[game.activeGame].players.push( { character: [character], hand: [], exchanges: [], choices: [], attack: [{ cards: [] }], moonTokens: 0 } );
  },
  createRandomCharacters: function(number) {
    var characters = _.shuffle(_.where(game.cards, { type: "Character" }));
    _.each(_.range(number), function(index){
      game.players.push(_.extend(_.pick(characters[index], "name"), {win: 0, loose: 0}));
    });
    game.do.newGame(_.pluck(game.players, "name"));
    game.do.resolvePhase();
  },
  newDealer: function() {
    game.games[game.activeGame].players[ game.games[game.activeGame].players.length - 1 ].dealer = _.where(game.cards, { type: "Dealer" });
  },
  shuffleDeck: function() {
    game.games[game.activeGame].deck = _.shuffle(game.games[game.activeGame].deck);
  },
  reduceDeckBy: function(howMany) {
    game.games[game.activeGame].deck = game.games[game.activeGame].deck.splice(howMany, game.games[game.activeGame].deck.length - howMany);
  },
  deal: function(howMany) {
    _.each(_.range(howMany), function(number){
      _.each(_.range(game.games[game.activeGame].players.length), function(player){
        var deckID = ((number * game.games[game.activeGame].players.length) + (player + 1)) - 1;
        game.games[game.activeGame].players[player].hand.push( game.games[game.activeGame].deck[ deckID ] );
      });
    });
    game.do.reduceDeckBy(howMany * game.games[game.activeGame].players.length);
  },
  isCardSkill: function(card) {
    return _.has(card, 'law') || _.has(card, 'coding') || _.has(card, 'marketing');
  },
  isCardAttack: function(card) {
    return _.has(card, 'attack');
  },
  isCardType: function(card, type) {
    return type == _.property('type')(card);
  },
  isLocked: function(exchange) {
    return ( exchange.storage.length >= exchange.storageCapacity );
  },
  countSkills: function(playerID, skill) {
    var characterSkills = game.games[game.activeGame].players[playerID].character[0][skill]
    var skills = _.reduce(game.games[game.activeGame].players[playerID].character[0].skills, function(memo, num){
      return num[skill] ? memo + num[skill] : memo;
    }, 0);
    return characterSkills + skills;
  },
  canAttack: function(playerID, otherPlayerID, card) {
    return (game.do.countSkills(playerID, card.skill) > game.do.countSkills(otherPlayerID, card.skill));
  },
  updateUI: function() {
    _.each(game.games[game.activeGame].players, function(player, key){
      $('#player' + key + 'Character').text(JSON.stringify(player.character, null, '\t'));
      $('#player' + key + 'Exchanges').text(JSON.stringify(player.exchanges, null, '\t'));
      $('#player' + key + 'Hand').text(JSON.stringify(player.hand, null, '\t'));
    });
    $('#gameActive').text(JSON.stringify(game.activeGame, null, '\t'));
    $('#moonTokens').text(JSON.stringify(game.moonTokens, null, '\t'));
    $('#gameRound').text(JSON.stringify(game.games[game.activeGame].round, null, '\t'));
    $('#gameTurn').text(JSON.stringify(game.games[game.activeGame].turn, null, '\t'));
    $('#gamePhase').text(JSON.stringify(game.games[game.activeGame].phase, null, '\t'));
    $('#gameDeck').text(JSON.stringify(game.games[game.activeGame].deck.length, null, '\t'));
  },
  mine: function(playerID) {
    if (game.games[game.activeGame].players[playerID].character[0].storageCapacity > game.games[game.activeGame].players[playerID].character[0].storage.length) {
      game.games[game.activeGame].players[playerID].character[0].storage.push( _.first(game.games[game.activeGame].deck) );
      game.do.reduceDeckBy(1);
    } else {
      console.log(game.games[game.activeGame].players[playerID].character[0].name +  " cannot mine for Character");
    }
    _.each(game.games[game.activeGame].players[playerID].exchanges, function(exchange, key){
      if (exchange.storageCapacity > exchange.storage.length) {
        exchange.storage.push( _.first(game.games[game.activeGame].deck) );
        game.do.reduceDeckBy(1);
      } else {
        console.log(game.games[game.activeGame].players[playerID].character[0].name +  " cannot mine for Exchange " + key);
      }
    });
    if (game.do.isEndGame()) {
      game.do.endGame();
    }
  },
  drawFromDeck: function(playerID) {
    if (game.games[game.activeGame].deck.length > 0) {
      game.games[game.activeGame].players[playerID].hand.push( _.first(game.games[game.activeGame].deck) );
      game.do.reduceDeckBy(1);
    } else {
      console.log("No cards in the deck");
    }
  },
  drawFromStorage: function(playerID, fromExchange, exchangeID, cardID) {
    if (fromExchange) {
      var card = game.games[game.activeGame].players[playerID].exchanges[exchangeID].storage[cardID];
      if (card) {
        game.games[game.activeGame].players[playerID].hand.push(card);
        game.games[game.activeGame].players[playerID].exchanges[exchangeID].storage.splice(cardID, 1);
      } else {
        console.log("No card stored here");
      }
    } else {
      var card = game.games[game.activeGame].players[playerID].character[0].storage[cardID];
      if (game.games[game.activeGame].players[playerID].character[0].storage[cardID]) {
        game.games[game.activeGame].players[playerID].hand.push( game.games[game.activeGame].players[playerID].character[0].storage[cardID] );
        game.games[game.activeGame].players[playerID].character[0].storage.splice(cardID, 1);
      } else {
        console.log("No card stored here");
      }
    }
  },
  learn: function(playerID, cardID) {
    var card = game.games[game.activeGame].players[playerID].hand[cardID];
    if (card) {
      if (game.do.isCardSkill(card)) {
        game.games[game.activeGame].players[playerID].character[0].skills.push(card);
        game.games[game.activeGame].players[playerID].hand.splice(cardID, 1);
      } else {
        console.log("Card doesn't have skills");
      }
    } else {
      console.log("Card in hand not found");
    }
  },
  attack: function(playerID, cardID, otherPlayerID, isExchange, exchangeID) {
    var card = game.games[game.activeGame].players[playerID].hand[cardID];
    if (card) {
      if (game.do.isCardAttack(card)) {
        if (game.do.canAttack(playerID, otherPlayerID, card)) {
          game.do.newAttack(playerID, cardID, otherPlayerID, isExchange, exchangeID);
        } else {
          console.log("Insufficient skills")
        }
      } else {
        console.log("Not an attack card");
      }
    } else {
      console.log("Card in hand not found");
    }
  },
  newAttack: function(playerID, cardID, otherPlayerID, isExchange, exchangeID) {
    var card = game.games[game.activeGame].players[playerID].hand[cardID];
    game.games[game.activeGame].players[otherPlayerID].attack[0].attacker = playerID;
    game.games[game.activeGame].players[otherPlayerID].attack[0].isExchange = isExchange;
    game.games[game.activeGame].players[otherPlayerID].attack[0].exchangeID = exchangeID;
    game.games[game.activeGame].players[otherPlayerID].attack[0].cards.push(card);
    game.games[game.activeGame].players[playerID].hand.splice(cardID, 1);
  },
  skullduggery: function(playerID, cardID) {
    var card = game.games[game.activeGame].players[playerID].hand[cardID];
    if (card) {
      if ( game.do.isCardType(card, 'Skullduggery') ) {
        if (game.games[game.activeGame].players[playerID].attack[0].cards.length > 0) {
          // Discard Skullduggery
          game.games[game.activeGame].discards.push( card );
          game.games[game.activeGame].players[playerID].hand.splice(cardID, 1);
          // Discard Attack
          game.games[game.activeGame].discards.push( game.games[game.activeGame].players[playerID].attack[0].cards[0] );
          game.games[game.activeGame].players[playerID].attack = [{ cards: [] }];
        } else {
          console.log(game.games[game.activeGame].players[playerID].character[0].name +  " is not being attacked");
        }
      } else {
        console.log("This card is not a Skullduggery");
      }
    } else {
      console.log("Card in hand not found");
    }
  },
  attackSuccess: function(playerID) {
    var attack = game.games[game.activeGame].players[playerID].attack[0];
    if (attack.cards.length > 0) {
      if (game.do.isCardType(attack.cards[0], 'Head Hunter')) {
        // Move Skill Card to Attackers Hand
        game.games[game.activeGame].players[attack.attacker].hand.push( game.games[game.activeGame].players[playerID].character[0].skills[attack.skillID] );
        game.games[game.activeGame].players[playerID].character[0].skills.splice(attack.skillID, 1);
      } else if (attack.isExchange) {
        // Discard Storage
        _.each(game.games[game.activeGame].players[playerID].exchanges[attack.exchangeID].storage, function(card){
          game.games[game.activeGame].discards.push( card );
        });
        game.games[game.activeGame].players[playerID].exchanges[attack.exchangeID].storage = [];
        // Gift Exchange
        game.games[game.activeGame].players[attack.attacker].hand.push(game.games[game.activeGame].players[playerID].exchanges[attack.exchangeID]);
        game.games[game.activeGame].players[playerID].exchanges.splice(attack.exchangeID, 1);
      } else {
        _.each(game.games[game.activeGame].players[playerID].character[0].storage, function(card){
          game.games[game.activeGame].discards.push( card );
        });
        game.games[game.activeGame].players[playerID].character[0].storage = [];
      }
      // Discard Attack
      game.games[game.activeGame].discards.push( game.games[game.activeGame].players[playerID].attack[0].cards[0] );
      game.games[game.activeGame].players[playerID].attack = [{ cards: [] }];
    } else {
      console.log(game.games[game.activeGame].players[playerID].character[0].name +  " is not being attacked");
    }
  },
  headHunt: function(playerID, cardID, otherPlayerID, skillID) {
    var card = game.games[game.activeGame].players[playerID].hand[cardID];
    if (card) {
      if (game.do.isCardType(card, 'Head Hunter')) {
        game.do.newHeadHunt(playerID, cardID, otherPlayerID, skillID);
      } else {
        console.log("Not a Head Hunter card");
      }
    } else {
      console.log("Card in hand not found");
    }
  },
  newHeadHunt: function(playerID, cardID, otherPlayerID, skillID) {
    var card = game.games[game.activeGame].players[playerID].hand[cardID];
    game.games[game.activeGame].players[otherPlayerID].attack[0].attacker = playerID;
    game.games[game.activeGame].players[otherPlayerID].attack[0].skillID = skillID;
    game.games[game.activeGame].players[otherPlayerID].attack[0].cards.push(card);
    game.games[game.activeGame].players[playerID].hand.splice(cardID, 1);
  },
  buildExchange: function(playerID, cardID) {
    var card = game.games[game.activeGame].players[playerID].hand[cardID];
    if (card) {
      if (game.do.isCardType(card, 'Exchange')) {
        game.games[game.activeGame].players[playerID].exchanges.push( _.extend( card, { storage: [] } ) );
        game.games[game.activeGame].players[playerID].hand.splice(cardID, 1);
      } else {
        console.log("This card is not an Exchange");
      }
    } else {
      console.log("Card in hand not found");
    }
  },
  characterHasStorage: function(playerID) {
    return (game.games[game.activeGame].players[playerID].character[0].storageCapacity > game.games[game.activeGame].players[playerID].character[0].storage.length);
  },
  exchangeHasStorage: function(playerID, exchangeID) {
    return (game.games[game.activeGame].players[playerID].exchanges[exchangeID].storageCapacity > game.games[game.activeGame].players[playerID].exchanges[exchangeID].storage.length);
  },
  store: function(playerID, cardID, isExchange, exchangeID) {
    var card = game.games[game.activeGame].players[playerID].hand[cardID];
    if (card) {
      if (isExchange) {
        var exchange = game.games[game.activeGame].players[playerID].exchanges[exchangeID];
        if (game.do.exchangeHasStorage(playerID, exchangeID)) {
          exchange.storage.push( game.games[game.activeGame].players[playerID].hand[cardID] );
          game.games[game.activeGame].players[playerID].hand.splice(cardID, 1);
        } else {
          console.log(game.games[game.activeGame].players[playerID].character[0].name +  " cannot mine for Exchange " + exchangeID);
        }
      } else {
        var character = game.games[game.activeGame].players[playerID].character[0];
        if (game.do.characterHasStorage(playerID)) {
          character.storage.push( game.games[game.activeGame].players[playerID].hand[cardID] );
          game.games[game.activeGame].players[playerID].hand.splice(cardID, 1);
        } else {
          console.log(game.games[game.activeGame].players[playerID].character[0].name +  " cannot mine for Character");
        }
      }
    } else {
      console.log("Card in hand not found");
    }
  },
  resolvePhase: function() {
    if (game.games[game.activeGame].phase == 0) {
      game.do.mine(game.games[game.activeGame].turn);
      game.games[game.activeGame].phase = 1;
      game.do.resolvePhase();
    } else if (game.games[game.activeGame].phase == 1) {
      game.do.drawChoices();
      game.do.updateUI();
    } else if (game.games[game.activeGame].phase == 2) {
      game.do.actionChoices();
      game.do.updateUI();
    }
  },
  saveChoice: function(playerID, choiceNum) {
    game.games[game.activeGame].choices.push(
      _.extend({player: game.games[game.activeGame].players[playerID].character[0].name, choiceNum: choiceNum}, game.games[game.activeGame].players[playerID].choices[choiceNum])
    );
  },
  drawChoices: function() {
    var choices = [];
    choices.push({choice: "Draw from deck", code: "game.do.drawFromDeck(" + game.games[game.activeGame].turn + ")"});
    _.each(game.games[game.activeGame].players[game.games[game.activeGame].turn].character[0].storage, function(card, cardID){
      choices.push({choice: "Draw from Character storage #" + cardID, code: "game.do.drawFromStorage(" + game.games[game.activeGame].turn + ", false, 0, " + cardID + ")" });
    });
    _.each(game.games[game.activeGame].players[game.games[game.activeGame].turn].exchanges, function(exchange, exchangeID){
      _.each(exchange.storage, function(card, cardID){
        choices.push({choice: "Draw from Exchange #" + exchangeID + " storage #" + cardID, code: "game.do.drawFromStorage(" + game.games[game.activeGame].turn + ", true, " + exchangeID + ", " + cardID + ")" });
      });
    })
    game.games[game.activeGame].players[game.games[game.activeGame].turn].choices = choices;
    console.log(game.games[game.activeGame].players[game.games[game.activeGame].turn].character[0].name);
    console.log(game.games[game.activeGame].players[game.games[game.activeGame].turn].choices);
  },
  drawChoice: function(choiceNum) {
    if (!_.isEmpty(game.games[game.activeGame].players[game.games[game.activeGame].turn].choices)) {
      eval(game.games[game.activeGame].players[game.games[game.activeGame].turn].choices[choiceNum].code);
      game.do.saveChoice(game.games[game.activeGame].turn, choiceNum);
      game.games[game.activeGame].players[game.games[game.activeGame].turn].choices = [];
      if (game.do.isEndGame()) {
        game.do.endGame();
      } else {
        game.games[game.activeGame].phase = 2;
        game.do.resolvePhase();
      }
    } else {
      console.log("No choices available");
    }
  },
  actionChoices: function() {
    var choices = [];
    choices.push({choice: "Skip"});
    _.each(game.games[game.activeGame].players[game.games[game.activeGame].turn].hand, function(card, cardID){
      // Learn
      if (game.do.isCardSkill(card)) {
        choices.push({choice: "Learn " + card.type, code: "game.do.learn(" + game.games[game.activeGame].turn + ", " + cardID + ")"});
      }
      // Attack Character
      _.each(game.games[game.activeGame].players, function(player, playerID){
        if (playerID != game.games[game.activeGame].turn) {
          if (game.do.isCardAttack(card)) {
            if (game.do.canAttack(game.games[game.activeGame].turn, playerID, card)) {
              choices.push({choice: "Attack " + player.character[0].name + " with a " + card.type, code: "game.do.attack(" + game.games[game.activeGame].turn + ", " + cardID + ", " + playerID + ", false, 0)"});
              _.each(player.exchanges, function(exchange, exchangeID){
                if (!game.do.isLocked(exchange)) {
                  choices.push({choice: "Attack " + player.character[0].name + "'s Exchange #" + exchangeID + " with a " + card.type, code: "game.do.attack(" + game.games[game.activeGame].turn + ", " + cardID + ", " + playerID + ", true, " + exchangeID + ")"});
                }
              });
            }
          }
          // Head Hunt a Skill
          _.each(player.character[0].skills, function(skill, skillID){
            if (game.do.isCardType(card, 'Head Hunter')) {
              choices.push({choice: "Head Hunt " + player.character[0].name + "'s " + skill.type, code: "game.do.headHunt(" + game.games[game.activeGame].turn + ", " + cardID + ", " + playerID + ", " + skillID + ")"});
            }
          });
        }
      });
      // Build an exchange
      if (game.do.isCardType(card, 'Exchange')) {
        choices.push({choice: "Build Exchange", code: "game.do.buildExchange(" + game.games[game.activeGame].turn + ", " + cardID + ")"});
      }
      // Character storage
      if (game.do.characterHasStorage(game.games[game.activeGame].turn)) {
        choices.push({choice: "Put " + card.type + " into Character storage", code: "game.do.store(" + game.games[game.activeGame].turn + ", " + cardID + ", false, 0)"});
      }
      // Exchange storage
      _.each(game.games[game.activeGame].players[game.games[game.activeGame].turn].exchanges, function(exchange, exchangeID){
        if (game.do.exchangeHasStorage(game.games[game.activeGame].turn, exchangeID)) {
          choices.push({choice: "Put " + card.type + " into Exchange #" + exchangeID + " storage", code: "game.do.store(" + game.games[game.activeGame].turn + ", " + cardID + ", true, " + exchangeID + ")"});
        }
      });
    });
    game.games[game.activeGame].players[game.games[game.activeGame].turn].choices = choices;
    console.log(game.games[game.activeGame].players[game.games[game.activeGame].turn].character[0].name);
    console.log(game.games[game.activeGame].players[game.games[game.activeGame].turn].choices);
  },
  actionChoice: function(choiceNum){
    eval(game.games[game.activeGame].players[game.games[game.activeGame].turn].choices[choiceNum].code);
    game.do.saveChoice(game.games[game.activeGame].turn, choiceNum);
    game.games[game.activeGame].players[game.games[game.activeGame].turn].choices = [];
    game.do.updateUI();
    game.do.bribeChoices();
  },
  bribeChoices: function(playerID){
    var isAttack = false;
    _.each(game.games[game.activeGame].players, function(player, playerID){
      if (player.attack[0].cards.length > 0) {
        isAttack = true;
        var choices = [];
        choices.push({choice: "Skip", code: "game.do.attackSuccess(" + playerID + ")"});
        _.each(game.games[game.activeGame].players[playerID].hand, function(card, cardID){
          if ( game.do.isCardType(card, 'Skullduggery') ) {
            choices.push({choice: "Skullduggery", code: "game.do.skullduggery(" + playerID + ", " + cardID + ")"});
          }
        });
        if (choices.length > 1) {
          game.games[game.activeGame].players[playerID].choices = choices;
          console.log(game.games[game.activeGame].players[playerID].character[0].name);
          console.log(game.games[game.activeGame].players[playerID].choices);
        } else {
          eval(choices[0].code);
          game.do.nextTurn();
        }
      }
    });
    if (!isAttack) {
      game.do.nextTurn();
    }
  },
  bribeChoice: function(choiceNum){
    _.each(game.games[game.activeGame].players, function(player, playerID){
      if (player.attack[0].cards.length > 0) {
        eval(game.games[game.activeGame].players[playerID].choices[choiceNum].code);
        game.do.saveChoice(playerID, choiceNum);
        game.games[game.activeGame].players[playerID].choices = [];
      }
    });
    game.do.nextTurn();
  },
  nextTurn: function(){
    game.games[game.activeGame].phase = 0;
    game.games[game.activeGame].turn ++;
    if (game.games[game.activeGame].turn > 2) {
      game.games[game.activeGame].turn = 0;
      game.games[game.activeGame].round ++;
    }
    game.do.resolvePhase();
  },
  choose: function(number){
    if (game.games[game.activeGame].phase == 1) {
      game.do.drawChoice(number);
    } else if (game.games[game.activeGame].phase == 2) {
      var isAttack = false;
      _.each(game.games[game.activeGame].players, function(player, playerID){
        if (player.attack[0].cards.length > 0) {
          isAttack = true;
        }
      });
      if (isAttack) {
        game.do.bribeChoice(number);
      } else {
        game.do.actionChoice(number);
      }
    }
  },
  copyMoonTokens: function(){
    _.each(game.games[game.activeGame].players, function(player, playerID){
      game.games[game.activeGame].players[playerID].moonTokens = game.games[game.activeGame - 1].players[playerID].moonTokens;
    });
  },
  isEndGame: function(){
    return ( game.games[game.activeGame].deck.length < 1 );
  },
  endGame: function(){
    console.log("End of the game");

    var playersBitcoins = _.map(game.games[game.activeGame].players, function(player, playerID){
      var bitcoins = player.character[0].storage.length;
      _.each(player.exchanges, function(exchange, exchangeID){
        bitcoins = bitcoins + exchange.storage.length;
      });
      return {playerID: playerID, bitcoins: bitcoins};
    });
    playersBitcoins = _.sortBy(playersBitcoins, "bitcoins").reverse();
    var winners = _.where(playersBitcoins, {bitcoins: _.first(playersBitcoins).bitcoins});
    if (game.moonTokens < winners.length) {
      console.log("Rematch to decide a winner");
    }
    _.each(winners, function(winner){
      _.each(game.players, function(player, index){
        if (player.name == game.games[game.activeGame].players[winner.playerID].character[0].name) {
          game.players[index].win ++;
        } else {
          game.players[index].loose ++;
        }
      });
      if (game.moonTokens >= winners.length) {
        game.games[game.activeGame].players[winner.playerID].moonTokens ++;
        game.moonTokens --;
      }
    });

    if (game.moonTokens > 0) {
      game.do.newGame(_.pluck(game.players, 'name'));
      game.do.copyMoonTokens();
      game.do.resolvePhase();
    } else {
      console.log("End of To The Moon");
    }
  }
};

// Setup
game.do.createCards();
game.do.createRandomCharacters(3);

/*
setInterval(function(){
  game.do.choose(0);
}, 20);
*/

$('#updateUIButton').click(function(event){
  event.preventDefault();
  game.do.updateUI();
});