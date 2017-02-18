const Discord = require('discord.js');
const config = require("./config.json");

module.exports = {
  getPokemonList: function(worksheet){
    //add the pokemon to the map with their row number
    var pokemonList = new Map();
    for(i = 2; i<= config.numPokemon; i++){
      var cell = 'B'+i;
      var pokemonCell = worksheet[cell];
      var pokemonName = pokemonCell.v.toLowerCase();
      pokemonList.set(pokemonName,i);
    }

    return pokemonList;
  },

  getNatureList: function(worksheet){
    //add the natures to the map with their row number
    var natureList = new Map();
    for(i = 3; i <= config.numNatures; i++){
      var cell = 'A'+i;
      var natureCell = worksheet[cell];
      var natureName = natureCell.v.toLowerCase();
      natureList.set(natureName,i);
    }

    return natureList;
  },

  getAbilityList: function(worksheet){
    //add of the abilities to the map with their row number
    var abilityList = new Map();
    for(i = 2; i<=config.numAbilities; i++){
      var cell = 'A'+i;
      var abilityCell = worksheet[cell];
      var abilityName = abilityCell.v.toLowerCase();
      abilityList.set(abilityName,i);
    }

    return abilityList;
  },

  getHeldItemList: function(worksheet){
    var itemHeldList = new Map();

    for(i = 2; i < config.numHeldItems; i++){
      var itemName = worksheet['A'+i].v.toLowerCase();
      itemHeldList.set(itemName,i);
    }
    return itemHeldList;
  },

  getTlrItemList: function(worksheet){
    var itemTLRList = new Map();

    for(i = 2; i < config.numTLRItems; i++){
      var itemName = worksheet['A'+i].v.toLowerCase();
      itemTLRList.set(itemName,i);
    }
    return itemTLRList;
  },

  getMoveList: function(worksheet){
    var moveList = new Map();

    //loop through all rows in the move worksheet
    for(i = 2; i< config.numMoves; i++){
      //key = name of move, value = array with two values
      var arr = [0,0];
      var start; //row the move first appears
      var end; //row the move ends with

      //non undefined rows contain the name of the move
      if(worksheet['A'+i] != undefined){
        start = i;
        var name = worksheet['A'+i].v.toLowerCase();
        name = name.replace(" (move)","");
        name = name.replace(" (command)","");
      }else{
        //loop through the undefined rows until we find one with a name
        end = i;
        while(worksheet['A'+ end] == undefined && end < config.numMoves){
           end++;
         }

        //store the start and stop row numbers in the array
        arr[0] = start;
        arr[1] = end - 1;

        //put the move into the array with its row range
        if(!moveList.has(name)){
          moveList.set(name , arr);
        }
      }
    }
    
    return moveList;
  }

};
